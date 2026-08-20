import Icon from '../Icon.jsx';
import { dateTile, weekdayDate } from '../lib/campus-helpers.js';

/**
 * The obligations on My Campus Life — ENR-189, rebuilt after the Jam of
 * 2026-08-20.
 *
 * It used to be a band with its own icon block, its own heading, its own
 * subtitle and a count badge, and *inside* it one bordered card per session
 * carrying a `REQUIRED` chip, the date, the title, the whole requirement note,
 * two facts and a filled button. One obligation took a quarter of the viewport
 * and said "required" three times before saying anything the student did not
 * already know — a box inside a box, which the design contract forbids.
 *
 * What replaced it is a strip that knows how wide it is. The page has two
 * grids, and this belongs in the second one, so the strip has two layouts and
 * picks between them with a container query rather than a media query — the
 * window is wide in both cases, only the column is not.
 *
 *   wide container    a date tile, the session on one line, the way in at the
 *                     trailing edge. Used when the strip runs the width of a
 *                     one-grid page.
 *   narrow container  no tile — the date moves into the line above the title,
 *                     where it costs nothing — the location drops to the drawer
 *                     that already holds it, and the labelled button becomes
 *                     the chevron the whole row already is.
 *
 * The row is the target and the drawer is the depth either way: the requirement
 * note, the requirer, the place and how to register are all written in
 * `CampusDrawer`, so out here a row says only what a student needs in order to
 * decide to open it.
 *
 * [PayPal](https://mobbin.com/screens/14c8559c-723a-4e4e-87ec-a19ee816c28e):
 * the required action is one line with the way in at its edge, not a panel.
 * [Circle](https://mobbin.com/screens/bbb7b785-2793-4264-9123-5a7a24f8191b):
 * date, title, place under it, the control at the trailing edge.
 */
export default function RequiredStrip({ events, onOpen }) {
  return (
    <section className="section-card required-strip" aria-labelledby="required-heading">
      <h2 className="required-strip-head" id="required-heading">
        <span className="required-strip-mark" aria-hidden="true">
          <Icon name="alert" size={14} />
        </span>
        Required for you
        {/* The two halves of the same sentence. Which one is shown is a
            question of how much room the strip has, so the container query
            below decides — never both at once. */}
        <span className="required-strip-note">
          {events.length === 1
            ? 'One session you have to attend. Everything else on this page is optional.'
            : `${events.length} sessions you have to attend. Everything else on this page is optional.`}
        </span>
        <span className="required-strip-count" aria-hidden="true">
          {events.length}
        </span>
      </h2>

      <div className="card-rows">
        {events.map((event) => {
          const tile = dateTile(event.date);

          return (
            <button
              key={event.id}
              className="required-row"
              onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
            >
              <span className="date-tile" aria-hidden="true">
                <small>{tile.month}</small>
                <strong>{tile.day}</strong>
              </span>

              <span className="required-row-copy">
                <span className="required-row-when">
                  {weekdayDate(event.date)}
                  <i aria-hidden="true">·</i>
                  {event.time}
                </span>
                <span className="required-row-title">{event.title}</span>
                <span className="required-row-meta">
                  <span className="required-row-where">
                    <Icon name="pin" size={12} /> {event.location ?? 'Location to be announced'}
                  </span>
                  <span>
                    <Icon name="shield" size={12} /> Required by {event.requiredBy}
                  </span>
                </span>
              </span>

              <span className="required-row-action">
                <span>
                  {event.registration.kind === 'tba' ? 'What’s required' : 'How to register'}
                </span>
                <Icon name="arrow" size={14} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
