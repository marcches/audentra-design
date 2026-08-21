import Icon from '../../design-system/Icon.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import GateChip from '../registration/GateChip.jsx';
import { configFor, isGating } from '../registration/logic.js';
import { filesLabel, officeOf, stateInfo, stateOf } from '../documents/logic.js';

/**
 * The immunization record, in the section that owns its door — ENR-209.
 *
 * It is the **same object** My Documents renders, read through the same helpers,
 * so the two screens cannot describe one record differently. What differs is the
 * depth: My Documents lists six requirements and says one line about each; this
 * card has one requirement and room to show what it is holding up, what is
 * accepted, and every file of every attempt.
 *
 * `in review` never appears alone. It carries the office and how long that
 * office usually takes, because a wait with a duration reads as pending and a
 * wait without one reads as broken
 * ([Airwallex](https://mobbin.com/screens/5b2e67a8-ded8-496b-80f0-d2aa8ab4ae03)).
 *
 * Under a decision that came back, the order is Stripe's: what do I do now,
 * before why this happened
 * ([Stripe](https://mobbin.com/screens/b24bf79e-1acc-4d99-9f38-b81aa68daaf8)).
 * The reason and its remedies sit here, next to the control that replaces the
 * file — never as a strip at the top of the section, which would say it twice
 * and put the words far away from the fix.
 *
 * This is the one card on the page that spends colour, and only while it is the
 * one asking.
 */
export default function RecordCard({
  requirement,
  task,
  previewState = 'ready',
  unavailable,
  onOpen,
  onRetry,
}) {
  if (unavailable || !requirement) {
    return (
      <section className="section-card" aria-labelledby="record-title">
        <div className="status-heading">
          <span className="status-icon docs">
            <Icon name="file" size={18} />
          </span>
          <div>
            <h2 id="record-title">Immunization record</h2>
            <p>Health Services reviews it.</p>
          </div>
        </div>
        <StateCard
          variant="error"
          icon="alert"
          title="Your record could not be read just now"
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          Nothing has been lost. Until this loads it is shown neither as sent nor as outstanding,
          because Aster can’t tell you which it is without knowing.
        </StateCard>
      </section>
    );
  }

  const office = officeOf(requirement);
  const state = stateOf(requirement);
  const info = stateInfo(requirement);
  const submissions = [...(requirement.submissions ?? [])].reverse();
  const decision = requirement.submissions?.at(-1)?.decision ?? null;
  const asking = info.holder === 'you';

  return (
    <section className={`section-card record-card ${asking ? 'asking' : ''}`} aria-labelledby="record-title">
      <div className="status-heading">
        <span className={`status-icon ${asking ? info.tone : 'docs'}`}>
          <Icon name={state === 'accepted' ? 'check' : 'file'} size={18} />
        </span>
        <div>
          <h2 id="record-title">{requirement.title}</h2>
          <p>Health Services reviews it and decides.</p>
        </div>
        <span className={`status-chip ${info.tone}`}>{info.label}</span>
      </div>

      {/* ENR-214 AC 1. The record's own entry has said "Class registration opens
          once your record clears" since ENR-206 with nothing reading it; the
          chip is that sentence, from configuration, on every surface at once. */}
      {isGating(requirement.id, configFor(previewState)) && state !== 'accepted' && (
        <GateChip state={state} since={requirement.submissions?.at(-1)?.sent ?? null} />
      )}

      <div className="record-state">
        <p className="record-line">
          {state === 'checking' && <i className="pulse" aria-hidden="true" />}
          {state === 'in-review'
            ? `With ${office.name} since your last upload. They usually decide within ${office.reply}, and nothing is needed from you while they have it.`
            : state === 'accepted'
              ? // Not the requirement's `unblocks` line, which is written in the
                // future tense for a record that has not cleared yet. This one
                // has.
                `Accepted ${decision?.on ?? ''} by ${office.name}. Your record is clear and nothing more is needed here.`
              : state === 'checking'
                ? 'Aster is checking the files. You can leave this page. It keeps going without you.'
                : state === 'changes-requested'
                  ? `${office.name} sent it back. A replacement goes in the same place, beside what you already sent.`
                  : requirement.needs}
        </p>

        {/* The date the checklist carries, read live rather than copied, and
            only where it means something: on the thing that is still asking. */}
        {asking && task?.due && (
          <p className="record-due">
            {/* The gate clause left this line when the chip above took it —
                it was hard-coded here, and which requirements gate is
                configuration (AC 7). */}
            <Icon name="calendar" size={14} /> Health Services asks for it by {task.dueFull ?? task.due}
          </p>
        )}
      </div>

      {state === 'changes-requested' && decision && (
        <div className="record-returned">
          <p className="returned-lead">What would fix it</p>
          <ul className="reject-remedies">
            {(decision.remedies ?? []).map((remedy) => (
              <li key={remedy}>
                <Icon name="check" size={14} />
                {remedy}
              </li>
            ))}
          </ul>
          <p className="returned-reason">
            <Icon name="alert" size={14} /> {decision.reason}
          </p>
          <p className="returned-by">
            {office.name} · {decision.on}
          </p>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="card-rows record-rows">
          <p className="rows-caption">Everything you have sent</p>
          {submissions.map((submission) => (
            <div className="record-row" key={submission.id}>
              <span className="record-row-mark" aria-hidden="true">
                <Icon name="file" size={16} />
              </span>
              <span className="record-row-body">
                <strong>{filesLabel(submission)}</strong>
                <span>
                  Sent {submission.sent}
                  {submission.decision
                    ? submission.decision.outcome === 'accepted'
                      ? ` · accepted ${submission.decision.on}`
                      : ` · came back ${submission.decision.on}`
                    : submission.checking
                      ? ' · being checked'
                      : ` · with ${office.name}`}
                </span>
                {/* Every page she sent, named. "Did they all go?" has to be
                    answerable from the screen — ENR-209 Scenario 5. */}
                {(submission.files?.length ?? 0) > 1 && (
                  <span className="record-files">
                    {submission.files.map((file) => (
                      <span key={file.name}>
                        {file.name} <i>{file.size}</i>
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="card-foot record-foot">
        <span>
          <Icon name="shield" size={14} /> {requirement.privacy}
        </span>
        <button className="primary-button" onClick={() => onOpen(requirement)}>
          {state === 'needed'
            ? 'Send your immunization record'
            : state === 'changes-requested'
              ? 'Send a replacement'
              : 'Open the record'}
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </section>
  );
}
