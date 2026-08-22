# 0011. Brand typography is Satoshi for headlines and Inter for text; the product keeps Geist; no monospace face

Date: 2026-08-22
Status: accepted (supersedes ADR 0008)

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
  decks, documents, the site. Never below 20 px (Satoshi Medium for a small heading in a document),
  never as running text, never inside the product UI.
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
