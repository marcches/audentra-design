import Icon from '../../design-system/Icon.jsx';
import EdwardAsk from '../../design-system/patterns/EdwardAsk.jsx';
import { EDWARD } from '../edward/data.js';
import { openEdward } from '../edward/door.js';
import { housingOffice, responseDeadline } from './data.js';

/**
 * What sits below the plan when the plan is not *living on campus*.
 *
 * The second question does not exist for three of the four answers, and the card's hardest
 * instruction about that is negative: **its absence must not read as missing content.** So none of
 * these is a `StateCard`. An empty state says something should be here and is not; every one of
 * these says the opposite — the page is complete, this is what your answer means.
 *
 * Since the review of 2026-08-21 the *awaiting* card also states the catalogue's condition before
 * the first question is answered (G3): an institution that has published nothing and a catalogue
 * this portal could not read are different pages, and they used to render as the same one until the
 * student picked *on campus* and found out.
 *
 * `own-housing` is the one carrying the most weight. Arranging your own housing is a complete
 * answer, not an opt-out, so this panel must not carry a single pending mark, a muted treatment or
 * a "you can still change this" that reads as *you probably should*.
 *
 * `undecided` routes to a person, and the route is Edward (B4.2, Part A §12): the door opens with
 * the question written, and his escalation is what reaches Residential Life. No direct line before
 * him, and the plan stays open.
 */
export default function PlanOutcome({ variant, catalogue, onHow }) {
  if (variant === 'awaiting') {
    const unread = catalogue === null;
    const unpublished = Array.isArray(catalogue) && catalogue.length === 0;
    return (
      <section className="section-card outcome-card awaiting" aria-labelledby="next-heading">
        <span className="outcome-icon">
          <Icon name={unread ? 'alert' : 'home'} size={22} />
        </span>
        <h2 id="next-heading">A second question opens if you live on campus</h2>
        <p>
          {unread
            ? 'The residence hall catalog couldn’t be loaded just now. Your plan is unaffected, and ranking opens again when it loads.'
            : unpublished
              ? `${housingOffice} hasn’t published any residence halls yet. If you live on campus you’ll rank three here once they do.`
              : `Students living on campus rank three residence halls from the catalog ${housingOffice} publishes. It only applies if you live on campus.`}
        </p>
        <p className="outcome-meta">
          <Icon name="clock" size={14} /> Answer any time before {responseDeadline.full}.
        </p>
      </section>
    );
  }

  if (variant === 'commuting') {
    return (
      <section className="section-card outcome-card" aria-labelledby="commute-heading">
        <span className="outcome-icon">
          <Icon name="check" size={22} />
        </span>
        <h2 id="commute-heading">You are commuting, so there is nothing to rank</h2>
        <p>
          Ranking residence halls is only for students living in Aster housing. Your answer is complete
          and no housing step is left open on your checklist.
        </p>
        <p>
          Before term starts, {housingOffice} sends commuters the parking permit form, the shuttle
          schedule and the list of buildings with day lockers.
        </p>
        <p className="outcome-meta">
          <Icon name="clock" size={14} /> Changed your mind? Choose a different plan above, any time
          before {responseDeadline.full}.
        </p>
      </section>
    );
  }

  if (variant === 'own-housing') {
    return (
      <section className="section-card outcome-card" aria-labelledby="own-heading">
        <span className="outcome-icon">
          <Icon name="check" size={22} />
        </span>
        <h2 id="own-heading">You are arranging your own housing. That is the whole answer</h2>
        <p>
          Aster needs nothing further about where you live. You do not appear in the room assignment
          list, and no address is required from you for housing.
        </p>
        <p>
          {housingOffice} keeps a list of letting agents and a guide to local tenancy agreements, if
          either would be useful, but neither is a step you owe anyone.
        </p>
        <p className="outcome-meta">
          <Icon name="clock" size={14} /> Changed your mind? Choose a different plan above, any time
          before {responseDeadline.full}.
        </p>
      </section>
    );
  }

  return (
    <section className="section-card outcome-card undecided" aria-labelledby="undecided-heading">
      <span className="outcome-icon">
        <Icon name="help" size={22} />
      </span>
      <h2 id="undecided-heading">Someone at {housingOffice} will help you decide</h2>
      <p>
        Nothing is recorded as your plan. Needing to decide is not a decision, and your checklist
        still shows housing as open, with its deadline. Ask Edward and he’ll put you in touch with{' '}
        {housingOffice}.
      </p>
      <p>
        The residence halls are below so you can read them while you decide. You cannot rank them yet:
        ranking opens once you answer that you are living on campus.
      </p>
      <div className="outcome-actions">
        <EdwardAsk
          label="Ask Edward who can help"
          mark={EDWARD.mark}
          onClick={() =>
            openEdward({
              question: `I can’t decide where to live next year. Who at ${housingOffice} can help me?`,
              context: { label: 'Housing · Your plan', intent: 'advisor', office: 'housing' },
            })
          }
        />
        <button type="button" className="text-button" onClick={onHow}>
          <Icon name="info" size={15} /> How housing decisions work
        </button>
      </div>
    </section>
  );
}
