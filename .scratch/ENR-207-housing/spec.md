Jira: ENR-207
Status: ready-for-agent
Labels: design, persona-student, screen-housing, wave-mvp-demo
Jam: (none)

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-agent` is the nearest role. Jira stays authoritative.

# Housing — two questions of different weight, and honesty about which of them Aster answers

## 0. What already existed, confirmed before designing

The card says the screen does not exist and is a build from nothing. The *screen* was not there; four
pieces of it were, and the design is shaped by them rather than around them.

- **The plan question was already being asked** — from inside a drawer. `data.js` carries the task
  `housing` ("Tell us where you'll live", `kind: 'form'`), and `TaskDrawer.jsx:211` rendered its
  three options as radios. It was the only `kind: 'form'` in the file. That branch is removed and the
  task's action now routes to `#/housing`: one question, one place where it is answered.
- **The dates were already coherent.** The task is due `Dec 15` with `daysLeft: 117`, which is exactly
  `CAMPUS_TODAY` (2026-08-20) plus 117 days; the locked task "Choose your move-in time" is due
  `Jan 12`. So **Dec 15 → Housing Services assigns → Jan 12 move-in** was already in the data. This
  screen reuses that date and never invents a second deadline.
- **The office already existed as a record**, under a third name. `help-data.js` holds an office
  registry with `housing` in it, and states the rule that no office is invented that nobody else
  names. Its `decides` line — "Where you live, your room assignment, and your meal plan." — is
  reused verbatim in the rail.
- **Half the domain rule was already published.** The guide `housing-answer` (`help-data.js:134`,
  published by the housing office on 2026-08-08) already says: "After the deadline it becomes a room
  assignment, and a room assignment is changed by request rather than by editing an answer." That is
  ENR-211 AC7 in the institution's own words, with a date. The rail renders that guide rather than
  paraphrasing it.

One contradiction was found and is fixed here: `App.jsx` defaulted the plan to `'on-campus'` while the
task sat in `initialTasks` as outstanding. The prototype now opens **unanswered**, which is the state
the card was written about.

## 1. What this screen answers

*Where will I live — and how much of that is actually mine to decide?* —
[ENR-210](https://audentra.atlassian.net/browse/ENR-210) and
[ENR-211](https://audentra.atlassian.net/browse/ENR-211), under
[ENR-173](https://audentra.atlassian.net/browse/ENR-173).

Two questions of different weight. The plan is hers to answer and it is final. The ranking is hers to
write and it is a **preference** — Housing Services assigns. The whole screen is built around not
blurring those two.

## 2. Where it lives

A **top-level destination**, `housing`, last in the sidebar after the `campus` group. Not a leaf of
My Campus Life, and the reasoning is recorded in
[`docs/adr/0002-housing-is-not-a-campus-life-leaf.md`](../../docs/adr/0002-housing-is-not-a-campus-life-leaf.md).
No navigation badge: the obligation is already counted once, as an open step in My Enrollment, and a
second count of the same thing on the same sidebar is a lie the student cannot detect.

## 3. Layout

`PageShell` slots. Mobile first — every region is a single column of full-width rows at 380px; only
the rail and the catalogue's rate column change shape as the viewport grows.

| Slot | Content |
| --- | --- |
| `hero` | `Housing · Catalogue published by Housing Services` / "Let's settle where you'll live, Maya." / a lede that states the response deadline and what answering unlocks. |
| `summary` | `SummaryFigure`, bare — no mark. Label `Your housing plan`; figure is the plan itself (`Living on campus`, `Commuting`, `Arranging my own housing`, `Not answered yet`); the line beneath carries the deadline and, when on campus, how much of the shortlist is written. |
| `notice` | Only when the save of a plan or a ranking failed. **Never** the influence caveat — see §5. |
| `tabs` | None. Housing is one screen. |
| `rail` | Two cards — §3.3. |

### 3.1 Main column — the plan panel, always first

`.choice-panel`, the class `TaskDrawer` already owns, widened to the page. Four options, each a card
with a title and one line of consequence, and a check mark in the corner of the chosen one —
[Docusign](https://mobbin.com/screens/c0248abe-0324-4739-83e6-cbc310da9912).

Above the four, before any of them is read, the sentence that stops any of them reading as a skip:
each of these is a complete answer. Below them, once one is chosen, the line stating what it just did
— [Uxcel](https://mobbin.com/screens/fb7799b3-75b1-486d-a8d3-fce715b245f4) — which is where ENR-210
AC7 lands: confirming a plan is what unlocks *Choose your move-in time*.

The four: **Living on campus**, **Commuting**, **Arranging my own housing**, **I need help deciding**.
The fourth diverges from ENR-210 AC1, which names three — see §7.

### 3.2 Main column — what follows, one of five

The second question exists only for one of the four plans. Its absence is never a blank.

| Plan | What sits below the plan panel |
| --- | --- |
| Not answered | An anticipation panel naming the question that opens next and what will be in it. Not an empty state: nothing is missing, it has not been asked yet. |
| Living on campus | The shortlist panel, then the residence catalogue. |
| Commuting | A completion panel: the plan is her current answer, why there is no ranking, what Aster does next for commuters, and that she can change it until Dec 15. No catalogue — those residences are not hers to rank. |
| Arranging my own housing | The same panel, different copy, and the load-bearing sentence: this is a complete answer and Aster needs nothing further. Carries no pending mark of any kind. |
| I need help deciding | A panel routing to Housing Services through Help, with the `housing-answer` guide beside it, **then the catalogue, read-only**. Someone who asked for help deciding needs the information; hiding it would be the opposite of helping. No row can be added to a shortlist, and each says so. |

**The shortlist panel** — up to three ranked residences, each row printing its ordinal in words
(`1st preference`, never `1st choice`), with move up, move down and remove as explicit per-row
controls — [Record Club](https://mobbin.com/screens/0595c4df-bba1-480e-a5d8-875024e0c81d), minus its
drag handle. Order changes save on their own and announce through `aria-live`. There is no
`Save order` button, because ENR-211 AC3 forbids an order that is not yet saved.

**The catalogue** — a table, one row per residence, the same fields in the same order on every row:
monogram tile, name, building, walk to campus, room types, annual rate, meal plan, and an action.
Sortable by rate and by walk. The list *is* the comparison —
[Zillow](https://mobbin.com/screens/a8e8b6ba-4655-4505-8d1c-64f2386e12bf),
[Navan](https://mobbin.com/screens/5a6271b9-66f8-4f3b-8339-c293c91b682b) — so there is no compare
mode to enter and nothing that breaks when a school publishes forty.

**The residence detail** — a drawer over the list
([TravelPerk](https://mobbin.com/screens/400742aa-9385-480d-bf89-288a39775c5c)), carrying the room
types, the building, the full rate breakdown, the meal plan, and the sentence reconciling both with
My Financials.

### 3.3 Rail

1. **Housing Services** — the anchor card. The response deadline as the section's secondary figure,
   then `decides`, hours, Halloway House and the 2-business-day reply, all read from `help-data.js`.
2. **What a preference is worth** — the long version of the influence sentence, and under it the
   `housing-answer` guide as the institution published it, with its date.

After the deadline, a third element leads the rail: the **stage tracker** —
`Preferences submitted → Housing Services assigning → Room assigned` — the
[Stripe](https://mobbin.com/screens/b24bf79e-1acc-4d99-9f38-b81aa68daaf8) construction. This is how
the screen reads as the process moving on instead of as a page that went read-only by accident, and
it makes the eventual assignment the last step of a path she was already watching.

## 4. States

Five come from the frame. Three ids are new; the save failure reuses `send-fails`, already shared by
Help and My Documents on the reasoning that a send that never arrived is the same failure whatever it
was carrying.

| State | What it shows |
| --- | --- |
| `ready` | **Plan unanswered.** The plan panel and the anticipation panel. The state the card is about. |
| `onboarding-answered` | Plan is on campus and three residences are already ranked, from onboarding. Nothing is asked again; the order is still hers to change. |
| `deadline-passed` | The submitted shortlist, read-only. No add, no reorder, no remove. The stage tracker leads the rail. |
| `room-assigned` | The assignment, with the residence and the room, and the ranking no longer offered. The tracker is on its last step. |
| `send-fails` | A plan or a ranking the server rejected. The previously saved value is what is shown, the failure and its reason are stated in `notice`, and nothing reads as recorded. |
| `loading` | Frame skeleton. |
| `partial` | The plan loaded; the catalogue did not. The plan panel works; the catalogue says only it is missing and that nothing already answered is affected. |
| `error` | Frame error. |
| `empty` | Housing Services has published no catalogue. The plan question still works — it does not depend on the catalogue — and the shortlist area says the catalogue is not published yet. |

## 5. Interactions, and what they must never do

- **Choosing a plan** saves immediately and re-renders what follows. It never opens a confirmation
  step, and no option is ever styled as secondary to the others.
- **Changing a plan** is available until Dec 15. Changing away from *living on campus* keeps the
  shortlist rather than discarding it, and says so; a plan change is not a deletion.
- **Adding a residence** appends to the shortlist. At three, every remaining row's action is disabled
  *with the reason on the row* — never a silently dead button.
- **Ranking** never claims to decide. The influence sentence lives at the head of the shortlist panel
  and nowhere else on the page except the rail's long version. It is **not** in `notice`: that slot is
  for what is true of the whole section, and a commuter never ranks anything. A permanent full-width
  band announcing that this does not decide anything is the thing that would make ranking feel
  pointless.
- **A partial shortlist of one or two is saved and labelled incomplete** — it is never presented as
  complete, and the checklist item stays outstanding.
- **After Dec 15** every mutating control is *absent*, not disabled. A disabled button is an offer
  withdrawn; an absent one is a stage that has passed, which is what the tracker says.
- **This section never calls anything a `request`.** `CONTEXT.md` gave that word to Help, where the
  student asks Aster — the opposite direction from a preference, which Aster decides on. The one
  place the word does appear on the page is inside the quoted `housing-answer` guide, where Aster
  wrote *"a room assignment is changed by request"* — and there it means a Help request, used in
  the direction the glossary gives it. That is the rule read correctly, not an exception to it.

## 6. Data

New: `src/housing-data.js` — the eight published residences, the plan options, the response deadline,
the shortlist and the assignment, one shape per preview state. `src/lib/housing.js` — the rules:
which plan opens the ranking, whether a shortlist is complete, whether the deadline has passed, and
what the checklist item is asking for right now.

Read from elsewhere, never copied: `offices.housing` and the `housing-answer` guide from
`help-data.js`; the `housing` task and its `Dec 15` from `data.js`; `costOfAttendance` for the
reconciliation sentence.

**Changed elsewhere:**

- `data.js` — the task's `office` becomes `Housing Services`; its action routes to `#/housing`.
- `TaskDrawer.jsx` — the `kind: 'form'` branch is removed and replaced by the route.
- `App.jsx` — the `housing` state leaves the shell and lives with the section.
- `help-data.js`, `campus-data.js` — the office is renamed to `Housing Services`.
- `CostCard.jsx` — the `Housing` and `Meals` rows gain a qualifier naming the standard rate the
  estimate assumes, and a link to `#/housing`. No figure and no calculation moves.

Known and deliberately not done: `documents-data.js:135` still reads "authorized Housing &
Residential Life staff". That file is uncommitted work belonging to ENR-165 in another session. It is
corrected once ENR-165 lands.

## 7. Divergences from the stories, recorded

1. **A fourth plan option.** ENR-210 AC1 names three. The card's own brief says "Arranging your own
   housing is a complete answer, not an opt out", and ENR-213 AC2 excludes "a student who chose to
   commute **or** to arrange their own housing" — two separate answers, which the assignment
   population has to distinguish. Commuting is living at home and travelling in; arranging your own
   housing is renting near campus. They are different facts about a student, so they are different
   options.
2. **The interface never says "request".** ENR-211 AC4 words it "a preference is a request and not an
   assignment". `CONTEXT.md` had already given `request` to Help and written `_Avoid_: Request,
   unqualified`. The section states the relation the AC requires — a preference is not an assignment,
   Housing Services decides — without spending a word the glossary had allocated elsewhere.

## 8. Out of scope

- **ENR-213, the staff assignment work.** This is the student portal. The assignment arrives as
  published data so ENR-213 AC6 is visible and reviewable; no staff screen is built.
- Any change to the aid, balance or payment figures in My Financials. Only the two qualifiers.
- Onboarding. Its housing step is a different repo and a different question; `onboarding-answered`
  models its *result* arriving, which is all ENR-210 AC6 and ENR-211 AC6 ask of this screen.

## 9. Done when

**ENR-210 — Choose my housing plan**

| AC | Where it lands |
| --- | --- |
| 1 · plan asked first | §3.1, the plan panel is the first thing under the summary |
| 2 · none is a skip | §3.1, the sentence above the four; §3.2, both completion panels |
| 3 · on campus opens ranking, commuting does not, absence explained | §3.2 table |
| 4 · help deciding routes to a person, plan stays open | §3.2, the Help route; the plan stays unanswered for the checklist |
| 5 · changeable until the deadline, deadline stated | §5; stated in the hero, the summary line and the rail |
| 6 · answered at onboarding arrives answered | `onboarding-answered` |
| 7 · confirming unlocks move-in, consequence stated | §3.1, the line under the four |
| 8 · names Housing Services | hero eyebrow and rail anchor card |

**ENR-211 — Rank my residence preferences**

| AC | Where it lands |
| --- | --- |
| 1 · rank three, reorder, remove | §3.2 shortlist panel |
| 2 · detail with room, building, rates; compare | §3.2 detail drawer; comparison is the catalogue's columns |
| 3 · saves on its own; saved state shown on return | §3.2, no `Save order` button exists |
| 4 · preference is not an assignment; Housing Services assigns after the deadline | §3.2 panel head, §3.3 rail |
| 5 · deadline stated wherever ranking is offered | shortlist panel head and rail |
| 6 · onboarding ranking arrives as current | `onboarding-answered` |
| 7 · after the deadline, read-only, states that Housing Services is assigning, does not read as broken | `deadline-passed` + the stage tracker |
| 8 · rates do not contradict My Financials | detail drawer sentence + `CostCard` qualifiers |
| 9 · a partial shortlist is saved as partial | §5 |

**ENR-213 AC6 only** — the assignment is what the student sees, replacing the ranking: `room-assigned`.

`npm run build` passes.
