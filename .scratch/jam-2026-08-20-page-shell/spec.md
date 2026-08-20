Jira: none yet — cross-cutting, no open card owns it. See "Where this belongs" below.
Status: ready-for-human
Labels: design, persona-student, wave-w2
Jam: https://jam.dev/c/86811070-3762-4992-9ca4-08b488c21fbd — My Enrollment is the construction we
     want; My Classrooms and My Financials are not following it; My Campus Life is the wrong colour;
     remove the Dashboard and My Progress; the balance panel sits on top of the alert strip.

# One page shell for every section

## 1. What this answers

*Why does this feel like two products?* — Laura Barcellos, Jam of 2026-08-20. Four separate remarks
with one cause: `PageShell` owned only the top and the bottom of a page, so everything between the
head and the footer was invented once per section.

## 2. The page anatomy

Five slots, fixed order, owned by `PageShell` — a page passes slots, never markup sequence.

| Slot | Holds | On which sections |
| --- | --- | --- |
| `hero` | The purple band: mono eyebrow, one sentence, the section's icon | all twelve |
| `summary` | The section's one figure + the person who owns it; tucks into the band | Enrollment, Classrooms, all Financials |
| `alert` | An escalation, on the **foot of the summary panel** — not a sixth slot | Financials |
| `notice` | A caveat true of the whole section | Classrooms (provenance), Campus (required band) |
| `tabs` | `<GroupTabs>` — which leaf of the group | Financials, Campus |
| `rail` | The insight column; `PageShell` renders the `<aside>` | all but the placeholders |

Everything above `tabs` is true of the whole group; everything below is what the tab switches.

## 3. The three defects, and why each fix is structural

| Defect | Fix |
| --- | --- |
| Balance panel sat **on top of** the alert strip, and 22px narrower than it | The tuck moved from `.page-summary` to `.page-hero + .page-summary`. The shell renders the summary directly after the band, so the selector matches exactly when the overlap is meant. |
| Two competing left edges — band/tabs/cards at one x, the panel 22px in | `--band-outdent`: the band steps out past the page column and becomes the frame; everything else shares one column. The band's padding is `--panel-pad + --band-outdent`, so its text lands on the panel's text edge by construction. |
| The escalation was another band stacked into the page | It is a footnote to the figure it qualifies, so it rides on the panel's foot behind a hairline. |

## 4. Hierarchy

The band greets; the summary informs. The greeting was `clamp(29px,3.25vw,45px)` above a 15px
standing — three to one, the wrong way round. Now 34px max against a 21px figure (34px for money).
The band's eyebrow is Geist **Mono**, tracked — the institutional register, and already loaded.

## 5. Construction

Three planes: canvas, card, ink anchor. No fourth. Every block of the main column is a card; a list
inside it is `.card-rows` — no background, border, shadow or radius of its own, separated by a
hairline, running out to the card's edges so the first and last rows take the corner they touch.
`--card-pad` and `--card-radius` are published by the card so a row never hard-codes either.

Full contract: `docs/agents/design-workflow.md` §4.

## 6. Removed

- **Dashboard** — crossed out in the Jam. Page, destination, `SHORTCUTS`, shortcut CSS and Edward's
  question bucket all gone; `DEFAULT_ROUTE` is `#/my-enrollment`.
- **My Progress** — *"my progress not here"*. Gone with the Academic group, which held one leaf
  after it; My Classrooms is a top-level destination now. **This diverges from ENR-174 AC1**, which
  names both leaves under Academic. The divergence is the Jam's, recorded here.
- **Green as a section identity** — eleven Campus Life accents retinted. Green now means only
  covered / satisfied / done.
- `SectionTabs`, `BalanceMini` (the balance is one panel across all three leaves now), `.page-head`,
  `.well`.

## 7. Out of scope

The five unbuilt sections keep their placeholders — they gain the band and nothing else. ENR-165,
ENR-182, ENR-183 and ENR-184 build the pages behind them.

## 8. Done when

- [x] Every destination opens with the same band; nothing renders `.page-head`
- [x] Balance panel below, never on top of, the escalation — at 1600 / 820 / 620
- [x] One left edge for the panel, tabs and cards on all fourteen routes
- [x] Every list is `.card-rows`, flush to its card; no square row on a rounded edge
- [x] Campus Life reads purple; green survives only as status
- [x] `#/dashboard` and `#/my-progress` fall through to the 404, which offers My Enrollment
- [x] loading / empty / error / partial still render a band on every section
- [x] Anchor-card text ≥ 4.5:1 on ink
- [x] `npm run build` clean

## Where this belongs

No open card owns it: ENR-166 and ENR-188 each own one screen, and ENR-180's *"one item leaves the
navigation entirely"* describes a different item. It wants **one new `ENR` task, "Student · One page
shell for every section"**, serving ENR-174 AC5 and AC7 and carrying the AC1 divergence. Rename this
directory to `ENR-<n>-page-shell` when the card is opened.
