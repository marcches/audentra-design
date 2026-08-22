import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { offices } from '../help/data.js';
import { responseDeadline } from './data.js';
import { STAGES } from './logic.js';

/**
 * The rail: what happens next, who is doing it, and — in one sentence — what a preference is worth.
 *
 * The **stage tracker** is the answer to the hardest state on this card. After the response deadline
 * the section stops offering ranking, and the brief says that must read as the process moving on
 * rather than as a page that broke or went read-only by accident. Saying so in a sentence is weak;
 * [Stripe](https://mobbin.com/screens/b24bf79e-1acc-4d99-9f38-b81aa68daaf8) answers the same problem
 * structurally, by naming the current stage inside a sequence you can see. A page that shows you
 * step two of three has not broken — it has moved. It also makes the eventual assignment the last
 * step of a path the student was already watching, rather than a surprise.
 *
 * The tracker only appears once there is something to track. Before the deadline the student is not
 * waiting on anybody, and a progress tracker sitting on step one would invent a wait that does not
 * exist yet.
 *
 * The second card used to be two essays — the long version of the influence sentence and the whole
 * of "Changing your housing answer" — and the review of 2026-08-21 (G9) found them saying what the
 * main column already says, at length, in the place a student scans for a fact. The card keeps its
 * title, says the thing once, and the fuller explanation and the guide sit behind *How housing
 * decisions work*, the way "How points work" does on the checklist. No explanation appears in full
 * in both columns.
 */
export default function HousingRail({ deadlinePassed, assignment, stage, onHow }) {
  const office = offices.housing;

  return (
    <>
      {deadlinePassed && (
        <AnchorCard variant="stage" label="Where this is now">
          <ol className="stage-track">
            {STAGES.map((label, index) => (
              <li
                key={label}
                className={index < stage ? 'done' : index === stage ? 'current' : 'ahead'}
              >
                <span className="stage-dot" aria-hidden="true">
                  {index < stage ? <Icon name="check" size={12} /> : null}
                </span>
                <span className="stage-label">
                  {label}
                  {index === stage && (
                    <small>
                      {index === 1
                        ? `${office.name} is working through the submitted shortlists.`
                        : `Assigned on ${assignment?.assignedOn}.`}
                    </small>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </AnchorCard>
      )}

      <AnchorCard
        variant="deadline"
        label={deadlinePassed ? 'Assigning now' : 'Answer by'}
        figure={deadlinePassed ? office.name : responseDeadline.label}
      >
        <p>
          {deadlinePassed
            ? `${office.decides} Rooms are assigned from the shortlists submitted before ${responseDeadline.label}.`
            : `${responseDeadline.daysLeft} days left. Until then your plan and your order are both yours to change.`}
        </p>
        <p className="reply-note">
          <Icon name="pin" size={14} /> {office.location} · {office.hours}
        </p>
        <p className="reply-note">
          <Icon name="mail" size={14} /> Usually replies in {office.reply}
        </p>
      </AnchorCard>

      <div className="provenance-card">
        <span className="panel-label">What a preference is worth</span>
        <p>
          You tell {office.name} what you’d like, in order. They decide, and they may place you
          somewhere you didn’t name.
        </p>
        <button type="button" className="text-button" onClick={onHow}>
          How housing decisions work <Icon name="arrow" size={14} />
        </button>
      </div>
    </>
  );
}
