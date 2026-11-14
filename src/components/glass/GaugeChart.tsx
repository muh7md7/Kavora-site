"use client";
import { t } from "@/i18n";
import { useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "./Tabs";
import { cn } from "@/lib/cn";

/** True once the element has scrolled into view (fires once). */
function useInViewOnce(ref: React.RefObject<HTMLElement | null>, amount: number) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: amount });
    io.observe(el); return () => io.disconnect();
  }, [ref, amount]);
  return inView;
}

/** Goal Gauge — animated semicircle, draws in once when in view. Custom SVG, no chart library. */
export function GoalGauge({ value = 72, label = "Goal progress · Sample", className }: { value?: number; label?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, 0.5);
  const r = 80, cx = 100, cy = 100;
  const arc = Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const angle = -180 + (v / 100) * 180;
  return (
    <div ref={ref} className={cn("glass rounded-md p-4", className)}>
      <svg viewBox="0 0 200 118" className="w-full" role="img" aria-label={`${label}: ${v} percent`}>
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--mist)" strokeWidth="12" strokeLinecap="round" />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="var(--sage)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={arc}
          className="gauge-move" style={{ strokeDashoffset: inView ? arc * (1 - v / 100) : arc }}
        />
        <g className="gauge-move" style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box", transform: `rotate(${inView ? angle : -180}deg)` }}>
          <line x1={cx} y1={cy} x2={cx + r - 18} y2={cy} stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx={cx} cy={cy} r="6" fill="var(--navy)" />
        <text x={cx} y={cy - 22} textAnchor="middle" fontSize="28" fontWeight="700" fill="var(--ink)" fontFamily="var(--font-display)">{v}%</text>
      </svg>
      <div className="text-xs text-slate text-center -mt-1">{label}</div>
    </div>
  );
}

const series: Record<string, number[]> = {
  "3M": [22, 28, 26, 34, 31, 38, 42, 40, 47, 52, 49, 58],
  "6M": [12, 15, 18, 17, 22, 28, 26, 34, 31, 38, 42, 58],
  "12M": [6, 8, 9, 12, 14, 15, 18, 22, 26, 34, 42, 58],
};

/** Area Chart — range toggles (3M/6M/12M), draw-in once when in view. Sample data. */
export function AreaChart({ className }: { className?: string }) {
  const [range, setRange] = useState("3M");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, 0.4);
  const w = 320, h = 140, pad = 8;
  const { line, area } = useMemo(() => {
    const d = series[range]; const max = Math.max(...d);
    const pts = d.map((v, i) => [pad + (i * (w - pad * 2)) / (d.length - 1), h - pad - (v / max) * (h - pad * 2)] as const);
    const path = pts.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
    return { line: path, area: `${path} L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z` };
  }, [range]);
  return (
    <div ref={ref} className={cn("glass rounded-md p-4 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-sm font-semibold">{t("Enquiries over time")}{" "}<span className="text-slate font-normal">{t("· Sample data")}</span></span>
        <Tabs ariaLabel="Date range" variant="segmented" items={["3M", "6M", "12M"].map((id) => ({ id, label: id }))} value={range} onChange={setRange} />
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={`Sample enquiries trend, ${range}`}>
        <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--sage)" stopOpacity=".28" /><stop offset="1" stopColor="var(--sage)" stopOpacity="0" /></linearGradient></defs>
        <path key={`a${range}`} d={area} fill="url(#area)" className="chart-fade" style={{ opacity: inView ? undefined : 0, animationPlayState: inView ? "running" : "paused" }} />
        <path key={`l${range}`} d={line} pathLength={1} fill="none" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={1} className="chart-draw" style={{ strokeDashoffset: inView ? undefined : 1, animationPlayState: inView ? "running" : "paused" }} />
      </svg>
    </div>
  );
}
