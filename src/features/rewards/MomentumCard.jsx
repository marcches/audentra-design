import Icon from '../../design-system/Icon.jsx';

/**
 * Lives in the insight rail on My Enrollment.
 *
 * It used to hold the balance. ENR-167's second pass put the balance in the
 * topbar, where ENR-162 AC 1 needs it — visible from every section, not from
 * one of thirteen — so this card stopped repeating it. One figure, one place:
 * the same rule the rest of the portal runs on, and the reason the sidebar
 * refuses to count a document decision twice.
 *
 * What is left is what only this page can say: how far the balance is from the
 * next thing it reaches, and what today's steps are worth.
 */
export default function MomentumCard({
  earnedPoints,
  availableToday,
  next,
  onOpenPoints,
  unavailable = false,
}) {
  return (
    <div className="momentum-card">
      <div className="momentum-header">
        <span className="points-icon large">
          <Icon name="spark" size={21} />
        </span>
        <div>
          <span>Your momentum</span>
          <strong>
            {unavailable
              ? 'Balance unavailable'
              : next
                ? `${next.away.toLocaleString()} pts to ${next.label.toLowerCase()}`
                : 'Every reward within reach'}
          </strong>
        </div>
      </div>

      {unavailable ? (
        <p className="momentum-unavailable">
          Your balance didn’t load this time. Nothing you earned is lost — it will be back shortly.
        </p>
      ) : (
        <>
          <div className="level-track">
            <span style={{ width: `${next ? Math.max(6, 100 - Math.round((next.away / next.cost) * 100)) : 100}%` }} />
          </div>
          <div className="level-labels">
            <span>{earnedPoints.toLocaleString()} earned</span>
            <span>{next ? `${next.cost.toLocaleString()} pts` : 'All reached'}</span>
          </div>
          <div className="today-reward">
            <span>
              <Icon name="gift" size={18} />
            </span>
            <div>
              <strong>{availableToday} points are on the table today</strong>
              <p>Most rewards decrease a little each day.</p>
            </div>
          </div>
        </>
      )}

      <button className="learn-link" onClick={onOpenPoints}>
        How points work <Icon name="arrow" size={14} />
      </button>
    </div>
  );
}
