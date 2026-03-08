# Tasks: Climb Tracker

**Input**: Design documents from `/specs/001-climb-tracker/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffold the Next.js project and configure foundational files

- [x] T001 Scaffold Next.js project with `npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*"`
- [x] T002 Configure `next.config.js` to set `output: 'standalone'` for Docker compatibility
- [x] T003 [P] Replace default content in `app/globals.css` with Tailwind directives only (remove create-next-app boilerplate styles)
- [x] T004 [P] Configure `app/layout.tsx` with dark theme body classes (`bg-gray-950 text-gray-100`), app title "Send Log", and globals.css import
- [x] T005 [P] Create `data/seed-climbs.ts` with `Climb` interface and `SEED_CLIMBS` array (8-10 entries spanning V0-V10, dates over past 2-3 weeks, mix of sent/unsent, varied attempts)
- [x] T006 Clean up create-next-app boilerplate from `app/page.tsx` (remove default JSX, keep as minimal placeholder)

**Checkpoint**: Project runs with `npm run dev`, shows empty dark-themed page at localhost:3000

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared data and the page-level state that all user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Implement `app/page.tsx` as `'use client'` component with `useState<Climb[]>` initialized from `SEED_CLIMBS`, sorted by date descending. Include `addClimb` handler that generates an id, adds the climb, and re-sorts. Compose placeholder slots for ClimbForm and ClimbList.

**Checkpoint**: Page loads with seed data in state (verifiable via React DevTools). Foundation ready for component implementation.

---

## Phase 3: User Story 1 - View Climb Log (Priority: P1) MVP

**Goal**: Display all logged climbs in a list sorted by most recent date first, each showing name, grade, attempts, sent status, and date.

**Independent Test**: Load the app and verify 8-10 sample climbs appear in reverse chronological order with all five data points visible.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `components/ClimbCard.tsx` — named export, accepts `{ climb }` prop (destructured), displays name, grade, attempts count, sent/project status label, and formatted date. Use Tailwind dark card styling (`bg-gray-800`, light text). Handle long names with truncation or wrapping.
- [x] T009 [P] [US1] Create `components/ClimbList.tsx` — named export, accepts `{ climbs }` prop (destructured), maps over array rendering `ClimbCard` for each entry. Renders as a vertical stack with gap spacing.
- [x] T010 [US1] Wire `ClimbList` into `app/page.tsx` — pass sorted `climbs` state array to `ClimbList` component.

**Checkpoint**: App displays 8-10 seed climbs sorted by date descending. Each entry shows all five data points. User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Add New Climb (Priority: P1)

**Goal**: Provide a form to log new climbs with name, grade, attempts, sent status, and date fields. New entries appear in the correct sorted position.

**Independent Test**: Fill out the form, submit, and verify the new climb appears in the list at the correct chronological position. Verify form resets after submission.

### Implementation for User Story 2

- [x] T011 [US2] Create `components/ClimbForm.tsx` — named export, accepts `{ onAdd }` prop (destructured). Implement controlled form with: name text input (required), grade dropdown (V0-V10), attempts number input (min 1, default 1), sent checkbox (default unchecked), date input (default today's date YYYY-MM-DD). On submit: validate, call `onAdd` with form data (without id), reset all fields to defaults. Use Tailwind dark form styling with visible input borders.
- [x] T012 [US2] Wire `ClimbForm` into `app/page.tsx` — pass `addClimb` handler as `onAdd` prop. Place form above the climb list per UI contract layout.

**Checkpoint**: User can fill out and submit the form. New climb appears at correct sorted position. Form resets to defaults. Validation prevents empty name and attempts < 1. User Story 2 is fully functional and independently testable.

---

## Phase 5: User Story 3 - Visual Distinction Between Sends and Projects (Priority: P2)

**Goal**: Make sent climbs and project climbs visually distinct at a glance through color and/or indicators.

**Independent Test**: Load the app with sample data (mix of sent/unsent). Verify sent and project entries are immediately distinguishable without reading text.

### Implementation for User Story 3

- [x] T013 [US3] Update `components/ClimbCard.tsx` — add visual distinction between sent and project climbs. Sent: green accent (e.g., `border-green-500`, `text-green-400`) with check mark or "Sent" badge. Project: yellow/amber accent (e.g., `border-yellow-500`, `text-yellow-400`) with "Project" badge. Distinction must be scannable at a glance per theme contract.

**Checkpoint**: Sent and project climbs are visually distinct. Sample data shows a clear mix. User Story 3 is fully functional and independently testable.

---

## Phase 6: Docker & Deployment Infrastructure

**Purpose**: Containerize the app so users can run it with only Docker installed

- [x] T014 [P] Create `.dockerignore` at repository root — exclude `node_modules`, `.next`, `.git`, `specs/`, `.specify/`, `*.md` (except Makefile-related)
- [x] T015 [P] Create `Dockerfile` at repository root — multi-stage build: (1) `deps` stage installs node_modules from package.json/package-lock.json, (2) `builder` stage copies source and runs `npm run build`, (3) `runner` stage uses Node.js Alpine, copies standalone output + public + static assets, exposes port 3000, starts with `node server.js`
- [x] T016 [P] Create `docker-compose.yml` at repository root — define `send-log` service with build context `.`, port mapping `3000:3000`, container name `send-log`
- [x] T017 Create `Makefile` at repository root — `build` target runs `docker compose build`, `run` target runs `docker compose up`

**Checkpoint**: `make build` builds the Docker image successfully. `make run` starts the container and app is accessible at localhost:3000.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and validation

- [x] T018 Remove any remaining create-next-app boilerplate (unused images in `public/`, default favicon if replaced, etc.)
- [x] T019 Validate full app workflow: `make build` then `make run`, verify app loads with seed data, add a new climb, confirm sorted position and visual distinction
- [x] T020 Run `npx tsc --noEmit` to verify zero TypeScript errors
- [x] T021 Run `npm run lint` to verify zero linting errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion. Can run in parallel with US1 but ClimbForm placement in page.tsx depends on T010 completing first.
- **User Story 3 (Phase 5)**: Depends on T008 (ClimbCard exists) from US1
- **Docker (Phase 6)**: Depends on all user stories being complete (needs a buildable app)
- **Polish (Phase 7)**: Depends on all previous phases

### User Story Dependencies

- **User Story 1 (P1)**: Requires Phase 2 only — no dependencies on other stories
- **User Story 2 (P1)**: Requires Phase 2 only — independent of US1 for component creation, but page wiring (T012) should follow T010
- **User Story 3 (P2)**: Requires ClimbCard (T008) to exist — enhances it with visual distinction

### Within Each User Story

- Components marked [P] can be created in parallel (different files)
- Wiring into page.tsx must follow component creation
- Story complete before moving to next priority

### Parallel Opportunities

- T003, T004, T005 can all run in parallel (different files, no dependencies)
- T008, T009 can run in parallel (ClimbCard and ClimbList are separate files)
- T014, T015, T016 can all run in parallel (different Docker infrastructure files)
- User Stories 1 and 2 component creation (T008/T009 and T011) can overlap

---

## Parallel Example: Phase 1 Setup

```bash
# After T001 and T002 complete, launch in parallel:
Task: "Replace default content in app/globals.css"           # T003
Task: "Configure app/layout.tsx with dark theme"             # T004
Task: "Create data/seed-climbs.ts with Climb interface"      # T005
```

## Parallel Example: User Story 1 Components

```bash
# After Phase 2 completes, launch in parallel:
Task: "Create components/ClimbCard.tsx"                      # T008
Task: "Create components/ClimbList.tsx"                      # T009
```

## Parallel Example: Docker Infrastructure

```bash
# After all user stories complete, launch in parallel:
Task: "Create .dockerignore"                                 # T014
Task: "Create Dockerfile"                                    # T015
Task: "Create docker-compose.yml"                            # T016
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (state + page skeleton)
3. Complete Phase 3: User Story 1 (ClimbCard + ClimbList)
4. **STOP and VALIDATE**: Verify 8-10 climbs display sorted by date
5. App shows data — MVP is usable

### Incremental Delivery

1. Setup + Foundational → project runs, dark page
2. Add User Story 1 → climb list visible → **MVP**
3. Add User Story 2 → form works → users can add climbs
4. Add User Story 3 → visual polish → sent vs. project distinction
5. Add Docker → containerized → users need only Docker to run
6. Polish → clean, validated, zero errors

### Recommended Execution Order (Solo Developer)

Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3) → Phase 6 (Docker) → Phase 7 (Polish)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks — testing was not requested in the feature specification
- Constitution compliance: all components use named exports, functional components, destructured props, Tailwind only, no semicolons, single quotes, arrow functions, interfaces (not types)
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
