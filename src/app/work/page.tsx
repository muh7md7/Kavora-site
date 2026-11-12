import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { caseStudies } from "@/content/work";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "Work — case studies", description: "Selected Keelbiz projects, published only with client permission and verified results.", alternates: { canonical: "/work/" } };

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Selected" accent="work." lead="Only projects we have permission to show, with results we can verify." bg="abstract-1" />
      <section className="bg-ivory section pt-8"><div className="container">
        {caseStudies.length === 0 ? (
          <div className="glass-solid rounded-lg p-8 max-w-2xl"><span className="chip chip-slate">Selected work coming soon</span><p className="mt-4 text-slate">Case studies are being prepared with client permission. In the meantime the <Link href="/lab/" className="text-navy font-semibold underline underline-offset-4">Lab</Link> shows the interfaces we build.</p></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">{caseStudies.map((c) => (
            <article key={c.slug} className="glass lift rounded-lg p-6"><span className="chip chip-sage">{c.industry}</span><h2 className="!text-2xl mt-3">{c.title}</h2><p className="text-slate text-sm mt-2">{c.summary}</p><p className="text-xs text-slate mt-3">{c.services.join(" · ")}</p></article>
          ))}</div>
        )}
      </div></section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work/" }]} />
    </>
  );
}
