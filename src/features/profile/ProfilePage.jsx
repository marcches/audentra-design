import { Fragment, useEffect, useMemo, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import EntryRow from '../../design-system/patterns/EntryRow.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import { panelById } from '../../lib/navigation.js';
import { needsYou } from '../documents/logic.js';
import FieldRow from './FieldRow.jsx';
import PermissionGrant from './PermissionGrant.jsx';
import ProfileRail from './ProfileRail.jsx';
import DocumentsPanel from '../documents/DocumentsPanel.jsx';
import {
  RECORD_CATEGORIES,
  channelOptions,
  elsewhere,
} from './data.js';
import { buildProfile, grantsFor, identityFor, runsFor } from './logic.js';

/**
 * Profile — ENR-184, serving ENR-179 under ENR-190.
 *
 * The page answers one question: *which of this is mine to change, who changes
 * the rest, and who else can see it?* Everything on it is one of those three
 * answers, in that order.
 *
 * Two things the epic asked us to fix are structural rather than editorial. The
 * family authorization onboarding captured now lives here, because this is
 * where a student goes looking for it. And the academic documents panel that
 * duplicated My Documents is gone: what is held elsewhere is named and routed
 * to, never copied — one record, one place, ENR-174 AC 4. Since the Jam of
 * 2026-08-21 My Documents lives *under* this page, and since that afternoon it
 * is a panel rather than a page of its own: the first card is the door, with
 * the record's own standing on it — read from the record App holds, never a
 * copy — and it opens `DocumentsPanel`, where the rest of the portal opens what
 * lives inside a page.
 *
 * Like My Classrooms, this page reads the raw preview value rather than
 * `frameState`: `empty` means "a record opened today" here, which is a real
 * state of this screen and not the frame's idea of nothing.
 */
export default function ProfilePage({
  destination,
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
  const { groups, version, updated, ownership, blanks } = useMemo(
    () => buildProfile(state),
    [state],
  );
  const identity = identityFor(state);
  const unchecked = state === 'partial';

  // The documents standing, from the record itself. `partial` reads as unread,
  // not as settled, the way My Documents reads it.
  const documents = panelById('my-documents');
  const requirements = record?.requirements ?? [];
  const mine = unchecked ? [] : needsYou(requirements);
  const [channel, setChannel] = useState('portal');
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [grants, setGrants] = useState(() => grantsFor(state));
  const [documentsOpen, setDocumentsOpen] = useState(false);

  // The preview control switches the record underneath the page; what the
  // student changed on the old one must not survive onto the new one.
  useEffect(() => {
    setGrants(grantsFor(state));
    setChoiceOpen(false);
    setDocumentsOpen(false);
  }, [state]);

  // "One overlay owns the screen at a time" needs App to hear about an overlay
  // it does not hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(documentsOpen);
  }, [documentsOpen, onOverlay]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  const mobile = groups
    .flatMap((group) => group.fields)
    .find((field) => field.id === 'mobile');
  // Choosing text while the number is still pending is allowed, and the row
  // says what Aster will actually do until the number is verified — AC 4 and
  // AC 5 meeting on one row.
  const textBlocked = channel === 'text' && mobile?.verify?.state !== 'verified';

  function editField(field) {
    onToast(
      `${field.value ? 'Changing' : 'Adding'} your ${field.label.toLowerCase()} would open here. Nothing is saved yet.`,
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

  function revokeGrant(grant) {
    const rank = grants.findIndex((item) => item.id === grant.id);
    setGrants((current) => current.filter((item) => item.id !== grant.id));
    // Undo rather than a confirm, and the ladder's own rule is what decides it:
    // the whole grant is in hand, so putting it back costs nothing, while
    // rebuilding it by hand would cost a name, an email and six checkboxes.
    // Asking a student to confirm twice before *reducing* what she shares is
    // friction pointed the wrong way.
    onToast({
      tone: 'success',
      title: `${grant.person.name} can no longer see anything in your record.`,
      body: 'That took effect now.',
      action: {
        label: 'Undo',
        onAct: () =>
          setGrants((current) => {
            if (current.some((item) => item.id === grant.id)) return current;
            const next = [...current];
            next.splice(rank < 0 ? next.length : rank, 0, grant);
            return next;
          }),
      },
    });
  }

  const hero = {
    kicker: `Profile · Version ${version} · Updated ${updated}`,
    title: 'What Aster knows about you.',
  };

  /**
   * The legend for the two groups below, and now the only thing above them —
   * the Jam of 2026-08-21 took the summary panel off this page, and the panel's
   * figure was this same sentence counted rather than said. The count leads it
   * now, so nothing was lost when the panel went.
   *
   * Its tone is `quiet` on purpose even when a check has failed: nothing in it
   * is hers to act on, and a colour that says otherwise would be a false alarm
   * about her own record.
   */
  const note = (
    <Notice tone="quiet" icon="shield">
      <strong>{ownership.yours} of {ownership.total} details are yours.</strong> Everything under{' '}
      <strong>Yours to change</strong> you can change here, and the change takes effect at once.
      Everything under <strong>Aster’s record</strong> belongs to the office named beside it. Each of
      those rows shows how to reach them.
      {blanks > 0 && <em> {blanks} of yours are still blank.</em>}
      {unchecked && (
        <em> Verification couldn’t be checked just now, so no row on this page claims to be verified.</em>
      )}
      {identity.usingLegalName && (
        <em> Aster is using your legal first name until you set a preferred one.</em>
      )}
    </Notice>
  );

  return (
    <PageShell
      destination={destination}
      hero={hero}
      /* No summary panel, since the Jam of 2026-08-21. "12 of 20 details are
         yours" is not a standing — nothing about it moves, nothing is pending
         in it, and no student arrives asking it. It is the legend for the two
         groups below, which is what the note already was, so the two are now
         one sentence in the one place a legend belongs: above the thing it
         explains. */
      notice={note}
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
      {groups.map((group) => (
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
        </section>
      ))}

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
          {grants !== null && (
            <span className="status-count">{grants.length}</span>
          )}
        </div>

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
            Nothing changed while it couldn’t be read, and nobody gained access. Everything else on
            this page loaded normally.
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
                onRevoke={revokeGrant}
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

      {/* The doors. My Documents leads because it is the only one that can be
          holding something of hers; the other two are sections in their own
          right. All three are the same row, and the trailing cell is what says
          which kind each is — a section's name for a route, `Open` for a panel
          that opens on this page. */}
      <section className="section-card" aria-labelledby="elsewhere-title">
        <div className="status-heading">
          <span className="status-icon signpost">
            <Icon name="pin" size={18} />
          </span>
          <div>
            <h2 id="elsewhere-title">The rest of your record</h2>
            <p>
              Aster keeps one copy of each of these and never a second. My Documents opens here;
              the other two are sections of their own, and this page points at them rather than
              repeating them.
            </p>
          </div>
        </div>

        <div className="card-rows">
          <EntryRow
            icon={documents.icon}
            title={documents.label}
            note={documents.lede}
            count={mine.length}
            where="Open"
            onOpen={() => setDocumentsOpen(true)}
          />
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

      {documentsOpen && (
        <DocumentsPanel
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
          onClose={() => setDocumentsOpen(false)}
        />
      )}
    </PageShell>
  );
}