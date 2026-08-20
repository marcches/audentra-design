# References — ENR-180 Portal navigation

Mobbin, `mode: deep`. Four searches: the grouped sidebar (layout), the condensed navigation on a
small screen and the self-explaining empty state (the two hard parts the card names), and the home
that summarises without owning content.

## 1. Layout — group headings over a nav that stays scannable

- [Toggl Track — clients](https://mobbin.com/screens/25a413ce-7c42-4d6e-a892-7e5184f7a1d5) — muted
  uppercase group labels (`TRACK`, `ANALYZE`, `MANAGE`, `ADMIN`) with every destination underneath
  carrying its own icon. The label is text, not a row: it never competes with a destination and costs
  no click. **Taken** — this is our `.nav-group-label` and the reason leaves keep icons.
- [Render — projects](https://mobbin.com/screens/0da9bd06-539f-41e1-aa94-a8c78368e69a) — same idea
  (`INTEGRATIONS`, `NETWORKING`, `WORKSPACE`) plus a pinned utility block at the foot (changelog,
  support, status). **Taken** — confirms our `.sidebar-bottom` holding Help and the profile chip
  rather than mixing them into the section list.
- [Squarespace — pages](https://mobbin.com/screens/f6668393-8252-47c2-bc1f-6dec59d604a7) — groups
  that collapse by chevron, with one group left expanded and the others closed. **Taken in part**: we
  keep the chevron affordance and the persisted choice, but our groups open by default — the card's
  worry is that grouping *adds a click*, and a default-open group adds none.
- [Frame — docs](https://mobbin.com/screens/b75d337b-1304-4b54-8c18-c8661b90b8e4) — chevron on the
  group itself, children indented one step with no second icon column. **Taken**: our indent is the
  hierarchy; we do not indent *and* shrink *and* de-icon.
- [Evernote — notebooks](https://mobbin.com/screens/56017ffd-23a7-4f2c-86db-2b2820b53d75) — `SHORTCUTS`
  and `RECENT NOTES` labels over flat rows. Confirms the pattern reads fine with only two items in a
  group, which `Academic` and `My Campus Life` both are.

## 2. The condensed navigation — every destination, one information architecture

- [Blue Bottle Coffee — menu](https://mobbin.com/screens/f842fe90-ecc5-42cf-9bfa-55e1578ca162) —
  full-height menu with the **same uppercase collapsible groups** as the wide layout (`INSTANT`,
  `BREW TOOLS` open, `MERCHANDISE`, `EXTRAS` closed). **Taken** — this is the answer to AC3: the
  drawer is the same list, not a reduced one.
- [Microsoft Outlook — folders](https://mobbin.com/screens/5516b226-0b53-45f0-abf7-a4c9e69fbf86) —
  drawer with a group label, counts riding on the rows, identity at the top and help/settings pinned
  at the bottom. **Taken** — our drawer keeps the badges and the foot block instead of dropping them
  to save height.
- [Fabric — menu](https://mobbin.com/screens/fc3e0836-439c-468a-b475-a1c6a9aed459) — drawer over a
  scrim with the page still peeking, notifications and account pinned low. **Taken** — matches the
  `.nav-scrim` we already have; we add the explicit close button this reference has and we lack.

### Rejected

- [Weverse — menu](https://mobbin.com/screens/a27e2ea4-02e2-4f52-987e-e2d23dab5a1b) — a menu sheet
  **and** a bottom tab bar of four "primary" destinations. This is precisely the second information
  architecture the card forbids: the tab bar promotes four items that have no such rank on the wide
  layout. Rejected, and the reason we did not take a bottom bar.
- [Paramount+ — browse](https://mobbin.com/screens/f7d4f85e-761a-4ef5-8af0-1beae530d96b) and
  [Peacock — menu](https://mobbin.com/screens/c856700b-f35c-4ec6-aa02-faa3a2c46069) — centred,
  ungrouped overlays. Beautiful and useless at thirteen destinations; no grouping survives the jump
  to a small screen, which is the failure AC3 describes.

## 3. The empty state that explains itself

- [GitHub — archive](https://mobbin.com/screens/749a0d87-0add-4b21-b01a-cdb13313183f) — *"There
  aren't any archived items. Archive items from a project view and they'll be shown here."* Two
  sentences: what is missing, and **the action that produces it**. **Taken** — this is the exact
  shape AC8 asks for and the template for all thirteen section placeholders.
- [Teachable — curriculum](https://mobbin.com/screens/bcb26e8d-0c79-43ba-b618-4163b4ed6cc4) — *"The
  curriculum is empty. The author has not added any sections and lessons to this course yet."* Names
  the **actor** who fills it. **Taken** — our copy names the office or the event that produces the
  content (Aster assigns your program, Student Life publishes the list, a team publishes availability).
- [TheyDo — workspace setup](https://mobbin.com/screens/f053d5de-1bd1-4d58-8315-67a834a5e8c8) — the
  loading state is a mark plus one sentence of what is being prepared. **Taken in part** — we use the
  one-sentence framing but skeleton rows instead of a spinner, so the layout does not jump.
- [Render — no matching results](https://mobbin.com/screens/0da9bd06-539f-41e1-aa94-a8c78368e69a) —
  a *search* empty, which is a different emptiness from a section with nothing in it yet. Kept as the
  distinction we must not blur: we never write "No results" on a section that simply has not started.
- [Matter — empty queue](https://mobbin.com/screens/9df96c35-42bd-44ae-ad73-1270bf0c91ac) —
  *"Your Queue is empty."* plus a link. **Rejected**: it says what is missing and never says what
  produces it, which is the half AC8 exists to prevent.

## 4. The home that summarises without owning content

- [Unity Learn — dashboard](https://mobbin.com/screens/dcb63917-8d63-4df1-928d-164df173488a) —
  "Welcome back" plus three figures the rest of the product owns. **Taken** — our Dashboard restates
  numbers that already live in `src/data.js` and links to the section that owns each one.
- [Expensify — dashboard](https://mobbin.com/screens/6f808686-2cc4-426a-9bd7-c8bf2cfa5296) — counters
  on the left, recent activity beside them, every item a route into the owning screen. **Taken** — the
  shape of our "Where to go next" grid.
- [Circle — course home](https://mobbin.com/screens/afde5712-b2c0-4fc1-be7b-4ac42446d642) — the same
  screen already cited in ENR-167 for the nav; here for its "Welcome, Alex" + progress + collapsible
  content composition. **Taken** — progress panel first, everything else below it.
- [Codecademy — skills tracking](https://mobbin.com/screens/597bbefb-e6cf-401c-abc6-47789b29e5b7) and
  [Coursera — home](https://mobbin.com/screens/0452c7a3-e39a-4906-90da-445683a45f64) — both put a
  "continue where you were" card at the top. Confirms the resume card we already have; **rejected** as
  a new pattern, because ours lives in `.skipped-card` and duplicating it on the Dashboard would show
  one concept twice under two names.
