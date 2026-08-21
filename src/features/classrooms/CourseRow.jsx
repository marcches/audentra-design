import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import { countsToward, courseSituation, courseSlug, matchTargeting, plannable } from './logic.js';

function courseIcon(state) {
  if (state === 'approved') return 'check';
  if (state === 'locked') return 'lock';
  return 'book';
}

/**
 * One course inside a requirement, after the brief of 2026-08-21.
 *
 * It used to be a `<button>` that opened the course drawer, with a status pill
 * in its trailing cell that mostly said *In the catalog* — a row's most
 * prominent slot spent on the absence of information (D13). Now it is a row
 * in the reference screen's anatomy: the mark, the copy, and a trailing cell
 * with at most one primary and one quiet link. A row that holds a button
 * cannot itself be one, so the drawer opens from *Details*.
 *
 * What the copy says, top to bottom, and why each line is there:
 *
 *   name        `--fs-body`, weight 400 (D14), with the PLANNED pill when the
 *               course is in her plan — the one marker on the row, and rare;
 *   meta        credits, terms, and a prerequisite *when it is met* — "Requires
 *               PHYS 121, and you have it" (R5). A locked row says its
 *               prerequisite once, in the status, not twice;
 *   counts      which requirements this course counts toward (D1) — the
 *               direction the screen never said; fixed vocabulary, and the
 *               student never chooses;
 *   pending     when a match targets this course, a line saying so and a link
 *               to it (D4), so the same course is never closed here and
 *               pending further down with nothing joining the two.
 *
 * The trailing cell is a fact about availability as plain metadata (D12) —
 * "Approved Aug 4", "Locked until you have SPAN 102" — or, on a course she can
 * take now or later, the plan action (D6): *Add to my plan*, which becomes
 * *In your plan · Remove* in place. Adding moves no counter anywhere; the plan
 * is not an input to anything in `logic.js`, which is how that stays true.
 */
export default function CourseRow({
  course,
  requirement,
  requirements,
  matches,
  planned,
  onPlan,
  onUnplan,
  onOpen,
  onRevealMatch,
}) {
  const situation = courseSituation(course);
  const allocation = countsToward(course, requirement, requirements);
  const pending = matchTargeting(matches, course.code);
  const canPlan = plannable(course);

  return (
    <article
      className={`course-row ${course.state} ${situation}${planned ? ' planned' : ''}`}
      id={`course-${courseSlug(course.code)}`}
    >
      <span className={`course-mark ${course.state}`} aria-hidden="true">
        <Icon name={courseIcon(course.state)} size={15} />
      </span>

      <div className="course-identity">
        <p className="course-name">
          <span>
            {course.code} · {course.title}
          </span>
          {planned ? <span className="planned-pill">Planned</span> : null}
        </p>
        <p className="course-meta">
          <span>{course.credits} credits</span>
          <span>{course.terms}</span>
          {course.prerequisite && course.prerequisiteMet ? (
            <span className="met">Requires {course.prerequisite}, and you have it</span>
          ) : null}
        </p>
        <p className={`course-counts ${allocation.kind}`}>{allocation.text}</p>
        {pending ? (
          <p className="course-pending">
            <Icon name="info" size={13} /> A potential match targets this course.{' '}
            <button type="button" className="link-button" onClick={() => onRevealMatch(pending)}>
              See it.
            </button>
          </p>
        ) : null}
      </div>

      <div className="course-trailing">
        {course.state === 'approved' ? (
          <span className="course-status approved">{course.decidedOn}</span>
        ) : null}
        {course.state === 'locked' ? (
          <span className="course-status locked">Locked until you have {course.prerequisite}</span>
        ) : null}
        {canPlan && !planned ? (
          <Button kind="primary" leadingIcon="plus" iconSize={15} onClick={() => onPlan(course.code)}>
            Add to my plan
          </Button>
        ) : null}
        {canPlan && planned ? (
          <span className="course-planned">
            In your plan
            <button type="button" className="text-button" onClick={() => onUnplan(course.code)}>
              Remove
            </button>
          </span>
        ) : null}
        <button type="button" className="text-button" onClick={() => onOpen(course, requirement)}>
          Details
        </button>
      </div>
    </article>
  );
}
