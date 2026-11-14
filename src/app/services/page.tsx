import { seo } from "@/lib/seo";
import { t } from "@/i18n";
import type { Metadata } from "next";
import { pages } from "@/content/copy";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceFeatureList } from "@/components/sections/Bento";
import { Intro } from "@/components/sections/HomeSections";
import { FlexibleSolutions } from "@/components/sections/Offer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: t("Digital Marketing, Web Design & AI Services"), description: t("Website development, social media management, Meta and Google advertising, AI agents and automation, and business dashboards — hire one service or combine several."), ...seo("/services/") };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={pages.servicesHub.eyebrow} title={pages.servicesHub.title} accent={pages.servicesHub.accent} lead={pages.servicesHub.lead} />
      <section data-theme="light" className="tone section !pt-2"><div className="container"><h2 className="sr-only">{t("All services")}</h2><ServiceFeatureList /></div></section>
      <FlexibleSolutions />
      <Intro />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }]} />
    </>
  );
}
