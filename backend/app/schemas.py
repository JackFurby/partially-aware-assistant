from datetime import datetime
from typing import List, Optional

from fastapi_users import schemas
from pydantic import BaseModel


# ── Auth / User schemas ──────────────────────────────────────────────────────

class UserRead(schemas.BaseUser[int]):
    create_datetime: Optional[datetime] = None


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass


class UserAdminCreate(BaseModel):
    email: str
    password: str
    is_superuser: bool = False


class UserUpdateRequest(BaseModel):
    email: Optional[str] = None
    password: Optional[str] = None
    is_superuser: Optional[bool] = None
    is_active: Optional[bool] = None


# ── Agent / Model schemas ────────────────────────────────────────────────────

class ModelTagOut(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}


class ModelOut(BaseModel):
    agent_id: int
    model_name: str
    tags: List[ModelTagOut] = []

    model_config = {"from_attributes": True}


class AgentOut(BaseModel):
    id: int
    name: str
    url: str
    create_datetime: datetime

    model_config = {"from_attributes": True}


class AgentCreate(BaseModel):
    name: str
    url: str


class AddModelRequest(BaseModel):
    model_name: str


class AddTagRequest(BaseModel):
    model_name: str
    tags: List[str]


# ── Chat schemas ─────────────────────────────────────────────────────────────

class ChatOut(BaseModel):
    id: int
    name: str
    user_id: int
    agent_id: Optional[int] = None
    model_name: Optional[str] = None
    kb_id: Optional[int] = None
    create_datetime: datetime

    model_config = {"from_attributes": True}


class ChatCreate(BaseModel):
    name: str = "New chat"
    agent_id: Optional[int] = None
    model_name: Optional[str] = None


class MessageOut(BaseModel):
    id: int
    chat_id: int
    message: str
    role: str
    model_reasoning: Optional[str] = None
    total_duration: Optional[int] = None
    load_duration: Optional[int] = None
    prompt_eval_count: Optional[int] = None
    prompt_eval_duration: Optional[int] = None
    eval_count: Optional[int] = None
    eval_duration: Optional[int] = None
    model: Optional[str] = None
    create_datetime: datetime

    model_config = {"from_attributes": True}


class ChatDetail(BaseModel):
    chat: ChatOut
    messages: List[MessageOut]


class SendMessageRequest(BaseModel):
    chat_id: Optional[int] = None  # None = start new chat
    agent_id: int
    model_name: str
    message: str
    kb_id: Optional[int] = None


class SaveMessageRequest(BaseModel):
    chat_id: int
    message: str
    model_reasoning: Optional[str] = None
    total_duration: Optional[int] = None
    load_duration: Optional[int] = None
    prompt_eval_count: Optional[int] = None
    prompt_eval_duration: Optional[int] = None
    eval_count: Optional[int] = None
    eval_duration: Optional[int] = None


# ── System settings schemas ──────────────────────────────────────────────────

class SystemSettingsUpdate(BaseModel):
    rag_prompt: str


class SystemSettingsOut(BaseModel):
    rag_prompt: Optional[str] = None


# ── RAG schemas ──────────────────────────────────────────────────────────────

class KnowledgeBaseOut(BaseModel):
    id: int
    name: str
    document_filename: str
    agent_id: Optional[int] = None
    embedding_model: Optional[str] = None
    chunk_size: Optional[int] = None
    chunk_overlap: Optional[int] = None
    create_datetime: datetime

    model_config = {"from_attributes": True}


class RAGQueryRequest(BaseModel):
    chat_id: Optional[int] = None
    kb_id: int
    agent_id: int
    model_name: str
    query: str
