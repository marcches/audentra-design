import Icon from '../../design-system/Icon.jsx';
import Tooltip from '../../design-system/primitives/Tooltip.jsx';
import { STANDING_CAUTION, VOICE_NOTE } from './data.js';

/**
 * The context chip lives inside the composer, the way Notion, ChatGPT and Comet
 * all put it — ENR-175 AC 4. It names the page the student is on right now, and
 * it can be dropped, which is the difference between carrying context and
 * imposing it.
 *
 * The standing caution is pinned under the field and never scrolls away, which
 * is the whole of ENR-176 AC 6 on a 380px surface.
 */
export default function EdwardComposer({
  draft,
  onDraft,
  onSend,
  context,
  onDropContext,
  voice,
  onMic,
  disabled,
}) {
  const listening = voice === 'listening';

  function onKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (draft.trim()) onSend(draft);
    }
  }

  return (
    <div className="edward-composer">
      {context && (
        <div className="edward-context">
          <span className="edward-context-chip">
            <Icon name="pin" size={12} />
            {context}
            <Tooltip tip="Stop asking about this">
              <button aria-label={`Stop asking about ${context}`} onClick={onDropContext}>
                <Icon name="close" size={12} />
              </button>
            </Tooltip>
          </span>
        </div>
      )}

      <div className={`edward-field${listening ? ' listening' : ''}`}>
        <label className="sr-only" htmlFor="edward-input">
          Ask Edward a question
        </label>
        <textarea
          id="edward-input"
          rows={1}
          value={draft}
          placeholder={listening ? 'Listening…' : 'Ask about your enrollment'}
          disabled={disabled || listening}
          onChange={(event) => onDraft(event.target.value)}
          onKeyDown={onKeyDown}
        />

        <Tooltip tip={listening ? 'Stop listening' : 'Ask by voice'} placement="top">
          <button
            className={`edward-mic${listening ? ' listening' : ''}`}
            aria-label={listening ? 'Stop listening' : 'Ask by voice'}
            aria-pressed={listening}
            disabled={disabled || voice === 'denied'}
            onClick={onMic}
          >
            {listening ? (
              <span className="edward-wave" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            ) : (
              <Icon name="mic" size={16} />
            )}
          </button>
        </Tooltip>

        <Tooltip tip="Send" placement="top">
          <button
            className="edward-send"
            aria-label="Send question"
            disabled={disabled || !draft.trim()}
            onClick={() => onSend(draft)}
          >
            <Icon name="send" size={16} />
          </button>
        </Tooltip>
      </div>

      {voice === 'denied' && (
        <p className="edward-mic-note" role="status">
          <Icon name="alert" size={12} /> Microphone unavailable. You can still type your question.
        </p>
      )}
      {listening && (
        <p className="edward-mic-note" role="status">
          <Icon name="info" size={12} /> {VOICE_NOTE}
        </p>
      )}

      <p className="edward-caution">
        <Icon name="shield" size={13} />
        {STANDING_CAUTION}
      </p>
    </div>
  );
}
