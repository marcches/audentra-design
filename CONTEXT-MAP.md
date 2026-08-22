# Context Map

Two languages live in this repo, and they are kept apart on purpose: one is what the product says
to a student and to staff, the other is what Audentra says about itself. A student never reads the
second; the first must never learn what a *clear space* is.

## Contexts

- [Student enrollment](./CONTEXT.md) — the language the portal and the staff workspace share:
  requirements, submissions, offices, waits, holds. Started 2026-08-20.
- [Brand](./docs/brand/CONTEXT.md) — Audentra's own identity: the marks, the palette, the gradient,
  the typeface, and how the brand behaves beside a client institution's. Started 2026-08-22 with the
  Brand Guidelines v2 (`.scratch/brand-guidelines/`).

## Relationships

- **Brand → Student enrollment**: the brand appears inside the product only as an *attribution*
  ("Powered by Audentra") — the institution is the host and does the speaking (ADR 0009). The
  product's purple accent is the brand's Purple tuned for screens, not a second brand colour.
- **Student enrollment → Brand**: the product's visual language (the token scales, the flat
  surfaces, Phosphor) is the language the brand book itself is written in — the book is built to
  look like the product, not the other way round. Typography is the one deliberate split: Satoshi
  and Inter for the brand, Geist in the product (ADR 0011).
- Decisions that bind both live in `docs/adr/`.
