import { useEffect, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import AssignmentCard from './AssignmentCard.jsx';
import Catalogue from './Catalogue.jsx';
import HousingRail from './HousingRail.jsx';
import PlanOutcome from './PlanOutcome.jsx';
import PlanPanel from './PlanPanel.jsx';
import ResidenceDrawer from './ResidenceDrawer.jsx';
import ShortlistPanel from './ShortlistPanel.jsx';
import { housingFor, housingOffice, responseDeadline } from './data.js';
import { enrollmentAdvisor } from '../enrollment/data.js';
import {
  SHORTLIST_MAX,
  opensShortlist,
  ordinal,
  planById,
  planIsAnswered,
  residenceById,
  shortlistState,
  showsCatalogue,
  stageOf,
} from './logic.js';

/**
 * Housing — ENR-207, behaviour from ENR-210 and ENR-211, plus ENR-213 AC 6 seen from this side.
 *
 * Two questions of different weight on one screen. The plan is hers and it is final; the shortlist
 * is a set of preferences and it decides nothing. Everything here is arranged so those two never
 * blur into each other.
 *
 * The rule that shapes the layout: **the second question must not show before the first is answered,
 * and its absence must not read as missing content.** So there is no state in which the space below
 * the plan is blank — every plan, including no plan at all, puts something there that says why this
 * is the whole page.
 *
 * `loading` and `error` are the frame's and never reach this component. What is left is what only
 * this section can express: a catalogue that could not be read while the plan still can be answered,
 * an institution that has published nothing, and the two worlds either side of the response
 * deadline.
 */
export const HOUSING_PREVIEW_STATES = [
  ['ready', 'No plan yet', 'The first question unanswered, and the second one not yet asked.'],
  ['onboarding-answered', 'Answered at onboarding', 'Living on campus, three residences already ranked.'],
  ['deadline-passed', 'After the deadline', 'The submitted shortlist, and Housing Services assigning.'],
  ['room-assigned', 'Room assigned', 'A room that is not the first preference — and is still valid.'],
  ['send-fails', 'A change that failed', 'A plan the server rejected, showing the last saved answer.'],
  ['loading', 'Loading', 'Before the published catalogue arrives.'],
  ['partial', 'Partial data', 'Your plan loaded; the residence catalogue did not.'],
  ['error', 'Error', 'Nothing Housing Services publishes could be loaded.'],
  ['empty', 'Nothing published', 'Before Housing Services publishes any residence.'],
];

export default function HousingPage({
  destination,
  previewState = 'ready',
  onToast = () => {},
  onOverlay = () => {},
}) {
  const record = housingFor(previewState);

  const [plan, setPlan] = useState(record.plan);
  const [shortlist, setShortlist] = useState(record.shortlist);
  const [sort, setSort] = useState('rate');
  const [open, setOpen] = useState(null);

  const returnFocus = useRef(null);

  // A preview state is a different student's record, not a different view of this one, so the
  // answers reset with it. Without this, choosing a plan and then switching to `deadline-passed`
  // would show one student's plan under another's deadline.
  useEffect(() => {
    const next = housingFor(previewState);
    setPlan(next.plan);
    setShortlist(next.shortlist);
    setOpen(null);
  }, [previewState]);

  useEffect(() => {
    onOverlay(Boolean(open));
  }, [onOverlay, open]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  const { catalogue, deadlinePassed, assignment, failure } = record;
  const locked = deadlinePassed;
  const chosen = planById(plan);
  const ranks = shortlistState(shortlist);

  function openResidence(residence, node) {
    returnFocus.current = node ?? null;
    setOpen(residence);
  }

  function closeResidence() {
    setOpen(null);
    returnFocus.current?.focus();
  }

  function choosePlan(next) {
    setPlan(next);
    const option = planById(next);
    // Changing away from living on campus keeps the shortlist rather than discarding it: a plan
    // change is not a deletion, and a student who comes back to on-campus should find her order.
    onToast({
      tone: 'success',
      title: option.complete ? 'Saved.' : 'Saved as still deciding.',
      body: option.complete ? option.consequence : `${housingOffice} will come back to you.`,
    });
  }

  function addResidence(id) {
    if (shortlist.length >= SHORTLIST_MAX || shortlist.includes(id)) return;
    const next = [...shortlist, id];
    setShortlist(next);
    onToast({ tone: 'success', title: `Saved as your ${ordinal(next.length - 1)}.` });
  }

  function removeResidence(id) {
    const rank = shortlist.indexOf(id);
    if (rank < 0) return;
    setShortlist(shortlist.filter((item) => item !== id));
    // Undo restores the rank, not just the row: this whole panel is about the
    // order, so putting a residence back at the bottom would be a different
    // answer wearing the word "undo". The toast is not the only way back —
    // the residence is still in the catalogue — which is what makes offering
    // a window this short honest.
    onToast({
      tone: 'success',
      title: `${residenceById(id).name} removed.`,
      body: 'Your order saved on its own.',
      action: {
        label: 'Undo',
        onAct: () =>
          setShortlist((current) => {
            if (current.includes(id)) return current;
            const next = [...current];
            next.splice(rank, 0, id);
            return next.slice(0, SHORTLIST_MAX);
          }),
      },
    });
  }

  function moveResidence(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= shortlist.length) return;
    const next = [...shortlist];
    [next[index], next[target]] = [next[target], next[index]];
    setShortlist(next);
    const moved = next[target];
    onToast({
      tone: 'success',
      title: 'Saved.',
      body: `${residenceById(moved).name} is now your ${ordinal(target)}.`,
    });
  }

  // The section's one figure is the plan itself — the standing this section reports. Days left and
  // how much of the shortlist is written qualify that figure, so they go on the line beneath it and
  // never become a second figure.
  const figure = deadlinePassed && assignment
    ? 'Room assigned'
    : chosen
      ? chosen.label
      : 'Not answered yet';

  const summaryLine = deadlinePassed
    ? assignment
      ? `${housingOffice} assigned your room on ${assignment.assignedOn}. Move in ${assignment.moveIn}.`
      : `${housingOffice} is assigning rooms from the shortlists submitted by ${responseDeadline.label}.`
    : !planIsAnswered(plan)
      ? `Answer by ${responseDeadline.full} — ${responseDeadline.daysLeft} days left. It is what opens your move-in time.`
      : opensShortlist(plan)
        ? `${shortlist.length} of ${SHORTLIST_MAX} residences ranked · yours to change until ${responseDeadline.label}.`
        : `Recorded, and complete. Yours to change until ${responseDeadline.label}.`;

  const hero = {
    lede: deadlinePassed
      ? `${housingOffice} is assigning rooms now, from the answers submitted before ${responseDeadline.label}. This page shows what you submitted.`
      : `Two questions: where you plan to live, and — if that is on campus — which residences you would like. Both are yours to change until ${responseDeadline.full}.`,
  };

  return (
    <PageShell
      destination={destination}
      hero={hero}
      summary={
        <>
          <SummaryFigure label="Your housing plan" figure={figure}>
            {summaryLine}
          </SummaryFigure>
          <AdvisorBar
            advisor={enrollmentAdvisor}
            onContact={() => onToast('Opening a message to your advisor.')}
          />
        </>
      }
      summaryLabel="Your housing plan"
      notice={
        failure ? (
          <div className="page-notice" role="alert">
            <StateCard
              variant="error"
              icon="alert"
              title="That change was not saved"
              action={{
                label: 'Try again',
                icon: 'refresh',
                onClick: () => onToast(`Retrying would send the change to ${housingOffice} again.`),
              }}
            >
              {failure}
            </StateCard>
          </div>
        ) : null
      }
      rail={
        <HousingRail
          deadlinePassed={deadlinePassed}
          assignment={assignment}
          stage={stageOf({ deadlinePassed, assignment })}
        />
      }
    >
      <PlanPanel plan={plan} source={record.planSource} locked={locked} onChoose={choosePlan} />

      {assignment && <AssignmentCard assignment={assignment} shortlist={shortlist} />}

      {locked && opensShortlist(plan) && ranks !== 'none' && (
        <ShortlistPanel
          shortlist={shortlist}
          locked
          onMove={moveResidence}
          onRemove={removeResidence}
          onOpen={openResidence}
        />
      )}

      {locked && opensShortlist(plan) && ranks === 'none' && (
        <section className="section-card" aria-labelledby="none-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow muted">What you submitted</p>
              <h2 id="none-heading">You ranked no residences</h2>
            </div>
          </div>
          <p className="panel-lede">
            You told Aster you would live on campus and did not name any residence before{' '}
            {responseDeadline.label}. You are still in the assignment list — {housingOffice} places
            students who named nothing alongside everyone else, from what is free.
          </p>
        </section>
      )}

      {!locked && (
        <>
          {!plan && <PlanOutcome variant="awaiting" onToast={onToast} />}

          {plan === 'commuting' && <PlanOutcome variant="commuting" onToast={onToast} />}
          {plan === 'own-housing' && <PlanOutcome variant="own-housing" onToast={onToast} />}
          {plan === 'undecided' && <PlanOutcome variant="undecided" onToast={onToast} />}

          {/* Shown whenever there is an order to show, or a catalogue to build one from. A
              shortlist already written must survive a catalogue that failed to load — the rows
              resolve against the published record, not against what this page could read today. */}
          {opensShortlist(plan) && (shortlist.length > 0 || catalogue?.length > 0) && (
            <ShortlistPanel
              shortlist={shortlist}
              locked={false}
              onMove={moveResidence}
              onRemove={removeResidence}
              onOpen={openResidence}
            />
          )}

          {showsCatalogue(plan) && (
            <Catalogue
              catalogue={catalogue}
              shortlist={shortlist}
              sort={sort}
              onSort={setSort}
              readOnly={plan === 'undecided'}
              onAdd={addResidence}
              onOpen={openResidence}
              onToast={onToast}
            />
          )}
        </>
      )}

      {/* ENR-210 AC 7 — the consequence of confirming a plan, standing where it can be checked
          against the checklist rather than only promised at the moment of choosing. */}
      {planIsAnswered(plan) && !locked && (
        <p className="unlock-note">
          <Icon name="lock" size={15} />
          <span>
            <strong>Choose your move-in time</strong> is unlocked on your enrollment checklist,
            because this plan is answered.
          </span>
        </p>
      )}

      {open && (
        <ResidenceDrawer
          residence={open}
          rankIndex={shortlist.indexOf(open.id)}
          canAdd={shortlist.length < SHORTLIST_MAX}
          readOnly={locked || plan !== 'on-campus'}
          onAdd={(id) => {
            addResidence(id);
            closeResidence();
          }}
          onRemove={(id) => {
            removeResidence(id);
            closeResidence();
          }}
          onClose={closeResidence}
        />
      )}
    </PageShell>
  );
}
