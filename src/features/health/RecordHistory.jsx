import { useEffect, useState } from 'react';
import Card, { CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';
import { fileOutcome, officeOf, stateOf } from '../documents/logic.js';

/**
 * Everything she has sent — the changes of 2026-08-21, H9 and H12.
 *
 * It used to be a caption and a list inside the record card, one row per
 * submission, the pages of a submission named under one shared line. The brief
 * found the flaw in `health-returned`: the reviewer says in prose that the
 * first page is on the record and the second came back, the remedy says *send
 * only the page that came back*, and the list then showed both pages under one
 * shared "Sent Aug 11 · came back Aug 16". The distinction lived in the prose
 * and not where she would look when choosing what to replace.
 *
 * So this is a card of its own, under the record, and its rows are **pages**:
 * each with its own state and its own date, read through `fileOutcome` — a
 * decision may fall page by page (CONTEXT.md, Decision, widened that evening)
 * — and the page that came back is the one row that carries the replace
 * action. The accepted page has no control, because there is nothing to do to
 * it ([Confluence](https://mobbin.com/screens/77180b0e-6b84-4e30-803f-de6961d99349)
 * puts *Restore · Delete* only on the rows that can take them;
 * [AWS](https://mobbin.com/screens/0dc7a3c3-26ec-45a8-8a79-69bb9fce85e8) gives
 * every file its own status column).
 *
 * It is history, so it closes on the product's one disclosure — the status head
 * as the handle — and it starts **closed**, as every accordion here does, with
 * one exception the design workflow already names: a group that changed
 * without the student acting starts open, because what is in it is news. A
 * record that came back is news. The open state follows the record rather than
 * a stored choice: a remembered "closed" would hide a returned page on the next
 * visit, which is the one thing this card exists to show.
 *
 * Not rendered while nothing has been sent — a head that opens on nothing is a
 * lie, and an empty history is not a thing to say.
 */
export default function RecordHistory({ requirement, onReplace }) {
  const state = stateOf(requirement);
  const office = officeOf(requirement);
  const cameBack = state === 'changes-requested';
  // Newest attempt first; within an attempt, the pages in the order she sent.
  const submissions = [...(requirement.submissions ?? [])].reverse();
  const pages = submissions.reduce((total, item) => total + (item.files?.length ?? 0), 0);

  const [open, setOpen] = useState(cameBack);
  useEffect(() => {
    setOpen(cameBack);
  }, [cameBack, requirement.submissions?.length]);

  if (pages === 0) return null;

  return (
    <Card className={open ? '' : 'collapsed'} aria-labelledby="record-history-title">
      <CardHead
        kind="status"
        titleId="record-history-title"
        title="Everything you have sent"
        note={`${pages} ${pages === 1 ? 'page' : 'pages'} across ${submissions.length} ${
          submissions.length === 1 ? 'attempt' : 'attempts'
        }`}
        count={pages}
        open={open}
        onToggle={() => setOpen((value) => !value)}
        controls="record-history-rows"
      />
      <CardRows id="record-history-rows" hidden={!open}>
        {submissions.flatMap((submission) =>
          (submission.files ?? []).map((file) => {
            const outcome = fileOutcome(submission, file);
            const returned = outcome === 'changes-requested';
            // Each page says its own state and its own date. The accepted page
            // of a returned attempt is *on your record* — the reviewer's words
            // — not "accepted", which would read as the whole attempt.
            const says = returned
              ? `Came back ${submission.decision.on}`
              : outcome === 'accepted'
                ? submission.decision.outcome === 'accepted'
                  ? `Sent ${submission.sent} · accepted ${submission.decision.on}`
                  : 'On your record'
                : submission.checking
                  ? 'Being checked'
                  : `Sent ${submission.sent} · with ${office.name}`;
            return (
              <div
                className={`record-row${returned ? ' returned' : ''}`}
                key={`${submission.id}-${file.name}`}
              >
                <span className="record-row-mark" aria-hidden="true">
                  <Icon name="file" size={16} />
                </span>
                <span className="record-row-body">
                  <strong>{file.name}</strong>
                  <span>
                    {file.size} · {says}
                  </span>
                </span>
                {returned ? (
                  <Button kind="secondary" icon="arrow" onClick={() => onReplace(requirement)}>
                    Replace this page
                  </Button>
                ) : null}
              </div>
            );
          }),
        )}
      </CardRows>
    </Card>
  );
}
