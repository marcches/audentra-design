import Icon from '../Icon.jsx';

/**
 * Lives on My Enrollment and on the Dashboard. One component rather than two
 * copies, so the balance can never be phrased two ways on two pages.
 */
export default function MomentumCard({
  earnedPoints,
  availableToday,
  completedCount,
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
          <strong>{unavailable ? '—' : `${earnedPoints.toLocaleString()} pts`}</strong>
        </div>
      </div>

      {unavailable ? (
        <p className="momentum-unavailable">
          Your balance didn’t load this time. Nothing you earned is lost — it will be back shortly.
        </p>
      ) : (
        <>
          <div className="level-track">
            <span style={{ width: `${Math.min(88, 54 + completedCount * 4)}%` }} />
          </div>
          <div className="level-labels">
            <span>Settling in</span>
            <span>{Math.max(0, 850 - earnedPoints)} to Trailblazer</span>
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
