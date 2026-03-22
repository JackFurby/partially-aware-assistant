# partially-aware-assistant
A personal AI assistant with memory

## AI Disclosure

This project is developed with AI-powered coding assistants as part of the development workflow. Claude Code is used as a pair programmer — designing, implementing, and iterating on features across the full stack. The maintainer directs the architecture and goals, reviews all changes, and takes full responsibility for the codebase. AI-generated code is tested and modified as needed before being committed.

## Stack

- **Backend**: FastAPI + fastapi-users + async SQLAlchemy + httpx
- **Frontend**: SvelteKit + TypeScript
- **Auth**: JWT in httpOnly cookies
- **RAG**: FAISS + Ollama embeddings

## Setup

### Backend

```sh
conda create -n partially-aware-assistant python=3.11
conda activate partially-aware-assistant
cd backend
pip install -r requirements.txt
cp .env.example .env
```

### Frontend

```sh
cd frontend
npm install
```

### Database (first time)

If migrating from the Flask version, copy the existing database and run migrations:

```sh
cp app.db backend/app.db
cd backend
alembic upgrade head
```

For a fresh install, create the database:

```sh
cd backend
alembic upgrade head
```

## Running

Start the backend (port 8000):
```sh
cd backend
uvicorn app.main:app --reload --port 8000
```

Start the frontend (port 5173):
```sh
cd frontend
npm run dev
```

Open `http://localhost:5173`. API docs available at `http://localhost:8000/docs`.

## Configuration

Backend configuration via environment variables or `backend/.env`:

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite+aiosqlite:///./app.db` | Database URL |
| `SECRET_KEY` | `PARTIALLY_AWARE_TEST_KEY` | JWT signing secret (change in production) |

## Deploying the application

1. Build the frontend:

   ```sh
   cd frontend
   npm run build
   ```

2. Set environment variables on the server:

   ```sh
   export DATABASE_URL='postgresql+asyncpg://<USER>:<PASSWORD>@<HOST>/<DB>'
   export SECRET_KEY='your-secret-key'
   ```

3. Apply database migrations:

   ```sh
   cd backend
   alembic upgrade head
   ```

4. Start the backend:

   ```sh
   cd backend
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

5. Serve the SvelteKit build from a web server or reverse proxy pointed at `frontend/build/`.
