# References — ENR-164 My Enrollment

The Jam supplied the advisor card itself as an image, so Mobbin was used for the two things the image
does not answer: **where** a named person belongs in a right rail, and **how** availability should be
worded so it reads as a promise rather than decoration.

## Layout — the person goes above the metrics

- [Lightfield — account overview](https://mobbin.com/screens/f1244a10-3103-4ca1-87d6-df5eeef71f46) —
  the right rail opens with **Owner**, a named human with an avatar, and only then lists records,
  meetings and tasks. We take the ordering: identity first, instrumentation second.
- [Jobber — client detail](https://mobbin.com/screens/4950b424-a7a2-47a8-9941-1259d51557a1) — rail runs
  Tags → **Last client communication** → Billing history → Internal notes. The human contact block sits
  above the money block, which is exactly the swap the Jam asked for.
- [Asana — home](https://mobbin.com/screens/c10b3360-7af2-4369-9c05-f103edddd3ce) — rail of stacked
  cards at one width with a consistent gap. Confirms our `.insight-column` gap survives a reorder;
  the Jam's *"mantém o espaçamento"* is satisfied by moving cards, not by restyling them.

## The hard part — availability that reads as a promise

- [Charma — contact](https://mobbin.com/sites/sections/5bf003e4-ce42-46f0-b15a-7fd5a2ca6950) — states
  "Maximum response time: 1 business day, M-F 9-5pm" **next to** the contact routes rather than in
  fine print. We take this: hours and location sit in an inset panel directly above the two buttons.
- [Function — we're here to help](https://mobbin.com/sites/sections/f32b997a-7dfc-43f4-b2ee-bdb43c898373)
  — two named routes of clearly different character (live chat vs email) instead of one generic
  "contact us". We take the two-route shape for **Email** and **Message**, at equal weight, because the
  Jam's card shows them equal and because choosing a channel is not sending
  ([ENR-22](https://audentra.atlassian.net/browse/ENR-22) guardrail).

## Rejected

- [Mural — contact](https://mobbin.com/sites/sections/0fcecfae-738f-4126-a206-12be20264116) — a row of
  eight team faces. This is the pattern the old `.support-avatars` card was reaching for, and it is
  what the Jam removed: a crowd is not a person who holds your file. One named advisor replaces it.
- [Tines — contact us](https://mobbin.com/sites/sections/edf497d3-bf97-46f5-8c06-e18e40ce669b) — a grid
  routing you to a department. Right for a marketing site, wrong here: the student already has an
  assigned office, so offering a choice of departments would invent a decision they do not have.
