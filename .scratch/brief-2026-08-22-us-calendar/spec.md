Jira: (none — follows the US-standard brief of 2026-08-22)
Status: done — built, every route opened in the browser at 1440 and 390 with a clean console, committed to main 2026-08-22
Labels: persona-student, screen-all, data
Jam: (none)

# The prototype on the US calendar — the data card

Source of truth: `docs/domain/aster.md` (the fact sheet), `docs/domain/us-enrollment.md` (the
standard), ADR 0006 and 0007, and the grill record `.scratch/brief-2026-08-22-us-standard/spec.md`
(rounds 1–2). This card moves every date, name and calendar-dependent sentence in `src/` onto the
fact sheet. It changes data and copy; it does not change layout, components or the voice.

## 1. What this card answers

Does the portal describe one real US first-year on one real day — Maya, Monday, June 15, 2026,
deposited, in the summer before move-in — with every office, deadline and word the way a US campus
has them?

## 2. Domain

`docs/domain/us-enrollment.md` §2 (the journey), §3 (offices), §4 (vocabulary), §6 (voice);
`docs/domain/aster.md` §2, §4–§9. Convention named: the deposit is the master gate and is done;
first-years register at summer orientation behind holds; the bill is due two weeks before classes.

## 3. The sweep, file by file

| File | Change |
| --- | --- |
| `features/enrollment/data.js` | `PORTAL_TODAY = '2026-06-15'`. Steps re-dated and re-ordered from `aster.md` §4: *Pay your $500 enrollment deposit* (Admissions, **completed May 1**; replaces "Lock in your place" / Financial Aid); *Set up your Aster account* (completed May 4); *Verify your household income* (due Jul 1; gloss says verification; holds the loan); *Send your immunization record* (Jul 1; immunization hold); *Send your final transcript* (Admissions, Jul 1); *Choose your housing plan* → reads `responseDeadline` (Jun 30); *Choose your orientation session* (by Jun 26); *Take your placement tests* (by Jun 26); *Complete loan entrance counseling* and *Sign your Master Promissory Note* (Aug 1; two steps); *Enroll in or waive the student health plan* (Aug 1, 11:59 p.m. ET); *Pay your fall bill* (locked until Jul 24; due Aug 12); *Choose your move-in time* (locked until assignment Jul 20; by Aug 7); *Meet your academic advisor* (at orientation, Jul 14). `daysLeft` from the table in `aster.md` §4. `academicYear.classOf` → Class of 2030. Payments: deposit received May 1; installments Aug 12 / Sep 12 / Oct 12 / Nov 12 at $12,830 ÷ 4 (fall) with the $50 fee; "4-month plan" → payment plan. `enrollmentAdvisor` stays Tomás Okafor, Admissions Office. |
| `features/housing/data.js` | `responseDeadline` → Jun 30, 2026; assignment Jul 20; move-in Aug 22; "Housing Services" → Residential Life everywhere; "residence" → "residence hall" in copy. The four plan answers stay (see §6). |
| `features/onboarding/data.js` | Orientation sessions → Jul 6–7, Jul 13–14, Jul 20–21 at Halloran Hall, two days; make-up Aug 24; "Family permissions" → *Who can see your record* (a FERPA release; body copy says so); Maya's home → Fall River (the Newton address goes); `DEFAULT_END` stays May 31, 2027. |
| `features/campus/data.js` | `CAMPUS_TODAY = '2026-06-15'`; events re-dated into Jun–Aug (orientation sessions, welcome week Aug 22–25, move-in walkthrough Aug 22); the required session sentence → holds; coordinator → a new name (Priya Raman is Admissions); club faculty adviser → a new name (Dana Whitfield is the Registrar's); "adviser" → "advisor". |
| `features/appointments/data.js` | "Academic Advising Office" → *Academic Advising, Computer Science*; "registration opens on 1 September" → at your orientation session; dates relative to Jun 15. |
| `features/help/data.js` | "Housing Services" → Residential Life; add the Office of the Bursar (2 business days). |
| `features/documents/data.js`, `features/health/data.js`, `features/classrooms/data.js`, `features/profile/data.js`, `features/financials/*` | dates relative to Jun 15; immunization due Jul 1; "Student Financial Services"/billing lines → the Bursar where billing is meant; CSCI 140 stays Spring 2026; profile addresses per `aster.md` §3. |
| `lib/navigation.js` | `kicker: 'Class of 2030'`; any lede that names a date. |
| `README.md` | "Harvard New Student Portal" → Aster University, the sample institution; the stale domain-model and token sections are out of scope. |

Every string is an anchored exact-match replacement that reports a missed anchor; no file is
rewritten whole. A literal that also appears in a comment keeps the comment honest.

## 4. The registration gate (ENR-214)

Reframed as holds (`CONTEXT.md`, **Hold**; `aster.md` §9): *before your orientation session on
Jul 13, these must be clear* — the immunization hold (Student Health Services) and, for the loan,
verification. Each names the office that placed it and what lifts it; the portal lifts none. "Opens
on Sep 1" goes from every surface.

## 5. States

Every preview state of every section re-checked on the new today: what is *open*, *with Aster*,
*locked*, *completed* follows `aster.md` §2 and §4 — the deposit and the account are completed; the
bill and the move-in time are locked with the step they wait on named.

## 6. Out of scope

Layout, components, tokens. The voice (2026-08-21). The housing plan's model — two answers instead of
four is decided in principle (US-standard brief, Q11) and is its own card against ENR-207. The staff
board. Naming a Bursar person. Roommate matching, living-learning communities, AP score submission
as steps.

## 7. Done when

- [x] `PORTAL_TODAY` and `CAMPUS_TODAY` are `2026-06-15`; no date literal in `src/` contradicts
  `aster.md` §4; `daysLeft` agree with the table.
- [x] "Class of 2030" on every surface; no "Sep 1"; no "Lock in your place"; no "Housing Services";
  no "Academic Advising Office"; no "adviser"; no "4-month plan"; no "Family permissions".
- [x] The deposit step is completed May 1 and owned by Admissions; the bill exists and is due Aug 12.
- [x] The gate reads as holds.
- [x] `npm run build` clean; every route opened at 1440 and 390 with a clean console. No CSS file was
  touched by this card, so the before/after element capture (the rule for CSS moves) was not run.
- [x] Committed to main and pushed; `aster.md` §12 notes the landing.

## 8. Report — what changed beyond §3, and what was left

Unlisted changes, each because the fact sheet or the standard said so:

- **Holds, not blocks.** `GateChip`, Health’s summary line and the styleguide sample now say *Holds class
  registration* (`CONTEXT.md`, Hold). `GateNotice` says *before you register for classes at orientation on
  July 14*. `documents/data.js` says the hold lifts when the record clears.
- **A domestic first-year has no TOEFL.** The settled *English proficiency result* requirement became a
  *Dual-enrollment transcript* (Registrar, accepted Jun 2), which is also where My Degree’s CSCI 140
  potential match comes from.
- **The Bursar exists on Help.** `offices.bursar`, `OFFICE_ORDER`, a *My bill or a payment* topic, and the
  second request is now *Can my mother pay my fall bill directly?* (authorized payer, FERPA) in place of
  the split-deposit request, which was incoherent once the deposit was paid on May 1.
- **People.** The Student Life coordinator is Marcus Bell (Priya Raman is Admissions); the choir’s faculty
  advisor is Eleanor Pratt (Dana Whitfield is the Registrar’s). Both new names render initials.
- **US English in campus copy**: Fall (not autumn), Math, Career Services, résumé, Language Center,
  intramural soccer, suite (not flat), schedule (not timetable), two weeks (not a fortnight),
  neighborhoods; *Campus address* (not term-time), blank until the room is assigned.
- **My Financials** reads the next payment’s distance off the schedule (`daysUntil`), not off a task:
  *Fall installment 1 · due Aug 12 · in 58 days*, *Payment 2 of 9*, $29,160 across 9 payments.
- **Appointments**: published times in the two weeks after Jun 15; Academic Advising has no calendar
  because first-years meet advisors at orientation; the pending request asks for a time after Jul 14.
- **Edward** keeps answering *Has my enrollment deposit been paid?* from the schedule row (received
  May 1); the outstanding-deposit branch no longer fires because the task is gone.

Where the build departed from §3, and why:

- The final transcript stayed *in review* (her school sent it Jun 12; Admissions checks it) rather than
  becoming an open *Send your final transcript* step — documents, Help and Edward all describe the same
  arrival, so one story holds across four screens.
- The payment schedule stays a **year**, because the ledger’s invariant is *schedule total = what Aster
  bills − accepted aid* (ENR-159 AC 7): eight installments, four a term (Aug–Nov, Jan–Apr), not the four
  fall rows §3 sketched. While the loan is pending the year splits $3,583 × 4 + $3,582 × 4; with it,
  $3,145 × 8.
- *Choose your orientation session* routes to My Campus Life (where Aster Orientation is the required
  event) rather than to the setup flow, so the booking has one door.

Left as found, and flagged:

- `proof-of-address` for housing (Residential Life confirming a home address before assigning a room) has
  no US precedent the research read; it is a settled requirement and was re-worded, not removed.
- The housing plan keeps its four answers (US-standard brief, Q11: its own card against ENR-207).
- `#/profile/documents` and `#/accessibility` are not routes (the Jam of 2026-08-21 made both panels);
  the spec’s route list predates that.
- Slot ids in `appointments/data.js` still carry the old day numbers (`enr-21-0930`); they are opaque
  identifiers and were left alone.
