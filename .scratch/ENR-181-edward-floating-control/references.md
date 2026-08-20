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
