# Audentra — student enrollment

The language the portal and the staff workspace share. Written down because the same English word
kept meaning two different things on two different screens: a *requirement* in My Degree (the
section the code calls `classrooms`) is a degree rule, a *requirement* in My Documents is a file Aster is waiting for, and a *document* is
either something the student sent or something Aster issued. This file settles which is which.

Started 2026-08-20 while specifying [ENR-165](https://audentra.atlassian.net/browse/ENR-165). It is
a glossary and nothing else — no layout, no data shapes, no decisions. Those live in the spec under
`.scratch/`, and the ones that are hard to reverse live in `docs/adr/`.

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
immunization record is physically several photographed pages, and they are accepted or sent back
together.
_Avoid_: Upload (that is the act, not the record), attempt, file.

**Decision**:
A reviewer's outcome on one submission: *accepted*, or *changes requested* with a reason. Made by a
person at Aster. The portal renders decisions and never produces one.
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
the Admissions Office, the Financial Aid Office, Housing Services, Student Health Services, the
Office of the Registrar. The student is told which one holds their file, always by name, and each
office has exactly one name: *Office of the Registrar* on first mention in a page and *the
Registrar* after; *Student Health Services* first and *Health Services* after; *Financial Aid
Office* always, with *the* before it in running text (*the Financial Aid Office needs…*). An office
that publishes times for conversations — the Admissions Office, the Financial Aid Office, the
Academic Advising Office — carries the same name on Appointments, with the department after a comma
where one handles this student (*Academic Advising Office, Computer Science*). Two were renamed
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
Student Health Services).

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

**Wellness**:
The product's one word for the category of health services a student may use — the Events filter,
the Profile sharing category, the checklist section *Health and wellness*.
_Avoid_: Wellbeing, well-being.

**Advisor**:
The named person who holds this student's file and is reachable from every section's summary panel.
An advisor is not a reviewer: they can chase a decision, not make one.
_Avoid_: Counselor, agent, contact.

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

**Residence**:
A building Housing Services publishes in the catalogue, carrying its room types, its own annual rate
and its own meal plan. How many exist is the institution's business — eight here, three or forty
elsewhere — and nothing in the interface may assume a number.
_Avoid_: Hall, dorm, property, building (that is a field *of* a residence).

**Preference**:
One residence at one position in the shortlist. It states what the student would like; it establishes
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
