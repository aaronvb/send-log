# Research: Climb Tracker

**Feature Branch**: `001-climb-tracker`
**Date**: 2026-03-07

## Research Summary

No NEEDS CLARIFICATION items existed — the user fully specified the tech stack
and feature requirements. Research focused on confirming best practices for the
chosen stack.

---

## R1: Next.js App Router for Single-Page Application

**Decision**: Use Next.js App Router with a single `app/page.tsx` entry point

**Rationale**:
- App Router is the default for new Next.js projects (v14+)
- For a single-page app with no routing, only `app/page.tsx` and `app/layout.tsx`
  are needed
- `layout.tsx` handles the root HTML structure, dark theme body classes, and
  global CSS import
- No additional route files or folders needed

**Alternatives considered**:
- Pages Router: Legacy approach, App Router is the current standard
- Vite + React: Simpler but loses Next.js tooling that comes free with
  create-next-app; user explicitly requested Next.js

---

## R2: Client Component Strategy

**Decision**: Mark `app/page.tsx` as `'use client'` and keep all state at the
page level, passing props down to child components

**Rationale**:
- Since the entire app is client-side with useState, the simplest approach is
  marking the page component as a client component
- All child components automatically become client components
- State lives in one place (page), child components receive data and callbacks
  via props
- No need for context providers or state management libraries

**Alternatives considered**:
- Marking only leaf components as `'use client'`: Adds complexity for no benefit
  when the whole page is interactive
- React Context: Over-engineering for a flat component tree with one state owner

---

## R3: Seed Data Management

**Decision**: Create a separate `data/seed-climbs.ts` file exporting the seed
data array

**Rationale**:
- Separating data from components keeps components focused on rendering
- A dedicated data file makes the seed data easy to find and modify
- The data file can also export the `Climb` interface used across components

**Alternatives considered**:
- Inline in page component: Clutters the main component file
- JSON file: Loses TypeScript type safety and requires import gymnastics

---

## R4: Form Handling Pattern

**Decision**: Use controlled form inputs with individual useState hooks per
field, with native HTML form submission via `onSubmit`

**Rationale**:
- Constitution mandates useState only — no external form libraries
- Controlled inputs provide predictable form state and easy reset after
  submission
- Native HTML validation attributes (`required`, `min`) handle basic validation
- `onSubmit` with `preventDefault` keeps everything client-side

**Alternatives considered**:
- Server Actions: Not applicable — no server, client-side only
- Uncontrolled inputs with refs: Less predictable, harder to reset
- React Hook Form / Formik: Constitution prohibits external libraries

---

## R5: Testing Strategy

**Decision**: No test runner included by default; defer testing setup to
implementation phase if needed

**Rationale**:
- create-next-app does not ship a test runner
- Constitution emphasizes simplicity — this is a workshop demo
- User input says "only what comes with create-next-app plus Tailwind"
- Adding Jest/Vitest would introduce additional dependencies beyond the
  minimal constraint

**Alternatives considered**:
- Jest + React Testing Library: Standard but adds dependencies
- Vitest: Faster but still an additional dependency
- Playwright: E2E testing, higher complexity

---

## R6: Project Scaffolding

**Decision**: Use `npx create-next-app@latest` with TypeScript, Tailwind CSS,
App Router, and no `src/` directory

**Rationale**:
- create-next-app provides all required config files out of the box
- No `src/` directory keeps the structure flat and simple for a small app
- Components go in a top-level `components/` directory per constitution
- Data/seed files go in a top-level `data/` directory

**Alternatives considered**:
- `src/` directory: Adds nesting depth for no benefit in a small project
- Manual setup: Error-prone and unnecessary when create-next-app handles it

---

## R7: Docker Containerization

**Decision**: Use a multi-stage Dockerfile with Node.js Alpine base and Next.js
standalone output mode

**Rationale**:
- Multi-stage build keeps the final image small (only production artifacts)
- Next.js `output: 'standalone'` in `next.config.js` produces a self-contained
  server bundle that doesn't need `node_modules` at runtime
- Three stages: (1) install dependencies, (2) build the app, (3) copy standalone
  output into a minimal runner image
- Node.js Alpine is the standard lightweight base for Next.js containers
- Users only need Docker installed — no Node.js, no npm

**Alternatives considered**:
- Single-stage Dockerfile: Simpler but produces a much larger image (~1GB vs
  ~200MB) because it includes all dev dependencies and build artifacts
- nginx static export: Next.js `output: 'export'` could produce static files
  served by nginx, but this loses server-side rendering capabilities and the
  standard Next.js dev experience

---

## R8: Docker Compose for Container Orchestration

**Decision**: Use `docker-compose.yml` to define the service, port mapping, and
container configuration

**Rationale**:
- Declarative YAML defines port forwarding (`3000:3000`), container name, and
  build context in one place
- Avoids users needing to remember `docker run` flags
- `docker compose up --build` handles both build and run in one command
- Standard pattern even for single-service apps — keeps container config
  out of the Makefile and in a purpose-built file
- Easy to extend later if services are added (not planned, but zero cost)

**Alternatives considered**:
- Raw `docker run` flags in Makefile: Works but scatters container config
  across Makefile targets; harder to read and maintain
- Environment-specific scripts: Less portable, more files to manage

---

## R9: Makefile for Docker Ergonomics

**Decision**: Provide a Makefile with `make build` and `make run` targets that
delegate to `docker compose`

**Rationale**:
- Users type `make run` instead of remembering `docker compose` subcommands
- `make build` wraps `docker compose build`
- `make run` wraps `docker compose up`
- Makefile is universally available on macOS/Linux and keeps commands
  discoverable at the repo root

**Alternatives considered**:
- Shell scripts: Less standard, require `chmod +x`, clutters the root
- npm scripts: Defeats the purpose — users would need npm installed
- Direct `docker compose` only: Works but `make` is shorter and more
  discoverable for newcomers
