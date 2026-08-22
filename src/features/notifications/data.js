/**
 * What changed since she was last here — ENR-161.
 *
 * A notification is a **view of an event that already happened somewhere else**.
 * It is never authored here: every entry below points at an object that exists
 * in `documents-data.js`, `data.js` or the financial record, and says the same
 * thing that object says. Invent one and the panel starts disagreeing with the
 * section it links to.
 *
 * `route` and `gone` are mutually exclusive, and one of them is required:
 *
 *   route   where the item lives
 *   gone    why it is not there any more, in one sentence — AC 6, so a stale
 *           notification explains itself rather than linking nowhere
 *
 * `category` is the closed set from AC 4. The panel ranks it into two groups;
 * see `logic.js`. `office` resolves against `help/data.js` — no sixth office is
 * invented here any more than anywhere else.
 *
 * `icon` is what the thing *is* — a document she sends, a record Aster holds,
 * a form, a letter, a proof — in the glyph the row's tile wears. It is a field
 * rather than a guess from `route`, because three of five rows lead to the
 * same page and are about three different things.
 *
 * Nothing in this file invites a reply. AC 5: there is no inbound channel, so
 * the panel offers no reply control and its foot names Help instead.
 */

export const notifications = [
  {
    id: 'income-changes-requested',
    category: 'action-required',
    title: 'Verify your household income · sent back',
    icon: 'upload',
    office: 'financial-services',
    when: '2026-06-12',
    route: '#/profile',
  },
  {
    id: 'transcript-received',
    category: 'action-completed',
    title: 'Aster received your final transcript',
    icon: 'file',
    office: 'registrar',
    when: '2026-06-12',
    route: '#/profile',
  },
  {
    id: 'housing-form-withdrawn',
    category: 'record-changed',
    title: 'Residential Life replaced the housing preference form with the housing plan question.',
    icon: 'home',
    office: 'housing',
    when: '2026-06-05',
    // The `gone` case, and a true one: Residential Life replaced a form that
    // used to be answered inside the checklist drawer with the plan question in
    // the Housing section. The old form has no page to link to any more.
    gone: true,
  },
  {
    id: 'aid-award-issued',
    category: 'record-changed',
    title: 'Your financial aid award letter is ready',
    icon: 'wallet',
    office: 'financial-services',
    when: '2026-03-27',
    route: '#/financials/aid',
  },
  {
    id: 'address-accepted',
    category: 'action-completed',
    title: 'Your proof of address was accepted',
    icon: 'shield',
    office: 'admissions',
    when: '2026-05-22',
    route: '#/profile',
  },
];
