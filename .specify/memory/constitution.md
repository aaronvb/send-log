<!--
  Sync Impact Report
  ==================
  Version change: 1.0.0 -> 2.0.0
  Modified principles:
    - "I. Simplicity-First" -> "I. Workshop Demo Simplicity"
      (strengthened: explicit workshop context, no production concerns)
    - "II. Client-Side Only" -> "II. Client-Side Only"
      (unchanged in intent, tightened wording)
    - "III. Dark Tailwind UI" -> "III. Dark Tailwind UI"
      (unchanged)
    - "IV. Component Discipline" -> "IV. Component Discipline"
      (added explicit no-class-components rule)
    - "V. Domain Integrity" removed
      (not requested by user; climbing domain context
       remains in CLAUDE.md but is not a constitutional principle)
  Added sections: None
  Removed sections:
    - "V. Domain Integrity" principle removed
    - "Tech Stack Constraints" merged into principles
    - "Code Style" merged into "V. TypeScript Code Style"
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
    - .specify/templates/spec-template.md ✅ no changes needed
    - .specify/templates/tasks-template.md ✅ no changes needed
    - .specify/templates/commands/*.md ✅ no command files exist
  Follow-up TODOs: None
-->

# Send Log Constitution

## Core Principles

### I. Workshop Demo Simplicity

- This is a workshop demo app, NOT production software
- The application MUST remain a single-page application with
  no routing
- No authentication, no database, no external services
- No over-engineering: no error boundaries, no loading states,
  no analytics, no feature flags
- YAGNI: if a feature is not explicitly requested, it MUST NOT
  be added

### II. Client-Side Only

- All state MUST be managed with React `useState` only
- No external state libraries (no Redux, Zustand, Jotai, etc.)
- No API calls, no backend services, no server-side data fetching
- No database, no ORM, no persistence beyond the browser session
- New features MUST NOT introduce server dependencies or
  external service integrations

### III. Dark Tailwind UI

- All styling MUST use Tailwind CSS utility classes directly
- No custom CSS files, no CSS modules, no styled-components,
  no inline style objects
- The application MUST use a dark theme throughout: dark
  backgrounds with light text
- UI changes MUST maintain dark theme consistency across all
  components

### IV. Component Discipline

- All components MUST be functional components with hooks
- Class components MUST NOT be used under any circumstances
- Each component file MUST have a single responsibility
- Components MUST use named exports (no default exports)
- Component files MUST be colocated in the `components/`
  directory
- Props MUST be destructured in function signatures
- Data shapes MUST be defined as TypeScript `interface`
  declarations, not `type` aliases

### V. TypeScript Code Style

- TypeScript MUST be used in strict mode
- No semicolons
- Single quotes for strings
- Arrow functions preferred over function declarations
- Props MUST be destructured in function signatures
- These rules MUST be consistent across all source files
- The tech stack is TypeScript, Next.js (App Router), Tailwind
  CSS, and React — no additional frameworks or libraries
  without justification

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

**Version**: 2.0.0 | **Ratified**: 2026-03-07 | **Last Amended**: 2026-03-07
