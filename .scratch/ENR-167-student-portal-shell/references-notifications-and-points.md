# References — ENR-167, second pass: notifications and points

Mobbin research for the half of ENR-167's design brief the first pass did not build. Two searches for
the two subjects, as `docs/agents/design-workflow.md` §2 requires — one for the overall layout of
each, one for the part the brief makes risky.

The brief's own words are the thing to design against:

> Navigation, notifications, points and the route to a person compete for the same corner. **The
> unread indicator must be findable without being anxious.** Points are a reward and never a
> distraction from an overdue requirement, and the shell must survive an institution that disables
> them entirely.

---

## A. The notification panel — layout

- [Jira — notification panel](https://mobbin.com/screens/f7eb5777-1125-4f47-bdcc-39931e19cfeb) —
  **the closest to our domain and the one we take the item anatomy from.** Each row is *actor + what
  changed + which object*, with the object's key and its status chip inline, and an unread dot on the
  right edge. A row is a link to the thing it describes. That is ENR-161 AC2 in one line of markup.
  We take: the row anatomy and the unread dot on the trailing edge. We leave: the Direct/Watching
  tabs and the inline reply, which would promise the inbound channel AC5 forbids.
- [Causal — notifications](https://mobbin.com/screens/9a5e4576-8324-4778-b510-ac081f65311b) —
  `Mark all as read` sits in the panel header, not behind an overflow menu. Filters are `All / New /
  Archived`. We take the header placement of the bulk control; a student should not hunt for it.
- [folk — notifications](https://mobbin.com/screens/53204879-6a32-4f5d-ad5f-2adef77f8dc6) — the same
  control hidden in a `···` menu together with *Delete all*. We take this as the counter-example:
  destructive and non-destructive bulk actions in one menu is how a student deletes a decision they
  meant to read.

### Rejected

- [Air — notifications](https://mobbin.com/screens/b3e74362-1af4-4022-bdf2-a56b09d786f3) and
  [Skillshare — My Activity](https://mobbin.com/screens/b3620f62-003f-4206-9336-7d930e49dc13) —
  thumbnail-led social feeds. Our events are record changes, not media, and this repo has no image
  library to fill the space with.
- [Curater — notifications](https://mobbin.com/screens/49dba52d-18bc-4379-81f9-e749d14fc11b) — unread
  rendered as a tinted row rather than a dot. Tempting, and rejected: with three categories the tint
  would have to carry both *unread* and *which category*, and one surface cannot say two things in
  one colour.

## B. The notification panel — the hard part

The brief says *findable without being anxious*, and AC4 gives three categories that are plainly not
equal in weight. Two references settle it:

- [Slite — Updates](https://mobbin.com/screens/fb60bed4-2dd5-4221-ba5d-c1fc3fef0f1a) — **the
  reference this pass turns on.** The feed is split `Where you're needed` / `Nice to see`. It does
  not present its categories as a taxonomy of equal tabs; it ranks them by whether the reader has to
  do something. AC4's three categories map onto that split — *action required* is where you're
  needed, *action completed* and *record changed* are not. We take the ranking.
- [Telescope — empty notifications](https://mobbin.com/screens/a488f2e6-28b3-49e3-885a-779324cec42a)
  — the empty state lives inside the dropdown rather than sending the reader to a page to find
  nothing. We take that: the panel is the only surface, so it carries its own empty state.

---

## C. Points and what they are worth — layout

Marco chose the **reward catalogue** reading of ENR-162 AC1: a point's institution-defined value is
what it can be redeemed for, not a currency amount.

- [sweetgreen — rewards](https://mobbin.com/screens/26c7cc12-dcf7-41e1-9832-1208c3bbe98c) — **the
  layout we take.** *"Hi Alex, you have 500 points"*, then *"A free drink is 200 pts away!"*, then a
  horizontal ladder of rewards each sitting at its point threshold, dimmed until reached. One glance
  answers *how much have I got*, *what is it worth* and *what is next*. It also never renders a
  redeem button, which matters — see the constraint below.
- [Selfridges — Unlocked](https://mobbin.com/screens/d1980ac9-25bb-4699-93ac-6f2e327c7222) — level,
  *"Collect 39 more keys to reach Level 2"*, then *Your Level 1 perks*. Confirms the shape the
  existing `MomentumCard` already reaches for with *Settling in* and *850 to Trailblazer*, so the
  card is not thrown away.
- [PayPal — Rewards](https://mobbin.com/screens/b3d8a0db-0ae2-4de6-9ad9-3c2056f09d55) — the balance
  carries its value inline (`0 points` / `$0.00 cash back value`) and a *finer print* panel states
  the conversion where it is displayed. We take the habit, not the currency: **a measure states its
  own definition where it is shown**, which is the rule ENR-57 AC4 already sets on the staff side.

## D. Points — the hard part

- [adidas — adiClub](https://mobbin.com/screens/5c88e9dd-b915-439e-b81a-3522538b4f0c) — *"You
  currently don't have enough adiClub points to unlock discount vouchers"* with *How to earn more
  points* beside it. The not-yet-enough state written in words rather than as a greyed control with
  no explanation. We take the sentence.

### Rejected

- [Binance — voucher grid](https://mobbin.com/screens/1e60f298-cf02-44aa-a26a-74d31b707e2a) — a grid
  of decorative ticket cards each with a **Claim** button. Rejected on the card: ENR-148 puts
  *reward redemption mechanics* out of scope, and `docs/agents/design-workflow.md` §1 says out of
  scope means do not build it, not build it smaller. A Claim button is the whole mechanic in one
  control. It is also eight decorative illustrations this repo has no way to draw.
- [Urban Outfitters — UO Rewards](https://mobbin.com/screens/ad630969-6226-4365-9283-1891e905bf27) —
  a large decorative ring around the balance. Rejected: this portal already has a progress ring and
  it means *how much of your enrollment is done*. A second ring meaning *points* teaches the student
  that a ring means nothing in particular.
- [Klook](https://mobbin.com/screens/5f7aef2a-54c8-46c1-b16a-450231aa2fb4) and
  [Navan](https://mobbin.com/screens/a4a3a9c9-b8ce-4611-b703-6f5fa665419f) — promotional surfaces
  where the reward competes with everything else on the page. This is precisely what AC6 forbids.
