# 0012. The brand gradient is a screen surface; nothing the brand commissions in physical form carries it

Date: 2026-08-22
Status: accepted

## Context

The brand gradient — Purple `#6A38FF` at 0 and 0.42, Royal Blue `#1E5BFF` at 0.72, Audentra Teal
`#02CDC7` at 1, corner to corner — was built for the v2 book (ADR-less until now, decided in
`.scratch/brand-guidelines/grill.md` Q16) and immediately began appearing on things that are not
screens: a business card, a letterhead, a retractable banner. Nobody had written down that it
should not, because in practice nobody had printed one.

Printing it would have gone badly, and the print research done for v3 says why in numbers
(`.scratch/brand-guidelines/research-v3/color-print-and-contrast.md`). Under U.S. Web Coated
(SWOP) v2, `#6A38FF` lands at `rgb(97,88,166)` — ΔE00 **13.8**, a dull grey-violet — and `#1E5BFF`
at ΔE00 **9.8**. A gradient built from two colours that each shift that far, plus a teal that holds,
does not degrade evenly: it degrades into a different object. On fabric it is worse, because
embroidery has no gradient at all and screen print takes one to three flat inks.

Apple's *Branded Merchandise Identity Guidelines* is the only first-party precedent found for the
rule ("Do not use a shirt with a pattern or color gradient"); IBM Event Design is the counter-case,
treating layered gradients as a legitimate booth *material*.

## Decision

**The brand gradient is a screen surface. Nothing the brand commissions in physical form carries
it.** A deck is a screen surface even when someone prints it.

- It lives on: the book's cover and closer, a web banner or hero, a social tile, a deck cover, an
  end card, a virtual background.
- It never fills: type, the Symbol, an icon, a rule, a small element, or any decorated object.
- On merchandise and stationery the field is flat — Navy or Purple — or the raw material.
- The one carve-out, taken deliberately after IBM's precedent: **an environment may carry a
  gradient printed surface** (a tension-fabric backdrop, a step-and-repeat field). An *object* may
  not. The line is decoration of a thing versus the surface of a room.

## Consequences

- Chapter 09 (Card and stationery) and chapter 12 (Gallery) state it; the gradient page in
  chapter 04 carries the sentence itself.
- "Banner or hero" becomes "Web banner or hero" everywhere: a retractable banner is physical and
  takes a flat field.
- The rule is stated once and pointed at from the other places, per the deduplication discipline of
  the v3 rebuild.
