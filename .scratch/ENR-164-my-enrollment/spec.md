Jira: ENR-164
Status: ready-for-human
Labels: design, persona-student, screen-my-enrollment, wave-w2
Jam: https://jam.dev/c/14fb7032-828f-4d8f-9c05-7e2ee13abbda — move Momentum points down and put the
     advisor card in its place at the top of the insight column; the support card *is* the advisor.
Jam: https://jam.dev/c/04f3bcd2-8bbb-42e9-b13c-72edbee1e0ce — take the Momentum points pill out of the
     progress panel and put a reduced Your enrollment advisor in its place; inside the rail, Momentum
     goes on top and the saved-from-welcome card below.
Jam: https://jam.dev/c/dce61b7f-4665-4363-a24f-d07e5ef4994d — Laura, 2026-08-21: collapse *Aster is
     reviewing* and *Coming up later* like *steps completed*; a photo for "MJ"; the loading state
     must read as loading; the error red and centred. Built as a design-system pass:
     `.scratch/jam-2026-08-21-my-enrollment/`.

> Jira status is `Code Review`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-human` is the nearest role. Jira stays authoritative.

# My Enrollment — the advisor takes the top of the screen

## 1. What this screen answers

What do I do next, and why can I not do this one yet? —
[ENR-145](https://audentra.atlassian.net/browse/ENR-145). Two passes of Jam feedback changed **who
the student sees first**. The first pass promoted the advisor above the metrics inside the right
rail. The second pass promoted the advisor out of the rail entirely: it now sits beside the
enrollment progress, in the strip the Momentum points pill used to own.

## 2. Layout

### Pass 2 — the progress panel

| Before | After | Why |
| --- | --- | --- |
| `.progress-summary` + `.points-summary` pill | `.progress-summary` + **`.advisor-bar`** | *"esses momentum points… eles precisam sair daqui"* / *"colocar 'your enrollment advisor' no lugar dele"* — [Deputy](https://mobbin.com/screens/c072adb4-98d0-461d-b441-f7c418391f44), [Jobber](https://mobbin.com/screens/4950b424-a7a2-47a8-9941-1259d51557a1) |

The panel keeps its geometry — ring, label, `5 of 12 steps complete`, the one-line reassurance. Only
the right-hand slot changes tenant. Nothing about points is lost: the balance, the level track and
the `+323 available today` figure all already live in `.momentum-card`, which is now the first thing
in the rail.

### Pass 2 — the insight column

| Before | After | Why |
| --- | --- | --- |
| 1 `.skipped-card` | 1 **`.momentum-card`** | *"nós vamos colocar o momentum points em cima"* — [Uxcel](https://mobbin.com/screens/7c84c45e-ae5a-449c-be39-306cead79fa7), [adidas](https://mobbin.com/screens/4d212b3a-f54e-46dd-8041-51cfc643c7b1) |
| 2 `.advisor-card` | — moved to `.advisor-bar` | *"tem que organizar o design e o layout desse cartão… pra ele ficar bem aqui em cima"* |
| 3 `.momentum-card` | 2 `.skipped-card` | *"esse cartão todo aqui, ele vai ficar embaixo"* |

Card gap, card width and card radius do not change.

### The advisor bar

The card is **reduced**, not transplanted whole. Regions, left to right:

1. Avatar (`.advisor-avatar`, reused from the card)
2. Eyebrow — `YOUR ENROLLMENT ADVISOR`
3. Name (`Tomás Okafor`) · owning office (`Admissions Office`)
4. One meta line: location (`pin`) and opening hours (`clock`) —
   [Preply](https://mobbin.com/screens/28954c6b-49e0-4a22-bf18-bccafd84bedc)
5. Two buttons at equal weight: **Email** and **Message** —
   [Zoom](https://mobbin.com/screens/cbec6c9d-3d1f-4623-92da-09a58940f097)

**Dropped:** the `intro` sentence (*"We're here to help. Tomás holds your file…"*). The Jam struck it
through on screen — *"talvez não precise desse texto aqui"*. `enrollmentAdvisor.intro` stays in
`src/data.js`; the drawer or a future advisor page can still use it.

## 3. States

- **Default** — advisor present beside the progress ring, both routes offered.
- **Wide (>1060px)** — one row: progress summary left, advisor bar right. The summary takes the slack
  (`flex: 1 1 auto`) so the bar hugs its own content instead of stretching.
- **Squeezed row (~820–1060px)** — `.progress-panel` wraps; the advisor bar drops to its own line
  under the summary and the meta line wraps to two lines. No horizontal overflow at any width.
- **Tablet (≤1060px)** — `.insight-column` is a two-column grid. With two cards left, they share one
  row: momentum first, saved-from-welcome second. The old `grid-column: 1 / -1` span is gone — with
  three cards it filled the row, with two it would have left a hole.
- **Narrow (≤620px)** — the panel stacks; the advisor bar goes full width and wraps internally:
  avatar + identity on one row, Email and Message full width beneath. Verified down to 380px.
- **Keyboard** — Email and Message are real buttons in tab order, labelled `Email Tomás Okafor` /
  `Message Tomás Okafor` so they carry their subject out of context. Neither opens an overlay.
- **Reduced motion** — no new animation added.

## 4. Interactions

- **Email** and **Message** both raise a toast naming what would happen in production. Neither sends.
  Choosing a channel is not sending — [ENR-22](https://audentra.atlassian.net/browse/ENR-22) guardrail,
  and [ENR-148](https://audentra.atlassian.net/browse/ENR-148) forbids implying a reply will reach a
  person before an inbound channel exists.
- The bar never claims the advisor has read anything or is waiting on the student.
- The points modal loses one of its two entry points when the pill goes. It is still reachable from
  **How points work** in `.momentum-card` and from the task drawer.

## 5. Data

`src/data.js` is unchanged. `AdvisorBar` reads `enrollmentAdvisor` directly — same export the rail
card read:

```js
export const enrollmentAdvisor = {
  name, initials, office,
  intro,                                  // no longer rendered on this screen
  location: { building, where },
  hours: { window, days },
};
```

## 6. Out of scope

From [ENR-145](https://audentra.atlassian.net/browse/ENR-145): defining requirements or prerequisites;
the document decision; payment. Also out, for this card:

- **One advisor per section** (*"my financials tem outro advisor, my campus life tem outro"*). No ENR
  card carries it and it spans four screens. Reported as new scope, not absorbed.
- The nav, the institution name and the section vocabulary — those are
  [ENR-167](https://audentra.atlassian.net/browse/ENR-167).
- Re-homing `intro` somewhere else. The Jam asked to drop it here, not to place it elsewhere.

## 7. Done when

- [x] The Momentum points pill is gone from `.progress-panel`, in markup and stylesheet
- [x] A reduced advisor sits in its place: avatar, eyebrow, name · office, location and hours, two
      equal buttons — no intro paragraph
- [x] Insight column reads momentum → saved-from-welcome; card gap unchanged
- [x] `.advisor-card`, `.advisor-identity` and `.advisor-availability` are gone from markup and
      stylesheet; `.advisor-avatar` and `.advisor-actions` moved to the bar
- [x] Built from tokens and our own icons, no new dependency
- [x] `npm run build` clean; checked at 1600, 1440, 1000, 600 and 380px
- [x] Email and Message keep raising their toast; `Esc` still closes the points modal
