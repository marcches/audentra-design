import Icon from '../../Icon.jsx';
import { shortDate } from '../../lib/campus-helpers.js';

/**
 * The rail's anchor is the section's key secondary figure: **how much time is actually open.** It
 * is the number that decides whether "book a conversation" is an invitation or a wall, and it is
 * broken down by team so a student can see which office has gone quiet.
 *
 * Under it, what happens after the button is pressed — the promise ENR-178 AC 4 and AC 6 make
 * together: it reaches two calendars, or it reaches neither and says so.
 */
export default function AppointmentsRail({ availability, publisher, unavailable, onToast }) {
  const open = availability.perType.filter((entry) => entry.count > 0);

  return (
    <>
      <div className="anchor-card availability-card">
        <span className="panel-label">Times open now</span>

        {unavailable ? (
          <span className="counts-figure unknown">Not available</span>
        ) : (
          <span className="counts-figure">
            {availability.total}
            <small>
              across {open.length} of {availability.perType.length} teams
            </small>
          </span>
        )}

        <div className="counts-divider" />

        {unavailable ? (
          <p>
            The published times could not be loaded. Conversations you have already booked are
            unaffected — this is about what you could book next.
          </p>
        ) : (
          <>
            <ul className="team-times">
              {availability.perType.map(({ type, count, nextDate }) => (
                <li key={type.id}>
                  <span>{type.team}</span>
                  <strong className={count === 0 ? 'none' : undefined}>
                    {count === 0 ? 'None yet' : `${count} · from ${shortDate(nextDate)}`}
                  </strong>
                </li>
              ))}
            </ul>
            <p>
              Each team publishes its own times, and only what it publishes can be booked. A team
              with none has not gone quiet on you — it has not opened that calendar yet.
            </p>
          </>
        )}
      </div>

      <div className="provenance-card">
        <span className="panel-label">After you book</span>
        <ol className="after-list">
          <li>
            <span aria-hidden="true">
              <Icon name="calendar" size={14} />
            </span>
            <span>The time lands on your calendar and on the team’s, at the same moment.</span>
          </li>
          <li>
            <span aria-hidden="true">
              <Icon name="send" size={14} />
            </span>
            <span>What you wrote it is about travels with it, so nobody starts from nothing.</span>
          </li>
          <li>
            <span aria-hidden="true">
              <Icon name="alert" size={14} />
            </span>
            <span>
              If it cannot reach the team, it says so and stays in your list as{' '}
              <strong>Not booked</strong>. It is never shown as confirmed.
            </span>
          </li>
        </ol>

        <div className="provenance-meta">
          <span>
            <Icon name="clock" size={14} /> Times updated {publisher.updated}
          </span>
          <span>
            <Icon name="shield" size={14} /> {publisher.system}
          </span>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            onToast('A request for another time would go to the team — nothing is sent yet.')
          }
        >
          <Icon name="mail" size={16} /> Ask a team for another time
        </button>
      </div>
    </>
  );
}
