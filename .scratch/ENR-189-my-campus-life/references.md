# References — ENR-189 My Campus Life

Mobbin, `platform: web`, `mode: deep`. Five searches: the overall feed layout, the hard part named in
the card's design brief (mandatory sitting next to optional without being mistaken for it), the
organisation list, the empty state, and the detail surface.

## Layout — a feed that holds four items and forty

- [Luma — events](https://mobbin.com/screens/7dbb0d17-e56b-4ed2-8e02-74caafbde1bc) — a date rail down
  the left, one group header per day (`Today Tuesday`, `Tomorrow Wednesday`, `Nov 14 Thursday`), and
  a compact row carrying time, title, host, location and one status chip. **Taken**: the row is the
  unit, not a card in a grid. A row survives 40 items and reads at 380px; a poster grid does neither.
- [Circle — events](https://mobbin.com/screens/65a8ea46-2fc2-488f-852e-e020709872ad) — an
  `Upcoming | Past` toggle above the feed, a **Next event** hero, then month groups where that same
  event appears again as an ordinary row. **Taken twice**: `Past` as a view rather than a deletion
  (story AC 6), and the precedent for showing one event both in a pinned callout and in the
  chronological list.
- [Codecademy — community events](https://mobbin.com/screens/66bd70b2-6912-48a9-8c19-37ca0f00b8df) —
  a section hero that explains what this part of the product is for, then tabs, then filter controls
  with a live `8 events` count. **Taken**: the hero (this section is not the checklist and says so)
  and the count beside the filters, which is how a student knows a filter did something.

## The hard part — one obligation among optional things

- [Kiwi.com — baggage](https://mobbin.com/screens/c94d9419-e7f3-4a6a-98fb-d694a675e835) — the included
  item sits above the list in an emphasised, bordered block reading `✓ Included`; everything below it
  lives under a plain `UPGRADE OPTIONS` header. **Taken**: obligation is expressed by *position and
  a labelled group*, not by a badge alone. A badge can be missed; a band with its own heading cannot.
- [Hers — action items](https://mobbin.com/screens/c0176915-d302-4428-9ffd-a05aa2caf940) — the
  obligation card is an eyebrow, one sentence saying what is required and why, and exactly one
  button. **Taken**: the required band states the requirement and the consequence in prose, and
  offers a single route.

## Organisations

- [Braintrust — spaces](https://mobbin.com/screens/54d07501-2048-4347-a358-075a1d46acde) — icon tile,
  name, a meta line (`Public · 768 members · 0 new posts last week`), description, one action.
  **Taken**: the meta line is where category and latest activity live, so the row answers "is this
  alive?" before it is opened (story AC 2).
- [Reddit — explore](https://mobbin.com/screens/4fc52690-202e-46f9-a698-74e6971759d5) — category
  groups each with their own `Show more`. **Taken**: `Show more` per list rather than pagination, so
  a four-item institution never sees a pager.
- [Discord — discover](https://mobbin.com/screens/c4c78aba-8fd3-48b6-935e-466795dd6923) — a category
  rail with per-category counts. **Rejected**: a second navigation column competes with the portal
  sidebar. The counts idea survives as the count beside the filter chips.

## Empty state

- [Sketch — no upcoming events](https://mobbin.com/sites/sections/adb1dc84-677e-46f8-9602-26c59724b042)
  — keeps the `Upcoming events | Past events` toggle visible, a calendar glyph, `No Upcoming Events`,
  one line of guidance and a **See Past Events** button. **Taken**: the empty state keeps its
  controls and offers the one route that still has content. Our copy goes further than Sketch's
  "check back later" — story AC 7 requires naming *what produces* the content, so it names Aster
  Student Life.

## Detail

- [Luma — event detail panel](https://mobbin.com/screens/35931a97-623c-48d8-9332-ca177d379bc6) — the
  list stays on the left and the detail opens as a right-hand panel: title, the organisation as a
  link, a date block, a location block, then a **boxed `Registration` region** holding the host
  contact and the single register control, then `About Event`. **Taken wholesale** — it is our
  `.task-drawer` with a different middle, and boxing registration is what lets us show *how to
  register* while registration itself stays out of scope.
- [Time2book — booking details](https://mobbin.com/screens/3c2ac842-7d3d-46c7-b950-58c5466fad45) —
  `Upcoming | Past` on the list plus a coloured left border on the object being detailed.
  **Rejected**: the left border reads as a status stripe, and our only status that matters is
  required. Spending it on decoration would weaken the one place it must mean something.

## Rejected for the whole screen

- [Nextdoor — events near you](https://mobbin.com/screens/8dc998e7-59e7-4f3f-b0d7-af88b4e5d939) and
  [Codecademy's card grid](https://mobbin.com/screens/bcc2bfc3-2dbd-4351-864e-00dc550c74e1) — poster
  cards with a `Going / Interested` control. Two problems: the control is attendance, which the epic
  puts out of scope, and a three-column poster grid looks broken at four items and endless at forty.
- [Literal — clubs](https://mobbin.com/screens/b0208dbb-b26f-4e91-ad11-951ba8472a32) — `Your clubs`
  versus `Explore clubs`. **Rejected**: "your clubs" is membership, and club membership management is
  out of scope for [ENR-173](https://audentra.atlassian.net/browse/ENR-173).

---

## Revision, 2026-08-20 — the required band became a strip in the second grid

Direct design feedback, not a Jam: the band was "muito grande, empilhado, nada a ver". Two more
searches, `platform: web`, `mode: deep`.

### The mechanism — a required action that is not a panel

- [PayPal — home with a required-action banner](https://mobbin.com/screens/14c8559c-723a-4e4e-87ec-a19ee816c28e)
  — "To start accepting payments, add more profile info" is **one line** across the top with a
  sub-line and a chevron at the far edge; the detail lives behind it. **Taken**: the obligation is a
  line plus a way in, never a card that restates itself. What we had said `required` three times —
  band heading, `REQUIRED` chip, `Required by …` — before saying anything new.
- [Zendesk — tickets requiring your attention](https://mobbin.com/screens/21ed8fa7-7a85-4eb0-a0da-042f5b531247)
  — the escalated set is a titled list of rows, not a stack of cards. **Taken**: a count in the
  heading and rows underneath.

### The row — date, title, place, one control

- [Circle — events](https://mobbin.com/screens/bbb7b785-2793-4264-9123-5a7a24f8191b) — square date
  tile (`11 OCT`), title, then time and location as small icon-prefixed lines, control at the
  trailing edge. **Taken** for the wide layout, tile and all.
- [Apple — sessions](https://mobbin.com/screens/6d6c10ec-4643-46a8-9437-b6868b474cfb) — title, small
  time and place, a `Details` pill at the right, hairlines and nothing else. **Taken**: no box per
  row; the card holding them is the only box.

### Rejected

- [Navan — group travel](https://mobbin.com/screens/213ba23d-d186-4ae8-b95a-fc3f2b16761b) — a card
  per trip with a photo thumbnail. Heavier than what it replaced, and this section has no imagery.
- [Luma — events](https://mobbin.com/screens/908a181b-4aa7-49bc-bbad-209781d4cd4b) — a bordered card
  per event nested inside a date group. That is the box-in-box the feedback was about.


## The review of 2026-08-21 — rows that act, the emblem, the required block — 2026-08-22

Three searches, web, deep; images examined.

### The event row acts at its edge; following is a light signal

- [Circle — events](https://mobbin.com/screens/bbb7b785-2793-4264-9123-5a7a24f8191b) — date
  tile, title, time and place, and the control (*Going*) at the trailing edge. **Taken**: the
  registration control sits where the RSVP label used to only describe.
- [Nextdoor — events](https://mobbin.com/screens/3d683c37-08d4-41b2-bb44-86342b04b12d) — every
  card offers *Interested?*, a low-commitment signal that is not a registration. **Taken** for the
  register of *Follow* on an event and *I'm interested* on a club.
- [TikTok — LIVE events](https://mobbin.com/screens/7353b6e5-2714-40aa-a7a6-071e1e31899b) — a
  *Register* per card that reads *Registered* once done. **Taken**: a control's label names the act
  and its done state.
- **Rejected**: [Partiful](https://mobbin.com/screens/97fcd777-2cae-4bec-81b5-a03aaebe5436),
  [Luma](https://mobbin.com/screens/1932af9e-e821-4bd7-b13d-fcb0cb3f2524),
  [Posh](https://mobbin.com/screens/3fad44f7-7615-425b-accb-68cd6e60007b),
  [Eventbrite](https://mobbin.com/screens/f5ad607c-4b0e-4f66-95cc-a0deb5c6a515) — photographed
  cards and organizer dashboards; this board has no imagery and is not the student's to manage.

### The club has an emblem, not a face

- [Reddit — explore communities](https://mobbin.com/screens/327711b9-2ecd-4e22-88bc-0b5400c6af1e)
  — emblem, name, one line, *Join* at the edge; categories as chips above. **Taken** for the club
  row's anatomy and for the schools as plain category chips.
- [Braintrust — spaces](https://mobbin.com/screens/54d07501-2048-4347-a358-075a1d46acde) — the
  emblem is a glyph in a tinted tile. **Taken**: the duotone glyph tile, never a photograph.
- **Rejected**: [Nextdoor — groups](https://mobbin.com/screens/2b33c741-7393-4cd4-91b3-15bd9c7b0775)
  (photo thumbnails of things and people), [Whop](https://mobbin.com/screens/b94a6afb-23e1-4dc9-9798-7dc3dd187651)
  (a community hero with a banner).

### The obligation is its own block above the list

- [Lyssna — sessions](https://mobbin.com/screens/a0775aa3-ba76-46fd-a1cb-c4cabc9a1dbb) — the next
  session is a distinct block above the list, a date tile per row and the action at the edge.
  **Taken** for the required block's place and its row.
- **Rejected**: [Pipedrive](https://mobbin.com/screens/106f3df4-33db-468e-bb39-a4f649831c9b),
  [Navan](https://mobbin.com/screens/7cca0d1e-d795-4243-bf2f-c896952612e4),
  [Salesforce](https://mobbin.com/screens/7e43c0ed-2526-464a-b9dd-3188591d59c3) — calendars and
  CRM tables.
