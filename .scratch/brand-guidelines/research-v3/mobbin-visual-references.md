# Mobbin visual references — Audentra brand book (59 pages, 1920×1080)

Research date: 2026-08-22. Tools: `mcp__mobbin__search_screens`, `mcp__mobbin__search_sections`.

Brand constraints this research serves: Purple `#6A38FF`, Royal Blue `#1E5BFF`, Teal `#02CDC7`,
Deep Navy `#0A1F44`; Purple→Blue→Teal diagonal gradient on screen surfaces only; Satoshi Bold for
display, Inter for text.

**How to read the composition notes.** Pixel figures are measured off the Mobbin capture (mostly a
1440-wide viewport rendered into a ~768px image), so treat them as *ratios and relationships*, not
as values to copy. What is load-bearing is where things sit relative to each other, what is inside
a container versus outside it, and which element the eye reaches first.

A note on where the good material lives: for a brand book, **`search_sections` (marketing/brand
sites) beat `search_screens` (product UI) roughly four to one.** Brand-guideline microsites — Mural,
Discord, Linear, Aave, Melius, Runway, ClickUp, Craft, Daylight, Orchid, Glide — are already static
documentation pages, which is exactly the translation problem we have. Product panels (Gamma,
Webflow, Sketch, Teachable) are interaction-shaped and mostly do not survive the jump.

---

## 1. Color palette / swatch presentation

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Mural — "Color palette" | section `617cde5a-9515-4ce1-b1f2-5e78811b29ef` | https://mobbin.com/sites/sections/617cde5a-9515-4ce1-b1f2-5e78811b29ef |
| Discord — "COLORS" | section `76199585-720a-4513-b0cf-37309cf479b4` | https://mobbin.com/sites/sections/76199585-720a-4513-b0cf-37309cf479b4 |
| Aave — "Colors" | section `b0eff2c6-7a55-490f-9794-91c9f8881f94` | https://mobbin.com/sites/sections/b0eff2c6-7a55-490f-9794-91c9f8881f94 |
| Linear — "Colors" | section `f0c7f39b-7818-4461-a3f7-ab32ee183c67` | https://mobbin.com/sites/sections/f0c7f39b-7818-4461-a3f7-ab32ee183c67 |
| Glide — "Colours" | section `6f697904-0d8a-498d-9252-8d8bc401db9a` | https://mobbin.com/sites/sections/6f697904-0d8a-498d-9252-8d8bc401db9a |
| Mailchimp — "Our colors" | section `c8d952df-f1ff-456c-b797-d9838627301e` | https://mobbin.com/sites/sections/c8d952df-f1ff-456c-b797-d9838627301e |
| Framer — "Colors" | section `822d4a02-7bc6-475f-90ff-d02bc887c2ee` | https://mobbin.com/sites/sections/822d4a02-7bc6-475f-90ff-d02bc887c2ee |
| Webflow — Variables panel | screen `67215f9e-74b8-49ca-9ddc-8ded3d65065c` | https://mobbin.com/screens/67215f9e-74b8-49ca-9ddc-8ded3d65065c |
| Arcade — Brand Kit / Colors | screen `06627ceb-2848-4b40-a621-f79c0c805458` | https://mobbin.com/screens/06627ceb-2848-4b40-a621-f79c0c805458 |
| Teachable — Color Palette | screen `97e28ba0-04ae-4b69-8691-a2472f0a0858` | https://mobbin.com/screens/97e28ba0-04ae-4b69-8691-a2472f0a0858 |
| Sketch — Color Variables | screen `48e4a194-3756-47ca-a3ab-23be987dde03` | https://mobbin.com/screens/48e4a194-3756-47ca-a3ab-23be987dde03 |

### Composition notes

**Mural — the strongest single reference for a book page.** The whole block sits on a full-bleed
lavender band (a tint, not white), heading "Color palette" flush-left at ~28px in a light serif.
Below it a 4-up × 2-row grid of **white cards**. Each card: the top ~55% is the colour, filling the
card edge to edge with no inset and square top corners; the bottom ~45% is white and holds the
colour's proper name ("Mural Red") at ~15px, then a hairline rule spanning the text block's width,
then a value line where the word **"Hex"** is bold at ~10px and `#FF4B4B` follows in regular. The
label never sits on the colour. Two things make it work: (a) the colour block and its label are the
same width, so the card reads as one object; (b) **White and Natural still get a full card** — a
near-invisible block on a lavender ground — which is what makes eight items read as one set rather
than six colours plus two afterthoughts.

**Discord — the one that carries print values.** Dark charcoal ground, heading "COLORS" in a heavy
uppercase display face at ~24px. 3-up grid, 7 items, so the last row holds one card and is left
ragged (deliberately, not centred). Each card **is** the colour, ~200×120, radius ~8px, with a 1px
lighter stroke so that `#000000` and `#FFFFFF` still have an edge. All labelling is **inside** the
swatch: name bold at top-left, ~60px of empty colour, then two value lines bottom-left — `#5865F2`
over `CMYK 56, 43, 0, 0`. Text colour flips per swatch (white on Blurple, black on Green/Yellow/
White). The CMYK second line is the detail to steal for a print-facing book.

**Aave — a chromatic index, not a spec.** Left ~30% is heading + a two-line rationale; right ~70% is
a 4×2 grid of **ramp pills**: each cell is one rounded pill ~150×36 split into three flush segments
(base / mid / light) with no gutters between segments and **no values or names at all**. Eight
families. Use where you want the reader to see the range of the system, with the numbers elsewhere.

**Linear — prose does half the work.** Heading, then a three-line paragraph across ~60% width
explaining *why* the brand colour is a desaturated blue. Only three swatches follow, as large
rounded squares ~130×160, with the value centred inside on two lines: `#5E6AD2` over
`RGB 94, 106, 210`. Three colours and a paragraph, in a band that many brands would fill with
twenty chips.

**Glide — the compact one-row form.** Heading, a 10px caption ("Click to copy hex value"), then a
single row of six rounded rectangles ~88×48, each with the name at ~11px bold and the hex at ~11px
regular stacked **below** the swatch and flush to its left edge. No card, no border, no rule. Good
for a footer strip or a "full palette at a glance" band under a larger page.

**Mailchimp — extreme restraint.** Serif heading "Our colors" plus one sentence naming which colour
is hero and which is accent. Then exactly two ~110px **circles** with the hex set *inside*, centred,
at ~11px. Nothing else on the band.

**Framer — dark, value-inside, paired with the app icon.** Black ground, 2×2 of large rounded
rectangles ~180×130 with the hex centred inside at ~9px. Sits directly beneath an "App icon" block
framed identically (same card size, same ground), so icon and palette read as one chapter.

**Webflow Variables (product) — the exhaustive token table.** Two columns, Name / Value, ~28px rows,
hairline separators, dark. Each value cell is a 12px rounded chip followed by the hex at the same
size as the name. This is the shape for an appendix of 100+ tokens — see the caveat in the transfer
section.

**Arcade Brand Kit (product) — label twice.** 6-up grid; the role name appears *inside* the swatch
top-left (rendered in the swatch's own contrast) **and** again below the swatch alongside the hex.
Trailing "+" cell with a dashed outline closes the grid.

**Teachable (product) — colour bound to a named slot.** Not a palette: a 3-column grid of labelled
fields, each a bold label ("Nav Bar & Footer Background") + an 11px gray sub-label ("Fixed,
scrolling & email") + an input whose left cap is a 40px flush square of the colour and whose body is
the typed hex at 14px. Useful when you must show *where* a colour is used, not just what it is.

**Sketch (product) — circle in a tile.** ~185×100 light-gray tiles, each with a ~70px circle of the
colour centred; caption below the tile: name at 13px, then `#E6E6E6 — 100%` at 12px gray — opacity
appended after an em dash. Selected tile takes a 1px orange border.

---

## 2. Specification tables and value lists

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Jitter — "Compare plans" | section `a806cdf4-5740-4482-bf72-67207f2ce003` | https://mobbin.com/sites/sections/a806cdf4-5740-4482-bf72-67207f2ce003 |
| Windsurf — "Compare plans" | section `07f73b83-f374-4b0a-ab48-cec6a15ec40c` | https://mobbin.com/sites/sections/07f73b83-f374-4b0a-ab48-cec6a15ec40c |
| Canva — "Compare features" | section `48d69c5b-d0bc-4d1b-8431-f968a0b6dffc` | https://mobbin.com/sites/sections/48d69c5b-d0bc-4d1b-8431-f968a0b6dffc |
| Mixpanel — plan table | section `2da2c343-644b-4bc3-9c8a-5a46a7303de5` | https://mobbin.com/sites/sections/2da2c343-644b-4bc3-9c8a-5a46a7303de5 |
| Relume — "Compare plan features" | section `3ab2eae1-3a53-4222-aee4-c892c47224e8` | https://mobbin.com/sites/sections/3ab2eae1-3a53-4222-aee4-c892c47224e8 |
| Vercel — "Scale" | section `fc6a6b19-eaf8-4987-b46c-b5552937f2b7` | https://mobbin.com/sites/sections/fc6a6b19-eaf8-4987-b46c-b5552937f2b7 |
| Craft — "Compare Plans & Features" | section `cf4ba7be-d5c1-4cac-9032-75a24cd38c05` | https://mobbin.com/sites/sections/cf4ba7be-d5c1-4cac-9032-75a24cd38c05 |
| Twenty — Companies table | screen `f8bd66b5-e935-465b-93d6-cf2f74b3c078` | https://mobbin.com/screens/f8bd66b5-e935-465b-93d6-cf2f74b3c078 |
| Attio — Companies table | screen `b1f51bfb-4b7f-4d77-a7ce-9a1568db223e` | https://mobbin.com/screens/b1f51bfb-4b7f-4d77-a7ce-9a1568db223e |

### Composition notes

**Jitter — the most book-like table on Mobbin.** Centred title at ~48px, two-line subhead at ~13px,
then the table with **no fills, no zebra and no vertical rules**. The left column's header is the
word "Features" set at ~28px bold — dramatically larger than the plan names at ~14px above the other
columns — which establishes the reading order (label column first, then across). Each row is a label
and three checks, separated by a 1px rule that **stops at each column's gutter**, so the eye sees
four short underlines per row rather than one continuous line. The checkmark is **tinted per column**
(black / teal / purple), which is the only device keeping the columns apart. Absence is shown by
leaving the cell blank. This is the reference for the "no chrome" spec page.

**Windsurf — grouped, five columns, hardest-working legend.** Header row: plan name bold, price
beneath in gray on a second line. Body is grouped by a **full-width tinted band** carrying the group
name ("Cascade", "Features"), then rows alternate white / near-white. Cells are one of three things:
a filled green ✓, a filled orange ✗, or a short string; a string that needs a caveat gets a second
line at ~8px gray directly under it ("+$10/user/mo (under team management)"). Where a plan collapses
into a single answer, the cell **merges vertically** across several rows ("Let's talk"). The green/
orange pair does all the scanning work — you can read the shape of the table without reading a word.

**Canva — column headers as floating cards.** Each plan header (name, crown badge, CTA button) sits
in its own tinted rounded block *above* the table, and the paid columns' tint continues faintly down
the table body as a column highlight, so the header cards and their columns are visually welded.
Group heads are collapsible rows with a chevron flush right. Row labels carry a trailing (i) dot.

**Mixpanel — the extreme-density proof.** ~30 rows in one screenful: row height ~19px, values at
~9px gray, circled ✓/✗ glyphs at ~13px, zebra at maybe 2% opacity. Group heads ("Usage", "Analytics")
are bold, flush left, with a full empty row of air above them. Proof that zebra plus a tiny glyph
still parses at very small row heights — but see §Transfer for why this is a scroll region, not a
page.

**Relume — icons in the label column, colour in the header.** Every row label carries a small line
icon at its left. Plan names are coloured (Starter orange, Pro red, Team maroon) and cell values are
plain strings wherever a number exists rather than a check. Hairline row rules plus a faint warm
zebra.

**Vercel — a true ruled grid.** Vertical rules *between* columns as well as horizontal ones. The
group head ("Scale") gets a line icon and sits **outside** the ruled area, above it. Values are units
("500,000 execution units", "128 MB / account") with a tiny `$` or (i) badge appended where a caveat
applies.

**Craft — the softest register.** Group bands are a light gray full-width row with the group name at
~12px; checks are **filled blue circles**; absence is an em dash `—`, never a cross. Worth noting as
the "no negative signal" variant: nothing on the page says *no*, it just says *not this*.

**Product data tables** (for a page that must show the product's own table style): **Twenty** and
**Attio** both use a header row where every column label is preceded by its own small type icon, rows
at ~28px, and — the detail worth stealing — a **footer strip of per-column aggregates**
("Count all 220", "Max of Empl. 8,000", "Empty of Linkedin 98%"). **Airtable** (`c4cf7281`) puts row
numbers in a fixed left gutter and renders status as a filled pill.

---

## 3. Typography specimens

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Jasper — "Fonts" | section `30434930-ea74-484a-8eca-88ff9c8014f2` | https://mobbin.com/sites/sections/30434930-ea74-484a-8eca-88ff9c8014f2 |
| Aave — "Typography" | section `194a20c4-7e03-4839-86b3-30981d8db06e` | https://mobbin.com/sites/sections/194a20c4-7e03-4839-86b3-30981d8db06e |
| Stitch — design-system extraction board | screen `15882c83-867b-4ed2-bf27-18a1692dcd8f` | https://mobbin.com/screens/15882c83-867b-4ed2-bf27-18a1692dcd8f |
| beehiiv — Typography styles | screen `329cb921-6560-4f9f-9328-f26bd02e1a0b` | https://mobbin.com/screens/329cb921-6560-4f9f-9328-f26bd02e1a0b |
| Framer — text property panel | screen `5af71368-1722-457b-97be-90743f3706d2` | https://mobbin.com/screens/5af71368-1722-457b-97be-90743f3706d2 |
| Claude Type — Romie specimen | section `87c2dd71-75a5-4bf1-8d12-86e29d509e35` | https://mobbin.com/sites/sections/87c2dd71-75a5-4bf1-8d12-86e29d509e35 |

### Composition notes

**Jasper — the single best type-spec reference found.** Two large cards side by side holding
**identical content**, one white and one black, proving the face in both polarities on one band.
Inside each card: family name at ~11px top-left, then a stack of specimen lines. Each line is
preceded by a **three-column micro-header at ~8px uppercase, letterspaced, gray** —
`SIZE 116/80%` · `WEIGHT MEDIUM` · `LETTER SPACING -3%` — with the sample line ("Headline 01") set
immediately below at its true size. The spec sits *above* the sample rather than beside it, so every
sample stays flush-left in one column and the eye reads straight down the size ramp; the specs read
as a faint gray ladder in the margin of that column.

**Aave — three faces, one metadata line each.** Left ~30% is heading + one-line rationale ("The
three typefaces that define the brand."); right ~70% is a vertical stack of three cards, each a light
gray rounded rectangle ~230×90 holding an **oversized crop of the face bleeding off the right edge**
("Proto…", "23%", "uint…"). The letterforms are deliberately cut, not fitted. Under each card, one
row: family name **set in that family** at ~13px flush left, then flush right a usage sentence ("For
headlines.") and a pill badge ("License Required (i)" / "Free"). Licensing status on the specimen
page is a detail worth copying.

**Stitch — the "system at a glance" board.** Middle column has three cards, each showing "Aa" at a
different size with a role label at the card's top-left ("Headline", "Body", "Label") and the size at
top-right. The Body card **replaces "Aa" with four gray rules of decreasing width** — a paragraph
stand-in. Letterform for display sizes, rules for text sizes: a good trick when a body specimen at
true size would look like nothing.

**beehiiv — role, not specimen.** Four blocks stacked, each a bold role label ("Global Headings"), a
two-line explanation of what the role is for, then a labelled dropdown naming the family. No sample
at all — the sample is the live preview beside it. The pattern to steal is the *explanation under
the role name*, which most type pages omit.

**Framer text panel — the anatomy of a spec row.** Font / Weight / Colour / Size / Letter / Line /
Align as label-value rows at ~11px, label gray flush-left, value in a control flush-right. If the
book needs a "type token table", this is its row shape.

**Claude Type (Romie)** — the editorial specimen: the family name set enormous and centred across two
lines with the italic overlapping the roman, a small green "12 styles" pill above it, and a
full-bleed photograph below. Only relevant if a page needs a display moment rather than a spec.

**Weak.** Almost every result from `search_screens` for typography is a **font picker** (Semrush,
Adobe Express, GoDaddy, Readymag, Gamma, Hootsuite, Magnific): a scroll list of family names each set
in its own face. Useful as a "font list" pattern; useless as a specimen. The good material was all in
sections, not screens.

---

## 4. Tile grids / galleries of objects (merchandise chapter)

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Phantom — merch grid | section `151e0888-a1ff-4e13-8901-294af81fa94b` | https://mobbin.com/sites/sections/151e0888-a1ff-4e13-8901-294af81fa94b |
| Maxima Therapy — shop grid | section `5c922356-78fb-4ae4-bbf1-263be4df8934` | https://mobbin.com/sites/sections/5c922356-78fb-4ae4-bbf1-263be4df8934 |
| The New Yorker — 100th Anniversary shop | section `ec5088fb-1cd1-492f-8b5e-92dfbefe85f1` | https://mobbin.com/sites/sections/ec5088fb-1cd1-492f-8b5e-92dfbefe85f1 |
| Duolingo — Captain Duo collection | section `20c8885b-a34b-4f67-a07b-ffe5d0197ac9` | https://mobbin.com/sites/sections/20c8885b-a34b-4f67-a07b-ffe5d0197ac9 |
| BitcoinOS — artifacts shop | section `9f8a47e9-de3c-4469-9fff-09b24b009d1e` | https://mobbin.com/sites/sections/9f8a47e9-de3c-4469-9fff-09b24b009d1e |
| Shopify Supply | section `a178e55f-0be8-4811-8c85-b94b0caec5bd` | https://mobbin.com/sites/sections/a178e55f-0be8-4811-8c85-b94b0caec5bd |
| United Carriers — branded merchandise | section `2d70ac20-0e61-479a-98ba-26fbd69b2ec6` | https://mobbin.com/sites/sections/2d70ac20-0e61-479a-98ba-26fbd69b2ec6 |
| Oyster — swag store | section `a0dfa969-1108-4522-aa46-84995def0664` | https://mobbin.com/sites/sections/a0dfa969-1108-4522-aa46-84995def0664 |

### Composition notes

**Phantom — the one to build the Audentra merch chapter on.** 3-up. Each product photograph sits on
a **flat brand-tinted square**, and the tint **steps across the row**: pale lavender → mid lavender →
full purple. The row therefore demonstrates the tint ramp *while* showing goods — two jobs, one band.
Caption is a single line below the tile with the name flush-left and the price flush-right, both at
the same ~13px, no card, no border, no rule. The garments are all black, so the tint is the only
colour and the eye reads the ramp before it reads the products.

**Maxima Therapy — label plate over the tile.** 2-up masonry of tall photo tiles on fully saturated
grounds (yellow, orange). A **white rounded "label plate"** floats over the bottom of each tile,
inset ~16px from left, right and bottom edges, holding only the product name, centred, at ~12px. No
price anywhere. The plate is what makes a loud photographic ground safe for type.

**The New Yorker — no tile at all.** 3-up on warm off-white; products are cut-outs sitting directly
on the page ground. The caption is separated from the product by a **full-width hairline rule the
width of the column**, then the name in the brand serif over up to two lines, then the price in
italic, then a small square "Limited Edition" chip on its own line. Discounted items show
`$45.00` struck through followed by `$33.75` on one line. Elegant, and completely colour-free.

**Duolingo — pale tile, generous padding, corner badge.** 2-up then 3-up. Tiles are pale gray rounded
rectangles with the product floating centred inside a lot of air; a "SOLD OUT" pill sits in the
tile's top-right corner (inside the tile, not over the product). Caption below the tile: name at
~13px semibold, price at ~12px gray on the next line, both flush to the tile's left edge.

**BitcoinOS — dark, and the filter reads as a headline.** 3-up of near-black rounded tiles on a black
ground, distinguished only by a ~3% lift and a hairline. Caption is **centred under the tile in ~8px
uppercase letterspaced**, name over price. Above the grid, the category filter is a single wrapped
paragraph of large uppercase words where the active one ("ALL") is white and the rest are dark gray
— navigation that looks like a display line.

**Shopify Supply — hairlines instead of tiles.** 3-up separated by **vertical hairlines that run the
full height of the row**; no tile fills. A "BESTSELLER" pill sits above the middle item, *outside*
the image, in the gutter row. Price line shows the old price struck plus a range.

**United Carriers — the most catalogue-like.** 4-up, uniform light-gray square tiles, caption in
~9px directly under the tile with the price on a smaller gray line beneath. An intro paragraph sits
top-left and a "SORT BY ⌄" control sits top-right on the same baseline — a header row that is text
on one side and a control on the other.

**Oyster — mixed weights in the caption.** 3-up on white with no tile; the product name is set
notably heavier and larger (~15px semibold) than everything around it, price at ~11px gray with the
currency spelled ("$ 30.00 USD").

---

## 5. Do/Don't and rule presentation

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Melius — "Simple rules for consistent use." | section `5db71a02-2050-468b-ab91-44f643a04ecb` | https://mobbin.com/sites/sections/5db71a02-2050-468b-ab91-44f643a04ecb |
| Melius — "Core marks and lockups." | section `ba1cc2b7-b681-4298-80b2-146c88d77d45` | https://mobbin.com/sites/sections/ba1cc2b7-b681-4298-80b2-146c88d77d45 |
| ClickUp — "Logo Guidance" | section `4b256185-8cf5-4cf6-b9e9-45d7d0c89cd8` | https://mobbin.com/sites/sections/4b256185-8cf5-4cf6-b9e9-45d7d0c89cd8 |
| Runway — "Don'ts" | section `833ebae4-6a3d-4fa6-a0c3-67d5c6d465ae` | https://mobbin.com/sites/sections/833ebae4-6a3d-4fa6-a0c3-67d5c6d465ae |
| ElevenLabs — "What to avoid" | section `caf326e5-03e1-4cb7-9e6a-ad6f9fec0736` | https://mobbin.com/sites/sections/caf326e5-03e1-4cb7-9e6a-ad6f9fec0736 |
| Oyster — logo don'ts | section `0acdeb00-4846-4d73-8690-092cd8c0bc0a` | https://mobbin.com/sites/sections/0acdeb00-4846-4d73-8690-092cd8c0bc0a |
| Shopify Plus — "Spacing rules" | section `d14444be-4d36-4a58-89f9-5c8e65e0bab7` | https://mobbin.com/sites/sections/d14444be-4d36-4a58-89f9-5c8e65e0bab7 |
| Rarible — "Incorrect use" | section `db2b0157-3f07-4555-b898-2b0e04380814` | https://mobbin.com/sites/sections/db2b0157-3f07-4555-b898-2b0e04380814 |

### Composition notes

**Melius "Usage" — best in class, and the template I would build Audentra's rule pages on.**
Eyebrow "USAGE" at ~10px uppercase gray; headline "Simple rules for consistent use." in a serif at
~34px; one line of subhead. Then a **3×2 grid of white cards on a warm ground**. Inside each card,
top to bottom: a demonstration panel ~180px tall showing **the actual thing** (a real lockup on three
grounds; a real product diagram; a real UI fragment) — never an icon standing in for it; then a small
badge, a **yellow "DO" chip or a black "DON'T" chip** at ~9px uppercase; then the rule as a bold
sentence-case **statement** ("Use approved lockups." / "Do not recolor freely."); then two lines of
~11px gray explaining why. Row 1 is all DO, row 2 is all DON'T, so **the grid itself is the
taxonomy** and the chips merely confirm it. The DON'T panels render the misuse at full fidelity —
the "do not recolor" panel is a genuinely attractive gradient with three coloured lockups on it,
which is far more persuasive than a crude mock-up.

**Melius "Core marks" — the companion, and how to keep a grid even.** 2×2 of white cards, each with
one lockup centred in a large empty field and name + two-line usage note in the card's lower-left.
Then a **third row of three text-only cards at half height** ("Give it clear space." / "Protect
contrast." / "Do not redraw."), same card shape, no picture. Rules that need no illustration still
get a card, so the page never ends ragged.

**ClickUp — the red diagonal.** "Clear space" first, as two black panels showing the mark with crop
marks and a dotted measurement grid. Then "Things to avoid" as a 3×2 of small white panels, each
crossed by **a single thin red diagonal line drawn corner to corner across the whole panel**, with a
~9px uppercase caption below ("DON'T CHANGE THE COLOR"). No icon, no chip — the slash is the entire
negative signal. Note the size mismatch: the clear-space panels are ~2× the width of the don't panels
on the same page, which correctly ranks them.

**Runway — text first, picture second.** States the rules as a **numbered prose list of six items**
under the heading "Don'ts", *then* shows the six offenders as a 3-column grid of gray squares each
with a thin red diagonal and no caption. The inverse of ClickUp: the list is the content, the grid is
the evidence. Good where the rules are subtle enough to need sentences.

**ElevenLabs — tint the field instead of slashing it.** 2-up of large **pink-tinted** panels — the
tint alone says "wrong" — each with a small red ✗ circle in the panel's **bottom-left** corner (not
over the artwork), then a bold one-word title ("Stacked", "Shorthand") and a three-line explanation
below. The gentlest of the negative treatments, and the most legible at large sizes.

**Oyster — caption attached, not floating.** 3×2 of white panels on gray, and the caption sits in its
own **light-gray strip welded to the bottom of the panel** — a two-tone card rather than a panel plus
loose text. Every caption begins with the word "Don't".

**Shopify Plus "Spacing rules" — diagram left, prose right.** Left ~45%: the logo inside a light
panel with a dotted construction grid and the letter "s" **repeated vertically as the unit of
measure**. Right ~45%: a bulleted list where each bullet is a blue ✓ glyph followed by a two-line
rule. Both halves share a top baseline. This is how to teach a measurement without dimension arrows.

**Rarible** — same grid as ClickUp but the last don't panel is a full-colour gradient with the
logotype on it, captioned "Do not use main logotype on coloured backgrounds" over two lines. Directly
relevant given Audentra's gradient rule.

---

## 6. Gradient surfaces used with type

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Superhuman — "AI that works everywhere you work" | section `78a16fee-cb98-4a46-8e8a-37f0ad915ff8` | https://mobbin.com/sites/sections/78a16fee-cb98-4a46-8e8a-37f0ad915ff8 |
| Vanta — Vanta AI hero | section `5bc83bbd-b206-40b5-979d-6252fc9e2568` | https://mobbin.com/sites/sections/5bc83bbd-b206-40b5-979d-6252fc9e2568 |
| Antimetal — gradient band | section `2e58a2d3-8310-4e89-9654-d63be89cba15` | https://mobbin.com/sites/sections/2e58a2d3-8310-4e89-9654-d63be89cba15 |
| Inkwell — gradient hero (counter-example) | section `d3d530a1-2a62-4ccf-8fec-ac7f8427f6e4` | https://mobbin.com/sites/sections/d3d530a1-2a62-4ccf-8fec-ac7f8427f6e4 |
| Shopify Editions — "Agentic" | section `01ac7a24-0b90-4bc8-ab96-6cc29a454274` | https://mobbin.com/sites/sections/01ac7a24-0b90-4bc8-ab96-6cc29a454274 |
| Dropbox — purple band | section `3d2a64a4-2f5a-48dc-a10f-3a4ee5966a31` | https://mobbin.com/sites/sections/3d2a64a4-2f5a-48dc-a10f-3a4ee5966a31 |
| OFF+BRAND — spectrum panel | section `5bc9ede6-eb6d-41c3-95f5-509e61755ef2` | https://mobbin.com/sites/sections/5bc9ede6-eb6d-41c3-95f5-509e61755ef2 |
| Jasper — lavender band hero | section `3fa548f8-725c-45ca-a9f1-abc795db349f` | https://mobbin.com/sites/sections/3fa548f8-725c-45ca-a9f1-abc795db349f |

### Composition notes

There is one rule visible across every successful example, and one example that breaks it.

**Superhuman — type lives where the gradient is calmest.** Full-bleed pink→periwinkle→blue running
left to right. The headline is flush-left, three short lines, in near-black, sitting in the **far-left
region where the ramp is at its palest and flattest**. The busy part — a cloud-and-text texture where
hue and luminance both move — is pushed to the right half, where nothing sits but a single white pill
button. The type never crosses a hue transition.

**Vanta — the gradient is only ever seen *around* a solid object.** Deep purple-black field with a
single radial purple glow rising from bottom-centre. The wordmark sits above the glow's centre in the
darkest part of the field; a large flat near-white card is placed **on top of** the glow, so all body
copy is on the card and the gradient appears only as a halo escaping around its edges.

**Antimetal — accent placed against the deepest end.** Vertical blue gradient, light at top, deep at
bottom. Centred serif headline in white in the pale upper third; an acid-yellow pill button below it
where the ground is darkest. The one saturated accent goes where the ground has the most room for it.

**Inkwell — the counter-example, and it is instructive.** A blue→peach vertical gradient across the
full viewport. The single sentence of copy is centred, small (~15px), white, and placed **exactly at
the hue crossover**, where luminance is mid. It loses contrast and half-disappears. Keep this one as
the "don't" illustration for the gradient page.

**Shopify Editions "Agentic"** — a photographic light-streak field; one word at ~64px flush-left in
the **darkest quadrant** with the subhead directly beneath it, and the rest of the band left empty.

**Dropbox** — what a gradient page reduces to when it must be legible: a **solid** purple band with
eyebrow 12px / headline ~30px over two lines / link 13px, all white, all centred, with ~70px of clear
purple above and below.

**OFF+BRAND** — a full-spectrum panel (blue→yellow→pink) with a translucent photograph over it and
**two layers of headline**: a dark set flush-left and a lighter ghosted set behind, offset. Reads as
motion, not as a heading. Only useful for a divider or chapter-opener page, never for content.

**Jasper** — the gradient is delegated entirely to the logo; the band behind is a **flat pale
lavender** with a two-tone headline (black phrase + gray phrase) and two white cards below breaking
the band. A good model for a page that must feel gradient-adjacent while staying readable.

---

## 7. Dark-canvas layouts with tiles and lines

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Linear — 4-column rule grid | section `11fa0cf7-8a9c-41f1-b38f-66918fac01f4` | https://mobbin.com/sites/sections/11fa0cf7-8a9c-41f1-b38f-66918fac01f4 |
| Apple — Enterprise cards | section `18c87d27-8aac-4a6f-b946-9522b1eab3d0` | https://mobbin.com/sites/sections/18c87d27-8aac-4a6f-b946-9522b1eab3d0 |
| TIDAL — Discover More | section `7d7a13f3-e182-41ae-9e65-6b795304c753` | https://mobbin.com/sites/sections/7d7a13f3-e182-41ae-9e65-6b795304c753 |
| incident.io — "Everything you need" | section `0e8ee7bc-4aa3-4f1b-805f-89117f5d5d68` | https://mobbin.com/sites/sections/0e8ee7bc-4aa3-4f1b-805f-89117f5d5d68 |
| Windsurf — navy carousel | section `d71c5b4f-5f52-407a-a347-84394e4b3a45` | https://mobbin.com/sites/sections/d71c5b4f-5f52-407a-a347-84394e4b3a45 |
| Framer — Developers cards | section `3bff67c0-a4b7-49bf-9a6c-efd3b6dec507` | https://mobbin.com/sites/sections/3bff67c0-a4b7-49bf-9a6c-efd3b6dec507 |
| Mixpanel — dark dashboard | screen `911cc944-33c4-47ce-894e-a8504700f1a8` | https://mobbin.com/screens/911cc944-33c4-47ce-894e-a8504700f1a8 |
| Adaline — dark metrics grid | screen `d5b2ad2a-dd83-4d6b-86fa-6edeee1991cd` | https://mobbin.com/screens/d5b2ad2a-dd83-4d6b-86fa-6edeee1991cd |

### Composition notes

**Linear — rules only, no fills, and emptiness as composition.** Near-black ground. Four columns
separated by **1px vertical rules running the full band height**; no card fills anywhere. Inside each
column, top to bottom: a numbered mono eyebrow ("1.0 Intake") at ~11px in dim gray, then roughly 60px
of nothing, then a two-line white headline at ~17px, then "Learn more →" at ~12px. **Content is
bottom-heavy inside the cell** and the void at the top is deliberate. This costs nothing to build and
is the single most transferable dark layout found.

**Apple Enterprise — colour only in the glyph.** Black rounded cards ~200×175 on a dark gray ground.
Each card: a gray eyebrow line and a white bold line stacked at the top; a **magenta outline glyph at
~45px in the lower-left**; a circled "+" in the lower-right. The card is otherwise empty. The single
saturated element per card carries the whole grid.

**TIDAL — cropped watermark word behind the row.** Three cards, each with its own internal gradient
(neutral / gold / purple), a lockup or glyph centred in the upper half, then title, two-line
description, "› Learn More". Behind the row, an **enormous outlined display word ("DISCOVER MORE")
cropped by both band edges** fills what would otherwise be empty dark space.

**incident.io — glyph tile as list bullet.** Left column is a stack of rows; each row is a small dark
tile with a glyph at the left (~46px, the active one gaining a coloured hairline border) and title +
three-line body + "Learn more" to its right. Right column is one product screenshot in a rounded
frame. Two-tone headline (orange phrase, white phrase).

**Windsurf — card inside card.** Deep **navy** ground (not black) with near-white cards for contrast
inversion; each card has a small outline glyph, a bold title, three lines of body, then a **dark inset
panel at the card's foot** holding a UI fragment. Directly relevant: navy ground plus white cards is
close to Audentra's Deep Navy.

**Framer — one light card in a dark grid.** Four saturated cards (blue, purple, orange) plus one
white card in a 2×2; the eye lands on the white one first. A cheap way to rank items without
enlarging any of them.

**Mixpanel / Adaline (product dashboards)** — the metric-tile shape: number at ~26px, label at ~11px
gray beneath, sparkline filling the tile's lower half; tiles separated by hairlines on a
near-black ground. Adaline's variant puts the label **left** and the number **right** on the same
baseline, with a full-width chart under both — a wider, calmer tile that reads better at large sizes.

---

## 8. Diagram / annotated illustration

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Sequence — numbered step rail | section `27bf1023-ba04-4af0-ae50-5fad11815613` | https://mobbin.com/sites/sections/27bf1023-ba04-4af0-ae50-5fad11815613 |
| Browserbase — "Zero setup. Real results." | section `687d0833-191b-4fba-8963-368492c97a10` | https://mobbin.com/sites/sections/687d0833-191b-4fba-8963-368492c97a10 |
| Shopify Plus — spacing diagram | section `d14444be-4d36-4a58-89f9-5c8e65e0bab7` | https://mobbin.com/sites/sections/d14444be-4d36-4a58-89f9-5c8e65e0bab7 |
| ClickUp — clear-space panels | section `4b256185-8cf5-4cf6-b9e9-45d7d0c89cd8` | https://mobbin.com/sites/sections/4b256185-8cf5-4cf6-b9e9-45d7d0c89cd8 |
| Greptile — "How Greptile reviews every PR" | section `1b166ffd-5b9f-4579-9398-629d9779f7af` | https://mobbin.com/sites/sections/1b166ffd-5b9f-4579-9398-629d9779f7af |
| Trawelt — oversized numerals | section `629aae31-4a94-46df-a97f-3180a6ae22e0` | https://mobbin.com/sites/sections/629aae31-4a94-46df-a97f-3180a6ae22e0 |
| Clay — "How it works" | section `28c16d19-1b1c-4c38-b06e-660c77901cbc` | https://mobbin.com/sites/sections/28c16d19-1b1c-4c38-b06e-660c77901cbc |

### Composition notes

**Sequence — a rail that annotates one image.** Four numbered nodes on a single horizontal line: node
1 is a **filled purple circle containing the numeral**, nodes 2–4 are bare gray numerals, and a 1px
connector runs from each node to the next. Under each node: a bold step title and two lines of body.
Then, below the whole rail, **one large bordered frame holding the product screenshot**. The rail
annotates one artefact rather than requiring four images — this is exactly the shape for "here is the
email / the card / the screen, and here are its four parts".

**Browserbase — three panels that read as one strip.** 3-up of illustration panels *above* the text.
Each panel is a fixed-height scene sharing the **same horizon line** with its neighbours, and the
panels are separated by only ~10px, so the strip reads as one diagram cut into three rather than
three pictures. Below each: a numbered title on one line ("1 Create a browser session"), then three
lines of ~11px body.

**Shopify Plus — measurement without dimension arrows.** Dotted construction grid over the mark, with
the letter "s" from the wordmark **repeated vertically at its true scale** as the unit of measure.
Paired with a checked bullet list at the right explaining the rule in words.

**ClickUp — crop-mark brackets.** Corner brackets at the four corners of the clear-space box, the box
itself a dotted outline around the lockup, on a black panel. Two panels side by side: full lockup and
symbol alone.

**Greptile — annotation as page chrome.** A dark ground overlaid with a faint blueprint grid and thin
crosshair rules running edge to edge; a "HOW IT WORKS" chip is centred **on** the horizontal rule so
the rule appears to pass through it. Three panels below, each with "STEP 01" in mono above its title.
The chrome does the diagramming; the panels are ordinary.

**Trawelt — the oversized numeral, and the most brand-book of the set.** "01" set at ~180px flush
right and **cropped by the column edge**; the step name sits in two lines (title in black, subtitle in
gray) on the baseline of a hairline rule that runs the full column width under both. The left half of
the band is a static essay column that does not repeat per step. Very close to a printed spread.

**Clay — the reduced version.** Four white cards, each with a bracketed numeral `[1]` at ~14px in the
top-left, an uppercase ~10px letterspaced title, three lines of body. No illustration, no connector —
the bracket is the whole diagram. Use when there is nothing to draw.

---

## 9. Email signature / email design

**Say it plainly: Mobbin has nothing on email signatures**, and very little on *designed brand email*.
What exists is (a) invoice and receipt **documents**, and (b) campaign **builders** where the email is
a small preview inside an editor chrome. The document skeletons are still useful; the builders are
not.

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| ManyChat — invoice | screen `650117e1-226b-4f47-b0b5-d77dbecb798a` | https://mobbin.com/screens/650117e1-226b-4f47-b0b5-d77dbecb798a |
| Midday — invoice sheet | screen `328c47b5-51d9-4e71-ac3a-ee46f4c65304` | https://mobbin.com/screens/328c47b5-51d9-4e71-ac3a-ee46f4c65304 |
| HBO Max — receipt | screen `b9d9f04e-e34e-4a9f-ad3a-3d47d2087671` | https://mobbin.com/screens/b9d9f04e-e34e-4a9f-ad3a-3d47d2087671 |
| Flodesk — delivery email template | screen `16f9c78a-6930-44dd-ae6f-aa6bbbce12e3` | https://mobbin.com/screens/16f9c78a-6930-44dd-ae6f-aa6bbbce12e3 |
| Square — campaign email | screen `e80ddd23-b46f-49e0-9920-1f74fb4ada68` | https://mobbin.com/screens/e80ddd23-b46f-49e0-9920-1f74fb4ada68 |
| Wave — payment receipt preview | screen `927fb948-7438-4a6f-987e-60a4230de8ef` | https://mobbin.com/screens/927fb948-7438-4a6f-987e-60a4230de8ef |
| Xero — invoice email | screen `c9763dbd-e365-4b73-870c-d089e748229f` | https://mobbin.com/screens/c9763dbd-e365-4b73-870c-d089e748229f |

### Composition notes

**ManyChat — the cleanest document layout of the set.** Wordmark top-left. "Invoice" at ~28px flush
left with a green **"PAID"** at the same baseline flush right. Then a **three-column metadata block**
(Billed to / Invoice ID / Invoice Date) with ~9px gray labels over ~11px values. Hairline. Line-item
table: Description flush left, Quantity / Unit Price / Cost right-aligned, with a gray second line
under the item name for its date range. Hairline. "Total" flush left, the amount at ~20px flush
right. Then a two-column footer: thanks note left, company address right.

**Midday — document on a desk.** A white sheet floating on a faintly grid-lined ground with a soft
shadow. The logo is a **black square at the top-right**, balancing "Invoice" at the top-left; From/To
as two columns; a four-column item table; totals right-aligned with the grand total at ~20px; a
two-column footer (Payment Details / Note). The action bar floats **detached** below the sheet's
bottom edge. This presentation — artefact on a ground, not artefact filling the frame — is the right
way to show an email on a book page.

**HBO Max — label-left, value-right, and nothing else.** No card, no rules except one under the
totals block. Wordmark at ~18px, "Receipt" at ~24px beneath, address block at ~9px gray. Then pure
label/value rows at ~11px across a ~350px measure, with duplicate tax lines repeated without
embarrassment.

**Flodesk — the marketing-email shape.** A small circular mark centred at the top, then a two-column
body: left ~45% is a three-line headline, a small gray confirmation line, and two labelled sections
("Order Details", "Summary") each a hairline-ruled label/value list; right ~50% is a single product
photograph, full-bleed to the column. Content width ~470px.

**Square — the branded-block email.** Full-bleed photo header with the logo tile centred over it and
the business name beneath in white; centred headline plus three lines of body; then a **saturated
green rounded block** holding the offer — "$5" large, one bold line, one gray line, and a white
outlined code field; then three lines of ~9px legal gray. The coloured block is the only brand colour
in the whole email.

**Wave — everything centred, one column, ~270px wide.** Monogram at ~40px centred, "Payment Receipt"
at ~20px, "Invoice #2" bold, then three centred gray lines, a gap, then business name / country /
phone as centred small lines.

**Xero — the transactional shell.** Logo in a black square centred, amount at ~20px bold centred with
"USD" appended small, due date and invoice number as two ~10px gray lines, then a **full-width blue
button**, then plain-text body. This is the minimum viable transactional email and is worth showing
in the book as the floor.

---

## 10. Icon sets shown as a grid

### Best hits

| App / site | Type | Link |
| --- | --- | --- |
| Magnific / Freepik — icon collection | screen `c215558c-23c8-415a-8b3d-917004d27adb` | https://mobbin.com/screens/c215558c-23c8-415a-8b3d-917004d27adb |
| Adobe Express — "Choose an icon" | screen `f1ff6254-d7d0-4887-8e34-b0e713a4eb86` | https://mobbin.com/screens/f1ff6254-d7d0-4887-8e34-b0e713a4eb86 |
| Zoho CRM — icon picker popover | screen `2dcd27b3-3f8d-4c81-87b3-3b59f4cc8712` | https://mobbin.com/screens/2dcd27b3-3f8d-4c81-87b3-3b59f4cc8712 |
| PamPam — "Features" | section `a37dec6a-3829-46e4-b3df-a5cb16185f55` | https://mobbin.com/sites/sections/a37dec6a-3829-46e4-b3df-a5cb16185f55 |
| Loom — "Collections" | section `aa8e044f-73e2-43ee-9432-b7003de06fdc` | https://mobbin.com/sites/sections/aa8e044f-73e2-43ee-9432-b7003de06fdc |
| Canva — "Industries" | section `b327a861-bba9-43fb-afdc-b0b7cc063088` | https://mobbin.com/sites/sections/b327a861-bba9-43fb-afdc-b0b7cc063088 |
| Fibery — feature list | section `3f148051-6eff-401c-bc33-113cc1d2e964` | https://mobbin.com/sites/sections/3f148051-6eff-401c-bc33-113cc1d2e964 |
| Sketch — help topics | section `198b16d8-6287-4a5c-acd9-9abc4f094ee3` | https://mobbin.com/sites/sections/198b16d8-6287-4a5c-acd9-9abc4f094ee3 |

### Composition notes

**Magnific / Freepik — the pure "wall of icons".** 6-up grid of white rounded tiles ~100×100 with a
1px light border, each holding one black line icon at ~44px centred, gutters ~14px. **No per-icon
labels** — the grid is pure form. The header above it is the transferable part: a collection title
with the author as a coloured link, a count line ("288.1k icons in this collection") at ~11px gray,
then a *second* header row — "Showing 286k icons" flush left, a search field centre, "Sort by:
Popular ⌄" flush right — all on one baseline.

**Adobe Express — denser, still unlabelled.** 8-up of ~62px square tiles with a hairline border and
the glyph at ~34px; a search field plus a horizontal row of keyword chips above; last row deliberately
left-ragged rather than centred.

**Zoho CRM — the extreme-density case.** A floating popover with roughly 9 columns × 8 rows of ~16px
glyphs at ~14px gutters, no tiles, no labels — about 70 icons in a 150×140 box. Included as the
lower bound, and as a warning (see transfer notes).

**PamPam — the labelled form, and the most brand-book of the ten.** Two columns of rows; each row is a
~44px **pale-pink rounded tile** with a line glyph centred, then to its right a serif title at ~15px
and a one-line gray description at ~11px. Rows about 62px apart. This is how to publish an icon set
*with meaning attached* rather than as a wall — and the tinted tile behind the glyph is exactly the
"flat tinted tile" treatment Audentra already uses.

**Loom — tile as artwork.** Each card's top ~55% is a **patterned or gradient rectangle** with a white
circle centred in it holding a single line glyph in brand purple; title and two-line description sit
in the card's white lower half. Turns a plain glyph set into a designed page without redrawing a
single icon.

**Canva — icon above centred label.** 4-up of bordered white cards, each with a small purple line
glyph centred at the top, a centred bold title, then a centred one-line description. Under the grid,
a "TRUSTED BY" logo strip on the same measure.

**Fibery — icon as a coloured shape chip.** The "icon" is a ~20px coloured hexagon/circle carrying a
letter, sitting **above** the label rather than beside it; 4 columns, ~55px row rhythm; the grid sits
under a heading with a hairline rule running from the heading's right edge to the container's edge.

**Sketch — glyph, title, body, link.** 3-up × 2, no tile and no border: a ~20px line glyph, then a
bold title at ~14px, then three lines of ~11px body, then a "See all articles →" link. The plainest
possible labelled icon grid, and it holds up.

---

## What transfers to a 1920×1080 brand-book page — and what doesn't

### The two structural differences

**1. Optical size.** Everything above was captured from a ~1440px viewport where body text is 11–14px
and read at arm's length on a laptop. A 1920×1080 brand-book page is read as a full-screen spread, a
projected slide, or a PDF page — roughly **a 1.8–2.2× jump in every optical size**. Take the
*arrangement*, never the numbers. Concretely: Mural's swatch card is ~180px wide in its native
viewport; on a 1920 page carrying only 8 swatches, the same card becomes ~380px and the hex line goes
from 11px to 18–20px. Every "11px gray caption" in these notes becomes 18–22px.

**2. The page ends.** Almost every Mobbin section is a **band on an infinitely tall page** — content
flows past the fold. A 1080-tall page cannot flow. So the compositions that transfer cleanly are the
ones that are **already band-shaped and already closed**, and the ones that don't are the ones that
silently continue below the capture.

### Transfers as-is (arrangement survives, only sizes change)

- **Mural's swatch card** (colour block over a white label plate, name + ruled hex line). Already a
  static document. Four across × two down fits 1920×1080 with room for a heading band.
- **Discord's value-inside swatch with a CMYK second line.** The 3-up grid closes at 7–9 items.
- **Linear's colour page** — long rationale paragraph plus three large swatches. Deliberately sparse,
  which is what a 1080-tall page wants.
- **Aave's heading-left / specimens-right split** (30/70) for both the colour ramps and the typography
  page. It is a fixed-height band by construction.
- **Jasper's specimen card** — the micro-header of `SIZE / WEIGHT / LETTER SPACING` above each sample,
  and the white-card/black-card pair proving both polarities on one page. This is the best single
  find in the whole sweep and needs no adaptation beyond scaling.
- **Melius's DO/DON'T 3×2** — six cards, real demonstrations, chip + statement + two-line reason. Fits
  1920×1080 almost exactly at ~300×220 per demonstration panel.
- **Melius's half-height text-only cards** for rules that need no picture — the trick that keeps a grid
  from ending ragged is worth adopting as a general habit across the 59 pages.
- **Linear's dark 4-column rule grid** (vertical hairlines, bottom-heavy content, mono numbered
  eyebrows). Costs nothing, reads at any size, and is already exactly one band tall.
- **Trawelt's oversized cropped numeral** with the step title on a hairline baseline. Printed-spread
  logic already.
- **Sequence's step rail annotating one large frame.** The right shape for "here is the artefact, here
  are its four parts" — which the email page, the card anatomy page and the screen-surface page all
  need.
- **Phantom's tint-stepped merch row** and **United Carriers' uniform 4-up gray tiles**. Both close.
- **The New Yorker's cut-out + full-width hairline + serif caption** for a merch page that must be
  colour-free.
- **PamPam's tinted-tile-plus-label icon rows** and **Sketch's glyph/title/body/link 3×2** for the icon
  chapter.
- **Superhuman's and Vanta's gradient rules** (below).

### Transfers with surgery

- **Dense comparison tables.** Mixpanel's ~30 rows at 19px is a scroll region; it is not a page. A
  1920×1080 page holds roughly **14–16 rows at 28–32px with 16–18px type** once you subtract a heading
  band and page furniture. So: take **Jitter's per-column rule stops and per-column tinted checkmark**
  and **Windsurf's full-width group bands**, cap the row count, and **split across two pages** rather
  than shrinking the type. Do not attempt Vercel's full vertical-plus-horizontal grid at this row
  height — the ruling starts to dominate the values.
- **Webflow's variable table.** It works because you can scroll and search 200 rows. A book page
  can't. A 100+ token appendix must become a **4-column × 20-row list** (chip + name + value per cell)
  or be delegated to the live styleguide URL with only the categories shown in the book.
- **Runway's Don'ts** (a 6-item prose list *above* a 6-item grid) is two pages' worth of content in one
  scroll. Split: list on the left half, grid on the right half, or rules page then evidence page.
- **Oyster's and Rarible's don't grids** continue below the capture; cut to exactly 6 and give each
  panel a caption strip welded to its bottom edge (Oyster's two-tone card), which reads better at
  scale than a floating caption.
- **BitcoinOS's dark merch grid.** The ~8px uppercase caption is unreadable enlarged proportionally —
  set the caption at 16–18px and *reduce* the letterspacing, or the row of captions turns into a
  texture.
- **TIDAL's cropped watermark word** is a good way to fill an otherwise empty 1920 band, but at book
  scale it must be genuinely faint (≤8% against the ground) or it competes with the cards.

### Does not transfer

- **Anything whose meaning is an interaction.** Canva's collapsible group chevrons, Windsurf's (i)
  tooltips, Teachable's colour-field-with-picker, Gamma's theme editor, Sketch's selection border,
  every font picker (Semrush, Adobe Express, GoDaddy, Readymag), Netflix's carousel, Airtable's
  hover-revealed row controls. On a static page these are either dead pixels or, worse, a promise the
  page can't keep.
- **Zoho's 16px unlabelled glyph density.** At reading distance on a 1080 page the practical floor is
  roughly **28px for a bare line glyph and ~40px inside a tile**. Freepik's ~44px-in-a-100px-tile is
  the right target; anything denser becomes a grey field.
- **ClickUp's thin red diagonal, used alone.** At 1920 a 1px red line across a 300px panel reads as a
  scratch on the page, not as a rule. Either thicken it to ~3px *and* keep the uppercase caption, or —
  better — use **ElevenLabs' tinted field + corner ✗ + bold rule name**, or Melius's DO/DON'T chip,
  both of which survive enlargement.
- **Email builders as a reference for email design.** Flodesk, Klaviyo, Mailchimp, Customer.io,
  Outseta, Pipedrive, Resend all show a small email inside a large editor chrome; the chrome is 60% of
  the pixels. Use the **document skeletons** (ManyChat, HBO Max, Midday) and present them the way
  Midday does — a sheet on a ground with a soft shadow — annotated with the Sequence rail.
- **Product dashboards as a "dark canvas" reference.** Mixpanel, StackAI, Adaline, Graphite are dark,
  but their composition is dictated by sidebars, filter bars and date pickers. Take only the metric
  tile's internal proportions (Adaline's label-left/number-right is the better one) and drop the
  chrome. For the dark *page*, use Linear, Apple and Windsurf.

### The gradient rule, stated for Audentra

Across Superhuman, Vanta, Antimetal, Shopify Editions and Dropbox, one rule holds without exception,
and Inkwell breaks it and visibly fails:

> **Type never sits over a hue transition.** It sits in the flattest, most extreme end of the ramp, or
> on a solid object placed over the gradient.

For a Purple→Blue→Teal diagonal on a 1920 page that means: the headline goes in the **Purple end** (or
on a Deep Navy / white plate laid over the gradient, Vanta-style); the **Blue→Teal crossover stays
empty**, or carries only a device frame or screen image; a single saturated accent — a button, a chip
— goes where the ground is deepest, Antimetal-style. Keep Inkwell (`d3d530a1`) as the illustration for
the "don't" panel on the gradient page, and Rarible's "do not use main logotype on coloured
backgrounds" (`db2b0157`) as the logo-on-gradient counterpart.

### Gaps — where Mobbin returned nothing useful

- **No spacing / radius / motion token scale documented as a table.** Mobbin's "design system" surface
  is product UI (Figma, Sketch, Webflow variable panels), not published documentation. Nothing found
  shows a spacing ramp with names and values on a page. This chapter has no reference and will have to
  be designed from the pricing-table mechanics in §2.
- **No email signature reference at all** — not one result across two searches.
- **No character map, no weight axis, no OpenType feature specimen.** Jasper's size ramp is the closest
  anything gets to a real type spec; nothing shows a glyph set.
- **Typography inside product screens is a dead end** — essentially all font pickers. Every usable
  specimen came from `search_sections`.
