import Icon from '../../Icon.jsx';
import StateCard from '../StateCard.jsx';
import { deadlineLabel, escalation } from '../../lib/money.js';
import { kindIcon } from '../../lib/task-helpers.js';

/**
 * ENR-160. These are not a copy of the enrollment checklist — they are the same
 * task objects, filtered by `financial`. The count here and the count there are
 * the same number because they are the same list (AC 5), and `Open it` opens the
 * same drawer, so finishing one here finishes it there too.
 */
export default function DocumentList({ documents, unavailable, onOpen, onRetry }) {
  return (
    <section className="status-section doc-section" aria-labelledby="docs-title">
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
          title="We couldn’t check your paperwork"
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          Everything else on this page loaded. Nothing has changed on your record.
        </StateCard>
      ) : documents.length === 0 ? (
        <StateCard variant="empty" icon="check" title="Nothing is waiting on you">
          Student Financial Services has everything it needs for now. If that changes, the request
          appears here and on your enrollment checklist at the same time.
        </StateCard>
      ) : (
        <div className="doc-list">
          {documents.map((task) => {
            const level = escalation(task.daysLeft);
            return (
              <article className="compact-task doc-task" key={task.id}>
                <div className="compact-check">
                  <Icon name={kindIcon(task.kind)} size={17} />
                </div>
                <div className="compact-copy">
                  <h3>{task.title}</h3>
                  <p className="doc-meta">
                    {task.office} · due {task.due}
                  </p>
                  <p className="doc-consequence">
                    <Icon name="alert" size={13} /> {task.consequence}
                  </p>
                </div>
                <div className="doc-action">
                  <span className={`deadline-chip${level ? ` ${level}` : ''}`}>
                    {deadlineLabel(task.daysLeft)}
                  </span>
                  <button className="secondary-button" onClick={() => onOpen(task)}>
                    Open it <Icon name="arrow" size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
