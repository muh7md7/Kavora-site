import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDemo } from "@/components/sections/ServiceDemos";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/sections/Reveal";
import { Button } from "@/components/glass/Button";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHead, Tone } from "@/components/sections/Tone";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { steps } from "@/content/site";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.definition, alternates: { canonical: `/services/${s.slug}/` } } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const idx = services.findIndex((x) => x.id === s.id);
  const next = services[(idx + 1) % services.length];
  return (
    <>
      <PageHero eyebrow={`Service 0${idx + 1} · ${s.flywheel}`} title={s.name.split(" ").slice(0, -1).join(" ")} accent={s.name.split(" ").slice(-1)[0]} lead={s.definition}>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={`/contact/?service=${s.id}`}>Start a {s.flywheel === "Attract" ? "campaign" : "project"}</Button>
          <Button href="#demo" variant="ghost">See the live demo</Button>
        </div>
      </PageHero>

      <Tone tone="light" className="section !pt-0">
        <div className="container grid gap-x-10 gap-y-14 lg:grid-cols-12 border-t border-line pt-16">
          <Reveal className="lg:col-span-4"><p className="eyebrow">Who it&apos;s for</p><p className="mt-5 text-[1.15rem] leading-relaxed text-text">{s.definition.split(". ").slice(1).join(". ")}</p></Reveal>
          <Reveal className="lg:col-span-4" index={1}><p className="eyebrow">Capabilities</p><ul className="mt-5 divide-y divide-line border-y border-line">{s.capabilities.map((c) => <li key={c} className="py-3 text-[0.98rem]">{c}</li>)}</ul></Reveal>
          <Reveal className="lg:col-span-4" index={2}><p className="eyebrow">Deliverables</p><ul className="mt-5 divide-y divide-line border-y border-line">{s.deliverables.map((c) => <li key={c} className="py-3 text-[0.98rem]">{c}</li>)}</ul></Reveal>
        </div>
      </Tone>

      <Tone tone="dark" grad className="section overflow-hidden" id="demo" aria-labelledby="demo-h">
        <div className="container">
          <Reveal><SectionHead eyebrow="Live demo" title="See it" accent="working." lead={s.id === "automation" ? "Hover or focus each step of the flow." : "An interface demo with sample data — the real build is designed around your business."} /></Reveal>
          <Reveal className="mt-14 bloom" index={1}><ServiceDemo id={s.id} /></Reveal>
        </div>
      </Tone>

      <Tone tone="light" className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><p className="eyebrow">Use cases</p><ul className="mt-6 grid gap-3">{s.useCases.map((u, i) => <li key={u} className="flex gap-5 items-baseline border-t border-line pt-4"><span className="num">0{i + 1}</span><span className="text-[1.1rem] tracking-[-0.015em]">{u}</span></li>)}</ul></Reveal>
          <div className="lg:col-span-7"><Reveal><p className="eyebrow">Process</p></Reveal><div className="mt-8"><ProcessSteps items={steps} /></div></div>
        </div>
      </Tone>

      <Tone tone="light" alt className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow">FAQ</p><h2 className="mt-5">Good <span className="accent">questions.</span></h2></Reveal>
          <Reveal className="lg:col-span-8" index={1}><Faq items={s.faq} name={`faq-${s.id}`} /></Reveal>
        </div>
        <div className="container mt-20">
          <Link href={`/services/${next.slug}/`} data-cursor="Next" className="group flex items-center justify-between gap-6 border-t border-line pt-10">
            <span><span className="num">Next service</span><span className="block mt-3 text-[clamp(1.6rem,1.2rem+2vw,3rem)] font-[560] tracking-[-0.04em] leading-tight">{next.name}</span></span>
            <span className="size-14 shrink-0 rounded-full border border-line-strong inline-flex items-center justify-center transition-all duration-500 group-hover:bg-text group-hover:text-bg group-hover:rotate-45"><ArrowUpRight size={20} aria-hidden /></span>
          </Link>
        </div>
      </Tone>

      <ServiceJsonLd s={s} />
      <FaqJsonLd faq={s.faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: s.name, href: `/services/${s.slug}/` }]} />
    </>
  );
}
