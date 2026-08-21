import { useRef } from 'react';
import Icon from '../Icon.jsx';
import { useOverlay } from '../../lib/overlay.js';

const SIGNALS = [
  ['01', 'What you can do', 'Actionable steps always come before work that is locked or under review.'],
  ['02', 'What it unlocks', 'Steps that open housing, advising, or orientation move higher.'],
  ['03', 'When it’s due', 'Deadlines and processing time keep urgent work from sneaking up on you.'],
  ['04', 'How long it takes', 'Quick wins appear when they can clear the path without distracting you.'],
];

const CREDIT_STEPS = [
  ['01', 'Evidence arrives', 'Aster reads the transcripts and score reports you sent with your application.'],
  ['02', 'A rule is proposed', 'A published credit policy is matched against that evidence. That suggestion is what you see on this page.'],
  ['03', 'A person reviews it', 'The Registrar’s Office compares the course, its contact hours and its content against Aster’s own.'],
  ['04', 'A decision is recorded', 'Approved, partly approved, or not approved. Only at this point does a requirement change.'],
];

const PROGRESS_STEPS = [

  ['01', 'What is measured', 'Your grade average, the share of credits you finish, and how many you have attempted in total.'],

  ['02', 'When it is measured', 'At the end of every term, once grades are final. Never mid-term, and never from this page.'],

  ['03', 'Who decides', 'Student Financial Services reviews each record on its own, including anything that happened to you that a number cannot show.'],

  ['04', 'What you hear', 'A decision comes to you from Aster directly, with what to do next if you are under a minimum. Nothing changes before that.'],

];



const POINT_RULES = [
  'Each task starts with a maximum reward set by Aster.',
  'The reward typically decreases by one point per day.',
  'Your deadline never changes—and points never affect admission decisions.',
];

export default function InfoModal({ variant, onClose }) {
  const panel = useRef(null);
  useOverlay(panel, { onClose });

  return (
    <div className="center-modal-wrap" role="dialog" aria-modal="true" aria-labelledby="info-title">
      <button className="modal-scrim" aria-label="Close" onClick={onClose} />
      <div className="info-modal" ref={panel}>
        <button className="icon-button modal-close" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>

        {variant === 'smart' ? (
          <>
            <span className="modal-kicker">
              <Icon name="spark" size={16} /> Smart order
            </span>
            <h2 id="info-title">Your checklist adapts to what matters now.</h2>
            <p>
              Audentra ranks steps using four signals, then updates the order as your situation
              changes.
            </p>
            <div className="signal-grid">
              {SIGNALS.map(([number, title, copy]) => (
                <div key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
            <div className="modal-note">
              <Icon name="info" size={18} /> The order is a recommendation—not a restriction. You
              can open any available task.
            </div>
          </>
        ) : variant === 'credit' ? (
          <>
            <span className="modal-kicker credit">
              <Icon name="shield" size={16} /> Credit approval
            </span>
            <h2 id="info-title">A match is a suggestion. Only the Registrar decides.</h2>
            <p>
              Audentra can spot that something you already did looks like an Aster course. It cannot
              grant credit for it, and neither can this page.
            </p>
            <div className="signal-grid">
              {CREDIT_STEPS.map(([number, title, copy]) => (
                <div key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
            <div className="modal-note safe">
              <Icon name="shield" size={18} /> Until a decision is recorded, nothing has changed.
              Plan your courses as if a match does not exist.
            </div>
          </>
        ) : variant === 'progress' ? (

          <>

            <span className="modal-kicker progress">

              <Icon name="chart" size={16} /> Academic progress

            </span>

            <h2 id="info-title">A check Aster runs. Never a decision this page makes.</h2>

            <p>

              Federal rules ask Aster to confirm you are moving through your degree before it

              releases aid for another term. Audentra can show you what your record says today. It

              cannot decide anything, and neither can the panel you came from.

            </p>

            <div className="signal-grid">

              {PROGRESS_STEPS.map(([number, title, copy]) => (

                <div key={number}>

                  <span>{number}</span>

                  <strong>{title}</strong>

                  <p>{copy}</p>

                </div>

              ))}

            </div>

            <div className="modal-note safe">

              <Icon name="shield" size={18} /> Being under a minimum is not the end of your aid.

              There is an appeal, and your advisor starts it with you.

            </div>

          </>

        ) : (

          <>

            <span className="modal-kicker points">
              <Icon name="spark" size={16} /> Momentum points
            </span>
            <h2 id="info-title">A little reward for moving early.</h2>
            <p>
              Points make progress visible and celebrate finishing important steps before they
              become stressful.
            </p>
            <div className="formula-card">
              <div>
                <span>Today</span>
                <strong>100 pts</strong>
              </div>
              <div className="formula-line">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div>
                <span>Tomorrow</span>
                <strong>99 pts</strong>
              </div>
            </div>
            <ul className="point-rules">
              {POINT_RULES.map((rule) => (
                <li key={rule}>
                  <span>
                    <Icon name="check" size={15} />
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
            <div className="modal-note safe">
              <Icon name="shield" size={18} /> Points recognize participation only. They are not
              academic credit and are not used to evaluate students.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
