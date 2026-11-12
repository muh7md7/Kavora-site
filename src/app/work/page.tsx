import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { Tone } from "@/components/sections/Tone";
import { caseStudies } from "@/content/work";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Work",
  description: "Keelbiz case studies — published only with client permission and verified results — plus clearly labelled interface demonstrations with sample data.",
  alternates: { canonical: "/work/" },
};

// Clearly labelled demonstrations of the kind of interfaces we build (not client work).
const demos = [
  { title: "AI website assistant", kind: "AI Agents & Automation", href: "/ai-solutions/", visual: "chat" },
  { title: "Business dashboard", kind: "Business Dashboards & Systems", href: "/services/business-dashboards-systems/#example", visual: "dash" },
  { title: "Enquiry-to-CRM workflow", kind: "AI Agents & Automation", href: "/services/ai-agents-automation/#example", visual: "flow" },
  { title: "Responsive business website", kind: "Website Design & Development", href: "/services/website-design-development/#example", visual: "site" },
];

function DemoVisual({ v }: { v: string }) {
  if (v === "chat") return (
    <div className="w-[78%] grid gap-2">
      <span className="self-end ml-auto w-2/3 h-7 rounded-[10px] bg-[#f7f8f6]/90" /><span className="w-3/4 h-9 rounded-[10px] bg-[rgba(184,201,210,.18)] border border-[rgba(184,201,210,.2)]" /><span className="ml-auto w-1/2 h-7 rounded-[10px] bg-[#f7f8f6]/90" />
    </div>);
  if (v === "dash") return (
    <div className="w-[80%] grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-14 rounded-[10px] bg-[rgba(184,201,210,.12)] border border-[rgba(184,201,210,.18)]" />)}
      <span className="col-span-3 h-20 rounded-[10px] bg-[linear-gradient(180deg,rgba(184,201,210,.25),transparent)] border border-[rgba(184,201,210,.18)]" /></div>);
  if (v === "flow") return (
    <div className="w-[80%] flex items-center justify-between">{[0, 1, 2, 3].map((i) => <span key={i} className="size-12 rounded-[12px] bg-[rgba(184,201,210,.12)] border border-[rgba(184,201,210,.22)]" />)}</div>);
  return (
    <div className="w-[80%] flex items-end gap-3 justify-center">
      <span className="flex-1 h-28 rounded-[10px] border border-[rgba(184,201,210,.2)] bg-[rgba(184,201,210,.08)] p-2 grid content-start gap-1.5"><i className="h-1.5 w-1/3 rounded bg-[rgba(184,201,210,.5)]" /><i className="h-1 w-2/3 rounded bg-[rgba(184,201,210,.2)]" /><i className="mt-auto grid grid-cols-3 gap-1">{[0,1,2].map((i)=><b key={i} className="h-6 rounded bg-[rgba(184,201,210,.12)]" />)}</i></span>
      <span className="w-14 h-24 rounded-[10px] border border-[rgba(184,201,210,.2)] bg-[rgba(184,201,210,.08)] p-1.5 grid content-start gap-1"><i className="h-1 w-1/2 rounded bg-[rgba(184,201,210,.5)]" /><i className="h-1 w-full rounded bg-[rgba(184,201,210,.2)]" /><i className="mt-auto h-3 rounded-full bg-[rgba(184,201,210,.35)]" /></span>
    </div>);
}

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Selected" accent="work." lead="Client case studies are published only with permission and verified results. Meanwhile, explore live demonstrations of what we build." />

      <Tone tone="light" className="section !pt-0">
        <div className="container border-t border-line pt-16">
          {caseStudies.length === 0 ? (
            <Reveal className="rounded-[24px] border border-dashed border-line-strong p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
              <div><span className="chip chip-slate">Case studies</span><p className="mt-4 text-[1.2rem] tracking-[-0.02em] font-[550]">Client case studies are being prepared.</p><p className="text-text-2 mt-1">Published only with client permission and verified results.</p></div>
              <Link href="/contact/" className="btn btn-glass">Discuss your project <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
            </Reveal>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">{caseStudies.map((c) => (
              <article key={c.slug} className="rounded-[24px] border border-line bg-surface p-7"><span className="chip chip-navy">{c.industry}</span><h2 className="!text-2xl mt-4">{c.title}</h2><p className="text-text-2 mt-2">{c.summary}</p><p className="num mt-4">{c.services.join(" · ")}</p></article>
            ))}</div>
          )}
        </div>
      </Tone>

      <Tone tone="dark" grad className="section">
        <div className="container">
          <Reveal><p className="eyebrow">Interface demonstrations</p><h2 className="mt-5 max-w-2xl">What we build, <span className="accent">live.</span></h2><p className="lead mt-5">Interactive demos with sample data — clearly not client work.</p></Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {demos.map((d, i) => (
              <Reveal key={d.title} index={i % 2}>
                <Link href={d.href} data-cursor="View" className="group block rounded-[26px] border border-line bg-bg-2 overflow-hidden hover:border-line-strong transition-colors">
                  <div className={cn("relative h-[280px] flex items-center justify-center overflow-hidden tone-grad")}>
                    <div className="transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] w-full flex items-center justify-center"><DemoVisual v={d.visual} /></div>
                    <span className="chip chip-slate absolute top-5 left-5">Demo · Sample data</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-7 py-6 border-t border-line">
                    <span><span className="num">{d.kind}</span><span className="block mt-1.5 text-[1.25rem] font-[560] tracking-[-0.025em]">{d.title}</span></span>
                    <span className="size-11 shrink-0 rounded-full border border-line-strong inline-flex items-center justify-center transition-all duration-500 group-hover:bg-text group-hover:text-bg group-hover:rotate-45"><ArrowUpRight size={17} aria-hidden /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work/" }]} />
    </>
  );
}
