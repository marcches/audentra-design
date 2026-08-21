# Housing is a section of its own, not a leaf of My Campus Life

[ENR-207](https://audentra.atlassian.net/browse/ENR-207) hangs off the épico
[ENR-173](https://audentra.atlassian.net/browse/ENR-173) — *My Classrooms and My Campus Life* — so
the obvious reading is that Housing is a third leaf beside Events and Clubs. It is not. Housing is a
top-level destination, last in the sidebar, with its own hero and no tab row. Anyone who finds the
card under that épico will wonder why, and this is the answer.

The reason is a rule the page shell already enforces: **everything above the tab row is true of the
whole group, and everything below it is what the tab switches.** That rule was not invented for
Housing — it was written after the Jam of 2026-08-20, when the balance panel on My Financials ended
up sitting on top of an escalation strip, and it is what ENR-189 leans on so a required session
cannot hide behind a tab nobody opened.

Put Housing under `campus` and the rule turns against us. The response deadline, the housing plan and
its outstanding state are all true of Housing and false of Events and Clubs, so they would either sit
above the tabs and lie about two leaves, or sit below them and become the obligation that hides
behind an unopened tab. There is no third position. And the group's hero says *"Find your people,
Maya"* over a section whose defining property, in its own spec, is that it asks nothing of the
student — while Housing asks two things and has a date.

## Considered options

- **A third leaf of `campus`: Events, Clubs, Housing.** Rejected for the reason above. The cheapest
  version — put the deadline below the tabs — is the one ENR-189 explicitly forbids.
- **A group of its own, `housing`, with leaves.** Rejected. A group heading that holds one leaf costs
  a click and buys nothing; `navigation.js` already records that judgement where the Academic group
  was collapsed into My Classrooms, and repeating the mistake here would be repeating it knowingly.
- **Inside My Enrollment, as a richer drawer.** Rejected, and this is the one that was actually
  running: the plan question lived in `TaskDrawer` as the file's only `kind: 'form'`. A drawer can
  hold one question. It cannot hold a published catalogue of eight residences, a ranked shortlist
  with its own save behaviour, and a state that changes on a date — and My Enrollment's promise is
  the order of what to do next, not the place where a subject lives.

## Consequences

Housing sits last in the sidebar, after the `campus` group, because it belongs to the block about a
life at Aster rather than to the academic or the money block. It carries **no navigation badge**: the
obligation is already counted once as an open step in My Enrollment, and the same obligation counted
twice on one sidebar is a discrepancy the student has no way to resolve.

Because it is not a group, Housing needs no group shell — the construction `FinancialsPage` exists to
stop leaves drifting above the tab row. If Housing ever grows a second leaf, that shell becomes
mandatory on the same day, not later.

The cost is one more top-level row in a sidebar that already carries eleven destinations. We accept
it. The alternative was a section whose deadline is either a lie about two other sections or invisible
behind a tab, and both of those are worse than a longer list.

## Amended 2026-08-21

The Jam of 2026-08-21 moved Housing up the sidebar, to sit directly after Health and Accessibility
and before the My Financials group — Laura's order, read off the recording at 1:34. "Last in the
sidebar" therefore stops being a consequence of this decision. Everything else here still holds, and
it is what the ADR is for: Housing is a destination of its own, not a leaf of My Campus Life, for the
reasons above — the position in the list was never the argument.
