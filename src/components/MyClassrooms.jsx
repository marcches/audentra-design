import { useEffect, useMemo, useState } from 'react';
import Icon from '../Icon.jsx';
import AdvisorBar from './AdvisorBar.jsx';
import AcademicColumn from './AcademicColumn.jsx';
import AcademicDrawer from './AcademicDrawer.jsx';
import CreditMatchCard from './CreditMatchCard.jsx';
import InfoModal from './InfoModal.jsx';
import RequirementCard from './RequirementCard.jsx';
import StateCard from './StateCard.jsx';
import {
  creditMatches,
  matchSources,
  program,
  requirements as publishedRequirements,
  unassignedProgram,
} from '../data-academics.js';
import {
  creditTotals,
  creditsUnderReview,
  defaultOpenRequirements,
  groupRequirements,
  matchesFor,
} from '../lib/academic-helpers.js';
import { enrollmentAdvisor } from '../data.js';

/**
 * `matches: null` means the transcript service could not be reached. That is not
 * the same as a student having no matches, and the two read differently on
 * screen because they mean different things to the student.
 */
function buildView(state) {
  if (state === 'no-matches') return { requirements: publishedRequirements, matches: [] };
  if (state === 'partial') {
    return {
      requirements: publishedRequirements.map((requirement) =>
        requirement.id === 'natural-science'
          ? { ...requirement, creditsApproved: null }
          : requirement,
      ),
      matches: null,
    };
  }
  return { requirements: publishedRequirements, matches: creditMatches };
}

export default function MyClassrooms({ state, onToast }) {
  const { requirements, matches } = useMemo(() => buildView(state), [state]);
  const [open, setOpen] = useState(() =>
    defaultOpenRequirements(publishedRequirements, creditMatches),
  );
  const [drawerItem, setDrawerItem] = useState(null);
  const [creditModal, setCreditModal] = useState(false);

  useEffect(() => {
    if (!creditModal) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCreditModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [creditModal]);

  const totals = creditTotals(requirements);
  const underReview = creditsUnderReview(matches);
  const percent = totals.total > 0 ? Math.round((totals.met / totals.total) * 100) : 0;
  const groups = groupRequirements(requirements);

  const unknownProgram = state === 'empty';

  function toggle(id) {
    setOpen((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function askAdvisor(match) {
    onToast(
      `A message to ${enrollmentAdvisor.name} about ${match.target.courseCode} would open here—nothing is sent yet.`,
    );
  }

  return (
    <>
      <div className={`catalog-bar ${unknownProgram ? 'pending' : ''}`}>
        <span className="catalog-chip">
          <Icon name="book" size={14} />
          {unknownProgram ? 'Program not assigned yet' : program.name} · {program.classOf}
        </span>
        {/* The catalog belongs to the program. With no program assigned,
            naming a catalog version would claim something that is not settled. */}
        {!unknownProgram && (
          <span className="catalog-meta">
            Catalog {program.catalog} · {program.publishedOn} · Read-only
          </span>
        )}
      </div>

      {!unknownProgram && (
        <>
          <section className="progress-panel" aria-label="Degree progress">
            <div className="progress-summary">
              <div className="progress-ring" style={{ '--progress': `${percent * 3.6}deg` }}>
                <span>{percent}%</span>
              </div>
              <div>
                <span className="panel-label">Your degree progress</span>
                <strong>
                  {totals.met} of {totals.total} requirements met
                </strong>
                <p>
                  {totals.approved} of {program.creditsToGraduate} credits approved
                  {totals.pending > 0 ? '*' : ''}
                </p>
                <p className="progress-caveat">
                  <Icon name="info" size={14} />
                  {matches === null
                    ? 'We couldn’t check your transcript for matches. Nothing approved has changed.'
                    : matches.length > 0
                      ? `${matches.length} potential ${
                          matches.length === 1 ? 'match isn’t' : 'matches aren’t'
                        } counted here`
                      : 'Nothing is waiting on a credit decision'}
                </p>
              </div>
            </div>
            <AdvisorBar
              onContact={(channel) =>
                onToast(
                  `${channel === 'email' ? 'An email' : 'A message'} to ${
                    enrollmentAdvisor.name
                  } would open here—nothing is sent yet.`,
                )
              }
            />
          </section>

          <p className="record-note">
            <Icon name="shield" size={15} />
            <span>
              This is not your official academic record. The {program.officialRecord.office} holds
              your transcript.
              {totals.pending > 0 && (
                <em> *One requirement’s credits haven’t synced, so this total is incomplete.</em>
              )}
            </span>
          </p>
        </>
      )}

      <div className="page-grid">
        <div className="task-column">
          {unknownProgram ? (
            <StateCard
              variant="empty"
              icon="book"
              title={unassignedProgram.heading}
              action={{
                label: 'Go to My Enrollment',
                icon: 'arrow',
                onClick: () => {
                  window.location.hash = '#/my-enrollment';
                },
              }}
            >
              {unassignedProgram.body} {unassignedProgram.produces}.
            </StateCard>
          ) : (
            <>
              {groups.map((group) => (
                <section className="status-section" key={group.id}>
                  <div className="status-heading">
                    <span className="status-icon requirement">
                      <Icon name="book" size={18} />
                    </span>
                    <div>
                      <h2>{group.name}</h2>
                      <p>{group.summary}</p>
                    </div>
                    <span className="status-count">{group.requirements.length}</span>
                  </div>
                  <div className="requirement-list">
                    {group.requirements.map((requirement) => (
                      <RequirementCard
                        key={requirement.id}
                        requirement={requirement}
                        matches={matchesFor(matches, requirement.id)}
                        open={open.includes(requirement.id)}
                        onToggle={toggle}
                        onOpenCourse={(course, parent) =>
                          setDrawerItem({ kind: 'course', course, requirement: parent })
                        }
                        onOpenMatch={(match) => setDrawerItem({ kind: 'match', match })}
                      />
                    ))}
                  </div>
                </section>
              ))}

              <section className="match-section">
                <div className="status-heading">
                  <span className="status-icon advisory">
                    <Icon name="alert" size={18} />
                  </span>
                  <div>
                    <h2>Potential credit matches</h2>
                    <p>Nothing here has been approved. None of it counts toward your degree yet.</p>
                  </div>
                  <span className="advisory-badge">Advisory</span>
                </div>

                {matches === null && (
                  <StateCard
                    variant="warn"
                    icon="alert"
                    title="We can’t check your transcript right now"
                    action={{
                      label: 'Try again',
                      icon: 'refresh',
                      onClick: () => onToast('Retrying would re-check your documents for matches.'),
                    }}
                  >
                    This only affects suggestions. Nothing already approved has changed, and no
                    requirement above depends on it.
                  </StateCard>
                )}

                {matches !== null && matches.length === 0 && (
                  <div className="match-empty">
                    <span className="state-icon" aria-hidden="true">
                      <Icon name="file" size={24} />
                    </span>
                    <h3>No credit matches yet</h3>
                    <p>
                      A match appears when a document you send Aster looks like it might cover a
                      course in your catalog. Any of these would produce one:
                    </p>
                    <ul>
                      {matchSources.map((source) => (
                        <li key={source}>
                          <span>
                            <Icon name="check" size={14} />
                          </span>
                          {source}
                        </li>
                      ))}
                    </ul>
                    <a className="secondary-button" href="#/my-documents">
                      Send a record <Icon name="arrow" size={15} />
                    </a>
                  </div>
                )}

                {matches !== null && matches.length > 0 && (
                  <div className="match-list">
                    {matches.map((match) => (
                      <CreditMatchCard
                        key={match.id}
                        match={match}
                        onOpen={(item) => setDrawerItem({ kind: 'match', match: item })}
                        onAsk={askAdvisor}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>

        <AcademicColumn
          approved={totals.approved}
          underReview={underReview}
          unavailable={matches === null}
          unknownProgram={unknownProgram}
          onOpenCredit={() => setCreditModal(true)}
        />
      </div>

      {drawerItem && (
        <AcademicDrawer
          item={drawerItem}
          suspended={creditModal}
          onClose={() => setDrawerItem(null)}
          onAsk={askAdvisor}
          onOpenCredit={() => setCreditModal(true)}
        />
      )}

      {creditModal && <InfoModal variant="credit" onClose={() => setCreditModal(false)} />}
    </>
  );
}
