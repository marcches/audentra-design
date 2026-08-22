import Icon from '../../design-system/Icon.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import { shortDate } from '../campus/logic.js';
import { openEdward } from '../edward/door.js';
import { runningName } from '../edward/logic.js';
import { teamName } from './logic.js';

/**
 * One topic a student can book a conversation about — on the checklist's row, since the changes of
 * 2026-08-21 (A1, T1, T5, A9).
 *
 * It wears the task row's classes rather than a shape of its own, the way `.appointment-row` wears
 * the campus row's: the guide's row anatomy is the portal's one anatomy for a row that asks for an
 * action — category eyebrow, a title at the head's size and regular weight, one sentence, a line of
 * facts, a button, a quiet link — and a second shape for the same job is what the audit found ten of.
 *
 * What the row offers depends on what the team has posted — and since the review of 2026-08-21
 * (Part A §3, §12; ADR 0010) the screen no longer asks a team for anything:
 *
 *   times posted       `Book a time`. Booking from posted times is a resolution, not a route to a
 *                      person, and it stays direct — the one exception to §12.
 *   none posted        the absence is stated as a fact about the institution, and the button opens
 *                      **Edward** with the question already written and not sent; what Edward
 *                      offers next — a callback from that team, or an inquiry — is his to offer.
 *                      Being emailed when times go up is the quiet link: a notification, not a
 *                      route to a person.
 *   times did not load the row says which, and offers neither.
 *
 * Every row is the same row, whatever it offers. T5 asked for a row with no times to sit a step
 * down in size; Marco struck that on 2026-08-21 — a card whose titles come in two sizes is a
 * font-size error, not a hierarchy — so the title is at the head's size on every row and the
 * difference is said by the facts line and the button's label. The one `primary` button on the
 * card is the row the page's band points at — at most one primary per card (`Button.jsx`); every
 * other row's button is secondary, exactly as on the guide.
 */
export default function TopicRow({
  type,
  days,
  unavailable = false,
  band = null,
  notified = false,
  onChoose,
  onNotify,
}) {
  const count = days.reduce((total, day) => total + day.slots.length, 0);
  const next = days[0]?.date ?? null;
  const hasTimes = !unavailable && count > 0;
  const recommended = Boolean(band);
  const kind = recommended ? 'primary' : 'secondary';
  const office = runningName(type.team);

  /** The door — Part A §12.2 and §12.4: the question names the team, in her voice, unsent. */
  function askEdward() {
    openEdward({
      question: `${office} hasn’t posted any times. How do I get in touch with them?`,
      context: { label: `Appointments · ${type.label}`, topic: type.id, intent: 'advisor' },
    });
  }

  return (
    <article
      className={['task-card', 'topic-row', recommended && 'recommended'].filter(Boolean).join(' ')}
    >
      {band === 'start' && <ActionBand icon="spark" label="Start here" />}
      {/* A6 as Part A §6.1 amended it: the office as the campus says it, and "posted times",
          not "opened a calendar" — the band points at the row whose button is the door. */}
      {band === 'closed' && (
        <ActionBand icon="clock" label={`${office} doesn’t have times posted right now`} />
      )}

      <div className="task-card-body">
        <div className="task-type-icon meeting" aria-hidden="true">
          <Icon name="calendar" size={21} weight="duotone" />
        </div>

        <div className="task-main">
          <div className="task-meta-row">
            <span>{type.category}</span>
          </div>
          <h3>{type.label}</h3>
          <p>{type.blurb}</p>
          {!hasTimes && !unavailable && (
            <p className="no-slots">
              {office} hasn’t posted times yet. You can ask them to call you back, or we’ll let you
              know when times go up.
            </p>
          )}
          <div className="task-facts">
            <span>
              <Icon name="users" size={15} /> {teamName(type)}
            </span>
            <span>
              <Icon name="clock" size={15} /> {type.minutes} min
            </span>
            {unavailable ? (
              <span>
                <Icon name="alert" size={15} /> Times couldn’t be loaded
              </span>
            ) : hasTimes ? (
              <span>
                <Icon name="calendar" size={15} /> Next {shortDate(next)} <b>· {count} open</b>
              </span>
            ) : (
              <span>
                <Icon name="calendar" size={15} /> No times posted
              </span>
            )}
          </div>
        </div>

        <div className="task-action">
          {hasTimes ? (
            <Button kind={kind} icon="arrow" onClick={(event) => onChoose(type, event.currentTarget)}>
              Book a time
            </Button>
          ) : unavailable ? null : (
            <>
              <Button kind={kind} icon="arrow" onClick={askEdward}>
                Ask Edward
              </Button>
              {/* The notification is set in place: after the click the link is the sentence, in
                  the same position (10.2). */}
              {notified ? (
                <span className="notify-set" role="status">
                  We’ll email you when {office} posts times.
                </span>
              ) : (
                <button type="button" className="text-button" onClick={() => onNotify(type)}>
                  Email me when times are posted
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
