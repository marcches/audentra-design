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
| [ENR-165](https://audentra.atlassian.net/browse/ENR-165) | My Documents (Both) | ENR-157, ENR-158 | Prioritized | **landed** |
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

### ~~1. ENR-165 — My Documents~~ — landed

The largest new screen, and the one that unblocked the most:

- ENR-160 AC3 requires the financial document checklist to link to where the file is submitted.
  `src/components/financials/DocumentList.jsx` has no destination today.
- ENR-190 states that Profile must **route** to the documents section rather than duplicate it, so
  Documents has to exist before Profile.
- The `in review` group in My Enrollment (ENR-164) is already built and waiting for the other half.

Built to `.scratch/ENR-165-my-documents/spec.md`. Two things it settled that outlive it: `CONTEXT.md`
now exists at the repo root, because *requirement* and *request* were each one screen away from
meaning two things; and `src/lib/documents.js` fixes how far a prototype may advance a wait —
**checking advances on a clock, in review never does** — so no timer in this repo ever fakes a
decision a person is supposed to make.

The `DocumentList` link ENR-160 AC3 asked for is still open: the financial checklist rows open the
task drawer, which is correct, and a route from there to the record is a small follow-up rather than
something this card silently absorbed.

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

## Both gaps are closed — neither earned a card

`src/lib/navigation.js` used to declare two destinations with `built: false` and no design card
behind them. Both are now out of the navigation, and neither was a card the board was missing.

- **My Progress** was named once, in ENR-174 AC1, as the second leaf of an Academic group. The Jam of
  2026-08-20 dissolved that group — a heading holding one leaf costs a click and buys nothing — and
  My Progress went with it. The divergence from AC1 is recorded on ENR-174.
- **Messages** was never a card at all. It arrived in the product base commit as a decorative sidebar
  row with an unread dot, and ENR-180 promoted it to a destination on a circular premise: *"Messages
  stays, because the topbar bell has to have a destination."* Its copy — *"Everything your enrollment
  team has written to you"* — promised an inbound institution→student channel that the product has
  decided not to have. ENR-161 AC5 and ENR-177 AC6 both hold "while no inbound channel exists";
  ENR-177 AC4 names the portal as the durable channel and ENR-182 (Help) is the screen that carries
  that thread; on the staff side ENR-44 AC1 records a channel choice as intent and *performs no send*.
  Its `unread` badge also double-counted: the two things that actually reach the student are already
  counted as `decisions` on My Documents (ENR-158 AC5) and as request state on Help.

The topbar bell went with Messages, since pointing it anywhere else would have counted the same event
twice. What changed since I was last here belongs to **ENR-161**, served by ENR-167; until that
lands, the sidebar counts are the honest version of it.

## Not in this repo

Staff-side cards (ENR-20 to ENR-25 and their stories) are a different product surface. Thirty-three
cards carry the `design` label across the whole project; only the eleven `persona-student` ones are
built here.
