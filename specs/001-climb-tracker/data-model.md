# Data Model: Climb Tracker

**Feature Branch**: `001-climb-tracker`
**Date**: 2026-03-07

## Entities

### Climb

Represents a single logged bouldering problem attempt.

| Field    | Type    | Required | Constraints                        | Description                              |
|----------|---------|----------|------------------------------------|------------------------------------------|
| id       | string  | Yes      | Unique, auto-generated             | Unique identifier for the climb entry    |
| name     | string  | Yes      | Non-empty                          | Name of the route or problem             |
| grade    | string  | Yes      | One of V0–V10                      | V-scale bouldering grade                 |
| attempts | number  | Yes      | Integer, minimum 1                 | Number of tries including the send       |
| sent     | boolean | Yes      | —                                  | Whether the climber completed the problem|
| date     | string  | Yes      | ISO date format (YYYY-MM-DD)       | Date the climb was logged                |

### Grade (Value Object)

The V-scale grade is a constrained string, not a separate entity. Valid values:

```
V0, V1, V2, V3, V4, V5, V6, V7, V8, V9, V10
```

No modifiers (no V10+, no V-easy).

## TypeScript Interface

```typescript
interface Climb {
  id: string
  name: string
  grade: string
  attempts: number
  sent: boolean
  date: string
}
```

## State Shape

All state lives in a single `useState<Climb[]>` at the page level.

```typescript
const [climbs, setClimbs] = useState<Climb[]>(SEED_CLIMBS)
```

- **Initial value**: Seeded with 8–10 sample Climb entries
- **Adding**: New climbs are prepended/inserted in sorted position
- **Sorting**: Array is always sorted by `date` descending (most recent first)
- **No persistence**: State resets on page refresh

## Validation Rules

| Field    | Rule                              | Enforced By       |
|----------|-----------------------------------|-------------------|
| name     | Must be non-empty string          | Form validation   |
| grade    | Must be one of V0–V10             | Dropdown (no free text) |
| attempts | Must be integer >= 1              | Input min attribute + form validation |
| sent     | Boolean, defaults to false        | Checkbox default  |
| date     | Valid date string, defaults today | Date input default|

## Seed Data

8–10 entries with the following distribution:
- Grades: Mix across V0–V10 range
- Dates: Spread over the past 2–3 weeks relative to current date
- Sent status: Mix of true and false (roughly 60/40 sent/project)
- Attempts: Varied (1–15 range, lower for easier grades)
- Names: Realistic bouldering problem names
