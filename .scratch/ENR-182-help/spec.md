Jira: ENR-182
Status: ready-for-agent
Labels: design, persona-student, screen-help, wave-w2
Jam: (none)

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-agent` is the nearest role and the card is fully specified; Jira stays authoritative.

# Help — where a question stops being a shout into the dark

## 0. Current behaviour, confirmed

The card's scope note says the screen exists and that sending "currently ends in silence". In **this
repo** neither half exists yet: `help` is a destination in `src/lib/navigation.js` with
`built: false`, so `App.jsx` renders `SectionPlaceholder` for it. What lands here is the whole
screen, built once — the send that confirms and the life the inquiry has afterwards, together.

Three things already point at this page and must keep working:

- The page footer links `#/help` on every screen (`PageShell.jsx`).
- `UTILITY_ID = 'help'` puts it at the foot of the sidebar (`navigation.js`).
- Edward offers `Who should I talk to about a blocked step?` on this page
  (`PAGE_QUESTIONS.help` in `data-edward.js`).

One copy change is inherited rather than invented. [ENR-181](https://audentra.atlassian.net/browse/ENR-181)
took the word *ask* back for Edward, so Help no longer promises "Ask Aster anything that is blocking
a step". `navigation.js` already carries the replacement — *Aster's guides, and a way to reach the
office that owns a step* — and this page is built to that sentence.

## 1. What this screen answers

*I am stuck, and I need a person. Who, and did my question actually reach them?* —
[ENR-177](https://audentra.atlassian.net/browse/ENR-177), under
[ENR-190](https://audentra.atlassian.net/browse/ENR-190).

The screen has one job the assistant cannot do. Edward answers from what Aster published and from
the student's own record, instantly, and changes nothing. Help is where a **decision** is asked for,
from an office that can make it. Everything on the page is arranged so the difference between those
two is legible without being explained.

## 2. Layout

`PageShell` slots, in the order the shell fixes. Mobile is the primary case: every region is one
full-width column at 380px; only the rail moves beside the main column at the shell's breakpoint.

| Slot | Region | What it holds | Reference |
| --- | --- | --- | --- |
| `hero` | The band | Copy from `navigation.js`. The lede is the only dynamic part: how many requests are open and whether one is waiting on her. | — |
| `summary` | `.request-standing` | **The section's one figure: open requests** — `1 open` — with the line that says what is happening to it, and the primary action `Ask an office` on the right. | [Base44](https://mobbin.com/screens/20b9440b-cc9c-4c30-9500-9baa5facb0c8) |
| `alert` | `.alert-strip.urgent` | Only when a request is waiting on *her*. Names the office, says what it asked, opens the request. Rides on the foot of the figure because it is a footnote to it. | [Fiverr](https://mobbin.com/screens/54186860-2b86-4cc3-9ae3-0e2a6e1b3cb4) |
| `notice` | — | None. Nothing on this page is true of a group of leaves. | — |
| `tabs` | — | None. Help is a utility destination, not a group. | — |
| main 1 | `.section-card` — *Your requests* | `.card-rows` of `.request-row`: state chip, subject, the office it belongs to, when it last moved. Empty → `.state-card`. Partial → `.state-card.error`, guides unaffected. | [Base44](https://mobbin.com/screens/20b9440b-cc9c-4c30-9500-9baa5facb0c8) |
| main 2 | `.section-card` — *Ask an office* | Topic first, then the office that receives it and the guide that may answer it, then subject and message, then the send that names the office. | [Teachable](https://mobbin.com/screens/61fc4948-d5b8-4021-bd31-b2b98303d6c2) |
| main 3 | `.section-card` — *Aster's guides* | An accordion of the guidance Aster publishes, each one naming the office that publishes it. | [Bard](https://mobbin.com/screens/c7135f10-40d1-42f1-80fd-e9dd6c080249) |
| `rail` | `.anchor-card` + `.provenance-card` | Anchor: **where answers land**, with the typical reply time as the figure. Light card: the five offices and what each decides. | [Unity](https://mobbin.com/screens/34cd0860-99c1-44da-aef4-e1d25be584b7) |
| — | `footer` | The shell's, unchanged. | — |

### The page opens on what exists

With a request open, `Your requests` is the first card: a student who comes back comes back for it,
and AC 2 is about the return visit. With none, `Ask an office` is first and the requests card sits
under it — a large empty state is a poor thing to put at the top of a page whose whole purpose is
the action underneath it. Nothing else moves; the summary keeps the anchor in both cases.

### The request row (`.request-row`)

A button, on the same grid as `.doc-task` and `.campus-row` so it lines up with every other list in
the portal.

```
+-------------+-----------------------------------------------+-------------+
| [Answered]  | My final transcript is not showing            |  Aug 16     |
|             | Admissions Office · you asked on Aug 14       |  ● unread   |
+-------------+-----------------------------------------------+-------------+
```

There is no assignee, no team, no queue, no reference number, and no severity. That is AC 3, and it
is also why the row is a different object from the staff row rather than the staff row with columns
hidden — see the rejected half of `references.md`.

### The state vocabulary

Four states, each describing the **request**, never a person's inbox:

| State | Chip | Colour | The line under it |
| --- | --- | --- | --- |
| `received` | `Received` | neutral | *{Office} has it. Nothing is needed from you.* |
| `working` | `In progress` | purple | *{Office} is working on it. The answer lands here.* |
| `needs-you` | `Needs you` | amber | *{Office} asked you something. Reply here to keep it moving.* |
| `answered` | `Answered` | green | *{Office} answered. Reply here if it is not settled.* |

Green means what it means everywhere else in the portal — settled. Amber is the only state that asks
the student for anything, which is why it is the only one that can reach the summary as an alert.

There is deliberately **no fifth state for a failed send**. A send that does not arrive creates
nothing: the words are still in the form, and a `Not sent` row in a list of *what Aster has* would be
a lie about where they are. The failure grammar the card asks for is served by the absence of a
record, not by a record of an absence.

A request that is replied to after being answered goes back to `working` and carries
`Reopened just now` under the chip (AC 5). The student is never told it *returns to whoever handled
it*: that sentence is true and is the office's business, so on screen it reads *back with the
{Office}*.

### The ask block (`.ask-card`)

Four steps down one column, each revealing the next — the Teachable construction:

1. **What is it about?** `.filter-chips` of seven topics, written as things that happen to a
   student (`Money, aid or a payment`), never as internal queues.
2. **Where it goes.** The moment a topic is chosen: `.ask-route` names the office, what it decides
   and its hours. This is AC 7, before a single character is typed rather than after.
3. **Before you send.** When the topic has one, `.ask-guide` offers Aster's own guidance on it,
   opening the guide in place. Deflection that costs nothing: the request form stays open under it.
4. **The message.** Subject, then the message. Then `Send to {Office}` — the office is in the button
   label, so the last thing read before sending is where it goes.

Under the send, permanently: *Aster answers here, in the portal. Emails from Aster only tell you
something has landed — there is no address on them that reaches a person.* That is AC 6, on the
screen where it would otherwise be assumed.

### Receipt (`.ask-receipt`)

Success replaces the form, in place, with a `role="status"` panel:

```
  (✓)  The Admissions Office has your question.

  What happens next
  1  It is read by the Admissions Office, 9:00 AM–5:00 PM, Monday to Friday.
  2  A typical reply takes 2 business days.
  3  The answer appears here, on this page. You do not need to do anything.

  [ See the request ]   [ Ask something else ]
```

The new request is already at the top of `Your requests` with the `Received` chip when the receipt
is read, so AC 1 and AC 2 are the same gesture rather than two features. Receipt is unmistakable in
three places at once — the panel, the row, and the figure in the summary going up by one.

Failure is the opposite grammar and shares none of it: no tick, no *what happens next*, no new
request, and the form still filled in to the last character. The error says that nothing was saved
and that nobody has seen it, and the button becomes `Try sending again`. A send that never arrived
must not resemble one that did — and the surest way to say so is that it produced nothing.

## 3. States

| State | Preview id | What the screen does |
| --- | --- | --- |
| Loading | `loading` | The frame's `PageSkeleton`. Never reaches this component. |
| Error | `error` | The frame's `PageError`. Never reaches this component. |
| Ready | `ready` | Two requests — one answered and unread, one in progress. Seven guides. |
| Empty | `empty` | No request ever raised. The guides and the ask block are unaffected; the requests card states what will appear there. |
| Needs you | `needs-you` | One request waiting on her; the summary carries the alert. |
| Partial data | `partial` | The guides loaded, the request list did not. The list says so and offers a retry; the figure reads `Not available` rather than a zero that would read as *nothing open*. |
| Sending | — | The send button reads `Sending…` and is disabled. Not a preview state: it is a moment, and it is reachable by sending. |
| Send failed | `send-fails` | The next send does not reach Aster. |

`needs-you` and `send-fails` are added to `PREVIEW_STATES` so a `?state=` link survives a visit to
another section, exactly as `no-matches` and `full-board` already do. `frameState()` reads both as
`ready`, which is correct: they mean something here and nothing to the frame.

## 4. Interactions

- A topic chip sets the office and the guide. Changing it changes both; nothing typed is lost.
- `Send to {Office}` is disabled until a topic, a subject and a message all exist. It never sends
  twice: the button is disabled while sending.
- `See the request` opens the drawer for the request that was just created.
- A guide row toggles open with `aria-expanded` / `aria-controls`; several can be open at once.
- A `.request-row` opens `RequestDrawer`: the state and what it means, the thread in order, and the
  reply box. `Esc` closes, focus is trapped and returns to the row (`useOverlay`), and `App` is told
  an overlay is open so Edward stands down.
- Replying always posts into the portal thread. On an `answered` request the button reads
  `Send reply and reopen`, and the note under it says the request goes back to the office.
- Nothing on this page performs anything outside the portal. Every outward action is a toast that
  says so.

### What the thread may never show

The drawer renders a message's author as `You` or as the **office**. There is no name, no avatar and
no role on an Aster reply, and the timeline events say *Received by the Admissions Office*, never
*assigned*. AC 3 is enforced by the shape of the data — a message has a `from` of `student` or
`office` and there is no field for a person — rather than by remembering not to render one.

## 5. Data

New: `src/help-data.js` — the five offices, the topics that route to them, the guides, and the
student's requests. `src/lib/help.js` holds the derivations: state labels and lines, open counts,
the sort, and the reducer-ish helpers that add a request and append a reply.

Reused rather than re-written:

- `GUIDANCE` from `src/data-edward.js` is the guide corpus. Aster's published guidance already lives
  there, and a policy with two wordings is a policy the product disagrees with itself about. Help
  adds the office that publishes each one and three guides of its own that no assistant answer
  needed.
- The office **names** are the ones already in `src/data.js` (`task.office`) and `campus-data.js`
  (`Aster Registrar`). No sixth office is invented.
- `shortDate` and `longDate` from `src/lib/campus-helpers.js`; nothing about a date is written twice.
- `PORTAL_TODAY` from `src/data.js` — every relative date on this page is read against the same day
  as every other page.

Deliberately **not** reused: `enrollmentAdvisor` / `financialAidAdvisor`. Both are real and both
appear elsewhere in the portal, but a named person beside a request reads as the person handling it,
which is the one thing AC 3 forbids. The rail names offices; the people stay on the pages where they
own the subject.

## 6. Out of scope

From [ENR-190](https://audentra.atlassian.net/browse/ENR-190) and the card, binding:

- The staff side of an inquiry — assignment, ownership, SLAs. That is
  [ENR-25](https://audentra.atlassian.net/browse/ENR-25), a different product surface.
- Any real delivery. No email leaves, no notification is sent; the portal is the channel and the
  page says so.
- Attachments on a request. Documents belong to
  [ENR-165](https://audentra.atlassian.net/browse/ENR-165); a second upload path here would be the
  second place a file can live.
- Search over the guides. Seven guides do not need a search field, and a search box that returns
  nothing is worse than a list that is short.
- The other two screens of the epic (Appointments, Profile) — their own cards, in flight beside
  this one.

## 7. Done when

- [x] Sending confirms receipt in place, names the office that has it, and states what happens next.
- [x] The request appears immediately in `Your requests` with a state, and is still there on return.
- [x] No assignee, team, queue or internal detail appears anywhere on the page or in the drawer.
- [x] A reply from an office appears in the portal thread; the portal is named as the durable channel.
- [x] Replying to an answered request reopens it and says where it went.
- [x] Nothing invites a reply to an external address.
- [x] Every support route on the page names a real accountable office.
- [x] A failed send creates no request at all, keeps the message, and offers a retry.
- [x] Loading, empty, error, partial data and success are all reachable from the preview control.
- [x] `npm run build` clean; checked at 380px and wide; `Esc`, focus trap and focus return verified.

## 8. What verification found

Driven in a real browser at 1440px and 380px, against the built app.

- **The failure toast was the receipt toast.** The portal's toast is a green tick, so announcing a
  failed send with it produced the exact resemblance the card forbids. The failure now announces
  itself only through the `role="alert"` panel that replaces the send — where it can also be acted
  on. The receipt keeps the toast, because there the tick is true.
- **The topic chips pushed the whole page into a horizontal scroll at 380px.** A `<fieldset>`
  defaults to `min-width: min-content` and refuses to shrink. Fixed on `.ask-step`, and the chips now
  wrap at that width rather than becoming a scrollable strip: My Campus Life's filters can hide one,
  because they are optional; a topic is a required step, and an option the student cannot see is an
  office they cannot reach.
- **The drawer kept its own copy of the opener.** Removed: `useOverlay` already returns focus, and
  the keyboard check confirms focus moves in on open and back to the row on `Esc` without it.
- Checked by assertion rather than by eye: no page or thread text contains a staff name,
  `assignee`, `Assigned`, `queue` or `Severity`; the send stays disabled until topic, subject and
  message all exist; the guide accordion toggles `aria-expanded` from the keyboard.
