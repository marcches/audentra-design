import Icon from '../../design-system/Icon.jsx';
import { requirementStatus, statusIcon, statusLabel } from './logic.js';

function creditsLabel(requirement) {
  // A figure that did not arrive renders as an em dash rather than a zero that
  // would read as final — the frame's partial-data convention (ENR-180).
  const approved = requirement.creditsApproved == null ? '—' : requirement.creditsApproved;
  return `${approved} of ${requirement.creditsRequired} credits`;
}

function courseIcon(state) {
  if (state === 'approved') return 'check';
  if (state === 'locked') return 'lock';
  return 'book';
}

export default function RequirementCard({ requirement, matches, open, onToggle, onOpenCourse, onOpenMatch }) {
  const status = requirementStatus(requirement);
  const panelId = `requirement-${requirement.id}`;

  return (
    <article className={`requirement-card ${status} ${open ? 'open' : ''}`}>
      <button
        className="requirement-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onToggle(requirement.id)}
      >
        <span className={`requirement-mark ${status}`} aria-hidden="true">
          <Icon name={statusIcon(status)} size={16} />
        </span>
        <span className="requirement-identity">
          <strong>{requirement.name}</strong>
          <span>{requirement.summary}</span>
        </span>
        <span className="requirement-meters">
          <span className="requirement-credits">{creditsLabel(requirement)}</span>
          <span className={`requirement-status ${status}`}>{statusLabel(status)}</span>
        </span>
        <span className="requirement-chevron" aria-hidden="true">
          <Icon name="chevron" size={18} />
        </span>
      </button>

      {matches.length > 0 && (
        <button className="match-flag" onClick={() => onOpenMatch(matches[0])}>
          <Icon name="alert" size={13} />
          {matches.length === 1 ? '1 potential match' : `${matches.length} potential matches`} · not
          counted here
          <Icon name="arrow" size={13} />
        </button>
      )}

      {open && (
        <div className="requirement-courses" id={panelId}>
          <p className="requirement-courses-label">
            {requirement.courses.length > 0
              ? 'Courses that satisfy this requirement'
              : 'How this requirement is satisfied'}
          </p>

          {requirement.courses.map((course) => (
            <button
              className={`course-row ${course.state}`}
              key={course.code}
              onClick={() => onOpenCourse(course, requirement)}
            >
              <span className={`course-mark ${course.state}`} aria-hidden="true">
                <Icon name={courseIcon(course.state)} size={15} />
              </span>
              <span className="course-identity">
                <strong>
                  {course.code} · {course.title}
                </strong>
                <span className="course-meta">
                  <span>{course.credits} credits</span>
                  <span>{course.terms}</span>
                  {course.prerequisite && (
                    <span className={course.prerequisiteMet ? 'met' : 'unmet'}>
                      Requires {course.prerequisite}
                      {course.prerequisiteMet ? ', and you have it' : ''}
                    </span>
                  )}
                </span>
              </span>
              <span className="course-state">
                {course.state === 'approved' && (
                  <span className="course-approved">{course.decidedOn}</span>
                )}
                {course.state === 'locked' && <span className="course-locked">Locked</span>}
                {course.state === 'open' && <span className="course-open">In the catalog</span>}
              </span>
            </button>
          ))}

          {requirement.courses.length === 0 && (
            <p className="requirement-empty">{requirement.emptyNote}</p>
          )}

          {requirement.decidedOn && (
            <p className="requirement-decided">
              <Icon name="shield" size={14} /> {requirement.decidedOn}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
