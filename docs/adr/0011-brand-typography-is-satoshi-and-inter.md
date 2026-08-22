# 0011. Brand typography is Satoshi for headlines and Inter for text; the product keeps Geist; no monospace face

Date: 2026-08-22
Status: accepted (supersedes ADR 0008; amended 2026-08-22, see *Amendment*)

## Context

ADR 0008, taken earlier the same day, made Geist the one typeface of brand and product, on the
argument that the identity would be carried by the Symbol, the colours, and the gradient. Marco
reversed it while chapter 05 of the v2 book was being built: the brand's typography is the one the
agency's first book established — Satoshi for headings, Inter for text — and the brand does not use
a monospace face for anything; values and code are Inter with their own formatting.

The product is not part of that decision. It ships Geist (`src/styles/tokens.css`, the styleguide,
the design-system Figma file), and changing a product typeface is a product card, not a brand-book
page. So the brand lands on the split that Atlassian, UCLA, and Penn State document in the open
(see `.scratch/brand-guidelines/references.md`, deep answer a): one face for the brand's voice,
another inside the product, with the boundary written down where people look.

## Decision

- **Satoshi Bold** for Display, H1, H2, and H3 on every brand surface: covers, brand moments,
  decks, documents, the site. Never below 20 px, never as running text, never inside the product UI.
- **Satoshi Medium** for a small heading in a document, from 14 px up to but not including 20 px.
  A document only — not a website, not an interface. It is a heading weight, never running text.
- **Inter** for everything the brand explains: Lead, Body, Caption, Label, page numbers, and
  values, in Regular, Medium, and Semi Bold.
- **No monospace typeface anywhere in the brand.** Values and code are Inter Medium with +1%
  tracking and tabular figures (`font-variant-numeric: tabular-nums`), on a tinted field when they
  are a block. Roboto Mono, which the first book carried, is retired with the rest.
- **Geist stays the product's typeface** (sans and mono), by the product's own decision. The book
  documents the split in chapters 05 and 13 and maps it; it does not redefine either side.

## Consequences

- The Figma book's text styles are `Book/*`; headings bind their family to the `font/heading`
  variable, text to `font/body`, values to `font/value`. The MCP runtime that builds the file
  cannot load Satoshi (Google Fonts only), so `font/heading` reads "Inter" until someone with the
  font installed sets it to "Satoshi" in the Variables panel: one value, the whole book follows.
- ADR 0008 is superseded, not deleted: it records why one face looked right for a day and what
  the cost of the split is (a second face to license, load, and explain).
- The docs/brand glossary's typography entries change accordingly.

## Amendment, 2026-08-22 — two weights, and the boundary

Built for the v3 book, which had to state the weight rule precisely enough to typeset from.

**Satoshi is used in exactly two weights.** Satoshi **Bold** at 20 px and above; Satoshi **Medium**
from 14 px up to, but not including, 20 px, **and only in a document**. Below 14 px, and for every
line of running text at any size, the face is Inter.

The scope of Medium is *a small heading in a document* — a subhead in a Word file, a slide's
kicker, a label above a table. It is not a licence to set body copy in Satoshi. The body of every
brand surface, this book included, is Inter.

**Satoshi Light, Regular and Black are not used.** The v2 book's Weights page listed Medium as
unused on one card and authorised it as an exception on the card beside it; that contradiction is
what this amendment removes. Semi Bold is not a question: the brand uses two Satoshi weights and
these are they.

The tagline set as type follows this rule and therefore never appears in Satoshi on a surface that
renders on someone else's machine — see ADR 0013.

## Amendment, 2026-08-22 (later) — the product inherits the brand

Marco's review of the v3 book set the direction the book had been missing: **the brand book is the
rule the whole repository follows, not a description of the product as it is today.** The v3 book
had described the product's typefaces, its tuned purple and its `--teal-500` as "three deliberate
differences"; that was the product leading the brand, and it is reversed.

- **The product adopts the brand's typography.** Inter for every UI string, value and label;
  Satoshi Bold where the product speaks large — a hero, an empty state, onboarding's first screen.
  The "never inside the product UI" clause of the Decision above is withdrawn; the rest of the rule
  (weights, the 20 px boundary, no monospace) applies to the product as it does to every surface.
- **Geist is retired** from `src/styles/tokens.css` and the styleguide when the card that
  implements this lands. Until then the product is simply out of date, the way any surface is
  between an edition of the book and its adoption.
- **The product's color tokens carry the brand's values** — `--purple` is `#6A38FF`, `--teal` is
  `#02CDC7` — and the product's own decisions (components and states, density, spacing, radius,
  motion) remain its own. Chapter 10 of the v3 book, pages 51–52, is the map.

The title of this ADR is left as written so the history reads; the decision it records about the
product is superseded by this amendment.
