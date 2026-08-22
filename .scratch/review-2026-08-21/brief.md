Jira: (no card) — portal-wide foundations from the review of 2026-08-21; touches every design card listed in `ledger.md`
Status: ready-for-agent — this is the triage brief; `/to-spec` turns it into `spec.md`, `/to-tickets` into `issues/`
Labels: design, persona-student, review-2026-08-21, wave-foundations
Jam: (none)
Sources: `sources/decisions-and-conformance.md` C3, C4; `sources/my-financials-changes-audentra.md` §9, §9.0, F16; `ledger.md` §1–2

# Portal-wide foundations — the rules every screen document assumes

## Agent Brief

**Category:** enhancement
**Summary:** Give the portal four things the screen documents all lean on and none of them owns: a
status colour that means the same thing everywhere (C3), one gap between the hero and the first block
(C4), one rule for figures (9.0), and a type scale whose steps each have one job (§9, F16). Everything
lands on the styleguide in the same commit, because the rule is that what is not on the styleguide
does not exist.

**Current behavior:**

- *Status colour.* `StatusPill` has tones `act`, `wait`, `progress`, `done`, `stop`, `quiet`. `act`,
  `wait` and `progress` have no rules of their own and all inherit the base — amber on amber tint — so
  "someone still has to act", "in progress" and "waiting on the institution" look identical. Purple,
  the brand accent, is also read as status on several screens. There is no blue in the palette.
- *Hero gap.* `--hero-gap: 30px` and `--hero-tuck: 20px` exist and `.page-hero + .page-summary` is the
  only tuck selector. The stakeholder read the space between the banner and the first block as wide
  enough "to park my Volkswagen" (C4).
- *Figures.* The reference screen uses exactly two figure treatments — the card figure
  (`--fs-display`, 21px, 700) and the dark card's lead line (`--fs-h2`, 17px, 700) — and one lead
  figure per card. Other screens do not: My Degree's ring percentage and Housing's prices sit at
  `--fs-h4` (13.5, the navigation step); My Financials' coverage figures sit at body size while the
  $500 deposit takes `--fs-figure` (27px). `--fs-figure` is used by financials (next-payment figure,
  balance under 820px), classrooms, rewards and patterns.
- *Type scale.* `--fs-h2` 17 · `--fs-h3` 15 · `--fs-h4` 13.5 · `--fs-body` 12.5 · `--fs-copy` 11.5 ·
  `--fs-meta` 10.5 · `--fs-small` 9.5 · `--fs-micro` 8.5. Measured: section titles are 17/600 and row
  titles 17/400 on the reference screen (F16 — the earlier documents said 400 for sections; 600 is
  current). 15px (`--fs-h3`) is the sidebar brand line's size "and appears nowhere else by design",
  yet `--fs-h3` is used in 28 rules across 11 stylesheets (titles, values, names); 13.5px
  (`--fs-h4`) belongs to navigation and tabs yet carries figures and callouts; `--fs-micro` carries a
  status on at least one screen and 15 rules in housing alone.

**Desired behavior:**

1. **One status vocabulary, coloured once.** The four states the walkthrough named carry a colour
   each and the colour means the same thing on every screen: *not started* (grey), *in progress, or
   waiting on the institution* (blue — a new palette, added to `tokens.css` the way green, amber and
   crimson are: a ramp plus the role aliases), *done* (green), *needs the student* (the escalated
   deadline case; amber/crimson per the existing urgency convention). `StatusPill`'s tones map onto
   these and each has its own rule; purple stays the brand colour and no pill, chip or badge uses it
   to say a state. Other pill-ish shapes (`deadline-chip`, `confidence-chip`, `estimate-chip`,
   `category-chip`, `match-chip`, `required-chip`, `rank-chip`, `GateChip`) are checked: any that
   states a *status* uses the same vocabulary; any that states a category or a quality keeps its own.
2. **One hero gap.** `--hero-gap` is reduced once, in `tokens.css`, and the reduction is judged in the
   browser on the reference screen and on a screen without a summary panel. Nothing per screen.
3. **The figure rule (9.0), as tokens and as prose on the styleguide.** Two treatments only: a card's
   lead figure is `--fs-display` + `--fw-bold`; a dark card's lead line is `--fs-h2` + `--fw-bold`.
   One lead figure per card, and it is the largest number in its card. `--fs-figure` is retired once
   its last users have moved (financials and classrooms move in their own cards; rewards and patterns
   move here). Navigation and brand steps never carry a number.
4. **Each type step has one job, and the styleguide says which.** `--fs-h2`: section titles at
   `--fw-semi`, row titles and block titles at `--fw-regular`, values at `--fw-regular` (student's)
   or `--fw-semi` (institution's); a row title is never heavier than the section above it.
   `--fs-h3` (15px): the sidebar brand line and nothing else — the 28 rules are each re-mapped to the
   step their role calls for (most are titles → `--fs-h2`, values → `--fs-h2` or `--fs-body`,
   prices → `--fs-body`). `--fs-h4` (13.5px): navigation rows and tab labels only. `--fs-micro`:
   footer links and drawer footnotes, never a status (statuses are `--fs-small`). Eyebrows are
   `--fs-small` + `--ls-caps`.
5. **The styleguide shows all of it**: the status colour row with its four meanings; the type scale
   with each step's role and an example at that step; the two figure treatments side by side; the hero
   gap as the token it is.

**Key interfaces:**

- `StatusPill` — tones keep their names; each gains a rule; the styleguide renders all six.
- `tokens.css` — a blue ramp and aliases (`--blue`, `--blue-ink`, `--blue-line`, `--blue-tint`,
  `--blue-soft`, `--blue-wash`, mirroring green); `--hero-gap` value; `--fs-figure` removed at the end.
- The `--fs-h3` re-mapping is a CSS move with no visual intent beyond the step change: **capture every
  route at 1440 and 390 before and after**, per CLAUDE.md "Moving CSS: prove it". The expected diff is
  exactly the font-size changes and nothing else.

**Acceptance criteria:**

- [ ] A computed-style sweep over every route at 1440 finds 15px only on the brand line (the
      sidebar's and the onboarding rail's), and 13.5px on no figure, title, value, name or price —
      it keeps navigation rows, tab labels, the band's lede and a strong lead-in inside running copy,
      which is what the reference screen itself does (measured 2026-08-22: the reference carries
      13.5px on the nav, the lede and the ring, and 15px on the brand and the advisor's name — the
      advisor's name moves to `--fs-h2`). Under 620px a row title may step down to 15px. The
      styleguide's own chrome (`#/styleguide` headings) is documentation, not product, and is outside
      the sweep.
- [ ] Across the portal exactly two figure treatments exist; no card has two lead figures; no lead
      figure is smaller than another number in the same card; `--fs-figure` is not referenced.
- [ ] `StatusPill` renders four visually distinct state colours, and no status anywhere is purple.
- [ ] No status renders at `--fs-micro`.
- [ ] `--hero-gap` changed once, in `tokens.css`; no per-screen margin was added to compensate.
- [ ] Section titles are `--fs-h2`/`--fw-semi`, row titles `--fs-h2`/`--fw-regular`, on every screen.
- [ ] The styleguide page shows the status colours, the type roles, the figure treatments and the gap,
      with values read off the live cascade.
- [ ] `npm run build` passes; the before/after capture diff contains only the intended size and colour
      changes.

**Out of scope:**

- Per-screen hierarchy fixes that need content changes first (F11–F14, 9.2, 9.4, C5–C8, C11.3) — each
  screen's own card does those on top of this.
- The Edward door and escalation prompt (ENR-181).
- The category label rename (ENR-164).

**Domain:** none of this names an office, a deadline or a step. The status vocabulary's *words* (not
started · in progress / waiting on the institution · done · needs you) are the checklist's; read
`docs/domain/us-enrollment.md` and `docs/domain/aster.md` (being written 2026-08-22) before choosing
any label, and keep the words the checklist already uses.

**Blocked by:** nothing. Blocks every screen card in `ledger.md` §6.

## Done — 2026-08-22

Built in the triage session, straight from this brief (Marco: "implementa agora direto"). What
landed, and the proof:

- **Status colour.** A blue ramp and its six role aliases in `tokens.css`; `StatusPill` tones `wait`
  and `progress` take blue-ink on blue-tint (the pulse is `currentColor` — it was a raw hex);
  My Degree's `requirement-status.in-progress` stops being purple. `act` stays amber, `done` green,
  `stop` crimson, `quiet` grey. The styleguide's pill note states the four meanings. Category chips,
  selection chips and the student's own *planned* marker keep purple: they are not states of the
  institution's process.
- **Hero gap.** `--hero-gap` is `--space-10` (22px), from 30. One token; `PageSkeleton` followed
  because it reads the same token.
- **Figure rule.** `--fs-figure` (27px) is gone; `--fs-title` (27px) names what the only remaining
  users were — a drawer's or a modal's title, and the h1 under 620px. The panel's money figure, the
  rewards balance, My Degree's counts figure and the ring's percentage are `--fs-display` bold; the
  next-payment figure in the financials anchor card is the dark card's lead, `--fs-h2` bold.
- **Type roles.** Re-documented in `tokens.css` and the styleguide's type table (15px = the brand
  line; 13.5px = navigation, tab labels, the band's lede, a lead-in — never a figure, a title, a
  value or a price; `--fs-h2` carries section (semi), row/value (regular) and lead (bold)). 45 rules
  re-mapped by an anchored script (`scratchpad/remap-1a.json`, every anchor reported): the advisor's
  name, row titles on Campus Life, Housing, Profile, Financials' aid rows, the skipped-card and
  how-panel titles, Housing's callout and prices, Profile's values (400 student-owned / 600
  institution-owned), the org tile's initials, the two small chips that carried a state at
  `--fs-micro`, the documents panel's headings, the onboarding rail's greeting. Responsive steps
  inside media queries and the styleguide's own chrome were left alone by design.
- **Proof.** Baseline captured twice (16,428 elements × 2 widths × 13 routes; the only flake is the
  styleguide's icon boxes and the Profile route's `y` on one run), then after: 10,700 changed —
  9,696 pure y-shifts from the gap, 982 style diffs that are exactly font-size / weight / leading /
  tracking on the re-mapped selectors plus the hero margins, 22 "other" that are the pill and pulse
  colours. No property changed that this brief did not name. `npm run build` passes.
- **Left for the cards that own them** (the 13.5px census at 1440 after the change): `.group-heading`
  on Events (ENR-189 C3 removes it), the cost table's amounts on Financials (ENR-166 F13), and the
  four lead-ins inside running copy (`pay-cta`, `edward-title`, `ask-route`, `document-body`) which
  the rule allows.
