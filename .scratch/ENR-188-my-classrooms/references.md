# References — ENR-188 My Classrooms

Two questions Mobbin had to answer, taken straight from the card's design brief: **how an abstract
requirement carries enough substance to be the primary object**, and **how a credit match reads as
evidence under discussion rather than as a decision already made**. A third search covered the
partial/error states the card asks for by name.

## The requirement as the primary object

- [Vanta — compliance progress](https://mobbin.com/screens/73f939c9-1c88-4d35-9d87-ce276a014c30) —
  the strongest analogue in the whole search. An abstract obligation (a SOC 2 control family) becomes
  a concrete object by carrying its own counted progress (`103 controls complete / 104 total`) and its
  own attention figure (`Needs attention 7`). **We take this**: every requirement card carries
  `n of m credits` and, when it applies, its own advisory count. That is what makes a requirement
  survivable as the top-level row when courses are the concrete thing underneath.
- [Codecademy — path curriculum](https://mobbin.com/screens/63e05256-8dd3-4758-9abd-bc84176be27d) —
  module header with a percentage ring and a description on the left, the courses that compose it
  listed on the right, collapsible. **We take the expansion**: the requirement header never leaves the
  screen when its courses appear, which is the ENR-173 guardrail expressed as a layout.
- [Babbel — level detail](https://mobbin.com/screens/189ea23c-9d3d-42cd-913b-a8681be54f95) — one group
  open, the rest collapsed to a title plus a count. **We take the default**: only requirements that
  need attention open on load; the rest stay one line tall so eleven of them fit in one screenful.
- [Unity — pathway outline](https://mobbin.com/screens/5ff0b676-d20d-4ed6-9f1b-a75000160872) — a
  `0% complete` outline that is still full of substance before the learner starts anything. **We take
  the reassurance**: ENR-185 Scenario 2 demands a meaningful view for a student with nothing
  registered, and this proves a not-started path can be dense rather than empty.

## The hard part — a match that reads as evidence, not as an award

- [Elicit — screening recommendations](https://mobbin.com/screens/d96f34b4-c117-4ae8-ba1c-c1dc655eaac8)
  — the reference that decided the match treatment. Each recommendation shows its score (`4.9 / 5`),
  the named criteria it was drawn from as chips, a `Show criteria evaluations` disclosure, and a side
  panel that says in words: *"Review screening recommendations… Check detailed reasoning and override
  recommendations as needed."* The machine proposes, a human disposes, and the interface never hides
  which is which. **We take all of it**: evidence → target → rule → confidence, with the review
  framing stated rather than implied.
- [Apollo — please review and confirm](https://mobbin.com/screens/ca9a3e08-dfba-47b7-bcc2-762f02f50ef9)
  — a suggested change is shown pre-checked but never applied; the destructive consequence
  (*"This will override your existing filters"*) is spelled out next to the confirm. **We take the
  posture**: the match card states what has *not* changed, in the card itself, not in a footnote.
- [Glassdoor — is your resume a good match?](https://mobbin.com/screens/81c19e3b-788c-44b1-a275-12ab6d39f57d)
  — the match insight is a visually separate block, tinted and set apart from the actual application.
  **We take the separation**: potential matches are their own section with their own tint, never
  interleaved into the requirement list as if they were credits.

## The states the card names

- [Google AI Studio — scoped failure](https://mobbin.com/screens/bd6669d2-d3df-476e-b933-e44bb25e5259)
  — the failure is reported inside the panel that failed, with the rest of the workspace intact and
  usable. **We take this for `partial`**: when the transcript service is unreachable, only the matches
  section degrades; requirements and approved credit are untouched and say so.
- [Unity — payment failed](https://mobbin.com/screens/c598fa3d-6ac6-40fc-bebc-cddfc355bb81) — the
  failure takes the main column while the order summary keeps rendering the facts. **We take this for
  `error`**: the catalog can fail while the rail still names the program and the Registrar's Office,
  so the student is never stranded without a route.
- [Remote — retry](https://mobbin.com/screens/33a0fa06-a623-4e22-b705-4175ce2216a9) and
  [Klaviyo — try again](https://mobbin.com/screens/67dd3c10-992c-4ce7-a4fb-72a9857818cc) — one plain
  sentence and one button. **We take the restraint**, and add the sentence those two lack: nothing
  about the student's record changed.

## Rejected

- [Coursera — grades table](https://mobbin.com/screens/35b8baea-dca0-422b-83ee-01dd411da127) — a table
  of items with status, weight and grade. This is a transcript, and ENR-185 AC6 says the portal is not
  the system of record for one. Rendering grades here would make the page look authoritative about the
  exact thing it must disclaim.
- [MasterClass — my progress](https://mobbin.com/screens/cf71bee0-143b-4b9b-9cf1-536ad1cb7956) —
  categories as flat rows with `0/414` counts and a `1%` headline. The counts are inert: nothing tells
  you what a category asks of you or how to satisfy it. Exactly the "course list with a percentage"
  failure the card's design brief warns about.
- [SchoolAI — class mastery](https://mobbin.com/screens/fcb8ba0f-a935-4abf-8d0c-25a5a466bb28) — an
  insight rail that narrates conclusions about a student (*"John demonstrates…"*). Wrong voice for a
  student-facing academic page, and it invites exactly the inference ENR-186 forbids: that the system
  has already judged.
- [Expensify — course content](https://mobbin.com/screens/69f49680-2a1f-463c-acfc-de5ca0472cea) —
  twenty-two undifferentiated `Not Started` rows. What eleven requirements become if the requirement
  does not carry its own substance.
