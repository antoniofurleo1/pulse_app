// ━━━ APP SHELL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const { useState } = React;

function PulseApp() {
  const [tab, setTab] = useState("feed");
  const [liked, setLiked] = useState(new Set());
  const [saved, setSaved] = useState(new Set());
  const [expandedStory, setExpandedStory] = useState(null);
  const [discussStory, setDiscussStory] = useState(null);

  const toggle = (set, setSet, id) => {
    const s = new Set(set);
    s.has(id) ? s.delete(id) : s.add(id);
    setSet(s);
  };

  const tabs = [
    { id: "feed", label: "Feed", Icon: Ic.Home },
    { id: "briefing", label: "Briefing", Icon: Ic.Play },
    { id: "discover", label: "Discover", Icon: Ic.Compass },
    { id: "profile", label: "You", Icon: Ic.User },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: TOK.paper,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: TOK.sans,
      padding: "32px 0",
    }}>
      {/* The prototype — no phone frame, pure screen */}
      <div style={{
        position: "relative", width: 390, height: 820,
        borderRadius: 46, overflow: "hidden",
        boxShadow: "0 40px 120px -20px rgba(0,0,0,0.25), 0 16px 40px -10px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.08)",
        background: tab === "feed" ? TOK.ink : TOK.paper,
        transition: "background 0.4s ease",
      }}>
        {/* Screen content */}
        {tab === "feed" && (
          <FeedScreen
            liked={liked} saved={saved}
            onLike={id => toggle(liked, setLiked, id)}
            onSave={id => toggle(saved, setSaved, id)}
            onDiscuss={story => setDiscussStory(story)}
            onExpand={story => setExpandedStory(story)}
            onAsk={(story, q) => setDiscussStory(story)}
          />
        )}
        {tab === "briefing" && <BriefingScreen/>}
        {tab === "discover" && <DiscoverScreen/>}
        {tab === "profile" && <ProfileScreen/>}

        {/* Overlays — always on top */}
        {expandedStory && <ExpandedArticle story={expandedStory} onClose={() => setExpandedStory(null)}/>}
        {discussStory && <VideoDiscussion story={discussStory} onClose={() => setDiscussStory(null)}/>}

        {/* Bottom tab bar — floating, adaptive */}
        <TabBar tabs={tabs} active={tab} setActive={setTab} dark={tab === "feed"}/>
      </div>
    </div>
  );
}

const TabBar = ({ tabs, active, setActive, dark }) => (
  <div style={{
    position: "absolute", bottom: 16, left: 20, right: 20, zIndex: 20,
    padding: "6px",
    background: dark ? "rgba(20,20,22,0.6)" : "rgba(255,255,255,0.8)",
    backdropFilter: "blur(30px) saturate(160%)",
    WebkitBackdropFilter: "blur(30px) saturate(160%)",
    border: `0.5px solid ${dark ? "rgba(255,255,255,0.1)" : TOK.line}`,
    borderRadius: 100,
    boxShadow: dark ? "0 10px 30px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex", alignItems: "center",
    transition: "all 0.4s ease",
  }}>
    {tabs.map(t => {
      const isActive = t.id === active;
      return (
        <button key={t.id} onClick={() => setActive(t.id)} style={{
          flex: isActive ? 1.6 : 1,
          padding: "10px 10px",
          border: "none", background: "transparent", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          borderRadius: 100,
          background: isActive ? (dark ? "rgba(255,255,255,0.14)" : TOK.ink) : "transparent",
          color: isActive ? (dark ? "#fff" : "#fff") : (dark ? "rgba(255,255,255,0.55)" : TOK.ink60),
          transition: "all 0.35s cubic-bezier(.2,.9,.25,1.1)",
          overflow: "hidden",
        }}>
          <t.Icon s={18} c="currentColor"/>
          {isActive && (
            <span style={{
              fontSize: 13, fontWeight: 500, letterSpacing: -0.1, whiteSpace: "nowrap",
            }}>{t.label}</span>
          )}
        </button>
      );
    })}
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<PulseApp/>);
