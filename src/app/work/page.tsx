import type { Metadata } from "next";
import { pages } from "@/content/copy";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { HeadText, Tone } from "@/components/sections/Tone";
import { caseStudies } from "@/content/work";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";
import { ServiceStage } from "@/components/sections/Bento";
import type { ServiceId } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Keelbiz case studies — published only with client permission and verified results — plus clearly labelled interface demonstrations with sample data.",
  alternates: { canonical: "/work/" },
};

// Clearly labelled concept demonstrations of the kind of interfaces we build (not client work).
const demos: { id: ServiceId; title: string; kind: string; desc: string; href: string }[] = [
  { id: "websites", title: "Responsive business website", kind: "Website Design & Development", desc: "A business site that adapts from desktop to phone, with a clear enquiry path.", href: "/services/website-design-development/#example" },
  { id: "automation", title: "Enquiry-to-CRM workflow", kind: "AI Agents & Automation", desc: "An AI agent replies to a new enquiry, qualifies it and books the call.", href: "/services/ai-agents-automation/#example" },
  { id: "social", title: "Monthly content plan", kind: "Social Media Management", desc: "A planned grid of posts, reels and stories with a weekly publishing schedule.", href: "/services/social-media-management/#example" },
  { id: "ads", title: "Campaign reporting view", kind: "Digital Advertising", desc: "Meta and Google campaigns organised into one clear reporting layout.", href: "/services/digital-advertising/#example" },
  { id: "dashboards", title: "Business management dashboard", kind: "Business Dashboards & Systems", desc: "Leads, bookings and open tasks in one view, built on your own numbers.", href: "/services/business-dashboards-systems/#example" },
];

export default function WorkPage() {
  const w = pages.work;
  return (
    <>
      <PageHero eyebrow={w.hero.eyebrow} title={w.hero.title} accent={w.hero.accent} lead={w.hero.lead} />

      {caseStudies.length > 0 && (
      <Tone tone="light" className="section !pt-0">
        <div className="container border-t border-line pt-16">
            <div className="grid gap-6 md:grid-cols-2">{caseStudies.map((c) => (
              <article key={c.slug} className="rounded-[24px] border border-line bg-surface p-7"><span className="chip chip-navy">{c.industry}</span><h2 className="!text-2xl mt-4">{c.title}</h2><p className="text-text-2 mt-2">{c.summary}</p><p className="num mt-4">{c.services.join(" · ")}</p></article>
            ))}</div>
        </div>
      </Tone>
      )}

      <Tone tone="mist" className="section">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12 items-end">
            <Reveal className="lg:col-span-7"><p className="eyebrow">{w.demos.eyebrow}</p><h2 className="mt-5 max-w-[16ch]"><HeadText h={w.demos} /></h2></Reveal>
            <Reveal className="lg:col-span-5" index={1}><p className="lead">{w.demos.lead}</p></Reveal>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {demos.map((d, i) => (
              <Reveal as="li" key={d.title} index={i % 2} className={cn(i === demos.length - 1 && "md:col-span-2")}>
                <Link href={d.href} data-cursor="View" className="card card-hover bento-card group">
                  <div className="relative">
                    <ServiceStage id={d.id} scale={i === demos.length - 1 ? 1.15 : 1.08} className={cn("!h-[260px] sm:!h-[300px]", i === demos.length - 1 && "md:!h-[340px]")} />
                    <span className="chip chip-slate absolute top-4 left-4 z-[4] !bg-[rgba(243,240,235,.85)]">Concept · Sample content</span>
                  </div>
                  <div className="flex items-end justify-between gap-4 px-3.5 pt-6 pb-3">
                    <span><span className="num">{d.kind}</span><span className="block mt-2 text-[1.3rem] font-[560] tracking-[-0.025em]">{d.title}</span><span className="block mt-1.5 text-text-2 text-[0.93rem] max-w-[46ch]">{d.desc}</span></span>
                    <span className="arrow-pill shrink-0" aria-hidden><ArrowUpRight size={15} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10 card p-7 md:p-9 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[58ch]"><span className="font-[560]">{w.caseNoteTitle}</span> <span className="text-text-2">{w.caseNote}</span></p>
            <Link href="/contact/" className="btn btn-primary">{w.button} <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
          </Reveal>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work/" }]} />
    </>
  );
}
