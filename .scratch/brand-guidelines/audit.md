# Audentra Brand Guidelines — Figma file audit

- Date: 2026-08-22
- File: https://www.figma.com/design/i7gAADtBeCv5QPIAAHIncw (key `i7gAADtBeCv5QPIAAHIncw`)
- Pages: **Brand Guidelines** (`4:2`, 62 frames 1920x1080) and **Assets (uploaded)** (`0:1`).
- Method: read-only. `get_metadata` on page `4:2` for the frame list and child-type counts; `use_figma` read-only scripts to dump every TEXT node (characters, font, size, variable bindings), fill hexes, image fills, component instances per frame; `get_screenshot` on a sample of frames to judge the visuals; `use_figma` read of local variable collections, styles and the Assets page. Nothing in the file was modified.
- Status: complete. 62/62 frames dumped (text, fonts, fills, images, instances), 31 frames screenshotted, variables and Assets page read. Section 0 is the raw log kept from the first pass; sections 1–6 are the audit.

## 0. Raw facts captured first (survive if the run is cut)

- Pages in the document: `0:1 Assets (uploaded)`, `4:2 Brand Guidelines`. Only these two.
- Variables: ONE local collection, **Typography** (`VariableCollectionId:28:1407`), one mode `Default`. Three STRING variables scoped `FONT_FAMILY`: `font/heading` = "Inter" (description says set to "Satoshi" once installed), `font/body` = "Inter", `font/mono` = "Roboto Mono". **No colour collection, no spacing/radius collection.** Local paint styles: 0. Local text styles: 0. Local effect styles: 0. Satoshi is not among the fonts available to the file (only Inter and Roboto Mono of the three matched `listAvailableFontsAsync`).
- Every solid fill on every frame sampled so far is a raw hex (`boundFills` = 0 on all 62 frames; `unboundSolid` is the full count). Brand hexes seen across frames: `#6a38ff` purple, `#1e5bff` royal blue, `#02cdc7` teal, `#04b2a9` teal 700, `#67e1dd` teal 300, `#b3f0ee` teal 100, `#0a1f44` deep navy, `#101828` ink, `#667085` graphite, `#98a2b3` slate, `#eaecf0` mist, `#f2f4f7` cloud, `#9e7eff` purple 300, `#d2c3ff` purple 100, `#502abf` purple 700, `#1744bf`/`#6d94ff`/`#bcceff` blue 700/300/100, `#12b76a`/`#f79009`/`#d92d20` success/warning/error. Off-palette hexes seen: `#ff7a86` (15 Language Guidelines, "What we avoid" heading), `#e5484d` (47/48 business-card bleed marks), `#f97316` (27 Usage Errors), `#000000` (27 Usage Errors, the black 1c example).
- Text nodes: every TEXT node has `boundVariables.fontFamily` set (textBoundFont = count of texts) on every frame dumped, except 3 texts on **24 Minimum Size** (`22:436`) which are unbound (`textUnboundFont: 3`). Fonts in use: Inter (Light, Regular, Medium, Bold, Black) and Roboto Mono (Regular, Bold). Satoshi appears nowhere as a font: "Primary Typeface: Satoshi" (35) is rendered in Inter.
- Assets page `0:1`: one section `25:1407` "Logo components — official masters (docs/brand: logo-full.svg · logo.svg · symbol.svg)" with 11 COMPONENTs: `Logo / Primary (Full) — Color|Reverse|White|Navy` (`21:56`, `22:2`, `21:111`, `21:166`, 990x219), `Logo / Logo — Color|Reverse|White|Navy` (`20:16`, `22:56`, `20:31`, `20:46`, 990x150), `Logo / Symbol — Color|White|Navy` (`20:53`, `20:60`, `20:67`, 192x150). Plus 10 raster frames 400x300: `dots_fade_right` 3:14, `dots_uniform` 3:15, `photo_logo_family_grid` 3:16, `photo_product_dashboard_1` 3:17, `photo_product_dashboard_2` 3:18, `photo_merch_light` 3:19, `photo_brand_board` 3:20, `photo_merch_dark` 3:21, `photo_business_cards` 3:22, `photo_email_signature` 3:23. No symbol "Reverse" variant exists (Symbol has only Color/White/Navy), no tagline-only, no vertical/stacked lockup component.
- "Proposed" flags found in text: 24 Minimum Size caveat ("Minimums are proposals pending a print test of the tagline at 2 in."), 29/30/31/32 Pantone caveat (identical sentence on four frames), 29 every primary Pantone carries "(proposed)"; 31 Teal 700 Pantone 3262 C has no "(proposed)" tag while the cores do (inconsistent).

## 1. Inventory — one row per frame (page `4:2`)

Kind: divider (section opener, cover, closer) / content (prose + diagram) / table (rows of specs or pairs) / mockup (an application rendered) / gallery (rasters only). Words = whitespace-split count of every TEXT node in the frame. Img = image fills (the dot texture counts as one). Inst = component instances (all are the 11 logo components from the Assets page). Flags = proposed / TBD / placeholder / draft / hidden. Canvas: 6 frames per row, x step 2080, y step 1320, all 1920x1080.

| # | Frame name | Node id | Sec | Kind | Words | Img | Inst | Flags | What the frame actually shows |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | 01 Cover | `6:2` | front | divider | 11 | 1 | 2 | "Version 2.0 (draft)"; doc code lacks `-v#` | Purple field, dot-texture raster, white A watermark (Symbol White instance), Logo White top-left, title 96px, "August 2026 · Version 2.0 (draft)", code `G-142-001-2608-BrandIdentityGuidelines` |
| 02 | 02 Table of Contents | `6:10` | front | table | 177 | 0 | 0 | lists "60 Selected applications" only; omits 61 | Ten section columns (`6:13`…`6:32`), each a purple section head + page-numbered item list |
| 03 | 03 Section 01 Brand | `6:33` | 01 | divider | 29 | 1 | 0 | — | "01" at 300px, "Brand" at 112px, one-paragraph description bottom-right, dot texture |
| 04 | 04 Brand Essence | `6:39` | 01 | content | 74 | 1 | 0 | — | Navy page: 40px statement + 3-paragraph body (Higher Education Intelligence Platform) |
| 05 | 05 Brand Purpose | `6:45` | 01 | content | 50 | 1 | 0 | — | Mission / Vision labels + one sentence each + "Purpose in practice" note |
| 06 | 06 Positioning | `7:2` | 01 | content | 51 | 1 | 0 | — | 72px headline "Institutional intelligence for what's next." + body |
| 07 | 07 Positioning Statement | `7:8` | 01 | content | 59 | 1 | 0 | — | 40px statement + two columns "What we enable" / "How we fit" |
| 08 | 08 Positioning Keywords | `7:19` | 01 | table | 74 | 1 | 0 | — | "Audentra is… / isn't…" two-column table, 5 keyword rows |
| 09 | 09 Brand Values | `7:42` | 01 | content | 62 | 1 | 0 | — | 64px statement + 5 values each with one line |
| 10 | 10 Brand Promise and Tagline | `7:57` | 01 | content | 65 | 1 | 0 | — | Two columns: Promise vs Tagline, each statement + usage line, plus a rule note |
| 11 | 11 Brand Overview | `7:72` | 01 | table | 112 | 1 | 0 | — | 7-cell bordered grid: positioning, tagline, mission, promise, values, market |
| 12 | 12 Section 02 Voice | `9:2` | 02 | divider | 40 | 1 | 0 | — | Section opener; description is the voice thesis ("Close, not cool…") |
| 13 | 13 How We Sound | `9:8` | 02 | content | 36 | 1 | 0 | — | Five 60px words (Close, Short, Plain, Concrete, Honest) each with a qualifier |
| 14 | 14 Tone Guidance | `9:22` | 02 | table | 101 | 1 | 0 | — | Six audiences (executive → student-facing) with one tone line each |
| 15 | 15 Language Guidelines | `9:38` | 02 | table | 163 | 1 | 0 | heading fill `#ff7a86` off-palette | "What we use" (teal head) / "What we avoid" (red-pink head) bullet lists |
| 16 | 16 Writing Guidelines | `9:46` | 02 | content | 185 | 1 | 0 | — | Eight 28px rules each with an example line, footer rule |
| 17 | 17 Before and After | `46:1407` | 02 | table | 200 | 1 | 0 | em dashes only inside "Before" examples | Nine before/after copy pairs, footer |
| 18 | 18 Rules for Product Copy | `46:1422` | 02 | content | 253 | 1 | 0 | — | Six rule blocks (who speaks, one name per thing, no promises of contact, punctuation, dates, buttons) + audience footer |
| 19 | 19 Section 03 Logo | `10:2` | 03 | divider | 39 | 1 | 0 | promises "secondary vertical lockup" that does not exist | Section opener |
| 20 | 20 Logo Family | `22:70` | 03 | content | 118 | 0 | 3 | — | Primary / Logo / Symbol stacked, rule "never duplicate the A", note with master fill hexes |
| 21 | 21 Logo Structure: Primary Logo | `22:153` | 03 | content | 127 | 0 | 1 | — | Real construction grid (75 rects) with u-dimensions; caveat "measured from logo-full.svg" |
| 22 | 22 Logo Structure: The Symbol | `22:299` | 03 | content | 153 | 0 | 1 | — | 9x7-unit symbol grid with slope/apex/crossbar dims; caveat "measured from symbol.svg" |
| 23 | 23 Clear Space | `22:362` | 03 | content | 67 | 0 | 1 | — | Primary logo with four x-boxes, "x = symbol height" |
| 24 | 24 Minimum Size | `22:436` | 03 | content | 89 | 0 | 3 | "Minimums are proposals pending a print test"; 3 texts unbound from font variable | Three forms with print/web minimum widths |
| 25 | 25 Color Variants | `11:27` | 03 | content | 88 | 0 | 4 | — | Four tiles: Primary, Reverse·White, Reverse on Deep Navy, Monochrome Navy (1c) |
| 26 | 26 Usage on Backgrounds | `11:43` | 03 | content | 84 | 0 | 4 | — | Four full-height fields: Light, Cloud, Deep Navy, Audentra Purple, logo centred in each |
| 27 | 27 Usage Errors | `11:59` | 03 | content | 94 | 0 | 7 | orange `#f97316` and black used as deliberate wrong examples | Six red-slashed tiles: stretch, rotate, recolor/unapproved bg, effects, duplicate A, crop |
| 28 | 28 Section 04 Color | `12:2` | 04 | divider | 40 | 1 | 0 | promises "guidance on contrast and backgrounds" that no page delivers | Section opener |
| 29 | 29 Primary Colors | `12:8` | 04 | table | 135 | 0 | 0 | Pantone "(proposed)" x4 + caveat; page number hidden (`12:10`) | Four vertical swatches (Purple wide, Blue, Teal, Navy) with HEX/RGB/CMYK/Pantone; meanings at left |
| 30 | 30 Neutral Palette | `12:32` | 04 | table | 202 | 0 | 0 | caveat; page number hidden (`12:34`) | Seven neutrals (White, Cloud, Mist, Slate, Graphite, Ink, Deep Navy) with specs and roles |
| 31 | 31 Secondary Colors and Tints | `12:58` | 04 | table | 167 | 0 | 0 | caveat; page number hidden (`12:61`); Teal 700 Pantone 3262 C not tagged proposed | 3x4 grid: 700/500/300/100 for Purple, Blue, Teal, hex only (+ core Pantone) |
| 32 | 32 Functional Palette | `12:100` | 04 | table | 171 | 0 | 0 | caveat; page number hidden (`12:102`) | Six state colours (Success, Warning, Error, Information, Backlog, In progress) as 12px spec blocks with a colour bar each |
| 33 | 33 Section 05 Typography | `13:2` | 05 | divider | 39 | 1 | 0 | — | Section opener ("Satoshi leads. Inter supports.") |
| 34 | 34 Font Family | `13:8` | 05 | content | 100 | 0 | 0 | note: heading variable "currently Inter" | Two tiles "Aa Satoshi" (purple) / "Bb Inter" (navy), both rendered in Inter; fallback rule; variable note |
| 35 | 35 Primary Typeface: Satoshi | `13:21` | 05 | content | 87 | 0 | 0 | specimen rendered in Inter; note "set variable to Satoshi" | Five weight rows (Light…Black) of A–Z specimen; ITF/Fontshare credit |
| 36 | 36 System Typeface: Inter | `13:43` | 05 | content | 74 | 0 | 0 | — | Five weight rows (Light…Bold) of A–Z specimen |
| 37 | 37 Hierarchy | `13:64` | 05 | table | 112 | 0 | 0 | — | Six levels (Display, H1, H2, Subheading, Body, Caption/data) with web px and print pt ranges; weights only in prose |
| 38 | 38 Typography Don'ts | `13:88` | 05 | content | 113 | 0 | 0 | Space Mono used deliberately as the wrong font (1 unbound text) | Six red-slashed tiles + numbered list |
| 39 | 39 Section 06 Imagery | `14:2` | 06 | divider | 33 | 1 | 0 | — | Section opener |
| 40 | 40 Moodboard | `14:8` | 06 | mockup | 71 | 2 | 0 | 2 of 4 tiles "Photography to be selected" | Four territories; top two are empty placeholder tiles, bottom two are rasters (a product dashboard screenshot whose sidebar wordmark reads "Edgent", and a brand-board collage) |
| 41 | 41 Composition | `14:36` | 06 | content | 88 | 0 | 0 | 3 of 3 tiles placeholders; "Placeholders. Replace with selected photography…" | Three principles (negative space, rule of thirds, one focal point) with empty image tiles |
| 42 | 42 Imagery Don'ts | `14:65` | 06 | content | 107 | 0 | 0 | — | Six tiles of text only (no example images): staged stock, robots/glowing brains, lighting, clutter, watermarks, heavy filters |
| 43 | 43 Section 07 Iconography | `14:105` | 07 | divider | 30 | 1 | 0 | — | Section opener |
| 44 | 44 Icon Family | `14:111` | 07 | content | 65 | 0 | 0 | all 48 tiles named "icon" | 6x8 grid of line icons (24 grid, "1.9 px stroke", rounded caps); no names, no source set named |
| 45 | 45 Icon Usage Errors | `14:257` | 07 | content | 73 | 0 | 0 | — | Four tiles (stroke widths, scaling, style mixing, complexity), three icons each |
| 46 | 46 Section 08 Applications | `15:2` | 08 | divider | 29 | 1 | 0 | — | Section opener |
| 47 | 47 Business Card: Front | `15:8` | 08 | mockup | 99 | 0 | 1 | bleed marks `#e5484d` off-palette | Navy card with Reverse logo, bleed/trim/safe dims in inches and px |
| 48 | 48 Business Card: Back | `15:35` | 08 | mockup | 127 | 0 | 1 | "Co-Founder & CXO" | White card: name, title, contacts, logo 292x65, tagline; type sizes in prose |
| 49 | 49 Letterhead | `15:71` | 08 | mockup | 167 | 0 | 1 | "Co-Founder & CXO" | Margin diagram (0.5 in, 7.5x10) + filled sample letter at 6.5–8px |
| 50 | 50 Business Envelope | `15:97` | 08 | mockup | 98 | 0 | 1 | — | #10 envelope 9.5x4.125 in with logo and return address |
| 51 | 51 Email Signature | `16:2` | 08 | mockup | 94 | 1 | 2 | "Co-Founder & CXO"; sample 2 is a raster | Three signatures: short reply (vector), full personal (raster with photo avatar + disclaimer), team |
| 52 | 52 Social Media | `16:22` | 08 | mockup | 77 | 2 | 4 | — | LinkedIn 1584x396 (navy + dots), Facebook 820x312 (purple + dots), two 1:1 profile tiles |
| 53 | 53 Product and Platform | `16:40` | 08 | mockup | 91 | 2 | 0 | product rasters branded "Edgent", greeting "Hi Ajlan" | Two dashboard+phone rasters, three product-name chips (EDward, Action Center, Morning Brew), Satoshi Medium rule |
| 54 | 54 Merchandise | `16:56` | 08 | mockup | 57 | 1 | 0 | — | One AI-looking merch collage raster (mug, pens, notebook, folder, tee, hoodie) + approved-placements text |
| 55 | 55 Section 09 Asset Library | `16:62` | 09 | divider | 37 | 1 | 0 | — | Section opener |
| 56 | 56 Naming Convention | `22:533` | 09 | table | 128 | 0 | 0 | — | Pattern `aud_[asset]_[mode]_[color].[ext]` in Roboto Mono, segment legend, six examples |
| 57 | 57 Document and Operational System | `17:37` | 09 | table | 134 | 0 | 0 | title split across Title/Subtitle to force a line break | `TYPE-DEPT-###-YYMM-DocumentName-v#` diagram, type-key legend (8 letters), best practices |
| 58 | 58 File Directory | `22:565` | 09 | table | 127 | 0 | 3 | — | Four columns listing 46 file names + supporting materials; "Masters: logo-full.svg · logo.svg · symbol.svg" |
| 59 | 59 Section 10 Gallery | `17:104` | 10 | divider | 3 | 1 | 0 | only divider with no description text | "10 Gallery" and nothing else |
| 60 | 60 Gallery I | `17:109` | 10 | gallery | 1 | 3 | 0 | rasters show "AUDENTRA." with a period, old tagline "Intelligent solutions. Measurable impact.", "Alex Morgan, CEO", a differently drawn A | Three raster collages (business cards, merch dark, merch light), no captions |
| 61 | 61 Gallery II | `17:114` | 10 | gallery | 1 | 3 | 0 | brand-board raster states "Clear space = height of the 'A' from the icon"; product raster "Edgent" | Three rasters (brand board, product dashboard, email signature), no captions |
| 62 | 62 Thank You | `17:119` | back | divider | 15 | 1 | 2 | "Version 2.0 (draft)" | Purple closer with Logo White, tagline, version, document code |

Totals: 62 frames; 13 dividers (incl. cover/closer); about 5,600 words of copy (sum of the Words column: 5,593); 39 image fills from 9 distinct rasters (2 dot textures, 7 photos/mockups, several reused: product dashboard on 40/53/61, brand board on 40/61, email signature on 51/61, merch on 54/60); 58 logo instances from 11 components; 0 components on the page; 0 auto-layout frames out of 198 frame nodes; 4 hidden nodes (the page numbers on 29–32).

## 2. Depth judgement per section

Legend used below and in section 5: **none** = not in the file; **mention** = a sentence says it; **example** = one instance shown, no rule that generalises; **system** = rule + the cases it covers, enough to reproduce without asking.

### 01 Brand — frames 03–11 (`6:33`, `6:39`, `6:45`, `7:2`, `7:8`, `7:19`, `7:42`, `7:57`, `7:72`)
- What is there: essence statement (04), mission/vision (05), positioning headline + body (06), positioning statement with "what we enable / how we fit" (07), is/isn't keyword table (08), five values (09), promise vs tagline with a usage rule (10), a one-page overview grid (11). All on navy with the dot texture; 50–112 words a page.
- System vs example: the strategy layer is genuinely written, not placeholdered — story, positioning, values and promise/tagline are all stated and the tagline/promise rule on 10 is a usable rule. Audiences are a **mention**: 11 names "Primary buyer: VP of Enrollment Management" and an expansion path, 14 lists six audiences for tone, but there is no audience page (who they are, what they need, how the brand meets each). Personality is carried by 13 "How We Sound" (Voice) rather than a brand-personality page; there is no archetype/traits page in 01.
- Open/proposed: nothing flagged.
- Thin vs dense: 05 (50 words, two sentences) and 06 (headline + one paragraph) are the thinnest; 11 is the densest and duplicates 04–10 on purpose as a summary. No frame here is "a title and one picture" — there are no pictures in this section at all.

### 02 Voice — frames 12–18 (`9:2`, `9:8`, `9:22`, `9:38`, `9:46`, `46:1407`, `46:1422`)
- What is there: thesis on the divider (12), five attribute words with qualifiers (13), six-audience tone table (14), use/avoid vocabulary (15), eight writing rules with examples (16), nine before/after rewrites (17), six product-copy rules (18). 1,000+ words; the most complete section in the deck.
- System vs example: tone per audience (14) and the product-copy rules (18: who speaks, one name per thing, no promises of contact, punctuation/spelling, dates/times, buttons/labels) are **system** — each rule comes with its counter-example. 17 is the evidence base (examples in service of the rules). Language (15) is a list, which is a system for vocabulary but does not say why.
- Open/proposed: none. Note 17 deliberately contains em dashes in the "Before" column (`46:1407` Before 2, Before 6) to show the old copy; 18 states the house rule "No em dashes" and "and, not &, outside a proper name".
- Thin vs dense: 13 (36 words) is a typographic page; the rest are dense text tables on navy (17 and 18 are 200–250 words at 17px on a dark field — heavy but legible at 1920).
- Mismatch: 15's "What we avoid" heading uses `#ff7a86`, a hue that is not in the palette pages (29–32 have Error `#d92d20`).

### 03 Logo — frames 19–27 (`10:2`, `22:70`, `22:153`, `22:299`, `22:362`, `22:436`, `11:27`, `11:43`, `11:59`)
- What is there: family of three forms (20), construction grids for the primary lockup (21) and the symbol (22) with unit dimensions and the SVG viewBox they were measured from, clear space x = symbol height (23), minimum sizes for three forms (24), four colour variants (25), four background fields (26), six usage errors (27). All logos are instances of the 11 components on `0:1`.
- System vs example: construction (21/22), clear space (23), colour variants (25) and misuse (27) are **system**. Min size (24) is a system marked as a proposal. Lockups: only horizontal — the divider copy on 19 says "the primary horizontal lockup, the secondary vertical lockup, and the symbol", but no vertical/stacked lockup exists on any frame or on the Assets page (11 components, all horizontal). Versions x backgrounds is an **example** (26 shows one logo per field, four fields; no matrix of which master goes on which colour/photo, no "on photography" example although the text mentions it). Placement: **mention** inside applications only (47–50 say "upper left within the margin"). Partner/co-branding lockup: **none** — nothing on how Audentra sits next to a client university's mark, although the product (Aster) does exactly that.
- Terminology: the masters are Color / Reverse (white wordmark + colour symbol) / White (1c) / Navy (1c); 26 and 52 say "the reverse (white) logo" as if Reverse and White were one thing, and 47 calls the Reverse master "the reverse primary logo". Worth one sentence of definition on 25.
- Open/proposed: 24 caveat "Minimums are proposals pending a print test of the tagline at 2 in." (`22:436`).
- Thin vs dense: 23 and 24 are one-diagram pages (fine); 21 and 22 are the densest and best pages in the deck.

### 04 Color — frames 28–32 (`12:2`, `12:8`, `12:32`, `12:58`, `12:100`)
- What is there: four primaries with meaning lines and HEX/RGB/CMYK/Pantone (29), seven neutrals with roles (30), a 700/500/300/100 grid for Purple, Blue, Teal with hex only (31), six functional state colours with full specs (32). The 2026-08-21 decisions are in: Audentra Teal `#02CDC7`, Teal 700 `#04B2A9`, Teal 300 `#67E1DD`, Teal 100 `#B3F0EE` (31, `12:58`), and 20's note repeats them as the master-artwork fills.
- System vs example: the specs table is a **system** for the core and neutral swatches; tints are hex-only (no RGB/CMYK). Roles: **mention** — one sentence per swatch (29 meanings, 30 "Cloud and Mist are surfaces. Slate and Graphite are secondary text…", 31 "full-strength for brand moments, tints for backgrounds, charts, states", 32 "Prefer semantic color for state over overusing purple"). Proportions: **none** (no ratio bar). Combinations/contrast: **none** — the divider (28) promises "guidance on contrast and backgrounds" and nothing delivers it; no text-on-field pairs, no contrast ratios. Gradients: **none** as a rule, although the gallery rasters (60, 61) show a purple→teal gradient card and a gradient strip. Dark surfaces: **example** — the deck itself runs Deep Navy pages and 30 says Navy and White are "the two canvases", but no dark-surface rules. Data viz: **mention** ("charts" in 31).
- Open/proposed: every primary Pantone is "(proposed)" on 29 (`12:8`: 2097 C, 2728 C, 3252 C, 282 C); the same caveat sentence sits on 29, 30, 31, 32; neutral Pantones on 30 are not tagged proposed though the caveat covers them; Teal 700 "Pantone 3262 C" on 31 has no tag while the cores do; the functional Pantones on 32 carry no tag.
- Build note: none of these values is a Figma variable or style — `boundFills` is 0 everywhere; the hexes live only as typed text and as raw fills. The page numbers on all four frames are hidden (`12:10`, `12:34`, `12:61`, `12:102`).
- Thin vs dense: all four are dense swatch boards; 31 is 12 tiles with 13-px specs.

### 05 Typography — frames 33–38 (`13:2`, `13:8`, `13:21`, `13:43`, `13:64`, `13:88`)
- What is there: family page (34), Satoshi specimen (35), Inter specimen (36), six-level hierarchy with web px / print pt ranges (37), six don'ts (38).
- System vs example: typefaces + rationale: **system-lite** (34–36 say what each face is for; weights shown). Hierarchy: **example** — ranges only; weights are stated once in prose on 37 ("Display, H1 and H2 in Satoshi Bold. Subheadings Satoshi Medium. Body and captions Inter Regular. Line height ≈ 1.25 / 1.5"); no letter-spacing, no per-level weight/leading table, and no Figma text styles (0 local text styles). Pairing: **mention**. Web fallbacks: **mention** ("fall back to Inter, then Arial", 34). Numerals: **none**. Product vs marketing: **mention** (34/36 put Inter on UI, 53 says product names in Satoshi Medium). Misuse: **system** (38).
- The elephant: Satoshi is installed nowhere. `font/heading` = "Inter"; every "Satoshi" specimen, the "Aa" tile and every title in the deck render in Inter. 34 and 35 carry notes saying so. `listAvailableFontsAsync` does not return Satoshi. 38 tile 1 uses Space Mono as the wrong-font example (the only intentional unbound text).
- Thin vs dense: 34 is two tiles and three sentences; 35/36 are specimen sheets; 37 is the only table; 38 is six tiles.

### 06 Imagery — frames 39–42 (`14:2`, `14:8`, `14:36`, `14:65`)
- What is there: four territories (40), three composition principles (41), six don'ts (42).
- System vs example: photography direction: **mention** (territories named, "calm and controlled"), with 5 of 7 image tiles empty "Photography to be selected" and the two filled tiles being a product screenshot and a brand-board collage, not photography. Treatment (colour grade, crop, duotone, overlay): **none** beyond "no heavy filters". Illustration: **none**. Texture/pattern: **none** as a rule, although the dot texture is used on 14+14 frames (two rasters `dots_fade_right`, `dots_uniform`) and on the social banners — it is the most-used visual device in the deck and is never named or specified. Dos/don'ts: don'ts only (42), text-only tiles with no example images; no "do".
- Open/proposed: 40 x2 and 41 x3 placeholders, plus 41's footer "Placeholders. Replace with selected photography…" (`14:36`).
- Thin vs dense: 41 is title + three grey boxes (thin); 40 is half-empty; 42 is text tiles.

### 07 Iconography — frames 43–45 (`14:105`, `14:111`, `14:257`)
- What is there: a 48-icon grid with a one-paragraph spec ("24 × 24 grid, 1.9 px stroke, rounded caps and joins, drawn in the current text color") (44), four usage errors (45).
- System vs example: set: **example** — the 48 tiles are unnamed vectors (every tile is named "icon"), no source library is named, no list of approved icons, no sizes. Weights: **none** (one stroke only). Construction: **none** (no keyline page). Usage: **example** (45).
- Mismatch with the product: the repo's design system vendors **Phosphor** in four weights with a weight-per-role policy (ADR 0004); the deck's grid is a Lucide-style 2-px line set with a 1.9-px stroke and says nothing about Phosphor, duotone tiles or fill-as-on-state. The two documents describe different icon systems.
- Thin vs dense: 44 is one paragraph and a grid; 45 is four tiles.

### 08 Applications — frames 46–54 (`15:2`, `15:8`, `15:35`, `15:71`, `15:97`, `16:2`, `16:22`, `16:40`, `16:56`)
- What is there: business card front/back with bleed/trim/safe (47, 48), letterhead with margins and a sample letter (49), #10 envelope (50), three email signatures (51), LinkedIn/Facebook banners + profile tiles (52), product screenshots + three product-name chips + one rule (53), a merch collage + approved placements (54).
- System vs example: stationery is a **system** (dimensions, logo sizes, type sizes in pt; 48 "Name: Satoshi Medium 12 pt, Designation 9 pt Purple, contact 7–8 pt Inter"). Email: **system-lite** (three variants with font sizes; variant 2 is a raster `photo_email_signature`, not editable). Social: **example+** (canvas sizes given, two banners and two avatars, no grid/safe zones, no post templates). Product UI: **mention** — 53 states the bridge rules ("semantic color for state, purple reserved for brand moments and primary actions", "Audentra never speaks in student-facing copy") but the two rasters are screenshots of a product whose sidebar wordmark reads "Edgent" with the greeting "Hi Ajlan" (`16:40` "Product UI reference 1/2", also used on 40 and 61), not the Aster portal this repo builds; no app-icon, favicon, nav-placement or empty-state spec although 20/22/52 promise app icon and favicon. Slides: **none**. Signage: **none**. Merch: **example** (one AI-looking collage, 54) plus a list of approved items. Video: **none**.
- Open/proposed: nothing flagged in text; 47/48 bleed marks use `#e5484d` (off-palette, drawn as spec ink).
- Thin vs dense: 54 is title + one raster (thin); 52 and 53 are mockups with 80–90 words; 47–50 are dense spec sheets.

### 09 Asset Library — frames 55–58 (`16:62`, `22:533`, `17:37`, `22:565`)
- What is there: asset file-name grammar with legend and six examples (56), document code grammar with type-key legend and best practices (57), a 46-file directory + supporting materials (58).
- System vs example: naming: **system** (56, 57). Versioning: **system** for documents (`-v#` on 57), explicit "never in asset file names" (56). Files: **system-lite** (58 lists names and formats; "Masters: logo-full.svg · logo.svg · symbol.svg" matches `docs/brand/` in this repo and the Assets section title). Where to get: **mention** at best — no URL, drive, DAM, Figma link or owner; the Assets page title is the only locator ("docs/brand: logo-full.svg · logo.svg · symbol.svg").
- Internal inconsistency: the cover and closer carry `G-142-001-2608-BrandIdentityGuidelines` without the `-v#` the pattern on 57 requires (its own example is `…-BrandIdentityGuidelines-v2`), while the cover says "Version 2.0 (draft)".
- Thin vs dense: all three are dense tables; 57 is the most designed page in the section.

### 10 Gallery — frames 59–62 (`17:104`, `17:109`, `17:114`, `17:119`)
- What is there: a divider with no description (the only one), two frames of three rasters each, a closer.
- System vs example: gallery only. The rasters are AI-looking mockups from the Assets page and contain off-brand artefacts: "AUDENTRA." with a full stop, an older tagline "Intelligent solutions. Measurable impact.", "Alex Morgan, Chief Executive Officer", a symbol drawn with different geometry, a gradient business card (60, `17:109`); a brand-board image stating "Clear space = height of the 'A' from the icon" and "ON DARK BACKGROUND", and the "Edgent" dashboard (61, `17:114`). No captions, no "what to notice".
- TOC lists the section as "60 Selected applications" and does not list 61.
- Thin vs dense: gallery by design; 59 is thinner than every other divider.

## 3. Cross-cutting

### Variables and binding
- One collection, **Typography** (`VariableCollectionId:28:1407`), one mode, three STRING variables scoped `FONT_FAMILY`: `font/heading` = Inter (description: "Set to Satoshi once the font is installed"), `font/body` = Inter, `font/mono` = Roboto Mono. No colour, spacing, radius or size variables. No local paint, text or effect styles.
- Text: every TEXT node on the page is bound to a `font/*` variable except 4: three dimension labels on 24 Minimum Size (`22:436`, the "Print: … / Web: …" texts) and the Space Mono tile on 38 (intentional). The font binding is essentially complete, which is why the "install Satoshi, flip one variable" note on 34 is true.
- Colour: zero fills bound to variables on all 62 frames. Every colour is a raw hex on a rectangle or a text fill. The palette pages document the values but nothing in the file references them. The deck's own chrome uses `#9e7eff` (Purple 300) for titles on navy pages and `#6a38ff` on light pages.
- Off-palette hexes in use: `#ff7a86` (15, "What we avoid" head), `#e5484d` (47/48 bleed marks), `#f97316` (27 wrong background, deliberate), `#000000` (27 black 1c tile, 38/42 slashes). Red slash strokes on 27/38/42 are strokes, not fills, and were not captured.
- Product cross-check: `src/styles/tokens.css` in this repo contains none of the deck's hexes. Its purple ramp is `#312960` to `#6854d9` (`--purple-400 #6854d9` is the product primary), its teal is `#1a6984`, and its fonts are Geist Sans / Geist Mono. The deck's Inter/Satoshi + `#6a38ff` palette and the product's Geist + `#6854d9` palette are two systems with no bridge page and no shared token names.

### Components vs raw groups
- Components: 11, all logos, all on the Assets page `0:1` in section `25:1407`; 58 instances across the deck; no instance is detached. Nothing else is a component: the 62 page titles, 62 page numbers, the left text column, swatch cards, don't-tiles, dimension labels, the dot-texture rectangle and the section-divider layout are redrawn per frame. 0 auto-layout frames in 198 frame nodes; everything is absolutely positioned.
- Rasters: 10 frames on `0:1` hold PNGs (2 dot textures + 8 photos/mockups); 9 distinct image hashes are used on the guidelines page. The dot texture is the only "pattern" and is undocumented.

### Naming consistency
- All 62 frames follow `NN Title`; numbers are contiguous 01–62 and match the canvas order and the in-frame page numbers (except 29–32 whose page numbers are hidden). Colon subtitles on 21, 22, 35, 36, 47, 48 only; 31, 54 and 57 use the in-frame Subtitle as a line break instead ("Secondary Colors / and Tints", "Merchandise / and Physical Applications", "Document and Operational / System").
- Node ids show two authoring passes: `22:*` (frames 20–24, 56, 58) and `46:*` (17, 18) were added after the `6:` to `17:` run; frame numbers were renumbered consistently.
- In-frame titles collide: 27 and 45 are both titled "Usage Errors"; 38 and 42 are both "Don'ts" (frame names disambiguate, TOC does not for 38/42).
- Component names use an em dash: `Logo / Primary (Full) — Color` (11 names) and the cover instance "Logo — white". Prose em dashes: only 17's Before column (intentional) and "Pantone — (paper)" on 30. Ampersand: "Co-Founder & CXO" on 48, 49, 51 (a job title; the house rule on 18 allows `&` only inside a proper name, so this needs a ruling). Titles: no `&`, no em dash.

### TOC vs frames
- TOC (`6:14` to `6:32`) page numbers all match the frames. Wording differs from frame names in seven places: "21 Structure: Primary Logo" vs frame "Logo Structure: Primary Logo"; "22 Structure: The Symbol"; "35 Primary Typeface" (frame adds ": Satoshi"); "36 System Typeface" (": Inter"); "38 Don'ts" / "42 Don'ts" (frames say Typography/Imagery Don'ts); "45 Usage Errors" (frame "Icon Usage Errors"); "60 Selected applications" vs frames "Gallery I" + "Gallery II", and 61 is missing from the TOC. Dividers and 62 are correctly absent.
- Divider promises not kept: 19 "secondary vertical lockup" (none exists); 28 "guidance on contrast and backgrounds" (no contrast page). 14 cites "pages 16 to 18" and 53 cites "page 18": both resolve.

## 4. Open caveats, consolidated

| # | Frame | Node | Item |
| --- | --- | --- | --- |
| 1 | 01, 62 | `6:7`, `17:119` | "Version 2.0 (draft)" — the document declares itself a draft |
| 2 | 01, 62 | `6:8` | Document code `G-142-001-2608-BrandIdentityGuidelines` has no `-v#` suffix; 57 requires one |
| 3 | 24 | `22:436` | "Minimums are proposals pending a print test of the tagline at 2 in." — all three minimum sizes provisional |
| 4 | 29 | `12:8` | Pantone 2097 C / 2728 C / 3252 C / 282 C each "(proposed)"; caveat: "Pantone references are proposed digital matches and CMYK values are screen conversions. Confirm both against a physical swatch book and a press proof before print." |
| 5 | 30, 31, 32 | `12:32`, `12:58`, `12:100` | Same caveat repeated; neutral, tint-700 (3262 C) and functional Pantones untagged but covered by it |
| 6 | 29–32 | `12:10`, `12:34`, `12:61`, `12:102` | Page numbers hidden (visible = false) — pagination gap in export |
| 7 | 34, 35 | `13:8`, `13:21` | Satoshi not installed; `font/heading` = "Inter"; specimens and every title render in Inter |
| 8 | 40 | `14:8` | 2 of 4 moodboard tiles "Photography to be selected"; the 2 filled tiles are not photography |
| 9 | 41 | `14:36` | 3 of 3 composition tiles placeholders; footer "Placeholders. Replace with selected photography that follows these three principles." |
| 10 | 19 | `10:2` | Divider promises a "secondary vertical lockup" that exists nowhere (no frame, no component) |
| 11 | 28 | `12:2` | Divider promises "guidance on contrast and backgrounds"; no such page |
| 12 | 53, 40, 61 | `16:40`, `14:8`, `17:114` | Product rasters show a product branded "Edgent" with "Hi Ajlan" — not Audentra/Aster UI |
| 13 | 60, 61 | `17:109`, `17:114` | Gallery rasters carry off-brand artefacts: "AUDENTRA." with a period, tagline "Intelligent solutions. Measurable impact.", "Alex Morgan, CEO", a differently drawn symbol, a gradient card, "Clear space = height of the 'A' from the icon" |
| 14 | 51 | `16:2` | Email signature variant 2 is a raster (with photo avatar and disclaimer), not an editable spec |
| 15 | 44 | `14:111` | 48 icon tiles all named "icon"; source set unnamed; spec (1.9 px Lucide-style) contradicts the product's vendored Phosphor |
| 16 | 26, 52 vs 25 | `11:43`, `16:22`, `11:27` | "reverse (white) logo" conflates the Reverse and White masters |
| 17 | 48, 49, 51 | `15:35`, `15:71`, `16:2` | "Co-Founder & CXO" uses `&`; 18 allows it only inside a proper name |
| 18 | 15 | `9:38` | `#ff7a86` heading colour is not in the palette |
| 19 | 24 | `22:436` | Three labels unbound from `font/body` |
| 20 | whole file | — | No colour variables/styles; no auto layout; no shared page chrome component |

## 5. Gaps against the taxonomy

Scale: none / mention / example / system (defined in section 2). Frame numbers cite where the evidence is.

| Id | Topic | Level | Evidence |
| --- | --- | --- | --- |
| 01-story | Brand story | system | 04, 05, 06 (`6:39`, `6:45`, `7:2`) |
| 01-positioning | Positioning | system | 06, 07, 08, 11 |
| 01-personality | Personality | mention | only via Voice 13 (`9:8`); no traits/archetype page |
| 01-principles | Principles | system | 09 values (`7:42`) + 10 promise/tagline rule (`7:57`) |
| 01-audiences | Audiences | mention | 11 market cell, 14 six audiences; no audience page |
| 02-tone | Tone | system | 13, 14 |
| 02-language | Language | system | 15 (lists) |
| 02-writing-rules | Writing rules | system | 16 + 17 evidence |
| 02-product-copy | Product copy | system | 18 |
| 03-construction | Construction grid | system | 21, 22 |
| 03-clear-space | Clear space | system | 23 |
| 03-min-size | Min size | system (proposed) | 24 |
| 03-lockups | Lockups h/v/symbol | example | 20: horizontal + symbol only; vertical promised on 19, absent |
| 03-versions-bg | Versions × backgrounds matrix | example | 25, 26 (one logo per field; no matrix, no photo case) |
| 03-misuse | Misuse | system | 27 |
| 03-placement | Placement | mention | inside 47–50 only |
| 03-cobranding | Partner / co-branding lockups | none | — |
| 04-palette | Palette | system | 29, 30, 31 |
| 04-roles | Roles | mention | one line per swatch on 29–32 |
| 04-proportions | Proportions | none | — |
| 04-contrast | Combinations / contrast | none | promised on 28 |
| 04-specs | Specs table (Pantone/CMYK/RGB/HEX) | system (Pantone proposed) | 29, 30, 32; 31 hex only |
| 04-gradients | Gradients | none | only inside gallery rasters 60/61 |
| 04-dark | Dark surfaces | example | deck's own navy pages; 30 "two canvases" |
| 04-dataviz | Data viz | mention | "charts" on 31 |
| 05-typefaces | Typefaces | system | 34, 35, 36 (rendered in Inter) |
| 05-rationale | Rationale | mention | 34–36 one sentence each |
| 05-hierarchy | Hierarchy scale | example | 37 ranges; no per-level weight/leading table; no text styles |
| 05-pairing | Pairing | mention | 34 |
| 05-fallbacks | Web fallbacks | mention | 34 "Inter, then Arial" |
| 05-numerals | Numerals | none | — |
| 05-product-vs-marketing | Product vs marketing | mention | 34, 36, 53 |
| 05-misuse | Misuse | system | 38 |
| 06-photo | Photography direction | mention | 40 territories; 5/7 tiles placeholder |
| 06-treatment | Treatment | none | — |
| 06-illustration | Illustration | none | — |
| 06-texture | Texture / pattern | example | dot texture on 28 frames, never specified |
| 06-dos-donts | Dos / don'ts | example | 42 don'ts only, text-only |
| 07-set | Icon set | example | 44 grid, unnamed, no source |
| 07-weights | Weights | none | — (product uses 4 Phosphor weights) |
| 07-construction | Construction | none | — |
| 07-usage | Usage | example | 45 |
| 08-product-ui | Product UI | mention | 53 rules; rasters are "Edgent" |
| 08-email | Email | system-lite | 51 (variant 2 raster) |
| 08-slides | Slides | none | — |
| 08-social | Social | example | 52 sizes + 2 banners |
| 08-stationery | Stationery | system | 47–50 |
| 08-signage | Signage | none | — |
| 08-merch | Merch | example | 54 |
| 08-video | Video | none | — |
| 09-files | Files | system-lite | 58 |
| 09-naming | Naming | system | 56, 57 |
| 09-versioning | Versioning | system | 57 |
| 09-where | Where to get | mention | Assets page title only |
| 10-gallery | Gallery | example | 60, 61, off-brand rasters |
| 11-motion | Motion | none | — |
| 12-layout-grid | Layout and grid | none | deck uses a consistent 128-px margin but never states it |
| 13-cobranding | Co-branding / partner (Audentra × client university) | none | — (the product's AsterMark + AudentraMark pairing is undocumented here) |
| 14-accessibility | Accessibility | none | no contrast ratios, no a11y page |
| 15-dataviz | Data visualization | mention | 31 |
| 16-governance-legal | Governance and legal | mention | 57 best practices, dept registry; no trademark, approvals, contact |
| 17-brand-product-bridge | Brand → product bridge | mention | 53 prose; no link to the Design System Figma file or `tokens.css`; palette and font diverge from the product's (Geist, `#6854d9`) |

## 6. What this adds up to

1. The file is a complete 62-frame deck with real copy on every page (about 5,600 words), not a shell: Brand (01), Voice (02), Logo construction (03), the colour specs (04), naming/doc systems (09) and stationery (08) are written to system level and can be used as-is.
2. It is a *print-deck* brand book, not a product brand system: no colour variables, no text styles, no auto layout, no shared page component; the only components are the 11 logos. Everything that looks like a system on the page is typed text and raw hex.
3. Satoshi is the declared primary face and is installed nowhere; every title and specimen is Inter via `font/heading` = "Inter". One variable flip fixes the deck once the font exists (binding coverage is 100% minus 4 texts).
4. The deck and the product disagree: product tokens are Geist + `#6854d9` purple + `#1a6984` teal; the deck is Satoshi/Inter + `#6a38ff` + `#02cdc7`; the deck's icons are a Lucide-style 1.9-px line set, the product vendors Phosphor in four weights. There is no bridge page, no token mapping, no link to the Design System file.
5. Imagery is the emptiest section: 5 of 7 photo tiles are placeholders, the two filled ones are a product screenshot and a collage, and the dot texture that appears on 28 frames is never specified.
6. The gallery and product pages use AI-looking rasters that carry off-brand artefacts ("AUDENTRA." with a period, an older tagline, a differently drawn A, and a product UI branded "Edgent").
7. Two dividers promise content that does not exist: a vertical lockup (19) and contrast guidance (28). Co-branding with a client university, accessibility, motion, layout grid, data viz, slides, signage, video and legal/governance are absent.
8. Proposals still open: all primary Pantones (29), the print minimum sizes (24), the photography (40, 41); the document calls itself "Version 2.0 (draft)" and its own code breaks the `-v#` rule it sets on 57.
9. Small hygiene: page numbers hidden on 29–32; TOC wording differs from seven frame names and omits 61; "Co-Founder & CXO" vs the no-`&` rule; `#ff7a86` and `#e5484d` off-palette; 27 and 45 share the title "Usage Errors".
10. Best pages to keep as the bar for the rest: 21, 22 (construction), 17, 18 (voice), 57 (document system), 47, 48 (stationery specs).

Screenshots reviewed (31 of 62): 01, 02, 03, 11, 17, 20, 21, 23, 24, 26, 27, 29, 31, 34, 35, 37, 38, 40, 41, 44, 45, 47, 49, 51, 52, 53, 54, 57, 58, 60, 61. The rest were judged from the text/fill/instance dump plus the child-type counts in `get_metadata`.
