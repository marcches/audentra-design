# Housing screen changes (Aster New Student Portal / Audentra)

**Target screen:** `/#/housing`
**Reference screen:** `/#/my-enrollment`
**Also referenced:** the Aster onboarding build spec, sections 4.6 and 5.4
**Prototype:** audentra-design.vercel.app
**Strings read from the build of 2026-08-21**

---

## 0. Instructions for whoever implements this

### 0.1. The principle that governs this document

**My Enrollment is the portal's reference screen.** Every divergence between screens is resolved in favour of My Enrollment. Where this document specifies a value or a component, it is deriving it from the reference screen.

This applies to form, not to logic. The component is the same; the rule that decides what goes inside it belongs to each screen.

### 0.2. Product rules these items rest on

| # | Rule |
|---|---|
| 1 | Housing and Health are **always present in the portal**. They only become required work when the student skipped them during onboarding. The screen has to say which of the two situations she is in. |
| 2 | Housing is a **preference**, never a booking. Housing Services assigns. The word "preference" stays. |
| 3 | The white card carries an **advisor, a named person**, with the eyebrow "YOUR ... ADVISOR". Housing Services has no advisor role, so this screen shows the enrollment advisor, and no housing decision routes to him. |
| 4 | Residence images are **published by Housing Services**, per tenant. Never stock photography, never generated. An image shows the residence, never a specific room. |

### 0.3. How to read the items

Every item states the current behaviour, the reference, the problem, the change, and an acceptance criterion. All of them are meant to be implemented. There are no conditional items.

All new copy is in section 7. No placeholders.

### 0.4. Everything ships in English

The product's interface language is English. Every string in section 7 is final English copy and goes to the screen as written. Do not translate, localise or paraphrase. Class names, tokens and state slugs are literal.

### 0.5. Scope

Desktop. Responsive and mobile layout are out of scope. Seven of the nine states were inspected: `ready`, `empty`, `onboarding-answered`, `deadline-passed`, `room-assigned`, `send-fails`, `partial`. `loading` and `error` were not, and both follow the portal's established pattern.

---

## 1. How to load each state

| State | Slug | Preview description |
|---|---|---|
| No plan yet | `ready` | "The first question unanswered, and the second one not yet asked." |
| Answered at onboarding | `onboarding-answered` | "Living on campus, three residences already ranked." |
| After the deadline | `deadline-passed` | "The submitted shortlist, and Housing Services assigning." |
| Room assigned | `room-assigned` | "A room that isn't the first preference, and is still valid." |
| A change that failed | `send-fails` | "A plan the server rejected, showing the last saved answer." |
| Nothing published | `empty` | "Before Housing Services publishes any residence." |
| Partial data | `partial` | "Your plan loaded; the residence catalog did not." |
| Loading | `loading` | "Before the published catalog arrives." |
| Error | `error` | "Nothing Housing Services publishes could be loaded." |

URL pattern: `/?state=<slug>#/housing`, base `https://audentra-design.vercel.app`

---

## 2. The diagnosis in one sentence

The writing on this screen is the best in the portal and the interface undercuts it in three places: the student is asked to choose where she will live for a year from two-letter monograms, three different states render as the same page, and the screen never says whether it is asking her for something or just holding a record she already gave.

---

## 3. What is right and must survive

**R1. "A preference is not an assignment."** The screen says it in the block, says what the order is worth, says Housing Services may assign somewhere she did not name, and in `room-assigned` closes the loop: "You ranked Alcott House second. Your first preference was not available, which is what a preference means: it told Housing Services where to start, and they worked down your list." Almost no housing product does this and it is the reason this screen works.

**R2. All four answers are framed as real.** "All four are real answers. Pick the one that's true." No default, no nudge toward the on-campus option that happens to be the revenue one.

**R3. Each answer states its consequence** in one line, before she picks: what gets ranked, what gets nothing, what stays open.

**R4. The assignment names a person.** "Assigned by Nadia Aslam, Housing Services", with the date. A room assignment is a decision someone made, not an output.

**R5. "Changing your housing answer"** explains that changing the answer changes what the checklist asks of her, and that after the deadline the thing changes category: "You change a room assignment by request, not by editing an answer."

**R6. `send-fails` says what the record still holds.** "Housing Services did not accept the change. Their record still says you are commuting, and that is what is shown above." It names the surviving truth instead of leaving her guessing which version is live.

---

## 4. Items

### G1. Residences are chosen from monograms

**Current:** each residence card shows a two-letter monogram, "FH", "BH", "GC", "CH", then the name, a one-line description, location, walking time, room types, price and meal plan.

**Against the onboarding spec:** section 4.6 states that Housing is one of only two steps that carry images, that they are published by Housing Services per tenant, and that the portal only shows them. The portal's residence cards carry no image.

**Problem:** this is the one decision on the whole portal where the student is choosing a physical place to live for a year, and the page gives her initials in a coloured square. Everything else on the card is text she could have read in a PDF.

**Change:** the residence card carries a published image, in a fixed ratio, cropped to fill, in the leading slot where the monogram sits today.

Per rule 4 in 0.2 and section 4.6 of the onboarding spec: the image shows the residence, never a specific room. Exteriors, shared spaces and floor diagrams are preferred over staged bedrooms, and where a bedroom is shown the caption names the room type it belongs to. A student who sees a furnished single and is assigned a shared double reads the image as a promise that was broken.

**When no image is published,** the monogram stays as the fallback, with the same treatment it has today. The fallback is never stock photography and never a generated image.

**Acceptance:** every residence card shows a published image or the monogram fallback, and no image implies a room type the card does not name.

---

### G2. The onboarding question and the portal question have different answers

**Current, portal:** four values, "Living on campus", "Commuting", "Arranging my own housing", "I need help deciding".

**Onboarding spec, section 5.4:** three values, "On campus", "Off campus", "Not decided yet", with "Three values only." stated explicitly.

**Problem:** an answer given at onboarding cannot round-trip into the portal. "Off campus" maps to either "Commuting" or "Arranging my own housing" and nothing decides which. "Not decided yet" and "I need help deciding" are not the same thing: one is an absence of a decision, the other is a request for help, and only the second implies Housing Services does something.

This matters more than a vocabulary mismatch, because per rule 1 in 0.2 the whole point of the onboarding step is that answering it there means not being asked again here.

**Change:** the portal's four values are the correct set, because they carry more information and each one states a real consequence. The onboarding spec adopts the same four. Where an existing answer of "Off campus" is held, the portal does not guess: it shows the answer as recorded and asks the one question that separates the two, once. Copy in 7.2.

**Acceptance:** the two surfaces offer the same answer set, and no answer is silently converted into another.

---

### G3. Three states render as the same page

**Current:** `ready`, `empty` and `partial` produce an identical page, the same length, with the same first question, the same second-question placeholder and the same rail.

**Why it happens:** the residence catalog only appears after the student picks "Living on campus", so a state defined by the catalog being unpublished or unloadable has nothing to show before she picks.

**Problem:** the difference lands on her exactly when she acts. In `empty` she picks "Living on campus" and there is nothing to rank. In `partial` she picks it and the list fails. The page had that information the whole time and said nothing.

**Change:** the second-question block states the catalog's condition before she answers the first question, in the place that already reads "A second question opens if you live on campus". Copy in 7.3.

**Acceptance:** the three states are distinguishable without picking an answer.

---

### G4. The screen never says whether it is asking her for something

**Current:** in `ready` the page presents both questions as open, with no indication of why she is on this page or whether anything is outstanding. In `onboarding-answered` it does state it, and states it well: "You answered this during onboarding, so it is already recorded."

**Against rule 1 in 0.2:** Housing is always present and only becomes required work when the student skipped it at onboarding. That is the single most useful fact about the page and it is only visible in one of the nine states.

**Change:** the page states its own obligation status in every state, in the white card from G5.

| Situation | What the card says |
|---|---|
| Answered at onboarding | it is recorded, and nothing is being asked |
| Skipped at onboarding | it is on her checklist, with the due date |
| Answered here, before the deadline | it is recorded and still changeable |
| After the deadline | it is submitted and Housing Services is assigning |
| Room assigned | the room, and that the plan is closed |

Copy in 7.1.

**Acceptance:** in every state, the card states whether the screen is asking for something.

---

### G5. The screen has no card under the banner

**Current:** the page goes from the banner straight into the first question. Every other screen in the portal has a white card there.

**Change:** add the white card, using the same component.

| Slot | Housing screen |
|---|---|
| Figure position | the plan status, per G4 |
| Support line | the deadline with days remaining, or the assignment when there is one |
| Second line | the shortlist state, "3 of 3 ranked", when the plan is on campus |
| Right side | the advisor block |

**Acceptance:** the card is present in every state and states the plan status, the deadline and the shortlist state.

---

### G6. The advisor block is missing

**Current:** no advisor anywhere on the screen. The only human named is Nadia Aslam, and only after a room is assigned.

**Change:** the advisor block goes in the white card, with the eyebrow "YOUR ENROLLMENT ADVISOR", the name in bold and the office as a suffix, matching the reference screen.

Per rule 3 in 0.2 the block is presence, not routing. No housing decision routes to him: the plan is recorded by Housing Services, the ranking goes to Housing Services, and the assignment is theirs. The block carries a scope line saying what he is for. Copy in 7.1.

**Acceptance:** the block appears, and no housing action routes to the advisor.

---

### G7. There is no primary action band

**Current:** the reference screen has a band above its list. Housing has none.

**Change:** adopt the band component. The rule is this screen's:

1. If a change was rejected, the band names it and the button is `Try again`.
2. If the first question is unanswered, the band names the deadline and the button is `Choose your plan`, which focuses the first question.
3. If the plan is on campus and the shortlist is not full, the band names how many slots are open and the button is `Rank residences`, which scrolls to the catalog.
4. In any other case, the band does not render.

**Where each case fires, in the states inspected:**

| State | Case | What appears |
|---|---|---|
| `ready`, `empty`, `partial` | 2 | the first question is unanswered |
| `onboarding-answered` | 4 | the plan is answered and the shortlist is full |
| `send-fails` | 1 | the change was rejected |
| `deadline-passed`, `room-assigned` | 4 | nothing is open |

**Acceptance:** the band never asks for something the deadline has closed, and never renders after a room is assigned.

---

### G8. The shortlist is not reachable from the catalog

**Current:** the shortlist sits above the residence list. A card in the catalog reads "Your shortlist is full. Remove one to add this", and the removal happens somewhere else on the page.

**Problem:** the card states a blocking condition and offers no way to resolve it from where she is reading. With a long catalog the shortlist is off screen when she hits the message.

**Change:** the message becomes an action that takes her to the shortlist, and the shortlist stays reachable while she scrolls the catalog. Copy in 7.4.

**Acceptance:** from any card that reports a full shortlist, the shortlist is one interaction away.

---

### G9. The rail is three long explanations and one deadline

**Current:** "ANSWER BY" with the date, days remaining, the Housing Services location and hours, and the reply time. Then "WHAT A PREFERENCE IS WORTH", a paragraph. Then "Changing your housing answer", another paragraph. Then a published-on line.

**Problem:** the two paragraphs say the same thing the main column already says, and say it at length. "A preference is not an assignment" appears in the ranking block and again in the rail, in fuller form. The rail is the place a student scans for a fact, and here it holds two essays.

**Change:** the rail keeps the deadline card and the Housing Services card, and the two explanations collapse into one card with a link, following the pattern used elsewhere in the portal for rules of the system. Copy in 7.5.

**Acceptance:** no explanation appears in full in both the main column and the rail.

---

### G10. Sort exists, filters do not

**Current:** the catalog offers "Lowest rate" and "Closest" as sorts, and the cards carry room type, price, meal plan and walking time.

**Onboarding spec, section 5.4:** filters are available for the attributes shown on the cards, and a filter that would return nothing is disabled with the reason rather than returning an empty list.

**Change:** the attributes on the cards become filters: room type, meal plan, and a price ceiling. A filter combination that would return nothing is disabled and states why. The two sorts stay.

**Acceptance:** every attribute shown on a card can be filtered on, and no filter produces an empty list.

---

### G11. Hierarchy and accordion conformance

**Change:**

| Element | Collapses | Initial state |
|---|---|---|
| First question | no | always open |
| Second question and shortlist | no | open when the plan is on campus |
| Residence catalog | no | always open |
| Rail cards | no | always open |

Nothing on this screen collapses. The page is a form and a catalog, and a form that hides its own fields is worse than a long page.

**Typography:** apply the same rule the other screens are getting. Block titles are `H3` at `--fs-h`, weight 400, never bold, and never smaller than the section title above them.

**Acceptance:** no title on the screen is bolder than weight 400 or smaller than its parent.

---

## 5. Findings per state

**E1. `onboarding-answered` is the model.** It states the answer is already recorded, states what that unlocked, "Choose your move-in time is unlocked on your enrollment checklist, because this plan is answered", and still lets her change everything. Basis for G4.

**E2. `room-assigned` closes the loop honestly.** It names the assigner, the date, the room type, and explains why she got her second preference rather than her first, in terms of what a preference is. Nothing to change.

**E3. `send-fails` names the surviving record.** Basis for R6.

**E4. `deadline-passed` removes the controls.** The ranking is shown as submitted and the page states Housing Services is assigning, which is what the onboarding spec asks for.

**E5. `ready`, `empty` and `partial` are identical.** Basis for G3.

**E6. `loading` and `error` were not inspected.** Both follow the portal's established pattern on the other screens.

---

## 6. Copy

### 6.1. White card and advisor, see G4, G5, G6

| Element | Text |
|---|---|
| Status, answered at onboarding | "Recorded at onboarding" |
| Support, answered at onboarding | "Nothing is being asked of you here. You can change it until Dec 15 · 117 days" |
| Status, skipped at onboarding | "On your checklist" |
| Support, skipped at onboarding | "You skipped this while accepting your offer. Due Dec 15 · 117 days" |
| Status, answered here | "Recorded" |
| Support, answered here | "Yours to change until Dec 15 · 117 days" |
| Status, after the deadline | "Submitted" |
| Support, after the deadline | "Housing Services is assigning rooms from what you submitted." |
| Status, room assigned | "Room assigned" |
| Support, room assigned | "Alcott House, Room 214. Move in Jan 12." |
| Second line, on campus | "3 of 3 residences ranked" |
| Advisor eyebrow | "YOUR ENROLLMENT ADVISOR" |
| Advisor scope line | "For anything about enrollment. Your housing plan and your room are Housing Services' to decide." |

### 6.2. First question, see G2

| Element | Today | New |
|---|---|---|
| The four options | unchanged | unchanged |
| Line above | "All four are real answers. Pick the one that's true. You can change it until Dec 15, 2026." | unchanged |
| Reconciling an onboarding answer of "Off campus" | does not exist | "At onboarding you said you'd live off campus. Two of the options below cover that. Which one is it?" |

### 6.3. Second question before it opens, see G3

| State | Today | New |
|---|---|---|
| `ready` | "Students living on campus rank three residences from the catalog Housing Services publishes. It only applies if you live on campus." | unchanged |
| `empty` | same as `ready` | "Housing Services hasn't published any residences yet. If you live on campus you'll rank three here once they do." |
| `partial` | same as `ready` | "The residence catalog couldn't be loaded just now. Your plan is unaffected, and ranking opens again when it loads." |

### 6.4. Residence catalog, see G1, G8, G10

| Element | Today | New |
|---|---|---|
| Leading slot | two-letter monogram | published image, monogram as fallback |
| Image caption, bedroom shown | does not exist | names the room type the image belongs to |
| Shortlist full message | "Your shortlist is full. Remove one to add this" | "Your shortlist is full. See your shortlist to swap one." |
| Filter, none available | does not exist | the filter is disabled and reads "No residences match this with your other filters." |

### 6.5. Right rail, see G9

| Element | Today | New |
|---|---|---|
| Card 1 | "ANSWER BY / Dec 15 / 117 days left..." plus the Housing Services location, hours and reply time | unchanged |
| Card 2 | "WHAT A PREFERENCE IS WORTH", full paragraph | title unchanged, body reduced to "You tell Housing Services what you'd like, in order. They decide, and they may place you somewhere you didn't name." plus the link |
| Card 3 | "Changing your housing answer", full paragraph | removed, its content moves behind the card 2 link |
| Card 2 link | does not exist | "How housing decisions work" |
| Published line | "Published by Housing Services · updated Aug 8, 2026" | unchanged |

### 6.6. Primary action band, see G7

| Case | Band label | Button |
|---|---|---|
| A change was rejected | "Housing Services didn't accept that change" | "Try again" |
| First question unanswered | "Your housing plan is due Dec 15" | "Choose your plan" |
| Shortlist not full | "You've ranked 1 of 3 residences" | "Rank residences" |

---

## 7. Component and token map

No item creates new styling.

| Item | Element | Use |
|---|---|---|
| G1 | residence image | fixed ratio, cropped to fill, in the leading slot of the existing card |
| G5 | white card | the same card component as the reference screen |
| G6 | advisor block | the same block component the reference screen uses |
| G7 | band | the same band component as My Enrollment |
| G8 | shortlist link on a card | `.secondary-button` |
| G9 | rail card link | the same treatment as the guide's "How points work" |
| G10 | filters | the existing chip treatment used by the sorts |
| G11 | block titles | `H3` at `--fs-h`, weight 400 |

### 7.1. What is an accordion and what is not

Nothing on this screen collapses. The two rail explanations that would be candidates are handled by a link to a panel instead, see G9.

---

## 8. Execution order

| Step | Items | Why |
|---|---|---|
| 1 | G2 | the answer set has to be settled before anything reads from it |
| 2 | G3, G4, and the copy in 6.2 and 6.3 | make the states distinguishable and make the page state its own obligation |
| 3 | G5 and G6 | the card and the advisor, with the scope line in the same step |
| 4 | G1 | images, the largest single change to the catalog |
| 5 | G10 | filters, once the cards carry their final content |
| 6 | G8 | shortlist reachability |
| 7 | G9 | the rail |
| 8 | G7 | the band, which points at the plan and at the shortlist, so both have to be finished |
| 9 | G11 | hierarchy, last |

---

## 9. Changes to other screens

This section is not about the Housing screen. It collects changes that belong to another screen but were decided while working on this one, so they live in one place instead of drifting apart across documents.

**9.1 is an addition to the My Degree document.**

### 9.1. My Degree: the rail's metric card, and what takes its place

**Current:** the right rail carries a card titled "WHAT COUNTS RIGHT NOW", holding the approved credit figure, "7 credits under review, not counted yet", and "Credit the Registrar approves shows in your total; nothing here has been decided". It sits in the dark slot, the highest-contrast block on that screen.

**Problem:** the My Degree document already moves the approved figure to the white card. What is left is a card promising what counts whose only remaining number is the one that does not count, rendered at display size with a line underneath disclaiming it. That is the same defect the Appointments document removes with the "24" numeral, reappearing on another screen.

**Change:**

1. **Remove the card.** The under-review figure moves to the white card, as a support line under the ring, beside the approved total. One is the number, the other is its caveat, and they belong in the same place.
2. **No other metric takes the slot.** A completion percentage would repeat the ring. A pace or projected-graduation figure would be the only claim on a screen whose stated premise is that it shows Aster's reading of the record rather than the record itself, and with fifteen credits and no completed term there is nothing to project from.
3. **"YOUR PROGRAM" moves up into the dark slot.** It is the frame everything else on that screen is measured against: the degree, the catalog year that governs it, and the 120 credits the ring counts toward. It is the answer to the question the page title asks, and the one thing there that does not move.
4. **That card holds facts, not progress.** "120 credits" is the graduation target and must never render as a counter, a bar or a fraction. The card carries no action.
5. The rail then holds three cards: the program in the dark slot, the plan, and the official record.

**Copy:**

| Element | Text |
|---|---|
| White card, under review, `ready` | "7 credits under review, not counted yet. Credit the Registrar approves shows in your total." |
| White card, under review, `no-matches` | "Nothing under review right now" |
| Dark card label | "YOUR PROGRAM" |
| Dark card lead line | "BA Computer Science" |
| Dark card pairs | "Catalog · 2026–27", "Published · Aug 12", "To graduate · 120 credits" |

**Acceptance:** no card in the rail leads with a number that the copy below it disclaims, the under-review figure appears once on the screen, and the program card renders no bar, fraction or action.

