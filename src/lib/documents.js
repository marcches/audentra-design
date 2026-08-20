/**
 * What a document requirement is doing, said in the student's terms —
 * ENR-165, behaviour from ENR-158 AC 1.
 *
 * ## Why this is not `lib/help.js`
 *
 * Help owns four states too — `received`, `working`, `needs-you`, `answered` —
 * and the temptation to collapse the two tables into one is real. Do not. They
 * describe different things and one of them would end up lying.
 *
 * A Help request is a **conversation**: the student started it, an office is
 * replying, and it ends when she is satisfied. A document requirement is a
 * **decision about an artefact**: Aster started it, a reviewer either accepts
 * the file or does not, and it ends when the file is good enough. "In progress"
 * is a fair thing to say about a conversation and a useless thing to say about a
 * file sitting in a queue, which is why this table says who holds it and how
 * long that usually takes instead.
 *
 * ## The two waits
 *
 * `checking` and `in-review` look like one state and are not:
 *
 *   - **checking** is the machine's part — the file arrived, it opens, it is the
 *     format it claimed. Bounded, fast, nobody is deciding anything. It is the
 *     only transition this prototype is allowed to make on its own.
 *   - **in-review** is the institution's part — a person at the owning office
 *     has the submission and has not decided.
 *
 * So: **checking advances on a clock; in review never does.** A timer that
 * flipped a submission to `accepted` would put words in a reviewer's mouth, and
 * ENR-146 puts the reviewer's decision out of scope. Every decision in this
 * prototype is fixture data.
 */

import { offices } from '../help-data.js';

export const DOCUMENT_STATES = {
  needed: {
    label: 'Not sent yet',
    tone: 'act',
    holder: 'you',
    // Names the office, so a card where every row is `needed` is not six
    // identical grey sentences under six identical amber tiles. A line that
    // repeats down the whole card is texture, not information.
    line: (office) => `Not sent yet · ${office.name} is waiting for it`,
  },
  checking: {
    label: 'Sent',
    tone: 'progress',
    holder: 'nobody',
    line: () => 'Aster is checking it. You can close this page — it keeps going.',
  },
  'in-review': {
    label: 'In review',
    tone: 'wait',
    holder: 'aster',
    // ENR-158 AC 4: name who holds the next step, and how long it usually takes.
    line: (office) => `With ${office.name} · usually ${office.reply}`,
  },
  accepted: {
    label: 'Accepted',
    tone: 'done',
    holder: 'nobody',
    line: () => 'Accepted. Nothing more is needed here.',
  },
  'changes-requested': {
    label: 'Changes requested',
    tone: 'stop',
    holder: 'you',
    line: (office) => `Sent back by ${office.name}`,
  },
};

/** The two states where the student owes the next move. Card one is exactly this set. */
const HERS = new Set(['needed', 'changes-requested']);

export function officeOf(item) {
  return offices[item.office] ?? offices.admissions;
}

export function latestSubmission(requirement) {
  const list = requirement.submissions ?? [];
  return list.length > 0 ? list[list.length - 1] : null;
}

export function latestDecision(requirement) {
  const last = latestSubmission(requirement);
  return last?.decision ?? null;
}

/**
 * Derived, never stored. A stored state beside a stored history is two facts
 * that can disagree, and the one the student sees would be the one that is
 * wrong. The history is the record; this reads it.
 */
export function stateOf(requirement) {
  const last = latestSubmission(requirement);
  if (!last) return 'needed';
  if (last.checking) return 'checking';
  if (!last.decision) return 'in-review';
  return last.decision.outcome === 'accepted' ? 'accepted' : 'changes-requested';
}

export function stateInfo(requirement) {
  return DOCUMENT_STATES[stateOf(requirement)] ?? DOCUMENT_STATES.needed;
}

export function needsYou(requirements) {
  return requirements.filter((item) => HERS.has(stateOf(item)));
}

/** Everything settled or moving: card two, newest first. */
export function onRecord(requirements) {
  return requirements.filter((item) => !HERS.has(stateOf(item)));
}

/**
 * The section's one figure and the single line under it. Accepted over total,
 * because that is the standing — the same shape as My Enrollment's progress,
 * for the same reason: it is a count of what is settled out of what was asked.
 */
export function standing(requirements) {
  const total = requirements.length;
  const accepted = requirements.filter((item) => stateOf(item) === 'accepted').length;
  const mine = needsYou(requirements).length;
  const withAster = requirements.filter((item) =>
    ['checking', 'in-review'].includes(stateOf(item)),
  ).length;

  return { total, accepted, mine, withAster, percent: total ? (accepted / total) * 100 : 0 };
}

/**
 * ENR-158 AC 5. The portal cannot send an email and will not pretend to, so the
 * half of that criterion this repo can honour is that a decision she has not
 * seen is *marked* — on the row, and as a count on the sidebar — rather than
 * sitting silently in a list she has to re-read. Opening it clears the mark.
 */
export function unreadDecisions(requirements) {
  return requirements.filter((item) => latestDecision(item)?.unread).length;
}

export function markDecisionRead(requirements, id) {
  return requirements.map((item) => {
    if (item.id !== id) return item;
    const list = item.submissions ?? [];
    if (list.length === 0) return item;
    const last = list[list.length - 1];
    if (!last.decision?.unread) return item;
    return {
      ...item,
      submissions: [
        ...list.slice(0, -1),
        { ...last, decision: { ...last.decision, unread: false } },
      ],
    };
  });
}

/**
 * ENR-157 AC 5. Refused before the upload, against the rule it broke, so the
 * student learns the rule from the requirement rather than from a failure.
 *
 * ENR-209 Scenario 5 adds the size and the count, and adds a rule about how a
 * refusal behaves: it names **which** file broke which limit, and the files that
 * are within the limits are kept. A refusal that clears the whole selection
 * would be the silent discard the scenario is written against.
 */
export function refuse(requirement, file) {
  const accepts = requirement.accepts;
  if (!accepts) return null;
  const name = typeof file === 'string' ? file : file.name;
  const bytes = typeof file === 'string' ? 0 : (file.bytes ?? 0);

  const dot = name.lastIndexOf('.');
  const ext = dot === -1 ? '' : name.slice(dot + 1).toUpperCase();
  if (!accepts.formats.includes(ext === 'JPEG' ? 'JPG' : ext)) {
    return `${name} is a ${ext || 'file with no'} file. This one takes ${listFormats(accepts.formats)}.`;
  }

  if (bytes && bytes > accepts.maxMb * 1024 * 1024) {
    return `${name} is over the ${accepts.maxMb} MB this one takes. Everything else you chose is still here.`;
  }

  return null;
}

/** Stated when the selection is already full, before the picker is opened again. */
export function refuseCount(requirement, chosen, incoming) {
  const max = requirement.accepts?.maxFiles ?? 1;
  if (chosen + incoming <= max) return null;
  if (max === 1) return 'This one takes a single file. Remove the one you chose to send a different one.';

  const room = Math.max(0, max - chosen);
  if (room === 0) return `${max} files is the limit for this one, and you have ${chosen}. Remove one to add another.`;

  // Says what happened, not what would fit: she has already chosen, and the
  // screen has to tell her which of her files are on it.
  const dropped = chosen + incoming - max;
  return `This one takes ${max} files. ${room === 1 ? 'One was' : `${room} were`} added; ${
    dropped === 1 ? 'the last one was' : `the last ${dropped} were`
  } not.`;
}

/**
 * Where a requirement's **first** submission is made. ENR-165 established that a
 * requirement has exactly one door, so a duplicate submission has nowhere to
 * come from; ENR-206 only moves the immunization record's door from the
 * checklist step to the Health section. Both screens read this, so neither can
 * point somewhere the other does not.
 */
const DOORS = {
  task: {
    id: 'task',
    line: 'This one is a step on your checklist, and that is where it is sent from — so there is only ever one place it can be submitted.',
    label: 'Open the step',
  },
  health: {
    id: 'health',
    route: '#/health',
    line: 'This one lives in your Health section, with the question Accessibility Services asked — so there is only ever one place it can be sent from.',
    label: 'Open Health',
  },
};

export function doorOf(requirement) {
  return DOORS[requirement.door ?? 'task'] ?? DOORS.task;
}

/** What a submission carried, as one line. The count leads once there is more than one. */
export function filesLabel(submission) {
  const files = submission?.files ?? [];
  if (files.length === 0) return '';
  if (files.length === 1) return files[0].name;
  return `${files.length} files`;
}

export function listFormats(formats) {
  if (formats.length < 2) return formats.join('');
  return `${formats.slice(0, -1).join(', ')} or ${formats[formats.length - 1]}`;
}

/**
 * A replacement is **appended**, never written over the submission it replaces —
 * ENR-157 AC 7 and ENR-158 Scenario 4 are the same rule seen from two sides. It
 * lands in `checking`, which is the only state this prototype advances by itself.
 */
export function addSubmission(requirements, id, files) {
  return requirements.map((item) => {
    if (item.id !== id) return item;
    const list = item.submissions ?? [];
    return {
      ...item,
      submissions: [
        ...list,
        { id: `${id}-${list.length + 1}`, files, sent: 'just now', checking: true },
      ],
    };
  });
}

/** The clock's one move: the machine finished, a person now has it. Nothing further. */
export function finishChecking(requirements, id) {
  return requirements.map((item) => {
    if (item.id !== id) return item;
    const list = item.submissions ?? [];
    if (list.length === 0) return item;
    const last = list[list.length - 1];
    if (!last.checking) return item;
    const { checking, ...rest } = last;
    return { ...item, submissions: [...list.slice(0, -1), rest] };
  });
}

/** A send that never arrived leaves no submission at all — the record stays honest. */
export function dropSubmission(requirements, id, submissionId) {
  return requirements.map((item) =>
    item.id === id
      ? { ...item, submissions: (item.submissions ?? []).filter((s) => s.id !== submissionId) }
      : item,
  );
}

export function checkingOne(requirements) {
  return requirements.find((item) => stateOf(item) === 'checking') ?? null;
}

export function rejectedOne(requirements) {
  return requirements.find((item) => stateOf(item) === 'changes-requested') ?? null;
}
