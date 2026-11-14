import { isConfirmed, site, type Service } from "@/content/site";
import { isAr } from "@/i18n";

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  const sameAs = Object.values(site.socials).filter(isConfirmed);
  const email = isConfirmed(site.contact.email) ? site.contact.email : "";
  const home = isAr ? `${site.url}/ar/` : `${site.url}/`;
  return (
    <>
      <Script data={{
        "@context": "https://schema.org", "@type": "ProfessionalService", "@id": `${site.url}/#organization`, name: site.brand, url: site.url,
        logo: `${site.url}/apple-icon.png`, image: `${site.url}/og/default.png`, description: site.positioning,
        areaServed: "Worldwide", knowsLanguage: ["en", "ar"],
        ...(email ? { email, contactPoint: { "@type": "ContactPoint", contactType: "sales", email, availableLanguage: ["English", "Arabic"] } } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      }} />
      <Script data={{
        "@context": "https://schema.org", "@type": "WebSite", "@id": `${home}#website`, name: site.brand, url: home,
        inLanguage: isAr ? "ar" : "en", publisher: { "@id": `${site.url}/#organization` },
      }} />
    </>
  );
}

export function ServiceJsonLd({ s }: { s: Service }) {
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.definition, serviceType: s.name,
      provider: { "@id": `${site.url}/#organization` }, areaServed: "Worldwide", url: `${site.url}${isAr ? "/ar" : ""}/services/${s.slug}/`,
    }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${isAr ? "/ar" : ""}${it.href}` })),
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

/** Market landing pages: the same agency services, offered to businesses in one country. */
export function MarketJsonLd({ name, description, country, path }: { name: string; description: string; country: string; path: string }) {
  return (
    <Script data={{
      "@context": "https://schema.org", "@type": "Service", name, ...(description ? { description } : {}), serviceType: "Digital marketing agency",
      provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: country }, url: `${site.url}${isAr ? "/ar" : ""}${path}`,
    }} />
  );
}
