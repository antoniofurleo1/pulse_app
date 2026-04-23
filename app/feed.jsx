// ━━━ FEED — vertical snap-scroll feed (TikTok-style) ━━━━━━━━━━━━━━━━━━━━

const FeedScreen = ({ onAsk, onDiscuss, onExpand, liked, saved, onLike, onSave }) => {
  const [idx, setIdx] = React.useState(0);
  const [dragY, setDragY] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const startY = React.useRef(0);
  const containerRef = React.useRef(null);

  const go = (next) => {
    const n = Math.max(0, Math.min(STORIES.length - 1, next));
    setIdx(n);
  };

  const onPointerDown = e => { startY.current = e.clientY || e.touches?.[0]?.clientY || 0; setDragging(true); };
  const onPointerMove = e => {
    if (!dragging) return;
    const y = e.clientY || e.touches?.[0]?.clientY || 0;
    setDragY(y - startY.current);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragY < -60) go(idx + 1);
    else if (dragY > 60) go(idx - 1);
    setDragY(0);
  };

  React.useEffect(() => {
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) go(idx + 1);
      else go(idx - 1);
    };
    const el = containerRef.current;
    if (el) el.addEventListener("wheel", onWheel, { passive: true });
    return () => { if (el) el.removeEventListener("wheel", onWheel); };
  }, [idx]);

  return (
    <div ref={containerRef}
      onMouseDown={onPointerDown} onMouseMove={onPointerMove} onMouseUp={onPointerUp} onMouseLeave={onPointerUp}
      onTouchStart={onPointerDown} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}
      style={{
        position: "absolute", inset: 0, overflow: "hidden",
        userSelect: "none", cursor: dragging ? "grabbing" : "grab",
      }}>
      {STORIES.map((story, i) => {
        const offset = (i - idx) * 100 + (dragging ? (dragY / 8) : 0);
        const isCurrent = i === idx;
        const isNearby = Math.abs(i - idx) <= 1;
        if (!isNearby) return null;
        return (
          <div key={story.id} style={{
            position: "absolute", inset: 0,
            transform: `translateY(${offset}%) scale(${isCurrent ? 1 : 0.96})`,
            transition: dragging ? "none" : "transform 0.5s cubic-bezier(.2,.9,.25,1.05)",
            opacity: isCurrent ? 1 : 0.6,
          }}>
            <StoryCard
              story={story}
              liked={liked.has(story.id)}
              saved={saved.has(story.id)}
              onLike={() => onLike(story.id)}
              onSave={() => onSave(story.id)}
              onComment={() => onDiscuss(story)}
              onAsk={(q) => onAsk(story, q)}
              onExpand={() => onExpand(story)}
            />
          </div>
        );
      })}

      {/* Page indicator — tiny dots left side */}
      <div style={{
        position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 4, zIndex: 4,
      }}>
        {STORIES.map((_, i) => (
          <div key={i} style={{
            width: 2, height: i === idx ? 24 : 10,
            background: i === idx ? "#fff" : "rgba(255,255,255,0.35)",
            borderRadius: 1, transition: "all 0.3s",
          }}/>
        ))}
      </div>

      {/* Top header — inline, transparent */}
      <TopBar idx={idx}/>
    </div>
  );
};

const TopBar = ({ idx }) => (
  <div style={{
    position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
    padding: "52px 18px 12px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    pointerEvents: "none",
  }}>
    {/* Pulse wordmark — monochrome, serif */}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <BublMark size={26}/>
      <span style={{
        fontFamily: TOK.serif, fontSize: 22, fontWeight: 400, letterSpacing: -0.8,
        color: "#fff", textShadow: "0 1px 10px rgba(0,0,0,0.3)",
      }}>Pulse</span>
    </div>

    {/* Date + notification */}
    <div style={{ pointerEvents: "auto", display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        padding: "5px 10px", borderRadius: 100,
        background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(14px)", fontFamily: TOK.mono, fontSize: 10, color: "#fff", letterSpacing: 0.8, whiteSpace: "nowrap",
      }}>
        APR 23
      </div>
      <button style={{
        width: 36, height: 36, borderRadius: 18, border: "none", cursor: "pointer",
        background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <Ic.Bell s={18} c="#fff"/>
        <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: TOK.irisPink, boxShadow: "0 0 0 2px rgba(0,0,0,0.3)" }}/>
      </button>
    </div>
  </div>
);

Object.assign(window, { FeedScreen });
