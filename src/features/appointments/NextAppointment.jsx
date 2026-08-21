import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import { placeOf, relativeDay, shortWeekdayDate, timeRange } from './logic.js';

/**
 * The slot My Enrollment gives its progress ring and My Financials its balance. The figure a
 * student comes to this section for is **when the next conversation is** — not how many they have
 * had ([Lyssna](https://mobbin.com/screens/2491d855-da01-47af-bb7e-aff0504f2f93)).
 *
 * Beside it, the person who will be in the room. When nothing is booked there is still someone who
 * owns the student's file, so the bar never empties — it just stops naming an appointment.
 */
export default function NextAppointment({
  next,
  type,
  today,
  advisor,
  openTimes,
  unavailable,
  onContact,
}) {
  return (
    <>
      <div className="next-appointment">
        <span className="panel-label">Your next conversation</span>

        {next ? (
          <strong className="next-figure">
            {shortWeekdayDate(next.date)} · {next.time}
            <span className="when-chip">{relativeDay(next.date, today)}</span>
          </strong>
        ) : (
          <strong className="next-figure none">Nothing booked</strong>
        )}

        <p>
          {next
            ? `${type.label} with ${type.person.name} · ${timeRange(next)} · ${placeOf(
                type,
                next.format,
              )}.`
            : unavailable
              ? 'Your conversations loaded, but the times Aster’s teams published did not. Nothing can be booked until they do.'
              : openTimes > 0
                ? `${openTimes} times are open across Aster’s teams. Picking one is the whole of booking — there is nothing to wait for afterwards.`
                : 'No team has published times yet. They appear on this page as each one opens its calendar; you do not have to ask for that.'}
        </p>
      </div>

      <AdvisorBar advisor={advisor} onContact={onContact} />
    </>
  );
}
