import Icon from '../../Icon.jsx';
import { housingOffice, responseDeadline } from '../../housing-data.js';
import { formatMoney } from '../../lib/money.js';
import {
  SHORTLIST_MAX,
  ordinal,
  rateFrom,
  residenceById,
  shortlistState,
} from '../../lib/housing.js';

/**
 * The second question — and the place the card's hardest sentence lives.
 *
 * Honesty about influence is the whole job here: ranking *feels* like choosing and it is not one.
 * The sentence sits at the head of this panel and nowhere else on the page except the rail's long
 * version. It is deliberately **not** in `PageShell`'s `notice` slot, for two reasons. A notice is
 * for what is true of the whole section, and a commuter never ranks anything; and a permanent
 * full-width band announcing that this does not decide anything is exactly what would make the
 * ranking feel pointless, which the card names as the failure to avoid.
 *
 * So the sentence is paired: what the ranking is not, immediately followed by what it is worth.
 * Saying only the first half is honest and useless.
 *
 * Reordering is explicit — move up, move down, remove — rather than drag, per
 * [Record Club](https://mobbin.com/screens/0595c4df-bba1-480e-a5d8-875024e0c81d) minus its handle.
 * A keyboard-accessible drag is machinery on top of the thing that already works for three items.
 * There is no `Save order` button: ENR-211 AC 3 says a ranking saves on its own, so a state where an
 * order exists on screen but not in the record must not be constructible.
 */
export default function ShortlistPanel({ shortlist, locked, onMove, onRemove, onOpen }) {
  const state = shortlistState(shortlist);
  const rows = shortlist.map((id) => residenceById(id)).filter(Boolean);

  return (
    <section className="section-card shortlist-card" aria-labelledby="shortlist-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow muted">{locked ? 'What you submitted' : 'Second question'}</p>
          <h2 id="shortlist-heading">
            {locked ? 'The residences you ranked' : 'Rank the residences you would like'}
          </h2>
        </div>
        <span className="result-count" aria-live="polite">
          {rows.length} of {SHORTLIST_MAX} ranked
        </span>
      </div>

      <div className="influence-note">
        <span>
          <Icon name="info" size={17} />
        </span>
        <div>
          <strong>A preference is not an assignment.</strong>
          <p>
            {housingOffice} assigns every room after {responseDeadline.full}, and they may assign one
            you did not name. What your order is worth: they work down your list in the order you set
            it, so first is read as first — and most students are placed in one of the three they
            name.
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="shortlist-empty">
          Nothing ranked yet. Add up to {SHORTLIST_MAX} from the catalogue below, in the order you
          would like them.
        </p>
      ) : (
        <ol className="shortlist">
          {rows.map((residence, index) => (
            <li key={residence.id} className="shortlist-row">
              <span className="rank-label">{ordinal(index)}</span>

              <button
                className="shortlist-main"
                onClick={(clickEvent) => onOpen(residence, clickEvent.currentTarget)}
              >
                <span className="org-tile" aria-hidden="true">
                  {residence.initials}
                </span>
                <span className="shortlist-copy">
                  <strong>{residence.name}</strong>
                  <small>
                    {residence.area} · {residence.walk} min walk · from{' '}
                    {formatMoney(rateFrom(residence))}
                  </small>
                </span>
              </button>

              {!locked && (
                <span className="rank-controls">
                  {/* `chevron` points down, so it is the *up* control that turns. */}
                  <button
                    className="icon-button up"
                    aria-label={`Move ${residence.name} up`}
                    disabled={index === 0}
                    onClick={() => onMove(index, -1)}
                  >
                    <Icon name="chevron" size={16} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Move ${residence.name} down`}
                    disabled={index === rows.length - 1}
                    onClick={() => onMove(index, 1)}
                  >
                    <Icon name="chevron" size={16} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Remove ${residence.name} from your shortlist`}
                    onClick={() => onRemove(residence.id)}
                  >
                    <Icon name="close" size={16} />
                  </button>
                </span>
              )}
            </li>
          ))}
        </ol>
      )}

      {/* ENR-211 AC 9 — a partial shortlist is saved as a partial shortlist, and is never
          presented as complete. It is stated on the panel rather than only in the count. */}
      {state === 'partial' && !locked && (
        <p className="shortlist-foot partial">
          <Icon name="clock" size={15} />
          Saved, and incomplete. {SHORTLIST_MAX - rows.length} more to name before{' '}
          {responseDeadline.label} — until then housing stays open on your checklist.
        </p>
      )}

      {state === 'partial' && locked && (
        <p className="shortlist-foot partial">
          <Icon name="info" size={15} />
          You named {rows.length} of {SHORTLIST_MAX}. {housingOffice} assigns from what was submitted,
          and will place you somewhere you did not name if none of these is free.
        </p>
      )}

      {state === 'complete' && !locked && (
        <p className="shortlist-foot">
          <Icon name="check" size={15} />
          Saved. Change the order any time before {responseDeadline.label} — every change saves on its
          own.
        </p>
      )}
    </section>
  );
}
