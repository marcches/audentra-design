import Icon from '../../design-system/Icon.jsx';
import { OFFICE_ORDER, TYPICAL_REPLY, offices } from './data.js';

/**
 * The rail: where an answer lands, and who is accountable for one.
 *
 * The anchor card is the section's key secondary figure — how long a reply
 * takes — and it carries ENR-177 AC 6 in the place a student is most likely to
 * wonder about it. The light card under it is AC 7 as a standing reference
 * rather than a sentence that only appears once a topic is chosen: five
 * offices, and what each one actually decides.
 *
 * [Unity](https://mobbin.com/screens/34cd0860-99c1-44da-aef4-e1d25be584b7):
 * contact is a card that says what it does, not a bare button.
 */
export default function HelpRail({ onToast }) {
  return (
    <>
      <div className="anchor-card reply-card">
        <span className="panel-label">Typical reply</span>
        <strong>{TYPICAL_REPLY}</strong>
        <p>
          Every answer lands on this page and stays here — that is the record. Some offices take
          longer than others, and each one tells you its own before you send.
        </p>
        <p className="reply-note">
          <Icon name="mail" size={14} /> Aster’s emails only say that something has arrived here.
          Nothing you write back to one reaches a person.
        </p>
      </div>

      <div className="provenance-card office-card">
        <span className="panel-label">Who decides what</span>
        <p>
          A question is answered by the office that owns the decision. These are the five that own
          the steps in your checklist.
        </p>

        <ul className="office-list">
          {OFFICE_ORDER.map((id) => {
            const office = offices[id];
            return (
              <li key={id}>
                <strong>{office.name}</strong>
                <span>{office.decides}</span>
                <span className="office-meta">
                  <Icon name="pin" size={13} /> {office.location} · {office.hours}
                </span>
              </li>
            );
          })}
        </ul>

        <button
          className="secondary-button"
          onClick={() =>
            onToast('Office directories, maps and phone numbers live on Aster’s own website.')
          }
        >
          <Icon name="external" size={16} /> Aster’s office directory
        </button>
      </div>
    </>
  );
}
