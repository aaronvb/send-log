<!--
  Sync Impact Report
  ==================
  Version change: (new) -> 1.0.0
  Modified principles: N/A (initial ratification)
  Added sections:
    - Core Principles (5): Simplicity-First, Client-Side Only,
      Dark Tailwind UI, Component Discipline, Domain Integrity
    - Tech Stack Constraints
    - Code Style
    - Governance
  Removed sections: None
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
    - .specify/templates/spec-template.md ✅ no changes needed
    - .specify/templates/tasks-template.md ✅ no changes needed
    - .specify/templates/commands/*.md ✅ no command files exist
  Follow-up TODOs: None
-->

# Send Log Constitution

## Core Principles

### I. Simplicity-First

- The application MUST remain a single-page application with no routing
- No authentication, no database, and no server-side state
- All state MUST be managed client-side with React `useState`
- The app MUST be seeded with sample data on load
- YAGNI: features MUST NOT be added speculatively

### II. Client-Side Only

- All data and logic MUST reside in the browser
- No API calls, no backend services, no server-side rendering
  of dynamic data
- State persistence beyond the session is explicitly out of scope
- New features MUST NOT introduce server dependencies

### III. Dark Tailwind UI

- All styling MUST use Tailwind CSS utility classes directly
- No custom CSS files, no CSS modules, no styled-components
- The application MUST use a dark theme throughout: dark
  backgrounds with light text
- UI changes MUST maintain dark theme consistency across all
  components

### IV. Component Discipline

- All components MUST be functional components with hooks
- Each component file MUST have a single responsibility
- Components MUST use named exports (no default exports)
- Component files MUST be colocated in the `components/` directory
- Props MUST be destructured in function signatures
- Data shapes MUST be defined as TypeScript `interface`
  declarations, not `type` aliases

### V. Domain Integrity

- Bouldering grades MUST follow the V-scale: V0 through V10
- A "send" MUST mean the climber completed the problem
  successfully
- A "project" MUST mean a problem the climber is working on
  but has not sent yet
- Attempts MUST count all tries, including the successful send
- Domain terminology MUST be used consistently throughout
  the codebase

## Tech Stack Constraints

- **Language**: TypeScript (strict mode)
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS (utility classes only)
- **State**: React `useState` (no external state libraries)
- New dependencies MUST be justified; the default is to use
  what is already in the stack
- No ORM, no database driver, no HTTP client libraries

## Code Style

- No semicolons
- Single quotes for strings
- Arrow functions preferred over function declarations
- Props MUST be destructured in function signatures
- These rules MUST be consistent across all source files

## Governance

- This constitution supersedes all ad-hoc conventions
- Amendments MUST be documented with a version bump,
  rationale, and updated date
- Versioning follows semver: MAJOR for principle
  removals/redefinitions, MINOR for additions/expansions,
  PATCH for clarifications
- All feature specs and implementation plans MUST pass a
  constitution compliance check before implementation begins
- Complexity beyond these principles MUST be justified in a
  Complexity Tracking table in the implementation plan

**Version**: 1.0.0 | **Ratified**: 2026-03-07 | **Last Amended**: 2026-03-07
