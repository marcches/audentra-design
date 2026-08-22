import { useId, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import { shortDate } from '../campus/logic.js';
import { runningName } from '../edward/logic.js';
import { articled, teamName } from './logic.js';

/**
 * The callback request — Part A of the review of 2026-08-21, §6.2 as §8.3 corrected it; ADR 0010.
 *
 * Where a team has posted no times, the student does not propose one (ENR-178 AC 1): she asks the
 * team to call her, saying when she is usually free and what it is about. It is reached from
 * **Edward's escalation**, never from a row on this screen — the asking left this screen (§12.5)
 * and the door is Edward — which is why the question she already gave him arrives here written.
 *
 * Three things the copy keeps straight: it is not a booking, and says so; the reply time is the one
 * that team publishes, never a constant of ours (§7.2) — a team that publishes none gets no
 * promise; and the reply arrives in the portal, with email only saying it is there (ENR-177 AC 4,
 * AC 6). The item it creates exposes no assignee or team detail beyond the office's name (AC 3).
 *
 * Reference: Deputy's request-in-a-panel — a window, a comment, who receives it, one button —
 * and StackAI's two-field ask; the availability editors were rejected as the office's tool
 * (ENR-181 references.md, 2026-08-22).
 */
export default function CallbackDrawer({ type, reply = null, prefill = null, today, onRequest, onClose }) {
  const ids = useId();
  const [when, setWhen] = useState('');
  const [subject, setSubject] = useState(prefill?.subject ?? '');
  const [sent, setSent] = useState(false);

  const office = runningName(type.team);
  const team = teamName(type);
  const canSend = when.trim().length > 0 && subject.trim().length > 0;

  function send() {
    if (!canSend) return;
    onRequest({
      id: `callback-${type.id}-${Date.now()}`,
      typeId: type.id,
      state: 'requested',
      date: null,
      window: when.trim(),
      subject: subject.trim(),
      requestedOn: shortDate(today),
    });
    setSent(true);
  }

  const foot = !sent && (
    <div className="booking-foot">
      <div className="drawer-actions">
        <Button kind="primary" full icon="send" disabled={!canSend} onClick={send}>
          Send request
        </Button>
        <Button kind="secondary" full onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Drawer
      variant="booking"
      label={['Request a callback']}
      titleId="callback-drawer-title"
      closeLabel="Close"
      onClose={onClose}
      foot={foot}
    >
      {sent ? (
        <div className="booking-result requested">
          <span className="result-icon" aria-hidden="true">
            <Icon name="send" size={24} />
          </span>
          <h2 id="callback-drawer-title">Sent to {office}</h2>
          <p>
            Someone from {office} gets in touch{reply ? `, usually within ${reply}` : ''}. Nothing is
            booked until they do.
          </p>
          <div className="result-facts">
            <p>
              <Icon name="clock" size={15} />
              <span>
                It is in your list as <strong>Callback requested</strong>. Waiting on {office}.
                You’ll see their reply here — an email only tells you it’s waiting.
              </span>
            </p>
          </div>
          <div className="result-actions">
            <Button kind="primary" full icon="check" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="drawer-icon appointment" aria-hidden="true">
            <Icon name="phone" size={25} weight="duotone" />
          </div>
          <h2 id="callback-drawer-title">Ask {office} to call you</h2>
          <p className="drawer-description">
            They don’t have times posted right now. Tell them when you’re usually free and they’ll
            get back to you.
          </p>

          <div className="action-panel">
            <label className="drawer-field" htmlFor={`${ids}-when`}>
              <span className="drawer-field-label">When are you usually free?</span>
              <textarea
                id={`${ids}-when`}
                rows={2}
                required
                aria-required="true"
                aria-describedby={`${ids}-when-help`}
                value={when}
                onChange={(event) => setWhen(event.target.value)}
              />
              <span className="form-help" id={`${ids}-when-help`}>
                Days and rough times are enough.
              </span>
            </label>

            <label className="drawer-field" htmlFor={`${ids}-about`}>
              <span className="drawer-field-label">What’s it about?</span>
              <textarea
                id={`${ids}-about`}
                rows={2}
                required
                aria-required="true"
                aria-describedby={`${ids}-about-help`}
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
              <span className="form-help" id={`${ids}-about-help`}>
                What you told Edward is already here. One line is enough.
              </span>
            </label>

            <p className="picker-note">
              <Icon name="info" size={13} />
              This isn’t a booking. Someone from {office} gets in touch
              {reply ? `, usually within ${reply}` : ''}.
            </p>
          </div>
        </>
      )}
    </Drawer>
  );
}
