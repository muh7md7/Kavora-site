"use client";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Moon, Sun } from "lucide-react";
import { DemoShell, Chip } from "@/components/ui";
import { useInViewOnce } from "@/components/motion/useInView";
import { cn } from "@/lib/cn";

/**
 * Dashboard demo — a working KPI screen, not a picture of one:
 * date-range tabs, filter chips, charts that redraw on change, a sortable table and its own light/dark toggle.
 * All figures are sample data for an invented business.
 */

type Range = "7d" | "30d" | "90d";
const ranges: { id: Range; label: string; points: number }[] = [
  { id: "7d", label: "7 days", points: 7 },
  { id: "30d", label: "30 days", points: 15 },
  { id: "90d", label: "90 days", points: 12 },
];

const channels = ["Website", "Meta Ads", "Google Ads", "Social"] as const;
type Channel = (typeof channels)[number];

type Row = { source: Channel; leads: number; cost: number; won: number };
const base: Row[] = [
  { source: "Website", leads: 142, cost: 0, won: 31 },
  { source: "Meta Ads", leads: 96, cost: 1840, won: 18 },
  { source: "Google Ads", leads: 81, cost: 2260, won: 21 },
  { source: "Social", leads: 54, cost: 0, won: 9 },
];

// Deterministic series so the chart redraws consistently rather than randomly.
const series = (range: Range, channel: Channel | "all") => {
  const n = ranges.find((r) => r.id === range)!.points;
  const seed = channel === "all" ? 7 : channels.indexOf(channel) + 2;
  return Array.from({ length: n }, (_, i) => {
    const wave = Math.sin((i / n) * Math.PI * 1.6 + seed) * 0.28;
    const trend = (i / n) * 0.4;
    return Math.max(0.12, Math.min(1, 0.45 + wave + trend));
  });
};

const mult: Record<Range, number> = { "7d": 0.24, "30d": 1, "90d": 2.85 };

export function DashboardDemo() {
  const [range, setRange] = useState<Range>("30d");
  const [filter, setFilter] = useState<Channel | "all">("all");
  const [sort, setSort] = useState<{ k: keyof Row; dir: 1 | -1 }>({ k: "leads", dir: -1 });
  const [dark, setDark] = useState(false);

  const rows = useMemo(() => {
    const scaled = base
      .filter((r) => filter === "all" || r.source === filter)
      .map((r) => ({ ...r, leads: Math.round(r.leads * mult[range]), cost: Math.round(r.cost * mult[range]), won: Math.round(r.won * mult[range]) }));
    return scaled.sort((a, b) => {
      const av = a[sort.k], bv = b[sort.k];
      return (typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv))) * sort.dir;
    });
  }, [range, filter, sort]);

  const leads = rows.reduce((s, r) => s + r.leads, 0);
  const spend = rows.reduce((s, r) => s + r.cost, 0);
  const won = rows.reduce((s, r) => s + r.won, 0);
  const cpl = leads ? spend / leads : 0;
  const data = series(range, filter);

  const toggleSort = (k: keyof Row) => setSort((s) => (s.k === k ? { k, dir: (s.dir * -1) as 1 | -1 } : { k, dir: -1 }));

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Date range" className="flex gap-1 p-1 rounded-pill border border-line-strong">
          {ranges.map((r) => (
            <button key={r.id} type="button" role="tab" aria-selected={range === r.id} onClick={() => setRange(r.id)}
              className={cn("px-4 min-h-11 rounded-pill text-[0.86rem] font-[550] transition-colors duration-[350ms]", range === r.id ? "bg-[var(--graphite)] text-[var(--offwhite)]" : "text-text-2 hover:text-text")}>
              {r.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setDark((d) => !d)} aria-pressed={dark}
          className="b b-secondary b-sm" >
          {dark ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      <DemoShell label="Sample data" controls={false}>
        <div data-theme={dark ? "dark" : "light"} className={cn("rounded-[20px] border border-line overflow-hidden transition-colors duration-500", dark ? "bg-[var(--deep-charcoal)]" : "bg-[var(--offwhite)]")}>
          {/* filter chips */}
          <div className="p-4 sm:p-5 border-b border-line flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2 mr-1">Source</span>
            <Chip pressed={filter === "all"} onToggle={() => setFilter("all")}>All</Chip>
            {channels.map((c) => <Chip key={c} pressed={filter === c} onToggle={() => setFilter(filter === c ? "all" : c)}>{c}</Chip>)}
          </div>

          {/* kpis */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-line">
            {[
              { k: "Leads", v: leads.toLocaleString("en"), d: 12.4 },
              { k: "Won", v: won.toLocaleString("en"), d: 8.1 },
              { k: "Ad spend", v: spend.toLocaleString("en"), d: -4.2 },
              { k: "Cost per lead", v: cpl ? cpl.toFixed(2) : "—", d: -9.6 },
            ].map((c, i) => (
              <div key={c.k} className={cn("p-4 sm:p-5", i % 2 === 0 && "border-r border-line", i < 2 && "border-b lg:border-b-0 border-line", i === 2 && "lg:border-r")}>
                <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">{c.k}</p>
                <p className="mt-2 text-[1.4rem] font-[560] tracking-[-0.035em] leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>{c.v}</p>
                <p className={cn("mt-2 text-[0.75rem] inline-flex items-center gap-1", c.d > 0 ? "text-[var(--moss)]" : "text-text-2")}>
                  {c.d > 0 ? <ArrowUp size={11} aria-hidden /> : <ArrowDown size={11} aria-hidden />}{Math.abs(c.d)}% vs previous
                </p>
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="p-4 sm:p-5 border-b border-line">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">Leads over time</p>
              <p className="text-[0.78rem] text-text-2">{filter === "all" ? "All sources" : filter}</p>
            </div>
            <Chart data={data} dark={dark} keyed={`${range}-${filter}`} />
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-[0.88rem]">
              <caption className="sr-only">Leads by source — sample data, sortable</caption>
              <thead>
                <tr className="border-b border-line">
                  {([["source", "Source"], ["leads", "Leads"], ["won", "Won"], ["cost", "Spend"]] as const).map(([k, label], i) => (
                    <th key={k} scope="col" aria-sort={sort.k === k ? (sort.dir === -1 ? "descending" : "ascending") : "none"}
                      className={cn("p-3 sm:p-4", i === 0 ? "text-left" : "text-right")}>
                      <button type="button" onClick={() => toggleSort(k)} className="inline-flex items-center gap-1.5 font-[550] hover:text-accent-text transition-colors min-h-11">
                        {label}
                        <span className={cn("transition-opacity", sort.k === k ? "opacity-100" : "opacity-25")} aria-hidden>
                          {sort.k === k && sort.dir === 1 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.source} className={cn(i < rows.length - 1 && "border-b border-line")}>
                    <th scope="row" className="text-left p-3 sm:p-4 font-[500]">{r.source}</th>
                    <td className="text-right p-3 sm:p-4 font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>{r.leads}</td>
                    <td className="text-right p-3 sm:p-4 font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>{r.won}</td>
                    <td className="text-right p-3 sm:p-4 font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>{r.cost ? r.cost.toLocaleString("en") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DemoShell>
      <p className="text-[0.82rem] text-text-2">Change the range, filter the source, sort the table, flip the theme. Sample data for an invented business — yours is built on your own numbers.</p>
    </div>
  );
}

function Chart({ data, dark, keyed }: { data: number[]; dark: boolean; keyed: string }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const w = 100, h = 34;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${(i * step).toFixed(2)},${(h - v * h).toFixed(2)}`);
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <div ref={ref} className="mt-4 relative h-[160px]">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden>
        {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke={dark ? "rgba(255,255,255,.07)" : "rgba(40,53,61,.07)"} strokeWidth="0.25" />)}
        <path key={`a-${keyed}`} d={area} fill={dark ? "rgba(184,201,210,.14)" : "rgba(184,201,210,.3)"} className="chart-area" />
        <path key={`l-${keyed}`} d={line} fill="none" stroke={dark ? "var(--steel-blue)" : "var(--graphite)"} strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"
          className={cn("chart-line", inView && "is-in")} pathLength={1} />
      </svg>
      <p className="sr-only">Sample trend of leads over the selected range.</p>
    </div>
  );
}

export function DashboardDemoSection() {
  return (
    <section id="demo" data-theme="light" className="tone !bg-bg-2 section-major scroll-mt-24">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">See it working</p>
          <h2 className="mt-5">Your numbers, in one <span className="accent">screen.</span></h2>
          <p className="lead mt-6">A real dashboard, not a screenshot: change the range, filter the source, sort the table. This is the kind of system we build on your own data.</p>
        </div>
        <div className="mt-12"><DashboardDemo /></div>
      </div>
    </section>
  );
}
