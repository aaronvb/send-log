# Quickstart: Climb Tracker

**Feature Branch**: `001-climb-tracker`

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- make (pre-installed on macOS/Linux)

## Run with Docker (recommended)

```bash
# Build the Docker image
make build

# Run the container
make run
```

The app runs at `http://localhost:3000`.

## Local Development (requires Node.js)

If you need to develop locally without Docker:

```bash
# Prerequisites: Node.js 18+, npm
npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*"
npm run dev
```

## Project Structure

```
send-log/
├── app/
│   ├── layout.tsx          # Root layout — dark theme body, global CSS
│   ├── page.tsx            # Main page — 'use client', owns all state
│   └── globals.css         # Tailwind directives
├── components/
│   ├── ClimbList.tsx       # Renders sorted list of climbs
│   ├── ClimbCard.tsx       # Single climb entry display
│   └── ClimbForm.tsx       # Form to add a new climb
├── data/
│   └── seed-climbs.ts      # Seed data + Climb interface
├── Dockerfile              # Multi-stage build for production container
├── docker-compose.yml      # Orchestrates container: port mapping, config
├── Makefile                # make build, make run (delegates to docker compose)
├── .dockerignore           # Exclude non-essential files from Docker context
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── package.json
```

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Entry point. Manages `useState<Climb[]>`, passes data to children |
| `components/ClimbList.tsx` | Maps over climbs array, renders ClimbCard for each |
| `components/ClimbCard.tsx` | Displays a single climb's details with send/project visual distinction |
| `components/ClimbForm.tsx` | Controlled form with validation, calls onAdd callback |
| `data/seed-climbs.ts` | Exports `Climb` interface and `SEED_CLIMBS` array |
| `Dockerfile` | Multi-stage build: install deps, build app, run standalone |
| `docker-compose.yml` | Defines service, port mapping (3000:3000), container name |
| `Makefile` | `make build` and `make run` targets delegating to `docker compose` |

## Development Workflow

```bash
# Build and run via Docker (primary workflow)
make build
make run

# Local dev server with hot reload (requires Node.js)
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```
