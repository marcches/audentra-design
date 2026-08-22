import Icon from '../../design-system/Icon.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import { deadlineLabel, escalation } from './logic.js';
import { kindIcon } from '../enrollment/logic.js';

/**
 * ENR-160. These are not a copy of the enrollment checklist — they are the same
 * task objects, filtered by `financial`. The count here and the count there are
 * the same number because they are the same list (AC 5).
 *
 * Since the review of 2026-08-21 (F2 as B3.1 corrected it) the block stays in
 * every state and carries its count, and its rows carry **no action**: the row
 * states the document, its office, its deadline and its consequence, and says
 * it is a checklist item with the checklist's own due date (F9); the action
 * lives in the band under the balance, once. The one task was stated four
 * times on this screen, three of them with a button.
 */
export default function DocumentList({ documents, unavailable, onRetry }) {
  return (
    <section className="section-card doc-section" aria-labelledby="docs-title">
      <div className="status-heading">
        <span className="status-icon docs">
          <Icon name="file" size={18} />
        </span>
        <div>
          <h2 id="docs-title">Documents that need you</h2>
          <p>Financial paperwork Aster is still waiting on. Each one says what it holds up.</p>
        </div>
        {!unavailable && <span className="status-count">{documents.length}</span>}
      </div>

      {unavailable ? (
        <StateCard
          variant="error"
          icon="alert"
          title="Your paperwork couldn’t be checked"
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          Everything else on this page loaded. Nothing has changed on your record.
        </StateCard>
      ) : documents.length === 0 ? (
        <StateCard variant="empty" icon="check" title="Nothing is waiting on you">
          The Financial Aid Office has everything it needs for now. If that changes, the request
          appears here and on your enrollment checklist at the same time.
        </StateCard>
      ) : (
        <div className="card-rows doc-list">
          {documents.map((task) => {
            const level = escalation(task.daysLeft);
            return (
              <article className="compact-task doc-task" key={task.id}>
                <div className={`task-type-icon ${task.kind}`} aria-hidden="true">
                  <Icon name={kindIcon(task.kind)} size={21} weight="duotone" />
                </div>
                <div className="compact-copy">
                  <h3>{task.title}</h3>
                  <p className="doc-meta">
                    {task.office} · due {task.due} · on your enrollment checklist
                  </p>
                  <p className="doc-consequence">
                    <Icon name="alert" size={13} /> {task.consequence}
                  </p>
                </div>
                <div className="doc-action">
                  <span className={`deadline-chip${level ? ` ${level}` : ''}`}>
                    {deadlineLabel(task.daysLeft)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
