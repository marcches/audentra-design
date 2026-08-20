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

**The headline: every screen the board asks for is built.** Fifty-three cards carry
`persona-student`; fourteen of them carry `design` and are screens. Thirteen are in this repo and all
thirteen render. What is left is three pieces of behaviour that no screen card covers, one small
follow-up, and a large pile of acceptance.

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

Four items. Three need a card written; one is a follow-up small enough to ride along with anything.

### 2.1 ENR-161 — See what changed since I was last here · no surface exists

`Prioritized`, under ENR-148, served on paper by ENR-167 (QA). In practice the shell answers almost
none of it, and removing the Messages bell in `7b7a47e` made that visible rather than causing it.

| AC | State |
|---|---|
| 1 · unread indicator visible from every section | **partial** — the sidebar carries `openSteps`, `decisions` and `required` on every page, but those count outstanding *work*, not *changes* |
| 2 · each notification names what changed, when, and links to the item | **missing** — no notification object exists |
| 3 · opening the item marks it read, and the read state **persists** | **fails** — `markDecisionRead` (`src/lib/documents.js:143`) rewrites React state only. A reload restores the unread mark. The only things this repo persists are Edward's threads and the sidebar group collapse, both via `localStorage` |
| 4 · categories: action required, action completed, record changed | **missing** |
| 5 · no notification implies a reply will reach a person | holds vacuously — nothing invites a reply |
| 6 · a stale notification explains itself | **missing** |
| 7 · external delivery respects contact preference | out of reach — no mail in this prototype |

**ENR-158 AC5** depends on the same missing half: My Documents landed the unread mark, the sidebar
count and the toast, and left the notification itself for whoever builds this.

AC3 is the one worth fixing regardless of how big the rest gets — a read mark that a refresh undoes
is worse than no read mark, because the student learns not to trust it.

### 2.2 ENR-162 — See my points and what they are worth · half built

`Prioritized`, under ENR-148. `MomentumCard.jsx` exists and is good; it is in the wrong place and
says half of what the story asks.

| AC | State |
|---|---|
| 1a · balance visible **from every section** | **fails** — `MomentumCard` sits inside `InsightColumn`, which only `EnrollmentPage` renders. Twelve of thirteen destinations show no balance |
| 1b · expressed in points **and in its institution defined value** | **fails** — the card says `1,234 pts` and nothing else. No monetary or institution-defined value exists anywhere in the repo |
| 2 · points attributed to the requirement that earned them | met — every task carries `points`, and the completed list shows them per item |
| 3 · values come from published configuration, never hard coded | prototype boundary — they are literals in `data.js`, with no configuration object to read from |
| 4 · earned points are not recalculated when configuration changes | untestable while AC3 stands |
| 5 · an institution that disables rewards leaves nothing behind | **fails** — there is no `rewardsEnabled` flag. `MomentumCard`'s `unavailable` prop is a *load failure* ("your balance didn't load this time"), which is a different state and says the opposite thing |
| 6 · points never compete visually with an outstanding required action | holds today, and only by accident: the card is in the rail of the one page that lists those actions. Promoting the balance to the shell is exactly where this AC starts to bite |

Medium card: move the balance into the shell, give it the institution value, add the disabled state.
AC6 is the design problem, not the plumbing.

### 2.3 ENR-214 — Know when an unmet requirement will block class registration · not started

`Backlog`, `wave-mvp-demo`, under ENR-145, **no design card on the board**. The newest student story
and the only one that is neither built nor covered by a screen card.

*Blocked* already means something in this repo, and it is not this. ENR-156 gave us `lockedTasks` —
a step whose **prerequisite** is unmet (`'Complete "Tell us where you'll live" first'`). ENR-214 is a
different gate: a requirement that is open to act on right now, and whose being unmet will refuse
class registration later.

Buildable here — ACs 1, 2 and 6: mark the gating requirement wherever it appears, state *what* it
blocks and *by when*, and show a requirement in review as pending rather than met. `lib/documents.js`
already distinguishes `checking` from `in review`, so AC6 is nearly free.

Not buildable here — ACs 3, 4, 5 and 7: refusal at the registration call, enforcement below the
interface, the gate lifting on acceptance, and which requirements gate being configuration. All
backend.

**One concrete thing to reconcile:** the gate is already written into the product, on another screen,
unlinked. `src/campus-data.js:24` — *"Every new student attends one orientation session. If you miss
all of them, the Registrar holds your course registration until you attend a make-up session."* That
session is a required event on My Campus Life, and nothing in the checklist says it gates
registration. ENR-214 is the card that joins them.

### 2.4 ENR-160 AC3 — the financial document link · small follow-up

The financial checklist must link to where the file is actually submitted.
`src/components/financials/DocumentList.jsx:62` opens the task drawer, which is correct, and the
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

1. **ENR-161** — write the card. Biggest hole, and the one the student feels: nothing in the portal
   answers *what changed*. Fix AC3's persistence even if the card lands later.
2. **ENR-162** — write the card. Half the work is deciding what a point is *worth*, which is a
   product question and not a build one.
3. **ENR-214** — write the card, scoped to ACs 1, 2 and 6, with the orientation-session gate in
   `campus-data.js` as the worked example.
4. **ENR-160 AC3** — one `section` field on the financial document tasks. Rides along with anything.

After those, the student portal is feature-complete against the board as it stands, and everything
remaining is a Jam signature.
