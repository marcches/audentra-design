import Icon from '../../Icon.jsx';
import { officeOf, stateOf } from '../../lib/documents.js';

/**
 * The rail: what is with Aster right now, and the one rule that survives
 * everything the student does on this page.
 *
 * The anchor is the section's key secondary figure. The main column answers
 * *what still needs me*; this answers *what is out of my hands*, which is the
 * other half of the question the card exists for — and it names the office
 * holding each one, because "in review" without a holder is the silence ENR-158
 * is written against.
 *
 * The light card is the retention guardrail as a standing reference rather than
 * a sentence that only appears inside a drawer she may never open: the original
 * is kept, and a replacement never lands on top of it.
 */
export default function DocumentsRail({ requirements, unavailable, onToast }) {
  const waiting = unavailable
    ? []
    : requirements.filter((item) => ['checking', 'in-review'].includes(stateOf(item)));

  return (
    <>
      <div className="anchor-card waiting-card">
        <span className="panel-label">With Aster right now</span>
        <strong>{unavailable ? '—' : waiting.length}</strong>
        {unavailable ? (
          <p>
            Your record loaded, but what Aster has decided could not be read. Nothing here is out of
            date — it is unread, which is not the same thing.
          </p>
        ) : waiting.length === 0 ? (
          <p>
            Nothing is sitting with Aster. Everything you have sent has been decided, and anything
            still open is waiting on you.
          </p>
        ) : (
          <>
            <p>
              Nothing is needed from you on these. Each one names the office holding it and how long
              that office usually takes.
            </p>
            <ul className="waiting-list">
              {waiting.map((item) => {
                const office = officeOf(item);
                return (
                  <li key={item.id}>
                    <strong>{item.title}</strong>
                    <span>
                      {office.name} · usually {office.reply}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div className="provenance-card keeping-card">
        <span className="panel-label">What Aster keeps</span>
        <p>
          Every file you send is kept exactly as you sent it. When you replace something, the new
          file is added <em>beside</em> the old one — the first is never written over, and the reason
          it came back stays readable next to it.
        </p>
        <p className="keeping-note">
          <Icon name="shield" size={14} /> Files are encrypted, and read only by staff at the office
          that asked for them.
        </p>
        <button
          className="secondary-button"
          onClick={() =>
            onToast('How long Aster keeps a record is set by its retention policy, on Aster’s own website.')
          }
        >
          <Icon name="external" size={16} /> Aster’s records policy
        </button>
      </div>
    </>
  );
}
