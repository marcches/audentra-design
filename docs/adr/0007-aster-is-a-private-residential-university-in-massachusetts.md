# 0007. Aster is a private residential university in Massachusetts, and today is June 15, 2026

Date: 2026-08-22
Status: accepted

## Context

The sample institution was never decided; the data implied it. Guaranteed housing with eight
residences, each with its own meal plan; a BA in Computer Science; advising by department; a campus
at "Aster, MA 02139" with home addresses in Newton and Fall River; "Fall 2026 entry"; a 2026–27
academic year with a Fall and a Spring term. And its calendar was incoherent: today was Aug 20,
2026, orientation Aug 27 and 31, registration opening Sep 1 — while the deposit step was due Nov
16, the housing plan Dec 15 and the move-in time Jan 12, under a "Class of 2031". Half a fall
entrant, half a spring one; no US student lives that year. Each feature had set its dates from
memory because there was no fact sheet to read from (ADR 0006).

## Decision

Aster University is a **private, residential, four-year university of middling size in Aster,
Massachusetts, on a semester calendar**. The prototype shows **Monday, June 15, 2026**: Maya
Johnson — a domestic first-year, first-time full-time, dependent for FAFSA, Pell-eligible,
first-generation, living on campus, **Class of 2030** — accepted her offer and paid her enrollment
deposit by May 1, 2026, and is in the summer between deposit and move-in, the stretch the product
itself sells as "deposit through enrollment".

- The facts — term dates, each step's deadline, the offices and their names, the people, the
  persona — live in `docs/domain/aster.md`, and every date and name in `src/` derives from it. A
  feature does not invent a date.
- First-years register for classes at summer orientation, as US campuses do; the registration gate
  of ENR-214 is therefore the set of **holds** that must be clear before that session, not a Sep 1
  opening.
- International (I-20/SEVIS), transfer and graduate students are out of scope for the prototype,
  and the fact sheet says so.

## Considered options

- **Keep Aug 20 and make it coherent** — the week before classes. Cheaper, but the housing
  shortlist (ENR-207) and orientation booking would already be over, and the product's pitch would
  be shown on its last page.
- **March or April, before the deposit** — one live step and everything else locked. Too thin.
- **A large public flagship** — brings in-state/out-of-state residency and scale; nothing in the
  data asked for it, and the coordination between offices the product sells is most visible to a
  student at a residential private.
- **Massachusetts** was kept rather than chosen: the addresses were already there, and the state
  adds two things a campus there genuinely conducts — an immunization law for college entry and a
  mandatory student health insurance with its waiver. Whether the fictional town keeps a real
  Cambridge zip is a fact-sheet detail, not a decision.

## Consequences

- A data sweep: every date literal in `src/features/*/data.js`, `navigation.js` and onboarding,
  rewritten from the fact sheet; `PORTAL_TODAY` and `CAMPUS_TODAY` become `2026-06-15`; "Class of
  2031" becomes 2030. One card (`.scratch/brief-2026-08-22-us-calendar/`).
- Appointments, Campus events and the checklist's relative days are all anchored to the new today;
  the captures that prove a CSS move also have to be retaken after it.
- `README.md` stops calling the institution Harvard.
