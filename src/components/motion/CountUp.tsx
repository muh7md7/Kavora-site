"use client";
import { useEffect, useRef } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "./useInView";

/** Count-up number. Width reserved with tabular figures + final value (no CLS). */
export function CountUp({ to, from = 0, decimals = 0, prefix = "", suffix = "", duration = 1.6, className }:
  { to: number; from?: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const out = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();
  const fmt = (v: number) => `${prefix}${v.toLocaleString("en", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  useEffect(() => {
    if (!inView || !out.current) return;
    if (reduce) { out.current.textContent = fmt(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const ease = (p: number) => 1 - Math.pow(1 - p, 3);
    const tick = (t: number) => {
      const p = Math.min((t - t0) / (duration * 1000), 1);
      if (out.current) out.current.textContent = fmt(from + (to - from) * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", display: "inline-grid" }}>
      <span aria-hidden style={{ gridArea: "1/1", visibility: "hidden" }}>{fmt(to)}</span>
      <span ref={out} style={{ gridArea: "1/1" }} aria-hidden>{fmt(from)}</span>
      <span className="sr-only">{fmt(to)}</span>
    </span>
  );
}
