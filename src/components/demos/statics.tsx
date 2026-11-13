import { cn } from "@/lib/cn";

/**
 * Static hero visuals — full-detail versions of the looping mini previews.
 * Heroes need a complete picture at large sizes, not an animation caught mid-cycle,
 * so these render one finished frame: no motion, no hydration, no layout shift.
 * Decorative: every one is aria-hidden, with the meaning carried by the surrounding copy.
 */

/** A finished sample website page (used in the websites hero). */
export function StaticSite({ className }: { className?: string }) {
  return (
    <div data-theme="light" aria-hidden className={cn("absolute inset-0 bg-bg flex flex-col text-left", className)}>
      <div className="flex items-center justify-between border-b border-line px-5 h-11 shrink-0">
        <span className="text-[13px] font-[600] tracking-[-0.03em]">northfield</span>
        <span className="flex gap-4">{["Services", "Areas", "Reviews", "Contact"].map((n) => <span key={n} className="text-[10px] text-text-2">{n}</span>)}</span>
        <span className="text-[9px] font-[600] px-3 h-7 grid place-items-center rounded-pill bg-[var(--graphite)] text-[var(--offwhite)]">Book a visit</span>
      </div>
      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center gap-3">
          <span className="text-[9px] font-mono uppercase tracking-[.14em] text-text-2">Heating &amp; plumbing</span>
          <p className="font-[560] tracking-[-0.04em] leading-[1.02] text-[clamp(18px,2.6vw,34px)]">Heating fixed properly, first time.</p>
          <p className="text-text-2 leading-snug text-[clamp(9px,1vw,13px)] max-w-[32ch]">Emergency callouts, servicing and installation — with fixed pricing and no callout fee.</p>
          <span className="mt-2 flex gap-2">
            <span className="text-[10px] font-[550] px-4 h-8 grid place-items-center rounded-pill bg-[var(--graphite)] text-[var(--offwhite)]">Book a visit</span>
            <span className="text-[10px] font-[550] px-4 h-8 grid place-items-center rounded-pill border border-line-strong">Our services</span>
          </span>
        </div>
        <div className="w-[42%] relative bg-bg-2 border-l border-line overflow-hidden">
          <span className="absolute inset-0" style={{ background: "radial-gradient(70% 60% at 70% 20%, rgba(184,201,210,.8), transparent 70%)" }} />
          <span className="absolute left-[12%] right-[12%] top-[14%] h-[46%] rounded-[10px] bg-[var(--graphite)] opacity-90" />
          <span className="absolute left-[12%] right-[34%] h-2 rounded bottom-[30%] bg-line-strong" />
          <span className="absolute left-[12%] right-[52%] h-2 rounded bottom-[22%] bg-line-strong" />
          <span className="absolute left-[12%] w-[30%] h-7 rounded-pill bottom-[9%] bg-[var(--steel-blue)]" />
        </div>
      </div>
      <div className="shrink-0 border-t border-line grid grid-cols-3">
        {["Servicing", "Installation", "Emergencies"].map((t, i) => (
          <div key={t} className={cn("p-4 flex flex-col gap-2", i < 2 && "border-r border-line")}>
            <i className="w-7 h-7 rounded-[8px] bg-bg-2 border border-line" />
            <span className="text-[10px] font-[550]">{t}</span>
            <i className="w-full h-1.5 rounded bg-line" /><i className="w-[72%] h-1.5 rounded bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A finished sample dashboard (used in the dashboards hero). */
export function StaticDash({ className }: { className?: string }) {
  const bars = [38, 52, 44, 61, 55, 72, 66, 84, 78, 92];
  return (
    <div data-theme="light" aria-hidden className={cn("absolute inset-0 bg-bg flex text-left", className)}>
      {/* rail */}
      <div className="hidden sm:flex w-[160px] shrink-0 border-r border-line flex-col p-4 gap-1.5">
        <span className="text-[11px] font-[600] tracking-[-0.02em] mb-3">Operations</span>
        {["Overview", "Leads", "Jobs", "Invoices", "Team"].map((n, i) => (
          <span key={n} className={cn("text-[10px] px-2.5 h-7 flex items-center rounded-[7px]", i === 0 ? "bg-[var(--graphite)] text-[var(--offwhite)]" : "text-text-2")}>{n}</span>
        ))}
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        {/* kpis */}
        <div className="grid grid-cols-4 border-b border-line shrink-0">
          {[["Leads", "319"], ["Won", "79"], ["Spend", "4,100"], ["Cost / lead", "12.85"]].map(([k, v], i) => (
            <div key={k} className={cn("p-3 sm:p-4", i < 3 && "border-r border-line")}>
              <span className="block font-mono text-[8px] uppercase tracking-[.12em] text-text-2">{k}</span>
              <span className="block mt-1.5 text-[clamp(13px,1.5vw,20px)] font-[560] tracking-[-0.035em] leading-none">{v}</span>
            </div>
          ))}
        </div>
        {/* chart */}
        <div className="flex-1 min-h-0 p-4 flex flex-col">
          <span className="font-mono text-[8px] uppercase tracking-[.12em] text-text-2">Leads over time</span>
          <span className="flex-1 flex items-end gap-1.5 mt-3 min-h-[40px]">
            {bars.map((h, i) => <i key={i} className={cn("flex-1 rounded-t-[3px]", i === bars.length - 1 ? "bg-[var(--graphite)]" : "bg-[var(--steel-blue)]")} style={{ height: `${h}%` }} />)}
          </span>
        </div>
        {/* table */}
        <div className="shrink-0 border-t border-line">
          {[["Website", "142", "31"], ["Meta Ads", "96", "18"], ["Google Ads", "81", "21"]].map((r, i) => (
            <div key={r[0]} className={cn("grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2", i < 2 && "border-b border-line")}>
              <span className="text-[10px]">{r[0]}</span>
              <span className="text-[10px] font-mono text-text-2 w-10 text-right">{r[1]}</span>
              <span className="text-[10px] font-mono text-text-2 w-8 text-right">{r[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A finished sample profile grid (used in the social hero). */
const tiles = [
  { t: "Before / after", k: 0 }, { t: "Install in 30s", k: 1 }, { t: "5 mistakes", k: 2 },
  { t: "Team at work", k: 0 }, { t: "Customer q&a", k: 1 }, { t: "Finished job", k: 0 },
  { t: "How we quote", k: 2 }, { t: "Review", k: 0 }, { t: "Tool of the week", k: 1 },
];
const tone = ["bg-[var(--graphite)] text-[var(--offwhite)]", "bg-[var(--steel-blue)] text-[var(--deep-charcoal)]", "bg-[var(--mist-grey)] text-[var(--graphite)]"];

export function StaticGrid({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div data-theme="light" aria-hidden className={cn("absolute inset-0 bg-bg flex flex-col text-left", className)}>
      <div className="px-3.5 pt-3 pb-2.5 flex items-center gap-2.5 border-b border-line shrink-0">
        <span className="size-9 rounded-full bg-[var(--steel-blue)] grid place-items-center text-[var(--deep-charcoal)] font-[600] text-[10px] shrink-0">NF</span>
        <span className="min-w-0">
          <span className="block text-[10px] font-[600] tracking-[-0.02em] truncate">northfield.heating</span>
          <span className="block text-[8px] text-text-2 truncate">Booking link in bio</span>
        </span>
      </div>
      {!compact && (
        <div className="px-3.5 py-2 flex gap-4 border-b border-line shrink-0">
          {[["Posts", "128"], ["Followers", "4,210"], ["Following", "184"]].map(([k, v]) => (
            <span key={k} className="text-[7.5px] text-text-2">{k} <b className="block text-[9px] text-text font-[600]">{v}</b></span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {tiles.map((t, i) => (
          <span key={i} className={cn("aspect-square grid place-items-center", tone[t.k])}>
            <span className="text-[6.5px] font-[550] leading-tight text-center px-1 opacity-85">{t.t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
