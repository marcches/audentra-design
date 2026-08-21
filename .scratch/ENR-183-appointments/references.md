# References — ENR-183 Student · Appointments

Four Mobbin searches, `platform: web`, `mode: deep`. The card is a change to an existing screen:
a free date and time field becomes a picker over published availability. So the research is aimed
at the two hard parts rather than at "a booking page" — how a picker states that a day has nothing
in it, and how a booking that failed is kept from looking like one that worked.

## Layout — the picker

- [Square — booking page](https://mobbin.com/screens/5c191789-20a8-4f82-8ee5-2f0be71714b4) — **the
  reference we take the most from.** Slots are grouped `Morning` / `Afternoon` / `Evening`, and a
  part of the day with nothing in it prints **`No availability`** in place of its chips rather than
  disappearing. That is ENR-178 AC 7 as layout: absence is stated, never an empty box.
- [Clockwise — choose a time](https://mobbin.com/screens/e47e0634-3932-4b77-84ce-8e0ad27b79f7) —
  day columns of time chips, `Show more times` per day. We take the chip and the "one tap is the
  whole choice" reading; we drop the multi-day column grid, which cannot hold 380px.
- [Headspace — schedule appointment](https://mobbin.com/screens/3d59765f-ae34-4aa7-b295-51fd9c6239d6)
  — a horizontal day strip (`Wed Aug 13`, `Thu Aug 14`, …) above a single column of times, each
  time saying how many clinicians are free. This is the mobile-first shape we build: day strip,
  then one column. We take the strip and the "how many are open" annotation.
- [Selfridges — select appointment time](https://mobbin.com/screens/a82ab4b2-9573-414b-96da-16963482982e)
  — the booking summary rail beside the picker: duration, location, what is being booked. We take
  the idea of always showing what you are about to book, but put it on the foot of the sheet where
  a thumb is, not in a rail a phone does not have.

## The hard part — a booking that failed

- [Fiverr — book a meeting](https://mobbin.com/screens/3299ae75-0af5-4acf-b8bd-7c4bef88c6bf) —
  **the model for Scenario 4.** The failure is stated *inside the booking panel*, in place of the
  confirmation, with the action to try again. Nothing is written to the list behind it. Our version
  adds what Fiverr leaves out: which team it failed to reach, and a second route to that team.
- [Calendly — scheduled events](https://mobbin.com/screens/cb543ef7-922d-4912-bdbf-9e842fe24240) —
  a cancelled booking stays in the list, struck through, labelled `Canceled by …`. We take the
  principle for ENR-178 AC 5: a booking's state is shown on the row, and nothing is silently removed.
- [Cal.com — bookings](https://mobbin.com/screens/463e79bf-4ff0-46c7-b66a-610e39cbbbf8) — the row
  grammar: date and time, who it is with, what it is about, actions at the trailing edge; the state
  (`Upcoming` / `Unconfirmed` / `Cancelled`) is the filter above the list. We take the row and give
  the state to a chip on the row instead, because the student has three appointments, not three
  hundred, and a tab row that hides a failed booking is exactly what the guardrail forbids.
- [Lyssna — sessions](https://mobbin.com/screens/2491d855-da01-47af-bb7e-aff0504f2f93) — the
  `Next session in 2h 21m` band above the list. That is the section's one figure, and it is what
  the page summary holds.

## Empty states

- [Sketch — no upcoming events](https://mobbin.com/sites/sections/adb1dc84-677e-46f8-9602-26c59724b042)
  — icon, one line, one route out (`See past events`). The shape of `.state-card`, which we already
  have. Confirms the two emptinesses must be written differently: this one is "nothing booked yet",
  and it offers the action; "no times published" cannot offer that action and must not pretend to.

## Rejected

- [Navan — booking failed](https://mobbin.com/screens/2931d92d-1799-496d-be62-7043c18bb14d) and
  [Revolut — deposit failed](https://mobbin.com/screens/082268c6-c6b1-42c6-8997-84561d5b9488) — the
  failure arrives as a centred modal over the form. Dismissing it leaves the student on a screen
  that looks unchanged, which is the exact ambiguity the guardrail is about. The failure has to be
  the panel, not a layer over it.
- [SavvyCal — availability poll](https://mobbin.com/screens/eccde65e-6db5-45a0-b33e-4d6012678104)
  and [HoneyBook — scheduler](https://mobbin.com/screens/396402ad-7ecd-4a99-8462-e6fa561d82fe) —
  a week grid the student paints their own time onto. This is the register the card is moving
  *away* from: proposing a time is not booking one.
- [Fresha — appointments table](https://mobbin.com/screens/0bf2f6b1-7979-4650-a8af-98ff6cf139cb)
  and [Jobber — visits](https://mobbin.com/screens/7b0579b2-4f76-41d9-a57a-01402ca970f1) — dense
  staff tables. Right for an office with a hundred bookings a week, wrong for a student with two.

## Round 2 — the changes of 2026-08-21 (`appointments-changes-2026-08-21.md`)

Three searches, `platform: web`, `mode: deep`, for the surfaces the document adds: asking a team for a
time, the request that then waits, and actions on a booked conversation.

### Asking for a time

- [Preply — reschedule lesson](https://mobbin.com/screens/86cf0587-48a6-4076-b664-c9ede75ef7f8) —
  the published grid on the left, and on the right a summary card that states the *current* time
  and the *new* one with one button. We take the reading for **Reschedule**: it is the same picker,
  opened from the conversation, and the result replaces the record instead of adding a second one.
- [Deputy — leave request](https://mobbin.com/screens/ba0957bd-3383-4aab-9f98-0fe2a7e2bbe2) — a
  request form in a side panel: a window, a free-text comment, who gets notified, `Add`. We take
  the shape of the **Ask for a time** tab — one window field, one About field, one send — and the
  fact that it is a *request*, not a booking, is said in the panel (`.picker-note`).

### The request that waits

- [Airbnb — trips](https://mobbin.com/screens/d3a8ceec-6af8-4f17-8e78-a9526936ac10) — a pending
  reservation is a card with a `Pending` chip and **no date committed**, and a sentence above
  explains what it is waiting on. We take the chip-on-the-row and the waiting sentence
  (`Waiting on the team. Their answer shows up here.`), and keep the request in *Your conversations*
  rather than in a tab of its own.
- [7shifts — availability request](https://mobbin.com/screens/4a0cc094-3cb5-4a29-ac2e-4d545790cd8b)
  — a pending request lists **what was asked** in the requester's words. We take that: the request
  row prints the window the student wrote, so she can see what the team is reading.

### Actions on a booked conversation

- [Cal.com — bookings](https://mobbin.com/screens/88a3ad34-c6f6-4bf4-a9bb-bac7165b29e4) — actions
  at the trailing edge of the row (`Cancel event`, `Edit ▾` with *Reschedule booking* and *Request
  reschedule*). We take the trailing action column and the two verbs; we drop the menu — two
  visible controls per row is the guide's anatomy (button + link).
- [Klook — my bookings](https://mobbin.com/screens/28553296-8675-480c-8854-9927aebd419d) — the
  state (`Booking confirmed`) sits above the card's one button. We take the order: badge, then
  button, then link, in the action column.

### Rejected

- [Rise — reschedule](https://mobbin.com/screens/1144b729-1354-4500-aa73-0540a646c477) and
  [Aboard — reschedule meeting](https://mobbin.com/screens/6354b959-4a80-4153-b535-7ad1a74ede8b) —
  a date and time picker the user types into. That is the register ENR-178 moved away from and ADR
  0005 keeps out: a request is a sentence, never a slot the student writes onto a calendar.
