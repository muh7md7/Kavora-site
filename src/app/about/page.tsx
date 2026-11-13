import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { Tone } from "@/components/sections/Tone";
import { Button } from "@/components/glass/Button";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { services, site, whyUs } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Keelbiz",
  description: "Keelbiz is a founder-led digital growth agency helping businesses build, grow and automate — with websites, social media, advertising, AI agents and business dashboards.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Keelbiz" title="Your partner in digital" accent="growth." lead={site.supporting} />

      <Tone tone="light" className="section !pt-0">
        <div className="container grid gap-14 lg:grid-cols-12 border-t border-line pt-16">
          <Reveal className="lg:col-span-5"><p className="eyebrow">Why we exist</p></Reveal>
          <Reveal className="lg:col-span-7" index={1}>
            <p className="text-[clamp(1.4rem,1.1rem+1.2vw,2.1rem)] leading-[1.3] tracking-[-0.025em] text-text">
              Most businesses buy their website, marketing and automation from different people who never talk to each other. The site doesn&apos;t match the ads, leads go unanswered, and nobody can see what&apos;s working.
            </p>
            <p className="lead mt-8">Keelbiz brings these together — so you can start with exactly what you need today, and connect more later. One service or a complete solution, built around your business.</p>
          </Reveal>
        </div>
      </Tone>

      <Tone tone="dark" grad className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow">How we work</p><h2 className="mt-5">Principles we <span className="accent">keep.</span></h2></Reveal>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10">
            {whyUs.map((w, i) => (
              <Reveal as="li" key={w.t} index={i} className="py-7 border-t border-line">
                <span className="num">0{i + 1}</span>
                <h3 className="mt-3 !text-xl">{w.t}</h3>
                <p className="text-text-2 mt-2 text-[0.95rem]">{w.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Tone>

      <Tone tone="light" className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow">What we do</p><h2 className="mt-5">Five services. <span className="accent">Your</span> choice.</h2></Reveal>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} index={i}>
                <Link href={`/services/${s.slug}/`} data-spot className="lift block h-full rounded-[20px] border border-line bg-surface p-6">
                  <ServiceGlyph id={s.id} />
                  <h3 className="mt-5 !text-lg">{s.name}</h3>
                  <p className="text-text-2 text-[0.92rem] mt-1.5">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Tone>

      <Tone tone="light" alt className="section">
        <div className="container grid gap-10 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">The team</p>
            <h2 className="mt-5">Founder-led, with <span className="accent">specialists</span> per project.</h2>
            <p className="lead mt-6">You work with the founder directly, supported by specialists in design, engineering, advertising and automation as each project needs.</p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:justify-self-end" index={1}><Button href="/contact/">Start a conversation</Button></Reveal>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About", href: "/about/" }]} />
    </>
  );
}
