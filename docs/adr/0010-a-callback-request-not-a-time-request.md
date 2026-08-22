# 0010. A callback request, not a time request

Date: 2026-08-22
Status: accepted — supersedes [0005](0005-a-student-can-ask-a-team-for-a-time.md)

## Context

ADR 0005 (2026-08-21) made a **time request** the second path on Appointments: when none of a team's
published times work, the student sends a sentence about when she could meet, and the team answers.
It was built the same day (`ebd42f0`): a second tab in the booking drawer, "Ask for a time" on every
row without times, "Ask for another time" on every row with them, and a *Requested* state in the
student's list.

The stakeholder review call of 2026-08-21 (recorded in
`.scratch/review-2026-08-21/sources/decisions-and-conformance.md`, Part A §3) rejected the feature
directly — *"why do we ask for a time? Why can't they just get into our calendar?"* — and the
conformance check in Part B §8.2 found that the backlog had already ruled it out before it was built:

> ENR-178, Prioritized, AC 1: *"The student selects from availability the institution has published
> and never proposes an arbitrary time."* AC 7: *"A conversation type with no availability says so
> rather than showing an empty picker."*

ADR 0005 read those criteria as narrower than the screen and recommended amending the story. The
call settled it the other way: the story stands, and the prototype had drifted from it.

## Decision

**There is no time request in the product.** Where an office has posted times, the student books one
directly, and there is no fallback to offer. Where an office has posted none, the absence is stated
plainly as a fact about the institution, and the student is offered a **callback request** — through
Edward's escalation prompt, never as a control on the Appointments row itself (Part A §12: no route
to a person appears before Edward; booking from posted times is the one exception, because it is a
resolution, not a route).

A callback request is what ADR 0005's time request was structurally — a sentence about when she is
usually free, and what it is about, addressed to the office that owns the topic — with three
differences that matter:

1. **It asks for a call, not for a slot.** The student is not proposing a time the office must
   accept or refuse; she is saying when she can be reached. Nothing she writes can read as a booking.
2. **Its reply time is the office's, published by the office** — the same line Housing Services and
   Health Services already publish ("Usually replies in 2 business days") — never a constant the
   portal invented (Part A §7.2, §8.3).
3. **The reply arrives in the portal.** Email notifies her that a reply is waiting and does not carry
   the conversation (ENR-177 AC 4, AC 6). The item exposes no assignee or team detail (AC 3).

Appointments keeps its job — book from posted times, follow what is booked — and loses the asking.

## Consequences

- The booking drawer keeps one tab, the published times. "Ask for a time" and "Ask for another time"
  leave every row; "How booking works" becomes "How this works".
- The `requested` appointment state becomes the callback state: badge *Callback requested*, support
  line "Waiting on {office}. You'll see their reply here.", no `date`, kept in *Your conversations*
  after everything that has one. The shape ADR 0005 added (`window`, `subject`, `requestedOn`) is
  what a callback needs, so the data model changes name, not form.
- The no-times row's primary control opens Edward with the question written and unsent (Part A
  §12.2, §12.4); Edward's prompt offers the callback (and an inquiry); the callback drawer (Part A
  §6.2 as corrected by §8.3) opens from there.
- The three sentences that read as portal vocabulary rather than campus vocabulary are rewritten
  (Part A §6.1): "posted times", not "opened a calendar"; the office without "Office" in running text.
- `CONTEXT.md`: **Time request** is replaced by **Callback request**.
- ENR-178 needs no amendment. The story the earlier ADR wanted changed is the one this ADR returns to.
- ADR 0005's recommendation that ENR-178 be amended is withdrawn.
