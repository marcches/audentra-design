# Audentra — student enrollment

The language the portal and the staff workspace share. Written down because the same English word
kept meaning two different things on two different screens: a *requirement* in My Classrooms is a
degree rule, a *requirement* in My Documents is a file Aster is waiting for, and a *document* is
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
A rule of an academic program — a course, a credit count, a category — that My Classrooms tracks.
Nothing to do with documents. When both are in the same sentence, qualify both.
_Avoid_: Requirement, unqualified.

**Help request**:
A question the student raised with an office through Help. It travels the other way from a document
requirement: the student is waiting on Aster because they asked, not because Aster asked.
_Avoid_: Request, unqualified; ticket; case.

**Office**:
The team at Aster that owns a document requirement and makes the decision on its submissions —
Admissions, Student Financial Services, Housing Services, Aster University Health
Services, the Registrar. The student is told which one holds their file, always by name.

An office may also be a team that owns no requirement and decides nothing, and instead **receives
what a section routes to it**: Accessibility Services receives an *accommodation answer* and
contacts the student. It is still an office, because the student is owed the same thing either way —
a name for whoever is on the other side.
_Avoid_: Department, team, staff.

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
