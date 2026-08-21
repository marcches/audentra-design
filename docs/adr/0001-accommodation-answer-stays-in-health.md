# The accommodation answer stays inside Health

> **Status: accepted, location superseded.** On 2026-08-21 the question moved to a section of its
> own, Accessibility — [ADR-0003](./0003-accessibility-is-its-own-section.md). Everything below
> about *what the answer may touch* stands unchanged; only *where the card sits* changed, and the
> module that holds the answer is now `src/features/accessibility/`.

A student's answer to "would you like to talk to Accessibility Services?" is the one thing in this
portal she may have deliberately chosen not to tell anyone. Every instinct in this codebase pulls
the other way — a *yes* looks like a help request, the section looks like it wants a badge, and
Edward reads every other object a page renders — so we decided the opposite once, here, rather than
re-deciding it per surface: the answer exists only in Health's own module, and answering **creates
nothing** anywhere else. No help request, no appointment, no notification, no sidebar count, and no
entry in the record Edward speaks from. Built for [ENR-206](https://audentra.atlassian.net/browse/ENR-206),
from [ENR-208](https://audentra.atlassian.net/browse/ENR-208) AC 6.

## Considered options

- **Create a help request on a yes.** Rejected. Help's request list is another screen, with another
  permanence and another audience, and the subject would become readable there. ENR-208 AC 6 wants
  concealment guaranteed below the interface; the least a prototype can do is not spread the answer
  across two more screens.
- **Badge the Health row when the question is unanswered.** Rejected. Any counter that could include
  the question makes *not right now* look like an outstanding item, which is the single thing the
  section exists to avoid — and the immunization record is already counted by My Documents.
- **Let Edward read the whole section.** Rejected in half: Edward may say where the record stands,
  because a document requirement is public between the student and the office that asked for it. It
  may never say anything about the answer. A shared screen, a screenshot or a read-aloud would undo
  the promise the card makes without the answer ever being displayed.

## Consequences

This repo has no backend, so the concealment is a property of the **shape** and not of an
authorization rule: there is no field for the answer outside `src/health-data.js` and
`src/lib/health.js`, and nothing else imports them. If a real API arrives, this ADR is the statement
of intent that the endpoint has to enforce — it is not evidence that anything is enforced today.
Anyone adding a Health-aware surface later (Messages, a staff view, a digest) inherits the same rule:
the record may travel, the answer may not.
