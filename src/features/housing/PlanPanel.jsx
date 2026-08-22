import Icon from '../../design-system/Icon.jsx';
import { planOptions, responseDeadline } from './data.js';
import { planById } from './logic.js';

/**
 * The first question, and the only one on this page the student actually decides.
 *
 * The construction is `.choice-panel` — the class `TaskDrawer` already owned for this exact question
 * when it lived in a drawer — widened to the page. Nothing new was invented for it.
 *
 * Two sentences carry acceptance criteria rather than tone:
 *
 *   above the options   ENR-210 AC 2, that none of these is a skip, said *before* they are read.
 *                       [Docusign](https://mobbin.com/screens/c0248abe-0324-4739-83e6-cbc310da9912)
 *                       puts its reassurance in the same place, and for the same reason.
 *   below them          ENR-210 AC 7, what confirming a plan just did, stated where it was done.
 *                       [Uxcel](https://mobbin.com/screens/fb7799b3-75b1-486d-a8d3-fce715b245f4).
 *
 * After the response deadline the radios are **gone**, not disabled. A disabled radio is an offer
 * withdrawn; an absent one is a stage that has passed.
 */
export default function PlanPanel({ plan, source, locked, onChoose }) {
  const chosen = planById(plan);

  if (locked) {
    return (
      <section className="section-card" aria-labelledby="plan-heading">
        <div className="status-heading">
          <span className="status-icon done" aria-hidden="true">
            <Icon name="home" size={20} />
          </span>
          <div>
            <h2 id="plan-heading">Where you will live</h2>
            <p>Your answer</p>
          </div>
        </div>
        <p className="settled-answer">
          <Icon name="check" size={17} />
          <span>
            <strong>{chosen ? chosen.label : 'No plan was recorded'}</strong>
            <small>
              {chosen
                ? `Recorded before ${responseDeadline.label}. Residential Life is working from this.`
                : `The deadline passed on ${responseDeadline.label} without an answer. This page updates when Residential Life decides.`}
            </small>
          </span>
        </p>
      </section>
    );
  }

  return (
    <section className="section-card" aria-labelledby="plan-heading">
      <div className="status-heading">
        <span className="status-icon accent" aria-hidden="true">
          <Icon name="home" size={20} />
        </span>
        <div>
          <h2 id="plan-heading">Where will you live?</h2>
          <p>First question</p>
        </div>
      </div>

      <p className="panel-lede">
        All four are real answers. Pick the one that’s true. You can change it until{' '}
        {responseDeadline.full}.
      </p>

      <div className="choice-panel" role="radiogroup" aria-labelledby="plan-heading">
        {planOptions.map((option) => (
          <label key={option.id} className={plan === option.id ? 'chosen' : ''}>
            <input
              type="radio"
              name="housing-plan"
              value={option.id}
              checked={plan === option.id}
              onChange={() => onChoose(option.id)}
            />
            <span>
              <strong>{option.label}</strong>
              <small>{option.hint}</small>
            </span>
            <span className="radio-mark">
              <Icon name="check" size={14} />
            </span>
          </label>
        ))}
      </div>

      {chosen && (
        <p className="choice-consequence" aria-live="polite">
          <Icon name={chosen.complete ? 'check' : 'clock'} size={16} />
          <span>
            {source === 'onboarding' && chosen.complete
              ? `You answered this during onboarding, so it is already recorded. ${chosen.consequence}`
              : chosen.consequence}
          </span>
        </p>
      )}
    </section>
  );
}
