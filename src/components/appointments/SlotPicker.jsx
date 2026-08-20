import Icon from '../../Icon.jsx';
import { dateTile } from '../../lib/campus-helpers.js';
import { slotParts, weekdayShort } from '../../lib/appointments.js';

/**
 * The change the card is about: a free date and time field becomes a picker over what the
 * institution published.
 *
 * A day strip of the days that exist ([Headspace](https://mobbin.com/screens/3d59765f-ae34-4aa7-b295-51fd9c6239d6)),
 * then one column of times grouped by part of the day, with **`No availability` printed for a part
 * that has none** ([Square](https://mobbin.com/screens/5c191789-20a8-4f82-8ee5-2f0be71714b4)). The
 * absence is stated in place; it never appears as a gap the student has to interpret.
 *
 * There is no free field anywhere in here, and that is the point (ENR-178 Scenario 2).
 */
export default function SlotPicker({ days, day, slotId, team, onDay, onSlot }) {
  return (
    <>
      <div className="day-strip" role="group" aria-label="Days this team has published">
        {days.map((entry) => {
          const tile = dateTile(entry.date);
          const active = entry.date === day.date;
          return (
            <button
              key={entry.date}
              className={`day-chip ${active ? 'selected' : ''}`}
              aria-pressed={active}
              onClick={() => onDay(entry.date)}
            >
              <small>{weekdayShort(entry.date)}</small>
              <strong>{tile.day}</strong>
              <span>
                {entry.slots.length} {entry.slots.length === 1 ? 'time' : 'times'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="slot-parts">
        {slotParts(day).map(({ part, slots }) => (
          <div className="slot-part" key={part}>
            <p className="panel-label">{part}</p>
            {slots.length === 0 ? (
              <p className="no-slots">No availability</p>
            ) : (
              <div className="slot-grid" role="group" aria-label={`${part} times`}>
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`slot-chip ${slot.id === slotId ? 'selected' : ''}`}
                    aria-pressed={slot.id === slotId}
                    onClick={() => onSlot(slot)}
                  >
                    {slot.time}
                    {slot.format === 'video' && <Icon name="video" size={13} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="picker-note">
        <Icon name="lock" size={13} />
        These are the times {team} has published. You cannot propose another one here — if none of
        them work, ask them for more.
      </p>
    </>
  );
}
