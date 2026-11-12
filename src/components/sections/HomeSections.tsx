import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { flywheel, homeFaq, steps, services, whyUs } from "@/content/site";
import { Button } from "@/components/glass/Button";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { WorkflowCanvas } from "@/components/glass/WorkflowCanvas";
import { Tabs } from "@/components/glass/Tabs";
import { StatCard, sampleStats } from "@/components/glass/StatCard";
import { GoalGauge } from "@/components/glass/GaugeChart";
import { ServiceTile } from "./ServiceTile";
import { Faq } from "./Faq";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

/** Flywheel diagram — Attract/Convert sage, Automate/Manage navy, hub champagne. */
export function Flywheel({ className }: { className?: string }) {
  const pos = [[150, 28], [272, 150], [150, 272], [28, 150]];
  return (
    <svg viewBox="0 0 300 300" className={cn("w-full max-w-sm", className)} role="img" aria-label="Flywheel: Attract (Social + Ads) → Convert (Website) → Automate (AI Agents) → Manage (Dashboards) → back to Attract">
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--mist)" /></marker></defs>
      <circle cx="150" cy="150" r="122" fill="none" stroke="var(--mist)" strokeWidth="2" strokeDasharray="6 8" />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d="M 150 28 A 122 122 0 0 1 272 150" fill="none" stroke="var(--mist)" strokeWidth="2" transform={`rotate(${a} 150 150)`} markerEnd="url(#arr)" />
      ))}
      <circle cx="150" cy="150" r="34" fill="var(--champagne)" />
      <text x="150" y="146" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--midnight)" fontFamily="var(--font-sans)">ONE</text>
      <text x="150" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--midnight)" fontFamily="var(--font-sans)">LOOP</text>
      {flywheel.map((f, i) => (
        <g key={f.step} transform={`translate(${pos[i][0]} ${pos[i][1]})`}>
          <rect x="-46" y="-22" width="92" height="44" rx="22" fill={f.tone === "sage" ? "var(--sage-tint)" : "var(--navy-tint)"} stroke={f.tone === "sage" ? "var(--sage)" : "var(--navy)"} />
          <text y="-3" textAnchor="middle" fontSize="12" fontWeight="700" fill={f.tone === "sage" ? "var(--sage)" : "var(--navy)"} fontFamily="var(--font-sans)">{f.step}</text>
          <text y="12" textAnchor="middle" fontSize="9" fill="var(--slate)" fontFamily="var(--font-sans)">{f.detail}</text>
        </g>
      ))}
    </svg>
  );
}

export function Intro() {
  return (
    <section className="bg-pearl section">
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
        <Reveal>
          <p className="chip chip-sage">One connected growth loop</p>
          <h2 className="mt-4">Not five services. <span className="accent-navy">One system.</span></h2>
          <p className="lead mt-5">Social and ads bring people in. The website turns them into enquiries. AI agents handle the follow-up. Dashboards show you what&apos;s working — and feed the next campaign. Each part works alone; together they compound.</p>
        </Reveal>
        <Reveal className="flex justify-center"><Flywheel /></Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="bg-ivory section" id="services">
      <div className="container">
        <Reveal className="max-w-2xl">
          <h2>Services built to <span className="accent-navy">connect.</span></h2>
          <p className="lead mt-4">Each tile previews the kind of interface we build. Every one links to its own page with demos, deliverables and FAQs.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-6">
          {services.map((s, i) => <ServiceTile key={s.id} s={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

export function SelectedWork() {
  return (
    <section className="bg-ivory section pt-0">
      <div className="container">
        <Reveal className="flex items-end justify-between gap-4 flex-wrap">
          <div><h2>Selected work</h2><p className="lead mt-3">Real projects will appear here once permissions are confirmed.</p></div>
          <Button href="/work/" variant="ghost">View all work</Button>
        </Reveal>
        <Reveal className="mt-8 glass rounded-lg p-8 md:p-12 bg-[url('/backdrops/abstract-1.svg')] bg-cover">
          <span className="chip chip-slate">Selected work coming soon</span>
          <p className="mt-4 max-w-xl text-slate">Case studies are published only with client permission and verified results. Until then, the <Link href="/lab/" className="text-navy font-semibold underline underline-offset-4">Lab</Link> shows the craft directly.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="bg-pearl section">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal><h2>How we <span className="accent-navy">work.</span></h2><p className="lead mt-4">Five steps, repeated for every project. Clear scope before creative, measurement before claims.</p></Reveal>
        </div>
        <ol className="flex flex-col">
          {steps.map((p, i) => (
            <Reveal key={p.n} index={i} as="li" className="grid grid-cols-[64px_1fr] gap-4 py-6 border-t border-mist">
              <span className="font-display font-bold text-3xl text-champagne leading-none">{p.n}</span>
              <div><h3 className="!text-xl">{p.name}</h3><p className="text-slate mt-1">{p.text}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="bg-ivory section">
      <div className="container">
        <Reveal className="max-w-2xl"><h2>Why Keelbiz</h2><p className="lead mt-4">Only claims we can stand behind.</p></Reveal>
        <ul className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => (
            <Reveal key={w.t} index={i} as="li" className="border-t border-champagne pt-4"><h3 className="!text-lg">{w.t}</h3><p className="text-slate mt-1 text-sm">{w.d}</p></Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AutomationShowcase() {
  return (
    <section className="bg-ivory section pt-0">
      <div className="container">
        <Reveal className="max-w-2xl"><h2>Automation you can <span className="accent-navy">see.</span></h2><p className="lead mt-4">Hover or focus each step. This is a typical enquiry-to-CRM flow — yours is designed around your steps.</p></Reveal>
        <Reveal className="mt-8"><WorkflowCanvas /></Reveal>
      </div>
    </section>
  );
}

export function FromTheLab() {
  return (
    <section className="bg-pearl section">
      <div className="container">
        <Reveal className="flex items-end justify-between gap-4 flex-wrap">
          <div><h2>From the <span className="accent-navy">Lab.</span></h2><p className="lead mt-3">Live components from the site&apos;s own interface — with the real source.</p></div>
          <Button href="/lab/" variant="ghost">Open the Lab</Button>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { href: "/lab/tabs/", title: "Navigation Tabs", node: <Tabs ariaLabel="Demo tabs" variant="segmented" items={[{ id: "a", label: "Overview" }, { id: "b", label: "Leads" }, { id: "c", label: "Reports" }]} /> },
            { href: "/lab/stat-card/", title: "Stat Card", node: <StatCard {...sampleStats[0]} /> },
            { href: "/lab/gauge/", title: "Goal Gauge", node: <GoalGauge /> },
          ].map((c, i) => (
            <Reveal key={c.href} index={i} className="flex flex-col gap-3">
              <div className="min-h-[200px] flex items-center justify-center rounded-lg bg-[url('/backdrops/interior-1.svg')] bg-cover p-6">{c.node}</div>
              <Link href={c.href} className="inline-flex items-center gap-2 font-semibold text-navy text-sm">{c.title} · View code <ArrowRight size={14} aria-hidden /></Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="bg-pearl section pt-0">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal><h2>Questions</h2><p className="lead mt-3">Short answers. No invented prices, timelines or guarantees.</p></Reveal>
        <Reveal><Faq items={homeFaq} /></Reveal>
      </div>
    </section>
  );
}

export { ServiceGlyph };
