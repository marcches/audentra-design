import Icon from '../../design-system/Icon.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import EdwardAsk from '../../design-system/patterns/EdwardAsk.jsx';
import GateChip from '../registration/GateChip.jsx';
import { EDWARD } from '../edward/data.js';
import { openEdward } from '../edward/door.js';
import { edwardAskFor, kindIcon, priorityLabel } from './logic.js';

export default function TaskCard({
  task,
  recommended,
  rewardsOn = true,
  gates = false,
  gateState = null,
  onOpen,
}) {
  return (
    <article
      className={`task-card ${recommended ? 'recommended' : ''} ${gates ? 'gating' : ''}`}
    >
      {/* The band that points at the one thing to do next — `ActionBand` since
          the My Degree brief of 2026-08-21 asked for the same band on a second
          screen. Here the row under it carries the action, so the band carries
          the consequence. */}
      {recommended && (
        <ActionBand
          icon="spark"
          label="Start here"
          aside={task.unlocks ? `Unlocks ${task.unlocks} more steps` : 'Highest priority right now'}
        />
      )}

      <div className="task-card-body">
        <div className={`task-type-icon ${task.kind}`}>
          <Icon name={kindIcon(task.kind)} size={21} weight="duotone" />
        </div>

        <div className="task-main">
          <div className="task-meta-row">
            <span>{task.category}</span>
            <span className={`priority-badge ${task.priority}`}>{priorityLabel(task.priority)}</span>
          </div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {/* ENR-214 AC 1. Ranked above the facts and never sharing their row:
              flat construction is not flat content, and this is the one thing
              about this step that is not true of the others. */}
          {gates && <GateChip state={gateState?.state} since={gateState?.since} />}
          <div className="task-facts">
            <span>
              <Icon name="calendar" size={15} /> Due {task.due} <b>· {task.daysLeft} days</b>
            </span>
            <span>
              <Icon name="clock" size={15} /> About {task.minutes} min
            </span>
            {task.kind === 'external' && (
              <span>
                <Icon name="shield" size={15} /> Verified automatically
              </span>
            )}
          </div>
        </div>

        <div className="task-action">
          {/* ENR-162 AC 5. An institution with rewards off leaves no orphaned
              control behind, and a points line on a card nobody can spend is
              exactly that. The action keeps its place; only the reward goes. */}
          {rewardsOn && (
            <div className="point-reward">
              <span>
                <Icon name="spark" size={14} /> {task.points} pts today
              </span>
              <small>{task.tomorrow} tomorrow</small>
            </div>
          )}
          <button
            className={recommended ? 'primary-button' : 'secondary-button'}
            onClick={() => onOpen(task)}
          >
            {task.action} <Icon name="arrow" size={16} />
          </button>
          <button className="text-button" onClick={() => onOpen(task, 'how')}>
            How this works
          </button>
          {/* Edward at the task — C5 of the walkthrough of 2026-08-20, through
              the door of Part A §12: help with the step itself, with the step's
              context already loaded and the question written, not sent. Not a
              route to a person; that is what Edward offers after, if he must. */}
          <EdwardAsk mark={EDWARD.mark} onClick={() => openEdward(edwardAskFor(task))} />
        </div>
      </div>
    </article>
  );
}
