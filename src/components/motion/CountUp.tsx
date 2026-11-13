"use client";
import { useEffect, useRef } from "react";
import { animate } from "motion/react";
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
    const c = animate(from, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { if (out.current) out.current.textContent = fmt(v); } });
    return () => c.stop();
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
