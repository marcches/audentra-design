import { useEffect, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import CampusDrawer from './CampusDrawer.jsx';
import CampusRail from './CampusRail.jsx';
import EventRow from './EventRow.jsx';
import OrgRow from './OrgRow.jsx';
import GroupTabs from '../../design-system/patterns/GroupTabs.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import RequiredStrip from './RequiredStrip.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import {
  CAMPUS_TODAY,
  campusEvents,
  campusOrganisations,
  campusPublisher,
  fullBoardEvents,
  fullBoardOrganisations,
  studentInterests,
} from './data.js';
import { categoriesOf, groupEvents, matchedInterest, splitByTime } from './logic.js';
import { RAIL_QUERY, useMedia } from '../../lib/overlay.js';

/**
 * My Campus Life — ENR-189, behaviour from ENR-187.
 *
 * ENR-180's information architecture makes this a group of two destinations,
 * `#/events` and `#/clubs`. It stays one screen: same hero, same rail and, above
 * all, one band of required events that sits above the switch, because an
 * obligation must not be able to hide behind a tab the student did not open.
 *
 * `loading` and `error` are the frame's states and never reach this component —
 * App renders PageSkeleton and PageError before dispatching. What is left here
 * is what only this section can express: nothing published, a half-loaded board,
 * and the density the card asks about.
 */
/** The states this section adds to the frame's. `full-board` is the density test. */
export const CAMPUS_PREVIEW_STATES = [
  ['ready', 'Ready', 'One required session, thirteen events and six clubs.'],
  ['full-board', 'Full board', 'Three required sessions, forty-three events, eighteen clubs.'],
  ['loading', 'Loading', 'Before the published board arrives.'],
  ['partial', 'Partial data', 'Events loaded; the club list did not.'],
  ['error', 'Error', 'Nothing Student Life published could be loaded.'],
  ['empty', 'Nothing published', 'Before Student Life publishes anything at all.'],
];

const EVENT_PAGE = 6;
const CLUB_PAGE = 4;

function boardFor(previewState) {
  if (previewState === 'full-board') {
    return { events: fullBoardEvents, clubs: fullBoardOrganisations };
  }
  if (previewState === 'empty') return { events: [], clubs: [] };
  return { events: campusEvents, clubs: campusOrganisations };
}

function tabFromHash() {
  return window.location.hash.startsWith('#/clubs') ? 'clubs' : 'events';
}

export default function CampusPage({
  destination,
  previewState = 'ready',
  tab,
  onToast = () => {},
  onOverlay = () => {},
}) {
  const [hashTab, setHashTab] = useState(tabFromHash);
  const [view, setView] = useState('for-you');
  const [eventCategory, setEventCategory] = useState('All');
  const [clubCategory, setClubCategory] = useState('All');
  const [eventLimit, setEventLimit] = useState(EVENT_PAGE);
  const [clubLimit, setClubLimit] = useState(CLUB_PAGE);
  const [open, setOpen] = useState(null);

  // Whether the page is actually two grids right now — see the placement note
  // on `requiredStrip` below.
  const twoGrids = useMedia(RAIL_QUERY);

  // "One overlay owns the screen at a time" needs App to hear about an overlay
  // it does not itself hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(Boolean(open));
  }, [onOverlay, open]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  const returnFocus = useRef(null);
  const eventList = useRef(null);
  const clubList = useRef(null);
  const reveal = useRef(null);

  useEffect(() => {
    const onHashChange = () => setHashTab(tabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!reveal.current) return;
    const { list, index } = reveal.current;
    reveal.current = null;
    list.current?.querySelectorAll('.campus-row')[index]?.focus();
  }, [eventLimit, clubLimit]);

  const active = tab ?? hashTab;
  const board = boardFor(previewState);
  const { upcoming, past } = splitByTime(board.events, CAMPUS_TODAY);
  const required = upcoming.filter((item) => item.required);
  const clubsFailed = previewState === 'partial';

  const pool = view === 'past' ? past : upcoming;
  const eventCategories = categoriesOf(pool);
  const filteredEvents =
    eventCategory === 'All' ? pool : pool.filter((item) => item.category === eventCategory);
  const matched =
    view === 'for-you'
      ? filteredEvents.filter((item) => matchedInterest(item, studentInterests))
      : [];
  const ordered =
    view === 'for-you'
      ? [...matched, ...filteredEvents.filter((item) => !matched.includes(item))]
      : filteredEvents;
  const shownEvents = ordered.slice(0, eventLimit);

  const clubCategories = categoriesOf(board.clubs);
  const filteredClubs =
    clubCategory === 'All'
      ? [...board.clubs].sort(
          (a, b) =>
            (matchedInterest(a, studentInterests) ? 0 : 1) -
            (matchedInterest(b, studentInterests) ? 0 : 1),
        )
      : board.clubs.filter((item) => item.category === clubCategory);
  const shownClubs = filteredClubs.slice(0, clubLimit);

  const nothingPublished = board.events.length === 0 && board.clubs.length === 0;

  // The band is the shell's now — same gradient, same geometry as every other
  // section. What stays here is the only part that cannot be written in advance:
  // how many sessions Student Life has made required today.
  const hero = {
    lede: nothingPublished
      ? `Events, clubs, and the people who run them are published here by ${campusPublisher.office}. Nothing is up yet. This page fills itself in as they publish.`
      : `Events, clubs, and the people who run them, published by ${campusPublisher.office}. ${
          required.length === 0
            ? 'Nothing here is required. It’s all yours to choose.'
            : `${
                required.length === 1 ? 'One session is' : `${required.length} sessions are`
              } required. Everything else is yours to choose.`
        }`,
  };

  function openItem(item, kind, node) {
    returnFocus.current = node ?? null;
    setOpen({ item, kind, past: kind === 'event' && item.date < CAMPUS_TODAY });
  }

  function closeItem() {
    setOpen(null);
    returnFocus.current?.focus();
  }

  function changeView(next) {
    setView(next);
    setEventCategory('All');
    setEventLimit(EVENT_PAGE);
  }

  function pickEventCategory(category) {
    setEventCategory(category);
    setEventLimit(EVENT_PAGE);
  }

  function pickClubCategory(category) {
    setClubCategory(category);
    setClubLimit(CLUB_PAGE);
  }

  function rows(items) {
    return items.map((item) => (
      <EventRow
        key={item.id}
        event={item}
        past={view === 'past'}
        matched={view === 'for-you' ? matchedInterest(item, studentInterests) : null}
        onOpen={(value, node) => openItem(value, 'event', node)}
      />
    ));
  }

  // An obligation must not be able to hide behind a tab the student did not open
  // — ENR-189. Where that lands depends on how many grids the page has, which
  // is the one layout fact CSS cannot express from inside a slot:
  //
  //   two grids   the strip leads the rail. The rail is sticky and shared by
  //               both leaves, so the obligation stays on screen for the whole
  //               scroll instead of being a full-width band you pass once — and
  //               a single session stops spending the width of the page to say
  //               one sentence.
  //   one grid    `.page-rail` reflows *under* the main column below 1060px, so
  //               in the rail the obligation would end up beneath forty events.
  //               There it goes back to `notice`, which is above the tabs.
  //
  // The component is the same in both; it reads its own width with a container
  // query and stacks when it is narrow, so the rail needs no second variant.
  const requiredStrip =
    required.length === 0 ? null : (
      <RequiredStrip
        events={required}
        previewState={previewState}
        onOpen={(value, node) => openItem(value, 'event', node)}
      />
    );

  return (
    <PageShell
      destination={destination}
      hero={hero}
      notice={twoGrids ? null : requiredStrip}
      tabs={<GroupTabs group="campus" activeId={active === 'clubs' ? 'clubs' : 'events'} />}
      rail={
        <>
          {twoGrids && requiredStrip}
          <CampusRail interests={studentInterests} publisher={campusPublisher} onToast={onToast} />
        </>
      }
    >
      {active === 'events' ? (
        <section className="section-card" aria-labelledby="events-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow muted">What’s happening</p>
              <h2 id="events-heading">Events</h2>
            </div>
            {board.events.length > 0 && (
              <div className="sort-group" aria-label="Choose which events to see">
                <button
                  className={view === 'for-you' ? 'selected' : ''}
                  aria-pressed={view === 'for-you'}
                  onClick={() => changeView('for-you')}
                >
                  <Icon name="spark" size={15} /> For you
                </button>
                <button
                  className={view === 'all' ? 'selected' : ''}
                  aria-pressed={view === 'all'}
                  onClick={() => changeView('all')}
                >
                  Everything
                </button>
                <button
                  className={view === 'past' ? 'selected' : ''}
                  aria-pressed={view === 'past'}
                  onClick={() => changeView('past')}
                >
                  Past
                </button>
              </div>
            )}
          </div>

          {board.events.length === 0 ? (
            <StateCard icon="calendar" title="No events published yet">
              {campusPublisher.office} publishes talks, socials, volunteering shifts and orientation
              sessions here. The first one they publish appears on this page straight away. You
              don’t need to do anything.
            </StateCard>
          ) : (
            <>
              <div className="filter-row">
                <div className="filter-chips" role="group" aria-label="Filter events by category">
                  <button
                    className={eventCategory === 'All' ? 'selected' : ''}
                    aria-pressed={eventCategory === 'All'}
                    onClick={() => pickEventCategory('All')}
                  >
                    All
                  </button>
                  {eventCategories.map((category) => (
                    <button
                      key={category}
                      className={eventCategory === category ? 'selected' : ''}
                      aria-pressed={eventCategory === category}
                      onClick={() => pickEventCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <span className="result-count" aria-live="polite">
                  {filteredEvents.length} {view === 'past' ? 'past ' : ''}
                  {filteredEvents.length === 1 ? 'event' : 'events'}
                </span>
              </div>

              {filteredEvents.length === 0 ? (
                <StateCard
                  icon="calendar"
                  title={
                    view === 'past'
                      ? 'No past events yet'
                      : view === 'for-you' && eventCategory === 'All'
                        ? `Nothing matches ${studentInterests.join(' or ')} right now`
                        : `No ${eventCategory} events in this view`
                  }
                  action={
                    view === 'for-you' && eventCategory === 'All'
                      ? { label: 'Show everything', onClick: () => changeView('all') }
                      : eventCategory !== 'All'
                        ? { label: 'Clear filter', onClick: () => pickEventCategory('All') }
                        : undefined
                  }
                >
                  {view === 'past'
                    ? 'Events move here once their date has passed. Nothing is deleted.'
                    : 'Aster publishes new events every week, so this is worth checking again.'}
                </StateCard>
              ) : (
                <div className="card-rows campus-list" ref={eventList}>
                  {view === 'for-you' ? (
                    <>
                      {shownEvents.some((item) => matched.includes(item)) && (
                        <div className="list-group">
                          <p className="group-heading">
                            Picked for your interests <span>{matched.length}</span>
                          </p>
                          {rows(shownEvents.filter((item) => matched.includes(item)))}
                        </div>
                      )}
                      {shownEvents.some((item) => !matched.includes(item)) && (
                        <div className="list-group">
                          <p className="group-heading">Everything else at Aster</p>
                          {groupEvents(
                            shownEvents.filter((item) => !matched.includes(item)),
                            CAMPUS_TODAY,
                          ).map((group) => (
                            <div className="date-group" key={group.label}>
                              <p className="subgroup-heading">{group.label}</p>
                              {rows(group.items)}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    groupEvents(shownEvents, CAMPUS_TODAY).map((group) => (
                      <div className="date-group" key={group.label}>
                        <p className="subgroup-heading">{group.label}</p>
                        {rows(group.items)}
                      </div>
                    ))
                  )}

                  {ordered.length > shownEvents.length && (
                    <button
                      className="show-more"
                      onClick={() => {
                        reveal.current = { list: eventList, index: shownEvents.length };
                        setEventLimit((limit) => limit + EVENT_PAGE);
                      }}
                    >
                      Show more <span>{ordered.length - shownEvents.length} left</span>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        <section className="section-card" aria-labelledby="clubs-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow muted">Who you could join</p>
              <h2 id="clubs-heading">Clubs</h2>
            </div>
            {!clubsFailed && board.clubs.length > 0 && (
              <span className="result-count" aria-live="polite">
                {filteredClubs.length} {filteredClubs.length === 1 ? 'club' : 'clubs'}
              </span>
            )}
          </div>

          {clubsFailed && (
            <StateCard
              variant="error"
              icon="alert"
              title="The club list couldn’t be loaded"
              action={{
                label: 'Try again',
                icon: 'refresh',
                onClick: () => onToast('Retrying would reload the club list from Aster.'),
              }}
            >
              Events loaded normally. Only this list is missing, and nothing you have already done
              is affected. If it keeps happening, ask {campusPublisher.coordinator.name} at{' '}
              {campusPublisher.office}.
            </StateCard>
          )}

          {!clubsFailed && board.clubs.length === 0 && (
            <StateCard icon="users" title="No clubs published yet">
              Clubs, societies and volunteering groups appear here once {campusPublisher.office}{' '}
              publishes them, each with the person to contact and what they have been up to lately.
            </StateCard>
          )}

          {!clubsFailed && board.clubs.length > 0 && (
            <>
              <div className="filter-row">
                <div className="filter-chips" role="group" aria-label="Filter clubs by category">
                  <button
                    className={clubCategory === 'All' ? 'selected' : ''}
                    aria-pressed={clubCategory === 'All'}
                    onClick={() => pickClubCategory('All')}
                  >
                    All
                  </button>
                  {clubCategories.map((category) => (
                    <button
                      key={category}
                      className={clubCategory === category ? 'selected' : ''}
                      aria-pressed={clubCategory === category}
                      onClick={() => pickClubCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {filteredClubs.length === 0 ? (
                <StateCard
                  icon="users"
                  title={`No ${clubCategory} clubs in this view`}
                  action={{ label: 'Clear filter', onClick: () => pickClubCategory('All') }}
                >
                  {campusPublisher.office} adds organizations through the year.
                </StateCard>
              ) : (
                <div className="card-rows campus-list" ref={clubList}>
                  {shownClubs.map((item) => (
                    <OrgRow
                      key={item.id}
                      org={item}
                      matched={matchedInterest(item, studentInterests)}
                      onOpen={(value, node) => openItem(value, 'organisation', node)}
                    />
                  ))}
                  {filteredClubs.length > shownClubs.length && (
                    <button
                      className="show-more"
                      onClick={() => {
                        reveal.current = { list: clubList, index: shownClubs.length };
                        setClubLimit((limit) => limit + CLUB_PAGE);
                      }}
                    >
                      Show more <span>{filteredClubs.length - shownClubs.length} left</span>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      )}

      {open && (
        <CampusDrawer
          item={open.item}
          kind={open.kind}
          past={open.past}
          onClose={closeItem}
          onToast={onToast}
        />
      )}
    </PageShell>
  );
}
