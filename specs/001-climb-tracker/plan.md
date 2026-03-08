# Implementation Plan: Climb Tracker

**Branch**: `001-climb-tracker` | **Date**: 2026-03-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-climb-tracker/spec.md`

## Summary

Build a single-page climbing send tracker using Next.js App Router with
TypeScript and Tailwind CSS. The app displays a list of logged bouldering
climbs (seeded with 8-10 samples) sorted by most recent date, and provides a
form to add new entries. All state is client-side via React useState. Dark
theme throughout. Dockerized with a multi-stage build so users only need
Docker installed — a Makefile provides `make build` and `make run` targets.

## Technical Context

**Language/Version**: TypeScript 5.x (via Next.js)
**Primary Dependencies**: Next.js (App Router), React 19, Tailwind CSS — all from create-next-app
**Storage**: N/A — client-side useState only, no persistence
**Testing**: None by default (create-next-app ships no test runner); defer to implementation
**Target Platform**: Modern desktop and mobile browsers
**Project Type**: Web application (single-page)
**Performance Goals**: Sample data visible within 2 seconds of page load
**Constraints**: No external dependencies beyond create-next-app defaults + Tailwind
**Containerization**: Docker (multi-stage build), Docker Compose (orchestration), Makefile for ergonomic commands
**Scale/Scope**: 1 page, 4 components, 1 data file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Workshop Demo Simplicity | PASS | Single page, no routing, no auth, no DB, no over-engineering. Docker + Makefile simplify setup for workshop users. |
| II. Client-Side Only | PASS | useState only, no API calls. Docker is infrastructure only — no server-side app logic. |
| III. Dark Tailwind UI | PASS | Tailwind utility classes only, dark theme planned |
| IV. Component Discipline | PASS | Functional components, named exports, components/ directory, interfaces for data shapes |
| V. TypeScript Code Style | PASS | Strict mode, no semicolons, single quotes, arrow functions, destructured props |

**Gate result**: PASS — no violations. Docker/Makefile are infrastructure, not app complexity.

### Post-Phase 1 Re-check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Workshop Demo Simplicity | PASS | 4 components + 1 data file + Dockerfile + docker-compose.yml + Makefile. Docker reduces user setup friction. |
| II. Client-Side Only | PASS | Data model uses useState, no persistence layer. Docker serves the same client-side app. |
| III. Dark Tailwind UI | PASS | Theme contract defines dark backgrounds with light text |
| IV. Component Discipline | PASS | ClimbList, ClimbCard, ClimbForm — single responsibility each, named exports, interfaces |
| V. TypeScript Code Style | PASS | Climb interface (not type), code style conventions maintained |

**Post-design gate result**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/001-climb-tracker/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── ui-contract.md   # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout — HTML shell, dark theme body, globals.css import
├── page.tsx             # 'use client' — state owner, composes ClimbForm + ClimbList
└── globals.css          # Tailwind directives (@tailwind base/components/utilities)

components/
├── ClimbList.tsx        # Renders sorted climb array as vertical list of ClimbCards
├── ClimbCard.tsx        # Single climb entry — name, grade, attempts, sent status, date
└── ClimbForm.tsx        # Controlled form — add new climb with validation

data/
└── seed-climbs.ts       # Climb interface + SEED_CLIMBS constant (8-10 entries)

Dockerfile               # Multi-stage build: deps → build → run with standalone output
docker-compose.yml       # Orchestrates container: port mapping, container name, config
Makefile                 # make build, make run targets (delegates to docker compose)
.dockerignore            # Exclude node_modules, .next, .git, specs from Docker context
next.config.js           # Next.js config (standalone output mode)
tsconfig.json            # TypeScript strict mode config (default)
tailwind.config.ts       # Tailwind content paths config (default)
postcss.config.mjs       # PostCSS config for Tailwind (default)
package.json             # Dependencies and scripts
```

**Structure Decision**: Flat structure at repository root (no `src/` directory).
Components in `components/`, data in `data/`, app entry points in `app/`.
Dockerfile, docker-compose.yml, and Makefile at root for containerized workflow.
This is the simplest layout for a single-page app with 3 components, 1 data file,
and Docker support.

## Complexity Tracking

> No violations — table not needed.
