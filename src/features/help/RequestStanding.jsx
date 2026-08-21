import Icon from '../../design-system/Icon.jsx';

/**
 * The slot My Enrollment gives its progress ring, holding the one figure this
 * section exists to answer: how many questions are with Aster right now.
 *
 * The other half of the slot — the person who owns the subject, the way the
 * balance has an aid advisor beside it — is deliberately not a person here. A
 * named face next to a list of requests reads as *the person handling them*,
 * which is the one thing ENR-177 AC 3 forbids the screen to imply. The action
 * takes that side instead, and the people stay on the pages where they really
 * do own the subject.
 *
 * [Base44](https://mobbin.com/screens/20b9440b-cc9c-4c30-9500-9baa5facb0c8):
 * the count leads, the state of the newest one sits under it as a sentence.
 */
export default function RequestStanding({ open, unavailable, line, onAsk }) {
  return (
    <>
      <div className="request-standing">
        <span className="panel-label">Open requests</span>

        {unavailable ? (
          <strong className="request-figure unknown">Not available</strong>
        ) : (
          <strong className="request-figure">
            {open === 0 ? 'Nothing open' : open}
            {open > 0 && <span className="request-figure-unit">{open === 1 ? 'request' : 'requests'}</span>}
          </strong>
        )}

        <p>{line}</p>
      </div>

      <button className="primary-button" onClick={onAsk}>
        <Icon name="pen" size={16} /> Ask an office
      </button>
    </>
  );
}
