# References — the tooltip system

Two Mobbin searches, one for each of the two things this repo was calling "a tooltip".

## The hint — naming a control that has no room for its own word

- [Salesforce — Lightning dashboard builder](https://mobbin.com/screens/ff94680a-eb19-46cc-9146-773ccbcb2399)
  — the toolbar's icon buttons drop a small dark label under the button on hover. We take: ink
  bubble, two or three words, sitting *under* the control, no title, no body.
- [HoneyBook — invoice editor](https://mobbin.com/screens/321a07ad-d964-4ec5-8efe-37a442890251)
  — "Edit pricing details" above a pencil icon in a row that has no room for the word. We take: the
  bubble flips to the other side of the control when the control is near an edge, rather than being
  clipped by the panel it sits in.
- [Visitors — global performance map](https://mobbin.com/screens/2c4470d3-5888-4f3f-b204-7a2dde003c8b)
  — an ink bubble with a heading line and two label/value rows, floating over the page. We take the
  measure and the two type sizes; we do **not** take data rows — a figure with rows in it is a card,
  not a tooltip.

## The explainer — a term or a figure the student is not expected to know

- [Square — invoice content options](https://mobbin.com/screens/03744e94-0b9f-4598-bebb-a7909c73baa4)
  — a small ⓘ inline with the field's own label opens a dark bubble with two short paragraphs.
  We take this whole shape: the ⓘ is *inline with the word it explains*, never floating at the end
  of the row, and the bubble is the same ink bubble as the hint, one size up.
- [User Interviews — project cost details](https://mobbin.com/screens/62d8ecee-9d55-4191-a52c-4f3c0a6aa2b4)
  — a muted "?" disc beside a section title. We take: the marker is quiet enough that a heading with
  one is still read as a heading.
- [Gusto — plan details](https://mobbin.com/screens/126fdbf5-bc1e-4711-816b-bf0a7280d519)
  — the explainer opened from an ⓘ stays open and carries its own close. We take the staying-open
  part: on a touch screen there is no hover, so the explainer must be dismissible on purpose.

## Rejected

- [Wave — invoice discount coachmark](https://mobbin.com/screens/1cfc832a-d8cb-4c3d-af71-afb12e1152dd)
  — a green product-tour callout with "Learn more". Rejected: that is onboarding, not a tooltip, and
  it interrupts. Anything that needs a "learn more" is longer than a tooltip and belongs in
  `InfoModal`.
- [ManyChat — invoice settings](https://mobbin.com/screens/4bc614e5-bc0b-4a29-80ee-07c097e75441)
  — "How Is The Price Calculated?" as a blue link above the data. Rejected as the default: a link
  costs a navigation to answer a one-sentence question. Kept as the escape hatch for when the answer
  is genuinely a page.
- [Magnific — workspace](https://mobbin.com/screens/dcdccdef-007f-4e73-b10b-6deee3e91014) — the icon
  rail prints every label under its icon instead of hiding it in a hover. Rejected here only because
  our sidebar already prints its labels; where a label fits, print it. A tooltip is what you reach
  for when it does not.
