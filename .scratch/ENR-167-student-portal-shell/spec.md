Jira: ENR-167
Status: ready-for-agent
Labels: design, persona-student, screen-dashboard, wave-mvp-demo
Jam: https://jam.dev/c/14fb7032-828f-4d8f-9c05-7e2ee13abbda — rename Checklist to My Enrollment, drop
     My offer, use the section names that already exist as ENR cards, and replace Harvard with Aster.

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-agent` is the nearest role and the card is fully specified; Jira stays authoritative.

# Student portal shell — navigation vocabulary and institution identity

## 1. What this screen answers

Where am I, what changed, and who do I ask? — [ENR-148](https://audentra.atlassian.net/browse/ENR-148).
This pass changes only the **frame**: what the sections are called and whose institution this is.

## 2. Layout

Regions in reading order. Nothing moves; only labels and identity change.

| Region | Change | Reference |
| --- | --- | --- |
| `.brand-row` | `H` / Harvard → `A` / Aster. Mark keeps its exact geometry and moves from the hard-coded Harvard crimson gradient to the purple tokens. | — |
| `.main-nav` | Six sections, flat, count badge on the active row | [Circle](https://mobbin.com/screens/afde5712-b2c0-4fc1-be7b-4ac42446d642) |
| `.sidebar-bottom` | Unchanged — help centre, profile chip, Powered by Audentra | [Teachable, rejected](https://mobbin.com/screens/6a15e96c-6baf-49ed-8cc1-3e564b8d8b78) |
| `.topbar` | `Harvard` → `Aster` on the mobile title. No balance added. | [ClassDojo](https://mobbin.com/screens/3433ce40-d2e9-45ab-923e-88ab85ff69f8) |
| Page body | `Harvard` → `Aster` in every string | — |

### The six sections

Each name is taken from an ENR card, not invented. The Jam said *"aquelas coisas que já estão dentro
dos cards do Jira"*, so the card summary is the source of the label.

| Label | Card | Anchor | Icon |
| --- | --- | --- | --- |
| My Enrollment | [ENR-145](https://audentra.atlassian.net/browse/ENR-145) | `#my-enrollment` | `check` |
| My Documents | [ENR-146](https://audentra.atlassian.net/browse/ENR-146) | `#my-documents` | `file` |
| My Financials | [ENR-147](https://audentra.atlassian.net/browse/ENR-147) | `#my-financials` | `wallet` (new) |
| My Classrooms | [ENR-173](https://audentra.atlassian.net/browse/ENR-173) | `#my-classrooms` | `book` (new) |
| My Campus Life | [ENR-173](https://audentra.atlassian.net/browse/ENR-173) | `#my-campus-life` | `home` |
| Messages | [ENR-148](https://audentra.atlassian.net/browse/ENR-148) | `#messages` | `message` |

Removed: **My offer** (the Jam: *"My offer, a gente tira, que não é isso que a gente quer"*) and
**Explore Harvard**, which was the unnamed ancestor of My Campus Life.

## 3. States

- **Active section** — My Enrollment only; it is the one page that exists. `.nav-item.active`.
- **Open count** — the badge on My Enrollment reads the live task count. Zero renders no badge.
- **Unread** — Messages keeps its `.unread-dot`; `aria-label` states the number in words.
- **Not built yet** — the other five rows are anchors that `preventDefault()`, exactly as `My offer`
  and `Explore Harvard` did. No dead-end navigation is introduced.
- **Narrow width** — unchanged: the sidebar becomes a drawer behind `.nav-scrim`.

## 4. Interactions

- A nav row navigates and closes the mobile drawer. It must never carry a points balance —
  [ENR-148](https://audentra.atlassian.net/browse/ENR-148) guardrail, and the reason the Uxcel and
  ClassDojo references were taken.
- The brand row is not a link. It states whose portal this is; it does not navigate.

## 5. Data

No new shape. `taskCount` already flows `App.jsx → Sidebar`. Section labels are literals in
`Sidebar.jsx`, as they were before.

## 6. Out of scope

From [ENR-148](https://audentra.atlassian.net/browse/ENR-148): the content of each section; external
notification delivery; reward redemption mechanics. Also out, for this card:

- The task **category** chips in `src/data.js` (`Your offer`, `About you`, …). The Jam removed the
  nav item called *My offer*; the category on a task card is section content and a different string.
  Raised in the report rather than changed.
- One advisor per section (*"my financials tem outro advisor, my campus life tem outro"*). No ENR card
  carries it — filed as new scope, not absorbed.

## 7. Done when

- [ ] Sidebar shows the six card-derived sections; My offer and Explore Harvard are gone
- [ ] My Enrollment is active and carries the open count
- [ ] No `Harvard` string remains anywhere in `src/`
- [ ] The university mark is Aster, drawn from tokens, at unchanged geometry
- [ ] `npm run build` clean; wide, narrow and keyboard-only checked

## Open question for the next Jam

The Jam said *"My academics"*; the card is [ENR-173](https://audentra.atlassian.net/browse/ENR-173)
**My Classrooms** (`screen-my-classrooms`). `screen-academics` exists but is `persona-staff`. The card
name was used, since the Jam itself deferred to the Jira cards. Confirm which the student sees.

[ENR-148](https://audentra.atlassian.net/browse/ENR-148) says the sidebar has **eight** sections. Six
have ENR cards. The remaining two were not invented — they need naming.
