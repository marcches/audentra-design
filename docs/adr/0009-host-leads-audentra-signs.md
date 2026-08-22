# 0009. Beside a client institution's brand, the host leads and Audentra signs

Date: 2026-08-22
Status: accepted

## Context

Audentra's product is worn by the institution that licenses it: the student portal is Aster's, the
student hears Aster or "the portal" and never the vendor (the UX writing spec of 2026-08-21 removed
Audentra as an actor from every student-facing string). Audentra appears in the product in exactly
two ways — "Powered by Audentra" (the Symbol beside the name, 13px, at the foot of the sidebar and
of the onboarding rail) and a demo line on the page shell — and the staff visual-direction board of
2026-08-21 decided that staff tools wear Audentra in the chrome and show Aster only as data.

The brand book v2 has to turn that practice into a rule, because a client's brand office will ask,
and because the alternatives are tempting: a visible Audentra × Institution lockup inside the portal
sells the vendor at the cost of confusing the student about who is speaking; no attribution at all
gives up a credit the business wants.

## Decision

**Host leads, Audentra signs.** On any surface the institution owns — its student portal, its
login and onboarding, the emails the portal sends — Audentra is an *attribution*: the Symbol in one
colour (ink on light, white on dark) beside the name set in the surface's own type, small, in the
foot. It never sits beside the institution's mark as a pair, never appears in full colour, teal or
gradient there, and never speaks. A side-by-side *lockup* of the two marks exists only outside the
product — joint material, events, a client logo wall on Audentra's own surfaces — with one rule:
equal optical height, a divider line scaled to the mark, the host first. Staff tools Audentra wears
its own chrome.

The attribution is the **default, and it is removable by agreement**: several US universities
(Michigan, Harvard, Arizona — see `.scratch/brand-guidelines/references.md`) forbid a vendor's mark
beside their own as a matter of policy, and Slate, the admissions CRM most of them run, disappears
behind the institution entirely. A client that asks has it removed, and nothing else about the
product changes. Pretending the credit is non-negotiable loses the client with a brand rule; having
no default gives up the credit with everyone else.

## Consequences

- The brand book gets a Co-branding chapter and a page written for the client's brand office: what
  they may change (nothing on the attribution; the accent, if it is ever skinnable) and what they
  may not.
- `AudentraMark`'s `mono` form is the attribution's Symbol; the full-colour Symbol stays where it is
  today and nowhere new inside the product.
- The product accent (purple) is not a brand signal to a student; it is the product's colour, and it
  may be skinned by a host without touching the brand.
