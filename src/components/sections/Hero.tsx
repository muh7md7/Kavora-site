"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, CalendarCheck, Inbox, Users, Workflow } from "lucide-react";
import { StatCard } from "@/components/glass/StatCard";
import { cn } from "@/lib/cn";

const capabilities = ["Business websites", "Landing pages", "Social media", "Reels & short-form", "Meta advertising", "AI enquiry agents", "n8n automation", "CRMs", "Management dashboards", "Internal tools"];

/** Sparkline area — static SVG, draws in with CSS. Sample data. */
function Spark() {
  const d = [12, 18, 15, 24, 22, 30, 28, 37, 34, 44, 41, 52];
  const w = 300, h = 90, max = 56;
  const pts = d.map((v, i) => [(i * w) / (d.length - 1), h - (v / max) * h]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[90px]" aria-hidden preserveAspectRatio="none">
      <defs><linearGradient id="hs" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--steel-light)" stopOpacity=".35" /><stop offset="1" stopColor="var(--steel-light)" stopOpacity="0" /></linearGradient></defs>
      <path d={`${line} L${w} ${h} L0 ${h} Z`} fill="url(#hs)" />
      <path d={line} fill="none" stroke="var(--steel-light)" strokeWidth="2" strokeLinecap="round" pathLength={1} className="[stroke-dasharray:1] [stroke-dashoffset:1] animate-[draw_1.8s_.6s_var(--ease-out)_forwards]" />
    </svg>
  );
}

/** Hero — editorial headline + a dark product stage with floating light-glass chips (pointer parallax on desktop). */
export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const upd = () => setEnabled(mq.matches); upd(); mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    setP({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };
  const at = (depth: number) => ({ transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, 0)` });

  return (
    <section data-theme="light" className="tone tone-grad relative overflow-hidden pt-[140px] md:pt-[168px]" onPointerMove={onMove} onPointerLeave={() => setP({ x: 0, y: 0 })}>
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden />
      <div className="container">
        <p className="eyebrow reveal-fade">Digital growth &amp; business technology · UAE · GCC · Pakistan · Worldwide</p>
        <h1 className="display mt-7 max-w-[15ch] md:max-w-none">
          <span className="split-line is-in"><span style={{ ["--line-delay" as string]: "60ms" }} className="reveal-line">Digital experiences.</span></span>
          <span className="split-line is-in"><span style={{ animationDelay: "160ms" }} className="reveal-line">Smarter <span className="accent pr-[.06em]">growth.</span></span></span>
        </h1>

        <div className="mt-12 md:mt-16 grid gap-12 lg:grid-cols-12 items-end">
          <div className="lg:col-span-4 reveal-fade" style={{ animationDelay: "320ms" }}>
            <p className="lead">We build your online presence, grow your business, and automate the work behind it — one connected team for web, social, ads, AI agents and dashboards.</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/contact/" className="btn btn-primary" data-cursor="Start">Start a project <ArrowUpRight size={17} className="btn-arrow" aria-hidden /></Link>
              <Link href="/services/" className="btn btn-ghost">Explore services <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
            </div>
          </div>

          {/* Product stage — concept interface, sample data */}
          <div ref={stage} className="lg:col-span-8 relative reveal-fade" style={{ animationDelay: "420ms" }} aria-label="Concept interface — sample data">
            <div data-theme="dark" className="tone tone-grad rounded-[28px] p-4 sm:p-6 md:p-8 overflow-hidden border border-black/10 shadow-[0_60px_100px_-50px_rgba(23,25,28,.55)]">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2"><span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-white/20" /><i className="size-2.5 rounded-full bg-white/20" /><i className="size-2.5 rounded-full bg-white/20" /></span><span className="num ml-2">keelbiz desk · overview</span></span>
                <span className="chip chip-slate">Sample data</span>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                <StatCard label="New enquiries" value="128" delta={12} icon={Inbox} tone="sage" />
                <StatCard label="Qualified leads" value="46" delta={8} icon={Users} tone="sage" />
                <StatCard label="Workflows run" value="1,204" delta={21} icon={Workflow} className="hidden md:flex" />
              </div>
              <div className="mt-3 glass rounded-[16px] p-4">
                <div className="flex items-center justify-between"><span className="text-sm font-[550]">Enquiries · 12 weeks</span><span className="num">Sample</span></div>
                <Spark />
              </div>
            </div>

            {/* Floating glass chips */}
            <div data-theme="light" className="hidden md:flex glass absolute -left-10 bottom-[18%] rounded-[16px] px-4 py-3 items-center gap-3 drift" style={at(-14)}>
              <span className="size-9 rounded-[10px] bg-steel-soft text-accent-text inline-flex items-center justify-center" aria-hidden><Bot size={18} /></span>
              <span className="text-[0.8rem] leading-tight"><span className="block font-[600]">Lead qualified</span><span className="text-text-2">AI agent · just now</span></span>
            </div>
            <div data-theme="light" className="hidden md:flex glass absolute -right-4 -bottom-6 rounded-[16px] px-4 py-3 items-center gap-3 drift" style={at(12)}>
              <span className="size-9 rounded-[10px] bg-moss-soft text-moss inline-flex items-center justify-center" aria-hidden><CalendarCheck size={18} /></span>
              <span className="text-[0.8rem] leading-tight"><span className="block font-[600]">Reel scheduled</span><span className="text-text-2">Instagram · Thu 18:00</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Capability marquee */}
      <div className="mt-24 md:mt-32 border-y border-line py-5 overflow-hidden" aria-label="Capabilities">
        <ul className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...capabilities, ...capabilities].map((c, i) => (
            <li key={i} className={cn("flex items-center gap-12 text-[0.95rem] text-text-2")} aria-hidden={i >= capabilities.length}>
              {c}<span className="size-1 rounded-full bg-line-strong" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
