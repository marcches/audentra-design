import Icon from '../Icon.jsx';

export default function CampusRail({ interests, publisher, onToast }) {
  return (
    <>
      <div className="anchor-card interests-card">
        <div className="interests-header">
          <span className="points-icon large">
            <Icon name="spark" size={20} />
          </span>
          <div>
            <span>Your interests</span>
            <strong>{interests.join(' · ')}</strong>
          </div>
        </div>
        <div className="interest-chips">
          {interests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
        <p>
          You chose these when you set up your account, so we put matching events and organisations
          first. Nothing you read or open here changes your interests, your progress or your points.
        </p>
        <button
          className="learn-link"
          onClick={() => onToast('Interests are set in your profile — never from this page.')}
        >
          Change them in your profile <Icon name="arrow" size={14} />
        </button>
      </div>

      <div className="provenance-card">
        <span className="panel-label">Where this comes from</span>
        <p>
          <strong>{publisher.office}</strong> publishes every event and organisation on this page.
          Aster staff write it in the campus life editor; the portal only shows it.
        </p>
        <div className="provenance-meta">
          <span>
            <Icon name="clock" size={14} /> Updated {publisher.updated}
          </span>
          <span>
            <Icon name="profile" size={14} /> {publisher.coordinator.name},{' '}
            {publisher.coordinator.role}
          </span>
        </div>
        <button
          className="secondary-button"
          onClick={() =>
            onToast(
              `A message to ${publisher.coordinator.name} would open here — nothing is sent yet.`,
            )
          }
        >
          <Icon name="mail" size={16} /> Ask Student Life
        </button>
      </div>
    </>
  );
}
