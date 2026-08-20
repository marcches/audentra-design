Jira: ENR-214
Status: prioritized
Labels: persona-student, screen-my-enrollment, wave-mvp-demo
Jam: (none)

> **Recorded divergence: this spec is written against a `História`, not a `Tarefa`.**
> [ENR-214](https://audentra.atlassian.net/browse/ENR-214) has no design card on the board —
> [ENR-164](https://audentra.atlassian.net/browse/ENR-164), the My Enrollment screen card, serves
> only AUD-155 and AUD-156. `docs/agents/issue-tracker.md` forbids opening a Jira issue without being
> asked, and Marco chose on 2026-08-20 to spec against the story rather than create one. So this file
> has no *Design brief*, *Scope note* or *Serves* to quote: the acceptance criteria and scenarios on
> ENR-214 are the whole contract. Jira status is `Backlog`; Jira stays authoritative.
>
> References: `references.md` in this directory.

# The registration gate — find out while you can still fix it

## 0. Current behaviour, confirmed before designing

- **A registration gate does not exist.** Nothing in `src/data.js`, `src/lib/task-helpers.js` or any
  component knows that a requirement can block anything.
- **"Blocked" already means something else, and it is not this.** ENR-156 built `lockedTasks` —
  a step whose *prerequisite* is unmet: *"Choose your move-in time / Your arrival window will appear
  after your housing plan is confirmed / Complete 'Tell us where you'll live' first."* That is a step
  the student **cannot start yet**. ENR-214 is the opposite: a step they **can act on right now**,
  whose being unmet will refuse something later. Two states, two vocabularies, and the screen will
  read as broken if they borrow each other's words.
- **The gate is already asserted in the product, on another screen, unlinked.**
  `src/campus-data.js:24` — *"Every new student attends one orientation session. If you miss all of
  them, the Registrar holds your course registration until you attend a make-up session."* That
  session is a required event on My Campus Life. Nothing in the checklist says it gates anything.
- **The date exists too.** `src/appointments-data.js:65` — *"Course advisors publish their times once
  course registration opens on 1 September."*
- **The three review states are already right.** `src/lib/documents.js` distinguishes `checking`
  (a machine wait, advances on a clock) from `in review` (a person's decision, never advances). AC6
  is nearly free because of it.
- **The signpost mechanism exists.** `TaskDrawer.jsx:141` renders `task.section` — *the section owns
  the door; this is a signpost to it* — built by ENR-206 and generalised by ENR-207.

## 1. What this screen answers

*Which of these will stop me registering for classes, and have I got time to fix it?*

Not a new screen. A change to My Enrollment, plus the same mark wherever a gating requirement appears
elsewhere — AC1 says *wherever it appears in the checklist*, and in this repo a requirement appears in
up to three places.

## 2. The domain

### Registration gate

`src/registration-data.js` — the *configuration* AC7 asks for, as far as a prototype can carry it.

```js
export const registration = {
  opens: '2026-09-01',
  label: 'class registration',
  gatedBy: ['immunization-record', 'orientation-session'],
};
```

Which requirements gate is **data, not code**: no component may name a requirement id. Marco chose
these two on 2026-08-20, and each earns its place:

- **`immunization-record`** — already a document requirement in `documents-data.js`, already routed
  to Health by ENR-206, and it goes through **review**. It is the only one that can exercise AC6, the
  gate that lifts on acceptance and not on submission.
- **`orientation-session`** — already a required event in `campus-data.js`, and the product already
  says out loud that the Registrar holds registration for it. This one joins two screens that
  currently disagree.

A **financial hold** was offered and not chosen; if the Jam wants it, it is one id in `gatedBy` and
no other change, which is the test of whether AC7 was honoured.

### Gate state

Derived, never stored. `src/lib/registration.js`:

| State | When | The student's part |
| --- | --- | --- |
| `open` | every gating requirement met | none |
| `held` | at least one unmet and not submitted | **theirs** — act |
| `waiting` | every unmet one is submitted and in review | **not theirs** — the reviewer holds it |

The third row is the one that matters. `waiting` is not `open` — AC6 — and it is not `held` either,
because telling a student to act when the institution is the holder is the failure
[Mercury](https://mobbin.com/screens/2a7de612-6f88-42d7-bce5-1d8fe2219314) avoids by saying *no
action is needed on your end*.

`CONTEXT.md` gains **Gating requirement** (a requirement whose being unmet refuses a later action —
distinct from a **locked step**, whose prerequisite is unmet) and **Registration gate**.

## 3. Layout

### 3.1 My Enrollment — the `notice` slot

One line, true of the whole section, which is what `PageShell`'s `notice` slot is for. Above the
tabs and above every card, because an obligation must not hide behind something nobody opened —
the rule ENR-189 already set.

```
┌───────────────────────────────────────────────────────────────┐
│  Two steps must be done before class registration opens on    │
│  1 September — 12 days away.        See what's blocking →     │
└───────────────────────────────────────────────────────────────┘
```

Three clauses, from [Customer.io](https://mobbin.com/screens/b9bde54a-06d4-4204-9645-b5bc94694684)
plus the one it lacks: what is happening, what it needs, **and by when**. The route scrolls to the
first gating card; it does not open a modal
([Whop](https://mobbin.com/screens/11c1db5a-5a81-4f39-8722-de70adf6a925), rejected — a standing
condition is not something you dismiss).

Wording by state:

| Gate state | Notice |
| --- | --- |
| `held` | as above; `--amber` ground, because there is time and a deadline is not a failure |
| `held`, deadline inside 7 days | same line, `--crimson` ground. **The only escalation this card spends** |
| `waiting` | *"Your immunization record is with Health Services. Nothing more is needed from you before registration opens on 1 September."* `--canvas` ground, no accent |
| `open` | no notice. Not a green success bar — a gate that is open is not news |

### 3.2 The task card — the mark

A chip on the card, in the row that already holds the due date. Not a border, not a left bar, not a
tinted card: this repo does not accent a rounded card with a painted edge, and the card already has a
place where standing is written.

```
┌─────────────────────────────────────────────────┐
│  Immunization record                            │
│  Health Services needs this before you register │
│                                                 │
│  ⚑ Blocks class registration   ·   Due Nov 30   │
└─────────────────────────────────────────────────┘
```

- The chip reads **`Blocks class registration`** — never *blocked*, which is the locked-step word.
- Ranked above the points line and above the category, and it never shares a row with them. Flat
  construction is not flat content: this is the exception on the card, and it gets the one mark.
- `flag` is a new `Icon.jsx` entry, 24×24, stroke 1.9.

### 3.3 The same requirement in review

From [Airwallex](https://mobbin.com/screens/5b2e67a8-ded8-496b-80f0-d2aa8ab4ae03) — two words on one
line, neither of them *done*:

```
  ⚑ Blocks class registration  ·  In review since Nov 12
```

The chip **stays**. That is AC6: submitting did not lift the gate, and the card must not celebrate.
The tick that means *met* is not rendered until the decision is accepted.

### 3.4 Everywhere else the requirement appears

AC1 says *wherever it appears in the checklist*, and a requirement in this repo appears in up to
three places. The chip is one component, read from the same helper, in all of them:

- **My Documents** — on the requirement row.
- **Health** — on the immunization record panel, which is the door ENR-206 built.
- **My Campus Life** — on the orientation session, whose required strip already exists. This is where
  the copy in `campus-data.js:24` stops being an orphan.

## 4. States

| Surface | State | What renders |
| --- | --- | --- |
| Notice | loading | nothing. A gate that might not exist must not flash a warning |
| Notice | figures unavailable | *"We couldn't check what's outstanding for registration."* No count, no date, no `0` |
| Notice | error | same line plus `Try again`; the checklist below stays usable |
| Notice | `held` / `held` urgent / `waiting` / `open` | §3.1 |
| Chip | requirement unmet | `Blocks class registration` |
| Chip | submitted, `checking` | `Blocks class registration · Checking` |
| Chip | submitted, `in review` | `Blocks class registration · In review since <date>` |
| Chip | accepted | chip absent. The requirement is met and says so the ordinary way |
| Chip | rejected | `Blocks class registration · Needs another try` and the row keeps its route |
| Whole feature | no gating requirement configured (`gatedBy: []`) | no notice, no chips, no gap. An institution that gates nothing leaves nothing behind |

The last row is the same discipline ENR-162 AC5 asks of rewards, and it is reachable: a
`registration-open` entry joins `PreviewStateMenu` so the Jam can see the gate lifted without editing
code.

## 5. Interactions

| Control | Does | Must never |
| --- | --- | --- |
| Notice route | scrolls to the first gating card and focuses it | open a modal, or navigate away from the checklist |
| Chip | nothing. It is a mark, not a control | be focusable, or look pressable |
| Card | opens `TaskDrawer` as it already does | change behaviour because the card is gating |
| Drawer | states the gate once, in words, above the action | repeat the chip |

**Nothing in this card simulates a refusal.** ACs 3, 4 and 5 describe what happens when a student
*attempts to register* — there is no registration call in this repo to refuse. Building a fake
refusal would teach the Jam that the gate is enforced when it is enforced nowhere. §7.

## 6. Data

- **New** `src/registration-data.js` — `opens`, `label`, `gatedBy`.
- **New** `src/lib/registration.js` — `gateState(record, config)`, `gatingCount(record, config)`,
  `daysUntil(opens)` and `isGating(id, config)`. Components ask; they never test an id.
- **Changed** `src/campus-data.js` — the orientation session gains the id `gatedBy` names. Its copy
  at line 24 already says what the gate is; it stops being the only place that knows.
- **Changed** `src/components/TaskCard.jsx`, `RequirementCard.jsx`, `documents/DocumentRow.jsx`,
  `health/…` and the campus required strip — each renders the shared chip.
- **New** `src/components/GateChip.jsx` — one component, so the sentence cannot be phrased five ways
  on five screens.
- **Changed** `src/components/EnrollmentPage.jsx` — passes the `notice` slot.

## 7. Out of scope

There is no card to copy an *Out of scope* from — see the front matter. What this spec declares
itself, and why:

- **AC3 — registration refused, naming the requirement.** No registration exists here to refuse.
- **AC4 — the gate enforced below the interface.** Needs a backend. This is the same class of
  criterion as ENR-208 AC6, and it is declared for the same reason: a gate enforced by a hidden
  control is not a gate, and pretending otherwise in a prototype is worse than saying so.
- **AC5 — the gate lifting on acceptance without staff action.** Half of it is already true, because
  `lib/documents.js` refuses to advance `in review` on a clock. The other half needs a reviewer.
- **AC7, partly.** `gatedBy` is configuration in a data file, which is as far as *not code* reaches
  without an admin surface. ENR-200 and ENR-202 are the admin cards, and they are not this repo's.

## 8. Consciously outside this card's files

- **ENR-160 AC3** — the financial checklist's route to the record — is still open and shares this
  card's mechanism. It is one `section: '#/my-documents'` field on the financial document tasks. Not
  absorbed here; named so it stops being invisible.
- `docs/student-portal-status.md` §2.3 and §6 need a line when this lands.

## 9. Done when

- [ ] A gating requirement is marked on every surface it appears on — My Enrollment, My Documents,
      Health, My Campus Life — AC1
- [ ] The notice states what is blocked and by when, in one line, above the fold — AC2
- [ ] Which requirements gate lives in `registration-data.js`; no component names an id — AC7
- [ ] A submitted, in-review requirement keeps its chip and reads *in review*, never *met* — AC6
- [ ] The `waiting` state tells the student the institution is the holder — AC6, and the holder
      principle `CONTEXT.md` already carries
- [ ] `Blocks` and `blocked` are never used for the same thing; a locked step keeps ENR-156's words
- [ ] The orientation session in `campus-data.js` and the checklist now say the same thing
- [ ] `gatedBy: []` renders no notice, no chip and no gap, and is reachable from the preview menu
- [ ] Loading, empty, error and partial states exist for the notice
- [ ] Nothing simulates a refusal — ACs 3, 4, 5 are declared, not faked
- [ ] `npm run build` passes
