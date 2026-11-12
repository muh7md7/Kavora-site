import type { Metadata } from "next";
import { services } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTile } from "@/components/sections/ServiceTile";
import { Intro } from "@/components/sections/HomeSections";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "Services — one connected growth loop", description: "Website design & development, social media management, Meta advertising, AI agents & automation, and business dashboards — delivered by one team.", alternates: { canonical: "/services/" } };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Five services. One" accent="loop." lead="Attract with social and ads. Convert with the website. Automate the follow-up. Manage it all from one dashboard." />
      <section data-theme="light" className="tone section !pt-0"><div className="container"><ul>{services.map((s, i) => <ServiceTile key={s.id} s={s} index={i} />)}</ul></div></section>
      <Intro />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }]} />
    </>
  );
}
