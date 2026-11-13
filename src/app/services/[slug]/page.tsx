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
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { ArrowUpRight, Check } from "lucide-react";
import { ServiceStage } from "@/components/sections/Bento";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { steps, thirdPartyNote } from "@/content/site";

const exampleCopy: Record<string, { title: string; accent: string; lead: string }> = {
  websites: { title: "Responsive, by", accent: "default.", lead: "An interactive preview of a business website at desktop, tablet and phone widths — illustrative layout, sample content. Your site is designed around your business." },
  social: { title: "A month,", accent: "planned.", lead: "Illustrative content calendar and reel formats — your plan is built around your audience and platforms." },
  ads: { title: "Structured", accent: "campaigns.", lead: "Illustrative campaign structure and reporting layout — sample data, not results." },
  automation: { title: "See it", accent: "working.", lead: "A typical enquiry-to-CRM flow. Hover or focus each step — yours is designed around your process." },
  dashboards: { title: "One clear", accent: "view.", lead: "An illustrative dashboard layout with sample data — the real system is built on your own numbers." },
};

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.definition.length > 160 ? s.definition.slice(0, s.definition.lastIndexOf(" ", 155)) + "…" : s.definition, alternates: { canonical: `/services/${s.slug}/` } } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const idx = services.findIndex((x) => x.id === s.id);
  const next = services[(idx + 1) % services.length];
  return (
    <>
      <PageHero eyebrow={`Service 0${idx + 1} of 05`} title={s.name.split(" ").slice(0, -1).join(" ")} accent={s.name.split(" ").slice(-1)[0]} lead={s.definition}
        aside={<Reveal className="device"><ServiceStage id={s.id} scale={1.32} className="!h-[300px] sm:!h-[360px] lg:!h-[400px]" /><p className="px-2 pt-2.5 text-[0.75rem] text-text-2 font-mono tracking-[.04em]">Illustrative interface · sample content</p></Reveal>}>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button href={`/contact/?services=${s.id}`}>{s.cta}</Button>
          <Link href="#example" className="btn btn-glass">See an example</Link>
        </div>
        <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-text-2">
          {["Available on its own", "Custom quote", "Combine with other services"].map((t) => <li key={t} className="inline-flex items-center gap-2"><Check size={14} className="text-accent" aria-hidden />{t}</li>)}
        </ul>
      </PageHero>

      <Tone tone="mist" className="section">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12 items-end">
            <Reveal className="lg:col-span-6"><p className="eyebrow">Why it matters</p><h2 className="mt-5 max-w-[16ch]">What this does for your <span className="accent">business.</span></h2></Reveal>
            <Reveal className="lg:col-span-6" index={1}><p className="lead">{s.forWho}</p></Reveal>
          </div>
          <ul className="mt-12 grid sm:grid-cols-3 gap-4">
            {s.benefits.map((b, i) => (
              <Reveal as="li" key={b} index={i}>
                <div data-spot className="card card-hover h-full p-7">
                  <span className="num">0{i + 1}</span>
                  <p className="mt-6 text-[1.2rem] leading-snug tracking-[-0.02em] font-[560]">{b}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Reveal><div className="card h-full p-7 md:p-9"><p className="eyebrow">What we offer</p>
              <ul className="mt-6 grid gap-3">{s.capabilities.map((c) => <li key={c} className="flex gap-3 text-[0.98rem]"><span className="mt-[3px] size-[18px] shrink-0 rounded-full bg-steel-soft text-accent inline-flex items-center justify-center" aria-hidden><Check size={11} strokeWidth={3} /></span>{c}</li>)}</ul></div></Reveal>
            <Reveal index={1}><div data-theme="dark" className="card h-full p-7 md:p-9 !bg-[radial-gradient(80%_70%_at_90%_0%,rgba(120,153,166,.32),transparent_60%),linear-gradient(165deg,#2a4352,#1e3240)] !border-transparent text-text"><p className="eyebrow">What you get</p>
              <ul className="mt-6 grid gap-3">{s.deliverables.map((c) => <li key={c} className="flex gap-3 text-[0.98rem]"><span className="mt-[3px] size-[18px] shrink-0 rounded-full bg-[rgba(213,224,228,.14)] text-[#b9cdd5] inline-flex items-center justify-center" aria-hidden><Check size={11} strokeWidth={3} /></span>{c}</li>)}</ul>
              <p className="text-text-2 mt-8 text-[0.9rem]">Available on its own. No other service required.</p></div></Reveal>
          </div>
          {s.id === "automation" && (
            <Reveal className="mt-4">
              <Link href="/ai-solutions/" data-cursor="Explore" className="card card-hover group flex flex-wrap items-center justify-between gap-6 p-7 md:p-9">
                <span><span className="eyebrow">AI Solutions</span><span className="block mt-3 text-[clamp(1.3rem,1.1rem+0.8vw,1.8rem)] font-[560] tracking-[-0.03em] max-w-[34ch]">Ready-made agents, custom agents or workflow automation — see your options.</span></span>
                <span className="btn btn-primary">Explore AI Solutions <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></span>
              </Link>
            </Reveal>
          )}
        </div>
      </Tone>

      <Tone tone="dark" grad grid className="section overflow-hidden" id="example" aria-labelledby="demo-h">
        <div className="container">
          <Reveal><SectionHead eyebrow="Example" title={exampleCopy[s.id].title} accent={exampleCopy[s.id].accent} lead={exampleCopy[s.id].lead} /></Reveal>
          <Reveal className="mt-14 bloom" index={1}><ServiceDemo id={s.id} /></Reveal>
        </div>
      </Tone>

      <Tone tone="light" className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><p className="eyebrow">Use cases</p><h2 className="mt-5 !text-[clamp(1.8rem,1.4rem+1.6vw,2.75rem)]">Where it <span className="accent">helps.</span></h2><ul className="mt-6 grid gap-3">{s.useCases.map((u, i) => <li key={u} className="flex gap-5 items-baseline border-t border-line pt-4"><span className="num">0{i + 1}</span><span className="text-[1.1rem] tracking-[-0.015em]">{u}</span></li>)}</ul></Reveal>
          <div className="lg:col-span-7"><Reveal><p className="eyebrow">How it works</p></Reveal><div className="mt-8"><ProcessSteps items={steps} /></div></div>
        </div>
      </Tone>

      <Tone tone="light" alt className="section">
        <div className="container grid gap-14 lg:grid-cols-12 mb-24">
          <Reveal className="lg:col-span-4"><p className="eyebrow">Works well with</p><h2 className="mt-5">Optional <span className="accent">extras.</span></h2>
            <p className="text-text-2 mt-5">Only if they help. {s.name} is available on its own.</p></Reveal>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-3 self-start">
            {s.pairsWith.map((p, i) => { const o = services.find((x) => x.id === p.id)!; return (
              <Reveal as="li" key={p.id} index={i}>
                <Link href={`/services/${o.slug}/`} data-spot className="card card-hover group flex h-full gap-4 p-6">
                  <ServiceGlyph id={o.id} />
                  <span><span className="block font-[550]">{s.name} + {o.name}</span><span className="block text-text-2 text-[0.92rem] mt-1.5">{p.why}</span></span>
                  <ArrowUpRight size={16} className="ml-auto shrink-0 text-text-2 group-hover:text-text transition-colors" aria-hidden />
                </Link>
              </Reveal>
            ); })}
          </ul>
        </div>
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow">FAQ</p><h2 className="mt-5">Good <span className="accent">questions.</span></h2></Reveal>
          <Reveal className="lg:col-span-8" index={1}><Faq items={s.faq} name={`faq-${s.id}`} />
            <div className="card mt-8 flex flex-wrap items-center justify-between gap-5 p-6">
              <p className="text-text-2 text-[0.92rem] max-w-[60ch]"><span className="text-text font-[550]">Pricing.</span> Custom quote after a short discovery call. {thirdPartyNote}</p>
              <Button href={`/contact/?services=${s.id}`}>{s.cta}</Button>
            </div>
          </Reveal>
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
