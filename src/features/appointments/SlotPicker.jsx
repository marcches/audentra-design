import Icon from '../../design-system/Icon.jsx';
import { dateTile } from '../campus/logic.js';
import { formatNote, slotParts, weekdayShort } from './logic.js';

/**
 * The change the card is about: a free date and time field becomes a picker over what the
 * institution published.
 *
 * A day strip of the days that exist ([Headspace](https://mobbin.com/screens/3d59765f-ae34-4aa7-b295-51fd9c6239d6)),
 * then one column of times grouped by part of the day, with **`No availability` printed for a part
 * that has none** ([Square](https://mobbin.com/screens/5c191789-20a8-4f82-8ee5-2f0be71714b4)). The
 * absence is stated in place; it never appears as a gap the student has to interpret.
 *
 * Selecting a time books nothing — it only marks. The note under the list says the format of the
 * time that is marked (9.5 of the changes of 2026-08-21): in person and where, or a video call. It
 * reserves its line before a time is chosen so the list does not jump when one is.
 */
export default function SlotPicker({ type, days, day, slot, onDay, onSlot }) {
  return (
    <>
      <div className="day-strip" role="group" aria-label="Days this team has published">
        {days.map((entry) => {
          const tile = dateTile(entry.date);
          const active = entry.date === day.date;
          return (
            <button
              key={entry.date}
              type="button"
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
                {slots.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className={`slot-chip ${entry.id === slot?.id ? 'selected' : ''}`}
                    aria-pressed={entry.id === slot?.id}
                    onClick={() => onSlot(entry)}
                  >
                    {entry.time}
                    {entry.format === 'video' && <Icon name="video" size={13} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="picker-note" aria-live="polite">
        {slot ? (
          <>
            <Icon name={slot.format === 'video' ? 'video' : 'pin'} size={13} />
            {formatNote(type, slot.format)}
          </>
        ) : null}
      </p>
    </>
  );
}
