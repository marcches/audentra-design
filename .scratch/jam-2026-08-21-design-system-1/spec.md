Jira: none — design-system feedback, asked for directly (2026-08-21); no open card owns it
Status: built (2026-08-21) — round two open, see §5
Labels: design-system, persona-student, screen-all
Jam: https://jam.dev/c/b37ab33d-80c8-4208-887f-c61bcb336076 — "the space" under the summary panel,
     standardised as My Enrollment has it; Housing moves under Health; My Documents leaves the
     sidebar and lives inside the profile. "Por enquanto esses ajustes, depois a gente continua."

# Design system, round one — three things the Jam of 2026-08-21 asked for

## 1. What this answers

*Why is the gap under the panel different on every page, and why is the sidebar in that order?* —
Laura Barcellos, Jam of 2026-08-21. Three remarks, settled in a grilling session the same morning
(Marco delegated the answers to the recommendations); the fourth remark — "depois a gente continua" —
is the second round, which has its own spec when it opens.

## 2. The space

What she drew: a bracket from the bottom edge of the summary panel to the top of the first block
under it, on My Enrollment (0:15, *the one I like*) and on Health (0:44). Measured at 1440, local and
deployed identical:

| Route | panel / hero → next block | next block | → body |
| --- | --- | --- | --- |
| My Enrollment — the reference | **30** | gate notice (amber strip) | **0** |
| Documents · Appointments · Health · Housing · Help | **30** | body | — |
| My Classrooms · Profile | **18** (`.record-note` carried `margin-top: -12px`) | record note | 22 |
| Financials ×3 | **30** | tabs | 18 |
| Events · Clubs (no panel) | **22** (hero → tabs) | tabs | 18 |

So the gap she likes was already the common case — and it was a **raw `30px`** in
`.page-hero + .page-summary`, while the no-panel case used `--hero-gap` (22) and two pages pulled the
notice up by hand. Three values for one idea.

### The rule

- **`--hero-gap` is the one gap after the band** — after the hero, or after the panel tucked into it —
  before whatever comes next. Value `30px`, the one the Jam approved. It was 22; raising it changes
  nothing on a page with a panel (the tuck is `hero-gap + hero-tuck`, so the overlap is unchanged)
  and gives Events and Clubs the same breath every other page has.
- **`--hero-tuck`** is `20px` on a wide screen and `14px` under 620 — the mobile value was a raw
  `14px` in a duplicated rule; it is the token, overridden in the same `:root` block that already
  overrides `--band-outdent` and `--panel-pad` there.
- **The notice and the tab row each sit `--space-9` (18px) above what follows.** The shell owns it:
  `PageShell` wraps the `notice` slot in `.page-notice`, which carries the margin, so a notice cannot
  bring its own distance — `.record-note` loses its `-12px 0 22px`, the amber gate notice stops being
  glued to the first card (it gains 18px under it — **this changes the reference page below the
  strip**, by decision, Q2 of the grilling), and the Campus required strip keeps the 18 it already had
  through margin collapsing.
- The mobile `25px` panel margin becomes the same token (30) — one value, not two.

### Done when

- [x] `--hero-gap: 30px`, `--hero-tuck` overridden at ≤620, no raw `30px`/`25px`/`14px`/`-12px` left
      in the shell rules
- [x] `PageShell` renders `.page-notice` around a non-null notice; `.page-notice { margin: 0 0 var(--space-9) }`
- [x] Every route: panel/hero → next = 30 at 1440 and at 390; notice/tabs → body = 18
- [x] Before/after capture at 1440 and the phone width (Chrome DevTools will not go under 500 wide — ≤620 rules, same block): the only diffs are the rows above, plus the known 7-element
      flake (a GroupTabs width settling, three styleguide icon boxes)
- [x] Styleguide: the `hero-gap` row in "Layout constants" reads the new meaning

## 3. The sidebar

Order, from the Jam (1:34): My Enrollment · Appointments · My Classrooms · Health · Housing ·
My Financials · My Campus Life; foot: Help · profile chip. Two things she did not see:

- **My Classrooms** is *My Degree* since the UX-writing pass of the same morning; the row is the
  same row.
- **Accessibility** — split out of Health by the same pass (ADR-0003), as a sidebar row after Health.
  Marco's call during the build: *nobody asked for it; the sidebar is the Jam's list.* So the row is
  gone and the page is not: the destination carries `parent: 'health'`, lives at
  `#/health/accessibility`, keeps the Health row active, and is reached from an entry card under the
  immunization record. ADR-0003 gains a dated note; its substance (a page of its own, no badge, the
  answer reaches no other module) is untouched.

ADR 0002 gains a dated note too: "last in the sidebar" stops being a consequence; "not a leaf of My
Campus Life" still holds, and that is what the ADR is for.

### Done when

- [x] `NAV` in `navigation.js`: enrollment, appointments, classrooms, health, housing, financials
      group, campus group — exactly the Jam's list; no `my-documents` and no `accessibility` row
- [x] Comment on the Housing row, ADR 0002 and ADR-0003 updated
- [x] Sidebar renders the order at 1440 (DOM check: *My Enrollment · Appointments · My Degree ·
      Health · Housing · [My Financials] · [My Campus Life]*)

## 4. My Documents, inside the profile — and the one shape for "a section under a section"

Shape (Q4–Q6, references in `references.md`): the page stays a page — its own hero, summary, rail,
preview states — and moves under the profile. The mechanism is the same one Accessibility now uses,
so it exists once:

- **`parent`** on a destination in `navigation.js`: no sidebar row; the parent's row (or the profile
  chip) is `active` and `aria-current` while the child is open; reached from the parent's page and
  from deep links.
- **`EntryCard`** (`design-system/patterns/EntryCard.jsx`, on the styleguide beside the three card
  heads): the way in — `CardHead kind="card"` with the destination's label and lede and the live
  count, then `CardFoot.entry-foot` with what stands there today and one `secondary-button` link.
  Deel's person page is the reference. Head, then foot, nothing between: a door, not a copy of the
  room.
- **Route** `#/profile/documents`; `#/my-documents` falls through to the 404 the way `#/dashboard`
  did. Destination `id` stays `my-documents` (App, Edward, notifications and preview states key on
  it). No `badge`: the count moved to the entry card and the page; the bell carries the unread
  decision (ENR-158 AC 5); My Enrollment counts the steps (Q5).
- **Eyebrow** `Profile · My Documents` (and `Health · Accessibility` on the other one). Title and
  lede stay whatever the UX-writing pass set.
- **Profile page**: the entry card is the **first block** of the main column, its standing sentence
  is `standingLede()` in `documents/logic.js` — the same function that writes the My Documents hero
  lede, moved there so the two cannot drift — read from the `record` App now hands the page. The
  documents row leaves *What lives somewhere else*: it no longer lives somewhere else.
- **Every deep link** (`#/my-documents` in 9 places) → `#/profile/documents`.

### Done when

- [x] No `my-documents` row in the sidebar; `#/profile/documents` renders `DocumentsPage`
- [x] Profile shows the documents card first, with live figures (*2 documents need something from
      you…*, count 2), and the signpost row is gone
- [x] Chip active on both routes; Health row active on `#/health/accessibility`;
      `grep -rn '#/my-documents' src` returns nothing; `#/my-documents` and `#/accessibility` → 404
- [x] The card's action is a link, reachable and announced; `EntryCard` is on the styleguide
- [x] `npm run build` clean

## 5. Out of scope here — round two, own spec, same day

Marco's remarks during the grilling, in his words: *the content changes but the shell should not;
the content jumps on screen between pages; when there is a scrollbar the page moves sideways; the
header's components have no standard; review all of it so the portal is navigable and easy on the
eyes.* Measured so far, and carried into round two as the list to fix:

- **The hero changes height with its title.** One-line titles give a band whose panel sits at
  y=278; two-line titles (Appointments, My Degree) push it to 326. Navigating between sections makes
  the panel and everything under it jump. Fix: one band height for every section.
- **The page moves sideways** when the native scrollbar appears or goes — `scrollbar-gutter: stable`
  on the document and on the sidebar; and the sidebar itself scrolls internally at 731px tall, with a
  native scrollbar, keeping its scroll position across routes (the brand had scrolled away at 1:01
  of the Jam). Brand and foot pinned, only the list scrolls, the scrollbar styled.
- **Header components without a standard** — the topbar chips (preview, points, bell) are three
  shapes; one height, one radius, one gap.
- **Native controls and scrollbars** restyled and on the styleguide; one focus ring.
- **Labels that wrap** where they should not — controls never wrap, layout wraps; `min-width` never
  `width` on a row action (the 142px task-row buttons wrap at 1600).
- **The content column**, audited route by route at 1440 and 390 side by side before anything is
  changed: first block, notice shapes, summary figures, rail cards, tables.

## 6. Verification

`npm run build` clean; before/after capture of every element on every route at 1440 and 390
(`scratchpad/captures`, diffed with `diff-captures.mjs`); the sidebar at ≤820; keyboard through the
profile card and the chip; one comment on the Jam with what changed and the deploy.
