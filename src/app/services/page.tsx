import type { Metadata } from "next";
import { services } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTile } from "@/components/sections/ServiceTile";
import { Intro } from "@/components/sections/HomeSections";
import { FlexibleSolutions } from "@/components/sections/Offer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "Services — one service or a complete solution", description: "Website development, social media management, Meta and Google advertising, AI agents and automation, and business dashboards — hire one service or combine several.", alternates: { canonical: "/services/" } };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="One service or a complete solution. Built around your" accent="business." lead="Hire us for exactly what you need — a website, social media, advertising, AI automation or a business dashboard — or combine them." />
      <section data-theme="light" className="tone section !pt-0"><div className="container"><ul>{services.map((s, i) => <ServiceTile key={s.id} s={s} index={i} />)}</ul></div></section>
      <FlexibleSolutions />
      <Intro />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }]} />
    </>
  );
}
