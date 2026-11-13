"use client";
import { useEffect, useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { animate } from "motion/react";
import { DemoShell } from "@/components/ui";
import { useInViewOnce, usePrefersReducedMotion } from "@/components/motion/useInView";
import { WebsiteDemoLazy } from "./lazy";
import { cn } from "@/lib/cn";

/**
 * Website demo — three parts, all built in code:
 *  1. device switcher with three sample site styles (same build, three widths),
 *  2. before/after redesign slider,
 *  3. a performance panel: score ring + load-time bars.
 * Every number is labelled sample. Nothing here claims a measured client result.
 */

type Device = "desktop" | "tablet" | "phone";
type StyleKey = "service" | "studio" | "shop";

const styles: Record<StyleKey, { label: string; url: string; nav: string[]; head: string; sub: string; cta: string; accentDark: boolean }> = {
  service: { label: "Service business", url: "northfield-plumbing.sample", nav: ["Services", "Areas", "Reviews", "Contact"], head: "Heating fixed properly, first time.", sub: "Emergency callouts, servicing and installation.", cta: "Book a visit", accentDark: true },
  studio: { label: "Studio / portfolio", url: "atelier-vey.sample", nav: ["Work", "Studio", "Journal", "Enquire"], head: "Interiors with restraint.", sub: "Residential and hospitality projects.", cta: "View work", accentDark: false },
  shop: { label: "Product / shop", url: "fernlow-goods.sample", nav: ["Shop", "Collections", "About", "Cart"], head: "Everyday objects, made to last.", sub: "Shipped from our workshop.", cta: "Shop now", accentDark: true },
};

const frame: Record<Device, string> = {
  desktop: "w-full",
  tablet: "w-[64%] min-w-[360px]",
  phone: "w-[31%] min-w-[260px]",
};

export function WebsiteDemo() {
  const [device, setDevice] = useState<Device>("desktop");
  const [style, setStyle] = useState<StyleKey>("service");

  return (
    <div className="grid gap-5">
      {/* controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="radiogroup" aria-label="Sample site style" className="flex flex-wrap gap-2">
          {(Object.keys(styles) as StyleKey[]).map((k) => (
            <button key={k} type="button" role="radio" aria-checked={style === k} onClick={() => setStyle(k)} className="tag">
              {styles[k].label}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="Screen width" className="flex gap-1.5 p-1 rounded-pill border border-line-strong">
          {([["desktop", Monitor], ["tablet", Tablet], ["phone", Smartphone]] as const).map(([d, Icon]) => (
            <button key={d} type="button" role="radio" aria-checked={device === d} aria-label={d} onClick={() => setDevice(d)}
              className={cn("size-11 grid place-items-center rounded-pill transition-colors duration-[350ms]", device === d ? "bg-[var(--graphite)] text-[var(--offwhite)]" : "text-text-2 hover:text-text")}>
              <Icon size={17} aria-hidden />
            </button>
          ))}
        </div>
      </div>

      {/* stage */}
      <div className="rounded-[28px] border border-line bg-bg-2 p-4 sm:p-8 grid place-items-center min-h-[380px] sm:min-h-[460px] overflow-hidden">
        <div className={cn("transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]", frame[device])}>
          <div className="device-browser">
            <div className="db-bar" aria-hidden><span className="db-dots"><i /><i /><i /></span><span className="db-url">{styles[style].url}</span><span className="w-[39px]" /></div>
            <div className={cn("relative overflow-hidden", device === "phone" ? "aspect-[9/14]" : device === "tablet" ? "aspect-[4/3]" : "aspect-[16/10]")}>
              <SamplePage s={styles[style]} device={device} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-[0.82rem] text-text-2">Sample layouts, invented businesses — the same build at three widths. Your site is designed around your business.</p>

      {/* redesign + performance */}
      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5 mt-2">
        <RedesignSlider />
        <PerformancePanel />
      </div>
    </div>
  );
}

/* ---------------- sample page ---------------- */
function SamplePage({ s, device }: { s: (typeof styles)[StyleKey]; device: Device }) {
  const compact = device === "phone";
  return (
    <div data-theme="light" className="absolute inset-0 bg-bg flex flex-col text-left">
      <div className={cn("flex items-center justify-between border-b border-line shrink-0", compact ? "px-3 h-9" : "px-5 h-11")}>
        <span className={cn("font-[600] tracking-[-0.03em]", compact ? "text-[10px]" : "text-[13px]")}>{s.url.split(".")[0].replace("-", " ")}</span>
        {compact ? <span className="grid gap-[3px]" aria-hidden>{[0, 1, 2].map((i) => <i key={i} className="w-3.5 h-px bg-text" />)}</span>
          : <span className="flex gap-4" aria-hidden>{s.nav.map((n) => <span key={n} className="text-[10px] text-text-2">{n}</span>)}</span>}
      </div>
      <div className={cn("flex-1 min-h-0 flex", compact ? "flex-col" : "")}>
        <div className={cn("flex flex-col justify-center", compact ? "p-4 gap-2" : "flex-1 p-6 sm:p-8 gap-3")}>
          <p className={cn("font-[560] tracking-[-0.035em] leading-[1.04]", compact ? "text-[15px]" : "text-[clamp(16px,2.2vw,28px)]")}>{s.head}</p>
          <p className={cn("text-text-2 leading-snug", compact ? "text-[9px]" : "text-[clamp(9px,1vw,12px)]")}>{s.sub}</p>
          <span className={cn("mt-1 inline-flex items-center justify-center rounded-pill font-[550] w-fit",
            s.accentDark ? "bg-[var(--graphite)] text-[var(--offwhite)]" : "border border-text text-text",
            compact ? "text-[9px] px-3 h-6" : "text-[10px] px-4 h-8")}>{s.cta}</span>
        </div>
        <div className={cn("relative bg-bg-2 border-line overflow-hidden", compact ? "flex-1 border-t" : "w-[42%] border-l")} aria-hidden>
          <span className="absolute inset-0" style={{ background: "radial-gradient(70% 60% at 70% 20%, rgba(184,201,210,.75), transparent 70%)" }} />
          <span className="absolute left-[12%] right-[12%] top-[18%] bottom-[34%] rounded-[8px] bg-[var(--graphite)] opacity-90" />
          <span className="absolute left-[12%] w-[46%] h-1.5 rounded bottom-[24%] bg-line-strong" />
          <span className="absolute left-[12%] w-[30%] h-1.5 rounded bottom-[16%] bg-line-strong" />
        </div>
      </div>
      {!compact && (
        <div className="shrink-0 border-t border-line grid grid-cols-3" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn("p-3 sm:p-4 flex flex-col gap-1.5", i < 2 && "border-r border-line")}>
              <i className="w-6 h-6 rounded-[7px] bg-bg-2 border border-line" />
              <i className="w-[70%] h-1.5 rounded bg-line-strong" /><i className="w-full h-1 rounded bg-line" /><i className="w-[80%] h-1 rounded bg-line" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- before / after ---------------- */
function RedesignSlider() {
  const [v, setV] = useState(52);
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="!text-[1.05rem]">Redesign, dragged</h3>
        <span className="tag tag-mono !min-h-7 !px-2.5 !text-[10px]">Sample</span>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-text-2">Drag to compare a dated layout with a rebuilt one.</p>

      <div className="relative mt-5 rounded-[14px] overflow-hidden border border-line aspect-[16/9]">
        <OldSite />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${v}%)` }}><NewSite /></div>
        <div className="absolute inset-y-0 w-px bg-[var(--offwhite)] shadow-[0_0_0_1px_rgba(17,25,30,.25)]" style={{ left: `${v}%` }} aria-hidden>
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-8 rounded-full bg-[var(--offwhite)] shadow-[var(--elev-1)] grid place-items-center text-[var(--graphite)]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M5 3 2 7l3 4M9 3l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
        <span className="absolute top-2.5 left-3 tag tag-mono !min-h-6 !px-2 !text-[9px]">Before</span>
        <span className="absolute top-2.5 right-3 tag tag-mono !min-h-6 !px-2 !text-[9px]">After</span>
      </div>

      <label className="mt-4 block">
        <span className="sr-only">Reveal the redesign</span>
        <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="range w-full"
          style={{ ["--p" as string]: `${v}%` }} aria-valuetext={`${v}% redesigned`} />
      </label>
    </div>
  );
}

function OldSite() {
  return (
    <div className="absolute inset-0 bg-[#eceae4]" aria-hidden>
      <div className="h-7 bg-[#28353d] flex items-center px-3 gap-3">
        <span className="text-[9px] text-white/80 font-serif">Northfield Plumbing &amp; Heating Ltd</span>
      </div>
      <div className="p-3 grid gap-1.5">
        <span className="block h-2.5 w-[70%] bg-[#9aa39f] rounded-[2px]" />
        <span className="block h-1.5 w-[92%] bg-[#b6bdb9] rounded-[2px]" />
        <span className="block h-1.5 w-[88%] bg-[#b6bdb9] rounded-[2px]" />
        <span className="block h-1.5 w-[94%] bg-[#b6bdb9] rounded-[2px]" />
        <span className="block h-1.5 w-[60%] bg-[#b6bdb9] rounded-[2px]" />
        <div className="mt-1 flex gap-1.5">
          <span className="h-5 w-16 bg-[#7d8884] rounded-[2px]" /><span className="h-5 w-16 bg-[#7d8884] rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}
function NewSite() {
  return (
    <div className="absolute inset-0 bg-[var(--offwhite)]" aria-hidden>
      <div className="h-8 border-b border-[rgba(40,53,61,.08)] flex items-center justify-between px-4">
        <span className="text-[10px] font-[600] tracking-[-0.03em] text-[var(--graphite)]">northfield</span>
        <span className="flex gap-3">{["Services", "Areas", "Contact"].map((n) => <span key={n} className="text-[8px] text-[#5a6a73]">{n}</span>)}</span>
      </div>
      <div className="p-4 flex gap-4 h-[calc(100%-2rem)]">
        <div className="flex-1 flex flex-col justify-center gap-2">
          <p className="text-[clamp(11px,1.6vw,17px)] font-[560] tracking-[-0.035em] leading-[1.05] text-[#1b252c]">Heating fixed properly, first time.</p>
          <p className="text-[8px] text-[#5a6a73]">Emergency callouts and servicing.</p>
          <span className="mt-1 w-fit text-[8px] font-[550] px-3 h-6 grid place-items-center rounded-pill bg-[var(--graphite)] text-[var(--offwhite)]">Book a visit</span>
        </div>
        <div className="w-[38%] rounded-[8px] bg-[#e9edf0] relative overflow-hidden">
          <span className="absolute inset-0" style={{ background: "radial-gradient(70% 60% at 65% 25%, rgba(184,201,210,.9), transparent 70%)" }} />
          <span className="absolute inset-x-3 top-4 bottom-8 rounded-[5px] bg-[var(--graphite)] opacity-90" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- performance ---------------- */
const SCORE = 98;
function PerformancePanel() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const reduce = usePrefersReducedMotion();
  const [raw, setRaw] = useState(0);
  // Reduced motion shows the final value without animating; no state write needed for it.
  const score = reduce ? SCORE : raw;

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, SCORE, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setRaw(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce]);

  const C = 2 * Math.PI * 34;
  return (
    <div ref={ref} className="card p-5 sm:p-6 flex flex-col">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="!text-[1.05rem]">Built to score</h3>
        <span className="tag tag-mono !min-h-7 !px-2.5 !text-[10px]">Sample</span>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-text-2">What we build for, measured in a browser audit.</p>

      <div className="mt-5 flex items-center gap-5">
        <div className="relative size-[88px] shrink-0">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--graphite)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C - (C * score) / 100} />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-[560] text-[1.4rem] tracking-[-0.04em]" style={{ fontVariantNumeric: "tabular-nums" }}>{score}</span>
        </div>
        <div className="min-w-0">
          <p className="font-[550] text-[0.95rem]">Performance target</p>
          <p className="text-[0.84rem] text-text-2 mt-1 leading-snug">We build to 95+ on mobile, then verify it before launch.</p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-line grid gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">Load time, sample comparison</p>
        {[{ k: "Typical template build", v: 100, t: "4.8s" }, { k: "What we build", v: 25, t: "1.2s" }].map((b, i) => (
          <div key={b.k}>
            <div className="flex justify-between text-[0.82rem] mb-1.5"><span>{b.k}</span><span className="font-mono">{b.t}</span></div>
            <div className="h-2 rounded-full bg-bg-2 overflow-hidden">
              <div className={cn("h-full rounded-full origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]", i ? "bg-[var(--graphite)]" : "bg-[var(--steel-blue)]")}
                style={{ transform: `scaleX(${inView ? b.v / 100 : 0})`, transitionDelay: `${i * 160}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Section wrapper used by the website service page. */
export function WebsiteDemoSection() {
  return (
    <section id="demo" data-theme="light" className="tone !bg-bg-2 section-major scroll-mt-24">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">See it working</p>
          <h2 className="mt-5">Same build. Every <span className="accent">screen.</span></h2>
          <p className="lead mt-6">Switch the style, switch the width, drag the redesign. This is the level of finish we build to — not a screenshot of it.</p>
        </div>
        <div className="mt-12">
          <DemoShell badge={false} controls={false}><WebsiteDemoLazy /></DemoShell>
        </div>
      </div>
    </section>
  );
}
