# Accessibility is a section of its own, not a card inside Health

[ADR-0001](./0001-accommodation-answer-stays-in-health.md) put the question *"Would you like to talk
to Accessibility Services?"* inside Health, and ENR-208 — the story behind it — is labelled
`screen-health` and says "a student opens the Health section". The UX writing audit of 2026-08-21
asked for the opposite, and we did it: the question is a destination, `#/accessibility`, with its
own sidebar row straight after Health, its own hero, and the same card it always was. Anyone who
finds ENR-208 under `screen-health` and then finds no question on `#/health` will wonder why, and
this is the answer.

The reason is the card's own first sentence. *Aster isn't asking what your condition is, and this
page has nowhere to put it* — and yet the information architecture filed accommodations under
Health, beside an immunization record and an office called Health Services. A student reads where a
thing lives before she reads what it says. Put under Health, the question reads as a medical matter,
which is the one framing the whole section exists to refuse; the audience this portal is written
for — first-generation students, English-language learners — reads that framing first and the
disclaimer second. Moving it is what makes the sentence true.

What did **not** change is everything ADR-0001 actually decided. The answer still creates nothing
anywhere else: no help request, no appointment, no notification, no sidebar count, nothing in the
record Edward speaks from. It is still never a figure — the new page has no summary panel at all,
because *not right now* must never look like a standing. The section still has **no badge**, for
the reason ADR-0001 gave: any counter that could include the question would turn a complete answer
into a pending item. The module that holds the answer moved with it
(`src/features/accessibility/`), and nothing outside that module and `App.jsx` imports it. ADR-0001
is annotated, not retired: its title is now wrong and its substance is not.

## Considered options

- **Leave it in Health and change the copy.** Rejected. The copy already said the right thing;
  the placement contradicted it, and placement is read first.
- **A leaf under a group (Health · Accessibility as tabs).** Rejected for the rule every group
  obeys: everything above the tab row is true of the whole group. The record's deadline and gate
  are true of Health and false of Accessibility, so they would either sit above the tabs and lie,
  or hide below them. Same reasoning as [ADR-0002](./0002-housing-is-not-a-campus-life-leaf.md).
- **Its own section, after Health.** Taken. One more sidebar row, the cost ADR-0002 already
  accepted once for the same kind of reason.

## Consequences

ENR-208's scenarios name the Health section; the divergence is recorded here and in
`.scratch/ux-writing-spec/spec.md`, the way ENR-214's spec recorded its own. Onboarding still asks
the question once, in its health step — that is where the answer is first given, and the step is
about both things — and the Accessibility page is where the answer lives afterwards. If a staff
view of accommodations ever arrives (ENR-212), it inherits this section's rule, not Health's: the
record may travel, the answer may not.

## Amended 2026-08-21, later the same day

The route stays; the sidebar row does not. Marco read the Jam of 2026-08-21 as the whole list —
nobody asked for an Accessibility section in the navigation — so the destination carries
`parent: 'health'` in `navigation.js`: no row, the Health row is active while it is open, and the
way in is an `EntryCard` under the immunization record on Health, at `#/health/accessibility`. The
substance of this ADR (a page of its own, no badge, the answer reaches no other module) is untouched.

## Amended again 2026-08-21, that afternoon

The route goes too. Marco, reading the two entry cards back: *they don't open pages of their own any
more, they open the side panel — it has to follow the user flow the rest of the portal has.* He is
right, and the fault was ours for stopping halfway. The first amendment took the sidebar row away
and left the page, which produced a fourth kind of destination: a page with no navigation, reachable
from exactly one card, and addressable by a URL nothing links to. The portal already has one way of
opening what lives inside a page, and it is `Drawer`.

So `#/health/accessibility` is gone — the hash falls through to the 404 the way `#/dashboard` does —
and the entry card under the immunization record opens `AccessibilityPanel`. Accessibility is no
longer a destination at all: it is declared in `PANELS` in `navigation.js`, which carries the copy
the door needs and deliberately nothing else, because a panel has no address to land on. My
Documents made the same move on the same afternoon, under Profile.

The substance of this ADR is *still* untouched, and this is now the third surface it has survived:
the question is not a card inside Health's record, it has no badge and cannot be counted, and the
answer reaches no module but `App`. What it lost is the rail — `Usually replies in 2 days` and `Who
is on the other side` both named Accessibility Services, which the panel's own label names — and the
office eyebrow inside the card, for the same reason. What it gained is the thing ADR-0001 was
originally about: the question is now read *beside* the record it must not be mistaken for, without
being filed under it.

## Amended 2026-08-21, evening — the changes document for Health

Health got its summary panel back (the page carries two things now, so the panel summarises two),
and the brief asked for the question to be legible without opening it. So the **state of the
question** now appears in two places it did not: as the **foot** of Health's panel (*Accessibility
question: not answered · Optional. Nothing happens until you answer.* / *…: answered*) and on the
face of the door row (`NOT ANSWERED` / `ANSWERED`, with *See the question* / *See your answer*),
and once — only while the record needs nothing and the question was never answered — the page's
action band points at it (*There's one optional question left*).

What this ADR decided still holds, and these are read against it: the question is still not a
figure (it is a foot line, not the panel's standing); there is still no badge and no count — the
pill is a state, *not right now* reads `ANSWERED`, and nothing anywhere adds the question to a
number; and the band fires only for *never answered*, which `CONTEXT.md` calls the one open
condition. The answer still reaches no module but `App`. The panel it opens in is unchanged.
