import Notice from '../../design-system/patterns/Notice.jsx';
import { daysUntilOpen, opensOn, outstanding, yoursToAct } from './logic.js';
import { registration } from './data.js';

/**
 * The consequence, stated once — ENR-214 AC 2.
 *
 * It goes in `PageShell`'s `notice` slot, which docks it to the foot of the
 * enrollment panel. That is the right place for it twice over: an obligation
 * must not hide behind something nobody opened — the rule ENR-189 set for a
 * required session — and the panel above it says *3 of 9 steps complete*, of
 * which this is the reason. Attached to the figure it cannot be scrolled past
 * without it. As its own amber band above the cards it was a full row of the
 * page spent on one sentence, which is what the Jam of 2026-08-21 circled.
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
      <Notice
        tone="quiet"
        icon="flag"
        action={onRetry ? { label: 'Try again', icon: 'refresh', onClick: onRetry } : null}
      >
        What’s outstanding for {registration.label} couldn’t be checked.
      </Notice>
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
      <Notice tone="working" icon="clock">
        {waiting.length === 1 ? (
          <>
            Your {waiting[0].label.toLowerCase()} is with Aster. Nothing more is needed from you
            before you register for classes at orientation on {when}.
          </>
        ) : (
          <>
            Everything {registration.label} needs is with Aster. Nothing more is needed from you
            before you register at orientation on {when}.
          </>
        )}
      </Notice>
    );
  }

  const mine = yoursToAct(items);
  // The one escalation this notice spends. A deadline is not a failure while
  // there is time; inside a week it is the most important thing on the page.
  const urgent = days <= 7;

  return (
    <Notice
      tone={urgent ? 'urgent' : 'soon'}
      icon="flag"
      action={{ label: `See the ${mine.length === 1 ? 'step' : `${mine.length} steps`}`, onClick: onShow }}
    >
      {mine.length === 1 ? 'One step has' : `${mine.length} steps have`} to be done before{' '}
      you register for classes at orientation on {when}.
    </Notice>
  );
}
