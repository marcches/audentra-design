const paths = {
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
      <path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 14v5h14v-5" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 14v5h14v-5" />
    </>
  ),
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="m19 5-9 9" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4.5-4.6 6.8-8 6.8-10.8A6.8 6.8 0 0 0 5.2 10.2C5.2 13 7.5 16.4 12 21Z" />
      <circle cx="12" cy="10.2" r="2.5" />
    </>
  ),
  home: (
    <>
      <path d="m4 11 8-7 8 7" />
      <path d="M6 10v10h12V10M10 20v-6h4v6" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="3" />
      <path d="M3 10.5h18M16.5 15h.01" />
    </>
  ),
  book: (
    <>
      <path d="M12 7v13" />
      <path d="M12 7c-1.6-1.7-3.8-2.5-7-2.5v13c3.2 0 5.4.8 7 2.5 1.6-1.7 3.8-2.5 7-2.5v-13c-3.2 0-5.4.8-7 2.5Z" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  message: <path d="M4 5h16v12H8l-4 4z" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.3 2.3 0 1 1 3.5 2c-.8.5-1.3 1-1.3 2M12 17h.01" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="9" width="18" height="12" rx="2" />
      <path d="M12 9v12M3 13h18M12 9H8a2 2 0 1 1 2-3c1 1.2 2 3 2 3Zm0 0h4a2 2 0 1 0-2-3c-1 1.2-2 3-2 3Z" />
    </>
  ),
  chevron: <path d="m8 10 4 4 4-4" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  close: <path d="m7 7 10 10M17 7 7 17" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4.5 3.4 19.5h17.2z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  // ENR-161. Open at the foot rather than a closed bell shape: the count sits
  // on the trailing edge and a closed outline fights it for the same corner.
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.4 2H4.6z" />
      <path d="M10 21.5h4" />
    </>
  ),
  // ENR-214. A flag, not a warning triangle: a gating requirement is a fact
  // about a step, and the triangle already means an error somewhere else.
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 4.8h11l-2.2 4 2.2 4H6z" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8" r="3.4" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M16.5 5.4a3.4 3.4 0 0 1 0 6.4M17.5 14.6a6 6 0 0 1 3 5.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 8 8 5 8-5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4.5h-4.5" />
    </>
  ),
  /* A track and a quarter of it. The quarter is what turns; the track is what
     makes it read as a proportion of something rather than as a stray mark. */
  spinner: (
    <>
      <circle cx="12" cy="12" r="9" opacity=".28" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </>
  ),
  progress: (
    <>
      <path d="M4 4v15a1 1 0 0 0 1 1h15" />
      <path d="m7.5 15 3.5-4.2 3 2.6L19 7" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="m8.6 13.4-1.1 7 4.5-2.6 4.5 2.6-1.1-7" />
    </>
  ),
  card: (
    <>
      <rect x="2.8" y="5.6" width="18.4" height="12.8" rx="3" />
      <path d="M2.8 10.2h18.4" />
      <path d="M6.6 14.6h3.2" />
    </>
  ),
  ticket: (
    <>
      <path d="M3.4 9.2V7.4a2 2 0 0 1 2-2h13.2a2 2 0 0 1 2 2v1.8a2.8 2.8 0 0 0 0 5.6v1.8a2 2 0 0 1-2 2H5.4a2 2 0 0 1-2-2v-1.8a2.8 2.8 0 0 0 0-5.6Z" />
      <path d="M14.2 5.4v2.2M14.2 10.9v2.2M14.2 16.4v2.2" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3h14v18l-2.3-1.6-2.35 1.6L12 19.4l-2.35 1.6L7.3 19.4 5 21z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7.5 20v-5.5M12 20V8M16.5 20v-8.5" />
    </>
  ),
  circle: <circle cx="12" cy="12" r="8" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </>
  ),
  sound: (
    <>
      <path d="M4 9.5h3L12 5v14l-5-4.5H4z" />
      <path d="M16 9.2a4 4 0 0 1 0 5.6M18.6 6.6a7.6 7.6 0 0 1 0 10.8" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20h4L19.2 8.8a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5z" />
      <path d="m14.5 6.5 3.4 3.4" />
    </>
  ),
  send: (
    <>
      <path d="M12 20V5" />
      <path d="m6 11 6-6 6 6" />
    </>
  ),
  signout: (
    <>
      <path d="M12 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6" />
      <path d="M13 12h8" />
      <path d="m17 8 4 4-4 4" />
    </>
  ),
  back: (
    <>
      <path d="M19 12H5" />
      <path d="m10 7-5 5 5 5" />
    </>
  ),
  half: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
    </>
  ),
  // ENR-183. A conversation that happens over video has no room and no floor, so
  // it cannot borrow the pin.
  video: (
    <>
      <rect x="2.8" y="6.4" width="12.8" height="11.2" rx="2.6" />
      <path d="m15.6 11.4 5.6-2.9v7l-5.6-2.9Z" />
    </>
  ),
};

export default function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
