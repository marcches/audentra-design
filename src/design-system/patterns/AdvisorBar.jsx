import Icon from '../Icon.jsx';
import Tooltip from '../primitives/Tooltip.jsx';
import Avatar from '../primitives/Avatar.jsx';

/**
 * The right half of the summary panel: the person who owns the subject.
 *
 * It is sized by the cell beside it. The figure on the left is a 61px ring and
 * three short lines; the bar has to come to the same height or the panel is a
 * tall box with a short thing floating in it, which is the inconsistent
 * whitespace this slot had on all five sections.
 *
 * 61px pays for exactly two lines of copy and one row of controls, so:
 *
 *   - **The controls are icons, side by side.** `Email` and `Message` as words
 *     cost 150px of a 420px cell, which left 140px for copy that needs 320 —
 *     that was the overflow, and it is what made the bar 153px tall against a
 *     61px figure. Stacked they fit the width but not the height: two discs in
 *     a column are 73px on their own. Side by side they are 34px tall and cost
 *     the bar nothing. The word is still each button's accessible name and
 *     `Tooltip` gives it back on hover and on keyboard focus.
 *   - **The building and the office hours are not here.** Two more lines is
 *     40px the panel does not have. They are not lost: Edward's person card
 *     prints the office and the hours, which is where they are read — while
 *     deciding whether to write, not while reading a figure.
 *
 * What is left is what the panel is for: who this person is to you, their name,
 * and the two ways to reach them, both one click away. One bar, one content,
 * every section — a section that shows more or less here is the drift.
 *
 * ## When the subject is an office — the My Degree brief, 2026-08-21
 *
 * My Degree names the Office of the Registrar as the decider on every match
 * and then routed the student to her Admissions advisor; the brief replaces
 * the advisor with the office. An office is a thing, and a thing never gets a
 * face (design-workflow, *People, marks and the one illustration*), so a
 * subject with `kind: 'office'` draws a glyph in a tinted tile where the
 * avatar would be, and keeps everything else: the label, the line, the two
 * ways to reach it. `contact` is the name the buttons say — "Email the Office
 * of the Registrar" — when the line under the label is a location rather than
 * a name.
 */
export default function AdvisorBar({ advisor, onContact }) {
  const isOffice = advisor.kind === 'office';
  const who = advisor.contact ?? advisor.name;

  return (
    <div className="advisor-bar">
      {isOffice ? (
        <span className="advisor-office-mark advisor-avatar" aria-hidden="true">
          <Icon name={advisor.icon ?? 'buildings'} size={20} weight="duotone" />
        </span>
      ) : (
        <Avatar person={advisor} size="md" className="advisor-avatar" />
      )}
      <div className="advisor-bar-copy">
        <span className="panel-label">{advisor.label}</span>
        <strong>
          {advisor.name}
          {advisor.office ? <span> · {advisor.office}</span> : null}
        </strong>
      </div>
      <div className="advisor-actions">
        <Tooltip tip="Email">
          <button
            className="advisor-action"
            aria-label={`Email ${who}`}
            onClick={() => onContact('email')}
          >
            <Icon name="mail" size={16} />
          </button>
        </Tooltip>
        <Tooltip tip="Message">
          <button
            className="advisor-action"
            aria-label={`Message ${who}`}
            onClick={() => onContact('message')}
          >
            <Icon name="message" size={16} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
