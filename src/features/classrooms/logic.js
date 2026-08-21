import { requirementGroups } from './data.js';

const STATUS_LABELS = {
  satisfied: 'Satisfied',
  'in-progress': 'In progress',
  'not-started': 'Not started',
  pending: 'Credits pending sync',
};

/**
 * The whole ENR-186 guardrail lives in this signature: the only inputs are
 * credit the Registrar has approved and credit the requirement asks for. A
 * credit match is not a parameter and cannot become one without changing every
 * call site — which is the point.
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

/** Credit a match would add if it were approved. Reported, never added. */
export function creditsUnderReview(matches) {
  return (matches ?? []).reduce((sum, match) => sum + match.target.credits, 0);
}

export function matchesFor(matches, requirementId) {
  return (matches ?? []).filter((match) => match.target.requirementId === requirementId);
}

export function confidenceLabel(confidence) {
  return confidence === 'likely' ? 'Likely' : 'Needs review';
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
 * Which requirements open on load: the ones carrying advisory evidence or
 * partial credit. Eleven collapsed rows fit a screen; eleven open ones do not.
 */
export function defaultOpenRequirements(requirements, matches) {
  return requirements
    .filter((requirement) => {
      const status = requirementStatus(requirement);
      return status === 'in-progress' || matchesFor(matches, requirement.id).length > 0;
    })
    .map((requirement) => requirement.id);
}
