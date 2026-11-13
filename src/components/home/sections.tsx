"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bell, CalendarCheck, Database, MessageSquare, Quote, Sparkles } from "lucide-react";
import { aiOffer, combinations, homeFaq, services, shortName, steps, whyUs } from "@/content/site";
import { enquiryTypes, serviceIcon } from "@/content/enquiry";
import { caseStudies } from "@/content/work";
import { Accordion, Button, Chip, Marquee, Placeholder, StatCounter } from "@/components/ui";
import { MiniPreview } from "@/components/demos/MiniPreview";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Tone } from "@/components/sections/Tone";
import { useInViewOnce } from "@/components/motion/useInView";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { cn } from "@/lib/cn";

/* ---------- 02 · proof strip ---------- */
export function ProofStrip() {
  return (
    <Tone className="section-strip border-y border-line">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[.14em] text-text-2">Trusted by</p>
            <Marquee label="Client logos" duration={34} className="mt-5 gap-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="ph !rounded-[10px] w-[136px] h-12 shrink-0"><span className="ph-label !text-[9px]">Logo {i + 1}</span></div>
              ))}
            </Marquee>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-10 lg:border-l lg:border-line lg:pl-16">
            <StatCounter label="Projects delivered" />
            <StatCounter label="Avg. reply time" />
            <StatCounter label="Clients retained" />
          </div>
        </div>
      </div>
    </Tone>
  );
}

/* ---------- 03 · services bento (merges "one service or a complete solution") ---------- */
export function HomeServices() {
  const [combo, setCombo] = useState(combinations.length - 1);
  const picked = combinations[combo];

  return (
    <Tone className="section-major">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Services</p>
            <SplitHeading as="h2" text="Five services. Hire one, or combine" accent="them." className="mt-5" />
          </div>
          <p className="lg:col-span-5 text-text-2 leading-relaxed">
            Each one stands on its own — you never have to buy a bundle. Most clients start with one and add others only when they help.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-12 gap-4 md:gap-5 auto-rows-[244px]">
          {services.map((s, i) => {
            const Icon = serviceIcon[s.id];
            const dark = s.id === "social" || s.id === "dashboards";
            const span = ["md:col-span-7 md:row-span-2", "md:col-span-5", "md:col-span-5", "md:col-span-6", "md:col-span-6"][i];
            return (
              <Reveal key={s.id} index={i} className={cn("min-w-0", span)}>
                <Link href={`/services/${s.slug}/`} data-theme={dark ? "dark" : undefined} data-spot
                  className={cn("card demo-card group h-full flex flex-col overflow-hidden p-5 md:p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--elev-2)]", dark && "grain")}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="size-9 rounded-[11px] border border-line grid place-items-center shrink-0"><Icon size={16} strokeWidth={1.75} aria-hidden /></span>
                    <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-[550] opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]">Explore <ArrowUpRight size={13} aria-hidden /></span>
                  </div>
                  <div className="relative flex-1 min-h-0 my-4"><MiniPreview id={s.id} className="absolute inset-0" /></div>
                  <h3 className="!text-[clamp(17px,1.4vw,21px)]">{s.name}</h3>
                  <p className="mt-1.5 text-[0.88rem] text-text-2 leading-snug line-clamp-2">{s.short}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* combinations — the old "one service or a complete solution" section, folded in */}
        <div className="mt-8 card p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="!text-[1.2rem]">Or combine them</h3>
            <Link href="/services/#build" className="b b-ghost !min-h-9 text-[0.9rem]">Build your stack</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {combinations.map((c, i) => <Chip key={c.title} pressed={combo === i} onToggle={() => setCombo(i)}>{c.title}</Chip>)}
          </div>
          <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-5">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2" aria-live="polite">
                {picked.ids.map((id, i) => (
                  <span key={id} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-text-2" aria-hidden>+</span>}
                    <span className="tag !min-h-8">{shortName[id]}</span>
                  </span>
                ))}
              </p>
              <p className="mt-3 text-[0.95rem] text-text-2">{picked.note}</p>
            </div>
            <Button href={`/contact/?type=${picked.ids.length > 1 ? "multiple" : "single"}&services=${picked.ids.join(",")}`} variant="secondary" arrow="right">Get a quote for this</Button>
          </div>
        </div>
      </div>
    </Tone>
  );
}

/* ---------- 05 · selected work — pinned horizontal scroll ---------- */
const workSlots = [
  { k: "Website + Ads", d: "A service business that needed enquiries, not impressions." },
  { k: "Social + Content", d: "A brand posting consistently for the first time." },
  { k: "AI agent", d: "Every out-of-hours message answered and qualified." },
  { k: "Dashboard", d: "Five tools and a spreadsheet, replaced by one screen." },
];

export function SelectedWork() {
  // Scroll progress lands in --p on the track; the transform is CSS (no motion library on the home critical path).
  const ref = useScrollProgress<HTMLDivElement>("--p");
  const live = caseStudies.length > 0;

  return (
    <Tone tone="dark" grad className="grain">
      <div className="container pt-[var(--pad-major)]">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Selected work</p>
            <SplitHeading as="h2" text="Case studies, published with" accent="permission." className="mt-5" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-text-2 leading-relaxed">
              {live ? "Real projects, with the numbers the client agreed to share." : "We don't publish a client's work, logo or figures until they've approved it in writing. These slots fill as approvals come in."}
            </p>
            <Button href="/work/" variant="secondary" arrow="right" className="mt-7">See what we build</Button>
          </div>
        </div>
      </div>

      {/* desktop: pinned horizontal scroll */}
      <div ref={ref} className="hidden lg:block relative h-[165vh] mt-12">
        <div className="sticky top-[13vh] h-[70vh] overflow-hidden flex items-center">
          <ul className="work-track flex gap-6 px-[var(--gutter)]">
            {workSlots.map((w, i) => (
              <li key={w.k} className="w-[clamp(380px,32vw,520px)] shrink-0">
                <article data-spot className="card p-6 h-[56vh] flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="num">0{i + 1}</span>
                    <span className="tag !min-h-8">{w.k}</span>
                  </div>
                  <Placeholder label="Case-study screenshot · 16:10" className="mt-5" />
                  <h3 className="mt-6 !text-[1.3rem]"><span className="ph-label">[PLACEHOLDER] Project name</span></h3>
                  <p className="mt-3 text-text-2 text-[0.95rem] leading-snug">{w.d}</p>
                  <p className="mt-auto pt-5 text-[0.82rem] text-text-2 border-t border-line">Results published only once the client approves them.</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* mobile: stacked */}
      <div className="lg:hidden container mt-12 grid gap-4">
        {workSlots.slice(0, 2).map((w, i) => (
          <article key={w.k} className="card p-5">
            <div className="flex items-center justify-between gap-4"><span className="num">0{i + 1}</span><span className="tag !min-h-8">{w.k}</span></div>
            <Placeholder label="Screenshot · 16:10" className="mt-4" />
            <p className="mt-4 text-text-2 text-[0.92rem]">{w.d}</p>
          </article>
        ))}
      </div>

      <div className="h-[var(--pad-major)] lg:h-[var(--pad-strip)]" aria-hidden />
    </Tone>
  );
}

/* ---------- 06 · process — scroll-drawn timeline ---------- */
export function ProcessTimeline() {
  const ref = useScrollProgress<HTMLOListElement>("--p", { start: 0.75, end: 0.4 });

  return (
    <Tone className="section-major">
      <div className="container grid lg:grid-cols-12 gap-x-10 gap-y-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">How we work</p>
          <SplitHeading as="h2" text="Five steps. No" accent="surprises." className="mt-5" />
          <p className="mt-6 text-text-2 leading-relaxed">You see work at every stage, and nothing starts without a scope and a quote you&rsquo;ve agreed to.</p>
          <Button href="/contact/" className="mt-8" arrow="right">Start at step one</Button>
        </div>

        <ol ref={ref} className="lg:col-span-8 relative pl-10 sm:pl-14">
          <span className="absolute left-[15px] sm:left-[23px] top-3 bottom-3 w-px bg-line" aria-hidden />
          <span className="draw-line absolute left-[15px] sm:left-[23px] top-3 bottom-3 w-px bg-[var(--graphite)] origin-top" aria-hidden />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} index={i} className="relative pb-10 last:pb-0">
              <span className="absolute -left-10 sm:-left-14 top-0 size-8 sm:size-12 rounded-full border border-line-strong bg-bg grid place-items-center font-mono text-[10px] sm:text-[11px]">{s.n}</span>
              <h3 className="!text-[1.3rem]">{s.name}</h3>
              <p className="mt-2 text-text-2 leading-relaxed max-w-[56ch]">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Tone>
  );
}

/* ---------- 08 · why us bento ---------- */
export function WhyBento() {
  return (
    <Tone className="!bg-bg-2 section-major">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">Why Keelbiz</p>
          <SplitHeading as="h2" text="Flexible by design, honest by" accent="default." className="mt-5" />
        </div>
        <div className="mt-14 grid md:grid-cols-6 gap-4 md:gap-5">
          {whyUs.map((w, i) => (
            <Reveal key={w.t} index={i} className={cn("min-w-0", i === 0 ? "md:col-span-3" : i === 1 ? "md:col-span-3" : "md:col-span-2")}>
              <div data-spot data-theme={i === 0 ? "dark" : undefined} className={cn("card h-full p-6 md:p-7 flex flex-col", i === 0 && "grain")}>
                <span className="num">0{i + 1}</span>
                <h3 className="mt-4 !text-[1.25rem]">{w.t}</h3>
                <p className="mt-2.5 text-text-2 text-[0.95rem] leading-snug">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Tone>
  );
}

/* ---------- 09 · testimonials ---------- */
export function Testimonials() {
  return (
    <Tone className="section-major">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40rem]">
            <p className="eyebrow">In their words</p>
            <h2 className="mt-5">What clients <span className="accent">say.</span></h2>
          </div>
          <p className="text-text-2 text-[0.92rem] max-w-[34ch]">We publish a quote only once the client has approved the exact wording.</p>
        </div>
        <ul className="mt-12 grid md:grid-cols-3 gap-4 md:gap-5">
          {[0, 1, 2].map((i) => (
            <Reveal as="li" key={i} index={i}>
              <figure className="card h-full p-6 flex flex-col">
                <Quote size={20} className="text-text-2" aria-hidden />
                <blockquote className="mt-5 flex-1">
                  <p className="ph !rounded-[10px] !min-h-[96px] !p-4"><span className="ph-label">[PLACEHOLDER] Approved quote</span></p>
                </blockquote>
                <figcaption className="mt-5 pt-5 border-t border-line flex items-center gap-3">
                  <Placeholder label="" round className="!w-10 !h-10 shrink-0" ratio="1/1" />
                  <span className="text-[0.85rem] text-text-2"><span className="ph-label !text-[10px]">[PLACEHOLDER] Name, role</span></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </Tone>
  );
}

/* ---------- 10 · FAQ ---------- */
export function HomeFaqSection() {
  return (
    <Tone className="!bg-bg-2 section-major">
      <div className="container grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <SplitHeading as="h2" text="The things people actually" accent="ask." className="mt-5" />
        </div>
        <div className="lg:col-span-8"><Accordion items={homeFaq} /></div>
      </div>
    </Tone>
  );
}

/* ---------- 11 · closing CTA with step one of the wizard ---------- */
export function HomeCta() {
  const [pick, setPick] = useState<string>("");
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const href = pick ? `/contact/?type=${pick}` : "/contact/";

  return (
    <Tone tone="dark" grad className="grain section-major">
      <div ref={ref} className="container">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 items-center">
          <div className="lg:col-span-5">
            <SplitHeading as="h2" text="Tell us what you're" accent="building." className="!text-[clamp(34px,4.4vw,64px)]" />
            <p className="lead mt-6">Five quick steps, or one line in the box. Either way a person reads it and replies with questions and a custom quote.</p>
            <ul className="mt-8 grid gap-2 text-[0.9rem] text-text-2">
              {["No budget needed to enquire", "Custom quote, no public price list", "Reply within two working days"].map((t) => (
                <li key={t} className="flex gap-2.5"><ArrowRight size={15} className="mt-0.5 shrink-0" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>

          <div className={cn("lg:col-span-7 card !bg-[var(--surface-strong)] p-6 md:p-8 transition-opacity duration-700", inView ? "opacity-100" : "opacity-0")}>
            <p className="font-mono text-[11px] uppercase tracking-[.14em] text-text-2">Step 1 of 6</p>
            <h3 className="mt-3 !text-[clamp(20px,2vw,28px)]">What are you looking for?</h3>
            <div role="radiogroup" aria-label="What are you looking for?" className="mt-6 grid sm:grid-cols-2 gap-2.5">
              {enquiryTypes.slice(0, 4).map((t) => (
                <button key={t.id} type="button" role="radio" aria-checked={pick === t.id} onClick={() => setPick(t.id)}
                  className={cn("flex items-center gap-3 rounded-[14px] border p-3.5 text-left min-h-14 transition-all duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]",
                    pick === t.id ? "border-[var(--steel-blue)] bg-[var(--surface-strong)] -translate-y-0.5" : "border-line hover:border-text-2")}>
                  <span className={cn("size-9 rounded-[11px] grid place-items-center shrink-0 transition-colors", pick === t.id ? "bg-[var(--steel-blue)] text-[var(--deep-charcoal)]" : "border border-line text-text-2")}>
                    <t.icon size={16} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.92rem] font-[550] truncate">{t.label}</span>
                    <span className="block text-[0.78rem] text-text-2 truncate">{t.desc}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Link href="/contact/?type=unsure" className="b b-ghost !min-h-10 text-[0.9rem]">Not sure yet?</Link>
              <Button href={href} size="lg" arrow="right">{pick ? "Continue" : "Start the enquiry"}</Button>
            </div>
          </div>
        </div>
      </div>
    </Tone>
  );
}

/* ---------- 07 · AI section — the workflow, plus the three ways to buy ---------- */
export function AiHome() {
  return (
    <Tone tone="dark" grad className="grain section-major overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">AI agents &amp; automation</p>
            <SplitHeading as="h2" text="The part that keeps working after you" accent="log off." className="mt-5" />
          </div>
          <p className="lg:col-span-5 text-text-2 leading-relaxed">
            Ready-made where a built solution fits, custom where it doesn&rsquo;t. Enquiry or quote only — no checkout, no invented product list.
          </p>
        </div>

        <AiFlow />

        <div className="mt-8 grid md:grid-cols-3 gap-4 md:gap-5">
          {aiOffer.paths.map((p, i) => (
            <Reveal key={p.id} index={i}>
              <article data-spot className={cn("card h-full p-6 md:p-7 flex flex-col", i === 1 && "!bg-[var(--surface-strong)]")}>
                <span className="num">0{i + 1}</span>
                <h3 className="mt-4 !text-[1.25rem]">{p.title}</h3>
                <p className="mt-2.5 text-text-2 text-[0.95rem] leading-snug">{p.lead}</p>
                <Link href={p.cta.href} className="b b-ghost !justify-start mt-auto !pt-7 text-[0.9rem]">{p.cta.label}<ArrowUpRight size={15} className="b-arrow" aria-hidden /></Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 card p-6 md:p-7 flex flex-wrap items-center justify-between gap-5">
          <p className="text-text-2 max-w-[62ch] text-[0.95rem]">Customer support, lead qualification, sales follow-up, appointment booking, website and messaging assistants, workflow automation — and anything else that&rsquo;s technically feasible.</p>
          <Button href="/ai-solutions/">Explore AI solutions</Button>
        </Reveal>
      </div>
    </Tone>
  );
}

const flowNodes = [
  { icon: MessageSquare, name: "Enquiry" },
  { icon: Sparkles, name: "AI qualifies" },
  { icon: Database, name: "CRM" },
  { icon: CalendarCheck, name: "Booked" },
  { icon: Bell, name: "You're told" },
];

function AiFlow() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ margin: "0px 0px -10% 0px" });
  return (
    <div ref={ref} className="mt-14 card p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[.14em] text-text-2">A typical flow</p>
      <ol className="mt-7 grid sm:grid-cols-5 gap-4 relative">
        <span className="hidden sm:block absolute left-[10%] right-[10%] top-6 h-px bg-line" aria-hidden />
        <span className={cn("hidden sm:block absolute left-[10%] top-6 h-px bg-[var(--steel-blue)] origin-left transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)]")}
          style={{ right: "10%", transform: `scaleX(${inView ? 1 : 0})` }} aria-hidden />
        {flowNodes.map((n, i) => (
          <li key={n.name} className="relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
            <span className={cn("relative z-10 size-12 rounded-[14px] grid place-items-center shrink-0 border transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
              inView ? "bg-[var(--steel-blue)] text-[var(--deep-charcoal)] border-[var(--steel-blue)]" : "bg-bg border-line text-text-2")}
              style={{ transitionDelay: `${i * 180}ms` }}>
              <n.icon size={17} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="sm:mt-4 text-[0.92rem] font-[550]">{n.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
