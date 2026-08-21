const PRIORITY_ORDER = { critical: 0, soon: 1, normal: 2 };

/**
 * What kind of step this is — the one vocabulary every row of the checklist
 * draws its tile from, whatever the step's standing. The head of a group says
 * the standing (open, with Aster, locked, completed); the row says the kind;
 * the two never repeat each other's glyph (Marco, 2026-08-21).
 *
 *   external     done on another site — a payment portal, the federal aid site
 *   upload       a document the student sends
 *   profile      details about the student
 *   housing      where the student will live — the plan, the move-in window
 *   meeting      a conversation with someone at Aster
 *   review       something Aster reads, or the student reads and confirms
 *   identity     the student proving who they are
 *   preferences  how the student wants to be reached
 *   decision     a yes the student gives — accepting the offer
 */
const KIND_ICONS = {
  external: 'external',
  upload: 'upload',
  profile: 'profile',
  housing: 'home',
  meeting: 'calendar',
  review: 'file',
  identity: 'shield',
  preferences: 'bell',
  decision: 'pen',
};

export function kindIcon(kind) {
  return KIND_ICONS[kind] ?? 'file';
}

export function priorityLabel(priority) {
  if (priority === 'critical') return 'Important';
  if (priority === 'soon') return 'Do soon';
  return 'Flexible';
}

export function sortTasks(tasks, mode) {
  const list = [...tasks];
  if (mode === 'quick') list.sort((a, b) => a.minutes - b.minutes);
  if (mode === 'due') list.sort((a, b) => a.daysLeft - b.daysLeft);
  if (mode === 'smart') {
    list.sort(
      (a, b) =>
        PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] ||
        (b.unlocks ?? 0) - (a.unlocks ?? 0) ||
        a.daysLeft - b.daysLeft,
    );
  }
  return list;
}
