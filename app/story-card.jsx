// ━━━ STORY CARD — editorial, full-bleed, serif headlines ━━━━━━━━━━━━━━━━

const BiasMeter = ({ value, label }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: TOK.mono, fontSize: 9, letterSpacing: 1.2, color: "rgba(255,255,255,0.55)" }}>
      <span>LEFT</span>
      <span style={{ color: "#fff", letterSpacing: 0.6, fontWeight: 500 }}>{label.toUpperCase()}</span>
      <span>RIGHT</span>
    </div>
    <div style={{ position: "relative", height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
      <div style={{ position: "absolute", left: `${value}%`, top: -4, transform: "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 3px rgba(255,255,255,0.1)" }}/>
    </div>
  </div>
);

const Cover = ({ palette, kicker, headline }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
    {/* Base gradient */}
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${palette.a} 0%, ${palette.b} 100%)` }}/>
    {/* Iridescent accent — a single soft light bloom */}
    <div style={{ position: "absolute", top: "-15%", right: "-20%", width: "70%", height: "70%", borderRadius: "50%", background: palette.accent, filter: "blur(80px)", opacity: 0.45 }}/>
    <div style={{ position: "absolute", bottom: "-10%", left: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: palette.accent, filter: "blur(90px)", opacity: 0.25 }}/>
    {/* Film grain — fine noise via SVG */}
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, mixBlendMode: "overlay" }}>
      <filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="2"/></filter>
      <rect width="100%" height="100%" filter="url(#noise)"/>
    </svg>
    {/* Kicker — editorial stamp */}
    <div style={{ position: "absolute", top: 64, left: 24, fontFamily: TOK.mono, fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
      {kicker}
    </div>
    {/* Serif pull-quote-style headline preview at top */}
    <div style={{ position: "absolute", top: 110, left: 24, right: 80, fontFamily: TOK.serif, fontSize: 32, fontWeight: 400, lineHeight: 1.12, letterSpacing: -0.8, color: "#fff", textShadow: "0 1px 30px rgba(0,0,0,0.3)" }}>
      {headline.split(";")[0].split(",")[0]}
    </div>
  </div>
);

const RailAction = ({ Icon, label, active, onClick, iconProps = {} }) => (
  <button onClick={onClick} style={{
    background: "none", border: "none", padding: 0, cursor: "pointer",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
  }}>
    <div style={{
      width: 46, height: 46, borderRadius: 23,
      background: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      border: "0.5px solid rgba(255,255,255,0.18)",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s",
    }}>
      <Icon s={22} c="#fff" fill={active} {...iconProps}/>
    </div>
    {label && <span style={{ fontSize: 11, color: "#fff", fontWeight: 500, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{label}</span>}
  </button>
);

const AskPulseBar = ({ story, onAsk, suggestions }) => {
  const [focused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Suggestion chips — scrollable */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2, marginLeft: -2, marginRight: -2 }}>
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => onAsk(s)} style={{
            flexShrink: 0, padding: "7px 14px", borderRadius: 100,
            background: "rgba(255,255,255,0.12)",
            border: "0.5px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
            color: "#fff", fontSize: 12.5, fontWeight: 400, cursor: "pointer", whiteSpace: "nowrap",
            letterSpacing: -0.1,
          }}>
            {s}
          </button>
        ))}
      </div>
      {/* Ask input */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 6px 10px 16px",
        background: focused ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)",
        border: `0.5px solid rgba(255,255,255,${focused ? 0.35 : 0.22})`,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderRadius: 100, transition: "all 0.2s",
      }}>
        <Bubl size={22} stage={1} animated={false}/>
        <input
          type="text"
          placeholder="Ask Pulse anything about this story..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => { if (e.key === "Enter" && value.trim()) { onAsk(value); setValue(""); } }}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "#fff", fontSize: 13.5, fontFamily: TOK.sans, letterSpacing: -0.1,
          }}
        />
        <button onClick={() => { if (value.trim()) { onAsk(value); setValue(""); } }} style={{
          width: 34, height: 34, borderRadius: 17, border: "none", cursor: "pointer",
          background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          opacity: value ? 1 : 0.5, transition: "opacity 0.2s",
        }}>
          <Ic.ArrowUp s={16} c={TOK.ink}/>
        </button>
      </div>
    </div>
  );
};

const StoryCard = ({ story, liked, saved, onLike, onSave, onComment, onAsk, onExpand }) => {
  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      <Cover palette={story.palette} kicker={story.kicker} headline={story.headline}/>

      {/* Right rail */}
      <div style={{
        position: "absolute", right: 14, bottom: 260,
        display: "flex", flexDirection: "column", gap: 14, zIndex: 10,
      }}>
        <RailAction Icon={Ic.Heart}   label={story.likes.toLocaleString()} active={liked} onClick={onLike}/>
        <RailAction Icon={Ic.Comment} label={story.comments.toString()}    onClick={onComment}/>
        <RailAction Icon={Ic.Save}    label="Save"                          active={saved} onClick={onSave}/>
        <RailAction Icon={Ic.Share}   label="Share"/>
      </div>

      {/* Bottom panel — glass scrim + serif subtitle + meta + AskPulse */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "80px 20px 20px", paddingRight: 82,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 50%, transparent 100%)",
        zIndex: 5, display: "flex", flexDirection: "column", gap: 14,
      }}>
        {/* Source row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 4, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: 0.5, fontFamily: TOK.serif }}>
            {story.srcMark}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.88)", fontWeight: 500, letterSpacing: -0.1 }}>
            {story.source}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: TOK.mono }}>
            · {story.time} · {story.read} min
          </div>
        </div>

        {/* AI deck — tagged */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 6, fontSize: 9.5, fontFamily: TOK.mono, color: "rgba(255,255,255,0.55)", letterSpacing: 1.2 }}>
            <Ic.Sparkle s={10} c="rgba(255,255,255,0.55)"/>
            AI SUMMARY
          </div>
          <p style={{
            fontFamily: TOK.sans, fontSize: 15, lineHeight: 1.45, fontWeight: 400,
            color: "rgba(255,255,255,0.95)", margin: 0, letterSpacing: -0.1,
          }}>
            {story.deck}
          </p>
        </div>

        {/* Why it matters — collapsible */}
        <button onClick={onExpand} style={{
          background: "none", border: "none", padding: 0, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6, color: "#fff",
          fontSize: 12, fontWeight: 500, letterSpacing: -0.1,
        }}>
          <span>Why it matters</span>
          <Ic.ChevUp s={14} c="#fff"/>
        </button>

        {/* Bias meter */}
        <BiasMeter value={story.bias} label={story.biasLabel}/>

        {/* Ask Pulse — hero UI element */}
        <AskPulseBar story={story} onAsk={onAsk} suggestions={FOLLOWUPS[story.id] || []}/>
      </div>
    </div>
  );
};

Object.assign(window, { StoryCard, BiasMeter, AskPulseBar });
