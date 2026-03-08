# Feature Specification: Climb Tracker

**Feature Branch**: `001-climb-tracker`
**Created**: 2026-03-07
**Status**: Draft
**Input**: User description: "Build Send Log, a climbing send tracker for logging bouldering problems. The app is a single page that shows a list of logged climbs and a form to add new ones. Each climb has: a name (string), a grade on the V-scale from V0 through V10, the number of attempts (number), whether it was sent (boolean), and the date it was logged. The app should be seeded with 8-10 sample entries across different grades, different dates over the past few weeks, and a mix of sent and unsent problems. The list should show all climbs sorted by most recent date first. The form to add a new climb should have fields for all properties. Grade should be a dropdown. Sent should be a toggle or checkbox. Date should default to today. The UI should be clean, minimal, and use a dark theme with good contrast. Single page, no routing."

## User Scenarios & Testing

### User Story 1 - View Climb Log (Priority: P1)

As a climber, I want to see all my logged climbs displayed in a list sorted by most recent date first, so I can quickly review my climbing history and progress.

**Why this priority**: The climb log is the core of the application. Without it, no other feature has context. Displaying existing data is the foundation for all interaction.

**Independent Test**: Can be fully tested by loading the application and verifying that 8-10 sample climbs appear in reverse chronological order, each showing name, grade, attempts, sent status, and date.

**Acceptance Scenarios**:

1. **Given** the application is loaded for the first time, **When** the page renders, **Then** 8-10 sample climb entries are displayed sorted by most recent date first
2. **Given** the climb log is displayed, **When** the user views an entry, **Then** they can see the climb name, V-scale grade, number of attempts, sent/project status, and date
3. **Given** multiple climbs exist on the same date, **When** the list is displayed, **Then** climbs on the same date appear grouped together in a consistent order

---

### User Story 2 - Add New Climb (Priority: P1)

As a climber, I want to log a new climb by filling out a form with the climb's details, so I can keep an up-to-date record of my sessions.

**Why this priority**: Adding new climbs is the primary interaction. Without this, the app is static and provides no ongoing utility beyond the sample data.

**Independent Test**: Can be fully tested by filling out the form with a name, selecting a grade, entering attempts, toggling sent status, and submitting. The new climb should appear in the list at the correct position based on its date.

**Acceptance Scenarios**:

1. **Given** the user is on the main page, **When** they view the form, **Then** they see fields for: name (text input), grade (dropdown V0-V10), attempts (number input), sent status (checkbox/toggle), and date (date input defaulting to today)
2. **Given** the user fills out all required fields, **When** they submit the form, **Then** the new climb appears in the list at the correct chronological position
3. **Given** the user has not changed the date field, **When** the form is displayed, **Then** the date field defaults to today's date
4. **Given** the user submits a new climb, **When** the form is submitted, **Then** the form fields reset to their defaults so the user can quickly log another climb

---

### User Story 3 - Visual Distinction Between Sends and Projects (Priority: P2)

As a climber, I want to easily distinguish between climbs I have sent and climbs that are still projects, so I can quickly see my accomplishments and ongoing challenges at a glance.

**Why this priority**: This enhances the usability of the climb log by making it scannable. It builds on the core display but adds meaningful visual context.

**Independent Test**: Can be fully tested by loading the sample data (which includes a mix of sent and unsent climbs) and verifying that sent and project entries are visually distinct.

**Acceptance Scenarios**:

1. **Given** the climb log is displayed, **When** a climb is marked as sent, **Then** it is visually distinguished from unsent climbs (e.g., different color, icon, or label)
2. **Given** the sample data contains both sent and unsent climbs, **When** the page loads, **Then** the user can scan the list and immediately identify which climbs are sends vs. projects

---

### Edge Cases

- What happens when the user submits the form with an empty name field? The system should prevent submission and indicate that a name is required.
- What happens when the user enters zero or a negative number for attempts? The system should require at least 1 attempt.
- What happens when the user enters a very long climb name? The display should handle long names gracefully without breaking the layout.
- What happens when the user selects a future date? The system should allow it (climbers may pre-plan sessions).
- What happens when many climbs are added (50+)? The list should remain scrollable and performant.

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a list of all logged climbs sorted by date in descending order (most recent first)
- **FR-002**: Each climb entry MUST show the climb name, V-scale grade, number of attempts, sent/project status, and date logged
- **FR-003**: System MUST be seeded with 8-10 sample climb entries on initial load, spanning different grades (V0-V10), multiple dates over the past few weeks, and a mix of sent and unsent statuses
- **FR-004**: System MUST provide a form to add a new climb with the following fields: name (text), grade (dropdown selection of V0-V10), attempts (number), sent (checkbox or toggle), and date
- **FR-005**: The date field in the add form MUST default to today's date
- **FR-006**: Users MUST be able to submit the form to add a new climb to the log, which then appears in the correct sorted position
- **FR-007**: The form MUST validate that a name is provided before allowing submission
- **FR-008**: The form MUST validate that attempts is a positive number (minimum 1)
- **FR-009**: System MUST visually distinguish between sent climbs and project climbs in the list
- **FR-010**: The form MUST reset to default values after successful submission
- **FR-011**: System MUST use a dark theme with good contrast for readability
- **FR-012**: System MUST be a single-page application with no routing or navigation
- **FR-013**: System MUST be containerized with Docker so users can run the app without installing Node.js or npm locally
- **FR-014**: System MUST provide a Makefile with `make build` (build the Docker image) and `make run` (run the container) targets
- **FR-015**: System MUST include a Docker Compose file to orchestrate the container, defining port forwarding and container configuration

### Key Entities

- **Climb**: Represents a single logged bouldering problem. Attributes: name (the route/problem name), grade (V-scale from V0 to V10), attempts (number of tries), sent (whether the climber completed the problem), date (when the climb was logged)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can view their full climb history immediately upon loading the application, with sample data visible within 2 seconds of page load
- **SC-002**: Users can add a new climb entry in under 30 seconds by filling out and submitting the form
- **SC-003**: 100% of displayed climbs show all five data points (name, grade, attempts, sent status, date) without truncation on standard screen sizes
- **SC-004**: Users can visually distinguish sent climbs from project climbs without reading individual entries (scannable at a glance)
- **SC-005**: The application is fully usable on a single page without any navigation or page transitions
- **SC-006**: New climbs appear in the correct chronological position immediately after form submission without requiring a page refresh

## Assumptions

- All state is managed client-side; there is no persistence beyond the current browser session
- No user authentication or multi-user support is needed
- The V-scale range is V0 through V10 (no modifiers like V10+)
- Sample data dates are relative to the current date (past few weeks) to appear realistic
- The application targets modern desktop and mobile browsers
- No edit or delete functionality is required for this initial version
- Docker is the primary way users run the app; Node.js/npm are only needed inside the container
