import { useEffect, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import CampusDrawer from './CampusDrawer.jsx';
import CampusRail from './CampusRail.jsx';
import EventRow from './EventRow.jsx';
import OrgRow, { INTEREST_NOTE } from './OrgRow.jsx';
import GroupTabs from '../../design-system/patterns/GroupTabs.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import RequiredStrip from './RequiredStrip.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import { openEdward } from '../edward/door.js';
import {
  CAMPUS_TODAY,
  campusEvents,
  campusOrganisations,
  campusPublisher,
  fullBoardEvents,
  fullBoardOrganisations,
  studentInterests,
} from './data.js';
import {
  categoriesOf,
  contactQuestion,
  groupEvents,
  matchedInterest,
  splitByTime,
} from './logic.js';

/**
 * My Campus Life — ENR-189, behaviour from ENR-187; the review of 2026-08-21 (C1–C10) on top.
 *
 * ENR-180's information architecture makes this a group of two destinations,
 * `#/events` and `#/clubs`. It stays one screen: same hero, same rail and, above
 * all, one block of required sessions that sits above the switch in every
 * viewport, because an obligation must not be able to hide behind a tab the
 * student did not open — and never in the rail, which is where this screen keeps
 * reference material.
 *
 * The Events tab shows **one list at a time** (C3): the view switch drives the
 * whole list — *For you* is the matching events and nothing else, with the way
 * out at its foot; *Everything* is the board by week; *Past* by month — and the
 * count names which list it belongs to. Rows act (C4): a control where there
 * is something to do, a label where there is not, *Follow* on an event,
 * *I'm interested* and the door to the club's person on a club.
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

function toggled(set, id) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
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
  // Two signals the student can leave here, and neither touches her record:
  // following an event is about being reminded; interest in a club shapes what
  // she is shown first (C7). Local to the page in this prototype.
  const [following, setFollowing] = useState(() => new Set());
  const [interested, setInterested] = useState(() => new Set());

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
    list.current?.querySelectorAll('.campus-row .row-title-button')[index]?.focus();
  }, [eventLimit, clubLimit]);

  const active = tab ?? hashTab;
  const board = boardFor(previewState);
  const { upcoming, past } = splitByTime(board.events, CAMPUS_TODAY);
  const required = upcoming.filter((item) => item.required);
  const clubsFailed = previewState === 'partial';

  // One list (C3). `for-you` is the matching events and nothing else; the count
  // says which list it counts.
  const pool = view === 'past' ? past : upcoming;
  const eventCategories = categoriesOf(pool);
  const inCategory =
    eventCategory === 'All' ? pool : pool.filter((item) => item.category === eventCategory);
  const listed =
    view === 'for-you'
      ? inCategory.filter((item) => matchedInterest(item, studentInterests))
      : inCategory;
  const shownEvents = listed.slice(0, eventLimit);
  const countLabel =
    view === 'for-you'
      ? `${listed.length} ${listed.length === 1 ? 'event matches' : 'events match'} your interests`
      : `${listed.length} ${view === 'past' ? 'past ' : ''}${listed.length === 1 ? 'event' : 'events'}`;

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

  // What a row's control does (C4). Registration is Aster's: a booking opens on
  // its events site, an email opens to the named host — the portal never
  // registers her for anything, and says so in the preview.
  function actOn(event, control) {
    onToast(
      control.act === 'email'
        ? `An email to ${control.contact} would open here. Nothing is sent yet.`
        : `Registration for ${event.title} would open on Aster’s events site. Nothing is submitted in this preview.`,
    );
  }

  function addToCalendar(event) {
    onToast({
      tone: 'success',
      title: 'Added to your calendar.',
      body: `${event.title} would download as a calendar file here. Nothing leaves the portal in this preview.`,
    });
  }

  function follow(event) {
    const now = !following.has(event.id);
    setFollowing((current) => toggled(current, event.id));
    onToast(
      now
        ? {
            tone: 'success',
            title: `Following ${event.title}.`,
            body: 'We’ll remind you the day before. This doesn’t change your interests or your points.',
          }
        : { tone: 'success', title: `No longer following ${event.title}.` },
    );
  }

  function interestedIn(org) {
    const now = !interested.has(org.id);
    setInterested((current) => toggled(current, org.id));
    onToast(
      now
        ? { tone: 'success', title: `Noted — ${org.name}.`, body: INTEREST_NOTE }
        : { tone: 'success', title: `${org.name} is no longer marked.` },
    );
  }

  // The contact control is the Edward door (Part A §12): the question written
  // and unsent, the club named, so his answer and the escalation after it are
  // about the right person and the right office.
  function contact(org) {
    openEdward({
      question: contactQuestion(org),
      context: {
        label: `My Campus Life · ${org.name}`,
        intent: 'club',
        clubId: org.id,
        office: 'student-life',
      },
    });
  }

  function rows(items) {
    return items.map((item) => (
      <EventRow
        key={item.id}
        event={item}
        past={view === 'past'}
        matched={view === 'for-you' ? matchedInterest(item, studentInterests) : null}
        following={following.has(item.id)}
        onOpen={(value, node) => openItem(value, 'event', node)}
        onAct={actOn}
        onFollow={follow}
      />
    ));
  }

  // Above the tabs in every viewport (C1) — the shell's `notice` slot is the
  // one place that is above the tab content and never in the rail.
  const requiredStrip =
    required.length === 0 ? null : (
      <RequiredStrip
        events={required}
        previewState={previewState}
        onOpen={(value, node) => openItem(value, 'event', node)}
        onAct={actOn}
        onCalendar={addToCalendar}
      />
    );

  return (
    <PageShell
      destination={destination}
      hero={hero}
      notice={requiredStrip}
      tabs={<GroupTabs group="campus" activeId={active === 'clubs' ? 'clubs' : 'events'} />}
      rail={
        <CampusRail interests={studentInterests} publisher={campusPublisher} onToast={onToast} />
      }
    >
      {active === 'events' ? (
        <section className="section-card" aria-labelledby="events-heading">
          <div className="status-heading">
            <span className="status-icon accent" aria-hidden="true">
              <Icon name="ticket" size={20} />
            </span>
            <div>
              <h2 id="events-heading">Events</h2>
              <p>What’s happening</p>
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
                  {countLabel}
                </span>
              </div>

              {listed.length === 0 ? (
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
                  {view === 'for-you'
                    ? rows(shownEvents)
                    : groupEvents(shownEvents, CAMPUS_TODAY).map((group) => (
                        <div className="date-group" key={group.label}>
                          <p className="subgroup-heading">{group.label}</p>
                          {rows(group.items)}
                        </div>
                      ))}

                  {listed.length > shownEvents.length && (
                    <button
                      className="show-more"
                      onClick={() => {
                        reveal.current = { list: eventList, index: shownEvents.length };
                        setEventLimit((limit) => limit + EVENT_PAGE);
                      }}
                    >
                      Show more <span>{listed.length - shownEvents.length} left</span>
                    </button>
                  )}

                  {/* The way out of the matching list — where "Everything else at
                      Aster" used to be a second section stapled under it (C3). */}
                  {view === 'for-you' && (
                    <p className="list-foot">
                      Not what you’re looking for?{' '}
                      <button type="button" className="text-button" onClick={() => changeView('all')}>
                        See everything Aster has published.
                      </button>
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        <section className="section-card" aria-labelledby="clubs-heading">
          <div className="status-heading">
            <span className="status-icon accent" aria-hidden="true">
              <Icon name="users" size={20} />
            </span>
            <div>
              <h2 id="clubs-heading">Clubs</h2>
              <p>Who you could join</p>
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
                      interested={interested.has(item.id)}
                      onOpen={(value, node) => openItem(value, 'organisation', node)}
                      onInterested={interestedIn}
                      onContact={contact}
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
          interested={open.kind === 'organisation' && interested.has(open.item.id)}
          onInterested={interestedIn}
          onContact={(org) => {
            closeItem();
            contact(org);
          }}
          onClose={closeItem}
          onToast={onToast}
        />
      )}
    </PageShell>
  );
}
