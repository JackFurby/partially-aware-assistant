import json
from typing import Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from ..auth import current_active_user
from ..database import get_async_session
from ..models import Agent, Chat, Message, Model, User
from ..schemas import (
    ChatCreate, ChatDetail, ChatOut, MessageOut,
    SaveMessageRequest, SendMessageRequest
)

router = APIRouter(prefix="/api", tags=["chat"])


@router.get("/chats", response_model=list[ChatOut])
async def get_chats(
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(
        select(Chat).where(Chat.user_id == user.id).order_by(Chat.create_datetime.desc())
    )
    return result.scalars().all()


@router.post("/chats", response_model=ChatOut)
async def create_chat(
    payload: ChatCreate,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    chat = Chat(
        name=payload.name,
        user_id=user.id,
        agent_id=payload.agent_id,
        model_name=payload.model_name,
    )
    db.add(chat)
    await db.commit()
    await db.refresh(chat)
    return chat


@router.get("/chats/{chat_id}", response_model=ChatDetail)
async def get_chat(
    chat_id: int,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    chat = await db.get(Chat, chat_id)
    if not chat or chat.user_id != user.id:
        raise HTTPException(status_code=404, detail="Chat not found")

    result = await db.execute(
        select(Message)
        .where(Message.chat_id == chat_id)
        .order_by(Message.create_datetime)
    )
    messages = result.scalars().all()
    return {"chat": chat, "messages": messages}


@router.delete("/chats/{chat_id}")
async def delete_chat(
    chat_id: int,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    chat = await db.get(Chat, chat_id)
    if not chat or chat.user_id != user.id:
        raise HTTPException(status_code=404, detail="Chat not found")
    await db.delete(chat)
    await db.commit()
    return {"success": True}


@router.get("/agents/{agent_id}/models", response_model=list[dict])
async def get_agent_models(
    agent_id: int,
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(
        select(Model)
        .where(Model.agent_id == agent_id)
        .options(selectinload(Model.tags))
    )
    models = result.scalars().all()
    return [
        {"model_name": m.model_name, "tags": [{"id": t.id, "name": t.name} for t in m.tags]}
        for m in models
    ]


@router.post("/chat/send_message")
async def send_message(
    payload: SendMessageRequest,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    # Validate agent and model
    agent = await db.get(Agent, payload.agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail=f"Agent {payload.agent_id} not found")

    result = await db.execute(
        select(Model).where(
            Model.agent_id == payload.agent_id,
            Model.model_name == payload.model_name,
        )
    )
    model = result.scalar_one_or_none()
    if not model:
        raise HTTPException(status_code=404, detail=f"Model {payload.model_name} not found")

    # Get or create chat
    if payload.chat_id:
        chat = await db.get(Chat, payload.chat_id)
        if not chat or chat.user_id != user.id:
            raise HTTPException(status_code=403, detail="Chat not found or access denied")
    else:
        chat = Chat(name="New chat", user_id=user.id)
        db.add(chat)
        await db.commit()
        await db.refresh(chat)

    # Save user message
    user_msg = Message(chat_id=chat.id, message=payload.message, role="user")
    db.add(user_msg)

    # Update chat agent/model/kb
    chat.agent_id = agent.id
    chat.model_name = model.model_name
    chat.kb_id = payload.kb_id
    await db.commit()

    # Reconstruct history from DB
    history_result = await db.execute(
        select(Message)
        .where(Message.chat_id == chat.id)
        .order_by(Message.create_datetime)
    )
    history = [
        {"role": m.role, "content": m.message}
        for m in history_result.scalars().all()
    ]

    ollama_url = f"{agent.url}/api/chat"
    ollama_payload = {"model": payload.model_name, "messages": history, "stream": True}
    chat_id = chat.id

    async def generate():
        # Send chat_id first so the frontend can track/update this chat
        yield json.dumps({"type": "chat_id", "chat_id": chat_id}) + "\n"
        async with httpx.AsyncClient(timeout=120) as client:
            async with client.stream("POST", ollama_url, json=ollama_payload) as resp:
                async for line in resp.aiter_lines():
                    if line:
                        yield line + "\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.post("/chat/save_message", response_model=dict)
async def save_message(
    payload: SaveMessageRequest,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    chat = await db.get(Chat, payload.chat_id)
    if not chat or chat.user_id != user.id:
        raise HTTPException(status_code=403, detail="Chat not found or access denied")

    msg = Message(
        chat_id=payload.chat_id,
        message=payload.message,
        role="assistant",
        model_reasoning=payload.model_reasoning,
        total_duration=payload.total_duration,
        load_duration=payload.load_duration,
        prompt_eval_count=payload.prompt_eval_count,
        prompt_eval_duration=payload.prompt_eval_duration,
        eval_count=payload.eval_count,
        eval_duration=payload.eval_duration,
    )
    db.add(msg)
    await db.commit()
    return {"success": True}
