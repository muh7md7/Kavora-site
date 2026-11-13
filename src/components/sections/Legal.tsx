import { PageHero } from "./PageHero";
import { isConfirmed, site } from "@/content/site";

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} compact><p className="chip chip-slate mt-4">Last updated 13 November 2026</p></PageHero>
      <section data-theme="light" className="tone tone-mist section !pt-10"><div className="container"><div className="card max-w-[820px] p-7 sm:p-10 md:p-12">
        <p className="text-text-2 text-sm">Operator: {site.brand}.{isConfirmed(site.contact.email) ? <> Contact: {site.contact.email}.</> : <> Contact: via the <a href="/contact/" className="underline">enquiry form</a>.</>}</p>
        {sections.map((s) => <div key={s.h} className="mt-8 pt-8 border-t border-line"><h2 className="!text-xl">{s.h}</h2><p className="text-text-2 mt-3 leading-relaxed">{s.p}</p></div>)}
      </div></div></section>
    </>
  );
}
