# Audentra — agent instructions

Enrollment platform for educational institutions. This repo is the **product base**: the design
system and the student-facing enrollment checklist, in React 19 + Vite, plain CSS, no TypeScript.

Work arrives as **Jira cards** (`ENR`), gets built here, and comes back as **Jam** feedback.

## Working agreement

- Conversation in pt-BR. Code, UI copy, commits and everything in `docs/` and `.scratch/` in English.
- One card at a time, on its own branch. Don't widen scope past the card's `Out of scope`.
- Never push, open a PR, or close a Jira card without being asked.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # must pass before any change is called done
npm run preview
```

## Design system — non-negotiable

No UI library, no CSS framework, no icon package, no external font request. Colors come from the
`:root` tokens in `src/styles/app.css`; icons are added to `src/Icon.jsx` (24×24, stroke 1.9); classes
are flat and semantic in `app.css`. Accessibility and responsive behavior are part of done, not a
follow-up. Full contract: `docs/agents/design-workflow.md`.

## Agent skills

### Issue tracker

Specs live as markdown under `.scratch/ENR-<n>-<slug>/`, keyed to Jira project `ENR` on
`audentra.atlassian.net`, which holds the state. See `docs/agents/issue-tracker.md`.

### Triage labels

The five triage roles map onto the `ENR` Jira workflow statuses (`Initiated` → `Solution Design` →
`Review` → `Ready for Development`, plus `On Hold`) — no triage labels are created. See
`docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root, created lazily by `/domain-modeling`.
See `docs/agents/domain.md`.

### Design workflow

Card → **Mobbin research (mandatory)** → spec → build → verify → Jam feedback → commit. Never design a
screen from imagination; search Mobbin (`mcp__mobbin__search_screens` / `search_flows` /
`search_sections`) and record the references before writing JSX. See `docs/agents/design-workflow.md`.

## Structure

```
src/
  App.jsx                  # application state + page layout
  Icon.jsx                 # inline SVG icon library
  data.js                  # student data: tasks, locked, completed, in review
  lib/task-helpers.js      # sorting and priority labels
  components/              # Sidebar, Topbar, TaskCard, TaskDrawer, InfoModal, InsightColumn
  styles/                  # preflight.css (reset) + app.css (design system)
docs/agents/               # how agents work in this repo
.scratch/                  # specs and tickets, one directory per ENR card
```
