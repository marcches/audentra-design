Jira: none — design-system feedback, Marco, 2026-08-21
Status: built (2026-08-21)
Labels: design-system, topbar, screen-all
Brief: *"[the momentum popover] e [the What changed popover] precisam ter mais a cara da audentra,
       parece um componente básico que baixamos da internet, deixe eles mais audentra por completo
       os dois"*

# The two topbar popovers, built out of the product's own vocabulary

## 1. What this answers

Both popovers were drawn from memory in `housing.css` — a misfiled block of hand-typed shell rules
(`.pop-panel`, `.pop-head`, `.pop-foot`, `.pop-state`) under a title about the topbar. Neither was on
the styleguide. Inside them: a grey strip with a title, uppercase `h3`s, rows of text, a grey strip
with a sentence. Nothing in them was a shape the rest of the product draws, which is why they read as
a component downloaded from somewhere else: they *were* their own component.

The finding is the usual one. **If a shape is not on the styleguide, it does not exist.** The popover
now is one, and what it holds is built from primitives the pages already use.

## 2. The shell — `Popover`, a card that floats

`design-system/patterns/Popover.jsx`, moved out of `app/TopbarPopover.jsx` with its behaviour intact
(trigger, scrim, `role="dialog"`, `Esc`, focus return, the same `--z-popover` pair as the preview
menu). What changed is what the panel **is**: a `Card`. It carries `section-card`, so it publishes
`--card-pad` and `--card-radius`, and the head, the rows and the foot inside it are the card's own
three zones — the same rules that draw every block of every main column, not a second set.

| | Before | After |
| --- | --- | --- |
| Panel | `.pop-panel`, its own radius, border, padding | `Card` + `.pop-panel` — `--radius-card`, `--shadow-soft`, `--card-pad` |
| Head | `.pop-head` — a grey strip with an `h2` | `CardHead kind="status"` — bare outline glyph, the name, the line under it, a trailing cell |
| Groups | `.note-group h3`, `.points-awards h3` — two uppercase headings | `.rows-label` — the run label My Profile already had, promoted to `patterns.css` |
| Rows | text | `.pop-row` — a 40px tinted tile, the copy, the trailing cell, on the card's white with hairlines |
| Foot | `.pop-foot` — a grey strip | `CardFoot` holding a `Notice`, its action a link |
| States | `.pop-state` — a grey paragraph | `StateCard` compact — crimson for a failed load, the orbit spot when there is nothing |

Width `--popover-width` (372px — 344 was a squeeze for a 40px tile, a two-line title and a trailing
cell) and at most `--popover-max-height` (720px) or the window minus the topbar, whichever is less,
scrolling under its own sticky head past that; below 820 it is `min(--popover-width, 100vw − 2·space-6)`,
below 620 it is fixed to the viewport as before. One finding on the way: a sticky head is kept inside its
containing block's *content* box, so a head that reached the panel's top edge through the card's
negative margin was pushed 20px down into the padding — the panel now has no top padding and its first
zone no negative top margin, measured rather than eyeballed.

## 3. What changed — the feed

- **The head says the standing.** `bell` outline, *What changed*, and one line that counts: *3 unread ·
  1 needs you*, *2 unread*, *Nothing unread*. *Mark all read* is the trailing cell, still with no
  destructive neighbour.
- **Two runs, labelled once.** *Needs you* and *Also new* are `.rows-label`s inside `CardRows`. The
  needs-you label is crimson — the same colour the bell's badge spends for the same reason, so the panel
  and the chip agree (ENR-167: *the interruption may spend colour*). *Also new* is muted.
- **Each row carries what the thing is.** A 40px tile with a duotone glyph — `upload` for a document sent
  back, `file` for a transcript received, `home` for the housing form, `wallet` for the award letter,
  `shield` for an accepted proof. `icon` is now a field on the notification, beside `route`, because the
  glyph is part of what the event *is*; the panel does not guess it from the route. The tile is tinted
  **once**: crimson on the needs-you row, neutral purple on everything else — *spend colour once per card,
  on the row that is asking*.
- **Unread is weight and a dot, in the trailing cell.** The title is semibold while unread and regular
  once read; the ink dot sits before the arrow. It never carries the category as well (ENR-161 kept).
- **A gone item is a row with no door**: muted, no arrow, and it says why.
- **States**: loading is three skeleton rows in the row's own anatomy (tile, two lines); error is
  `StateCard variant="error" size="compact"` with *Try again*; empty is `StateCard variant="empty"` with
  the bell in the spot.
- **The foot is a `Notice`**: *Need a person? Nothing here takes a reply.* with the one action, *Help →*,
  as a real link to `#/help` (`Notice` learned `action.href` for exactly this).

## 4. Your momentum — the balance

- **The popover opens the way a rail opens: with the figure on ink.** `AnchorCard variant="balance"`
  is the panel's first zone, taking the card's top corners — label, the figure at `--fs-figure`, the
  one line under it (*One late fee waived is 372 pts away* / *You haven't earned any points yet…* /
  *Everything on Aster's reward list is within reach*), and the ladder track drawn on ink: `--on-ink-line`
  track, `--purple-line` fill, a mark per threshold that turns `--on-ink` when reached. `MomentumCard`
  in My Enrollment's rail is already on ink; the popover and the rail card are now the same surface.
  The spark glyph sits in the anchor's corner as a bare outline — duotone never sits on a gradient.
- **What it reaches** — a run label, then one compact row per reward: a marker disc (the same mark the
  track wears), the name, the cost in tabular figures. The *next* reward is the row the balance is
  heading for: ink, semibold, on a faint purple wash; a reached reward gets a green disc (and says so to a
  screen reader); the rest are muted. The cost stays in the trailing cell on every row — it is the fact;
  the disc is the standing. Still no control on any row (ENR-148).
- **How you earned it** — a run label with the count in its `em`, then up to three rows in the completed
  step's anatomy: `kindIcon(award.kind)` in a 40px duotone tile (the same tile the step wore on My
  Enrollment), the title, the date, and `+150` in purple. *and 2 more* stays a sentence, because there is
  nothing for it to open.
- **The foot is a `Notice`** with the guarantee (ENR-162 AC 4) and *How points work →* as its action.
- **Balance unavailable**: the anchor stays, the figure is *—*, the line says nothing is lost, the track
  and the rows are not drawn, the foot stays. One shape, not a second one for the failure.
- **Colour budget kept**: nothing on the chip changed; inside the panel the only accent is the purple the
  product already spends on a step's points and on the next step, and the ink anchor is the rail's
  plane, not an accent.

## 5. CSS moved, and the proof

Three blocks moved between files; two of them render on every route.

- `.topbar-pop`, `.topbar-chip`, `.bell-chip`, `.points-chip svg`, `.chip-figure`, `.chip-unit`,
  `.chip-reach`, `.bell-count` and the two chip media rules → `chrome.css`, where the topbar lives.
- `.rows-label` (base, `svg`, `em`) → `patterns.css`; Profile keeps its two tone classes.
- `.pop-*` shell → `patterns.css` under *Popover*; the feature files keep only their own content rules.

Captured before and after with the node/Playwright harness (the MCP browsers were held by a peer
session): `.topbar *` at 1440 and 500 on `#/enrollment`, `.rows-label *` and the cards on `#/profile` at
1440 — 76 elements, two baseline runs identical, **0 differ** after the move.

## 6. Out of scope, deliberately

- The chips themselves and the preview pill — settled by *The shell holds still* (2020824).
- Redemption, a reply control, a sixth office — the three cards' own guardrails.
- The preview menu's 9px offset and 15px radius — a control the student never sees.

## 7. Done when

- [x] Both popovers built from `Card`/`CardHead`/`CardRows`/`CardFoot`, `Notice`, `StateCard`,
      `AnchorCard`, `.rows-label`, `.task-type-icon`; no class typed by hand that a primitive owns
- [x] `Popover` on the styleguide, under Overlays
- [x] Every state reachable: ready, loading, error, empty, rewards-off, balance unavailable, no awards
- [x] `npm run build` clean; topbar/Profile capture 0 differ; screens checked at 1440 and 390
- [x] `Esc`, scrim click and focus return still work; `Tab` reaches every control in both panels
