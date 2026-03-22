from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import auth_backend, fastapi_users
from .routers import agent, rag, settings, users

app = FastAPI(title="Partially Aware Assistant API")

# ── CORS ─────────────────────────────────────────────────────────────────────
# In production, serve the SvelteKit build as static files instead.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Auth routes (fastapi-users) ───────────────────────────────────────────────
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

# ── Application routers ───────────────────────────────────────────────────────
app.include_router(agent.router)
app.include_router(settings.router)
app.include_router(users.router)
app.include_router(rag.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
