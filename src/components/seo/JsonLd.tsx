import { isConfirmed, site, type Service } from "@/content/site";

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  const sameAs = Object.values(site.socials).filter(isConfirmed);
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "Organization", name: site.brand, url: site.url, description: site.positioning,
      ...(isConfirmed(site.contact.email) ? { email: site.contact.email } : {}), ...(sameAs.length ? { sameAs } : {}),
      areaServed: ["Worldwide", "United Arab Emirates", "Pakistan"],
    }} />
  );
}

export function ServiceJsonLd({ s }: { s: Service }) {
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.definition, serviceType: s.name,
      provider: { "@type": "Organization", name: site.brand, url: site.url }, url: `${site.url}/services/${s.slug}/`,
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
