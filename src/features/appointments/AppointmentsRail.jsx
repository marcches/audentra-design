import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';

/**
 * The rail — the same pair of cards the reference screen carries, since the changes of 2026-08-21
 * (C1). The slot is persistent across the portal; what goes in it is each screen's own choice, and
 * this screen's is the rule, not a metric.
 *
 * The permanent card, in the position and treatment of the guide's momentum card, says how booking
 * works — the one sentence the student actually asks ("why does this team have nothing, have they
 * forgotten me?") — and ends in the link that opens the longer version, the way "How points work"
 * does. No numeral: the aggregate count of times was the second largest text on the screen and led
 * nowhere (T3), and the per-team table repeated the list beside it line for line (C1).
 *
 * The conditional card, in the position and treatment of the guide's skipped card, renders only
 * while a time request is waiting on a team (A7, ADR 0005). The split with the page's band is by
 * whose turn it is: the band is what depends on the student — book, try again, ask; this card is
 * what depends on the team. It is also what keeps the request visible while the history section is
 * closed.
 */
export default function AppointmentsRail({
  publisher,
  unavailable = false,
  requests = [],
  onOpenHow,
  onSeeRequest,
}) {
  return (
    <>
      <AnchorCard variant="booking" label="How this works">
        <p>
          {unavailable
            ? 'The posted times couldn’t be loaded. Conversations you’ve already booked aren’t affected.'
            : 'Each team posts the times it can offer, and picking one books it on the spot. Where a team has nothing posted, Edward can get you a callback from them, and their reply arrives here.'}
        </p>
        <div className="booking-provenance">
          <span>
            <Icon name="clock" size={13} /> Times updated {publisher.updated}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <Icon name="shield" size={13} /> {publisher.system}
          </span>
        </div>
        <button type="button" className="learn-link" onClick={onOpenHow}>
          How this works <Icon name="arrow" size={14} />
        </button>
      </AnchorCard>

      {requests.map(({ appointment, type }) => (
        <div className="skipped-card waiting-card" key={appointment.id}>
          <span className="resume-badge">{type.team}</span>
          <h3>Callback requested</h3>
          <p>
            You asked them to call you on {appointment.requestedOn}. They haven’t replied yet;
            you’ll see it here. Nothing is booked until they do.
          </p>
          <button type="button" onClick={() => onSeeRequest(appointment.id)}>
            See the request <Icon name="arrow" size={16} />
          </button>
        </div>
      ))}
    </>
  );
}
