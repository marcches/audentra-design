import Icon from '../Icon.jsx';
import { daysUntilOpen, opensOn, outstanding, yoursToAct } from '../lib/registration.js';
import { registration } from '../registration-data.js';

/**
 * The consequence, stated once — ENR-214 AC 2.
 *
 * It goes in `PageShell`'s `notice` slot: one line true of the whole section,
 * above everything. An obligation must not hide behind something nobody opened,
 * which is the rule ENR-189 already set for a required session.
 *
 * Three clauses, and the third is the one most checklists leave out: what is
 * happening, what it needs, **and by when**.
 *
 * The route scrolls to the first gating card. It does not open a modal — a gate
 * is a standing condition, not an interruption you dismiss.
 */
export default function GateNotice({ state, items, unavailable, onRetry, onShow }) {
  if (unavailable) {
    return (
      <div className="gate-notice muted">
        <Icon name="flag" size={17} />
        <p>We couldn’t check what’s outstanding for {registration.label}.</p>
        {onRetry && (
          <button className="secondary-button" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  // A gate that is open is not news. No green success bar, nothing at all.
  if (state === 'open') return null;

  const days = daysUntilOpen();
  const when = opensOn();

  // The institution is the holder. Telling her to act here would be false, and
  // it is the failure the holder principle exists to prevent.
  if (state === 'waiting') {
    const waiting = outstanding(items);
    return (
      <div className="gate-notice muted">
        <Icon name="clock" size={17} />
        <p>
          {waiting.length === 1 ? (
            <>
              Your {waiting[0].label.toLowerCase()} is with Aster. Nothing more is needed from you
              before {registration.label} opens on {when}.
            </>
          ) : (
            <>
              Everything {registration.label} needs is with Aster. Nothing more is needed from you
              before it opens on {when}.
            </>
          )}
        </p>
      </div>
    );
  }

  const mine = yoursToAct(items);
  // The one escalation this card spends. A deadline is not a failure while
  // there is time; inside a week it is the most important thing on the page.
  const urgent = days <= 7;

  return (
    <div className={`gate-notice ${urgent ? 'urgent' : 'soon'}`}>
      <Icon name="flag" size={17} />
      <p>
        {mine.length === 1 ? 'One step' : `${mine.length} steps`} must be done before{' '}
        {registration.label} opens on {when} — {days === 1 ? '1 day' : `${days} days`} away.
      </p>
      <button className="link-button" onClick={onShow}>
        See what’s blocking <Icon name="arrow" size={14} />
      </button>
    </div>
  );
}
