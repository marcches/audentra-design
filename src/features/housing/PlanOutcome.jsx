import Icon from '../../design-system/Icon.jsx';
import { housingOffice, responseDeadline } from './data.js';

/**
 * What sits below the plan when the plan is not *living on campus*.
 *
 * The second question does not exist for three of the four answers, and the card's hardest
 * instruction about that is negative: **its absence must not read as missing content.** So none of
 * these is a `StateCard`. An empty state says something should be here and is not; every one of
 * these says the opposite — the page is complete, this is what your answer means.
 *
 * `own-housing` is the one carrying the most weight. Arranging your own housing is a complete
 * answer, not an opt-out, so this panel must not carry a single pending mark, a muted treatment or
 * a "you can still change this" that reads as *you probably should*.
 */
export default function PlanOutcome({ variant, onToast }) {
  if (variant === 'awaiting') {
    return (
      <section className="section-card outcome-card awaiting" aria-labelledby="next-heading">
        <span className="outcome-icon">
          <Icon name="home" size={22} />
        </span>
        <h2 id="next-heading">A second question opens if you live on campus</h2>
        <p>
          Students living on campus rank three residences from the catalogue {housingOffice}{' '}
          publishes. It is not shown yet because it only applies to one of the four answers above —
          nothing is missing from this page.
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
          Ranking residences is only for students living in Aster housing. Your answer is complete
          and no housing step is left open on your checklist.
        </p>
        <p>
          Before term starts, {housingOffice} sends commuters the parking permit form, the shuttle
          timetable and the list of buildings with day lockers.
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
          either would be useful — but neither is a step you owe anyone.
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
        Nothing is recorded as your plan — needing to decide is not a decision, and your checklist
        still shows housing as open, with its deadline. Put the question to {housingOffice} and they
        will come back to you.
      </p>
      <p>
        The residences are below so you can read them while you decide. You cannot rank them yet:
        ranking opens once you answer that you are living on campus.
      </p>
      <div className="outcome-actions">
        <a className="primary-button" href="#/help">
          Ask {housingOffice} <Icon name="arrow" size={17} />
        </a>
        <button
          className="secondary-button"
          onClick={() =>
            onToast(
              `${housingOffice} publishes a guide on changing your housing answer. It is on the Help page.`,
            )
          }
        >
          <Icon name="file" size={16} /> Read their guide
        </button>
      </div>
    </section>
  );
}
