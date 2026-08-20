Jira: ENR-184
Status: in-development
Built: 2026-08-20
Labels: design, persona-student, screen-profile, wave-w2
Jam: (none)

# Student · Profile

Serves ENR-179 (*Tell what is mine to change from what is not*), under ENR-190. The seven record
categories come from ENR-144.

## 1. What this screen answers

*Which of this is mine to change, who changes the rest, and who else can see it?*

## 2. Layout

Five slots of `PageShell`, in the shell's order. Mobile first: one column, the rail stacks under the
main column at 1060px, the field row folds its value under its label at 620px.

| Slot | Content | Reference |
| --- | --- | --- |
| `hero` | The band. Eyebrow is the record's provenance in mono: `Profile · Version 4 · Updated Aug 12, 2026` — AC 6 in the most-read line on the page. | — |
| `summary` | The figure: **7 of 16 details are yours to change**, with the avatar. Beside it, the person who owns the rest: `AdvisorBar` carrying the Assistant Registrar. | [Mercury](https://mobbin.com/screens/1403417f-b482-40ef-aeec-80b2f63ee800) |
| `notice` | `.record-note` — what `Yours` means, what an office row means, and who holds the official copy. The legend, said once. | — |
| `tabs` | None. Profile is not a group. | — |
| `rail` | Anchor: **who can see your record** (the standing). Then **ending your session** (AC 7). Then **the offices that hold the rest**. | [GitHub](https://mobbin.com/screens/f33c072d-07fb-4e8b-8198-2e07c436e914), [Disney+](https://mobbin.com/screens/4d1ef8ae-f245-446c-84d9-de9998be811e) |

### Main column — four cards

1. **You** — preferred name, pronouns, campus interests (yours); legal name, date of birth, student
   ID (Registrar). Grouped by subject, not by owner: splitting preferred name from legal name into
   two cards would separate the two halves of one fact ([Coinbase](https://mobbin.com/screens/273d313f-fb94-4501-a3dc-750c852b7394)).
2. **How Aster reaches you** — preferred channel (AC 4, a real choice, applied at once); Aster email
   (IT Service Desk); personal email (verified); mobile (verification pending); term-time address
   (not verified); home address (verified).
3. **Who can see your record** — the family authorization from onboarding: the person, their purpose,
   the seven categories with the granted ones checked, the end date, and revoke
   ([Docusign](https://mobbin.com/screens/9b886e71-78a6-4257-8115-8467ed47bf32)).
4. **What lives somewhere else** — routes to My Documents, My Classrooms, My Financials. This is the
   replacement for the academic-documents panel ENR-190 names as a divergence: a route, not a copy.

### The row — how ownership is drawn

*Revised after Marco's review of the first build: every row had the same weight, the same pill and
the same grey sentence, so the card read as one wall and nothing said where to look. The rules that
came out of it are now `docs/agents/design-workflow.md` §4 “Hierarchy inside a card”.*

Each card runs in two labelled runs — **Yours to change**, then **Aster's record**, which names its
office. The boundary between the runs draws the distinction the page is about; a `Yours` pill on
eight rows out of twelve only added texture to all twelve.

| | Yours | An office's |
| --- | --- | --- |
| Run it sits in | under `Yours to change` | under `Aster's record · Office of the Registrar` |
| Label | muted, small | muted, small, with a lock glyph |
| Value — the row's one anchor | 15px ink | 14px, lighter: read-only reads read-only before the lock is seen |
| Affordance | `Change` / `Add` | `Ask the Registrar` — AC 2, on **every** owned row |

Verification is a pill beside the **label**, never beside the value, so a pending number is a field
in a state rather than a value that looks wrong ([Airwallex](https://mobbin.com/screens/8db8dc97-bef3-4eb5-9da1-280231b4b768),
[Square](https://mobbin.com/screens/2b6f3ac5-f88c-4e75-92b4-d86e25f5ca9d)). A row that is **waiting on
the student** — the pending number, the unconfirmed address — takes a faint amber wash. That wash is
the only colour spent inside these cards, so it can only mean "this row is asking you for something".

A note under a value exists only where it changes what the student does: what a change costs, what
expires tonight, what the law needs. The rows that ask something are therefore taller than the rows
that only state a fact, and the card gets its rhythm from meaning rather than from a template.

## 3. States

| State | What it shows |
| --- | --- |
| `loading` | `PageSkeleton`, from the frame. |
| `ready` | The record above. One number pending verification, one address unverified, one active authorization. |
| `empty` | *New record* — the day Aster opened it. Only what the application gave: legal name, date of birth, student ID, Aster email. Every field the student owns reads `Not set yet` and offers `Add`; the permission card says only she can see the record; the eyebrow reads version 1. |
| `partial` | The record loaded; the verification service and the permissions service did not. Every pill becomes `Not checked` — never `Verified` — and the permission card carries a warn `StateCard`. Nothing claims a state nobody could read. |
| `error` | `PageError`, from the frame. |

Selectable from the `Concept preview` pill as `PROFILE_STATES`, so a Jam can link to the exact state.

## 4. Interactions

- **Change / Add** on a student-owned row → toast. Nothing is written; this is the concept base.
- **Preferred channel** → a `.choice-panel` opens in the row. Choosing applies at once and the row's
  note restates what the institution will now do. AC 4 as behaviour, not as a label.
- **Ask the office** on an owned row → toast naming the office. Present on every owned row (AC 2).
- **Resend code** on the pending number, **Confirm address** on the unverified address → toast.
- **A category checkbox** in a grant → takes effect immediately, toast says what the person can no
  longer see. **Revoke all access** → the grant is gone at once and the card falls to its empty state
  (ENR-144: revocation takes effect immediately). No confirm step stands between a student and
  withdrawing consent.
- **Sign out** → toast. The reason is stated above the button, not after it.
- What the page must never do: offer an edit control on a field an office owns; show a pending or
  unknown verification as confirmed; grant a category the student did not tick; merge the emergency
  contact into the authorization control.

## 5. Two things this card touched outside the page

- **`.state-card.warn`** had no styling: `StateCard` has always accepted the variant and rendered it
  exactly like `empty`, so "we couldn't check this" looked like "there is nothing here". It is amber
  now. My Classrooms' unreadable-transcript card inherits the fix.
- **The seam AC 3 leaves open.** The sidebar, the topbar, the profile band and the greeting read the
  preferred name from the record. The other sections' hero copy is authored text in `navigation.js`
  with "Maya" written into it, so in the `New record` state — the only state where she has no
  preferred name — those bands still say Maya while the rest of the portal says Amelia. Fixing it
  means templating copy that belongs to other cards, so it is recorded here rather than done here.

## 6. Data

New `src/data-profile.js`: `record` (preferred name, legal name, id, version, updated), `offices`,
`fieldGroups`, `RECORD_CATEGORIES` (the seven from ENR-144), `grants`, `session`, `elsewhere`.
`src/lib/profile-helpers.js` derives the view per state and the counts. `Sidebar` and `Topbar` read
the display name and initials from `record` instead of hard-coding them — AC 3 as structure.

## 7. Out of scope (from ENR-190)

Changing legal identity or academic records. Capturing family authorization, which happens in
onboarding — this screen shows, changes and revokes what onboarding captured, and never adds a person.
External email and text delivery. A device manager or session history.

## 8. Done when

- [x] Controlled and owned fields are labelled and visually distinguished (AC 1)
- [x] Every owned field offers the route to the office that can change it (AC 2)
- [x] Preferred name is used in the sidebar, the topbar, the band and the greeting; the legal name
      appears only where it is the legal name (AC 3)
- [x] The preferred channel is a working choice and the page states what it governs (AC 4)
- [x] The pending number and the unverified address are labelled and are not shown as confirmed (AC 5)
- [x] Version and last-changed date are on the page (AC 6)
- [x] Sign out is on the page and the shared-device reason is stated (AC 7)
- [x] The onboarding authorization is visible, its categories are changeable and revocation is
      immediate (AC 8)
- [x] Five states render; `npm run build` clean; checked at 1600 / 820 / 390; every row action is
      reachable by keyboard in reading order, each with its own label, and the focus ring shows
