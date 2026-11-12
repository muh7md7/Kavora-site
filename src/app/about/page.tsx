import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { Button } from "@/components/glass/Button";
import { services, site, whyUs } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "About Keelbiz", description: "Keelbiz is a founder-led digital growth and business technology agency working with businesses worldwide, with a strong presence in the UAE / GCC and Pakistan.", alternates: { canonical: "/about/" } };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Built to keep businesses" accent="moving." lead={site.positioning} />
      <section className="bg-ivory section pt-8"><div className="container grid gap-12 lg:grid-cols-2">
        <Reveal><h2 className="!text-2xl">Why Keelbiz exists</h2><p className="text-slate mt-3">Most businesses buy marketing, websites and automation from three different vendors who never talk to each other. The result is a site that doesn&apos;t match the ads, leads that go unanswered, and reports nobody reads. Keelbiz exists to run these as one connected system.</p></Reveal>
        <Reveal index={1}><h2 className="!text-2xl">Approach</h2><p className="text-slate mt-3">Design and engineering in one team. Clear scope before creative. Measurement before claims. Everything we build is set up in your name so you keep ownership.</p></Reveal>
        <Reveal index={2}><h2 className="!text-2xl">Principles</h2><ul className="mt-3 space-y-2 text-slate list-disc pl-5">{whyUs.map((w) => <li key={w.t}><strong className="text-ink">{w.t}.</strong> {w.d}</li>)}</ul></Reveal>
        <Reveal index={3}><h2 className="!text-2xl">Expertise</h2><ul className="mt-3 space-y-2 text-slate list-disc pl-5">{services.map((s) => <li key={s.id}>{s.name}</li>)}</ul></Reveal>
        <Reveal index={4} className="lg:col-span-2 glass-solid rounded-lg p-6">
          <h2 className="!text-2xl">Team</h2>
          <p className="text-slate mt-3">Keelbiz is founder-led, working with a small network of specialists per project. Team details and credentials: [TO CONFIRM].</p>
          <div className="mt-6"><Button href="/contact/">Start a conversation</Button></div>
        </Reveal>
      </div></section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About", href: "/about/" }]} />
    </>
  );
}
