# Audentra — agent instructions

Enrollment platform for educational institutions. This repo is the **product base**: the design
system and the student-facing portal, in React 19 + Vite, plain CSS, no TypeScript.

Work arrives as **Jira cards** (`ENR`), gets built here, and comes back as **Jam** feedback.

## Working agreement

- Conversation in pt-BR. Code, UI copy, commits and everything in `docs/` and `.scratch/` in English.
- One card at a time, on its own branch. Don't widen scope past the card's `Out of scope`.
- Never push, open a PR, or close a Jira card without being asked.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173  — the portal
                 # http://localhost:5173/#/styleguide  — the design system, rendered
npm run build    # must pass before any change is called done
npm run preview
```

## The design system — start at `#/styleguide`

**Open it before building anything.** Every token, primitive and pattern is on that page in its
states, and its colour values are read off the live cascade, so it cannot go stale. The rule it
exists to enforce:

> **If a shape is not on the styleguide, it does not exist.** Adding one means adding it there in
> the same commit.

That rule is the whole point. The audit of 2026-08-20 found 436 raw hex values, every whole pixel
from 1 to 20 used as a spacing step, eight drawers each with a hand-typed copy of the same shell,
and ten rails each rewriting the same anchor card. None of it was carelessness — the things the
screens needed had no names and no components, so each screen invented its own from memory.

### Non-negotiable

- **No UI library, no CSS framework, no icon package, no external font request.** Deviating is the
  fastest way to make the product look like two products.
- **A raw value in a rule is a bug** — the same way a raw hex is. Colour, space, radius, type,
  motion, depth and z-index all come from `src/styles/tokens.css`. If what you need is not there,
  the token is missing: add it there, do not inline it.
- **Reach for a primitive before writing markup.** A drawer is `<Drawer>`, a rail's first card is
  `<AnchorCard>`, a card is `<Card>` + `<CardHead>` + `<CardRows>`. If you are typing `modal-scrim`
  or `anchor-card` by hand, stop — you are re-creating something that exists.
- **Icons are ours** — add to `src/design-system/Icon.jsx`, 24×24, stroke 1.9, `currentColor`.
- **Accessibility and responsive behaviour are part of done**, not a follow-up.

Full contract, including how a page is composed and how a card is read: `docs/agents/design-workflow.md`.

## Structure

One rule: **a file lives with the thing it belongs to.**

```
src/
  App.jsx                    # application state, routing, page layout
  main.jsx

  design-system/             # the product's vocabulary. Knows no domain, imports no data.
    Icon.jsx
    primitives/              # Drawer, AnchorCard, Card (+CardHead/Rows/Foot), Button
    patterns/                # PageShell, GroupTabs, StateCard, SummaryFigure, AdvisorBar,
                             # InfoModal, PageError, PageSkeleton, SectionPlaceholder
    styleguide/              # the page at #/styleguide

  app/                       # the shell every page renders inside
    Sidebar, Topbar, TopbarPopover, PreviewStateMenu

  features/<name>/           # one section, whole: its page, its parts, its data, its logic
    <Domain>Page.jsx         # the page a route lands on
    <Domain>Rail.jsx         # the insight column
    data.js                  # what the section knows
    logic.js                 # what the section computes

  lib/                       # only what genuinely crosses features
    navigation.js  overlay.js  preview-state.js

  styles/
    app.css                  # an index of imports and nothing else — the cascade order
    tokens.css               # every decision that is about the whole product
    base.css  chrome.css  patterns.css  navigation.css
    features/<name>.css      # one per section
    styleguide.css
```

### Naming

| Kind | Name | Example |
| --- | --- | --- |
| Page | `<Domain>Page` | `DocumentsPage`, `HealthPage`, `CampusPage` |
| Rail | `<Domain>Rail` | `HealthRail`, `ClassroomsRail` |
| Section data | `features/<name>/data.js` | |
| Section logic | `features/<name>/logic.js` | |
| Preview-state prop | `previewState` | never `state` |

The component takes the **domain's** name, not the student-facing label — "My Documents" lives in
`navigation.js`, which is the single source of truth for copy. Every `export default` matches its
filename.

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

Card → **Mobbin research (mandatory)** → spec → build → verify → Jam feedback → commit. Never design
a screen from imagination; search Mobbin (`mcp__mobbin__search_screens` / `search_flows` /
`search_sections`) and record the references before writing JSX. See `docs/agents/design-workflow.md`.

## Known, and deliberately left visible

Neither is a bug you will trip over; both are work someone has to do on purpose, with the screens
open. Don't fix them as a side effect of another card.

- **`patterns.css` still holds My Enrollment.** It was built first and every shared shape was
  extracted out of it in place, so the two interleave rule by rule. Separating them means reordering
  ~40 fragments, which can change which of two equal-specificity rules wins.
- **My Financials named four variants of one card** — `.ledger-card`, `.schedule-card`,
  `.progress-preview`, `.billed-split` all ride in `.section-card`'s selector. They should collapse
  into `.section-card`, which is a markup change on three pages.
