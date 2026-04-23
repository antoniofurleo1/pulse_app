// ━━━ ICONS — thin line, editorial ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const mkIc = (paths) => ({ s = 24, c = "currentColor", rot = 0, fill = "none", sw = 1.6 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill === true ? c : "none"} stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)`, display: "block" }}>
    {paths}
  </svg>
);

const Ic = {
  Home: mkIc(<><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z"/></>),
  Play: mkIc(<><circle cx="12" cy="12" r="9.25"/><path d="M10 8.5l5.5 3.5L10 15.5z"/></>),
  Compass: mkIc(<><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></>),
  User: mkIc(<><circle cx="12" cy="8.5" r="3.75"/><path d="M4.5 20.5a7.5 7.5 0 0115 0"/></>),
  Bell: mkIc(<><path d="M6 9a6 6 0 0112 0c0 4.5 1.5 6.5 2.5 7.5H3.5C4.5 15.5 6 13.5 6 9z"/><path d="M10 20.5a2 2 0 004 0"/></>),
  Search: mkIc(<><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>),
  Mic: mkIc(<><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>),
  Heart: mkIc(<><path d="M12 20.5s-7.5-4.5-9.3-9.1A5.2 5.2 0 0112 6.3a5.2 5.2 0 019.3 5.1c-1.8 4.6-9.3 9.1-9.3 9.1z"/></>),
  Chat: mkIc(<><path d="M20.5 12.5a7.5 7.5 0 01-11 6.5L4 20.5l1.5-5.5A7.5 7.5 0 1120.5 12.5z"/></>),
  Bookmark: mkIc(<><path d="M6 4.5a1.5 1.5 0 011.5-1.5h9A1.5 1.5 0 0118 4.5V21l-6-4-6 4V4.5z"/></>),
  Share: mkIc(<><path d="M7.5 10.5l9-5M7.5 13.5l9 5"/><circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/></>),
  Chev: mkIc(<><path d="M9 6l6 6-6 6"/></>),
  Sparkle: mkIc(<><path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z"/></>),
  Clock: mkIc(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  Dots: mkIc(<><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>),
  Ask: mkIc(<><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5M12 16.5v.5"/></>),
};

Object.assign(window, { Ic });
