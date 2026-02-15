from partially_aware_app import db
from flask_security import UserMixin, RoleMixin
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Boolean, DateTime, Column, Integer, String, ForeignKey, UnicodeText, UniqueConstraint, Text, ForeignKeyConstraint
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
		onupdate=func.now(),
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
		onupdate=func.now(),
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
	chats = db.relationship("Chat", backref="user")
	knowledge_bases = db.relationship("KnowledgeBase", backref="user", cascade="all, delete-orphan")
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=func.now(),
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
		onupdate=func.now(),
	)


class SystemSettings(db.Model):
	__tablename__ = 'system_settings'
	id = Column(Integer, primary_key=True)
	user_id = Column('user_id', Integer(), ForeignKey('user.id'), nullable=False)
	setting_name = Column(String(255), nullable=False)
	setting_value = Column(Text, nullable=False)
	active = Column(Boolean(), nullable=False, default=True)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=func.now(),
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
		onupdate=func.now(),
	)


class Model(db.Model):
	__tablename__ = 'model'
	__table_args__ = (UniqueConstraint('agent_id', 'model_name', name='uq_model_agent_id_model_name'),)
	agent_id = Column('agent_id', Integer(), ForeignKey('agent.id', ondelete='CASCADE'), primary_key=True)
	model_name = Column(String(255), nullable=False, primary_key=True)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now())
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=func.now(),
	)

	tags = db.relationship('ModelTag', back_populates='model', cascade='all, delete-orphan', passive_deletes=True)


class ModelTag(db.Model):
	__tablename__ = 'tag'
	__table_args__ = ()

	id = db.Column(db.Integer, primary_key=True)
	agent_id = db.Column(db.Integer, nullable=False)
	model_name = db.Column(db.String(255), nullable=False)
	name = db.Column(db.String(50), nullable=False)
	model = db.relationship('Model', back_populates='tags')

	__table_args__ = (
		db.UniqueConstraint('agent_id', 'model_name', 'name', name='uq_tag_model_name'),
		db.ForeignKeyConstraint(['agent_id', 'model_name'], ['model.agent_id', 'model.model_name'], ondelete='CASCADE'),
	)


class Chat(db.Model):
	__tablename__ = 'chat'
	__table_args__ = (  # ForeignKeyConstraint for model_name to Models table
		ForeignKeyConstraint(
			['agent_id', 'model_name'],
			['model.agent_id', 'model.model_name'],
			name="fk_chat_model_agent_model",
			ondelete="CASCADE"
		),
	)
	id = Column(Integer(), primary_key=True)
	user_id = Column('user_id', Integer(), ForeignKey('user.id', ondelete='CASCADE'), index=True)
	name = Column(String(255), nullable=False)
	messages = db.relationship("Message", backref="chat", cascade="all, delete-orphan")
	agent_id = Column('agent_id', Integer(), ForeignKey('agent.id', ondelete='CASCADE'), nullable=True)
	model_name = Column(String(255), nullable=True)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now(), index=True)
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=func.now(),
	)


class Message(db.Model):
	__tablename__ = 'message'
	id = Column(Integer(), primary_key=True)
	chat_id = Column('chat_id', Integer(), ForeignKey('chat.id', ondelete='CASCADE'), index=True)
	message = Column(Text, nullable=False)
	total_duration = Column(Integer(), nullable=True)
	load_duration = Column(Integer(), nullable=True)
	prompt_eval_count = Column(Integer(), nullable=True)
	prompt_eval_duration = Column(Integer(), nullable=True)
	eval_count = Column(Integer(), nullable=True)
	eval_duration = Column(Integer(), nullable=True)
	model = Column(String(255), nullable=True)
	role = Column(String(255), nullable=False)
	model_reasoning = Column(Text)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now(), index=True)


class KnowledgeBase(db.Model):
	__tablename__ = 'knowledge_base'
	id = Column(Integer(), primary_key=True)
	user_id = Column('user_id', Integer(), ForeignKey('user.id', ondelete='CASCADE'), nullable=False, index=True)
	name = Column(String(255), nullable=False)
	document_filename = Column(String(255), nullable=False)
	document_content = Column(Text, nullable=False)
	chunk_size = Column(Integer(), default=500)
	chunk_overlap = Column(Integer(), default=50)
	agent_id = Column('agent_id', Integer(), ForeignKey('agent.id', ondelete='CASCADE'), nullable=True)
	embedding_model = Column(String(255), nullable=True)
	create_datetime = Column(DateTime(), nullable=False, server_default=func.now(), index=True)
	update_datetime = Column(
		DateTime(),
		nullable=False,
		server_default=func.now(),
		onupdate=func.now(),
	)
