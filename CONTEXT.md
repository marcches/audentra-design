# Audentra — student enrollment

The language the portal and the staff workspace share. Written down because the same English word
kept meaning two different things on two different screens: a *requirement* in My Degree (the
section the code calls `classrooms`) is a degree rule, a *requirement* in My Documents is a file Aster is waiting for, and a *document* is
either something the student sent or something Aster issued. This file settles which is which.

Started 2026-08-20 while specifying [ENR-165](https://audentra.atlassian.net/browse/ENR-165). It is
a glossary and nothing else — no layout, no data shapes, no decisions. Those live in the spec under
`.scratch/`, and the ones that are hard to reverse live in `docs/adr/`.

Aster is a US university, and Audentra is built for US colleges and universities (ADR 0006). So a
word here is the word a US campus uses with its students — *hold*, *office*, *deposit*, *Class of
2030* — and where the two disagree the US word wins unless an ADR says why not. The standard
itself — the journey, the offices, the regulatory frame, sourced — is `docs/domain/us-enrollment.md`;
what Aster has decided for itself is `docs/domain/aster.md`. This file stays a glossary: it says what
a word means here, never what Aster’s dates are.

## Language

### Evidence the student sends

**Document requirement**:
A named piece of evidence Aster is waiting for from one student, owned by one office, holding up one
or more steps. Always qualified — bare "requirement" means the degree kind below.
_Avoid_: Task (that is the checklist's word for the same thing seen from My Enrollment), request,
ask.

**Submission**:
One attempt to satisfy a document requirement, carrying one or more files. It is the unit that
carries a state and a timestamp, and it is never deleted or overwritten — a replacement is a new
submission beside the old one. The files inside one submission are one attempt, not several: an
immunization record is physically several photographed pages, sent together. A decision may still
fall page by page — one page accepted, another sent back — and the submission stands as *changes
requested* until every page it carries is accepted; the replacement is a new submission carrying
only the pages that came back, beside the old one, which keeps what was accepted. Widened
2026-08-21 (Health changes, H9): until then the pages were said to be accepted or sent back
together, and the reviewer's own reason on the fixture already contradicted it.
_Avoid_: Upload (that is the act, not the record), attempt, file.

**Decision**:
A reviewer's outcome on one submission: *accepted*, or *changes requested* with a reason. When the
submission carries several pages, the decision may name which page it is about — one accepted,
another sent back — and the reason says which. Made by a person at Aster. The portal renders
decisions and never produces one. To the student a *changes requested* decision *came back* or was
*sent back*; those are the screen's words for it, not a third outcome.
_Avoid_: Review (that is the period before a decision), approval, verdict, result.

**Reason**:
The specific, actionable sentence attached to a *changes requested* decision — what is wrong with
this file and what would satisfy the requirement instead. A decision without one is not shippable;
this is the epic's guardrail, not a copy preference.
_Avoid_: Rejection message, note, comment.

**Issued document**:
A file Aster produced for the student — an offer letter, an aid letter, a receipt. Read-only, has no
state and never asks anything. It shares the My Documents screen with submissions and shares nothing
else with them.
_Avoid_: Letter, attachment, download, "document from Aster".

### An answer, which is not evidence

**Accommodation answer**:
The student's answer to one question — whether they would like to talk to Accessibility Services.
It has two values, *yes* and *not right now*, and a third condition that is not a value: *never
answered*. **Not right now is a complete answer.** It is recorded, it blocks nothing, and it is
never shown as outstanding, skipped or pending — only *never answered* is an open question. The
answer carries no diagnosis, no condition name and no documentation, because none is ever collected.
It is the current answer and nothing else: changing it replaces it, and the earlier one stops being
presented.
_Avoid_: Accommodation request (nothing is being requested), disclosure, declaration, health
information, opt-in.

### The two waits, which are not the same wait

**Checking**:
The machine's part: the file arrived intact, opens, and is the format it claimed. Bounded, fast, and
nobody is deciding anything yet. It is the only part of the pipeline the portal is allowed to
advance on its own.
_Avoid_: Processing, scanning, validating.

**In review**:
The institution's part: a person at the owning office has the submission and has not decided yet.
Unbounded, and the student is never asked to act during it.
_Avoid_: Pending, submitted, waiting, under consideration.

The line between them is the rule the prototype follows literally: **Checking advances on a clock;
In review never does.** Faking a decision on a timer would put words in a reviewer's mouth.

### Elsewhere in the product, so the words stop colliding

**Degree requirement**:
A rule of an academic program — a course, a credit count, a category — that My Degree tracks.
Nothing to do with documents. When both are in the same sentence, qualify both. A requirement is
satisfied *by* courses; a course counts *toward* requirements — the two directions are both said
on the screen, and neither is the other. The free-elective figure is not a requirement: it is the
remainder of the degree after the requirements, and it has no standing.
_Avoid_: Requirement, unqualified. Free Electives as a requirement.

**Requirement standing**:
Where one degree requirement is, decided by approved credit alone: *not started*, *in progress*,
*satisfied*. A potential match and a plan are not inputs to it. It is a fact about the student's
degree, which is why it wears a pill; a course's availability and a match's confidence are not, and
do not. Added 2026-08-21, with the My Degree brief.
_Avoid_: Status (overloaded: the course had one, the match had one), state, progress.

**Counts toward**:
Which requirements one course is allocated to. The university decides it, the student never does,
and the line on the row only reports it. A course counts toward one requirement and is then *not
elective credit*; when it counts toward two at once, that is **double counting**, decided **per pair
of requirements** and carried by a rule ID (*Rule QR-03*), the same way a credit match carries its
rule.
_Avoid_: Applies to, satisfies (that is the other direction — a requirement is satisfied by
courses), maps to.

**Potential match**:
Evidence in a document the student sent that looks like it might cover a course — a transcript line,
an examination result, a placement. It names its source, its target course, its rule, its confidence
and its effect *if approved*, and it has changed nothing: no standing, no total, no progress figure.
It is **waiting on the Registrar**; the student is not a party to the decision, so no control
anywhere approves, dismisses or applies one.
_Avoid_: Credit match (the section's old name — it read as credit), transfer credit, waiver,
suggestion, recommendation.

**Plan**:
The student's own list of courses she intends to take — added from a requirement, removed at will.
It is hers alone: it registers her for nothing, it changes no credit total, no standing and no
progress figure, and a planned course is marked *planned* where it sits and nothing else moves. The
same quarantine a potential match gets, applied to the student's own not-yet.
_Avoid_: Schedule, cart, enrolment, registration, wishlist, saved courses.

**Help request**:
A question the student raised with an office through Help. It travels the other way from a document
requirement: the student is waiting on Aster because they asked, not because Aster asked.
_Avoid_: Request, unqualified; ticket; case.

**Time request**:
What a student sends from Appointments when none of a team's published times work: a sentence about
when she could meet, and what it is about, addressed to the team that owns the topic. It is not a
booking and never becomes a time on a calendar by itself — it waits on the team, and nothing is
booked until they answer; while it waits it is shown as *Requested* among her conversations, and she
can cancel it. It is the second path, and the screen says so: picking a published time books on the
spot, a time request does not. Added 2026-08-21 (ADR 0005).
_Avoid_: Request, unqualified (that is Help's word); booking request; proposed time; slot request.

**Office**:
The team at Aster that owns a document requirement and makes the decision on its submissions —
the Admissions Office, the Financial Aid Office, Residential Life, Student Health Services, the
Office of the Registrar. The student is told which one holds their file, always by name, and each
office has exactly one name: *Office of the Registrar* on first mention in a page and *the
Registrar* after; *Student Health Services* first and *Health Services* after; *Financial Aid
Office* always, with *the* before it in running text (*the Financial Aid Office needs…*). An office
that publishes times for conversations — the Admissions Office, the Financial Aid Office, the
Academic Advising — carries the same name on Appointments, with the department after a comma
where one handles this student (*Academic Advising, Computer Science*). Two were renamed
2026-08-21 (appointments changes, 8.11): *Student Financial Services* merged aid with billing, and
the office the checklist names is the one that verifies income to release a federal loan, which is
financial aid; *Student Health Services* is what a US student reads on every campus, and *Student
Health Office* is not idiomatic.

An office may also be a team that owns no requirement and decides nothing, and instead **receives
what a section routes to it**: Accessibility Services receives an *accommodation answer* and
contacts the student. It is still an office, because the student is owed the same thing either way —
a name for whoever is on the other side.
_Avoid_: Department, team, staff. Aster Registrar, the Registrar's Office (the name is the Office
of the Registrar). Student Financial Services, Financial Services, financial aid office (the name is
the Financial Aid Office). Aster University Health Services, Student Health Office (the name is
Student Health Services). Housing Services, Housing Office, University Housing (the name is
Residential Life). Bursar's Office, Student Accounts, Student Financials (the name is the Office of
the Bursar). Academic Advising Office.

**Hold**:
A block an office places on the student’s record that stops one thing — registering for classes,
most often — until that office lifts it. It carries the office’s name and its reason, and it lifts
when the thing it names is done: an immunization hold when Student Health Services accepts the
record, an advising hold after the advising meeting, a bursar hold when the balance is settled. The
portal shows a hold, says who placed it and what lifts it, and never lifts one itself — that is the
office’s act, the same way a decision is a reviewer’s. A hold is not a locked step: a locked step
cannot be started yet; a held registration is refused later unless an open step is done now
(ENR-214). Added 2026-08-22 (US-standard brief, Q6): it is the word a US Registrar uses, and the
thing the registration gate is made of.
_Avoid_: Block; blocker (the staff board’s word for what stops a task); gate (the screen’s view of
the holds, not a thing on the record); flag; restriction; lock, locked (a Step’s standing).
Three more changed 2026-08-22 (US-standard brief, Q8; `docs/domain/us-enrollment.md` §3): *Housing
Services* became **Residential Life** — the name a US residential campus gives the office, and
"Housing Services" was read on none; the bill gained an owner, the **Office of the Bursar** on first
mention and *the Bursar* after, because aid and billing are two offices once Student Financial
Services was un-merged; and *Academic Advising Office* dropped *Office*, since a campus names its
advising by the department.

**Step**:
One item on the My Enrollment checklist: something the student does, named as a verb phrase —
*Send your immunization record*, *Verify your household income*, *Choose your housing plan* — and
called by that one name wherever it appears: the card, the drawer, the alert, the notification. The
document a step produces is a noun phrase (*Immunization record*), and the two never swap roles. A
step's state is a suffix, never a rewrite of the name: *Verify your household income · sent back*.

A step is always in exactly one of four **standings**, and My Enrollment is one group per standing,
in this order: *open* — the student can act on it now, the group the page exists for; *with Aster* —
the student has done their part and a person at Aster is reading it, nothing is asked of them, and
it comes back as *completed* or as *open* again with a reason; *locked* — it waits on another step,
and says which, and opens on its own when that one is done; *completed* — finished, with the date
and the points it earned at the time. Open is the only standing the student changes directly; with
Aster never advances on a clock (see *In review*); locked advances only when its prerequisite
completes. Added 2026-08-21, when the groups were made one shape.
_Avoid_: Task (the code's word for the same object), to-do, item, requirement. For the standings:
pending, in progress, blocked, done.

**Setup step**:
One of the eight screens a newly admitted student walks through once, before the portal exists for
her — *Confirm your details*, *How Aster reaches you*, *Emergency contact*, *Family permissions*,
*Where you will live*, *Health and accessibility*, *Your student photo*, *Choose your orientation
session* — in the order the institution published them. It is not a checklist *Step*: a setup step
is walked, a checklist Step is tracked, and a setup step may produce what a checklist Step later
watches (the housing plan, the accommodation answer, an authorization). It is always in exactly one
of four states — *saved*, *skipped*, *current*, *upcoming* — and two conditions that are not states:
*locked* (an upcoming step that says which step has to be saved first) and *unknown* (the record
could not be read, so nothing is claimed). **Skipped is not failure**: it is resolved, it is never
counted as saved, and the student can come back to it from the flow and from the portal. Only the
server ever makes a step saved or skipped. Added 2026-08-21, when the flow's surface was aligned to
the approved prototype and "Step 3 of 8" and "Your next steps" turned out to share a word.
_Avoid_: Step, unqualified, where a checklist Step could be meant; screen; page; task; section.

**Wellness**:
The product's one word for the category of health services a student may use — the Events filter,
the Profile sharing category, the checklist section *Health and wellness*.
_Avoid_: Wellbeing, well-being.

**Advisor**:
The named person who holds this student's file and is reachable from every section's summary panel.
An advisor is not a reviewer: they can chase a decision, not make one.
_Avoid_: Counselor, agent, contact. Adviser — the spelling is *advisor*, always (Purdue and UT spell it so; Michigan's *adviser* is not ours).

### Words the campus uses, adopted 2026-08-22

Taken from `docs/domain/us-enrollment.md` (US-standard brief, round 2). Each is the word a US campus
says to an admitted student; where the portal had another, the old one is under _Avoid_.

**First-year**:
A student in her first year at Aster. The campus word and the only one — *freshman* has been retired
on the campuses the standard was read from. *Incoming* and *new student* are the neutral words for
the months before classes.
_Avoid_: Freshman, fresher, newcomer.

**Enrollment deposit**:
The payment that turns an admitted candidate into a student who is coming: one amount, one date and a
stated refundability — $500, by May 1, non-refundable at Aster — owned by Admissions, not Financial
Aid, because it confirms the offer rather than pays for anything. Paying it is what opens the campus
account, the housing application and orientation. On the prototype’s today it is completed (ADR 0007).
_Avoid_: Deposit, unqualified (Aster takes no housing deposit, but a reader will ask); acceptance fee,
tuition deposit, matriculation deposit (other campuses’ names for it); "lock in your place".

**Orientation**:
The required program, run by New Student Programs under Student Life, at which a first-year meets her
academic advisor and registers for her first semester, having taken her placement tests beforehand.
She books one *session* from those published; a student who misses every session has her
registration held until a make-up. It is not the portal’s setup flow (those are *setup steps*) and
not move-in week.
_Avoid_: Onboarding (the portal’s word for its own flow), induction, welcome week (the days after
move-in, where nothing is registered), orientation day.

**Verification**:
Financial Aid confirming what the FAFSA said, because the Department of Education or Aster selected
the file: named documents by a date, and until it is complete a federal loan is originated but not
paid. It never implies wrongdoing, and the step that carries it says what is asked, by when, and what
is held.
_Avoid_: Income check, audit, proof of income, income verification (the campus says *verification*
alone; "household income" is the step’s gloss, not the name).

**Master Promissory Note**:
The contract a first-time borrower signs once for her federal loans. With *entrance counseling* — the
short course the same borrower completes once — it is one of the two things a first loan needs before
it disburses; each is its own step because each is its own federal requirement.
_Avoid_: Loan agreement (the step’s gloss, not the name), loan contract, promissory note unqualified,
MPN on first mention.

**Bill**:
The Bursar’s statement of what the term costs after aid is applied — issued about four weeks before
classes, due about two, and the last gate before the first day: an unpaid bill is a *bursar hold*. A
parent sees it only as an *authorized payer* the student named.
_Avoid_: Invoice, statement, e-bill (other campuses’ names); tuition (a line on the bill, not the
bill); balance (the figure, not the document).

**Payment plan**:
Paying the bill in four monthly installments for a setup fee, instead of at once by the due date.
The campus noun; the installments are numbered and dated.
_Avoid_: 4-month plan, installment plan (a variant Aster does not use), financing, tuition plan.

**FERPA release**:
The student’s written consent naming a person and the categories of her record that person may see —
the bill, grades, housing, the checklist — and nothing she did not name. Under FERPA the record is
hers from the day she enrolls, so a parent sees nothing without it; an *authorized payer* is the
release’s shape for the bill. The setup step that collects it is this, and says so.
_Avoid_: Family permissions (the setup step’s old name), proxy access, guest access, authorized user
(other campuses’ mechanisms), consent form; authorization unqualified (the backlog’s *authorization
category* is a category of this release).

### On the other side of the desk

The staff workspace's words, added 2026-08-21 with the staff visual-direction board
(`.scratch/brief-2026-08-21-staff-visual-direction/`). Two screens were drawn before any staff card was
built, and both needed a word the student side had already spent.

**Task (staff)**:
The staff workspace's unit of work: one thing one person at Aster does about one student — *Follow
up: Unaccepted Financial Aid Package* — with a type, a group, a priority, an owner, a team and an
SLA, and closed with an *outcome* that is recorded apart from its status. It is not the student's
*Step* seen from the other side: a step is the student's to do and a task is Aster's, and one may
produce the other — a package not accepted by its date raises a follow-up task, and a task's outcome
may send a step back to *open* with a reason. A follow-up is a new task carrying an attempt number,
never the old one reopened (ENR-39). The code's use of *task* for a checklist step is the collision
this entry exists to end: on the student side the word is Step, and only Step. ENR-82 is its screen.
_Avoid_: Step; case; ticket; work item; to-do; activity.

**Division**:
The unit a director answers for, and the row of the executive's operational view: throughput,
capacity and service performance, period over period, so that a question reaches a specific person
(ENR-30, ENR-72). What the student sees of the same team is its *Office* — the Admissions Office and
the Financial Aid Office are each one division to the executive and one office to the student, and
neither name replaces the other. In this prototype there is one division per office, each with a
named director; a division with too little data says so rather than showing a change of zero, and a
figure out of its season is not shown at all.
_Avoid_: Department; unit; team; area; office, where the executive's row is meant.

### Where the student will live

Housing asks two questions of very different weight, and the whole section depends on not blurring
them. The first is the student's to answer and it is final. The second is the student's to write and
it is not a decision at all. Added 2026-08-20 while specifying
[ENR-207](https://audentra.atlassian.net/browse/ENR-207).

**Housing plan**:
The student's answer to where they will live: *living on campus*, *commuting*, *arranging my own
housing*, or *I need help deciding*. The first three are complete answers and none of them is a skip;
the fourth is the absence of an answer, said out loud, and it leaves the plan open. Only *living on
campus* opens the shortlist. It is the student's to set and to change, up to the response deadline.
_Avoid_: Housing choice, housing preference (that is the other thing, below), housing status.

**Residence hall**:
A building Residential Life publishes in the catalogue, carrying its room types, its own annual rate
and its own meal plan. How many exist is the institution's business — eight here, three or forty
elsewhere — and nothing in the interface may assume a number.
_Avoid_: Residence, unqualified (the US noun is the two words — a campus says *residence hall* and
never *dorm* in its own voice; renamed 2026-08-22, US-standard brief, Q11); hall; dorm; property;
building (that is a field *of* a residence hall).

**Preference**:
One residence hall at one position in the shortlist. It states what the student would like; it establishes
no claim on a room, and an assignment that does not match it is still a valid assignment. This is the
word the interface uses, and it is why a preference is never called a *request*: `Help request` below
already owns that word, and it points the other way — there the student is asking Aster, here Aster
is deciding. The word is still correct in Housing for the thing it names — changing an assignment
after the deadline is done *by raising a help request* — which is exactly why it cannot also mean the
shortlist.
_Avoid_: Request; choice; pick; selection.

**Shortlist**:
The ordered set of up to three preferences. A shortlist of one or two is a *partial* shortlist: it is
saved, it is shown, and it is never presented as complete. It saves on its own — there is no state in
which an order exists on screen but not in the record.
_Avoid_: Ranking (that is the act, not the record), top three, wishlist.

**Response deadline**:
The date the student's answers stop being editable and Housing Services begins assigning. Before it
and after it are effectively two screens, and the second one is not a broken version of the first —
it is the next stage, and it says so. Dec 15 in this prototype, the same date the checklist already
carries.
_Avoid_: Cutoff, closing date, expiry.

**Room assignment**:
The room Housing Services gives the student, recorded with who assigned it and when. It is a sibling
of `Decision` above and not a case of it: they share the rule that an outcome states who made it and
when, and nothing else. A decision lands on one submission, comes in two outcomes and can ask the
student for something back; an assignment lands on a student, comes in one outcome, and asks for
nothing. Once it exists, the shortlist is no longer offered.
_Avoid_: Allocation, placement, housing decision.
