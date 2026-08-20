import Icon from '../../Icon.jsx';
import { ACCOMMODATION_ANSWERS, accommodationQuestion } from '../../health-data.js';
import { answerInfo, answerOption, answerState } from '../../lib/health.js';
import { offices } from '../../help-data.js';

/**
 * The accommodation question — ENR-208.
 *
 * ## Why this card looks nothing like the one above it
 *
 * The brief's central risk is that the two halves of this screen read as one
 * thing, and "make them different" only becomes true if it is built. So this
 * card has **no heading band**: it opens in prose and closes on a foot, where
 * the record above opens on a tinted band with a state chip and a list of
 * submissions. One is a record with a history; this is a question with two
 * doors, and the silhouettes say so before a word is read
 * ([YNAB](https://mobbin.com/screens/7f14f6d6-2262-46ee-899c-cbe02b2884a3)).
 *
 * ## Three conditions, not two
 *
 * *Never answered* and *answered no* are different, and the difference is the
 * sharpest thing on the screen. Unanswered shows the two options live under a
 * muted label — **no chip, no colour, no count**, because an optional question
 * dressed as an obligation is the failure mode of the whole section. Answered
 * replaces the options with a sentence that states the answer, when it was given
 * and where, so the screen proves it is not asking again rather than merely not
 * asking (ENR-205 AC 3).
 *
 * The options are a real `radiogroup`: arrows move between them and the current
 * answer is announced as selected, so *unanswered* is a condition a screen
 * reader can hear. Two independent toggles would read as two switches, which is
 * exactly where the distinction above would be lost for the people who most
 * depend on it.
 *
 * A failed save follows Help's grammar, not Appointments': **nothing is
 * created.** The question stays unanswered and the card says what did not
 * happen. An answer shown as sent that reached nobody would stop her waiting for
 * contact that was never requested (ENR-208 Scenario 5).
 */
export default function AccommodationCard({
  answer,
  saving = false,
  failed = false,
  unavailable = false,
  onAnswer,
  onRetry,
}) {
  const office = offices[accommodationQuestion.office];
  const state = answerState(answer);
  const info = answerInfo(answer);
  const chosen = answerOption(state);

  /**
   * Arrows move focus and **do not** answer. The usual radio pattern selects on
   * arrow, and here selecting is telling an office something about herself — one
   * stray keypress should not do that. Space and Enter answer, which the buttons
   * already do natively.
   */
  function moveFocus(event) {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const radios = [...event.currentTarget.querySelectorAll('[role="radio"]')];
    const here = radios.indexOf(document.activeElement);
    const step = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    const next = radios[(Math.max(0, here) + step + radios.length) % radios.length];
    next?.focus();
  }

  return (
    <section className="section-card question-card" aria-labelledby="accommodation-title">
      <div className="question-head">
        <span className="question-owner">{office.name}</span>
        <h2 id="accommodation-title">{accommodationQuestion.title}</h2>
        <p className="question-lede">{accommodationQuestion.lede}</p>
        <p className="question-collects">
          <Icon name="info" size={14} /> {accommodationQuestion.collects}
        </p>
      </div>

      {unavailable ? (
        <div className="question-unreadable" role="alert">
          <p>
            <strong>Your answer could not be read just now.</strong> It is not shown as answered and
            it is not shown as open, because we do not know which it is — and guessing either way
            would be wrong.
          </p>
          <button className="secondary-button" onClick={onRetry}>
            <Icon name="refresh" size={16} /> Try again
          </button>
        </div>
      ) : chosen ? (
        <div className="question-answered">
          <p className="answered-said">
            <span className={`answer-mark ${info.tone}`} aria-hidden="true">
              <Icon name="check" size={15} />
            </span>
            <strong>{chosen.said}</strong>
            <span>
              {answer.on}
              {answer.where ? ` · answered during ${answer.where}` : ''}
            </span>
          </p>
          <p className="answered-next">{chosen.next}</p>

          {/* AC 5: the other door stays open, and the change is one click, not a
              form. What is shown is always the current answer. */}
          <div className="answered-change">
            <span>
              {state === 'yes' ? 'Changed your mind?' : 'You can change this at any time.'}
            </span>
            <button
              className="secondary-button"
              disabled={saving}
              onClick={() => onAnswer(state === 'yes' ? 'no' : 'yes')}
            >
              {saving
                ? 'Saving…'
                : state === 'yes'
                  ? 'Change to not right now'
                  : 'I’d like to talk after all'}
            </button>
          </div>
        </div>
      ) : (
        <div className="question-ask">
          <span className="question-open-label">{info.label}</span>
          <div
            className="answer-options"
            role="radiogroup"
            aria-labelledby="accommodation-title"
            onKeyDown={moveFocus}
          >
            {ACCOMMODATION_ANSWERS.map((option, index) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked="false"
                // Roving tab stop: the group is one stop, and the arrows move
                // inside it. Nothing is selected yet, so the first option holds
                // the stop.
                tabIndex={index === 0 ? 0 : -1}
                className="answer-option"
                disabled={saving}
                onClick={() => onAnswer(option.id)}
              >
                <span className="answer-dot" aria-hidden="true" />
                <span className="answer-copy">
                  <strong>{option.label}</strong>
                  <span>{option.means}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {failed && (
        <div className="question-failed" role="alert">
          <p>
            <strong>This did not reach {office.name}.</strong> Nothing was saved and nothing was
            sent, so the question is still open — and no one at Aster has been told anything.
          </p>
          <button className="secondary-button" onClick={onRetry}>
            <Icon name="refresh" size={16} /> Try again
          </button>
        </div>
      )}

      <p className="card-foot question-foot">
        <Icon name="lock" size={14} /> {accommodationQuestion.seenBy}
      </p>
    </section>
  );
}
