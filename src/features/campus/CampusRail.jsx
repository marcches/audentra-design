import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import EdwardAsk from '../../design-system/patterns/EdwardAsk.jsx';
import { EDWARD } from '../edward/data.js';
import { openEdward } from '../edward/door.js';

export default function CampusRail({ interests, publisher, onToast }) {
  return (
    <>
      <AnchorCard variant="interests">
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
          You chose these when you set up your account, so Aster puts matching events and
          organizations first. Nothing you read or open here changes your interests, your progress,
          or your points.
        </p>
        <button
          className="learn-link"
          onClick={() => onToast('Interests are set in your profile, never from this page.')}
        >
          Change them in your profile <Icon name="arrow" size={14} />
        </button>
      </AnchorCard>

      <div className="provenance-card">
        <span className="panel-label">Where this comes from</span>
        <p>
          <strong>{publisher.office}</strong> publishes every event and organization on this page.
          Aster staff write it in the campus life editor. The portal only shows it.
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
        {/* The way to the person who publishes this is the Edward door (Part A
            §12, the sweep of 2026-08-22): the question written and unsent, and
            his escalation reaches Student Life — never a direct line first. */}
        <EdwardAsk
          label="Ask Student Life"
          mark={EDWARD.mark}
          onClick={() =>
            openEdward({
              question: `Who publishes what’s on My Campus Life, and how do I reach ${publisher.office}?`,
              context: {
                label: 'My Campus Life · Where this comes from',
                intent: 'campus-publisher',
                office: 'student-life',
              },
            })
          }
        />
      </div>
    </>
  );
}
