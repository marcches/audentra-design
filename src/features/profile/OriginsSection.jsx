import { useEffect } from 'react';
import Icon from '../../design-system/Icon.jsx';
import StatusPill from '../../design-system/primitives/StatusPill.jsx';

/** The state of the Registrar's reading of a transcript, in the portal's status vocabulary. */
const READING = {
  received: { tone: 'wait', label: 'Received' },
  'under-review': { tone: 'progress', label: 'Under review' },
  reviewed: { tone: 'done', label: 'Reviewed' },
};

/**
 * Where I came from — C1.8 of the review of 2026-08-21.
 *
 * The schools and colleges before Aster, as their transcripts say: one card per institution, the
 * transcript's state of reading at its head, and the coursework as a table — course, term, grade,
 * credits — read from the transcript as received. It is a record, not a form: nothing here is hers
 * to edit, and nothing here is the Registrar's decision either. What counts toward her degree is
 * My Degree's to say; this is the evidence it cites, and a potential match there opens this page
 * at the line it cites (`?line=<id>`), which is drawn as the cited row.
 *
 * `partial` — the verification service down — reads every transcript as *Not checked*, never as
 * reviewed: an unread decision is not a decision (the rule My Documents already keeps).
 */
export default function OriginsSection({ institutions, highlight, unavailable = false }) {
  useEffect(() => {
    if (!highlight) return;
    document
      .getElementById(`origin-line-${highlight}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlight]);

  return (
    <>
      {institutions.map((place) => {
        const reading = unavailable
          ? { tone: 'quiet', label: 'Not checked' }
          : (READING[place.transcript.state] ?? READING.received);
        return (
          <section
            className="section-card origin-card"
            key={place.id}
            aria-labelledby={`${place.id}-title`}
          >
            <div className="status-heading">
              <span className="status-icon record">
                <Icon name="graduation" size={18} />
              </span>
              <div>
                <h2 id={`${place.id}-title`}>{place.name}</h2>
                <p>
                  {place.kind} · {place.where} · {place.years}
                </p>
              </div>
              <span className="origin-standing">
                <StatusPill tone={reading.tone}>{reading.label}</StatusPill>
                <small>
                  {place.transcript.label} · received {place.transcript.received}
                </small>
              </span>
            </div>

            <div className="origin-table-wrap">
              <table className="origin-table">
                <caption className="sr-only">
                  Coursework at {place.name}, as the transcript records it
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Term</th>
                    <th scope="col" className="numeric">
                      Grade
                    </th>
                    <th scope="col" className="numeric">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {place.lines.map((line) => (
                    <tr
                      key={line.id}
                      id={`origin-line-${line.id}`}
                      className={highlight === line.id ? 'cited' : ''}
                    >
                      <td>
                        {line.course}
                        {line.note ? <small>{line.note}</small> : null}
                      </td>
                      <td>{line.term}</td>
                      <td className="numeric">{line.grade}</td>
                      <td className="numeric">{line.credits ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="card-foot origin-foot">
              <Icon name="info" size={14} />
              <span>
                Read from the transcript as received. What counts toward your degree is the
                Registrar’s reading of it, on <a href="#/my-classrooms">My Degree</a>.
              </span>
            </p>
          </section>
        );
      })}
    </>
  );
}
