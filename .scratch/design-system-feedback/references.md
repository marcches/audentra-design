# References — the feedback system

Three Mobbin searches, one for each rung of the ladder this card is building: what a toast looks
like when it carries a reversal, what an error looks like when it has a field to sit under, and what
a control looks like while it is working.

## The toast, and the reversal it carries

- [Asana — deleted project](https://mobbin.com/screens/36cb9092-004d-4cfa-abc7-930e4a7ff931)
  — the reference for the whole card. A dark card with a **timer bar across its top** counting the
  undo window down, a `✕` to dismiss, and `Undo` as a real bordered button under the text. And
  behind it, the page itself says *"Looks like project 'Product Demo - A' was deleted"* with a
  **Restore Project** button. We take both halves, and the second is the important one: **the toast
  is the fast way back, never the only way back.** That is what makes an undo offered for six
  seconds acceptable to someone on a keyboard, or someone who looked away.
- [Skiff — message sent](https://mobbin.com/screens/bf104b69-c42d-4fb9-a746-d51ca884f4a6)
  — two lines: a bold outcome (`Message sent`) and a muted consequence (`Your message is on its
  way.`), then the action. We take the two-line shape for anything carrying an action; a bare
  sentence has nowhere to put the consequence.
- [Pinterest — update removed](https://mobbin.com/screens/70234394-ca14-4def-8aa4-e9784fdccae1)
  — the compact end of the same shape: one line, `Undo` inline to the right, bottom-centre, no
  icon. We take this as the default measure, and the two-line Skiff shape as the exception.
- [Quicken — transaction created](https://mobbin.com/screens/e9042731-b020-4b97-b8b7-b5ad5a97db06)
  — a toast sitting under a modal *and* a coachmark, still readable. Confirms `--z-toast: 120`
  above everything, including the tooltip layer the parallel card is moving to 110.
- [GitBook — space restored](https://mobbin.com/screens/9e06cd74-e5a9-4913-b907-5fc7476065be)
  — the pure confirmation: check icon, title, one line, `✕`, no action. This is what most of our
  twenty existing `setToast` calls actually are.

## The error, and the field it belongs to

- [Claude — payment details](https://mobbin.com/screens/34e3cb61-99c3-4184-a302-74d9b03bdd0e)
  — the reference. One invalid field takes a crimson edge and an alert glyph *inside* the input;
  the message sits directly under it in crimson; **every other field is untouched** and the submit
  button stays enabled. We take all of it, including the enabled submit.
- [Clerk — wrong password](https://mobbin.com/screens/cc5ea40b-c5e8-4b80-ae30-7991b8119906)
  — the message leads with a filled crimson glyph and wraps to two lines without moving the button
  below it more than it must. We take the leading glyph: crimson alone is not a signal on a screen
  read without colour.
- [Melio — date of birth](https://mobbin.com/screens/fc2a7650-802f-4a5b-bd88-4c84c612b2c6)
  — the **label** turns crimson along with the field. We take this: it is the cheapest way to make
  the error findable when the page is scrolled and the message is off-screen.
- [Quicken — empty password](https://mobbin.com/screens/595f63c1-e4f2-463d-8c1b-3f274172d542)
  — a required field left empty reads the same as a field filled wrongly. Confirms one error shape,
  not two.

### Rejected

- [Substack — choose your URL](https://mobbin.com/screens/286c847a-7843-4ff8-a13f-4fd526bd635f)
  — the same error, but `Continue` is greyed out while the field is invalid. Rejected: a disabled
  submit refuses without saying why, and on a form of ten fields it refuses without saying *which*.
  Our submit stays live and answers on press.

## The control while it is working

- [Assembly — configure workspace](https://mobbin.com/screens/1b2791e8-8b91-435d-a0e2-6855b4aec9f7)
  and [Heidi — one-time code](https://mobbin.com/screens/03a2347e-6f15-4d60-b7f5-6e8e58df143c)
  — the button keeps its exact footprint and swaps its label for a spinner. Nothing else on the
  screen moves, and the thing that is working is the thing you pressed. We take this.
- [Family — set password](https://mobbin.com/screens/d4b574e8-b6fd-40dd-9c9c-0c30df610851)
  and [Visitors — sign up](https://mobbin.com/screens/e87d31f5-4b22-4a04-8aa9-47bfc90f5be8)
  — same shape, but the button keeps its brand surface rather than going grey. We take the surface:
  our primary button is the one gradient in the product, and a control that fades while it works
  reads as a control that failed.
- [Adobe Express — generating](https://mobbin.com/screens/7534530b-d7b4-4dfa-81e7-1b0d121c062f)
  — for work that takes long enough to have a *proportion*: a determinate bar with a `Cancel`,
  in the panel that started it. We take this as the second, rarer pending shape — the document
  upload in `DocumentDrawer` is exactly this and today has neither.

### Rejected

- [Paramount+ — processing subscription](https://mobbin.com/screens/95ccebe5-475c-4adf-a603-f1c5f0325927)
  — the whole form greys out behind a page-level spinner. Rejected: it blocks a page the student
  could still read, it loses which control was pressed, and it is the shape that makes a two-second
  request feel like a failure.
