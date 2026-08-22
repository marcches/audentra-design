Jira: (none — follows the US-standard brief of 2026-08-22)
Status: ready-for-agent
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

- [ ] `PORTAL_TODAY` and `CAMPUS_TODAY` are `2026-06-15`; no date literal in `src/` contradicts
  `aster.md` §4; `daysLeft` agree with the table.
- [ ] "Class of 2030" on every surface; no "Sep 1"; no "Lock in your place"; no "Housing Services";
  no "Academic Advising Office"; no "adviser"; no "4-month plan"; no "Family permissions".
- [ ] The deposit step is completed May 1 and owned by Admissions; the bill exists and is due Aug 12.
- [ ] The gate reads as holds.
- [ ] `npm run build` clean; every route at 1440 and 390 with a clean console; captures before/after
  on the surfaces whose CSS is untouched report zero style diffs (dates change widths, nothing else).
- [ ] Committed to main and pushed; `aster.md` §12 notes the landing.
