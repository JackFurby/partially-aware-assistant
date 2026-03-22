from datetime import datetime
from typing import List, Optional

from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import (
    Boolean, DateTime, Integer, String, Text, ForeignKey,
    UniqueConstraint, ForeignKeyConstraint
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func


class Base(DeclarativeBase):
    pass


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    # email, hashed_password, is_active, is_superuser, is_verified come from SQLAlchemyBaseUserTable

    chats: Mapped[List["Chat"]] = relationship("Chat", back_populates="user", cascade="all, delete-orphan")
    knowledge_bases: Mapped[List["KnowledgeBase"]] = relationship(
        "KnowledgeBase", back_populates="user", cascade="all, delete-orphan"
    )
    create_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    update_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )


class SystemSettings(Base):
    __tablename__ = "system_settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)
    setting_name: Mapped[str] = mapped_column(String(255), nullable=False)
    setting_value: Mapped[str] = mapped_column(Text, nullable=False)
    active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    create_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    update_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )


class Agent(Base):
    __tablename__ = "agent"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id", name="agent_user_id"), nullable=False)
    url: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    create_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    update_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    models: Mapped[List["Model"]] = relationship("Model", back_populates="agent", cascade="all, delete-orphan")


class Model(Base):
    __tablename__ = "model"
    __table_args__ = (
        UniqueConstraint("agent_id", "model_name", name="uq_model_agent_id_model_name"),
    )

    agent_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("agent.id", ondelete="CASCADE"), primary_key=True
    )
    model_name: Mapped[str] = mapped_column(String(255), nullable=False, primary_key=True)
    create_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    update_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    agent: Mapped["Agent"] = relationship("Agent", back_populates="models")
    tags: Mapped[List["ModelTag"]] = relationship(
        "ModelTag", back_populates="model", cascade="all, delete-orphan", passive_deletes=True
    )


class ModelTag(Base):
    __tablename__ = "tag"
    __table_args__ = (
        UniqueConstraint("agent_id", "model_name", "name", name="uq_tag_model_name"),
        ForeignKeyConstraint(
            ["agent_id", "model_name"],
            ["model.agent_id", "model.model_name"],
            ondelete="CASCADE",
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    agent_id: Mapped[int] = mapped_column(Integer, nullable=False)
    model_name: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(50), nullable=False)

    model: Mapped["Model"] = relationship("Model", back_populates="tags")


class Chat(Base):
    __tablename__ = "chat"
    __table_args__ = (
        ForeignKeyConstraint(
            ["agent_id", "model_name"],
            ["model.agent_id", "model.model_name"],
            name="fk_chat_model_agent_model",
            ondelete="CASCADE",
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("user.id", ondelete="CASCADE"), index=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    agent_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("agent.id", ondelete="CASCADE"), nullable=True
    )
    model_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    create_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), index=True
    )
    update_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    user: Mapped["User"] = relationship("User", back_populates="chats")
    messages: Mapped[List["Message"]] = relationship(
        "Message", back_populates="chat", cascade="all, delete-orphan"
    )


class Message(Base):
    __tablename__ = "message"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    chat_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("chat.id", ondelete="CASCADE"), index=True
    )
    message: Mapped[str] = mapped_column(Text, nullable=False)
    total_duration: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    load_duration: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    prompt_eval_count: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    prompt_eval_duration: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    eval_count: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    eval_duration: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    model: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    role: Mapped[str] = mapped_column(String(255), nullable=False)
    model_reasoning: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    create_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), index=True
    )

    chat: Mapped["Chat"] = relationship("Chat", back_populates="messages")


class KnowledgeBase(Base):
    __tablename__ = "knowledge_base"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False, index=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    document_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    document_content: Mapped[str] = mapped_column(Text, nullable=False)
    chunk_size: Mapped[Optional[int]] = mapped_column(Integer, default=500)
    chunk_overlap: Mapped[Optional[int]] = mapped_column(Integer, default=50)
    agent_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("agent.id", ondelete="CASCADE"), nullable=True
    )
    embedding_model: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    create_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), index=True
    )
    update_datetime: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    user: Mapped["User"] = relationship("User", back_populates="knowledge_bases")
