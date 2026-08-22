# Grill — Brand Guidelines v2, 2026-08-22

The grilling record for the second version of the Figma file *Audentra Brand Guidelines*
(https://www.figma.com/design/i7gAADtBeCv5QPIAAHIncw). Marco's brief, restated on 2026-08-22: the
agency deck (Vekend GDL) was only a starting point; v2 is Audentra's own book, written in the visual
language the product has been building, working the three brand colours harder and introducing a
brand gradient. Each ❓ is a question put to Marco, each ➡️ the answer taken — Marco took every
recommendation of round 1 as given, including the two corrected after the audit.

Companion files: `audit.md` (the 62-frame audit of v1), `references.md` (public brand systems,
primary sources), and — once the grill closes — `spec.md` (from `/to-spec`). Vocabulary in
`docs/brand/CONTEXT.md`; decisions that bind the product in ADR 0008 and ADR 0009.

## Facts established before round 1

- The Symbol is four flat fills — Purple `#6A38FF`, Blue `#1E5BFF`, Teal `#02CDC7`, Teal 700
  `#04B2A9` — and the wordmark is Navy `#0A1F44` (`docs/brand/*.svg`, `AudentraMark.jsx`). No SVG
  carries a gradient.
- v1's primary palette (frame 29) is four swatches with Purple wide: Purple, Blue, Teal, Navy; the
  deck's own chrome titles in Purple; 30 calls Navy and White "the two canvases". The gradient
  exists only inside two gallery rasters (60, 61). See `audit.md` §3, 04.
- The product ships Geist (`tokens.css:345`), accent `--purple-400 #6854D9`, a purple gradient
  token used once (`patterns.css:2675`), `--teal-500 #1A6984` (a different role, not brand teal).
- Audentra in the product: "Powered by Audentra" (Symbol 13px + name) at the foot of the sidebar and
  of the onboarding StepRail; "Aster University sample experience · Designed with Audentra" on the
  page shell. The staff board (2026-08-21, 1.4) decided "Audentra in the chrome, Aster as data;
  accent stays purple; teal stays out of the product UI".
- Geist is on Google Fonts and loads in the Figma MCP runtime; Satoshi does not (v1 renders Inter).
- v1 has one variable collection (`font/*`), zero colour variables, zero styles, zero auto-layout,
  11 logo components; icons are a Lucide-style line set, not Phosphor (`audit.md` §4).

## Round 1 — settled

❓ **Q1 — Who reads the book.** ➡️ First, whoever builds Audentra's own surfaces — designers and
agents; second, the client institution's brand office. Rules are executable, never only
inspirational. The student is never a reader.

❓ **Q2 — The format.** ➡️ 1920×1080 frames stay (presentation and PDF size; not the agency's
property). Everything else is ours: grid, margins and type scale from the product's tokens (8px
base, Geist scale), paper surface, the design system's cards and tiles as the pages' vocabulary.
Built on a new page *Brand Guidelines v2* in the same file; v1 becomes an archive page; the logo
components on Assets are reused. v2 is born with colour variables and text/paint styles — a file
that rebuilds, not one that gets retouched.

❓ **Q3 — Typography.** ➡️ Geist for brand and product; Geist Mono for code and specimens. Satoshi
retired. The identity is carried by the Symbol, the three colours and the gradient, not by type.
Plan B, only if the Vercel association ever bites: a display face for brand headlines only. ADR 0008.

❓ **Q4 — The three colours and the gradient** (corrected after the audit). ➡️ The three are
Purple `#6A38FF`, Blue `#1E5BFF`, Teal `#02CDC7`; Navy and White are the two canvases; Teal 700 is a
shade. The gradient does not exist yet — we build it: Purple → Blue → Teal, one construction (angle,
stops, a version over Navy); the product's purple gradient documented as its UI cousin.

❓ **Q5 — Equals or a leader** (corrected after the audit). ➡️ Purple leads, Blue and Teal support —
what v1 already does (wide swatch, titles) and what matches the product accent, which gives the
cleanest bridge ("the product's purple is the brand's Purple tuned for UI"). Declared proportion:
White/Navy 60 · Purple 20 · Blue 10 · Teal 10; the gradient is the only place the three weigh the
same.

❓ **Q6 — Where the gradient lives.** ➡️ A surface, never a fill — not of type, Symbol or icon. It
appears at brand moments: cover, divider, hero, end card, social background — with white type and
the White master over it and a stop dark enough for contrast. Never on a small element (thin band,
button), never under text without a check. In the product: only what exists (the accent) or nothing.
A gradient-misuse page is part of the chapter.

❓ **Q7 — The skeleton, ours.** ➡️ 00 Cover and Contents · 01 Brand · 02 Marks · 03 Color ·
04 Gradient · 05 Typography · 06 Voice (migrates from v1; the depth benchmark) · 07 Imagery ·
08 Iconography · 09 Motion · 10 Layout and composition · 11 Co-branding · 12 Applications ·
13 Brand → Product · 14 Assets and governance. Gallery goes (Applications is the gallery);
Accessibility folds into Color and Typography plus a principle page in Brand; Data viz is out.
Page lists per chapter come in a later round, with `audit.md` and `references.md` in hand.

❓ **Q8 — Audentra beside the institution.** ➡️ "Host leads, Audentra signs." On a surface the
institution owns, Audentra is a monochrome attribution (ink or white), fixed size, in the foot —
never paired with the institution's mark. Side-by-side lockups only outside the product: equal
height, hairline separator, host first. Staff: the mark in the chrome, as decided. Plus a page "For
the client's brand office". ADR 0009.

❓ **Q9 — "Proposed" becomes decided.** ➡️ Decide now, digital-first: minimums in px (screen) and
mm (print); Pantone "nearest match, verify on press". The "proposed" labels leave the book.

❓ **Q10 — Photography.** ➡️ Stock from Unsplash against a written direction, 6–9 images,
provenance in `SOURCES.md`, labelled "direction examples, not licensed brand assets". Never a
generated face.

❓ **Q11 — The Brand chapter's content.** ➡️ Drafted from what exists (the "Close, not cool" voice,
the US higher-ed stance, the principles in `docs/agents/design-workflow.md`, v1's strategy pages
04–11), approved by Marco.

❓ **Q12 — Where brand terms live.** ➡️ A second context: `docs/brand/CONTEXT.md`, with
`CONTEXT-MAP.md` at the root. The student glossary does not learn what a clear space is.

❓ **Q13 — The visual reference for the book's own pages.** ➡️ `#/styleguide` + the approved
onboarding surface (ENR-163) + the *Audentra — Design System* Figma file. The staff board is a
sibling, not a source.

## Round 2 — settled (Marco took every recommendation)

❓ **Q14 — The dot texture.** ➡️ Out. It was agency-era chrome and never specified; the gradient is
the brand surface, and the product's language is paper and flat. If it ever returns, it returns with
a spec page.

❓ **Q15 — A stacked (vertical) lockup.** ➡️ There is none. In square formats the Symbol stands
alone. Fewer marks, stronger brand; drawing a new logo form is identity work, not guideline work.
Reversible.

❓ **Q16 — The gradient's construction.** ➡️ Settled by prototype, not by talk: a scratch page in
the Figma file with three 1920×1080 variants, each under the White master and a headline —
(A) linear diagonal Purple → Blue → Teal, equal stops; (B) linear, Purple holding ~60%, Blue and
Teal compressed at the end; (C) B over Navy, the deep form. Marco picks A or B; C follows the pick.
Recommendation on record: B (+ C) — the gradient of a brand that is purple, not "another
purple-teal gradient".

❓ **Q17 — Applications: the real thing.** ➡️ The AI-looking rasters go. Applications shows the real
product (portal at 1440, onboarding, the staff board) and pieces rebuilt in our language. In scope:
product UI; email signature plus one transactional-email frame; a slides template (cover and content
page); social (LinkedIn banner, square tile, profile); business card and stationery (v1 has them,
rebuilt). Out of v2: event banner/booth, video end card, merch (no real asset exists; merch only
with a real photo). Nothing generated by AI on any page.

❓ **Q18 — The attribution's form.** ➡️ As today: the Symbol in one colour at the cap height of the
text, the name *typeset* in the host surface's own type, "Powered by" in the surface's secondary
text colour. Not the drawn wordmark — inside a host surface the attribution behaves like text.

❓ **Q19 — Purple, brand vs product.** ➡️ Keep both and document the map in chapter 13: "Product
accent = `#6854D9`, Purple tuned for UI" (the product ramp was tuned for contrast). The product's
`--teal-500 #1A6984` is named as *not* the brand Teal. Realigning tokens would be a product card,
never the book.

❓ **Q20 — The book's canvases.** ➡️ Light (paper) pages by default; Navy for chapter covers; the
gradient on the cover, the closer and a few heroes. The book practises the proportion it teaches.

❓ **Q21 — Photography direction.** ➡️ The client's world leads — a US campus, students, staff in
their offices, candid, natural light — with the product's world second. Territories: campus, the
admissions office, the student's arrival. Never a generated screen, never a generated face.

❓ **Q22 — Motion.** ➡️ Product motion only in v2: the durations and ease from the tokens, two
principles, examples. No brand motion (Symbol animation, moving gradient) — no asset exists; the
chapter says so and marks the door.

Decision taken without asking, because it follows from "in our language": the book's icons are
Phosphor, the vendored set, weights per ADR 0004; v1's 48 Lucide-style icons leave.

### The gradient prototype (Q16), built 2026-08-22

Page *Prototype — gradient* (`61:2`) in the Figma file, four 1920×1080 frames, each with the White
master (`20:31` at 0.36) top-left, a Geist Bold 104px headline and a caption bottom-left, and the
variant named top-right. All diagonal, top-left → bottom-right (`gradientTransform`
`[[0.5,0.5,0],[-0.5,0.5,0.5]]`):

| Frame | Id | Stops |
|---|---|---|
| A | `61:3` | Purple 0 · Blue 0.5 · Teal 1 — equal |
| B | `61:5` | Purple 0 · Purple 0.55 · Blue 0.8 · Teal 1 — Purple-led |
| C | `61:7` | Navy 0 · Navy 0.18 · Purple 0.55 · Blue 0.82 · Teal 1 — deep |
| B′ | `61:1462` | Purple 0 · Purple 0.42 · Blue 0.72 · Teal 1 — Purple-led, Teal given room |

Read at 0.4 scale: A is blue in the middle and reads generic; B is the purple brand with a blue
corner and almost no teal; B′ keeps Purple leading and lets Teal actually arrive; C is B rising out
of Navy and works as the dark form. Recommendation: **B′ as the gradient, C as its deep form**, A and
B discarded. Awaiting Marco's pick.

## Round 3 — settled (Marco took every recommendation; the grill is closed)

`references.md` landed first: ~60 primary pages across 22 brands and 11 US universities. It changed
no earlier decision — Geist-for-everything has precedent (Vercel, IBM/Plex, GitHub/Mona Sans) — and
it set the bar for depth: numbers on the page (clear space in a unit of the mark, minimums in px and
inches, approved-pair matrices with contrast), and the warning that universities default to *no*
vendor mark (Michigan, Harvard, Arizona). Instructure's partner lockup is the closest analogue.

**Gradient pick (Q16).** ➡️ **B′** is the brand gradient (Purple 0 · Purple 0.42 · Blue 0.72 ·
Teal 1, diagonal top-left → bottom-right); **C rebuilt from B′** is the deep form (Navy 0 · Navy
0.15 · Purple 0.42 · Blue 0.72 · Teal 1). A and B discarded; frames renamed on the prototype page.

❓ **Q23 — Is the attribution removable?** ➡️ Default on, removable by agreement with the client;
the book says so and nothing else about the product changes. ADR 0009 amended.

❓ **Q24 — Lockup geometry outside the product.** ➡️ Instructure adapted, relative to the mark: a
divider line whose weight is 1/20 of the Symbol's height, Navy or white; a gap on each side equal to
the Symbol's width; equal optical height; host first; Audentra always as the full Logo, never the
Symbol alone; never a merged mark.

❓ **Q25 — Minimums, decided.** ➡️ Primary logo 200 px / 2 in; Logo 120 px / 1.25 in; Symbol alone
16 px / 0.25 in (the favicon is the floor that exists); the attribution draws the Symbol at the
text's cap height, never below 12 px — a named exception. Pantone 2097 C / 2728 C / 3252 C / 282 C
enter as "nearest match, verify on press"; "(proposed)" leaves the book.

❓ **Q26 — Governance facts.** ➡️ The document code keeps v1's scheme with `-v2` (frame 57's own
rule). **Still owed by Marco**: the legal entity for the trademark line and the brand contact /
approver. The spec carries `[confirm: legal entity]` and `[confirm: brand contact]` until they land.

❓ **Q27 — The page map.** ➡️ Adopted as proposed: 114 frames in 15 chapters (00–14); see the
conversation of 2026-08-22 and, once written, `spec.md`, which is the map's home. If it must shrink,
the least painful cuts are Layout (10) folded into Applications and Misuse II in Marks (~105).

## Closed

The frontier is empty. Next: `/to-spec` → `spec.md` beside this file; then `/to-tickets` on the
ENR board, one ticket per chapter; then `/implement` per ticket, `/clear` between.
