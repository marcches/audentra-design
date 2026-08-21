import { forwardRef } from 'react';
import { TOTAL_STEPS } from './data.js';
import { stepNumber } from './logic.js';

/**
 * What every step opens with, and the reason it is one component: the position
 * indicator is required to be visible **at all times** (ENR-151 AC 5), and the
 * rail folds away below 1060. A step that wrote its own head would eventually
 * be a step that forgot.
 *
 * The heading takes focus when the step changes, so a keyboard user is moved to
 * the new question instead of being left at the bottom of the last one.
 */
const StepHead = forwardRef(function StepHead({ step }, ref) {
  return (
    <header className="step-head">
      <p className="eyebrow muted">
        Step {stepNumber(step.id)} of {TOTAL_STEPS}
        {step.required ? '' : ' · optional'}
      </p>
      <h1 ref={ref} tabIndex={-1}>
        {step.question}
      </h1>
      <p className="step-lede">{step.lede}</p>
    </header>
  );
});

export default StepHead;
