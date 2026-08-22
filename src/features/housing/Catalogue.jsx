import { useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import CatalogueFilters from './CatalogueFilters.jsx';
import CompareTable from './CompareTable.jsx';
import ResidenceRow from './ResidenceRow.jsx';
import { housingOffice } from './data.js';
import { NO_FILTERS, SHORTLIST_MAX, filterCatalogue, orderCatalogue } from './logic.js';

/**
 * The published catalogue.
 *
 * `catalogue === null` and `catalogue.length === 0` are two different failures and must not render
 * the same way. Null is *partial data*: Residential Life published a catalogue and this portal could
 * not read it, so the plan question above still works and nothing already answered is affected.
 * Empty is an institution that has published nothing yet, which is not a failure at all.
 *
 * Two ways to read it since the review of 2026-08-21 (B4.3, G10): the **list**, one card per hall
 * with its picture, and the **compare** view, the same halls as columns of the attributes the cards
 * show, which is where the filters live. The two sorts — the rate and the walk, the pair students
 * actually trade against each other — apply to both. Eight rows, or forty, are meant to be read;
 * a filter narrows the compare view and never to nothing.
 */
export default function Catalogue({
  catalogue,
  shortlist,
  sort,
  onSort,
  readOnly,
  onAdd,
  onOpen,
  onSeeShortlist,
  onToast,
}) {
  const [view, setView] = useState('list');
  const [filters, setFilters] = useState(NO_FILTERS);

  const head = (
    <div className="status-heading">
      <span className="status-icon accent" aria-hidden="true">
        <Icon name="buildings" size={20} />
      </span>
      <div>
        <h2 id="catalogue-heading">Residences</h2>
        <p>Published by {housingOffice}</p>
      </div>
      {catalogue?.length > 0 && (
        <div className="sort-group" aria-label="Order the residence halls">
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
      )}
    </div>
  );

  if (catalogue === null) {
    return (
      <section className="section-card" aria-labelledby="catalogue-heading">
        {head}
        <StateCard
          variant="error"
          icon="alert"
          title="The residence hall catalog couldn’t be loaded"
          action={{
            label: 'Try again',
            icon: 'refresh',
            onClick: () => onToast(`Retrying would reload the catalog from ${housingOffice}.`),
          }}
        >
          Your housing plan above loaded normally and is unaffected. Only the list of residence halls is
          missing. Nothing you have already answered or ranked has been lost.
        </StateCard>
      </section>
    );
  }

  if (catalogue.length === 0) {
    return (
      <section className="section-card" aria-labelledby="catalogue-heading">
        {head}
        <StateCard icon="home" title="No residence halls published yet">
          {housingOffice} publishes the residence halls open to your year here, each with its rooms, its
          rate and its meal plan. They appear on this page as soon as they are published. You don’t
          need to do anything, and your plan above is answerable either way.
        </StateCard>
      </section>
    );
  }

  const ordered = orderCatalogue(catalogue, sort);
  const shown = view === 'compare' ? filterCatalogue(ordered, filters) : ordered;
  const full = shortlist.length >= SHORTLIST_MAX;

  return (
    <section className="section-card" aria-labelledby="catalogue-heading">
      {head}

      <div className="catalogue-tools">
        <div className="sort-group" aria-label="How to read the residence halls">
          <button
            type="button"
            className={view === 'list' ? 'selected' : ''}
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
          >
            <Icon name="rows" size={15} /> List
          </button>
          <button
            type="button"
            className={view === 'compare' ? 'selected' : ''}
            aria-pressed={view === 'compare'}
            onClick={() => setView('compare')}
          >
            <Icon name="columns" size={15} /> Compare
          </button>
        </div>
        {view === 'compare' && (
          <span className="view-count" aria-live="polite">
            {shown.length} of {catalogue.length} residence halls
          </span>
        )}
      </div>

      {readOnly && (
        <p className="panel-lede">
          You can read every residence hall here while you decide. Ranking opens once you answer that you
          are living on campus.
        </p>
      )}

      {view === 'compare' ? (
        <>
          <CatalogueFilters catalogue={ordered} filters={filters} onChange={setFilters} />
          <CompareTable
            residences={shown}
            shortlist={shortlist}
            canAdd={!full}
            readOnly={readOnly}
            onAdd={onAdd}
            onOpen={onOpen}
            onSeeShortlist={onSeeShortlist}
          />
        </>
      ) : (
        <div className="card-rows residence-list">
          {shown.map((residence) => (
            <ResidenceRow
              key={residence.id}
              residence={residence}
              rankIndex={shortlist.indexOf(residence.id)}
              canAdd={!full}
              readOnly={readOnly}
              onAdd={onAdd}
              onOpen={onOpen}
              onSeeShortlist={onSeeShortlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}
