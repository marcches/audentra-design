# US new-student enrollment — the standard the portal is held to

Researched 2026-08-22 against primary sources only: federal (Federal Student Aid, ED, OCR, ADA.gov,
34 CFR), associations (NACAC, ACHA) and the public pages of US institutions — University of
Michigan, UT Austin, Ohio State, Purdue (large publics); Boston University, Northeastern, Vanderbilt
(private residential); Carleton, Macalester (liberal-arts colleges); Austin Community College,
Columbus State (community colleges) — plus single pages from other campuses where named. Every claim
links to the page it was read on. AACRAO could not be read (Cloudflare bot wall on every path
tried); registrar practice is cited from registrars' own pages instead.

## 1. Scope and how to use this file

- **What it is.** The way US colleges and universities run, name and phrase the path from the offer
  of admission to the first day of classes — the standard every Audentra screen, word, date and
  order is held to, because Aster is a US university and Maya is a US first-year.
- **What it is not.** Not the product glossary — `CONTEXT.md` decides what *submission*, *step*,
  *office*, *housing plan* mean inside the product. Not copy — `src/lib/navigation.js` is the single
  source of UI strings. Not a spec: no layout, no data shapes.
- **The rule.** When a screen, a word, a date, an office name or an order is in doubt, this file
  wins over the agent's default or any international/generic convention. Where `CONTEXT.md` has
  chosen a word, §4 says whether the US sources agree; a disagreement is a flag for the design
  conversation (§7), not a licence to change `CONTEXT.md` unilaterally.
- **Siblings.** ADR 0006 makes this file binding by default; ADR 0007 and `docs/domain/aster.md`
  hold what Aster has decided for itself — private, residential, Massachusetts, semester calendar,
  today June 15, 2026, Maya in the Class of 2030. Where the fact sheet departs from this file, the
  departure is one ADR 0007 named; where the code departs from both, it is a defect (§7).

## 2. The journey, as US campuses run it

Fall entry, first-year undergraduate. Order is near-universal; dates are the typical window and the
named campus is the one the date was read from. "Opens" = what the step unlocks.

| # | Stage | Owner | Typical window (fall entry) | Opens | Varies? |
|---|---|---|---|---|---|
| 1 | **FAFSA** filed; school builds the **aid offer** | Federal Student Aid → campus Financial Aid | FAFSA opens by **Oct 1** each year by statute; the 2026–27 form opened Sept 24, 2025 ([ED](https://www.ed.gov/about/news/press-release/us-department-of-education-announces-earliest-fafsa-form-launch-program-history)). Michigan: "Receive Your Financial Aid Notice… on a rolling basis"; final FAFSA/CSS deadline Mar. 1 ([Michigan](https://admissions.umich.edu/congratulations/first-year)). Ohio State: "Financial Aid Notification" emailed from March ([OSU](https://undergrad.osu.edu/apply/freshmen-columbus/after-you-are-admitted)) | The decision on where to enroll — NACAC: students "should not be required to submit an enrollment confirmation until the institution has notified them of all offers of financial aid and scholarships" ([NACAC Guide, p. 7](https://www.nacacnet.org/wp-content/uploads/NACAC-Guide-to-Ethical-Practice-in-College-Admission.pdf)) | Amounts, institutional forms (CSS Profile) |
| 2 | **Accept the offer / pay the enrollment deposit** | Admissions | **May 1** — NACAC's "National Candidates Reply Date… the earliest enrollment confirmation deadline" ([NACAC Guide, p. 6](https://www.nacacnet.org/wp-content/uploads/NACAC-Guide-to-Ethical-Practice-in-College-Admission.pdf)). Michigan $300 ([Michigan](https://admissions.umich.edu/congratulations/first-year)); UT Austin $200 by May 1 ([UT](https://admissions.utexas.edu/info-for/admitted-students/admitted-freshman/)); OSU "$100 nonrefundable acceptance fee" by May 1 ([OSU](https://undergrad.osu.edu/apply/freshmen-columbus/after-you-are-admitted)); Purdue "nonrefundable $500 deposit" by "May 1, 11:59 p.m. ET" ([Purdue](https://admissions.purdue.edu/admitted-students/accept-your-offer/)); BU "$650 enrollment deposit by the deadline in your decision letter" ([BU](https://www.bu.edu/admissions/admitted/checklists/regular-decision/)); Wayne State $50, "nonrefundable after May 1" ([Wayne](https://wayne.edu/admissions/first-year/enrollment-deposit)) | Everything: Michigan — "you'll be guaranteed a space in your class. You will also be able to access your U-M email account and sign up for orientation and housing"; OSU — "Payment of your acceptance fee will initiate orientation, housing and Ohio State email information"; Wayne — "To register for New Student Orientation and sign up for classes, you must pay, or be eligible to defer, the enrollment deposit" | Amount ($50–$650), waiver availability, whether it is called a deposit or an acceptance fee |
| 3 | **Campus account / username / email** | IT (via Admissions or Registrar) | Right after the deposit. Michigan "U-M uniqname", Macalester "Initialize your Macalester Account" May 19 ([Macalester](https://www.macalester.edu/admissions/admitted-students/your-path-to-mac/)), Carleton email + Duo by June 15 ([Carleton](https://carleton-wp-production.s3.amazonaws.com/uploads/sites/670/2025/05/ADMS_New-Student-Checklist_FY25.pdf)), Vanderbilt "Register for VUnetID and OneVU" ([Vanderbilt](https://www.vanderbilt.edu/welcome/important-dates/)), ACC "ACCeID… ACCmail, the official form of communication" ([ACC](https://admissions.austincc.edu/)) | Every later step — campuses write only to the campus address | Name of the credential |
| 4 | **Housing application → assignment → contract** | Housing / Residence Life | Application opens Apr 2, due "Monday, May 11 at 11:59 PM EDT", assignment late June, contract ~3 days ([Michigan Housing](https://housing.umich.edu/first-year-application-instructions/)); Purdue "May 5, 2026, at 11:59 p.m. EDT", roommate matching ~May 22, assignment "on or around July 15, 2026" ([Purdue](https://www.housing.purdue.edu/my-housing/apply/new-resident-faqs.html)); OSU contracts emailed from mid-March in acceptance-fee order, due ~2 weeks later, assignment mid-July ([OSU](https://housing.osu.edu/incoming-students/how-to-apply-1st-year-students-2026-h-s-grads)); Vanderbilt "Monday, June 1 at 6 p.m. CDT", assignment early August ([Vanderbilt](https://www.vanderbilt.edu/welcome/student-housing/)); Macalester June 15, roommate July 16 | Roommate, meal/dining plan, move-in slot | Application vs contract vocabulary; self-select vs assigned; live-on requirements |
| 5 | **Orientation registration, placement, advising, course registration** | New Student Programs / Orientation; advising; Registrar | Michigan: email mid-May "to register for an Advising Date"; "online orientation modules and placement tests prior to your Advising Date"; sessions "Early June through mid-August" ([Michigan](https://admissions.umich.edu/congratulations/first-year)). OSU: "required for all students… June through July" ([OSU](https://undergrad.osu.edu/apply/freshmen-columbus/after-you-are-admitted)). UT: "Orientation is required for all incoming students" ([UT](https://orientation.utexas.edu/)). Purdue: Purdue 101 (required) → Purdue Advising → Purdue 102 → Boiler Gold Rush "Aug. 18-22, 2026" ([Purdue](https://www.purdue.edu/orientation/), [BGR](https://www.purdue.edu/orientation/bgr/index.html)). BU: "Register for University Orientation after May 1", Orientation "August 26-September 1, 2026" ([BU](https://www.bu.edu/admissions/admitted/checklists/regular-decision/)). Carleton: pre-register Aug 7–22; Macalester Aug 3–14 | First-semester schedule; the student ID photo is often collected here | Summer session vs. August week; required at most campuses |
| 6 | **Final high-school transcript** | Admissions | "As soon as possible after high school graduation" ([Michigan](https://admissions.umich.edu/congratulations/first-year)); "June" ([UT](https://admissions.utexas.edu/info-for/admitted-students/admitted-freshman/)); **July 1** ([Macalester](https://www.macalester.edu/admissions/admitted-students/your-path-to-mac/), [Carleton](https://carleton-wp-production.s3.amazonaws.com/uploads/sites/670/2025/05/ADMS_New-Student-Checklist_FY25.pdf), [UC](https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/after-you-apply/transcript-submissions.html)) | Nothing — it closes the admission; UC: "failure to provide official records may jeopardize your enrollment"; OSU: "admission is contingent on our review" | Date |
| 7 | **Immunization record** | Student Health | OSU "prior to the start of their first semester", else "a hold… prohibiting the scheduling of classes" ([OSU SHS](https://shs.osu.edu/vaccinations1/university-vaccination-requirement)); UT: meningitis "no later than ten days before the semester begins"; "All incoming students automatically have a medical hold" ([UT UHS](https://www.healthyhorns.utexas.edu/uhs/us-citizens.html)); ACC "before the first class meeting" ([ACC](https://admissions.austincc.edu/meningitis-requirement/)); Carleton by July 1; Michigan Housing "will act on your application after your immunization information has been verified" | Registration (hold lifted); housing (Michigan) | Which vaccines (state law + institution, §5) |
| 8 | **Health insurance: enroll or waive** | Student Health / Student Accounts | BU: "required by the state of Massachusetts"; waive "by the end of the open enrollment period" ([BU](https://www.bu.edu/studentfinancials/resources/student-health-insurance-plan/)); Macalester waiver deadline "August 14, 2026" ([Macalester](https://www.macalester.edu/admissions/admitted-students/your-path-to-mac/)); Carleton Aug 15; OSU "waive the plan by the deadline if you have other qualifying coverage" ([OSU](https://shi.osu.edu/shi-benefits-plan)) | Removes the premium from the bill | Mandatory in some states; auto-enroll with waiver is the common shape |
| 9 | **Bill and payment** | Bursar / Student Accounts | Purdue "Fall invoices will be available late July", semester begins Aug 24 ([Purdue](https://www.purdue.edu/bursar/)); OSU "Statement of Account", fee payment deadline "August 18, 2026", TOPP installments Aug 18 / Sept 18 / Oct 18 / Nov 18 ([OSU](https://busfin.osu.edu/bursar)); UT undergrads "5:00 PM, Thursday, August 13" or "your registration will be canceled" ([UT](https://registrar.utexas.edu/schedules/269/payment)); Michigan room & board "Aug. 31" | Keeps the registration | Due date (≈2 weeks before classes), plan fees, whether non-payment cancels registration |
| 10 | **Aid disburses** | Financial Aid → Bursar | No earlier than "10 days before the first day of classes of a payment period"; credit balance paid to the student "no later than 14 days" after ([FSA Handbook vol. 4](https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol4/ch2-disbursing-title-iv-funds)); UT "Financial aid disbursement begins August 18" ([UT](https://onestop.utexas.edu/managing-costs/paying-your-tuition/tuition-bills/)) | Refund of any credit balance | — |
| 11 | **Move-in → first day of classes** | Housing; Registrar | Macalester Move-In Aug 31, classes Sept 8; Carleton halls open "8 a.m. on Tuesday, September 9"; BU matriculation Sept 1, classes Sept 2; UT/Purdue/FSU classes Aug 24 ([UT](https://registrar.utexas.edu/calendars/26-27), [FSU](https://news.fsu.edu/news/students-campus-life/2026/08/19/florida-state-university-welcomes-class-of-2030-as-new-academic-year-begins/)) | — | Mid-August (publics) to early September (semester-late privates/LACs) |
| 12 | **Add/drop → census** | Registrar | UT "12th class day" Sept 9 — "Last day to drop a class without permission", tuition/add-bill deadlines the same day ([UT](https://registrar.utexas.edu/calendars/26-27)); CSUSB: "Each term has a specified census date… the deadline (last day) for adding or dropping a course" ([CSUSB](https://www.csusb.edu/registrar/registration/adding-or-dropping-after-census)); Carleton "Every student also has an add/drop period once classes begin" | Enrollment is final for aid, billing, reporting | Name ("12th class day", "census") and length (1–3 weeks) |

Observed across campuses: the deposit is the gate for everything else (step 2 opens 3, 4, 5); the
immunization record gates registration through a hold, not through a deadline sentence; the bill is
due about two weeks before classes and is the last gate before the first day.

Closest comparables for Aster as ADR 0007 defines it (private, residential, Massachusetts): Boston
University — "$650 enrollment deposit by the deadline in your decision letter", housing application
"after paying your deposit", "Register for University Orientation after May 1", immunization forms
from Student Health Services over the summer, "Submit payment for first-semester charges", Orientation
"August 26-September 1, 2026", "Matriculation September 1, 2026", "Classes Begin September 2, 2026"
([BU](https://www.bu.edu/admissions/admitted/checklists/regular-decision/)); health insurance
"required by the state of Massachusetts", waived only against "comparable coverage"
([BU](https://www.bu.edu/studentfinancials/resources/student-health-insurance-plan/)); and
Northeastern, whose single "Student Financial Services" office carries aid and billing and whose
loan paperwork is "Federal Loan Entrance Counseling and a Master Promissory Note (MPN)"
([Northeastern](https://studentfinance.northeastern.edu/applying-for-aid/undergraduate/admitted-students/)).
On June 15 such a student has deposited, has her campus account, is inside the housing application
or awaiting assignment, is booking orientation, and has the transcript, immunization, insurance and
bill steps ahead of her.

## 3. The offices

| Function | Names read on campus pages (most common first) | Owns / decides |
|---|---|---|
| Admissions | "Office of Undergraduate Admissions" ([Michigan](https://admissions.umich.edu/congratulations/first-year)); "Undergraduate Admissions" ([Purdue](https://admissions.purdue.edu/admitted-students/accept-your-offer/)); "Admissions" ([UT](https://admissions.utexas.edu/enroll/), [ACC](https://admissions.austincc.edu/)); "the admissions office" ([UC](https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/after-you-apply/transcript-submissions.html)) | The decision, the deposit/acceptance, the final transcript, deferral; an "admissions counselor" is the named person ([UT](https://admissions.utexas.edu/enroll/)) |
| Financial aid | "Office of Financial Aid" ([Michigan](https://admissions.umich.edu/congratulations/first-year), [ED sample letter](https://www.ed.gov/media/document/sample-aid-offer-2pdf-57113.pdf)); "financial aid office" is the generic ([studentaid.gov](https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized)); "Student Financial Services" where aid and billing are one office ([Northeastern](https://studentfinance.northeastern.edu/applying-for-aid/undergraduate/admitted-students/)) | The aid offer, verification, SAP, loan counseling/MPN follow-up |
| Bursar / student accounts | "Office of the Bursar" ([Purdue](https://www.purdue.edu/bursar/)); "Office of the University Bursar" ([OSU](https://busfin.osu.edu/bursar)); "Student Financials" ([BU](https://www.bu.edu/studentfinancials/)); "Texas One Stop" + "Student Accounts Receivable" ([UT](https://registrar.utexas.edu/schedules/269/payment)); "Bursar's Office" ([Lincoln](https://www.lincoln.edu/departments/bursar/financial-clearance)) | The bill/statement, due dates, payment plans, authorized payers, refunds, 1098-T, financial holds |
| Registrar | "Office of the Registrar" ([Purdue](https://www.purdue.edu/registrar/records/registration/holds), [UT](https://registrar.utexas.edu/calendars/26-27), [CSUSB](https://www.csusb.edu/registrar/registration/adding-or-dropping-after-census)); "University Registrar" ([OSU](https://registrar.osu.edu/policies-information/university-policy/administrative-hold-information-and-clearance-procedures/)) | Registration, holds, the academic record/transcript, calendar, degree audit |
| Housing | "Michigan Housing" ([Michigan](https://housing.umich.edu/first-year-application-instructions/)); "University Residences" ([Purdue](https://www.housing.purdue.edu/my-housing/apply/new-resident-faqs.html)); "Housing and Residence Education" (under Student Life) ([OSU](https://housing.osu.edu/)); "University Housing and Dining" ([UT](https://housing.utexas.edu/)); "Residential Life" ([Carleton](https://carleton-wp-production.s3.amazonaws.com/uploads/sites/670/2025/05/ADMS_New-Student-Checklist_FY25.pdf)) | Application/contract, roommate, assignment, meal plan, move-in, live-on requirement |
| Student health | "Student Health Services" ([OSU](https://shs.osu.edu/vaccinations1/university-vaccination-requirement), [BU](https://www.bu.edu/admissions/admitted/checklists/regular-decision/)); "University Health Services" ([UT](https://www.healthyhorns.utexas.edu/uhs/us-citizens.html)) | Immunization compliance and the hold; insurance plan (sometimes a separate "Student Health Insurance" office — [OSU](https://shi.osu.edu/shi-benefits-plan)) |
| Disability / access | "Student Life Disability Services" ([OSU](https://slds.osu.edu/)); "Disability Resource Center" ([Purdue](https://www.purdue.edu/drc/)); "Disability and Access (D&A)" ([UT](https://disability.utexas.edu/)); "Student Access Office" ([Vanderbilt](https://www.vanderbilt.edu/welcome/student-housing/)); OCR's generic: "Section 504 Coordinator, ADA Coordinator, or Disability Services Coordinator" ([OCR](https://www.ed.gov/higher-education/students-disabilities-preparing-postsecondary-education)) | Registration, documentation, accommodation letters |
| Dean of Students / Student Affairs / Student Life | "Office of the Dean of Students" inside the "Division of Student Affairs" ([UNC](https://studentaffairs.unc.edu/department/office-of-the-dean-of-students/)); places conduct holds ([Purdue](https://www.purdue.edu/registrar/records/registration/holds)); OSU's umbrella is "Office of Student Life" (health, housing, disability, wellness all sit under it) | Conduct, care, student organisations; orientation often reports here |
| Orientation | "Office of New Student Programs" ([Michigan](https://admissions.umich.edu/congratulations/first-year)); "Student Success Programs" running "Orientation and Transition" ([Purdue](https://www.purdue.edu/orientation/)); "New Student & Transfer Programs (NSTP)" ([UW](https://nstp.uw.edu/about-nstp/intro-nstp)); program names: "University Orientation" (BU), "Longhorn Orientation" (UT), "Boiler Gold Rush" (Purdue), "Riverbat Orientation" (ACC) | Session booking, online modules, placement, the advising appointment |
| Wellness | "Office of Student Life Student Wellness Center" — uses "wellness" in the name and "well-being" in the mission ([OSU](https://swc.osu.edu/about-us/)) | Non-clinical health promotion |
| Academic advising | "academic advisor" ([Purdue](https://www.purdue.edu/orientation/), [UT](https://admissions.utexas.edu/info-for/admitted-students/admitted-freshman/)); "academic adviser(s)" ([Michigan](https://admissions.umich.edu/congratulations/first-year)); "Liberal Arts Adviser" ([Carleton](https://carleton-wp-production.s3.amazonaws.com/uploads/sites/670/2025/05/ADMS_New-Student-Checklist_FY25.pdf)) | Course planning; the "advising hold" |

Portals named in the student's voice: "Enrollment Connect" (Michigan), "MyStatus" (UT), "Applicant
Center"/"My Buckeye Link" (OSU), "myPurdue", "MyBU", "Workday" (Carleton, Columbus State),
"1600grand" (Macalester), "YES" (Vanderbilt).

## 4. Vocabulary

Each entry: the US usage, the source, and — where `CONTEXT.md` or the portal has a word — whether
they agree.

**Admission and enrollment**
- **Enrollment deposit** — "the fees or written commitments that confirm a student's intention to
  enroll. They may also be referred to as tuition deposits or enrollment fees. Housing deposits are
  the fees that colleges require to hold a student's place in on-campus housing"
  ([NACAC](https://www.nacacnet.org/wp-content/uploads/NACAC-Guide-to-Ethical-Practice-in-College-Admission.pdf)).
  Offers "should state if the deposit is refundable or non-refundable" (same). OSU calls it an
  "acceptance fee"; UT "a payment toward your first semester's tuition and fees"; Vanderbilt
  "matriculation deposit". Portal says *enrollment deposit* — agrees.
- **Admitted / candidate / enrolled / matriculated / registered** — NACAC: a student is a
  *candidate* until they have "officially confirmed their intention to enroll (usually by submitting
  an enrollment deposit)"; *first-year students* are "first-time undergraduate matriculants"
  ([NACAC](https://www.nacacnet.org/wp-content/uploads/NACAC-Guide-to-Ethical-Practice-in-College-Admission.pdf)).
  BU dates "Matriculation" separately from "Classes begin"
  ([BU](https://www.bu.edu/admissions/admitted/checklists/regular-decision/)). *Registered* = has a
  class schedule; Michigan's flow is "meet with an academic advisor… register for your first
  semester of classes".
- **First-year, not freshman** — ASU "retired the term freshman" in 2019
  ([ASU](https://asuonline.asu.edu/newsroom/asu-online-news/freshman-vs-first-year/)); UW Admissions
  "moved away from the term freshman, replacing it with first-year" in August 2025
  ([UW](https://nstp.uw.edu/about-nstp/intro-nstp)); Michigan, BU, Vanderbilt, FSU all say
  "first-year". UT and OSU still say "freshman" in URLs and headings. *Incoming*/*new student* are
  the neutral terms everywhere.
- **Class of 20XX** = expected graduation year: fall-2026 entrants are the "Class of 2030"
  ([FSU](https://news.fsu.edu/news/students-campus-life/2026/08/19/florida-state-university-welcomes-class-of-2030-as-new-academic-year-begins/)).
- **Term / semester / academic year** — "Fall 2026" (UT, Purdue), "Autumn 2026" (OSU), "Fall
  semester"; academic year written "2026–27" ([Pell, "July 1, 2026, to June 30,
  2027"](https://studentaid.gov/understand-aid/types/grants/pell)) or "2026-2027" ([OSU
  housing](https://housing.osu.edu/incoming-students/fees-contracts-policies/2026-27-undergraduate-terms-and-conditions/)).
  Portal's "2026–27 academic year", "Fall 2026 entry" — agree.
- **Yield; summer melt** — *summer melt*: admitted students who "abruptly end their educational
  careers" between acceptance and fall, "Somewhere between 10 and 20 percent"
  ([NACAC](https://www.nacacnet.org/avoiding-summer-melt/)). *Yield* = enrolled ÷ admitted
  `[unsourced — verify; only secondary glossaries reached]`.

**Money**
- **FAFSA** — "Any student, regardless of income, who wants to be considered for federal, state, and
  school financial aid"; filed every year; needs an FSA ID and a parent "contributor"
  ([studentaid.gov](https://studentaid.gov/h/apply-for-aid/fafsa)).
- **FAFSA Submission Summary** — what the student gets after processing (replaces the SAR):
  Eligibility Overview with the **Student Aid Index (SAI)**, FAFSA answers, school info, Next Steps
  — and the place to see "if you've been selected for verification"
  ([studentaid.gov](https://studentaid.gov/articles/fafsa-submission-summary/)).
- **Aid offer / award letter / financial aid package** — "financial aid offers (sometimes called
  award letters)"; "no standardized format"
  ([studentaid.gov](https://studentaid.gov/articles/evaluating-financial-aid-offers/)); ED's sample
  is headed "estimated financial aid award letter… Your award package" ([ED
  sample](https://www.ed.gov/media/document/sample-aid-offer-2pdf-57113.pdf)); Northeastern: "Your
  financial aid offer represents the best financial aid package"
  ([Northeastern](https://studentfinance.northeastern.edu/applying-for-aid/undergraduate/admitted-students/));
  Michigan: "financial aid notice". Portal's "aid package"/"financial package" — agree; *offer* is
  the federal word.
- **Verification** — the school confirming FAFSA data; selected by the Department's processing
  system or by the school; groups V1 (income/tax items, family size), V4 (identity), V5 (both);
  documents: IRS data transfer, tax transcript or signed return, W-2, signed statements, photo ID
  ([FSA Handbook AVG ch.
  4](https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/application-and-verification-guide/ch4-verification-updates-and-corrections)).
  To the student: "Being selected for verification doesn't mean you're being accused of doing
  anything wrong… the school won't be able to process your financial aid until it receives the
  information it requested"
  ([studentaid.gov](https://studentaid.gov/articles/fafsa-submission-summary/)). Portal's "Verify
  your household income" describes the same thing — agrees in substance; the campus word is simply
  *verification*.
- **Cost of attendance (COA)** — tuition and fees, books/course materials/supplies, living expenses
  (food and housing), transportation, miscellaneous personal; "the annual cost advertised by the
  school before financial aid is applied" ([FSA Handbook vol.
  3](https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol3/ch2-cost-attendance-budget),
  [studentaid.gov](https://studentaid.gov/understand-aid/types/grants/pell)). Portal — agrees,
  including the direct/indirect split.
- **Pell Grant** — "does not have to be repaid, except under certain circumstances"; max "$7,395 for
  the 2026–27 award year"
  ([studentaid.gov](https://studentaid.gov/understand-aid/types/grants/pell)). Portal — agrees.
- **Federal Work-Study** — "part-time jobs for undergraduate and graduate students with financial
  need"; "income isn't guaranteed—you need to find and apply for a job"
  ([studentaid.gov](https://studentaid.gov/understand-aid/types/work-study), [evaluating
  offers](https://studentaid.gov/articles/evaluating-financial-aid-offers/)). Portal's gloss ("a
  part-time campus job paid from federal aid") — agrees.
- **Direct Subsidized / Unsubsidized Loan** — subsidized: "undergraduate students with financial
  need… The U.S. Department of Education pays the interest… while you're in school at least
  half-time"; unsubsidized: "no requirement to demonstrate financial need… You are responsible for
  paying the interest… during all periods"
  ([studentaid.gov](https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized)).
  Portal's "Federal Direct Subsidized Loan" + gloss — agrees.
- **MPN and entrance counseling** — first-time borrowers must "complete entrance counseling… and
  sign a loan contract called a Master Promissory Note" (same page); "First-time student borrowers
  must complete entrance counseling before they can receive the first disbursement" ([FSA Handbook
  vol.
  8](https://fsapartners.ed.gov/sites/default/files/2025-2026/2025-2026_Federal_Student_Aid_Handbook/_knowledge-center_fsa-handbook_2025-2026_vol8.pdf)).
  Portal has the MPN ("Sign your federal loan agreement") and no entrance counseling.
- **Scholarship vs grant vs loan** — "money that doesn't need to be repaid, earned money, or
  borrowed money"
  ([studentaid.gov](https://studentaid.gov/articles/evaluating-financial-aid-offers/));
  institutional aid = "scholarships and grant awards offered by your school". Portal's "Grants and
  scholarships are not repaid. Loans are." — agrees.
- **SAP (satisfactory academic progress)** — GPA standard, pace, maximum timeframe 150% of program
  length, evaluated at least annually; "financial aid warning"/"probation"/appeal ([FSA Handbook
  vol.
  1](https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol1/ch1-school-determined-requirements),
  [studentaid.gov](https://studentaid.gov/understand-aid/eligibility/staying-eligible)). Portal's
  "Academic progress" card — agrees.
- **Tuition and fees; bill; statement; e-bill; invoice** — Purdue "invoice"; OSU "Statement of
  Account" ("does not mail or email bills"); UT "tuition bill… electronic bill (eBill)"; BU "student
  account"/"bill". **Payment plan / installment plan** — Purdue "Installment Plan… 4-Pay Plan… $60"
  setup fee
  ([Purdue](https://www.purdue.edu/treasurer/finance/bursar-office/payment/installment-plan/)); OSU
  "Tuition Option Payment Plan"; UT "installment plan… $15 installment plan fee… $25 late charge".
  **Financial clearance** — "Demonstrating your intent to pay"; "does not mean that you have to be
  paid in full" ([Lincoln](https://www.lincoln.edu/departments/bursar/financial-clearance)); not
  used at the large campuses read. **Refund** = credit balance paid out (FSA vol. 4). **1098-T** —
  listed as "IRS Form 1098-T" on bursar sites ([OSU](https://busfin.osu.edu/bursar),
  [BU](https://www.bu.edu/studentfinancials/)). Portal's "4-month plan"/"Installment 1" — the shape
  agrees; the campus noun is *payment plan*.
- **Authorized user / authorized payer / guest** — the student grants a parent access to the bill:
  "Authorized User Access" ([Purdue](https://www.purdue.edu/bursar/)), "Authorized Payer… requires
  'Student Information Release' consent" ([OSU](https://busfin.osu.edu/bursar)), "Guest User access
  to anyone who is assisting them with bill payment" ([BU](https://www.bu.edu/studentfinancials/)).

**Records and registration**
- **Hold** — "a restriction placed on your student record" that blocks registration, transcripts,
  diploma; placed by the Bursar, Dean of Students, health/immunization, advising, Residence Life,
  library ([Purdue](https://www.purdue.edu/registrar/records/registration/holds)); OSU's
  "administrative hold" withholds "registering or enrolling… receiving a transcript or diploma"
  ([OSU](https://registrar.osu.edu/policies-information/university-policy/administrative-hold-information-and-clearance-procedures/));
  UT calls them "bars" (advising, financial, nonfinancial) and the immunization one a "medical hold"
  ([UT UHS](https://www.healthyhorns.utexas.edu/uhs/us-citizens.html)). Portal has no hold; §7.
- **Transcript — official / final** — "official final high school transcript, with graduation date"
  ([Michigan](https://admissions.umich.edu/congratulations/first-year)); "final, official
  transcripts"
  ([UC](https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/after-you-apply/transcript-submissions.html)).
  Portal's "Final transcript check" — agrees.
- **AP / IB / dual-enrollment credit** — "Send your pre-Carleton credits: AP/IB scores and prior
  college transcript(s)" by July 1
  ([Carleton](https://carleton-wp-production.s3.amazonaws.com/uploads/sites/670/2025/05/ADMS_New-Student-Checklist_FY25.pdf));
  OSU "AP/IB scores for potential credit"
  ([OSU](https://undergrad.osu.edu/apply/freshmen-columbus/after-you-are-admitted)). Portal's
  *potential match* is this, seen from the record.
- **Placement test** — Michigan "placement tests prior to your Advising Date"; Carleton "Placement
  tests: chemistry, math and stats… languages" Aug 1; Purdue "Confirm Your Math Placement"
  ([Purdue](https://admissions.purdue.edu/admitted-students/next-steps/)).
- **Advising / registration / add-drop / census** — see §2 rows 5 and 12. **Credit hour** — "one
  hour of classroom or direct faculty instruction and a minimum of two hours of out-of-class student
  work each week for approximately fifteen weeks" ([34 CFR
  600.2](https://www.law.cornell.edu/cfr/text/34/600.2)). **Degree audit** — "a tool… to ensure
  timely progression through a faculty prescribed curriculum, which outlines all of the requirements
  needed to earn an academic credential"
  ([OSU](https://registrar.osu.edu/student-hub/degree-audit-students/)). **Major / minor /
  concentration** — "primary field of study" / "optional, secondary field" / "a structured plan of
  study within a major" ([UNC
  Charlotte](https://provost.charlotte.edu/policies-procedures/academic-policies-and-procedures/definition-undergraduate-majors-minors/)).
  **GPA** — the "C" equivalent floor in SAP ([FSA vol.
  1](https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol1/ch1-school-determined-requirements)).

**Health and access**
- **Immunization record / compliance** — OSU: hepatitis B, MMR, meningococcal ACWY (under 22), polio
  (under 18), Tdap, varicella; "Vaccination Requirement"; non-compliance = hold ([OSU
  SHS](https://shs.osu.edu/vaccinations1/university-vaccination-requirement)); ACHA lists MMR,
  meningococcal, Tdap, varicella, hepatitis A/B, HPV, polio, influenza, COVID-19, pneumococcal, and
  notes "Institutions may also be subject to additional requirements for pre-matriculation
  vaccinations… by state law" ([ACHA
  2025](https://www.acha.org/wp-content/uploads/ACHA_Immunization_Recommendations_April_2025.pdf)).
  Portal's "immunization record" — agrees.
- **Health insurance waiver** — "Student Health Insurance Plan (SHIP)"; "waive SHIP
  coverage–provided you have other coverage that meets the comparable coverage requirements"
  ([BU](https://www.bu.edu/studentfinancials/resources/student-health-insurance-plan/)).
- **Accommodations** — the campus word is "accommodations" ([OSU SLDS](https://slds.osu.edu/),
  [Purdue DRC](https://www.purdue.edu/drc/)); UT's mission says "reasonable accommodations" ([UT
  D&A](https://disability.utexas.edu/)); OCR's legal term is "academic adjustments"
  ([OCR](https://www.ed.gov/higher-education/students-disabilities-preparing-postsecondary-education)).
  `CONTEXT.md`'s *accommodation answer* and "Accessibility Services" — the noun agrees; the office
  name is one of several (§3).
- **Wellness vs well-being** — OSU uses "wellness" as the name and "well-being" in prose ([OSU
  SWC](https://swc.osu.edu/about-us/)). `CONTEXT.md` picks *wellness* — agrees for a label.

**Housing**
- **Housing application / contract / assignment** — Michigan: "Applying for housing is the first
  step"; "a room assignment comes next"; then "an offer to submit a housing contract for that
  assigned space" ([Michigan
  Housing](https://housing.umich.edu/first-year-application-instructions/)); Purdue uses application
  and contract for the same binding document
  ([Purdue](https://www.housing.purdue.edu/my-housing/apply/new-resident-faqs.html)); OSU: "The
  Housing Contract is a legal and binding agreement"
  ([OSU](https://housing.osu.edu/incoming-students/fees-contracts-policies/2026-27-undergraduate-terms-and-conditions/)).
  `CONTEXT.md`'s *room assignment* — agrees; *preference*/*shortlist* map to "housing preferences…
  preferred campus and room type" (Michigan).
- **Roommate** — "roommate-matching questions… roommate groups" (Michigan); "Roommate matching
  begins on or around May 22" (Purdue); Vanderbilt "a lifestyle questionnaire… intentional pairing"
  ([Vanderbilt](https://www.vanderbilt.edu/welcome/student-housing/)).
- **Meal plan / dining plan** — Purdue "automatically assigned the 14 track meal plan"; OSU "All
  residential students are required to have a dining plan"
  ([OSU](https://housing.osu.edu/incoming-students/how-to-apply-1st-year-students-2026-h-s-grads)).
- **Residence hall, not dorm** — institutional voice is "residence hall(s)" at OSU, UT, Purdue,
  Michigan ("Residence Halls Comparison"); Carleton's own FAQ slips to "dorm assignment" once.
  `CONTEXT.md`'s *Residence* avoids both; the US noun for the building is *residence hall*.
- **Living-learning community** — Purdue "Living Learning Communities… competitive application
  process… $200 programmatic fee"; Michigan "Michigan Learning Communities (MLCs) and Theme
  Communities"; OSU "Living-Learning Community".
- **Move-in** — hyphenated noun everywhere ("Move-In 2026", "Move-In Day", UT's branded "Mooov-In").

**Identity**
- **Student ID card** — campus-branded: "Terrier Card" (BU), "Mcard" (Michigan), "OneCard photo
  submission"
  ([Carleton](https://carleton-wp-production.s3.amazonaws.com/uploads/sites/670/2025/05/ADMS_New-Student-Checklist_FY25.pdf)),
  "MacPass photo"
  ([Macalester](https://www.macalester.edu/admissions/admitted-students/your-path-to-mac/)) — the
  photo is usually uploaded before orientation.
- **Username** — "uniqname" (Michigan), "VUnetID" (Vanderbilt), "UT EID"/"EID" (UT), "ACCeID" (ACC);
  *NetID* is the generic.
- **FERPA release / proxy access** — see §5.

## 5. The regulatory frame that shapes what a screen may say

- **FERPA.** "When a student turns 18 years old, or enters a postsecondary institution at any age,
  the rights under FERPA transfer from the parents to the student ('eligible student')"
  ([ED](https://studentprivacy.ed.gov/faq/what-ferpa)). Disclosure of PII from education records
  needs "a signed and dated written consent" unless an exception applies; *directory information*
  (name, address, email, major, enrollment status, dates of attendance…) may be disclosed after
  public notice and a chance to opt out ([ED](https://studentprivacy.ed.gov/ferpa)). Institutions
  are not required to give parents access; they *may* disclose without consent to parents of a
  tax-dependent student, in a health or safety emergency, or for alcohol/drug violations under 21
  ([ED](https://studentprivacy.ed.gov/faq/must-postsecondary-institutions-provide-parent-access-eligible-students-education-records)).
  Campuses implement the consent as student-granted *proxy access*: UNC's "Guest ID" where the
  student selects "which information University staff are permitted to share"
  ([UNC](https://registrar.unc.edu/ferpa-parent-guide/)); OSU's "Student Information Release" before
  an Authorized Payer sees the bill ([OSU](https://busfin.osu.edu/bursar)). **Therefore:** the
  portal is the student's; a parent sees nothing unless the student grants it, per category; the
  "Family permissions" setup step is a FERPA release and should read as one.
- **Title IV verification.** The school must verify selected applicants; Pell/FSEOG may be disbursed
  once as an interim disbursement, FWS for 60 days, but a Direct Subsidized Loan may be originated
  and **not disbursed** until verification is complete; missing the deadline forfeits Pell for the
  year
  ([FSA Handbook AVG ch. 4](https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/application-and-verification-guide/ch4-verification-updates-and-corrections)).
  **Therefore:** a verification step may say the loan is held, must never imply wrongdoing, and must
  name the documents and the date the school set.
- **ADA / Section 504.** Title II covers public institutions, Title III private ones
  ([ADA.gov](https://www.ada.gov/topics/intro-to-ada/)). A school "may not deny your admission
  simply because you have a disability"; "if you want the school to provide an academic adjustment,
  you must identify yourself as having a disability"; "Schools may set reasonable standards for
  documentation"; request "as early as possible"
  ([OCR](https://www.ed.gov/higher-education/students-disabilities-preparing-postsecondary-education)).
  Campuses add that accommodations are arranged through the disability office after registration and
  documentation ([OSU SLDS](https://slds.osu.edu/), [Purdue DRC](https://www.purdue.edu/drc/)).
  **Therefore:** no screen outside the disability office's own flow asks for a diagnosis or a
  document; the portal may only ask whether the student wants to talk to that office — exactly
  `CONTEXT.md`'s *accommodation answer*.
- **State immunization law + ACHA.** Requirements are institutional policy layered on state law
  (Texas: meningococcal for under-22s, "within five years"; Ohio State: six vaccines; Massachusetts:
  insurance) — see §4. **Therefore:** the required list is Aster's to publish, the deadline is
  "before your first semester", and the consequence is a registration hold, not a lost place.
- **Deposit ethics (NACAC).** May 1 is a recommendation, not law; the Guide replaced the CEPP in
  2020 after a 2017 DOJ antitrust inquiry, and today only asks that deadlines not fall before May 1
  and that offers "state if the deposit is refundable or non-refundable"
  ([NACAC](https://www.nacacnet.org/wp-content/uploads/NACAC-Guide-to-Ethical-Practice-in-College-Admission.pdf)).
  **Therefore:** the deposit step must state the amount, the date, and refundability.

## 6. How US campuses talk to an admitted student

- **Second person, imperative verb phrases, present tense.** Michigan's steps: "Pay $300 Enrollment
  Deposit", "Request Your Final High School Transcript", "Submit Vaccination Information", "Make
  Your Fall Term Room and Board Payment"
  ([Michigan](https://admissions.umich.edu/congratulations/first-year)). BU: "Submit your $650
  enrollment deposit", "Create your BU Google Email Account", "Register for University Orientation
  after May 1", "Ask your school to send a final transcript showing proof of your graduation"
  ([BU](https://www.bu.edu/admissions/admitted/checklists/regular-decision/)). OSU: "Accept
  Admission & Pay Acceptance Fee", "Submit Final Transcripts", "Register for Orientation". Carleton:
  "Send your final high school transcript", "Make your tuition payment". The verbs are *pay, submit,
  send, register, complete, accept, request, create, review, apply, attend*.
- **Congratulations / welcome / mascot voice.** "Congratulations, Longhorn! You're just a few steps
  away from joining us on the Forty Acres" ([UT](https://admissions.utexas.edu/enroll/)); "You're
  in!… Congratulations and Boiler Up!" ([Purdue](https://www.admissions.purdue.edu/admitted/));
  "Welcome, new Buckeyes!" ([OSU](https://orientation.osu.edu/)); "Congratulations on your offer of
  admission to Northeastern University!"
  ([Northeastern](https://studentfinance.northeastern.edu/applying-for-aid/undergraduate/admitted-students/));
  even ED's sample letter opens "Dear Student, Congratulations!"
  ([ED](https://www.ed.gov/media/document/sample-aid-offer-2pdf-57113.pdf)). Checklists are "your
  next steps", "your onboarding roadmap" (Carleton), "the steps remaining to become a full-fledged
  Terrier" (BU).
- **Deadlines: month + day, with the time and zone when a portal closes.** "May 1" (UT, OSU);
  "Monday, May 11 at 11:59 PM EDT" (Michigan Housing); "May 5, 2026, at 11:59 p.m. EDT" and "on or
  around July 15, 2026" (Purdue); "Monday, June 1 at 6 p.m. CDT" (Vanderbilt); "5:00 PM, Thursday,
  August 13" (UT); "August 18, 2026" (OSU); AP-style "Aug. 31", "Oct. 1", "Nov. 15", "Jan. 6"
  (Michigan). Both "p.m." and "PM" occur; no 24-hour clock anywhere. Sentences use "by", "no later
  than", "before", "after", "on or around".
- **Money.** "$300", "$650", "$100 nonrefundable acceptance fee", "$60 for the Fall and/or Spring
  semester", "$3,329 for 2026-2027", "$15 installment plan fee… $25 late charge" — dollar sign,
  comma thousands, cents only when they exist.
- **Offices sign, and route.** Michigan: "please email [the deposit office]"; Carleton: "You can
  always email admissions@carleton.edu or call 507-222-4190"; UT: "Direct any questions about
  tuition bills to Texas One Stop via onestop@utexas.edu". Messages are sent to the campus email and
  nowhere else ("Check your student profile in myPurdue"; "emailed to your Ohio State student email
  account").
- **Parents are addressed separately and through the student.** Michigan Housing: "Parents &
  Supporters: view this checklist to help your student"; OSU bursar speaks of "your student".

## 7. Where the portal diverges today (flags, not a critique)

1. **Calendar.** `PORTAL_TODAY` is 2026-08-20 and the hero says "Class of 2031" with
   `academicYear.entry` "Fall 2026 entry", yet the deposit is due Nov 16, installments run Jan–Apr,
   housing's response deadline is Dec 15 and move-in Jan 12
   ([enrollment/data.js](../../src/features/enrollment/data.js),
   [navigation.js](../../src/lib/navigation.js)). On a US calendar a fall-2026 entrant deposited by
   May 1, moved in mid/late August and is in the add/drop window on Aug 20 (§2), and fall-2026
   entrants are the Class of 2030
   ([FSU](https://news.fsu.edu/news/students-campus-life/2026/08/19/florida-state-university-welcomes-class-of-2030-as-new-academic-year-begins/)).
   The dates read as a spring-start or a fall-2027 entry. ADR 0007 has since settled it — today is
   June 15, 2026, Maya is Class of 2030, first-years register at summer orientation behind holds —
   and the fact sheet `docs/domain/aster.md` is where every date now derives from; until the data
   sweep lands, `src/` still carries the old calendar.
2. **Deposit owner.** `deposit.office` is "Financial Aid Office"; on every campus read the deposit
   is accepted by Admissions through the applicant portal
   ([Michigan](https://admissions.umich.edu/congratulations/first-year),
   [OSU](https://undergrad.osu.edu/apply/freshmen-columbus/after-you-are-admitted),
   [Purdue](https://admissions.purdue.edu/admitted-students/accept-your-offer/)). Step title "Lock
   in your place" has no campus precedent; the observed labels are "Accept Your Offer" / "Pay $300
   Enrollment Deposit". Refundability is never stated (NACAC asks that it be).
3. **Registration opens "Sep 1"** (immunization step comment) — US first-years register at summer
   orientation or in an August pre-registration window, and the record gates that through a hold (§2
   rows 5, 7).
4. **Housing vocabulary.** `CONTEXT.md` *Residence* (avoid hall/dorm) vs the universal "residence
   hall"; *housing plan* (on campus / commute / own housing) has no campus equivalent — campuses ask
   you to *apply for housing* or not, and several require first-years to live on
   ([OSU](https://housing.osu.edu/incoming-students/fees-contracts-policies/2026-27-undergraduate-terms-and-conditions/)).
   "Housing Services" was not seen; see §3 for the names that were.
5. **Office names.** "Office of the Registrar", "Financial Aid Office", "Student Health Services" —
   all attested. "Admissions Office" is fine; the formal name is "Office of Undergraduate
   Admissions". "Accessibility Services" is a real but minority variant (§3). "Academic Advising
   Office, Computer Science" — campuses say "academic advisor" and name the college/department.
6. **Adviser/advisor.** `lockedTasks` says "Meet your academic adviser" while the rest of the portal
   says "advisor"; Michigan spells it "adviser", Purdue/UT "advisor" — pick one.
7. **Dates and times.** The portal's "Nov 16", "Sep 2", "Aug 28, 2026" and "9:00 AM–5:00 PM" are
   inside US practice; the portal closing-time form "11:59 p.m. EDT" is missing where a deadline is
   a portal cutoff.
8. **Payments.** "4-month plan"/"Installment 1" — the campus noun is *payment plan* (or *installment
   plan*) with a named setup fee and a due-date list; no bill/statement, due date, late fee, hold,
   authorized payer or 1098-T exists yet.
9. **No word yet for:** entrance counseling (required before a first loan disburses), the FAFSA
   Submission Summary / SAI, health insurance waiver, FERPA release / proxy access / authorized
   payer (the "Family permissions" setup step is the seed), registration hold (bursar, advising,
   immunization), bill due date / statement / e-bill, placement tests, AP/IB/dual-enrollment score
   submission, student ID card + photo upload, campus username/NetID + campus email as the official
   channel, roommate and meal/dining plan, add/drop and census date, orientation online modules vs
   the advising appointment vs the welcome week, first-year live-on requirement, "Autumn" as a term
   name variant, summer melt/yield (staff side).

## 8. Sources

**Federal Student Aid / ED (studentaid.gov pages are a JS app; read in a headless browser)**
- https://studentaid.gov/h/apply-for-aid/fafsa — what the FAFSA is, who files, FSA ID, contributors.
- https://studentaid.gov/articles/fafsa-submission-summary/ — FAFSA Submission Summary, SAI,
  verification notice, FSS vs aid offer.
- https://studentaid.gov/articles/evaluating-financial-aid-offers/ — "aid offer (sometimes called
  award letters)", aid types, sub/unsub.
- https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized — loan definitions,
  entrance counseling, MPN, funds applied to the school account.
- https://studentaid.gov/understand-aid/types/grants/pell — Pell definition, 2026–27 maximum, COA
  sentence.
- https://studentaid.gov/understand-aid/types/work-study — FWS definition.
- https://studentaid.gov/understand-aid/eligibility/staying-eligible — SAP in student words.
- https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/application-and-verification-guide/ch4-verification-updates-and-corrections
  — verification groups, documents, interim disbursement, deadlines.
- https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol1/ch1-school-determined-requirements
  — SAP rules.
- https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol3/ch2-cost-attendance-budget
  — COA components.
- https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol4/ch2-disbursing-title-iv-funds
  — disbursement timing, credit balance 14 days.
- https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol6/ch2-federal-work-study-program
  — FWS rules.
- https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2026-2027/vol7/ch2-calculating-pell-grants
  — Pell calculation inputs.
- https://fsapartners.ed.gov/sites/default/files/2025-2026/2025-2026_Federal_Student_Aid_Handbook/_knowledge-center_fsa-handbook_2025-2026_vol8.pdf
  — entrance counseling before first disbursement; MPN.
- https://www.ed.gov/about/news/press-release/us-department-of-education-announces-earliest-fafsa-form-launch-program-history
  — 2026–27 FAFSA launch, Oct 1 statute.
- https://www.ed.gov/media/document/sample-aid-offer-2pdf-57113.pdf — ED sample award letter (voice,
  COA table, MPN, decline/reduce loans).
- https://studentprivacy.ed.gov/faq/what-ferpa ; https://studentprivacy.ed.gov/ferpa ;
  https://studentprivacy.ed.gov/faq/must-postsecondary-institutions-provide-parent-access-eligible-students-education-records
  — FERPA.
- https://www.ed.gov/higher-education/students-disabilities-preparing-postsecondary-education — OCR
  Section 504/Title II rights for postsecondary students.
- https://www.ada.gov/topics/intro-to-ada/ — Title II / Title III coverage.
- https://www.law.cornell.edu/cfr/text/34/600.2 — 34 CFR 600.2 credit hour (eCFR itself blocked the
  fetch).

**Associations**
- https://www.nacacnet.org/wp-content/uploads/NACAC-Guide-to-Ethical-Practice-in-College-Admission.pdf
  (Aug 2025) — May 1, deposits, candidates, first-year, deadlines and time zones, DOJ/CEPP history.
- https://www.nacacnet.org/nacac-and-other-associations-urge-extensions-on-may-1-commitment-deadlines/
  — "the traditional May 1 date".
- https://www.nacacnet.org/avoiding-summer-melt/ — summer melt.
- https://www.acha.org/wp-content/uploads/ACHA_Immunization_Recommendations_April_2025.pdf — vaccine
  list, state-law sentence, TB screening.
- AACRAO (aacrao.org) — not reachable (Cloudflare); no claim rests on it.

**Large public universities**
- Michigan: https://admissions.umich.edu/congratulations/first-year ;
  https://housing.umich.edu/first-year-application-instructions/
- UT Austin: https://admissions.utexas.edu/enroll/ ;
  https://admissions.utexas.edu/info-for/admitted-students/admitted-freshman/ ;
  https://orientation.utexas.edu/ ; https://www.healthyhorns.utexas.edu/uhs/us-citizens.html ;
  https://housing.utexas.edu/ ; https://registrar.utexas.edu/schedules/269/payment ;
  https://onestop.utexas.edu/managing-costs/paying-your-tuition/tuition-bills/ ;
  https://registrar.utexas.edu/calendars/26-27 ; https://disability.utexas.edu/
- Ohio State: https://undergrad.osu.edu/apply/freshmen-columbus/after-you-are-admitted ;
  https://shs.osu.edu/vaccinations1/university-vaccination-requirement ; https://slds.osu.edu/ ;
  https://housing.osu.edu/ ;
  https://housing.osu.edu/incoming-students/how-to-apply-1st-year-students-2026-h-s-grads ;
  https://housing.osu.edu/incoming-students/fees-contracts-policies/2026-27-undergraduate-terms-and-conditions/
  ; https://shi.osu.edu/shi-benefits-plan ; https://busfin.osu.edu/bursar ;
  https://registrar.osu.edu/policies-information/university-policy/administrative-hold-information-and-clearance-procedures/
  ; https://registrar.osu.edu/student-hub/degree-audit-students/ ; https://swc.osu.edu/about-us/ ;
  https://orientation.osu.edu/
- Purdue: https://www.admissions.purdue.edu/admitted/ ;
  https://admissions.purdue.edu/admitted-students/accept-your-offer/ ;
  https://admissions.purdue.edu/admitted-students/next-steps/ ; https://www.purdue.edu/orientation/
  ; https://www.purdue.edu/orientation/bgr/index.html ;
  https://www.purdue.edu/registrar/records/registration/holds ; https://www.purdue.edu/bursar/ ;
  https://www.purdue.edu/treasurer/finance/bursar-office/payment/installment-plan/ ;
  https://www.housing.purdue.edu/my-housing/apply/new-resident-faqs.html ;
  https://www.purdue.edu/drc/

**Private residential universities**
- Boston University: https://www.bu.edu/admissions/admitted/checklists/ ;
  https://www.bu.edu/admissions/admitted/checklists/regular-decision/ ;
  https://www.bu.edu/admissions/admitted/checklists/early-decision/ ;
  https://www.bu.edu/studentfinancials/ ;
  https://www.bu.edu/studentfinancials/resources/student-health-insurance-plan/
- Northeastern:
  https://studentfinance.northeastern.edu/applying-for-aid/undergraduate/admitted-students/
- Vanderbilt: https://www.vanderbilt.edu/welcome/student-housing/ ;
  https://www.vanderbilt.edu/welcome/important-dates/

**Liberal-arts colleges**
- Carleton:
  https://carleton-wp-production.s3.amazonaws.com/uploads/sites/670/2025/05/ADMS_New-Student-Checklist_FY25.pdf
- Macalester: https://www.macalester.edu/admissions/admitted-students/your-path-to-mac/

**Community colleges**
- Austin Community College: https://admissions.austincc.edu/ ;
  https://admissions.austincc.edu/meningitis-requirement/
- Columbus State: https://www.cscc.edu/admissions/new-students/

**Single pages from other campuses (one fact each)**
- https://wayne.edu/admissions/first-year/enrollment-deposit — deposit nonrefundable after May 1;
  deposit gates orientation.
- https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/after-you-apply/transcript-submissions.html
  — final official transcript, July 1.
- https://registrar.unc.edu/ferpa-parent-guide/ — Guest ID / proxy access;
  https://studentaffairs.unc.edu/department/office-of-the-dean-of-students/ — Dean of Students.
- https://www.csusb.edu/registrar/registration/adding-or-dropping-after-census — census date and
  add/drop.
- https://www.lincoln.edu/departments/bursar/financial-clearance — financial clearance.
- https://provost.charlotte.edu/policies-procedures/academic-policies-and-procedures/definition-undergraduate-majors-minors/
  — major/minor/concentration.
- https://asuonline.asu.edu/newsroom/asu-online-news/freshman-vs-first-year/ ;
  https://nstp.uw.edu/about-nstp/intro-nstp — first-year replaces freshman.
- https://news.fsu.edu/news/students-campus-life/2026/08/19/florida-state-university-welcomes-class-of-2030-as-new-academic-year-begins/
  — Class of 2030, Aug. 24.

**Product**
- https://audentra-website.vercel.app/ ;
  https://audentra-website.vercel.app/solutions/enrollment-readiness ;
  https://audentra-website.vercel.app/platform/student-experience — the seven stages and their
  offices as sold.

