import { ar } from "./ar";

/** Build-time language. English build → site root; Arabic build (NEXT_PUBLIC_LANG=ar) → /ar/ with RTL. */
export const LANG: "en" | "ar" = process.env.NEXT_PUBLIC_LANG === "ar" ? "ar" : "en";
export const isAr = LANG === "ar";
export const dir = isAr ? "rtl" : "ltr";

/** UI string: English source text → Arabic when building /ar/ (falls back to English if missing). */
export const t = (en: string): string => (isAr ? ar[en] ?? en : en);

type Json = unknown;
/** Deep-merge a translated overlay onto English content. Arrays merge by index; missing keys keep English. */
export function overlay<T>(base: T, tr: Json): T {
  if (!isAr || tr == null) return base;
  if (Array.isArray(base)) return base.map((b, i) => overlay(b, Array.isArray(tr) ? tr[i] : undefined)) as T;
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const k of Object.keys(out)) out[k] = overlay(out[k], (tr as Record<string, unknown>)?.[k]);
    return out as T;
  }
  return (typeof tr === typeof base ? tr : base) as T;
}

/** Path of the same page in the other language (for the language switch). */
export const otherLangHref = (path: string) => (isAr ? path || "/" : `/ar${path === "/" ? "/" : path}`);
