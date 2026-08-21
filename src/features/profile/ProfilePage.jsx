import { Fragment, useEffect, useMemo, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import FieldRow from './FieldRow.jsx';
import PermissionGrant from './PermissionGrant.jsx';
import ProfileRail from './ProfileRail.jsx';
import {
  RECORD_CATEGORIES,
  channelOptions,
  elsewhere,
  registrarContact,
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
 * to, never copied — one record, one place, ENR-174 AC 4.
 *
 * Like My Classrooms, this page reads the raw preview value rather than
 * `frameState`: `empty` means "a record opened today" here, which is a real
 * state of this screen and not the frame's idea of nothing.
 */
export default function ProfilePage({ destination, state, onToast }) {
  const { groups, version, updated, ownership, blanks } = useMemo(
    () => buildProfile(state),
    [state],
  );
  const identity = identityFor(state);
  const unchecked = state === 'partial';

  const [channel, setChannel] = useState('portal');
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [grants, setGrants] = useState(() => grantsFor(state));

  // The preview control switches the record underneath the page; what the
  // student changed on the old one must not survive onto the new one.
  useEffect(() => {
    setGrants(grantsFor(state));
    setChoiceOpen(false);
  }, [state]);

  const mobile = groups
    .flatMap((group) => group.fields)
    .find((field) => field.id === 'mobile');
  // Choosing text while the number is still pending is allowed, and the row
  // says what Aster will actually do until the number is verified — AC 4 and
  // AC 5 meeting on one row.
  const textBlocked = channel === 'text' && mobile?.verify?.state !== 'verified';

  function editField(field) {
    onToast(
      `${field.value ? 'Changing' : 'Adding'} your ${field.label.toLowerCase()} would open here — nothing is saved yet.`,
    );
  }

  function askOffice(office) {
    onToast(`A message to ${office.name} would open here — nothing is sent yet.`);
  }

  function runVerify(field) {
    onToast(
      field.verify.state === 'pending'
        ? 'A new code would be texted to that number — nothing is sent yet.'
        : `Confirming your ${field.label.toLowerCase()} would open here — nothing is sent yet.`,
    );
  }

  function chooseChannel(id) {
    setChannel(id);
    const [, label] = channelOptions.find(([value]) => value === id);
    onToast(`Aster will reach you by ${label.toLowerCase()} first. That takes effect now.`);
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
    setGrants((current) => current.filter((item) => item.id !== grant.id));
    onToast(`${grant.person.name} can no longer see anything in your record. That took effect now.`);
  }

  const hero = {
    kicker: `Profile · Version ${version} · Updated ${updated}`,
    title: `This is what Aster knows about you, ${identity.firstName}.`,
  };

  const summary = (
    <>
      {/* The shared figure cell, not a fifth arrangement of the same three
          lines. The mark is the only part a section chooses. */}
      <SummaryFigure
        mark={
          <span className="profile-avatar" aria-hidden="true">
            {identity.initials}
          </span>
        }
        label="What you control"
        figure={`${ownership.yours} of ${ownership.total} details are yours`}
      >
        {blanks > 0 ? `${blanks} of them are still blank. ` : ''}
        The other {ownership.total - ownership.yours} belong to an office, named on the row.
      </SummaryFigure>
      <AdvisorBar
        advisor={registrarContact}
        onContact={(way) =>
          onToast(
            `${way === 'email' ? 'An email' : 'A message'} to ${registrarContact.name} at the Registrar would open here — nothing is sent yet.`,
          )
        }
      />
    </>
  );

  const note = (
    <p className="record-note ownership">
      <Icon name="shield" size={15} />
      <span>
        Everything under <strong>Yours to change</strong> you can change here, and the change takes
        effect at once. Everything under <strong>Aster’s record</strong> belongs to the office named
        beside it, and every one of those rows offers the way to reach them.
        {unchecked && (
          <em> We couldn’t check verification just now, so no row on this page claims to be verified.</em>
        )}
        {identity.usingLegalName && (
          <em> Aster is using your legal first name until you set a preferred one.</em>
        )}
      </span>
    </p>
  );

  return (
    <PageShell
      destination={destination}
      hero={hero}
      summaryLabel="What you control"
      summary={summary}
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
            title="We couldn’t check who can see your record"
            action={{
              label: 'Try again',
              icon: 'refresh',
              onClick: () => onToast('Retrying would re-check the permissions you granted.'),
            }}
          >
            Nothing changed while we couldn’t read it, and nobody gained access. Everything else on
            this page loaded normally.
          </StateCard>
        ) : grants.length === 0 ? (
          <StateCard variant="empty" icon="lock" title="Only you can see your record">
            Your record is private by default. Nobody — not a parent, not a sponsor — sees any of it
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

      <section className="section-card" aria-labelledby="elsewhere-title">
        <div className="status-heading">
          <span className="status-icon signpost">
            <Icon name="pin" size={18} />
          </span>
          <div>
            <h2 id="elsewhere-title">What lives somewhere else</h2>
            <p>
              Aster keeps one copy of each of these, in the section that owns it. This page points
              at them rather than repeating them.
            </p>
          </div>
        </div>

        <div className="card-rows elsewhere-list">
          {elsewhere.map((item) => (
            <a className="elsewhere-row" href={item.route} key={item.id}>
              <span className="elsewhere-icon" aria-hidden="true">
                <Icon name={item.icon} size={17} />
              </span>
              <span className="elsewhere-copy">
                <strong>{item.label}</strong>
                <small>{item.note}</small>
              </span>
              <span className="elsewhere-where">
                {item.where}
                <Icon name="arrow" size={15} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}