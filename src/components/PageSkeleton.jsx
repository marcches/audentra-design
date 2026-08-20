/**
 * The loading state of any page. Skeleton rows rather than a spinner, so the
 * layout does not jump when the content arrives.
 */
export default function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading this section.</span>
      <div className="skeleton-head" aria-hidden="true">
        <span className="skeleton-line short" />
        <span className="skeleton-line title" />
        <span className="skeleton-line lede" />
      </div>
      <div className="skeleton-card" aria-hidden="true">
        <span className="skeleton-line" />
        <span className="skeleton-line" />
        <span className="skeleton-line short" />
      </div>
      <div className="skeleton-card" aria-hidden="true">
        <span className="skeleton-line" />
        <span className="skeleton-line short" />
      </div>
    </div>
  );
}
