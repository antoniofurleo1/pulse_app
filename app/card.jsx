// ━━━ STORY CARD — editorial, immersive, no phone frame ━━━━━━━━━━━━━━━━━

const StoryCard = ({ story, liked, saved, onLike, onSave, onComment, onAsk, onExpand }) => {
  const [askInput, setAskInput] = React.useState("");
  const [bursts, setBursts] = React.useState([]);
  const [bubblePops, setBubblePops] = React.useState([]);
  const burstKey = React.useRef(0);
  const popKey = React.useRef(0);

  const handleLike = () => {
    onLike();
    if (!liked) {
      const k = burstKey.current++;
      setBursts(b => [...b, k]);
      setTimeout(() => setBursts(b => b.filter(x => x !== k)), 800);
    }
  };

  const handleAsk = (q) => {
    if (q.trim()) {
      const k = popKey.current++;
      setBubblePops(b => [...b, k]);
      setTimeout(() => setBubblePops(b => b.filter(x => x !== k)), 600);
      onAsk(q);
    }
  };

  const p = story.palette;
  const followups = (window.FOLLOWUPS || {})[story.id] || [];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: TOK.ink }}>
      {/* Cover — muted gradient mesh */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(165deg, ${p.a} 0%, ${p.b} 60%, ${p.a} 100%)` }}>
        <div style={{ position: "absolute", top: "-15%", left: "-15%", width: "70%", height: "60%", background: p.accent, borderRadius: "50%", filter: "blur(90px)", opacity: 0.35 }}/>
        <div style={{ position: "absolute", bottom: "-20%", right: "-15%", width: "75%", height: "65%", background: p.accent, borderRadius: "50%", filter: "blur(110px)", opacity: 0.22 }}/>
      </div>

      {/* Bottom scrim */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, transparent 70%)" }}/>

      {/* Like burst */}
      {bursts.map(k => (
        <div key={k} style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 40, animation: "burst 0.8s ease-out forwards" }}>
          <Ic.Heart s={110} c={TOK.irisPink} fill sw={0}/>
        </div>
      ))}

      {/* Bubble pop burst */}
      {bubblePops.map(k => (
        <div key={k} style={{ position: "absolute", bottom: 110, right: 30, pointerEvents: "none", zIndex: 40, animation: "bubblePop 0.6s ease-out forwards" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💭</div>
        </div>
      ))}
      <style>{`
        @keyframes burst { 0% { opacity: 0; transform: translate(-50%,-50%) scale(0.3) } 30% { opacity: 1; transform: translate(-50%,-50%) scale(1.2) } 100% { opacity: 0; transform: translate(-50%,-50%) scale(1.5) } }
        @keyframes bubblePop { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } 100% { opacity: 0; transform: scale(0); } }
      `}</style>

      {/* Kicker + read time */}
      <div style={{ position: "absolute", top: 118, left: 22, right: 82, display: "flex", alignItems: "center", gap: 8, zIndex: 10 }}>
        <div style={{
          padding: "6px 12px", borderRadius: 100,
          background: "rgba(255,255,255,0.14)", border: "0.5px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(14px)", fontFamily: TOK.mono, fontSize: 10, color: "#fff", letterSpacing: 1.4,
        }}>{story.kicker.toUpperCase()}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 100, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(14px)", fontFamily: TOK.mono, fontSize: 10, color: "rgba(255,255,255,0.8)", letterSpacing: 0.4, whiteSpace: "nowrap" }}>
          <Ic.Clock s={10} c="rgba(255,255,255,0.7)"/>
          <span>{story.read} MIN</span>
        </div>
      </div>

      {/* Tags — subtle, between kicker and headline */}
      <div style={{ position: "absolute", top: 170, left: 22, right: 82, display: "flex", flexWrap: "wrap", gap: 6, zIndex: 10 }}>
        {story.tags.map(t => (
          <span key={t} style={{ fontFamily: TOK.mono, fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 0.6 }}>#{t}</span>
        ))}
      </div>

      {/* EDITORIAL — serif headline */}
      <div style={{ position: "absolute", bottom: 84, left: 22, right: 82, zIndex: 10 }}>
        {/* Bubl summary badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 11px 4px 6px", borderRadius: 100, background: "rgba(255,255,255,0.14)", border: "0.5px solid rgba(255,255,255,0.22)", backdropFilter: "blur(12px)", marginBottom: 14 }}>
          <Bubl size={16} stage={2} animated={false}/>
          <span style={{ fontFamily: TOK.mono, fontSize: 9.5, fontWeight: 600, color: "#fff", letterSpacing: 1.3 }}>BUBL SUMMARY</span>
        </div>

        <h2 onClick={onExpand} style={{
          fontFamily: TOK.serif, fontSize: 25, fontWeight: 400,
          color: "#fff", lineHeight: 1.12, letterSpacing: -0.5,
          margin: "0 0 10px", cursor: "pointer",
          textShadow: "0 1px 20px rgba(0,0,0,0.3)",
        }}>{story.headline}</h2>

        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.5, margin: "0 0 14px", letterSpacing: -0.1 }}>
          {story.deck}
        </p>

        {/* Source + bias inline */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, paddingBottom: 8, borderTop: "0.5px solid rgba(255,255,255,0.15)" }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TOK.serif, fontSize: 10.5, color: "#fff", letterSpacing: -0.3, fontWeight: 500 }}>
            {story.srcMark}
          </div>
          <div style={{ flex: 1, fontSize: 11.5, letterSpacing: -0.05, lineHeight: 1.25 }}>
            <div style={{ color: "#fff", fontWeight: 500 }}>{story.source}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10 }}>
              <span>{story.time}</span>
              <span style={{ margin: "0 6px" }}>·</span>
              <span>{story.outlets} outlets · {story.biasLabel}</span>
            </div>
          </div>
          <button onClick={onExpand} style={{
            padding: "7px 14px", borderRadius: 100, background: "#fff", border: "none",
            fontSize: 11.5, fontWeight: 600, color: TOK.ink, letterSpacing: -0.1, cursor: "pointer",
          }}>Read →</button>
        </div>

        {/* AI follow-up pills */}
        {followups.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 10, overflow: "auto", paddingBottom: 2 }}>
            {followups.map((q, i) => (
              <button key={i} onClick={() => { handleAsk(q); setAskInput(""); }} style={{
                padding: "6px 11px", borderRadius: 100,
                background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.18)",
                color: "#fff", fontSize: 11, letterSpacing: -0.05, cursor: "pointer",
                whiteSpace: "nowrap", fontFamily: TOK.sans,
              }}>{q}</button>
            ))}
          </div>
        )}

        {/* Ask anything input */}
        <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center", padding: "9px 14px", background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.18)", borderRadius: 100, backdropFilter: "blur(16px)" }}>
          <Bubl size={17} stage={2} animated={false}/>
          <input value={askInput} onChange={e => setAskInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && askInput) { handleAsk(askInput); setAskInput(""); } }}
            placeholder="Ask Bubl about this…"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 12.5, letterSpacing: -0.1, fontFamily: TOK.sans }}/>
          <button onClick={() => { handleAsk(askInput); setAskInput(""); }} style={{ width: 26, height: 26, borderRadius: 13, background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic.Chev s={12} c="#fff" rot={-90}/>
          </button>
        </div>
      </div>

      {/* RAIL */}
      <div style={{ position: "absolute", right: 16, bottom: 220, display: "flex", flexDirection: "column", gap: 18, zIndex: 15 }}>
        <RailBtn Icon={Ic.Heart} fill={liked} label={(story.likes + (liked ? 1 : 0)).toLocaleString()} onClick={handleLike} highlight={liked}/>
        <RailBtn Icon={Ic.Chat} label={story.comments} onClick={onComment}/>
        <RailBtn Icon={Ic.Bookmark} fill={saved} label="Save" onClick={onSave} highlight={saved}/>
        <RailBtn Icon={Ic.Share} label="Share"/>
      </div>
    </div>
  );
};

const RailBtn = ({ Icon, label, onClick, fill, highlight }) => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button onClick={onClick} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerLeave={() => setPressed(false)} style={{
      background: "none", border: "none", cursor: "pointer", padding: 0,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      transform: pressed ? "scale(0.9)" : "scale(1)",
      transition: "transform 0.15s cubic-bezier(.2,.9,.25,1.4)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 22,
        background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon s={21} c={highlight ? TOK.irisPink : "#fff"} fill={fill} sw={1.5}/>
      </div>
      <span style={{ fontFamily: TOK.mono, fontSize: 9.5, color: "#fff", letterSpacing: 0.3, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{label}</span>
    </button>
  );
};

Object.assign(window, { StoryCard, RailBtn });
