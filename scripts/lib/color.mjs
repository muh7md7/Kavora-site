// Tiny colour toolkit for the theme generator (sRGB, WCAG 2.x contrast). No dependencies.

export const isHex = (v) => typeof v === "string" && /^#?[0-9a-f]{6}$/i.test(v.trim());
export const normHex = (v) => "#" + v.trim().replace(/^#/, "").toLowerCase();

export function hexToRgb(hex) {
  const h = normHex(hex).slice(1);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
export function rgbToHex(rgb) {
  return "#" + rgb.map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, "0")).join("");
}
/** Mix a → b by t (0 = a, 1 = b). */
export function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return rgbToHex(A.map((c, i) => c + (B[i] - c) * t));
}
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const L1 = luminance(a), L2 = luminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
/**
 * Nudge `fg` toward black or white (whichever side gives more contrast against every background)
 * until it reaches `min` against all of them. Returns the original colour when it already passes.
 */
export function ensureContrast(fg, bgs, min = 4.5) {
  const list = Array.isArray(bgs) ? bgs : [bgs];
  const worst = (c) => Math.min(...list.map((b) => contrast(c, b)));
  if (worst(fg) >= min) return normHex(fg);
  const avgL = list.reduce((s, b) => s + luminance(b), 0) / list.length;
  const target = avgL > 0.18 ? "#000000" : "#ffffff";
  for (let t = 0.02; t <= 1.0001; t += 0.02) {
    const c = mix(fg, target, t);
    if (worst(c) >= min) return c;
  }
  return target;
}
export const ratio = (a, b) => Math.round(contrast(a, b) * 100) / 100;
