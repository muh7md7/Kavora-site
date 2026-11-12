import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { posts } from "@/content/insights";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "Insights", description: "Notes on websites, social, Meta ads, automation and dashboards from the Keelbiz team.", alternates: { canonical: "/insights/" } };

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Notes from the" accent="work." lead="Practical writing on web, growth and automation. Short, specific, no hype." />
      <section className="bg-ivory section pt-8"><div className="container">
        {posts.length === 0 ? (
          <div className="glass-solid rounded-lg p-8 max-w-2xl"><span className="chip chip-slate">First posts coming soon</span><p className="mt-4 text-slate">We publish when we have something useful to say. Follow our socials for updates.</p></div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">{posts.map((p) => <li key={p.slug} className="glass lift rounded-lg p-6"><span className="chip chip-navy">{p.category}</span><h2 className="!text-2xl mt-3">{p.title}</h2><p className="text-slate text-sm mt-2">{p.description}</p><p className="text-xs text-slate mt-3">{p.date} · {p.readingMinutes} min read</p></li>)}</ul>
        )}
      </div></section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights/" }]} />
    </>
  );
}
