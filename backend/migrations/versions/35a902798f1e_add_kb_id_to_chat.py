"""add kb_id to chat

Revision ID: 35a902798f1e
Revises: b1c2d3e4f5a6
Create Date: 2026-03-22 15:44:30.953915

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35a902798f1e'
down_revision = 'b1c2d3e4f5a6'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('chat', schema=None) as batch_op:
        batch_op.add_column(sa.Column('kb_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_chat_kb_id', 'knowledge_base', ['kb_id'], ['id'], ondelete='SET NULL')


def downgrade():
    with op.batch_alter_table('chat', schema=None) as batch_op:
        batch_op.drop_constraint('fk_chat_kb_id', type_='foreignkey')
        batch_op.drop_column('kb_id')
