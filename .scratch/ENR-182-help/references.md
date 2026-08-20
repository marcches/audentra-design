# References — ENR-182 Help

Four searches, `platform: web`, `mode: deep`. The third and fourth are the ones that decided the
design: the first two established that a help centre and a request list are two different screens in
almost every product, and this card has to hold both on one page.

## Layout — guides on one side, a route to a person on the other

- [n8n — Help Center](https://mobbin.com/screens/9f7321b8-dc75-4c9c-8df2-a42a85ea34f8) — **the shape
  we took.** Four category cards, one of which is `Submit support ticket`, then an FAQ accordion,
  then a `Need more help?` block that names where the question goes. Guides first, a named route
  last, one column. That is ENR-177 AC 7 as layout.
- [Bard — Help](https://mobbin.com/screens/c7135f10-40d1-42f1-80fd-e9dd6c080249) — the guide list as
  a plain accordion of topics, no thumbnails, no illustration. We take the accordion: our guidance
  corpus is prose Aster published, and prose does not need a cover image.
- [Unity — Help & Support](https://mobbin.com/screens/34cd0860-99c1-44da-aef4-e1d25be584b7) —
  `Contact Support` is a card with its own sentence saying what it does, not a bare button. We take
  that: the ask block says which office receives it before the student writes anything.
- [Navan — Help Center](https://mobbin.com/screens/94d03315-33e4-40c2-8e4e-27d2d8852e32) —
  **rejected.** Photographic category tiles. This repo has no image assets and no icon package, and a
  tile whose meaning is carried by a photograph cannot be built from `Icon.jsx`.

## The hard part 1 — a request state that hides who is handling it

ENR-177 AC 3. Almost the entire corpus is the staff side of this screen, which is the useful finding:
every one of those views is built around an assignee column, so the student-facing view has to be a
different object rather than the same table with a column hidden.

- [Base44 — My Support Tickets](https://mobbin.com/screens/20b9440b-cc9c-4c30-9500-9baa5facb0c8) —
  **the closest thing to what we need.** Open / Closed / All counts, then one card per request:
  subject, a status chip, the category, the body, and the date. No person anywhere on it. We take the
  object: a request is a card the student can read, not a row in a queue.
- [Featurebase — Feedback](https://mobbin.com/screens/3a29c917-37c1-4a4b-a1b7-4b0a1fb08b7b) — the
  status vocabulary we borrow the grammar of: `Under Review`, `Planned`, `In Progress`, `Done`. Each
  one describes the state of the thing, never the state of a person's inbox.
- [OKX — Ticket details](https://mobbin.com/screens/2c298595-0718-43a0-8a4b-ba875c358adf) — the
  thread with a small facts panel beside it: `Closed`, ticket id, created at, last updated. We take
  the facts panel into the drawer header, minus the ticket id — a reference number the student cannot
  use anywhere is noise.
- [Fiverr — Resolution Center](https://mobbin.com/screens/54186860-2b86-4cc3-9ae3-0e2a6e1b3cb4) —
  `Track Order` as two checkpoints, one ticked and one open. We take the idea that the state is drawn
  as a path with a completed part, which is how `Received → Answered` reads without naming anybody.
- [Zendesk — Dashboard](https://mobbin.com/screens/6d092d6c-e458-4351-9bf5-d88a8d095750),
  [HubSpot — Help Desk](https://mobbin.com/screens/6228df0a-7927-4862-b9be-c792cf7a19e8),
  [Snowflake — Support Cases](https://mobbin.com/screens/8077f169-1a2e-4437-92fc-3948bfbd49b5),
  [Front — Shared inbox](https://mobbin.com/screens/03a53403-1269-4f10-ad1b-ebf5cb9d411f) —
  **all rejected, and they are the reason AC 3 exists.** Every one leads with `Assignee`, `Group`,
  `Assigned to you by a rule`, `Severity`. Front even prints *"Assigned to you by a rule"* into the
  thread body. None of this is the student's business and some of it is not even true from where they
  stand.

## The hard part 2 — receipt, and the deflection before it

- [Teachable — Submit a Ticket](https://mobbin.com/screens/61fc4948-d5b8-4021-bd31-b2b98303d6c2) —
  **the construction we took for the ask block.** Support hours stated at the top before any field;
  choosing a topic reveals the matching article inline; only under that comes
  `Can't find what you're looking for? Message Us`. Our version replaces the article with Aster's own
  guide and the hours with the office's hours.
- [Klook — Submit](https://mobbin.com/screens/f5322f43-50f9-4bd8-9a63-fc1dd04bdcb1) — the topic list
  written as things that happen to the user (`Changing a booking`, `Booking status`), not as internal
  queues. Our topics are named the same way and each one carries the office that owns it.
- [Supabase — How can we help?](https://mobbin.com/screens/44cc0c14-b1cf-49b0-88e6-907f160ed927) —
  suggested articles listed under the subject field as the student types. Taken in spirit, rejected in
  form: theirs are checkboxes, which asks the student to file their own ticket correctly.
- [Supabase](https://mobbin.com/screens/44cc0c14-b1cf-49b0-88e6-907f160ed927) and
  [Midday — Support](https://mobbin.com/screens/b5f86040-67e4-440d-b2df-7ac6ff748129) both carry a
  **`Severity` select — rejected.** A student is not the right judge of how urgent their own blocked
  step is, and a severity the student picked would immediately become the internal detail AC 3 says
  must not be on this screen.
- [Etsy — Messages](https://mobbin.com/screens/df6afabd-a4dc-4dca-ace4-16e2e5d182de) — **rejected on
  purpose.** A support bot answering first, with quick-reply chips. Edward already is this, one
  card ago (ENR-181), and doing it twice would make the two indistinguishable. Help is where a
  *person* is reached; the assistant is in the topbar.
