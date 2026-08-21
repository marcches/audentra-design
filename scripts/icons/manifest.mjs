/**
 * The product's icon vocabulary, and where each glyph comes from.
 *
 * Our name on the left is what a component asks for — `<Icon name="alert">` —
 * and it does not change when the glyph behind it does. The name on the right
 * is the Phosphor icon that draws it (https://phosphoricons.com, MIT). Adding
 * an icon is one line here and `npm run icons`; the script rejects a Phosphor
 * name that does not exist, so a typo cannot ship as a missing glyph.
 *
 * Four weights are vendored for every name — regular, bold, fill, duotone —
 * because the weight is chosen by role (see `src/design-system/Icon.jsx`) and
 * any icon may be asked to play any role.
 */
export const ICONS = {
  // the vocabulary the product already had
  check: 'check',
  checklist: 'list-checks',
  clock: 'clock',
  lock: 'lock',
  spark: 'sparkle',
  arrow: 'arrow-right',
  calendar: 'calendar-blank',
  upload: 'upload-simple',
  download: 'download-simple',
  external: 'arrow-square-out',
  pin: 'map-pin',
  home: 'house',
  file: 'file-text',
  wallet: 'wallet',
  book: 'book-open',
  profile: 'user',
  message: 'chat-circle',
  help: 'question',
  gift: 'gift',
  chevron: 'caret-down',
  info: 'info',
  close: 'x',
  menu: 'list',
  accessibility: 'person-arms-spread',
  shield: 'shield-check',
  health: 'heartbeat',
  alert: 'warning',
  bell: 'bell',
  flag: 'flag',
  users: 'users',
  mail: 'envelope-simple',
  refresh: 'arrow-clockwise',
  spinner: 'circle-notch',
  progress: 'chart-line-up',
  award: 'medal',
  card: 'credit-card',
  ticket: 'ticket',
  receipt: 'receipt',
  chart: 'chart-bar',
  circle: 'circle',
  mic: 'microphone',
  sound: 'speaker-high',
  pen: 'pencil-simple',
  send: 'paper-plane-tilt',
  signout: 'sign-out',
  back: 'arrow-left',
  half: 'circle-half',
  video: 'video-camera',
  // marks — an organisation or a place is a thing, and a thing gets a glyph,
  // not a face (design-workflow.md, People)
  flower: 'flower',
  music: 'music-notes',
  food: 'bowl-food',
  graduation: 'graduation-cap',
  robot: 'robot',
  mountains: 'mountains',
  radio: 'radio',
  buildings: 'buildings',
  camera: 'camera',
  student: 'student',
  degree: 'graduation-cap',
  bed: 'bed',
  image: 'image',
  // My Degree, brief of 2026-08-21: the plan action and the two confidence
  // readings (an estimate and a closer look — neither is a check, because a
  // check means decided).
  plus: 'plus',
  gauge: 'gauge',
  magnify: 'magnifying-glass',
};

export const WEIGHTS = ['regular', 'bold', 'fill', 'duotone'];
