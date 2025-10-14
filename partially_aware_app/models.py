from partially_aware_app import db
from flask_security import UserMixin, RoleMixin
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Boolean, DateTime, Column, Integer, String, ForeignKey, UnicodeText, UniqueConstraint
from sqlalchemy.sql import func
import datetime


class RolesUsers(db.Model):
	__tablename__ = 'roles_users'
	__table_args__ = (UniqueConstraint('user_id', 'role_id'),)
	user_id = Column('user_id', Integer(), ForeignKey('user.id', ondelete='CASCADE'), primary_key=True)
	role_id = Column('role_id', Integer(), ForeignKey('role.id', ondelete='CASCADE'), primary_key=True)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=datetime.datetime.utcnow,
	)


class Role(db.Model, RoleMixin):
	__tablename__ = 'role'
	id = Column(Integer(), primary_key=True)
	name = Column(String(80), unique=True, nullable=False)
	description = Column(String(255))
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=datetime.datetime.utcnow,
	)


class User(db.Model, UserMixin):
	__tablename__ = 'user'
	id = Column(Integer, primary_key=True)
	email = Column(String(255), unique=True, nullable=False)
	password = Column(String(255), nullable=False)
	last_login_at = Column(DateTime())
	current_login_at = Column(DateTime())
	last_login_ip = Column(String(100))
	current_login_ip = Column(String(100))
	login_count = Column(Integer)
	active = Column(Boolean())
	fs_uniquifier = Column(String(255), unique=True, nullable=False)
	confirmed_at = Column(DateTime())
	roles = relationship(
		'Role',
		secondary='roles_users',
		backref=backref('users', lazy='dynamic')
	)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=datetime.datetime.utcnow,
	)

	def has_role(self, role):
		return role in self.roles


class UserSettings(db.Model):
	__tablename__ = 'user_settings'
	__table_args__ = (UniqueConstraint('user_id',),)
	user_id = Column('user_id', Integer(), ForeignKey('user.id', ondelete='CASCADE'), primary_key=True)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=datetime.datetime.utcnow,
	)


class Agent(db.Model):
	__tablename__ = 'agent'
	id = Column(Integer, primary_key=True, autoincrement=True)
	name = Column(String(255), unique=True, nullable=False)
	user_id = Column(Integer, ForeignKey('user.id', name='agent_user_id'), nullable=False)
	url = Column(String(255), unique=True, nullable=False)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=datetime.datetime.utcnow,
	)


class Model(db.Model):
	__tablename__ = 'model'
	__table_args__ = (UniqueConstraint('agent_id', 'model_name'),)
	agent_id = Column('agent_id', Integer(), ForeignKey('agent.id', ondelete='CASCADE'), primary_key=True)
	model_name = Column(String(255), nullable=False, primary_key=True)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=datetime.datetime.utcnow,
	)
