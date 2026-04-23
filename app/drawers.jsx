// ━━━ ASK PULSE DRAWER + VIDEO DISCUSSION DRAWER ━━━━━━━━━━━━━━━━━━━━━━━

const AskPulseDrawer = ({ story, initialQuestion, onClose }) => {
  const [msgs, setMsgs] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef(null);

  // Canned answers for demo
  const ANSWERS = {
    default: "Based on the article and 12 related sources: the Fed's tone shifted notably this week. Powell emphasized 'patience' but markets priced in two cuts by December. The key data point is core PCE at 2.3%.",
    "Why does the 10-year yield matter?": "The 10-year Treasury yield is the baseline rate for long-term borrowing — mortgages, corporate debt, and equity valuations all reference it. When it falls, housing becomes more affordable and growth stocks typically rally. It's down from 4.4% to 3.9% this week.",
    "How does this affect mortgages?": "30-year mortgage rates follow the 10-year yield closely, not the Fed's policy rate directly. A 50bp drop in yields typically translates to ~40bp off mortgages within 2-3 weeks. For a $400K loan, that's roughly $95/month saved.",
    "Who benefits from rate cuts?": "Borrowers first — anyone with variable debt, prospective home buyers, and companies that carry floating-rate debt. Savers lose yield on cash. Equities tend to rally, especially small-caps and rate-sensitive sectors like housing and utilities.",
  };

  const ask = (q) => {
    if (!q.trim()) return;
    setMsgs(prev => [...prev, { role: "user", text: q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, { role: "bubl", text: ANSWERS[q] || ANSWERS.default, sources: [story.source, "Bloomberg", "Reuters"] }]);
    }, 1200);
  };

  React.useEffect(() => {
    if (initialQuestion) ask(initialQuestion);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      display: "flex", flexDirection: "column",
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
      animation: "fadeIn 0.3s ease",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20%); } to { transform: translateY(0); } }
        @keyframes typingDot { 0%, 60%, 100% { opacity: 0.3; } 30% { opacity: 1; } }
      `}</style>

      {/* Tap to close above */}
      <div onClick={onClose} style={{ height: "15%" }}/>

      {/* Sheet */}
      <div style={{
        flex: 1, background: TOK.paper, borderRadius: "28px 28px 0 0",
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: "slideUp 0.35s cubic-bezier(.2,.9,.3,1.1)",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.3)",
      }}>
        {/* Handle + header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10 }}>
          <div style={{ width: 44, height: 4, background: TOK.ink10, borderRadius: 3 }}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Bubl size={28} stage={2} mood="think"/>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: TOK.ink, fontFamily: TOK.sans, letterSpacing: -0.2 }}>Ask Pulse</div>
              <div style={{ fontSize: 11, color: TOK.ink60, fontFamily: TOK.mono, letterSpacing: 0.3 }}>Grounded in 12 sources</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 16, border: "none", background: TOK.ink06,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <Ic.Close s={18} c={TOK.ink}/>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "8px 20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {msgs.length === 0 && (
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <Bubl size={64} stage={3} mood="greet"/>
              <div style={{ fontFamily: TOK.serif, fontSize: 22, color: TOK.ink, marginTop: 10, letterSpacing: -0.4 }}>Hi, I'm Bubl.</div>
              <div style={{ fontSize: 13.5, color: TOK.ink60, marginTop: 4, lineHeight: 1.5 }}>Ask me anything about this story. I'll ground my answers<br/>in the original reporting.</div>
            </div>
          )}

          {msgs.map((m, i) => m.role === "user" ? (
            <div key={i} style={{ alignSelf: "flex-end", maxWidth: "80%" }}>
              <div style={{
                padding: "10px 14px", background: TOK.ink, color: "#fff",
                fontSize: 14, lineHeight: 1.45, borderRadius: "18px 18px 4px 18px",
                letterSpacing: -0.1,
              }}>{m.text}</div>
            </div>
          ) : (
            <div key={i} style={{ maxWidth: "90%", display: "flex", gap: 10 }}>
              <div style={{ flexShrink: 0, paddingTop: 2 }}><Bubl size={28} stage={2}/></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{
                  padding: "10px 14px", background: "#fff", border: `0.5px solid ${TOK.line}`,
                  fontSize: 14, lineHeight: 1.5, borderRadius: "4px 18px 18px 18px",
                  color: TOK.ink, letterSpacing: -0.05,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}>{m.text}</div>
                {m.sources && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingLeft: 4 }}>
                    {m.sources.map((s, j) => (
                      <div key={j} style={{
                        fontSize: 10.5, fontFamily: TOK.mono, letterSpacing: 0.3,
                        padding: "3px 8px", borderRadius: 4, background: TOK.ink04,
                        color: TOK.ink60,
                      }}>{s}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: "flex", gap: 10 }}>
              <Bubl size={28} stage={2} mood="think"/>
              <div style={{ padding: "14px 16px", background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: "4px 18px 18px 18px", display: "flex", gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 5, height: 5, background: TOK.ink40, borderRadius: "50%", animation: `typingDot 1.2s infinite`, animationDelay: `${i * 0.15}s` }}/>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "12px 16px 16px", borderTop: `0.5px solid ${TOK.line}`, background: TOK.paper }}>
          {msgs.length === 0 && FOLLOWUPS[story.id] && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 10, paddingBottom: 2 }}>
              {FOLLOWUPS[story.id].map((s, i) => (
                <button key={i} onClick={() => ask(s)} style={{
                  flexShrink: 0, padding: "8px 14px", borderRadius: 100,
                  background: "#fff", border: `0.5px solid ${TOK.line}`,
                  color: TOK.ink, fontSize: 12.5, fontWeight: 400, cursor: "pointer",
                  whiteSpace: "nowrap", letterSpacing: -0.1,
                }}>{s}</button>
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 6px 8px 14px", background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: 100 }}>
            <input
              type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && input.trim()) { ask(input); setInput(""); } }}
              placeholder="Ask a follow-up..."
              style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: TOK.sans, background: "transparent", letterSpacing: -0.1 }}
            />
            <button onClick={() => { if (input.trim()) { ask(input); setInput(""); } }} style={{
              width: 34, height: 34, borderRadius: 17, border: "none", cursor: "pointer",
              background: TOK.ink, display: "flex", alignItems: "center", justifyContent: "center",
              opacity: input.trim() ? 1 : 0.4, transition: "opacity 0.2s",
            }}>
              <Ic.ArrowUp s={16} c="#fff"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ━━━ VIDEO DISCUSSION — TikTok-style reply feed ━━━━━━━━━━━━━━━━━━━━━━━

const VideoDiscussion = ({ story, onClose }) => {
  const [idx, setIdx] = React.useState(0);
  const videos = VIDEO_DISCUSSIONS.fed; // demo data
  const v = videos[idx];

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 60,
      background: "#000", display: "flex", flexDirection: "column",
      animation: "fadeIn 0.3s ease",
    }}>
      {/* Header */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        padding: "52px 16px 12px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 18, border: "none",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(14px)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <Ic.Close s={20} c="#fff"/>
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: -0.1 }}>Discussion</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10.5, fontFamily: TOK.mono, letterSpacing: 0.5 }}>{videos.length} VIDEO REPLIES</div>
        </div>
        <div style={{ width: 36 }}/>
      </div>

      {/* Video player — takes full height */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 30% 40%, ${v.avatar}40 0%, #1a1a1a 60%, #000 100%)`,
      }}>
        {/* Fake video frame with subject silhouette */}
        <div style={{
          position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)",
          width: 140, height: 140, borderRadius: "50%",
          background: v.avatar, opacity: 0.85,
          boxShadow: `0 20px 60px ${v.avatar}80`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontSize: 48, fontFamily: TOK.serif, color: "rgba(0,0,0,0.5)", fontWeight: 400 }}>
            {v.user[1].toUpperCase()}
          </div>
        </div>
        {/* Play hint */}
        <div style={{
          position: "absolute", top: "42%", left: "50%", transform: "translate(-50%, -50%)",
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 0, height: 0, borderLeft: "16px solid #fff", borderTop: "10px solid transparent", borderBottom: "10px solid transparent", marginLeft: 4 }}/>
        </div>
        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 220, left: 16, right: 16, height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 1 }}>
          <div style={{ width: "38%", height: "100%", background: "#fff", borderRadius: 1 }}/>
        </div>
      </div>

      {/* Right rail on video */}
      <div style={{
        position: "absolute", right: 14, bottom: 260, zIndex: 10,
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        <RailAction Icon={Ic.Heart} label="1.2K"/>
        <RailAction Icon={Ic.Comment} label="48"/>
        <RailAction Icon={Ic.Share} label="Share"/>
      </div>

      {/* Bottom — user info + context + navigation */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: "100px 16px 20px", paddingRight: 82,
        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 19, background: v.avatar, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TOK.serif, color: "rgba(0,0,0,0.5)", fontSize: 17 }}>
            {v.user[1].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: -0.1 }}>{v.user}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11.5, letterSpacing: -0.05 }}>{v.role}</div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: TOK.mono, fontSize: 11 }}>
            {v.duration}
          </div>
        </div>

        <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.45, marginBottom: 14, letterSpacing: -0.1 }}>
          "Replying to <span style={{ color: "#fff", fontWeight: 500 }}>{story.source}</span> — the 10-year yield move is the real story here, not the Fed language..."
        </div>

        {/* Record button */}
        <button style={{
          width: "100%", padding: "12px 16px", borderRadius: 14,
          background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px)", color: "#fff",
          fontSize: 14, fontWeight: 500, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          letterSpacing: -0.1,
        }}>
          <Ic.Video s={18} c="#fff"/>
          Record your reply
        </button>
      </div>

      {/* Video nav — tiny pips on left */}
      <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 4, zIndex: 5 }}>
        {videos.map((_, i) => (
          <div key={i} style={{
            width: 2, height: i === idx ? 20 : 10,
            background: i === idx ? "#fff" : "rgba(255,255,255,0.3)",
            borderRadius: 1, transition: "all 0.3s",
          }}/>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { AskPulseDrawer, VideoDiscussion });
