import { formatMoney, share } from './logic.js';

/**
 * A stacked bar, not a ring.
 *
 * [Rocket Money](https://mobbin.com/screens/ec4485f4-f259-45c2-b26d-d47f161a1c48)
 * draws coverage as a completion donut, which was rejected: a ring implies a
 * settled proportion, and while an award is pending the open segment has no
 * known size. The open segment is hatched for exactly that reason.
 */
export default function CoverageBar({ ledger }) {
  const label = ledger.coverage
    .map((segment) => `${segment.label}, ${formatMoney(segment.amount)}`)
    .join('. ');

  return (
    <div className="coverage">
      <div
        className="coverage-bar"
        role="img"
        aria-label={`Of ${formatMoney(ledger.cost)} for the year: ${label}.`}
      >
        {ledger.coverage.map((segment) => (
          <span
            key={segment.key}
            className={`coverage-segment ${segment.key}${
              segment.key === 'open' && ledger.hasPending ? ' pending' : ''
            }`}
            style={{ width: `${share(segment.amount, ledger.cost)}%` }}
          />
        ))}
      </div>

      <ul className="coverage-legend">
        {ledger.coverage.map((segment) => (
          <li key={segment.key}>
            <i className={`coverage-key ${segment.key}${
              segment.key === 'open' && ledger.hasPending ? ' pending' : ''
            }`} aria-hidden="true" />
            <span>
              <strong>{formatMoney(segment.amount)}</strong>
              {segment.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
