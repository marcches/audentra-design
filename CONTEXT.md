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
One attempt to satisfy a document requirement with one file. It is the unit that carries a state and
a timestamp, and it is never deleted or overwritten — a replacement is a new submission beside the
old one.
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
Admissions, Student Financial Services, Health Services, the Registrar. The student is told which
one holds their file, always by name.
_Avoid_: Department, team, staff.

**Advisor**:
The named person who holds this student's file and is reachable from every section's summary panel.
An advisor is not a reviewer: they can chase a decision, not make one.
_Avoid_: Counselor, agent, contact.
