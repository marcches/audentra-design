import { enrollmentAdvisor } from '../data.js';

/**
 * The right half of the summary panel: the person who owns the subject.
 *
 * It used to carry five facts and two actions — role, name, office, building,
 * office hours, Email, Message — and it took 340px of hard `min-width` to do
 * it. In a panel that is two cells wide that floor was unpayable: it forced the
 * wrap on every section below about 1200px, and once the panel became a grid
 * with a 380px column the bar answered by growing to 153px tall against a 63px
 * figure beside it. Five facts do not fit, so the bar stopped trying.
 *
 * What is left is what the panel is for: who this person is to you, and the two
 * ways to reach them, which are right here. Where they sit and when they are in
 * the building answer a different question and were the two lines doing the
 * damage; the hours are still on Edward's person card, which is where you read
 * them while deciding whether to write.
 *
 * One bar, one content, every section — a section that shows more here is the
 * drift this was built to end.
 */
export default function AdvisorBar({ advisor = enrollmentAdvisor, onContact }) {
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
        <button aria-label={`Email ${advisor.name}`} onClick={() => onContact('email')}>
          Email
        </button>
        <button aria-label={`Message ${advisor.name}`} onClick={() => onContact('message')}>
          Message
        </button>
      </div>
    </div>
  );
}
