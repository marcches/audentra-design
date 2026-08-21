import { useEffect, useMemo, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import Card, { CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import ClassroomsRail from './ClassroomsRail.jsx';
import AcademicDrawer from './AcademicDrawer.jsx';
import CreditMatchCard from './CreditMatchCard.jsx';
import InfoModal from '../../design-system/patterns/InfoModal.jsx';
import RequirementCard from './RequirementCard.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import {
  courseAdvisor,
  creditMatches,
  matchSources,
  program,
  requirements as publishedRequirements,
  unassignedProgram,
} from './data.js';
import {
  bandFor,
  courseSlug,
  creditTotals,
  creditsUnderReview,
  defaultOpenRequirements,
  electiveRemaining,
  groupRequirements,
  matchesFor,
} from './logic.js';

/**
 * The plan is the student's own list (brief, rule 3). It is remembered the
 * way the checklist's groups are — `localStorage`, one key, nothing else
 * stored — so it survives a reload and never leaves the browser. It is not an
 * input to anything in `logic.js`: no counter, no standing, no figure reads
 * it, which is how "a plan never changes a credit total" is true by
 * construction rather than by discipline.
 */
const PLAN_KEY = 'aster.degree.plan';

function readPlan() {
  try {
    const raw = window.localStorage.getItem(PLAN_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
}

function writePlan(plan) {
  try {
    window.localStorage.setItem(PLAN_KEY, JSON.stringify([...plan]));
  } catch {
    /* a browser that refuses storage still gets the plan for the session */
  }
}

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

function toggleIn(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function addTo(list, id) {
  return list.includes(id) ? list : [...list, id];
}

export default function ClassroomsPage({ destination, state, onToast, onOverlay = () => {} }) {
  const { requirements, matches } = useMemo(() => buildView(state), [state]);
  const [open, setOpen] = useState(() => defaultOpenRequirements(publishedRequirements));
  const [openMatches, setOpenMatches] = useState([]);
  const [plan, setPlan] = useState(readPlan);
  const [drawerItem, setDrawerItem] = useState(null);
  const [creditModal, setCreditModal] = useState(false);
  // Something on the page asked to be shown — a match a pointer named, a
  // course a match named, a requirement the band named. It is opened in the
  // same render and scrolled to after it, once the element is visible.
  const [reveal, setReveal] = useState(null);

  // "One overlay owns the screen at a time" needs App to hear about an overlay
  // it does not itself hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(Boolean(drawerItem) || creditModal);
  }, [onOverlay, creditModal, drawerItem]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  useEffect(() => {
    if (!creditModal) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCreditModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [creditModal]);

  useEffect(() => {
    if (!reveal) return;
    const node = document.getElementById(reveal.id);
    node?.scrollIntoView({ behavior: 'smooth', block: reveal.block ?? 'center' });
    setReveal(null);
  }, [reveal]);

  const totals = creditTotals(requirements);
  const underReview = creditsUnderReview(matches);
  // D10: the ring tracks approved credit against what the program asks for,
  // and nothing the student does on this screen can move it.
  const percent = Math.round((totals.approved / program.creditsToGraduate) * 100);
  const groups = groupRequirements(requirements);
  const elective = electiveRemaining(requirements);

  const unknownProgram = state === 'empty';
  const band = unknownProgram ? null : bandFor({ matches, requirements });

  function toggle(id) {
    setOpen((current) => toggleIn(current, id));
  }

  function toggleMatch(id) {
    setOpenMatches((current) => toggleIn(current, id));
  }

  /** Open a requirement — even one she closed — and scroll to it, or to one of its groups. */
  function revealRequirement(id, group) {
    setOpen((current) => addTo(current, id));
    setReveal({ id: group ? `requirement-${id}-${group}` : `requirement-${id}` });
  }

  /** Open a match card and scroll to it (D4, D5 case 1 from a requirement). */
  function revealMatch(match) {
    setOpenMatches((current) => addTo(current, match.id));
    setReveal({ id: `match-${match.id}` });
  }

  /** From a match to the course it targets, inside its requirement (D4). */
  function revealCourse(match) {
    setOpen((current) => addTo(current, match.target.requirementId));
    setReveal({ id: `course-${courseSlug(match.target.courseCode)}` });
  }

  function revealMatches() {
    setReveal({ id: 'waiting-on-registrar', block: 'start' });
  }

  function addToPlan(code) {
    setPlan((current) => {
      const next = new Set(current);
      next.add(code);
      writePlan(next);
      return next;
    });
  }

  function removeFromPlan(code) {
    setPlan((current) => {
      const next = new Set(current);
      next.delete(code);
      writePlan(next);
      return next;
    });
  }

  // D15: a question about a match goes to the office that decides it — the
  // Registrar — never to Admissions, which decides nothing here.
  function askRegistrar(match) {
    onToast(
      `A message to the ${program.officialRecord.office} about ${match.target.courseCode} would open here. Nothing is sent yet.`,
    );
  }

  // The panel's two actions reach the person who owns the subject: the course
  // advisor, as every section's bar reaches its advisor (Marco, 2026-08-21).
  function contactAdvisor(channel) {
    onToast(
      `${channel === 'email' ? 'An email' : 'A message'} to ${courseAdvisor.name} would open here. Nothing is sent yet.`,
    );
  }

  // The catalog bar used to say this above the page title. It belongs in the
  // eyebrow: the program is where you are, which is what the eyebrow is for.
  // With no program assigned, naming a catalog version would claim something
  // that is not settled, so the eyebrow states the gap instead.
  const hero = {
    kicker: unknownProgram
      ? 'Academic · Program not assigned yet'
      : `Academic · ${program.name} · ${program.classOf}`,
  };

  /**
   * The white card after the brief (D9, D10): the ring tracks credits and
   * its caption names the unit; the requirement count is the supporting line,
   * with the elective remainder beside it — a residual has no status, so it is
   * a line here and never a row in the list; and the person block is the
   * course advisor — D15 had seated the Registrar's office here, and Marco put
   * the advisor back on 2026-08-21: the bar is a person on every section.
   */
  const summary = unknownProgram ? null : (
    <>
      <SummaryFigure
        mark={
          <div className="progress-ring" style={{ '--progress': `${percent * 3.6}deg` }}>
            <span>{percent}%</span>
          </div>
        }
        label="Credits approved"
        explain={{
          title: 'Credits approved',
          body: `Credit the ${program.officialRecord.office} has approved, out of the ${program.creditsToGraduate} your program asks for. A potential match is reported in the rail and is deliberately not counted here, and nothing you add to your plan moves it.`,
        }}
        figure={`${totals.approved} of ${program.creditsToGraduate} credits approved${
          totals.pending > 0 ? '*' : ''
        }`}
      >
        {totals.met} of {totals.total} requirements met · {elective} elective credits remaining
      </SummaryFigure>
      <AdvisorBar advisor={courseAdvisor} onContact={contactAdvisor} />
    </>
  );

  /**
   * One caveat on the figure, on the panel's foot — the Jam of 2026-08-21.
   *
   * Ranked, because the foot holds one line: a total that cannot be trusted
   * beats a check that did not run, which beats how many matches are waiting.
   * The last is a neutral pointer since the brief (D11): it says where the
   * matches are, and carries no verdict — the verdict is said on the match
   * and in the rail, and saying it six times had stopped reading as care.
   */
  const caveat = unknownProgram ? null : totals.pending > 0 ? (
    <Notice tone="soon" icon="alert">
      One requirement’s credits haven’t synced, so this total is incomplete.
    </Notice>
  ) : matches === null ? (
    <Notice tone="soon" icon="alert">
      Your transcript couldn’t be checked for matches. Nothing approved has changed.
    </Notice>
  ) : (
    <Notice tone="quiet" icon="info">
      {matches.length > 0
        ? `${matches.length} potential ${
            matches.length === 1 ? 'match is' : 'matches are'
          } waiting on the Registrar`
        : 'Nothing is waiting on a credit decision'}
    </Notice>
  );

  return (
    <>
      <PageShell
        destination={destination}
        hero={hero}
        summaryLabel="Degree progress"
        summary={summary}
        notice={caveat}
        rail={
          <ClassroomsRail
            underReview={underReview}
            unavailable={matches === null}
            unknownProgram={unknownProgram}
            onOpenCredit={() => setCreditModal(true)}
          />
        }
      >
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
            {groups.map((group, index) => (
              <Card key={group.id}>
                <CardHead
                  kind="status"
                  icon="book"
                  tone="requirement"
                  title={group.name}
                  note={group.summary}
                  aside={
                    <span className="group-count">{group.requirements.length} requirements</span>
                  }
                />

                {/* D5: the reference screen's band, in the reference's place —
                    under the head, above the first row — filled by this
                    screen's own rule (`bandFor`). It points at what changed or
                    at what is open, never at "finish your degree". */}
                {index === 0 && band ? (
                  <ActionBand
                    icon={band.kind === 'matches' ? 'clock' : 'spark'}
                    label={band.label}
                    action={{
                      label: band.action,
                      onClick:
                        band.kind === 'matches'
                          ? revealMatches
                          : () => revealRequirement(band.requirementId, 'now'),
                    }}
                  />
                ) : null}

                <CardRows className="requirement-list">
                  {group.requirements.map((requirement) => (
                    <RequirementCard
                      key={requirement.id}
                      requirement={requirement}
                      requirements={requirements}
                      matches={matches}
                      requirementMatches={matchesFor(matches, requirement.id)}
                      open={open.includes(requirement.id)}
                      onToggle={toggle}
                      onReveal={revealRequirement}
                      plan={plan}
                      onPlan={addToPlan}
                      onUnplan={removeFromPlan}
                      onOpenCourse={(course, parent) =>
                        setDrawerItem({ kind: 'course', course, requirement: parent })
                      }
                      onRevealMatch={revealMatch}
                    />
                  ))}
                </CardRows>
              </Card>
            ))}

            <Card className="match-section" id="waiting-on-registrar">
              <CardHead
                kind="status"
                icon="clock"
                tone="advisory"
                title="Waiting on the Registrar"
                note="Nothing here has been approved. None of it counts toward your degree yet."
                aside={<span className="advisory-badge">Advisory</span>}
              />

              {matches === null && (
                <StateCard
                  variant="warn"
                  icon="alert"
                  title="Your transcript can’t be checked right now"
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
                  <h3>No potential matches yet</h3>
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
                  <a className="secondary-button" href="#/profile">
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
                      requirements={requirements}
                      open={openMatches.includes(match.id)}
                      onToggle={toggleMatch}
                      onOpen={(item) => setDrawerItem({ kind: 'match', match: item })}
                      onAsk={askRegistrar}
                      onRevealCourse={revealCourse}
                    />
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </PageShell>

      {drawerItem && (
        <AcademicDrawer
          item={drawerItem}
          suspended={creditModal}
          onClose={() => setDrawerItem(null)}
          onAsk={askRegistrar}
          onOpenCredit={() => setCreditModal(true)}
        />
      )}

      {creditModal && <InfoModal variant="credit" onClose={() => setCreditModal(false)} />}
    </>
  );
}
