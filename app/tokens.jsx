// ━━━ PULSE DESIGN SYSTEM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Editorial, sophisticated, bubble-inspired. Iridescent accents, deep neutrals.

const TOK = {
  // Neutrals (stone/ink palette)
  ink:    "#0A0A0B",
  ink80:  "rgba(10,10,11,0.8)",
  ink60:  "rgba(10,10,11,0.6)",
  ink40:  "rgba(10,10,11,0.4)",
  ink20:  "rgba(10,10,11,0.2)",
  ink10:  "rgba(10,10,11,0.1)",
  ink06:  "rgba(10,10,11,0.06)",
  ink04:  "rgba(10,10,11,0.04)",

  paper:  "#FAFAF7",   // warm off-white
  cream:  "#F4F1EA",
  card:   "#FFFFFF",
  line:   "rgba(10,10,11,0.08)",

  // Iridescent bubble accents (pulled from reference)
  irisPink:   "#FDB4D6",
  irisPeach:  "#FCD9B6",
  irisLemon:  "#FFF3A6",
  irisMint:   "#B8F2D8",
  irisSky:    "#B4DCFB",
  irisLilac:  "#D5BDFA",

  // Semantic
  primary:    "#0A0A0B",
  accent:     "#FF4081",    // used sparingly
  good:       "#2E9B63",
  warn:       "#E97A3C",

  // Type
  serif:   "'Fraunces', 'Newsreader', Georgia, serif",
  sans:    "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, monospace",
};

// Iridescent gradient as a reusable value
const IRIS_GRADIENT = `conic-gradient(from 45deg,
  ${TOK.irisPink} 0deg,
  ${TOK.irisPeach} 60deg,
  ${TOK.irisLemon} 120deg,
  ${TOK.irisMint} 180deg,
  ${TOK.irisSky} 240deg,
  ${TOK.irisLilac} 300deg,
  ${TOK.irisPink} 360deg)`;

const IRIS_LINEAR = `linear-gradient(110deg,
  ${TOK.irisLilac} 0%,
  ${TOK.irisSky} 20%,
  ${TOK.irisMint} 40%,
  ${TOK.irisLemon} 60%,
  ${TOK.irisPeach} 80%,
  ${TOK.irisPink} 100%)`;

// Level config — user cannot pick this in UI, set server-side.
// Kept for mockup demo toggle.
const LEVELS = {
  kids:  { label: "Kids",  minAge: 8,  serif: false },
  teen:  { label: "Teen",  minAge: 13, serif: false },
  adult: { label: "Adult", minAge: 18, serif: true  },
};

Object.assign(window, { TOK, IRIS_GRADIENT, IRIS_LINEAR, LEVELS });
