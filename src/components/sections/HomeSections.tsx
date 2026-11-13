import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { flywheel, homeFaq, steps, whyUs } from "@/content/site";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { LazyWorkflow } from "./Lazy";
import { Showcase } from "./Showcase";
import { ServicesBento } from "./Bento";
import { Faq } from "./Faq";
import { Reveal } from "./Reveal";
import { ProcessSteps } from "./ProcessSteps";
import { Tone } from "./Tone";
import { cn } from "@/lib/cn";

/** The loop diagram — four stations on a slow orbit with one travelling light. */
export function Flywheel({ className }: { className?: string }) {
  const pos = [[200, 40], [360, 200], [200, 360], [40, 200]];
  return (
    <svg viewBox="-24 -8 448 416" className={cn("w-full max-w-[440px]", className)} role="img"
      aria-label="The Keelbiz loop: Attract (Social and Ads), Convert (Website), Automate (AI agents), Manage (Dashboards), then back to Attract">
      <circle cx="200" cy="200" r="160" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      <g className="orbit">
        <circle cx="200" cy="200" r="160" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 10" opacity=".7" />
        <circle cx="200" cy="40" r="4" fill="var(--accent)" />
      </g>
      <circle cx="200" cy="200" r="96" fill="none" stroke="var(--line)" strokeWidth="1" />
      <text x="200" y="192" textAnchor="middle" fontSize="13" fill="var(--text-2)" fontFamily="var(--font-mono)" letterSpacing="2">ONE</text>
      <text x="200" y="216" textAnchor="middle" fontSize="26" fill="var(--text)" fontFamily="var(--font-serif)" fontStyle="italic">system</text>
      {flywheel.map((f, i) => (
        <g key={f.step} transform={`translate(${pos[i][0]} ${pos[i][1]})`}>
          <rect x="-58" y="-24" width="116" height="48" rx="24" fill="var(--bg-2)" stroke="var(--line-strong)" />
          <text y="-2" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text)" fontFamily="var(--font-sans)">{f.step}</text>
          <text y="14" textAnchor="middle" fontSize="10" fill="var(--text-2)" fontFamily="var(--font-mono)">{f.detail}</text>
        </g>
      ))}
    </svg>
  );
}

const loopCopy: Record<string, string> = {
  Attract: "Social content and Meta or Google ads bring the right people to you.",
  Convert: "A fast, credible website turns attention into enquiries.",
  Automate: "AI agents qualify, reply and follow up — around the clock.",
  Manage: "Dashboards show what's working, and feed the next campaign.",
};

export function Intro() {
  return (
    <Tone tone="dark" grad className="section overflow-hidden" aria-labelledby="loop-h">
      <div className="container grid gap-16 lg:grid-cols-12 items-center">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">How Keelbiz works</p>
          <h2 id="loop-h" className="mt-5">Not five services. <br className="hidden sm:block" />One <span className="accent">system.</span></h2>
          <p className="lead mt-6">Most businesses buy marketing, websites and automation from people who never talk to each other. We run them as one loop — each part feeding the next. Every service also works on its own.</p>
        </Reveal>
        <Reveal className="lg:col-span-6 flex justify-center lg:justify-end" index={1}><Flywheel /></Reveal>
      </div>
      <div className="container mt-20">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line">
          {flywheel.map((f, i) => (
            <Reveal as="li" key={f.step} index={i} className={cn("pt-8 pb-2 sm:pr-8", i > 0 && "lg:pl-8 lg:border-l border-line")}>
              <span className="num">0{i + 1} — {f.detail}</span>
              <h3 className="mt-4 !text-2xl">{f.step}</h3>
              <p className="text-text-2 mt-2 text-[0.95rem]">{loopCopy[f.step]}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Tone>
  );
}

export function Services() {
  return (
    <Tone tone="mist" className="section" id="services" aria-labelledby="svc-h">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7"><p className="eyebrow">Services</p><h2 id="svc-h" className="mt-5 max-w-[16ch]">Five services. Hire <span className="accent">one,</span> or combine them.</h2></Reveal>
          <Reveal className="lg:col-span-5" index={1}><p className="lead">Each service stands on its own. Combine them only when it helps — every project is scoped and quoted around your business.</p></Reveal>
        </div>
        <div className="mt-14"><ServicesBento /></div>
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-7">
          <p className="text-text-2 text-[0.92rem]">Previews are illustrative interface demonstrations, not client work.</p>
          <Link href="/contact/" className="btn btn-ghost">Not sure which you need? Ask us <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
        </Reveal>
      </div>
    </Tone>
  );
}

export function AutomationShowcase() {
  const points = ["Replies to new enquiries in seconds — web, WhatsApp or email", "Qualifies leads against your own criteria", "Writes everything to your CRM or sheet", "Hands hot leads to a person, with full context"];
  return (
    <Tone tone="dark" grad className="section overflow-hidden" aria-labelledby="auto-h">
      <div className="container grid gap-14 lg:grid-cols-12 items-center">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">AI agents &amp; automation</p>
          <h2 id="auto-h" className="mt-5">Automation you can <span className="accent">see.</span></h2>
          <p className="lead mt-6">A typical enquiry-to-CRM flow. Hover or focus each step — yours is designed around your process.</p>
          <ul className="mt-8 grid gap-3">
            {points.map((p) => <li key={p} className="flex gap-3 text-[0.98rem]"><Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />{p}</li>)}
          </ul>
          <Link href="/services/ai-agents-automation/" className="btn btn-glass mt-10">Explore automation <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
        </Reveal>
        <Reveal className="lg:col-span-7 bloom" index={1}><LazyWorkflow /></Reveal>
      </div>
    </Tone>
  );
}

export function Process() {
  return (
    <Tone tone="warm" className="section" aria-labelledby="proc-h">
      <div className="container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <Reveal>
            <p className="eyebrow">Process</p>
            <h2 id="proc-h" className="mt-5">Clear steps. <span className="accent">No</span> surprises.</h2>
            <p className="lead mt-6">The same five steps for every project. Scope before creative, measurement before claims.</p>
          </Reveal>
        </div>
        <div className="lg:col-span-7"><ProcessSteps items={steps} /></div>
      </div>
    </Tone>
  );
}

export function SeeItInAction() {
  return (
    <Tone tone="dark" grad grid className="section overflow-hidden" aria-labelledby="see-h">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7"><p className="eyebrow">See it in action</p><h2 id="see-h" className="mt-5">What we build, <span className="accent">working.</span></h2></Reveal>
          <Reveal className="lg:col-span-5" index={1}><p className="lead">Pick a service to try a live illustration of the kind of work we deliver. Sample data, real interactions.</p></Reveal>
        </div>
        <Reveal className="mt-14 bloom" index={2}><Showcase /></Reveal>
      </div>
    </Tone>
  );
}

export function WhyUs() {
  return (
    <Tone tone="light" className="section" aria-labelledby="why-h">
      <div className="container grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Why Keelbiz</p>
          <h2 id="why-h" className="mt-5">Only claims we can <span className="accent">stand</span> behind.</h2>
        </Reveal>
        <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
          {whyUs.map((w, i) => (
            <Reveal as="li" key={w.t} index={i} className="card card-hover p-6 md:p-7">
              <span className="num">0{i + 1}</span>
              <h3 className="mt-5 !text-xl">{w.t}</h3>
              <p className="text-text-2 mt-2 text-[0.95rem]">{w.d}</p>
            </Reveal>
          ))}
          <Reveal as="li" index={whyUs.length} className="card p-6 md:p-7 flex flex-col justify-between !bg-[linear-gradient(160deg,#dfe7ea,#d5e0e4)]">
            <p className="text-text-2 text-[0.95rem]">Selected case studies are published only with client permission and verified results.</p>
            <Link href="/work/" className="btn btn-ghost !justify-start mt-4">See our work <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
          </Reveal>
        </ul>
      </div>
    </Tone>
  );
}

export function SelectedWork() { return null; } // merged into WhyUs (no approved case studies yet)

export function HomeFaq() {
  return (
    <Tone tone="light" alt className="section" aria-labelledby="faq-h">
      <div className="container grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-h" className="mt-5">Straight <span className="accent">answers.</span></h2>
          <p className="lead mt-6">How we work, how pricing works and how to start.</p>
        </Reveal>
        <Reveal className="lg:col-span-8" index={1}><Faq items={homeFaq} /></Reveal>
      </div>
    </Tone>
  );
}

export { ServiceGlyph };
