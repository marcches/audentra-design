import { useId, useState } from 'react';
import Icon from '../Icon.jsx';

/**
 * The rail a multi-step flow is walked along — the band, the figure, and the
 * steps in four states.
 *
 * It lives here rather than in the section that needed it first, because the
 * four states are a *decision about the product*, not about onboarding: a step
 * that was set aside must look the same wherever a flow has steps, and the
 * moment a second flow copies these classes by hand they will drift. This is
 * the same fix `Drawer` was: seven hand-typed copies of one shell.
 *
 * It knows no domain. The caller supplies the words and a `state` per row; this
 * owns what each state *looks like* and what it is called.
 *
 *   saved       filled disc, a check. Green means one thing in this product —
 *               covered, satisfied, done — and this is that thing.
 *   current     a bright ring with a filled centre. The only mark drawn in two
 *               parts, because it is the only one still happening.
 *   skipped     a half-filled circle in the band's own light. **Not amber** —
 *               amber means someone still has to act, and inside a flow the
 *               student is walking that is a nag. Not dimmed, not crossed out,
 *               not crimson: each of those reads as failure, and a step set
 *               aside is not a failed step.
 *   upcoming    a hollow ring, quiet.
 *
 * `locked` and `unknown` are deliberately **not** a fifth and sixth state. A
 * locked step is an upcoming step that states why it is not open yet; an
 * unknown one is what the rail says when the record could not be read, instead
 * of guessing. Both are drawn as upcoming, with a mark and a sentence.
 *
 * Saved and skipped rows are buttons. Upcoming and locked rows are not, and are
 * not *disabled* buttons either: a disabled control is an offer withdrawn, and
 * no control is a stage that has not arrived.
 *
 * Below 1060 the band lies across the top — which is what a hero already is —
 * and the rows fold behind a disclosure that keeps the current step's name on
 * its face, so folding the rail never costs the position.
 */

const MARKS = {
  saved: { icon: 'check', meta: 'Saved' },
  current: { icon: null, meta: null },
  skipped: { icon: 'half', meta: 'Skipped — you can come back' },
  upcoming: { icon: null, meta: null },
  locked: { icon: 'lock', meta: null },
  unknown: { icon: null, meta: 'Couldn’t be checked' },
};

export default function StepRail({
  eyebrow,
  greeting,
  label,
  figure,
  note,
  meter,
  meterLabel,
  steps = [],
  currentName,
  advisor,
  onOpen,
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <div className="step-rail">
      <div className="rail-band">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {greeting ? <p className="rail-greeting">{greeting}</p> : null}

        {/* Nothing here is drawn on a guess. A flow whose steps did not load
            shows the band and the human at the bottom of it, and no figure, no
            meter and no rows — a count beside "your steps could not be loaded"
            is the interface contradicting itself in one screen. */}
        {figure ? (
          <div className="rail-figure">
            <p className="rail-label">{label}</p>
            <p className="rail-count">{figure}</p>
            {/* At most one line under the figure. The fourth line inside a
                figure cell is what pushed My Classrooms' summary panel 16px
                taller than every other section's. */}
            {note ? <p className="rail-note">{note}</p> : null}
          </div>
        ) : null}

        {/* Two runs, not one: what is done and what was set aside are different
            facts, and a single bar that meant both would be the bug. */}
        {meter ? (
          <div className="rail-meter" role="img" aria-label={meterLabel}>
            <span className="meter-saved" style={{ width: `${meter.saved}%` }} />
            <span className="meter-skipped" style={{ width: `${meter.skipped}%` }} />
          </div>
        ) : null}

        {steps.length > 0 && (
          <button
            className="rail-disclosure"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((value) => !value)}
          >
            <span>{currentName ?? 'Steps'}</span>
            <Icon name="chevron" size={15} />
          </button>
        )}
      </div>

      <nav
        className={open ? 'rail-steps open' : 'rail-steps'}
        id={listId}
        aria-label="Steps in this flow"
      >
        <ol>
          {steps.map((step) => {
            const mark = MARKS[step.state] ?? MARKS.upcoming;
            const meta = step.meta ?? mark.meta;

            const inside = (
              <>
                <span className={`step-mark ${step.state}`} aria-hidden="true">
                  {mark.icon ? <Icon name={mark.icon} size={13} /> : null}
                </span>
                <span className="step-text">
                  <span className="step-name">{step.name}</span>
                  {meta ? (
                    <span className={step.faint ? 'step-meta faint' : 'step-meta'}>{meta}</span>
                  ) : null}
                </span>
              </>
            );

            return (
              <li
                key={step.id}
                className={`step-row ${step.state}`}
                aria-current={step.state === 'current' ? 'step' : undefined}
              >
                {step.reachable ? (
                  <button onClick={() => onOpen(step.id)}>
                    {inside}
                    <Icon name="chevron" size={14} />
                  </button>
                ) : (
                  <span>{inside}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {advisor ? (
        <div className="rail-advisor">
          <p className="rail-label">{advisor.label}</p>
          <p className="advisor-who">
            <span className="advisor-mark" aria-hidden="true">
              {advisor.initials}
            </span>
            <span>
              <strong>{advisor.name}</strong>
              <small>{advisor.office}</small>
            </span>
          </p>
          <p className="advisor-reach">
            <a href={`mailto:${advisor.email}`}>
              <Icon name="mail" size={14} /> {advisor.email}
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
