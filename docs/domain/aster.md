# Aster University — the sample institution, as decided

What Aster has decided for itself: who it is, what day it is, who Maya is, what each office is called
and owns, when each thing is due, and what things cost. **Every date, name, amount and deadline in
`src/` derives from this file.** If a screen needs a fact that is not here, add it here first — in
the US campus's form (`docs/domain/us-enrollment.md`) — and only then use it. Started 2026-08-22
(US-standard brief, `.scratch/brief-2026-08-22-us-standard/`), from ADR 0006 (the US standard binds
by default) and ADR 0007 (what Aster is, and when today is). The words themselves are `CONTEXT.md`'s
business; this file holds facts, not definitions. Until the data card lands
(`.scratch/brief-2026-08-22-us-calendar/`), `src/` still carries the old calendar; this file wins.

## 1. The institution

| | |
| --- | --- |
| Name | **Aster University** — *Aster* in running copy, never "AU" |
| Type | private, not-for-profit, residential, four-year; about 6,000 undergraduates |
| Place | Aster, Massachusetts (a fictional town; the zip in the data, 02139, is borrowed) |
| Calendar | semester — Fall and Spring; the academic year is written **2026–27** |
| Degrees in the prototype | BA Computer Science (120 credits; core curriculum + major) |
| Domain | `aster.edu` — students get `first-initial.last@aster.edu` |
| Mark | the Aster crest (`design-system/marks/`) — no mascot, no nickname in copy |
| Comparables the facts were drawn from | Boston University and Northeastern (private, Massachusetts), Carleton and Macalester (small residential), Michigan/OSU/Purdue for the summer-orientation shape — `docs/domain/us-enrollment.md` §2 |

**Out of scope for the prototype, by decision** (ADR 0007): international students (I-20/SEVIS),
transfer students, graduate students, spring admits, readmits. No screen half-builds them.

## 2. Today, and where Maya is

**Monday, June 15, 2026** — `PORTAL_TODAY` and `CAMPUS_TODAY`. Fall 2026 entry; **Class of 2030**.

Maya accepted her offer and paid the $500 enrollment deposit on **May 1**; her Aster account was
live on **May 4**. Today she is in the summer between deposit and move-in: the housing application
is open (due Jun 30), her orientation session is not yet booked (by Jun 26), Financial Aid is
waiting on her verification documents (Jul 1), Student Health Services on her immunization record
(Jul 1), Admissions on her final transcript (Jul 1); the loan paperwork and the health-plan decision
are ahead (Aug 1), the bill is not out yet (Jul 24, due Aug 12); she moves in on Aug 22 and classes
begin Aug 26. This is the stretch the product sells — "deposit through enrollment".

## 3. The persona

| | |
| --- | --- |
| Name | **Amelia Maya Johnson** — goes by **Maya**; she/her |
| Born | March 14, 2008 (18 on today's date) |
| Home | Fall River, Massachusetts — her parent's home; the only home address in the data |
| Emergency contact | Renata Oliveira, her mother |
| Standing | domestic; first-year, first-time full-time; dependent for FAFSA; Pell-eligible; first-generation; living on campus |
| Program | BA Computer Science; one dual-enrollment course on record (CSCI 140, Spring 2026, grade A−, 3 credits — a *potential match*, waiting on the Registrar) |
| Email | personal `maya.johnson@gmail.com`; campus `m.johnson@aster.edu` |
| Photo | `public/people/maya-johnson.webp` |

## 4. The 2026–27 calendar

| Date | What | Owner |
| --- | --- | --- |
| Fri May 1, 2026 | Enrollment deposit due ($500, non-refundable) — **paid** | Admissions |
| Mon May 4 | Housing application opens; Aster account live | Residential Life; IT |
| Mon Jun 1 | Orientation online modules open | New Student Programs |
| **Mon Jun 15** | **today** | |
| Fri Jun 26 | Book your orientation session by; placement tests done by | New Student Programs |
| Tue Jun 30 | Housing application due (ENR-207's response deadline) | Residential Life |
| Wed Jul 1 | Verification documents due; immunization record due; final transcript due | Financial Aid; Student Health Services; Admissions |
| Mon Jul 6 | Roommate matching | Residential Life |
| Jul 6–7 · Jul 13–14 · Jul 20–21 | Aster Orientation sessions (two days each; Maya's is **Jul 13–14**); advising and class registration on day two | New Student Programs; Academic Advising; the Registrar |
| Mon Jul 20 | Room assignments sent; contract due within 7 days | Residential Life |
| Fri Jul 24 | Fall bill issued | the Bursar |
| Fri Jul 31 | ID photo uploaded by (card ready at move-in) | Student Life |
| Sat Aug 1 | Entrance counseling and Master Promissory Note done by; health plan enrolled or waived by (11:59 p.m. ET) | Financial Aid; Student Health Services |
| Fri Aug 7 | Move-in time chosen by | Residential Life |
| Wed Aug 12 | Fall bill due, or payment plan set up | the Bursar |
| Mon Aug 17 | Aid disburses (no earlier than 10 days before classes) | Financial Aid → the Bursar |
| Sat Aug 22 | First-year move-in | Residential Life |
| Aug 22–25 | Welcome week | Student Life |
| Mon Aug 24 | Orientation make-up session | New Student Programs |
| **Wed Aug 26** | **Classes begin** | the Registrar |
| Mon Sep 7 | Labor Day — no classes | |
| Wed Sep 9 | Add/drop ends — census | the Registrar |
| Oct 12–13 | Fall break | |
| Nov 25–29 | Thanksgiving break | |
| Wed Dec 9 | Fall classes end | |
| Dec 14–18 | Final examinations | |
| Wed Jan 20, 2027 | Spring classes begin | |
| Mar 15–19 | Spring break | |
| Wed May 5 | Spring classes end; finals May 10–14 | |
| Sun May 23 | Commencement | |
| Mon May 31, 2027 | Academic year ends (the date onboarding already carries) | |

Days left, counted from Jun 15: Jun 26 → 11 · Jun 30 → 15 · Jul 1 → 16 · Jul 13 → 28 · Jul 20 → 35 ·
Jul 24 → 39 · Jul 31 → 46 · Aug 1 → 47 · Aug 7 → 53 · Aug 12 → 58 · Aug 22 → 68 · Aug 26 → 72.
Within seven days of today a date is shown with its weekday; a portal cutoff carries its time and
zone (*11:59 p.m. ET*).

## 5. The offices

One name each, in `CONTEXT.md`'s first-mention / after form. *Usual reply* is what the office
publishes on Help and on Appointments.

| Office (first mention → after) | Owns and decides | Named person | Usual reply |
| --- | --- | --- | --- |
| **Admissions Office** | the offer, the enrollment deposit, the final transcript, deferral | **Tomás Okafor**, enrollment advisor — holds Maya's file through the summer (the `AdvisorBar` person on My Enrollment and Health); **Priya Raman**, admissions counselor — walked her through setup | 2 business days |
| **Financial Aid Office** (*the Financial Aid Office* in running text) | the aid offer, verification, SAP, entrance counseling and the MPN | **Amara Nwosu**, financial aid counselor (My Financials) | 3 business days |
| **Office of the Registrar** → *the Registrar* | registration, holds, the academic record and transcript, the calendar, the degree audit, potential matches | **Dana Whitfield**, records (My Profile's "who changes the rest") | 3 business days |
| **Office of the Bursar** → *the Bursar* | the bill, due dates, the payment plan, authorized payers, refunds, 1098-T, the bursar hold | none named yet — the data card names one only if a screen needs it | 2 business days |
| **Residential Life** | the housing application, roommate matching, room assignment, the contract, the dining plan, move-in, the live-on requirement | none named — the office speaks | 2 business days |
| **Student Health Services** → *Health Services* | immunization compliance and the immunization hold; the student health plan and its waiver | none named — the reviewer is "a person at Health Services" | 5 business days (review) |
| **Accessibility Services** | receives the accommodation answer; decides nothing in the portal (ADR 0001, 0003) | none named, by design | 3 business days |
| **Academic Advising, Computer Science** | course planning, the advising hold, registration at orientation | **Ines Barros**, academic advisor (My Degree) | 3 business days |
| **Student Life** (*Aster Student Life* when it publishes) | events, clubs, the required orientation session, the ID card; **New Student Programs** runs Aster Orientation under it | Student Life coordinator — a new name (Priya Raman was doubling here; she is Admissions) | — |

Club contacts (My Campus Life) are students and faculty, not offices: Sam Iyer, Rae Okonjo, Noor
Haddad, Miguel Santos, Lena Duarte, and a faculty adviser who is no longer Dana Whitfield (she is the
Registrar's). Names in `public/people/` carry photos; a new name gets initials (CLAUDE.md).

## 6. Money

| | | |
| --- | --- | --- |
| **Cost of attendance 2026–27** | Tuition $41,200 · Fees $2,860 · Housing $12,400 (shared double) · Meals $6,300 · Books and supplies $1,240 (estimate) · Personal and travel $2,000 (estimate) | **$66,000**; direct (billed by Aster) $62,760, indirect $3,240 |
| **Aid offer** | Aster Grant $28,000 · Federal Pell Grant $5,600 · Federal Direct Subsidized Loan $3,500 (the first-year maximum) · Federal Work-Study $2,400 | grants and the loan reduce the bill; work-study is earned, not credited |
| **Enrollment deposit** | $500, non-refundable, due May 1 — paid May 1 | credited to the fall bill |
| **Housing deposit** | none | |
| **The bill** | per term: fall direct charges $31,380 − fall aid $18,550 = **$12,830**, issued Jul 24, due Aug 12 | unpaid after Aug 12 → bursar hold; registration is not cancelled |
| **Payment plan** | four installments — Aug 12, Sep 12, Oct 12, Nov 12 — $50 setup fee | the installments are numbered and dated |
| **Authorized payer** | a parent sees the bill only as one Maya names (FERPA release) | |
| **Refund** | a credit balance is paid to the student within 14 days of disbursement | |

The verification that is still open holds the **loan**, not the grants: Pell can be paid once
before it completes; the Direct Loan cannot (FSA Handbook, AVG ch. 4).

## 7. Housing

- **Live-on requirement**: first-years live on campus. The one exemption is commuting from a
  parent's or guardian's home within 30 miles, requested from Residential Life by Jun 30. (The
  housing plan's four answers in ENR-207 predate this fact; see §11.)
- **Residence halls**, eight, each with its own room types, rate and dining plan: Alcott House,
  Brackenridge Hall, Coyne House, Dunmore Court, Elmsworth Hall, Fairholt House, Garrow Court, Kestrel
  House. Rates $10,400 (shared triple) to $15,800 (single with ensuite). How many exist is the
  institution's business; nothing assumes eight.
- **Dining plan** required for every resident; it comes with the hall.
- Application opened May 4, due **Jun 30**; roommate matching Jul 6; assignments Jul 20; contract
  within 7 days; move-in time chosen by Aug 7; move-in Sat Aug 22 in time slots.

## 8. Orientation

**Aster Orientation**, run by New Student Programs (Student Life), at Halloran Hall. Required. Three
two-day sessions — Jul 6–7, Jul 13–14, Jul 20–21 — booked by Jun 26; Maya's is Jul 13–14. Online
modules from Jun 1; placement tests (math; a language if she wants one) by Jun 26. Day two is the
advising meeting and **class registration** — this is when a first-year registers, behind the holds
in §9. A student who misses every session attends the make-up on Aug 24 and registers then.
Welcome week (Aug 22–25) is not orientation: nothing is registered there.

## 9. Holds

A hold is an office's act; the portal shows it and never lifts it (`CONTEXT.md`, **Hold**).

| Hold | Placed by | On whom, when | Lifted when |
| --- | --- | --- | --- |
| immunization hold | Student Health Services | every incoming record, at admission | the immunization record is accepted (5 business days' review) |
| advising hold | Academic Advising | every first-year | the advising meeting at orientation |
| bursar hold | the Bursar | a bill unpaid after Aug 12 | the balance is settled or a payment plan is set up |
| conduct hold | Dean of Students | — | out of scope for the prototype |

ENR-214's registration gate is therefore: *before your session on Jul 13, these must be clear* — the
immunization hold (send the record by Jul 1) and, for the loan, verification (Jul 1). Registration
does not "open on Sep 1".

## 10. Copy conventions Aster follows (US)

The voice is settled (`.scratch/ux-writing-spec/`, 2026-08-21: close, not cool). These are the US
conventions on top of it, from `docs/domain/us-enrollment.md` §6:

- **Steps are verb phrases, and a step that costs money names the amount**: *Pay your $500
  enrollment deposit*, *Send your immunization record*, *Sign your Master Promissory Note*.
- **Deadlines**: *by Jul 1*; a portal cutoff carries the time and zone — *by Aug 1, 11:59 p.m. ET*.
  Dates *Jul 1*, *Aug 12, 2026*; weekday only within seven days; times *9:00 AM–4:00 PM*; money
  *$1,250*, cents only when they exist. Never a 24-hour clock, never day-month order.
- **The hero kicker says *Class of 2030***; the student is a *first-year*, never a freshman; her
  *advisor* is spelled so.
- **Offices speak by name** and the portal never says *we*; the campus email (`@aster.edu`) is the
  channel Aster's offices use outside the portal, but the portal does not promise a channel (the
  2026-08-21 channel rule stands).
- **Parents are addressed through the student**: nothing is shown to a parent the student did not
  release (FERPA); the setup step is *Who can see your record*.
- US English throughout: *catalog*, *organization*, *enrollment*, *program*.

## 11. Departures from the standard, named (ADR 0006)

- **Points and momentum** on My Enrollment — no US campus scores a checklist. Kept; named in ADR 0006.
- **The housing plan's four answers** (living on campus / commuting / arranging my own housing / I
  need help deciding, ENR-207) — a residential private asks a first-year to *apply for housing* or
  request the commuter exemption; "arranging my own housing" does not exist for her. Decided in
  principle (round 2, Q11) that the plan becomes two answers; it reshapes ENR-207's model and is its
  own card. Until then the four answers stand and this line says why.

## 12. Change log

- 2026-08-22 — written from the US-standard brief, rounds 1 and 2; supersedes the dates the features
  carried (deposit Nov 16, housing Dec 15, move-in Jan 12, registration Sep 1, Class of 2031).
