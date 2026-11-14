import { ar } from "./ar";
export const isArBuild = process.env.NEXT_PUBLIC_LANG === "ar";
/** Translate one string by exact (trimmed) match, keeping surrounding spaces. */
export function tr(s: string): string {
  if (!isArBuild) return s;
  const core = s.trim(); if (!core) return s;
  const hit = ar[core]; if (!hit) return s;
  return s.slice(0, s.indexOf(core[0])) + hit + s.slice(s.lastIndexOf(core[core.length - 1]) + 1);
}
const ATTRS = ["aria-label", "placeholder", "title", "alt"] as const;
type P = Record<string, unknown> | null | undefined;
function kids(c: unknown): unknown {
  if (typeof c === "string") return tr(c);
  if (Array.isArray(c)) { let ch = false; const out = c.map((x) => { const y = typeof x === "string" ? tr(x) : x; if (y !== x) ch = true; return y; }); return ch ? out : c; }
  return c;
}
/** Applied to every JSX element in the Arabic build: text children + a few text attributes. */
export function fixProps(type: unknown, props: P): P {
  if (!isArBuild || !props) return props;
  let p = props;
  if ("children" in props) { const n = kids(props.children); if (n !== props.children) p = { ...props, children: n }; }
  if (typeof type === "string") for (const a of ATTRS) {
    const v = p[a]; if (typeof v === "string") { const n = tr(v); if (n !== v) { if (p === props) p = { ...props }; (p as Record<string, unknown>)[a] = n; } }
  }
  return p;
}
