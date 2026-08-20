import Icon from '../Icon.jsx';

const SIGNALS = [
  ['01', 'What you can do', 'Actionable steps always come before work that is locked or under review.'],
  ['02', 'What it unlocks', 'Steps that open housing, advising, or orientation move higher.'],
  ['03', 'When it’s due', 'Deadlines and processing time keep urgent work from sneaking up on you.'],
  ['04', 'How long it takes', 'Quick wins appear when they can clear the path without distracting you.'],
];

const POINT_RULES = [
  'Each task starts with a maximum reward set by Aster.',
  'The reward typically decreases by one point per day.',
  'Your deadline never changes—and points never affect admission decisions.',
];

export default function InfoModal({ variant, onClose }) {
  return (
    <div className="center-modal-wrap" role="dialog" aria-modal="true" aria-labelledby="info-title">
      <button className="modal-scrim" aria-label="Close" onClick={onClose} />
      <div className="info-modal">
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
