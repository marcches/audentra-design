# References — ENR-181 Edward floating control

Four searches. The screen is three surfaces at once, so the layout, the history form, the mobile
sheet and the grounded answer were each researched on their own.

## The expanded form — a floating window, not a full-height panel

- [Linear — Ask Linear](https://mobbin.com/screens/51c2bd60-f22d-4879-8c28-c5800ac1f4b6) — the
  assistant is a small window anchored to the corner, and the launcher is a **labelled pill**, not a
  bare circle. We take both. A window rather than a full-height rail is what makes
  [ENR-175](https://audentra.atlassian.net/browse/ENR-175) possible at all: the student has to keep
  seeing the thing they are asking about.
- [HoneyBook](https://mobbin.com/screens/fa243020-70b3-41a7-94c1-50e5d51c7355) — the standing
  caution is a single line pinned under the composer, never inside the scroll. We take that
  placement; it is the answer to "the caution has to stay visible in a smaller surface".
- [Fabric](https://mobbin.com/screens/584d470e-5926-4b98-9f8c-693e030fea85) — collapse control in
  the header rather than a second floating button. We take the header triad.

## Suggested questions that follow the student's state

- [Asana](https://mobbin.com/screens/f2b651ef-bce1-464c-9c47-52f2fb187238) — full-width stacked
  rows, **grouped by where they come from** ("For you" / "Insights"). Rows wrap to two lines instead
  of truncating, so a variable number of variable-length suggestions costs nothing. This is the
  layout ENR-176 AC7 needs and we take it whole.
- [Deel](https://mobbin.com/screens/db357932-0e83-43e7-89ff-5f47a06ef246) — three suggestions is
  enough; the disclaimer sits below them at the foot.

### Rejected

- Horizontal scrolling prompt chips (the common pattern, e.g.
  [Wabi](https://mobbin.com/screens/c714a04d-8f30-4304-843c-172e2fad86d8)) — they truncate the long
  suggestions and hide the ones past the fold. The card says the number and length vary and the
  layout must absorb that, which a single-line scroller cannot do.

## The fuller form — browsing history

- [Deel](https://mobbin.com/screens/db357932-0e83-43e7-89ff-5f47a06ef246) — the closest to our case:
  conversation list on the left, "New chat" pinned at its foot, the empty conversation on the right
  with suggestions and the caution. We take the two-pane split and the pinned new-conversation
  control.
- [Fiverr Neo](https://mobbin.com/screens/869a2cbf-b7fc-45d6-a4ad-889cd5b506c0) and
  [Microsoft Copilot](https://mobbin.com/screens/10828a84-6e11-4d59-8753-102865b3c7ae) — same split,
  confirming the convention. Copilot's "Create new conversation" lives in a header menu; we keep it
  visible instead, because ENR-175 Scenario 3 asks for it to be reachable, not discoverable.

## The context the assistant carries

- [Notion iOS](https://mobbin.com/screens/6a524e27-e401-4806-b36e-b07c07a468da),
  [ChatGPT iOS](https://mobbin.com/screens/e8593f58-6950-4b25-b85d-df479726334a),
  [Comet](https://mobbin.com/screens/15aad059-d954-44e8-ae71-55128f8e4f4b) — all three put the
  context **inside the composer** as a removable chip. That is ENR-175 AC4 ("the student can see
  that it does") solved with one element, and removable means the student can also opt out of it.
  We take the chip and the ×.

## The grounded answer

- [Customer.io](https://mobbin.com/screens/fafcbfb9-fa85-4b4d-b17f-54df962305b5) — "Searched docs"
  above the answer and a references list beside it. We take the idea of naming the origin, in one
  line rather than a panel.
- [Sana AI](https://mobbin.com/screens/67047d63-2ae6-44e0-a2a2-8d6989a14819) — the answer names its
  sources in the body. Too heavy for a 420px window; we compress it to a single source line.

### Rejected

- [TravelPerk](https://mobbin.com/screens/dd154cd6-e461-46c9-8cb3-38f6ddbc489e) — "Sorry, no data
  was found for specified period." is the exact failure ENR-176 AC3 forbids: it states the absence
  and stops there. Our no-answer state must end in a **named person**. Kept here as the shape to
  avoid.

## The mobile sheet

- [ChatGPT iOS](https://mobbin.com/screens/e8593f58-6950-4b25-b85d-df479726334a) and
  [Grok](https://mobbin.com/screens/dd50d33e-83d5-436f-9953-bbfc1ccb268d) — composer-first sheet,
  mic to the right of the field, and the field is the thing the sheet is anchored on. We take the
  composer-first order and the mic placement.
- The sheet geometry itself is **not** taken from Mobbin: it is copied from this repo's own
  `.task-drawer` at `width<=620px` — `min(88vh,760px)`, radius `23px 23px 0 0`, `sheetIn`. A second
  sheet idiom would be the exact inconsistency this card is meant to remove.

## The door, the check and the inline ask — 2026-08-22 (changes brief of the same date)

Four searches, web, deep: the prompt after an answer, the hand-off to a person, the inline control on
a row, and a support-bot escalation flow. Images examined, not metadata.

### "Did that answer it?" — a question, not a rating

- [Microsoft Copilot](https://mobbin.com/screens/f615a6bc-d64b-49f9-98b3-5d896a782c3b) — a
  **titled prompt block under the answer**, separated by a hairline, with two outlined pill buttons
  ("Good" / "Bad"). We take the shape: a short question in the assistant's voice and two quiet
  buttons, the prompt being its own block rather than icons in the answer's action row.
- [PayPal assistant](https://mobbin.com/screens/b0e23e51-32c4-4101-a4f3-0af779cf087b) — "Is there
  anything else I can help you with today?" is asked *as a message*, answered by a quick reply
  ("No"), and the answer leads somewhere. We take the conversational placement: Edward asks once,
  after the answer, and *Not really* is what opens the routes.

**Rejected:** thumbs up/down in the action row ([Bard](https://mobbin.com/screens/1967f0ff-557d-481c-9ea9-8a5e861082c0),
[Mistral Le Chat](https://mobbin.com/screens/421b789e-fcc0-4ca3-bf6d-e977bb9932d7)) and the "what was
wrong" chip matrices that follow them — ENR-176's register is whether *she* got what she needed, not
a rating of the model; and a matrix of reasons is a survey, which the card forbids as the loudest
thing on a 380px surface.

### The routes — stacked, in the assistant's turn, and the absence stated

- [Klook support](https://mobbin.com/screens/293a68c2-2a91-417b-96e0-c7b834a7d734) — the bot offers
  **stacked full-width buttons inside its own bubble** ("Something I want to book" … "Talk to
  someone"). We take the shape whole: the routes are rows in Edward's turn, the same row the
  suggestions already use, so "what you can do next" always looks the same in Edward.
- [PayPal assistant](https://mobbin.com/screens/b0e23e51-32c4-4101-a4f3-0af779cf087b) — when live
  help is not there, the bot **says so and says when** ("All our agents are currently offline… They
  will return on Thursday…") before offering the alternatives. We take the rule: where an office has
  no times posted, Edward states it and offers the callback in the booking's place, with the reply
  time that office publishes (Part A §3.4, §7.2).
- [Blue Apron](https://mobbin.com/flows/f526847e-2cc4-49e5-a6e6-908180ece220) — offline → "we'd
  like to help you as soon as we are back online… Submit a Form": the same stated absence, one
  alternative, one button. Confirms the above.

**Rejected:** [Loops](https://mobbin.com/screens/96bb79c3-291c-414c-b42e-18003346e9fe) — three
side-by-side cards (Live chat / Slack / Email): too wide for the window, and it makes three routes
look like peers when booking and callback are alternatives to each other (Part A §10).
[Resend Help](https://mobbin.com/flows/68dcf300-7409-433d-8f90-8e5b54f0ad51) and Blue Apron's
"Talk to a human" from the first message — a route to a person before the assistant has answered,
which Part A §12.1 forbids. [Zoho CRM](https://mobbin.com/screens/a14af107-a391-4ad4-b84c-c0b55b0adf9d)
— an error that names an e-mail address to write to: ENR-177 AC 6.
[Intercom Fin](https://mobbin.com/screens/ccf5c1b1-cfc6-45cb-97d8-dd29fd6655b6) — the admin's
"hands over or escalates" settings, not the student's view; kept only as confirmation that
"follows up — confirm whether the user still needs assistance" is how the category names the check.

### The inline ask — a quiet mark and one word, in the row's action area

- [Workable](https://mobbin.com/screens/676c70e1-1b71-401a-8335-962b9bb53eba) — a tiny "✦ AI" pill
  beside the content, next to "Edit ▾" and "Change tone ▾": the assistant is offered where the thing
  is, as the smallest control on the line. We take the size and the register.
- [Remote](https://mobbin.com/screens/44344cb5-9817-4d0e-b696-e8ba936b2f82) — "✦ Revise with AI" as
  a text button beside a field. We take the text-button form: the mark, a short label, never a
  primary button.
- [Fabric](https://mobbin.com/screens/61d7d915-b6d3-4f7b-8544-ed2701fdce96) — the assistant panel's
  composer carries a **"Current file" context chip** over the input. Our `edward-context-chip`
  already does this for the page; the door sets it to the item the control came from.

**Rejected:** [Trello](https://mobbin.com/screens/288bd04c-0aae-4928-b0fb-db4b44912466) — AI inside
the editor with Discard / Refine / Insert / Replace: it acts on content, and Edward never acts
(ENR-176 AC 5). [Coda](https://mobbin.com/screens/d085bc38-7a20-4dfd-b3e1-0e853c8fbe75) — "auto
select with AI" on a status field: same. [Mural](https://mobbin.com/screens/9dfc2233-6356-479b-a6ee-2a23490f0d2c)
— a right-click menu of AI actions: a context menu hides the control from keyboard and touch.
