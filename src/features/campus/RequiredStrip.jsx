import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import GateChip from '../registration/GateChip.jsx';
import { configFor, isGating } from '../registration/logic.js';
import { dateTile, rowRegistration, weekdayDate } from './logic.js';

/**
 * The obligations on My Campus Life — ENR-189, rebuilt after the Jam of 2026-08-20 and again after
 * the review of 2026-08-21 (C1, C2, C6, C7).
 *
 * It sits in the main column **above the tabs, in every viewport**: an obligation must not be able
 * to hide behind a tab the student did not open, and the rail is where this screen keeps reference
 * material — a session that blocks class registration is not reference material. The viewport
 * switch that used to lead the rail with it at 1060px and up is gone; the rail card is not
 * re-created.
 *
 * The head is the section treatment every other card wears — the heading of the only mandatory
 * block on the screen used to be the smallest heading in the portal — with the mark in the
 * office's colour and one support line: these rows come from other offices and are not a choice
 * (rule 3). Each row says what she has to do about it: the registration control the events carry
 * (or its label, where there is nothing to do yet) and *Add to calendar* — a session that cannot be
 * missed is the strongest candidate on the screen for a calendar entry. The title opens the drawer,
 * which holds the requirement note, the requirer and the place.
 *
 * [Lyssna](https://mobbin.com/screens/a0775aa3-ba76-46fd-a1cb-c4cabc9a1dbb): the next session is
 * its own block above the list, a date tile and the action at the row's edge — taken.
 * [PayPal](https://mobbin.com/screens/14c8559c-723a-4e4e-87ec-a19ee816c28e): the obligation is a
 * line plus a way in, never a card that restates itself — kept.
 */
export default function RequiredStrip({ events, previewState = 'ready', onOpen, onAct, onCalendar }) {
  // ENR-214 AC 1. The strip asks whether the id gates; it never names one.
  const gateConfig = configFor(previewState);

  return (
    <section className="section-card required-strip" aria-labelledby="required-heading">
      <div className="status-heading">
        <span className="status-icon required" aria-hidden="true">
          <Icon name="alert" size={20} />
        </span>
        <div>
          <h2 id="required-heading">Required for you</h2>
          <p>These come from other offices. They aren’t campus life, and they aren’t optional.</p>
        </div>
        <span className="result-count">
          {events.length} {events.length === 1 ? 'session' : 'sessions'}
        </span>
      </div>

      <div className="card-rows">
        {events.map((event) => {
          const tile = dateTile(event.date);
          const registration = rowRegistration(event, false);

          return (
            <div key={event.id} className="required-row">
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
                <span className="required-row-title">
                  <button
                    type="button"
                    className="row-title-button"
                    onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
                  >
                    {event.title}
                  </button>
                </span>
                {isGating(event.id, gateConfig) && <GateChip />}
                <span className="required-row-meta">
                  <span className="required-row-where">
                    <Icon name="pin" size={12} /> {event.location ?? 'Location to be announced'}
                  </span>
                  <span>
                    <Icon name="shield" size={12} /> Required by {event.requiredBy}
                  </span>
                </span>
              </span>

              <span className="campus-row-actions required-row-actions">
                {registration.control ? (
                  <Button
                    kind="secondary"
                    icon={registration.control.icon}
                    onClick={() => onAct(event, registration.control)}
                  >
                    {registration.control.label}
                  </Button>
                ) : (
                  <span className="campus-row-action required">{registration.label}</span>
                )}
                <button type="button" className="text-button" onClick={() => onCalendar(event)}>
                  <Icon name="calendar" size={14} /> Add to calendar
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
