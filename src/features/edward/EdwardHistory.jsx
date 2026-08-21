import Icon from '../../design-system/Icon.jsx';
import { EMPTY_HISTORY } from './data.js';

/**
 * The fuller form — ENR-175 AC 5 and Scenario 3. On a wide window this is the
 * left pane beside the conversation; below 820px it replaces the conversation
 * and the header grows a back control. Reference: Deel.
 */
export default function EdwardHistory({ conversations, activeId, onOpen, onNew }) {
  const saved = conversations.filter((item) => item.messages.length > 0);

  return (
    <div className="edward-history">
      <p className="panel-label">Your conversations</p>

      {saved.length === 0 ? (
        <div className="edward-history-empty">
          <span className="state-icon">
            <Icon name="message" size={20} />
          </span>
          <strong>{EMPTY_HISTORY.title}</strong>
          <p>{EMPTY_HISTORY.body}</p>
        </div>
      ) : (
        <ul className="edward-history-list">
          {saved.map((item) => (
            <li key={item.id}>
              <button
                className={item.id === activeId ? 'active' : ''}
                aria-current={item.id === activeId ? 'true' : undefined}
                onClick={() => onOpen(item.id)}
              >
                <strong>{item.title}</strong>
                <span>{item.when}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="edward-new-conversation" onClick={onNew}>
        <Icon name="pen" size={15} /> New conversation
      </button>
    </div>
  );
}
