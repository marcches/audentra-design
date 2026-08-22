import { Fragment, useEffect, useMemo, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import Avatar from '../../design-system/primitives/Avatar.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import EntryRow from '../../design-system/patterns/EntryRow.jsx';
import GroupTabs from '../../design-system/patterns/GroupTabs.jsx';
import InfoModal from '../../design-system/patterns/InfoModal.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import DocumentsPanel from '../documents/DocumentsPanel.jsx';
import ChannelOverrides from './ChannelOverrides.jsx';
import FieldRow from './FieldRow.jsx';
import OriginsSection from './OriginsSection.jsx';
import PermissionGrant from './PermissionGrant.jsx';
import ProfileRail from './ProfileRail.jsx';
import { RECORD_CATEGORIES, channelOptions, elsewhere, priorRecord } from './data.js';
import { buildProfile, grantsFor, identityFor, runsFor, sharedNames } from './logic.js';

/**
 * Profile — ENR-184, serving ENR-179 under ENR-190; the review of 2026-08-21
 * (C1.1–C1.9, C10.1, C11.3) on top.
 *
 * The page answers one question: *which of this is mine to change, who changes
 * the rest, and who else can see it?* Everything on it is one of those three
 * answers, in that order.
 *
 * It is **sectioned, not scrolled** (C1.3): five leaves under one hero, the
 * way My Financials is — *About me*, *Contact and communication*, *Who can see
 * what*, *My documents*, *Where I came from* — and the tab row under the hero
 * is what changes. The hero's figure is **her own photograph** (C1.1), the one
 * place in the portal a photograph of the student appears, uploaded by her;
 * the legend ("8 of 12 details are yours") and the version line stay above the
 * tabs on every leaf.
 *
 * Two things the epic asked us to fix are structural rather than editorial. The
 * family authorization onboarding captured now lives here, because this is
 * where a student goes looking for it — and since the review it names what is
 * shared, asks once before ending it, and says whose right it is (C1.5, C10.1).
 * And the academic documents panel that duplicated My Documents is gone: what
 * is held elsewhere is named and routed to, never copied — one record, one
 * place, ENR-174 AC 4. My Documents is a section of this page (C1.3), rendered
 * inline by the same `DocumentsPanel` that opened as a side panel before.
 *
 * Like My Classrooms, this page reads the raw preview value rather than
 * `frameState`: `empty` means "a record opened today" here, which is a real
 * state of this screen and not the frame's idea of nothing.
 */
export default function ProfilePage({
  destination,
  tab,
  state,
  record,
  tasks = [],
  sendingId = null,
  failedId = null,
  onSubmit = () => {},
  onMarkRead = () => {},
  onToast = () => {},
  onOpenTask = () => {},
  onOverlay = () => {},
  onRetry = () => {},
}) {
  const active = tab ?? 'profile';
  const { groups, version, updated, ownership, blanks } = useMemo(
    () => buildProfile(state),
    [state],
  );
  const identity = identityFor(state);
  const unchecked = state === 'partial';

  const [channel, setChannel] = useState('portal');
  const [overrides, setOverrides] = useState({});
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [grants, setGrants] = useState(() => grantsFor(state));
  const [ending, setEnding] = useState(null);
  const [documentOpen, setDocumentOpen] = useState(false);
  const [highlight, setHighlight] = useState(null);

  // The preview control switches the record underneath the page; what the
  // student changed on the old one must not survive onto the new one.
  useEffect(() => {
    setGrants(grantsFor(state));
    setChoiceOpen(false);
    setEnding(null);
  }, [state]);

  // "One overlay owns the screen at a time" needs App to hear about an overlay
  // it does not hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(Boolean(ending) || documentOpen);
  }, [ending, documentOpen, onOverlay]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  // A potential match on My Degree cites a line of the prior record and opens
  // this page at it: `#/profile/origins?line=<id>` (C1.8).
  useEffect(() => {
    if (active !== 'profile-origins') {
      setHighlight(null);
      return;
    }
    const query = window.location.hash.split('?')[1];
    setHighlight(query ? new URLSearchParams(query).get('line') : null);
  }, [active]);

  const mobile = groups
    .flatMap((group) => group.fields)
    .find((field) => field.id === 'mobile');
  // Choosing text while the number is still pending is allowed, and the row
  // says what Aster will actually do until the number is verified — AC 4 and
  // AC 5 meeting on one row.
  const textBlocked = channel === 'text' && mobile?.verify?.state !== 'verified';

  function editField(field) {
    if (field.id === 'photo') return changePhoto();
    onToast(
      `${field.value ? 'Changing' : 'Adding'} your ${field.label.toLowerCase()} would open here. Nothing is saved yet.`,
    );
  }

  function changePhoto() {
    onToast(
      identity.photo
        ? 'Changing your photo would open here. Nothing is saved yet.'
        : 'Adding a photo would open here. Nothing is saved yet.',
    );
  }

  function askOffice(office) {
    onToast(`A message to ${office.name} would open here. Nothing is sent yet.`);
  }

  function runVerify(field) {
    onToast(
      field.verify.state === 'pending'
        ? 'A new code would be texted to that number. Nothing is sent yet.'
        : `Confirming your ${field.label.toLowerCase()} would open here. Nothing is sent yet.`,
    );
  }

  function chooseChannel(id) {
    setChannel(id);
    const [, label] = channelOptions.find(([value]) => value === id);
    onToast({
      tone: 'success',
      title: `Aster will reach you by ${label.toLowerCase()} first.`,
      body: 'That takes effect now, for every kind of message you haven’t set apart.',
    });
  }

  // One default, per-category overrides (C1.6). A kind set back to the default
  // follows the default again — the override is removed, not stored.
  function chooseOverride(category, id) {
    setOverrides((current) => {
      const next = { ...current };
      if (id === channel) delete next[category];
      else next[category] = id;
      return next;
    });
    const [, label] = channelOptions.find(([value]) => value === id);
    onToast({
      tone: 'success',
      title:
        id === channel
          ? `${category} follows your default again.`
          : `${category} messages will reach you by ${label.toLowerCase()}.`,
      body: 'That takes effect now.',
    });
  }

  function toggleCategory(grant, category) {
    const shared = grant.granted.includes(category.id);
    setGrants((current) =>
      current.map((item) =>
        item.id === grant.id
          ? {
              ...item,
              granted: shared
                ? item.granted.filter((id) => id !== category.id)
                : [...item.granted, category.id],
            }
          : item,
      ),
    );
    const firstName = grant.person.name.split(' ')[0];
    onToast(
      shared
        ? `${firstName} can no longer see your ${category.name.toLowerCase()}. That took effect now.`
        : `${firstName} can now see your ${category.name.toLowerCase()}. That took effect now.`,
    );
  }

  // Ending access asks once, naming the person and what they will stop seeing
  // (C1.5) — narrowing it does not. The confirmation is the page's; the card
  // only asks for it.
  function endAccess(grant) {
    setGrants((current) => current.filter((item) => item.id !== grant.id));
    setEnding(null);
    onToast({
      tone: 'success',
      title: `${grant.person.name} can no longer see anything in your record.`,
      body: 'That took effect now. You can grant access again from here whenever you want.',
    });
  }

  const hero = {
    kicker: `Profile · Version ${version} · Updated ${updated}`,
    title: 'What Aster knows about you.',
    /* Her own photograph where the orbit was (C1.1): `Avatar` at its largest,
       her initials in the monogram treatment when none is uploaded, and the
       control that changes it under it. */
    figure: (
      <>
        <Avatar person={identity} size="xl" alone />
        <button type="button" className="hero-figure-action" onClick={changePhoto}>
          <Icon name="camera" size={14} /> {identity.photo ? 'Change photo' : 'Add a photo'}
        </button>
      </>
    ),
  };

  /**
   * The legend for the record, above the tabs on every leaf — the Jam of
   * 2026-08-21 took the summary panel off this page, and the panel's figure was
   * this same sentence counted rather than said. Its tone is `quiet` on purpose
   * even when a check has failed: nothing in it is hers to act on.
   */
  const note = (
    <Notice tone="quiet" icon="shield">
      <strong>{ownership.yours} of {ownership.total} details are yours.</strong> Everything under{' '}
      <strong>Yours to change</strong> you can change here, and the change takes effect at once.
      Everything under <strong>Aster’s record</strong> belongs to the office named beside it. Each of
      those rows shows how to reach them.
      {blanks > 0 && <em> {blanks} of yours {blanks === 1 ? 'is' : 'are'} still blank.</em>}
      {unchecked && (
        <em> Verification couldn’t be checked just now, so no row on this page claims to be verified.</em>
      )}
      {identity.usingLegalName && (
        <em> Aster is using your legal first name until you set a preferred one.</em>
      )}
    </Notice>
  );

  function groupCard(group, after = null) {
    return (
      <section className="section-card" key={group.id} aria-labelledby={`${group.id}-title`}>
        <div className="status-heading">
          <span className="status-icon record">
            <Icon name={group.icon} size={18} />
          </span>
          <div>
            <h2 id={`${group.id}-title`}>{group.title}</h2>
            <p>{group.lede}</p>
          </div>
        </div>

        {/* Two runs, each labelled once. The boundary between them is the
            distinction the whole page is about, so it is drawn as a break in
            the list rather than as a tag repeated on every row. */}
        <div className="card-rows field-rows">
          {runsFor(group).map((run) => (
            /* A fragment, not a wrapper: the rows have to stay direct
               children of `.card-rows` or they lose the card's edge-to-edge
               padding and their hairlines stop spanning it. */
            <Fragment key={run.id}>
              <p className={`rows-label ${run.id}`}>
                <Icon name={run.icon} size={12} />
                <span>{run.label}</span>
                <em>{run.hint}</em>
              </p>
              {run.fields.map((field) => (
                <FieldRow
                  key={field.id}
                  field={field}
                  channel={channel}
                  textBlocked={textBlocked}
                  choiceOpen={field.choice ? choiceOpen : false}
                  onToggleChoice={() => setChoiceOpen((open) => !open)}
                  onChannel={chooseChannel}
                  onEdit={editField}
                  onAsk={askOffice}
                  onVerify={runVerify}
                />
              ))}
            </Fragment>
          ))}
        </div>
        {after}
      </section>
    );
  }

  const you = groups.find((group) => group.id === 'you');
  const contact = groups.find((group) => group.id === 'contact');

  return (
    <PageShell
      destination={destination}
      hero={hero}
      /* No summary panel, since the Jam of 2026-08-21. "12 of 20 details are
         yours" is not a standing — nothing about it moves, nothing is pending
         in it, and no student arrives asking it. It is the legend for the
         record, which is what the note already was, so it sits above the tabs
         on every leaf. */
      notice={note}
      tabs={<GroupTabs group="profile" activeId={active} />}
      rail={
        <ProfileRail
          grants={grants}
          onAsk={askOffice}
          onSignOut={() =>
            onToast('Signing out would end this session and return you to Aster’s sign-in page.')
          }
        />
      }
    >
      {active === 'profile' && groupCard(you)}

      {active === 'profile-contact' &&
        groupCard(
          contact,
          <ChannelOverrides defaultId={channel} overrides={overrides} onChange={chooseOverride} />,
        )}

      {active === 'profile-access' && (
        <section className="section-card" aria-labelledby="access-title">
          <div className="status-heading">
            <span className="status-icon private">
              <Icon name="users" size={18} />
            </span>
            <div>
              <h2 id="access-title">Who can see your record</h2>
              <p>
                You set this up when you accepted your offer. It is yours to narrow or end, here,
                whenever you want.
              </p>
            </div>
            {grants !== null && <span className="status-count">{grants.length}</span>}
          </div>

          {/* Whose right it is, said once (C10.1): these are her education
              records, and FERPA makes sharing them her choice to make and to
              withdraw. */}
          <p className="access-right">
            <Icon name="shield" size={14} />
            <span>
              These are your education records. Under FERPA, sharing them is your choice to make
              and to withdraw — nobody at Aster shares them for you.
            </span>
          </p>

          {grants === null ? (
            <StateCard
              variant="warn"
              icon="alert"
              title="Who can see your record couldn’t be checked"
              action={{
                label: 'Try again',
                icon: 'refresh',
                onClick: () => onToast('Retrying would re-check the permissions you granted.'),
              }}
            >
              Nothing changed while it couldn’t be read, and nobody gained access. Everything else
              on this page loaded normally.
            </StateCard>
          ) : grants.length === 0 ? (
            <StateCard variant="empty" icon="lock" title="Only you can see your record">
              Your record is private by default. Nobody, not a parent, not a sponsor, sees any of it
              until you name them and pick the categories yourself. Aster asks about this while you
              enroll, and anything you grant appears here.
            </StateCard>
          ) : (
            <div className="card-rows grant-list">
              {grants.map((grant) => (
                <PermissionGrant
                  key={grant.id}
                  grant={grant}
                  onToggle={toggleCategory}
                  onRevoke={setEnding}
                />
              ))}
            </div>
          )}

          {/* ENR-144's guardrail, said where it can be acted on: the two are
              different things and are never merged into one control. */}
          <p className="card-foot grant-aside">
            <Icon name="info" size={14} />
            <span>
              An emergency contact is a different thing. They are who Aster calls if something
              happens to you, and they get no access to any of the {RECORD_CATEGORIES.length}{' '}
              categories above. Student Life holds yours.
            </span>
          </p>
        </section>
      )}

      {active === 'profile-documents' && (
        <>
          <DocumentsPanel
            inline
            previewState={state}
            record={record}
            sendingId={sendingId}
            failedId={failedId}
            tasks={tasks}
            onSubmit={onSubmit}
            onMarkRead={onMarkRead}
            onToast={onToast}
            onOpenTask={onOpenTask}
            onRetry={onRetry}
            onOverlay={setDocumentOpen}
          />

          {/* The doors to what is genuinely elsewhere. Each is a section in its
              own right; this page points at them rather than repeating them. */}
          <section className="section-card" aria-labelledby="elsewhere-title">
            <div className="status-heading">
              <span className="status-icon signpost">
                <Icon name="pin" size={18} />
              </span>
              <div>
                <h2 id="elsewhere-title">The rest of your record</h2>
                <p>
                  Aster keeps one copy of each of these and never a second. Both are sections of
                  their own, and this page points at them rather than repeating them.
                </p>
              </div>
            </div>
            <div className="card-rows">
              {elsewhere.map((item) => (
                <EntryRow
                  key={item.id}
                  icon={item.icon}
                  title={item.label}
                  note={item.note}
                  where={item.where}
                  href={item.route}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {active === 'profile-origins' && (
        <OriginsSection institutions={priorRecord} highlight={highlight} unavailable={unchecked} />
      )}

      {/* Ending access asks once, and the question names the person and what
          they will stop seeing (C1.5) — Luma's "Remove person" named both;
          Twist's "Yes, I'm absolutely sure" checkbox was rejected as a second
          confirm pointed the wrong way. */}
      {ending && (
        <InfoModal
          variant="access"
          kicker="Who can see what"
          icon="users"
          title={`End ${ending.person.name}’s access?`}
          onClose={() => setEnding(null)}
        >
          <p>
            {ending.person.name.split(' ')[0]} will stop seeing your {sharedNames(ending)}. That
            takes effect now. It is your record, and sharing it is your choice to make and to
            withdraw — you can grant access again later.
          </p>
          <div className="drawer-actions modal-actions">
            <Button kind="primary" icon="close" onClick={() => endAccess(ending)}>
              End access
            </Button>
            <Button kind="secondary" onClick={() => setEnding(null)}>
              Keep sharing
            </Button>
          </div>
        </InfoModal>
      )}
    </PageShell>
  );
}
