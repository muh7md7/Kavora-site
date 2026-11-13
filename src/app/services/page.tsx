import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceFeatureList } from "@/components/sections/Bento";
import { Intro } from "@/components/sections/HomeSections";
import { FlexibleSolutions } from "@/components/sections/Offer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "Services — one service or a complete solution", description: "Website development, social media management, Meta and Google advertising, AI agents and automation, and business dashboards — hire one service or combine several.", alternates: { canonical: "/services/" } };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Five services, built around your" accent="business." lead="Hire us for exactly what you need — a website, social media, advertising, AI automation or a business dashboard — or combine them." />
      <section data-theme="light" className="tone section !pt-2"><div className="container"><h2 className="sr-only">All services</h2><ServiceFeatureList /></div></section>
      <FlexibleSolutions />
      <Intro />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }]} />
    </>
  );
}
