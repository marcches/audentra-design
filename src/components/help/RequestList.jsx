import RequestRow from './RequestRow.jsx';
import StateCard from '../StateCard.jsx';

/**
 * Everything she has asked Aster, and where each one got to — ENR-177 AC 2.
 *
 * The three cases are genuinely different and are drawn differently: a list, a
 * student who has never asked anything, and a list that could not be read. The
 * third is the one that is easy to get wrong — an unreachable list drawn as an
 * empty one tells a student that nothing is open when something might be.
 */
export default function RequestList({ requests, today, unavailable, onOpen, onRetry }) {
  return (
    <section className="section-card" aria-labelledby="requests-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow muted">What you have asked</p>
          <h2 id="requests-heading">Your requests</h2>
        </div>
        {!unavailable && requests.length > 0 && (
          <span className="result-count">
            {requests.length} {requests.length === 1 ? 'request' : 'requests'}
          </span>
        )}
      </div>

      {unavailable ? (
        <StateCard
          variant="error"
          icon="alert"
          title="We couldn’t load your requests"
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          Aster’s guides below are unaffected, and so is anything you have already sent — this is the
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
