import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDemo } from "@/components/sections/ServiceDemos";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/sections/Reveal";
import { Button } from "@/components/glass/Button";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
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
  const bg = s.tone === "navy" ? "abstract-1" : "interior-1";
  const [first, ...rest] = s.name.split(" ");
  return (
    <>
      <PageHero eyebrow={`${s.flywheel} · ${s.tone === "sage" ? "Growth" : "Systems"}`} title={first} accent={rest.join(" ")} lead={s.definition} bg={bg}>
        <div className="mt-8 flex flex-wrap gap-3"><Button href={`/contact/?service=${s.id}`}>Enquire about {first.toLowerCase()}</Button><Button href="/lab/" variant="glass">See the Lab</Button></div>
      </PageHero>

      <section className="bg-ivory section">
        <div className="container grid gap-12 lg:grid-cols-3">
          <Reveal><ServiceGlyph id={s.id} className="mb-4" /><h2 className="!text-2xl">Who it&apos;s for</h2><p className="text-slate mt-3">{s.definition.split(". ").slice(1).join(". ")}</p></Reveal>
          <Reveal index={1}><h2 className="!text-2xl">Capabilities</h2><ul className="mt-3 space-y-2 text-slate list-disc pl-5">{s.capabilities.map((c) => <li key={c}>{c}</li>)}</ul></Reveal>
          <Reveal index={2}><h2 className="!text-2xl">Deliverables</h2><ul className="mt-3 space-y-2 text-slate list-disc pl-5">{s.deliverables.map((c) => <li key={c}>{c}</li>)}</ul></Reveal>
        </div>
      </section>

      <section className="bg-pearl section">
        <div className="container">
          <Reveal className="max-w-2xl"><h2>Live <span className="accent-navy">demo.</span></h2><p className="lead mt-3">{s.id === "automation" ? "Hover or focus a step." : "Interface demo with sample data — the real build is designed around your business."}</p></Reveal>
          <Reveal className="mt-8 bloom"><ServiceDemo id={s.id} /></Reveal>
        </div>
      </section>

      <section className="bg-ivory section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <Reveal><h2 className="!text-2xl">Use cases</h2><ul className="mt-4 grid gap-3">{s.useCases.map((u) => <li key={u} className="hairline rounded-md p-4 bg-white/60">{u}</li>)}</ul></Reveal>
          <Reveal index={1}><h2 className="!text-2xl">Process</h2><ol className="mt-4 space-y-3">{steps.map((p) => <li key={p.n} className="flex gap-3"><span className="font-display font-bold text-champagne text-xl w-8">{p.n}</span><span><strong>{p.name}</strong> <span className="text-slate">— {p.text}</span></span></li>)}</ol></Reveal>
        </div>
      </section>

      <section className="bg-pearl section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal><h2>Questions</h2></Reveal>
          <Reveal><Faq items={s.faq} name={`faq-${s.id}`} /><div className="mt-8"><Button href={`/contact/?service=${s.id}`}>Start a conversation</Button></div></Reveal>
        </div>
      </section>

      <ServiceJsonLd s={s} />
      <FaqJsonLd faq={s.faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: s.name, href: `/services/${s.slug}/` }]} />
    </>
  );
}
