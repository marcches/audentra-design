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

## Pass 2 — the advisor leaves the rail for the progress strip

The second Jam moved the advisor out of the right rail and into the strip beside the enrollment
progress, and struck out its intro paragraph. Two questions Mobbin had to answer: how a named person
compresses into one horizontal row, and what belongs at the top of a rail once the person is gone.

### The compact person row

- [Deputy — account home](https://mobbin.com/screens/c072adb4-98d0-461d-b441-f7c418391f44) — the page
  opens with one horizontal strip: avatar, name, then contact details as a small inline meta line with
  icons, and the action pinned to the far right. This is the shape of `.advisor-bar` exactly, and it
  is what makes dropping the prose sentence survivable — the icons carry what the sentence carried.
- [Zoom — contact detail](https://mobbin.com/screens/cbec6c9d-3d1f-4623-92da-09a58940f097) — avatar,
  name, then two equal-weight buttons (`Team Chat`, `Meet`) and nothing else. No bio. Confirms that
  identity + two routes is a complete contact unit; the paragraph was never load-bearing.
- [Preply — tutor profile](https://mobbin.com/screens/28954c6b-49e0-4a22-bf18-bccafd84bedc) — keeps
  *"Usually responds in 4 hrs"* as small meta beside the action stack rather than as body copy. We take
  this for hours and location: they stay, at meta size, next to the buttons.

### The rail once the person leaves it

- [Uxcel — home](https://mobbin.com/screens/7c84c45e-ae5a-449c-be39-306cead79fa7) — the rail leads with
  the streak and league standing, then drops to the skill graph. Progress instrumentation first when
  no human is competing for the slot.
- [adidas — member panel](https://mobbin.com/screens/4d212b3a-f54e-46dd-8041-51cfc643c7b1) — panel opens
  with membership level and points balance, then the offer cards. The balance is the anchor; the nudges
  sit under it. Same ordering the Jam asked for: momentum on top, saved-from-welcome below.

## Rejected

- [Mural — contact](https://mobbin.com/sites/sections/0fcecfae-738f-4126-a206-12be20264116) — a row of
  eight team faces. This is the pattern the old `.support-avatars` card was reaching for, and it is
  what the Jam removed: a crowd is not a person who holds your file. One named advisor replaces it.
- [Tines — contact us](https://mobbin.com/sites/sections/edf497d3-bf97-46f5-8c06-e18e40ce669b) — a grid
  routing you to a department. Right for a marketing site, wrong here: the student already has an
  assigned office, so offering a choice of departments would invent a decision they do not have.
- [Jira — people profile](https://mobbin.com/screens/69749b02-5134-4de3-8082-387518ec9a84) — a full
  profile column with job title, department, organization and location stacked as labelled rows. Right
  for a profile page, wrong for a progress strip: it re-inflates the card the Jam just asked to reduce.
