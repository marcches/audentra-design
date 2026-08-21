Jira: none — design-system feedback, Marco's round two of 2026-08-21 (same morning as the Jam)
Status: built (2026-08-21) — §6 is the next round’s list
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

- [x] Every route: hero = `--hero-min` at 1440 (184 on all 14 routes; 220 on all at ≤620); panel body
      ≥ `--panel-min` (114–129 — the figure copy still decides the last 15px; the Notice commit
      reserves two lines in it); body top 416–527 (was 372–513), the rest is the conditional foot
- [x] Topbar: every control `--control-height` tall, `--radius-tile`, same border and surface (DOM: 38/38/38, radius 12, one border, one surface)
- [x] Sidebar at 731px tall: brand and profile chip visible, the list scrolls, thin scrollbar (brand top 28, chip bottom 713, nav 542 in 466)
- [x] Wrap scan at 1600 / 1280 / 820 / 500: no control label on two lines; no horizontal overflow on any route (what wraps is the description text inside row buttons, which is content)
- [x] Styleguide: *Native controls* block (`#sg-native`: checkbox/radio, textarea + selection + ring,
      the thin scrollbar); tokens listed under Layout constants and The browser’s furniture
- [x] Before/after: measured per route at 1440, 620 and 500 (twice each, zero flake); the full
      element capture was not re-run for this round because the Notice commit rewrote the same
      slots in parallel — the per-route numbers above are the evidence
- [x] `npm run build` clean (after each commit)

## 6. Content audit — findings (1440 × 900, read off the DOM and the CSS, 2026-08-21)

What varies between sections when it should not, ranked by how much a student would notice. The
first two are being fixed today (one by this round, one by the Notice commit running beside it);
the rest are the next round's list.

1. **Where the body starts** — 372 … 513 px across the routes. Causes, in order: the alert foot on
   the summary panel (0 / 38 / 58, two shapes for one slot); the panel body (102–114); the band
   (172 / 183). Fix in flight: `--hero-min`, `--panel-min` (this round) and one `Notice` docked as the
   panel's foot (the Notice commit). What will still vary, by design, is whether a section has a
   foot at all.
2. **The notice slot had nine anatomies** — `.gate-notice`, `.alert-strip`, `.record-note`,
   `.required-strip`, a `StateCard`, `.advisory-banner`, `.step-notice`, `.edward-notice`,
   `.summary-note`. Being replaced by `Notice.jsx` (the other session, same morning).
3. **Status-icon tones live in feature files**: `.status-icon.docs` in financials.css (used by My
   Documents and the styleguide), `.act/.stop` in health.css, `.record/.private/.signpost` in
   profile.css, `.guide` in navigation.css, `.requirement/.advisory` in classrooms.css,
   `.ask/.calm/.done` in onboarding.css. Twelve tones, six files, one vocabulary — they belong in
   patterns.css under the card head, listed on the styleguide, or the list shrinks.
4. **`.topbar-chip`, `.bell-count`, the notification pop** are defined in housing.css — shell
   elements in a feature file. Move to chrome.css (prove it with the capture).
5. **The summary panel's figure cell has four markups** — `SummaryFigure` (most), `next-appointment`
   (Appointments), `request-standing` + a `primary-button` (Help), `summary-figure.money` — and the
   money one is 30px tall where the others are 23. `SummaryFigure` already exists; Appointments and
   Help should use it or it should grow a `kind`.
6. **Rail cards**: every rail opens with `AnchorCard`, but the second card is `.provenance-card`,
   `.keeping-card`, `.teams-card`, `.session-card`, `.offices-card` — one shape (`Card` kind="card")
   would do. Low visual cost, high drift cost.
7. **First block of the main column** — a `status-heading` card on most pages, a bare
   `section-heading` on some lists, a `RecordCard` with a banded head on Health. Acceptable as long
   as each is one of the three `CardHead` kinds; audit after the Notice commit lands.
8. **Tables (Financials ledger)**: `th` and `td` wrap at 1440 (`Housing — Assumes a standard double
   room`, `Estimate`); the ledger wants a `min-width` on the label column or a stacked row under
   1060.
9. **Concept-preview menu, Edward launcher and the toast** each carry their own z-index and radius
   literals — to tokens (`--z-*` exists).

## 7. Verification so far

- Topbar at 1440: preview pill, points chip, bell, icon button all 38 × `--radius-tile`, same border
  and surface (DOM check).
- Sidebar at 1440 × 731: brand top at 28, profile chip bottom at 713 (visible), `.main-nav` scrolls
  (542 in 466) with a 10px thin scrollbar; `overflow: hidden` on the `aside`.
- `html`: `scrollbar-color` thumb `#d9dbe6`, `scrollbar-width: thin`, `color-scheme: light`,
  `scrollbar-gutter: stable`.
- Build clean after every commit.
