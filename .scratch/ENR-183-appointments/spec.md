Jira: ENR-183
Status: ready-for-agent
Labels: design, persona-student, screen-appointments, wave-w2
Jam: (none)

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-agent` is the nearest role and the card is fully specified; Jira stays authoritative.

# Appointments — a picker over published times, not a request for one

## 0. Current behaviour, confirmed

The card's scope note says the screen exists: "three conversation types, a date and time field, an
optional subject and a list with an empty state" ([ENR-190](https://audentra.atlassian.net/browse/ENR-190)).
In **this repo** it does not. `appointments` is a destination in `src/lib/navigation.js` with
`built: false`, so `App.jsx` renders `SectionPlaceholder` for it. What lands here is therefore the
changed screen described by [ENR-178](https://audentra.atlassian.net/browse/ENR-178), built once —
never the free date and time field the card is moving away from.

Two things already point at this page and must keep working:

- Edward routes to `#/appointments` with the label `Book time with them` (`src/lib/edward.js:427`).
- `Appointments` is the third row of the sidebar (`navigation.js`, `NAV`).

## 1. What this screen answers

*When can I actually talk to someone at Aster, and is the conversation really booked?*

The register change the card asks for is the whole design: **the student never proposes a time.**
They choose a conversation type, and what they get is the times the responsible team has published.
A booking either reaches that team — and says so, with the team named — or it fails, and says that
instead.

## 2. Layout

`PageShell` slots, in the order the shell fixes. Mobile is the primary case: every region is one
full-width column at 380px; only the rail moves beside the main column at the shell's breakpoint.

| Slot | Region | What it holds | Reference |
| --- | --- | --- | --- |
| `hero` | The band | Copy from `navigation.js`. The lede is the only dynamic part: how many conversations are booked and when the next one is, or that nothing is booked yet. | — |
| `summary` | `.next-appointment` | **The section's one figure: when the next conversation is** — `Thu 27 August · 10:30 AM`, with `in 7 days` beside it — and under it the `AdvisorBar` for the person who will be in the room. Nothing booked: the figure reads `Nothing booked`, the line says how many times are open, and the bar falls back to the advisor who holds her file. | [Lyssna](https://mobbin.com/screens/2491d855-da01-47af-bb7e-aff0504f2f93) |
| `alert` | `.alert-strip.urgent` | Only when a booking failed to reach its team. Names the team, states that nothing is booked, and offers `Try again`. Rides on the foot of the summary because it is a footnote to the figure: *this one is not it.* | [Calendly](https://mobbin.com/screens/cb543ef7-922d-4912-bdbf-9e842fe24240) |
| `notice` | `.alert-strip.urgent` | Only in partial data: the published times could not be loaded. States that booking is closed until they do, and that booked conversations are unaffected. A strip rather than a card, because it is a caveat on the section, not a block of it. | — |
| `tabs` | — | None. Appointments is a destination, not a group. | — |
| main 1 | `.section-card` — *Book a conversation* | One `.type-row` per conversation type: the team that receives it, the length, and the trailing edge either `Next: Fri 22 Aug` or `No times yet`. Tapping a row opens the sheet with that type already chosen. | [Headspace](https://mobbin.com/screens/3d59765f-ae34-4aa7-b295-51fd9c6239d6) |
| main 2 | `.section-card` — *Your conversations* | `.card-rows` of `.appointment-row`: date tile, time and where, who it is with, the subject, and a state chip. Named for what it holds rather than `Booked`, because a booking that failed lives here too and a card called `Booked` would be lying about one of its rows. Empty → `.state-card`. | [Cal.com](https://mobbin.com/screens/463e79bf-4ff0-46c7-b66a-610e39cbbbf8) |
| main 3 | `.section-card` — *Past and cancelled* | The same row, quietened. A conversation that happened stays; a cancelled one stays too, whatever its date — a cancelled appointment must never sit above looking like a plan. Rendered only when there is one. | [Calendly](https://mobbin.com/screens/cb543ef7-922d-4912-bdbf-9e842fe24240) |
| `rail` | `.anchor-card` + `.provenance-card` | Anchor: the key secondary figure — **how many times are open**, broken down per team, so a team that has gone quiet is visible. Light card: what happens after you book, when the times were last refreshed, and one route to ask for another. | — |
| — | `footer` | The shell's, unchanged. | — |

### The conversation type row (`.type-row`)

```
+------+------------------------------------------------+---------------+
| [::] | Enrollment step                                 | Next: Fri 22  |
|      | Admissions Office · 30 minutes                  | 6 times open  |
+------+------------------------------------------------+---------------+
| [::] | Academic advising                               | No times yet  |
|      | Academic Advising, Computer Science · 30 minutes|               |
+------+------------------------------------------------+---------------+
```

A type with nothing published says so **here**, before the sheet opens — the picker is never
entered only to be found empty (AC 7). The row still opens, because what the student needs then is
the route to the team, not a closed door.

### The appointment row (`.appointment-row`)

Date tile · body · state chip, on the same grid as `.campus-row` so the two lists line up.

```
+------+------------------------------------------------+-------------+
| AUG  | 10:30 AM - 11:00 AM · Building C, ground floor  |  Confirmed  |
|  27  | Enrollment step with Tomás Okafor               |             |
|      | About: whether my transcript is the right one   |             |
+------+------------------------------------------------+-------------+
```

The chip is the state, on the row, never a tab above the list: a failed booking must not be able to
hide behind a tab nobody opened. `Confirmed` is green, `Not booked` is crimson, `Cancelled` and
`Happened` are quiet.

### The booking sheet (`.task-drawer`, bottom sheet under 620px)

One scroll, three questions, in the order the story asks them:

1. **What do you want to talk about?** — `.choice-panel` radios, one per conversation type, each
   naming the team that receives it (AC 2). Choosing one re-reads the picker below.
2. **When?** — `.day-strip` of published days (each with its count; a day with nothing is not in
   the strip at all), then `.slot-grid` grouped `Morning` / `Afternoon`, with `No availability`
   printed for a part of the day that has none ([Square](https://mobbin.com/screens/5c191789-20a8-4f82-8ee5-2f0be71714b4)).
   A type with no published times replaces the whole picker with `.no-times`, which states the
   absence and offers the team's other route.
3. **What is it about?** — one textarea, `This travels with the booking to <team>` under it (AC 3).

The foot is sticky and holds what is about to be booked plus `Book this time`, disabled until a
slot is chosen. There is no free date or time field anywhere in the sheet (AC 1, Scenario 2).

### The result, in place

`Book this time` replaces the sheet's body with the result, never with a modal over it
([Fiverr](https://mobbin.com/screens/3299ae75-0af5-4acf-b8bd-7c4bef88c6bf)):

- **Booked** — green: when, who, where, the subject as it travelled, and the sentence that carries
  AC 4 — *it is on your calendar and on the team's.* `Done` closes; the row is already in the list.
- **Not booked** — crimson: *this did not reach the team. Nothing is booked.* `Try again` returns to
  the picker with the same slot still chosen; the second button reaches the team another way. The
  list behind gains a `Not booked` row, never a confirmed one (AC 6, Scenario 4).

## 3. States

| State | Where it comes from | What the student sees |
| --- | --- | --- |
| `loading` | frame | `PageSkeleton` — `App` renders it before this page mounts. |
| `error` | frame | `PageError` — nothing could be loaded. |
| `ready` | section | Two conversations booked, one past. Times published for two of the three types; Academic advising has none — the per-type absence, visible without changing state. |
| `empty` | section | **Emptiness one.** Nothing booked. Times still published, so the empty state offers the booking action and names how many times are open. |
| `no-times` | section | **Emptiness two.** No team has published anything. The book card states it per type, the picker cannot be entered, and the copy points at the office rather than at a button. These two must not read alike — the card is explicit about it. |
| `booking-fails` | section | The teams' calendars cannot be reached: one booking already failed (strip + crimson row), and any booking made in this state fails in the sheet. |
| `partial` | frame + section | Booked conversations loaded; published times did not. The `notice` says so, the type rows say `Times unavailable`, and booking is closed rather than showing an empty picker. |

## 4. Interactions

- A `.type-row` opens the sheet with that type selected. It must never open a picker over times it
  does not have.
- A day in `.day-strip` selects that day and clears the chosen slot. A slot chip selects one time;
  `aria-pressed` carries the choice.
- `Book this time` is disabled until a slot exists. It writes one appointment, whose state is
  `confirmed` or `failed` — never optimistic, never confirmed-then-corrected.
- **A retry writes over the attempt it repeats.** `Try again`, from the strip or from the failed
  conversation, carries that record's id into the sheet, so a booking that fails twice is one
  unbooked conversation rather than two rows saying the same thing.
- An `.appointment-row` opens the detail sheet: state, when, where, who, the subject as sent, and
  what happens next. Actions: add to calendar (toast), message the person (toast), and cancel.
- Cancel asks once inside the sheet, then leaves the appointment in the list as `Cancelled`
  (AC 5). Rescheduling is out of scope, so nothing offers it.
- Both sheets: `Esc` closes, focus is trapped and returns to the row that opened it (`useOverlay`),
  and `App` is told an overlay is open so Edward stands down.

## 5. Data

New: `src/appointments-data.js` — conversation types (each with the team that receives it),
published availability keyed by type, the student's booked conversations, and the publisher block
for the rail. `src/lib/appointments.js` holds the derivations: upcoming/past split, next
appointment, slots grouped by part of day, open-times count, state labels.

Reused: `enrollmentAdvisor` and `financialAidAdvisor` from `src/data.js` — the people the student
already knows from My Enrollment and My Financials are the people they book. `dateTile`, `longDate`
and `shortDate` from `src/lib/campus-helpers.js`; nothing about a date is written twice.

## 6. Out of scope

From [ENR-190](https://audentra.atlassian.net/browse/ENR-190), binding:

- Advisor calendar management and rescheduling policy. Cancel exists because AC 5 names it; nothing
  reschedules.
- External email and text delivery. Every outward action is a toast that says nothing was sent.
- The staff side of an appointment.
- The other two screens in the epic (Help, Profile) — their own cards.

## 7. Done when

- [x] The student can only pick from published times; there is no free date or time field.
- [x] The conversation type names the team that receives it, on the row and in the sheet.
- [x] The subject is shown travelling with the booking, and on the row afterwards.
- [x] A booking states that it reached both calendars.
- [x] A booking that fails says so in place, creates no confirmed appointment, and leaves a visible
      `Not booked` record with a way to retry.
- [x] A conversation type with no published times states the absence instead of showing a picker —
      on the type row, and again in the sheet if it is opened.
- [x] `empty` and `no-times` read as different emptinesses.
- [x] Loading, error and partial data are all reachable from the preview control.
- [x] `npm run build` clean; checked at 390px and 1280px; `Esc`, focus trap and focus return
      verified on both sheets; cancel leaves the conversation visible as `Cancelled`.
