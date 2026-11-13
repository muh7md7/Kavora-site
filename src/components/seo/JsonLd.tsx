import { isConfirmed, site, type Service } from "@/content/site";
import { packagesByService } from "@/content/packages";

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  const sameAs = Object.values(site.socials).filter(isConfirmed);
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "Organization", name: site.brand, url: site.url, description: site.positioning,
      ...(isConfirmed(site.contact.email) ? { email: site.contact.email } : {}), ...(sameAs.length ? { sameAs } : {}),
    }} />
  );
}

export function ServiceJsonLd({ s }: { s: Service }) {
  const { tiers } = packagesByService[s.id];
  // Offers describe the packages shown on the page. No price is emitted until a real one is set —
  // a made-up or zero price in structured data would be a false claim to search engines.
  const offers = tiers.map((t) => ({
    "@type": "Offer",
    name: t.name,
    description: t.forWho,
    url: `${site.url}/services/${s.slug}/#packages`,
    ...(t.price ? { price: t.price, priceCurrency: "USD" } : { availability: "https://schema.org/InStock" }),
  }));
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.definition, serviceType: s.name,
      provider: { "@type": "Organization", name: site.brand, url: site.url }, url: `${site.url}/services/${s.slug}/`,
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog", name: `${s.name} packages`,
        itemListElement: offers,
      },
    }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.href}` })),
    }} />
  );
}

/** Only for FAQs that are visible on the page. */
export function FaqJsonLd({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }} />
  );
}
