import Icon from '../../design-system/Icon.jsx';
import ResidenceRow from './ResidenceRow.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import { housingOffice } from './data.js';
import { SHORTLIST_MAX, rateFrom } from './logic.js';

/**
 * The published catalogue.
 *
 * `catalogue === null` and `catalogue.length === 0` are two different failures and must not render
 * the same way. Null is *partial data*: Housing Services published a catalogue and this portal could
 * not read it, so the plan question above still works and nothing already answered is affected.
 * Empty is an institution that has published nothing yet, which is not a failure at all.
 *
 * Sorting is the only affordance here, and it exists because the two fields students actually trade
 * against each other are the rate and the walk. It is not a filter: eight rows, or forty, are meant
 * to be read.
 */
export default function Catalogue({
  catalogue,
  shortlist,
  sort,
  onSort,
  readOnly,
  onAdd,
  onOpen,
  onToast,
}) {
  if (catalogue === null) {
    return (
      <section className="section-card" aria-labelledby="catalogue-heading">
        <div className="status-heading">
          <span className="status-icon accent" aria-hidden="true">
            <Icon name="buildings" size={20} />
          </span>
          <div>
            <h2 id="catalogue-heading">Residences</h2>
            <p>Published by {housingOffice}</p>
          </div>
        </div>
        <StateCard
          variant="error"
          icon="alert"
          title="The residence catalog couldn’t be loaded"
          action={{
            label: 'Try again',
            icon: 'refresh',
            onClick: () => onToast(`Retrying would reload the catalog from ${housingOffice}.`),
          }}
        >
          Your housing plan above loaded normally and is unaffected. Only the list of residences is
          missing. Nothing you have already answered or ranked has been lost.
        </StateCard>
      </section>
    );
  }

  if (catalogue.length === 0) {
    return (
      <section className="section-card" aria-labelledby="catalogue-heading">
        <div className="status-heading">
          <span className="status-icon accent" aria-hidden="true">
            <Icon name="buildings" size={20} />
          </span>
          <div>
            <h2 id="catalogue-heading">Residences</h2>
            <p>Published by {housingOffice}</p>
          </div>
        </div>
        <StateCard icon="home" title="No residences published yet">
          {housingOffice} publishes the residences open to your year here, each with its rooms, its
          rate and its meal plan. They appear on this page as soon as they are published. You don’t
          need to do anything, and your plan above is answerable either way.
        </StateCard>
      </section>
    );
  }

  const ordered = [...catalogue].sort((a, b) =>
    sort === 'walk' ? a.walk - b.walk : rateFrom(a) - rateFrom(b),
  );
  const full = shortlist.length >= SHORTLIST_MAX;

  return (
    <section className="section-card" aria-labelledby="catalogue-heading">
      <div className="status-heading">
        <span className="status-icon accent" aria-hidden="true">
          <Icon name="buildings" size={20} />
        </span>
        <div>
          <h2 id="catalogue-heading">Residences</h2>
          <p>Published by {housingOffice}</p>
        </div>
        <div className="sort-group" aria-label="Order the residences">
          <button
            className={sort === 'rate' ? 'selected' : ''}
            aria-pressed={sort === 'rate'}
            onClick={() => onSort('rate')}
          >
            <Icon name="receipt" size={15} /> Lowest rate
          </button>
          <button
            className={sort === 'walk' ? 'selected' : ''}
            aria-pressed={sort === 'walk'}
            onClick={() => onSort('walk')}
          >
            <Icon name="pin" size={15} /> Closest
          </button>
        </div>
      </div>

      {readOnly && (
        <p className="panel-lede">
          You can read every residence here while you decide. Ranking opens once you answer that you
          are living on campus.
        </p>
      )}

      <div className="card-rows residence-list">
        {ordered.map((residence) => (
          <ResidenceRow
            key={residence.id}
            residence={residence}
            rankIndex={shortlist.indexOf(residence.id)}
            canAdd={!full}
            readOnly={readOnly}
            onAdd={onAdd}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}
