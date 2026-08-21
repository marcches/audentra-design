# 4. Icons are Phosphor, vendored as path data, in four weights with one job each

Date: 2026-08-21
Status: accepted

## Context

The product's icons were hand-drawn in `src/design-system/Icon.jsx` — forty-seven glyphs, 24×24,
a 1.9 stroke, `currentColor`. The rule in `CLAUDE.md` said *icons are ours*, and the reason was
sound: no icon package, no external request, no second visual language.

Three things were wrong with the result by the Jam of 2026-08-21. The glyphs were by several hands
and did not agree with each other (the calendar's corners and the file's corners were different
radii; a 14px clock and an 18px clock were the same stroke). There was no filled or two-tone form
of anything, so a nav row could not say *you are here* with its glyph and a tile could not be told
apart from a button except by its background. And Marco asked for a standard that would use
Phosphor's weights *intelligently* — which is not a request a hand-drawn set can answer.

The alternatives were: keep drawing (consistency by discipline, which had already failed); add
`@phosphor-icons/react` (a dependency, a tree-shaking question, and a package that can change under
us); or vendor the path data.

## Decision

The glyphs are Phosphor's (MIT). The data is ours:

- `scripts/icons/manifest.mjs` maps our names to Phosphor's. Our names do not change when the
  drawing does; a component asks for `alert`, never `warning`.
- `npm run icons` fetches every name in four weights from the Phosphor core repository and writes
  `src/design-system/icon-paths.js`, which is committed. The product carries no icon package and
  makes no request for an icon at runtime.
- `Icon` renders 256-viewBox filled paths in `currentColor`, and chooses the weight by role:
  **regular** for any glyph of 16px or more; **bold** automatically below 16px; **fill** only for
  the *on* state of a stateful control; **duotone** only for the mark in a tinted tile. Light and
  thin are not vendored.
- The primitives that own tiles (`CardHead`, `StateCard`, `Spot`, the task-type and drawer tiles)
  and the nav row pass their weight themselves, so the rule is mostly not an author's to remember.

## Consequences

- Adding an icon is one line in the manifest and a script run; a misspelt Phosphor name fails the
  script rather than shipping as a blank.
- A Phosphor update is a deliberate re-run and a diff, not a package bump.
- `icon-paths.js` is ~80 KB (20 KB gzipped) for 59 icons × 4 weights. It grows linearly with the
  manifest; that is the price of any icon being able to play any role.
- Marks are not icons: the Aster mark and the Audentra symbol are drawn components under
  `design-system/marks/`, because an institution's mark that is also the glyph for *flower*
  somewhere else can be mistaken for a button.
- `CLAUDE.md` and `docs/agents/design-workflow.md` say this; the styleguide renders the full grid.
