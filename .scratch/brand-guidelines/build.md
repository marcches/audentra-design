# Build log — Brand Guidelines v2 in Figma

The state ledger for building the v2 book, so a fresh session can resume. Figma file
`i7gAADtBeCv5QPIAAHIncw` (https://www.figma.com/design/i7gAADtBeCv5QPIAAHIncw). Every id below was
returned by a `use_figma` call; never guess one — re-read this file or re-discover by name.
Decisions come from `grill.md`; the page map is in `grill.md` Q27 and is reproduced per chapter
below as chapters get built. Recipe for a page is `kit.js` beside this file.

## Pages (order as in the file)

| Page | Id | Role |
|---|---|---|
| Brand Guidelines v2 | `64:2` | the book, being built |
| Prototype — gradient | `61:2` | the gradient prototype; B′ `61:1462` chosen, C `61:7` deep form, A `61:3` / B `61:5` discarded |
| v1 — archive (Vekend-inspired deck, 2026-08-21) | `4:2` | the 62-frame v1, untouched, for reference and migration |
| Assets (uploaded) | `0:1` | logo masters (components) and the old rasters |

## Logo master components (Assets page)

`Logo / Primary (Full) — Color|Reverse|White|Navy` = `21:56` / `22:2` / `21:111` / `21:166` (990×219) ·
`Logo / Logo — Color|Reverse|White|Navy` = `20:16` / `22:56` / `20:31` / `20:46` (990×150) ·
`Logo / Symbol — Color|White|Navy` = `20:53` / `20:60` / `20:67` (192×150).

## Variables — collection `Color` (`VariableCollectionId:64:3`, one mode)

brand/purple `#6A38FF` · brand/blue `#1E5BFF` · brand/teal `#02CDC7` · brand/navy `#0A1F44` ·
brand/white · purple/700 `#502ABF` · purple/500 · purple/300 `#9E7EFF` · purple/100 `#D2C3FF` ·
blue/700 `#1744BF` · blue/500 · blue/300 `#6D94FF` · blue/100 `#BCCEFF` · teal/700 `#04B2A9` ·
teal/500 · teal/300 `#67E1DD` · teal/100 `#B3F0EE` · neutral/white · neutral/cloud `#F2F4F7` ·
neutral/mist `#EAECF0` · neutral/slate `#98A2B3` · neutral/graphite `#667085` · neutral/ink `#101828` ·
neutral/navy `#0A1F44` · state/success `#12B76A` · state/warning `#F79009` · state/error `#D92D20` ·
product/accent `#6854D9`. Roles (aliases): canvas/paper → neutral/white · canvas/navy → brand/navy ·
surface/tile → neutral/cloud · line/default → neutral/mist · text/primary → neutral/ink ·
text/secondary → neutral/graphite · text/tertiary → neutral/slate · text/on-dark → neutral/white ·
text/accent → brand/purple · accent/brand → brand/purple. 38 variables. The old `Typography`
collection (`font/heading` = Inter etc.) is left alone — it belongs to the v1 archive.

## Styles

Text (size / line-height % / tracking %), after Marco's typography decision of 2026-08-22 (ADR
0011 — Satoshi headings, Inter text, no mono): Book/Display Satoshi Bold 104/100/−2.5 · Book/H1
Satoshi Bold 64/104/−2 · Book/H2 Satoshi Bold 40/112/−1.5 · Book/H3 Satoshi Bold 28/120/−1 ·
Book/Lead Inter Regular 26/140/−0.5 · Book/Body Inter Regular 20/150 · Book/Body strong Inter Semi
Bold 20/150 · Book/Caption Inter Medium 16/140 · Book/Label Inter Medium 14/120/+4 UPPER ·
Book/Value Inter Medium 18/150/+1 · Book/Value small Inter Medium 14/140/+1 · Book/Page number
Inter Medium 16/120. Each style's family is bound to the `Typography` collection: headings →
`font/heading`, text → `font/body`, values → `font/value` (renamed from `font/mono`, now "Inter").
**`font/heading` reads "Inter" because the MCP runtime loads Google Fonts only; set it to "Satoshi"
in Figma's Variables panel and every heading follows.** Texts with an explicit `fontName` override
(specimens, misuse demos) do not follow the variable and were rebuilt by hand.
Paint: `Brand gradient` (Purple 0 · Purple 0.42 · Blue 0.72 · Teal 1, transform
`[[0.5,0.5,0],[-0.5,0.5,0.5]]`) · `Brand gradient / Deep` (Navy 0 · Navy 0.15 · Purple 0.42 ·
Blue 0.72 · Teal 1).

## The page grid (every 1920×1080 frame)

Margins 120 left/right, 96 top, 120 bottom. Chapter label (Book/Label, text/secondary) at (120, 96);
page number (Book/Page number, text/secondary) right-aligned to 1800 at y 96; title (Book/H1,
text/primary) at y 160; lead (Book/Lead, text/secondary, width 1000) under it; content area from
y 360 to 960. Light pages: canvas/paper. Chapter covers: canvas/navy, title in text/on-dark.
Brand moments (cover, closer): `Brand gradient`. Frames are named `NN Title` and laid out 6 per
row: x = (i % 6) · 2080, y = ⌊i / 6⌋ · 1320, i = the page index from 0.

## Progress

| Chapter | Frames | Status | Ids |
|---|---|---|---|
| Foundations | — | done 2026-08-22 | page `64:2`, collection, styles above |
| Kit components | — | done | page `65:2`; Kit / Do-Don't set `65:17` (Do `65:3`, Don't `65:10`), Kit / Swatch `65:18`, Kit / Callout `65:22` |
| 00 Cover and Contents | 3 | done | 01 Cover `66:2` · 02 Contents `66:20` · 03 How to use this book `66:84` |
| 01 Brand | 8 | done | 04 divider `68:18` · 05 Story `68:31` · 06 Positioning `70:15` · 07 Personality and principles `70:65` · 08 Audiences `70:130` · 09 Promise and tagline `71:15` · 10 Accessibility as a principle `71:46` · 11 Brand at a glance `71:70` |
| 02 Marks | 14 | done | 12 divider `73:33` · 13 Logo family `73:52` · 14 Symbol construction `74:156` · 15 Logo construction `74:226` · 16 The four masters `73:144` · 17 Versions and backgrounds `75:214` · 18 Clear space `75:437` · 19 Minimum sizes `75:518` · 20 Placement `76:484` · 21 Symbol alone `76:600` · 22 Misuse I `77:601` · 23 Misuse II `77:780` · 24 Attribution `76:668` · 25 Do and don’t `77:920`. Construction, clear-space and minimum-size diagrams were harvested from v1 frames 22:299 / 22:153 / 22:362 / 22:436 (cloned, moved, restyled to variables and Book/Mono small). |
| 03 Color | 11 | done | 26 divider `79:750` · 27 The palette `79:766` · 28 Proportions `79:810` · 29 Specifications `80:768` · 30 Tints and shades `80:840` · 31 Neutrals `80:894` · 32 State colours `81:775` · 33 Approved pairings and contrast `81:817` (ratios computed in-script from the hex values) · 34 Colour in the product `81:909` (added variable `product/teal-500` #1A6984) · 35 Dark canvas `82:777` · 36 Misuse `82:818` |
| 04 Gradient | 7 | done | 37 divider (on the gradient) `83:790` · 38 The construction `83:802` · 39 Where it lives `83:855` · 40 The deep form `84:871` · 41 With type and the White master `84:927` · 42 With photography `84:964` (photo placeholder until chapter 07) · 43 Misuse `84:1002` |
| 05 Typography | 9 | done (rebuilt for ADR 0011) | 44 divider `85:910` · 45 Satoshi and Inter `90:910` · 46 Hierarchy scale `85:947` (relabelled) · 47 Weights `90:933` · 48 Values and code `90:976` · 49 Web stack and fallbacks `90:1018` · 50 Numerals and details `87:910` · 51 Type on canvases `87:939` · 52 Misuse `90:1042` |
| 06 Voice | 7 | pending | |
| 07 Imagery | 8 | pending | |
| 08 Iconography | 6 | pending | |
| 09 Motion | 5 | pending | |
| 10 Layout and composition | 6 | pending | |
| 11 Co-branding | 8 | pending | |
| 12 Applications | 10 | pending | |
| 13 Brand → Product | 5 | pending | |
| 14 Assets and governance | 7 | pending | |
