Jira: ENR-167
Status: ready-for-agent
Labels: design, persona-student, screen-dashboard, wave-mvp-demo
Jam: (none)

> Second pass on ENR-167. The first pass (`spec.md`, landed in `1eaacff`) built the navigation
> vocabulary and the route to a person; it did not build the notifications and points halves of the
> same design brief. Jira status is `QA` — this pass is what has to be true before that QA is honest.
> Stories [ENR-161](https://audentra.atlassian.net/browse/ENR-161) and
> [ENR-162](https://audentra.atlassian.net/browse/ENR-162) are `Prioritized`; they are the acceptance
> behind this screen, not separate build work. Jira stays authoritative.
>
> References: `references-notifications-and-points.md` in this directory.

# Student portal shell, second pass — what changed, and what a point is worth

## 0. Current behaviour, confirmed before designing

- **Nothing answers *what changed*.** There is no notification object, no feed and no bell. The bell
  that used to sit in the topbar pointed at a Messages destination that was never a card; both were
  removed in `7b7a47e` rather than repointed, because pointing it at My Documents would have counted
  the same event twice.
- **Read state does not survive a reload.** `markDecisionRead` (`src/lib/documents.js:143`) returns a
  new requirements array and `App` holds it in `useState`. Refresh and every opened decision is
  unread again. The only things this repo persists are Edward's threads and the sidebar group
  collapse, both `localStorage`.
- **The balance is on one page of thirteen.** `MomentumCard` renders inside `InsightColumn`, which
  only `EnrollmentPage` mounts. Twelve destinations show no balance at all.
- **A point has no stated worth.** `MomentumCard` says `1,234 pts` and nothing else. There is no
  currency, no catalogue and no conversion anywhere in the repo.
- **Point values are literals.** `points:` on each task in `src/data.js`, plus a `completed` list of
  `{ title, date, points }`. There is no configuration object and no separation between *what a
  requirement is worth now* and *what a student was awarded then*.
- **There is no rewards-disabled state.** `MomentumCard`'s `unavailable` prop is a load failure —
  *"Your balance didn't load this time"* — which is a different thing and says the opposite.
- Colour is free where it needs to be: crimson was released when the unread dot went. Badges
  currently spend `--purple` (`.nav-count`) and nothing else.

## 1. What this screen answers

*What happened since I was last here, and what is everything I have earned actually worth?*

Two subjects that share a corner and share nothing else — which is what the ENR-167 brief already
says. One is an **interruption**: something changed and it may need the student. The other is a
**reward**: pleasant, never urgent, and the brief is explicit that it must never distract from an
overdue requirement. The design problem is that they sit two inches apart in the topbar.

The resolution runs through the whole spec: **the interruption may spend colour; the reward may
not.**

## 2. The domain

Two new shapes, both published rather than computed.

### Notification

An event that already happened somewhere else in the portal. It is never authored here — a
notification is a *view* of a decision, a completion or a record change that some section owns.

| Field | Meaning |
| --- | --- |
| `id` | stable, so read state can be stored against it |
| `category` | `action-required` · `action-completed` · `record-changed` — ENR-161 AC4, closed set |
| `title` | what changed, in the institution's words |
| `office` | the team it came from, resolved against `help-data.js`; no sixth office invented |
| `when` | ISO date; rendered relative |
| `route` | where the item lives, or `null` |
| `gone` | when the item is no longer available, the reason in one sentence — AC6 |

`route` and `gone` are mutually exclusive. A notification with neither is a bug, and the shape should
make it impossible rather than the copy apologising for it.

### Reward configuration

`src/rewards-data.js`, the *published configuration* ENR-162 AC3 asks for. Two halves that must not
be confused:

- **`catalogue`** — what points are worth. `{ id, label, cost, office }`. Ordered by `cost`.
- **`values`** — what each requirement is worth *now*, keyed by task id.
- **`enabled`** — the institution's switch. ENR-162 AC5.

And separately, in the student's record rather than the configuration:

- **`awarded`** — a ledger of `{ taskId, title, date, points }` where `points` is **what was awarded
  at the time**, never re-read from `values`. This is ENR-162 AC4 as structure: a configuration change
  cannot recompute history because history does not read the configuration.

`CONTEXT.md` gains **Notification** (a view of an event, never the event), **Reward catalogue**,
**Award** (a point total fixed at the moment a requirement was met) and **Points value** (what a
requirement is worth now, which is a different number from an award).

## 3. Layout

Both surfaces live in the topbar, which is the one region every section already inherits. Neither is
a `PageShell` slot — they are shell furniture, not page content.

### 3.1 The topbar, left to right

```
[menu ≤820]  Aster ≤820        [preview pill]  [✦ 1,234 pts · 3 rewards]  [🔔 3]  [MB]
```

- The **points chip** sits before the bell, and the bell before the avatar. Reading order is the
  ranking: the quiet thing, then the interruption, then you. Reversing them would put the reward last
  and closest to the eye, which is where AC6 starts to break.
- Below 820px the chip drops its second half and renders `✦ 1,234`. **Recorded divergence:** ENR-162
  AC1 asks for the balance *and* its institution-defined value visible from every section; on mobile
  the value is one tap away in the popover rather than on the chip. Named here for the Jam rather
  than smoothed over.
- Both chip and bell are `.topbar-chip` — same height, same hairline, same radius as the existing
  `.mobile-avatar`. The two icons come from `Icon.jsx`; `spark` already exists, `bell` is new
  (24×24, stroke 1.9).

### 3.2 The notification panel

A popover anchored to the bell, `--z-popover` over `--z-popover-scrim`, built on `src/lib/overlay.js`
so it dismisses and traps focus the way the four existing overlays do. Never a page — the panel is
the only surface, so it carries its own empty state.
[Telescope](https://mobbin.com/screens/a488f2e6-28b3-49e3-885a-779324cec42a).

```
┌─ What changed ──────────────────── Mark all read ─┐
│                                                   │
│  NEEDS YOU                                        │
│  ● Immunization record needs a clearer photo      │
│    Health Services · 2 days ago                 → │
│                                                   │
│  ALSO NEW                                         │
│  ● Transcript accepted                            │
│    Registrar · 3 days ago                       → │
│    Aid package released                           │
│    Student Financial Services · 6 days ago      → │
│    Housing preference form withdrawn              │
│    No longer available — Housing Services         │
│      replaced it with the plan question           │
│                                                   │
│  ───────────────────────────────────────────────  │
│  Need a person? Help →                            │
└───────────────────────────────────────────────────┘
```

- **Two groups, not three tabs.** `NEEDS YOU` holds `action-required`; `ALSO NEW` holds
  `action-completed` and `record-changed`. AC4's three categories are the data; the split is the
  ranking, taken from [Slite](https://mobbin.com/screens/fb60bed4-2dd5-4221-ba5d-c1fc3fef0f1a). A
  group with no items renders no heading — never an empty heading.
- **Row anatomy** from [Jira](https://mobbin.com/screens/f7eb5777-1125-4f47-bdcc-39931e19cfeb):
  title on line one, `office · relative time` on line two, chevron on the trailing edge, unread dot
  on the leading edge. The whole row is the link.
- **`Mark all read`** sits in the panel header, not behind a `···`
  ([Causal](https://mobbin.com/screens/9a5e4576-8324-4778-b510-ac081f65311b)). There is no bulk
  delete — a student must not be able to throw away a decision they have not read
  ([folk](https://mobbin.com/screens/53204879-6a32-4f5d-ad5f-2adef77f8dc6), taken as the
  counter-example).
- **The foot names the route to a person.** One line, to Help. This is ENR-161 AC5 made structural:
  the panel offers no reply control anywhere, and says where a reply would actually go.
- **A `gone` row is not a link.** No chevron, no hover, the reason in place of the timestamp line.
  It stays in the feed because deleting it would answer *what changed* with silence.

### 3.3 The points popover

Anchored to the chip, same overlay primitive, same layer.

```
┌─ Your momentum ───────────────────────────────────┐
│  1,234 pts                                        │
│  A late-fee waiver is 66 pts away                 │
│                                                   │
│  ├──●────────●────────○────────○────────○──┤      │
│   0        800     1,300    2,000    3,000        │
│           Late      Early    Campus   Graduation  │
│            fee      move-in  store    regalia     │
│                                                   │
│  HOW YOU EARNED IT                                │
│  Accept your offer            Aug 7      150 pts  │
│  Confirm your identity        Aug 7      100 pts  │
│  Choose your preferred name   Aug 7       78 pts  │
│  … 6 more                                         │
│                                                   │
│  Points come from Aster's published reward list.  │
│  What you have already earned never changes when  │
│  that list does.                                  │
└───────────────────────────────────────────────────┘
```

- **The ladder** is the layout, from
  [sweetgreen](https://mobbin.com/screens/26c7cc12-dcf7-41e1-9832-1208c3bbe98c): every catalogue item
  at its threshold, filled to the left of the balance and hollow to the right. This is the
  institution-defined value ENR-162 AC1 asks for, and it needs no currency to state it.
- **No Claim, no Redeem, no button on a catalogue row at all.** ENR-148 puts reward redemption
  mechanics out of scope and `design-workflow.md` §1 says out of scope is not built smaller.
  [Binance](https://mobbin.com/screens/1e60f298-cf02-44aa-a26a-74d31b707e2a) is the rejected pattern.
- **`HOW YOU EARNED IT`** is ENR-162 AC2 — every award attributed to the requirement that earned it,
  read straight off the `awarded` ledger. Long lists truncate with a count, never scroll inside a
  popover that is already an overlay.
- **The closing sentence states the measure's own definition where it is displayed**, the habit
  [PayPal](https://mobbin.com/screens/b3d8a0db-0ae2-4de6-9ad9-3c2056f09d55) models and the rule
  ENR-57 AC4 already sets on the staff side. It is also where AC4's guarantee is said out loud.

### 3.4 What happens to `MomentumCard`

It stays on My Enrollment and stops repeating the balance. The chip is the balance everywhere; the
card keeps the ladder position, *what is on the table today* and `How points work`. One figure, one
place — the rule the rest of this repo already runs on. The card's `unavailable` prop keeps meaning
*the balance did not load*, which is now unambiguous because *disabled* is a different state entirely.

## 4. States

Every surface, per `docs/agents/design-workflow.md`.

| Surface | State | What renders |
| --- | --- | --- |
| Bell | none unread | icon only, no dot. Not a `0` |
| Bell | unread, none needing action | dot in `--ink`, count inside. Findable, not anxious |
| Bell | unread, at least one `action-required` | dot in `--crimson`. **The only crimson this pass spends** |
| Bell | counts unavailable | icon only, no dot — never a `0` that reads as final. Matches the `partial` rule ENR-180 already set for nav badges |
| Panel | loading | three skeleton rows, panel opens immediately — the panel failing to fill is not the panel failing to exist |
| Panel | empty | *"Nothing new since you were last here."* plus the Help line. Inside the panel |
| Panel | error | *"We couldn't load what changed. Nothing you did is lost."* plus `Try again`, the Help line still rendered |
| Panel | all read | rows render without dots; `Mark all read` is absent, not disabled |
| Chip | rewards enabled | `✦ 1,234 pts · 3 rewards` |
| Chip | balance unavailable | `✦ —`, popover still opens and explains |
| Chip | **rewards disabled** | **the chip is not rendered.** No popover, no `MomentumCard`, no points line on any task card, no gap where it was |
| Points popover | nothing earned yet | balance `0 pts`, ladder rendered hollow, and the adidas sentence: *"You haven't earned any points yet. Finishing a step is what earns them."* No empty ledger heading |

**The disabled state is a preview state.** `PreviewStateMenu` gains `rewards-off` so the Jam can see
ENR-162 AC5 without a code change. A state nobody can open is a state nobody verified.

## 5. Interactions

| Control | Does | Must never |
| --- | --- | --- |
| Bell | opens the panel; `Esc` and outside click close it, focus returns to the bell | render a count when counts are unavailable |
| Notification row (`route`) | navigates to the item **and** marks that one read | mark the whole feed read |
| Notification row (`gone`) | nothing — not focusable as a link, readable as text | link anywhere, or disappear |
| `Mark all read` | marks every currently listed notification read | delete anything |
| Panel foot | routes to Help | offer a reply field, or imply one exists |
| Points chip | opens the points popover | carry a badge, a dot, or any accent colour |
| Catalogue row | nothing. It is information | offer a redeem or claim action |
| `How points work` | opens the existing `InfoModal` | duplicate the popover's content |

**Read state persists.** `localStorage` key `aster.notifications.read`, an array of ids, read through
the same try/catch fallback `Sidebar.jsx` already uses for group collapse. Unreadable storage falls
back to *everything unread*, which is the safe direction: showing a student something twice is
recoverable, hiding it is not.

**Read state is one mechanism, not two.** `markDecisionRead` in `lib/documents.js` currently owns the
unread mark on a document decision and loses it on reload. It becomes a reader of the same store, so
a decision opened on My Documents is read in the panel and the reverse — one event, one read state.
That is what closes the half of **ENR-158 AC5** My Documents left open.

## 6. Data

- **New** `src/notifications-data.js` — the seeded feed. Every entry points at a real object that
  already exists: the immunization decision from `documents-data.js`, the aid release from the
  financials data, the withdrawn housing form as the `gone` case. Nothing invented, and every
  `office` resolves against `help-data.js`.
- **New** `src/rewards-data.js` — `enabled`, `catalogue`, `values`, and the `awarded` ledger moved out
  of `data.js`.
- **New** `src/lib/notifications.js` — the category ranking, the relative-time formatting, the
  read-state store, and `unreadCount(feed)` returning `{ total, needsAction }` so the bell can pick
  its colour without the topbar knowing what a category is.
- **New** `src/lib/rewards.js` — `balanceFrom(awarded)`, `withinReach(balance, catalogue)` and
  `nextReward(balance, catalogue)`. Never reads `values`; that is what keeps AC4 true.
- **Changed** `src/data.js` — `points:` per task now reads `rewards-data.js` `values`, and the
  `completed` list becomes the `awarded` ledger.
- **Changed** `src/lib/documents.js` — `markDecisionRead` delegates to the notification read store.
- **Changed** `src/components/Topbar.jsx` — the chip and the bell; it receives view-model props and
  computes nothing.

## 7. Out of scope

From [ENR-148](https://audentra.atlassian.net/browse/ENR-148), binding: the content of each section;
**external notification delivery**; **reward redemption mechanics**. Also out, for this pass:

- **ENR-161 AC7** — external delivery respecting the stated contact preference. There is no mail in
  this prototype. Declared, not simulated.
- **A notifications page.** Marco chose the panel; a fourteenth destination would put back a nav row
  this repo removed two commits ago.
- **Notification preferences.** No card carries them.

## 8. Consciously outside this pass's files

- `docs/portal-build-order.md` and `docs/student-portal-status.md` both name ENR-161 and ENR-162 as
  the open work. Both need a line when this lands.
- The `--z-popover` layer exists but no component uses it yet; this pass is its first tenant, and the
  overlay primitive may need one addition for anchored positioning.

## 9. Done when

- [ ] The bell is visible from all thirteen destinations, and its dot is crimson only when something
      needs the student — ENR-161 AC1, and the brief's *findable without being anxious*
- [ ] Every row names what changed, the office and when, and links to the item — AC2
- [ ] Opening an item marks it read, and **a reload keeps it read** — AC3, the one that fails today
- [ ] The three categories exist in the data and are ranked into two groups in the panel — AC4
- [ ] Nothing in the panel offers a reply, and its foot names Help — AC5
- [ ] A withdrawn item renders its reason and links nowhere — AC6
- [ ] A decision read on My Documents is read in the panel — ENR-158 AC5's remaining half
- [ ] The balance is on every section, and the catalogue says what it is worth — ENR-162 AC1, with
      the mobile divergence in §3.1 declared on the card
- [ ] Every award names the requirement that earned it — AC2
- [ ] Values live in `rewards-data.js`; the ledger never reads them — AC3, AC4
- [ ] `rewards-off` renders no chip, no card, no gap, and is reachable from the preview menu — AC5
- [ ] No points surface spends an accent colour, and none sits above an outstanding action in
      reading order — AC6
- [ ] Loading, empty, error, partial and disabled states exist for both surfaces
- [ ] Keyboard: bell and chip reachable, `Esc` closes, focus returns to the trigger
- [ ] `npm run build` passes
