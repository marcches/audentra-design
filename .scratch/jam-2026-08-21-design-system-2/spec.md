Jira: none — design-system feedback, Marco's round two of 2026-08-21 (same morning as the Jam)
Status: in-progress (2026-08-21)
Labels: design-system, persona-student, screen-all
Jam: https://jam.dev/c/b37ab33d-80c8-4208-887f-c61bcb336076 — "depois a gente continua"; Marco's
     remarks during the build are the brief: the shell should hold still between pages, nothing
     should move sideways when a scrollbar appears, the header's controls should be one family,
     labels should not wrap, and the content column wants a review.

# Design system, round two — a shell that holds still

## 1. What this answers

*Why does the screen jump when I change section, and why does nothing in the header look like
anything else in it?* — Marco, 2026-08-21. His words: the content changes but the shell should not;
the content jumps between pages; the page moves sideways when there is a scrollbar; the header's
components have no standard; labels break lines where they should not; review all of it so the
portal is navigable and easy on the eyes.

## 2. Measured first (1440 × 900, after round one)

| What | Where it varies | By how much |
| --- | --- | --- |
| Hero band height | 172 with a one-line lede, 183 with two | 11px |
| Summary panel (`.summary-main`) | 102 on most, 105 Health, 112 Financials (money figure), 114 Appointments (three meta lines) | 12px |
| Alert foot on the panel | 0 / 38 (Classrooms note) / 58 (Financials, Documents strip) | two shapes for one slot |
| Body starts at | 372 … 513 across the routes | 141px of jump, most of it the rows above |
| Topbar controls | preview pill 25px tall, radius 99; points chip 37, radius 12; bell 37; icon button 38 | three heights, two radii, two surfaces |
| Sidebar | the whole `aside` scrolls (`overflow-y: auto`), brand and foot included; at 731px tall the brand scrolled away (Jam, 1:01) | — |
| Sideways shift | `html { scrollbar-gutter: stable }` already landed this morning (c37424a); the ≤620 tab row overflow was fixed in round one | — |
| Labels that wrap | `.task-card-body` third column is a fixed 142px; at 1600 "Upload documents" and "Choose housing plan" wrap to 2–3 lines; `.primary/.secondary-button` have no `white-space` rule | — |
| Browser defaults | no `color-scheme`, no scrollbar styling, no `::selection`, `textarea` not `font: inherit`, `accent-color` set twice locally | — |

## 3. The rules, settled in the grilling and here

1. **The shell holds still.** The band has one height (`--hero-min`), the panel one minimum
   (`--panel-min`), both tokens; what a page *says* changes, where it sits does not. An alert foot on
   the panel is a state and may add its band — but there is one alert shape, not two (content audit).
2. **Nothing moves sideways.** `scrollbar-gutter: stable` on the document and on every scroll
   container; the sidebar's brand and foot are pinned and only the list scrolls.
3. **One family of topbar controls.** One height (`--control-height`), `--radius-tile`, one border,
   one surface: the preview pill, the points chip, the bell and the icon buttons.
4. **Controls never wrap — layout wraps.** Buttons, chips, tabs, nav rows and pills are `nowrap`;
   a row's action column is `auto` with a `min-width`, never a fixed width; headings balance.
5. **Browser defaults are ours.** `color-scheme`, thin scrollbars in a token colour, `::selection`,
   one default focus ring for anything that has none of its own, `accent-color` once, `textarea`
   inheriting type. Each on the styleguide under *Native controls*.
6. **The content column is audited before it is touched** — a list of findings with measurements,
   in §6 below, fixes in a later round unless one-line.

## 4. Work, in commits

- C1 *The shell holds still* — rules 1–3.
- C2 *Controls never wrap* — rule 4, with a wrap scan at 1600 / 1440 / 1280 / 1024 / 820 / 500.
- C3 *Native controls, named* — rule 5, styleguide section.
- C4 *Audit* — rule 6, §6 of this file.

## 5. Done when

- [ ] Every route: hero = `--hero-min` at 1440; panel ≥ `--panel-min`; body top identical on all
      routes without an alert foot
- [ ] Topbar: every control `--control-height` tall, `--radius-tile`, same border and surface
- [ ] Sidebar at 731px tall: brand and profile chip visible, the list scrolls, thin scrollbar
- [ ] Wrap scan: no control label on two lines at any of the six widths
- [ ] Styleguide: *Native controls* block; tokens listed
- [ ] Before/after capture: only the rows above
- [ ] `npm run build` clean

## 6. Content audit — findings

(filled in C4)
