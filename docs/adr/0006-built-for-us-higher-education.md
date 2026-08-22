# 0006. Audentra is built for US higher education, and the US campus standard binds by default

Date: 2026-08-22
Status: accepted

## Context

The company is American and its customers are American colleges and universities. The product's own
site sells one journey — deposit → financial aid → verification → student accounts → housing →
orientation → enrolled — and every word on it is the word a US campus uses: bursar, res life,
student affairs, yield, verification. It never says "US", because to its audience that goes without
saying.

This repo said "an enrollment platform for educational institutions" and nothing more. The one
document that stated *a student portal for a US university* was an audit delivered on 2026-08-21
(`aster-ux-writing-spec.md`) and consumed as a single card, so the fact did not survive into any
file an agent reads at the start of a session. The result was a pattern: screens were written from a
generic, faintly British default and corrected after the fact — `catalogue`, `1 September`,
"On the record" (a legal phrase in US English), `Student Health Office`, a registration that opens
on Sep 1 for a student who deposits on Nov 16 and moves in on Jan 12. On 2026-08-22 the feedback
arrived on a call: the product has to be built *for* US universities — in how it conducts, names
and times things, not only in what it says. Marco asked that this be made binding.

## Decision

**The US campus standard wins by default, and the product departs from it only in experience,
never in substance.** Concretely:

- The standard is written down, sourced, in `docs/domain/us-enrollment.md` — the journey and its
  order, the offices and what each decides, the vocabulary, the regulatory frame (FERPA, Title IV
  verification, ADA/Section 504, state immunization law), the way a campus addresses an admitted
  student, US English, US dates and money. What the sample institution has decided for itself —
  type, place, calendar, offices, persona, today's date — is `docs/domain/aster.md` (ADR 0007).
- In **vocabulary, calendar, what an office does and what the law requires**, the standard is not a
  preference. A word in `CONTEXT.md` that a US campus would not use with its students is a defect;
  a step due on a date no US campus would set is a defect; a portal that lifts a hold on its own is
  a defect. None of these is a matter of taste, and none needs a conversation to fix.
- The product may depart from the standard in **experience** — how the checklist is ordered, what
  motivates the student, what an assistant does — and **each departure is an ADR that names it**,
  so that no future agent removes it as un-American and no future agent quietly inherits it as the
  norm. Today the one such departure is the points and momentum mechanic on My Enrollment (no US
  campus scores a checklist); it is named here, kept, and the next one gets its own number.
- `CLAUDE.md` says this in its first line and carries one pointer with a trigger: *before naming an
  office, a step, a deadline, a date or the order of steps, read the two domain docs*. The spec
  template in `docs/agents/design-workflow.md` gains a **Domain** section so the convention is named
  before the layout is drawn.

## Considered options

- *The product always wins where it is a differentiator.* Rejected: it is how the generic default
  got in — every invented behaviour can be called a differentiator after the fact.
- *The standard always wins.* Rejected: it would delete the points mechanic and forbid the next
  idea. The trade-off is the ADR-per-departure rule above.

## Consequences

- The prototype's data moves onto a coherent US calendar; that is ADR 0007 and a card of its own.
- `CONTEXT.md` is re-read term by term against `docs/domain/us-enrollment.md` when the research lands;
  the words that differ change, and the file says so where they do.
- `README.md` stops calling the sample institution Harvard.
- An agent that finds itself choosing between "what a US campus does" and "what looks better" has
  already been told the answer.
