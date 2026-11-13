"use client";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/copy";
import Link from "next/link";
import { ArrowUpRight, Bot, CalendarCheck, Check, MessageSquare, Sparkles } from "lucide-react";


const hero = home.hero;
const capabilities = hero.marquee;

/** Hero — editorial headline + a dark product stage with floating light-glass chips (pointer parallax on desktop). */
export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const upd = () => setEnabled(mq.matches); upd(); mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !stage.current || !root.current) return;
    const rb = root.current.getBoundingClientRect();
    root.current.style.setProperty("--sx", `${e.clientX - rb.left}px`); root.current.style.setProperty("--sy", `${e.clientY - rb.top}px`);
    root.current.classList.add("spot-on");
    const r = stage.current.getBoundingClientRect();
    setP({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };
  const at = (depth: number) => ({ transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, 0)` });

  return (
    <section ref={root} data-theme="light" className="tone tone-grad has-grid hero-shell relative overflow-hidden pt-[124px] md:pt-[148px] lg:pt-[164px]" onPointerMove={onMove} onPointerLeave={() => { setP({ x: 0, y: 0 }); root.current?.classList.remove("spot-on"); }}>
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="hero-fade" aria-hidden />
      <div className="spotlight" aria-hidden />
      <div className="container grid gap-14 lg:gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow reveal-fade" style={{ animationDelay: "120ms" }}>{hero.eyebrow}</p>
          <h1 className="mt-7 !text-[clamp(2.5rem,1.35rem+3.3vw,4.5rem)] !leading-[1.02] !tracking-[-0.048em]">
            <span className="split-line is-in"><span className="reveal-line" style={{ animationDelay: "180ms" }}>{hero.line1}</span></span>
            <span className="split-line is-in"><span className="reveal-line" style={{ animationDelay: "260ms" }}>{hero.line2}</span></span>
            <span className="split-line is-in"><span className="reveal-line" style={{ animationDelay: "340ms" }}><span className="accent pr-[.04em]">{hero.accentWord}</span> {hero.line3}</span></span>
          </h1>
          <p className="lead mt-7 max-w-[50ch] reveal-fade" style={{ animationDelay: "460ms" }}>{hero.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3 reveal-fade" style={{ animationDelay: "560ms" }}>
            <Link href="/contact/" className="btn btn-primary" data-magnetic>{hero.primaryButton} <ArrowUpRight size={17} className="btn-arrow" aria-hidden /></Link>
            <Link href="/services/" className="btn btn-glass">{hero.secondaryButton}</Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-text-2 reveal-fade" style={{ animationDelay: "640ms" }}>
            {hero.ticks.map((t) => (
              <li key={t} className="inline-flex items-center gap-2"><Check size={14} className="text-accent" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>

        {/* Product stage — interface demonstration (AI assistant → qualified lead → CRM) */}
        <div ref={stage} className="lg:col-span-5 relative reveal-fade" style={{ animationDelay: "520ms" }}>
          <figure aria-label="Interface demonstration: an AI website assistant qualifying an enquiry and booking a call" className="relative">
            <div className="device">
              <div className="device-bar">
                <span className="device-dots" aria-hidden><i /><i /><i /></span>
                <span className="num ml-1 whitespace-nowrap truncate">website assistant</span>
                <span className="chip chip-slate ml-auto whitespace-nowrap shrink-0">Interface demo</span>
              </div>
              <div className="grid sm:grid-cols-[1.2fr_1fr] lg:grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-2.5">
                {/* chat */}
                <div className="device-screen p-4 flex flex-col gap-3 min-h-[300px] bg-[linear-gradient(180deg,#fbfaf7,#f3f0eb)]">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-line">
                    <span className="size-8 rounded-[10px] bg-[linear-gradient(150deg,#2f4a59,#233845)] text-[#f3f0eb] inline-flex items-center justify-center" aria-hidden><Sparkles size={15} /></span>
                    <span className="leading-tight"><span className="block text-[0.82rem] font-[600]">Keelbiz Assistant</span><span className="flex items-center gap-1.5 text-[0.7rem] text-text-2"><i className="size-1.5 rounded-full bg-[#5e9c80]" aria-hidden />Replies instantly</span></span>
                  </div>
                  <p className="self-end max-w-[85%] rounded-[14px] rounded-br-[4px] bg-[#233845] text-[#f3f0eb] px-3.5 py-2.5 text-[0.8rem] leading-snug hero-msg" style={{ animationDelay: "900ms" }}>Hi — we need a new website and someone to run our ads.</p>
                  <p className="max-w-[88%] rounded-[14px] rounded-bl-[4px] bg-white border border-line px-3.5 py-2.5 text-[0.8rem] leading-snug shadow-[0_6px_14px_-10px_rgba(23,38,47,.3)] hero-msg" style={{ animationDelay: "1500ms" }}>Happy to help. Is that Meta, Google, or both? I can book a short call to scope it.</p>
                  <p className="self-end max-w-[85%] rounded-[14px] rounded-br-[4px] bg-[#233845] text-[#f3f0eb] px-3.5 py-2.5 text-[0.8rem] leading-snug hero-msg" style={{ animationDelay: "2100ms" }}>Both. Thursday works.</p>
                  <div className="mt-auto flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-2 text-[0.75rem] text-text-2"><MessageSquare size={13} aria-hidden />Type a message…</div>
                </div>
                {/* lead card */}
                <div className="flex flex-col gap-2.5">
                  <div className="device-screen p-4 bg-[linear-gradient(180deg,#eef2f2,#e5ebec)] hero-msg" style={{ animationDelay: "2600ms" }}>
                    <div className="flex items-center justify-between"><span className="num">New lead</span><span className="chip bg-[#233845] text-[#f3f0eb]">Qualified</span></div>
                    <dl className="mt-3 grid gap-2 text-[0.78rem]">
                      <div className="flex justify-between gap-3"><dt className="text-text-2">Interest</dt><dd className="font-[550]">Website + Ads</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-text-2">Platforms</dt><dd className="font-[550]">Meta, Google</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-text-2">Next step</dt><dd className="font-[550]">Scoping call</dd></div>
                    </dl>
                  </div>
                  <div className="device-screen p-4 bg-[linear-gradient(180deg,#eef2f2,#e5ebec)] hero-msg" style={{ animationDelay: "3000ms" }}>
                    <span className="num">Pipeline</span>
                    <ol className="mt-3 grid gap-2 text-[0.78rem]">
                      {[["Enquiry received", true], ["Qualified by AI", true], ["Call booked", true], ["Proposal", false]].map(([t, done]) => (
                        <li key={t as string} className="flex items-center gap-2.5">
                          <span className={done ? "size-4 rounded-full bg-[#233845] text-[#f3f0eb] inline-flex items-center justify-center" : "size-4 rounded-full border border-line-strong"} aria-hidden>{done ? <Check size={10} strokeWidth={3} /> : null}</span>
                          <span className={done ? "" : "text-text-2"}>{t as string}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating glass chips */}
            <div data-theme="light" className="hidden md:flex glass absolute -left-6 xl:-left-10 -bottom-6 rounded-[16px] px-3.5 py-2.5 items-center gap-3 drift" style={at(-12)}>
              <span className="size-8 rounded-[10px] bg-[#233845] text-[#f3f0eb] inline-flex items-center justify-center" aria-hidden><Bot size={18} /></span>
              <span className="text-[0.8rem] leading-tight"><span className="block font-[600]">Lead qualified</span><span className="text-text-2">AI agent · instantly</span></span>
            </div>
            <div data-theme="light" className="hidden md:flex glass absolute right-[30%] -top-7 rounded-[16px] px-3.5 py-2.5 items-center gap-3 drift" style={at(10)}>
              <span className="size-8 rounded-[10px] bg-[#233845] text-[#f3f0eb] inline-flex items-center justify-center" aria-hidden><CalendarCheck size={18} /></span>
              <span className="text-[0.8rem] leading-tight"><span className="block font-[600]">Call booked</span><span className="text-text-2">Added to calendar</span></span>
            </div>
            <figcaption className="sr-only">Illustrative interface. Not real customer data.</figcaption>
          </figure>
        </div>
      </div>

      {/* Capability marquee */}
      <div className="mt-20 md:mt-24 border-y border-line py-5 overflow-hidden marquee-mask" aria-label="What we do">
        <ul className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...capabilities, ...capabilities].map((c, i) => (
            <li key={i} className="flex items-center gap-12 text-[0.92rem] text-text-2" aria-hidden={i >= capabilities.length}>
              {c}<span className="size-1 rounded-full bg-line-strong" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
