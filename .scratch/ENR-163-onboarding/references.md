# References — ENR-163 Student · Onboarding

Four Mobbin searches, `platform: web`, `mode: deep`. The card's hard parts decided the queries: the
progress rail is the emotional core, so one search is only about persistent steppers; the family
permissions screen is the hardest, so one search is only about granting another person scoped access;
skipped must not read as failure, so one search is only about where a skip control sits and what it
says.

---

## The frame — a persistent rail beside one question at a time

- [HoneyBook — completing the setup guide](https://mobbin.com/flows/1922e5d2-1f9c-43c7-82ba-6bbc28fba7d9)
  — **taken: the rail carries a figure, not just marks.** The sidebar entry reads `Set up your
  account · 0/7 completed` with a thin meter, and it stays there while the student works. That is the
  shape of "make the path feel finite": a count you can read without opening anything. Also taken:
  every row carries a time estimate (`2 mins`), which is what makes an eight-step list stop looking
  like a wall.
  **Rejected from it:** its steps have exactly two states — hollow ring, green check. ENR-149 AC 3
  needs four, and the two missing ones are the two that matter here.

- [Remote — job preferences, eight named steps](https://mobbin.com/screens/a80d3886-dc30-44ba-9412-14cd1b66da9b)
  — **taken: the steps are named, not numbered.** `1. Job type · 2. Workplace · 3. Work travel …` —
  a student who pauses at step 4 and comes back on Tuesday needs the name to know what she is walking
  back into. Also taken: `Skip this` sits beside `Continue`, in the same row, at the same optical
  weight class but a lower one — an offer, not an escape hatch.
  **Rejected:** the stepper is horizontal and truncates. Eight named steps do not fit across a
  laptop, and the ones that get cut are the ones she has not reached — which is the half of the path
  that has to feel finite.

- [Melio — setting up an account](https://mobbin.com/flows/19e7920f-cdc3-4612-bc67-2660ed342ece)
  — **taken: one question per screen, and the progress meter pinned below the form** rather than
  floating over it. The form column is narrow (~350px of a 768 shot) and the eye never hunts.
  **Rejected:** the whole right half is an illustration. This product has no illustration system and
  is not getting one for this card.

- [OKX — completing additional info](https://mobbin.com/flows/bb132a8d-1f87-48e7-8121-77492d75c4f1)
  — **taken: the opening screen lists what will be asked before anything is asked.** `We need to know
  more about you` over five numbered lines, then one button. Our version of that is the rail itself:
  the eight steps are legible from screen one, so nothing is a surprise.
  **Rejected:** its stepper is a row of bare numbered dots with no names, and by step 6 the first
  five are identical checkmarks. Position without identity.

## The hard one — authorizing a person for specific categories

- [Semrush → Google account consent](https://mobbin.com/screens/3bd2dc78-d5ac-4205-90b3-a35c221ecb94)
  and [Rox AI](https://mobbin.com/screens/a1e635f3-8c4d-4fd1-b366-9ceb997ea27a)
  — **taken: one row per capability, each stating what it exposes in a full sentence**, and the
  granted set visible as a set rather than summarised. This is the structure ENR-153 AC 6 needs
  ("the student can see at any time exactly what each authorized person may discuss") and it is
  already the structure `PermissionGrant` uses on Profile, so onboarding and Profile will agree.
- [Whop — app permissions](https://mobbin.com/screens/94196777-bfa5-4a69-97a6-b5795d6d797e)
  — **taken: unticked rows stay in the list.** Eleven ticked and three unticked, all visible. A list
  of only what was granted cannot answer "what else could she see?" — the guardrail Profile already
  records as ENR-144's.
- [Charma — Google consent with locked rows](https://mobbin.com/screens/cb167eb0-3949-4ff1-8edc-0deb6df70966)
  — **taken: the distinction between what the student chooses and what is a consequence of the
  relationship**, rendered as two groups rather than one list with a footnote. Our version: the
  emergency contact block sits above the authorization list and states, in the same visual language,
  that it grants nothing.

**Rejected across all of them — the tone.** `Make sure you trust Semrush · Review the Privacy Policy
and Terms of Service to understand how Semrush will process your data.` The card is explicit: neither
legalistic nor breezy, because it is a seventeen year old making a privacy decision with real
consequences. Every sentence on our step names a person and a thing that person could discuss —
"Renata could see what Aster charges you and what is still due" — and never a data-processing
abstraction.

**Rejected — the toggle.** [Hootsuite → TikTok](https://mobbin.com/screens/b5b6823e-e792-4c5d-aec9-24922a89b57c)
uses switches, all on by default. Default-on is the exact inverse of ENR-152 AC 1, and a switch reads
as a preference you are adjusting rather than a permission you are granting. Checkboxes, all clear.

## Skipping, without it reading as failure

- [Uxcel — daily learning goal](https://mobbin.com/screens/48c6305c-7d64-4c09-bd60-801739292799)
  — **taken: the action bar.** `Skip for now` far left, `Continue` far right, in a band that closes
  the screen. Distance is what keeps a skip from being a mis-click, and a shared band is what keeps
  it from being hidden. Also taken: the consequence sentence sits directly under the chosen option,
  which is where `PlanPanel` already puts its.
- [PayPal — activate your account](https://mobbin.com/screens/55b36882-b86f-43b9-a3c1-cc61d7a81cd0)
  — **taken: `Skip for now` as the words.** Not `Skip`, not `Maybe later`, not `No thanks`. "For now"
  is the whole difference between a step you set aside and a step you declined, and ENR-150 AC 3 is
  that difference.
- [Docusign — what's your primary goal today](https://mobbin.com/screens/c0248abe-0324-4739-83e6-cbc310da9912)
  — **taken: the reassurance goes above the options, not below.** `You'll be able to return to all
  these tasks in the product.` Read before the choice, it changes how the choice feels; read after,
  it is a consolation. `PlanPanel` already cites this screen for the same placement, so this is the
  product agreeing with itself rather than a new idea.

**Rejected:** [Plane](https://mobbin.com/screens/1840d42e-191e-4505-b58e-11b4b0e0acf4) puts a bare
`Skip` centred under the primary button, at half the contrast of everything else. It reads as an
apology for existing. If a step is genuinely optional, its skip is a real answer and looks like one.
**Rejected:** [Evernote](https://mobbin.com/screens/acde1181-0ee8-4ec3-a074-2bf3f24c310d) puts `Skip`
diagonally opposite the progress dots, top-right, away from the action. The one control that changes
what happens next should not be in the chrome.

## Where the design departs from every reference

None of the eight flows above has a **skipped** state at all — every one of them is binary, done or
not. That is the shape of the problem this card names: a skipped step is neither, and drawing it as
"not done" is precisely the failure reading the card forbids. So the mark is ours: `half`, the
half-filled circle already in `Icon.jsx`, in the rail's own light ink — not amber, because amber in
this product means someone still has to act, and during the flow that is a nag.
