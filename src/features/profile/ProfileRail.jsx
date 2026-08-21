import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { RECORD_CATEGORIES, offices, session } from './data.js';

/**
 * The profile rail: the standing on access, the way out, and the offices that
 * hold what the student cannot change.
 *
 * The anchor states the standing; the card in the main column holds the
 * controls. That split is the one My Classrooms already uses — the rail says
 * how many credits count, the page is where the requirements are read — and it
 * is why the anchor carries no checkbox.
 */
export default function ProfileRail({ grants, onSignOut, onAsk }) {
  const people = grants?.length ?? 0;
  const shared = grants ? new Set(grants.flatMap((grant) => grant.granted)).size : 0;
  const until = grants?.[0]?.endsOn;

  return (
    <>
      <AnchorCard variant="access" label="Who can see your record">
        <strong className="counts-figure">
          {grants === null ? '—' : people === 0 ? 'Only you' : `${people} person`}
          <small>
            {grants === null
              ? 'this couldn’t be checked just now'
              : people === 0
                ? 'nobody else has been given access'
                : `${shared} of ${RECORD_CATEGORIES.length} categories, until ${until}`}
          </small>
        </strong>

        <div className="counts-divider" />

        <p className="access-note">
          <Icon name="lock" size={15} />
          Private by default. Nothing about you is shared unless you chose it, category by category.
        </p>
      </AnchorCard>

      {/* AC 7. The reason comes before the control: a student on a library
          machine has to know what closing the tab does not do. */}
      <div className="session-card">
        <span className="session-icon" aria-hidden="true">
          <Icon name="signout" size={19} />
        </span>
        <span className="panel-label">Ending your session</span>
        <p>{session.reason}</p>
        <p className="session-meta">
          <Icon name="clock" size={13} /> {session.since} · {session.device}
        </p>
        <button className="secondary-button" onClick={onSignOut}>
          <Icon name="signout" size={16} /> Sign out
        </button>
      </div>

      <div className="offices-card">
        <span className="panel-label">Who changes the rest</span>
        {Object.values(offices).map((office) => (
          <div className="office-row" key={office.id}>
            <strong>{office.name}</strong>
            <p>{office.holds}</p>
            <p className="office-meta">
              <span>
                <Icon name="pin" size={12} /> {office.where}
              </span>
              <span>
                <Icon name="clock" size={12} /> {office.hours}
              </span>
            </p>
            <button className="learn-link" onClick={() => onAsk(office)}>
              Ask {office.short} <Icon name="arrow" size={14} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
