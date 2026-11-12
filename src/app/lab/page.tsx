import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lab } from "@/lab/registry";
import { LabDemo } from "@/components/lab/LabDemo";
import { Reveal } from "@/components/sections/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Lab — interactive experiments and interface demonstrations",
  description: "Keelbiz Lab: a separate space for working interface experiments and demonstrations — navigation, dashboards, charts, workflow canvas and motion — each with its real source. Not a service or product list.",
  alternates: { canonical: "/lab/" },
};

export default function LabPage() {
  return (
    <>
      <section data-theme="light" className="tone tone-grad section !pt-[170px]">
        <div className="container">
          <div className="max-w-2xl">
            <p className="chip chip-navy">Keelbiz Lab · {lab.length} working experiments</p>
            <h1 className="mt-4">The <span className="accent accent-underline">Lab.</span></h1>
            <p className="lead mt-5">A separate space where we test interface ideas, motion and interaction — in the open, with the real code behind each one.</p>
            <p className="text-text-2 mt-4 text-[0.95rem] max-w-[58ch]">Everything here is a working demonstration or a clearly labelled concept with sample data. It is not a list of services or products — for those, see <Link href="/services/" className="text-text underline underline-offset-4 decoration-line-strong hover:decoration-text">Services</Link> and <Link href="/ai-solutions/" className="text-text underline underline-offset-4 decoration-line-strong hover:decoration-text">AI Solutions</Link>.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {lab.map((e, i) => (
              <Reveal key={e.slug} index={i}>
                <article className="flex flex-col gap-3 h-full">
                  <div className="rounded-[24px] p-6 min-h-[360px] flex items-center justify-center overflow-hidden tone tone-grad border border-line" data-theme="dark"><LabDemo slug={e.slug} />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div><h2 className="!text-2xl">{e.title}</h2><p className="text-sm text-slate mt-1">{e.description}</p></div>
                    <Link href={`/lab/${e.slug}/`} className="btn btn-ghost shrink-0">Open <ArrowRight className="arrow" size={16} aria-hidden /></Link>
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
