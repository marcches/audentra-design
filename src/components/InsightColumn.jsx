import Icon from '../Icon.jsx';

export default function InsightColumn({
  earnedPoints,
  availableToday,
  completedCount,
  onResume,
  onOpenPoints,
}) {
  return (
    <aside className="insight-column">
      <div className="momentum-card">
        <div className="momentum-header">
          <span className="points-icon large">
            <Icon name="spark" size={21} />
          </span>
          <div>
            <span>Your momentum</span>
            <strong>{earnedPoints.toLocaleString()} pts</strong>
          </div>
        </div>
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
        <button className="learn-link" onClick={onOpenPoints}>
          How points work <Icon name="arrow" size={14} />
        </button>
      </div>

      <div className="skipped-card">
        <div className="skipped-top">
          <span className="tiny-avatar">MJ</span>
          <span className="resume-badge">Saved from welcome</span>
        </div>
        <h3>No rush—you can finish these now.</h3>
        <p>
          You skipped two details while accepting your offer. We saved your place, so nothing was
          lost.
        </p>
        <button onClick={onResume}>
          Continue where I left off <Icon name="arrow" size={16} />
        </button>
      </div>
    </aside>
  );
}
