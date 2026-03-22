from fastapi import APIRouter, Depends, HTTPException
from fastapi_users.password import PasswordHelper
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth import current_active_user, require_admin
from ..database import get_async_session
from ..models import User
from ..schemas import UserAdminCreate, UserRead, UserUpdateRequest

router = APIRouter(prefix="/api", tags=["users"])

password_helper = PasswordHelper()


@router.get("/users", response_model=list[UserRead])
async def list_users(
    user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(select(User))
    return result.scalars().all()


@router.get("/users/me", response_model=UserRead)
async def get_current_user(
    current: User = Depends(current_active_user),
):
    return current


@router.get("/users/{user_id}", response_model=UserRead)
async def get_user(
    user_id: int,
    current: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    if current.id != user_id and not current.is_superuser:
        raise HTTPException(status_code=403, detail="Access denied")
    target = await db.get(User, user_id)
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    return target


@router.post("/users", response_model=UserRead)
async def create_user(
    payload: UserAdminCreate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    # Check for duplicate email
    result = await db.execute(select(User).where(User.email == payload.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = password_helper.hash(payload.password)
    new_user = User(
        email=payload.email,
        hashed_password=hashed,
        is_active=True,
        is_verified=True,
        is_superuser=payload.is_superuser,
    )
    db.add(new_user)
    try:
        await db.commit()
        await db.refresh(new_user)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return new_user


@router.patch("/users/{user_id}", response_model=UserRead)
async def update_user(
    user_id: int,
    payload: UserUpdateRequest,
    current: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    if current.id != user_id and not current.is_superuser:
        raise HTTPException(status_code=403, detail="Access denied")
    if current.id == user_id and payload.is_superuser is not None:
        raise HTTPException(status_code=400, detail="Cannot modify your own admin status")
    target = await db.get(User, user_id)
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if payload.email is not None:
        target.email = payload.email
    if payload.password is not None:
        target.hashed_password = password_helper.hash(payload.password)
    if payload.is_superuser is not None:
        target.is_superuser = payload.is_superuser
    if payload.is_active is not None:
        target.is_active = payload.is_active
    await db.commit()
    await db.refresh(target)
    return target
