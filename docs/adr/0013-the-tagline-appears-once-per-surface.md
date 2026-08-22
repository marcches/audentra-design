# 0013. The tagline appears once per surface — inside the Primary logo, or set as type where the Primary logo does not fit

Date: 2026-08-22
Status: accepted

## Context

The v2 book published the rule "the tagline appears only inside the Primary logo". Three of the
book's own applications break it: the social banner, the email signature and the closer all set
*Institutional intelligence for what's next.* as type, with no Primary logo in sight.

The applications are right and the rule is wrong. A LinkedIn banner is 1584×396; a Primary logo
placed in it at a legible tagline size blows past the banner's proportions, which is the reason the
Logo without the tagline exists in the first place. The rule was written from the mark outward
instead of from the surface inward.

## Decision

**The tagline appears once per surface — either inside the Primary logo, or set as type where the
Primary logo does not fit. Never both on the same surface.**

Set as type it is **Satoshi Bold**, on a surface the brand composes: a social banner, a closer, a
deck cover, a hero.

**On a surface that renders on someone else's machine — an email signature is the only one — it is
set in that surface's own type**, because Satoshi is not installed on the reader's machine and a
substituted display face is worse than no display face. This does not weaken the rule; the tagline
still appears once, and only once.

The tagline is never rewritten, never abbreviated, and never set on the same line as the brand
promise (*Improve the work behind every enrollment outcome.*), which faces outcomes while the
tagline faces identity.

## Consequences

- Chapter 03 (Placement and the Symbol alone) carries the rule; chapters 09 (Email signature,
  Social) and the closer follow it and no longer contradict it.
- ADR 0011's typography boundary is unaffected: Satoshi Bold is 20 px and up, which every
  brand-composed surface satisfies, and the email exception avoids Satoshi entirely rather than
  setting it below its floor.
