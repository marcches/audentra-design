Jira: ENR-188
Status: ready-for-agent
Labels: design, persona-student, screen-my-classrooms, wave-post-mvp
Jam: (none)

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-agent` is the nearest role and the card is fully specified; Jira stays authoritative.

# My Classrooms — the degree asks, the courses answer

Serves [ENR-185](https://audentra.atlassian.net/browse/ENR-185) and
[ENR-186](https://audentra.atlassian.net/browse/ENR-186), under epic
[ENR-173](https://audentra.atlassian.net/browse/ENR-173).

## 0. Scope note — the card says "confirm current behaviour before redesigning"

Confirmed: **the section does not exist in this repo.** `My Classrooms` is a nav row added by
[ENR-167](https://audentra.atlassian.net/browse/ENR-167) that calls `preventDefault()`. There is no
academic data in `src/data.js` and no route. So this card is a first build against a name that already
exists in the shell, not a reorganisation of existing markup. The epic's *"this is a change, not a new
build"* describes the product Audentra is replacing, not this design base.

Consequence: the card also has to make the shell navigate, because a second screen cannot be reached
otherwise. That part is kept to the minimum that makes two sections real.

## 1. What this screen answers

*What does my degree require of me?* — and, for a student arriving with prior learning, *does any of
what I already did count?* The card's design brief names the risk in one sentence: **a student who
believes a course is waived and is wrong loses a semester.** Every decision below is downstream of
that sentence.

## 2. Layout

Regions in reading order. The page reuses the skeleton of `My Enrollment` so the two read as one
product: hero panel → progress strip → two-column grid → footer.

| # | Region | Class | Reference |
| --- | --- | --- | --- |
| 1 | Program hero | `.welcome-panel` reused, `.program-stamp` replaces `.celebration-orbit` | — |
| 2 | Degree progress strip | `.progress-panel` reused: `.progress-ring` + `.advisor-bar` | [Vanta](https://mobbin.com/screens/73f939c9-1c88-4d35-9d87-ce276a014c30) |
| 3 | Requirement list | `.requirement-card`, grouped by `.status-section` heading | [Codecademy](https://mobbin.com/screens/63e05256-8dd3-4758-9abd-bc84176be27d), [Babbel](https://mobbin.com/screens/189ea23c-9d3d-42cd-913b-a8681be54f95) |
| 4 | Potential credit matches | `.match-section` + `.match-card` | [Elicit](https://mobbin.com/screens/d96f34b4-c117-4ae8-ba1c-c1dc655eaac8), [Glassdoor](https://mobbin.com/screens/81c19e3b-788c-44b1-a275-12ab6d39f57d) |
| 5 | Academic rail | `.insight-column` reused, three new cards | — |

### 2.1 Page head and catalog bar

> Superseded by §8. This section first specified a `.welcome-panel` hero mirroring My Enrollment.
> ENR-180 landed mid-card and reserves the hero for My Enrollment alone, so the page takes the
> standard head. What follows is what shipped.

`PageShell` renders the head: eyebrow `Academic`, `h1` **My Classrooms**, and the lede from
`navigation.js`. Directly under it, a `.catalog-bar`: a purple `.catalog-chip` naming the program and
class year, then `Catalog 2026–27 · Published by Aster on 12 Aug · Read-only`.

That plants ENR-185 AC5 (*the catalog is a read model published by staff*) in the first inch of the
page instead of burying it in a footnote. When no program is assigned the chip turns amber and reads
`Program not assigned yet`, and the catalog line is **removed** — a catalog version belongs to a
program, so naming one would claim something that is not settled.

### 2.2 Degree progress strip

Same geometry as the enrollment strip, same two tenants.

- **Left — `.progress-summary`**: the ring counts **requirements**, because the guardrail makes the
  requirement the organising unit. `18%` · *"2 of 11 requirements met"* · secondary line
  *"15 of 120 credits approved"* · a third line, `.progress-caveat`, reading
  *"2 potential matches aren't counted here"* with the `info` icon.
- **Right — `.advisor-bar`**: the existing component, unchanged, with Tomás Okafor. Decision confirmed
  with the user: the enrollment advisor is the route, and the Registrar's Office is named as the body
  that *decides*. `data.js` already says the academic adviser does not exist yet
  (*"Waiting for program assignment"*), so inventing one would contradict a screen that ships today.
- Under the strip, `.record-note`: *"This is not your official academic record. The Registrar's Office
  holds your transcript."* — ENR-185 AC6, positioned exactly where a student could otherwise mistake
  the ring for a transcript.

**The ring is computed from approved credit only.** `requirementStatus()` in
`src/lib/academic-helpers.js` takes `creditsApproved` and `creditsRequired` and never reads matches.
The guardrail is structural, not a copy decision.

### 2.3 Requirement list

Grouped under three `.status-section` headings — `Core curriculum`, `Computer Science major`,
`Electives` — using the existing heading component so the section rhythm matches My Enrollment.

A collapsed `.requirement-card` row carries: status mark, name, `n of m credits`, one line of what the
requirement asks for, a `.requirement-status` badge (`Satisfied` / `In progress` / `Not started`), and
— when it applies — a `.match-flag`: *"1 potential match · not counted"*.

Expanded, it reveals `.requirement-courses`: the catalog courses that satisfy it, each with code,
title, credits, terms offered, and its own state:

- `approved` — credit already granted, green check, `Approved 4 Aug · AP Calculus BC`
- `open` — in the catalog and available to take
- `locked` — has an unmet prerequisite, shows `Requires CS 110` (ENR-185 AC4)

Default open: only the requirements that carry an advisory flag or partial credit. The other seven stay
one line tall so all eleven fit in roughly one screenful.

### 2.4 Potential credit matches

Its own section, **below** the requirements, tinted `--amber-soft` so it never reads as part of the
credit ledger. Section heading states the posture before any card is read: `ADVISORY` badge, count, and
*"Nothing here has been approved. None of it counts toward your degree yet."*

A `.match-card` shows evidence → target as a single line with the `arrow` glyph
(`IB Spanish HL → SPAN 201 · Foreign Language`), the source document, the rule code, a
`.confidence-chip` (`Likely` / `Needs review`), and the standing fact `Registrar's Office decides`.
Two routes: **See the evidence** (drawer) and **Ask Tomás** (toast).

Two matches ship, deliberately at different confidence, because the confidence design has to be
visible:

| Evidence | Targets | Confidence | Why it is shaped this way |
| --- | --- | --- | --- |
| IB Spanish HL, score 6 | `SPAN 201`, Foreign Language | `Likely` | Rule TR-14 is mechanical: HL language, score ≥ 5, maps to the 200 level |
| Northside College `CSCI 140` | `CS 110`, Programming Foundations | `Needs review` | Syllabus not on file; contact hours must be compared by a human |

The second one is the card's nightmare scenario made concrete: if Maya reads it as settled and skips
`CS 110`, she cannot take `CS 111` in the spring and loses the year. Its drawer therefore carries an
explicit instruction — *"Plan to register for CS 110 as if this match does not exist."*

### 2.5 Academic rail — `.insight-column`

Three cards, no Momentum points anywhere on this screen. A curriculum requirement is not a task and
does not earn points; showing the momentum card here would imply it does, against the epic guardrail.

1. `.counts-card` — **What counts right now**: `15 of 120 credits approved`, and beneath it
   `7 credits under review — not counted above`. The two numbers are separated by a rule, never summed.
   The second line never asserts more than it knows: with the transcript unreachable it reads *"We
   couldn't check what's under review right now"*, and with no program assigned the figure is `—`.
2. `.program-card` — **Your program**: degree, catalog version, published date, credits to graduate.
   With no program assigned, all four are replaced by one line saying they arrive with the program.
3. `.record-card` — **Your official record**: the Registrar's Office holds the transcript; this page
   shows published catalog content only. Link: **How credit is approved** → `InfoModal` variant.

## 3. States

Six, reachable from the preview picker (§4.2). The card names five; the sixth is required by
ENR-186 AC5 and has nowhere else to live.

| State | What renders | Why it exists |
| --- | --- | --- |
| `success` *(default)* | Everything in §2. 2 satisfied, 2 in progress, 7 not started, 2 matches | ENR-185 Sc. 1 |
| `loading` | The frame's `PageSkeleton` — see §8. No spinner, no copy that guesses | Card: *deliver loading* |
| `empty` | Program not assigned yet. Hero + one `.empty-panel` naming what will appear here, what produces it, and the advisor route. Rail keeps a program-less variant + official record | The locked task in `data.js` says the program assignment is pending — this is that student |
| `no-matches` | Full requirements. Matches section renders `.match-empty`: what would produce a match (transcript from another institution, AP/IB scores, placement results) and how to send it | ENR-186 AC5 |
| `partial` | Requirements render. Matches section degrades to `.match-degraded` — *"We can't check your transcript right now. Nothing already approved has changed."* One requirement shows `Credits pending sync` instead of `n of m`, and the ring carries a `*` footnote so it never states a total it cannot back | Card: *deliver partial data*; [Google AI Studio](https://mobbin.com/screens/bd6669d2-d3df-476e-b933-e44bb25e5259) |
| `error` | The frame's `PageError` inside `PageShell`, so the page head, the navigation and the route out all survive the failure | [Unity](https://mobbin.com/screens/c598fa3d-6ac6-40fc-bebc-cddfc355bb81) |

`empty` is not the same as ENR-185 Scenario 2. Scenario 2 — *a student with no registered courses* — **is
our `success` state**: Maya has registered nothing and still sees eleven requirements, four of them
carrying approved credit. No empty state is ever presented as the whole view for her.

### Cross-cutting states

- **Keyboard** — requirement headers are `<button aria-expanded>`; the drawer traps focus, `Esc` closes
  and focus returns to the opener; the preview picker is a menu with `Esc` and click-outside.
- **Narrow (≤620px)** — requirement badges wrap under the title, the match card stacks evidence over
  target, the drawer is the existing bottom sheet. `.concept-pill` currently hides at this width; the
  picker replaces it and **stays visible**, since the card says design mobile first and a state nobody
  can reach on a phone is not delivered.
- **Reduced motion** — the skeleton shimmer and the expand transition both fall back to no animation
  through the existing `prefers-reduced-motion` block.

## 4. Interactions

### 4.1 What each control does — and must never do

| Control | Does | Must never |
| --- | --- | --- |
| Requirement header | Expands / collapses its courses | Change a status |
| Course row | Opens the drawer with catalog detail | Register the student — registration is out of scope |
| Match card / See the evidence | Opens the match drawer | Accept, dismiss or apply the match |
| Ask Tomás | Raises a toast naming what would happen | Send anything, or imply the advisor has read the file |
| How credit is approved | Opens `InfoModal` variant `credit` | Present the rule as a decision |
| Preview state picker | Swaps the demo state | Appear as student functionality |

No control on this screen writes to a requirement, a credit total or the ring. There is no accept
button, no dismiss button, no "apply this match" — ENR-186 AC4 means the affordance must be **absent**,
not disabled.

### 4.2 The preview state picker

The `.concept-pill` is a menu button (`aria-haspopup="menu"`). The frame offers five states on every
page; **on My Classrooms `App` passes the six-state list**, so `no-matches` is offered only where it
means something. The pill names the active state whenever it is not `ready`, so a Jam recording is
never ambiguous about what is on screen, and `?state=` makes it linkable.

### 4.3 Navigation

`App.jsx` gains `section` state, initialised from `window.location.hash` and kept in sync with
`hashchange`. `Sidebar` sets it. Two sections resolve; the other four are marked
`.nav-item.unavailable` with `aria-disabled="true"` and a small `Soon` marker — honest, now that two
rows respond and four do not. On section change, focus moves to the page heading and the workspace
scrolls to top.

**No badge on My Classrooms.** A count next to it would be the match count, and a number in the nav
reads as something owed or earned. Matches are neither.

## 5. Data

New read model, `src/data-academics.js` — separate from `src/data.js` because the epic frames the
catalog as *a read model published by staff*, which is a different provenance from the student's own
task data.

```js
export const program = { name, degree, classOf, catalog, publishedOn, creditsToGraduate, officialRecord };
export const requirements = [{
  id, group, name, summary, creditsRequired, creditsApproved,
  decidedOn,                       // present only when credit was approved
  courses: [{ code, title, credits, terms, prerequisite, state, evidence, decidedOn }],
}];
export const creditMatches = [{
  id, evidence: { document, source, detail, uploadedOn },
  target: { requirementId, courseCode, courseTitle, credits },
  rule: { code, text }, confidence, confidenceNote, advice,
}];
```

`src/lib/academic-helpers.js` — `requirementStatus`, `statusLabel`, `creditTotals`, `matchesFor`.
`requirementStatus` reads `creditsApproved` / `creditsRequired` only; `creditMatches` is not one of its
inputs and cannot become one without the function signature changing.

Numbers, so they are checkable: core curriculum 34 credits, major 40, electives 46 — 120 to graduate.
Approved: `MATH 101` 4 + `PHYS 121` 4 + `SPAN 101` 3 + `ARTS 150` 4 = **15**. Requirements met:
Quantitative Reasoning 4/4 and Arts & Humanities 4/4 = **2 of 11** = 18%. Under review: `SPAN 201` 3 +
`CS 110` 4 = **7**, counted nowhere.

The 7 is the credit the *target courses* carry, not the credit the evidence carries — and the CS 110
match exists precisely because those two numbers disagree (Northside's course is 3 credits, Aster's
is 4). The drawer says so; the rail never adds the figure to anything.

### Files

```
src/components/MyClassrooms.jsx    ← the page
src/components/RequirementCard.jsx
src/components/CreditMatchCard.jsx
src/components/AcademicColumn.jsx
src/components/AcademicDrawer.jsx  ← one drawer, kinds 'course' | 'match'
src/components/PreviewStateMenu.jsx ← shared with ENR-180, see §8
src/components/InfoModal.jsx       ← + variant 'credit'
src/Icon.jsx                       ← + circle, half (24×24, stroke 1.9)
src/data-academics.js
src/lib/academic-helpers.js
src/lib/preview-state.js           ← shared with ENR-180, + the `no-matches` id
src/lib/navigation.js              ← my-classrooms: built, and a lede that says requirements
src/App.jsx                        ← one dispatch branch in `renderPage`
src/styles/app.css                 ← new classes, appended as one block
```

## 6. Out of scope

From [ENR-173](https://audentra.atlassian.net/browse/ENR-173): **course registration itself**;
**changing any academic outcome**; club membership; event registration. Also out, for this card:

- **My Campus Life** — the other half of the epic, and not this card.
- **The four remaining nav sections** — marked unavailable, not built.
- **Accept / dismiss on a match** — forbidden by ENR-186 AC4, and there is no card for a student-facing
  approval flow.
- **Renaming the section to *My academics*** — [ENR-167](https://audentra.atlassian.net/browse/ENR-167)
  left this open for a Jam. Card name kept; raised again in the report, not decided here.

### The Harvard leftover, no longer ours to fix

At specification time `TaskDrawer.jsx` still rendered `payments.harvard.edu` and an `H` university
mark, against ENR-167's *"no `Harvard` string remains anywhere in `src/`"*. While this card was being
built, ENR-160 moved that copy into `data.js` as `destination.url = 'payments.aster.edu'` with
`mark: 'A'`. The defect is gone; nothing was done here.

## 8. Built against a frame that landed mid-card

[ENR-180](https://audentra.atlassian.net/browse/ENR-180) — the portal navigation — was specified and
implemented **while this card was being built**, in the same working tree. That invalidated four
assumptions in §2–§4 above, and the page follows ENR-180 rather than this spec's first draft:

| This spec first said | What shipped | Why |
| --- | --- | --- |
| Route `#my-classrooms`, section state in `App.jsx` | Route `#/my-classrooms`, `destinationByRoute` | ENR-180 owns routing; `navigation.js` is the single source |
| A `.welcome-panel` hero like My Enrollment | `PageShell`'s standard head + a `.catalog-bar` | ENR-180: *only* My Enrollment keeps a hero; every other page takes the standard head |
| A picker holding six states in component state | `PreviewStateMenu` writing `?state=` | ENR-180's control and transport, so a Jam link carries the state |
| The page renders `loading` and `error` itself | The frame renders `PageSkeleton` / `PageError` | One loading state for the whole portal beats a second one that drifts |

The page therefore handles `ready`, `empty`, `no-matches` and `partial`; `loading` and `error` are
the frame's. All six are still reachable from the pill, which is what the card asked for.

Two files are genuinely shared and were edited by more than one card: `src/lib/preview-state.js`
(this card added the `no-matches` id; ENR-180 added `FRAME_STATES`) and
`src/components/PreviewStateMenu.jsx`.

### Raised, not absorbed: My Classrooms versus My Progress

`navigation.js` puts **My Progress** under Academic, described as *"credits earned, requirements met,
and what is left"* — which is what this page now shows. ENR-180 §11 already flagged the same concept
appearing twice under two names, for My Progress versus the academic panel inside My Financials.
This card makes it a three-way overlap.

The stories decide it for this screen: [ENR-185](https://audentra.atlassian.net/browse/ENR-185) is
titled *See what my degree requires before I see courses*, is labelled `screen-my-classrooms`, and is
what ENR-188 serves. So requirements live here. **My Progress now has no distinct job**, and no card
defines one. Not decided here — it needs a human call at refinement, and it is the one open question
this card leaves behind.

## 7. Done when

- [x] Requirements are the organising unit; courses appear only inside a requirement (ENR-185 AC1)
- [x] Every requirement shows satisfied / in progress / not started, computed from approved credit alone (AC2)
- [x] A student with no registered courses sees eleven requirements, not an empty state (AC3)
- [x] Prerequisites are visible on the course rows where they bind (AC4)
- [x] The catalog is labelled as published, read-only staff content (AC5)
- [x] The Registrar's Office is named as the holder of the official record (AC6)
- [x] A match shows evidence, target, rule and confidence (ENR-186 AC1, AC2)
- [x] A match is labelled advisory and states approval is still required (AC3)
- [x] No status, credit total or progress figure moves because a match exists — and no control could make it (AC4)
- [x] The no-matches state explains what would produce one (AC5)
- [x] A route to Tomás is offered from every match (AC6)
- [x] Six states reachable from the picker, including on a phone
- [x] Built from tokens, existing classes and our own icons; no new dependency
- [x] `npm run build` clean; checked at 1600, 1440, 1000, 620 and 380px
- [x] `Esc`, focus trap and focus return verified on drawer, modal and picker
