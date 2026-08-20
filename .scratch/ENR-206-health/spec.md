Jira: ENR-206
Status: ready-for-agent
Labels: design, persona-student, screen-health, wave-mvp-demo
Jam: (none)

> Jira status is `Development`. Stories [ENR-205](https://audentra.atlassian.net/browse/ENR-205),
> [ENR-208](https://audentra.atlassian.net/browse/ENR-208) and
> [ENR-209](https://audentra.atlassian.net/browse/ENR-209) are `Prioritized` — they are the
> acceptance behind the screen, not separate build work. Jira stays authoritative.

# Health — one place to finish what onboarding left open

## 0. Current behaviour, confirmed before designing

- `health` is **not** a destination in `src/lib/navigation.js`. The section does not exist.
- The immunization record **already exists** as a document requirement:
  `src/documents-data.js` → `immunization-record`, `office: 'health'`, `taskId: 'health'`, rendered
  by My Documents since ENR-165.
- `src/data.js` carries the checklist task `health` (`kind: 'upload'`, due `Nov 30`, 102 days), and
  `TaskDrawer` renders an upload zone inside the drawer for it.
- `src/help-data.js` has five offices and no Accessibility Services; `health.name` is
  `'Health Services'`, not the full institutional name ENR-209 AC8 requires.
- `MyDocuments` holds the record in its own `useState`, and `App` unmounts the page on a route
  change — so today a submission does not survive navigation, which is ENR-209 Scenario 1.

## 1. What this screen answers

*What did the health step at onboarding leave open, and what happened to what I already did?*

Two subjects share the screen and share nothing else. One is a **routing question** that collects no
diagnosis and belongs to Accessibility Services. The other is a **document with a review lifecycle**
that belongs to Aster University Health Services. The screen's job is to make them legible as two
things, and to make *answered no* look nothing like *never answered*.

## 2. The domain

Three entries were added to `CONTEXT.md` while specifying this card:

- **Office** widened — it now also covers a team that *receives what a section routes to it*.
  Accessibility Services owns no document requirement and makes no decision.
- **Submission** widened — one attempt with **one or more** files. A vaccination record is
  physically several photographed pages; "one file" was the wrong definition from the start.
- **Accommodation answer** written — with "not right now is a complete answer" inside the
  definition, so the rule travels with the word.

The decision that the answer never leaves this section is recorded as
[ADR-0001](../../docs/adr/0001-accommodation-answer-stays-in-health.md).

## 3. Layout

`PageShell`, five slots, in the shell's order. No tabs: Health is a destination, not a group, and an
obligation must not be able to hide behind a tab nobody opened.

| Slot | Content |
| --- | --- |
| `hero` | `Health · Accessibility Services and Aster University Health Services` / *Only two things here, Maya.* / *One record Health Services needs before you register, and one question that is yours to answer — or not.* Copy lives in `navigation.js`. |
| `summary` | `SummaryFigure`: the **record's state** as the figure, one line — `Optional now · required before you register`. Then `AdvisorBar`, unchanged. |
| `notice` | None. A 102-day deadline rendered as a band across the section is the "reads as a threat" the brief forbids. |
| `tabs` | None. |
| main | Card 1 — the immunization record. Card 2 — the accommodation question. |
| `rail` | Anchor: Health Services' five business days. Then the two teams and what each one does. Then a route to *Required immunizations for 2026–27*, the document Aster already issued. |

The accommodation answer is **never** the figure. Keeping it out of the summary is what makes
"answered no is not outstanding" structural instead of a rule someone has to remember
(ENR-208 AC3).

### Card 1 — the record

Standard construction: `.status-heading` band with the state chip, `.card-rows` with one row per
submission, newest last, each row listing **every file** it carried with name and size. Under a
`changes-requested` decision: the reason, then the remedies, then the replacement control — the
Stripe reading, *what do I do now* before *why*. `in review` never renders without the office name
and the five business days beside it (Airwallex). The due date read from the `health` task
(`Nov 30`) sits on the record, where the action is — not in the summary line.

### Card 2 — the question

Deliberately a different silhouette: **no heading band**, opens in prose, closes on `.card-foot`.
Structure taken from YNAB's Support Access Mode — the explanation, then two options each carrying
its own line of consequence, weighted equally, neither recommended.

- Unanswered: both options live, a muted `Not answered yet` label, **no chip and no colour**.
- Answered: a declarative sentence in place of the options — the answer, its date, and where it was
  given — with the other door still reachable (Wellfound).
- Foot, always visible, before and after answering:
  *Accessibility Services sees this. Your instructors and your advisor do not.*

Colour is spent once on this page, on the record's row when it is asking. The question card is never
washed amber: an optional question that looks like a demand is the failure mode of the whole screen.

## 4. States

| State | What it shows |
| --- | --- |
| `ready` | Answered *not right now* at onboarding; record still to send. **Changed during the build:** the plan had the record `in review` here, but the checklist still carries the health step in this state, and a record shown as under review while My Enrollment asks for it is the portal disagreeing with itself. Sending it from `ready` is now the live demonstration of the wait instead — `checking` runs on the clock and lands in `in review`, which no fixture can show as convincingly. |
| `empty` | Skipped the health step: question unanswered, record not sent. ENR-205 Scenario 2. |
| `health-returned` | The record came back with a reason and its remedies; the answer is already *yes*. ENR-209 Scenario 2. |
| `health-settled` | Both resolved. The section still shows both, and is neither empty nor congratulatory. ENR-205 Scenario 4. |
| `send-fails` | The next thing sent — file or answer — does not reach Aster. Nothing is created. |
| `partial` | One half could not be read. The readable half renders normally; the unreadable one says so and offers retry. If the unreadable half is the record, the summary shows **no figure** — not `Not sent yet`, which would be a claim. ENR-205 Scenario 5. |
| `loading` / `error` | The frame's, rendered by `App` before dispatch. |

Failure grammar follows Help, not Appointments: **a send that does not arrive creates nothing.** The
question stays unanswered, the words stay where they were, and the card says what did not happen
(ENR-208 Scenario 5). An answer marked "sent" that reached nobody would stop her waiting for contact
that was never requested.

## 5. Interactions

- **Answering** — `role="radiogroup"`, two options, saving on change. Arrow keys move, the current
  answer reads as selected, and *unanswered* is a state a screen reader can hear. Toggles were
  rejected for exactly this: two positions cannot express three states.
- **Uploading** — opens the same `DocumentDrawer` My Documents uses, now accepting up to **8 files,
  30 MB** (ENR-209 AC1) against the requirement's own `accepts`. A refusal names *which* file was
  over the limit and keeps the others chosen (ENR-209 Scenario 5).
- **Leaving the page** — the record and the answer live in `App.jsx`, so an upload keeps checking and
  an answer stays answered across a route change (ENR-209 AC2, ENR-208 AC5).
- **Never** — no help request, no appointment and no notification is created by a *yes*. It says what
  happens next, and stops there.

## 6. Data

- `src/health-data.js` — the question, the two answers, what a *yes* promises, the fixtures per
  preview state.
- `src/lib/health.js` — the answer vocabulary and the section's derivations, so "not right now is
  complete" lives beside the code that reads it rather than in a component's memory.
- `src/documents-data.js` / `src/lib/documents.js` — the record, unchanged in ownership. Health is a
  second window onto the same object, never a copy.
- `src/help-data.js` — `accessibility` added to `offices`, deliberately **outside** `OFFICE_ORDER`
  and `helpTopics` so ENR-182's screen does not widen; `health.name` renamed to *Aster University
  Health Services*.

## 7. Out of scope

- **ENR-212** — the staff side of the accommodation request. A different product surface.
- **ENR-208 AC6** — concealment enforced below the interface. This repo has no backend, so it is
  declared as a property of the shape (the answer exists in no module outside Health, and is absent
  from Edward's record) and stated as such rather than simulated.
- Any reviewer decision. `checking` advances on a clock; `in review` never does — ENR-146's rule,
  inherited unchanged.

## 8. Consciously outside this card's files

Both were put to the user and approved before building:

- `src/components/MyDocuments.jsx` (ENR-165) — the record's state lifts to `App.jsx`. It fixes an
  existing gap there as a side effect: an upload now survives navigation.
- `src/data.js` and the checklist (ENR-164) — the `health` task routes to the section and loses its
  in-drawer upload, so one file has one door (ENR-205 AC4).

## 9. Verified on screen

Checked at 1440px and at 380px, keyboard-only, with the console clean:

- Sent three files from Health, navigated to My Documents **mid-check**, watched the check finish
  there, and came back to Health showing `In review` with the office and its five business days —
  ENR-209 AC 2 and Scenario 1, which the page could not do before the record moved to `App`.
- Nine files: eight kept, the ninth named as not added. A 31 MB file refused **by name** with the
  rest of the selection intact. A `.docx` refused against the requirement's own formats.
- A failed save leaves the question unanswered, says nothing reached Accessibility Services, and
  changes nothing in the summary.
- Arrow keys move between the two answers **without answering**; Enter answers. `Esc` closes the
  drawer and focus returns to the button that opened it.
- The summary's two cells report the same height (67px), as the shared panel requires.
- All three doors converge: the checklist step and My Documents both route here, and neither offers
  a field of its own.

Two fixes the browser caught that the spec did not predict: the `act` chip was crimson where the
system reserves crimson for deadlines and failures (now amber), and the accepted record was still
printing the requirement's future-tense `unblocks` line about registration that had already opened.

## 10. Done when

- [ ] Health is reachable from the navigation, with no badge on its row.
- [ ] Both parts are shown in every state; the section is never empty or congratulatory.
- [ ] *Not right now* is shown as a current answer and appears as outstanding nowhere.
- [ ] *Never answered* is visibly different from *answered no*, including to a screen reader.
- [ ] `in review` always carries the office and the five business days.
- [ ] `changes requested` carries a specific reason and a route forward.
- [ ] The record is requested whatever the accommodation answer is.
- [ ] Who sees the answer is stated on the card, before it is answered.
- [ ] A failed send creates nothing and says so.
- [ ] Edward can speak about the record and cannot speak about the answer.
- [ ] `npm run build` clean; checked wide, narrow and keyboard-only.
