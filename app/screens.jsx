// ━━━ SECONDARY SCREENS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// BRIEFING — 2-min video summary
const BriefingScreen = () => {
  return (
    <div style={{ position: "absolute", inset: 0, background: TOK.paper, overflow: "auto" }}>
      <TopHeader title="Daily Briefing" subtitle="TUE, APR 23"/>

      {/* Hero video card */}
      <div style={{ margin: "0 16px 20px" }}>
        <div style={{
          position: "relative", aspectRatio: "9/12", borderRadius: 20, overflow: "hidden",
          background: `linear-gradient(160deg, ${TOK.irisLilac}, ${TOK.irisSky}, ${TOK.irisMint})`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        }}>
          {/* Bubble "anchor" */}
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)" }}>
            <Bubl size={120} stage={4} mood="greet"/>
          </div>
          <div style={{
            position: "absolute", bottom: 20, left: 20, right: 20,
            padding: 16, background: "rgba(10,10,11,0.75)", backdropFilter: "blur(20px)",
            borderRadius: 14,
          }}>
            <div style={{ fontFamily: TOK.mono, fontSize: 10, color: "rgba(255,255,255,0.65)", letterSpacing: 1.2, marginBottom: 8 }}>2 MIN · AI GENERATED</div>
            <div style={{ fontFamily: TOK.serif, fontSize: 20, color: "#fff", lineHeight: 1.2, letterSpacing: -0.3 }}>Your morning, in two minutes.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
              <button style={{
                width: 44, height: 44, borderRadius: 22, border: "none", background: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 0, height: 0, borderLeft: "12px solid #000", borderTop: "8px solid transparent", borderBottom: "8px solid transparent", marginLeft: 3 }}/>
              </button>
              <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2 }}>
                <div style={{ width: 0, height: "100%", background: "#fff", borderRadius: 2 }}/>
              </div>
              <div style={{ fontFamily: TOK.mono, fontSize: 11, color: "rgba(255,255,255,0.8)", letterSpacing: 0.3 }}>2:14</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's chapters */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ fontFamily: TOK.mono, fontSize: 10.5, letterSpacing: 1.5, color: TOK.ink60, marginBottom: 12 }}>IN THIS BRIEFING</div>
        {[
          { t: "Fed signals rate cuts", k: "Markets", d: "0:12" },
          { t: "EU adtech case advances", k: "Policy", d: "0:42" },
          { t: "Alzheimer's trial reversal", k: "Health", d: "1:05" },
          { t: "Solar overtakes coal", k: "Climate", d: "1:38" },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderTop: `0.5px solid ${TOK.line}` }}>
            <div style={{ width: 28, textAlign: "center", fontFamily: TOK.mono, fontSize: 11, color: TOK.ink40 }}>0{i+1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, color: TOK.ink, fontWeight: 500, letterSpacing: -0.15, marginBottom: 2 }}>{c.t}</div>
              <div style={{ fontFamily: TOK.mono, fontSize: 10.5, color: TOK.ink60, letterSpacing: 0.3 }}>{c.k.toUpperCase()}</div>
            </div>
            <div style={{ fontFamily: TOK.mono, fontSize: 11, color: TOK.ink40, letterSpacing: 0.3 }}>{c.d}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 100 }}/>
    </div>
  );
};

// DISCOVER — search + trending topics
const DiscoverScreen = () => {
  const topics = [
    { t: "Markets & Fed", n: 28, c: TOK.irisSky },
    { t: "AI & Tech", n: 44, c: TOK.irisLilac },
    { t: "Climate", n: 18, c: TOK.irisMint },
    { t: "Elections 2026", n: 62, c: TOK.irisPink },
    { t: "Health", n: 12, c: TOK.irisPeach },
    { t: "Culture", n: 24, c: TOK.irisLemon },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: TOK.paper, overflow: "auto" }}>
      <TopHeader title="Discover" subtitle="WHAT'S MOVING TODAY"/>

      {/* Search */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: 100 }}>
          <Ic.Search s={18} c={TOK.ink60}/>
          <input placeholder="Search stories, topics, sources..." style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent", letterSpacing: -0.1 }}/>
          <button style={{ width: 28, height: 28, borderRadius: 14, border: "none", background: TOK.ink06, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Ic.Mic s={14} c={TOK.ink}/>
          </button>
        </div>
      </div>

      {/* Trending */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ fontFamily: TOK.mono, fontSize: 10.5, letterSpacing: 1.5, color: TOK.ink60, marginBottom: 14 }}>TRENDING NOW</div>
        {["Fed rate decision", "Google antitrust ruling", "Alzheimer's breakthrough", "Solar surpasses coal", "Gen Z voter turnout"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: i === 0 ? `0.5px solid ${TOK.line}` : "none", borderBottom: `0.5px solid ${TOK.line}` }}>
            <div style={{ width: 24, textAlign: "center", fontFamily: TOK.serif, fontSize: 18, color: TOK.ink40, fontWeight: 400, fontStyle: "italic" }}>{i+1}</div>
            <div style={{ flex: 1, fontSize: 14.5, color: TOK.ink, fontWeight: 500, letterSpacing: -0.15 }}>{t}</div>
            <div style={{ fontFamily: TOK.mono, fontSize: 10.5, color: TOK.ink40, letterSpacing: 0.3 }}>{1000 + i * 417}</div>
          </div>
        ))}
      </div>

      {/* Topics grid */}
      <div style={{ padding: "28px 16px 0" }}>
        <div style={{ fontFamily: TOK.mono, fontSize: 10.5, letterSpacing: 1.5, color: TOK.ink60, marginBottom: 14, paddingLeft: 4 }}>TOPICS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {topics.map((t, i) => (
            <div key={i} style={{
              aspectRatio: "1/0.78", borderRadius: 16, padding: 14,
              background: `linear-gradient(140deg, ${t.c}40, ${t.c}15)`,
              border: `0.5px solid ${t.c}`,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: TOK.ink, letterSpacing: -0.2 }}>{t.t}</div>
              <div style={{ fontFamily: TOK.mono, fontSize: 10.5, color: TOK.ink60, letterSpacing: 0.3 }}>{t.n} STORIES</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 100 }}/>
    </div>
  );
};

// PROFILE — bubble stage, streaks, etc.
const ProfileScreen = () => {
  const [stage, setStage] = React.useState(2);  // demo: let user click to cycle stages
  const stageNames = ["Newborn", "Drifter", "Explorer", "Reader", "Luminary"];
  return (
    <div style={{ position: "absolute", inset: 0, background: TOK.paper, overflow: "auto" }}>
      <TopHeader title="You" subtitle="" actions={[{ Icon: Ic.Dots }]}/>

      {/* Bubble hero — evolves */}
      <div style={{ padding: "0 20px 20px", textAlign: "center" }}>
        <div onClick={() => setStage((stage + 1) % 5)} style={{ display: "inline-block", cursor: "pointer", padding: 20 }}>
          <Bubl size={140} stage={stage} mood="happy"/>
        </div>
        <div style={{ fontFamily: TOK.serif, fontSize: 26, letterSpacing: -0.5, color: TOK.ink, marginTop: 4 }}>Antonio</div>
        <div style={{ fontFamily: TOK.mono, fontSize: 11, color: TOK.ink60, letterSpacing: 1.2, marginTop: 2 }}>
          BUBL · STAGE {stage+1} · {stageNames[stage].toUpperCase()}
        </div>
      </div>

      {/* Stat row */}
      <div style={{ margin: "0 16px 20px", padding: "18px 20px", background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {[
          { n: "43", l: "DAY STREAK" },
          { n: "1,284", l: "STORIES READ" },
          { n: "312", l: "BRIEFINGS" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center", borderLeft: i > 0 ? `0.5px solid ${TOK.line}` : "none" }}>
            <div style={{ fontFamily: TOK.serif, fontSize: 28, letterSpacing: -0.6, color: TOK.ink, fontWeight: 400 }}>{s.n}</div>
            <div style={{ fontFamily: TOK.mono, fontSize: 9.5, color: TOK.ink60, letterSpacing: 1, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Bubble evolution track */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ fontFamily: TOK.mono, fontSize: 10.5, letterSpacing: 1.5, color: TOK.ink60, marginBottom: 14 }}>BUBL EVOLUTION</div>
        <div style={{ padding: "18px 14px", background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
            {[0, 1, 2, 3, 4].map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: s <= stage ? 1 : 0.35 }}>
                <Bubl size={36 + s * 4} stage={s} animated={false}/>
                <div style={{ fontFamily: TOK.mono, fontSize: 9, color: TOK.ink60, letterSpacing: 0.5 }}>{stageNames[s].toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 3, background: TOK.ink06, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(stage / 4) * 100}%`, background: TOK.ink, borderRadius: 2 }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontFamily: TOK.mono, fontSize: 10, color: TOK.ink60, letterSpacing: 0.3 }}>
            <span>68% to next stage</span>
            <span>{43 * 10 - 12} XP to Luminary</span>
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div style={{ padding: "28px 20px 0" }}>
        <div style={{ fontFamily: TOK.mono, fontSize: 10.5, letterSpacing: 1.5, color: TOK.ink60, marginBottom: 10 }}>SETTINGS</div>
        <div style={{ background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: 16, overflow: "hidden" }}>
          {["Notifications", "Sources & bias", "Language", "Privacy", "Subscription — Pulse+"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderTop: i > 0 ? `0.5px solid ${TOK.line}` : "none" }}>
              <span style={{ fontSize: 14.5, color: TOK.ink, letterSpacing: -0.1 }}>{s}</span>
              <span style={{ color: TOK.ink40, fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 120 }}/>
    </div>
  );
};

// Shared header for light screens
const TopHeader = ({ title, subtitle, actions }) => (
  <div style={{ padding: "54px 20px 18px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
    <div>
      <div style={{ fontFamily: TOK.serif, fontSize: 34, fontWeight: 400, letterSpacing: -1, color: TOK.ink, lineHeight: 1 }}>{title}</div>
      {subtitle && <div style={{ fontFamily: TOK.mono, fontSize: 10.5, color: TOK.ink60, letterSpacing: 1.5, marginTop: 6 }}>{subtitle}</div>}
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {(actions || [{ Icon: Ic.Search }]).map((a, i) => (
        <button key={i} style={{ width: 38, height: 38, borderRadius: 19, border: `0.5px solid ${TOK.line}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <a.Icon s={18} c={TOK.ink}/>
        </button>
      ))}
    </div>
  </div>
);

Object.assign(window, { BriefingScreen, DiscoverScreen, ProfileScreen, TopHeader });
