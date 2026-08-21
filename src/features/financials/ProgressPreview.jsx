import Icon from '../../design-system/Icon.jsx';
import Card from '../../design-system/primitives/Card.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import TermTip from './TermTip.jsx';
import { share } from './logic.js';

function chipFor(metric, started) {
  if (!started || metric.value === null) return { word: 'Not started yet', tone: 'idle' };
  if (metric.invert) return { word: 'Within the limit', tone: 'ok' };
  return metric.above
    ? { word: 'Above the minimum', tone: 'ok' }
    : { word: 'Below the minimum today', tone: 'watch' };
}

/**
 * The panel the card's design brief singles out: *"it shows a preview of an
 * institutional check and must not read as a verdict."*
 *
 * Every row reports and none judges, after
 * [StackAI](https://mobbin.com/screens/a2976bbf-d4f1-407f-8c56-88779215f037).
 * [Basecamp's](https://mobbin.com/screens/b5267b11-e734-4fd9-a433-d45fc3e8d009)
 * risk needle was rejected: a needle in a red zone is a verdict. There is no
 * pass, no fail, no red, and no word that sounds like a decision.
 */
export default function ProgressPreview({ progress, unavailable, onExplain, onRetry }) {
  return (
    <Card variant="progress-preview" aria-labelledby="progress-title">
      <div className="card-heading">
        <span className="card-icon">
          <Icon name="chart" size={19} />
        </span>
        <div>
          <h2 id="progress-title">
            Academic progress preview
            <TermTip term="progress" label="academic progress" />
          </h2>
          <p>A check Aster runs at the end of each term. Not a decision.</p>
        </div>
      </div>

      {unavailable ? (
        <StateCard
          variant="error"
          icon="alert"
          title="Your academic record didn’t load"
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          Nothing about your aid has changed. This panel only reads your record; it never sets it.
        </StateCard>
      ) : (
        <>
          <p className="preview-intro">{progress.intro}</p>
          <p className="preview-check">
            <Icon name="calendar" size={15} /> {progress.firstCheck}
          </p>

          <ul className="metric-list">
            {progress.metrics.map((metric) => {
              const chip = chipFor(metric, progress.started);
              return (
                <li className="metric-row" key={metric.id}>
                  <div className="metric-head">
                    <span className="metric-label">
                      {metric.label}
                      <TermTip term={metric.term} label={metric.label} />
                    </span>
                    <span className={`metric-chip ${chip.tone}`}>{chip.word}</span>
                  </div>
                  <div
                    className={`metric-bar${progress.started ? '' : ' idle'}`}
                    role="img"
                    aria-label={
                      progress.started
                        ? `${metric.label}: ${metric.display}, ${metric.minimumLabel}`
                        : `${metric.label}: not started, ${metric.minimumLabel}`
                    }
                  >
                    <span style={{ width: `${share(metric.value ?? 0, metric.max)}%` }} />
                  </div>
                  <div className="metric-scale">
                    <span>{progress.started ? metric.display : '—'}</span>
                    <span>{metric.minimumLabel}</span>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="preview-disclaimer">
            <Icon name="shield" size={16} />
            This is a preview of a check Aster runs. It is not Aster’s decision — Student Financial
            Services reviews every record individually and tells you directly.
          </p>

          <button className="learn-link" onClick={onExplain}>
            What academic progress means <Icon name="arrow" size={14} />
          </button>
        </>
      )}
    </Card>
  );
}
