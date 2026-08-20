import Icon from '../Icon.jsx';
import MomentumCard from './MomentumCard.jsx';

export default function InsightColumn({
  earnedPoints,
  availableToday,
  completedCount,
  unavailable = false,
  onResume,
  onOpenPoints,
}) {
  return (
    <>
      <MomentumCard
        earnedPoints={earnedPoints}
        availableToday={availableToday}
        completedCount={completedCount}
        unavailable={unavailable}
        onOpenPoints={onOpenPoints}
      />

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
    </>
  );
}
