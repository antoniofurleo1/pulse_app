// ━━━ OVERLAYS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// EXPANDED ARTICLE — sheet slides up from card
const ExpandedArticle = ({ story, onClose }) => {
  if (!story) return null;
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 60,
      background: TOK.paper, overflow: "auto",
      animation: "slideUp 0.4s cubic-bezier(.2,.9,.25,1)",
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

      {/* Close */}
      <div style={{ position: "sticky", top: 0, padding: "50px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: TOK.paper, zIndex: 2 }}>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 18, border: `0.5px solid ${TOK.line}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Ic.Chev s={16} c={TOK.ink} rot={90}/>
        </button>
        <div style={{ fontFamily: TOK.mono, fontSize: 10.5, color: TOK.ink60, letterSpacing: 1.2 }}>{story.kicker.toUpperCase()}</div>
        <button style={{ width: 36, height: 36, borderRadius: 18, border: `0.5px solid ${TOK.line}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Ic.Share s={16} c={TOK.ink}/>
        </button>
      </div>

      {/* Article body */}
      <div style={{ padding: "12px 22px 40px" }}>
        <h1 style={{ fontFamily: TOK.serif, fontSize: 32, lineHeight: 1.12, letterSpacing: -0.8, color: TOK.ink, fontWeight: 400, margin: "8px 0 20px" }}>{story.title}</h1>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 18, borderBottom: `0.5px solid ${TOK.line}` }}>
          <div style={{ fontSize: 12, color: TOK.ink60, letterSpacing: -0.1 }}>By {story.byline} · {story.readTime} min read</div>
        </div>

        {/* AI summary card — prominent */}
        <div style={{ padding: "18px 20px", background: `linear-gradient(160deg, ${TOK.irisLilac}20, ${TOK.irisSky}15)`, border: `0.5px solid ${TOK.line}`, borderRadius: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Bubl size={20} stage={2} animated={false}/>
            <div style={{ fontFamily: TOK.mono, fontSize: 10, color: TOK.ink, letterSpacing: 1.4, fontWeight: 600 }}>BUBL'S TAKE</div>
          </div>
          <div style={{ fontFamily: TOK.serif, fontSize: 16, lineHeight: 1.5, color: TOK.ink, letterSpacing: -0.1, fontStyle: "italic" }}>{story.bublTake}</div>
        </div>

        {/* Body */}
        {story.body.map((para, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.65, color: TOK.ink, letterSpacing: -0.1, margin: "0 0 18px" }}>{para}</p>
        ))}

        {/* Bias context */}
        <div style={{ marginTop: 24, padding: "20px 20px", background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: 16 }}>
          <div style={{ fontFamily: TOK.mono, fontSize: 10.5, letterSpacing: 1.4, color: TOK.ink60, marginBottom: 14 }}>COVERAGE CONTEXT</div>
          <BiasSpectrum bias={story.bias}/>
          <div style={{ marginTop: 12, fontSize: 13, color: TOK.ink60, lineHeight: 1.5, letterSpacing: -0.1 }}>
            {story.sources} outlets across the spectrum covered this. Click to see how different sources framed it.
          </div>
        </div>

        {/* Ask follow-up */}
        <div style={{ marginTop: 24, padding: "18px 18px", background: TOK.ink, borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Bubl size={24} stage={2} animated={false}/>
            <div style={{ fontFamily: TOK.serif, fontSize: 16, color: "#fff", letterSpacing: -0.2, fontStyle: "italic" }}>Have a question about this?</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {story.suggestedQs.map((q, i) => (
              <button key={i} style={{
                padding: "7px 12px", borderRadius: 100, background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)",
                color: "#fff", fontSize: 12, letterSpacing: -0.05, cursor: "pointer",
              }}>{q}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.08)", borderRadius: 100, border: "0.5px solid rgba(255,255,255,0.15)" }}>
            <input placeholder="Ask Bubl anything..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 13.5, letterSpacing: -0.1 }}/>
            <button style={{ width: 30, height: 30, borderRadius: 15, background: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Ic.Chev s={14} c={TOK.ink} rot={-90}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// BIAS SPECTRUM — honest, editorial
const BiasSpectrum = ({ bias }) => {
  // bias is -1 to 1
  const pct = (bias + 1) * 50;
  const label = bias < -0.5 ? "Left-leaning" : bias < -0.15 ? "Center-left" : bias < 0.15 ? "Center" : bias < 0.5 ? "Center-right" : "Right-leaning";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: TOK.mono, fontSize: 9.5, color: TOK.ink40, letterSpacing: 0.5, marginBottom: 6 }}>
        <span>L</span>
        <span style={{ color: TOK.ink, letterSpacing: 0.3, fontWeight: 600 }}>{label.toUpperCase()}</span>
        <span>R</span>
      </div>
      <div style={{ position: "relative", height: 2, background: `linear-gradient(to right, #60A5FA, #E5E7EB 50%, #F87171)`, borderRadius: 1 }}>
        <div style={{ position: "absolute", top: -5, left: `${pct}%`, transform: "translateX(-50%)", width: 12, height: 12, borderRadius: 6, background: "#fff", border: `1.5px solid ${TOK.ink}`, boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}/>
      </div>
    </div>
  );
};

// VIDEO DISCUSSION — TikTok-style comment section with video replies + text
const VideoDiscussion = ({ story, onClose }) => {
  if (!story) return null;
  const [tab, setTab] = React.useState("videos"); // "videos" or "text"
  const [comments, setComments] = React.useState([
    { id: 1, author: "Sarah Chen", avatar: TOK.irisMint, role: "Economist", text: "This yield curve signal is huge — haven't seen this kind of inversion resolve this cleanly since 2020.", likes: 324, video: true },
    { id: 2, author: "James R.", avatar: TOK.irisPeach, role: "Markets analyst", text: "The key thing everyone's missing: the Fed's terminal rate is lower than expected. That's the real story.", likes: 187, video: true },
    { id: 3, author: "Maya Patel", avatar: TOK.irisLilac, role: "Homebuyer", text: "Does this mean mortgage rates will actually come down? Tired of waiting.", likes: 92, video: false, timestamp: "2h ago" },
  ]);
  const [input, setInput] = React.useState("");

  const addComment = () => {
    if (!input.trim()) return;
    setComments(c => [...c, {
      id: c.length + 1,
      author: "You",
      avatar: TOK.irisSky,
      role: "Reader",
      text: input,
      likes: 0,
      video: false,
      timestamp: "now",
    }]);
    setInput("");
  };

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 100,
      background: TOK.paper,
      display: "flex", flexDirection: "column",
      animation: "slideUp 0.4s cubic-bezier(.2,.9,.25,1)",
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

      {/* Header */}
      <div style={{ padding: "50px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: TOK.paper }}>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 18, border: `0.5px solid ${TOK.line}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Ic.Chev s={16} c={TOK.ink} rot={90}/>
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: TOK.serif, fontSize: 18, color: TOK.ink, letterSpacing: -0.3 }}>Discussion</div>
          <div style={{ fontFamily: TOK.mono, fontSize: 9.5, color: TOK.ink60, letterSpacing: 1.2, marginTop: 2 }}>{comments.length} REPLIES</div>
        </div>
        <div style={{ width: 36 }}/>
      </div>

      {/* Tab selector */}
      <div style={{ display: "flex", gap: 2, padding: "0 16px 12px", borderBottom: `0.5px solid ${TOK.line}` }}>
        <button onClick={() => setTab("videos")} style={{
          flex: 1, padding: "10px 12px", border: "none", background: "transparent", cursor: "pointer",
          borderBottom: tab === "videos" ? `2px solid ${TOK.ink}` : "2px solid transparent",
          color: tab === "videos" ? TOK.ink : TOK.ink60,
          fontFamily: TOK.mono, fontSize: 11, fontWeight: 600, letterSpacing: 0.8,
          transition: "all 0.3s",
        }}>🎬 VIDEO REPLIES</button>
        <button onClick={() => setTab("text")} style={{
          flex: 1, padding: "10px 12px", border: "none", background: "transparent", cursor: "pointer",
          borderBottom: tab === "text" ? `2px solid ${TOK.ink}` : "2px solid transparent",
          color: tab === "text" ? TOK.ink : TOK.ink60,
          fontFamily: TOK.mono, fontSize: 11, fontWeight: 600, letterSpacing: 0.8,
          transition: "all 0.3s",
        }}>💬 COMMENTS</button>
      </div>

      {/* Comment list */}
      <div style={{ flex: 1, overflow: "auto", padding: "12px 0" }}>
        {comments.map((c) => {
          const isVideo = c.video && tab === "videos";
          const isText = !c.video && tab === "text";
          if (!isVideo && !isText) return null;

          return (
            <div key={c.id} style={{
              padding: "14px 16px", borderBottom: `0.5px solid ${TOK.line}`,
              transition: "background 0.2s",
            }} onMouseEnter={e => e.currentTarget.style.background = TOK.ink06} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {/* Video reply — bigger, thumbnail */}
              {c.video && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{
                    width: "100%", height: 200, background: `linear-gradient(135deg, ${c.avatar}40 0%, ${c.avatar}10 100%)`,
                    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden", cursor: "pointer",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2), transparent 60%)",
                    }}/>
                    {/* Play button */}
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
                      display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.3)",
                      position: "relative", zIndex: 2,
                    }}>
                      <div style={{ width: 0, height: 0, borderLeft: "12px solid #fff", borderTop: "8px solid transparent", borderBottom: "8px solid transparent", marginLeft: 2 }}/>
                    </div>
                    {/* Duration badge */}
                    <div style={{
                      position: "absolute", bottom: 10, right: 10, padding: "4px 8px", background: "rgba(0,0,0,0.6)",
                      borderRadius: 4, fontFamily: TOK.mono, fontSize: 10, color: "#fff", zIndex: 2,
                    }}>0:42</div>
                  </div>
                </div>
              )}

              {/* Author info */}
              <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 18, background: c.avatar,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: TOK.serif, color: "rgba(0,0,0,0.4)", fontSize: 14, fontWeight: 600,
                  flexShrink: 0,
                }}>{c.author[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: TOK.ink, letterSpacing: -0.1 }}>{c.author}</div>
                    <div style={{ fontFamily: TOK.mono, fontSize: 10, color: TOK.ink60, letterSpacing: 0.5 }}>{c.role}</div>
                  </div>
                  {c.timestamp && <div style={{ fontFamily: TOK.mono, fontSize: 10, color: TOK.ink40, letterSpacing: 0.3 }}>{c.timestamp}</div>}
                </div>
              </div>

              {/* Text */}
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: TOK.ink, marginBottom: 10, letterSpacing: -0.1 }}>
                {c.text}
              </div>

              {/* Engagement */}
              <div style={{ display: "flex", gap: 16, fontFamily: TOK.mono, fontSize: 11, color: TOK.ink60, letterSpacing: 0.3 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: TOK.ink60, fontSize: 11, letterSpacing: 0.3, padding: 0 }}>♥ {c.likes}</button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: TOK.ink60, fontSize: 11, letterSpacing: 0.3, padding: 0 }}>REPLY</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input — sticky footer */}
      <div style={{ padding: "12px 16px 20px", background: TOK.paper, borderTop: `0.5px solid ${TOK.line}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#fff", border: `0.5px solid ${TOK.line}`, borderRadius: 100 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && input.trim()) { addComment(); } }}
            placeholder="Add your thoughts…"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: TOK.ink, fontSize: 13.5, letterSpacing: -0.1 }}
          />
          <button onClick={addComment} style={{
            width: 34, height: 34, borderRadius: 17, background: input.trim() ? TOK.ink : TOK.ink06,
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}>
            <Ic.Chev s={14} c={input.trim() ? "#fff" : TOK.ink40} rot={-90}/>
          </button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ExpandedArticle, VideoDiscussion, BiasSpectrum });
