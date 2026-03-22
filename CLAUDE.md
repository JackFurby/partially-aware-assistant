# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal AI assistant application with chat memory and RAG support. The stack is a **FastAPI** JSON API backend + **SvelteKit** SPA frontend in a monorepo.

## Project Structure

```
partially-aware-assistant/
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI app factory, CORS, mounts routers
│   │   ├── database.py         # Async SQLAlchemy engine and session factory
│   │   ├── models.py           # SQLAlchemy models (fastapi-users compatible)
│   │   ├── schemas.py          # Pydantic request/response schemas
│   │   ├── auth.py             # fastapi-users configuration (JWT cookies)
│   │   ├── config.py           # Settings (env vars via pydantic-settings)
│   │   ├── routers/
│   │   │   ├── agent.py        # Chat endpoints + SSE streaming
│   │   │   ├── settings.py     # Agents, models, tags, system settings
│   │   │   ├── users.py        # User management (admin)
│   │   │   └── rag.py          # RAG upload, query, delete
│   │   └── services/
│   │       └── rag_service.py  # FAISS-based RAG service
│   ├── migrations/             # Alembic migrations
│   ├── alembic.ini
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── +layout.svelte         # Auth guard, sidebar, nav
│   │   │   ├── +page.svelte           # Redirect to /chat
│   │   │   ├── login/+page.svelte
│   │   │   ├── chat/+page.svelte      # Main chat UI with SSE streaming
│   │   │   ├── settings/+page.svelte  # Agent/model/tag config, system settings
│   │   │   ├── rag/+page.svelte       # RAG upload + query
│   │   │   └── users/
│   │   │       ├── +page.svelte       # User list (admin)
│   │   │       └── [id]/+page.svelte  # User detail + role toggle
│   │   ├── lib/
│   │   │   ├── api.ts         # Fetch wrapper for all API calls
│   │   │   ├── stores.ts      # Svelte writable stores (user, chats)
│   │   │   └── types.ts       # TypeScript types matching Pydantic schemas
│   │   └── app.html
│   ├── package.json
│   ├── svelte.config.js
│   └── vite.config.ts         # Dev proxy: /api and /auth → localhost:8000
├── app.db                      # SQLite database (copy here before running backend)
└── CLAUDE.md
```

## Development Setup

### Backend

```bash
cd backend
conda activate partially-aware-assistant
pip install -r requirements.txt
```

Copy the database to the backend directory:
```bash
cp ../app.db ./app.db   # from backend/
```

### Frontend

```bash
cd frontend
npm install
```

## Running the Application

Start the FastAPI backend (port 8000):
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

Start the SvelteKit frontend (port 5173):
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`. The Vite dev server proxies `/api` and `/auth` to `localhost:8000`.

## Database Commands (Alembic)

All commands run from `backend/`:

Apply pending migrations:
```bash
cd backend
alembic upgrade head
```

Create a new migration:
```bash
alembic revision --autogenerate -m "message here"
```

## First-time Migration (Flask → FastAPI)

If you have an existing `app.db` from the Flask version, run the data migration to convert the User model:

```bash
cp app.db backend/app.db
cd backend
alembic upgrade head
```

This migration (`b1c2d3e4f5a6`) will:
- Add `hashed_password`, `is_active`, `is_superuser`, `is_verified` to the user table
- Copy `password` → `hashed_password`
- Mark users with the admin role as `is_superuser=True`
- Drop the old Flask-Security columns and `role`/`roles_users`/`user_settings` tables

After migration, existing users can log in with their unchanged passwords.

## Architecture Overview

### Tech Stack

- **Backend**: FastAPI + fastapi-users + async SQLAlchemy (aiosqlite) + httpx
- **Frontend**: SvelteKit + TypeScript
- **Auth**: JWT stored in httpOnly cookies (fastapi-users)
- **Database**: SQLite (default) or PostgreSQL (set `DATABASE_URL`)
- **RAG**: FAISS + Ollama embeddings

### Auth Flow

1. Frontend posts `username`/`password` form to `/auth/jwt/login` (fastapi-users)
2. fastapi-users sets an httpOnly `auth` cookie containing the JWT
3. All subsequent requests send the cookie automatically (`credentials: 'include'`)
4. `GET /users/me` returns the current user; 401 redirects to `/login`

### Streaming Architecture

Chat and RAG responses use NDJSON streaming:
1. Frontend POSTs to `/api/chat/send_message` (JSON body)
2. Backend first yields `{"type": "chat_id", "chat_id": N}` for new chats
3. Then proxies Ollama's streaming NDJSON response line-by-line
4. Frontend accumulates content, then POSTs to `/api/chat/save_message` with final message + metrics

### Session State Elimination

All state previously in Flask sessions is now in the frontend or DB:
- `chat_id` → passed in request body from frontend state
- `chat_history` → reconstructed from DB `Message` records on each request
- `kb_id` → passed in request body
- `rag_services` cache → stored in `app.state` dict keyed by `(user_id, kb_id)`

### Admin Access

Users with `is_superuser=True` have admin access. Admin is required for:
- Creating/managing agents and models
- User management
- System settings

Use `POST /api/users/{id}/toggle_admin` to toggle admin status (admin only; cannot self-modify).

## Configuration

Backend configuration via environment variables (or `backend/.env`):

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite+aiosqlite:///./app.db` | SQLAlchemy async URL |
| `SECRET_KEY` | `PARTIALLY_AWARE_TEST_KEY` | JWT signing secret |

For PostgreSQL: `DATABASE_URL=postgresql+asyncpg://user:pass@host/db`

For Alembic (sync), update `sqlalchemy.url` in `backend/alembic.ini`.

## API Reference

All endpoints prefixed with `/api`. Auth endpoints at `/auth/jwt/`:

| Method | Path | Description |
|---|---|---|
| POST | `/auth/jwt/login` | Login (form data: username, password) |
| POST | `/auth/jwt/logout` | Logout |
| GET | `/users/me` | Current user |
| GET | `/api/chats` | List user's chats |
| POST | `/api/chats` | Create chat |
| GET | `/api/chats/{id}` | Chat + messages |
| DELETE | `/api/chats/{id}` | Delete chat |
| POST | `/api/chat/send_message` | Stream chat response |
| POST | `/api/chat/save_message` | Save assistant message |
| GET | `/api/agents` | List agents |
| POST | `/api/agents` | Create agent (admin) |
| GET | `/api/agents/{id}/models` | List models for agent |
| POST | `/api/agents/{id}/models` | Add model (admin) |
| POST | `/api/agents/{id}/models/tags` | Add model tags (admin) |
| GET | `/api/agents/{id}/pull/{model}` | Pull model from Ollama (SSE) |
| GET | `/api/system/settings` | Get system settings |
| POST | `/api/system/settings` | Update system settings (admin) |
| GET | `/api/users` | List users (admin) |
| POST | `/api/users` | Create user (admin) |
| GET | `/api/users/{id}` | Get user |
| POST | `/api/users/{id}/toggle_admin` | Toggle admin (admin) |
| GET | `/api/rag/knowledge_bases` | List user's KBs |
| POST | `/api/rag/upload` | Upload knowledge base |
| POST | `/api/rag/query` | RAG query (SSE stream) |
| DELETE | `/api/rag/{kb_id}` | Delete knowledge base |

FastAPI auto-docs available at `http://localhost:8000/docs`.

## Production Deployment

```bash
# Backend
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Frontend (build first)
cd frontend
npm run build
# Then serve the build/ directory as static files, or use adapter-node
```

In production, serve the SvelteKit build as static files from FastAPI using `StaticFiles`, or deploy them separately. Update `CORS` origins in `backend/app/main.py`.

## Documentation

After any change made to the app the README.md and CLAUDE.md files should be reviewed and updated if required to reflect the changes.

## Writing code and completing prompt requests

Instead of writing all code Claude should ask how it should complete a prompt request. It should have the following options:

1. Behave as normal and plan, design, and execute all development (within the current settings of Clause code)
2. Hold the role of a pair programmer. In this role you will design the changes that need to be made to the app but not implement them. Instead you will detail a high level overview and allow for feedback. You will go over each section of code to implement 1 and a time. At each section you will provide an overview of what needs to be done taking into account the changes made so far (read the updated application files). You can offer the option to do the following:
  a. Implement that section of code
  b. Implement boilerplate code
  c. Provide details on what needs to be implemented but do not implement it.
3. Other. Allow the human to deside how claude should behave
