Jira: ENR-189
Status: ready-for-agent
Labels: design, persona-student, screen-my-campus-life, wave-post-mvp
Jam: (none)

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-agent` is the nearest role and the card is fully specified; Jira stays authoritative.

# My Campus Life — the one section that is not an obligation

## 0. Current behaviour, confirmed

The card's scope note says the screen exists and was not inspected. In **this repo** it did not.
At the time this card started, `Sidebar.jsx` rendered `My Campus Life` as an `<a>` whose `onClick`
called `preventDefault()`, and `App.jsx` rendered a single page. While the spec was being written,
[ENR-180](https://audentra.atlassian.net/browse/ENR-180) landed real routing and the thirteen-
destination information architecture, which turns My Campus Life into a group of two leaves. Section
6 records what that changed about this card.

## 1. What this screen answers

*What is happening here, and who could I join?* —
[ENR-187](https://audentra.atlassian.net/browse/ENR-187), under
[ENR-173](https://audentra.atlassian.net/browse/ENR-173). It is the only student section that asks
nothing of the student, except for the events the institution marks as required.

## 2. Layout

Regions in reading order. Mobile is the primary case: every region is a single column of full-width
rows at 380px, and only the rail and the date tile change shape as the viewport grows.

| # | Region | What it is | Reference |
| --- | --- | --- | --- |
| 1 | `.campus-panel` | Section hero. Same geometry as `.welcome-panel` (25px radius, white type) with the gradient shifted from purple to green, `.campus-motif` in place of `.celebration-orbit`. No progress ring, no points, no deadline. | [Codecademy](https://mobbin.com/screens/66bd70b2-6912-48a9-8c19-37ca0f00b8df) |
| 2 | `.required-strip` | The obligations. See §2a — revised 2026-08-20. | [PayPal](https://mobbin.com/screens/14c8559c-723a-4e4e-87ec-a19ee816c28e), [Circle](https://mobbin.com/screens/bbb7b785-2793-4264-9123-5a7a24f8191b) |
| 3 | Events `.status-section` | `.section-heading` + `.sort-group` view switch (`For you` / `Everything` / `Past`), `.filter-chips` category row, live count. Then `.campus-list` of `.campus-row`. `Show more` after 6. | [Circle](https://mobbin.com/screens/65a8ea46-2fc2-488f-852e-e020709872ad), [Luma](https://mobbin.com/screens/7dbb0d17-e56b-4ed2-8e02-74caafbde1bc) |
| 4 | Clubs `.status-section` | Same heading grammar, own category chips and count, `.org-row` list, `Show more` after 4. | [Braintrust](https://mobbin.com/screens/54d07501-2048-4347-a358-075a1d46acde) |
| 5 | `.insight-column` | Card 1 `.interests-card` — the interests, why the order changed, and that nothing here writes to the record. Card 2 `.provenance-card` — who publishes, when it was last updated, one route to ask. | — |
| 6 | `footer` | Unchanged, shared by every page. | — |

### 2a. The obligations — revised 2026-08-20

The first build gave the obligations a band: an icon tile, an `h2`, a subtitle, a count badge, and
inside it one bordered card per session carrying a `REQUIRED` chip, the date, the title, the whole
requirement note, two facts and a filled button. Direct feedback killed it — *"muito grande,
empilhado, nada a ver"*. One session cost a quarter of the viewport to say `required` three times,
and everything it spelled out is already in `CampusDrawer`, one click away.

`.required-strip` replaces it. **The strip is the pointer; the drawer is the depth.** A tinted line
naming the obligation, then one row per session, and the row is the target.

**Where it goes depends on how many grids the page has** — the one layout fact CSS cannot see from
inside a slot, so `MyCampusLife` reads it with `useMedia(RAIL_QUERY)`:

| Page | Slot | Why |
| --- | --- | --- |
| two grids (`≥1061px`) | first card of `rail` | The rail is sticky and shared by both leaves, so the obligation stays on screen for the whole scroll. A single session no longer spends the width of the page on one sentence. |
| one grid (`≤1060px`) | `notice` | `.page-rail` reflows *under* the main column below 1060px. In the rail there, the obligation would sit beneath forty events — which is exactly the hiding ENR-189 forbids. |

**The strip has two layouts and picks between them with a container query**, not a media query: the
window is wide in both cases, only the column is not. `@container required-strip (width < 470px)`.

| | wide container | narrow container |
| --- | --- | --- |
| head | `Required for you` + the sentence | `Required for you` + a count |
| date | 46px crimson tile | in the line above the title; no tile |
| place | on the row | dropped — the drawer holds it |
| requirer | on the row | on the row; it is what makes the session an obligation |
| control | labelled pill, `How to register →` | a 26px arrow disc |

Both layouts obey the flattening rules: `.card-rows` inside `.section-card`, rows out to the card's
edges, hairlines between them, no box inside a box. The obligation is marked in crimson ink — tile,
eyebrow, chip, and a crimson-tinted ring on the card — and **never** by painting one edge of a
rounded box. That mechanism is now banned outright in `docs/agents/design-workflow.md`; the same
feedback removed it from `.campus-row.required`, which already carries a crimson tile and two chips.

### The event row (`.campus-row`)

Date tile · body · trailing meta, on the `.compact-task` grid so it lines up with `Aster is
reviewing` and `Coming up later` on the enrollment page.

```
+------+-----------------------------------------------+-----------+
| SEP  | 6:00 PM · The Quad                            | Walk in   |
|  04  | Welcome BBQ                     [Social]      |           |
|      | Hosted by Student Life · Matches Volunteering |           |
+------+-----------------------------------------------+-----------+
```

A required event uses the same row with `.campus-row.required`: crimson date tile, `Required` chip in
place of the category chip. It appears **both** in the band and in the chronological list — the
[Circle](https://mobbin.com/screens/65a8ea46-2fc2-488f-852e-e020709872ad) precedent — so the week
never reads as free.

### The club row (`.org-row`)

Initials tile · name + `[category]` chip · description clamped to two lines · `Meets Tuesdays, 7:00 PM`
· latest update with its date. The row opens the drawer; there is no join control, because membership
is out of scope.

### View switch semantics

- **For you** — two blocks: `Picked for your interests` (events matching `studentInterests`,
  chronological) then `Everything else` (the rest, chronological, date-grouped). Every matched row
  carries `Matches Music`, so the ordering explains itself instead of being a black box. Default view.
- **Everything** — one chronological list, grouped `This week` / `Next week` / month name.
- **Past** — events dated before `CAMPUS_TODAY`, newest first, muted, no registration route,
  `This event has passed`. Nothing is deleted from `campusEvents`; the partition is derived
  (story AC 6).

## 3. States

Six states, reachable from the preview control behind the `Concept preview` pill and linkable as
`?state=<id>`. `loading` and `error` are rendered by the frame for every page; the rest are this
section's own. `full-board` is the density the design brief worries about — four items and forty —
made into something you can look at.

| State | Required band | Events | Clubs | Rail |
| --- | --- | --- | --- | --- |
| `ready` | 1 required event | 11 upcoming, 3 past | 6 clubs | full |
| `full-board` | 3 required events | 41 upcoming, 3 past | 18 clubs | full |
| `empty` | hidden | `No events published yet` + who publishes | `No clubs published yet` + who publishes | full |
| `partial` | as ready | as ready | error card inside the clubs section only; the rest of the page stays usable | full |
| `loading` | frame — `PageSkeleton` | frame | frame | frame |
| `error` | frame — `PageError` with `Try again` | frame | frame | frame |

Field-level partial data lives inside `success` and is always on screen — the card asks for it and a
real institution always has some:

- an event with no location → `Location to be announced`, never a blank line;
- an event with no registration details → `Student Life hasn't published registration details yet.`
  and no button;
- a club with no update yet → `No updates published yet`.

Filter-level empties are distinct from institution-level empties and say so:

- category filter matches nothing → `No Music events in this view.` + `Clear filter`;
- `For you` matches nothing → `Nothing matches Music or Volunteering right now.` + `Show everything`;
- `Past` with no past events → `No past events yet.`

Responsive states: `<=1060px` the rail becomes the two-column grid the enrollment page already uses;
`<=820px` the sidebar is a drawer behind `.nav-scrim`; `<=620px` the date tile moves inline above the
title, the chip rows scroll horizontally with the scrollbar hidden, and the drawer is full width.
Verified to 380px.

## 4. Interactions

- A row opens `CampusDrawer` — same `.task-drawer` shell, scrim, `Esc`, focus trap, focus returned to
  the row that opened it. Middle differs: when/where/host, a boxed `How to register`, `About`. **No
  points block** — that absence is the design.
- Registration buttons never register. Each raises a toast naming what would happen
  (`Registration for Welcome BBQ would open on Aster's events site — nothing is submitted in this
  preview.`). Event registration and attendance are out of scope for the epic.
- The organisation drawer offers `Email Dana Whitfield` — a contact route, not a join. It never
  implies a membership record exists.
- View switch and category chips are `aria-pressed` buttons; the count beside them is
  `aria-live="polite"` so a filter announces its result.
- `Show more` reveals the next page in place and moves focus to the first revealed row.
- `Change in profile` and `Ask Student Life` raise toasts. Neither writes anything: published content
  never alters progress, interests or points (epic guardrail).
- The sidebar count on `Events` counts **required events only**, through the frame's own
  `badge`/`NavBadge` mechanism (`badge: 'required'` in `navigation.js`). The portal's number always
  means "something is waiting for you" — it is never a count of things to browse. Clubs carries no
  badge, because nothing in it can be owed.

## 5. Data

New module `src/campus-data.js` — institution-published content, not student data, so it does not
belong in `src/data.js`. New helper `src/lib/campus-helpers.js` beside `task-helpers.js`.

```js
export const CAMPUS_TODAY = '2026-08-20';        // fixed clock; no new Date() anywhere
export const studentInterests = ['Music', 'Volunteering'];
export const campusPublisher = { office, coordinator: { name, role }, updated };

campusEvents[] = {
  id, title, category, interests: [],
  required, requiredBy, requiredNote,           // requiredBy names the office that requires it
  date: 'YYYY-MM-DD', time, location|null, format: 'in-person'|'online',
  host, summary, about,
  registration: { kind: 'walk-in'|'external'|'email'|'closed'|'tba', label, detail, contact? },
};

campusOrganisations[] = {
  id, name, initials, category, interests: [], description, meets,
  contact: { name, role, email },
  latestUpdate: { text, date } | null,
};
```

Helpers: `partitionByDate`, `groupEvents`, `matchesInterests`, `dateTile`, `registrationCopy`.

`src/data.js` is untouched. No enrollment step is added or changed — the mirrored orientation step is
[ENR-164](https://audentra.atlassian.net/browse/ENR-164) territory and was explicitly not taken.

## 6. How this sits in the portal frame

ENR-180 owns the frame and landed while this card was being specified. Its information architecture
makes **My Campus Life a group of two destinations** — `#/events` and `#/clubs` — so the decision
recorded here is: **two routes, one screen.** The sidebar keeps both leaves; both routes render this
component with the matching tab selected, and the required band sits *above* the tab switch so an
obligation can never hide behind a tab the student did not open.

What this card owns and what it does not:

| Owned by ENR-189 | Owned by ENR-180 (the frame) |
| --- | --- |
| `src/components/MyCampusLife.jsx` and its five components | `App.jsx`, routing, `Sidebar`, `Topbar` |
| `src/campus-data.js`, `src/lib/campus-helpers.js` | `PageShell`, `PageSkeleton`, `PageError` |
| The campus block of `src/styles/app.css` | The preview-state control and `?state=` transport |

Four seams were touched, minimally, to register the section:

- `navigation.js` — `events` and `clubs` move to `built: true`. Nothing else in that file changes.
- `App.jsx` — one dispatch branch, `current.group === 'campus'`, and the section's own state list
  passed to the preview control.
- `preview-state.js` — one entry, `full-board`, so the density state is linkable like the others.
- `StateCard.jsx` is shared with My Classrooms; its API is unchanged.

`loading` and `error` are **frame** states: App renders `PageSkeleton` and `PageError` before
dispatching, so this page never renders its own. That is deliberate — two loading treatments in one
product is exactly the inconsistency this card is meant to avoid.

## 7. Out of scope

From [ENR-173](https://audentra.atlassian.net/browse/ENR-173): course registration, changing any
academic outcome, **club membership management**, **event registration and attendance**. Also out,
for this card:

- Building `My Classrooms` — that is [ENR-188](https://audentra.atlassian.net/browse/ENR-188).
- Editing interests. This screen reads them and says where they are set.
- A campus-life advisor card. `docs/agents/design-workflow.md` records "one advisor per section" as
  unfiled scope; the rail carries **provenance**, which the story does require, not a second advisor.
- Saving, following, reminders, calendar export — all one step from attendance.

## 8. Done when

- [ ] Required events are unmistakable: own strip above the tabs or leading the rail, crimson ink,
      stated requirer, and never rendered with the language of an optional event
- [ ] The strip is legible at both its widths — full-page band and 292px rail card — and no row
      restates what the drawer already holds
- [ ] Events show date, location, category and how to register; organisations show category,
      description, a named contact and their latest update
- [ ] `For you` orders by the two onboarding interests and says on each row why it matched
- [ ] Past events are reachable and absent from the browsable set, with nothing deleted
- [ ] Every empty state names what appears there and who produces it
- [ ] `ready`, `full-board`, `empty`, `partial` reachable from the preview control, plus the
      frame’s `loading` and `error`
- [ ] No points, no progress, no writes anywhere on the screen
- [ ] `#/events` and `#/clubs` both open this screen with the right tab, and the sidebar lights the
      leaf the student is on
- [ ] `npm run build` clean; checked at 1440, 1000, 760 and 380px, keyboard-only, `Esc` on the drawer
