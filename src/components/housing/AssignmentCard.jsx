import Icon from '../../Icon.jsx';
import { residenceById } from '../../lib/housing.js';

/**
 * The room assignment — ENR-213 AC 6 seen from the student's side.
 *
 * A room assignment is a sibling of a decision, not a case of one: it shares the rule that an
 * outcome names who made it and when, and nothing else. So this card prints the person and the date
 * the way a decision does, and then stops — it asks nothing back, because an assignment never does.
 *
 * The last paragraph is load-bearing and is not reassurance. ENR-213 AC 7 says an assignment that
 * does not match the ranking is still a valid assignment, and the demo data is deliberately built
 * that way: Maya ranked Coyne first and was placed in Alcott. If the happy path always matched the
 * first preference, the screen would have spent the whole page saying a preference is not an
 * assignment and then quietly implied that it is.
 */
export default function AssignmentCard({ assignment, shortlist }) {
  const residence = residenceById(assignment.residenceId);
  const rankIndex = shortlist.indexOf(assignment.residenceId);
  const matchedFirst = rankIndex === 0;

  return (
    <section className="section-card assignment-card" aria-labelledby="assignment-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow muted">Assigned by {assignment.assignedBy}</p>
          <h2 id="assignment-heading">You have a room</h2>
        </div>
      </div>

      <div className="assignment-figure">
        <span className="org-tile large" aria-hidden="true">
          {residence.initials}
        </span>
        <div>
          <strong>{residence.name}</strong>
          <span>{assignment.room}</span>
          <span className="assignment-meta">
            <Icon name="pin" size={13} /> {residence.area} · {residence.walk} min walk
          </span>
        </div>
      </div>

      <dl className="assignment-facts">
        <div>
          <dt>Move in</dt>
          <dd>{assignment.moveIn}</dd>
        </div>
        <div>
          <dt>Assigned on</dt>
          <dd>{assignment.assignedOn}</dd>
        </div>
        <div>
          <dt>Assigned by</dt>
          <dd>{assignment.assignedBy}</dd>
        </div>
      </dl>

      <p className="assignment-note">
        <Icon name="info" size={16} />
        <span>
          {matchedFirst
            ? `This was your 1st preference. It often works out that way, and it was never guaranteed — Housing Services assigns rooms, and your ranking told them where to start.`
            : rankIndex > 0
              ? `You ranked ${residence.name} ${rankIndex === 1 ? 'second' : 'third'}. Your first preference was not available, which is what a preference means: it told Housing Services where to start, and they worked down your list.`
              : `${residence.name} was not on your shortlist. Housing Services places students outside their ranking when none of the three has a room free — the assignment is still yours, and it is final unless you ask them to change it.`}
        </span>
      </p>
    </section>
  );
}
