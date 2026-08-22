# 0008. One typeface — Geist — for the brand and the product; Satoshi is retired

Date: 2026-08-22
Status: accepted

## Context

The first brand book (Figma, *Audentra Brand Guidelines*, 62 frames mirroring an agency deck)
named Satoshi as the heading face and Inter as the body face. Satoshi was never rendered: the
Figma runtime the book is built with loads only Google Fonts, so every heading — and the Satoshi
specimen itself — is set in Inter behind a `font/heading` variable waiting for a swap. The product,
meanwhile, ships Geist and Geist Mono (`src/styles/tokens.css`, the styleguide, the *Audentra —
Design System* Figma file), and Geist is what the whole approved visual language is set in.

On 2026-08-22 Marco reframed the brand book: the agency deck was only a starting point; v2 is
Audentra's own, written in the visual language the product has been building, leaning on the three
brand colours and a brand gradient. Under that brief a second typeface has to earn its place, and
it could not: the identity is to be carried by the Symbol, the three colours and the gradient, not
by a display face.

Three options were on the table. **Geist for everything** — one face, already in the product,
loadable in Figma, open-licensed. **Geist in the product plus a display face for brand headlines
only** — the identity-from-type route, at the price of a second face to license, load, govern and
explain. **Satoshi everywhere** — which reverses the product against its own brief.

## Decision

Geist is the one typeface of Audentra — brand and product, headline and body; Geist Mono for code
and specimens. Satoshi is retired. The brand book's Typography chapter states the rationale and the
scale, and its own pages are set in Geist.

## Consequences

- Geist is Vercel's typeface. A brand piece set in it must not rely on type for distinctiveness —
  the Symbol, Purple-led colour and the gradient do that work, and the book's Brand moments are
  designed accordingly.
- If a display face is ever wanted, it is for headlines only and it supersedes this ADR; it does
  not creep in as "just the cover".
- The `font/heading` and `font/body` variables in the book resolve to Geist; the `font/mono` one
  to Geist Mono. Inter leaves the file.
