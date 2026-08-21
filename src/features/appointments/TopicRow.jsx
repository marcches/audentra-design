import Icon from '../../design-system/Icon.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import { shortDate } from '../campus/logic.js';
import { articled, teamName } from './logic.js';

/**
 * One topic a student can book a conversation about — on the checklist's row, since the changes of
 * 2026-08-21 (A1, T1, T5, A9).
 *
 * It wears the task row's classes rather than a shape of its own, the way `.appointment-row` wears
 * the campus row's: the guide's row anatomy is the portal's one anatomy for a row that asks for an
 * action — category eyebrow, a title at the head's size and regular weight, one sentence, a line of
 * facts, a button, a quiet link — and a second shape for the same job is what the audit found ten of.
 *
 * What the row offers depends on what the team has published:
 *
 *   times published    `Choose a time`, and asking for another one as the quiet link;
 *   none published     asking is the button, and being told when times open is the link — asking
 *                      resolves now, being told suits someone willing to wait;
 *   times did not load asking is still possible, choosing is not, and the row says which.
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
  onAsk,
  onNotify,
}) {
  const count = days.reduce((total, day) => total + day.slots.length, 0);
  const next = days[0]?.date ?? null;
  const hasTimes = !unavailable && count > 0;
  const recommended = Boolean(band);
  const kind = recommended ? 'primary' : 'secondary';

  return (
    <article
      className={['task-card', 'topic-row', recommended && 'recommended'].filter(Boolean).join(' ')}
    >
      {band === 'start' && <ActionBand icon="spark" label="Start here" />}
      {band === 'closed' && (
        <ActionBand icon="clock" label={`${articled(type.team, true)} hasn’t opened a calendar yet`} />
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
              They haven’t opened a calendar yet. You can ask for a time, or wait and we’ll tell you
              when they open one.
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
                <Icon name="calendar" size={15} /> No times published yet
              </span>
            )}
          </div>
        </div>

        <div className="task-action">
          {hasTimes ? (
            <>
              <Button kind={kind} icon="arrow" onClick={(event) => onChoose(type, event.currentTarget)}>
                Choose a time
              </Button>
              <button
                type="button"
                className="text-button"
                onClick={(event) => onAsk(type, event.currentTarget)}
              >
                Ask for another time
              </button>
            </>
          ) : (
            <>
              <Button kind={kind} icon="arrow" onClick={(event) => onAsk(type, event.currentTarget)}>
                Ask for a time
              </Button>
              {/* The notification is set in place: after the click the link is the sentence, in
                  the same position (10.2). Times that did not load are not "no times", so the
                  link is not offered then. */}
              {!unavailable &&
                (notified ? (
                  <span className="notify-set" role="status">
                    We’ll tell you when this team opens times.
                  </span>
                ) : (
                  <button type="button" className="text-button" onClick={() => onNotify(type)}>
                    Tell me when times open
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
