// Theme presets + derivation: 7 brand colours in → every palette variable out, contrast-checked.
import { contrast, ensureContrast, isHex, mix, normHex, ratio } from "./color.mjs";

/** The 7 brand roles the admin panel exposes (names match the panel labels). */
export const ROLES = [
  ["background", "stone", "Page background"],
  ["surface", "mist", "Soft surface"],
  ["surfaceDeep", "blueGrey", "Mid-tone surface"],
  ["accent", "steel", "Accent"],
  ["accentSecondary", "slate", "Secondary accent"],
  ["dark", "deep", "Dark sections"],
  ["text", "ink", "Text"],
];

export const PRESETS = {
  "stone-steel": { label: "Stone & Steel", stone: "#f3f0eb", mist: "#e5ebec", blueGrey: "#d5e0e4", steel: "#7899a6", slate: "#617783", deep: "#233845", ink: "#17262f" },
  "porcelain-navy": { label: "Porcelain & Navy", stone: "#f6f6f3", mist: "#e8ecf2", blueGrey: "#d6deea", steel: "#6f86a8", slate: "#56677f", deep: "#1e2b45", ink: "#141b2b" },
  "sand-olive": { label: "Sand & Olive", stone: "#f4f1ea", mist: "#e9e8dc", blueGrey: "#dad8c6", steel: "#8c9572", slate: "#6b7258", deep: "#2f3527", ink: "#1d2119" },
  "linen-clay": { label: "Linen & Clay", stone: "#f5f0ea", mist: "#efe5dc", blueGrey: "#e3d3c4", steel: "#b07d62", slate: "#8a6553", deep: "#3a2a24", ink: "#241a16" },
  "fog-forest": { label: "Fog & Forest", stone: "#f2f4f2", mist: "#e3ebe7", blueGrey: "#cfddd6", steel: "#6e9c8a", slate: "#577566", deep: "#1f2d29", ink: "#141c1a" },
  "mono": { label: "Monochrome", stone: "#f4f4f2", mist: "#eaeae7", blueGrey: "#dadad6", steel: "#8a8a86", slate: "#666662", deep: "#262626", ink: "#161616" },
};

/** Hand-tuned derived values for the original brand, so the default look stays pixel-identical. */
const STONE_STEEL_DERIVED = {
  "stone-2": "#ebe7e0", "stone-3": "#e6e0d6", "stone-4": "#cfc6b8", paper: "#fbfaf7", "mist-hi": "#eef1f1", "mist-2": "#dfe7ea",
  "steel-light": "#b9cdd5", "steel-text": "#4a6875", "text-2": "#50636e", "text-2-mist": "#4c606b", muted: "#8e9aa1",
  "deep-2": "#1e3240", "deep-3": "#2a4352", "on-dark-2": "#b2c2c9",
};

/**
 * Resolve the palette from theme.colours. Returns { vars, base, notes } where vars are the CSS --c-* values,
 * base the 7 brand roles actually used, and notes human-readable warnings (bad hex, contrast fixes).
 */
export function resolvePalette(colours = {}) {
  const notes = [];
  const presetKey = PRESETS[colours.preset] ? colours.preset : colours.preset === "custom" ? "custom" : "stone-steel";
  if (colours.preset && !PRESETS[colours.preset] && colours.preset !== "custom") notes.push(`Unknown colour preset "${colours.preset}" — used Stone & Steel.`);
  const fallback = PRESETS[colours.basedOn] ?? PRESETS["stone-steel"];
  let base = { ...PRESETS[presetKey === "custom" ? "stone-steel" : presetKey] };
  delete base.label;

  if (presetKey === "custom") {
    base = { ...fallback }; delete base.label;
    const c = colours.custom ?? {};
    for (const [panel, role, label] of ROLES) {
      const v = c[panel];
      if (v === undefined || v === null || String(v).trim() === "") continue;
      if (isHex(v)) base[role] = normHex(v);
      else notes.push(`Custom colour "${label}" ("${v}") isn't a valid hex code like #1A2B3C — kept the preset colour.`);
    }
  }

  // Structural guardrails: background must be light, dark sections must be dark, text must read on background.
  const fix = (role, value, why) => { if (value !== base[role]) { notes.push(why.replace("{from}", base[role]).replace("{to}", value)); base[role] = value; } };
  fix("stone", ensureContrast(base.stone, "#000000", 15), "Page background {from} was too dark for this design (it needs a light background) — lightened to {to}.");
  fix("mist", ensureContrast(base.mist, "#000000", 13), "Soft surface {from} was too dark — lightened to {to}.");
  fix("blueGrey", ensureContrast(base.blueGrey, "#000000", 11), "Mid-tone surface {from} was too dark — lightened to {to}.");
  fix("ink", ensureContrast(base.ink, [base.stone, base.mist, base.blueGrey], 7), "Text colour {from} didn't have enough contrast with the backgrounds — adjusted to {to}.");
  fix("deep", ensureContrast(base.deep, base.stone, 7), "Dark-section colour {from} was too light for light text on top — darkened to {to}.");

  const useHand = presetKey === "stone-steel";
  const d = useHand ? { ...STONE_STEEL_DERIVED } : {
    "stone-2": mix(base.stone, base.slate, 0.07),
    "stone-3": mix(base.stone, base.slate, 0.12),
    "stone-4": mix(base.stone, base.slate, 0.3),
    paper: mix(base.stone, "#ffffff", 0.55),
    "mist-hi": mix(base.mist, mix(base.stone, "#ffffff", 0.55), 0.45),
    "mist-2": mix(base.mist, base.blueGrey, 0.4),
    "steel-light": mix(base.steel, "#ffffff", 0.45),
    "steel-text": mix(base.steel, base.deep, 0.45),
    "text-2": mix(base.slate, base.ink, 0.25),
    muted: mix(base.slate, base.stone, 0.35),
    "deep-2": mix(base.deep, base.ink, 0.35),
    "deep-3": mix(base.deep, base.steel, 0.12),
    "on-dark-2": mix(base.blueGrey, base.steel, 0.2),
  };
  // Contrast guarantees (WCAG AA 4.5:1 for body-size text), applied to presets and custom colours alike.
  const lights = [base.stone, base.mist, d["mist-2"], d["stone-2"]];
  const darks = [base.deep, d["deep-2"], d["deep-3"]];
  d["steel-text"] = ensureContrast(d["steel-text"], lights, 4.6);
  d["text-2"] = ensureContrast(d["text-2"], lights, 4.6);
  d["text-2-mist"] = useHand ? d["text-2-mist"] : ensureContrast(d["text-2"], [base.blueGrey, ...lights], 4.6);
  d["on-dark-2"] = ensureContrast(d["on-dark-2"], darks, 4.6);
  d["steel-light"] = ensureContrast(d["steel-light"], [...darks, base.ink], 4.6); // accent text on dark + dark text on light-accent buttons
  if (contrast(base.stone, d["deep-3"]) < 7) notes.push("Light text on dark cards is below 7:1 — still readable (AA), but consider a darker 'Dark sections' colour.");

  const vars = { stone: base.stone, mist: base.mist, "blue-grey": base.blueGrey, steel: base.steel, slate: base.slate, deep: base.deep, ink: base.ink, ...d };
  const checks = [
    ["Text on background", base.ink, base.stone], ["Secondary text on background", d["text-2"], base.stone],
    ["Accent text on background", d["steel-text"], base.stone], ["Light text on dark sections", base.stone, base.deep],
    ["Secondary text on dark sections", d["on-dark-2"], base.deep], ["Accent on dark sections", d["steel-light"], base.deep],
  ].map(([label, fg, bg]) => ({ label, fg, bg, ratio: ratio(fg, bg) }));
  return { preset: presetKey, vars, base, notes, checks };
}

/** Font catalogue. `pkg` = @fontsource-variable package copied into public/fonts at build; null = built in. */
export const FONTS = {
  geist: { label: "Geist", stack: "var(--font-geist-sans), Inter, system-ui, sans-serif", pkg: null, kind: "sans", weight: 560, tracking: "-0.035em" },
  inter: { label: "Inter", family: "Inter Variable", pkg: "inter", kind: "sans", weight: 600, tracking: "-0.035em" },
  manrope: { label: "Manrope", family: "Manrope Variable", pkg: "manrope", kind: "sans", weight: 650, tracking: "-0.035em" },
  "plus-jakarta-sans": { label: "Plus Jakarta Sans", family: "Plus Jakarta Sans Variable", pkg: "plus-jakarta-sans", kind: "sans", weight: 620, tracking: "-0.035em" },
  "dm-sans": { label: "DM Sans", family: "DM Sans Variable", pkg: "dm-sans", kind: "sans", weight: 600, tracking: "-0.035em" },
  outfit: { label: "Outfit", family: "Outfit Variable", pkg: "outfit", kind: "sans", weight: 550, tracking: "-0.03em" },
  sora: { label: "Sora", family: "Sora Variable", pkg: "sora", kind: "sans", weight: 560, tracking: "-0.04em" },
  "space-grotesk": { label: "Space Grotesk", family: "Space Grotesk Variable", pkg: "space-grotesk", kind: "sans", weight: 560, tracking: "-0.035em" },
  fraunces: { label: "Fraunces (serif)", family: "Fraunces Variable", pkg: "fraunces", kind: "serif", weight: 500, tracking: "-0.025em", italic: true },
  "playfair-display": { label: "Playfair Display (serif)", family: "Playfair Display Variable", pkg: "playfair-display", kind: "serif", weight: 520, tracking: "-0.02em", italic: true },
  "cormorant-garamond": { label: "Cormorant Garamond (serif)", family: "Cormorant Garamond Variable", pkg: "cormorant-garamond", kind: "serif", weight: 600, tracking: "-0.015em", italic: true },
  "instrument-serif": { label: "Instrument Serif", stack: 'var(--font-serif-accent), "Times New Roman", serif', pkg: null, kind: "serif", italic: true },
};
export const HEADING_FONTS = ["geist", "inter", "manrope", "plus-jakarta-sans", "dm-sans", "outfit", "sora", "space-grotesk", "fraunces", "playfair-display", "cormorant-garamond"];
export const BODY_FONTS = ["geist", "inter", "manrope", "plus-jakarta-sans", "dm-sans", "outfit", "sora"];
export const ACCENT_FONTS = ["instrument-serif", "fraunces", "playfair-display", "cormorant-garamond", "none"];

export const stackOf = (key) => {
  const f = FONTS[key];
  if (f.stack) return f.stack;
  return `"${f.family}", ${f.kind === "serif" ? 'Georgia, "Times New Roman", serif' : "system-ui, -apple-system, sans-serif"}`;
};

export const SCALES = {
  corners: { sharp: 0.25, soft: 0.6, rounded: 1, round: 1.35 },
  spacing: { compact: "clamp(56px, 6vw, 88px)", comfortable: "clamp(72px, 8.5vw, 128px)", spacious: "clamp(96px, 11vw, 168px)" },
  buttonRadius: { pill: "999px", rounded: "14px", square: "4px" },
  shadows: {
    none: ["none", "none", "none"],
    soft: [
      "0 1px 0 rgba(255,255,255,.7) inset, 0 1px 2px color-mix(in srgb, var(--c-ink) 3%, transparent), 0 12px 28px -24px color-mix(in srgb, var(--c-ink) 18%, transparent)",
      "0 1px 0 rgba(255,255,255,.7) inset, 0 2px 4px color-mix(in srgb, var(--c-ink) 4%, transparent), 0 24px 50px -36px color-mix(in srgb, var(--c-ink) 28%, transparent)",
      "0 16px 32px -24px color-mix(in srgb, var(--c-ink) 18%, transparent)",
    ],
    standard: null, // keep tokens.css values
    deep: [
      "0 1px 0 rgba(255,255,255,.7) inset, 0 2px 4px color-mix(in srgb, var(--c-ink) 6%, transparent), 0 26px 56px -30px color-mix(in srgb, var(--c-ink) 40%, transparent)",
      "0 1px 0 rgba(255,255,255,.7) inset, 0 4px 8px color-mix(in srgb, var(--c-ink) 7%, transparent), 0 46px 90px -40px color-mix(in srgb, var(--c-ink) 55%, transparent)",
      "0 34px 64px -28px color-mix(in srgb, var(--c-ink) 40%, transparent), 0 8px 20px -10px color-mix(in srgb, var(--c-ink) 14%, transparent)",
    ],
  },
  glass: { off: { blur: "0px", alpha: 1 }, light: { blur: "12px", alpha: 0.82 }, standard: null, strong: { blur: "32px", alpha: 0.5 } },
};
