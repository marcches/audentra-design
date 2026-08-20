import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon.jsx';
import { confidenceLabel, requirementStatus } from '../lib/academic-helpers.js';
import { program } from '../data-academics.js';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const NEXT_STEPS = [
  'The Registrar’s Office compares your evidence against Aster’s credit policy.',
  'A decision is recorded — approved, partly approved, or not approved.',
  'Only then does your requirement change. You will see it here and in your official record.',
];

/**
 * One drawer, two kinds, the way `TaskDrawer` carries four. Focus is trapped
 * while it is open and returns to whatever opened it — the pattern this repo
 * owes every overlay.
 */
export default function AcademicDrawer({ item, onClose, onAsk, onOpenCredit }) {
  const panel = useRef(null);
  const opener = useRef(null);
  const [tab, setTab] = useState('evidence');

  useEffect(() => {
    opener.current = document.activeElement;
    const node = panel.current;
    node?.querySelector(FOCUSABLE)?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !node) return;
      const targets = [...node.querySelectorAll(FOCUSABLE)].filter((el) => !el.disabled);
      if (targets.length === 0) return;
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      opener.current?.focus?.();
    };
  }, [onClose]);

  const isMatch = item.kind === 'match';

  return (
    <>
      <button className="modal-scrim" aria-label="Close" onClick={onClose} />
      <aside
        className="task-drawer"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="academic-drawer-title"
      >
        <div className="drawer-header">
          <div className="drawer-label">
            <span>{isMatch ? 'Potential credit match' : item.requirement.name}</span>
            <span>{isMatch ? 'Advisory' : `Catalog ${program.catalog}`}</span>
          </div>
          <button className="icon-button" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer-content">
          {isMatch ? <MatchBody match={item.match} tab={tab} onTab={setTab} onAsk={onAsk} onOpenCredit={onOpenCredit} /> : <CourseBody course={item.course} requirement={item.requirement} />}
        </div>
      </aside>
    </>
  );
}

function CourseBody({ course, requirement }) {
  const status = requirementStatus(requirement);

  return (
    <>
      <div className={`drawer-icon course ${course.state}`}>
        <Icon name={course.state === 'approved' ? 'check' : 'book'} size={25} />
      </div>
      <h2 id="academic-drawer-title">
        {course.code} · {course.title}
      </h2>
      <p className="drawer-description">
        {course.credits} credits · {course.terms}. This course is one of the ways Aster lets you
        satisfy {requirement.name}.
      </p>

      <div className="why-card">
        <span>
          <Icon name="book" size={17} />
        </span>
        <div>
          <strong>Where this fits</strong>
          <p>
            {requirement.name} —{' '}
            {requirement.creditsApproved == null
              ? 'credits pending sync'
              : `${requirement.creditsApproved} of ${requirement.creditsRequired} credits approved`}
            {status === 'satisfied' ? '. This requirement is already satisfied.' : '.'}
          </p>
        </div>
      </div>

      {course.state === 'approved' && (
        <div className="evidence-panel approved">
          <span className="evidence-kicker">
            <Icon name="shield" size={15} /> Credit approved
          </span>
          <p>
            <strong>{course.evidence}</strong>
          </p>
          <p>
            {course.decidedOn} by the {program.officialRecord.office}. This one is decided — it counts
            toward your degree.
          </p>
        </div>
      )}

      {course.state === 'locked' && (
        <div className="evidence-panel locked">
          <span className="evidence-kicker">
            <Icon name="lock" size={15} /> Not open to you yet
          </span>
          <p>
            You need <strong>{course.prerequisite}</strong> first. It opens as soon as that is on
            your record.
          </p>
        </div>
      )}

      {course.state === 'open' && course.prerequisite && (
        <div className="evidence-panel">
          <span className="evidence-kicker">
            <Icon name="check" size={15} /> Prerequisite met
          </span>
          <p>
            This course asks for <strong>{course.prerequisite}</strong>, and you already have it.
          </p>
        </div>
      )}

      {course.note && <p className="drawer-note">{course.note}</p>}

      <div className="help-note">
        <Icon name="info" size={18} />
        <p>
          <strong>This is catalog information.</strong> Aster published it on{' '}
          {program.publishedOn.replace('Published by Aster on ', '')}. Registering for a course
          happens in Aster’s student system, not here.
        </p>
      </div>
    </>
  );
}

function MatchBody({ match, tab, onTab, onAsk, onOpenCredit }) {
  return (
    <>
      <div className="drawer-icon match">
        <Icon name="alert" size={25} />
      </div>
      <h2 id="academic-drawer-title">
        {match.target.courseCode} · {match.target.courseTitle}
      </h2>
      <p className="drawer-description">
        Something in your documents looks like it might cover this course. Nobody has decided that
        yet.
      </p>

      <div className="advisory-banner">
        <Icon name="info" size={18} />
        <div>
          <strong>Not approved. Nothing here counts.</strong>
          <p>
            Your requirement status, your credit total and your degree progress are exactly what they
            were before this match existed. Only the {program.officialRecord.office} can change that.
          </p>
        </div>
      </div>

      <div className="drawer-tabs" role="tablist">
        <button
          className={tab === 'evidence' ? 'active' : ''}
          onClick={() => onTab('evidence')}
          role="tab"
          aria-selected={tab === 'evidence'}
        >
          The evidence
        </button>
        <button
          className={tab === 'rule' ? 'active' : ''}
          onClick={() => onTab('rule')}
          role="tab"
          aria-selected={tab === 'rule'}
        >
          The rule
        </button>
      </div>

      {tab === 'rule' ? (
        <div className="how-panel">
          <div className="rule-card">
            <span className="rule-code">Rule {match.rule.code}</span>
            <p>{match.rule.text}</p>
            <span className="rule-source">Aster credit policy, published by the Registrar</span>
          </div>
          <div className="confidence-panel">
            <span className={`confidence-chip ${match.confidence}`}>
              {confidenceLabel(match.confidence)}
            </span>
            <p>{match.confidenceNote}</p>
          </div>
          <h3>What happens next</h3>
          <ol>
            {NEXT_STEPS.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <button className="text-button full" onClick={onOpenCredit}>
            How credit is approved
          </button>
        </div>
      ) : (
        <div className="action-panel">
          <div className="evidence-panel">
            <span className="evidence-kicker">
              <Icon name="file" size={15} /> What this was drawn from
            </span>
            <p>
              <strong>{match.evidence.detail}</strong>
            </p>
            <p>
              {match.evidence.document} · {match.evidence.source}
            </p>
            <p className="evidence-when">{match.evidence.uploadedOn}</p>
          </div>

          <div className="match-target-panel">
            <span className="evidence-kicker">
              <Icon name="arrow" size={15} /> What it might cover
            </span>
            <p>
              <strong>
                {match.target.courseCode} · {match.target.courseTitle}
              </strong>
            </p>
            <p>
              {match.target.credits} credits toward {match.target.requirementName}
            </p>
          </div>

          <div className="confidence-panel">
            <span className={`confidence-chip ${match.confidence}`}>
              {confidenceLabel(match.confidence)}
            </span>
            <p>{match.confidenceNote}</p>
          </div>

          <div className={`help-note ${match.confidence === 'needs-review' ? 'warn' : ''}`}>
            <Icon name={match.confidence === 'needs-review' ? 'alert' : 'info'} size={18} />
            <p>
              <strong>What to do meanwhile.</strong> {match.advice}
            </p>
          </div>

          <button className="primary-button full" onClick={() => onAsk(match)}>
            Ask your advisor about this <Icon name="arrow" size={17} />
          </button>
          <small className="prototype-note">
            Prototype: this raises a message instead of contacting anyone.
          </small>
        </div>
      )}
    </>
  );
}
