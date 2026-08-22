import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import AsterMark from '../../design-system/marks/AsterMark.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import PreviewStateMenu from '../../app/PreviewStateMenu.jsx';
import StepRail from '../../design-system/patterns/StepRail.jsx';
import PageHero from '../../design-system/patterns/PageHero.jsx';
import StepActions from './StepActions.jsx';
import StepPanel from './StepPanel.jsx';
import DetailsStep from './DetailsStep.jsx';
import ContactStep from './ContactStep.jsx';
import EmergencyStep from './EmergencyStep.jsx';
import PermissionsStep from './PermissionsStep.jsx';
import HousingStep from './HousingStep.jsx';
import HealthStep from './HealthStep.jsx';
import PhotoStep from './PhotoStep.jsx';
import OrientationStep from './OrientationStep.jsx';
import PersonDrawer from './PersonDrawer.jsx';
import FinishCard from './FinishCard.jsx';
import { ONBOARDING_PREVIEW_STATES, STEPS, TOTAL_STEPS, advisor, recordFor } from './data.js';
import {
  allResolved,
  firstUnresolved,
  isReachable,
  meter,
  progressLine,
  railSteps,
  revokedSentence,
  savedCount,
  stepById,
  stepNumber,
} from './logic.js';

/**
 * Onboarding — ENR-163. The eight steps, their frame, and the state that
 * survives an interruption.
 *
 * **Why this page renders its own frame.** It is a route, not a destination: no
 * row in `NAV`, no entry in `DESTINATIONS`, no `PageShell`. Three reasons, in
 * descending order of force.
 *
 *   1. ENR-151 AC 1 requires a step that is not yet reachable to be unopenable,
 *      *including by direct navigation*. A sidebar full of portal sections is a
 *      list of ways out of a flow whose premise is one thing at a time.
 *   2. Onboarding is what happens before the portal exists for her. The
 *      product's own fiction says so — the accommodation answer is dated Aug 12
 *      and `PORTAL_TODAY` is Aug 20.
 *   3. `PageShell` owns hero → summary → notice → tabs → rail. Onboarding has
 *      one question, one rail and one action bar; four of the five slots would
 *      be empty and the fifth would mean something else.
 *
 * **The frame, since 2026-08-21.** The surface was aligned to the approved
 * prototype while the flow stayed exactly as it was — and then given the
 * portal's own header mechanisms, because a flow that opened with a bare
 * eyebrow and an `h1` on the canvas, a notice floating above them and two
 * controls floating above that, read as a different product ("tá tudo
 * inconsistente aqui"). So: the rail is paper and leads with the anchor card;
 * the main column opens with the portal's **topbar** (the demo control and
 * the one way out, in the topbar's control family), then the portal's
 * **band** — `PageHero`, the eyebrow in mono saying the position, the
 * question, the lede, the step's glyph in the motif — then the one notice
 * true of the flow, **docked under the band** the way `PageShell` docks it;
 * and the question's cards share the column with a *step panel* — a card that
 * reads back, as a column of facts, what this step already holds. The panel
 * mirrors and never controls: nothing on it is a button, and every value on
 * it is the draft's.
 *
 * **Why the state lives here and not in `App`.** The repo's default is that
 * state lives in `App.jsx`, and the sections that own a self-contained subject
 * — Housing, Help, Appointments — already depart from it for the same reason
 * this one does: nothing outside onboarding reads onboarding's draft, and a
 * hundred lines of it in `App` would be a hundred lines every other page pays
 * for. What `App` owns is the route.
 *
 * **Why the server is faked the way it is.** ENR-149 AC 1: the browser never
 * decides that a step is complete. So `saved` and `skipped` only ever change
 * inside `commit`, after a delay, and never optimistically — and in the
 * `save-fails` state the first attempt comes back refused, leaves the step in
 * progress, leaves the count where it was, and says what happened (AC 4).
 */

/** The cadence `App` already uses for a submission. Long enough to be seen. */
const SAVE_MS = 700;

function draftFrom(record) {
  return {
    legalName: record.legalName,
    birthDate: record.birthDate,
    studentId: record.studentId,
    preferredName: record.preferredName,
    pronouns: record.pronouns,
    email: record.email,
    mobile: record.mobile,
    address: record.address,
    channel: record.channel,
    emergencyName: record.emergency.name,
    emergencyRelation: record.emergency.relation,
    emergencyPhone: record.emergency.phone,
    plan: record.plan,
    shortlist: record.shortlist,
    answer: record.answer,
    photo: record.photo,
    session: record.session,
  };
}

export default function OnboardingPage({ requestedStep, previewState, onPreviewState, onRoute }) {
  const [record, setRecord] = useState(() => recordFor(previewState));
  const [draft, setDraft] = useState(() => draftFrom(recordFor(previewState)));
  const [grants, setGrants] = useState(() => recordFor(previewState).grants);
  const [stepId, setStepId] = useState(() => firstUnresolved(recordFor(previewState)));
  const [saving, setSaving] = useState(null);
  const [failed, setFailed] = useState(null);
  const [notice, setNotice] = useState(null);
  const [resumeShown, setResumeShown] = useState(true);
  const [person, setPerson] = useState(null);

  const heading = useRef(null);
  const timer = useRef(null);
  const failedOnce = useRef(false);
  const lastStep = useRef(null);
  const lastPreview = useRef(previewState);

  useEffect(() => () => clearTimeout(timer.current), []);

  // A preview change is a different student in the same browser. Everything
  // resets, including the draft — a draft that survived would be the browser
  // holding state the server never sent.
  useEffect(() => {
    if (lastPreview.current === previewState) return;
    lastPreview.current = previewState;
    const next = recordFor(previewState);
    clearTimeout(timer.current);
    failedOnce.current = false;
    setRecord(next);
    setDraft(draftFrom(next));
    setGrants(next.grants);
    setStepId(firstUnresolved(next));
    setSaving(null);
    setFailed(null);
    setNotice(null);
    setResumeShown(true);
  }, [previewState]);

  // ENR-151 AC 1 and AC 2. The step is in the route, so a later one is
  // *attemptable* — which is the only way a refusal can exist. A step that is
  // not reachable does not open, and the interface says why rather than
  // silently landing her somewhere else.
  useEffect(() => {
    if (requestedStep == null) return;
    const target = STEPS[requestedStep - 1];
    if (!target) return;
    if (isReachable(target.id, record)) {
      setStepId(target.id);
      return;
    }
    setNotice({
      tone: 'alert',
      text: target.after
        ? `${target.name} isn’t open yet. It ${target.lockReason.replace(/^Opens/, 'opens')}.`
        : `Finish the step you are on first. ${target.name} comes after it.`,
    });
    onRoute(`#/onboarding/${stepNumber(stepId)}`);
  }, [requestedStep, record]);

  // The question takes focus when the step *changes*, so a keyboard user is
  // moved to the new question instead of left at the bottom of the old one —
  // and never on the first render, where nobody asked to be moved anywhere and
  // the focus ring would just be a box drawn around the headline.
  useEffect(() => {
    if (lastStep.current !== null && lastStep.current !== stepId) heading.current?.focus();
    lastStep.current = stepId;
  }, [stepId]);

  const step = stepById(stepId);
  const finished = allResolved(record);
  const frameState = ['loading', 'error'].includes(previewState) ? previewState : 'ready';
  const unknown = Boolean(record.unknown);

  const patch = (values) => setDraft((value) => ({ ...value, ...values }));

  function goTo(id) {
    setNotice(null);
    setFailed(null);
    setStepId(id);
    onRoute(`#/onboarding/${stepNumber(id)}`);
  }

  /**
   * The only path by which a step becomes saved or skipped. It goes through the
   * (simulated) server, it takes time, and it can come back refused — ENR-149
   * AC 1 and AC 4. Nothing else in this file writes `record.saved`.
   */
  function commit(kind) {
    if (unknown || saving) return;
    setSaving(kind);
    setFailed(null);
    timer.current = setTimeout(() => {
      setSaving(null);

      if (previewState === 'save-fails' && !failedOnce.current) {
        failedOnce.current = true;
        setFailed(
          kind === 'skip'
            ? 'Aster did not confirm that this step was set aside. Nothing changed, and the step is still yours to finish.'
            : 'Aster did not confirm this save. Nothing was lost, what you typed is still here, and the step has not moved.',
        );
        return;
      }

      const next = {
        ...record,
        saved:
          kind === 'save'
            ? [...new Set([...record.saved, stepId])]
            : record.saved.filter((id) => id !== stepId),
        skipped:
          kind === 'skip'
            ? [...new Set([...record.skipped, stepId])]
            : record.skipped.filter((id) => id !== stepId),
        plan: draft.plan,
        shortlist: draft.shortlist,
        answer: draft.answer,
        photo: draft.photo,
        session: draft.session,
        grants,
      };
      setRecord(next);
      setResumeShown(false);
      // A refusal, or a confirmation about one authorization, is about the step
      // she was on. Carrying it to the next one would be the interface talking
      // about somewhere she has left.
      setNotice(null);
      const following = firstUnresolved(next);
      setStepId(following);
      onRoute(`#/onboarding/${stepNumber(following)}`);
    }, SAVE_MS);
  }

  function saveGrant(grant) {
    const exists = grants.some((item) => item.id === grant.id);
    setGrants(exists ? grants.map((item) => (item.id === grant.id ? grant : item)) : [...grants, grant]);
    setPerson(null);
    setNotice({
      tone: 'info',
      text: exists
        ? `Saved. ${grant.person.name.split(' ')[0]} can discuss ${grant.granted.length} of 7 things about you.`
        : `${grant.person.name} can now discuss ${grant.granted.length} of 7 things about you, until ${grant.endsOn}.`,
    });
  }

  // ENR-154 AC 2 and AC 5. It takes effect on click, and it is confirmed by
  // naming what that person can no longer discuss — not by a "removed" toast,
  // which says nothing about what changed for her.
  function removeGrant(grant) {
    setGrants(grants.filter((item) => item.id !== grant.id));
    setNotice({ tone: 'info', text: revokedSentence(grant) });
  }

  const resume = useMemo(() => {
    if (!resumeShown || finished || unknown) return null;
    if (!record.saved.length || !record.savedOn) return null;
    const last = STEPS.filter((item) => record.saved.includes(item.id)).pop();
    return last ? `Welcome back, Maya. You saved through ${last.name} on ${record.savedOn}.` : null;
  }, [record, resumeShown, finished, unknown]);

  function body() {
    if (finished) return <FinishCard record={record} onOpen={onRoute} />;
    if (!step) return null;

    const shared = { draft, onChange: patch };
    switch (step.id) {
      case 'details':
        return <DetailsStep {...shared} />;
      case 'contact':
        return <ContactStep {...shared} />;
      case 'emergency':
        return <EmergencyStep {...shared} />;
      case 'permissions':
        return (
          <PermissionsStep
            draft={draft}
            grants={grants}
            onAdd={() => setPerson({ mode: 'new' })}
            onEdit={(grant) => setPerson({ mode: 'edit', grant })}
            onRemove={removeGrant}
          />
        );
      case 'housing':
        return <HousingStep {...shared} />;
      case 'health':
        return <HealthStep {...shared} />;
      case 'photo':
        return <PhotoStep {...shared} />;
      default:
        return <OrientationStep {...shared} />;
    }
  }

  // The panel and the action bar exist while there is a step to read back and
  // to move on from — not on the finish, and not while the record is unknown,
  // where nothing can be saved and nothing should be claimed.
  const working = frameState === 'ready' && !finished && Boolean(step) && !unknown;

  return (
    <div className="onboarding">
      <StepRail
        brand={{
          mark: <AsterMark size={40} tile />,
          name: 'Aster University',
          line: 'Class of 2030',
        }}
        greeting={finished ? 'You’re all set, Maya.' : 'Let’s get you set up, Maya.'}
        figure={
          frameState !== 'ready'
            ? null
            : unknown
              ? 'Couldn’t be checked'
              : `${savedCount(record)} of ${TOTAL_STEPS} saved`
        }
        note={unknown ? 'Your answers are on Aster’s side and did not load.' : progressLine(record)}
        meter={unknown || frameState !== 'ready' ? null : meter(record)}
        meterLabel={`${savedCount(record)} of ${TOTAL_STEPS} steps saved`}
        steps={frameState === 'ready' ? railSteps(record, finished ? null : stepId) : []}
        currentName={finished ? 'All eight resolved' : step?.name}
        advisor={advisor}
        onOpen={goTo}
      />

      <main className="flow-page" id="onboarding-main" aria-live="polite">
        {/* The portal's topbar, with the flow's two controls in the topbar's
            control family: the demo pill, and the one way out. Nothing floats. */}
        <header className="topbar flow-topbar">
          <div className="topbar-title" />
          <div className="topbar-actions">
            <PreviewStateMenu
              state={previewState}
              states={ONBOARDING_PREVIEW_STATES}
              onChange={onPreviewState}
            />
            <button className="topbar-chip flow-leave" onClick={() => onRoute('#/my-enrollment')}>
              Save and finish later
            </button>
          </div>
        </header>

        <div className="flow-body">
          <div className="flow-measure">
            {frameState === 'loading' && (
              <div className="step-skeleton" aria-hidden="true">
                <span className="skeleton-band" />
                <span className="skeleton-card" />
                <span className="skeleton-card" />
              </div>
            )}

            {frameState === 'error' && (
              <StateCard
                variant="error"
                icon="alert"
                title="Your steps could not be loaded"
                action={{ label: 'Try again', icon: 'refresh', onClick: () => onPreviewState('ready') }}
              >
                Aster published these steps and the portal could not read them. Nothing you have
                already saved is affected. It is on Aster’s side, not in this browser.
              </StateCard>
            )}

            {frameState === 'ready' && (
              <>
                {/* The band — the portal's hero, and the flow's question. The
                    eyebrow carries the position (ENR-151 AC 5: visible at all
                    times, including where the rail folds), the motif carries
                    the step's glyph, and the title takes focus when the step
                    changes. The finish gets the band too: one screen, one
                    shape, every time. */}
                {!finished && step ? (
                  <PageHero
                    ref={heading}
                    focusable
                    kicker={`Step ${stepNumber(step.id)} of ${TOTAL_STEPS}${step.required ? '' : ' · optional'}`}
                    title={step.question}
                    lede={step.lede}
                    motif={step.icon}
                  />
                ) : (
                  <PageHero
                    kicker={`${TOTAL_STEPS} of ${TOTAL_STEPS} resolved`}
                    title="You’re all set, Maya."
                    lede="Aster has what it needs to open your record. From here, everything lives in the portal."
                    motif="check"
                  />
                )}

                {/* One notice, docked under the band the way the shell docks
                    it — two hairlines and a sentence, never a card of its own.
                    A refusal is not a failure — it is the shape of the path,
                    said out loud — so `alert` reads as `working` rather than
                    as an escalation; `info` is the one place in the portal a
                    notice is allowed to be green: the sentence is the outcome
                    of a step she has just taken. The welcome-back line yields
                    to either while it is showing, and comes back after. */}
                {(notice || resume) && (
                  <div className="page-notice">
                    {notice ? (
                      <Notice
                        tone={notice.tone === 'alert' ? 'working' : 'done'}
                        icon={notice.tone === 'alert' ? 'lock' : 'check'}
                      >
                        {notice.text}
                      </Notice>
                    ) : (
                      <Notice
                        tone="quiet"
                        icon="clock"
                        action={{ label: 'Dismiss', icon: 'close', onClick: () => setResumeShown(false) }}
                      >
                        {resume}
                      </Notice>
                    )}
                  </div>
                )}

                {/* ENR-149 Scenario 4, made something you can look at: the
                    published steps arrived and her answers did not, so the
                    interface claims nothing and refuses to write on top of a
                    state nobody could read. */}
                {unknown && (
                  <StateCard
                    variant="error"
                    icon="alert"
                    title="What you have already done couldn’t be read"
                    action={{
                      label: 'Try again',
                      icon: 'refresh',
                      onClick: () => onPreviewState('ready'),
                    }}
                  >
                    Your eight steps are here, but what you saved is not, so nothing below is marked
                    saved, and nothing can be saved until it can be read. Nothing has been lost.
                  </StateCard>
                )}

                <div className="flow-grid">
                  <div className="flow-content">
                    {body()}

                    {/* ENR-149 AC 4. The step stays in progress, the count does
                        not move, and the failure names itself. */}
                    {failed && (
                      <p className="step-failed" role="alert">
                        <Icon name="alert" size={16} />
                        <span>
                          <strong>That didn’t reach Aster.</strong>
                          {failed}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* The panel is `aria-live="off"` inside a polite `main`: it
                      mirrors the draft on every keystroke, and a screen reader
                      that re-read it on every keystroke would be narrating the
                      typing. The fields announce themselves. */}
                  {working && (
                    <aside className="flow-aside" aria-label="This step, at a glance" aria-live="off">
                      <StepPanel stepId={step.id} draft={draft} grants={grants} />
                    </aside>
                  )}

                  {working && (
                    <StepActions
                      step={step}
                      first={stepNumber(step.id) === 1}
                      saving={Boolean(saving)}
                      saveLabel={failed ? 'Try again' : 'Save and continue'}
                      onBack={() => goTo(STEPS[stepNumber(step.id) - 2].id)}
                      onSkip={() => commit('skip')}
                      onSave={() => commit('save')}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {person && (
        <PersonDrawer
          grant={person.grant ?? null}
          onSave={saveGrant}
          onClose={() => setPerson(null)}
        />
      )}
    </div>
  );
}

export { ONBOARDING_PREVIEW_STATES };
