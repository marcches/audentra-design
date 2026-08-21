# Appointments screen changes (Aster New Student Portal / Audentra)

**Target screen:** `/#/appointments`
**Reference screen:** `/#/my-enrollment`
**Prototype:** audentra-design.vercel.app
**Strings and measurements read from the build of 2026-08-21**

---

## 0. Instructions for whoever implements this

### 0.1. The principle that governs this document

**My Enrollment is the portal's reference screen.** Every divergence between the two screens is resolved in favour of My Enrollment. Where this document specifies a value or a component, it is deriving it from the reference screen.

This applies to form, not to logic. The component is the same; the rule that decides what goes inside it belongs to each screen. See A6.

### 0.2. Product rules these items rest on

| # | Rule |
|---|---|
| 1 | The student picks from published times and, when none of them work, **can ask the team for another time**. |
| 2 | The system **can notify** the student when a team publishes new times. |
| 3 | The dark slot in the right column is persistent across the portal, but **its content is each screen's own choice**. |
| 4 | The primary action band **changes with the student's situation**. It does not push booking by default. |

### 0.3. How to read the items

Every item states the current behaviour, the reference on the guide screen, the problem, the change, and an acceptance criterion. All of them are meant to be implemented. There are no conditional items in this document.

All new copy is written out in section 8, current text next to new text, per state. No placeholders: what is there is what ships.

Section 9 specifies the booking drawer, which is a new surface. Section 10 maps every element to the class and token that already exist in the design system. Section 11 gives the execution order.

### 0.4. Everything ships in English

The product's interface language is English. Every string in section 8 is final English copy and goes to the screen as written. Do not translate, do not localise, do not paraphrase. Class names, tokens and state slugs are also literal.

### 0.5. Scope

Desktop, the seven states of the Appointments screen. Responsive and mobile layout are not part of this document.

---

## 1. How to load each state

The "Concept preview" control at the top of the screen does the same thing through the UI, and the student never sees it.

| State | Slug | URL |
|---|---|---|
| Ready | `registration-open` | `/?state=registration-open#/appointments` |
| Nothing booked | `empty` | `/?state=empty#/appointments` |
| No times published | `no-times` | `/?state=no-times#/appointments` |
| Team unreachable | `booking-fails` | `/?state=booking-fails#/appointments` |
| Loading | `loading` | `/?state=loading#/appointments` |
| Partial data | `partial` | `/?state=partial#/appointments` |
| Error | `error` | `/?state=error#/appointments` |

Base: `https://audentra-design.vercel.app`

Every change in this document has to be verified in all seven.

---

## 2. The diagnosis in one sentence

The screen is informationally complete and operationally mute: it explains a system you can barely act on, its only persistent button promises something the product openly denies, and it gives the largest typographic weight to the one element that leads nowhere.

---

## 3. Anatomy of the reference screen

Measured at `/?state=ready#/my-enrollment`. This is the conformance target for sections 4 and 5.

**Section header:** an uppercase eyebrow ("YOUR NEXT STEPS"), an `H2` at 17px weight 400 ("Your steps"), and control chips on the right ("Smart order", "Due soon", "Fastest"). No icon tile, no subtitle.

**Primary action band:** a short label ("Start here") with a consequence on the right ("Unlocks 3 more steps"), sitting above the first row of the list.

**List row, top to bottom:**
1. Uppercase category eyebrow ("YOUR OFFER", "MONEY AND AID")
2. Priority tag ("IMPORTANT", "DO SOON")
3. Title as `H3`, 17px, weight 400 ("Lock in your place")
4. One-sentence description
5. Metadata line with icons ("Due Nov 16 · 88 days", "About 4 min", "Verified automatically")
6. Solid primary button ("Pay deposit")
7. Quiet secondary link ("How this works")

**Row tiering:** the active section uses 17px titles. The "Aster is reviewing" and "Coming up later" sections use 12.5px titles. The guide builds hierarchy by shrinking what is not actionable now, not by bolding what is.

**Topic taxonomy:** every row on the guide is headed by an uppercase category, and that taxonomy is what organises the portal. The categories observed in the `ready` state are "YOUR OFFER", "MONEY AND AID", "HEALTH AND WELLNESS", "ABOUT YOU" and "CAMPUS LIFE". The priority tags are "IMPORTANT", "DO SOON" and "FLEXIBLE". The owning team appears in the task description, for example "Student Financial Services needs to confirm the income you reported" and "Aster University Health Services needs your immunization record".

**Right column:** `aside.page-rail`, inside the `.page-body` grid, which is `828px 292px`. The rail is a flex column, `gap: var(--space-7)`, `position: sticky; top: 94px`. It holds two cards:

1. `.momentum-card`, permanent. Shows where the student stands in that screen's domain, with a progress bar, and ends in a link that explains the rule ("How points work").
2. `.skipped-card`, conditional. Background `linear-gradient(145deg, var(--surface), var(--card-zone))`, border `var(--purple-line)`, `padding: var(--space-9)`, with a `.resume-badge`. It appears when something is pending outside the main flow, and ends in an action ("Continue where I left off").

**Type scale in use on the guide:** 34px (H1), 21px weight 700 (the figure in the white card), 17px weight 400 (H2 and H3), 17px weight 700 (the dark card's lead line), 12.5px (demoted row titles), 10.5px weight 500 (advisor block metadata), 9.5px weights 400 and 600 (dark card metadata). Typeface `Geist Variable`.

---

## 4. Typographic conformance

### T1. Row titles are the wrong size and weight

**Current:** row titles ("Enrollment step", "Financial aid", "Academic advising") are a `SPAN` at 15px weight 700.

**On the guide:** row titles are an `H3` at 17px weight **400**. The guide never bolds a row title, in any of its six rows.

**Why this breaks the hierarchy:** on Appointments the section title is 17px weight 400 and the row title inside it is 15px weight 700. The child outweighs the parent. Across a 2px size difference, weight wins, so the eye reads "Financial aid" as more important than "Book a conversation". The section level disappears when scanning and the whole page flattens into one row of equally weighted items. This is the root cause of the screen's missing hierarchy.

**Change:** row titles become `H3`, 17px, weight 400. The tag change is part of the fix; the current `SPAN` carries no heading semantics.

**Acceptance:** no row title above weight 400, and no row title smaller than the section title that contains it.

---

### T2. One scale step that is not in the system

**Current:** 11.5px weight 700 in purple is used for "Next Aug 21" and "No times available", as the row's affordance.

**On the guide:** that step does not exist, and the action affordance is a button.

**Change:** the value disappears once A1 turns that slot into a button. After A1, any remaining use of 11.5px maps to 10.5px or 12.5px, which are existing steps on the guide.

**Acceptance:** no use of 11.5px anywhere on the screen.

---

### T3. Display numeral on data that leads nowhere

**Current:** "24" at 27px weight 400 in the dark card. Second largest text on the screen after the H1, and larger than the date of the student's own appointment, which is 21px.

**On the guide:** no numeral gets that treatment. The dark card's lead is a sentence at 17px weight 700 with a progress bar.

**Change:** the numeral goes with the card, see C1. Rule to adopt going forward: display-size numerals only for data that carries an action.

---

### T4. The section header is not the portal's header

**Current on Appointments:** a rounded icon tile on the left, a title, and a subtitle underneath. This applies to "Book a conversation", "Your conversations" and "Past and cancelled".

**On the guide:** an uppercase eyebrow, an `H2` at 17px weight 400, and control chips on the right. No icon tile, no subtitle.

**Change:** adopt the guide's header in all three sections. The current subtitle becomes the eyebrow where it fits, or is cut.

- "Book a conversation" takes the eyebrow `BOOK A CONVERSATION`, and the title becomes `What it's about`, which names the content. The subtitle goes, and its meaning moves into the `How booking works` link in the same header, in the position the guide uses for its control chips.
- "Your conversations" and "Past and cancelled" keep their titles and lose the icon tile and the subtitle. They also gain the collapse control from A8.

**Acceptance:** all three sections use the same header component as the reference screen.

---

### T5. Unavailable rows weigh the same as available ones

**Current:** all three rows carry identical visual weight, including "Academic advising", which has no times and cannot be used. In the `partial` state all three read "Times unavailable" and still look identical.

**On the guide:** three tiers exist, with 12.5px titles for whatever is not actionable now.

**Change:** a row with no times uses the 12.5px step for its title, keeping its description, its request action (A2) and its secondary link. Rows with times stay at 17px. In the `partial` state all three drop to 12.5px, because none of them is actionable.

**Acceptance:** in any state, a row that cannot be clicked through to booking sits on the 12.5px step.

---

## 5. Action and content

### A1. List rows have no action

**Current:** each row carries a title, "Admissions Office · 30 minutes", a description, and ends in 11.5px purple text ("Next Aug 21") with 9.5px text underneath ("14 times open"). There is no button.

**On the guide:** the row ends in a solid primary button plus a secondary link, and the metadata sits on its own line with icons.

**Problem:** the coloured text reads like a link, competes with the whole row, and leaves it unclear what is clickable.

**Change, mapped onto the guide's row anatomy:**

| Slot on the guide | Content on Appointments |
|---|---|
| Category eyebrow | the portal category in uppercase, e.g. `MONEY AND AID`, see A9 |
| Priority tag | not used |
| `H3` title | the topic |
| Description | the sentence that is already there |
| Metadata line | owning office, duration, availability: `Financial Aid Office · 30 min · Next Aug 25 · 10 open` |
| Primary button | `Choose a time` |
| Secondary link | `Ask for another time`, see A2 |

A row with no times swaps the primary button for `Ask for a time` and the secondary link for `Tell me when times open`.

**Acceptance:** every row has exactly one primary click target, visually identifiable as a button, in every state where the row is actionable.

---

### A2. The screen denies a capability the product has

**Current:** the "Ask a team for another time" button sits at the bottom of the right column, below "AFTER YOU BOOK", as an outline button immediately above the footer. It is the only obvious clickable element on the screen and it persists in every state.

**Problem 1, three pieces of copy state the opposite of what the product does.** The student can ask for another time. The screen says three times that she cannot:

| Where | Current text |
|---|---|
| Banner, states `registration-open` and `empty` | "You choose from the times each team published. You can't propose a different one." |
| Dark card | "Each team publishes its own times, and only what it publishes can be booked." |
| Empty state in "Your conversations", state `empty` | "Booking one is a single choice. There is no request to wait on afterwards." |

A student who reads any of those three will never look for the button. That is worse than a badly placed button: the product is hiding its own way out.

**Problem 2, placement.** The button sits a full screen away from where the need appears, which is the row whose times do not work.

**Problem 3, weight.** As the only button on the page, it carries less visual weight than the number 24.

**Change:**
1. Fix the three pieces of copy. They have to admit the exception instead of denying it. New text for each is in section 8.
2. Remove the loose button from the right column.
3. Asking for another time becomes the secondary link on every row that has times, next to the `Choose a time` button. It is a fallback, not the main route.
4. On a row with no times, asking becomes the primary button, and the new-times notification becomes the secondary link. They are different things: asking is active and resolves now, being notified is passive and suits someone willing to wait.
5. In the `no-times` state, every row takes that same configuration.

**Acceptance:** no copy on the screen denies that asking is possible, and the action is available on every row, in every state where the list renders.

---

### A3. Appointments have no actions

**Current:** the "YOUR NEXT CONVERSATION" card and the items under "Your conversations" carry date, time, topic and location. No reschedule, no cancel, no add to calendar.

**Problem:** rescheduling is the second most frequent action on this screen after booking, and it does not exist.

**Change:** every appointment with a CONFIRMED badge takes two controls, a primary `Add to calendar` button and a secondary `Reschedule` link. They sit in the space freed by C8, on the right of the white card. Use the same button component and position as the "Try again" buttons that already exist in the failure states.

**Acceptance:** no confirmed appointment is left without a way to reschedule.

---

### A5. A cancelled appointment is a dead end

**Current:** the Aug 14 item carries a CANCELLED badge and the text "About: Whether I can change my housing preference after the deposit". It does not say who cancelled or why, and offers no way to rebook.

**Problem:** that is an open question the screen has filed away. The student's housing question is still unanswered and the product treated it as dead history. Compared with the `booking-fails` state, which gives the NOT BOOKED item an alert and a "Try again", the CANCELLED item gets nothing. Two different treatments for two ways a conversation fails to happen.

**Change:** a cancelled item takes a primary `Book this again` button, which reuses the "About" text already written, and shows who cancelled where that data exists.

**Acceptance:** the cancelled item carries the same density of action as the NOT BOOKED item.

---

### A6. Primary action band

**Current:** the guide has a primary action band ("Start here" plus "Unlocks 3 more steps"). Appointments has no equivalent in any state.

**What supports the change:** the `empty` state already has a primary action, with the "Nothing booked yet" block and a "Book a conversation" button. So does `no-times`, with "Email the Admissions Office". The screen knows how to offer an action when it is empty, and loses the action exactly when the student has things going on, which is the state she spends most of her time in.

**Change:** adopt the guide's band component. The component is the same; the rule that fills it belongs to this screen.

**Band rule, in this order of precedence:**

1. If an item carries the NOT BOOKED badge, the band points at it and the button is `Try again`.
2. If not, and nothing is booked, and times are published, the button is `Book a conversation`.
3. If not, and some topics have no open calendar while others have times, the band names the topic without a calendar and the button is `Ask for a time`, opening that topic's drawer on the "Ask for a time" tab.
4. In any other case, the band does not render.

**Where each case fires:**

| State | Case | What appears |
|---|---|---|
| `registration-open` | 3 | Academic advising has no open calendar while the other two have times |
| `empty` | 2 | nothing booked and 24 times published |
| `no-times` | none | the empty-state block in "Your conversations" already covers it, with its own button, see 8.5 |
| `booking-fails` | 1 | the Aug 25 item is NOT BOOKED |
| `partial` | none | times failed to load, the alert at the top already answers |
| `loading` | none | |
| `error` | none | the whole page is replaced |

**Why the rule does not copy the guide's logic:** there, the best next action is always to act on the list, because the list is the student's own pending work. Here it is not. A band saying "Book a conversation" to someone who already has two conversations scheduled is asking for a third, which turns the screen into a funnel and makes the product optimise for meeting volume instead of unblocking a student. Case 3 exists precisely so the band can point at the real blockage, which is the team with no calendar, instead of pushing volume.

**Acceptance:** the band renders in the `registration-open` state and uses only data the screen already has. No state shows an empty band or a placeholder.

---

### A7. An asked-for time has no visible state

**Current:** the existing badges are CONFIRMED, CANCELLED, COMPLETED and NOT BOOKED. There is no state for a time request that has been sent and not yet answered.

**Problem:** asking for another time is the only action on this screen that does not resolve on the click. Every other one ends there. Without a visible state, the student clicks, the request vanishes, and she has nowhere to check that anyone received it. That is exactly the kind of silence the rest of the screen works hard to avoid, as the honest copy in the failure states shows.

**Change:**
1. Add a `REQUESTED` badge to the same set as the other four.
2. The request appears under "Your conversations" with the topic, the team, what was asked, and the date it was sent, with no time set.
3. The item carries a way to cancel the request.
4. Whatever replaces "There is no request to wait on afterwards" has to reflect that a path with waiting exists, and that it is the second path, not the first.

**Acceptance:** after asking for a time, the student can find the request on the screen without asking anyone.

---

### A8. History sections have to collapse

**Current:** all three sections are fixed and always open. "Your conversations" and "Past and cancelled" push the booking list up the page and grow without limit as the student accumulates conversations.

**Problem:** "Book a conversation" is the task of the screen and the only section that has to stay visible. The other two are reference. After a semester of use, history is most of the page and the main task is buried.

**Change:** "Your conversations" and "Past and cancelled" become accordions. "Book a conversation" never collapses.

| Section | Collapses | Initial state |
|---|---|---|
| Book a conversation | no | always open |
| Your conversations | yes | open |
| Past and cancelled | yes | closed |

**Component:** the portal already has an accordion on the My Degree screen, in the requirement blocks. Reuse the same mechanism:

- the whole header becomes a `button`, with `cursor: pointer` and `text-align: left`, as in `.requirement-head`
- open state is marked by an `open` class on the section container, as in `.requirement-card.open`
- the chevron follows `.requirement-chevron`: `color: var(--muted)`, `transition: transform .2s`, and `transform: rotate(180deg)` when open
- the body takes `border-top: 1px solid var(--line)`, as in `.requirement-courses`
- `aria-expanded` on the header button and `aria-controls` pointing at the body
- Enter and Space toggle, and focus stays visible on the header

**Count in the header:** when a section is closed, the header shows how many items it holds, so the student does not have to open it just to find out. Format in 8.10.

**Interaction with the band and the states:** if the A6 band points at a NOT BOOKED item, "Your conversations" opens, even if the student had closed it. A band pointing at something hidden makes no sense.

**Acceptance:** "Book a conversation" never collapses. Across the seven states, history starts closed and conversations start open, except where a NOT BOOKED item exists.

---

### A9. The topic list does not use the portal's taxonomy

**Current:** the "Book a conversation" list holds three topics invented for this screen, "Enrollment step", "Financial aid" and "Academic advising", each with a team underneath.

**On the guide:** tasks are grouped by the portal's categories, "YOUR OFFER", "MONEY AND AID", "HEALTH AND WELLNESS", "ABOUT YOU" and "CAMPUS LIFE", and each task names its owning team in the description.

**Problem:** two taxonomies for the same reality. The student learns the categories on the checklist and arrives here in a different vocabulary. Worse, "Enrollment step" exists precisely to talk about a checklist step, and the checklist is organised by category, so the screen offers a grouping it contradicts itself.

**Change:** the list is organised by the reference screen's categories. Each category is a group, and inside it sits whoever handles that subject.

| Category | Owning office |
|---|---|
| YOUR OFFER | Admissions Office |
| MONEY AND AID | Financial Aid Office |
| HEALTH AND WELLNESS | Student Health Services |
| ABOUT YOU | Registrar's Office |
| CAMPUS LIFE | Residence Life Office |

Full naming rules, including the two strings on the reference screen that change with them, are in 8.11.

**Category and owning office come from checklist data, not from a list of Appointments' own.** The table above is the naming standard, not a hardcoded list: if a category has no office that takes conversations, it does not appear here, and if the checklist gains a category, it appears without a change to this screen.

**Useful consequence:** this resolves, at category level, the missing link between a conversation and the checklist. A student stuck on "MONEY AND AID" in her checklist finds "MONEY AND AID" here, under the same name.

**What happens to "Academic advising":** it is not a portal category. On the guide the subject shows up as the future task "Meet your academic adviser". It joins whichever category that task carries in checklist data, and does not become a new category.

**Row structure:** the category eyebrow from A1 is the portal category in uppercase, not the team name. The team moves to the metadata line, alongside duration and availability.

**Acceptance:** every category shown on Appointments exists under the same name on the reference screen. No grouping is invented for this screen alone.

---

### C1. Replace the "TIMES OPEN NOW" card

**Current content in the `registration-open` state:** the label "TIMES OPEN NOW", the numeral "24", the line "across 2 of 3 teams", a per-team table, and the paragraph "Each team publishes its own times, and only what it publishes can be booked. A team with none has not gone quiet on you, it has not opened that calendar yet."

**Problem 1, three jobs in one block.** It is a metric, an availability table and a policy explanation at the same time.

**Problem 2, the table copies the list beside it,** line for line, at the same height on screen:

| Dark card | "Book a conversation" list |
|---|---|
| Admissions Office, 14, from Aug 21 | Enrollment step, Next Aug 21, 14 times open |
| Student Financial Services, 10, from Aug 25 | Financial aid, Next Aug 25, 10 times open |
| Academic Advising, None yet | Academic advising, No times available |

When the same data appears twice on one screen, the reader assumes they are different things and spends attention looking for the difference.

**Problem 3, inverted internal hierarchy.** The paragraph is the best thing in the card, because it answers the student's real question, which is "why does this team have nothing, have they forgotten me?". It sits in small text under a number that does nothing.

**Problem 4, origin.** The slot is persistent across the portal and its content is each screen's choice. On Appointments it was filled with a metric instead of content of its own.

**Problem 5, it degrades badly.** In the `no-times` state the card renders "TIMES OPEN NOW / 0 / across 0 of 3 teams". A 27px display numeral showing zero.

**Change:** the card's content is replaced, the column stays. The column is `aside.page-rail`, a component shared with the reference screen, and Appointments reproduces the same pair of cards.

1. **Remove** the numeral, the "across N of 3 teams" line and the per-team table, in every state.

2. **Permanent card, in the position and treatment of `.momentum-card`:** "How booking works". Contents:
   - the booking rule as running text, see 8.9
   - "Times updated 20 minutes ago" and "Aster scheduling" as the card's footer, at `--fs-micro`
   - a closing "How booking works" link that opens the `.how-panel`, mirroring the guide's "How points work"
   - in the `partial` state, the body is replaced by the load failure message, see 8.9

3. **Conditional card, in the position and treatment of `.skipped-card`:** "Waiting on a team". Rendered only when an item carries the REQUESTED badge, see A7. Contents:
   - a `.resume-badge` with the team name
   - what was asked and when
   - a "See the request" action, which opens the "Your conversations" section and moves focus to the item

4. **The split between the band and the column is by whose turn it is.** The A6 band is what depends on the student: book, try again, ask for a time. The conditional card in the column is what depends on the team. A sent request is not her action, so it does not go in the band. It is also what keeps the request visible while the history section is closed, see A8.

5. **The screen keeps two columns**, with the content column at its current width. Do not convert to a single column and do not stretch the list.

**Acceptance:** no state shows an aggregate count of times. The right column exists in all seven states and uses the same `aside.page-rail` as the reference screen.

---

### C2. Unavailability stated three times

**Current:** in `registration-open`, "No times available" in the row, "None yet" in the card's table, and the whole paragraph. In `partial`, an alert at the top, "Times unavailable" in all three rows, and "TIMES OPEN NOW / Not available" in the card.

**Change:** unavailability appears once in the row, plus the top alert when it is a load failure. The occurrences in the card go with C1.

**Acceptance:** in no state does the same unavailability appear in more than two places.

---

### C3. The next appointment appears twice

**Current:** the banner paragraph says "Your next conversation is in 7 days, with Tomás Okafor" and the white card right below says "YOUR NEXT CONVERSATION / Thu, Aug 27 · 10:30 AM / IN 7 DAYS / Enrollment step with Tomás Okafor".

**Change:** remove the first sentence from the banner paragraph. The white card becomes the single source.

**Acceptance:** the date and the person for the next conversation appear once above the list.

---

### C4. "AFTER YOU BOOK" arrives too early

**Current content:**
- "The time lands on your calendar and on the team's, at the same moment."
- "What you wrote goes with the booking, so the team arrives prepared."
- "If it can't reach the team, it says so and stays in your list as Not booked. It's never shown as confirmed."

**Problem:** it is a block of text about failure modes delivered before the student does anything. She has not booked yet and has already read three warnings about what can go wrong. The third one pre-explains the `booking-fails` state, which, when it actually happens, explains itself perfectly well with its own alert and a "Try again".

**Change:** move the content into the booking confirmation, see 9.7. On the screen, keep only the NOT BOOKED state when it actually occurs, applied to the specific item, as it already works today.

**Acceptance:** the block does not appear in any state of the screen.

---

### C5. Copy that explains the mechanism instead of guiding

**Current:**
- Banner: "Your next conversation is in 7 days, with Tomás Okafor. You choose from the times each team published. You can't propose a different one."
- List header: "What it's about decides which team receives it."

**Problem:** both explain internal architecture in a headline position, answering a question the student has not asked yet. The banner sentence also has the additional defect of being factually wrong, see A2.

**Change:** the banner sentence is replaced by the stable subtitle in 8.1, identical across the seven states, and the list subtitle is removed, its meaning moving into the `How booking works` link in the header. See T4.

**Order:** apply A2 before C5. The factual correction comes first, the demotion second.

**Acceptance:** no booking-rule explanation in the banner or in a section header.

---

### C6. "NOW" contradicts the dates

**Current:** the label says "TIMES OPEN NOW" and the times start on future dates, "from Aug 21" and "from Aug 25".

**Change:** the label goes with C1. Nothing inherits the word "now" to describe published times.

---

### C7. Contrast below the minimum

**Current, measured:**
- Footer links "Privacy", "Accessibility" and "Help": 8.5px, colour `rgb(154, 160, 176)`, contrast 2.41:1.
- "Cancelled" and "Completed" badges: 9.5px, colour `rgb(104, 112, 134)`, contrast 4.34:1.

**Problem:** WCAG AA asks for 4.5:1 on normal text. Both cases fall below, and the footer falls well below. The screen links "Accessibility" from the very footer that fails.

**Change:** darken both colours to at least 4.5:1 against the background they sit on. `--ink-400` moves to `--ink-500` or darker in these two cases.

**Acceptance:** no text on the screen below 4.5:1.

---

### C8. The advisor block leaves the screen

**Current:** the white card below the banner carries, on the right, the block "TO / YOUR ENROLLMENT ADVISOR / Tomás Okafor · Admissions Office" with two icon-only buttons, an envelope and a speech bubble. It appears in the `registration-open`, `empty`, `booking-fails` and `partial` states.

**Problem 1, it contradicts the screen's model.** Appointments routes by subject, not by person: "What it's about decides which team receives it". There are three teams. Pinning one person from one of them at the top teaches that she is the route to everything, which is false. For financial aid the conversation is with Amara Nwosu.

**Problem 2, it repeats what sits beside it.** In `registration-open` the same card already says "Enrollment step with Tomás Okafor". The name appears twice, inches apart.

**Problem 3, the icons do not explain themselves.** An envelope and a speech bubble, unlabelled, read as the same thing.

**Change:** remove the advisor block from the white card, in every state of this screen. The space freed on the right takes the A3 actions, `Add to calendar` and `Reschedule`, which otherwise have nowhere to sit.

**Divergence from the reference screen, and it is intentional:** on My Enrollment the block makes sense, because enrollment is a single track and the advisor owns it. Appointments has no single owner. The two unlabelled icons remain a problem on the reference screen, and fixing them belongs to that screen's work, not to this document.

**Acceptance:** no advisor block appears above the list, in any state of this screen.

---

### L1. The main task sits below the fold

**Current:** the screen is called Appointments and its job is booking, but "Book a conversation" starts at the edge of the visible area and the options are cut off.

**Change:** the space comes from C3 and C4, which remove content, and from the permanent card being shorter than the table it replaces. Do not resize the banner or the column; both are components shared with the reference screen.

**Acceptance:** at least two complete list rows visible without scrolling, at a 1440x900 viewport.

---

### L2. The floating button covers content

**Current:** the floating "Ask Edward" button sits on top of content in the bottom right corner and truncates its last line.

**Change:** reserve bottom spacing greater than the floating button's height at the end of the content.

**Acceptance:** no content truncated by the button, in any state.

---

## 6. Findings per state

The items above already absorb these. This section exists for verification.

**E1. `empty` and `no-times` have a primary action, `registration-open` does not.** In `empty`, the "Your conversations" section becomes a block titled "Nothing booked yet", with an explanation and a "Book a conversation" button. In `no-times`, it becomes "No team has published times yet" with an "Email the Admissions Office" button. Basis for A6.

**E2. The dark card renders zero in `no-times`:** "TIMES OPEN NOW / 0 / across 0 of 3 teams". Basis for C1, problem 5.

**E3. `booking-fails` explains itself.** An alert at the top with what happened and what is still possible, a "Try again" button, and a NOT BOOKED badge on the item. Basis for C4 and A5.

**E4. `partial` repeats the same message three times.** Alert at the top, "Times unavailable" in all three rows, "TIMES OPEN NOW / Not available" in the card. Basis for C2.

**E5. The "Ask a team for another time" button persists in every state**, including `no-times`, where no team has published anything. Basis for A2.

**E6. `loading` uses skeletons**, 21 elements, with the accessible text "Loading this section.". It is correct and needs no change. After C1, check that the right column's skeletons match the new pair of cards.

**E7. `error` replaces the whole page** with a title, an explanation that nothing the student sent was affected, and "Try again". Correct.

---

## 7. What not to change

**N1. The "About" field.** Carrying the student's question in her own words into the meeting is the best detail on the screen. If something has to be cut for space, it is not this. Give it more visual weight, not less.

**N2. That "Past and cancelled" exists.** Keeping a record of who she has already spoken to is right. The problem is the cancelled item having no way out, see A5.

**N3. Explicit duration on each topic.** It is cost information and it helps her decide. It moves position in A1, but it does not go.

**N4. The banner as a shared component.** See L1.

**N5. The treatment of the failure states.** `booking-fails`, `partial` and `error` explain honestly, say what was not affected, and offer a way out. They are the best work on the screen and set the standard for the rest of it.

**N6. The badge set.** CONFIRMED, CANCELLED, COMPLETED and NOT BOOKED is coherent.

---

## 8. Copy

Everything in this section is final. Left column is what is on screen today, right column is what ships. Strings that do not appear here do not change. All of it is English and goes in as written.

### 8.1. Banner

The banner subtitle becomes the same across all seven states. Today it changes per state and carries information that belongs to the card below it.

| State | Today | New |
|---|---|---|
| `registration-open`, `empty` | "Your next conversation is in 7 days, with Tomás Okafor. You choose from the times each team published. You can't propose a different one." | "Each team publishes the times it can offer. Pick one, or ask for a time that works better." |
| `no-times` | "Aster's teams publish the times they can offer here. None of them has opened a calendar yet, so there is nothing to book, and nothing waiting on you." | same sentence as above |
| `error` | "Time with the offices that own a step, booked, confirmed, and in one calendar." | same sentence as above |

Information about the next conversation leaves the banner and lives only in the white card, see C3.

### 8.2. "YOUR NEXT CONVERSATION" card

| State | Today | New |
|---|---|---|
| `no-times` | "No team has published times yet. They appear on this page as each one opens its calendar; you do not have to ask for that." | "No team has published times yet. They show up here as each one opens its calendar. If you can't wait for that, you can ask a team for a time." |
| `empty` | "24 times are open across Aster's teams. Picking one is the whole of booking. There is nothing to wait for afterwards." | "24 times are open across Aster's teams. Pick one and it's booked, with nothing to wait on. If none of them work, you can ask a team for a different time." |

### 8.3. List header

| Element | Today | New |
|---|---|---|
| Eyebrow | does not exist | "BOOK A CONVERSATION" |
| Title | "Book a conversation" | "What it's about" |
| Subtitle | "What it's about decides which team receives it." | removed |
| Header link | does not exist | "How booking works" |

Contents of the "How booking works" panel: "What you write it's about decides which team gets it. Each team publishes its own times, and picking one books it on the spot. If none of the published times work, you can ask that team for a different one, and they come back to you here."

### 8.4. List rows

| Element | Today | New |
|---|---|---|
| Category eyebrow | does not exist | the portal category in uppercase, e.g. "MONEY AND AID", see A9 |
| Metadata | "Admissions Office · 30 minutes" and, on the right, "Next Aug 21" with "14 times open" | "Admissions Office · 30 min · Next Aug 21 · 14 open" |
| Button, row with times | does not exist | "Choose a time" |
| Link, row with times | does not exist | "Ask for another time" |
| State, row without times | "No times available" | "No times published yet" |
| Button, row without times | does not exist | "Ask for a time" |
| Link, row without times | "See why" | "Tell me when times open" |
| State after notification is set | does not exist | "We'll tell you when this team opens times." |
| Metadata, `partial` state | "Times unavailable" | "Times couldn't be loaded" |

Text for the row without times, **directly in the row, no click and no accordion**, using the `.no-slots` class that already exists in the CSS: "They haven't opened a calendar yet. You can ask for a time, or wait and we'll tell you when they open one."

The general booking rule does not live here. It lives in the permanent card in the right column, see 8.9.

### 8.5. Empty-state blocks in "Your conversations"

| State | Element | Today | New |
|---|---|---|---|
| `empty` | title | "Nothing booked yet" | unchanged |
| `empty` | body | "You have not taken any of the 24 times Aster's teams have published. Booking one is a single choice. There is no request to wait on afterwards." | "You haven't taken any of the 24 times Aster's teams have published. Picking one books it straight away. If none of them fit, asking a team for a different time is the other way, and that one you wait on." |
| `no-times` | title | "No team has published times yet" | unchanged |
| `no-times` | body | "This is a different kind of empty: nothing is booked because there is nothing to book. Each team opens its calendar when it is ready, and the times appear here on their own. If something cannot wait for that, the office is still the route." | "Nothing is booked because there's nothing to pick from yet. Each team opens its calendar when it's ready, and the times show up here on their own. If what you need can't wait, ask a team for a time and they'll come back to you." |
| `no-times` | button | "Email the Admissions Office" | "Ask a team for a time" |

### 8.6. Appointments and badges

| Element | Today | New |
|---|---|---|
| Button, CONFIRMED item | does not exist | "Add to calendar" |
| Link, CONFIRMED item | does not exist | "Reschedule" |
| Button, CANCELLED item | does not exist | "Book this again" |
| New badge, see A7 | does not exist | "REQUESTED" |
| Support line on a REQUESTED item | does not exist | "Waiting on the team. Their answer shows up here." |
| Link on a REQUESTED item | does not exist | "Cancel request" |

### 8.7. Primary action band, see A6

| Case | Band label | Button |
|---|---|---|
| A NOT BOOKED item exists | "This one didn't reach the team" | "Try again" |
| Nothing booked, times published | "Start here" | "Book a conversation" |
| A topic has no open calendar while others do | "Academic Advising hasn't opened a calendar yet" | "Ask for a time" |

The third label uses the name of the team whose calendar is closed. It is not fixed text.

### 8.8. Collapsible headers, see A8

| Section | Closed | Open |
|---|---|---|
| Your conversations | "Your conversations · 2" | "Your conversations" |
| Past and cancelled | "Past and cancelled · 2" | "Past and cancelled" |

The number is the section's item count. When a section is empty, the header shows no number and the body carries the empty-state block from 8.5.

Accessible name of the control: "Show Your conversations" and "Hide Your conversations", alternating with the state.

### 8.9. Right column cards, see C1

**Permanent card, all states**

| Element | Text |
|---|---|
| Label | "HOW BOOKING WORKS" |
| Body | "Each team publishes the times it can offer, and picking one books it on the spot. If none of them work, you can ask that team for a different time and they come back to you here." |
| Body, `partial` state | "The published times couldn't be loaded. Conversations you've already booked aren't affected." |
| Footer | "Times updated 20 minutes ago · Aster scheduling" |
| Link | "How booking works" |

**Conditional card, only when a REQUESTED item exists**

| Element | Text |
|---|---|
| Badge | team name, e.g. "ACADEMIC ADVISING" |
| Title | "Waiting on a team" |
| Body | "You asked for a time on Aug 21. They haven't answered yet. Nothing is booked until they do." |
| Action | "See the request" |

The date in the body is the date of the request, not fixed text.

### 8.11. Office naming

These names are portal-wide, not specific to this screen. Applying them on Appointments alone would put the two screens in different vocabularies, which is the exact problem A9 exists to fix.

| Category | Office | Note |
|---|---|---|
| YOUR OFFER | Admissions Office | already in use |
| MONEY AND AID | Financial Aid Office | replaces "Student Financial Services" |
| HEALTH AND WELLNESS | Student Health Services | **keeps "Services", see below** |
| ABOUT YOU | Registrar's Office | the registrar owns student records and contact details |
| CAMPUS LIFE | Residence Life Office | owns the housing plan task |
| academic advising | Academic Advising Office | plus the department, e.g. "Academic Advising Office, Computer Science" |

**Why health is the exception.** "Student Health Services", "University Health Services" and "Student Health Center" are what a US student sees on every campus. "Student Health Office" is not idiomatic. For this audience, being recognisable beats internal symmetry, so this one keeps its name.

**Why "Financial Aid Office" and not "Student Financial Services".** They are not the same thing. Financial aid covers grants and loans; student financial services usually merges aid with billing and the student account. The task on the reference screen is verifying income to release a federal loan, which is financial aid.

**Strings on the reference screen that change with this.** These are outside this screen and have to be changed together, or the two screens diverge:

| Screen | Today | New |
|---|---|---|
| My Enrollment, "Verify your household income" | "Student Financial Services needs to confirm the income you reported. Your federal loan stays pending until they do." | "The Financial Aid Office needs to confirm the income you reported. Your federal loan stays pending until they do." |
| My Enrollment, "Send your immunization record" | "Aster University Health Services needs your immunization record. You can't register for classes until it's on file." | "Student Health Services needs your immunization record. You can't register for classes until it's on file." |

The second string is quoted from the visible part of the task description; confirm the full sentence in the build before replacing it.

**Strings on Appointments that change with this.** Every occurrence of "Student Financial Services" becomes "Financial Aid Office", including the metadata line in 8.4, the drawer description in 9.4 and the appointment items under "Your conversations".

### 8.10. Copy that is removed

| Where | Text | Why |
|---|---|---|
| Right column | "TIMES OPEN NOW", "24", "across 2 of 3 teams" and the per-team table | C1, the card changes content and the column stays |
| Right column | the whole "AFTER YOU BOOK" block, three lines | C4, moves into the booking confirmation |
| Right column | the "Ask a team for another time" button | A2, the action becomes a row action |
| White card | the "TO / YOUR ENROLLMENT ADVISOR / Tomás Okafor · Admissions Office" block and its two icon buttons | C8 |
| White card | "Each team publishes its own times, and only what it publishes can be booked. A team with none has not gone quiet on you, it has not opened that calendar yet." | rewritten in 8.9 |
| Right column | "Times updated 20 minutes ago" and "Aster scheduling" | not removed, they become the permanent card's footer, see 8.9 |

---

## 9. Booking drawer

New surface. Today the product has nowhere to pick a time: the list row is not clickable and there is no picker anywhere in the prototype. Without this section, the `Choose a time` button from A1 is a dead button.

### 9.1. Pattern and components

It is a drawer, not a page and not a centre modal. It uses the same component as the drawers that already exist in the portal.

| Element | Existing class | Behaviour already defined in the CSS |
|---|---|---|
| Backdrop | `.modal-scrim` | fixed at `inset: 0`, `#0d122366`, `backdrop-filter: blur(5px)`, `z-index: var(--z-scrim)` |
| Panel | `.drawer` | fixed right, `width: min(465px, 100vw)`, `height: 100vh`, enters via `drawerIn` over 0.26s from `translateX(100%)` |
| New modifier | `.booking-drawer` | follow the convention of `.person-drawer`, `.document-drawer` and `.residence-drawer` |
| Sticky header | `.drawer-header` | sticky top, 67px tall, bottom border `1px solid var(--line)`, `#fffffff0` background with blur |
| Header label | `.drawer-label` | uppercase, `var(--muted)`, `letter-spacing: var(--ls-caps)` |
| Scrollable body | `.drawer-content` | `padding: var(--space-11) var(--space-11) var(--space-13)` |
| Icon | `.drawer-icon.appointment` | 49x49, `var(--radius-row)`, `var(--purple-dark)` on `var(--purple-soft)`. **The `appointment` variant already exists in the CSS.** |
| Title | `.drawer-title` | `var(--fs-display)`, `var(--fw-heavy)`, `var(--ls-tight)` |
| Description | `.drawer-description` | `var(--muted)` |
| Tabs | `.drawer-tabs` | bottom border `1px solid var(--line)` |
| Note with icon | `.picker-note` | `var(--fs-meta)`, `var(--muted)`, icon on the left |
| Empty, no times | `.no-slots` | `var(--fs-copy)`, `var(--muted)` |
| Footer buttons | `.drawer-actions` with `.primary-button` and `.secondary-button` | column, `gap: var(--space-4)`, secondary at full width |
| Close | `.icon-button` inside `.drawer-header` | |

One new class is needed: `.slot-option`, the button for an individual time in the list. There is no equivalent in the CSS. Inherit the radius from `var(--radius-row)` and the same selected treatment used by `.category-chip`.

### 9.2. Where the drawer opens from

| Trigger | Tab it opens on |
|---|---|
| `Choose a time` button on a row | Published times |
| `Ask for another time` link on a row | Ask for a time |
| `Ask for a time` button on a row without times | Ask for a time |
| The action band button, see A6 | Published times, or Ask for a time when no times are published |
| The empty-state block button, see 8.5 | Published times |

The drawer is always about one topic. The topic comes from the row that opened it and is not editable inside. That keeps the screen's rule intact, which is that the subject decides the team.

### 9.3. Header

- `.drawer-label`: the portal category in uppercase, e.g. "MONEY AND AID". The owning team appears in the description, see 9.4.
- a close `.icon-button` on the right, with the accessible name "Close"

### 9.4. Body, top

1. `.drawer-icon.appointment`
2. `.drawer-title`: the topic, e.g. "Financial aid"
3. `.drawer-description`: the same sentence already in the list row, plus the owning office and the duration. E.g. "Your package, what a figure means, or what happens to it if something changes. Financial Aid Office, 30 minutes."
4. `.drawer-tabs` with two tabs, in this order: "Published times" and "Ask for a time"

### 9.5. "Published times" tab

Times grouped by day. Each day is a `.drawer-subheading` with the date written out, and below it a list of `.slot-option`.

- Single selection. Selecting a time books nothing, it only marks.
- `.picker-note` below the list with the format of the meeting: "In person, Building C, ground floor." or "Video call."
- An "About" field, required, below the times:
  - Label: "What's it about?"
  - Help: "One line is enough. It goes to the team with your booking, so nobody starts from nothing."
  - Placeholder: "Whether the transcript I uploaded is the one Admissions needs."
- `.drawer-actions`: a `.primary-button` "Book this time", disabled until a time is selected and the About field is filled, and a `.secondary-button` "Cancel".

When the team has no published times, the tab shows only the `.no-slots` text from 8.4 plus a `.secondary-button` "Ask for a time" that switches to the second tab. Never leave the tab empty.

### 9.6. "Ask for a time" tab

- Opening text: "None of the published times work? Tell this team what does, and they'll come back to you here."
- Field "When could you meet?", free text, required. Help: "Days and rough times are enough."
- "About" field, same as the first tab, required.
- `.picker-note`: "This one isn't instant. Picking a published time books it on the spot, a request waits on the team."
- `.drawer-actions`: a `.primary-button` "Send request" and a `.secondary-button` "Cancel".

### 9.7. What happens next

| Action | Result |
|---|---|
| "Book this time" succeeds | drawer closes, the item enters "Your conversations" with a CONFIRMED badge |
| "Book this time" and the booking does not reach the team | drawer closes, the item enters with a NOT BOOKED badge and the alert the `booking-fails` state already uses |
| "Send request" | drawer closes, the item enters with a REQUESTED badge, see A7 |
| "Cancel" or close | nothing is saved |

There is no separate confirmation screen. The "AFTER YOU BOOK" block removed from the page in C4 becomes the confirmation here: after "Book this time", the drawer can close showing the result in the list, and those three sentences become the confirmation copy.

### 9.8. Accessibility

- `role="dialog"` and `aria-modal="true"` on the `.drawer`
- focus moves to the `.drawer-title` on open and returns to the triggering button on close
- focus is trapped inside the drawer while it is open
- Esc closes
- clicking the `.modal-scrim` closes
- the tabs follow the tablist pattern with arrow-key navigation

---

## 10. Component and token map

No item in this document creates new styling, with the single exception of `.slot-option`. Where this document states a pixel value, it is describing what renders today. **What gets implemented is the token, not the number.**

### 10.1. The product's type scale

| Token | Value | Where it is already used |
|---|---|---|
| `--fs-hero` | `clamp(25px, 2.5vw, 34px)` | banner H1 |
| `--fs-figure` | 27px | the "24" numeral, which goes in C1 |
| `--fs-display` | 21px | "Thu, Aug 27", "5 of 14 steps complete", `.drawer-title` |
| `--fs-h` | 17px | section titles and row titles on the reference screen |
| `--fs-body` | 12.5px | demoted row titles on the reference screen |
| `--fs-copy` | 11.5px | "Next Aug 21", `.no-slots` |
| `--fs-meta` | 10.5px | "Admissions Office · 30 minutes" |
| `--fs-small` | 9.5px | "14 times open", the "How this works" link, "Unlocks 3 more steps" |
| `--fs-micro` | 8.5px | footer links, `.drawer-foot` |

Weights: `--fw-heavy` is 750, `--fw-semi` is 600. Uppercase tracking: `--ls-caps`, `.08em`.

**A finding that hardens T1:** the Appointments row title renders at 15px. That value does not exist in the scale. It is not only a divergence from the reference screen, it is off the design system.

### 10.2. Which component each item uses

| Item | Element | Use |
|---|---|---|
| T1 | row title | `--fs-h`, normal weight, `H3` tag |
| T4 | section header | the same header component as My Enrollment, with an uppercase eyebrow at `--ls-caps` |
| T5 | unavailable row | `--fs-body` on the title, same as the guide's demoted sections |
| A1 | row button | `.primary-button` |
| A1 | row link | `.secondary-button` or `.text-button`, the same one the guide's "How this works" uses, at `--fs-small` weight `--fw-semi`, colour `var(--muted)` |
| A1 | category eyebrow | uppercase with `--ls-caps`, `--fs-small` |
| A2 | ask-for-a-time action | opens the drawer in section 9, "Ask for a time" tab |
| A2 | new-times notification | inline button, no drawer and no accordion. After the click the button is replaced by text in the same position |
| A3 | appointment actions | `.primary-button` and `.secondary-button` |
| A5 | cancelled item action | `.primary-button`, opens the drawer in section 9 |
| A6 | band | the same band component as My Enrollment |
| A7 | REQUESTED badge | `.status-pill`, the same class as the current badges |
| A8 | collapsible sections | `.requirement-head`, `.requirement-chevron` and the `open` class pattern from the My Degree screen |
| C1 | right column | `aside.page-rail`, the same as the reference screen |
| C1 | permanent card | position and treatment of `.momentum-card` |
| C1 | conditional card | position and treatment of `.skipped-card`, with `.resume-badge` |
| C1 | no-times explanation | `.no-slots`, text directly in the row |
| C7 | contrast | swap `--ink-400` for `--ink-500` or darker in the two cases named |
| 8.3 | "How booking works" link | `.how-panel`, the same class the guide's "How this works" uses |

### 10.3. What is an accordion and what is not

| Element | Pattern | Note |
|---|---|---|
| "Book a conversation" section | **does not collapse** | it is the screen's task and stays open |
| "Your conversations" section | **accordion**, see A8 | open by default |
| "Past and cancelled" section | **accordion**, see A8 | closed by default |
| Picking a time and asking for a time | drawer, section 9 | |
| "How booking works" | `.how-panel` panel | |
| No-times explanation | none, plain text in the row via `.no-slots` | |
| General booking rule | permanent card in the right column, with a link to `.how-panel` | |
| New-times notification | none, an inline button that becomes text | |

---

## 11. Execution order

The items affect each other. In this order nothing breaks along the way.

| Step | Items | Why |
|---|---|---|
| 1 | A2, copy in 8.1, 8.2, 8.5 | fixing false information is the most urgent thing and depends on nothing |
| 2 | Section 9, the drawer | every booking action depends on it existing |
| 3 | A9 and the naming in 8.11 | the list has to be in the right taxonomy, and under the right office names, before it gets structure. The two reference-screen strings change in this step. |
| 4 | A1, T1, T5, copy in 8.4 | the list gains action and hierarchy, and now has somewhere to point |
| 5 | A7 | the REQUESTED badge only makes sense once asking exists |
| 6 | C1 and C4 | rebuild the right column |
| 7 | L1 | the space only exists after step 6 |
| 8 | T4, C3, C5, C8, copy in 8.3 | header and banner cleanup |
| 9 | A3, A5, A8 | appointment actions and collapsing the history sections |
| 10 | C7, L2 | accessibility and finishing |
| 11 | C2, C6 | final check for repetition and vocabulary across the seven states |
