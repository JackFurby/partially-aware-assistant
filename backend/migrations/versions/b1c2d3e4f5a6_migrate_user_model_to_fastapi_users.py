"""Migrate user model from Flask-Security to fastapi-users

Revision ID: b1c2d3e4f5a6
Revises: a177e38e6a85
Create Date: 2026-03-04 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = 'b1c2d3e4f5a6'
down_revision = 'a177e38e6a85'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()

    # 1. Add new columns (nullable first so existing rows are valid)
    with op.batch_alter_table('user') as batch_op:
        batch_op.add_column(sa.Column('hashed_password', sa.String(1024), nullable=True))
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('is_superuser', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('is_verified', sa.Boolean(), nullable=True))

    # 2. Populate new columns from old data
    conn.execute(sa.text("UPDATE user SET hashed_password = password"))
    conn.execute(sa.text("UPDATE user SET is_active = active"))
    conn.execute(sa.text("UPDATE user SET is_verified = 1"))
    conn.execute(sa.text("UPDATE user SET is_superuser = 0"))

    # 3. Mark admins as superusers (based on roles_users junction table)
    result = conn.execute(sa.text("SELECT id FROM role WHERE name = 'admin'"))
    admin_role = result.fetchone()
    if admin_role:
        conn.execute(
            sa.text(
                "UPDATE user SET is_superuser = 1 "
                "WHERE id IN (SELECT user_id FROM roles_users WHERE role_id = :role_id)"
            ),
            {"role_id": admin_role[0]},
        )

    # 4. Rebuild user table dropping old columns (batch mode required for SQLite)
    with op.batch_alter_table('user') as batch_op:
        batch_op.alter_column('hashed_password', nullable=False, existing_type=sa.String(1024))
        batch_op.alter_column('is_active', nullable=False, existing_type=sa.Boolean())
        batch_op.alter_column('is_superuser', nullable=False, existing_type=sa.Boolean())
        batch_op.alter_column('is_verified', nullable=False, existing_type=sa.Boolean())
        batch_op.drop_column('password')
        batch_op.drop_column('active')
        batch_op.drop_column('confirmed_at')
        batch_op.drop_column('fs_uniquifier')
        batch_op.drop_column('last_login_at')
        batch_op.drop_column('current_login_at')
        batch_op.drop_column('last_login_ip')
        batch_op.drop_column('current_login_ip')
        batch_op.drop_column('login_count')

    # 5. Drop old role/user-settings tables
    op.drop_table('roles_users')
    op.drop_table('role')
    op.drop_table('user_settings')


def downgrade():
    # Downgrade not supported due to data loss from column drops
    raise NotImplementedError("Downgrade not supported for this migration")
