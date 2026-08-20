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
