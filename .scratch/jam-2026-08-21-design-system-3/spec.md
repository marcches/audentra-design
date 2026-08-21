Jira: none — design-system feedback, Marco's round three of 2026-08-21 (the same afternoon)
Status: built (2026-08-21)
Labels: design-system, persona-student, screen-profile, screen-health
Brief: *"você adicionou o accessibility e o documents pra dentro de outras páginas, certo, mas você
       precisa mudar o fluxo dele — eles não abrem mais outras páginas próprias, eles abrem apenas o
       rail lateral. Tem que seguir a padronização do fluxo do usuário."*

# Two doors that opened the wrong way

## 1. What this answers

Round one moved My Documents under Profile and Accessibility under Health, took both rows out of the
sidebar, and built `EntryCard` as the way in. It stopped one step short. Both kept their route and
their page, so what the entry card actually did was **navigate** — and the result was a fourth kind
of destination the portal has no vocabulary for:

> a page with no sidebar row, reachable from exactly one card on one other page, at a URL that
> nothing in the navigation links to and that the back button can strand you on.

The portal has one way of opening what lives inside a page and it is not a route. It is `Drawer`.
Every list in the product already works this way — a task on My Enrollment, a residence on Housing,
an event on Campus, a document on the record itself. Two doors were opening differently from every
other door, and that is the whole finding.

## 2. The rule

**What has no row in the sidebar has no page.** A concept is either a destination — a row, a route,
a hero band, a placeholder while it is unbuilt — or it is a panel, opened from the page that owns
it. There is no third thing. If a section is important enough to deserve a URL, it is important
enough to deserve a row; if it is not, it opens where everything else inside a page opens.

## 3. What changed

| | Before | After |
| --- | --- | --- |
| My Documents | `#/profile/documents`, a page under `profile` | `DocumentsPanel`, opened from the entry card on Profile |
| Accessibility | `#/health/accessibility`, a page under `health` | `AccessibilityPanel`, opened from the entry card on Health |
| `navigation.js` | both were `DESTINATIONS` entries carrying `parent` | both are `PANELS` entries; `parent` is gone, and so are the two routes |
| `EntryCard` | `href` → `<a class="secondary-button">` | `onOpen` → `<button class="secondary-button">` |
| The six deep links | pointed at `#/profile/documents` | point at `#/profile` |
| Preview states | `DOCUMENT_PREVIEW_STATES`, `ACCESSIBILITY_PREVIEW_STATES` | folded into `PROFILE_STATES` and `HEALTH_PREVIEW_STATES` — a state you cannot reach is a state nobody can look at |

The old hashes fall through to the 404, the way `#/dashboard` does.

## 4. What the panels do not carry

Decided with Marco: **only the lists.** A panel is 465px, and a page copied into it at 465px is a
worse page, not a panel.

- **The progress ring and `5 of 8 accepted`.** A figure earns a panel when it is the section's
  standing and the content below is the detail. Here the panel *is* eight rows, and a ring above
  them is the same eight rows counted rather than read. The standing survives as the one sentence
  under the heading — `standingLede()`, the same function the entry card on Profile already used, so
  the door and the room cannot disagree.
- **The advisor bar.** Reaching Dana is not what this door was opened for, and she is on My
  Enrollment, where the steps she can unblock live.
- **Both rails.** `With Aster right now` restated the rows beneath it. `Usually replies in 2 days`
  and `Who is on the other side` both named Accessibility Services, which the panel's own label
  names. The one thing in either rail that was not a restatement — the retention guardrail, *Aster
  never writes over your first file* — moved to the foot of the documents panel, under the record it
  qualifies.
- **The office eyebrow inside the accommodation card.** It is the drawer's label now, which is where
  a drawer says who owns what is in it.

## 5. Construction

- `DocumentsPanel` opens `DocumentDrawer` **on top of itself** and goes `suspended` while it is
  there, so `Esc` unwinds one layer at a time — the contract `lib/overlay.js` exists to keep.
- `.card-rows` bleeds to a card's edge by pulling `--card-pad` back on each side, and inside a drawer
  the edge is the drawer's. The first attempt set `--card-pad: var(--space-11)` on the panel, which
  was right at 1440 and wrong at 390: the sheet narrows its padding to `--space-9` below 620, so
  every row hung 10px off both edges of the panel and the panel scrolled sideways. Caught in the
  browser, not in the build. The fix names the inset once — `--drawer-inset` on `.drawer-content`,
  set to `--space-11` and to `--space-9` in the sheet media query — and the padding and the bleed
  both read it, so they cannot disagree at any width.
- `.question-head h2` and `.drawer-content h2` tie at one class each. The accessibility rule now
  names its parent — `.drawer-content .question-head h2` — so it wins **by rule** rather than by
  which file the cascade happens to read last. This is the failure mode `CLAUDE.md` documents twice.
- `App` still holds the record, the send clock, the read marks and the accommodation answer. It hands
  them to Profile and Health, which hand them to the panels. Nothing about *where the state lives*
  changed, which is why the check still survives closing the panel (ENR-157 AC 3) and the answer
  still survives leaving the section (ENR-208 AC 5).

## 6. Not done, and why

- **No deep link to an open panel.** Marco chose the routes gone rather than kept as a state. So
  `?panel=documents` does not exist, and the six links that used to land inside the record now land
  on Profile with the door in view. If a notification ever needs to land *inside* a decision again,
  that is a card, not a silent re-addition of the route.
- **`Sidebar.jsx` still reads `destinationById(activeId)?.parent`.** `parent` no longer exists, so
  the two expressions are permanently false — dead, not broken. The file was held by a concurrent
  session doing the navigation pass; the removal was handed to it rather than raced.

---

# Round two, the same afternoon: the door was a card with nothing in it

## 7. What Marco caught

> *"Só copiou e colou na página. Precisa adaptar a página, colocar em lugar que não
> prejudique a ordem de importância dos itens. Não precisa desse blocão todo — usa um
> mecanismo diferente, tem tantos pelo sistema."*

Two findings, and the screenshots carried a third we had not seen.

1. **`EntryCard` was a card with nothing in the room.** `Card` + `CardHead` + `CardFoot`
   and no content between them, so what it drew was two bands with a strip of the card's
   own `--card-pad` showing white between them. Visible in both screenshots, and it is
   exactly the shape the Jam of 2026-08-21 struck off My Enrollment. `Notice.jsx` spends
   a paragraph on it: *a band on the canvas is a card with nothing in it, and it is what
   you get when a thing is given a place of its own instead of a place in something.* We
   wrote that rule down twice and then shipped a component that breaks it.
2. **The weight inverted the page.** On Health the door stood at the immunization
   record's size — the one obligation that blocks registration — for a question that must
   never read as one (ADR-0001, ENR-208 AC 3). On Profile it was the first block on the
   page, above the record the page exists to show.
3. **The mechanism already existed, one file away.** Profile's own foot had
   `.elsewhere-row`: icon tile, name, one line, and where the click goes, three to a card.
   A door, drawn correctly, sitting unnamed in `features/profile.css` where no second page
   could find it — the audit's finding in miniature.

## 8. What replaced it

`EntryRow` in `design-system/patterns/`, and `EntryCard` is deleted.

- **The anatomy is Profile's, unchanged.** `.elsewhere-*` moves to `patterns.css` as
  `.entry-*` and goes on the styleguide. Proven, not eyeballed: the two carried-over doors
  were captured twice before and twice after at 1440 and 390 — x, width, height, grid
  columns, colour, type, padding all identical. The only delta is `border-top: 0 → 1px` on
  the first of them and the 1px it pushes down, which is the hairline it is *supposed* to
  gain now that a row sits above it.
- **Two kinds, told apart by the trailing cell.** `href` renders an `<a>` and `where` names
  the section; `onOpen` renders a `<button>` and `where` is `Open`. A student is owed the
  difference between *this takes you somewhere* and *this opens here* before she clicks.
- **`count` is optional and never invented.** No chip at zero.
- **Health**: one row, in a card with no head, after the record. A card whose only child is
  a list now takes the card's radius on all four corners (`.section-card > .card-rows:only-child`),
  so the first row does not meet a rounded card with a square edge — the tell `Card.jsx` names.
- **Profile**: the door joins the page's existing list of doors at the foot, leading it,
  with its count. `What lives somewhere else` becomes `The rest of your record`, because
  the list now mixes one panel that opens here with two sections that do not.

## 9. The bug the capture caught

The `width<=620` override for the row went into one of `patterns.css`'s existing media
blocks — which sit **above** the base rule in the file. Equal specificity, and a media query
does not raise it, so the base won by position: the row kept three columns at 390 and grew
an implicit fourth. It is the failure `CLAUDE.md` documents twice, committed for the third
time and caught only because the rows were being diffed against a baseline. The block now
sits directly under the rules it overrides, with the reason written beside it.
