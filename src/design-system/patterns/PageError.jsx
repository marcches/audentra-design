import Icon from '../Icon.jsx';

/** The page half of the error state. The frame around it stays usable. */
export default function PageError({ label, onRetry }) {
  return (
    <section className="page-error" role="alert">
      <span className="page-error-icon" aria-hidden="true">
        <Icon name="alert" size={24} />
      </span>
      <h2>Something went wrong loading {label}</h2>
      <p>Nothing you did caused it, and nothing you have sent Aster was affected.</p>
      <button onClick={onRetry}>
        <Icon name="refresh" size={16} /> Try again
      </button>
    </section>
  );
}
