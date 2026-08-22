# 0015. The hex is the authority; spot is how the brand prints; process is an approximation that is named as one

Date: 2026-08-22
Status: accepted

## Context

The v3 book publishes Hex, RGB, CMYK and Pantone on all four colour pages. Producing those numbers
honestly turned up a fact the brand had never checked: **half the palette is outside the CMYK
gamut, and the colour that names the brand is the worst of it.**

Measured with real ICC transforms (littleCMS, sRGB IEC61966-2.1 → U.S. Web Coated (SWOP) v2,
relative colorimetric with black point compensation) — full method and code in
`.scratch/brand-guidelines/research-v3/color-print-and-contrast.md`:

| Colour | Round-trip ΔE00 | What process printing actually gives |
| --- | --- | --- |
| Audentra Purple `#6A38FF` | **13.83** | `rgb(97,88,166)` — a dull grey-violet |
| Royal Blue `#1E5BFF` | **9.77** | `rgb(69,99,174)` |
| Audentra Teal `#02CDC7` | 4.27 | holds |
| Deep Navy `#0A1F44` | ≤1.5 | holds |

ΔE00 above roughly 5 is a different colour to an ordinary observer. And the purple has no good spot
match either: against Pantone's own Lab data for 1,365 Solid Coated inks, the nearest is 266 C at
ΔE00 **9.2**.

The published precedent converges (CIBSE, Penn State, ASU, UCLA, University of Iowa): name the spot
ink as the authority and CMYK as an approximation, say out loud that the process build is duller,
give the escalation to spot, and publish a different achievable value per substrate rather than one
value everyone misses. Iowa is the fully worked case — PMS 116 C on paper, PMS 123 on garments,
Madeira 910-1069 in thread.

## Decision

**The hex value is the brand colour.** Every other space is a rendering of it, and the book ranks
them:

1. **Screen** — the hex. Authoritative, no conversion, no caveat.
2. **Spot** — the named Pantone, where a piece can afford an extra ink. This is how Audentra
   Purple and Royal Blue print correctly, and the only way they do.
3. **Process** — the published SWOP v2 build. Correct for the teal, the navy, the neutrals and the
   alert colours; **an approximation for the purple and the blue, and the book says so on the
   page.**

**The escalation rule:** on a printed piece where the purple carries the brand, print it as a spot.
Where that is not possible, the piece is Navy and White and the purple stays out of it — a duller
purple is worse than no purple, because it reads as a printing fault rather than as a decision.

The CMYK numbers are published with the condition that produced them named beside them: sRGB
IEC61966-2.1 → U.S. Web Coated (SWOP) v2, relative colorimetric with black point compensation. No
book in the sixteen surveyed does this; it is a deliberate improvement, and it is what makes the
numbers reproducible instead of folkloric.

Every Pantone number in the book is a **proposal derived from measured Lab data, to be confirmed
against a physical swatch book and a press proof** before any spot job runs. Two in particular are
flagged as uncertain — 7480 C (Success) and 326 C (Teal 700) sit in the cyan/green region where
Pantone's own editions disagree by more than 5 ΔE.

The 300 and 100 tint steps of Purple and Blue get **no Pantone at all** and are marked
digital-and-process only: their parent ink is already a poor match, and a tint of a poor match is a
worse one.

## Consequences

- The four colour pages carry a reproduction hierarchy, not just a value list.
- Chapter 12 (Gallery) inherits it: on merchandise the mark is one colour — the White master or the
  Navy master — so the purple's gamut problem never reaches a garment.
- ADR 0012 is the companion rule: the gradient, built from the two colours that fail in process,
  is a screen surface.
- If Audentra ever commissions a print-first piece at volume, the open question this ADR does not
  answer is whether to designate a second, achievable print purple. UCLA's precedent allows it; the
  cost is a second purple in the world, and the book does not take it today.
