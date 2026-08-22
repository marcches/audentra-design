# My Campus Life changes (Aster New Student Portal / Audentra)

**Target screen:** `/#/events` and `/#/clubs`, two tabs of one screen
**Reference screen:** `/#/my-enrollment`
**Prototype:** audentra-design.vercel.app
**Strings and measurements read from the build of 2026-08-21**

---

## 0. Instructions for whoever implements this

### 0.1. The principle that governs this document

**My Enrollment is the portal's reference screen.** Every divergence between screens is resolved in favour of My Enrollment. Where this document specifies a value or a component, it is deriving it from the reference screen.

This applies to form, not to logic. The component is the same; the rule that decides what goes inside it belongs to each screen.

### 0.2. Product rules these items rest on

| # | Rule |
|---|---|
| 1 | This is **one screen with two tabs**, Events and Clubs. The banner, the required-sessions block, the interests block and the provenance block are shared and persist across both. |
| 2 | Aster Student Life publishes everything here. **The portal only shows it.** No content on this screen is generated, ranked by engagement, or edited by the portal. |
| 3 | **Required sessions are not campus life.** They are obligations from another office that happen to be scheduled events, and the screen keeps them visually separate from what she chooses. |
| 4 | Club cards carry a **published emblem**, from Aster Student Life. Never a photograph of people, never stock, never generated. Event cards are unchanged. |
| 5 | Reading or opening anything here **changes nothing**: not her interests, not her progress, not her points. The screen says so and it stays true. |

### 0.3. How to read the items

Every item states the current behaviour, the problem, the change, and an acceptance criterion. All of them are meant to be implemented. There are no conditional items.

All new copy is in section 6. No placeholders.

### 0.4. Everything ships in English

The product's interface language is English. Every string in section 6 is final English copy and goes to the screen as written. Do not translate, localise or paraphrase. Class names, tokens and state slugs are literal.

### 0.5. Scope

Desktop, both tabs. Responsive and mobile layout are out of scope. Two of the six states were inspected, `ready` and `full-board`. The other four follow the portal's established patterns.

---

## 1. How to load each state

| State | Slug | Preview description |
|---|---|---|
| Ready | `ready` | "One required session, thirteen events and six clubs." |
| Full board | `full-board` | "Three required sessions, forty-three events, eighteen clubs." |
| Nothing published | `empty` | "Before Student Life publishes anything at all." |
| Loading | `loading` | "Before the published board arrives." |
| Partial data | `partial` | "Events loaded; the club list did not." |
| Error | `error` | "Nothing Student Life published could be loaded." |

URL pattern: `/?state=<slug>#/events`, base `https://audentra-design.vercel.app`

---

## 2. What the screen holds today

**Shared:** the banner, "CAMPUS LIFE · PUBLISHED BY ASTER STUDENT LIFE / Find your people. / Events, clubs, and the people who run them, published by Aster Student Life. One session is required. Everything else is yours to choose." Then the two tabs.

**Events tab.** Two view filters, "For you", "Everything", "Past", then category chips, then a count, then "Picked for your interests" with a number, then a list of event rows. Below, "Everything else at Aster", grouped by "THIS WEEK", with a "Show more" and a remaining count.

**Clubs tab.** A count, category chips, then club rows, each with the name, category, a match label, a description, a meeting time and place, a named contact, and the club's latest published update with its date. A "Show more" with a remaining count.

**Right rail, shared:** "Required for you" with a count and the required sessions; "YOUR INTERESTS" with the chosen interests, the sentence that nothing here changes them, and a link to the profile; "WHERE THIS COMES FROM", naming Aster Student Life, the editor, the update time and a named coordinator, with "Ask Student Life".

---

## 3. What is right and must survive

**R1. The screen refuses to be a feed.** "Aster Student Life publishes every event and organization on this page. Aster staff write it in the campus life editor. The portal only shows it." A campus life page that says out loud it is not ranking her by engagement is doing something almost nothing in this category does.

**R2. Reading changes nothing, and it says so.** "Nothing you read or open here changes your interests, your progress, or your points." On a portal that awards points for tasks, stating that browsing is not instrumented is the difference between a page she can wander and a page she is being measured on.

**R3. Matching is disclosed, not hidden.** Each matching row carries "Matches Music" or "Matches Volunteering", and the interests block says where the match comes from and how to change it. The student can see the rule.

**R4. Every club names a person.** Dana Whitfield, Miguel Santos, Noor Haddad, Rae Okonjo. A club is people, and the card says which.

**R5. Clubs carry their own latest update, dated.** "Aug 18 Auditions for the autumn concert close on Sep 12." And where there is none, "No updates published yet", which is honest rather than empty.

**R6. RSVP requirements are stated per event.** "RSVP by email", "Book a shift", "No RSVP needed". Three different answers, each true for its event.

---

## 4. Items

### C1. Required sessions sit in the rail, and they are the only thing on the screen that is not optional

**Current:** "Required for you" is a rail card with a count. In `ready` it holds "New Student Orientation", Aug 27, with "Blocks class registration" and "Required by Office of the Registrar". In `full-board` it holds three, from two different offices.

**Problem:** the rail is where this screen puts reference material, the interests and the provenance. A session that blocks class registration is not reference material. It is the only item on the whole screen with a consequence, and it sits in the column the student scans last.

The banner already knows this matters: it says "One session is required. Everything else is yours to choose." The layout then does the opposite of what that sentence promises.

**Change:** required sessions move into the main column, above the tabs, in the band component from the reference screen. They stay visually distinct from published events, per rule 3 in 0.2, because they come from another office and are not a choice.

The rail card is removed. The interests and provenance cards stay.

**Acceptance:** in every state, a required session appears above the tab content and never in the rail.

---

### C2. Required sessions have no action

**Current:** each required session states its date, time, and the office requiring it. Nothing else. Optional events carry "RSVP by email", "Book a shift" or "No RSVP needed", so an optional event tells her what to do and a mandatory one does not.

**Change:** every required session carries the same RSVP line the optional events carry, plus an add-to-calendar action. A session that blocks class registration and cannot be missed is the strongest candidate on the screen for a calendar entry.

**Acceptance:** no required session renders without stating what the student has to do about it.

---

### C3. The event list has three filter systems stacked

**Current, Events tab:** a view switch, "For you", "Everything", "Past"; a category row, "All", "Academic", "Career", "Community", "Music", "Orientation", "Social", "Volunteering", "Wellness", which grows to eleven categories in `full-board`; a count, "11 events"; then a sub-heading "Picked for your interests" with its own count; then, further down, a second section "Everything else at Aster" grouped by week.

**Problem:** "For you" and "Picked for your interests" are the same idea expressed twice, one as a filter and one as a section. With the "Everything else at Aster" section below, the page is simultaneously filtered and not filtered, and the count at the top does not say which of the two lists it refers to.

**Change:** one system. The view switch stays and drives the whole list. When "For you" is active, the list is the matching events, and "Everything else at Aster" becomes the way to leave that view rather than a second section stapled below it. The count states what it counts.

**Acceptance:** the tab shows one list at a time, and the count names which list it belongs to.

---

### C4. Clubs cannot be joined and events cannot be saved

**Current:** every row on both tabs is read-only. The only controls are filters and "Show more". Club rows end at the contact name; event rows end at a text label describing how to RSVP, which is not itself a control.

**Problem:** the screen is called "Find your people" and offers no way to record that she found any. "RSVP by email" is an instruction to leave the portal and compose a message, with no address on the card.

**Change:**

1. Event rows take a primary action matching their RSVP requirement: a booking control where the event takes bookings, a mail control where it is by email, and no control at all where none is needed. Where it is by email, the control opens a message to the named host, so she does not have to find the address.
2. Club rows take a secondary action to contact the named person, and a primary action to register interest.
3. Per rule 4 in 0.2, none of these change her interests, her progress or her points, and the copy that promises that stays exactly as written.

**Acceptance:** no row states what the student should do without offering the means to do it.

---

### C4b. Club cards have nothing to look at

**Current:** every club row is text only. Name, category, match label, description, meeting time and place, contact name, latest update.

**Problem:** this is the screen called "Find your people", and it is the one place in the portal where a student decides whether she belongs somewhere. A club is a thing with an identity, and the card gives it a sentence. Six rows of identical grey text is a directory, not a choice.

**Change:** each club card carries a **published emblem** in the leading slot, at the size and radius the residence monogram uses on the Housing screen.

**An emblem, not a photograph, and the reason is not decoration.** A campus life photograph is a photograph of students, and the people in it did not agree to become recruitment material shown to a stranger reading a portal. An emblem carries the club's identity and carries nobody's face. It also survives every state: a club with two members and a club with two hundred both have one.

**The rules:**

1. The emblem is **published by Aster Student Life**, in the campus life editor, like everything else on this screen. The portal only shows it.
2. **No photograph of people is used in this slot**, in any state, including as a fallback.
3. **Nothing is generated and no stock imagery is used**, per section 4.6 of the onboarding build spec.
4. **Where no emblem is published**, the slot falls back to the club's initials as a monogram, using the same treatment the Housing residence cards use today.
5. **Event cards are unchanged.** They keep the date block they have now and take no emblem.

**Acceptance:** every club card shows a published emblem or an initials fallback, no card in this screen displays a photograph of a person, and event cards are untouched.

---

### C5. Event titles are set at the brand size, and they outweigh their section

**Measured:** event titles are `SPAN` 15px weight 700. Club names are the same. The section title above them, "Events", is `H2` 17px weight 600.

**Problem:** 15px is the sidebar brand step and appears nowhere else in the product by design. The titles are also heavier than the section that contains them, which is the inversion every other document in this series removes.

**Change:** event and club titles become `H3` at `--fs-h`, 17px, weight 400, matching every other row title in the portal.

**Acceptance:** no title on the screen renders at 15px, and no row title is heavier than its section title.

---

### C6. The required-sessions heading is smaller than the rows it heads

**Measured:** "Required for you" is an `H2` at 11.5px weight 700. Every other section title in the portal is 17px weight 600. The rows beneath it are 13.5px weight 700.

**Problem:** the heading of the only mandatory block on the screen is the smallest heading in the portal, and it is smaller than its own contents.

**Change:** it takes the section treatment, 17px weight 600, and moves with the block into the main column, see C1.

**Acceptance:** the required block's heading matches every other section heading on the screen.

---

### C7. Required session titles are set at the navigation step

**Measured:** "New Student Orientation", "Academic integrity briefing" and "Halls fire safety briefing" are 13.5px weight 700. 13.5px is the navigation step, used by the sidebar and the tabs.

**Change:** they become row titles, `H3` at `--fs-h`, weight 400, like every other row on the screen.

**Acceptance:** 13.5px appears only on navigation.

---

### C8. The interests line is set at the brand size

**Measured:** "Music · Volunteering" is 15px weight 700, inside the rail card.

**Change:** it takes `--fs-body`, 12.5px, the step for content inside a rail card.

**Acceptance:** 15px appears only on the sidebar brand line.

---

### C9. No figure leads on this screen, and none should

**Measured:** the counts are small text. "43 events" is 10.5px weight 600, "14" beside "Picked for your interests" is 9.5px weight 750.

**Assessment:** this is correct and no change is needed. A count of events is not a summary figure; it is a label on a list. This screen has no card that summarises anything, so under the portal figure rule it carries no lead figure. Recorded here so that nobody adds one.

---

### C10. Accordion conformance

| Element | Collapses | Initial state |
|---|---|---|
| Event list | no | always open |
| Club list | no | always open |
| Required sessions | no | always open |
| Rail cards | no | always open |
| Tabs | not an accordion | Events by default |

Nothing on this screen collapses. "Show more" is pagination, not disclosure, and stays as it is.

---

## 5. Findings per state

**E1. `full-board` scales honestly.** Forty-three events, eleven categories, three required sessions from two offices, and the banner subtitle changes from "One session is required" to "3 sessions are required". The copy counts.

**E2. The required block grows correctly.** In `full-board` the three sessions name two different offices, Office of the Registrar and Housing Services, each on its own row. The screen does not collapse them into one authority.

**E3. `empty`, `loading`, `partial` and `error` were not inspected.** They follow the portal's established patterns on the other screens. `partial` is the one worth checking, because it loads one tab and not the other, which is a case no other screen in the portal has.

---

## 6. Copy

### 6.1. Required sessions, see C1 and C2

| Element | Today | New |
|---|---|---|
| Block heading | "Required for you" | unchanged, moved to the main column |
| Block support line | does not exist | "These come from other offices. They aren't campus life, and they aren't optional." |
| Session row, RSVP line | does not exist | the same three values the events use: "RSVP by email", "Book a shift" or "No RSVP needed" |
| Session row, action | does not exist | "Add to calendar" |
| Consequence line | "Blocks class registration" | unchanged |
| Authority line | "Required by Office of the Registrar" | unchanged |

### 6.2. Events tab, see C3 and C4

| Element | Today | New |
|---|---|---|
| View switch | "For you", "Everything", "Past" | unchanged |
| Sub-heading | "Picked for your interests" with a count | removed, the view switch carries this |
| Count | "11 events" | "11 events match your interests" when "For you" is active, "11 events" when "Everything" is |
| Second section | "Everything else at Aster" | becomes a line at the end of the "For you" list: "Not what you're looking for? See everything Aster has published." |
| Row action, bookable | "Book a shift" as a label | a control with the same words |
| Row action, by email | "RSVP by email" as a label | a control reading "Email the host" |
| Row action, none needed | "No RSVP needed" | unchanged, stays a label, no control |

### 6.3. Clubs tab, see C4

| Element | Today | New |
|---|---|---|
| Leading slot | does not exist | the published emblem, or the club's initials as a monogram |
| Contact name | the name alone | the name with a control, "Message Dana" |
| Primary action | does not exist | "I'm interested" |
| What the primary action does | does not exist | "Student Life passes your name to the club. Nothing about your record goes with it, and this doesn't change your interests or your points." |
| No updates | "No updates published yet" | unchanged |

### 6.4. Rail

| Element | Today | New |
|---|---|---|
| "Required for you" card | in the rail | removed, moves to the main column, see C1 |
| "YOUR INTERESTS" card | unchanged | unchanged |
| The promise line | "Nothing you read or open here changes your interests, your progress, or your points." | unchanged, see R2 |
| "WHERE THIS COMES FROM" card | unchanged | unchanged |

---

## 7. Component and token map

| Item | Element | Use |
|---|---|---|
| C1 | required block | the band component from My Enrollment, in the main column |
| C2, C4 | row actions | `.primary-button` and `.secondary-button` |
| C5, C6, C7 | titles | `H3` at `--fs-h` weight 400 for rows, `H2` at 17px weight 600 for sections |
| C8 | rail card content | `--fs-body` |
| C4b | club emblem | the size and radius the Housing residence monogram uses, in the leading slot of the club card |
| C10 | "Show more" | unchanged, it is pagination |

### 7.1. What is an accordion and what is not

Nothing on this screen collapses. The tabs are tabs. "Show more" is pagination.

---

## 8. Execution order

| Step | Items | Why |
|---|---|---|
| 1 | C3 | settle how many lists the Events tab has before anything is built on it |
| 2 | C1, C6, C7 | move the required block and fix its hierarchy in one step |
| 3 | C2 | give required sessions their action, once they are in the main column |
| 4 | C4, C4b | actions on both tabs, and emblems on the club cards |
| 5 | C5, C8 | the remaining off-scale sizes |
| 6 | C9, C10 | verify no figure leads and nothing collapses |
