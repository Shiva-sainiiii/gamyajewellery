const P = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  heart: <path d="M12 20.5s-8-4.9-8-11A4.6 4.6 0 0112 6.6 4.6 4.6 0 0120 9.5c0 6.1-8 11-8 11z" />,
  bag: <><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
  pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chev: <path d="M9 5l7 7-7 7" />,
  down: <path d="M5 9l7 7 7-7" />,
  left: <path d="M15 5l-7 7 7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5L16 9.5" /></>,
  refresh: <><path d="M20 11a8 8 0 10-2.3 5.7" /><path d="M20 5v6h-6" /></>,
  gem: <><path d="M6 4h12l4 5-10 11L2 9l4-5z" /><path d="M2 9h20M9 4l-2 5 5 11 5-11-2-5" /></>,
  ring: <><circle cx="12" cy="15" r="6" /><path d="M9 6l1.5-3h3L15 6l-3 3-3-3z" /></>,
  earring: <><circle cx="12" cy="5" r="1.6" /><path d="M12 6.6V10" /><path d="M12 10c-3.5 3-3.5 7 0 10 3.5-3 3.5-7 0-10z" /></>,
  necklace: <><path d="M4 5c0 8 3.5 12 8 12s8-4 8-12" /><path d="M12 17l-2 3 2 2 2-2-2-3z" /></>,
  bracelet: <><ellipse cx="12" cy="12" rx="9" ry="6" /><ellipse cx="12" cy="12" rx="6" ry="3.2" /></>,
  gold: <><path d="M3 17l3-7h12l3 7H3z" /><path d="M9 10l1.5-4h3L15 10" /></>,
  platinum: <><path d="M12 3l9 6-9 12L3 9l9-6z" /></>,
  star: <path d="M12 3.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.4 9.8l6-.8L12 3.5z" />,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />,
  video: <><rect x="3" y="6" width="12" height="12" rx="2" /><path d="M15 10l6-3v10l-6-3" /></>,
  gift: <><rect x="3" y="9" width="18" height="12" rx="1" /><path d="M12 9v12M3 13h18M12 9C9 9 7 7 8.5 5.5S12 6 12 9c0-3 2-4.5 3.5-3.5S15 9 12 9z" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1.3" /></>,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  grid: <><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  up: <path d="M5 15l7-7 7 7" />,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>,
  whatsapp: <><path d="M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-3.8-.9L4 20z" /><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .7c-1-.4-1.8-1.200-2.200-2.200l.7-1-1-2L9 9z" /></>,
};
export default function Icon({ n, size = 22, fill = false, className = '', sw = 1.5 }) {
  return (
    <svg className={'ic ' + className} width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[n] || null}
    </svg>
  );
}
