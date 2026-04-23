// ━━━ NEWS DATA — editorial, real-world, less "fun" ━━━━━━━━━━━━━━━━━━━━━
// Palettes chosen per story — muted, editorial, slightly iridescent on key cards.

const STORIES = [
  {
    id: "fed",
    kicker: "Markets",
    headline: "Fed signals two cuts before year-end; markets rally on dovish tone.",
    deck: "Powell indicated rate easing is likely as core inflation eased to 2.3%. Equities gained 1.8%; the 10-year yield fell to 3.9%.",
    source: "Wall Street Journal",
    srcMark: "WSJ",
    time: "2h ago",
    read: 5,
    bias: 62,       // 0 left, 50 center, 100 right
    biasLabel: "Ctr-Right",
    outlets: 12,
    likes: 2840,
    comments: 134,
    palette: { a: "#0F1B2D", b: "#2C3E5D", accent: TOK.irisSky },
    why: "Rate cuts ripple through mortgages, credit cards, and equity markets. Households watching housing affordability are the first to feel the change.",
    tags: ["Fed", "Powell", "Rates"],
  },
  {
    id: "eu-google",
    kicker: "Policy",
    headline: "EU advances landmark adtech breakup against Google.",
    deck: "Draft measures would force divestiture of Google's advertising exchange. A decision is expected within six weeks.",
    source: "Financial Times",
    srcMark: "FT",
    time: "4h ago",
    read: 6,
    bias: 45,
    biasLabel: "Center",
    outlets: 18,
    likes: 5120,
    comments: 288,
    palette: { a: "#1A1330", b: "#3A2E66", accent: TOK.irisLilac },
    why: "Google's ad-tech underpins roughly 40% of internet advertising. A forced divestiture would reshape the economics of the open web.",
    tags: ["EU", "Antitrust", "Google"],
  },
  {
    id: "alzheimer",
    kicker: "Health",
    headline: "Alzheimer's trial shows first meaningful cognitive recovery.",
    deck: "Phase 3 data suggests a 34% reversal in early-stage decline over 18 months. Regulators will review in Q3.",
    source: "Nature",
    srcMark: "N",
    time: "6h ago",
    read: 7,
    bias: 50,
    biasLabel: "Center",
    outlets: 22,
    likes: 9420,
    comments: 612,
    palette: { a: "#1F1430", b: "#432664", accent: TOK.irisPink },
    why: "55 million people live with dementia. This is the first study to show reversal — not just delay — at the cohort level.",
    tags: ["Alzheimer's", "Trial", "FDA"],
  },
  {
    id: "solar",
    kicker: "Climate",
    headline: "Solar installations surpass coal in global electricity, one year ahead of forecast.",
    deck: "IEA data shows solar generating 12.8% of world power, overtaking coal for the first calendar quarter.",
    source: "Reuters",
    srcMark: "R",
    time: "8h ago",
    read: 5,
    bias: 40,
    biasLabel: "Ctr-Left",
    outlets: 15,
    likes: 6720,
    comments: 340,
    palette: { a: "#2C1A0A", b: "#6B3820", accent: TOK.irisPeach },
    why: "The fastest energy transition in history. Grid operators must now redesign for intermittency at scale.",
    tags: ["Solar", "IEA", "Transition"],
  },
];

// AI follow-up suggestions (appear under each story)
const FOLLOWUPS = {
  fed:       ["Why does the 10-year yield matter?", "How does this affect mortgages?", "Who benefits from rate cuts?"],
  "eu-google": ["What is an ad exchange?", "Has this happened before?", "How might Google respond?"],
  alzheimer: ["What is Phase 3?", "When could this reach patients?", "Who ran the trial?"],
  solar:     ["Why faster than forecast?", "Is coal gone for good?", "What about storage?"],
};

// Video discussion replies
const VIDEO_DISCUSSIONS = {
  fed: [
    { user: "@marina.k",  role: "Econ student",  duration: "0:42", views: "2.1K", avatar: TOK.irisSky },
    { user: "@lev.m",     role: "Trader",         duration: "1:08", views: "890",  avatar: TOK.irisPink },
    { user: "@sam.r",     role: "Homeowner",      duration: "0:31", views: "4.3K", avatar: TOK.irisMint },
    { user: "@ada.j",     role: "Analyst",        duration: "0:56", views: "1.2K", avatar: TOK.irisLilac },
  ],
};

Object.assign(window, { STORIES, FOLLOWUPS, VIDEO_DISCUSSIONS });
