# Student portal — what is built and what is left

Read from the `ENR` board on **2026-08-20 20:45**, cross-checked against the repo (`src/lib/navigation.js`
`built:` flags, the component tree and the git log). Staff, Platform and Admin cards are out of this
report; only the `Student ·` and `Both ·` scope that the student portal renders is counted here.

How to read the board: a **Tarefa** is the buildable screen card — that is what lands in this repo.
A **História** is the acceptance story behind it, and it moves on its own clock (most are still
`Prioritized` even where the screen is already in QA). The Épico only groups them.

Re-derive the set with:

```
project = ENR AND labels = persona-student AND labels = design
project = ENR AND labels = persona-student AND issuetype = História AND statusCategory != Done
```

**The headline: the student portal is feature-complete against the board.** Fifty-three cards carry
`persona-student`; fourteen of them carry `design` and are screens. Thirteen are in this repo and all
thirteen render. The three pieces of behaviour no screen card covered — ENR-161, ENR-162 and
ENR-214 — were specced and built on 2026-08-20. What is left is one small follow-up and a large pile
of acceptance.

---

## 1. Screens — all fourteen landed

| Card | Screen | Jira | Landed in |
|---|---|---|---|
| ENR-163 | Onboarding | Concluído | before this repo — owned elsewhere |
| ENR-167 | Student portal shell | QA | `1eaacff` |
| ENR-164 | My Enrollment | QA | `83fe604`, `b931d86` |
| ENR-180 | Portal navigation | QA | `4d9458b` |
| ENR-181 | Edward floating control | QA | `6100c3e` |
| ENR-166 | My Financials (Overview / Aid / Payments) | QA | `1eaacff` + pages |
| ENR-188 | My Classrooms | QA | `cd19791` |
| ENR-189 | My Campus Life (Events / Clubs) | QA | `1eaacff` |
| ENR-182 | Help | QA | `1eaacff` |
| ENR-183 | Appointments | QA | `d5612fb` |
| ENR-184 | Profile | QA | Jam passes |
| ENR-165 | My Documents | **Development** | `01184a0` |
| ENR-206 | Health | QA | `dde2a65` |
| ENR-207 | Housing | QA | `dde2a65` |

Plus three passes that belong to no single card: `5ddab1d` and `4b48031` (the Jam of 2026-08-20) and
`7b7a47e` (removing Messages).

All thirteen destinations in `navigation.js` are `built: true`. **The navigation no longer promises a
page nobody owns** — see §2.4.

---

## 2. What is genuinely left

One item. The other three landed on 2026-08-20 and are recorded below with what they settled.

### 2.1 ~~ENR-161 — See what changed since I was last here~~ — landed

Built as the second pass on ENR-167, whose design brief already named notifications and points and
whose first pass built neither. Spec:
`.scratch/ENR-167-student-portal-shell/spec-notifications-and-points.md`.

The bell is back, and this time it has something behind it: a panel ranked into **needs you** and
**also new** rather than three equal tabs, every row naming what changed, which office and when.
What it settled, beyond the card:

- **Read state persists**, and there is one of it. `lib/notifications.js` owns a `localStorage`
  store, and `markDecisionRead` in `lib/documents.js` writes the same keys — so a decision opened on
  My Documents is read in the panel and survives a reload. That is AC 3, which failed outright
  before, and it closes the half of **ENR-158 AC 5** My Documents left open.
- **A colour rule for the corner**: the interruption may spend colour, the reward may not. The bell
  is crimson only when something in the feed needs her and ink when it is only news — the brief's
  *findable without being anxious* as a rule rather than an intention.
- **AC 6 renders**: a withdrawn item stays in the feed, says why, and links nowhere.

AC 7 — external delivery respecting a contact preference — stays out of reach. No mail here.

### 2.2 ~~ENR-162 — See my points and what they are worth~~ — landed

Same pass. Marco chose the **reward catalogue** reading of AC 1: a point's institution-defined value
is what it redeems for, and Aster states no exchange rate because it has none.

- The balance moved to the topbar, so it is on all thirteen sections instead of one. `MomentumCard`
  stopped repeating it and kept what only My Enrollment can say — how far the balance is from the
  next thing it reaches, and what today's steps are worth.
- `rewards-data.js` is the published configuration and `data.js` holds the **award ledger**. Nothing
  recomputes a balance from the configuration, which is AC 4 as structure: history cannot be
  recalculated because history does not read it.
- **Nothing is redeemable.** ENR-148 puts redemption mechanics out of scope, so a catalogue row is
  information and carries no control.
- `rewards-off` in the preview menu turns the whole programme off — no chip, no card, no points line
  on a task card or in the drawer, and no gap where any of them were.

One divergence recorded rather than smoothed: below 820px the chip shows the balance and the value
moves one tap away into the popover. AC 1 asks for both everywhere.

### 2.3 ~~ENR-214 — Know when an unmet requirement will block class registration~~ — landed

Written against the história, since ENR-164 serves only AUD-155 and AUD-156 and `issue-tracker.md`
forbids opening a Jira issue unasked. Spec: `.scratch/ENR-214-registration-gate/spec.md`.

- **The gate is not the lock.** ENR-156's `lockedTasks` is a step she *cannot start*; a gating
  requirement is one she *can act on now* that will refuse something later. They share no words —
  the chip says *blocks*, never *blocked*.
- **The orphan is adopted.** `campus-data.js:24` has said the Registrar holds course registration for
  the orientation session since ENR-189, and `documents-data.js` has said class registration opens
  once the immunization record clears since ENR-206. Both were copy nothing read. They are now the
  two entries in `registration-data.js`, and the same chip renders from them on My Enrollment, My
  Documents, Health and My Campus Life.
- **AC 6 holds**: submitting does not lift the gate. The chip stays and reads *in review*; only
  acceptance removes it, which `registration-open` and `health-settled` both make checkable.
- ACs 3, 4, 5 and part of 7 are declared out of reach, not faked. There is no registration call here
  to refuse, and a simulated refusal would teach a Jam the gate is enforced where it is enforced
  nowhere.

### 2.4 ENR-160 AC3 — the financial document link · small follow-up

The financial checklist must link to where the file is actually submitted.
`src/features/financials/DocumentList.jsx:62` opens the task drawer, which is correct, and the
drawer then offers no route to the record.

This got cheap after ENR-206. `TaskDrawer.jsx:141` already renders a `task.section` signpost — *the
section owns the door; this is a signpost to it* — used by Health and Housing. A financial document
task carrying `section: '#/my-documents'` closes AC3 with the mechanism that already exists.

---

## 3. Declared out of reach, not forgotten

Properties of the shape rather than build work. Each is stated plainly in its spec instead of being
simulated:

- **ENR-208 AC6** — the accommodation answer concealed from instructional staff *below* the
  interface. Needs a backend. Recorded in `.scratch/ENR-206-health/spec.md` and `docs/adr/0001`.
- **ENR-214 AC3–5, AC7** — the registration gate enforced anywhere but the interface.
- **ENR-158 AC5**, external half, and **ENR-161 AC7** — no mail server in this prototype.
- **ENR-146** puts the reviewer's *decision* out of scope, which is why `lib/documents.js` holds the
  rule that **checking advances on a clock; in review never does.**

---

## 4. Acceptance, not build work

Twenty-five stories sit `Prioritized` while their screens sit in QA. They are what a Jam signs off:

| Story | Screen |
|---|---|
| ENR-155, ENR-156 | My Enrollment |
| ENR-157, ENR-158 | My Documents |
| ENR-159, ENR-160 | My Financials |
| ENR-161, ENR-162 | Portal shell — **see §2.1 and §2.2, these two are not only acceptance** |
| ENR-174 | Portal navigation |
| ENR-175, ENR-176 | Edward |
| ENR-177 | Help |
| ENR-178 | Appointments |
| ENR-179 | Profile |
| ENR-185, ENR-186 | My Classrooms |
| ENR-187 | My Campus Life |
| ENR-205, ENR-208, ENR-209 | Health |
| ENR-210, ENR-211 | Housing |

Onboarding stories **ENR-149** (Concluído) and **ENR-150 to ENR-154** (QA) are further along, and
their screen is not ours.

**Board hygiene:** ENR-165 still reads `Development` although it landed in `01184a0`. Every other
screen card is at QA or beyond. Two divergences from the cards are recorded rather than hidden —
ENR-174 AC1's Academic group (dissolved by the Jam) and ENR-210 AC1's fourth housing plan option.

---

## 5. Not this repo

- **Onboarding** — épicos ENR-143, ENR-144; stories ENR-149 to ENR-154; screen card ENR-163
  (Concluído). Owned elsewhere.
- **Staff side of ENR-146** — ENR-59, ENR-60 (`Development`), ENR-61 (`Ready for Development`),
  ENR-86 (`Prioritized`), if the document round trip has to close.
- **ENR-212** — Staff receives the request to talk to Accessibility Services (`Backlog`).
- **ENR-213** — Staff side of Housing (`Backlog`). Only its AC6, the assignment the student sees, is
  rendered here, from published data.
- **ENR-25 / ENR-85** — Staff Messages. A different product surface, and the reason the student had
  no Messages screen to begin with; see §2.4 of `portal-build-order.md`.

---

## 6. Order

**Specced and built on 2026-08-20. Both landed; what is left is a Jam signature.**

1. **ENR-161 + ENR-162** — one pass, because they share a corner and ENR-167's own design brief says
   so. No new card was needed: ENR-167 already serves both and landed only half of its brief. Spec:
   `.scratch/ENR-167-student-portal-shell/spec-notifications-and-points.md`, references beside it.
   Marco chose the **reward catalogue** reading of ENR-162 AC1 (a point's worth is what it redeems
   for, not a currency) and a **panel on the bell** for ENR-161, not a fourteenth destination.
2. **ENR-214** — spec written against the história, since ENR-164 serves only AUD-155 and AUD-156 and
   `issue-tracker.md` forbids opening a Jira issue unasked. The divergence is recorded in the file's
   front matter. Gated by the immunization record and the orientation session, both of which the
   product already carries. Spec: `.scratch/ENR-214-registration-gate/spec.md`.
3. **ENR-160 AC3** — one `section` field on the financial document tasks. **Still open**, and now the
   only thing on this page that is. It rides along with anything; §8 of the ENR-214 spec names it so
   it stops being invisible.

**One thing the build found that the spec did not.** The `waiting` gate state — the institution is
the holder, nothing is needed from the student — is correct and currently unreachable, because the
orientation session is always outstanding and always hers to act on, so the set of gating items can
never be all-Aster. It renders the moment an institution gates only document requirements, which is
a one-line change to `gatedBy`. Left in rather than removed: the state is right, and deleting correct
logic because this particular configuration cannot reach it would be the wrong trade.

After those, the student portal is feature-complete against the board as it stands, and everything
remaining is a Jam signature.
