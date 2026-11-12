import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lab } from "@/lab/registry";
import { LabDemo } from "@/components/lab/LabDemo";
import { Reveal } from "@/components/sections/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Lab — Glass Kit components with real source",
  description: "Live, accessible interface components from the Keelbiz site — navbar, sidebar, tabs, stat cards, gauges, checkout demo, workflow canvas — each with its real source code.",
  alternates: { canonical: "/lab/" },
};

export default function LabPage() {
  return (
    <>
      <section data-theme="light" className="tone tone-grad section !pt-[170px]">
        <div className="container">
          <div className="max-w-2xl">
            <p className="chip chip-navy">Glass Kit · 11 components</p>
            <h1 className="mt-4">The <span className="accent accent-underline">Lab.</span></h1>
            <p className="lead mt-5">Every component on this site, live, with its real source. Built to be reused — and recorded as a Reel.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {lab.map((e, i) => (
              <Reveal key={e.slug} index={i}>
                <article className="flex flex-col gap-3 h-full">
                  <div className="rounded-[24px] p-6 min-h-[360px] flex items-center justify-center overflow-hidden tone tone-grad border border-line" data-theme="dark"><LabDemo slug={e.slug} />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div><h2 className="!text-2xl">{e.title} <span className="accent">{e.version}</span></h2><p className="text-sm text-slate mt-1">{e.description}</p></div>
                    <Link href={`/lab/${e.slug}/`} className="btn btn-ghost shrink-0">View code <ArrowRight className="arrow" size={16} aria-hidden /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Lab", href: "/lab/" }]} />
    </>
  );
}
