Jira: ENR-180
Status: ready-for-agent
Labels: design, persona-student, screen-dashboard, wave-w2
Jam: —

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-agent` is the nearest role and the card is fully specified; Jira stays authoritative.

# Portal navigation — thirteen destinations, one information architecture

## 1. What this screen answers

Where do I find things? — [ENR-168](https://audentra.atlassian.net/browse/ENR-168), behaviour from
[ENR-174](https://audentra.atlassian.net/browse/ENR-174). This card changes the **frame**: the shape
of the navigation, the routes behind it, and the state every destination shows before its own card
builds it. It does not design the content of any section.

### What the repo has today versus what the card describes

The card describes the reference portal: eight flat items (Dashboard, My Enrollment, My Financials,
My Classrooms, My Campus Life, Edward AI, My Documents, Profile). This repo diverges — six flat
items, no Dashboard, no Edward AI entry, and a `Messages` row the reference portal does not list. So
in this repo:

- **Edward AI leaves the navigation** is already true and must stay true. The lower-right corner of
  every page stays clear for the floating control that
  [ENR-181](https://audentra.atlassian.net/browse/ENR-181) will put there — no page places a primary
  action in it.
- **Dashboard is added** as the home, because the student now has thirteen destinations and needs a
  place that explains where things are.
- **Messages stays**, because the topbar bell has to have a destination.

## 2. Information architecture

One source of truth: `src/lib/navigation.js`. The nav rows, the page headings, the empty-state copy
and the Dashboard shortcut cards all read the same entry, so a name cannot drift between two places
— AC4 enforced by structure rather than by discipline.

| # | Row | Kind | Route | Icon | Badge |
| --- | --- | --- | --- | --- | --- |
| 1 | Dashboard | destination | `#/dashboard` | `home` | — |
| 2 | My Enrollment | destination | `#/my-enrollment` | `check` | open steps |
| 3 | My Documents | destination | `#/my-documents` | `file` | — |
| 4 | Appointments | destination | `#/appointments` | `calendar` | — |
| 5 | Messages | destination | `#/messages` | `message` | unread |
| 6 | **Academic** | group | — | — | — |
| 6a | My Classrooms | leaf | `#/my-classrooms` | `book` | — |
| 6b | My Progress | leaf | `#/my-progress` | `progress` (new) | — |
| 7 | **My Financials** | group | — | — | — |
| 7a | Overview | leaf | `#/financials/overview` | `wallet` | — |
| 7b | Financial aid | leaf | `#/financials/aid` | `award` (new) | — |
| 7c | Payments | leaf | `#/financials/payments` | `card` (new) | — |
| 8 | **My Campus Life** | group | — | — | — |
| 8a | Events | leaf | `#/events` | `ticket` (new) | — |
| 8b | Clubs | leaf | `#/clubs` | `users` | — |
| — | Help | utility, `.sidebar-bottom` | `#/help` | `help` | — |
| — | Profile | profile chip only | `#/profile` | avatar | — |

**Order and why.** What I must do (Dashboard, My Enrollment) → what I sent and who I talk to (My
Documents, Appointments, Messages) → the rest of my life at Aster (the three groups). Appointments is
a row of the main list and never a link at the foot of a support panel — AC2, and the reason it is
not folded into a `Support` group with Help.

**Groups are labels, not destinations.** Academic, My Financials and My Campus Life are uppercase
muted headings with a chevron; the page a student wanted is always a leaf. This is why My Financials
holds an `Overview` leaf instead of being clickable itself — the concept exists once, as a page
called Overview inside a group called My Financials.

**Decisions inherited from the product conversation**, recorded so a later card does not undo them:
Help exists once — the sidebar's `Help center` and the topbar's `Need help?` collapse into one
destination named **Help**; Profile is reachable from the profile chip only, never as a second row;
counters appear only where real data exists.

## 3. Layout

### 3.1 The persistent frame — every page (AC7)

```
skip link  →  #main-content                   first focusable element on every page
Sidebar    →  brand · main nav · Help · profile chip · Powered by Audentra
Topbar     →  menu (≤820px) · Aster (≤820px) · preview-state control · Messages · avatar
main       →  page head · page body · footer
```

- `.app-shell` becomes a `<div>`; the workspace content becomes `<main id="main-content">`, so the
  skip link has a real landmark to jump to (AC6).
- The footer moves into the page template, so it appears on every page instead of only on
  My Enrollment. `Get help` inside it is renamed **Help** — one concept, one name.

### 3.2 The navigation rows

Reference: [Toggl Track](https://mobbin.com/screens/25a413ce-7c42-4d6e-a892-7e5184f7a1d5),
[Render](https://mobbin.com/screens/0da9bd06-539f-41e1-aa94-a8c78368e69a).

- **Destination row** — unchanged `.nav-item`: 27px icon well, 13px/600 label, badge riding on the row.
- **Group heading** — new `.nav-group-toggle`: 11px uppercase, `--muted`, letter-spacing `.06em`,
  chevron at the right that rotates on expand. No icon well, so it can never be mistaken for a
  destination.
- **Leaf** — `.nav-item.nav-leaf`: same row, indented so the leaves' icons line up under the group
  heading's text rather than under the top-level icons.
- **A collapsed group holding the current page** takes `.nav-group-toggle.holds-active` (purple
  text), so a student is never told they are nowhere.

### 3.3 Page template

`PageShell` — one component, so every screen inherits the same geometry.

| Region | Content |
| --- | --- |
| `.page-head` | eyebrow (group name, or `Aster` when ungrouped) · `h1` (destination name) · one-line lede |
| body | `children` |
| `footer` | existing footer, unchanged apart from the Help rename |

`My Enrollment` passes its approved `.welcome-panel` as a `hero` instead of the standard head — the
Jam signed that celebration off in [ENR-164](https://audentra.atlassian.net/browse/ENR-164) and this
card does not relitigate it. Every other page uses the standard head.

### 3.4 Dashboard — a summary made of links

Reference: [Unity Learn](https://mobbin.com/screens/dcb63917-8d63-4df1-928d-164df173488a),
[Expensify](https://mobbin.com/screens/6f808686-2cc4-426a-9bd7-c8bf2cfa5296),
[Circle](https://mobbin.com/screens/afde5712-b2c0-4fc1-be7b-4ac42446d642).

The Dashboard invents no data. Every figure already exists in `src/data.js`, and every block links to
the section that owns it:

1. `.progress-panel` — the enrollment ring and the live `n of 14 steps complete`, and `AdvisorBar`. The same
   component My Enrollment uses, so the two pages read as one product. Links to My Enrollment.
2. **Your next steps** — the first three tasks in smart order as `.compact-task` rows. A row opens
   that task's drawer on My Enrollment (route change + `activeTask`), so the Dashboard never becomes
   a second place to do the work.
3. **Momentum** — `MomentumCard`, extracted from `InsightColumn` so both pages render one component
   instead of two copies that can drift.
4. **Where to go next** — a grid of shortcut cards, one per destination, each with the section icon,
   its name, and the same one-line description its own empty state uses. This is the card's "the
   headings must earn it": the leaves are findable from the home as well as from the nav.

## 4. States

The card requires loading, empty, error, partial data and success. A `state` query parameter drives
all of them, and the `Concept preview` pill in the topbar becomes the control that writes it
(`?state=ready|loading|partial|error|empty`), so a Jam reviewer can link the exact state.

| State | Navigation | Page |
| --- | --- | --- |
| `ready` | full list, badges from data | My Enrollment and Dashboard render their content; the other eleven render their section placeholder, which is their true state |
| `loading` | eight skeleton rows, group labels visible, `aria-busy="true"` | page-head skeleton plus two card skeletons; no spinner, no layout jump |
| `partial` | badges omitted entirely — never a `0` — and a muted line under the nav: *Some counts are unavailable. The sections still open.* | figures that did not arrive render `—` with the same one-line explanation; nothing renders as zero |
| `error` | compact block: *We couldn't load your sections.* plus `Try again`. Help and the profile chip survive, so the student is never trapped | page error card: *Something went wrong loading this section.* plus `Try again`; retry returns to `ready` |
| `empty` | unchanged | My Enrollment shows the existing all-caught-up card; the Dashboard shows *Your semester summary builds itself here*, naming what fills it |
| unknown route | unchanged | *That page doesn't exist.* plus a route back to Dashboard |

### The section placeholder (AC8)

Reference: [GitHub](https://mobbin.com/screens/749a0d87-0add-4b21-b01a-cdb13313183f),
[Teachable](https://mobbin.com/screens/bcb26e8d-0c79-43ba-b618-4163b4ed6cc4).

One component, `SectionPlaceholder`: the section's icon, `What appears here`, one sentence naming
what will appear **and what produces it**, and a route to the section that produces it. Never the
word "empty", never "coming soon", never a Jira key.

| Destination | Copy — what appears, and what produces it | Route out |
| --- | --- | --- |
| My Documents | Documents you upload and documents Aster sends you appear here. The first one arrives when you complete a step that asks for a file. | My Enrollment |
| Appointments | Appointments you book with Aster staff appear here. Booking opens as each team publishes its availability. | Help |
| Messages | Messages from your enrollment team appear here. You'll see one when someone at Aster writes to you. | Help |
| My Classrooms | Your classes appear here after Aster assigns your academic program. Nothing is assigned yet. | My Enrollment |
| My Progress | Your degree progress — credits earned, requirements met, and what is left — appears here once your program is assigned and your first credits are recorded. | My Classrooms |
| Overview | What your year costs, what your aid covers, and what is left to pay appear here when Aster publishes your financial package. | Financial aid |
| Financial aid | Aid you have been offered, and the paperwork it still needs, appear here once your aid package is released. | My Documents |
| Payments | Payments you make and payments still scheduled appear here after your first charge is posted. | Overview |
| Events | Events Aster publishes for your class appear here. Nothing is scheduled yet. | Clubs |
| Clubs | Clubs you can join appear here once Student Life publishes this year's list. | Events |
| Help | Answers from Aster, and the questions you have asked, appear here. Ask your advisor anything that is blocking a step. | Appointments |
| Profile | The details Aster holds about you appear here — the ones you control, and the ones an office changes for you. | My Enrollment |

## 5. Interactions

- **A row navigates.** `<a href="#/…">`; `App` listens to `hashchange`. On a route change the mobile
  drawer closes, any open drawer or modal closes, focus moves to the page `h1` (`tabIndex={-1}`), and
  the page scrolls to top.
- **A group heading toggles.** `<button aria-expanded aria-controls>`; the list is a `<ul id>`
  labelled by the heading. Open by default. The choice is remembered in `localStorage`
  (`aster.nav.groups`); a corrupt or absent value falls back to open.
- **A collapsed group never hides where you are.** Navigating to a leaf inside a collapsed group
  opens that group.
- **The preview-state control** opens a small menu from the `Concept preview` pill: Ready, Loading,
  Partial data, Error, Empty. `Esc` closes it and focus returns to the pill. It writes the query
  string, so the state is linkable.
- **The bell** becomes a link to Messages, labelled `Messages, 2 unread`. It is not a second
  notification surface.
- **The profile chip** links to Profile. The brand row still does not navigate — it states whose
  portal this is ([ENR-167](https://audentra.atlassian.net/browse/ENR-167)).
- **Nothing sends anything.** Advisor Email and Message keep raising their toast.

## 6. Accessibility

- `<a class="skip-link">` is the first focusable element on every page, visible on focus, jumping to
  `#main-content` (AC6).
- `<nav aria-label="Primary">` wraps the list; the active row carries `aria-current="page"`.
- Group headings carry `aria-expanded` and `aria-controls`; their list is `aria-labelledby` the
  heading.
- The drawer (≤820px) is a dialog while open: focus trapped, `Esc` closes, focus returns to the menu
  button, and it gains the explicit close button it lacks today
  ([Fabric](https://mobbin.com/screens/fc3e0836-439c-468a-b475-a1c6a9aed459)).
- Badges state their meaning in words (`4 steps still open`, `2 unread messages`), not only a digit.
- `prefers-reduced-motion`: no skeleton shimmer, no chevron rotation, no collapse animation.

## 7. Responsive — mobile first

Breakpoints stay at 1060 / 820 / 620px.

- **≤820px** — the sidebar is the drawer it already is, showing the **same grouped list**, the same
  badges and the same foot block. No destination exists only on a wide screen, and no bottom bar
  invents a second hierarchy (AC3;
  [Blue Bottle](https://mobbin.com/screens/f842fe90-ecc5-42cf-9bfa-55e1578ca162) taken,
  [Weverse](https://mobbin.com/screens/a27e2ea4-02e2-4f52-987e-e2d23dab5a1b) rejected).
- **≤620px** — the page head sizes down, the Dashboard grid becomes one column, shortcut cards go
  full width. Verified to 380px, no horizontal overflow.

## 8. Capitalisation (AC5)

One rule, applied everywhere: **destination names are written exactly as the ENR cards write them;
everything else is sentence case.**

- Names: Dashboard, My Enrollment, My Documents, Appointments, Messages, Academic, My Classrooms,
  My Progress, My Financials, Overview, Financial aid, Payments, My Campus Life, Events, Clubs, Help,
  Profile. `Momentum points` keeps its capital as a programme name.
- Everything else — headings, lede lines, buttons, eyebrows, placeholder copy — is sentence case.

Strings this card changes: `Help center` → `Help` (sidebar), `Need help?` → removed (topbar),
`Get help` → `Help` (footer).

## 9. Data

- **Shared** `src/lib/navigation.js` — the destination model: id, label, icon, route, group, badge
  key, lede, placeholder copy and shortcut description. Structure and copy, not student data. ENR-166
  had already started this file while this card was in spec; this card completed it with the grouping,
  the copy and the routing helpers, and removed the flat `SIDEBAR_ROWS` ENR-167 shipped.
- **Shared** `src/lib/preview-state.js` — reads and writes `?state=`. ENR-188 had adopted the
  vocabulary for its own page, so this card added `FRAME_STATES` (what the frame can show anywhere)
  and `frameState()` (a page-specific state means nothing to the frame, which renders it as ready)
  instead of replacing their list.
- **Changed** `src/data.js` gains `unreadMessages = 2`, replacing the literal `2` in two components.
  No other student data is invented — the epic puts section content out of scope.
- **New icons** in `src/Icon.jsx`, 24×24, stroke 1.9, `currentColor`: `progress` and `ticket`. `award` and `card` were drawn
  by ENR-166 in the same pass; `users` already existed.
- **New components** `PageShell`, `SectionPlaceholder`, `Dashboard`, `MomentumCard` (extracted from
  `InsightColumn`), `PageSkeleton`, `PageError`, `EnrollmentPage` (My Enrollment lifted out of
  `App.jsx` so it is one page among many), `PreviewStateMenu`.
- **The page registry** lives in `App.jsx`'s `renderPage()`. A destination without a page falls
  through to its placeholder; a section's card plugs its screen in with one branch. ENR-188 landed
  `MyClassrooms` into it while this card was being built, which is the extension point working.

## 9b. What the build changed from this spec

Five things the screen decided that the spec had not:

- **`.skip-link` was already taken** by the *skip this step* links in the task drawer. The
  accessibility skip link is `.skip-to-content`, so the two never collide.
- **The sidebar had to scroll.** Thirteen destinations plus the foot block outgrow a short screen;
  without `overflow-y: auto` the drawer silently hid Clubs, Help and the profile chip — an AC3
  failure that only showed at 380×740.
- **The preview pill stays on a phone.** ENR-167 hid `.concept-pill` below 620px. It carries the
  states now and the card is designed mobile first, so it stays, reading just the state.
- **Focus moves on a route change only.** Focusing `<main>` needs `preventScroll` (the browser
  otherwise tucks the page head under the sticky topbar) and has to be guarded by comparing the
  previous route rather than a mounted flag, which StrictMode's double effect defeats — that bug
  dropped the keyboard inside the page before the student ever navigated.
- **The pill names the option it is offering.** Reading the global state vocabulary made a page's own
  label (`No programme yet`, from ENR-188) ride along on My Enrollment: one concept, two names, the
  exact AC4 failure. It now reads the label from the list it was handed.

## 10. Out of scope

From [ENR-168](https://audentra.atlassian.net/browse/ENR-168): the content of any section; what the
assistant answers; notification delivery. Also out, for this card:

- The floating assistant control — [ENR-181](https://audentra.atlassian.net/browse/ENR-181). This
  card only keeps its corner free.
- The content of Appointments, Help, Profile, My Documents, My Financials, My Classrooms and
  My Campus Life — ENR-183, ENR-182, ENR-184, ENR-165, ENR-166, ENR-188 and ENR-189 respectively.

## 11. Raised, not absorbed

- **My Progress has no card of its own.** [ENR-147](https://audentra.atlassian.net/browse/ENR-147)
  says an academic progress panel is already built **inside My Financials**, while
  [ENR-174](https://audentra.atlassian.net/browse/ENR-174) AC1 puts My Progress under Academic. When
  [ENR-166](https://audentra.atlassian.net/browse/ENR-166) builds My Financials it must not render
  that panel as well, or the same concept appears twice under two names — the exact AC4 failure.
  Flagged for the next refinement; not decided here.
- **One advisor per section** — still carried by no ENR card, still not absorbed
  ([ENR-164](https://audentra.atlassian.net/browse/ENR-164) raised it first).

## 12. Done when

- [x] Academic, My Financials and My Campus Life are groups; their leaves match AC1 exactly
- [x] Appointments is a row of the main navigation, not a link inside a support panel
- [x] No Edward entry in the navigation, and no page puts a primary action in the lower-right corner
- [x] Every destination is reachable at 380px through the same grouped list, with no bottom bar
- [x] Every page shows the frame, a skip link that works, and a page head naming the destination
- [x] Every section with nothing to show names what will appear and what produces it
- [x] Loading, partial, error, empty and unknown-route states all reachable from the preview control
- [x] Help exists once; `Help center`, `Need help?` and `Get help` are gone
- [x] Built from tokens, existing classes and our own icons — no new dependency
- [x] `npm run build` clean; checked at 1440 and 390/380px, plus the drawer at 740px tall
- [x] Keyboard: skip link focuses first and jumps to `#main-content`; group toggles carry
      `aria-expanded`; the drawer traps focus and `Esc` returns it to the menu button
