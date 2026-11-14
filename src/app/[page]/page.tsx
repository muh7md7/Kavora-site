import { seo } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { BreadcrumbJsonLd, FaqJsonLd, MarketJsonLd } from "@/components/seo/JsonLd";
import { customPages, isHeroBlock } from "@/content/builder";

// Pages created in the admin panel (📄 Pages → content/custom-pages/*.json). One static page per published entry.
export const dynamicParams = false;
const PLACEHOLDER = "__no-custom-pages";

export function generateStaticParams() {
  // A static export needs at least one path; when no pages exist yet a hidden placeholder 404s.
  return customPages.length ? customPages.map((p) => ({ page: p.slug })) : [{ page: PLACEHOLDER }];
}

const find = (slug: string) => customPages.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const p = find((await params).page);
  if (!p) return { robots: { index: false } };
  return {
    title: p.seo.title,
    description: p.seo.description || undefined,
    ...seo(p.path, p.seo.image?.src),
    robots: p.seo.hideFromSearch ? { index: false, follow: true } : undefined,
  };
}

export default async function CustomPage({ params }: { params: Promise<{ page: string }> }) {
  const p = find((await params).page);
  if (!p) notFound();
  const hasHero = isHeroBlock(p.blocks[0]);
  const faqs = p.blocks.flatMap((b) => (b.type === "faq" ? b.items : []));
  return (
    <>
      {!hasHero && <PageHero title={p.title} compact />}
      <Blocks blocks={p.blocks} spacer={false} />
      {faqs.length > 0 && <FaqJsonLd faq={faqs} />}
      {p.areaServed && <MarketJsonLd name={p.seo.title} description={p.seo.description} country={p.areaServed} path={p.path} />}
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: p.title, href: p.path }]} />
    </>
  );
}
