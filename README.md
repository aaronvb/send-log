# Send Log — Spec-Kit Workshop Demo

A climbing send tracker built with Next.js, React, and Tailwind CSS. This project serves as the starting point for a hands-on **Spec-Kit** workshop where we'll use Claude to spec, plan, and implement new features.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed and running
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-org>/send-log.git
cd send-log
```

### 2. Build and run

```bash
make run
```

This builds the Docker image and starts the app. Once it's running, open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the Send Log app with a form to add climbs and a list of sample climbs pre-loaded.

### 3. Open Claude Code

In a separate terminal, from the project root:

```bash
claude
```

## Workshop Features

We'll implement up to two features using the Spec-Kit workflow. Each feature follows the same four-step cycle: **specify → plan → tasks → implement**.

---

### Feature 1: Personal Best

Add a section that highlights the hardest grade the user has sent.

Run these commands in Claude Code, one at a time, waiting for each to complete:

```
/speckit.specify Add a personal best section that highlights the hardest grade the user has sent.
```

```
/speckit.plan Use the existing React state and component structure. No new dependencies. Display the personal best prominently above the climb list and below the climb form.
```

```
/speckit.tasks
```

```
/speckit.implement
```

---

### Feature 2: Session Stats (if time permits)

Add a stats bar showing total climbs, send rate, and total attempts.

```
/speckit.specify Add a stats bar at the top of the page that shows the total number of climbs logged, the overall send rate as a percentage, and the total number of attempts across all climbs.
```

```
/speckit.plan Use the existing React state. Compute stats from the climbs array. No new dependencies. Keep it as a single row of stats displayed inline. Display below the climb form.
```

```
/speckit.tasks
```

```
/speckit.implement
```

---

### Feature 3: Send History Graph (if time permits)

Add a bar graph that visualizes how many grades were sent.

```
/speckit.specify Add a sends-by-grade bar chart below the climb form and above the climb list, showing how many climbs have been sent at each grade from V0 through V10. The chart updates reactively when new climbs are added and follows the app's dark theme.
```

```
/speckit.plan Build using existing React state and Climb interface. Filter to sent climbs only and group by V-grade. Use pure CSS/Tailwind for bar rendering — no charting libraries. Display below the climb form and above the climb list.
```

```
/speckit.tasks
```

```
/speckit.implement
```

---

## What is Spec-Kit?

Spec-Kit is a set of Claude Code skills that guide AI-assisted feature development through a structured workflow:

| Step | Command | What it does |
|------|---------|--------------|
| **Specify** | `/speckit.specify` | Creates a detailed feature spec from a natural language description |
| **Plan** | `/speckit.plan` | Generates an implementation plan using the spec and your constraints |
| **Tasks** | `/speckit.tasks` | Breaks the plan into ordered, actionable tasks |
| **Implement** | `/speckit.implement` | Executes the tasks to build the feature |

This workflow keeps AI-driven development predictable and reviewable — you see exactly what will be built before any code is written.

## Project Structure

```
send-log/
  app/
    page.tsx          # Main page — state management and layout
    layout.tsx        # Root layout
    globals.css       # Tailwind imports
  components/
    ClimbForm.tsx     # Form for adding new climbs
    ClimbList.tsx     # Renders the list of climbs
    ClimbCard.tsx     # Individual climb card
  data/
    seed-climbs.ts    # Sample data and Climb interface
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19** with client-side state (useState)
- **Tailwind CSS 4** for styling
- **TypeScript 5**
- **Docker** for containerized builds
