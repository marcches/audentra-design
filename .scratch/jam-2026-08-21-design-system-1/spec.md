Jira: none — design-system feedback, asked for directly (2026-08-21); no open card owns it
Status: in-progress (2026-08-21)
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

- [ ] `--hero-gap: 30px`, `--hero-tuck` overridden at ≤620, no raw `30px`/`25px`/`14px`/`-12px` left
      in the shell rules
- [ ] `PageShell` renders `.page-notice` around a non-null notice; `.page-notice { margin: 0 0 var(--space-9) }`
- [ ] Every route: panel/hero → next = 30 at 1440 and at 390; notice/tabs → body = 18
- [ ] Before/after capture at 1440 and 390: the only diffs are the rows above, plus the known 7-element
      flake (a GroupTabs width settling, three styleguide icon boxes)
- [ ] Styleguide: the `hero-gap` row in "Layout constants" reads the new meaning

## 3. The sidebar

Order, from the Jam (1:34): My Enrollment · Appointments · My Classrooms · Health · Housing ·
My Financials · My Campus Life; foot: Help · profile chip. Two things she did not see:

- **Accessibility** — split out of Health by the UX-writing pass of the same morning (ADR-0003,
  other session). It goes **directly after Health**, then Housing: the two were one section yesterday.
- **My Classrooms** is being renamed *My Degree* by the same pass; the row is the same row.

ADR 0002 gains a dated note: "last in the sidebar" stops being a consequence; "not a leaf of My
Campus Life" still holds, and that is what the ADR is for.

### Done when

- [ ] `NAV` in `navigation.js`: enrollment, appointments, classrooms, health, accessibility, housing,
      financials group, campus group; `my-documents` row gone
- [ ] Comment on the Housing row and ADR 0002 updated
- [ ] Sidebar renders the order at 1440 and in the ≤820 sheet

## 4. My Documents, inside the profile

Shape (Q4–Q6, references in `references.md`): the page stays a page — its own hero, summary, rail,
preview states — and moves under the profile:

- **Route** `#/profile/documents`; `#/my-documents` falls through to the 404 the way `#/dashboard`
  did. Destination `id` stays `my-documents` (App, Edward, notifications and preview states key on it).
  It carries `parent: 'profile'` and `kind: 'profile'`, no `badge`: the count it carried moves to the
  card on the profile and is otherwise the bell's and My Enrollment's (Q5).
- **Eyebrow** `Profile · My Documents`. Title and lede stay whatever the UX-writing pass sets.
- **Sidebar**: the profile chip is `active` (and `aria-current`) while the current destination is
  `profile` or has `parent: 'profile'`.
- **Profile page**: a new **first card** in the main column — *Your documents* — icon `file`, the
  standing (*what needs you*, *on record*, *sent to you by Aster*) as `card-rows`, and one action
  that opens the page. The documents row leaves *What lives somewhere else*: it no longer lives
  somewhere else. `ProfilePage` receives `record` from `App`, so the figures are the record's and
  never a copy.
- **Every deep link** (`#/my-documents` in 12 places) → `#/profile/documents`.

### Done when

- [ ] No `my-documents` row in the sidebar; `#/profile/documents` renders `DocumentsPage`
- [ ] Profile shows the documents card first, with live figures, and the signpost row is gone
- [ ] Chip active on both routes; `grep -rn '#/my-documents' src` returns nothing
- [ ] Keyboard: the card's action is a link, reachable and announced

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
