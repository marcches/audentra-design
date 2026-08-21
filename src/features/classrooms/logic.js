import { doubleCountRules, program, requirementGroups } from './data.js';

const STATUS_LABELS = {
  satisfied: 'Satisfied',
  'in-progress': 'In progress',
  'not-started': 'Not started',
  pending: 'Credits pending sync',
};

/**
 * The whole ENR-186 guardrail lives in this signature: the only inputs are
 * credit the Registrar has approved and credit the requirement asks for. A
 * potential match is not a parameter, and neither is the plan (brief, rule 3),
 * and neither can become one without changing every call site — which is the
 * point.
 */
export function requirementStatus(requirement) {
  const { creditsApproved, creditsRequired } = requirement;
  if (creditsApproved == null) return 'pending';
  if (creditsApproved <= 0) return 'not-started';
  if (creditsApproved >= creditsRequired) return 'satisfied';
  return 'in-progress';
}

export function statusLabel(status) {
  return STATUS_LABELS[status] ?? STATUS_LABELS['not-started'];
}

export function statusIcon(status) {
  if (status === 'satisfied') return 'check';
  if (status === 'in-progress') return 'half';
  if (status === 'pending') return 'clock';
  return 'circle';
}

/** Approved credit only. Matches are counted separately and never summed in. */
export function creditTotals(requirements) {
  return requirements.reduce(
    (totals, requirement) => {
      const status = requirementStatus(requirement);
      return {
        approved: totals.approved + (requirement.creditsApproved ?? 0),
        met: totals.met + (status === 'satisfied' ? 1 : 0),
        pending: totals.pending + (status === 'pending' ? 1 : 0),
        total: totals.total + 1,
      };
    },
    { approved: 0, met: 0, pending: 0, total: 0 },
  );
}

/**
 * The free-elective figure is a remainder, not a requirement (brief, D9): what
 * the degree asks for beyond the named requirements, minus any elective credit
 * already approved. It has no standing, so it is a line, never a row.
 */
export function electiveRemaining(requirements) {
  const required = requirements.reduce((sum, requirement) => sum + requirement.creditsRequired, 0);
  return Math.max(
    0,
    program.creditsToGraduate - required - (program.electiveCreditsApproved ?? 0),
  );
}

/** Credit a match would add if it were approved. Reported, never added. */
export function creditsUnderReview(matches) {
  return (matches ?? []).reduce((sum, match) => sum + match.target.credits, 0);
}

export function matchesFor(matches, requirementId) {
  return (matches ?? []).filter((match) => match.target.requirementId === requirementId);
}

/** The match whose target is this course, if one is waiting (brief, D4). */
export function matchTargeting(matches, courseCode) {
  return (matches ?? []).find((match) => match.target.courseCode === courseCode) ?? null;
}

export function confidenceLabel(confidence) {
  return confidence === 'likely' ? 'Likely' : 'Needs review';
}

/**
 * The one status family that expresses uncertainty takes an icon (brief, D12):
 * a gauge for a reading the rule matches, a magnifying glass for one a person
 * still has to look at. Neither is a check, because a check means decided.
 */
export function confidenceIcon(confidence) {
  return confidence === 'likely' ? 'gauge' : 'magnify';
}

export function groupRequirements(requirements) {
  return requirementGroups
    .map((group) => ({
      ...group,
      requirements: requirements.filter((requirement) => requirement.group === group.id),
    }))
    .filter((group) => group.requirements.length > 0);
}

/**
 * Which requirements open on load: the ones in progress, and only those
 * (brief, D16). A requirement with a match waiting used to open too; the
 * pointer on its head and the band now take the student there instead.
 */
export function defaultOpenRequirements(requirements) {
  return requirements
    .filter((requirement) => requirementStatus(requirement) === 'in-progress')
    .map((requirement) => requirement.id);
}

/* ------------------------------------------------------------------ *
 * The courses inside a requirement, read by situation rather than by catalog
 * order (brief, D3).
 * ------------------------------------------------------------------ */

export const COURSE_GROUPS = [
  { id: 'counted', label: 'Counted' },
  { id: 'now', label: 'You can take this term' },
  { id: 'later', label: 'Later terms' },
  { id: 'blocked', label: 'Blocked for now' },
];

export function offeredThisTerm(course, term = program.currentTerm) {
  return course.terms.split(' and ').includes(term);
}

/**
 * 'counted'  approved and allocated here
 * 'now'      offered this term and no unmet prerequisite
 * 'later'    prerequisite met but not offered this term
 * 'blocked'  unmet prerequisite
 */
export function courseSituation(course) {
  if (course.state === 'approved') return 'counted';
  if (course.state === 'locked') return 'blocked';
  return offeredThisTerm(course) ? 'now' : 'later';
}

/** The four groups, in order, each only when it has rows. */
export function groupCourses(requirement) {
  return COURSE_GROUPS.map((group) => ({
    ...group,
    courses: requirement.courses.filter((course) => courseSituation(course) === group.id),
  })).filter((group) => group.courses.length > 0);
}

export function takeableCourses(requirement) {
  return requirement.courses.filter((course) => courseSituation(course) === 'now');
}

/** A course the student may add to her plan: takeable now, or in a later term. */
export function plannable(course) {
  const situation = courseSituation(course);
  return situation === 'now' || situation === 'later';
}

/* ------------------------------------------------------------------ *
 * Lines the brief adds to the rows.
 * ------------------------------------------------------------------ */

const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];

/**
 * What is left, in courses (brief, D2). The requirement's own sentence when it
 * has one; otherwise a count when every eligible course carries the same
 * credit value, and the credit gap when they do not — the brief's rule for
 * mixed values. Nothing for a satisfied requirement, and nothing while the
 * credit has not synced, because a sentence about what is left would then be
 * a guess.
 */
export function remainingLine(requirement) {
  const status = requirementStatus(requirement);
  if (status === 'satisfied' || status === 'pending') return null;
  if (requirement.remaining) return requirement.remaining;

  const gap = requirement.creditsRequired - (requirement.creditsApproved ?? 0);
  const eligible = requirement.courses.filter((course) => course.state !== 'approved');
  const values = new Set(eligible.map((course) => course.credits));
  if (values.size === 1) {
    const per = [...values][0];
    const count = Math.ceil(gap / per);
    const word = WORDS[count] ?? String(count);
    return `${word} more ${count === 1 ? 'course finishes' : 'courses finish'} this.`;
  }
  return `${gap} more credits finish this.`;
}

function nameOfSide(id, requirements) {
  const group = requirementGroups.find((item) => item.id === id);
  if (group) return `the ${group.name}`;
  return requirements.find((item) => item.id === id)?.name ?? id;
}

/**
 * Which requirements this course counts toward (brief, D1). Three states, a
 * fixed vocabulary, and the student never chooses:
 *
 *   double   a pair rule names this requirement — counts toward both, under
 *            the rule's ID, in the same dress a match's "Rule TR-14" wears;
 *   counted  approved and allocated here;
 *   single   counts here and cannot also count elsewhere — not elective credit.
 */
export function countsToward(course, requirement, requirements) {
  const rule = doubleCountRules.find((item) => item.between.includes(requirement.id));
  if (rule) {
    const other = rule.between.find((id) => id !== requirement.id);
    return {
      kind: 'double',
      rule: rule.id,
      text: `Counts toward ${requirement.name} and ${nameOfSide(other, requirements)}, under Rule ${rule.id}.`,
    };
  }
  if (course.state === 'approved') {
    return { kind: 'counted', text: `Counts toward ${requirement.name}.` };
  }
  return { kind: 'single', text: `Counts toward ${requirement.name}. Not elective credit.` };
}

function listCodes(codes) {
  if (codes.length <= 1) return codes.join('');
  return `${codes.slice(0, -1).join(', ')} and ${codes[codes.length - 1]}`;
}

/**
 * What a match would change if the Registrar approved it (brief, D7): the
 * requirement it targets moves by the target course's credits, and whatever
 * waits on that course stops being locked — the target itself when it is
 * locked, and every course whose prerequisite is the target. Phrased as a
 * conditional by `effectLine`, so it cannot be read as a decision.
 */
export function matchEffect(match, requirements) {
  const requirement = requirements.find((item) => item.id === match.target.requirementId);
  if (!requirement || requirement.creditsApproved == null) return null;

  const from = requirement.creditsApproved;
  const to = from + match.target.credits;
  const unlocks = [];
  const target = requirement.courses.find((course) => course.code === match.target.courseCode);
  if (target?.state === 'locked') unlocks.push(target.code);
  requirements.forEach((item) =>
    item.courses.forEach((course) => {
      if (course.state === 'locked' && course.prerequisite === match.target.courseCode) {
        unlocks.push(course.code);
      }
    }),
  );

  return {
    requirementName: requirement.name,
    from,
    to,
    required: requirement.creditsRequired,
    unlocks,
  };
}

export function effectLine(effect) {
  if (!effect) return null;
  const { requirementName, from, to, required, unlocks } = effect;
  const tail =
    unlocks.length > 0
      ? `, and ${listCodes(unlocks)} ${unlocks.length === 1 ? 'stops' : 'stop'} being locked`
      : '';
  return `If approved, ${requirementName} goes from ${from} of ${required} to ${to} of ${required} credits${tail}.`;
}

/**
 * The band's rule, in order of precedence (brief, D5) — this screen's own,
 * inside the reference screen's component:
 *
 *   1. a match is waiting on the Registrar → the count, "See what's waiting";
 *   2. an unfinished requirement has courses she can take this term → the
 *      nearest such requirement, "See what you can take". Nearest to being
 *      finished: in progress before not started, then the smallest credit gap,
 *      then page order;
 *   3. otherwise no band. Never a placeholder.
 *
 * `matches === null` is the transcript service unreachable — nothing is known
 * to be waiting, so case 1 cannot fire and case 2 is tried.
 */
export function bandFor({ matches, requirements }) {
  if (matches && matches.length > 0) {
    const count = matches.length;
    return {
      kind: 'matches',
      label: `${count} potential ${count === 1 ? 'match is' : 'matches are'} with the Registrar`,
      action: 'See what’s waiting',
    };
  }

  const candidates = requirements
    .map((requirement, index) => ({ requirement, index, status: requirementStatus(requirement) }))
    .filter(
      ({ requirement, status }) =>
        status !== 'satisfied' && takeableCourses(requirement).length > 0,
    )
    .sort((a, b) => {
      const rank = (status) => (status === 'in-progress' ? 0 : 1);
      if (rank(a.status) !== rank(b.status)) return rank(a.status) - rank(b.status);
      const gap = (item) => item.requirement.creditsRequired - (item.requirement.creditsApproved ?? 0);
      if (gap(a) !== gap(b)) return gap(a) - gap(b);
      return a.index - b.index;
    });

  const nearest = candidates[0]?.requirement;
  if (nearest) {
    return {
      kind: 'takeable',
      requirementId: nearest.id,
      label: `${nearest.name} has courses open this term`,
      action: 'See what you can take',
    };
  }
  return null;
}

/** A course code as an element id: `SPAN 201` → `span-201`. */
export function courseSlug(code) {
  return code.toLowerCase().replace(/\s+/g, '-');
}
