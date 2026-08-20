const PRIORITY_ORDER = { critical: 0, soon: 1, normal: 2 };

export function kindIcon(kind) {
  if (kind === 'external') return 'external';
  if (kind === 'upload') return 'upload';
  if (kind === 'profile') return 'profile';
  return 'home';
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
