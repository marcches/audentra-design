Jira: ENR-164
Status: ready-for-human
Labels: design, persona-student, screen-my-enrollment, wave-w2
Jam: https://jam.dev/c/14fb7032-828f-4d8f-9c05-7e2ee13abbda — move Momentum points down and put the
     advisor card in its place at the top of the insight column; the support card *is* the advisor.

> Jira status is `Code Review`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-human` is the nearest role. Jira stays authoritative.

# My Enrollment — the advisor takes the top of the insight column

## 1. What this screen answers

What do I do next, and why can I not do this one yet? —
[ENR-145](https://audentra.atlassian.net/browse/ENR-145). This pass changes **who the student sees
first** in the right rail, and nothing else on the screen.

## 2. Layout

`.task-column` is untouched. `.insight-column` reorders:

| Before | After | Why |
| --- | --- | --- |
| 1 `.skipped-card` | 1 `.skipped-card` | Unchanged. The Jam: *"o resto a gente vai deixar exatamente como está"* |
| 2 `.momentum-card` | 2 **`.advisor-card`** (new) | *"a gente vai colocar aquela parte do advisor… no lugar desses momentum points"* — [Lightfield](https://mobbin.com/screens/f1244a10-3103-4ca1-87d6-df5eeef71f46), [Jobber](https://mobbin.com/screens/4950b424-a7a2-47a8-9941-1259d51557a1) |
| 3 `.support-card` | 3 `.momentum-card` | *"esse momentum point fica aqui"* |
| — | removed | *"essa parte sai daqui, que isso aqui é de fato a questão do advisor"* — the support card was the advisor, badly expressed |

Card gap, card width and card radius do not change. The reorder is a DOM move.

### The advisor card

Regions in reading order, from the image the Jam supplied:

1. Eyebrow — `YOUR ENROLLMENT ADVISOR`
2. Avatar + name (`Tomás Okafor`) + owning office (`Admissions Office`)
3. One sentence saying what this person actually does for the student
4. Inset panel: location (`pin` icon) and opening hours (`clock` icon) —
   [Charma](https://mobbin.com/sites/sections/5bf003e4-ce42-46f0-b15a-7fd5a2ca6950)
5. Two buttons at equal weight: **Email** and **Message** —
   [Function](https://mobbin.com/sites/sections/f32b997a-7dfc-43f4-b2ee-bdb43c898373)

## 3. States

- **Default** — advisor present, both routes offered.
- **Tablet (≤1080px)** — `.insight-column` is a two-column grid. `.skipped-card` spans both columns
  so the advisor and the momentum card share row two. Nothing is hidden any more; the old rule hid
  the support card, which would now hide the person the Jam promoted.
- **Narrow (≤820px)** — single column, DOM order, advisor second.
- **Keyboard** — Email and Message are real buttons in tab order; neither opens an overlay, so no
  focus trap is introduced.
- **Reduced motion** — no new animation added.

## 4. Interactions

- **Email** and **Message** both raise a toast naming what would happen in production. Neither sends.
  Choosing a channel is not sending — [ENR-22](https://audentra.atlassian.net/browse/ENR-22) guardrail,
  and [ENR-148](https://audentra.atlassian.net/browse/ENR-148) forbids implying a reply will reach a
  person before an inbound channel exists.
- The card never claims the advisor has read anything or is waiting on the student.

## 5. Data

New export in `src/data.js`:

```js
export const enrollmentAdvisor = {
  name, initials, office,
  intro,                                  // what this person does for the student
  location: { building, where },
  hours: { window, days },
};
```

Keyed to this section on purpose: the Jam says every section has its own advisor, so the advisor is
data, not a literal in the component. Building the per-section switch is **not** in this card.

## 6. Out of scope

From [ENR-145](https://audentra.atlassian.net/browse/ENR-145): defining requirements or prerequisites;
the document decision; payment. Also out, for this card:

- **One advisor per section** (*"my financials tem outro advisor, my campus life tem outro"*). No ENR
  card carries it and it spans four screens. Reported as new scope, not absorbed.
- The nav, the institution name and the section vocabulary — those are
  [ENR-167](https://audentra.atlassian.net/browse/ENR-167), done on the previous branch.

## 7. Done when

- [ ] Insight column reads skipped → advisor → momentum; card gap unchanged
- [ ] The old `.support-card` and `.support-avatars` are gone from markup and stylesheet
- [ ] Advisor card matches the supplied image: eyebrow, avatar, name, office, sentence, inset panel
      with location and hours, two equal buttons
- [ ] Built from tokens and our own icons; `pin` added to `Icon.jsx` at 24×24 / stroke 1.9
- [ ] `npm run build` clean; wide, tablet, narrow and keyboard checked
