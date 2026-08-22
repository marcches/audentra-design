# 0005. A student can ask a team for a time

Date: 2026-08-21
Status: superseded by [0010](0010-a-callback-request-not-a-time-request.md) on 2026-08-22 — the
stakeholder review call of 2026-08-21 rejected time requests, and ENR-178 (Prioritized) had already
ruled them out; the second path is a callback request, offered through Edward, not a control on the
Appointments row.

## Context

ENR-178 built Appointments on one rule: the student picks from the times a team has published and
never proposes a time of her own (AC 1; Scenario 2, *"only published availability is selectable"*).
The screen said so three times — in the banner, in the rail's dark card, in the empty state — and
its data model had no shape that could hold a time the student invented.

The changes document of 2026-08-21 (`.scratch/ENR-183-appointments/appointments-changes-2026-08-21.md`,
rule 1, A2, A7, §9.6) states the opposite as a product rule: *the student picks from published times
and, when none of them work, can ask the team for another time*, and the system can notify her when
a team publishes new ones. Marco confirmed the rule change in grilling the same day.

## Decision

A **time request** is the second path on Appointments, and it is a different thing from a booking:

- A booking is one of the published times, taken. It resolves on the click — confirmed or failed —
  and it reaches two calendars.
- A time request is a sentence about when the student could meet, sent to the team that owns the
  topic. It resolves **on the team**, never on the click: nothing is booked until they answer, and
  the request is visible on the screen as *Requested* until then (A7), in the student's list and in
  the rail's waiting card.

The request never becomes a time on a calendar in this product: what the student sends is free text
("any weekday afternoon after Sep 1"), and the team answers by publishing or booking a time the way
they always did. So ENR-178's invariant survives in its strict form — *the student never writes a
slot into a team's calendar* — and what changes is that silence is no longer the only alternative
to the published times.

The picker keeps asking first. Asking is the fallback on every row that has times (a secondary
link), and the primary action only on a row that has none. The screen must not read as a request
form with a calendar attached.

## Consequences

- Three pieces of copy that denied the capability are rewritten (A2, §8).
- The appointments data gains `state: 'requested'` with `window`, `subject`, `requestedOn` and no
  `date`; `stateOf` gains the fifth badge; `splitAppointments` keeps a request in *Your
  conversations* after everything that has a date.
- `CONTEXT.md` gains **Time request** (qualified — *request* alone is Help's word).
- ENR-178 AC 1 and Scenario 2 read as they did for the picker, and are narrower than the screen:
  the card should be amended to name the second path, or a new story should. That is a Jira change
  this repo does not make on its own.
