import Icon from '../../design-system/Icon.jsx';
import CourseRow from './CourseRow.jsx';
import {
  groupCourses,
  plannable,
  remainingLine,
  requirementStatus,
  statusIcon,
  statusLabel,
} from './logic.js';

/** What a planned course is, said once per open requirement (brief, D6). */
export const PLAN_HELPER =
  'Your own list. It doesn’t register you for anything and it doesn’t change any credit.';

function creditsLabel(requirement) {
  // A figure that did not arrive renders as an em dash rather than a zero that
  // would read as final — the frame's partial-data convention (ENR-180).
  const approved = requirement.creditsApproved == null ? '—' : requirement.creditsApproved;
  return `${approved} of ${requirement.creditsRequired} credits`;
}

function countLabel(count) {
  if (count === 0) return 'No course listed yet';
  return `${count} ${count === 1 ? 'course satisfies' : 'courses satisfy'} this`;
}

/**
 * One degree requirement: the accordion the brief (D16) reuses, read the way
 * the brief asks.
 *
 * ## The head is a heading that wraps a button
 *
 * The head used to be one full-width `<button>` holding the name and the
 * summary. D6.2 puts a second control in the head — *See what you can take* —
 * and a button cannot hold a button, and D14 makes the name an `h3`, which a
 * button cannot hold either. So the head is the canonical accordion: a `div`
 * that toggles on a click anywhere in it, and inside it `h3 > button` with
 * `aria-expanded` and `aria-controls` — the control the keyboard reaches, and
 * the name a screen reader hears — with the chevron and the action outside the
 * button. Enter and Space work because the name is a button; the pointer
 * works everywhere because the div listens. The body stays in the tree when
 * closed, `hidden`, so `aria-controls` always names something real and the
 * rows keep their ids for the links that point at them.
 *
 * ## What the head says
 *
 *   name       `h3` at `--fs-h2`, weight 400 — the group's head is 17 and
 *              semi, so the child no longer outweighs the parent (D14);
 *   summary    the requirement written for a person (R4);
 *   remaining  what is left, in courses (D2): "One more lab course finishes
 *              this." — directly under the description, above the counter;
 *   count      when closed, how many courses satisfy it, so a closed head
 *              still says what is inside (D16);
 *   meters     the credit counter and the standing pill — the one family that
 *              keeps a pill, because it is a fact about her degree (D12) — and,
 *              when unfinished, the quiet *See what you can take*, which opens
 *              the requirement and scrolls to the takeable group (D6).
 *
 * A match waiting on this requirement is a neutral pointer under the head
 * (D11): it names the match and takes her to it, and carries no verdict — the
 * verdict is said on the match and in the rail, and nowhere else.
 *
 * ## What the body says
 *
 * Up to four labelled groups, in this order and each only when it has rows:
 * COUNTED, YOU CAN TAKE THIS TERM, LATER TERMS, BLOCKED FOR NOW (D3). Under
 * the first group whose rows can be planned, the plan helper, once — a helper
 * on every row would be texture; under the label that holds the buttons it is
 * the sentence read before the first click.
 */
export default function RequirementCard({
  requirement,
  requirements,
  matches,
  requirementMatches,
  open,
  onToggle,
  onReveal,
  plan,
  onPlan,
  onUnplan,
  onOpenCourse,
  onRevealMatch,
}) {
  const status = requirementStatus(requirement);
  const panelId = `requirement-${requirement.id}-courses`;
  const remaining = remainingLine(requirement);
  const groups = groupCourses(requirement);
  const firstPlannable = groups.find((group) => group.courses.some(plannable))?.id ?? null;
  const unfinished = status === 'in-progress' || status === 'not-started';
  const canTake = groups.some((group) => group.id === 'now');

  function onHeadClick(event) {
    // A click on a control inside the head is that control's, not the toggle's.
    if (event.target.closest('button, a')) return;
    onToggle(requirement.id);
  }

  return (
    <article
      className={`requirement-card ${status}${open ? ' open' : ''}`}
      id={`requirement-${requirement.id}`}
    >
      <div className="requirement-head" onClick={onHeadClick}>
        <span className={`requirement-mark ${status}`} aria-hidden="true">
          <Icon name={statusIcon(status)} size={16} />
        </span>

        <div className="requirement-identity">
          <h3>
            <button
              type="button"
              className="requirement-toggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => onToggle(requirement.id)}
            >
              {requirement.name}
            </button>
          </h3>
          <p className="requirement-summary">{requirement.summary}</p>
          {remaining ? <p className="requirement-remaining">{remaining}</p> : null}
          {!open ? (
            <p className="requirement-count">{countLabel(requirement.courses.length)}</p>
          ) : null}
        </div>

        <div className="requirement-meters">
          <span className="requirement-credits">{creditsLabel(requirement)}</span>
          <span className={`requirement-status ${status}`}>{statusLabel(status)}</span>
          {unfinished && canTake ? (
            <button
              type="button"
              className="text-button requirement-action"
              onClick={() => onReveal(requirement.id, 'now')}
            >
              See what you can take
            </button>
          ) : null}
        </div>

        <span className="requirement-chevron" aria-hidden="true">
          <Icon name="chevron" size={18} />
        </span>
      </div>

      {requirementMatches.length > 0 ? (
        <button
          type="button"
          className="match-flag"
          onClick={() => onRevealMatch(requirementMatches[0])}
        >
          <Icon name="info" size={13} />
          {requirementMatches.length === 1
            ? '1 potential match'
            : `${requirementMatches.length} potential matches`}
          , waiting on the Registrar
          <Icon name="arrow" size={13} />
        </button>
      ) : null}

      <div className="requirement-courses" id={panelId} hidden={!open}>
        {groups.map((group) => (
          <div className="course-group" key={group.id} id={`requirement-${requirement.id}-${group.id}`}>
            <p className="requirement-courses-label">{group.label}</p>
            {group.id === firstPlannable ? <p className="plan-helper">{PLAN_HELPER}</p> : null}
            {group.courses.map((course) => (
              <CourseRow
                key={course.code}
                course={course}
                requirement={requirement}
                requirements={requirements}
                matches={matches}
                planned={plan.has(course.code)}
                onPlan={onPlan}
                onUnplan={onUnplan}
                onOpen={onOpenCourse}
                onRevealMatch={onRevealMatch}
              />
            ))}
          </div>
        ))}

        {requirement.decidedOn ? (
          <p className="requirement-decided">
            <Icon name="shield" size={14} /> {requirement.decidedOn}
          </p>
        ) : null}
      </div>
    </article>
  );
}
