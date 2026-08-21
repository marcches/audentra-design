/**
 * The profile, read for a state — ENR-184.
 *
 * Three states change what the record says, and each of them means something
 * different to a student:
 *
 *   empty    the record was opened today and holds only what the application
 *            gave it. Everything the student owns is blank, and the portal has
 *            no preferred name to greet them with yet.
 *   partial  the record loaded but the verification service did not. A field's
 *            verification becomes `unknown` — never `verified`, because nobody
 *            could look, and ENR-179 AC 5 is about not presenting an unconfirmed
 *            value as confirmed.
 *   ready    everything.
 *
 * The page reads the raw preview value rather than `frameState`, the way My
 * Classrooms does: `empty` means "a new record" here, which is a real state of
 * this screen and not the frame's idea of nothing.
 */

import {
  RECORD_CATEGORIES,
  fieldGroups,
  initialGrants,
  offices,
  record,
} from './data.js';

/**
 * No detail line: the page's own notice says once that verification could not
 * be read, and repeating it under four rows turns one fact into four warnings.
 * The pill stays, because the label is what AC 5 is about.
 */
const UNKNOWN = { state: 'unknown', label: 'Not checked' };

/**
 * The name the portal uses — ENR-179 AC 3, as one function rather than as a
 * string typed into each component. A record with no preferred name falls back
 * to the legal first name, which is exactly what a portal that has never been
 * told otherwise should do.
 */
export function identityFor(state) {
  const preferred = state === 'empty' ? null : record.preferredName;
  const firstName = preferred ?? record.legalFirstName;

  return {
    firstName,
    displayName: `${firstName} ${record.familyName}`,
    initials: `${firstName[0]}${record.familyName[0]}`,
    name: `${firstName} ${record.familyName}`,
    photo: record.photo ?? null,
    standing: record.standing,
    // True when the portal is using the legal name because it has nothing else.
    usingLegalName: !preferred,
  };
}

function viewField(field, state) {
  if (state === 'empty' && field.newBlank) {
    return { ...field, value: null, blank: field.newBlank, verify: null };
  }

  if (state === 'partial' && field.verify) {
    return { ...field, verify: { ...UNKNOWN, action: field.verify.action } };
  }

  return field;
}

/** What the record says today, and the standing the summary panel states. */
export function buildProfile(state) {
  const groups = fieldGroups.map((group) => ({
    ...group,
    fields: group.fields.map((field) => viewField(field, state)),
  }));

  const fields = groups.flatMap((group) => group.fields);
  const yours = fields.filter((field) => field.owner === 'student');

  return {
    groups,
    version: state === 'empty' ? 1 : record.version,
    updated: state === 'empty' ? record.opened : record.updated,
    ownership: { yours: yours.length, total: fields.length },
    // How many of the student's own fields are still waiting on them.
    blanks: yours.filter((field) => !field.value).length,
  };
}

/**
 * `null` is the permission service being unreachable; `[]` is a student who has
 * given nobody access. They read differently on screen because a student who
 * cannot see their own authorizations is owed a different sentence from one who
 * has none — ENR-144 is about consent, and silence is not consent.
 */
export function grantsFor(state) {
  if (state === 'partial') return null;
  if (state === 'empty') return [];
  return initialGrants;
}

/**
 * A card's rows in two runs: what the student changes, then what an office
 * does. Labelling the run once is what replaced a `Yours` pill on every row —
 * twelve pills of the same shape read as texture, not as a distinction, and the
 * boundary between the two runs says more than any of them did (ENR-179 AC 1).
 *
 * The office run names its office in the label when there is only one, which is
 * every card we have; the row keeps its own route regardless, because AC 2 is
 * about the field and not about the group it happens to sit in.
 */
export function runsFor(group) {
  const yours = group.fields.filter((field) => field.owner === 'student');
  const owned = group.fields.filter((field) => field.owner !== 'student');
  const ownerIds = [...new Set(owned.map((field) => field.owner))];

  const runs = [];
  if (yours.length) {
    runs.push({
      id: 'yours',
      label: 'Yours to change',
      icon: 'pen',
      hint: `${yours.length} details`,
      fields: yours,
    });
  }
  if (owned.length) {
    runs.push({
      id: 'office',
      label: 'Aster’s record',
      icon: 'lock',
      hint: ownerIds.length === 1 ? offices[ownerIds[0]].name : 'An office changes these',
      fields: owned,
    });
  }
  return runs;
}

export function categoryById(id) {
  return RECORD_CATEGORIES.find((category) => category.id === id) ?? null;
}
