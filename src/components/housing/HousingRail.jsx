import Icon from '../../Icon.jsx';
import { guideById, offices } from '../../help-data.js';
import { responseDeadline } from '../../housing-data.js';
import { STAGES } from '../../lib/housing.js';

/**
 * The rail: what happens next, who is doing it, and what a preference is actually worth.
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
 * The second card is the long version of the influence sentence — the short one lives on the
 * shortlist panel — followed by the institution's own guide, rendered as `help-data.js` publishes it
 * and with its date. Aster already said half of this on 2026-08-08; paraphrasing it here would give
 * the student two versions of one promise.
 */
export default function HousingRail({ deadlinePassed, assignment, stage }) {
  const office = offices.housing;
  const guide = guideById('housing-answer');

  return (
    <>
      {deadlinePassed && (
        <div className="anchor-card stage-card">
          <span className="panel-label">Where this is now</span>
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
        </div>
      )}

      <div className="anchor-card deadline-card">
        <span className="panel-label">{deadlinePassed ? 'Assigning now' : 'Answer by'}</span>
        <strong>{deadlinePassed ? office.name : responseDeadline.label}</strong>
        <p>
          {deadlinePassed
            ? `${office.decides} Rooms are assigned from the shortlists submitted before ${responseDeadline.label}.`
            : `${responseDeadline.daysLeft} days left. Until then your plan and your order are both yours to change.`}
        </p>
        <p className="reply-note">
          <Icon name="pin" size={14} /> {office.location} · {office.hours}
        </p>
        <p className="reply-note">
          <Icon name="mail" size={14} /> Typically replies in {office.reply}
        </p>
      </div>

      <div className="provenance-card">
        <span className="panel-label">What a preference is worth</span>
        <p>
          You are telling {office.name} what you would like, in the order you would like it. They
          decide, and they may place you somewhere you did not name — that is what makes this a
          preference and not a booking.
        </p>
        <p>
          It is not nothing, either. They read the order you set, first to last, and a residence you
          never name is one you will not be considered for.
        </p>

        {guide && (
          <div className="guide-quote">
            <strong>{guide.topic}</strong>
            {guide.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <span className="guide-meta">
              Published by {office.name} · updated {guide.updated}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
