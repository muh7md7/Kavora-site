"use client";
import { useEffect, useState } from "react";
import { Bot, CalendarCheck, Check, Database, MessageSquare } from "lucide-react";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Home hero — the headline states what we do; the stage beside it shows one enquiry
 * travelling from message to booked call, looping. Pure CSS/state, no heavy library,
 * and the first frame is the finished state so there is nothing blank before hydration.
 */

const stages = [
  { icon: MessageSquare, label: "Enquiry arrives", detail: "“Need a new site and someone to run our ads.”" },
  { icon: Bot, label: "AI qualifies it", detail: "Asks the two questions that matter. Scores it." },
  { icon: Database, label: "Written to CRM", detail: "Nothing retyped. Nothing lost." },
  { icon: CalendarCheck, label: "Call booked", detail: "Thursday, 2pm. Team notified." },
];

export function HomeHero() {
  const [step, setStep] = useState(3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const i = setInterval(() => setStep((s) => (s + 1) % (stages.length + 1)), 1600);
    return () => clearInterval(i);
  }, []);

  return (
    <section data-theme="light" className="tone tone-grad relative overflow-hidden pt-[clamp(128px,14vw,196px)] pb-[clamp(72px,8vw,112px)]">
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="container grid lg:grid-cols-12 gap-x-10 gap-y-16 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow rv-auto">Websites · Social · Advertising · AI · Dashboards</p>
          <SplitHeading as="h1" auto underline
            text="Build your presence. Grow your business."
            accent="Automate" after="what comes next."
            className="mt-7 !text-[clamp(2.7rem,1.3rem+3.8vw,5.1rem)] !leading-[0.98] !tracking-[-0.05em]" />
          <p className="lead mt-8 rv-auto" style={{ ["--rv-delay" as string]: "420ms" }}>
            We design websites, manage social media, run Meta and Google advertising, and build AI automation and business systems. Choose one service or a tailored combination.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3 rv-auto" style={{ ["--rv-delay" as string]: "520ms" }}>
            <Button href="/contact/" size="lg">Start a project</Button>
            <Button href="/services/" variant="ghost">Explore services</Button>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-[0.85rem] text-text-2 rv-auto" style={{ ["--rv-delay" as string]: "600ms" }}>
            {["One service or a complete solution", "Custom quotes", "No forced bundles"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2"><Check size={14} className="text-accent-text" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>

        {/* stage */}
        <div className="lg:col-span-5 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>
          <figure aria-label="How an enquiry travels: message, AI qualification, CRM record, booked call" className="relative">
            <div data-theme="dark" className="tone grain rounded-[26px] border border-[rgba(17,25,30,.18)] p-4 sm:p-5 shadow-[0_50px_90px_-45px_rgba(17,25,30,.55)]">
              <div className="flex items-center justify-between gap-3 px-1 pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[.12em] text-text-2">One enquiry</span>
                <span className="tag tag-mono !min-h-6 !px-2.5 !text-[10px]">Sample</span>
              </div>

              <ol className="grid gap-2">
                {stages.map((s, i) => {
                  const done = step > i;
                  const active = step === i;
                  return (
                    <li key={s.label}
                      className={cn("flex gap-3 items-start rounded-[14px] border p-3.5 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                        done || active ? "border-line-strong bg-[var(--surface-strong)]" : "border-line bg-transparent opacity-45")}>
                      <span className={cn("size-9 rounded-[11px] grid place-items-center shrink-0 transition-colors duration-500",
                        done ? "bg-[var(--steel-blue)] text-[var(--deep-charcoal)]" : active ? "bg-[var(--offwhite)] text-[var(--graphite)]" : "border border-line text-text-2")}>
                        {done ? <Check size={16} strokeWidth={2.4} aria-hidden /> : <s.icon size={16} strokeWidth={1.75} aria-hidden />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.92rem] font-[550] leading-snug">{s.label}</span>
                        <span className="block text-[0.8rem] text-text-2 leading-snug mt-0.5">{s.detail}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <p className={cn("mt-4 pt-4 border-t border-line flex items-center gap-2 text-[0.85rem] transition-opacity duration-500", step >= stages.length ? "opacity-100" : "opacity-40")}>
                <span className="size-5 rounded-full bg-[var(--steel-blue)] text-[var(--deep-charcoal)] grid place-items-center shrink-0"><Check size={12} strokeWidth={3} aria-hidden /></span>
                <span className="font-[550]">Done before anyone opened a laptop.</span>
              </p>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
