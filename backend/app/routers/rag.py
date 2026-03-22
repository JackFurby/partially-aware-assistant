import json
from typing import Dict, Tuple

import httpx
import requests
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from werkzeug.utils import secure_filename

from ..auth import current_active_user
from ..database import get_async_session
from ..models import Agent, KnowledgeBase, Model, User
from ..schemas import KnowledgeBaseOut, RAGQueryRequest
from ..services.rag_service import RAGService

router = APIRouter(prefix="/api/rag", tags=["rag"])

# In-memory cache: (user_id, kb_id) -> RAGService
_rag_services: Dict[Tuple[int, int], RAGService] = {}


@router.get("/knowledge_bases", response_model=list[KnowledgeBaseOut])
async def list_knowledge_bases(
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(
        select(KnowledgeBase)
        .where(KnowledgeBase.user_id == user.id)
        .order_by(KnowledgeBase.create_datetime.desc())
    )
    return result.scalars().all()


@router.post("/upload", response_model=KnowledgeBaseOut)
async def upload_knowledge_base(
    name: str = Form(...),
    agent_id: int = Form(...),
    embedding_model: str = Form(...),
    file: UploadFile = File(...),
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    agent = await db.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    try:
        content = (await file.read()).decode("utf-8")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {e}")

    filename = secure_filename(file.filename or "upload.txt")

    kb = KnowledgeBase(
        user_id=user.id,
        name=name,
        document_filename=filename,
        document_content=content,
        chunk_size=500,
        chunk_overlap=50,
        agent_id=agent_id,
        embedding_model=embedding_model,
    )
    db.add(kb)
    try:
        await db.commit()
        await db.refresh(kb)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return kb


@router.post("/query")
async def rag_query(
    payload: RAGQueryRequest,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    agent = await db.get(Agent, payload.agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    result = await db.execute(
        select(Model).where(
            Model.agent_id == payload.agent_id,
            Model.model_name == payload.model_name,
        )
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Model not found")

    kb = await db.get(KnowledgeBase, payload.kb_id)
    if not kb or kb.user_id != user.id:
        raise HTTPException(status_code=404, detail="Knowledge base not found")

    kn_agent = await db.get(Agent, kb.agent_id)
    if not kn_agent:
        raise HTTPException(status_code=404, detail="Knowledge base agent not found")

    # Get RAG system prompt
    from sqlalchemy import select as sa_select
    from ..models import SystemSettings
    settings_result = await db.execute(
        sa_select(SystemSettings)
        .where(SystemSettings.active.is_(True))
        .order_by(SystemSettings.update_datetime.desc(), SystemSettings.id.desc())
    )
    settings_rows = settings_result.scalars().all()
    rag_prompt = next(
        (s.setting_value for s in settings_rows if s.setting_name == "rag_prompt"), ""
    )

    # Build or retrieve RAG service (sync, runs in thread)
    service_key = (user.id, payload.kb_id)
    if service_key not in _rag_services:
        service = RAGService(kn_agent.url, kb.embedding_model or "nomic-embed-text")
        chunks = service.chunk_text(kb.document_content, kb.chunk_size or 500, kb.chunk_overlap or 50)
        if not chunks:
            raise HTTPException(status_code=400, detail="Document is empty or could not be chunked")
        service.build_index(chunks)
        _rag_services[service_key] = service
    else:
        service = _rag_services[service_key]

    try:
        relevant_chunks = service.retrieve(payload.query, k=3)
        chunk_texts = [c[0] for c in relevant_chunks]
        augmented_prompt = service.augment_prompt(payload.query, chunk_texts, rag_prompt)
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Ollama connection error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG error: {e}")

    ollama_url = f"{agent.url}/api/chat"
    ollama_payload = {
        "model": payload.model_name,
        "messages": [{"role": "user", "content": augmented_prompt}],
        "stream": True,
    }

    async def generate():
        # Send metadata first
        metadata = {
            "type": "metadata",
            "relevant_chunks_text": [c[0] for c in relevant_chunks],
            "relevant_chunks_distance": [str(c[1]) for c in relevant_chunks],
        }
        yield json.dumps(metadata) + "\n"

        async with httpx.AsyncClient(timeout=120) as client:
            async with client.stream("POST", ollama_url, json=ollama_payload) as resp:
                if resp.status_code != 200:
                    error_text = await resp.aread()
                    yield json.dumps({"error": f"Ollama error {resp.status_code}: {error_text.decode()}"}) + "\n"
                    return
                async for line in resp.aiter_lines():
                    if line:
                        yield line + "\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.delete("/{kb_id}")
async def delete_knowledge_base(
    kb_id: int,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    kb = await db.get(KnowledgeBase, kb_id)
    if not kb:
        raise HTTPException(status_code=404, detail="Knowledge base not found")
    if kb.user_id != user.id:
        raise HTTPException(status_code=403, detail="Unauthorized")

    # Clear from cache
    service_key = (user.id, kb_id)
    _rag_services.pop(service_key, None)

    await db.delete(kb)
    await db.commit()
    return {"success": True}
