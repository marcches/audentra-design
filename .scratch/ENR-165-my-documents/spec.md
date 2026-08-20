Jira: ENR-165
Status: ready-for-agent
Labels: design, persona-student, screen-my-documents, wave-w2
Jam: (none)

> Jira status is `Prioritized`. The card is fully specified by its épico
> [ENR-146](https://audentra.atlassian.net/browse/ENR-146) and its two stories, so `ready-for-agent`
> is the nearest role in `docs/agents/triage-labels.md`. Jira stays authoritative.

# My Documents — did they get it, and what do I do if they didn't

## 0. Current behaviour, confirmed

`my-documents` is a destination in `src/lib/navigation.js` with `built: false`, so `App.jsx` renders
`SectionPlaceholder`. It is the only destination in the portal that something else already routes to
and that cannot be used:

- `src/components/MyClassrooms.jsx:283` — `Send a record` links to `#/my-documents` from the
  no-credit-matches state.
- `src/data-profile.js:166` — Profile deliberately routes here instead of duplicating the record
  ([ENR-190](https://audentra.atlassian.net/browse/ENR-190)).
- `navigation.js` — `next: 'my-documents'` from both My Enrollment and Financial aid.
- `src/data-edward.js:97` — Edward's suggested question on this page.

Two surfaces already carry part of this subject and must keep working unchanged:

- **My Enrollment** renders `Aster is reviewing` from `initialReviewing` (`EnrollmentPage.jsx:117`).
- **My Financials** renders `DocumentList` — the same `task` objects, filtered by `financial`.

## 1. What this screen answers

*Did Aster get my document, and what do I do if it was rejected?*

The four states of [ENR-158](https://audentra.atlassian.net/browse/ENR-158) are the whole screen.
`In review` has to read as progress rather than silence, so it always names who holds the next step
and how long it usually takes. `Changes requested` is where a student decides whether this
institution is worth the trouble, so it never stops at the reason: it says what would satisfy the
request, and it offers the replacement against the document that failed.

## 2. The domain

`CONTEXT.md` at the repo root is authoritative and was written alongside this spec; this section only
says which of its terms this screen renders and why the obvious words were unavailable.

ENR-157 and ENR-158 both say **requirement**. Bare, that word is taken: `RequirementCard` and
`requirement` mean a *degree* requirement on My Classrooms. **Request** is taken too — `src/lib/help.js`
and `RequestRow` mean a question raised with an office, which travels the opposite way. So the row on
this screen is a **document requirement**, always qualified, and the glossary reserves both bare
words for their existing owners.

| Term | Renders as |
| --- | --- |
| **Document requirement** | The row. A named piece of evidence Aster is waiting for, owned by one office, holding up one or more steps. |
| **Submission** | One attempt at one requirement with one file. Carries its own timestamp and its own decision, and is never deleted — a replacement sits *beside* the old one. |
| **Decision** | What a reviewer concluded about one submission: accepted, or changes requested with a reason. The portal renders decisions and never produces one. |
| **Reason** | The specific, actionable sentence on a *changes requested* decision. A decision without one is not shippable — the épico guardrail, not a copy preference. |
| **Issued document** | A file Aster produced *for* the student. Shares this screen with submissions and shares nothing else with them: read-only, no state, asks nothing. |

## 3. States — the card's four, split into the five the screen needs

Written once in `src/lib/documents.js`, the way `src/lib/help.js` owns Help's four. The two sets
stay separate on purpose and the module head says why: a request to an office is a conversation, a
document under review is a decision about an artefact, and collapsing them would make one of the two
lie.

| State | Who holds the next step | Colour | Reads |
| --- | --- | --- | --- |
| `needed` | The student | amber | `Not sent yet` |
| `checking` | Nobody — the machine | quiet + pulse | `Sent · Aster is checking it` |
| `in-review` | **Aster**, named | quiet | `With <office> · usually 2–3 business days` |
| `accepted` | Nobody | green | `Accepted <date>` |
| `changes-requested` | The student | crimson | `Changes requested` |

**`checking` and `in-review` are two different waits, and the difference is the whole card.**
Checking is the machine's part: the file arrived, opens, and is the format it claimed. Bounded, fast,
and nobody is deciding anything yet. In review is the institution's part: a person at the owning
office has the submission and has not decided.

This yields the rule the prototype follows literally, from `CONTEXT.md`:

> **Checking advances on a clock; In review never does.**

A timer that flipped a submission into *accepted* would be putting words in a reviewer's mouth, and
ENR-146 puts the reviewer's decision out of scope. So the clock is allowed to carry a submission from
`checking` to `in-review` and stops there. Every decision in the prototype is fixture data.

ENR-158 AC1 names `submitted` as one of its four; on the row that reads *"Sent · Aster is checking
it"*, which says both halves — it reached Aster, and this is not yet a person looking at it.

One more state that belongs to the screen rather than to a requirement:

- **`send-failed`** — a submission that never reached Aster. The requirement falls back to its
  previous state, the failure is stated on the row, and `Try again` retries *that* submission rather
  than creating a second one (ENR-157 AC6).

## 4. Layout

`PageShell` slots, in the order the shell fixes. Mobile first: every region is one full-width column
at 380px; only the rail moves beside the main column at the shell's breakpoint.

| Slot | Region | What it holds | Reference |
| --- | --- | --- | --- |
| `hero` | The band | Copy from `navigation.js`, unchanged. The lede is the only dynamic part: what still needs her, or that the record is clear. | — |
| `summary` | `SummaryFigure` | **The section's one figure: `4 of 6 accepted`**, with the ring — the same construction as My Enrollment's progress, because it is the same kind of standing. One line under it: `1 needs you · 1 in review`. Beside it `AdvisorBar` for Tomás Okafor, who holds her file and decides what she sends to Admissions. | [Airbnb](https://mobbin.com/flows/cf647093-908c-4e24-a382-15ec07cddfda) |
| `alert` | `AlertStrip` | Only when something was rejected: names the document and that Aster is waiting on her. Rides the foot of the summary because it is a footnote to the figure — *this is which one is not counted.* | [Stripe](https://mobbin.com/screens/0da270e9-0831-44ad-8bd5-ff15a0cefc23) |
| `notice` | `.alert-strip` | Only while a submission is `checking`: *"Aster is checking your income verification. You can close this page — it keeps going."* The permission to leave, stated by the page. | [Airwallex](https://mobbin.com/flows/4ddfb2ef-818d-416c-b963-1dedf5c91aa9) |
| `tabs` | — | None. My Documents is a destination, not a group, and a rejection must not be able to hide behind a tab. | — |
| main 1 | `.section-card` — *What Aster still needs* | `.card-rows` of `.document-row` for every requirement where **she** holds the next step: `needed` and `changes-requested`. Rendered only when there is one; when there is not, the card is replaced by a `StateCard` that says the record is clear. | [Revolut](https://mobbin.com/screens/92e54678-09da-479f-8d03-baa0ae45ad12) |
| main 2 | `.section-card` — *On the record* | Every other requirement and every issued document, in one list, newest first — hers and Aster's together, with the caption on the row saying which. Two labelled runs inside it, `.rows-caption`: `Sent by you` then `Sent by Aster`. | [Gusto](https://mobbin.com/screens/e74f522b-aab3-40de-bb2f-0b6cd895f2b9), [Origin](https://mobbin.com/screens/8be11108-cfc3-4db1-a582-5a0bf9d9c74f) |
| `rail` | `.anchor-card` + light card | Anchor: the key secondary figure — **what is with Aster right now**, and the longest wait among them. Light card: what happens after you send something, and the one rule that survives everything — the original is kept and never replaced. | — |
| — | `footer` | The shell's, unchanged. | — |

### The requirement row (`.document-row`)

One anchor per row and it is the state. The label is the requirement; the state is the line under it,
not a pill on the right — a pill on twelve rows is texture, a line that changes per row is
information.

```
+------+--------------------------------------------------+-------------+
| [::] | Household income verification                     |  Sep 2      |
|      | Changes requested · Student Financial Services    |  in 13 days |
+------+--------------------------------------------------+-------------+
| [::] | Immunization record                               |             |
|      | With Health Services · usually 2-3 business days  |             |
+------+--------------------------------------------------+-------------+
| [::] | Final transcript                                  |             |
|      | Accepted 6 Aug · sent by you                      |             |
+------+--------------------------------------------------+-------------+
```

- The icon tile carries the mark, and only when she holds the next step: amber for `needed`, crimson
  for `changes-requested`. Never a painted left edge — the tile is square, the row is not.
- The trailing cell holds the deadline chip and only when there is a deadline the student can miss.
  `accepted` and `in-review` rows have nothing there, and that emptiness is the hierarchy.
- Row height comes from meaning: a row that asks something carries the consequence line and stands
  taller than a row that only states a fact.

### The requirement drawer (`DocumentDrawer`, bottom sheet under 620px)

One scroll. What is in it depends on the state, and the order never changes:

1. **The reason, when there is one** — `.reject-panel`, the only tinted block in the drawer. The
   specific reason, then `What would fix it` as a bulleted list of concrete, physical fixes, then the
   office that decided and when. [OKX](https://mobbin.com/screens/c81afdfb-0caa-4e1e-8276-13914d0b1934),
   [Uvodo](https://mobbin.com/screens/3b3536ad-f788-4718-a0ed-3a6e3c07bfae)
2. **What this requirement is** — what Aster needs, in what format, and why, *before* any file field
   (ENR-157 AC1). The accepted formats and the size limit sit under it as a quiet line, stated before
   the attempt rather than only in an error (AC2). [PayPal](https://mobbin.com/flows/ba094997-f9e7-4f00-bdd3-a233be700bb8)
3. **The upload field**, when she holds the next step. A file whose format is not accepted is refused
   *in the field*, which turns crimson under the same format line, with the file still on screen and a
   way to remove it — never a modal (AC5).
4. **The extraction review**, when the requirement offers it — see below.
5. **History** — every submission, oldest at the bottom, with what happened to each. A replacement
   never removes what it replaced, so a rejection and its reason stay readable after the fix
   (ENR-158 Scenario 4). The original is viewable from here (ENR-157 AC7).

`In review` renders steps 2 and 5 only, and no control at all: the student is never asked to act on a
document already under review (ENR-158 AC7). The drawer says who holds it and how long it usually
takes, which is the whole content of `In review does not ask for action`.

### The extraction review (`.extract-review`)

Only on `income-verification`, the one requirement with an `extract` block. The guardrail is that
extracted values are never confirmed by silence, so:

- Every value is an **editable input, already filled in**, under the mono caption `read from your
  file` — the machine's answer, marked as the machine's.
  [QuickBooks](https://mobbin.com/screens/13555932-4086-4811-a214-0deccbce373d),
  [Revolut](https://mobbin.com/screens/1180d5ee-a7bc-45f2-bb0f-03a09b51859a)
- Each field has two explicit actions, `This is right` and `Fix it`. Nothing is decided until she
  says so, per field.
- **The submit stays disabled while any field is undecided**, and says how many are left. There is no
  `Confirm all`. This is where we leave QuickBooks (whose Save is live from the first frame) and
  refuse [Mercury](https://mobbin.com/screens/8156ac94-1476-4ca2-801e-89444dd78545) outright.
- The encrypted-storage boundary is stated on the panel, from `task.upload.privacy`, which already
  exists.

## 5. Interactions

| Control | Does | Must never |
| --- | --- | --- |
| Row (whole) | Opens `DocumentDrawer` for that requirement. | Open `TaskDrawer`. |
| `Send it` on a `needed` requirement that is also an enrollment step | Routes to My Enrollment and opens that step — `openTaskFromSummary`, which already exists. | Submit the file from two places. `TaskDrawer` owns *send it the first time*; `DocumentDrawer` owns *what happened, and send it again*. The two paths are disjoint, so a duplicate submission has nowhere to come from. |
| `Send a replacement` on `changes-requested` | Submits against the same requirement, appending a submission. | Reset the requirement, clear the history, or reopen a completed enrollment step. |
| `Try again` on a failed send | Retries the same submission. | Create a second one. |
| `This is right` / `Fix it` | Decides one extracted field. | Decide any other field. |
| `Open the original` | Toasts the prototype handoff. | Claim to have downloaded anything. |
| Esc / scrim | Closes the drawer, focus returns to the row. | — |

## 6. Data

New module `src/documents-data.js` and `src/lib/documents.js`, the way ENR-182 and ENR-183 each own
theirs. Nothing is copied from `data.js`:

- A requirement that is also an enrollment step carries `taskId`, and the page reads the live `task`
  from `App` for its deadline and its office. One list, one number, by construction — the pattern
  `DocumentList` established for ENR-160 AC5.
- `initialReviewing` on My Enrollment is the same subject; the requirement whose `taskId` is in review
  reads its state from there rather than declaring its own.
- The five offices come from `src/help-data.js`. No sixth office is invented.

## 7. Preview states

`DOCUMENT_STATES` in `preview-state.js`, offered by the topbar on this page only:

| Id | Shows |
| --- | --- |
| `ready` | All four states at once — that is what the card is about. |
| `changes-requested` | The rejection, with its reason and its route forward, as the whole subject. |
| `checking` | A submission still with the machine, and the banner that gives permission to leave. |
| `send-fails` | A send that never reached Aster. Reuses Help's id — same failure, same word. |
| `empty` | Aster has asked for things; nothing has been sent and nothing issued. |
| `partial` | The record loaded; the review outcomes could not be read. **Nothing renders as accepted.** |
| `loading` / `error` | The frame's. |

`partial` is the one that matters most, for the same reason it does on Profile: a decision nobody
could read must never render as a decision.

## 8. Acceptance coverage

ENR-165 is the screen; the behaviour it must support is the fourteen acceptance criteria of the two
stories it is blocked by. Every one lands somewhere, and this table is what gets checked before the
card is called done.

### [ENR-157](https://audentra.atlassian.net/browse/ENR-157) — upload and carry on

| AC | Where it lands |
| --- | --- |
| 1 · states what document, what format, why, before asking for a file | Drawer step 2, printed from the requirement — never global copy. |
| 2 · formats and size limits stated before the attempt | Same block, as the quiet line under it. Never only in an error. |
| 3 · processing continues after she navigates away | The `checking` state lives on the requirement, not in the drawer, and the `notice` banner says so out loud. |
| 4 · returning always shows the current state | The row reads the requirement's state on every render; nothing is cached at the moment of upload. |
| 5 · unsupported file refused before upload, formats named | The field itself turns crimson, with the rule that failed named. No modal. |
| 6 · a failed upload retried without a duplicate | `send-failed` retries *that* submission. `Try again` and `Choose another file` are separate controls. |
| 7 · the original is retained and viewable | History, step 5. A replacement is appended beside the original, never over it. |

### [ENR-158](https://audentra.atlassian.net/browse/ENR-158) — see what happened and fix it

| AC | Where it lands |
| --- | --- |
| 1 · four distinct states | §3, split into five so the two waits are not one. |
| 2 · changes requested always names an actionable reason | Drawer step 1: reason, then what would satisfy it, then the route. |
| 3 · replace without restarting or losing history | §5. The replacement is submitted against the same requirement. |
| 4 · in review names the holder and a timeframe | The row's own line: `With <office> · usually 2–3 business days`. |
| **5 · a decision reaches her through a notification as well as the page** | **The gap this table caught.** A decision she has not seen carries `unread` on the requirement — the pattern `src/lib/help.js` already established — the sidebar row gets a `badge`, and arriving on the page marks it read. In-session, the toast announces it. The portal cannot send email and will not pretend to. |
| **6 · acceptance updates the requirement and anything it unblocks, at the same time** | **The second gap.** `data.js` already carries `task.unlocks` and `lockedTasks`. An accepted requirement states what it released, and the release is rendered from the same state change — never as a second, later event. |
| 7 · never asked to act on something already under review | The drawer renders no control at all in `in-review`. Not a disabled one — none. |

Two ACs are **partly outside this screen**, and the spec says so rather than quietly claiming them:

- AC5's *notification* half is a portal-wide surface. `messages` is `built: false` with no card on the
  board (`docs/student-portal-status.md` §2.2). What lands here is the unread mark, the badge and the
  toast; an actual message thread is not this card's to build.
- AC6's *unblocking* is real but small in this fixture: `income-verification` carries `unlocks: 1`.
  The screen renders the relationship honestly at the size the data has, and does not invent a
  dependency graph to show off.

## 9. Out of scope

Copied from ENR-146. Do not build these, and do not build them smaller:

- **The reviewer decision** — that is the staff document review épico (ENR-59, ENR-60, ENR-61, ENR-86).
- **Extraction accuracy** — the values are fixture data; how they were read is not this screen's
  subject.
- **Retention policy** — the screen states that the original is kept. It never states for how long.

## 10. Done when

- [ ] A submission can be made, and the student can navigate away while it is still checking;
      returning shows the current state, not the state at the moment of upload.
- [ ] An unsupported file is refused in the field, before upload, with the accepted formats named.
- [ ] A failed send can be retried without producing a second submission.
- [ ] Every state is distinct on the row, and each says who holds the next step. `Checking` advances
      on a clock; `In review` never does.
- [ ] `Changes requested` names a specific reason and what would satisfy it, and offers a replacement
      without restarting.
- [ ] `In review` requests nothing of the student and names the office holding it.
- [ ] A replacement leaves the earlier submission and its rejection reason readable.
- [ ] The original is viewable for every requirement that has one.
- [ ] A decision she has not seen is marked unread on the row and counted on the sidebar; opening it
      clears the mark.
- [ ] An accepted requirement states what it unblocked, in the same state change.
- [ ] Extracted values are decided field by field; the submit does not unlock on silence.
- [ ] Tokens, existing classes, our own icons, no new dependency.
- [ ] `npm run build` clean; checked at 380px and wide; Esc and focus return verified on the drawer.
