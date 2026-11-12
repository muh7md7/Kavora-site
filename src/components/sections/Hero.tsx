"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, CalendarCheck, Check, MessageSquare, Sparkles } from "lucide-react";


const capabilities = ["Business websites", "Landing pages", "Social media management", "Reels & content", "Meta Ads", "Google Ads", "Custom AI agents", "Workflow automation", "Business dashboards", "Management systems"];

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
    <section data-theme="light" className="tone tone-grad relative overflow-hidden pt-[128px] md:pt-[150px] lg:pt-[168px]" onPointerMove={onMove} onPointerLeave={() => setP({ x: 0, y: 0 })}>
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden />
      <div className="container grid gap-14 lg:gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow reveal-fade" style={{ animationDelay: "120ms" }}>Websites · Social · Advertising · AI · Dashboards</p>
          <h1 className="mt-7 !text-[clamp(2.5rem,1.5rem+3.3vw,4.35rem)] !leading-[1.02] !tracking-[-0.045em]">
            <span className="split-line is-in"><span className="reveal-line" style={{ animationDelay: "180ms" }}>Build your presence.</span></span>
            <span className="split-line is-in"><span className="reveal-line" style={{ animationDelay: "260ms" }}>Grow your business.</span></span>
            <span className="split-line is-in"><span className="reveal-line" style={{ animationDelay: "340ms" }}><span className="accent pr-[.04em]">Automate</span> what comes next.</span></span>
          </h1>
          <p className="lead mt-8 max-w-[52ch] reveal-fade" style={{ animationDelay: "460ms" }}>We design websites, manage social media, run Meta and Google advertising, and build AI automation and business systems. Choose one service or a tailored combination.</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 reveal-fade" style={{ animationDelay: "560ms" }}>
            <Link href="/contact/" className="btn btn-primary" data-magnetic>Start a Project <ArrowUpRight size={17} className="btn-arrow" aria-hidden /></Link>
            <Link href="/services/" className="btn btn-ghost">Explore Services <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-text-2 reveal-fade" style={{ animationDelay: "640ms" }}>
            {["One service or a complete solution", "Custom quotes", "No forced bundles"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2"><Check size={14} className="text-accent" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>

        {/* Product stage — interface demonstration (AI assistant → qualified lead → CRM) */}
        <div ref={stage} className="lg:col-span-5 relative reveal-fade" style={{ animationDelay: "520ms" }}>
          <figure aria-label="Interface demonstration: an AI website assistant qualifying an enquiry and booking a call" className="relative">
            <div data-theme="dark" className="tone tone-grad rounded-[26px] p-3 sm:p-4 border border-[rgba(17,25,30,.2)] shadow-[0_50px_90px_-45px_rgba(17,25,30,.6)]">
              <div className="flex items-center justify-between gap-3 px-2 pt-1 pb-3">
                <span className="flex items-center gap-2"><span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[rgba(184,201,210,.25)]" /><i className="size-2.5 rounded-full bg-[rgba(184,201,210,.25)]" /><i className="size-2.5 rounded-full bg-[rgba(184,201,210,.25)]" /></span><span className="num ml-2">website assistant</span></span>
                <span className="chip chip-slate">Interface demo</span>
              </div>
              <div className="grid sm:grid-cols-[1.2fr_1fr] lg:grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-3">
                {/* chat */}
                <div className="rounded-[18px] bg-bg-2 border border-line p-4 flex flex-col gap-3 min-h-[300px]">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-line">
                    <span className="size-8 rounded-[10px] bg-steel-soft text-accent inline-flex items-center justify-center" aria-hidden><Sparkles size={15} /></span>
                    <span className="leading-tight"><span className="block text-[0.82rem] font-[600]">Keelbiz Assistant</span><span className="block text-[0.7rem] text-text-2">Replies instantly</span></span>
                  </div>
                  <p className="self-end max-w-[85%] rounded-[14px] rounded-br-[4px] bg-[#f7f8f6] text-[#1b252c] px-3.5 py-2.5 text-[0.8rem] leading-snug hero-msg" style={{ animationDelay: "900ms" }}>Hi — we need a new website and someone to run our ads.</p>
                  <p className="max-w-[88%] rounded-[14px] rounded-bl-[4px] bg-surface-strong border border-line px-3.5 py-2.5 text-[0.8rem] leading-snug hero-msg" style={{ animationDelay: "1500ms" }}>Happy to help. Is that Meta, Google, or both? I can book a short call to scope it.</p>
                  <p className="self-end max-w-[85%] rounded-[14px] rounded-br-[4px] bg-[#f7f8f6] text-[#1b252c] px-3.5 py-2.5 text-[0.8rem] leading-snug hero-msg" style={{ animationDelay: "2100ms" }}>Both. Thursday works.</p>
                  <div className="mt-auto flex items-center gap-2 rounded-full border border-line px-3 py-2 text-[0.75rem] text-text-2"><MessageSquare size={13} aria-hidden />Type a message…</div>
                </div>
                {/* lead card */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-[18px] bg-bg-2 border border-line p-4 hero-msg" style={{ animationDelay: "2600ms" }}>
                    <div className="flex items-center justify-between"><span className="num">New lead</span><span className="chip chip-navy">Qualified</span></div>
                    <dl className="mt-3 grid gap-2 text-[0.78rem]">
                      <div className="flex justify-between gap-3"><dt className="text-text-2">Interest</dt><dd>Website + Ads</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-text-2">Platforms</dt><dd>Meta, Google</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-text-2">Next step</dt><dd>Scoping call</dd></div>
                    </dl>
                  </div>
                  <div className="rounded-[18px] bg-bg-2 border border-line p-4 hero-msg" style={{ animationDelay: "3000ms" }}>
                    <span className="num">Pipeline</span>
                    <ol className="mt-3 grid gap-2 text-[0.78rem]">
                      {[["Enquiry received", true], ["Qualified by AI", true], ["Call booked", true], ["Proposal", false]].map(([t, done]) => (
                        <li key={t as string} className="flex items-center gap-2.5">
                          <span className={done ? "size-4 rounded-full bg-[var(--steel-blue)] text-[#11191e] inline-flex items-center justify-center" : "size-4 rounded-full border border-line-strong"} aria-hidden>{done ? <Check size={10} strokeWidth={3} /> : null}</span>
                          <span className={done ? "" : "text-text-2"}>{t as string}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating glass chips */}
            <div data-theme="light" className="hidden md:flex glass absolute -left-8 xl:-left-14 -bottom-7 rounded-[16px] px-4 py-3 items-center gap-3 drift" style={at(-12)}>
              <span className="size-9 rounded-[10px] bg-steel-soft text-accent inline-flex items-center justify-center" aria-hidden><Bot size={18} /></span>
              <span className="text-[0.8rem] leading-tight"><span className="block font-[600]">Lead qualified</span><span className="text-text-2">AI agent · instantly</span></span>
            </div>
            <div data-theme="light" className="hidden md:flex glass absolute -right-3 -top-5 rounded-[16px] px-4 py-3 items-center gap-3 drift" style={at(10)}>
              <span className="size-9 rounded-[10px] bg-steel-soft text-accent inline-flex items-center justify-center" aria-hidden><CalendarCheck size={18} /></span>
              <span className="text-[0.8rem] leading-tight"><span className="block font-[600]">Call booked</span><span className="text-text-2">Added to calendar</span></span>
            </div>
            <figcaption className="sr-only">Illustrative interface. Not real customer data.</figcaption>
          </figure>
        </div>
      </div>

      {/* Capability marquee */}
      <div className="mt-24 md:mt-28 border-y border-line py-5 overflow-hidden bg-[rgba(233,237,240,.45)]" aria-label="What we do">
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
