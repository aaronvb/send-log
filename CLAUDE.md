# Send Log

A climbing send tracker for logging bouldering problems and routes.

## Tech Stack

- TypeScript
- Next.js (App Router)
- Tailwind CSS
- React (useState for local state management)

## Architecture

- Single-page application, no routing needed
- No authentication, no database
- All state managed client-side with useState
- Seeded with sample data on load

## Conventions

- Use functional components with hooks
- Prefer named exports
- Use TypeScript interfaces for data shapes, not types
- Colocate component files in `components/` directory
- Keep components small and focused — one responsibility per file
- Use Tailwind utility classes directly, no custom CSS files
- Dark theme throughout — use dark backgrounds with light text

## Climbing Domain

- Grades follow the V-scale for bouldering: V0 through V10
- A "send" means the climber completed the problem successfully
- A "project" is a problem the climber is working on but hasn't sent yet
- Attempts count all tries, including the successful send

## Code Style

- No semicolons
- Single quotes for strings
- Arrow functions preferred
- Destructure props in function signatures
