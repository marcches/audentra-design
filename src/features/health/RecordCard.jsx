import Icon from '../../design-system/Icon.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import StatusPill from '../../design-system/primitives/StatusPill.jsx';
import GateChip from '../registration/GateChip.jsx';
import { configFor, isGating } from '../registration/logic.js';
import { officeOf, stateInfo, stateOf } from '../documents/logic.js';

/**
 * The immunization record, in the section that owns its door — ENR-209, and
 * the changes of 2026-08-21.
 *
 * It is the **same object** My Documents renders, read through the same helpers,
 * so the two screens cannot describe one record differently. What differs is the
 * depth: My Documents lists six requirements and says one line about each; this
 * card has one requirement and room to show what it is holding up, what is
 * accepted, and what would fix what came back. The pages she sent have a card
 * of their own under this one since the changes of 2026-08-21 — `RecordHistory`
 * — because a returned page has to be identifiable from its row.
 *
 * The head says the state once, as a pill, and the line under it says the
 * consequence — H8's order, the same order the panel uses. The band under the
 * head is the page's pointer (H6): its label only; the button in the foot is
 * the action, and a band does not carry a second button for the card's own
 * action. The gate chip stays — ENR-214 AC 1, the same mark on every surface —
 * without its detail, which the pill already says.
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
  band = null,
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
  const decision = requirement.submissions?.at(-1)?.decision ?? null;
  const asking = info.holder === 'you';
  const gating = isGating(requirement.id, configFor(previewState));

  return (
    <section className={`section-card immunization-card ${asking ? 'asking' : ''}`} aria-labelledby="record-title">
      <div className="status-heading">
        <span className={`status-icon ${asking ? info.tone : 'docs'}`}>
          <Icon name={state === 'accepted' ? 'check' : 'file'} size={18} />
        </span>
        <div>
          <h2 id="record-title">{requirement.title}</h2>
          <p>Health Services reviews it and decides.</p>
        </div>
        <StatusPill tone={info.tone} pulse={state === 'checking'}>
          {info.label}
        </StatusPill>
      </div>

      {band ? <ActionBand icon={band.icon} label={band.label} /> : null}

      {/* ENR-214 AC 1. The record's own entry has said "Class registration opens
          once your record clears" since ENR-206 with nothing reading it; the
          chip is that sentence, from configuration, on every surface at once.
          Its detail is off here: the pill in the head already says the state. */}
      {gating && state !== 'accepted' && (
        <GateChip state={state} since={requirement.submissions?.at(-1)?.sent ?? null} detail={false} />
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
            only where it means something: on the thing that is still asking.
            Date plus days remaining, the guide's format (H10) — the days are
            the task's, so this line and My Enrollment's cannot disagree. */}
        {asking && task?.due && (
          <p className="record-due">
            <Icon name="calendar" size={14} /> Health Services asks for it by {task.due}
            {typeof task.daysLeft === 'number' ? (
              <b>· {task.daysLeft} days</b>
            ) : null}
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
