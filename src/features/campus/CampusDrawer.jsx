import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import EdwardAsk from '../../design-system/patterns/EdwardAsk.jsx';
import { EDWARD } from '../edward/data.js';
import { INTEREST_NOTE } from './OrgRow.jsx';
import {
  longDate,
  registrationAction,
  registrationHeading,
  shortDate,
} from './logic.js';

/**
 * The depth behind a row. For a club, since the review of 2026-08-21 (C4, Part A §12), the way to
 * the person is the Edward door, and *I'm interested* is here too with the sentence it owes —
 * the drawer offers what the row offers, read at leisure.
 */
export default function CampusDrawer({
  item,
  kind,
  past,
  interested = false,
  onInterested = () => {},
  onContact = () => {},
  onClose,
  onToast,
}) {

  const isEvent = kind === 'event';
  const action = isEvent && !past ? registrationAction(item) : null;

  return (
    <Drawer
      variant="campus"
      label={[item.category, isEvent ? longDate(item.date) : item.meets]}
      titleId="campus-drawer-title"
      closeLabel={isEvent ? 'Close event' : 'Close organization'}
      onClose={onClose}
    >
      <div className={`drawer-icon campus ${item.required ? 'required' : ''}`}>
        <Icon weight="duotone" name={isEvent ? 'calendar' : 'users'} size={25} />
      </div>
      <h2 id="campus-drawer-title">{isEvent ? item.title : item.name}</h2>
      <p className="drawer-description">{isEvent ? item.summary : item.description}</p>

      {item.required && (
        <div className="required-note">
          <span>
            <Icon name="alert" size={17} />
          </span>
          <div>
            <strong>Required by {item.requiredBy}</strong>
            <p>{item.requiredNote}</p>
          </div>
        </div>
      )}

      {past && (
        <div className="past-note">
          <Icon name="clock" size={16} /> This event has passed. It stays here so you can see
          what the year looks like.
        </div>
      )}

      <dl className="campus-facts">
        {isEvent ? (
          <>
            <div>
              <dt>
                <Icon name="calendar" size={15} /> When
              </dt>
              <dd>
                {longDate(item.date)}, {item.time}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="pin" size={15} /> Where
              </dt>
              <dd>
                {item.location ?? 'Location to be announced'}
                {item.format === 'online' && ' · Online'}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="users" size={15} /> Host
              </dt>
              <dd>{item.host}</dd>
            </div>
          </>
        ) : (
          <>
            <div>
              <dt>
                <Icon name="clock" size={15} /> Meets
              </dt>
              <dd>{item.meets}</dd>
            </div>
            <div>
              <dt>
                <Icon name="profile" size={15} /> Contact
              </dt>
              <dd>
                {item.contact.name}, {item.contact.role}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="spark" size={15} /> Latest update
              </dt>
              <dd>
                {item.latestUpdate
                  ? `${item.latestUpdate.text} (${shortDate(item.latestUpdate.date)})`
                  : 'No updates published yet.'}
              </dd>
            </div>
          </>
        )}
      </dl>

      {isEvent ? (
        <div className="register-panel">
          <span className="panel-label">{past ? 'How it worked' : registrationHeading(item)}</span>
          <p>
            {item.registration.detail ??
              `${item.host} has not published registration details yet. They appear here as soon as they do.`}
          </p>
          {action && (
            <button
              className="primary-button full"
              onClick={() =>
                onToast(
                  item.registration.kind === 'email'
                    ? `An email to ${item.registration.contact} would open here. Nothing is sent yet.`
                    : `Registration for ${item.title} would open on Aster’s events site. Nothing is submitted in this preview.`
                )
              }
            >
              {action}{' '}
              <Icon name={item.registration.kind === 'email' ? 'mail' : 'external'} size={17} />
            </button>
          )}
          <small className="prototype-note">
            Preview: Aster handles registration. The portal never registers you for an event.
          </small>
        </div>
      ) : (
        <div className="register-panel">
          <span className="panel-label">How to get in touch</span>
          <p>
            {item.contact.name} runs {item.name} and is the person to ask about joining, coming
            along once, or what a first session is like. Ask Edward and he’ll get you to them.
          </p>
          <div className="drawer-actions">
            <Button
              kind={interested ? 'secondary' : 'primary'}
              full
              icon={interested ? 'check' : 'spark'}
              aria-pressed={interested}
              onClick={() => onInterested(item)}
            >
              {interested ? 'Interested' : 'I’m interested'}
            </Button>
            <EdwardAsk
              label={`Message ${item.contact.name.split(' ')[0]}`}
              mark={EDWARD.mark}
              onClick={() => onContact(item)}
            />
          </div>
          <small className="prototype-note">
            {INTEREST_NOTE} Membership is handled by the organization, not by this portal.
          </small>
        </div>
      )}

      {item.about && (
        <div className="about-panel">
          <h3>{isEvent ? 'About this event' : `About ${item.name}`}</h3>
          <p>{item.about}</p>
        </div>
      )}

      <p className="published-note">
        Published by Aster staff. Nothing on this page changes your enrollment progress or your
        points.
      </p>
    </Drawer>
  );
}
