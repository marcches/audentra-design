import Card, { CardFoot, CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import StatedField from '../../design-system/primitives/StatedField.jsx';
import { ORIENTATION_SESSIONS, PRONOUNS, channelOptions, planOptions, residences } from './data.js';
import { shortlistLine } from './logic.js';

/**
 * The panel beside a step — what the step holds, read back.
 *
 * It is the approved prototype's context column: a card that rides beside the
 * content and says, in a column of facts, what the student has put into this
 * step so far. It **mirrors and never controls**: nothing in it is a button,
 * nothing in it decides, and every value on it is `draft`'s — the same object
 * the fields are editing, so it cannot disagree with them. A panel that could
 * act would be a second place to answer the question the step already asks.
 *
 * One foot line per step, and it is the one sentence that qualifies the whole
 * panel: what skipping costs, what the default means, who cannot see what.
 */
const ORDINALS = ['1st choice', '2nd choice', '3rd choice'];

function detailsPanel(draft) {
  const legalFirst = (draft.legalName ?? '').trim().split(' ')[0];
  const preferred = (draft.preferredName ?? '').trim();
  const pronouns = PRONOUNS.find((option) => option.id === draft.pronouns)?.label;
  return {
    title: 'This step',
    line: 'What Aster has, and what you set.',
    rows: [
      preferred
        ? { label: 'What we’ll call you', value: preferred }
        : { label: 'What we’ll call you', value: `${legalFirst}, your legal first name`, quiet: true },
      pronouns
        ? { label: 'Pronouns', value: pronouns }
        : { label: 'Pronouns', value: 'Not set', quiet: true },
    ],
    foot: 'The Registrar keeps your legal name, date of birth and student number. The rest is yours.',
  };
}

function contactPanel(draft) {
  const channel = channelOptions.find(([id]) => id === draft.channel)?.[1];
  const fact = (label, value) =>
    value ? { label, value } : { label, value: 'Not given yet', quiet: true };
  return {
    title: 'How Aster reaches you',
    line: 'Where anything urgent goes.',
    rows: [
      fact('Personal email', draft.email),
      fact('Mobile number', draft.mobile),
      fact('Mailing address', draft.address),
      channel
        ? { label: 'Writes first', value: channel }
        : { label: 'Writes first', value: 'Not chosen yet', quiet: true },
    ],
    foot: 'Anything with a deadline is also written down in the portal.',
  };
}

function emergencyPanel(draft) {
  const name = (draft.emergencyName ?? '').trim();
  const first = name.split(' ')[0];
  const fact = (label, value) =>
    value ? { label, value } : { label, value: 'Not given yet', quiet: true };
  return {
    title: 'Who Aster would call',
    line: 'If something happens to you on campus.',
    rows: [
      fact('Name', name),
      fact('Relationship', (draft.emergencyRelation ?? '').trim()),
      fact('Phone', (draft.emergencyPhone ?? '').trim()),
    ],
    foot: name
      ? `${first} cannot see anything in your record.`
      : 'An emergency contact cannot see anything in your record.',
  };
}

function permissionsPanel(grants) {
  return {
    title: 'Who can see your record',
    line: grants.length
      ? `${grants.length} ${grants.length === 1 ? 'person' : 'people'}, each with only what you ticked.`
      : 'Nobody, and that is a finished answer.',
    rows: grants.length
      ? grants.map((grant) => ({
          label: grant.person.name,
          value: `${grant.granted.length} of 7 things · until ${grant.endsOn}`,
        }))
      : [{ label: 'Authorized', value: 'Nobody, unless you say so', quiet: true }],
    foot: 'You can change this any time from your profile.',
  };
}

function housingPanel(draft) {
  const plan = planOptions.find((option) => option.id === draft.plan) ?? null;
  const rows = [
    plan
      ? { label: 'Your plan', value: plan.label }
      : { label: 'Your plan', value: 'Not answered yet', quiet: true },
  ];
  if (draft.plan === 'on-campus') {
    ORDINALS.forEach((ordinal, index) => {
      const id = draft.shortlist[index];
      const residence = residences.find((item) => item.id === id);
      rows.push(
        residence
          ? { label: ordinal, value: residence.name }
          : { label: ordinal, value: 'Empty', quiet: true },
      );
    });
  }
  return {
    title: 'Your housing plan',
    line: plan ? plan.hint : 'What happens next appears here.',
    rows,
    foot: plan
      ? draft.plan === 'on-campus'
        ? shortlistLine(draft.shortlist)
        : plan.consequence
      : 'Answer the question and what happens next appears here.',
  };
}

function healthPanel(draft) {
  const value =
    draft.answer === 'yes'
      ? 'Yes, I’d like to talk'
      : draft.answer === 'no'
        ? 'Not right now'
        : null;
  return {
    title: 'Your answer',
    line: 'This step is optional.',
    rows: [
      value
        ? { label: 'Accessibility Services', value }
        : { label: 'Accessibility Services', value: 'Not answered yet', quiet: true },
    ],
    foot: 'Not right now is a complete answer. Nothing about it stays open on your checklist.',
  };
}

function photoPanel(draft) {
  return {
    title: 'Your photo',
    line: 'This step is optional.',
    rows: [
      draft.photo
        ? { label: 'File', value: draft.photo }
        : { label: 'File', value: 'None chosen', quiet: true },
    ],
    foot: 'Skipping this costs you nothing but a queue at move-in.',
  };
}

function orientationPanel(draft) {
  const session = ORIENTATION_SESSIONS.find((item) => item.id === draft.session) ?? null;
  return {
    title: 'Your session',
    line: 'Your seat is held the moment you choose.',
    rows: session
      ? [
          { label: 'Session', value: `${session.label} · ${session.when}` },
          { label: 'Where', value: session.where },
        ]
      : [{ label: 'Session', value: 'Not chosen yet', quiet: true }],
    foot: 'Whichever you pick lands in Appointments.',
  };
}

export function panelFor(stepId, draft, grants) {
  switch (stepId) {
    case 'details':
      return detailsPanel(draft);
    case 'contact':
      return contactPanel(draft);
    case 'emergency':
      return emergencyPanel(draft);
    case 'permissions':
      return permissionsPanel(grants);
    case 'housing':
      return housingPanel(draft);
    case 'health':
      return healthPanel(draft);
    case 'photo':
      return photoPanel(draft);
    case 'orientation':
      return orientationPanel(draft);
    default:
      return null;
  }
}

export default function StepPanel({ stepId, draft, grants }) {
  const panel = panelFor(stepId, draft, grants);
  if (!panel) return null;

  return (
    <Card className="step-panel" aria-live="polite">
      {/* A plain head — the title and one line — not the status band: a panel
          this small with a band at each end read as three stripes. The foot
          keeps its band, because it is the one sentence that qualifies the
          card. */}
      <CardHead kind="card" title={panel.title} note={panel.line} />
      <CardRows>
        {panel.rows.map((row) => (
          <StatedField
            key={row.label}
            className="panel-fact"
            label={row.label}
            value={row.value}
            quiet={row.quiet}
          />
        ))}
      </CardRows>
      {panel.foot ? (
        <CardFoot>
          <p>{panel.foot}</p>
        </CardFoot>
      ) : null}
    </Card>
  );
}
