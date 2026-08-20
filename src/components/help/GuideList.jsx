import Icon from '../../Icon.jsx';
import { offices } from '../../help-data.js';
import { shortDate } from '../../lib/campus-helpers.js';

/**
 * What Aster has already published, so that the answer to a question Aster has
 * answered before does not cost anybody two business days.
 *
 * [Bard](https://mobbin.com/screens/c7135f10-40d1-42f1-80fd-e9dd6c080249): a
 * plain accordion of topics, no thumbnails and no illustration. The corpus is
 * prose, and prose does not need a cover image.
 *
 * Every guide names the office that published it and when. A guide whose author
 * is the product rather than an office is guidance nobody can be held to.
 */
export default function GuideList({ guides, open, onToggle }) {
  return (
    <section className="section-card" aria-labelledby="guides-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow muted">Answered in advance</p>
          <h2 id="guides-heading">Aster’s guides</h2>
        </div>
        <span className="result-count">{guides.length} guides</span>
      </div>

      <div className="card-rows guide-rows">
        {guides.map((guide) => {
          const expanded = open.includes(guide.id);
          return (
            <div className="guide-row" key={guide.id}>
              <button
                className="guide-toggle"
                aria-expanded={expanded}
                aria-controls={`guide-${guide.id}`}
                onClick={() => onToggle(guide.id)}
              >
                <span className="status-icon guide" aria-hidden="true">
                  <Icon name="book" size={17} />
                </span>
                <span>
                  <strong>{guide.topic}</strong>
                  <span className="guide-office">{offices[guide.office].name}</span>
                </span>
                <span className={`guide-chevron ${expanded ? 'open' : ''}`} aria-hidden="true">
                  <Icon name="chevron" size={18} />
                </span>
              </button>

              {expanded && (
                <div className="guide-body" id={`guide-${guide.id}`}>
                  {guide.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="guide-source">
                    Published by {offices[guide.office].name} · updated {shortDate(guide.updated)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
