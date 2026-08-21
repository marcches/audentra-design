import Drawer from '../../design-system/primitives/Drawer.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';
import { confidenceIcon, confidenceLabel, requirementStatus } from './logic.js';
import { program } from './data.js';

/**
 * One drawer, two kinds, the way `TaskDrawer` carries four. The frame, the
 * focus, the `Esc` and the tab trap come from `Drawer`. `suspended` is the
 * credit modal opening on top of this one: while it is there, `Esc` belongs
 * to it, and the primitive passes that through.
 *
 * The match kind is the **evidence drawer** of the brief of 2026-08-21 (D8):
 * *See the evidence* had a class in the stylesheet and no defined surface.
 * It has one now — `variant="evidence"`, the `.evidence-drawer` modifier by
 * the convention of `.person-drawer` and `.document-drawer`.
 */
export default function AcademicDrawer({ item, onClose, onAsk, onOpenCredit, suspended }) {
  const isMatch = item.kind === 'match';

  return (
    <Drawer
      variant={isMatch ? 'evidence' : 'course'}
      label={[
        isMatch ? 'Potential match' : item.requirement.name,
        isMatch ? 'Advisory' : `Catalog ${program.catalog}`,
      ]}
      titleId="academic-drawer-title"
      onClose={onClose}
      suspended={suspended}
    >
      {isMatch ? (
        <EvidenceBody match={item.match} onAsk={onAsk} onClose={onClose} onOpenCredit={onOpenCredit} />
      ) : (
        <CourseBody course={item.course} requirement={item.requirement} />
      )}
    </Drawer>
  );
}

function CourseBody({ course, requirement }) {
  const status = requirementStatus(requirement);

  return (
    <>
      <div className={`drawer-icon course ${course.state}`}>
        <Icon weight="duotone" name={course.state === 'approved' ? 'check' : 'book'} size={25} />
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
            {requirement.name} ·{' '}
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
            {course.decidedOn} by the {program.officialRecord.office}. This one is decided. It counts
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

/**
 * The evidence drawer, top to bottom, as the brief defines it (D8): the
 * target course; the source document exactly as the card states it, with the
 * issuing institution; what was read from it, as label and value pairs; the
 * rule, by ID and in one sentence; the deciding office and what happens next;
 * and two secondary actions. There is no approve or reject control anywhere
 * in it — the student is not a party to this decision (rule 4), and a control
 * that looked like one would undo the quarantine R1 protects.
 *
 * Two things the brief does not list and does not remove are kept where they
 * belong: the confidence note sits with the rule it qualifies, and the advice
 * for meanwhile — *plan to register for CS 110 as if this match does not
 * exist* — sits under *Who decides*, because it is the consequence of nobody
 * having decided yet.
 */
function EvidenceBody({ match, onAsk, onClose, onOpenCredit }) {
  const received = match.evidence.uploadedOn.replace('Uploaded ', '');

  return (
    <>
      <div className="drawer-icon match">
        <Icon weight="duotone" name="alert" size={25} />
      </div>
      <h2 id="academic-drawer-title">
        {match.target.courseCode} · {match.target.courseTitle}
      </h2>
      <p className="drawer-description">
        {match.evidence.document}, issued by {match.evidence.source}. {match.evidence.uploadedOn}.
      </p>

      <section className="evidence-block">
        <h3 className="evidence-kicker">What Aster read</h3>
        <dl className="evidence-facts">
          <div>
            <dt>Document</dt>
            <dd>{match.evidence.document}</dd>
          </div>
          <div>
            <dt>Issued by</dt>
            <dd>{match.evidence.source}</dd>
          </div>
          <div>
            <dt>Read</dt>
            <dd>{match.evidence.detail}</dd>
          </div>
          <div>
            <dt>Might cover</dt>
            <dd>
              {match.target.courseCode} · {match.target.credits} credits toward{' '}
              {match.target.requirementName}
            </dd>
          </div>
          <div>
            <dt>Received</dt>
            <dd>{received.charAt(0).toUpperCase() + received.slice(1)}</dd>
          </div>
        </dl>
      </section>

      <section className="evidence-block">
        <h3 className="evidence-kicker">The rule that applies</h3>
        <div className="rule-card">
          <span className="rule-code">Rule {match.rule.code}</span>
          <p>{match.rule.text}</p>
          <span className="rule-source">Aster credit policy, published by the Registrar</span>
        </div>
        <div className="confidence-panel">
          <span className={`confidence-chip ${match.confidence}`}>
            <Icon name={confidenceIcon(match.confidence)} size={12} />
            {confidenceLabel(match.confidence)}
          </span>
          <p>{match.confidenceNote}</p>
        </div>
      </section>

      <section className="evidence-block">
        <h3 className="evidence-kicker">Who decides</h3>
        <p className="evidence-decision">
          The {program.officialRecord.office} reviews this and decides. Nothing changes on your
          degree until they do.
        </p>
        <p className="evidence-meanwhile">
          <strong>Meanwhile.</strong> {match.advice}
        </p>
        <button type="button" className="text-button" onClick={onOpenCredit}>
          How credit is approved
        </button>
      </section>

      <div className="drawer-actions">
        <Button kind="secondary" onClick={() => onAsk(match)}>
          Ask the Registrar
        </Button>
        <Button kind="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </>
  );
}
