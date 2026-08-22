# References — ENR-207 Student · Housing

Four searches, `platform: web`, `mode: deep`. Two for the layout of the two questions, two for the
parts the card's brief calls the hard ones: the state after the response deadline, and the plan
question that decides whether the second question exists at all.

## The residence catalogue — the list *is* the comparison

ENR-211 AC2 asks for a residence detail and for comparison. The decision (Q26) is that comparison is
the list: every row carries the same fields in the same order, so scanning is comparing.

- [Zillow — Available units](https://mobbin.com/screens/a8e8b6ba-4655-4505-8d1c-64f2386e12bf) — a
  real table: `Unit | Sqft | Available | Total monthly price`, one row per unit, the price column
  sortable, detail behind a chevron. **We take the table and the sortable rate column.** We reject
  the floor-plan thumbnail — no image library in this design system, so the monogram tile from
  `OrgRow` takes that slot.
- [Navan — Compare partner rates](https://mobbin.com/screens/5a6271b9-66f8-4f3b-8339-c293c91b682b) —
  `Rate details | Rewards | Includes | 1 night total` as columns, one action per row. **We take the
  proof that a comparison needs no compare mode**, only disciplined columns.
- [Klook — Select your room](https://mobbin.com/screens/fdc8f73e-ffcd-48ad-bfaa-94aa4df13258) — room
  types grouped under the property, price in its own right-hand column. **We take room types as a
  field of the residence row** rather than as rows of their own.
- [TravelPerk — Rate details](https://mobbin.com/screens/400742aa-9385-480d-bf89-288a39775c5c) — the
  detail opens as a side panel over the list, carrying the rate breakdown. **We take the side panel**,
  which is the `CampusDrawer` / `DocumentDrawer` pattern this repo already owns.

## The ranking — ordinals and per-row controls, no drag

- [Record Club — Edit Your Top 5](https://mobbin.com/screens/0595c4df-bba1-480e-a5d8-875024e0c81d) —
  the closest match on the board: `1.` `2.` `3.` printed on each row, with remove and reorder as
  separate per-row controls. **We take the printed ordinal and the per-row remove.** We reject the
  drag handle — Q20 settled explicit move up / move down, because a keyboard-accessible drag is
  machinery on top of the thing that already works for three items.
- [Juicebox — Edit Status List](https://mobbin.com/screens/01028d24-0e2e-4ae8-81b3-c5f8c09117a0) —
  same shape inside a modal. **We reject the modal**: the shortlist is the page's subject, not an
  errand you leave the page for.

### Rejected — the explicit save

- [Fresha — Time off types order](https://mobbin.com/screens/c303fa1c-01df-4330-b5bd-f6db02b9371b)
  and [Behance — Reorder Content](https://mobbin.com/screens/9a1794fa-e921-4dca-beab-137ff95a49c6) —
  both put reordering in a mode you `Save order` out of. **Rejected on the card**: ENR-211 AC3 says a
  ranking saves on its own. A `Save order` button would make an unsaved order possible, which is the
  state the AC exists to forbid.

## After the response deadline — the hardest state

The brief: *"that must read as the process moving on rather than as a page that broke or went read
only by accident."*

- [Stripe — Account status](https://mobbin.com/screens/b24bf79e-1acc-4d99-9f38-b81aa68daaf8) — **the
  reference that decides this state.** A read-only page does not say "read only": it names its stage
  in a sequence you can see. The rail carries a three-step tracker — Information submitted → In
  review → Completed — and the body carries the summary plus a short stack of questions the state
  raises. **We take the stage tracker into the rail**: Preferences submitted → Housing Services
  assigning → Room assigned. That answers ENR-211 AC7 with structure instead of with a sentence, and
  it makes ENR-213 AC6 the last step of a path the student was already watching.
- [Wellfound — Application pending](https://mobbin.com/screens/f5cf219a-f3b9-4ba5-a58d-ae71b36aec19)
  — what was submitted stays the subject; the status panel sits *under* it as a footnote naming who
  is reviewing. **We take that order.**
- [Coinbase — Application in review](https://mobbin.com/screens/085df375-3abc-468b-8a1c-e81937f76696)
  — **rejected.** It replaces the content with a status illustration. That is exactly the failure the
  card names: the screen must show what was submitted, and a page that empties itself on a date is
  indistinguishable from a page that broke.

## The plan question — three cards that must not read as a skip

- [Docusign — What's your primary goal today, Sam?](https://mobbin.com/screens/c0248abe-0324-4739-83e6-cbc310da9912)
  — choice cards with a check mark in the corner of the selected one, and the reassurance said
  *before* the choice: *"Please select one option. You'll be able to return to all these tasks."*
  **We take the position of that sentence.** ENR-210 AC2 needs the same reassurance in our words:
  none of the four is a skip. The construction itself already exists here as `.choice-panel` with
  `.radio-mark` in `TaskDrawer.jsx` — this widens a class the system owns rather than inventing one.
- [Uxcel — Where would you like to start?](https://mobbin.com/screens/fb7799b3-75b1-486d-a8d3-fce715b245f4)
  — under the cards, a line stating what the selection just did. **We take it for ENR-210 AC7**: the
  consequence of confirming a plan — the move-in step unlocks — is stated where the plan is chosen.
- [Cloudflare](https://mobbin.com/screens/a7ccde8f-05f9-40cf-b7b8-29f4b7e76079) and
  [Coursera](https://mobbin.com/screens/f68cf153-c9e4-4e5b-8760-27d525a114f7) — **rejected.** Both
  carry the choice on illustrations this design system has no way to draw, and Coursera's cards
  explain nothing, which is the opposite of what a plan with a deadline needs.

## The review of 2026-08-21 — G1 + B4.3, G10 — 2026-08-22

Two searches, web, deep; images examined.

### The hall's card leads with a picture; the detail carries rooms and rates

- [Expedia — results](https://mobbin.com/screens/49ab28ab-5f16-420e-9aee-c8f10b734519) — each card
  leads with the photograph, then the name, the place, the facts and the rate; a filter column on
  the left filters by the attributes the cards show, with a price range. We take the card's
  anatomy (picture leading, fixed ratio) and the rule that filters are the cards' own attributes.
- [Zillow — listing](https://mobbin.com/screens/62ef5ddd-0469-4cc8-bdaa-5eefe66dd0f8) — the building's
  facts, then "Available units" as a table of unit, size, date and price, with the actions in an
  aside. We take the detail's shape: the building, then a rate table of room types.
- [KAYAK — hotel prices](https://mobbin.com/screens/7449881d-c5fc-4fdd-9766-11d622f9729d) — room
  types as groups, each with one photograph and its rate rows. We take "one picture per room type,
  captioned", which is what G1 requires where a bedroom is shown.
- [Tripadvisor — hotels](https://mobbin.com/screens/f56e04e3-da38-46ba-9765-d57ff8d74bd5) — sort and
  filter chips above a grid of photographed cards. We keep our chip row for both.

**Rejected:** [Shopify](https://mobbin.com/screens/8094bc0e-0387-417b-81ef-3ad7e29bcba7) and
[Dribbble](https://mobbin.com/screens/73f76d09-9508-49ba-810e-8b2d13ff74e6) plan matrices — a
residence is not a tier; and Tripadvisor's ratings and badges — a hall is not reviewed by the
portal, and the catalogue is Residential Life's list, not a marketplace.

### A filter that would return nothing is disabled, and says why

- [Walmart — all filters](https://mobbin.com/screens/8df6d24a-9cda-46d8-a0bc-1a682ceeb583) — every
  filter chip carries the count it would return ("Bottom (56)"). We take the count: a chip that
  would return nothing with the other filters set is disabled and states it, which is G10's rule.

**Rejected:** [Apollo](https://mobbin.com/screens/614b0e8b-c6c3-4a51-b0fd-85f97779de5f),
[Twenty](https://mobbin.com/screens/b403408e-b983-4cd2-898c-708a2e962ad2),
[Twingate](https://mobbin.com/screens/627a0610-5379-49b0-88c3-e64eddbf49ec),
[Frame](https://mobbin.com/screens/2c70dd61-77e3-44af-bc48-1b378c3563ac),
[Devin](https://mobbin.com/screens/ce9c1dd9-29e5-4464-827f-3255a8cabbe3) — sort/filter menus for
data tables; the catalogue's attributes are three, and they belong on chips beside the two sorts.
