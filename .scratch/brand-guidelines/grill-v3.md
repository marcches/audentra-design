# Grill — Brand Guidelines v3, 2026-08-22

The grilling record for the **reconstruction** of the book. Input: Marco's
`audentra-brandbook-v3-spec.md` (114 pages → 59, twelve chapters, twenty-two governing decisions
D1–D22). Companion files beside this one: `grill.md` (the v2 grill, still binding where v3 does not
overturn it), `audit.md`, `references.md`, `build.md` (v2's ledger), `build-v3.md` (this build), and
`research-v3/` (four primary-source documents commissioned before this round).

Marco's instruction on opening: read the spec whole, research freely, grill until nothing is
silently assumed, then build. His answer to round 1: **every recommendation taken.**

## What the research changed before a single question was asked

Four background agents, `research-v3/`:

- **`color-print-and-contrast.md`** — real ICC transforms (littleCMS, SWOP v2 and GRACoL 2006) and
  Adobe's licensed `PANTONE+ Solid Coated.acb` (Pantone's own Lab for 1,365 inks).
  **`#6A38FF` is ΔE00 13.8 outside the CMYK gamut** and prints as `rgb(97,88,166)`; Royal Blue is
  9.8; the purple's best Pantone is 266 C at ΔE00 9.2. All nineteen contrast ratios the spec
  proposed to publish verify exactly; the one gap, Purple 300 on Deep Navy, is **5.33:1**. And
  "19 px semibold" is wrong twice: W3C says 18pt (24 px) any weight, or 14pt (**18.5 px**) **bold**,
  and semibold is not bold.
- **`layout-and-templates.md`** — ten brand books measured page by page. **None stacks the lead
  above the content**; the title sits above and the lead sits in column 1 beside the content
  (Visa's content field begins at y 208 on every page). Chapter openers are identical to the pixel
  where they are good (Pitt, ten of ten) and colour as a chapter signal is constant, never rotating.
  A Carbon-standard 48 px row means our 600 px band holds a header plus **11** rows; an 800 px band
  holds **15**. In landscape, two contents columns leave the page half empty — four is normal.
- **`merch-and-gallery.md`** — 19 brand owners, 18 decorators, 28 event vendors, 8 platform owners.
  A merch chapter that carries rules is **captioned flat diagrams**, not photography (Apple's
  *Branded Merchandise Identity Guidelines* is the model). Four vendors state that thread cannot do
  gradients and **five publish that they will simplify or recolour a mark automatically if you do
  not ship a one-colour master** — a better argument for our embroidery rule than any minimum size.
  Real numbers: retractable 33″×80″ ordered, ≈33″×77″ visible; a "10 ft" backwall is 116.69″×92″;
  the badge slot punch eats the top 3/8″; Zoom 1920×1080 JPG/PNG ≤15 MB; Teams PNG/JPEG 360×360 to
  3840×2160.
- **`mobbin-visual-references.md`** — fourteen searches. The transferable mechanics: values live
  *outside* the swatch on a label plate (Mural); a specimen carries a micro-header of size/weight/
  tracking *above* it (Jasper); a do/don't grid is 3×2 and the grid itself is the taxonomy (Melius);
  and one rule holds across five gradient brands — **type never sits over a hue transition**, it
  goes in the flattest extreme or on a solid plate.

## Contradictions found inside the spec, before the grill

1. The document code is written `…-v2` twice in a book the spec calls v3.
2. D21 sets the tagline as type in Satoshi Bold; the email signature page correctly forbids Satoshi
   in a signature. Both are right; the rule was unscoped.
3. D8 calls the pt column "the real conversion at 96 DPI, ≈0.75". It is not: 15–18 px → 10.5–12 pt
   is 0.70 and 0.67.
4. The icon set is **78** glyphs today, not the 43 the grid shows or the 44 it claims.
5. The asset library's file-name pattern describes files that do not exist in the repository.
6. Facts verified in Figma: p.49's right column ends at y **1092** and p.89's at y **1084**, both
   past the page's own edge; p.20 really does run two column systems on one page.

## Round 1 — settled (Marco took every recommendation)

❓ **Q1 — Where v3 lives.** ➡️ A new page **`Brand Guidelines v3`** in the same file
(`i7gAADtBeCv5QPIAAHIncw`). The v2 page becomes `v2 — archive (2026-08-22)`. The
`Prototype — gradient` page goes: the gradient is decided and documented. `v1 — archive` stays,
because D20 uses its structure as the reference. `Assets` stays, minus the product-screen section
that D10 retires. The Kit becomes `Kit v3`, carrying the four templates as components.

❓ **Q2 — Version and document code.** ➡️ **`G-001-2608-BrandIdentityGuidelines-v3`**, and
**"Version 3.0 · August 2026"** on the cover and the closer. The book's own name aligns with its
code: **Brand Identity Guidelines**, not "Brand Guidelines".

❓ **Q3 — The page architecture.** ➡️ **The lead moves beside the content.** Title H1 at y 160
(full width), a 1 px rule at y 296, content field **y 340 → 960**, with the lead occupying column 1
of whichever column system the page uses. This is what every measured book does, it recovers 200 px
of vertical, and it removes the cause of the two bottom-margin overflows and the empty middle by
construction rather than by care.

❓ **Q4 — The chapter-opener rule.** ➡️ **One opener, twelve times, no variation: Navy canvas**,
chapter number and name, one support line, the chapter's page list at the right. **No mark, no
gradient.** Which makes "not a brand moment: a page of this book" true as written — the gradient is
the cover and the closer, and an opener is navigation.

❓ **Q5 — What a Gallery tile depicts.** ➡️ **Flat vector silhouettes drawn by us**, on a flat
field, with a fixed three-part caption: *item · substrate · decoration and colour of the mark*
(`Hoodie — Navy fleece · Embroidery, White master, left chest`). One row of six on Merchandise
(hoodie, half-zip, polo, tumbler, notebook, sticker; t-shirt, mug and pen named in the group
captions), five on Environmental (retractable banner, backdrop, table throw, lanyard, badge) plus
Zoom and Teams as a numbers block. Two rows of three does not work at 2.8:1 — a garment silhouette
stops reading below ~250 px.

❓ **Q6 — What the book says about the purple not printing.** ➡️ A **reproduction hierarchy** on
the colour pages: the hex is the colour; spot is how it prints correctly; the SWOP v2 build is an
approximation, named as one, with the sentence that purple and blue come out duller and why. Plus
the escalation rule — where the purple carries the brand on a printed piece, print it as a spot;
where that is impossible, the piece is Navy and White and the purple stays out. One footnote says
the Pantone numbers are proposals to confirm on a swatch book and a press proof. **ADR 0015.**
Rejected as too costly today: designating a second, print-only purple (UCLA's precedent).

❓ **Q7 — The pt column, and the Satoshi weights.** ➡️ **Keep the table, replace the justification**
— these are chosen print sizes, and the exact 96 DPI conversion (0.75) is stated on the page as a
reference rather than claimed as the column's formula. **Satoshi Medium is for a small heading in a
document**, never running text; body is Inter on every surface, this book included. The boundary is
**Bold at 20 px and above, Medium from 14 up to but not including 20**. ADR 0011 amended.

❓ **Q8 — The tagline as type versus the email signature.** ➡️ Scoped: as type the tagline is
Satoshi Bold **on a surface the brand composes**; **on a surface that renders on someone else's
machine — email is the only one — it is that surface's own type.** "Once per surface" is untouched.
**ADR 0013.**

❓ **Q9 — Contents granularity.** ➡️ **Four columns × three rows, one cell per chapter** — 4×402 is
a published step, and the measured books use three or more columns in landscape. Page number before
the page name, no leader dots. "How to use this book" occupies the lead column beside the grid.

❓ **Q10 — Marks misuse, twelve items on one page.** ➡️ Merge the two near-duplicates and **cut to
nine, at 3×544 across three rows** — 544 wide is the right shape for a horizontal mark. The marker
is a **faint Graphite tint over the whole tile with a broad diagonal, not a hairline, and a Graphite
✕ in the corner**, plus the rule's name in bold. A hairline reads as a scratch at book scale. The
line inherited from the retired Motion chapter is text, not a tile.

❓ **Q11 — The asset library.** ➡️ **Produce the library.** Export the eleven masters from the Figma
components into `docs/brand/assets/` under the published pattern (SVG plus PNG at 1×, 2×, 3×), so
the page points at files that exist. The templates row does not get a `[confirm]` replacement — it
leaves the directory, and returns when a template exists.

❓ **Q12 — Two copy rules the spec asks for and does not write.** ➡️ (a) **Month spelled out in
prose and on any brand surface; abbreviated only in a table or a capture credit, three letters, no
period** (Jan, Feb, Mar). (b) The WCAG correction is published verbatim from the source: *"Large
text is 18pt (24px) at any weight, or 14pt (18.5px) bold. Large text needs 3:1; everything else
needs 4.5:1. Semibold is not bold — semibold text is held to 4.5:1 at every size."*

❓ **Q13 — Chapter 04's density.** ➡️ **One Gradient page, held**, because Q3 passed and the band is
now 800 px rather than 600. Had the masthead stayed stacked, chapter 04 would have gone to nine
pages and the book to sixty; sixty good pages beat fifty-nine with one page jammed.

## Decided without asking, and confirmed

- Page titles in sentence case; **and**, never `&` — the spec's "Secondary Colors & Tints" is
  carried over from v1 and the v2 sweep had already settled this.
- The icon grid shows the **78** glyphs that exist today, with **no count** on the page. The durable
  rule is the one the book already has: *a glyph that is not in the file does not exist.*
- The proportions 45 / 15 / 20 / 10 / 10 are **White 45 · Navy 15 · Purple 20 · Blue 10 · Teal 10**.
- `docs/brand/CONTEXT.md` is swept to American English with the book, because it is the brand's own
  glossary.

## Documents this round produced

- **ADR 0012** — the gradient is a screen surface; nothing commissioned in physical form carries
  it; an environment may carry a gradient surface, an object may not.
- **ADR 0013** — the tagline appears once per surface.
- **ADR 0014** — the book makes no claim about how an image was made; FERPA and the institution's
  release process stay.
- **ADR 0015** — the reproduction hierarchy: hex is the authority, spot is how it prints, process is
  an approximation named as one.
- **ADR 0011 amended** — two Satoshi weights and the 20 px boundary.
- **`docs/brand/CONTEXT.md`** — new entries: Primary colors, Secondary colors, Alert palette,
  Reproduction hierarchy, One-color master, One color on an object; swept to American English.

## Carried forward from the v2 grill, unchanged

Q1 (who reads the book), Q2 (1920×1080, our own grid), Q8/ADR 0009 (host leads, Audentra signs),
Q16 (the gradient's construction, B′ and its deep form C), Q18 (the attribution's form), Q19
(product accent `#6854D9` is Purple tuned for UI; `--teal-500 #1A6984` is not brand Teal), Q23
(the attribution is removable by agreement), Q24 (lockup geometry relative to the Symbol), Q25
(minimums: Primary logo 200 px / 2 in, Logo 120 px / 1.25 in, Symbol 16 px / 0.25 in, attribution
never below 12 px).

## Closed

The frontier is empty. Build ledger: `build-v3.md`.
