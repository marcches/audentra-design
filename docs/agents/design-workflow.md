# Design workflow — from an ENR card to shipped UI

The loop this repo runs on. Every screen is built the same way, so the output is predictable even
when the card, the persona and the screen change.

```
ENR card ──▶ Mobbin research ──▶ spec ──▶ build ──▶ verify ──▶ Jam feedback ──▶ commit
   Jira        mcp__mobbin        .scratch    src/     build + eyes    on demand      ENR-<n>:
```

---

## 1. Read the card (always first)

`mcp__plugin_atlassian_atlassian__getJiraIssue` — see `docs/agents/issue-tracker.md` for the
coordinates. Extract, verbatim, into the spec:

- **Question it answers** — the user's question this screen exists to answer.
- **Objective** and **Closes when** — the acceptance bar.
- **Out of scope** — do not build these. Not "build them smaller".
- **Guardrails** — invariants. A design that violates one is wrong even if it looks better.

If the card is an `Épico`, the deliverable is usually a set of tickets under `issues/`, not one screen.

## 2. Mobbin research — mandatory, never skipped

**No screen gets designed from imagination.** Before writing JSX, search Mobbin and record what you
found. This is the step that keeps quality consistent across cards.

| Tool | Use it for |
| --- | --- |
| `mcp__mobbin__search_screens` | A single screen: "staff task board with blocker reason and owner chips" |
| `mcp__mobbin__search_flows` | A multi-step path: sign in, onboarding, upload-and-review |
| `mcp__mobbin__search_sections` | One region: empty state, filter bar, side sheet, pricing table |

Rules:

- `platform: "web"` for the staff workspace and the student portal. Use `ios` only when the card says mobile.
- `mode: "deep"` by default. One screen, one intent per query — split multi-part questions into
  separate searches.
- **Look at the returned images.** Metadata alone is not research.
- Run **at least 2 searches** per screen: one for the overall layout, one for the hard part (the
  blocker state, the permission-denied field, the empty state — whatever the card's `Guardrails` make risky).

Record the result in `.scratch/ENR-<n>-<slug>/references.md`:

```markdown
# References — ENR-21 Task board

## Layout
- [Linear — inbox triage](mobbin_url) — two-pane list + detail; we take the density and the row grouping.
- [Height — task list](mobbin_url) — blocker chip lives on the row, not in the detail. We take this.

## Rejected
- [Asana — board](mobbin_url) — kanban columns hide the blocker holder. Card guardrail says status is
  position and outcome is result; a column-only view can't express that.
```

Always cite the `mobbin_url` as a markdown link — for the file and when reporting to the user.

## 3. Spec

`.scratch/ENR-<n>-<slug>/spec.md`, front matter as in `docs/agents/issue-tracker.md`. Body:

1. **What this screen answers** — one sentence, from the card.
2. **Layout** — regions, in reading order, each with the Mobbin reference it came from.
3. **States** — loading, empty, error, permission-denied, and every state the `Guardrails` imply.
4. **Interactions** — what each control does and what it must never do.
5. **Data** — which fields of the section’s `data.js` (or a new shape) it reads.
6. **Out of scope** — copied from the card.
7. **Done when** — the card's `Closes when`, made checkable.

## 4. The page anatomy — five slots, one order

Every section is the same page with different content in it. `PageShell` owns the order; a page
passes slots, never markup sequence, so it cannot arrange them wrongly.

```
<PageShell destination={…} hero={…} summary={…} notice={…} tabs={…} rail={…}>
  main content
</PageShell>
```

| Slot | What belongs in it | Always? |
| --- | --- | --- |
| `hero` | The purple band. Eyebrow (mono — who owns this record, as of when), one sentence, the section's icon. Copy lives in `navigation.js`; a page overrides only what it must compute. | Always |
| `summary` | **The section's one figure, and the person who owns the subject.** The progress ring, the balance, the degree count — plus the advisor. Tucks into the band. In a group it is the *group's* figure, filled by the group shell. | Four sections only — see below |
| `notice` | **One `<Notice>`, true of the whole section.** The shell docks it: to the foot of the summary panel when there is one, and to a single line above the tab row when there is not. In a group, it is true of every leaf or it does not belong here. | When there is one |
| `tabs` | `<GroupTabs>` — which leaf of the group you are reading. | Groups with 2+ built leaves |
| `rail` | The insight column. `PageShell` renders the `<aside>`; rail components must not carry their own. | When the section has one |

Two rules make the order non-negotiable:

- **Everything above `tabs` is true of the whole group; everything below is what the tab switches.**
  The balance sits above the tabs because it is the same number on all three financials leaves. A
  required session sits above them because an obligation must not hide behind a tab nobody opened
  (ENR-189).
- **The tuck is adjacency, not decoration.** `.page-hero + .page-summary` is the only selector that
  overlaps them. Written on the panel instead, it followed the panel everywhere — which is how the
  balance ended up sitting on top of the escalation strip on My Financials (Jam, 2026-08-20).

### The band and the panel are the same height on every route

Two sections side by side may differ in everything below the tab row and in nothing above it. A
student moving between them should see the content change, not the page resize under them — and
before the Jam of 2026-08-21 they did resize, because the copy decided the height:

- the band was as tall as its lede, so My Documents (one line) was shorter than My Classrooms (two);
- the panel was as tall as the line under its figure, and a section that passed none had no line at
  all — 123px on three sections, 137 on one, 139 on another.

So the space is reserved rather than measured. `--hero-min` and `--panel-min` are the floors, and
above them **the copy slots reserve their lines whether or not the copy fills them**: `.hero-lede`
reserves two lines (three below 820px, where the motif and the window squeeze it), and the line under
the figure reserves two. Both elements are rendered even when empty, so the box exists either way.

Two consequences for copy, and they are the point:

- **A lede that needs a third line is too long.** Shorten it in `navigation.js`. Do not let the band
  grow — that puts one section's word count in charge of every other section's layout.
- **A section with nothing to say under its figure says nothing, and keeps the space.** An empty
  second line is not a defect. A page that jumps when you navigate to it is.

### A group is one screen, so the group owns everything above the tabs

`PageShell` owns the *order* of the slots, so a page cannot arrange them wrongly. It cannot own their
*content* — and when a group's leaves are separate files, each one remembers the group's standing
separately and they drift. On My Financials the escalation strip lived in `OverviewPage` alone,
so opening Financial aid made a 13-day deadline disappear; in the empty state Overview showed the
balance panel and the other two showed none, so the panel blinked in and out along the tab row. Three
files had been treated as three screens. They are one screen read three ways.

**A group whose leaves are more than one file gets a group shell** — a component between the leaf and
`PageShell` that fills `hero`, `summary`, `notice` and `tabs` once. `FinancialsPage` is the reference:
a leaf passes only `children` and `rail`, so it *cannot* differ above the tab row, because it is
never asked. A group whose leaves are one component with a tab switch — My Campus Life — already has
this property and needs no shell.

The check, on any group: open each leaf and confirm the band, the summary, the notice and the tab row
are pixel-identical, **in every preview state**, including the empty and partial ones. The rail and
the main column are below the tabs and are what the tab switches, so those may and should differ.

### Most sections do not get a summary panel

Four do: My Enrollment, My Documents, My Classrooms, My Financials. The test is
that **both cells are true of the section** — a figure that is its standing, and a
person who owns the subject. Nine sections had a panel before the Jam of
2026-08-21 and five of them failed it:

| Section | Why it lost the panel |
| --- | --- |
| Appointments | `Fri 12 Sep · 10:00` is the first row of `Your conversations` below it, and the person beside it is the person in that row. |
| My Housing | the figure was the plan she chose, which is what `PlanPanel` is. |
| Health | the figure, the label and the line were `RecordCard`'s heading, state chip and gate chip — the only card on the page. |
| My Profile | `12 of 20 details are yours` is a legend, not a standing: nothing in it moves and nothing in it is pending. |
| Help | ENR-177 AC 3 forbids this screen to name a person, so its right cell held a button instead. A section that cannot fill the second cell does not have a panel. |

**A panel summarises a page of things. Where the page *is* the one thing, the
panel is that thing read twice** — and it costs the top of every screen to say
it. When a panel goes, its content does not: it moves to the thing it was
describing. The open-request count and `Ask an office` are the head of `Your
requests`; the ownership count leads My Profile's legend; the rest was already
below.

### The summary panel: two cells, one height

`summary` is two cells and only two — **the figure, and the advisor** — and they are the same height
by construction, not by luck. `.summary-main` is a grid, not a wrapping flex, and it is
`align-items: stretch`: two columns while the panel is wider than 940px, one full-width column each
below it, measured by a container query on the panel itself because the sections that carry a rail
are narrow at a wide window.

What it replaced: five sections had each invented their own left cell — `.progress-summary`,
`.balance-summary`, `.next-appointment`, `.profile-standing` — four names, two internal structures,
and one of them (`.balance-panel .balance-summary`) addressed a class present in no JSX file, so the
balance cell ran with no layout rules and no `min-width: 0` at all. The panel came out 123px tall on
three sections, 137 on one and 139 on another, and below about 1200px the two cells wrapped without
either being told to fill the row, leaving the advisor as a 576px box with 150px of dead space
beside it.

- **The figure cell is `SummaryFigure`**: an optional mark (ring, avatar, or nothing), the label, the
  figure, and at most **one** line under it, which is given two lines' worth of room and always
  drawn. Never a second element — see below.
- **The advisor is `AdvisorBar`, identical on every section**: the label, the name and office on one
  line, and two icon buttons. It is sized by the figure cell beside it, and 61px pays for two lines
  of copy and one row of controls, which is why the controls are icons and why the building and the
  office hours are not in it. A section that shows more or less here is drift.
- **Anything that qualifies the figure goes to the foot**, which is the `notice` slot — one
  `<Notice>`, docked there by the shell. As a fourth line inside the figure cell, My Classrooms'
  credit-match caveat made its panel 139px against everyone else's 123 and pushed the advisor
  off-centre beside it.

The check: on every section that has this slot, the two cells report the same height, the advisor bar
reports the same height and width on all of them, **and `.summary-main` reports the same height on
all four sections**. It is fixed by construction, not by the copy happening to be the same length:
the label is one line, the figure is centred in a line the height of the money figure whatever size
it is, and the line under it reserves two lines and is drawn even when a section passes nothing into
it. Measured on 2026-08-21 before that rule, the panels were 119, 119, 119 and 129.

### Hierarchy

The band greets; the summary informs. **The greeting must never be larger than the figure it
introduces.** That inversion — a 45px "Let's make the year add up, Maya." above a 15px "2 of 11
requirements met" — is what made the portal read as decorated rather than built. The scale is:

| Role | Size |
| --- | --- |
| Band eyebrow (Geist **Mono**, tracked .13em) | 10.5px |
| Band headline | `clamp(25px, 2.5vw, 34px)` |
| Band lede (`text-wrap: pretty`) | 13.5px |
| **The section's figure** | 21px, or 34px when it is money |

### How a section's content is built

Three planes and no more: the **canvas** a page sits on, a **card** raised off it, and the **ink**
anchor at the top of the rail. There is deliberately no fourth — no sunken panel, no card inside a
card. A box inside a box is what made most of the portal read as stacked rather than built.

- **Every block of the main column is a card** (`.section-card`, or one of My Financials' named
  variants). Nothing sits loose on the canvas.
- **Content wears the tile, the head wears the glyph.** A row's mark — a task's kind, a guide, a
  document — is `.task-type-icon`: a 40px tinted tile with a duotone glyph. A head's mark is never
  that tile, and a row's mark is never the bare glyph; borrowing `.status-icon` for a row (Help's
  guides and My Financials' documents did) is the tell.
- **A list inside a card is `.card-rows`.** The rows give up their own background, border, shadow
  and radius, and live on the card's white; a hairline and the type do the separating. Reach for a
  tint or a second surface only when the content is genuinely one level in, as the courses inside a
  requirement are.
- **Rows run out to the card's own edges**, so the hairlines span the whole card and the first and
  last rows take the corner they touch. A square row meeting a rounded card is the tell that a
  component was built without looking at the one holding it. The card publishes `--card-pad` and
  `--card-radius` for exactly this; a row must never hard-code either.
- **A card has three zones and they are visible.** The head — `.status-heading` or `.card-heading`,
  one anatomy for every card in the product — opens with a **bare outline glyph** in its tone
  (never a tile: a tinted tile is the content's shape, and a head that wears it repeats what every
  row under it wears), and is a band: `--card-zone`, the card's own paper one
  shade down, run out to the card's edges and closed with a hairline, taking the top corners the way
  `.card-rows` takes the bottom ones. Content sits on the white below it. A note or control that
  *closes* a card is `.card-foot`, the same band at the other end. Nothing else in a card is tinted.
  This is not a fourth plane: no zone floats, none has a radius of its own, and the card is still one
  surface — it just stops being one white rectangle in which head, content and foot look identical
  (Marco, 2026-08-20: *"não sei diferenciar o que é header, o que é content, o que é footer"*).
- **The rail leads with one `.anchor-card`** — the section's key secondary figure, on ink — then
  light cards. What a card looks like on ink is written once, under `.anchor-card`.
- Markers survive flattening only when they carry meaning: the crimson date tile and chip on a
  required session, the ribbon on the one step to do next.
- **Never mark a rounded element by painting one of its edges.** A 3px accent down the left of a card
  or a row is a rule bar wearing a card's corners — the two shapes fight, and it is the cheapest
  possible way to say "this one matters". Say it in the element's own ink instead: tint the tile,
  tint the chip, tint the whole ring if it has to be the frame. A left bar is only ever correct on
  something square on that side, the way `.rule-card` is.

### Hierarchy inside a card

Flattening the *construction* is not permission to flatten the *content*. A card whose rows all carry
the same weight, the same pill and the same grey sentence is a wall of text with hairlines in it: the
student has to read all twelve rows to find the one that matters. The three planes decide how a card
is built; these four decide how it is read.

- **One anchor per row, and it is the answer.** The label is small and muted above the value; the
  value carries the size and the weight. Two dark elements in a row means no hierarchy in that row —
  the eye should be able to run down the column of values and never read a label.
- **Mark the exception, never the rule.** A tag on eight rows out of twelve is texture, not
  information. Label the *run* once — "Yours to change", then "Aster's record" — and let the boundary
  between the runs carry the distinction. Then a tag left on a row means something, because it is
  rare.
- **Rhythm comes from meaning, not from a template.** A helper line belongs on a row where it changes
  what the student does — what a change costs, what expires tonight, what the law needs. Delete it
  everywhere else. Rows that ask something then stand taller than rows that only state a fact, and
  that difference in height is free hierarchy.
- **Spend colour once per card, on the row that is asking.** A faint amber wash on the field waiting
  for a code is worth more than any amount of tinting spread evenly. If two rows are washed, both had
  better be waiting; if every row is washed, the card is decorated again.

The same test applies to a set of cards: three identical purple heading tiles on three cards doing
three different jobs makes the page one long list. The card that holds the section's content, the one
that holds something sensitive and the one that is only a signpost should not look alike.

### Colour

One purple system. The band is the only saturated surface in the product; everything else is paper.
Green means exactly one thing — **covered, satisfied, done** — and never identifies a section. Amber
means someone still has to act, crimson means a deadline is close or a panel failed, and an estimate
is deliberately neither.

### Icons — Phosphor, four weights, each with a job

The glyphs are Phosphor's, vendored as path data (ADR 0004); the names are ours, and a component
asks for `alert`, never `warning`. The weight is chosen by **role**, not by taste, and the code
chooses it in almost every case:

| Weight | Job | Who passes it |
| --- | --- | --- |
| **regular** | every glyph of 16px or more — inline with text, in a button, in a fact | nobody; it is the default |
| **bold** | every glyph below 16px — chips, pills, meta facts — so the stroke survives | nobody; `Icon` switches by size |
| **fill** | the *on* state of a stateful control, and nothing else — the nav row you are on, the sort you chose, the bell with unread | the control (`NavRow`, the sort group, the bell) |
| **duotone** | the mark in a flat tinted tile, and nothing else — a task-type tile, an organisation's tile, a state card's spot, a drawer's header tile. **Never a card head**: a head's mark is a bare outline glyph in its tone (`.status-icon`, `.card-icon` are the glyph's box, not a tile), so a head never wears the shape its rows wear | the tile (`StateCard`, `Spot`, `.task-type-icon`, `.drawer-icon`, `.org-tile`) |

Light and thin are not vendored: two tile weights would be two tile styles. **Duotone never sits on
a gradient** — the band's orbit core stays outline, because a two-tone back layer turns to mud on a
gradient disc. **A glyph that is only a line never takes duotone or fill** — a check, an arrow, a
caret, an x, three bars, a spinner: Phosphor invents a box to put the line in, and a check with a
square behind it is a checkbox. `Icon` gives those regular back when a tile asks (`LINE_GLYPHS`). A filled glyph that
cannot be switched off is a control that looks pressed; a duotone glyph inline with text is a tile
that lost its tile. If a page is writing `weight=` by hand, it is usually doing a primitive's job —
stop and look for the tile.

Adding an icon: one line in `scripts/icons/manifest.mjs` (our name → Phosphor's), `npm run icons`,
commit `src/design-system/icon-paths.js`. The script refuses a Phosphor name that does not exist.
The full grid, every name in every weight, is at `#/styleguide`.

### People, marks and the one illustration

**A person is a face; a thing is a glyph; an office is a name.** The Jam of 2026-08-21 asked for a
photo on the "MJ" in My Enrollment's rail, and the finding was that six classes drew a purple disc
with initials and none of them had a place for a face. Now:

- **A person** Aster knows — the student, an advisor, a club contact — is `<Avatar person size>`:
  the photo on the record when there is one, initials when there is not, at `xs 24 · sm 32 · md 40 ·
  lg 56`. `alt=""` when the name is printed beside it (nearly always); `alone` when it is not, and
  the name becomes the alt. The photos in `public/people/` are **stock portraits** (Unsplash,
  under its licence), **chosen for the role the way a directory photo reads**: an advisor looks
  like staff — thirties to fifties, dressed for an office; a faculty adviser can look like faculty;
  a student looks college-age. Never a generated face: asked for a 35–50-year-old Admissions
  advisor, a GAN returned a teenager, and Marco read it as a child in a staff role (2026-08-21).
  `SOURCES.md` there records each id and photographer. Never fetch a face at runtime.
- **A thing** — an office, a residence, an organisation, a destination on another site — never gets
  a face. It is a glyph in a tile (`org.icon`, duotone), or a monogram. Offices are a name and
  nothing else (Help already decides this).
- **Edward** is neither: an assistant with a mark, so it cannot be mistaken for someone at Aster.
- **Marks** are drawn components under `design-system/marks/`, not icons: `AsterMark` (the
  institution's crest — a shield, an open book in chief, an aster in base, the grammar a US
  university mark actually uses; the brand row, the favicon, the tile for Aster's own payment
  portal) and
  `AudentraMark` (the vendor's, in "Powered by" and nowhere else). A third party's site keeps a
  monogram; we do not draw other people's trademarks.
- **The one illustration is `<Spot>`**: the band's orbit motif at card scale with a duotone glyph
  in the core, in the colour contract's tones. `StateCard` draws its own. It goes where a state
  needs a picture — empty, partial, error, done — and nowhere else; an imported illustration set is
  a second visual language sitting inside the first, and was rejected for that reason.

### Loading and error — one shape each, in the page's own anatomy

- **Loading** is `PageSkeleton`, and it is the page's anatomy drawn in skeleton: a band the height
  of the hero, a panel the height of the summary, then cards — so loading → ready is a fade, not a
  rearrangement. It says what it is doing **once, visibly**, in the band: a spinner and "Loading
  {label}…", the same sentence the screen reader already had. No progress bar at the top; the
  product would then have two vocabularies for "wait". `prefers-reduced-motion` stops the shimmer
  and the spin and the sentence does the work.
- **Error** is `StateCard variant="error"` — at `size="page"` when it stands for the whole page
  (`PageError`), centred under the band. It is **crimson**, because the colour contract says a
  failed panel is crimson, and it was amber until the Jam of 2026-08-21 pointed at it. One error
  shape in the product; a second one is drift.

### A group of rows can close — the disclosure

`CardHead kind="status"` is the product's one disclosure: give it `count`, `open`, `onToggle` and
`controls` and it renders as a `<button aria-expanded>` with the count before the chevron, and the
card closes on the head. No `details`, no hand-made toggle, no box of its own — *steps completed*
was that box, and it was the only one of three identical groups that could close. Rules:

- **A group that changes without the student acting starts open** (something new in it is news);
  **history starts closed**. The page decides, and says why, where it decides.
- **An empty group is not a toggle.** The head is static and the group's one line shows. A button
  that opens nothing is a lie.
- **The student's choice is remembered** per group (`localStorage`, the way the sidebar remembers
  its groups), and nothing else is stored.
- **The group the page exists for never closes.** On My Enrollment that is *Your next steps*.
- **The head says the standing, the row says the kind — never the same glyph on both, never the
  same shape.** A group's status head carries the group's standing in its bare glyph (the
  checklist, a clock, a lock, a check); every row under it carries the *step's kind* in its tile — external, upload, profile,
  housing, meeting, review, identity, preferences, decision — from the one vocabulary in
  `features/enrollment/logic.js` (`kindIcon`), whatever the row's standing. A clock on the head
  and a clock on every row was the same thing said twice. All four groups' rows share the task
  row's columns (a 40px tile, the copy, the trailing cell) and horizontal padding, so tiles and
  titles sit on the same x down the page. A status head may still be *bare* (no `icon`) when the
  card has no standing to show; it then carries its weight in type.

## 5. Build — the design system is a contract

This repo has **no UI library and no CSS framework**. Deviating from that is the fastest way to make
the product look like two products.

### Open `#/styleguide` first

Every token, primitive and pattern is rendered there, in its states. It is faster to look than to
guess, and guessing is what produced 436 hand-typed colours and eight hand-typed drawer shells.

> **If a shape is not on the styleguide, it does not exist.** If you add one, add it there in the
> same commit — otherwise the next person cannot find it and will write their own.

### Reach for the primitive before writing markup

`src/design-system/primitives/`. If you are typing `modal-scrim`, `drawer-header`, `anchor-card` or
`section-card` by hand, stop: you are re-creating something that exists, and the copy will drift.

| Building | Use | Not |
| --- | --- | --- |
| A side panel | `<Drawer variant label titleId onClose>` — scrim, ARIA, header, focus, `Esc`, trap all included | a hand-written `<aside role="dialog">` |
| A rail's first card | `<AnchorCard variant label figure>` | `<div className="anchor-card …">` |
| A panel anchored to a control | `<Popover trigger tip ariaLabel panelLabel>` — scrim, `role="dialog"`, `Esc`, focus return; the panel is a `Card`, so inside it go `CardHead` + `CardRows` + `CardFoot`, or an `AnchorCard` taking its top corners | a positioned `div` with a hand-typed head and foot |
| A block of the main column | `<Card>` + `<CardHead>` + `<CardRows>` + `<CardFoot>` | `<section className="section-card">` |
| A button | `<Button kind>` / `<IconButton name label>` | `<button className="primary-button">` |
| A hint on a control | `<IconButton>` (built in) or `<Tooltip tip>` | `::after { content: attr(data-tip) }` |
| A word the student may not know | `<InfoTip title>` | a bubble only a mouse can reach |
| A person | `<Avatar person size>` | a `span` with initials, or an `img` with no rule about who gets one |
| A group of rows that can close | `<CardHead kind="status" count open onToggle controls>` | a `details`, a hand-made toggle, a box of its own |
| A picture on a state | `<StateCard>` (it draws its own `<Spot>`) | an imported illustration set |
| The institution's or the vendor's mark | `<AsterMark>` / `<AudentraMark>` | a letter in a tile, an icon from the set |

`CardHead` is the one way a card opens — a bare outline glyph, the name, one line under it, a
trailing cell — and `kind` only colours the glyph (`status` takes a `tone`, `card` is neutral;
`section` is kept for its call sites and renders the same head with `eyebrow` as the line).
`IconButton` takes `label`, not `aria-label`, so an icon-only control cannot ship unnamed.

### Tooltips: two of them, and the line between them is not style

Everything about them is in `design-system/primitives/Tooltip.jsx` and rendered at
`#/styleguide`. What is not negotiable is which one you are reaching for.

| | `Tooltip` — the hint | `InfoTip` — the explainer |
| --- | --- | --- |
| Answers | "what is this control?" | "what does this word mean?" |
| Trigger | the control itself | its own button, inline with the word |
| Content | one to three words | a title and one or two sentences |
| Opens on | hover (mouse only), keyboard focus | hover, focus, **and tap** |
| Screen reader | nothing — it repeats the control's own name | `role="tooltip"` + `aria-describedby` |
| May carry | only what is already the accessible name | something printed nowhere else |

**A hint may only repeat something a screen reader already says.** Hover does not exist on a phone
and does not exist on a keyboard, so the moment a bubble carries information the student has no
other way to reach, it is an `InfoTip` — a real button, reachable by tap and by `Tab`. That is the
whole rule, and it is why `IconButton` shows its `label` by default: the name a screen reader hears
is the name everyone else sees, and it costs the author nothing to remember.

Four more things it is worth not re-deciding:

- **An explainer is the exception.** If the card already says it in a line under the figure, do not
  add a bubble — an info marker on every label is an info marker that means nothing. The same rule
  the rest of this document sets for chips and for colour.
- **A row that is itself a button cannot hold one.** A button inside a button is invalid, and the
  answer is the drawer that row opens, which has room for the sentence anyway.
- **Longer than two sentences is not a tooltip.** That is `InfoModal`.
- **The bubble is not the author's to place.** It portals to `document.body`, flips when the window
  is short, is pulled in from the edge when the trigger is near one, and keeps its arrow on the
  trigger through both. Nothing about a tooltip should ever need an `overflow` rule or a
  `position: relative` to be added somewhere else — that it did is why `.summary-alert` still
  carries the summary panel's bottom corners.

### Tokens only

- **A raw value in a rule is a bug** — colour, space, radius, type, motion, depth, z-index. They all
  live in `src/styles/tokens.css`, in three layers: a palette of raw ramps, the **roles** a rule may
  name, and the scales. If the value you need is not a role, the token is missing — add it there.
- **Never name a palette entry from a rule.** `--purple-400` is for `tokens.css` to reference;
  a rule names `--purple`, `--purple-line`, `--purple-ink`.
- **Space** is `--space-1` … `--space-13`, **radius** is `--radius-xs` … `--radius-panel` plus
  `--radius-pill` / `--radius-round`, and both carry a note saying what each step is for.
- **Shadows** are `--shadow-soft` / `--shadow-card` / `--shadow-float`. Don't invent a fourth.
- **Type** is Geist / Geist Mono via `--font-geist-sans` / `--font-geist-mono`, self-hosted through
  `@fontsource-variable`. Never add a webfont link or an external request.
- **Breakpoints**: there are exactly four — 1060, 820, 620, 560. A fifth width in a new `@media` is
  drift. The JS mirrors live in `src/lib/overlay.js`; never re-type a `matchMedia` string inline.

### Where things go

- **Classes** are flat and semantic (`.task-card`, `.page-rail`, `.drawer-tabs`). No utility classes,
  no CSS-in-JS, no CSS modules. Reuse an existing class before adding one.
- **A new rule goes in the layer that owns its subject**: `patterns.css` if the design system renders
  it, `features/<name>.css` if one section does. A shared shape written into a feature file is the
  bug that put the whole card system inside My Financials.
- **A new section** gets a file under `src/styles/features/` and a line in `app.css`, which holds
  the cascade order and nothing else.
- **Icons** are Phosphor, vendored: one line in `scripts/icons/manifest.mjs`, `npm run icons`, commit
  `icon-paths.js`. Never a package, never a hand-drawn one-off, never `weight=` on a page when a
  primitive owns the tile. See *Icons* in §4.
- **People** are `<Avatar person>`; **things** are a glyph in a tile; **marks** live in
  `design-system/marks/`. See *People, marks and the one illustration* in §4.
- **Components** are function components, one per file, props over context. A section's page, parts,
  `data.js` and `logic.js` live together in `src/features/<name>/`. State lives in `App.jsx` unless
  the card says otherwise. `design-system/` imports no feature and no data — ever.

### Still part of done

- **Accessibility**: landmarks, `aria-label` / `aria-modal` / `role`, `Esc` closes drawers and
  modals, focus is trapped in overlays and returns on close, `prefers-reduced-motion` respected.
  Using `Drawer` gives you most of this; a modal or a popover still owes it.
- **Responsive**: at narrow widths the sidebar becomes a drawer with a scrim and side panels become
  bottom sheets. Match the four breakpoints.
- **Copy** is plain, student-facing English, using the card's vocabulary. No placeholder lorem.

## 6. Verify before claiming it works

```bash
npm run build      # must pass clean
npm run dev        # then actually look at the screen
```

Check, on screen: the happy path, every state listed in the spec, narrow width, keyboard-only
navigation. "It compiles" is not verification.

## 7. Jam feedback — on demand

Feedback arrives when the user **pastes a Jam link**. Nothing is polled automatically.

Given a Jam URL:

1. `mcp__Jam__getDetails` for the report, `mcp__Jam__getVideoTranscript` for what was said,
   `mcp__Jam__getScreenshots` / `getFrames` for what was shown.
2. `mcp__Jam__getConsoleLogs` and `mcp__Jam__getNetworkRequests` when it looks like a defect, not a
   design note.
3. Split the feedback into **defects** (fix now, in this card) and **new scope** (a new card — say so,
   don't silently absorb it).
4. Append the URL to the `Jam:` front-matter line of the card's `spec.md`, with a one-line summary of
   what it asked for.

Feedback so far comes from Laura Barcellos, mostly on the `Audentra Student Onboarding` folder.

## 8. Commit

- Branch: `enr-<n>-<slug>`, off `main`.
- Commit subject: `ENR-<n>: <what changed>`.
- One card per branch. Commit the `.scratch/` spec along with the code — the spec is the record.
- Never push or open a PR unless asked.

## Definition of done

- [ ] Card read; `Out of scope` and `Guardrails` respected
- [ ] `references.md` has ≥2 Mobbin searches, with links and a line on what was taken or rejected
- [ ] `spec.md` written, states enumerated
- [ ] Built with tokens, existing classes, icons from the manifest, people through `Avatar` — no new dependency
- [ ] `npm run build` clean, screen checked in the browser at wide and narrow widths
- [ ] Keyboard and `Esc` behavior verified on any overlay
- [ ] Jam feedback, if any was given, either resolved or filed as new scope
- [ ] Committed as `ENR-<n>: …`
