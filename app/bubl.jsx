// ━━━ BUBL — the living bubble mascot ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Evolves with the user. Stage 0-4 adds more iridescent complexity + personality.
// Minimal by default — only a face when context calls for it (onboarding, streak, chat).

const Bubl = ({ size = 64, stage = 2, mood = "idle", animated = true }) => {
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow: "visible" }}>
      <defs>
        {/* Iridescent gradient — the bubble's skin */}
        <radialGradient id={`iris-${id}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"/>
          <stop offset="25%" stopColor={TOK.irisLemon} stopOpacity="0.55"/>
          <stop offset="50%" stopColor={TOK.irisMint} stopOpacity="0.45"/>
          <stop offset="75%" stopColor={TOK.irisSky} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={TOK.irisLilac} stopOpacity="0.7"/>
        </radialGradient>
        {/* Rim iridescence */}
        <linearGradient id={`rim-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={TOK.irisPink}/>
          <stop offset="33%" stopColor={TOK.irisSky}/>
          <stop offset="66%" stopColor={TOK.irisMint}/>
          <stop offset="100%" stopColor={TOK.irisLilac}/>
        </linearGradient>
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>

      {/* Soft ambient glow behind bubble */}
      {stage >= 2 && (
        <circle cx="60" cy="60" r="55" fill={`url(#iris-${id})`} opacity="0.25" filter={`url(#glow-${id})`}/>
      )}

      {/* Main bubble body */}
      <circle cx="60" cy="60" r="48" fill={`url(#iris-${id})`} stroke={`url(#rim-${id})`} strokeWidth="1.2"/>

      {/* Inner iridescent swirls (more appear at higher stages) */}
      <ellipse cx="45" cy="45" rx="18" ry="12" fill="#fff" opacity="0.35" transform="rotate(-25 45 45)"/>
      {stage >= 1 && (
        <ellipse cx="78" cy="52" rx="8" ry="14" fill={TOK.irisPink} opacity="0.35" transform="rotate(30 78 52)"/>
      )}
      {stage >= 2 && (
        <ellipse cx="72" cy="78" rx="10" ry="6" fill={TOK.irisSky} opacity="0.4" transform="rotate(-15 72 78)"/>
      )}
      {stage >= 3 && (
        <ellipse cx="40" cy="75" rx="7" ry="10" fill={TOK.irisMint} opacity="0.4" transform="rotate(40 40 75)"/>
      )}
      {stage >= 4 && (
        <path d="M 30 55 Q 40 48 50 55" stroke={TOK.irisLilac} strokeWidth="1.5" fill="none" opacity="0.5"/>
      )}

      {/* Highlight — the classic bubble gleam */}
      <ellipse cx="42" cy="38" rx="10" ry="6" fill="#fff" opacity="0.9" transform="rotate(-30 42 38)"/>
      <circle cx="48" cy="32" r="2" fill="#fff"/>

      {/* Subtle face — only if mood is expressive */}
      {mood !== "idle" && (
        <g>
          <circle cx="50" cy="60" r="2.5" fill={TOK.ink80}/>
          <circle cx="70" cy="60" r="2.5" fill={TOK.ink80}/>
          {mood === "happy"   && <path d="M 50 73 Q 60 78 70 73" stroke={TOK.ink80} strokeWidth="1.8" fill="none" strokeLinecap="round"/>}
          {mood === "think"   && <circle cx="60" cy="76" r="2" fill={TOK.ink60}/>}
          {mood === "greet"   && <path d="M 48 72 Q 60 82 72 72" stroke={TOK.ink80} strokeWidth="1.8" fill="none" strokeLinecap="round"/>}
        </g>
      )}

      {/* Animation — gentle float */}
      {animated && (
        <style>{`
          @keyframes bublFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-2px) rotate(2deg); }
          }
        `}</style>
      )}
    </svg>
  );
};

// Static logo mark — paired with wordmark
const BublMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <defs>
      <radialGradient id="lm" cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.95"/>
        <stop offset="40%" stopColor={TOK.irisLemon} stopOpacity="0.5"/>
        <stop offset="75%" stopColor={TOK.irisSky} stopOpacity="0.55"/>
        <stop offset="100%" stopColor={TOK.irisLilac} stopOpacity="0.75"/>
      </radialGradient>
      <linearGradient id="lmr" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={TOK.irisPink}/>
        <stop offset="50%" stopColor={TOK.irisSky}/>
        <stop offset="100%" stopColor={TOK.irisMint}/>
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="17" fill="url(#lm)" stroke="url(#lmr)" strokeWidth="1"/>
    <ellipse cx="14" cy="12" rx="4" ry="2.5" fill="#fff" opacity="0.9" transform="rotate(-30 14 12)"/>
  </svg>
);

// Minimal icon set — editorial line icons
const Ic = {
  Search:  ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="M20 20l-4.5-4.5"/></svg>,
  Bell:    ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0112 0c0 4.5 1.5 6 2.5 7H3.5C4.5 15 6 13.5 6 9z"/><path d="M10 20a2 2 0 004 0"/></svg>,
  Home:    ({s=22,c=TOK.ink,fill=false}) => fill ? <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 3l9 8h-2v9h-5v-6h-4v6H5v-9H3z"/></svg> : <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z"/></svg>,
  Compass: ({s=22,c=TOK.ink,fill=false}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:"none"} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5L13 13l-4.5 2.5L11 11z" fill={fill?"#fff":c}/></svg>,
  Play:    ({s=22,c=TOK.ink,fill=false}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:"none"} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z" fill={c}/></svg>,
  User:    ({s=22,c=TOK.ink,fill=false}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8.5" r="3.5" fill={fill?c:"none"}/><path d="M5 20a7 7 0 0114 0" fill={fill?c:"none"}/></svg>,
  Heart:   ({s=22,c=TOK.ink,fill=false}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:"none"} stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4-9-9a5 5 0 019-3 5 5 0 019 3c-2 5-9 9-9 9z"/></svg>,
  Comment: ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 01-12 7L4 20l1-4.5A8 8 0 1121 12z"/></svg>,
  Save:    ({s=22,c=TOK.ink,fill=false}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:"none"} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>,
  Share:   ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>,
  Close:   ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  Send:    ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12L21 3l-4 18-5-8z"/></svg>,
  Sparkle: ({s=14,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z"/></svg>,
  Mic:     ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>,
  Video:   ({s=22,c=TOK.ink,fill=false}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:"none"} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2z"/></svg>,
  ChevDown:({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>,
  ChevUp:  ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6"/></svg>,
  ArrowUp: ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4M5 11l7-7 7 7"/></svg>,
  Flame:   ({s=22,c=TOK.ink,fill=false}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:"none"} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><path d="M12 2c1 3 4 4 4 8a4 4 0 11-8 0c0-2 1-3 2-4.5S12 4 12 2zM14 14a2 2 0 11-4 0c0-1 1-1.5 2-3 .5 1.5 2 2 2 3z"/></svg>,
  Clock:   ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  Dots:    ({s=22,c=TOK.ink}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>,
};

Object.assign(window, { Bubl, BublMark, Ic });
