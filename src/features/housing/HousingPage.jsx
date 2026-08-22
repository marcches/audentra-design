import { useEffect, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import StatusPill from '../../design-system/primitives/StatusPill.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import InfoModal from '../../design-system/patterns/InfoModal.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import { longDate } from '../campus/logic.js';
import { enrollmentAdvisor } from '../enrollment/data.js';
import { guideById, offices } from '../help/data.js';
import AssignmentCard from './AssignmentCard.jsx';
import Catalogue from './Catalogue.jsx';
import HousingRail from './HousingRail.jsx';
import PlanOutcome from './PlanOutcome.jsx';
import PlanPanel from './PlanPanel.jsx';
import ResidenceDrawer from './ResidenceDrawer.jsx';
import ShortlistPanel from './ShortlistPanel.jsx';
import { housingFor, housingOffice, responseDeadline } from './data.js';
import {
  SHORTLIST_MAX,
  bandFor,
  opensShortlist,
  ordinal,
  planById,
  planIsAnswered,
  planStanding,
  rankedLine,
  residenceById,
  shortlistState,
  showsCatalogue,
  stageOf,
} from './logic.js';

/**
 * Housing — ENR-207, behaviour from ENR-210 and ENR-211, plus ENR-213 AC 6 seen from this side;
 * the review of 2026-08-21 (G1–G11, B4.2–B4.4) on top.
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
 * And since the review, the page **says in every state whether it is asking her for something**
 * (G4): the summary panel's figure is the plan's standing, its line the deadline or the room, its
 * second line the shortlist, and the advisor beside it is presence, not routing — no housing decision
 * is his. The panel came back (G5) because its figure moves; the one the Jam of 2026-08-21 removed
 * had the plan itself for a figure, which was the card under it read twice.
 *
 * `loading` and `error` are the frame's and never reach this component. What is left is what only
 * this section can express: a catalogue that could not be read while the plan still can be answered,
 * an institution that has published nothing, an onboarding answer the portal must not guess at, and
 * the two worlds either side of the response deadline.
 */
export const HOUSING_PREVIEW_STATES = [
  ['ready', 'No plan yet', 'The first question unanswered, and the second one not yet asked.'],
  ['onboarding-answered', 'Answered at onboarding', 'Living on campus, three residence halls already ranked.'],
  ['onboarding-off-campus', 'Off campus at onboarding', 'An onboarding answer the portal doesn’t guess at — one question, asked once.'],
  ['deadline-passed', 'After the deadline', 'The submitted shortlist, and Residential Life assigning.'],
  ['room-assigned', 'Room assigned', 'A room that isn’t the first preference, and is still valid.'],
  ['send-fails', 'A change that failed', 'A plan the server rejected, showing the last saved answer.'],
  ['loading', 'Loading', 'Before the published catalog arrives.'],
  ['partial', 'Partial data', 'Your plan loaded; the residence hall catalog did not.'],
  ['error', 'Error', 'Nothing Residential Life publishes could be loaded.'],
  ['empty', 'Nothing published', 'Before Residential Life publishes any residence hall.'],
];

/** What the enrollment advisor is *for* on this page — rule 3: presence, not routing. */
const ADVISOR_SCOPE = `For anything about enrollment. Your housing plan and your room are ${housingOffice}’s to decide.`;

export default function HousingPage({
  destination,
  previewState = 'ready',
  onToast = () => {},
  onOverlay = () => {},
  onContact = () => {},
}) {
  const record = housingFor(previewState);

  const [plan, setPlan] = useState(record.plan);
  const [shortlist, setShortlist] = useState(record.shortlist);
  const [sort, setSort] = useState('rate');
  const [open, setOpen] = useState(null);
  const [how, setHow] = useState(false);

  const returnFocus = useRef(null);

  // A preview state is a different student's record, not a different view of this one, so the
  // answers reset with it. Without this, choosing a plan and then switching to `deadline-passed`
  // would show one student's plan under another's deadline.
  useEffect(() => {
    const next = housingFor(previewState);
    setPlan(next.plan);
    setShortlist(next.shortlist);
    setOpen(null);
    setHow(false);
  }, [previewState]);

  useEffect(() => {
    onOverlay(Boolean(open || how));
  }, [onOverlay, open, how]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  const { catalogue, deadlinePassed, assignment, failure, planSource } = record;
  const locked = deadlinePassed;
  const ranks = shortlistState(shortlist);
  const standing = planStanding({ plan, planSource, deadlinePassed, assignment });
  const ranked = rankedLine({ plan, shortlist });
  const band = bandFor({ plan, shortlist, catalogue, deadlinePassed, assignment, failure });
  const guide = guideById('housing-answer');

  function openResidence(residence, node) {
    returnFocus.current = node ?? null;
    setOpen(residence);
  }

  function closeResidence() {
    setOpen(null);
    returnFocus.current?.focus();
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function retry() {
    onToast(`Retrying would send the change to ${housingOffice} again.`);
  }

  function choosePlan(next) {
    setPlan(next);
    const option = planById(next);
    // Changing away from living on campus keeps the shortlist rather than discarding it: a plan
    // change is not a deletion, and a student who comes back to on-campus should find her order.
    onToast({
      tone: 'success',
      title: option.complete ? 'Saved.' : 'Saved as still deciding.',
      body: option.complete ? option.consequence : `${housingOffice} will help you decide.`,
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

  const hero = {
    lede: deadlinePassed
      ? `${housingOffice} is assigning rooms now, from the answers submitted before ${responseDeadline.label}. This page shows what you submitted.`
      : `Two questions: where you’ll live, and which residence halls you’d like if that’s on campus. You can change both until ${responseDeadline.full}.`,
  };

  return (
    <PageShell
      destination={destination}
      hero={hero}
      summaryLabel="Housing standing"
      summary={
        <>
          {/* The plan's standing is the figure — recorded, on her checklist, submitted, a room —
              with the shortlist beside it where the plan is on campus, and under it the one line
              that says what is being asked of her and by when (G4, G5; copy §6.1). */}
          <SummaryFigure
            label="Housing plan"
            figure={
              <>
                <StatusPill tone={standing.tone}>{standing.status}</StatusPill>
                {ranked ? <span className="figure-consequence">{ranked}</span> : null}
              </>
            }
          >
            {standing.line}
          </SummaryFigure>
          <AdvisorBar advisor={enrollmentAdvisor} note={ADVISOR_SCOPE} onContact={onContact} />
        </>
      }
      /* A save that did not land is a footnote to the plan, at the foot of the
         panel — the Jam of 2026-08-21. It names the surviving record (R6); the
         band on the plan card carries the retry, so the note does not repeat it. */
      notice={
        failure ? (
          <Notice tone="urgent" icon="alert" title="That change was not saved">
            {failure}
          </Notice>
        ) : null
      }
      rail={
        <HousingRail
          deadlinePassed={deadlinePassed}
          assignment={assignment}
          stage={stageOf({ deadlinePassed, assignment })}
          onHow={() => setHow(true)}
        />
      }
    >
      <PlanPanel
        plan={plan}
        source={planSource}
        locked={locked}
        band={band?.kind === 'plan' || band?.kind === 'retry' ? band : null}
        onChoose={choosePlan}
        onRetry={retry}
      />

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
          <div className="status-heading">
            <span className="status-icon accent" aria-hidden="true">
              <Icon name="buildings" size={20} />
            </span>
            <div>
              <h2 id="none-heading">You ranked no residence halls</h2>
              <p>What you submitted</p>
            </div>
          </div>
          <p className="panel-lede">
            You told Aster you would live on campus and did not name any residence hall before{' '}
            {responseDeadline.label}. You are still in the assignment list. {housingOffice} places
            students who named nothing alongside everyone else, from what is free.
          </p>
        </section>
      )}

      {!locked && (
        <>
          {/* No plan, or an onboarding answer still owing one question: the second question is
              named, and so is the catalogue's condition (G3) — before she answers, not after. */}
          {(!plan || plan === 'off-campus') && (
            <PlanOutcome variant="awaiting" catalogue={catalogue} />
          )}

          {plan === 'commuting' && <PlanOutcome variant="commuting" />}
          {plan === 'own-housing' && <PlanOutcome variant="own-housing" />}
          {plan === 'undecided' && (
            <PlanOutcome variant="undecided" onHow={() => setHow(true)} />
          )}

          {/* Shown whenever there is an order to show, or a catalogue to build one from. A
              shortlist already written must survive a catalogue that failed to load — the rows
              resolve against the published record, not against what this page could read today. */}
          {opensShortlist(plan) && (shortlist.length > 0 || catalogue?.length > 0) && (
            <ShortlistPanel
              shortlist={shortlist}
              locked={false}
              band={band?.kind === 'shortlist' ? band : null}
              onBand={() => scrollTo('catalogue-heading')}
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
              onSeeShortlist={() => scrollTo('shortlist-heading')}
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
          onSeeShortlist={() => {
            closeResidence();
            scrollTo('shortlist-heading');
          }}
          onClose={closeResidence}
        />
      )}

      {/* The rules of housing, behind the rail's link and the undecided card's (G9): the fuller
          version of the influence sentence, and Residential Life's own guide as Help publishes it,
          with its date — so the student gets one version of one promise, and the rail stays a
          place for facts. */}
      {how && (
        <InfoModal
          variant="housing"
          kicker="Housing"
          icon="home"
          title="How housing decisions work"
          onClose={() => setHow(false)}
        >
          <p>
            You are telling {housingOffice} what you would like, in the order you would like it. They
            decide, and they may place you somewhere you didn’t name. That’s what makes this a
            preference and not a booking.
          </p>
          <p>
            Your order still matters. They read it first to last, and a residence hall you never name
            is one you won’t be considered for.
          </p>
          {guide && (
            <div className="guide-quote">
              <strong>{guide.topic}</strong>
              {guide.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <span className="guide-meta">
                Published by {offices.housing.name} · updated {longDate(guide.updated)}
              </span>
            </div>
          )}
        </InfoModal>
      )}
    </PageShell>
  );
}
