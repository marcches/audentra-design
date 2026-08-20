/**
 * What Edward is allowed to know — ENR-181, behaviour from ENR-176.
 *
 * The whole point of this file is the shape of its input. `buildRecord` is
 * handed one student's data and returns one record; every answer below reads
 * that record and nothing else. There is no student id to pass, no directory to
 * look a classmate up in, and no branch that could return one — AC 2 is the
 * signature of these functions rather than a sentence in a system prompt.
 *
 * Two other invariants live here:
 *
 *   - **No figure is written twice.** Amounts come from `buildLedger`, dates and
 *     titles come from the task objects the checklist renders. If My Financials
 *     and Edward ever disagree, one of them stopped reading this.
 *   - **Edward never acts.** An answer can carry a `route`, which is a place the
 *     student goes to do the thing themselves — AC 5.
 */

import {
  ESCALATION_WINDOW,
  enrollmentAdvisor,
  financialAidAdvisor,
} from '../data.js';
import { program } from '../data-academics.js';
import { GUIDANCE, PAGE_QUESTIONS } from '../data-edward.js';
import { deadlineLabel, escalation, formatMoney } from './money.js';
import { destinationById } from './navigation.js';

/** The two people an answer can end at. There are no others in the portal. */
export const PEOPLE = { enrollment: enrollmentAdvisor, aid: financialAidAdvisor };

/** Money questions go to Financial Services; everything else to Admissions. */
const MONEY_INTENTS = new Set([
  'balance',
  'aid-sources',
  'aid-terms',
  'deposit',
  'loan-pending',
  'next-payment',
  'progress',
]);

export function personFor(intent) {
  return MONEY_INTENTS.has(intent) ? 'aid' : 'enrollment';
}

/**
 * One student's record, assembled from what the pages already render. `state` is
 * the portal's own preview vocabulary, so Edward has no private idea of what
 * "unavailable" means.
 */
export function buildRecord({
  state = 'ready',
  tasks = [],
  completed = [],
  reviewing = [],
  totalSteps = 0,
  snapshot,
  ledger,
  requiredEvents = 0,
}) {
  return {
    hasRecord: state !== 'empty',
    reachable: state !== 'partial',
    failing: state === 'error',
    tasks,
    completed,
    reviewing,
    totalSteps,
    aid: snapshot?.aid ?? [],
    payments: snapshot?.payments ?? [],
    schedule: snapshot?.schedule ?? [],
    ledger,
    requiredEvents,
  };
}

function byDeadline(tasks) {
  return [...tasks].sort((a, b) => a.daysLeft - b.daysLeft);
}

function taskById(record, id) {
  return record.tasks.find((task) => task.id === id) ?? null;
}

/** The deposit is paid when the schedule says it was received — never a flag. */
function depositPaid(record) {
  return record.schedule.some((row) => row.id === 'deposit' && row.status === 'received');
}

function pendingLoan(record) {
  return record.aid.find((item) => item.status === 'pending') ?? null;
}

/** A route into the step itself, so the student lands where the work is. */
function taskRoute(task) {
  return { label: `Open ${task.title}`, route: '#/my-enrollment', taskId: task.id };
}

function pageRoute(id, label) {
  const destination = destinationById(id);
  if (!destination) return null;
  return { label: label ?? `Open ${destination.label}`, route: destination.route };
}

function recordSource(id) {
  const destination = destinationById(id);
  return {
    basis: 'record',
    label: destination ? destination.label : 'your record',
    destination: id,
  };
}

function guidanceSource(topic) {
  return { basis: 'guidance', label: topic, destination: null };
}

/* ------------------------------------------------------------------ *
 * Suggestions — ENR-176 AC 7
 * ------------------------------------------------------------------ */

/**
 * Built from the record every time, which is why Scenario 5 needs no special
 * case: once the deposit is received, the deposit suggestion is not generated.
 */
export function suggestionsFor(record, page) {
  const pageGroup = PAGE_QUESTIONS[page?.id] ?? PAGE_QUESTIONS.dashboard;
  const groups = [
    {
      id: 'page',
      label: page?.id === 'dashboard' ? 'To get started' : 'About this page',
      items: pageGroup.map((item, index) => ({ ...item, id: `page-${index}` })),
    },
  ];

  // A page question and a fallback question can land on the same intent. The
  // page keeps it, because it is the more specific reason for offering it.
  const dedupe = (items) => {
    const seen = new Set(groups.flatMap((group) => group.items.map((item) => item.text)));
    return items.filter((item) => !seen.has(item.text));
  };

  if (!record.reachable || !record.hasRecord) {
    const about = dedupe([
      { id: 'about-0', text: 'What can you see about me?', intent: 'privacy' },
      { id: 'about-1', text: 'How do momentum points work?', intent: 'points' },
    ]);
    if (about.length > 0) groups.push({ id: 'about', label: 'About Edward', items: about });
    return groups;
  }

  const outstanding = [];
  const urgent = byDeadline(record.tasks).find((task) => escalation(task.daysLeft) === 'urgent');

  if (urgent) {
    outstanding.push({
      id: 'out-urgent',
      // The step keeps its own name: lowercasing it into the sentence reads as
      // a phrase rather than as the thing on the checklist.
      text: `What happens if I miss the deadline on ${urgent.title}?`,
      intent: 'task',
      taskId: urgent.id,
    });
  }

  const loan = pendingLoan(record);
  if (loan) {
    outstanding.push({
      id: 'out-loan',
      text: `Why is my ${loan.label} still pending?`,
      intent: 'loan-pending',
    });
  }

  if (!depositPaid(record) && taskById(record, 'deposit')) {
    outstanding.push({
      id: 'out-deposit',
      text: 'When is my enrollment deposit due?',
      intent: 'deposit',
    });
  }

  if (outstanding.length === 0) {
    outstanding.push({
      id: 'out-none',
      text: 'What have I already finished?',
      intent: 'completed',
    });
  }

  const open = dedupe(outstanding).slice(0, 3);
  if (open.length > 0) {
    groups.push({
      id: 'outstanding',
      label: record.tasks.length > 0 ? 'What is still open' : 'Where you stand',
      items: open,
    });
  }

  return groups;
}

/* ------------------------------------------------------------------ *
 * The answers themselves
 * ------------------------------------------------------------------ */

const ANSWERS = {
  outstanding(record) {
    if (record.tasks.length === 0) {
      return {
        body: [
          `Nothing is waiting on you right now. You have finished ${record.completed.length} of ${record.totalSteps} steps, and anything else is either with Aster or not open yet.`,
        ],
        source: recordSource('my-enrollment'),
        route: pageRoute('my-enrollment'),
      };
    }

    const next = byDeadline(record.tasks).slice(0, 3);
    return {
      body: [
        `You have ${record.tasks.length} step${record.tasks.length === 1 ? '' : 's'} open. The nearest ${next.length === 1 ? 'one is' : `${next.length} are`}:`,
        next.map((task) => `${task.title} — due ${task.due}, ${deadlineLabel(task.daysLeft).toLowerCase()}`).join('\n'),
      ],
      source: recordSource('my-enrollment'),
      route: taskRoute(next[0]),
    };
  },

  'next-deadline'(record) {
    const next = byDeadline(record.tasks)[0];
    if (!next) return ANSWERS.outstanding(record);
    return {
      body: [
        `${next.title} is due ${next.due} — ${deadlineLabel(next.daysLeft).toLowerCase()}. It takes about ${next.minutes} minutes, and ${next.office} is the office behind it.`,
        next.consequence ?? next.why,
      ],
      source: recordSource('my-enrollment'),
      route: taskRoute(next),
    };
  },

  task(record, taskId) {
    const task = taskById(record, taskId);
    if (!task) return null;
    const urgency = escalation(task.daysLeft);
    return {
      body: [
        `${task.title} is due ${task.due}, ${deadlineLabel(task.daysLeft).toLowerCase()}.${urgency === 'urgent' ? ` That is inside the ${ESCALATION_WINDOW}-day window Aster flags.` : ''}`,
        task.consequence ?? task.why,
        `Nothing is decided against you for being late — ${task.office} would contact you first. The step stays open until it is done.`,
      ],
      source: recordSource('my-enrollment'),
      route: taskRoute(task),
    };
  },

  'loan-pending'(record) {
    const loan = pendingLoan(record);
    if (!loan) {
      const accepted = record.aid.filter((item) => item.status === 'accepted');
      return {
        body: [
          `Nothing in your aid is pending. All ${accepted.length} sources are accepted, together worth ${formatMoney(record.ledger?.aidAccepted ?? 0)}.`,
        ],
        source: recordSource('financials-aid'),
        route: pageRoute('financials-aid'),
      };
    }

    const blocker = loan.blockedBy ? taskById(record, loan.blockedBy) : null;
    return {
      body: [
        `Your ${loan.label} is pending because ${blocker ? `one step is still open: ${blocker.title}, due ${blocker.due}.` : 'Aster has not finalized it yet.'}`,
        'While it is pending it has no amount, so it is not counted against your balance. That is why the figure on your Overview looks higher than it will end up being.',
      ],
      source: recordSource('financials-aid'),
      route: blocker ? taskRoute(blocker) : pageRoute('financials-aid'),
    };
  },

  deposit(record) {
    const row = record.schedule.find((item) => item.id === 'deposit');
    if (!row) return null;

    if (row.status === 'received') {
      return {
        body: [
          `Your enrollment deposit of ${formatMoney(row.amount)} was received on ${row.date}. Nothing more is needed for it.`,
        ],
        source: recordSource('financials-payments'),
        route: pageRoute('financials-payments'),
      };
    }

    const task = taskById(record, 'deposit');
    return {
      body: [
        `Your ${formatMoney(row.amount)} enrollment deposit is due ${row.date}${task ? `, ${deadlineLabel(task.daysLeft).toLowerCase()}` : ''}. It is what confirms your place.`,
        task ? task.why : 'It opens housing, advising and orientation once Aster records it.',
      ],
      source: recordSource('financials-payments'),
      route: task ? taskRoute(task) : pageRoute('financials-payments'),
    };
  },

  balance(record) {
    const ledger = record.ledger;
    if (!ledger) return null;
    return {
      body: [
        `Your estimated remaining balance is ${formatMoney(ledger.balance)}. Of that, ${formatMoney(ledger.billedRemaining)} is what Aster bills you directly; the rest is what the year costs elsewhere — books, travel, personal.`,
        ledger.hasPending
          ? 'This is before your pending loan. When that is finalized the figure comes down, and every remaining installment is recalculated.'
          : 'Your aid is final, so this figure only moves if your housing or meal plan changes.',
      ],
      source: recordSource('financials-overview'),
      route: pageRoute('financials-overview'),
    };
  },

  'aid-sources'(record) {
    const accepted = record.aid.filter((item) => item.status === 'accepted');
    const loan = pendingLoan(record);
    return {
      body: [
        `${accepted.length} source${accepted.length === 1 ? '' : 's'} ${accepted.length === 1 ? 'is' : 'are'} paying towards your year, worth ${formatMoney(record.ledger?.aidAccepted ?? 0)}:`,
        accepted.map((item) => `${item.label} — ${formatMoney(item.amount)} from ${item.source}`).join('\n'),
        loan ? `Your ${loan.label} is offered but not final, so it has no amount yet.` : null,
      ].filter(Boolean),
      source: recordSource('financials-aid'),
      route: pageRoute('financials-aid'),
    };
  },

  'next-payment'(record) {
    const next = record.ledger?.nextPayment;
    if (!next) {
      return {
        body: ['Nothing is scheduled for you to pay right now.'],
        source: recordSource('financials-payments'),
        route: pageRoute('financials-payments'),
      };
    }
    return {
      body: [
        `${next.label} — ${formatMoney(next.amount)}, due ${next.date}. It is payment ${(record.ledger.nextPaymentIndex ?? 0) + 1} of ${record.ledger.paymentCount}.`,
        'Aster charges these through its billing portal. I cannot pay it for you, but the page below is where it happens.',
      ],
      source: recordSource('financials-payments'),
      route: pageRoute('financials-payments'),
    };
  },

  documents(record) {
    const uploads = record.tasks.filter((task) => task.kind === 'upload');
    if (uploads.length === 0 && record.reviewing.length === 0) {
      return {
        body: ['Aster is not waiting on any document from you right now.'],
        source: recordSource('my-enrollment'),
        route: pageRoute('my-enrollment'),
      };
    }
    return {
      body: [
        uploads.length > 0
          ? `Aster is waiting on ${uploads.length} document${uploads.length === 1 ? '' : 's'} from you:`
          : 'Aster is not waiting on a new document from you.',
        uploads.map((task) => `${task.title} — due ${task.due}, for ${task.office}`).join('\n') || null,
        record.reviewing.length > 0
          ? `${record.reviewing.length} thing you already sent is being reviewed: ${record.reviewing.map((item) => item.title).join(', ')}.`
          : null,
      ].filter(Boolean),
      source: recordSource('my-enrollment'),
      route: uploads[0] ? taskRoute(uploads[0]) : pageRoute('my-enrollment'),
    };
  },

  completed(record) {
    return {
      body: [
        `You have finished ${record.completed.length} of ${record.totalSteps} steps${record.reviewing.length > 0 ? `, and ${record.reviewing.length} more is with Aster for review` : ''}.`,
        record.completed.slice(0, 4).map((item) => `${item.title} — ${item.date}`).join('\n'),
      ],
      source: recordSource('my-enrollment'),
      route: pageRoute('my-enrollment'),
    };
  },

  program(record) {
    if (!record.hasRecord) return null;
    return {
      body: [
        `Your program is ${program.name}, ${program.classOf}, on the ${program.catalog} catalog. It asks for ${program.creditsToGraduate} credits.`,
        `What you see on My Classrooms is Aster’s published catalog and the credit the Registrar has already approved. Your official academic record lives with the ${program.officialRecord.office}.`,
      ],
      source: recordSource('my-classrooms'),
      route: pageRoute('my-classrooms'),
    };
  },

  events(record) {
    if (record.requiredEvents <= 0) {
      return {
        body: ['Nothing on the campus calendar is required of you right now. Everything published is optional.'],
        source: recordSource('events'),
        route: pageRoute('events'),
      };
    }
    return {
      body: [
        `${record.requiredEvents} session${record.requiredEvents === 1 ? ' is' : 's are'} required for your class. Everything else Student Life publishes is optional.`,
      ],
      source: recordSource('events'),
      route: pageRoute('events'),
    };
  },

  advisor() {
    return {
      body: [
        `Two people hold your file. ${enrollmentAdvisor.name} at the ${enrollmentAdvisor.office} is who to ask when a step is blocked. ${financialAidAdvisor.name} at ${financialAidAdvisor.office} is who to ask before you borrow anything.`,
        `Both keep ${enrollmentAdvisor.hours.days} hours — ${enrollmentAdvisor.name} ${enrollmentAdvisor.hours.window}, ${financialAidAdvisor.name} ${financialAidAdvisor.hours.window}.`,
      ],
      source: guidanceSource('Aster’s staff directory'),
      route: pageRoute('appointments', 'Book time with them'),
    };
  },
};

/** Guidance answers survive an unreachable record, because they are not in it. */
const GUIDANCE_INTENTS = {
  points: 'points',
  'aid-terms': 'aidTerms',
  verification: 'verificationPolicy',
  progress: 'progress',
  privacy: 'privacy',
};

/* ------------------------------------------------------------------ *
 * Reading a typed question
 * ------------------------------------------------------------------ */

/**
 * Phrases, not single words: the longest match wins, so "next payment" resolves
 * to the schedule rather than to whatever else says "next".
 */
const PHRASES = [
  ['outstanding', ['what do i still', 'still need to do', 'what should i do', 'what do i need', 'outstanding', 'what is left', 'what are my steps', 'to do list']],
  ['next-deadline', ['due soonest', 'what is due', 'next deadline', 'due next', 'closest deadline', 'most urgent']],
  ['deposit', ['deposit']],
  ['loan-pending', ['loan still pending', 'why is my loan', 'loan pending', 'pending loan', 'promissory', 'loan agreement']],
  ['verification', ['income verification', 'verify my income', 'verification']],
  ['balance', ['what do i owe', 'what will i owe', 'remaining balance', 'my balance', 'how much do i owe', 'cost of attendance', 'what does the year cost']],
  ['aid-sources', ['what is paying', 'my financial aid', 'aid package', 'my grants', 'scholarship', 'who is paying']],
  ['aid-terms', ['grant and a loan', 'difference between a grant', 'what is a grant', 'what is a loan', 'subsidized', 'pell']],
  ['next-payment', ['next payment', 'when do i pay', 'installment', 'payment plan', 'when is my payment']],
  ['documents', ['documents', 'document', 'upload', 'paperwork', 'files aster needs', 'transcript']],
  ['completed', ['already finished', 'already done', 'what have i completed', 'what did i finish']],
  ['program', ['my degree', 'my program', 'my major', 'requirements', 'my classes', 'my courses', 'credits to graduate']],
  ['progress', ['academic progress', 'keep my aid', 'satisfactory progress', 'gpa', 'completion pace']],
  ['events', ['required event', 'campus event', 'orientation session', 'do i have to attend', 'clubs']],
  ['advisor', ['who do i talk to', 'who should i talk', 'my advisor', 'talk to a person', 'speak to someone', 'contact', 'who can help']],
  ['points', ['momentum point', 'points work', 'how do points', 'what are points']],
  ['privacy', ['what can you see', 'what do you know about me', 'can you see', 'my privacy', 'another student']],
];

export function intentFor(text) {
  const question = ` ${text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ')} `;
  let best = null;
  let bestScore = 0;

  for (const [intent, phrases] of PHRASES) {
    for (const phrase of phrases) {
      if (!question.includes(phrase)) continue;
      if (phrase.length > bestScore) {
        bestScore = phrase.length;
        best = intent;
      }
    }
  }

  return best;
}

/* ------------------------------------------------------------------ *
 * The one entry point
 * ------------------------------------------------------------------ */

/**
 * Everything above funnels through here, so there is exactly one place where an
 * answer can be shaped — and exactly one record it can be shaped from.
 */
export function answerFor(text, record, hint = {}) {
  if (record.failing) {
    return { kind: 'error', body: ['I couldn’t reach anything just now.'] };
  }

  // A suggestion knows what it meant; typed text has to be read.
  const intent = hint.intent ?? intentFor(text);

  if (!intent) return noAnswer('enrollment');

  const guidanceKey = GUIDANCE_INTENTS[intent];
  if (guidanceKey) {
    const entry = GUIDANCE[guidanceKey];
    return {
      kind: 'answer',
      intent,
      body: entry.body,
      source: guidanceSource(`Aster’s published guidance · ${entry.topic}`),
      route: null,
    };
  }

  if (!record.reachable) {
    return {
      kind: 'unavailable',
      intent,
      body: [
        'I can’t reach your record right now, so I won’t guess at a figure that belongs to it.',
        'Aster’s published guidance still answers, and the person below can read your record directly.',
      ],
      person: personFor(intent),
    };
  }

  if (!record.hasRecord) {
    return {
      kind: 'answer',
      intent,
      body: [
        'There is nothing in your record for that yet — Aster has not opened this part of your file.',
        'It fills in as your enrollment moves. Until then the person below is the one who can tell you when to expect it.',
      ],
      source: guidanceSource('Aster’s published guidance'),
      person: personFor(intent),
      route: null,
    };
  }

  const build = ANSWERS[intent];
  const answer = build ? build(record, hint.taskId) : null;
  if (!answer) return noAnswer(personFor(intent));

  return { kind: 'answer', intent, route: null, source: null, ...answer };
}

/** ENR-176 AC 3: never a dead end, always a named person. */
function noAnswer(person) {
  return {
    kind: 'none',
    body: [
      'I don’t have an answer for that.',
      'I read your own record and the guidance Aster publishes, so anything outside those two is a question for a person.',
    ],
    person,
  };
}
