# References — ENR-206 Student · Health

Two searches, one per half of the screen, because the two halves share nothing. The brief's whole
risk is that they read as one thing, so they were researched as two.

## 1. The record with a review state

Query: *account page showing a submitted document with its verification status and the team
reviewing it named* · `web` · deep

- [Stripe — Account status](https://mobbin.com/screens/b24bf79e-1acc-4d99-9f38-b81aa68daaf8) —
  **the layout we take.** A state at the top, and immediately beside it a rail that answers the
  three questions a wait produces: what happened and what do I do now, why does Stripe need this,
  how long will the review take. Our rail is that rail: the reply time as the anchor, the two teams,
  and the document Aster already published about what counts as proof. It also puts *what do I do
  now* first under a returned decision, which is where our reason and its remedies go.
- [Airwallex — We are reviewing your details](https://mobbin.com/screens/5b2e67a8-ded8-496b-80f0-d2aa8ab4ae03) —
  *in review* reads as pending rather than as broken for exactly one reason: it states a duration
  ("1–3 business days"). We take that literally — `in review` on this screen never appears without
  Health Services' five business days next to it.
- [7shifts — Onboarding documents](https://mobbin.com/screens/ddb0c7d4-44ab-47c5-946e-a7b13bbaa4ed) —
  rows with the state on the right, one line each. Confirms the `DocumentRow` shape ENR-165 built;
  we reuse it rather than invent a health-flavoured row.

### Rejected

- [OKX — Reviewing](https://mobbin.com/screens/56aafe11-2b76-4cc6-a2ba-102d35d3b0d1),
  [Binance — Under Review](https://mobbin.com/screens/97ad290a-c321-47d8-b0db-ea024212c8a9),
  [Coinbase — Application in review](https://mobbin.com/screens/085df375-3abc-468b-8a1c-e81937f76696) —
  the whole screen becomes the wait, with an illustration in the middle of it. This is precisely what
  ENR-205 AC6 forbids: a student who resolved both parts still has to reach a section that shows her
  both, not a page that has turned itself into one status word.
- [TikTok — Business registration](https://mobbin.com/screens/db218b4d-8504-4b1a-bb7c-789379affab7) —
  an amber banner across the top repeating the state that is already on the record below it. That is
  the `AlertStrip` we decided against: the reason belongs next to the button that fixes it.

## 2. The question that must not look like an intake form

Query: *privacy setting with two mutually exclusive choices and a line stating who can see the
answer* · `web` · deep

- [YNAB — Support Access Mode](https://mobbin.com/screens/7f14f6d6-2262-46ee-899c-cbe02b2884a3) —
  **the card we take.** Prose first, explaining what allowing it means, then two radios where each
  option carries its own paragraph of consequence — and the second is written plainly as
  "Don't allow (default)" rather than hidden as an absence. Declining is a first-class option with
  its own words. That is our "not right now" as a complete answer, and it is why the accommodation
  card opens in prose and carries no heading band: it is a question with two doors, not a record.
- [Wellfound — Profile visits](https://mobbin.com/screens/c2aecfb8-828f-4d20-94c7-728fdc0ad0d7) —
  the chosen mode is stated and the unchosen one is fully described rather than implied. We take
  that: after answering, the card states the current answer in a sentence and keeps the other door
  visible, because ENR-208 AC5 lets her change it at any time.
- [Featurebase — Who should have access](https://mobbin.com/screens/e09da64c-73c3-499e-a53d-da590f788e84) —
  two choices as full rows with an explanation each, weighted equally. We take the equal weighting;
  neither answer is the recommended one.

### Rejected

- [PayPal — Search privacy](https://mobbin.com/screens/5745f299-d36f-4c6a-ba51-698318723afa),
  [Braintrust — Profile privacy](https://mobbin.com/screens/2bb13bef-1483-4412-9ec9-554cd2677168),
  [Cursor — Data Sharing](https://mobbin.com/screens/d17c8c37-7b28-481f-a41f-c208c6ed0d0f),
  [Twenty — Calendars](https://mobbin.com/screens/93ed48eb-14bc-48eb-bce7-76e723d21c71) — toggles.
  A toggle has two positions and no third, so *never answered* and *answered no* are the same pixel.
  The brief calls that distinction the sharpest one on the screen; a toggle cannot express it, and
  it also reads as a feature switch rather than as a question a person will act on.
- [GoFundMe — Change visibility](https://mobbin.com/screens/ebc8fb49-6b1b-4f09-ba87-9401f7d61522) —
  the same two radios, in a modal. Opening a dialog to say "not right now" gives the question the
  weight of a form; the answer costs nothing, and the interaction has to cost nothing too.
