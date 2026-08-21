import Icon from '../../design-system/Icon.jsx';
import { enrollmentAdvisor } from './data.js';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import EnrollmentRail from './EnrollmentRail.jsx';
import GateNotice from '../registration/GateNotice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import Tooltip from '../../design-system/primitives/Tooltip.jsx';
import Card, { CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import TaskCard from './TaskCard.jsx';

/**
 * My Enrollment — the screen ENR-164 approved in Jam, and the one the Jam of
 * 2026-08-20 pointed at when it asked for every other section to be built the
 * same way. Nothing here is relitigated: the page now names the slots the shell
 * always had, rather than building them itself, so what the rest of the portal
 * copies is this file's structure and not a screenshot of it.
 *
 * Its hero copy moved to `navigation.js` with everyone else's.
 *
 * ## Four groups, one shape — Jam of 2026-08-21
 *
 * A step is in one of four standings (`CONTEXT.md`, Step): open, with Aster,
 * locked, completed. The page is one group per standing, and before this Jam
 * the four were three shapes — a section card with a sort group, two status
 * cards with static heads, and a green box of its own for *completed* that was
 * the only one that collapsed. Laura asked for the other two to collapse too;
 * the answer is that the three not-open groups are the *same* card with the
 * same head, and that head is the product's one disclosure (`CardHead`).
 *
 * All three start closed, as every accordion in the product does: the head
 * says what is inside and how many, and an open group is one the student chose
 * to read. What she chooses is remembered (`App.jsx`, `aster.enrollment.groups`).
 * A group with nothing in it has no toggle — a button that opens nothing is a
 * lie — and says its one line instead.
 */
export default function EnrollmentPage({
  destination,
  identity,
  tasks,
  reviewing,
  locked,
  completed,
  groups,
  sort,
  progress,
  totalSteps,
  earnedPoints,
  availableToday,
  nextReward,
  rewardsOn,
  gate,
  unavailable,
  onSort,
  onOpenSmart,
  onOpenTask,
  onOpenPoints,
  onToggleGroup,
  onResume,
  onContact,
}) {
  // Without a `groups` record there is nothing to remember into, so the page
  // shows everything and the heads stay static.
  const canToggle = Boolean(groups && onToggleGroup);
  const open = (id) => (canToggle ? Boolean(groups[id]) : true);

  return (
    <PageShell
      destination={destination}
      summaryLabel="Enrollment progress"
      summary={
        <>
          <SummaryFigure
            mark={
              <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
                <span>{progress}%</span>
              </div>
            }
            label="Your enrollment progress"
            explain={{
              title: 'Steps complete',
              body: `${totalSteps} steps make up enrolling. One counts here once you have finished it. A step Aster is still reading is with Aster, and is not counted until it comes back.`,
            }}
            figure={`${completed.length} of ${totalSteps} steps complete`}
          >
            {tasks.length > 0
              ? 'You’re right on track. Your next task takes about 4 minutes.'
              : 'Nothing is waiting on you right now.'}
          </SummaryFigure>
          <AdvisorBar advisor={enrollmentAdvisor} onContact={onContact} />
        </>
      }
      /* ENR-214 AC 2. One line true of the whole section, above the cards:
         what is blocked, and by when. */
      notice={
        <GateNotice
          state={gate.state}
          items={gate.items}
          unavailable={unavailable}
          onShow={() => {
            const first = document.querySelector('.task-card.gating');
            first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        />
      }
      rail={
        <EnrollmentRail
          student={identity}
          earnedPoints={earnedPoints}
          availableToday={availableToday}
          nextReward={nextReward}
          rewardsOn={rewardsOn}
          unavailable={unavailable}
          onResume={onResume}
          onOpenPoints={onOpenPoints}
        />
      }
    >
      {/* Open — the group the page exists for. It never collapses, and it wears
          the same head as the three below it, so the four read as one list of
          groups and not as a section with three appendices. The heads are bare:
          every row under them carries its own tile — the task's kind here, the
          step's standing below — and the mark is said on the row or on the head,
          never on both. */}
      <Card>
        <CardHead
          kind="status"
          title="Your next steps"
          note={tasks.length > 0 ? 'Ready when you are.' : 'Nothing is waiting on you right now.'}
          aside={
            <div className="sort-group" aria-label="Sort your next steps">
              <button
                className={sort === 'smart' ? 'selected' : ''}
                aria-pressed={sort === 'smart'}
                onClick={() => onSort('smart')}
              >
                {/* Filled while it is the chosen order: the one weight an *on*
                    state takes. */}
                <Icon name="spark" size={15} weight={sort === 'smart' ? 'fill' : 'bold'} /> Smart
                order
              </button>
              <button
                className={sort === 'due' ? 'selected' : ''}
                aria-pressed={sort === 'due'}
                onClick={() => onSort('due')}
              >
                Due soon
              </button>
              <button
                className={sort === 'quick' ? 'selected' : ''}
                aria-pressed={sort === 'quick'}
                onClick={() => onSort('quick')}
              >
                Fastest
              </button>
              <Tooltip tip="How smart order works">
                <button className="sort-info" aria-label="How smart order works" onClick={onOpenSmart}>
                  <Icon name="info" size={17} />
                </button>
              </Tooltip>
            </div>
          }
        />

        {tasks.length > 0 ? (
          <CardRows className="task-list">
            {tasks.map((task, index) => (
              <TaskCard
                rewardsOn={rewardsOn}
                gates={gate.taskIds.has(task.id)}
                gateState={gate.items.find((item) => item.taskId === task.id)}
                key={task.id}
                task={task}
                recommended={index === 0 && sort === 'smart'}
                onOpen={onOpenTask}
              />
            ))}
          </CardRows>
        ) : (
          <StateCard variant="done" icon="spark" title="You’re all caught up." className="inset">
            New steps appear here when Aster adds them.
          </StateCard>
        )}
      </Card>

      {/* With Aster — she has done her part; a person at Aster is reading it. */}
      <Card className={reviewing.length > 0 && !open('reviewing') ? 'collapsed' : ''}>
        <CardHead
          kind="status"
          title="Aster is reviewing"
          note="You’ve done your part. No action needed right now."
          count={reviewing.length > 0 ? reviewing.length : undefined}
          open={open('reviewing')}
          onToggle={canToggle && reviewing.length > 0 ? () => onToggleGroup('reviewing') : undefined}
          controls="enrollment-reviewing"
        />
        {reviewing.length > 0 ? (
            <CardRows className="review-list" id="enrollment-reviewing" hidden={!open('reviewing')}>
              {reviewing.map((item) => (
                <article className="compact-task review-task" key={`${item.title}-${item.submitted}`}>
                  <div className="compact-check review" aria-hidden="true">
                    <Icon name="clock" size={21} weight="duotone" />
                  </div>
                  <div className="compact-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="compact-meta">
                      <span>{item.submitted}</span>
                      <span>{item.eta}</span>
                    </div>
                  </div>
                  <div className="status-pill">
                    <span className="pulse" /> In review
                  </div>
                </article>
              ))}
            </CardRows>
        ) : (
          <p className="inline-empty">
            Nothing is with Aster right now. Anything you send appears here while a team reads it.
          </p>
        )}
      </Card>

      {/* Locked — a step that waits on another, and says which. */}
      <Card className={locked.length > 0 && !open('later') ? 'collapsed' : ''}>
        <CardHead
          kind="status"
          title="Coming up later"
          note="These will open automatically when you’re ready for them."
          count={locked.length > 0 ? locked.length : undefined}
          open={open('later')}
          onToggle={canToggle && locked.length > 0 ? () => onToggleGroup('later') : undefined}
          controls="enrollment-later"
        />
        {locked.length > 0 ? (
            <CardRows className="locked-list" id="enrollment-later" hidden={!open('later')}>
              {locked.map((item) => (
                <article className="compact-task locked-task" key={item.title}>
                  <div className="compact-check locked" aria-hidden="true">
                    <Icon name="lock" size={21} weight="duotone" />
                  </div>
                  <div className="compact-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="prerequisite">
                      <Icon name="arrow" size={14} /> {item.prerequisite}
                    </div>
                  </div>
                  <span className="locked-due">{item.due}</span>
                </article>
              ))}
            </CardRows>
        ) : (
          <p className="inline-empty">
            Nothing is waiting on a prerequisite. Steps that need another one first appear here.
          </p>
        )}
      </Card>

      {/* Completed — history. The head still counts. */}
      <Card className={completed.length > 0 && !open('completed') ? 'collapsed' : ''}>
        <CardHead
          kind="status"
          title={
            completed.length === 0 ? 'No steps completed yet' : `${completed.length} steps completed`
          }
          note={
            /* ENR-162 AC 5: with rewards off, the group still counts steps —
               it just stops being about points, and nothing is left empty. */
            completed.length === 0
              ? rewardsOn
                ? 'Each step you finish is listed here with the points it earned.'
                : 'Each step you finish is listed here.'
              : rewardsOn
                ? `${earnedPoints.toLocaleString()} Momentum points earned`
                : 'Everything you have already finished.'
          }
          count={completed.length > 0 ? completed.length : undefined}
          open={open('completed')}
          onToggle={canToggle && completed.length > 0 ? () => onToggleGroup('completed') : undefined}
          controls="enrollment-completed"
        />
        {completed.length > 0 && (
          <CardRows className="completed-list" id="enrollment-completed" hidden={!open('completed')}>
            {completed.map((item) => (
              <article className="compact-task done-task" key={`${item.title}-${item.date}`}>
                <div className="compact-check done" aria-hidden="true">
                  <Icon name="check" size={21} />
                </div>
                <div className="compact-copy">
                  <h3>{item.title}</h3>
                  <div className="compact-meta">
                    <span>Completed {item.date}</span>
                  </div>
                </div>
                {rewardsOn ? (
                  <span className="earned">
                    <Icon name="spark" size={13} /> +{item.points}
                  </span>
                ) : null}
              </article>
            ))}
          </CardRows>
        )}
      </Card>
    </PageShell>
  );
}
