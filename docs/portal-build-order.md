# Student portal — what is left, and the order to build it

Snapshot of the `ENR` board taken **2026-08-20**, cross-referenced against this repo. Jira holds the
state; this document is a reading of it and goes stale the moment a card moves. Re-derive with:

```
project = ENR AND labels = persona-student AND labels = design AND statusCategory != Done
```

## The set that matters

Eleven student cards carry the `design` label — those are the ones that get built here. **Seven had
landed** when this snapshot was taken: ENR-167 (portal shell), ENR-164 (My Enrollment), ENR-180
(portal navigation), ENR-166 (My Financials), ENR-188 (My Classrooms), ENR-189 (My Campus Life),
ENR-181 (Edward). **ENR-182 (Help) has since landed.** ENR-183 and ENR-184 were built in parallel
sessions and each records itself below; the table is the honest state only as far as each pass has
updated it.

| Card | Screen | Serves | Jira status | In repo |
| --- | --- | --- | --- | --- |
| [ENR-165](https://audentra.atlassian.net/browse/ENR-165) | My Documents (Both) | ENR-157, ENR-158 | Prioritized | `built: false` |
| [ENR-182](https://audentra.atlassian.net/browse/ENR-182) | Help | ENR-177 | Development | **landed** |
| [ENR-183](https://audentra.atlassian.net/browse/ENR-183) | Appointments | ENR-178 | Development | `built: false` |
| [ENR-184](https://audentra.atlassian.net/browse/ENR-184) | Profile | ENR-179 | Development | `built: false` |

Help, Appointments and Profile are the three screens of epic
[ENR-190](https://audentra.atlassian.net/browse/ENR-190). My Documents belongs to epic
[ENR-146](https://audentra.atlassian.net/browse/ENR-146).

Everything else under `persona-student` on the board is either an epic (ENR-143 to ENR-148, ENR-173,
ENR-190) or a story already covered by a design card that closed. Onboarding — epics ENR-143 and
ENR-144 with stories ENR-150 to ENR-154 — has **no design card in `ENR`** and is owned elsewhere. It
is not work for this repo.

## Order

### ~~1. ENR-181 — Edward floating control~~ — landed

Built first, as this document argued, because it touches all thirteen destinations at once. The
corner it claims is now the `--safe-bottom` token, reserved by `PageShell`'s footer and read by the
toast, so the four screens below are designed against the final frame rather than re-verified after
it. Spec: `.scratch/ENR-181-edward-floating-control/spec.md`.

The `PreviewStateMenu` reconciliation this document expected turned out to be unnecessary: the
control sits in the topbar, not in the lower-right corner. It also carried a standardization pass —
named layers, a bottom safe area, motion tokens and one shared overlay primitive in
`src/lib/overlay.js`, which the four unmounting overlays now use.

### 1. ENR-165 — My Documents

The largest new screen, and the one that unblocks the most:

- ENR-160 AC3 requires the financial document checklist to link to where the file is submitted.
  `src/components/financials/DocumentList.jsx` has no destination today.
- ENR-190 states that Profile must **route** to the documents section rather than duplicate it, so
  Documents has to exist before Profile.
- The `in review` group in My Enrollment (ENR-164) is already built and waiting for the other half.

### ~~2 and 3. ENR-182 (Help) and ENR-183 (Appointments) — one pass~~ — Help landed

This document argued for building the pair together, so that the status vocabulary and the office
module were not invented twice. They were in fact built in parallel, in two sessions, which achieved
the same thing a different way: each card owns its own data module and neither reached into the
other's.

**ENR-182 landed.** Spec: `.scratch/ENR-182-help/spec.md`. What it leaves behind for anything that
needs a person:

- `src/help-data.js` holds the **five accountable offices** — Admissions, Student Financial Services,
  Housing & Residential Life, Health Services and the Registrar — each with what it decides, its
  hours, where it is and how long it takes to answer. Every name was already in `data.js` or
  `campus-data.js`; no sixth office was invented.
- `src/lib/help.js` holds the **state vocabulary a student may see**: `received`, `working`,
  `needs-you`, `answered`. There is deliberately no state for a failed send, and no field anywhere on
  a request for a person — ENR-177 AC3 is a property of the shape rather than a rule to remember.
- The failure grammar came out the other way from what this document expected. A send that does not
  arrive creates **nothing**: the words stay in the form, and the page says so. A `Not sent` record in
  a list of what Aster has would be a lie about where they are. Appointments took the opposite
  reading for its own case, where a booking occupies an intention that has to stay visible.

ENR-181 had already wired ENR-176 AC3 — no answer, so offer a named route to a person — to Tomás
Okafor and Amara Nwosu. Help adds the office behind them, and deliberately does **not** put either
person next to a request: a named face beside a list of requests reads as the person handling them,
which is the one thing AC3 forbids.

The copy change ENR-181 forced was inherited as written: ENR-182 is built to the Help entry already
in `src/lib/navigation.js` — Aster's own guides, and a route to a named office — and the assistant
keeps the word *ask* to itself.

### 4. ENR-184 — Profile

Last, because it consumes the other three: it routes to Documents instead of duplicating it, routes
each institution-owned field to the office that can change it, and carries the family-permission
block with the seven record categories. Built last, every route it needs already resolves.

## Two open gaps

`src/lib/navigation.js` declares thirteen destinations. **Messages** and **My Progress** are
`built: false` and have **no design card on the board**:

- Messages appears only as `screen-messages` on the staff side (ENR-25). The student-facing behaviour
  closest to it is ENR-161, labelled `screen-dashboard`.
- My Progress is named once, in ENR-174 AC1, as a leaf of the Academic group.

After the five cards above, both stay placeholders permanently unless a card is written. Worth
deciding now whether they earn a card or leave the navigation.

## Not in this repo

Staff-side cards (ENR-20 to ENR-25 and their stories) are a different product surface. Thirty-three
cards carry the `design` label across the whole project; only the eleven `persona-student` ones are
built here.
