Jira: (none — asked for directly, 2026-08-22)
Status: done — grilled in two rounds, documents written and committed to main 2026-08-22; the data card (`.scratch/brief-2026-08-22-us-calendar/`) is next
Labels: persona-student, persona-staff, screen-all, domain
Jam: (none — the feedback came on a call)

# Audentra is built for US universities — making it binding

Marco, 2026-08-22: feedback on a call — the product has to be built *for* American universities; the
company is American. "Not only in what it says, but in how it conducts, speaks and guides." The repo
had been reaching for this through correction specs (the UX writing audit of 2026-08-21) because no
standing document said it. This brief turns it into documents every session reads, decisions that
are hard to reverse, and one data card.

Run as `/ask-matt` → `/research` (background) → `/grill-with-docs`. Marco asked for the grill's
recommendations to be followed without a round-trip, so each ➡️ below is the decision.

## 0. Facts found before asking (not decisions)

- The product site (`audentra-website.vercel.app`) is 100% US higher-ed in vocabulary and never
  says "US": the seven-stage journey — Deposit (Admissions) → Financial Aid → Documents/Verification →
  Student Accounts (Bursar) → Housing (Res Life) → Orientation (Student Affairs) → Enrolled
  (Registrar) — four modules (Morning Brew, EDward, Action Center, Student Experience), and a student
  persona shown as "Admitted · deposit phase".
- `CLAUDE.md` said "educational institutions"; `CONTEXT.md` is a product glossary with no domain
  section; `README.md` still says "Harvard New Student Portal"; the only sentence stating "a student
  portal for a US university" lived in `C:\Users\marco\Downloads\aster-ux-writing-spec.md`.
- `src/` already places the campus in **Aster, MA 02139** (`profile/data.js:268`); Newton and Fall
  River are home addresses. Nobody had decided Massachusetts; the data had.
- **The prototype's calendar describes no real US student.** `PORTAL_TODAY = 2026-08-20`, "Fall 2026
  entry", orientation Aug 27/31, registration opens Sep 1 — but the deposit step ("Lock in your
  place") is due Nov 16, the housing plan Dec 15, the move-in time Jan 12. Half the data is a fall
  entrant, half a spring one. A US fall entrant deposits by May 1, settles housing over the summer
  and moves in around Aug 22.
- "Class of 2031" with Fall 2026 entry is wrong by US convention (Class of = expected graduation
  year → 2030).
- Offices named today: Admissions Office, Financial Aid Office, Office of the Registrar, Housing
  Services, Student Health Services, Accessibility Services, Academic Advising Office, Student Life.
- ENR-214's gate already borrows the word: *"the Registrar holds your course registration until you
  attend a make-up session"* (`campus/data.js:26`).

## 1. Round 1 — the design tree

### Root — the US standard binds every agent session.

❓ **Q0 — The feedback, literal.** ➡️ On a call; no transcript. "Build it thinking of American
universities — the company is from there." Taken as the brief.

❓ **Q1 — Precedence when the US standard and a product idea collide.** (a) standard always; (b)
product always where it differentiates; (c) standard by default in vocabulary, calendar, office
behaviour and regulatory; product may depart in *experience* only, each departure an ADR.
➡️ **(c)** — ADR 0006. The points/momentum mechanic is the one named departure today.

❓ **Q2 — Where it lives.** ➡️ (i) `docs/domain/us-enrollment.md` — the standard, sourced (the
research agent writes it); (ii) `docs/domain/aster.md` — the sample institution's fact sheet, the
source every `data.js` literal derives from; (iii) `CONTEXT.md` gains terms only, plus one intro
paragraph; (iv) ADRs 0006 and 0007; (v) `CLAUDE.md` first line + one pointer with a trigger; (vi)
`docs/agents/design-workflow.md` spec template gains a **Domain** section; `docs/agents/domain.md`
lists the two docs. The fact sheet is a separate doc, not a `CONTEXT.md` section — the glossary
stays a glossary.

❓ **Q3 — What Aster is.** (a) private, residential, four-year, mid-size, Massachusetts, semester;
(b) large public flagship; (c) small liberal-arts; (d) community college.
➡️ **(a)** — ADR 0007. The data already says it; MA adds state immunization law and the student
health insurance mandate (the waiver every MA student knows).

❓ **Q4 — Who Maya is, and who is not in the prototype.** ➡️ Domestic first-year, first-time
full-time, dependent for FAFSA, Pell-eligible, first-generation, lives on campus. **International
(I-20/SEVIS), transfer and graduate students are explicitly out of scope**, written in the fact
sheet so nobody half-builds them.

❓ **Q5 — Where in the cycle "today" is.** (a) keep Aug 20 and make it coherent (week before
classes; Housing loses the shortlist, Campus loses orientation); (b) move to mid-June 2026 —
post-deposit, mid-summer, every section has live work; (c) March/April, pre-deposit — too thin.
➡️ **(b)** — `PORTAL_TODAY` becomes **Monday, June 15, 2026**; deposit completed May 1; registration
happens at summer orientation, not on Sep 1. Every date literal is rewritten from the fact sheet.
That is the data card (§4). ADR 0007.

❓ **Q6 — Hold as a first-class concept.** ➡️ Yes. **Hold** enters `CONTEXT.md`; the registration
gate (ENR-214) is made of holds, each naming the office that placed it and what lifts it; the portal
never lifts one.

❓ **Q7 — Does the staff side enter the standard?** ➡️ Yes — `us-enrollment.md` carries an
enrollment-management section (yield, melt, deposit, cohort, census, Title IV) because the buyer
speaks it and the staff board is already drawn.

### Round 2 — waits on the research (`docs/domain/us-enrollment.md`)

Office names (Housing Services vs Housing & Residence Life; Student Life vs Student Affairs);
`CONTEXT.md` words vs US usage, term by term; the deposit step's name and the "admitted →
deposited → enrolled" states; FERPA proxy access vs the onboarding "Family permissions" step; the
voice specifics a US campus uses with an admitted student (Congratulations/Welcome, Class of, how
deadlines are stated); the health insurance waiver and final transcript as steps; the fact sheet's
dates. Each gets a ❓/➡️ here when the research lands.

## 2. Artifacts

| File | What it is | Status |
| --- | --- | --- |
| `docs/adr/0006-built-for-us-higher-education.md` | the precedence rule | written |
| `docs/adr/0007-aster-is-a-private-residential-university-in-massachusetts.md` | type, place, calendar, today | written |
| `docs/domain/us-enrollment.md` | the standard, sourced | written (555 lines, 108 sources) |
| `docs/domain/aster.md` | the fact sheet | written |
| `CONTEXT.md` | intro paragraph; **Hold**; round-2 terms | written |
| `CLAUDE.md` | first line; one pointer with trigger | written |
| `docs/agents/design-workflow.md` | spec template: **Domain** | written |
| `docs/agents/domain.md` | "read these" lists both docs | written |
| `README.md` | no more Harvard | data card |

## 3. Execution order

1. ADR 0006, ADR 0007, `CLAUDE.md`, `CONTEXT.md` intro + Hold, design-workflow, domain.md — now.
2. Research lands → round 2 here → `docs/domain/aster.md` → `CONTEXT.md` terms.
3. Build, commit, push.
4. The data card (§4).

## 4. The data card — the prototype on the US calendar

Scope: every date, deadline, term name, class year and calendar-dependent sentence in
`src/features/*/data.js`, `navigation.js` and onboarding, rewritten from `docs/domain/aster.md`;
the registration gate reframed as holds cleared before orientation registration; `README.md`.
Out of scope: layout, components, voice (settled 2026-08-21). Spec to be written under
`.scratch/brief-2026-08-22-us-calendar/` once the fact sheet exists.

## 5. Done when

- [x] ADR 0006 and 0007 in `docs/adr/`.
- [x] `docs/domain/us-enrollment.md` exists, sourced; `docs/domain/aster.md` exists.
- [x] `CLAUDE.md` first line names US colleges and universities; one pointer with a trigger.
- [x] `CONTEXT.md` intro says the context is a US university; **Hold** defined; round-2 terms applied.
- [x] Spec template carries **Domain**; `domain.md` lists both docs.
- [x] `npm run build` clean; committed to main and pushed.
- [x] The data card's spec exists and is ready to pick up.

## 6. Round 2 — against `docs/domain/us-enrollment.md` (landed 2026-08-22, 108 sources)

Each ➡️ is the decision, per Marco's instruction. Section numbers cite the research file.

❓ **Q8 — Office names.** §3, §7.5. ➡️ Keep *Admissions Office*, *Financial Aid Office*, *Office of
the Registrar / the Registrar*, *Student Health Services / Health Services*, *Student Life* — all
attested. **Housing Services → Residential Life** (read on Carleton; "Housing Services" read
nowhere). **Add the Office of the Bursar / the Bursar** as the owner of the bill, due dates, payment
plan, authorized payers, refunds, 1098-T and the bursar hold (the website itself says "Student
Accounts (Bursar)"; aid and billing were un-merged 2026-08-21). *Academic Advising Office, Computer
Science* → **Academic Advising, Computer Science**. **Accessibility Services stays** — a minority but
attested variant, and the route/ADR 0003 carry the word. Orientation is run by **New Student
Programs** under Student Life (fact sheet; no rename in copy). Spelling: **advisor**, never adviser.

❓ **Q9 — The deposit.** §2 row 2, §7.2. ➡️ Owner **Admissions** (not Financial Aid). **$500,
non-refundable, by May 1, 2026 — paid**; no housing deposit. Step title in the campus's form, with
the amount: *Pay your $500 enrollment deposit* (completed May 1). "Lock in your place" goes. Hero
flag *Offer accepted* stays.

❓ **Q10 — Registration and holds.** §2 rows 5 and 7, §4 Hold. ➡️ First-years register **at
Aster Orientation**, a two-day summer session (three dates in July; Maya's is Jul 13–14; make-up
Aug 24 in welcome week). Placement tests online beforehand. The ENR-214 gate becomes *the holds that
must be clear before your session* — immunization (Student Health Services), advising (cleared at
the session). "Registration opens Sep 1" goes.

❓ **Q11 — Housing words.** §4 Housing, §7.4. ➡️ The building is a **residence hall** (`CONTEXT.md`
renamed; "Residence" unqualified and "dorm" under _Avoid_). The **housing plan** (on campus /
commuting / own housing / need help) has no campus equivalent; a residential private has a
first-year **live-on requirement** with a commuter exemption. Decided in principle: the fact sheet
states the requirement, and the plan's answers become *living on campus* (the application) and
*commuting from home (exemption)* — but that reshapes ENR-207's model and is **its own card**, not
this one; the data card keeps the four answers and flags it.

❓ **Q12 — Money words.** §4 Money, §7.8. ➡️ **Bill** (issued Jul 24, due Aug 12 — two weeks before
classes; unpaid → bursar hold), **payment plan** (four installments Aug 12 / Sep 12 / Oct 12 / Nov
12, $50 setup fee) replaces "4-month plan", **authorized payer** for a parent's access. *Verification*
is the campus word for "Verify your household income" (the step keeps its verb phrase, the gloss
says verification). A first loan needs **entrance counseling** *and* the **Master Promissory Note**
— two steps; "Sign your federal loan agreement" → *Sign your Master Promissory Note*.

❓ **Q13 — FERPA / "Family permissions".** §5. ➡️ The setup step is a **FERPA release** — per
category, to a named person — and says so; renamed *Who can see your record*. The backlog's
*authorization category* is a category of the release. `CONTEXT.md` term added.

❓ **Q14 — Voice, the US specifics.** §6. ➡️ The 2026-08-21 voice stands ("close, not cool"; *You're
in, Maya* matches Purdue's *You're in!*). Three conventions added to the fact sheet as copy rules:
a step that costs money names the amount in its title; a deadline that is a portal cutoff carries
the time and zone (*11:59 p.m. ET*); the hero kicker says *Class of 2030*. No mascot voice — it
would be "cool". AM/PM as already written; dates as already written.

❓ **Q15 — What the US journey has and the portal lacks.** §7.9. ➡️ Into the fact sheet's checklist
(the data card decides how many to build): *Set up your Aster account* (completed), *Complete loan
entrance counseling*, *Send your final transcript* (Admissions, Jul 1), *Take your placement tests*
(before orientation), *Enroll in or waive the student health plan* (Aug 1 — Massachusetts requires
it), *Pay your fall bill* (Aug 12, after the bill on Jul 24), *Upload your ID photo* (already a setup
step). Not now: AP/IB score submission as a step (My Degree's *potential match* already shows its
result), roommate matching, living-learning communities, NetID as a word (the account step names the
thing).

❓ **Q16 — Aster's 2026–27 calendar.** §2 rows 4–12; BU/Macalester/Carleton as the MA/LAC
comparables. ➡️ Semester. Move-in Sat Aug 22; welcome week Aug 22–25; **classes begin Wed Aug 26**;
add/drop ends Wed Sep 9 (census); Labor Day Sep 7; fall break Oct 12–13; Thanksgiving Nov 25–29;
classes end Dec 9; finals Dec 14–18. Spring: classes Jan 20, 2027; spring break Mar 15–19; classes
end May 5; finals May 10–14; Commencement Sun May 23; academic year ends May 31, 2027 (the date
onboarding already carries). Aid disburses Aug 17 (≤10 days before classes). Housing: application
opened May 4, **due Jun 30** (ENR-207's response deadline moves here), roommate matching Jul 6,
assignment Jul 20, contract within 7 days; move-in time chosen after assignment, by Aug 7.
Orientation booking by Jun 26; sessions Jul 6–7, 13–14, 20–21. Immunization record due Jul 1 (hold
until accepted). Verification due Jul 1. Final transcript Jul 1. Entrance counseling + MPN by Aug 1.
Health plan waive/enroll by Aug 1. ID photo by Jul 31.

❓ **Q17 — Maya's home.** `profile/data.js` and onboarding disagree (Newton vs Fall River). ➡️
**Fall River, MA** — fits first-generation and Pell-eligible; the Newton address goes. Born Mar 14,
2008 (the record). The campus town stays *Aster, MA*; the zip is a fact-sheet detail.

❓ **Q18 — The staff words.** §4 yield (unsourced), melt. ➡️ Nothing changes in `CONTEXT.md` now;
*yield* is flagged `[unsourced — verify]` in the research and stays out of copy until sourced.

❓ **Q19 — Could not be sourced** (AACRAO; MA immunization statute text; 1098-T from irs.gov;
yield). ➡️ Recorded in the research; none blocks a decision above. The MA *insurance* mandate is
sourced (BU).

## 7. Applied in this commit

- `CONTEXT.md`: Office renames (Residential Life, Office of the Bursar, Academic Advising); **Residence
  hall**; advisor spelling; new subsection *Words the campus uses* — First-year, Enrollment deposit,
  Orientation, Verification, Master Promissory Note, Bill, Payment plan, FERPA release.
- `docs/domain/aster.md` written from Q3–Q5, Q8–Q17.
- The data card's spec: `.scratch/brief-2026-08-22-us-calendar/spec.md`.
