import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ogImage, services } from "@/content/site";
import { servicePages } from "@/components/service/pages";
import { StickyCta } from "@/components/service/StickyCta";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.definition, alternates: { canonical: `/services/${s.slug}/` }, openGraph: ogImage(s.slug) } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const idx = services.findIndex((x) => x.id === s.id);
  const Page = servicePages[s.id];

  return (
    <>
      <Page s={s} idx={idx} />
      <StickyCta id={s.id} label={s.name} cta={s.cta} />
      <ServiceJsonLd s={s} />
      <FaqJsonLd faq={s.faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: s.name, href: `/services/${s.slug}/` }]} />
    </>
  );
}
