# References — ENR-166 Student · My Financials

Mobbin, `platform: web`, `mode: deep`. Five searches: the overall money layout, and one for each of the
four hard parts the card's design brief names — *pending must never look like zero*, *an estimate must
never look like a bill*, *explanation beside the term*, *a preview that is not a verdict*.

## Layout — one screen that answers "what do I owe and what is covering it"

- [Klarna — payments](https://mobbin.com/screens/dde3128d-b500-44d1-a3c2-d75190a20dec) — one hero
  figure (`Total you owe $35.70`) with a reassurance line under it, then instalments grouped by month
  with a per-group subtotal. **We take** the single-figure hero and the grouped schedule; the figure
  moves into our `.progress-panel` strip so both screens carry their headline number in the same slot.
- [Wise — scheduled transfers](https://mobbin.com/screens/f059eb98-6f0a-4fe0-a29a-3ce877141006) —
  `Upcoming` and `Scheduled` as two labelled groups in one list rather than two cards. **We take** the
  single schedule list with status marks instead of splitting paid and unpaid into separate sections.
- [Squarespace — invoice](https://mobbin.com/screens/8e645c6b-ec1f-4103-9dfc-ad72587f48b5) —
  itemised charges, then `Subtotal / Discount / Due / Paid` as a ruled ledger foot. **We take** the
  ruled ledger structure for `.ledger-card`: items indented, group totals aligned, one emphasised
  total at the bottom.

## Hard part 1 — an estimate must never look like a bill

- [Vercel — invoice](https://mobbin.com/screens/bb359ef6-ecec-4909-ae49-ddd4369d06de) — `Total Due
  $20.00` sits beside an `Upcoming Payment` chip, and an info banner directly under it says *"This
  invoice will continue updating until the end of your billing period on May 4."* **We take this
  whole move**: the figure, a chip that names its nature, and one line saying what will change it.
  It becomes `.estimate-chip` plus the caveat line in `.balance-summary`.
- [Render — unbilled charges](https://mobbin.com/screens/6fd6292e-e547-4078-82d1-6ed8995d1ec8) —
  the card is titled *Unbilled* and subtitled *"Amounts displayed have been accrued within the month
  to date"*, with `Total month to date` and `Projected total` as two different rows. **We take** the
  refusal to present a running number as a settled one.
- [Zillow — BuyAbility](https://mobbin.com/screens/d9764dfc-e5e8-44ce-aaf9-880d88ebb467) — every
  derived figure carries its own info dot (`Your est. interest rate ⓘ`, `APR ⓘ`) and the panel closes
  with *"All calculations are estimates… Actual amounts may vary."* **We take** per-figure marking:
  the caveat is attached to the number, not parked in a footnote.

## Hard part 2 — pending must never look like zero

- [Whop — balances](https://mobbin.com/screens/c37c9a34-5783-4589-b102-646884177463) — the balance is
  shown, and immediately under it an amber banner says what is missing (*"We need more information…"*)
  with the action that unblocks it. **We take** the pairing: the blocked figure and the one thing that
  unblocks it are adjacent, never on different screens.
- [Whop — reserve detail](https://mobbin.com/screens/665c549f-5a6a-4fd1-bb81-0f5ce819f23f) — a held
  amount gets its own `Expected unlock dates` panel instead of being netted to zero. **We take** the
  principle: a held or unfinalised amount keeps a row of its own. Our pending federal loan renders as
  a row with a `Pending` chip and the reason, never as `−$0`.

## Hard part 3 — explanation beside the term, not in a glossary

- [Glassdoor — pay breakdown](https://mobbin.com/screens/54ab2c91-f9ea-4125-8eee-c880ef898b53) — a
  `ⓘ` on the section heading opens a dark bubble that defines each term in plain sentences, anchored
  to the heading and overlaying the content rather than pushing it. **We take** the mechanism and the
  register — full sentences, no jargon defined with more jargon. This is `.term-tip`.
- [Airtasker — tasker dashboard](https://mobbin.com/screens/9f371984-8319-48c7-91dc-d0262710e3d3) —
  each score states its window in the label itself (*"Your Completion Rating (last 20 tasks)"*) and
  the scale is printed under the bar (`Poor · Okay · Good · Excellent`). **We take** putting the
  qualifier inside the label instead of trusting a tooltip to carry it.

## Hard part 4 — a preview of an institutional check, not a verdict

- [StackAI — usage](https://mobbin.com/screens/a2976bbf-d4f1-407f-8c56-88779215f037) — every metric
  is one row: name, a plain sentence of what it counts, a bar, and `current / allowed` printed at the
  ends. No row is coloured as pass or fail. **We take this exactly** for `.metric-row`: the row
  reports, it does not judge.
- [Airtasker](https://mobbin.com/screens/9f371984-8319-48c7-91dc-d0262710e3d3) again — the panel ends
  with *"How do scores and tiers work?"*, so the reader's next move is to understand the rule rather
  than to argue with the number. **We take** the closing explainer link into the InfoModal.
- [Deel — compliance documents](https://mobbin.com/screens/07889e86-2d7d-49fe-9b63-7a64ec946d2e) —
  `Document status ⓘ` and `Submission deadline ⓘ` carry info dots on the column headers, and status
  is a coloured dot with a word, never a verdict noun. **We take** the dot-plus-word treatment for
  `.aid-status` and the document rows.

## Empty and error

- [Deel — general funds](https://mobbin.com/screens/b6be44fc-bd0b-43e8-90ac-6264023b04e2) — the
  balance card still renders `$0.00` with its label while the list beside it shows *"There are no
  transactions yet"*. **We take** the split: an empty list is not an empty page, and the frame stays.

## Rejected

- [Mailchimp — billing statement](https://mobbin.com/screens/597ac568-31db-4013-950e-7017eb53cd68) —
  a settled statement ending in `Balance as of July 12, 2024 · $0.00`. Rejected: this is precisely the
  shape the card forbids. A financial aid package that is not final cannot be rendered as a closed
  statement with a zero at the bottom.
- [Rocket Money — my loan](https://mobbin.com/screens/ec4485f4-f259-45c2-b26d-d47f161a1c48) — a donut
  reading `100%` over `$300 of $300`. Rejected: a completion ring implies a settled proportion. Our
  coverage split has a pending slice with no known size, which a ring cannot honestly draw. We use a
  stacked `.coverage-bar` with an explicitly hatched unknown segment instead.
- [HoneyBook — payment plan](https://mobbin.com/screens/33ae38b9-039f-49fb-b142-117c47f7119a) — a
  dense `AMOUNT / DUE DATE / PAYMENT DATE / PAYMENT # / STATUS` table. Rejected for a student reader
  and for mobile first: five columns cannot survive 360px. We keep the same fields as one row of
  mark + date + name + amount, with status carried by the mark.
- [Basecamp — mission control](https://mobbin.com/screens/b5267b11-e734-4fd9-a433-d45fc3e8d009) — a
  needle gauge reading `Some risk`. Rejected: a needle in a red zone is a verdict, which is exactly
  what the academic progress guardrail forbids.

## The review of 2026-08-21 — F1, F5, F8, F13 — 2026-08-22

Two searches, web, deep; images examined.

### The cost table: group totals lead, the foot resolves

- [Remote — cost estimate](https://mobbin.com/screens/afa282e1-0b81-42d9-888a-cf37f3a6858d) — each group
  ("Monthly total cost", "Annual total cost") leads with its total in the heavier treatment and its
  line items under it, lighter; the line that needs a word carries an ⓘ. We take the hierarchy F13
  asks for — the figures that summarise the tab at the card-figure treatment, the lines at body —
  and the marker on the line that can change (C10.2: the "what could change it" sits on the marker).
- [Square — bill](https://mobbin.com/screens/37fbf9f1-89ff-4415-882b-183f00fc4f02) — the ledger ends in
  Total / Amount Paid / Amount Due. We take the foot as the table's resolution, not a fourth figure.

**Rejected:** [Fiverr](https://mobbin.com/screens/6a302bde-9823-478b-bbbc-ff95786fb3bc),
[Mintlify](https://mobbin.com/screens/d3166501-51b5-4cf9-afa1-cbf677676b50),
[Webflow](https://mobbin.com/screens/9d279af2-981b-44ba-8818-77da9034641a),
[Elicit](https://mobbin.com/screens/9acedf1e-4ea2-4ebb-b50f-e4525b3e9cdf) — plan-comparison matrices;
a cost of attendance is one column, not a choice between four.

### The payment plan: the deposit is its own line, before the plan

- [Contra — payment](https://mobbin.com/screens/cd783e4b-71b5-41fd-9265-40efa41b4ab2) — "First payment
  $4,000.00 · due Sep 30" and, apart from it, "Deposit today". We take F1 whole: the deposit is a
  separate payment that comes before the plan, on both tabs, in those words.
- [Klarna — pay in 4](https://mobbin.com/screens/c2c82a03-1498-4880-befd-69b5a2294de0) — paid and
  left-to-pay lead the block, then a vertical sequence with the paid one ticked and the next one
  marked. We take the sequence reading "this one is done, this one is next" for the schedule.
- [HoneyBook — payment plan](https://mobbin.com/screens/33ae38b9-039f-49fb-b142-117c47f7119a) — the
  status is a word on the row ("Due", "Upcoming"). We take the word-on-the-row; ours is
  "SCHEDULED · ESTIMATE" (F5), the same marker the balance card already uses.

**Rejected:** [Square — payment schedule](https://mobbin.com/screens/6dbee736-ee72-48c6-a147-d8b3f61325bb)
— a builder for deposit percentages, the merchant's tool; [Mercury](https://mobbin.com/screens/10c550ab-f499-4dbf-8bc2-d007a42c9e00)'s
recurring-rule review — a schedule she sets, where ours is one Aster publishes.
