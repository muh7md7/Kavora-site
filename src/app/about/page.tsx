import { seo } from "@/lib/seo";
import { t } from "@/i18n";
import type { Metadata } from "next";
import { pages } from "@/content/copy";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { HeadText, Tone } from "@/components/sections/Tone";
import { Button } from "@/components/glass/Button";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { services, whyUs } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Flywheel } from "@/components/sections/HomeSections";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: t("About Keelbiz — Digital Growth & AI Agency"),
  description: t("Keelbiz helps businesses build, grow and automate with websites, social media, advertising, AI agents and business dashboards."),
  ...seo("/about/"),
};

export default function AboutPage() {
  const ab = pages.about;
  return (
    <>
      <PageHero eyebrow={ab.hero.eyebrow} title={ab.hero.title} accent={ab.hero.accent} lead={ab.hero.lead}
        aside={<div className="device flex justify-center p-6 sm:p-8"><Flywheel className="max-w-[380px]" /></div>} />

      <Tone tone="mist" className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><p className="eyebrow">{ab.story.eyebrow}</p></Reveal>
          <Reveal className="lg:col-span-7" index={1}>
            <p className="text-[clamp(1.4rem,1.1rem+1.2vw,2.1rem)] leading-[1.3] tracking-[-0.025em] text-text">{ab.story.statement}</p>
            <p className="lead mt-8">{ab.story.lead}</p>
          </Reveal>
        </div>
      </Tone>

      <Tone tone="dark" grad grid className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow">{ab.principles.eyebrow}</p><h2 className="mt-5"><HeadText h={ab.principles} /></h2></Reveal>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {whyUs.map((w, i) => (
              <Reveal as="li" key={w.t} index={i} className="card card-hover p-6 md:p-7">
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
          <Reveal className="lg:col-span-4"><p className="eyebrow">{ab.whatWeDo.eyebrow}</p><h2 className="mt-5"><HeadText h={ab.whatWeDo} /></h2></Reveal>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} index={i} className={cn(i === services.length - 1 && "sm:col-span-2")}>
                <Link href={`/services/${s.slug}/`} data-spot className="card card-hover block h-full p-6">
                  <ServiceGlyph id={s.id} />
                  <h3 className="mt-5 !text-lg">{s.name}</h3>
                  <p className="text-text-2 text-[0.92rem] mt-1.5">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Tone>

      <Tone tone="warm" className="section">
        <div className="container grid gap-10 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{ab.team.eyebrow}</p>
            <h2 className="mt-5"><HeadText h={ab.team} /></h2>
            <p className="lead mt-6">{ab.team.lead}</p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:justify-self-end" index={1}><Button href="/contact/">{ab.team.button}</Button></Reveal>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About", href: "/about/" }]} />
    </>
  );
}
