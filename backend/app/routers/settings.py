import httpx
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from ..auth import current_active_user, require_admin
from ..database import get_async_session
from ..models import Agent, Model, ModelTag, SystemSettings, User
from ..schemas import (
    AddModelRequest, AddTagRequest, AgentCreate, AgentOut,
    ModelOut, SystemSettingsOut, SystemSettingsUpdate,
)

router = APIRouter(prefix="/api", tags=["settings"])


@router.get("/agents", response_model=list[AgentOut])
async def get_agents(
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(select(Agent))
    return result.scalars().all()


@router.post("/agents", response_model=AgentOut)
async def create_agent(
    payload: AgentCreate,
    user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    agent = Agent(name=payload.name, url=payload.url, user_id=user.id)
    db.add(agent)
    try:
        await db.commit()
        await db.refresh(agent)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return agent


@router.get("/agents/{agent_id}", response_model=AgentOut)
async def get_agent(
    agent_id: int,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    agent = await db.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent


@router.post("/agents/{agent_id}/models", response_model=ModelOut)
async def add_model(
    agent_id: int,
    payload: AddModelRequest,
    user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    agent = await db.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    model = Model(agent_id=agent_id, model_name=payload.model_name)
    db.add(model)
    try:
        await db.commit()
        await db.refresh(model)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return model


@router.post("/agents/{agent_id}/models/tags")
async def add_model_tags(
    agent_id: int,
    payload: AddTagRequest,
    user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(
        select(Model)
        .where(Model.agent_id == agent_id, Model.model_name == payload.model_name)
        .options(selectinload(Model.tags))
    )
    model = result.scalar_one_or_none()
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")

    existing_tag_names = {t.name for t in model.tags}
    for tag_name in payload.tags:
        if tag_name not in existing_tag_names:
            model.tags.append(
                ModelTag(agent_id=agent_id, model_name=payload.model_name, name=tag_name)
            )
    try:
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return {"success": True}


@router.get("/agents/{agent_id}/pull/{model_name}")
async def pull_model(
    agent_id: int,
    model_name: str,
    user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    agent = await db.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    async def generate():
        async with httpx.AsyncClient(timeout=600) as client:
            async with client.stream(
                "POST", f"{agent.url}/api/pull", json={"model": model_name}
            ) as resp:
                async for line in resp.aiter_lines():
                    if line:
                        yield f"data: {line}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.get("/system/settings", response_model=SystemSettingsOut)
async def get_system_settings(
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(
        select(SystemSettings)
        .where(SystemSettings.active.is_(True))
        .order_by(
            SystemSettings.setting_name,
            SystemSettings.update_datetime.desc(),
            SystemSettings.id.desc(),
        )
    )
    settings_rows = result.scalars().all()
    latest: dict = {}
    for row in settings_rows:
        if row.setting_name not in latest:
            latest[row.setting_name] = row.setting_value
    return SystemSettingsOut(rag_prompt=latest.get("rag_prompt"))


@router.post("/system/settings", response_model=SystemSettingsOut)
async def update_system_settings(
    payload: SystemSettingsUpdate,
    user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    # Deactivate all existing rag_prompt settings
    result = await db.execute(
        select(SystemSettings).where(
            SystemSettings.setting_name == "rag_prompt",
            SystemSettings.active.is_(True),
        )
    )
    for row in result.scalars().all():
        row.active = False

    new_setting = SystemSettings(
        user_id=user.id,
        setting_name="rag_prompt",
        setting_value=payload.rag_prompt,
        active=True,
    )
    db.add(new_setting)
    await db.commit()
    return SystemSettingsOut(rag_prompt=payload.rag_prompt)
