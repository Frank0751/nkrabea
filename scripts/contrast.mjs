#!/usr/bin/env node
/**
 * WCAG 2.2 contrast checker for the Nkrabea palette.
 *
 * The brief (KB-2026-009, Phase 1) commits to a five-slot colour system with
 * "contrast checked to WCAG AA on every text pairing". This script is that
 * check, kept in the repo so it can be re-run whenever a token moves.
 *
 *   node scripts/contrast.mjs
 *
 * Exit code 1 if any declared pairing fails, so it can gate a build.
 */
import { pathToFileURL } from "node:url";


/* ---------- colour conversion ---------- */

const srgbToLinear = (c) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const linearToSrgb = (c) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

function hexToRgb(hex) {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((x) => x + x)
          .join("")
      : h;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

function rgbToHex([r, g, b]) {
  const to = (c) =>
    Math.max(0, Math.min(255, Math.round(c * 255)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** linear sRGB -> OKLab -> OKLCH */
function linearRgbToOklch([r, g, b]) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const C = Math.sqrt(A * A + B * B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}

/** OKLCH -> linear sRGB */
function oklchToLinearRgb([L, C, H]) {
  const hRad = (H * Math.PI) / 180;
  const A = C * Math.cos(hRad);
  const B = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
  const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
  const s_ = L - 0.0894841775 * A - 1.291485548 * B;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

export function hexToOklch(hex) {
  return linearRgbToOklch(hexToRgb(hex).map(srgbToLinear));
}

export function oklchToHex(L, C, H) {
  return rgbToHex(oklchToLinearRgb([L, C, H]).map(linearToSrgb));
}

/** True if an OKLCH triple falls outside the sRGB gamut. */
export function outOfGamut(L, C, H) {
  return oklchToLinearRgb([L, C, H]).some((c) => c < -0.0001 || c > 1.0001);
}

/* ---------- WCAG ---------- */

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(fg, bg) {
  const a = relativeLuminance(fg);
  const b = relativeLuminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- the palette ---------- */

// Sampled directly from public/logo.svg. These are the brand, not an invention.
const BRAND = {
  black: "#14181a", // badge black, now the kente strip only
  cream: "#f4f1ea", // badge stroke
  gold: "#c9a227", // Akan gold
  green: "#1f6f5c", // badge green
  clay: "#b4402f", // badge centre
  bandInk: "#103028", // the band: badge green taken down to an ink
};

// Resolved token values. Light and dark.
// Kept in sync with src/app/globals.css by scripts/check-tokens.mjs.
const LIGHT = {
  background: "#f7f4ed",
  foreground: "#14181a",
  card: "#fffdf8",
  cardForeground: "#14181a",
  sand: "#e9e2d1", // second light plane
  sandDeep: "#ded5c0", // pattern bands and frames, never body text
  muted: "#ebe6da",
  mutedForeground: "#505955",
  primary: "#1a5f4f",
  primaryForeground: "#f7f4ed",
  accent: "#c9a227",
  accentForeground: "#14181a",
  goldInk: "#7d6000", // gold as text on a light surface
  goldEdge: "#9f7d00", // gold as a rule or border on a light surface
  border: "#ddd6c6",
  onBand: "#f4f1ea", // text on the band
  goldOnBand: "#d9b640", // gold as text on the band
  greenOnBand: "#6fbfa5", // green as text on the band
  emphasis: "#aa3828", // clay, deepened so it also clears AA on sand
  onEmphasis: "#ffffff",
};

const DARK = {
  background: "#0f1c19",
  foreground: "#f0ece2",
  card: "#16241f",
  cardForeground: "#f0ece2",
  sand: "#16241f",
  sandDeep: "#1d2f28",
  muted: "#1d2f28",
  mutedForeground: "#a8b0ad",
  primary: "#6fbfa5",
  primaryForeground: "#14181a",
  accent: "#d9b640",
  accentForeground: "#14181a",
  goldInk: "#d9b640", // on a dark surface, gold text needs no deepening
  goldEdge: "#d9b640",
  border: "#2a3d36",
  onBand: "#f0ece2",
  goldOnBand: "#d9b640",
  greenOnBand: "#6fbfa5",
  // Clay is lifted until it clears AA on the lightest dark surface, the
  // muted panel, at 4.95:1.
  emphasis: "#ed7663",
  onEmphasis: "#14181a",
};

/**
 * Every text pairing the site actually renders.
 * `large` marks >=24px or >=18.66px bold, where AA is 3:1 instead of 4.5:1.
 */
const PAIRINGS = (t) => [
  ["body text on page", t.foreground, t.background, false],
  ["muted text on page", t.mutedForeground, t.background, false],
  ["body text on card", t.cardForeground, t.card, false],
  ["muted text on card", t.mutedForeground, t.card, false],
  ["muted text on muted panel", t.mutedForeground, t.muted, false],
  ["body text on sand", t.foreground, t.sand, false],
  ["muted text on sand", t.mutedForeground, t.sand, false],
  ["primary link on sand", t.primary, t.sand, false],
  ["gold ink on sand", t.goldInk, t.sand, false],
  ["gold ink on page", t.goldInk, t.background, false],
  ["gold rule on sand, non-text 3:1", t.goldEdge, t.sand, true],
  ["body text on sand deep", t.foreground, t.sandDeep, false],
  ["primary link on page", t.primary, t.background, false],
  ["primary link on card", t.primary, t.card, false],
  ["text on primary button", t.primaryForeground, t.primary, false],
  ["text on gold button", t.accentForeground, t.accent, false],
  ["display heading on page", t.foreground, t.background, true],
  ["cream text on the band", t.onBand, BRAND.bandInk, false],
  ["gold heading on the band", t.goldOnBand, BRAND.bandInk, true],
  ["gold body on the band", t.goldOnBand, BRAND.bandInk, false],
  ["brand gold fill on the band, 3:1", t.accent, BRAND.bandInk, true],
  ["green text on the band", t.greenOnBand, BRAND.bandInk, false],
  ["emphasis text on page", t.emphasis, t.background, false],
  ["emphasis text on card", t.emphasis, t.card, false],
  ["emphasis text on sand", t.emphasis, t.sand, false],
  ["text on emphasis button", t.onEmphasis, t.emphasis, false],
];

/* ---------- report ---------- */

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const OFF = "\x1b[0m";

function report(label, tokens) {
  console.log(`\n${BOLD}${label}${OFF}`);
  console.log(`${DIM}${"".padEnd(64, "-")}${OFF}`);
  let failed = 0;

  for (const [name, fg, bg, large] of PAIRINGS(tokens)) {
    const ratio = contrast(fg, bg);
    const required = large ? 3 : 4.5;
    const pass = ratio >= required;
    if (!pass) failed++;
    const mark = pass ? `${GREEN}PASS${OFF}` : `${RED}FAIL${OFF}`;
    const size = large ? "large" : "normal";
    console.log(
      `  ${mark}  ${ratio.toFixed(2).padStart(5)}:1  ` +
        `${DIM}(needs ${required}:1, ${size})${OFF}  ${name}`
    );
  }
  return failed;
}

/**
 * Only run the report when this file is executed directly, so it can also be
 * imported as a colour library without printing anything or exiting.
 */
function main() {
  console.log(`${BOLD}Nkrabea palette - WCAG 2.2 AA check${OFF}`);
  console.log(`${DIM}Brand colours sampled from public/logo.svg${OFF}\n`);

  console.log(`${BOLD}Brand slots as OKLCH${OFF}`);
  console.log(`${DIM}${"".padEnd(64, "-")}${OFF}`);
  for (const [name, hex] of Object.entries(BRAND)) {
    const [L, C, H] = hexToOklch(hex);
    console.log(
      `  ${name.padEnd(6)} ${hex}  ` +
        `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`
    );
  }

  const total = report("Light theme", LIGHT) + report("Dark theme", DARK);

  console.log("");
  if (total === 0) {
    console.log(`${GREEN}${BOLD}All pairings meet WCAG 2.2 AA.${OFF}\n`);
  } else {
    console.log(`${RED}${BOLD}${total} pairing(s) below AA.${OFF}\n`);
    process.exitCode = 1;
  }
}

// pathToFileURL, rather than string-building a file:// URL, so this works on
// Windows paths (C:\...) as well as POSIX ones.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
