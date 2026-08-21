import Icon from '../../design-system/Icon.jsx';
import MomentumCard from '../rewards/MomentumCard.jsx';

export default function EnrollmentRail({
  earnedPoints,
  availableToday,
  nextReward,
  rewardsOn = true,
  unavailable = false,
  onResume,
  onOpenPoints,
}) {
  return (
    <>
      {/* ENR-162 AC 5. An institution with rewards off leaves no card behind,
          and the rail closes over the gap rather than holding an empty one. */}
      {rewardsOn && (
        <MomentumCard
          earnedPoints={earnedPoints}
          availableToday={availableToday}
          next={nextReward}
          unavailable={unavailable}
          onOpenPoints={onOpenPoints}
        />
      )}

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
