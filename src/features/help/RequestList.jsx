import Icon from '../../design-system/Icon.jsx';
import RequestRow from './RequestRow.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';

/**
 * Everything she has asked Aster, and where each one got to — ENR-177 AC 2.
 *
 * The three cases are genuinely different and are drawn differently: a list, a
 * student who has never asked anything, and a list that could not be read. The
 * third is the one that is easy to get wrong — an unreachable list drawn as an
 * empty one tells a student that nothing is open when something might be.
 */
export default function RequestList({ requests, open, today, unavailable, onOpen, onAsk, onRetry }) {
  return (
    <section className="section-card" aria-labelledby="requests-heading">
      <div className="status-heading">
        <span className="status-icon accent" aria-hidden="true">
          <Icon name="message" size={20} />
        </span>
        <div>
          <h2 id="requests-heading">Your requests</h2>
          <p>What you have asked</p>
        </div>
        {/* The section's standing, and the way to add to it. Both were in a
            summary panel above the page until the Jam of 2026-08-21, where the
            count sat beside a button standing in for the person every other
            section shows — and this is the one section that may not name one
            (ENR-177 AC 3). Here the count is about the list under it and the
            button is next to what it produces.

            How many are *open* is the number that means something. How many
            exist in total is the length of the list, which is visible. */}
        <div className="requests-standing">
          {!unavailable && requests.length > 0 && (
            <span className="result-count">
              {open > 0 ? `${open} open` : 'All answered'}
            </span>
          )}
          <button className="secondary-button" onClick={onAsk}>
            <Icon name="pen" size={15} /> Ask an office
          </button>
        </div>
      </div>

      {unavailable ? (
        <StateCard
          variant="error"
          icon="alert"
          title="Your requests couldn’t be loaded"
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          Aster’s guides below are unaffected, and so is anything you have already sent. This is the
          list that failed to load, not the requests themselves. Raising a new one still works.
        </StateCard>
      ) : requests.length === 0 ? (
        <StateCard icon="message" title="You haven’t asked Aster anything yet">
          Anything you raise with an office appears here, with what is happening to it and the answer
          when it comes. This page is where Aster replies, so nothing you are told goes missing in an
          inbox.
        </StateCard>
      ) : (
        <div className="card-rows request-rows">
          {requests.map((request) => (
            <RequestRow key={request.id} request={request} today={today} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
