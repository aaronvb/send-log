# UI Contract: Climb Tracker

**Feature Branch**: `001-climb-tracker`
**Date**: 2026-03-07

## Page Layout

Single page with two sections stacked vertically:

```
┌─────────────────────────────────┐
│           Header                │
│         "Send Log"              │
├─────────────────────────────────┤
│                                 │
│         Add Climb Form          │
│  [name] [grade ▼] [attempts]   │
│  [date] [☐ sent]  [Submit]     │
│                                 │
├─────────────────────────────────┤
│                                 │
│         Climb List              │
│  ┌───────────────────────────┐  │
│  │ Climb Card (most recent)  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ Climb Card                │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ Climb Card (oldest)       │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

## Component Contracts

### ClimbForm

**Props**:
```typescript
interface ClimbFormProps {
  onAdd: (climb: Omit<Climb, 'id'>) => void
}
```

**Behavior**:
- Renders a form with fields: name (text), grade (dropdown), attempts (number),
  sent (checkbox), date (date input)
- Grade dropdown contains options V0 through V10
- Date defaults to today (YYYY-MM-DD format)
- Attempts defaults to 1
- Sent defaults to false (unchecked)
- Validates: name is non-empty, attempts >= 1
- On valid submit: calls `onAdd` with form data, then resets all fields to
  defaults
- On invalid submit: prevents submission (native HTML validation)

### ClimbList

**Props**:
```typescript
interface ClimbListProps {
  climbs: Climb[]
}
```

**Behavior**:
- Receives an already-sorted array of climbs
- Maps each climb to a ClimbCard component
- Renders as a vertical list

### ClimbCard

**Props**:
```typescript
interface ClimbCardProps {
  climb: Climb
}
```

**Behavior**:
- Displays: name, grade, attempts, sent status, date
- Visually distinguishes sent vs. project climbs (color or indicator)
- Sent climbs: success indicator (e.g., green accent or check mark)
- Project climbs: neutral/muted indicator (e.g., yellow/orange accent)
- Handles long names gracefully (truncation or wrapping)

## Data Flow

```
page.tsx (state owner)
  │
  ├── ClimbForm
  │     └── onAdd callback → adds climb to state, re-sorts
  │
  └── ClimbList
        └── ClimbCard (×N)
```

1. `page.tsx` initializes state with `SEED_CLIMBS`
2. `page.tsx` passes `climbs` (sorted) to `ClimbList`
3. `page.tsx` passes `onAdd` handler to `ClimbForm`
4. When user submits form, `onAdd` creates a new Climb with generated id,
   adds it to state, and the sorted array re-renders the list

## Theme Contract

- Background: dark (e.g., `bg-gray-950` or `bg-gray-900`)
- Text: light (e.g., `text-gray-100` or `text-white`)
- Cards: slightly lighter dark (e.g., `bg-gray-800`)
- Accent for sent: green tones (e.g., `text-green-400`, `border-green-500`)
- Accent for project: yellow/amber tones (e.g., `text-yellow-400`)
- Form inputs: dark backgrounds with visible borders
- Good contrast ratio throughout (WCAG AA minimum)
