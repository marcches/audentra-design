# Student portal — what is left, and the order to build it

Snapshot of the `ENR` board taken **2026-08-20**, cross-referenced against this repo. Jira holds the
state; this document is a reading of it and goes stale the moment a card moves. Re-derive with:

```
project = ENR AND labels = persona-student AND labels = design AND statusCategory != Done
```

## The set that matters

Eleven student cards carry the `design` label — those are the ones that get built here. **Seven have
landed:** ENR-167 (portal shell), ENR-164 (My Enrollment), ENR-180 (portal navigation), ENR-166 (My
Financials), ENR-188 (My Classrooms), ENR-189 (My Campus Life), ENR-181 (Edward). **Four remain.**

| Card | Screen | Serves | Jira status | In repo |
| --- | --- | --- | --- | --- |
| [ENR-165](https://audentra.atlassian.net/browse/ENR-165) | My Documents (Both) | ENR-157, ENR-158 | Prioritized | `built: false` |
| [ENR-182](https://audentra.atlassian.net/browse/ENR-182) | Help | ENR-177 | Development | `built: false` |
| [ENR-183](https://audentra.atlassian.net/browse/ENR-183) | Appointments | ENR-178 | Development | `built: false` |
| [ENR-184](https://audentra.atlassian.net/browse/ENR-184) | Profile | ENR-179 | Development | `built: false` |

Help, Appointments and Profile are the three screens of epic
[ENR-190](https://audentra.atlassian.net/browse/ENR-190). My Documents belongs to epic
[ENR-146](https://audentra.atlassian.net/browse/ENR-146).

Everything else under `persona-student` on the board is either an epic (ENR-143 to ENR-148, ENR-173,
ENR-190) or a story already covered by a design card that closed. Onboarding — epics ENR-143 and
ENR-144 with stories ENR-150 to ENR-154 — has **no design card in `ENR`** and is owned elsewhere. It
is not work for this repo.

## Order

### ~~1. ENR-181 — Edward floating control~~ — landed

Built first, as this document argued, because it touches all thirteen destinations at once. The
corner it claims is now the `--safe-bottom` token, reserved by `PageShell`'s footer and read by the
toast, so the four screens below are designed against the final frame rather than re-verified after
it. Spec: `.scratch/ENR-181-edward-floating-control/spec.md`.

The `PreviewStateMenu` reconciliation this document expected turned out to be unnecessary: the
control sits in the topbar, not in the lower-right corner. It also carried a standardization pass —
named layers, a bottom safe area, motion tokens and one shared overlay primitive in
`src/lib/overlay.js`, which the four unmounting overlays now use.

### 1. ENR-165 — My Documents

The largest new screen, and the one that unblocks the most:

- ENR-160 AC3 requires the financial document checklist to link to where the file is submitted.
  `src/components/financials/DocumentList.jsx` has no destination today.
- ENR-190 states that Profile must **route** to the documents section rather than duplicate it, so
  Documents has to exist before Profile.
- The `in review` group in My Enrollment (ENR-164) is already built and waiting for the other half.

### 2 and 3. ENR-182 (Help) and ENR-183 (Appointments) — one pass

This is the pair worth building together. Both are existing screens missing their second half, both
belong to ENR-190, and both need the same new primitives:

- a request state visible to the student that hides internal assignment — ENR-177 AC3 and ENR-178
  AC5 are the same rule written twice;
- the same failure grammar: a booking that never reached the team must not resemble one that
  succeeded, and nothing may promise a reply on a channel with no inbound side;
- the same *named accountable office* data, which does not exist in `src/data.js` yet.

Split across two passes, the status vocabulary and the office module get invented twice.

ENR-181 has landed, so ENR-176 AC3 — no answer, so offer a named route to a person — is already
wired to Tomás Okafor and Amara Nwosu. What these two cards add is the office behind them.

ENR-182 also inherits a copy change: ENR-181 took "ask" back for Edward, so the Help entry in
`src/lib/navigation.js` no longer promises "Ask Aster anything that is blocking a step". The page
should be designed around Aster's own guides and a route to a named office.

### 4. ENR-184 — Profile

Last, because it consumes the other three: it routes to Documents instead of duplicating it, routes
each institution-owned field to the office that can change it, and carries the family-permission
block with the seven record categories. Built last, every route it needs already resolves.

## Two open gaps

`src/lib/navigation.js` declares thirteen destinations. **Messages** and **My Progress** are
`built: false` and have **no design card on the board**:

- Messages appears only as `screen-messages` on the staff side (ENR-25). The student-facing behaviour
  closest to it is ENR-161, labelled `screen-dashboard`.
- My Progress is named once, in ENR-174 AC1, as a leaf of the Academic group.

After the five cards above, both stay placeholders permanently unless a card is written. Worth
deciding now whether they earn a card or leave the navigation.

## Not in this repo

Staff-side cards (ENR-20 to ENR-25 and their stories) are a different product surface. Thirty-three
cards carry the `design` label across the whole project; only the eleven `persona-student` ones are
built here.
