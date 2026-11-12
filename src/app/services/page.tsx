import type { Metadata } from "next";
import { services } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTile } from "@/components/sections/ServiceTile";
import { Flywheel } from "@/components/sections/HomeSections";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "Services — one connected growth loop", description: "Website design & development, social media management, Meta advertising, AI agents & automation, and business dashboards — delivered by one team.", alternates: { canonical: "/services/" } };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="One loop." accent="Five services." lead="Attract with social and ads. Convert with the website. Automate the follow-up. Manage it all from one dashboard." bg="abstract-1" />
      <section className="bg-ivory section"><div className="container grid gap-4 md:grid-cols-6">{services.map((s, i) => <ServiceTile key={s.id} s={s} index={i} />)}</div></section>
      <section className="bg-pearl section"><div className="container flex justify-center"><Flywheel /></div></section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }]} />
    </>
  );
}
