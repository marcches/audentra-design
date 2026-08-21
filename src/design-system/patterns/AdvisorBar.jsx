import Icon from '../Icon.jsx';

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
 *     comes back as a bubble on hover and on keyboard focus.
 *   - **The building and the office hours are not here.** Two more lines is
 *     40px the panel does not have. They are not lost: Edward's person card
 *     prints the office and the hours, which is where they are read — while
 *     deciding whether to write, not while reading a figure.
 *
 * What is left is what the panel is for: who this person is to you, their name,
 * and the two ways to reach them, both one click away. One bar, one content,
 * every section — a section that shows more or less here is the drift.
 */
export default function AdvisorBar({ advisor, onContact }) {
  return (
    <div className="advisor-bar">
      <span className="advisor-avatar" aria-hidden="true">
        {advisor.initials}
      </span>
      <div className="advisor-bar-copy">
        <span className="panel-label">{advisor.label}</span>
        <strong>
          {advisor.name} <span>· {advisor.office}</span>
        </strong>
      </div>
      <div className="advisor-actions">
        <button
          className="advisor-action"
          data-tip="Email"
          aria-label={`Email ${advisor.name}`}
          onClick={() => onContact('email')}
        >
          <Icon name="mail" size={16} />
        </button>
        <button
          className="advisor-action"
          data-tip="Message"
          aria-label={`Message ${advisor.name}`}
          onClick={() => onContact('message')}
        >
          <Icon name="message" size={16} />
        </button>
      </div>
    </div>
  );
}
