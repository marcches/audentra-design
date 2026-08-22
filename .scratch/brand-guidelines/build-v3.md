# Build log — Brand Identity Guidelines v3 in Figma

The state ledger for the v3 reconstruction, so a fresh session can resume. Figma file
`i7gAADtBeCv5QPIAAHIncw` (https://www.figma.com/design/i7gAADtBeCv5QPIAAHIncw). Every id below was
returned by a `use_figma` call; never guess one. Decisions come from `grill-v3.md`; the research
that fed them is in `research-v3/`; the recipe is `kit-v3.js` beside this file.

## Pages (order in the file)

| Page | Id | Role |
|---|---|---|
| Brand Guidelines v3 | `128:1246` | the book — 59 frames, built 2026-08-22 |
| v2 — archive (2026-08-22) | `64:2` | the 114-frame v2, untouched |
| Kit (shared) | `65:2` | Do-Don't, Swatch, Callout components |
| v1 — archive (Vekend-inspired deck, 2026-08-21) | `4:2` | the 62-frame v1 — the *structural* reference D20 draws on |
| Assets (uploaded) | `0:1` | logo masters, brand photography, the generated icon and gallery artwork |

`Prototype — gradient` was removed: the gradient is decided (B′ and its deep form) and documented
on page 26.

## What v3 reuses unchanged

The `Color` variable collection (`VariableCollectionId:64:3`), the `Book/*` text styles, and the two
paint styles `Brand gradient` and `Brand gradient / Deep`, all created for v2. Three variables were
added for the Alert palette: `state/information` → brand/blue, `state/backlog` → neutral/slate,
`state/in-progress` → brand/teal.

**The Satoshi step is still manual.** The MCP runtime loads Google Fonts only — 1,938 families, none
of them Satoshi — so every heading renders Inter until someone with the font installed sets the
`Typography` collection's `font/heading` variable to "Satoshi" in Figma. Every `Book/*` heading style
and every hand-set specimen on pages 29, 30, 31 and 33 binds `fontFamily` to that variable, so one
value flips the whole book. The closer's tagline binds too.

## The page architecture (changed from v2)

The measured finding that reshaped it: **none of the ten brand books measured stacks the lead above
the content** (`research-v3/layout-and-templates.md` §1). The title sits above; the lead sits in
column 1, beside the content.

```
chapter label (Book/Label, text/secondary)   120, 96
page number  (Book/Page number)              right-aligned to 1800, y 96
title        (Book/H1)                       120, 160, width 1396
[subtitle]   (Book/Body, width 1112)         120, 236 — Misuse and Gallery pages only
rule         1 px line/default               120, 296 → 1800
content band                                 y 340 → 960
```

The lead is the first column of whichever system the page uses. A page with no lead uses the full
field. **Nothing crosses y 960 and nothing sits outside x 120–1800** — verified across all 59 frames:
385 top-level blocks, 0 violations.

### The column system

One 12-column grid generates all four steps, with a constant 24 px gutter:

`w(n) = 118n + 24(n−1)` · `x(n) = 120 + 142(n−1)`

| span | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| width | 118 | **260** | **402** | **544** | 686 | **828** | 970 | 1112 | 1254 | 1396 | 1538 | **1680** |
| origin | 120 | 262 | 404 | 546 | 688 | 830 | 972 | 1114 | 1256 | 1398 | 1540 | — |

The 4-up column is **402**, not v2's 400 — 400×4 left 80 px over three gaps (26.667) and gave the
book two gutters, which is exactly the ambiguity that let v2 place a row at 520/240/520. In use:
4-up `120·546·972·1398`, 3-up `120·688·1256`, 2-up `120·972`, 1-up `120`. A lead is span 4 (544);
the field beside it is span 8 (1112), which subdivides into 2×544 or 4×260.

### The four templates

- **A — lead + tile grid.** Lead 544 at x 120; tiles 544 at x 688 and x 1256, or 260 at 688/972/1256/1540.
- **B — lead + wide table.** Lead 544; table 1112 at x 688. Ruled rows, no zebra, no vertical rules,
  a Book/Label header. Values in Book/Caption (16 px) once a table runs past four rows — Book/Body
  at 20 px overflows the band at seven rows and that mistake was made twice before it was measured.
- **C — lead + diagram.** Lead 544; diagram 1112 at x 688, or two tiles of 544. Any cards live in
  the lead column, never stacked under the diagram — that stacking is what overflowed v2 p.49 and p.89.
- **D — misuse.** No lead column: a one-line subtitle at y 236, then 9 tiles of 544×196 in 3×3, or
  6 of 544×298 in 3×2.

### The misuse marker

Corrected mid-build by `research-v3/layout-and-templates.md` §a.5. A wide diagonal band hides the
violation the tile exists to show; the corpus uses a **hairline diagonal, corner to corner, at 2 px
at our page scale, plus a 1 px tile outline**, and lets the caption carry the prohibition. Every
caption begins "Don't". The marker is Graphite, never a state colour. No wash over the specimen.

### The chapter opener

One shape, twelve times, no variation: **Navy canvas**, the chapter number in Display at 32 %
opacity (y 560), the title in Display (y 684), one support line (y 846), the chapter's page list at
x 1256. **No mark, no gradient** — which is what makes "not a brand moment: a page of this book"
true as written. The block is anchored low, the way the measured openers are; six of eight books
move the title and enlarge it, and none moves it a little.

## Progress — all 59 frames, done 2026-08-22

| # | Page | Id |
|---|---|---|
| 01 | Cover | `130:2` |
| 02 | Contents | `165:1006` |
| 03 | Section 01 Brand | `130:62` |
| 04 | Story and positioning | `130:73` |
| 05 | Personality, principles, and accessibility | `135:55` |
| 06 | Brand at a glance | `135:118` |
| 07 | Section 02 Voice | `137:55` |
| 08 | How we sound | `137:67` |
| 09 | Tone guidance | `137:102` |
| 10 | Language and writing guidelines | `139:55` |
| 11 | Before and after | `139:140` |
| 12 | Section 03 Marks | `140:55` |
| 13 | Logo family | `140:69` |
| 14 | Construction | `142:282` |
| 15 | Masters and backgrounds | `140:171` |
| 16 | Clear space and minimum sizes | `142:359` |
| 17 | Placement and the Symbol alone | `144:353` |
| 18 | Misuse | `145:439` |
| 19 | Section 04 Color | `148:553` |
| 20 | Primary colors | `148:569` |
| 21 | Neutral palette | `149:553` |
| 22 | Secondary colors and tints | `149:640` |
| 23 | Alert palette | `149:700` |
| 24 | Proportions and canvases | `150:553` |
| 25 | Pairings and contrast | `150:594` |
| 26 | The gradient | `151:553` |
| 27 | Misuse | `151:694` |
| 28 | Section 05 Typography | `152:659` |
| 29 | Font family | `152:672` |
| 30 | Hierarchy | `152:695` |
| 31 | Weights | `153:659` |
| 32 | Values, code, and the web stack | `153:697` |
| 33 | Misuse | `153:748` |
| 34 | Section 06 Imagery | `154:659` |
| 35 | Direction | `154:670` |
| 36 | Light, color, crop, and treatment | `154:695` |
| 37 | Sourcing and rights | `154:722` |
| 38 | Section 07 Iconography | `156:659` |
| 39 | The set | `156:669` |
| 40 | Weights, sizes, and misuse | `156:842` |
| 41 | Section 08 Co-branding | `157:659` |
| 42 | Roles and attribution | `157:670` |
| 43 | Login, emails, and lockup geometry | `158:669` |
| 44 | For the client's brand office | `158:805` |
| 45 | Section 09 Applications | `159:692` |
| 46 | Email signature | `159:704` |
| 47 | Transactional email and slides | `160:718` |
| 48 | Social | `160:871` |
| 49 | Card and stationery | `160:970` |
| 50 | Section 10 Brand to product | `161:944` |
| 51 | One language, two surfaces | `161:954` |
| 52 | The tokens map | `161:999` |
| 53 | Section 11 Assets and governance | `162:944` |
| 54 | Asset library and file directory | `162:954` |
| 55 | Naming and what's new | `162:1026` |
| 56 | Section 12 Gallery | `164:944` |
| 57 | Merchandise | `164:954` |
| 58 | Environmental and events | `164:1032` |
| 59 | Closer | `165:944` |

Frames are named `NN Title` and laid out 6 per row: `x = ((n−1) % 6) · 2080`,
`y = ⌊(n−1) / 6⌋ · 1320`.

## Generated artwork

Three drawings are produced by script rather than drawn by hand, so they cannot go stale:

| What | Script | Uploaded as | On the Assets page |
|---|---|---|---|
| The 78-glyph icon grid | `scratchpad/gridgen.mjs`, from `src/design-system/icon-paths.js` | SVG → vector tree | `155:659` |
| The four icon weights | `scratchpad/weightsgen.mjs` | SVG | `155:3465` |
| The icon size ladder | same | SVG | `155:3479` |
| Six merchandise silhouettes | `scratchpad/gallery.mjs` | SVG | `163:944` |
| Six environmental silhouettes | same | SVG | `163:1258` |

The icon grid is generated from the manifest, so **the count on the page is the count in the file**
— 78 today, and no number is printed, per the rule the book states.

The asset library itself is in the repository, generated by `npm run masters`
(`scripts/brand/masters.mjs`): 11 SVG masters plus the same 11 as PNG at 1×, 2× and 3× in
`docs/brand/assets/`. The book's page 54 lists those names, and they exist.

## Verified

A sweep over all 59 frames at the end of the build: 59 frames, 0 missing numbers, 0 duplicates,
12 dividers, 385 top-level blocks, 1,444 text nodes. **0 blocks past y 960, 0 blocks outside
x 120–1800, 0 page numbers disagreeing with the frame name.** No `text/tertiary` (Slate) is used as
text on a paper canvas anywhere — it fails AA at 2.5:1 on white and was caught and swept on the
first page built.

## Open, and deliberately so

- **`font/heading` → "Satoshi"** in Figma's Variables panel. One value; the runtime cannot do it.
- **The Pantone numbers are proposals.** `research-v3/color-print-and-contrast.md` §9 is the
  checklist to take to a swatch book and a press proof. 7480 C (Success) and 326 C (Teal 700) are
  the two that most need it.
- **Templates do not exist** — deck, letterhead, envelope, card, signature snippet. Page 54 says so
  rather than pointing at a file that is not there.
