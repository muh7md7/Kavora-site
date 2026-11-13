"use client";
import { useEffect, useState } from "react";
import { ChevronRight, Globe, Search } from "lucide-react";
import { DemoShell } from "@/components/ui";
import { useInViewOnce } from "@/components/motion/useInView";
import { AdsDemoLazy } from "./lazy";
import { cn } from "@/lib/cn";

/**
 * Advertising demo — an Ads Manager-style console built in code:
 *  campaign → ad set → ad tree, live-ticking spend/leads/CPL, Meta ↔ Google toggle,
 *  ad creative previews (feed, story, search) and a funnel that animates in.
 * Every figure is sample data on an invented account.
 */

type Platform = "meta" | "google";

const tree: Record<Platform, { name: string; status: string; sets: { name: string; ads: string[] }[] }[]> = {
  meta: [
    { name: "Leads — Servicing", status: "Active", sets: [
      { name: "Homeowners · 10km radius", ads: ["Before/after carousel", "Reel — 30s install"] },
      { name: "Retargeting · site visitors", ads: ["Review quote — single image"] },
    ] },
    { name: "Awareness — Local", status: "Active", sets: [{ name: "Broad · interests", ads: ["Team at work — video"] }] },
  ],
  google: [
    { name: "Search — Emergency repair", status: "Active", sets: [
      { name: "Exact match · high intent", ads: ["Responsive search ad A", "Responsive search ad B"] },
      { name: "Phrase match · servicing", ads: ["Responsive search ad C"] },
    ] },
    { name: "Performance Max — Local", status: "Learning", sets: [{ name: "Asset group · core", ads: ["Asset group — images + copy"] }] },
  ],
};

const metrics: Record<Platform, { spend: number; leads: number; cpl: number; ctr: number }> = {
  meta: { spend: 1840, leads: 96, cpl: 19.2, ctr: 2.4 },
  google: { spend: 2260, leads: 81, cpl: 27.9, ctr: 6.1 },
};

export function AdsDemo() {
  const [platform, setPlatform] = useState<Platform>("meta");
  const [openSet, setOpenSet] = useState("0-0");

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="radiogroup" aria-label="Advertising platform" className="flex gap-1.5 p-1 rounded-pill border border-line-strong">
          {([["meta", Globe, "Meta"], ["google", Search, "Google"]] as const).map(([p, Icon, label]) => (
            <button key={p} type="button" role="radio" aria-checked={platform === p} onClick={() => { setPlatform(p); setOpenSet("0-0"); }}
              className={cn("px-4 min-h-11 rounded-pill text-[0.86rem] font-[550] inline-flex items-center gap-2 transition-colors duration-[350ms]",
                platform === p ? "bg-[var(--graphite)] text-[var(--offwhite)]" : "text-text-2 hover:text-text")}>
              <Icon size={15} aria-hidden />{label}
            </button>
          ))}
        </div>
        <p className="text-[0.8rem] text-text-2">One platform or both — you choose.</p>
      </div>

      <DemoShell label="Sample account">
        {(running) => (
          <div className="rounded-[20px] border border-line bg-bg overflow-hidden">
            <Metrics platform={platform} running={running} />
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <Tree platform={platform} openSet={openSet} setOpenSet={setOpenSet} />
              <div className="border-t lg:border-t-0 lg:border-l border-line p-5">
                <Creatives platform={platform} />
              </div>
            </div>
            <Funnel platform={platform} />
          </div>
        )}
      </DemoShell>
      <p className="text-[0.82rem] text-text-2">Sample data on an invented account, to show structure and reporting — not a result we are claiming.</p>
    </div>
  );
}

/* ---------------- ticking metrics ---------------- */
function Metrics({ platform, running }: { platform: Platform; running: boolean }) {
  const base = metrics[platform];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(i);
  }, [running]);

  // Deterministic drift so the panel feels live without inventing a trend.
  const drift = (seed: number, amp: number) => amp * Math.sin((tick + seed) * 0.9);
  const spend = base.spend + Math.round(drift(0, 18) + tick * 1.4);
  const leads = base.leads + Math.round(Math.abs(drift(1, 1.4)) + tick * 0.06);
  const cpl = spend / Math.max(leads, 1);

  const cells = [
    { k: "Spend", v: `${spend.toLocaleString("en")}`, pre: "", note: "this month" },
    { k: "Leads", v: `${leads}`, pre: "", note: "forms + calls" },
    { k: "Cost per lead", v: cpl.toFixed(2), pre: "", note: "spend ÷ leads" },
    { k: "CTR", v: `${base.ctr}%`, pre: "", note: "clicks ÷ impressions" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-line">
      {cells.map((c, i) => (
        <div key={c.k} className={cn("p-4 sm:p-5", i < 3 && "lg:border-r border-line", i % 2 === 0 && "border-r lg:border-r", i < 2 && "border-b lg:border-b-0 border-line")}>
          <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">{c.k}</p>
          <p className="mt-2 text-[1.35rem] font-[560] tracking-[-0.035em] leading-none transition-opacity duration-300" style={{ fontVariantNumeric: "tabular-nums" }}>
            {c.pre}{c.v}
          </p>
          <p className="mt-1.5 text-[0.75rem] text-text-2">{c.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- campaign tree ---------------- */
function Tree({ platform, openSet, setOpenSet }: { platform: Platform; openSet: string; setOpenSet: (v: string) => void }) {
  return (
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">Structure</p>
      <ul className="mt-4 grid gap-2">
        {tree[platform].map((c, ci) => (
          <li key={c.name}>
            <div className="flex items-center justify-between gap-3 rounded-[12px] border border-line bg-bg-2 px-3.5 py-3">
              <span className="min-w-0">
                <span className="block text-[0.72rem] font-mono uppercase tracking-wider text-text-2">Campaign</span>
                <span className="block text-[0.92rem] font-[550] truncate">{c.name}</span>
              </span>
              <span className={cn("tag tag-mono !min-h-6 !px-2 !text-[9px] shrink-0", c.status === "Active" && "!bg-[var(--graphite)] !text-[var(--offwhite)] !border-[var(--graphite)]")}>{c.status}</span>
            </div>
            <ul className="mt-1.5 ml-3 sm:ml-5 grid gap-1.5 border-l border-line pl-3 sm:pl-4">
              {c.sets.map((set, si) => {
                const key = `${ci}-${si}`;
                const open = openSet === key;
                return (
                  <li key={set.name}>
                    <button type="button" onClick={() => setOpenSet(open ? "" : key)} aria-expanded={open}
                      className="w-full flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left hover:bg-[var(--surface)] transition-colors min-h-11">
                      <ChevronRight size={13} className={cn("shrink-0 text-text-2 transition-transform duration-[350ms]", open && "rotate-90")} aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-[0.68rem] font-mono uppercase tracking-wider text-text-2">Ad set</span>
                        <span className="block text-[0.86rem] truncate">{set.name}</span>
                      </span>
                    </button>
                    {open && (
                      <ul className="ml-6 sm:ml-7 grid gap-1 border-l border-line pl-3 sm:pl-4 pb-1">
                        {set.ads.map((a) => (
                          <li key={a} className="py-1.5">
                            <span className="block text-[0.64rem] font-mono uppercase tracking-wider text-text-2">Ad</span>
                            <span className="block text-[0.82rem]">{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- creative previews ---------------- */
function Creatives({ platform }: { platform: Platform }) {
  const [i, setI] = useState(0);
  const items = platform === "meta" ? ["Feed", "Story"] : ["Search", "Display"];
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">Creative</p>
        <div role="radiogroup" aria-label="Ad placement" className="flex gap-1">
          {items.map((x, n) => (
            <button key={x} type="button" role="radio" aria-checked={i === n} onClick={() => setI(n)}
              className={cn("px-3 min-h-9 rounded-pill text-[0.78rem] font-[550] transition-colors", i === n ? "bg-[var(--graphite)] text-[var(--offwhite)]" : "text-text-2 hover:text-text")}>{x}</button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid place-items-center min-h-[260px]">
        {platform === "meta" ? (i === 0 ? <FeedAd /> : <StoryAd />) : (i === 0 ? <SearchAd /> : <DisplayAd />)}
      </div>
    </div>
  );
}

function FeedAd() {
  return (
    <div className="w-full max-w-[260px] rounded-[12px] border border-line overflow-hidden bg-bg" aria-label="Sample feed ad" role="img">
      <div className="flex items-center gap-2 p-2.5">
        <span className="size-7 rounded-full bg-[var(--steel-blue)] shrink-0" aria-hidden />
        <span className="min-w-0"><span className="block text-[10px] font-[600]">Northfield Heating</span><span className="block text-[8px] text-text-2">Sponsored</span></span>
      </div>
      <div className="relative aspect-[4/5] bg-bg-2" aria-hidden>
        <span className="absolute inset-0" style={{ background: "radial-gradient(70% 55% at 60% 25%, rgba(184,201,210,.85), transparent 70%)" }} />
        <span className="absolute left-[10%] right-[10%] top-[16%] h-[44%] rounded-[8px] bg-[var(--graphite)] opacity-90" />
        <span className="absolute left-[10%] bottom-[20%] text-[9px] font-[560] text-text">Same-week servicing slots</span>
        <span className="absolute left-[10%] bottom-[11%] text-[8px] text-text-2">Fixed price, no callout fee</span>
      </div>
      <div className="flex items-center justify-between px-2.5 py-2 border-t border-line">
        <span className="text-[8px] text-text-2">northfield.sample</span>
        <span className="text-[9px] font-[550] px-2.5 h-6 grid place-items-center rounded-[5px] bg-bg-2 border border-line">Book now</span>
      </div>
    </div>
  );
}
function StoryAd() {
  return (
    <div data-theme="dark" className="relative w-[150px] aspect-[9/16] rounded-[16px] overflow-hidden bg-[var(--deep-charcoal)]" role="img" aria-label="Sample story ad">
      <span className="absolute inset-0" style={{ background: "radial-gradient(60% 40% at 50% 20%, rgba(184,201,210,.32), transparent 70%)" }} aria-hidden />
      <span className="absolute top-2 inset-x-2 h-0.5 rounded-full bg-white/25" aria-hidden><i className="block h-full w-1/2 rounded-full bg-white/80" /></span>
      <p className="absolute top-8 inset-x-3 text-[11px] font-[560] leading-tight text-[var(--offwhite)]">Boiler playing up before winter?</p>
      <span className="absolute inset-x-3 top-[38%] h-[26%] rounded-[8px] bg-[var(--steel-blue)]/25 border border-white/10" aria-hidden />
      <span className="absolute inset-x-3 bottom-8 h-7 rounded-pill bg-[var(--offwhite)] text-[var(--graphite)] text-[9px] font-[600] grid place-items-center">Book a visit</span>
      <span className="absolute inset-x-0 bottom-2.5 text-center text-[8px] text-white/60">Swipe up</span>
    </div>
  );
}
function SearchAd() {
  return (
    <div className="w-full max-w-[280px] rounded-[12px] border border-line bg-bg p-4" role="img" aria-label="Sample search ad">
      <p className="text-[9px] font-[600] text-text-2">Sponsored</p>
      <p className="mt-2 text-[12px] leading-snug text-accent-text font-[550]">Emergency Boiler Repair — Same-Day Visits</p>
      <p className="text-[9px] text-text-2 mt-1">northfield.sample/repair</p>
      <p className="mt-2 text-[10px] leading-relaxed text-text">Qualified engineers, fixed pricing and no callout fee. Book a slot online in under a minute.</p>
      <p className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-accent-text">
        {["Servicing", "Installations", "Landlord certificates"].map((x) => <span key={x}>{x}</span>)}
      </p>
    </div>
  );
}
function DisplayAd() {
  return (
    <div className="w-full max-w-[280px] rounded-[12px] border border-line overflow-hidden bg-bg" role="img" aria-label="Sample display ad">
      <div className="relative h-24 bg-bg-2" aria-hidden>
        <span className="absolute inset-0" style={{ background: "radial-gradient(70% 70% at 75% 20%, rgba(184,201,210,.8), transparent 70%)" }} />
        <span className="absolute left-4 top-5 right-20 h-2 rounded bg-[var(--graphite)] opacity-85" />
        <span className="absolute left-4 top-10 right-28 h-2 rounded bg-line-strong" />
      </div>
      <div className="p-3 flex items-center justify-between gap-3">
        <span className="text-[10px] font-[550] leading-tight">Heating sorted before winter</span>
        <span className="text-[9px] font-[600] px-2.5 h-6 grid place-items-center rounded-[5px] bg-[var(--graphite)] text-[var(--offwhite)] shrink-0">Book</span>
      </div>
    </div>
  );
}

/* ---------------- funnel ---------------- */
const funnels: Record<Platform, { k: string; v: string; w: number }[]> = {
  meta: [
    { k: "Impressions", v: "184,200", w: 100 },
    { k: "Clicks", v: "4,420", w: 62 },
    { k: "Landing views", v: "3,980", w: 48 },
    { k: "Leads", v: "96", w: 26 },
  ],
  google: [
    { k: "Impressions", v: "62,800", w: 100 },
    { k: "Clicks", v: "3,830", w: 66 },
    { k: "Landing views", v: "3,610", w: 52 },
    { k: "Leads", v: "81", w: 28 },
  ],
};

function Funnel({ platform }: { platform: Platform }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref} className="border-t border-line p-5">
      <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">Funnel · sample</p>
      <div className="mt-4 grid gap-2">
        {funnels[platform].map((f, i) => (
          <div key={f.k} className="flex items-center gap-3">
            <span className="w-[104px] sm:w-[120px] shrink-0 text-[0.8rem] text-text-2">{f.k}</span>
            <span className="flex-1 h-8 rounded-[8px] bg-bg-2 overflow-hidden">
              <i className={cn("block h-full rounded-[8px] origin-left transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]", i === 3 ? "bg-[var(--graphite)]" : "bg-[var(--steel-blue)]")}
                style={{ transform: `scaleX(${inView ? f.w / 100 : 0})`, transitionDelay: `${i * 120}ms` }} />
            </span>
            <span className="w-[72px] shrink-0 text-right text-[0.82rem] font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>{f.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdsDemoSection() {
  return (
    <section id="demo" data-theme="light" className="tone !bg-bg-2 section-major scroll-mt-24">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">See it working</p>
          <h2 className="mt-5">The account, <span className="accent">open.</span></h2>
          <p className="lead mt-6">This is how a managed account is structured and reported — campaign, ad set, ad, and the numbers that decide what we change next.</p>
        </div>
        <div className="mt-12"><AdsDemoLazy /></div>
      </div>
    </section>
  );
}
