# Layout and templates — how strong brand books build a page

Date: 2026-08-22
Author: research agent (primary sources only).
Companion files: `../references.md` (what the sections *contain*) and `../audit.md`. This file is
about what a *page* is made of — the grid, the templates, the furniture and the annotation grammar.
Source ids here are `L1…Ln` so they cannot collide with `references.md`'s `S…`/`U…` ids;
where a document already appears there, the cross-reference is given.

## Question

Our book is 59 landscape pages at 1920×1080. We have decided (D16) on exactly four page templates
— A tile grid, B wide table, C diagram + up to 3 cards, D misuse — plus two rules: every block sits
on a published column step, and no block crosses the bottom margin. Eight questions, all about
whether that survives contact with real books, and what the real books do that we have not thought
of.

## Already covered in `references.md` — not repeated here

- Clear-space **units** (x-height, half the V, the octothorpe, the letter "e") and minimum sizes in
  px + mm/in: `references.md` §03. This file adds only the *drawing* of those pages — how the
  annotation is composed — not the rules themselves.
- Colour spec **content** (which spaces are published: PMS/CMYK/RGB/HEX and contrast tables):
  `references.md` §04. This file adds only how such a specification is typeset.
- Misuse **lists** (Shopify's nine violations, MIT's Do/Don't page, Apple Pay's prohibitions):
  `references.md` §03. This file adds the marker, the colour and the tile composition.
- The existence of a "Layout and grid" section in strong systems (IBM 2x Grid, GitHub Layouts,
  Vercel Geist Grid, Stanford identity bar, Penn State brand bar): `references.md` §12. This file
  adds the numbers and how they are presented on one page.
- Governance furniture (changelog, last-updated, trademark line, contacts): `references.md` §16 and
  "Patterns worth copying" item 8.

## Method

Two kinds of evidence, kept apart:

1. **Measured.** Every PDF below was opened with `pdfplumber` (Python 3.14) and interrogated
   programmatically: page `MediaBox` in points, word bounding boxes, rectangle and line geometry,
   image bounding boxes, and PDF link annotations. Pages were rendered to PNG at 100–110 dpi and
   read as images so that composition claims are claims about pages actually seen, not inferred
   from extracted text. **Every measured figure in this file is stated in the book's own points,
   then normalised to a 1920-wide page** (`scale = 1920 / page_width`) so it can be compared with
   our grid. Where a book is not 16:9 the vertical normalisation (`1080 / page_height`) is stated
   as such, because it distorts.
2. **Stated.** Verbatim quotes from the document or the design system's own source/stylesheet.
   Quotes are short and marked. "(n/a)" means the source is silent.

Template counts were produced by clustering every page of a book on a **block signature** — the set
of rectangles and images larger than 5% of the page, quantised to 60px buckets, plus a word-count
band. Two pages with the same signature are the same template. This is a blunt instrument (it
over-counts when decorative art differs) so it is used only to establish *lower bounds* on
repetition, which is the direction that matters.

No listicles, no Pinterest, no Scribd, no third-party "brand guideline archive" re-uploads. Where a
brand's own CDN hosts the PDF (`a.slack-edge.com`, `partners.salesforce.com`,
`help.shopify.com/cdn`), that is the primary source and that is what is cited.

WebSearch budget for this session was exhausted (200/200) partway through, shared with the
sub-agents. Everything after that point was reached by direct URL. This is noted where it limited a
line of enquiry.

## Sources measured (primary)

| # | Document | Page size (pt) | Orientation | Pages | URL |
|---|---|---|---|---|---|
| L1 | University of Pittsburgh Brand Guidelines | **1920 × 1080** | 16:9 | 80 | https://www.brand.pitt.edu/sites/default/files/University_of_Pittsburgh_Brand_Guidelines.pdf |
| L2 | Visa Fundamental Brand Standards, Sept 2025 (= `references.md` S46) | 1058.4 × 595.44 | 16:9 | 16 | https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf |
| L3 | Slack Brand Guidelines, September 2020 | 792 × 612 | letter landscape (1.294) | 50 | https://a.slack-edge.com/4d5bb/marketing/img/media-kit/slack_brand_guidelines_september2020.pdf |
| L3b | Slack Brand Guidelines (current media-kit PDF) | 792 × 612 | letter landscape | 23 | https://a.slack-edge.com/0f43e/marketing/img/media-kit/Slack-Brand-Guidelines.pdf |
| L4 | Harvard Graphic Identity Guidelines, Nov 2025 (= `references.md` U4) | 792 × 612 | letter landscape | 50 | https://www.harvard.edu/guidelines/wp-content/uploads/sites/10/2025/12/2025_11_24_Harvard_Graphic_Identity_Guidelines-1.pdf |
| L5 | Salesforce Partner Branding Guidelines (= `references.md` S39) | 1152 × 648 | 16:9 | 45 | https://partners.salesforce.com/s/Partner_Branding_Guidelines.pdf |
| L6 | Shopify Partner Toolkit — Marketing and Brand Guidelines 2024 (= `references.md` S33) | 720 × 405 | 16:9 | 37 | https://help.shopify.com/cdn/shopifycloud/help-center/pdf/partners/Shopify_Partner_Toolkit_Marketing_and_Brand_Guidelines_2024.pdf |
| L7 | University of the Pacific Brand Guidelines v1.0 | 792 × 612 | letter landscape | 47 | https://www.pacific.edu/sites/default/files/users/user245/UPac_BrandGuidelines_Final_compressed.pdf |
| L8 | Eastern Michigan University Brand Guidelines v1.0 | 834 × 654 | landscape (1.275) | 45 | https://www.emich.edu/communications/documents/policies-guidelines/emu-brand-guidelines.pdf |
| L9 | Davenport University Brand Guidelines, January 2025 | 792 × 612 | letter landscape | 49 | https://www.davenport.edu/sites/default/files/2025-02/SRVRASST02-DU-BG-Jan25-R1-compressed-compressed.pdf |
| L10 | Suffolk University Brand Identity Guidelines, refresh 2025 | 792 × 612 | letter landscape | 52 | https://www.suffolk.edu/-/media/suffolk/documents/about/directory/office-of-marketing-communication/online-resources/suffolk-visual-guidelines_refresh2025.pdf |
| L11 | IBM Carbon — 2x Grid, Overview (page source, `.mdx`) | — | web | — | https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/elements/2x-grid/overview.mdx |
| L12 | IBM Carbon — rendered site stylesheet (do/don't card + data table rules) | — | web | — | https://carbondesignsystem.com/styles.88fc80577eb369f3c2b3.css (linked from https://carbondesignsystem.com/elements/2x-grid/overview/) |
| L13 | IBM Carbon — `DoDontExample` component source | — | web | — | https://raw.githubusercontent.com/carbon-design-system/gatsby-theme-carbon/main/packages/gatsby-theme-carbon/src/components/DoDontExample/DoDontExample.js |
| L14 | Bowling Green State University Brand Guidelines (accessible version) | 792 × 612 | letter landscape | 48 | https://www.bgsu.edu/content/dam/BGSU/marketing-and-communication/images/brand/BGSU-Brand-Guidelines-accessible.pdf |
| L15 | Bentley University Brand Guidelines 2025 | 576 × 576 | **square** | 50 | https://www.bentley.edu/files/pdf/Brand_Guidelines_2025.pdf |
| L16 | Cornell University Licensing Brand Guide | 1008 × 612 | landscape (1.647) | 5 | https://brand.cornell.edu/downloads/merchandising/Cornell_Licensing_Brand_Guide.pdf |
| L17 | Vercel Geist — Grid | — | web | — | https://vercel.com/geist/grid |
| L18 | Penn State Brand — Design Essentials (= `references.md` U8) | — | web | — | https://brand.psu.edu/design-toolkit/design-essentials |

## Failed / dropped (with reason)

- `ibm.com/design/language/2x-grid/getting-started` — **404** to both WebFetch and headless Chrome
  (Chrome renders IBM's "page you requested cannot be displayed"). The 2x Grid content was read
  from Carbon's own page source instead (L11), which is the same system, published as code.
- `brand.github.com/foundations/layout` — **404**. GitHub's Brand Toolkit lists "Layouts" in its
  nav (recorded in `references.md` S25/§12) but the deep link is gone; no numbers retrieved.
- `news.uchicago.edu/.../UChicago_Identity_Guidelines.pdf` and
  `cau.edu/.../cau-branding-guidelines-082728.pdf` — both returned HTML error bodies with a PDF
  filename (`No /Root object`). Dropped.
- `nmc.edu/.../NMC-Brand-Guidelines-2025.pdf` — connection failed (http 000). Dropped.
- Penn State Design Essentials (L18) — the page exists and names Templates, PowerPoint, Print, Web
  and Digital as surfaces, but **publishes no numeric grid, margin or column value**. Recorded as a
  negative result for Q7, not as evidence of a grid.
- Vercel Geist Grid (L17) — publishes column and row *counts* and a responsive syntax
  (`columns={{ sm: 1, md: 2, lg: 3 }}`) but **no gutter or margin values**, and covers web only.
  Negative result for Q7.
- WebSearch budget exhausted at 200/200 partway through, which ended the hunt for additional
  design-forward non-university landscape PDFs (Mozilla, Twilio, TfL, City of Melbourne).
  Everything reported was reached by direct URL. This is a real gap: the corpus is university-heavy,
  with Visa, Slack, Salesforce, Shopify, Red Hat, Asana, Spotify, NASA, NHS, Wikimedia and
  IBM/Carbon as the non-university counterweight.
- For §3, additionally dropped: GitLab Design System (302 to a login gate), Uber `brand.uber.com`
  (JS shell, guidelines behind sign-in), Notion `notion.com/brand` (401), Adobe trademark PDFs
  (404 at both published paths), Dow (403), Zoom (HTML served for a `.pdf` path), Figma
  `figma.com/brand` (404), HubSpot `hubspot.com/brand-kit` (404), LinkedIn and Twitch (JS-only),
  Starbucks `creative.starbucks.com` (connection refused), Duolingo (JS shell). Atlassian, Discord
  and Mailchimp have misuse *copy* but no visual misuse page — Mailchimp is worth noting as a
  design-forward consumer brand with four prose bullets and no specimens at all. No open misuse page
  exists for Coca-Cola, Nike, McDonald's, Airbnb or Netflix; their brand centres are partner-gated.
- For §6, the failed/dropped list is given at the end of that section (Penn State
  password-protected, Indiana and Johns Hopkins SSO, NYU bot-blocked, U-M Cloudflare 403, and
  several generators behind login).

---

## 1. Do strong brand books run on a small set of repeated page templates?

**Yes, and more aggressively than D16 proposes.** The strongest books run on *one* content frame
plus a divider, and put all their variety inside the frame.

### Measured template repetition

| Book | Pages | Largest single content template | Full-bleed divider pages | Share of book on those two |
|---|---|---|---|---|
| Salesforce (L5) | 45 | **12 pages** with an identical two-panel signature (pp. 9, 11, 13, 19, 20, 22–26, 29, 30) | 13 full-bleed pages — 6 chapter dividers (pp. 6, 14, 18, 27, 31, 34), 3 sub-dividers (35, 37, 41), 4 front-matter (2–5) | **56%** |
| Pitt (L1) | 80 | one master frame — gold sidebar `x 0→514.3` + white field `x 513.7→1920` — on **every** content page; within it, 10 pages share an exact signature, 5 more share another | 10 (pp. 4, 6, 14, 18, 23, 31, 34, 43, 52, 54) | frame: ~84% (67 of 80); openers: 12.5% |
| Slack (L3) | 50 | 21 pages are type-on-white inside the same two-rule frame (12 with >150 words, 9 with fewer) | 11 full-bleed pages — 9 typeless illustration breathers (pp. 4, 7, 9, 12, 23, 30, 36, 42, 50) plus 2 of the 3 section openers (16, 41); the third opener, p5, carries more copy | **64%** |
| Visa (L2) | 16 | every content page is the same 2-column panel field; the panels subdivide but never move | 0 (a 16-page standard has no dividers) | **94%** (15/16) |

Pitt's ten chapter openers are not merely similar — they are **identical to the pixel**. Measured
across all ten, the title block is at `x0 = 49.2`, `top = 714.0`, `bottom = 934.0`, cap height
`220px`, on a native 1920×1080 page. Ten out of ten, no drift.

### The four archetypes actually in use, and how they map to A/B/C/D

Across L1–L10 the same four shapes recur, and they are *not* our four:

**Archetype 1 — Lead beside content (not above it).** This is the dominant page in every book
measured.
- Visa (L2): title at `x 81.6, y 82.6` (58px caps) with the chapter tab strip on the same line;
  the lead is column 1; the panels are columns 2–3. Content field begins at `y = 208` on **every**
  content page.
- Slack (L3): title top-left, a full-content-width hairline rule beneath it, lead in column 1,
  content to its right.
- Pitt (L1): the lead is a **gold sidebar** occupying `x 0 → 514.3` (26.8% of the page); label at
  `y 79.8` (18px), H2 at `y 177.9` (41px, second line at `y 221.1` — a 43.2px step ≈ 105%), lead
  body at `y 254.5` (19px). The white content field starts at `x 600` and runs to `x ≈ 1870`.
- Shopify (L6, normalised ×2.667): eyebrow at `x 96, y 88` (32px), title at `x 96, y 156` (80px),
  lead body at `y 319`; specimens sit in the right column beginning near the title's own height.
- Harvard (L4) and Pacific (L7): a persistent left column — Harvard's is a hyperlinked section nav,
  Pacific's is a tinted panel carrying the H1 and lead.

**Archetype 2 — Row of equal panels.** A row of 2–4 bordered panels, each with a bold caption at
its top-left, all sharing one top edge and one height. Visa is the exemplar; Salesforce runs a
two-panel version on 12 of 45 pages.

**Archetype 3 — Row-labelled matrix.** A stack of rows where the leftmost cell is a label and the
remaining cells are specimens, separated by 1px rules. Pitt p26 (typefaces), Pitt p76
(co-branding), Harvard p6 (`DO:` / `DON'T:` columns), Harvard p38 (accent palette with row labels
NEUTRAL COOL / NEUTRAL WARM / SECONDARY / TERTIARY).

**Archetype 4 — Single diagram filling the field.** Pitt p32 (grid system), Pitt p59 (clear space),
Pitt p73 (decision tree), EMU p38 (lockup construction), Slack p18/p33/p35.

Mapping onto D16:
- **A (tile grid)** = archetype 2 + archetype 4's grid variants. Well supported.
- **B (wide table)** = archetype 3. Well supported — but note the real books almost never draw a
  data table; they draw a *row-labelled matrix of specimens*. See §4.
- **C (diagram + up to 3 cards)** = archetype 4. Supported, with one caveat: the books put the
  explanatory prose in the lead column beside the diagram, not in cards under it. Pitt p73's
  decision tree is a shape D16 has no home for.
- **D (misuse)** = a *variant* of A everywhere I measured, never its own template. See §3.
- **Missing from D16: archetype 1 itself.** Our four templates all stack the lead above the
  content. No measured book does that.

### How the eye is led

Four devices, in descending order of how many books use them:

1. **Eyebrow → title → lead, all flush left in one column.** Universal. The eyebrow is the chapter
   name, set small, in caps or in the accent colour: Pitt (18px caps, gold-on-navy), Shopify (32px
   mono caps, green), Pacific ("Section 2 Visual Language"), Harvard (the current nav item turns
   crimson).
2. **A rule that bounds the content field.** Slack draws a full-content-width hairline at
   `y = 134` and another at `y = 1016` (normalised to 1080) on **every** content page. Everything
   above the first rule and below the second is furniture; the content lives strictly between them.
   Pacific draws only the upper one, at `y = 102`.
3. **A persistent chapter index.** Visa puts an eight-tab strip across the top of every content page
   at `y ≈ 90`, with the current chapter's tab filled blue. Harvard puts the whole section list down
   the left of every content page, current item in crimson, **and it is hyperlinked** — measured: 11
   link annotations on p22, 13 on the contents page. Pitt has no persistent index but pins a
   `RETURN TO TABLE OF CONTENTS` button at `y = 1013.3` on every page including the openers
   (measured: exactly 1 internal link annotation per content page).
4. **Colour as chapter signal.** Only Pitt does it structurally (gold sidebar / navy opener), and it
   is constant, not rotating.

### Which books obey their own grid — measured

This is the finding that matters most for our two rules.

**Visa (L2) obeys it exactly.** Normalised to 1920, every panel on every content page starts at
`x = 678.1` or `x = 1274.6` and is `563.8` wide, ending at `1838.4`. The lead column runs from
`x = 82`. That resolves to a **3-column grid of 564 with a 32.7 gutter and 82/80 margins**:
`82 + 564 = 646`, `+32.7 = 678.7`, `+564 = 1242.7`, `+32.7 = 1275.4`, `+564 = 1839.4`. When a panel
must split (p3), it splits into two halves of *itself* — `270.1` each with a **23.8** inner gutter —
not onto a new grid step. Vertically, every page's first panel row begins at `y ≈ 208–210`, and
**every panel in a row shares one height to within 1px**: p2 `384.1 / 384.1`; p4 `280.8 / 281.3`
then `460.7 / 460.7`; p9 `562.9 / 562.9`; p10 `327.8 × 4`.

**EMU (L8) does not, and it fails in exactly the way our old book did.** On p11 the three tip-card
columns start at different heights — measured tops `242.9 / 245.9 / 248.7` for row 1 and
`431.4 / 447.6 / 488.5` for row 2 — because each column flows independently and each card is sized
to its own content. Same page, three columns, three different rhythms.

**Pitt (L1) does not either, despite publishing a "GRID SYSTEM" page.** The content field's block
left edges do not cluster on any step: p19 puts columns at `600 / 1077.7 / 1449.7` with widths
`448.7 / 344 / 420` and gutters of `29` and `28`. The only repeating module in the book is the
`132.5px` blueprint texture drawn on the navy backgrounds, which is decoration and runs off-page.
And p32, the grid page itself, publishes **no numbers at all** — the copy says only "Our grid system
is derived from the pattern at the heart of our shield".

---

## 2. Chapter openers / dividers

### The canvas, measured

For each book with dividers, the full-bleed fill was sampled at four points well away from the type
(6%/8%, 90%/12%, 50%/35%, 90%/90% of the page) on **every** opener, so "constant" below means the
pixels are the same, not that they look similar.

| Book | Openers | Canvas | Constant across the book? | Title | Number | Mark | Chapter index | Furniture kept |
|---|---|---|---|---|---|---|---|---|
| Pitt (L1) | 10 | flat navy + blueprint texture + a gold corner element | **identical** — all four samples equal on all ten pages: `(255,184,28)`, `(15,65,154)`, `(3,39,125)`, `(28,75,159)` | white condensed caps, `x0 = 49.2`, block `y 714 → 934`, cap **220px**, gold underline | no | **no** | no | running header `y 79.8`; page number `y 1015.5` right-aligned to `x 1869.8`; `RETURN TO TABLE OF CONTENTS` at `y 1013.3` |
| BGSU (L14) | 7 | flat **#F26322** orange | **identical** on all seven | one word, `x = 136`, cap **212px**, **bottom-anchored** — one-line titles at `y 665`, two-line at `y 471` so both blocks end at the same baseline | no | no | no | none (1–2 words on the page) |
| Pacific (L7) | 3 | flat **#ED5200** orange | **identical** | `x 191–214`, `y 483`, cap 111, under a letterspaced eyebrow `S E C T I O N 1` | **yes** — `SECTION 1`, `SECTION 2`, `APPENDIX` | no | no | none |
| Salesforce (L5) | 6 chapter + 3 sub | flat **#003C4D** teal (chapter) / flat **#7C858C** slate (sub-section) | **two canvases, and they encode rank, not chapter** — teal on 1.0–6.0, slate on 6.1/6.2/6.3 | `x = 150`, `y = 143`, cap **100px**, followed by a 100px lead sentence from `y = 263` | **yes**, decimal (`1.0_Branding`) | no | **yes** — the chapter's own sub-index in the right column | none |
| Shopify (L6) | one per section | flat near-black + faint square grid texture | constant | centred, with the eyebrow `SECTION 05` above and a one-sentence summary below | **yes** | no | no | footer + page number |
| Davenport (L9) | **10** | flat **#2E2926** | **identical** | monogram **+** title on one line, `x = 349`, `y = 516`, cap 64 — **the same two coordinates on all ten** | no | **yes** | no | none |
| Harvard (L4) | **11** | **white, type-only, no full-bleed element at all** | **identical** | letterspaced serif caps, **centred**, `y = 468`, cap 85 — same baseline on all eleven, `x` varying 312–698 with the title's length | no | no | no | **none — it drops even the hyperlinked section nav that appears on every other page** |
| Slack (L3) | **3** (pp. 5, 16, 41 — one per section) | flat **aubergine**, full-bleed — the brand colour | **identical** | **the content template with the ground inverted**: title flush left at `x = 85`, `y = 65 / 68 / 65`, cap **32** — the same position and size a content page's title uses — over the same full-width hairline rule every content page carries | **yes** — `Section 1:`, `Section 2:`, `Section 3:` | no | no | footer kept; below the rule, a 2–4 line "In this section, we outline…" summary (Section 3 has none) |
| *Slack, separately* | 9 typeless full-bleed illustration pages (pp. 4, 7, 9, 12, 23, 30, 36, 42, 50) | — | — | these are **breathers, not openers** — no title, only the footer at `y = 1024` | — | — | — | — |
| EMU (L8), Suffolk (L10) | **0** | — | — | chapters begin on an ordinary content page | — | — | — | — |

### What that settles

1. **Nobody rotates the canvas.** Eight of eight books with openers use one canvas for every chapter.
   Salesforce is the only book with two, and the second one marks a **different rank of divider**
   (appendix sub-section), not a different chapter. Alternating navy / gradient / paper with no rule
   is not a variant of any published practice — it is the absence of one.
2. **Flat colour is the default, by a distance.** Seven of eight are a flat brand colour full-bleed
   (Pitt, BGSU, Pacific, Salesforce, Shopify, Davenport, Slack). Harvard's type-only white is the
   only alternative in the corpus, and it too is applied to every one of its eleven dividers without
   exception. **Nobody uses a photograph and nobody uses a gradient.**
3. **Slack's opener is the cheapest good idea in the corpus and is worth serious consideration:
   it is the content template with the ground inverted.** Same title position (`x = 85`), same
   title size (cap 32), same full-width hairline rule under it — only the page turns from white to
   aubergine, and a two-line "In this section, we outline…" summary sits under the rule. It costs no
   new layout at all, and because the title stays at the content-page coordinate it can never
   collide with anything. Shopify and Salesforce also give the opener a one-sentence summary; three
   of eight do.
4. **The mark almost never appears.** One of eight (Davenport). Our openers not carrying the mark is
   the majority practice, and the argument is structural: the opener is the one page with no
   content, so a mark on it is decoration, and the cover already carries it.
5. **The number appears only when the book numbers chapters everywhere.** Four of eight number their
   openers — Pacific (`SECTION 1`), Salesforce (`1.0_`), Shopify (`SECTION 05`), Slack
   (`Section 1:`) — and all four also number chapters in the contents (§8). **None of the four
   un-numbered books numbers its opener.** The number is a book-wide system or it is nothing; there
   is no book in the corpus where the opener is the only place a chapter number appears.
6. **A chapter index on the opener is rare, and the one book that does it shows exactly why ours
   collided.** Salesforce sets the index wherever it fits: `x = 1100.6` at 42px on p6, `x = 1270` at
   30px on p14, entry steps of 51.3px and 36.7px respectively. The index is not on a column step and
   not at a fixed size, so on a long chapter it grows toward the title. Our overlap was the same
   failure. The fix is not to drop the index — it is to give it a **span and a fixed size**, so the
   title's block and the index's block cannot occupy the same coordinates whatever the chapter
   contains.
7. **There are exactly two ways to make the opener read as a break, and a book picks one.**
   - **Move the title and make it huge** — six of eight. Pitt's block ends at `y 934` at cap 220;
     BGSU bottom-anchors at cap 212 so one-line and two-line titles share a baseline; Harvard sits
     every title on `y 468`; Davenport on `y 516`; Pacific on `y 483`; Shopify centres. In all six
     the title is at a coordinate *and* a size no content page uses.
   - **Leave the title exactly where it always is and change the ground** — two of eight. Slack
     keeps `x 85 / y 65 / cap 32`, identical to a content page, and turns the page aubergine.
     Salesforce keeps the title top-left at `x 150, y 143` and fills the left half of the page with
     a 100px lead sentence.

   What no book does is move the title a little. The first route needs a coordinate our content
   pages never use; the second needs no new geometry at all and cannot collide with anything —
   which, given that our old book's opener title overlapped its index, is worth weighing.
8. **Furniture is all-or-nothing.** Pitt keeps everything (and the `RETURN TO TABLE OF CONTENTS`
   button is genuinely useful on an opener); Harvard removes everything including its own nav; the
   rest keep only the footer. The one thing nobody does is keep *some* of it.

---

## 3. Misuse / "don't" pages

Seventeen sources were surveyed specifically for the misuse page's visual grammar (marker, colour,
caption, count, pairing), plus my own measurements of six books in the corpus above. Sources are
`M1…M17`:

| id | Brand / org | Page or PDF | URL |
|---|---|---|---|
| M1 | NASA | *NASA Graphics Standards Manual* NHB 1430-2 (1976), "The Logotype: Incorrect Uses", printed p. 1.6 | https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf |
| M2 | NASA | Brand Guidelines, "Object-centered Insignia (incorrect)" | https://www.nasa.gov/nasa-brand-center/brand-guidelines/ |
| M3 | MIT | Brand Guide, "Do/Don't" | https://brand.mit.edu/applying-brand/do-dont |
| M4 | Stanford | Identity Guide, "Wordmarks" → do's and don'ts | https://identity.stanford.edu/visual-identity/stanford-logos/wordmarks/ |
| M5 | University of Michigan | Brand Identity Style Guide, Feb 2025, pp. 8 and 26 | https://brand.umich.edu/wp-content/uploads/2025/02/250027-U-M-Style-Guide-February2025.pdf |
| M6 | University of Arkansas | "Examples of What Not to Do" | https://brand.uark.edu/graphic-identity/examples-of-what-not-to-do.php |
| M7 | Johns Hopkins Medicine | "Logo Misuse" | https://brand.hopkinsmedicine.org/brand/branding-guidelines/logo-guidelines/logo-misuse |
| M8 | Lakeland University | Brand Guidelines, "Logo Violations", p. 14 | https://lakeland.edu/perch/resources/admin/lakeland-brand-guidelines.pdf |
| M9 | Park University | Brand Guidelines 2022, "Incorrect Use", p. 7 | https://www.park.edu/wp-content/uploads/2022/02/park-brand-guidelines.pdf |
| M10 | Point Park University | Graphic Standards Guide v3.1, pp. 14–16 | https://www.pointpark.edu/about/admindepts/media/news/ppu_styleguide2.1_12_4_09.pdf |
| M11 | University of Scranton | Identity Procedures and Guidelines, "Unacceptable Usage", p. 6 | https://www.scranton.edu/printing-services/identity-standards.pdf |
| M12 | Spotify | Design & Branding Guidelines, "Logo misuse" | https://developer.spotify.com/documentation/design |
| M13 | Slack | Brand Guidelines Sept 2020, "Logo misuse", p. 22 (= L3) | https://a.slack-edge.com/4d5bb/marketing/img/media-kit/slack_brand_guidelines_september2020.pdf |
| M14 | Red Hat | Brand Standards, "The Red Hat logo" | https://www.redhat.com/en/about/brand/standards/logo |
| M15 | Asana | Brand Guidelines, "Logo don'ts" | https://asana.com/brand |
| M16 | Wikimedia Foundation | Visual identity guidelines §18 "Do not…" | https://foundation.wikimedia.org/wiki/Legal:Visual_identity_guidelines |
| M17 | NHS England | Identity Guidelines, "Unacceptable NHS backgrounds" | https://www.england.nhs.uk/nhsidentity/identity-guidelines/nhs-logo/ |

Marker colours below were sampled from the source SVG/PNG or read off the rendered DOM, not guessed.

### The marker

| Marker form | Count | Sources |
|---|---|---|
| **No marker at all** | 3 | M1 NASA 1976, M11 Scranton, M13 Slack |
| ✕ over the specimen | 4 | M2, M6, M8, M10 |
| Single diagonal slash over the specimen | 3 | M4, M7, M16 |
| **Diagonal or band across the whole tile** | 3 | **M14 Red Hat, M15 Asana, M3 MIT** |
| Corner badge | 2 | M17 NHS, M3 MIT |
| A word instead of a glyph | 3 | M5 Michigan, M12 Spotify, M14 Red Hat |
| A struck-through rule | 1 | M9 Park |

Add to that the books measured for this file: **Pitt (L1 p60)** — a red ✕ set inline to the left of
each caption, not on the specimen; **Visa (L2 pp. 3–4)** — a large red ✕ drawn corner-to-corner over
the whole specimen, used only when an entire composition is wrong (an old mark on a POS sign, a
mis-set card image); **Harvard (L4 p6)** — no glyph at all, just two column headings `DO:` and
`DON'T:` over ten paired rows; **Salesforce (L5)** — a green ✓ and a red ⊘ (circle-slash) as headers
over two half-panels.

### Is red wrong? — the honest answer

**Red is the majority (10 of 17), but the majority is not the disciplined camp, and it is not the
camp doing what we want to do.**

Of the ten reds, **four are not a signal red at all** — they are the institution's own brand colour,
which happens to be red: Stanford Cardinal `#B1040E` (M4), Arkansas Cardinal `#A42035` (M6), Park
crimson `#B30437` (M9), NASA insignia red `#FF1500` (M2). Only six use a generic alarm red that
carries no other meaning in their system (M3 MIT `#EE272E`, M7 JHM `≈#E6212A`, M8 Lakeland
`#D2232A`, M12 Spotify `#E91429`, M16 Wikimedia `#D82A20`, M17 NHS).

And IBM Carbon is the strongest counter-argument to our decision, because it does exactly what we
have forbidden: it binds the misuse marker to the **error state token**. Measured from the rendered
stylesheet (L12):

```
.cds--example__icon--correct    { fill: #24a148 }
.cds--example__icon--incorrect  { fill: var(--cds-support-01, #da1e28) }
.cds--example--correct   .cds--example-card:before { background: #24a148 }
.cds--example--incorrect .cds--example-card:before { background: var(--cds-support-01,#da1e28) }
```

`--cds-support-01` is Carbon's error/danger token. So "the marker is a state colour" is a considered
position held by the most rigorously tokenised design system in the corpus.

**But the three books that draw a marker across the whole tile — the treatment we are proposing —
all three avoid red:**

- **Red Hat (M14)** draws its full-tile diagonal and its tile outline in **`#F0561D` orange**, while
  its own brand red **`#EE0000`** appears inside the very same tile, in the logo. The separation is
  deliberate: the marker colour is chosen so it cannot be read as the mark's colour. This is the
  single cleanest piece of evidence for our decision.
- **Asana (M15)** draws a single thin diagonal corner-to-corner of the tile in **`#FE584A`**, a
  brand coral, on a `#F3F3F3` panel.
- **Point Park (M10)** puts a large ✕ in **`#EAABB6` dusty pink** and uses no red anywhere on the
  page.

**And the meaning is never carried by colour in any of the seventeen.** Without exception the
prohibition is also in words: a caption opening "Don't" / "Do not", a lead-in label (`NO`,
`Not this:`, `DO NOT`), or a section heading ("Unacceptable NHS backgrounds", "Logo don'ts",
"Incorrect Uses"). MIT — the most colour-forward book here, with a red band *and* a red badge *and*
a white ✕ — still writes "Don't" as the first word of a 24px **black** caption, and puts
*"Don't example that shows the previous 2-color MIT logo design"* in the image's alt text. Nobody
relies on a red/green pair alone.

The nearest thing to a stated rule about colour-only meaning in a brand book is University of
Michigan's accessibility page (M5, p. 26), verbatim:

> "Do not rely on color as the only means of communicating information. Be sure to use alternative
> options as well, like symbols, patterns or additional text identifiers."

And Stanford (M4) gives an accessibility reason *inside* a don't caption: "Don't use Cardinal red
version on black backgrounds. This is due to legibility concerns and this combination fails in
reading contrast for accessibility."

**No book in the survey states a rule about its own marker.** Grepping every PDF for *marked with*,
*indicated by*, *denotes*, *symbol indicates*, *throughout this guide* found nothing. If we declare
one we are ahead of all seventeen.

### How heavy should the diagonal be?

**A line, not a band.** All three full-tile precedents draw a **single thin diagonal** touching the
tile's corners — Red Hat adds a 1px outline around the tile, Asana adds nothing. MIT's "band" is not
across the tile at all: it is a solid bar on the tile's **top edge only**, full width, with the
badge in the opposite corner.

Nobody in the survey paints a wide band across the specimen, and the reason is visible on every one
of these pages: the reader has to be able to read the violation. Carbon's version is the strictest
statement of that principle — its marker is a **24×24 icon inset `calc(1rem - 1px)` = 15px from the
tile's top-left**, with `path[data-icon-path=inner-path] { fill: #fff }` so the glyph's counter is
knocked out white and stays legible over any specimen. The whole rest of the tile is left alone.

### Composition — the numbers

Measured or counted:

| Question | Answer |
|---|---|
| Caption placement | **Below** the tile: 9 (M2, M4, M7, M8, M11, M12, M14, M15, M16). Above: 3 (M1, M3, M10). Beside: 4 (M6, M9, M13, M17) |
| Caption grammar | **Verb-first** ("Don't stretch the logo"): 12. Noun-first ("Distortion", "ANGLE"): 4. Wikimedia does **both** — a noun label then a verb sentence: *"**Different colors** · Do not change the logo colors."* |
| Don'ts per page | Slack 10 · Pitt 9 · Harvard 10 pairs · NASA 1976 9 · Spotify 6 · Asana 6 · Lakeland 6 · Wikimedia 6 · Red Hat 11 · **JHM 20** · MIT 42 pairs over 8 sections · Point Park ~26 over 3 pages. **The comfortable range is 6–10; past that it becomes a list with pictures.** |
| Grid | 3 columns is the plurality (6 of 17); 2 columns next (6); Red Hat runs 4 |
| Tinted panel behind the specimen | only 5 of 17 (MIT `#F4F6F9`, Spotify near-black, Red Hat `#F2F2F2`, Asana `#F3F3F3`, NHS full-bleed colour). **Twelve put the specimen straight on white.** |
| Tile ratio | Spotify square 334×334; MIT ~1.48:1; Red Hat ~1.2:1; Asana ~1.4:1. **Nobody used 16:9.** Carbon publishes a fixed set instead — `1:1, 2:1, 1:2, 4:3, 3:4, 16:9, 9:16` (L12) |
| Is a "do" shown alongside? | **Yes on the same page: 8** (M2, M3, M4, M6, M11, M12, M14, M17) · **Don'ts alone: 8** (M1, M7, M8, M9, M10, M13, M15, M16) — a dead heat |
| When both appear, how is the "do" marked? | ✓ glyph or badge: 4 (M2, M3, M17, and Spotify's word `YES`) · **nothing at all: 3** (M6, M11, and notably **Red Hat, whose do tile gets no marker, no border and no green — only the caption's bold "Do this:" lead-in**) |

Carbon's caption spec, measured (L12, L13), is the most precise available and is worth adopting
wholesale: the caption is a separate block **below** the card, `padding: 1rem 0 0` (16px gap), with
an optional bold title (`14px / 600`, measure limited by `padding: 0 25% 0 0`, i.e. 75% of the tile
width) and a `14px / 400` description under it. The component renders `CheckmarkFilled` for do and
`Misuse` — the circle-slash, **not** an ✕ — for don't.

---

## 4. Specification / table pages

Two distinct things get called a "table" in a brand book, and they are typeset differently.

### 4a. The specimen matrix — what brand books actually do

Almost no landscape brand book draws a data table for colour. They draw **swatch tiles with the
values stacked beneath or inside them**, arranged in a row-labelled grid.

- **Harvard (L4) p37–38.** Core colours: two large tiles, values set *below* each tile as a stacked
  list, one value per line, always in the same order: `PMS 187 U` / `PMS 1807 C` /
  `CMYK 7-100-65-32` / `HEX #A51C30` / `RGB R-165 G-28 B-48`. Accents (p38): a matrix with **row
  labels at the far left** (NEUTRAL COOL, NEUTRAL WARM, SECONDARY, TERTIARY) and three swatch
  columns per row, same stacked value list under each. Alignment is achieved by the fixed line
  order, not by columns.
- **Pitt (L1) p19.** Three headed columns — Primary / Secondary / Accents — at `x = 600 / 1077.7 /
  1449.7`. The values are set *inside* the swatch in the contrasting colour. The tile size encodes
  rank: primary tiles are `448.7 × 415`, secondary `344 × 122`, accent `180 × 99.6`.
- **Slack (L3) p24.** Three core colours as tall vertical panels with values inside the top of each;
  four accents as half-height tiles below. The **panel proportions encode the usage proportion** —
  the page's own copy is "Use these color proportions in any layout or collateral design."
- **Pacific (L7) p26–27.** Goes furthest: swatches are sized in proportion to intended usage and
  the percentage is printed inside them ("2% Share", "8% Share", "35% Share").

**Rule extracted:** a colour specification is a *specimen* page, not a table page. The reader needs
to see the colour at size; the numbers ride along.

### 4b. The genuine ruled table — Pitt and Carbon

- **Pitt (L1) p26, "Additional Typefaces."** A four-row table: row label (the typeface name set *in*
  that typeface) | alphabet specimen | spec. Measured: rules span `x 604.4 → 1783.6` (width
  `1179.2`), at `y = 324.7 / 560.4 / 790.9` — **row height 230–236px, equal to within 6px across
  the table**. A 1px rule under each row, no zebra, no vertical rules, no header tint.
- **IBM Carbon (L11, L12)** publishes the only fully specified table in the corpus. The breakpoint
  table's own header row is verbatim:

  `| Breakpoint | Value (px/rem) | Columns | Size (%) | Size | Padding | Margin |`

  with cells like `320 / 20`, `4`, `25%`, `80 px`, `16 px`, `0`. Units appear **both** in the header
  (`Value (px/rem)`, `Size (%)`) and in the cell (`80 px`, `16 px`). And the rendered table's rules
  are, measured from the stylesheet (L12):

  - row height: `.cds--data-table tr { block-size: 3rem }` → **48px**
  - row rule: `.cds--data-table tbody th, .cds--data-table td { border-block-end: 1px solid
    var(--cds-border-subtle-01,#e0e0e0) }` → a 1px rule under every row
  - cell padding: `padding-inline: 1rem 1rem` → **16px** left and right
  - header: `.cds--data-table th { background-color: var(--cds-layer-accent) }` → a **tinted header
    band**, set 14px/600 (`heading-compact-01`)
  - alignment: `.cds--data-table td, .cds--data-table th { text-align: start; vertical-align:
    middle }` — everything starts flush left; right alignment exists only as an explicit opt-in,
    `td[align=right] { text-align: end }`
  - **rules or zebra, never both**: zebra is a modifier, and when it is on the per-row rules are
    recoloured to match the tint —
    `.cds--data-table--zebra tbody tr:nth-child(odd) td { border-block-end: 1px solid
    var(--cds-layer) }` (i.e. invisible), `…:nth-child(2n) { background-color:
    var(--cds-layer-accent) }`.

**Rule extracted:** ruled rows by default; zebra only as an alternative, never stacked on top of
rules; header tinted rather than ruled twice; text starts flush left; numbers are right-aligned only
when the column is there to be *compared*; the unit goes in the header and is repeated in the cell
only when the column mixes units.

### The row budget — the arithmetic that prevents overflow

With Carbon's 48px row and a 48px header, our declared content band of `y 360 → 960` (600px) holds
**one header + 11 body rows** and no more. If the lead moves into column 1 and the band becomes
`y 160 → 960` (800px), it holds **one header + 15 rows**. That number should be published in the
template, because "no block crosses the bottom margin" is not enforceable by eye — it is enforceable
by a row count.

---

## 5. Diagram pages — construction, clear space, lockup geometry

### The annotation grammar, as measured

Five books, one grammar:

1. **The unit is named in prose, in the lead, not on the drawing.** Visa (L2 p3): "X = Height of the
   'V.' Apply 1X clear space around all sides of the Visa Brand Mark when possible." Pitt (L1 p59):
   "maintaining a minimum amount of space around the perimeter, measured with the height of the P in
   Pittsburgh." Slack (L3 p35): "Clear space equals the width of one octothorpe." Shopify (L6 p10):
   "Keep a clear space of 'X' around our logo at all times… X = the x-height of the wordmark" and,
   for the bag, "Keep a clear space of ⅕ S around The Shopping Bag at all times."
2. **The drawing shows the unit rather than dimensioning it.** Slack tiles the octothorpe itself
   around the mark as a grey construction pattern; Pitt repeats the letter *P* at the four edges;
   Shopify draws a dotted box. None of them draws an arrowed dimension line for the clear space —
   the repeated glyph *is* the dimension.
3. **Where a number is unavoidable, it is a short algebraic label, and there are very few.** Visa's
   endorsement geometry page carries exactly four labels, all in two units: `X`, `0.5X`, `0.8Y`,
   `0.25Y`, plus a centreline marker `cL`. Two units, four labels, one diagram.
4. **Alignment lines are thin and dotted, in a neutral or a faint tint of the brand colour, never at
   the mark's weight.** Harvard (L4 p22, p24) draws light dotted horizontals through the wordmark's
   cap line, x-height and baseline, and marks the extension's tracking limits with faint red dotted
   guides. The mark itself is at full strength; nothing on the drawing competes with it.
5. **Labels hang off a brace, set small, lowercase, sans, to the right.** Harvard p24 stacks four
   signature variants and labels each with a `}` brace and a two-line lowercase label ("horizontal
   wordmark, with secondary extension"). EMU (L8) p38 names three *zones* the same way. Pacific
   (L7) p19/p22 uses a bracket-and-label to name the ink used for each part of the lockup
   ("Pantone 165 C", "Pantone 419 C").
6. **The minimum size lives in a corner note, not on the diagram.** Pitt p59 puts `Digital: 220px /
   Print: 1.25"` bottom-right of the content field beside a small specimen, entirely separate from
   the clear-space drawing above it.
7. **Two clear-space zones, not one, when the brand needs a floor and a target.** Visa (L2):
   "Recommended clear space is gray area, full width of V in Visa Brand Mark all around. Minimum
   clear space is white area, half width of V in Visa Brand Mark all around." The drawing carries
   both zones as two nested tints.

**On our "two dimensions per diagram" decision:** the evidence supports it, but reframes it. The
constraint that the books actually observe is **two *units*, not two dimensions** — Visa draws four
labels from two units (X and Y) and it reads cleanly, because every label is a multiple of something
already named. Two arbitrary dimensions would be worse than four derived ones.

### Diagram pages beyond construction

Pitt p73 is a **decision tree**: a centred question, a gold `I AM CREATING:` bar, two labelled
branches ("Academic or institutional pieces for internal or external audiences" / "Spirit,
athletics, academic (merchandise only) or student/alumni facing pieces"), two mark specimens, then
two prose columns of "Usage Examples" beneath. D16 has no template for this and our book will
probably want one (which mark, which lockup, which typeface).

---

## 6. Email signature pages

*(Researched separately against 26 primary sources — 23 US institutions plus GitLab. Full source
table and per-institution detail is in §6b below; §6a is the part that bears on layout and on our
three variants.)*

### 6a. What to publish, and how the page is composed

**The three-variant model exists in the wild, but only as "full / minimal", never as a team
variant.**

- **UCLA** publishes the only explicit reply variant, under the verbatim heading **"Standard
  Signature If You Are Replying or Forwarding"**: name / title / unit / one office phone. The
  address, mobile and both URLs drop.
  (https://brand.ucla.edu/application/email/staff-signature)
- **Boston University** publishes three named specimens stacked down one page — *Minimal signature*
  (name / title / unit / one phone), *Signature with multiple phone numbers and links*, and
  *Signature with mailing address* — under one shared Do/Don't list.
  (https://www.bu.edu/brand/guidelines/communication-material/email-signatures/)
- **Purdue** ships an *Extended Option* and a *Compact Option* side by side; the compact one
  collapses `title, unit` onto one line and the whole address onto one comma-separated line.
  (https://www.purdue.edu/brand-studio/digital/getting-started/email-signatures/)
- **Ohio State** gives the rule without a specimen: "You don't have to use the full email signature
  on every email, such as everyday messages to coworkers. But when you're representing yourself as a
  representative of the university, especially to someone for the first time, the proper email
  signature is important."
  (https://brand.osu.edu/brand-guidelines/templates-tools/email-signatures)

The convergent short signature is therefore **four lines: name / title / unit + institution / one
phone.** No address, no logo, no social.

**No institution in the survey publishes a team or shared-mailbox signature.** The closest is
Georgia Tech, which argues *against* it — "Use a phone number only if it's a place you personally
can be reached. Do not direct recipients to a common department phone number."
(https://brand.gatech.edu/our-look/emails). If we publish a team variant we will be ahead of every
source, and we cannot cite one; the defensible construction is to invert Georgia Tech's rule — a
team signature is precisely the case where a shared mailbox and a common phone are correct, and the
person-level fields are absent by design.

**Page composition — six patterns observed, best first:**

1. **Three named specimens stacked under one shared rule list** (Boston University). Rules first,
   each line starting "Do…" or "Don't…"; then three specimens, each under its own label, as live
   text rather than an image. This is the closest published analogue to the page we are building.
2. **Three parallel lists — Recommended / Optional / Avoid** (Stanford,
   https://identity.stanford.edu/digital/email-signatures/). No specimen image at all; the
   "Recommended" list *is* the specimen because its four items are in signature order. The whole
   page is under 100 words of rules.
3. **A two-column Do's | Don'ts table** (Georgia Tech), one rule per cell.
4. **The specimen annotated inline** (University of Washington,
   https://www.washington.edu/brand/templates/docs-stationery/; Cornell Bowers CIS,
   https://brand.cis.cornell.edu/in-use/). UW puts the spec *inside* the specimen —
   `YOUR NAME (Pronoun/pronouns) (all caps, bold, font size 12pt)`, `Your title (font size 11pt)`.
   Cornell Bowers marks each line `[optional]` or leaves it unmarked. No leader lines, no callout
   boxes — annotation is inline text, which survives copy-paste and screen readers.
5. **Form left, live previews right** (Purdue, UConn, Vanderbilt, Notre Dame). Notre Dame usefully
   puts a *static annotated specimen above the builder*, with parenthetical instructions in the
   specimen itself — *(add phone numbers as needed)*.
6. **Accordion, one panel per variant** (Michigan Medicine). Good for four near-identical variants,
   bad for comparison — you cannot see two at once.

**Nobody in the survey uses leader lines, numbered callout pins, or a diagrammed anatomy figure for
a signature.** Every annotation observed is either inline parenthetical text or an adjacent list.
The one exception in our own corpus is Davenport (L9 p40), which does draw thin red leader lines
from labels to each signature line, and places a second "Alternate" variant beside the first with
its own callouts — legible, but it makes the specimen un-copyable, which is the opposite of what a
signature page is for.

### 6b. What the sources actually specify

**Universal (11+ sources agree):**

1. **Web-safe typeface, no webfont.** Arial is modal (UT Austin, Northwestern, Iowa, Arkansas,
   Cornell Bowers, UCLA, Ohio State, Weill Cornell); Calibri / Helvetica / Aptos / Verdana are
   sanctioned alternates (Stanford, BU, UCLA, UW, Georgia Tech). Where a brand font is named it is
   always first in a stack with Arial behind it — Purdue ships
   `font-family: 'Acumin Pro', Arial, Veranda, sans-serif;` (the misspelling of Verdana is theirs).
   Only **Virginia Tech** demands the brand font with no fallback published: "Use Acherus Grotesque
   (regular) or Gineso condensed (book) with the master brand logo".
   (https://brand.vt.edu/resources.html)
2. **No quotes, epigraphs or philosophical statements.** UT Austin, Georgia Tech, Iowa, Boise State,
   Utah State, Stanford, BU, Michigan Medicine, UConn, Weill Cornell. The rationale is always
   attribution risk — BU: "they may be perceived as University-wide statements"; Utah State: "to
   avoid the potential confusion that such statements represent the university's ideology or brand
   promise."
3. **No taglines, badges or awards.** Stanford, UT Austin, Georgia Tech, Iowa, Michigan Medicine, BU.
4. **Short.** BU: "three to eight lines". Northwestern: "under 10 lines". Arkansas: "Be concise.
   Include only contact information."
5. **One low-chroma text colour**, with brand colour spent on exactly one or two elements — the name
   and/or the institution name. Ohio State's published markup is the most exact: body `#212325`;
   name, "The Ohio State University" and both links `#BA0C2F` bold;
   `font-family: Arial, sans-serif; font-size: 12px; line-height: 18px` throughout.
6. **The signature must never be one flat image.** Boise State: "An email signature should not be in
   the form of an image, as the text will not be accessible to assistive-technology users."
   (https://www.boisestate.edu/brand/resources/email-signature-standards/). Arkansas: "Email
   signatures should not be created as single images because they are inaccessible and violate the
   guidelines of the Americans with Disabilities Act."
   (https://brand.uark.edu/graphic-identity/signatures.php)
7. **Copy-paste or generate — never hand-build.** UConn: "adhere to the existing layout, formatting,
   and text attributes." Illinois: "Do not modify or resize the logo once you've pasted it."

**Contested — and we must pick a side, not split the difference:**

| Question | Bans it | Requires or allows it |
|---|---|---|
| Logo image | Cornell Bowers ("text-only, with no image files, including the Cornell Bowers lockup or the Cornell seal"), Weill Cornell, BU, Stanford, UConn, ASU, UT Austin | Virginia Tech (**required**), Ohio State (`height="60"`), Purdue (`300×100`), Notre Dame (`200×48`), UW (`200×16`), Vanderbilt (`100px`), Iowa, Illinois, Michigan Medicine, Utah State, UCLA (boxed version only) |
| Unit / department lockup | Iowa ("Unit lockups should not be used"), Georgia Tech, Boise State ("Department companion marks are not allowed") | Virginia Tech, UW ("You may replace the UW logo with your department or program logo"), Michigan Medicine (three lockups), UCLA |
| Social links | UT Austin, Georgia Tech, UConn, Iowa | Notre Dame (26×26 icons), Purdue, Vanderbilt (text links), BU ("in plain text (without icons) are optional"), Stanford (unit accounts only) |
| Marketing banner | UT Austin, Georgia Tech, BU, Michigan Medicine | Purdue (`650×163`), Ohio State (paused for legal review), Duke, Weill Cornell, GitLab |
| Street address | UT Austin ("only if it is necessary for your job"), BU ("unless you frequently host visitors") | Ohio State, UCLA, UW, Virginia Tech, Iowa, Arkansas, Michigan Medicine |
| Fax | UT Austin ("do not include a fax number") | BU, UCLA, UW, Purdue, Notre Dame, Vanderbilt, Arkansas, Iowa |
| Photograph | implied banned elsewhere | Boise State — headshot at exactly `125×188` px |
| Is there a standard at all | Georgia Tech, JHU (mandated generator) | Northwestern: "There is no official University-wide standard"; UConn: "there are no University-wide standards" |

**Pronouns — the clearest pattern in the survey.** Always optional, never required, always on or
immediately after the name line:
- *On the name line, in parentheses*: Cornell Bowers `Firstname Lastname (Pronouns [optional])`;
  UW `YOUR NAME (Pronoun/pronouns)`; Iowa `Jane Smith, PhD (she/her/hers)` — with the reason
  stated: "place them on the same line as your name so their connection to you is clear"
  (https://brand.uiowa.edu/email-signatures); Illinois "in parentheses next to your name and
  separated by commas".
- *On their own line under the name*: Duke's shipped `.docx`; Purdue's Compact template (italic).
- *Listed as an optional field*: Stanford (first under "Optional"), Northwestern, Utah State, UConn,
  BU.
- *Silent*: UT Austin, Ohio State, ASU, Virginia Tech, Georgia Tech, Vanderbilt, Michigan Medicine,
  Arkansas, Weill Cornell, UCLA, Notre Dame.

**Dark mode is essentially unaddressed.** One explicit mention in 23 institutions — Utah State:
"the image used in the email signature should not show up as an attachment and **is dark mode
friendly**" (https://www.usu.edu/brand/standards/stationery/email-signature). The only technique
visible in the wild is Ohio State's markup, which sets `background: #ffffff` on every element — a
defensive measure against client-side inversion, though the page never says so. If we publish a
dark-mode rule we are ahead of the field; the honest version is to specify a **transparent-PNG mark
that reads on both grounds**, and to say why, rather than to claim a convention exists.

**Accessibility — the one pattern worth copying verbatim.** Two institutions specify the *exact*
alt-text string and tell the reader to verify it after pasting. Iowa: "Set the alt text to read
'University of Iowa logo.'" Illinois: "ensure that the alt-text reads as 'University of Illinois
Urbana-Champaign home.'" (https://brand.illinois.edu/applying-the-brand/email-signature)

**Full source table for §6:** ESig sources are cited inline above by URL. The complete set read:
UT Austin (https://umac.utexas.edu/brand-center/templates/), Northwestern
(https://www.northwestern.edu/brand/applying-the-brand/email/signatures/), Cornell Bowers CIS,
Weill Cornell Medicine (https://brand.weill.cornell.edu/brand-guidelines/email-signature and
https://brand.weill.cornell.edu/sites/default/files/wcmsignaturesetup.pdf), Ohio State, Duke
(https://communicators.duke.edu/uncategorized/outlook-email-signatures/), UCLA, Boston University,
Stanford, Purdue (incl. the generator's own template partials at
https://www.purdue.edu/brand-studio/wp-content/plugins/email-signature-builder/scripts/app.js),
Arizona State (https://brandguide.asu.edu/tools/templates-libraries/email-signature-generator),
University of Washington, Virginia Tech, Notre Dame
(https://onmessage.nd.edu/university-branding/email-signature/), Michigan Medicine
(https://www.michiganmedicine.org/doc/branding-guidelines/design-resources/templates/branded-email-signatures),
University of Michigan style guide
(https://brand.umich.edu/wp-content/uploads/2023/07/220021-U-M-Style-Guide-July2023.pdf), Utah
State, Illinois, Iowa, UConn
(https://brand.uconn.edu/guidelines-usage/email-signatures/), Boise State, Georgia Tech, Vanderbilt
(https://brand.vanderbilt.edu/email/), Arkansas, GitLab
(https://handbook.gitlab.com/handbook/marketing/marketing-operations/opensense/), Johns Hopkins
(https://brand.jhu.edu/blog/branding-your-digital-workspace/).

**Dropped for §6:** Penn State (password-protected), Indiana (SSO), Johns Hopkins generator (JHED
SSO), NYU and NYU Stern (bot-blocked, HTTP 202 / 405), U-M brand site (Cloudflare 403), Michigan
Ross (403), Illinois and Georgia Tech generators (login), Cornell university-level signature page
(404 — the Cornell entries used are college-level), Government of Canada FIP (timeout).

---

## 7. Website / slide / document grid pages

**Short answer: brand books do not do this, and the ones that try produce a page with no numbers on
it.** The multi-surface grid lives in design systems, not brand books, and it is published as a
table where the *row is the surface*.

Negative results, all measured or fetched:

- **Pitt (L1) pp. 31–33** is a whole chapter called LAYOUT. p32 "Grid System" shows one diagram — a
  navy field with a gold checkerboard of `109.3px` modules inside a frame at
  `x 622.4 → 1824.1, y 142.9 → 904.5` — and the copy is "Our grid system is derived from the pattern
  at the heart of our shield, providing a systematic approach to layout, composition, proportions,
  and alignment." **No column count, no gutter, no margin, no surface.** p33 adds "The square grid
  system is a foundational tool built from equal-sized square modules" and two application
  thumbnails. A 1920×1080 book with a grid chapter that cannot be built from.
- **Penn State Design Essentials (L18)** names the surfaces (Print / Web / PowerPoint / Digital) and
  specifies a *typeface* per surface — "Print: The Proxima Nova… and Serifa typefaces are
  recommended", "Web: The Roboto typeface… is recommended" — but publishes no grid value.
- **Vercel Geist Grid (L17)** publishes column and row counts and a responsive prop syntax
  (`columns={{ sm: 1, md: 2, lg: 3 }}`, `rows={{ sm: 6, md: 3, lg: 2 }}`) and three breakpoint names
  (`sm`, `md`, `lg`) — but **no gutter or margin values**, and web only.
- **Slack, Visa, Harvard, Salesforce, Shopify** have no layout chapter at all.

**The one thing that works, and it is a table.** IBM Carbon (L11) publishes every surface as a row:

| Breakpoint | Value (px/rem) | Columns | Size (%) | Size | Padding | Margin |
| --- | --- | --- | --- | --- | --- | --- |
| Small | 320 / 20 | 4 | 25% | 80 px | 16 px | 0 |
| Medium | 672 / 42 | 8 | 12.5% | 80 px | 16 px | 16 px |
| Large | 1056 / 66 | 16 | 6.25% | 64 px | 16 px | 16 px |
| X-Large | 1312 / 82 | 16 | 6.25% | 80 px | 16 px | 16 px |
| Max | 1584 / 99 | 16 | 6.25% | 96 px | 16 px | 24 px |

Seven columns, five rows, one line of prose above it ("Use this set of standard breakpoints to
maintain layout integrity across screen sizes"), and a separate sentence fixing the invariant that
does *not* vary by row: "Padding is always a fixed multiple of mini units: 16 pixels at all standard
breakpoints." Everything derives from one declared atom: "The basic unit of 2x Grid geometry is the
8-pixel square mini unit."

**Rule extracted for our page:** one surface per row; one parameter per column; the invariants
(unit, padding) stated once in prose above the table so they do not repeat in every row; and one
worked example per surface as a small diagram beside the table rather than three separate diagrams.
That is a Template B page, not a Template C page.

---

## 8. Contents pages

### Measured conventions

| Book | Columns | Leader dots | Chapter numbers | Page numbers | Sub-entries | "How to use" folded in | Hyperlinked |
|---|---|---|---|---|---|---|---|
| Pitt (L1) p2 | **5** — one prose column + four contents columns | no | no | yes, **before** the title, in gold | yes | **yes**, left column + a QR code + `WWW.BRAND.PITT.EDU`; and a `QUESTIONS?` block bottom-right | **yes** — 68 link annotations measured |
| Harvard (L4) p3 | 2 | **yes** | no | yes, zero-padded (`05`, `06`, `07`, `10`…), **before** the title | no | **no** — p2 is a separate "Welcome to the Identity Guidelines" page | **yes** — 13 links |
| Slack (L3) p3 | 2 | no | **yes** — in the head itself (`Section 1: Defining our brand`) | yes, right-aligned in a narrow number column | yes | no | **no** — 0 annotations |
| Salesforce (L5) p5 | 3 × 2 blocks | no | **yes**, decimal (`1.0_Branding`, `1.1_Trademark – Copyright`) | **none at all** | yes | no | no |
| Shopify (L6) p3 | 2 × 4 | no | **yes**, large outlined `01`…`08` | **none at all** | no | no | no |
| Davenport (L9) p2 | 3 + a tinted panel | no | no | yes, before the title | yes | **yes**, in a red full-height panel at the left | no |
| EMU (L8) p2 | 1 ruled list + 1 prose column | no | no | yes, right-aligned as `PAGE 02` | no | **yes**, right column | no |

### What that adds up to

- **Two columns is the floor, not the norm.** In landscape, four of seven use three or more content
  columns. Pitt fits 11 chapters and ~60 sub-entries in four columns on one 1920×1080 page and it
  is still comfortable. Two columns in landscape leaves the page half empty.
- **Leader dots are a minority of one.** Only Harvard uses them, and Harvard is the most
  traditionally typeset book in the set. Everyone else sets the page number flush against the entry
  — either immediately *before* the title (Pitt, Harvard, Davenport) or right-aligned in its own
  narrow column (Slack, EMU). Putting the number first is the better landscape answer: it gives the
  column a hard left edge and removes the need for a leader entirely.
- **Chapter numbers and page numbers are usually alternatives, not companions.** The two books whose
  numbering is a *system* — Salesforce (`1.0_Branding` / `1.1_Trademark – Copyright`) and Shopify
  (`01`–`08`) — publish **no page numbers anywhere in the contents**; the number *is* the address.
  Four of the seven publish page numbers and do not number chapters at all. Slack is the only book
  that does both, and it has three sections, so `Section 1:` reads as part of the name rather than
  as an addressing scheme. The practical reading: **a decimal or zero-padded chapter number replaces
  page numbers; a bare "Section n:" in the title does not.**
- **"How to use this book" is folded into the contents page in four of seven** (Pitt, Davenport,
  EMU, and Salesforce's p2–p4 "Welcome"/"Creating success together" pages immediately before it).
  Harvard is the counter-example and gives it a whole page (p2) which is 80% white space.
- **A contacts block belongs on the contents page.** Pitt puts `QUESTIONS?` with a submission-form
  URL as the last cell of the last column — the reader who cannot find their answer in the contents
  is exactly the reader who needs the contact.
- **A version/date stamp is rare and is usually on the cover, not the contents.** Pitt: `VERSION 2.2`
  top-right of the cover panel. Suffolk (L10) is the outlier and stamps `updated 3/26/25` in the
  footer of *every* page.
- **The books that expect to be read on screen hyperlink the contents; the ones that don't are
  worse.** Measured: Pitt 68 link annotations on the contents page plus exactly one per content page
  (the `RETURN TO TABLE OF CONTENTS` button at `y = 1013.3`); Harvard 13 on the contents plus 11 on
  every content page (its left-hand section nav is live). Slack and Shopify have zero annotations in
  the entire file.

### How many entries fit on one landscape contents page

Pitt is the direct precedent — same page size, same problem. Measured on L1 p2:

- **58 numbered entry lines** (11 chapter heads + ~47 sub-entries) on **one 1920×1080 page**.
- Three contents columns, origins `x = 601 / 1025 / 1405`, plus a prose column at the left carrying
  the "how to use" paragraph, a QR code and `WWW.BRAND.PITT.EDU`.
- Entries run `y 159 → 952` — a **793px vertical run** — at 19px for sub-entries and 18px caps for
  chapter heads. That is roughly **40px per entry line** including the space above each group.

Our book needs **12 chapters + 44 page names = 56 entries**, two fewer than Pitt fits comfortably.
Budgeting a chapter head at 40px (including the space above it) and a sub-entry at 32px:

`12 × 40 + 44 × 32 = 480 + 1408 = 1888px of type`

| Layout | Per column | Fits the band? |
|---|---|---|
| 3 columns, content band `y 360 → 960` (600px, masthead kept) | 629px | **no** — overflows by 29px, and that is before any entry wraps |
| 4 columns, band 600 | 472px | yes, 128px spare |
| 3 columns, band `y 160 → 960` (800px, masthead dropped) | 629px | **yes**, 171px spare |
| 4 columns, band 800 | 472px | yes, very roomy |

So: **the contents page is the one page that should drop the standard masthead**, exactly as Pitt's
does — its only heading is a small `TABLE OF CONTENTS` label — and then 56 entries set in three
columns of 544 sit inside the band with room to spare. If the masthead stays, the contents needs
four columns of 402. It does not need a second page either way, and it should not have one: a
contents that spills onto a second page has stopped being a map.

---

# (a) The four templates, in our pixel grid

## a.0 First, fix the grid — one column, one gutter, one formula

Our four published steps are **1×1680, 2×828, 3×544, 4×400** on a 1680 content width with 120 side
margins. Three of the four already share a **24px gutter**:

- `828 × 2 + 24 = 1680` ✓
- `544 × 3 + 24 × 2 = 1632 + 48 = 1680` ✓
- `1680 × 1 = 1680` ✓
- `400 × 4 = 1600`, leaving **80px over three gaps = 26.667** ✗

So the 4-up step is the only one that does not resolve. All four systems are generated by a single
12-column grid the moment the 4-up column becomes **402**:

| column | 118 |
| gutter | 24 |
| formula | `w(n) = 118n + 24(n−1)`, `x(n) = 120 + 142(n−1)` |

| n (span) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| width | 118 | 260 | **402** | **544** | 686 | **828** | 970 | 1112 | 1254 | 1396 | 1538 | **1680** |
| origin x(n) | 120 | 262 | 404 | 546 | 688 | 830 | 972 | 1114 | 1256 | 1398 | 1540 | 1682 |

Row origins that follow:

- **4-up:** `x = 120, 546, 972, 1398`, each **402** wide, last edge **1800** ✓
- **3-up:** `x = 120, 688, 1256`, each **544** wide, last edge **1800** ✓
- **2-up:** `x = 120, 972`, each **828** wide, last edge **1800** ✓
- **1-up:** `x = 120`, **1680** wide ✓

**Recommendation: move to 402 and a constant 24 gutter.** The cost is 2px per column. The benefit is
that every legal width comes from one formula, so a block can be *validated* rather than eyeballed —
and validation is the only thing that will actually enforce "every block sits on a published step".
Keeping 400 means the 4-up inner edges land at `546.67` and `973.33`; in Figma those are blocks that
look aligned and are not, and on export they produce hairline seams. It also means the book has two
gutters (24 and 26.67), which is precisely the ambiguity that let the old book place a row at
`520 / 240 / 520`. Neither 520 nor 240 is a legal width in the corrected system; that row should
have been **`686 / 260 / 686`** (spans 5 + 2 + 5 = 12) or **`544 / 544 / 544`** (4 + 4 + 4 = 12).
Both fill the field exactly and leave nothing dead.

One more: **the lead's "max width 1000" is not on the grid either.** The neighbours are span 7 = 970
and span 8 = 1112. Use **970**.

## a.1 The vertical system, and the two masthead variants

Vertical unit = **24**, the same number as the gutter. Sub-unit **8** for type (IBM's mini unit,
L11: "The basic unit of 2x Grid geometry is the 8-pixel square mini unit").

Furniture is identical in both variants: chapter label top-left at `x 120, y 96`; page number
right-aligned to `x 1800` at `y 96`; nothing below `y 960`.

### Variant 1 — lead above the content (our current masthead)

```
y  96   chapter label (left)          page number (right, edge at x1800)
y 160   H1
y 250   lead, measure 970 (was 1000 — off-grid)
y 360 ┌─────────── content band ───────────┐
      │                                    │  600px = 25 × 24
y 960 └────────────────────────────────────┘
```

| | value |
|---|---|
| content band | `y 360 → 960` = **600** |
| tile rows | 1 → 600 · 2 → **288** · 3 → **184** · 4 → **132** (gaps of 24) |
| table rows | 48px header + **11** body rows of 48 |
| specimen rows | 48px header + **2** rows of 276, or **3** rows of 184 |
| Template C split | diagram **396** + 24 + card row **180** = 600 |
| contents page | needs **4 columns** of 402 to hold 56 entries |

### Variant 2 — title above, lead in column 1 (Visa-style)

```
y  96   chapter label (left)          page number (right)
y 160   H1  (one line only)
y 240 ┌── lead ──┐┌────── content ──────────┐
      │ x120     ││ x688                    │  720px = 30 × 24
      │ w544     ││ w1112                   │
y 960 └──────────┘└─────────────────────────┘
```

| | value |
|---|---|
| lead column | span 4 — `x 120`, **544** wide (32% of the field; Visa's is 29%, Pitt's sidebar 26.8%) |
| content field | span 8 — `x 688`, **1112** wide, last edge 1800 |
| content band | `y 240 → 960` = **720** |
| tile rows | 1 → 720 · 2 → **348** · 3 → **224** · 4 → **162** |
| table rows | 48px header + **14** body rows of 48 |
| specimen rows | 48px header + **3** rows of 224 = 720 exactly |
| Template C split | diagram **504** + 24 + card row **192** = 720 |
| contents page | **3 columns** of 544 hold 56 entries with 171px spare |
| alternative | span 3 lead (`x 120`, 402) + span 9 content (`x 546`, 1254) |
| constraint | H1 is **one line** on a content page. If two lines must be allowed, the band becomes `y 288 → 960` = 672 (28 × 24) and the row counts drop by one |

### Which to use, and why

**Recommend Variant 2 for Templates B and C, Variant 1 for Templates A and D.**

The evidence is one-sided on the principle: **no measured book stacks the lead above the content.**
Normalised to a 1080-tall page, the content bands are Pitt **890**, Slack **882** (its two
full-width rules sit at `y 134` and `y 1016`), Shopify **~800**, Visa **795** — against our **600**.
Visa's H1 sits on the same line as its chapter tab strip at `y 83`, and its content starts at
`y 208` on every single content page. We are spending a third of every page on a masthead.

But the two templates that hurt most from that are B and C:

- **B** goes from 11 rows to 14 — and 11 is genuinely tight for a colour spec or a token map.
- **C** goes from a 396px diagram to a 504px one, which is the difference between a construction
  diagram you can annotate and one you cannot.

**A** and **D** do not suffer: a tile grid reads better with the lead as a full-width introduction
above it, and a misuse page's captions want the whole width. Splitting this way also keeps a visible
difference between "here is a set" (lead above) and "here is a specification" (lead beside), which
is a useful signal in itself — and it is what Pitt does, where the gold sidebar carries the lead on
every page *including* its tile grids, and what Slack does, where the lead is column 1 on the spec
pages and full-width on the value pages.

If a single variant is wanted for the whole book, use **Variant 2**. It is the one every measured
book uses.

## a.2 Template A — Lead + tile grid

*Palettes, specimens, sets. Variant 1 masthead.*

- **Tiles across:** 4 (402), 3 (544) or 2 (828), at the origins in a.0. No other count.
- **Tile rows:** 1, 2, 3 or 4, at 600 / 288 / 184 / 132. **A tile never sets its own height.** The
  row's height is chosen from that list before any content goes in, and every tile in the row takes
  it. This is the rule Visa obeys to within 1px (`384.1 / 384.1`, `280.8 / 281.3`, `327.8 × 4`,
  `562.9 / 562.9`) and the rule EMU breaks on its own p11, where three tip-card columns start at
  `242.9 / 245.9 / 248.7` and end at `431.4 / 447.6 / 488.5`.
- **Ratio follows height, not the other way round.** If a published ratio set is wanted, take
  Carbon's (L12): `1:1, 2:1, 1:2, 4:3, 3:4, 16:9, 9:16` — but the row height still wins.
- **Caption:** below the tile, 16px gap, title 20/600 and description 16/400, measure ≤ 75% of the
  tile width (Carbon's `padding: 0 25% 0 0`).
- **Specimen ground:** white by default. Only tint the tile when the tint *is* the point (12 of the
  17 misuse pages surveyed put the specimen straight on white).
- **Spec text:** for colour, set the values inside or directly beneath the swatch in a fixed line
  order, one value per line (Harvard L4 p37: `PMS 187 U / PMS 1807 C / CMYK 7-100-65-32 /
  HEX #A51C30 / RGB R-165 G-28 B-48`). Do not draw a table for colour.
- **Rank by size when rank exists.** Pitt gives primary swatches `448.7 × 415` and accents
  `180 × 99.6`; Slack sizes the core panels to their usage proportion; Pacific prints the proportion
  inside the swatch ("35% Share").

## a.3 Template B — Lead + wide table

*Specifications, maps, token tables. Variant 2 masthead.*

- **Table width:** span 12 (1680) at `x 120`, or span 10 (1396) at `x 120` with a span-2 note column
  (260) at `x 1540`.
- **Rows:** header **48**, body **48** (Carbon `tr { block-size: 3rem }`). A specimen row is **224**
  and every specimen row in a table takes the same height (Pitt's typeface table measures
  `235.8 / 230.4` between rules — equal to within 6px on a 1920×1080 page).
- **Budget:** **14 body rows** (Variant 2) or **11** (Variant 1). **Publish this number in the
  template.** "No block crosses the bottom margin" cannot be enforced by eye; it can be enforced by
  a row count.
- **Rules:** a **1px rule under every row** in the border-subtle token; **no vertical rules**; **no
  zebra when ruled**. Zebra is the alternative, not an addition — Carbon's own zebra modifier
  recolours the row rules to the layer colour so they disappear (`--zebra tbody tr:nth-child(odd) td
  { border-block-end: 1px solid var(--cds-layer) }`).
- **Header:** a tinted band (`layer-accent`), 14/600, not a double rule.
- **Cells:** `padding-inline: 16px`; text **starts flush left**; vertical-align middle. Right-align a
  numeric column **only** when the column exists to be compared down its length.
- **Units:** in the header (`Value (px/rem)`, `Size (%)`); repeated in the cell only when the column
  mixes units. Carbon does both and it reads (L11).
- **The three-surface grid page is a Template B page**, not a Template C page: one surface per row,
  one parameter per column, and the invariants stated once in prose above the table
  ("Padding is always a fixed multiple of mini units: 16 pixels at all standard breakpoints").

## a.4 Template C — Lead + diagram + up to 3 cards

*Constructions, geometries, decision trees. Variant 2 masthead.*

- **Layout 1 — diagram over cards:** diagram span 12 (1680) at `x 120, y 240`, height **504**; card
  row at `y 768`, height **192**, three cards of 544 at `x 120 / 688 / 1256`.
- **Layout 2 — diagram beside cards:** diagram span 8 (1112) at `x 120`, full band height **720**;
  three cards of span 3 (402) at `x 1398`, heights **224** each with 24 gaps.
- **Annotation grammar** (from §5):
  - **Two units, not two dimensions.** Name the unit in the lead, in prose — "X = the cap height of
    the A", "clear space = 1X on all four sides". Every label on the drawing is then a multiple of a
    named unit. Visa's endorsement page carries four labels (`X`, `0.5X`, `0.8Y`, `0.25Y`) from two
    units and reads cleanly; two arbitrary dimensions would read worse.
  - **Show the unit rather than dimension it** where possible — repeat the glyph itself around the
    mark (Slack's octothorpe, Pitt's letter P) instead of drawing an arrowed dimension line.
  - **Construction lines: 1px dotted, in the neutral border token.** Never the brand colour at full
    strength, never the mark's weight (Harvard L4 p22/p24).
  - **Labels: lowercase, small, sans, hung off a brace to the right of the drawing** (Harvard, EMU
    p38, Pacific p19).
  - **Two clear-space zones when there is a floor and a target**, drawn as two nested tints, and say
    which is which in the lead (Visa: "Recommended clear space is gray area, full width of V…
    Minimum clear space is white area, half width of V").
  - **The minimum size goes in a corner cell, not on the diagram** (Pitt p59: `Digital: 220px /
    Print: 1.25"` bottom-right, separate from the clear-space drawing).
- **The decision tree is a Template C diagram.** Pitt p73 — a question, a branch bar, two labelled
  branches with a specimen each, and a prose column of examples under each branch — fits Layout 1
  exactly. We will need one ("which mark, which lockup, which typeface") and D16 currently has no
  home for it.

## a.5 Template D — Misuse

*Variant 1 masthead. It is Template A with a marker and a mandatory caption.*

- **Tiles:** 4 across (402) × 2 rows of 288, giving **8 don'ts**; or 3 across (544) × 2 rows,
  giving **6**. Both sit inside the surveyed comfort range of 6–10 per page (Slack 10, Pitt 9,
  NASA 1976 9, Spotify 6, Asana 6, Lakeland 6). Twenty (Johns Hopkins Medicine) is a list with
  pictures.
- **Tile interior:** specimen area **218** high, then the caption block **70** (16 gap + 20/600
  title + 2 × 16/400 lines) — `218 + 70 = 288` ✓.
- **Marker — the recommendation:**
  1. **The caption is the marker.** Every one of the seventeen books surveyed carries the
     prohibition in words, and three of them (NASA 1976, Scranton, Slack) carry it in words *only*.
     The caption is a full sentence beginning **"Don't"**, black, not coloured.
  2. **A hairline diagonal, corner to corner of the tile, plus a 1px tile outline** — Red Hat's
     construction. **2px at our page scale, not a band.** Nobody in the survey paints a wide band
     across a specimen, and the reason is that the reader has to be able to see the violation.
  3. **Not red — and the precedent is exactly ours.** Red Hat draws the diagonal in `#F0561D`
     orange while its own brand red `#EE0000` sits inside the same tile; Asana uses `#FE584A` coral;
     Point Park uses `#EAABB6` pink and no red on the page at all. All three are the full-tile camp.
     Pick a hue that appears nowhere else in the system — not a state colour, not a brand accent,
     not a data-viz series.
  4. **If a glyph is wanted, it is 24×24, inset 16px from the tile's top-left, with a white
     counter** so it reads over any specimen (Carbon L12: `height:24px; left:calc(1rem - 1px);
     top:calc(1rem - 1px)` and `path[data-icon-path=inner-path] { fill:#fff }`). Carbon's don't glyph
     is a **circle-slash** (`Misuse`), not an ✕.
- **A "do" alongside is optional — the corpus is a dead heat (8 v 8).** If one is shown, follow Red
  Hat and give it **no marker at all**: no ✓, no green, no border. The bold `Do this:` lead-in
  carries it. That removes the red/green pair entirely and satisfies Michigan's stated rule
  ("Do not rely on color as the only means of communicating information").
- **Declare the marker rule in the book.** No book in the survey states one. We would be first.

## a.6 The two D16 rules, made enforceable

1. **Every block sits on a published span.** The only legal widths are the twelve values in a.0.
   A block's `x` must be one of the twelve origins and `x + w` must equal one of the twelve right
   edges. Both are checkable by formula; that is the point of fixing 400 → 402.
2. **No block crosses `y = 960`, and no column ends early.** Enforced by two published numbers per
   template — the row height and the row count — never by eye. A row of blocks is a *row*: one top,
   one height, taken from the published list before content is placed. Visa obeys this to within
   1px across its whole book; EMU breaks it on a single page and the page falls apart.

---

# (b) The declared chapter-opener rule

> **Every chapter gets one opener. The introduction may skip it (Pitt does).**
>
> **One canvas, for every chapter, with no exceptions:** a full-bleed flat Navy field. Not a
> gradient, not paper, not a photograph, not an alternation. Eight of the eight measured books with
> dividers use one canvas for every chapter; the fill samples are pixel-identical across all ten of
> Pitt's openers and all seven of BGSU's. The only book with two canvases (Salesforce) uses the
> second for a **different rank of divider** — appendices — not for a different chapter. If we ever
> need a second canvas, that is the only reason it may exist, and it must be declared with the
> first.
>
> **The title is display caps, flush left at `x = 120`, and its last line sits on the content
> baseline `y = 960`; it grows upward.** Bottom-anchoring is BGSU's construction and it means a
> one-line and a two-line title end on the same line and neither can ever collide with anything
> below. Pitt's equivalent block ends at `y = 934` on the same page size.
>
> **No mark.** One of eight books puts the mark on its openers. The cover carries it; the opener has
> no content for it to sit beside.
>
> **A chapter number only if the contents page numbers chapters.** All four books that number their
> openers (Pacific, Salesforce, Shopify, Slack) also number chapters in their contents; none of the
> four un-numbered books numbers its opener. Numbering is a book-wide system or it is nothing. Our
> contents must carry 44 page names, so page numbers have to be there; and §8 finds that a decimal
> or zero-padded chapter number *replaces* page numbers rather than joining them. So: **publish page
> numbers, skip chapter numbers, and put no number on the opener.** The one book that carries both
> (Slack) has three chapters, where `Section 1:` reads as a name; at twelve it would read as an
> address competing with the page number.
>
> **If the opener carries the chapter's index, the index is a block with a span and a fixed size.**
> Title occupies **spans 1–6** — `x 120 → 948`. Index occupies **span 5 from column 8** —
> `x 1114 → 1800` — top-aligned at `y = 240`, set 20/32. At 32px per entry the index cannot pass
> `y = 960` until it holds **22 entries**; our largest chapter holds eight. Collision is arithmetically
> impossible. This is the fix for the opener whose title overlapped its index: Salesforce, the one
> book that puts an index on the opener, sets it at whatever `x` and size fits — `x 1100.6` at 42px
> on p6, `x 1270` at 30px on p14 — which is the same failure we had.
>
> **Furniture is all or nothing, and ours is all:** chapter label at `x 120, y 96`, page number
> right-aligned to `x 1800` at `y 96`, and a `Contents` link in the footer. Pitt keeps exactly this
> on every opener; Harvard drops everything including its own nav. Nobody keeps some of it.

**The cheaper alternative, if the big-type opener is not wanted.** Slack's construction is the other
route the corpus sanctions (§2, item 7), and it is a third of the work: keep the title at **exactly
the content-page coordinate** — `x 120, y 160`, same size — keep the rule under it, and **change only
the ground** from paper to flat Navy. Add a two-line "In this chapter…" summary under the rule, which
three of eight books do. Because the title never moves, the collision that produced our overlapping
opener becomes impossible by construction rather than by arithmetic, and there is no second title
size to maintain. The cost is that the break is quieter — which for a 59-page reference book people
will scroll rather than read through may be the right trade. **Pick one of the two routes and write
it down; what the corpus has no example of is moving the title a little.**

---

# (c) What the research says we got wrong

1. **The 4-up column step.** `4 × 400` leaves 80px over three gaps — **26.667**, the only gutter in
   the book that is not 24 and not an integer. It should be **402**, step 426. (a.0)
2. **The lead is above the content in all four templates, and no measured book does that.**
   Normalised to 1080: Pitt 890px of content band, Slack 882, Shopify ~800, Visa 795 — ours 600.
   Visa's H1 shares a line with its chapter tabs at `y 83` and its content starts at `y 208` on every
   page. The masthead is costing us a third of the page. (§1, a.1)
3. **The lead's max width of 1000 is off-grid.** Span 7 is 970, span 8 is 1112. (a.0)
4. **The full-tile diagonal *band* has no precedent, and the precedent it does have is a line.**
   Red Hat and Asana — the two books doing exactly this treatment — draw a **single thin diagonal**
   corner to corner plus, in Red Hat's case, a 1px tile outline. MIT's "band" is on the tile's top
   edge, not across it. Twelve of the seventeen surveyed put the specimen straight on white and
   leave it legible. A band across the specimen hides the thing the page exists to show. (§3)
5. **"The ✕ must not be red" is right for the wrong reason.** Red is the majority (10 of 17), and
   IBM Carbon binds the marker to its **error state token** deliberately
   (`fill: var(--cds-support-01,#da1e28)`). The defensible argument is not "red is a state colour"
   — it is that the three books doing the full-tile treatment all avoid red *and* that no book in the
   corpus lets colour carry the meaning alone. Make the caption carry it, then the marker's colour is
   free. (§3)
6. **"Two dimensions per diagram" should be "two *units* per diagram."** Visa draws four labels from
   two units and it reads; two arbitrary dimensions would read worse. (§5)
7. **Four templates leave three real pages homeless:** a decision tree (Pitt p73), a paired Do/Don't
   matrix (Harvard p6 runs ten pairs on one page; Salesforce runs `Do prose | ✓ panel | ⊘ panel |
   Don't prose`), and the contents page itself, which is none of A/B/C/D. (§1, §3, §8)
8. **Nothing in D16 makes a 59-page PDF navigable.** Pitt hyperlinks its contents (68 link
   annotations measured) and puts a `RETURN TO TABLE OF CONTENTS` control on every page including
   the openers; Harvard hyperlinks a persistent section nav on every content page (11 links). Slack
   and Shopify have **zero** link annotations in the entire file and are worse to use. Add a
   `Contents` link to the footer and hyperlink the contents page.
9. **The contents page will not fit 56 entries in three columns if it keeps the masthead.** 1888px
   of type over three columns is 629px against a 600px band. Drop the masthead on that one page (as
   Pitt does) or go to four columns. (§8)
10. **The grid page is the one most likely to end up empty.** Pitt has a whole LAYOUT chapter whose
    grid page publishes no column count, no gutter and no margin; Penn State names four surfaces and
    publishes no number; Vercel Geist publishes counts but no gutter. Publish the twelve span widths
    and the twelve origins as a table, or the page will be decoration. (§7)
11. **Two things we have right and should keep.** The furniture positions are close to Shopify's
    measured rhythm — its eyebrow sits at `y 88` and its H1 at `y 156` on a 1920-normalised page,
    against our 96 and 160 — and the page number right-aligned to `x 1800` is a 120px right margin
    that matches the left. Openers without the mark is the majority practice (seven of eight).

