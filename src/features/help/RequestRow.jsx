import Icon from '../../design-system/Icon.jsx';
import { officeOf, sinceLabel, stateOf } from './logic.js';
import { shortDate } from '../campus/logic.js';

/**
 * One request, as the student sees it.
 *
 * What is *not* on this row is the design: no assignee, no team, no queue, no
 * reference number, no severity. Every staff-side reference in
 * `references.md` leads with at least one of those, which is why this is a
 * different object rather than the staff row with columns hidden — there is no
 * field to hide, because the data has none.
 *
 * The state is carried by a tinted chip, never by a painted edge on the row.
 */
export default function RequestRow({ request, today, onOpen }) {
  const office = officeOf(request);
  const state = stateOf(request);

  return (
    <button
      className="request-row"
      onClick={() => onOpen(request)}
      aria-label={`${request.subject}, ${state.label}, ${office.name}`}
    >
      <span className={`request-chip ${state.tone}`}>{state.label}</span>

      <span className="request-body">
        <strong>{request.subject}</strong>
        <span className="request-meta">
          {office.name} · you asked on {shortDate(request.opened)}
        </span>
      </span>

      <span className="request-trail">
        <span className="request-when">{sinceLabel(request.updated, today)}</span>
        {request.unread ? (
          <span className="request-unread">
            <i aria-hidden="true" /> New reply
          </span>
        ) : (
          <span className="request-open" aria-hidden="true">
            <Icon name="arrow" size={15} />
          </span>
        )}
      </span>
    </button>
  );
}
