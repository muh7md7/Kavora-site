import Link from "next/link";
import { t } from "@/i18n";
import { PageHero } from "./PageHero";
import { legal } from "@/content/copy";
import { isConfirmed, site } from "@/content/site";

export function LegalPage({ page }: { page: "privacy" | "terms" | "cookies" }) {
  const { title, sections } = legal[page];
  return (
    <>
      <PageHero eyebrow="Legal" title={title} compact><p className="chip chip-slate mt-4">Last updated {legal.updated}</p></PageHero>
      <section data-theme="light" className="tone tone-mist section !pt-10"><div className="container"><div className="card max-w-[820px] p-7 sm:p-10 md:p-12">
        <p className="text-text-2 text-sm">{t("Operator:")} {site.brand}.{isConfirmed(site.contact.email) ? <> Contact: {site.contact.email}.</> : <>{" "}{t("Contact: via the")}{" "}<Link href="/contact/" className="underline">{t("enquiry form")}</Link>.</>}</p>
        {sections.map((s) => <div key={s.heading} className="mt-8 pt-8 border-t border-line"><h2 className="!text-xl">{s.heading}</h2><p className="text-text-2 mt-3 leading-relaxed">{s.text}</p></div>)}
      </div></div></section>
    </>
  );
}
