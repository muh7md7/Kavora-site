import { PageHero } from "./PageHero";
import { isConfirmed, site } from "@/content/site";

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} bg="abstract-1"><p className="chip chip-slate mt-4">Template — requires legal review</p></PageHero>
      <section className="bg-ivory section pt-8"><div className="container"><div className="prose-col">
        <p className="text-slate text-sm">Operator: {site.brand}.{isConfirmed(site.contact.email) ? <> Contact: {site.contact.email}.</> : <> Contact: via the <a href="/contact/" className="underline">enquiry form</a>.</>}</p>
        {sections.map((s) => <div key={s.h} className="mt-8"><h2 className="!text-xl">{s.h}</h2><p className="text-slate mt-2">{s.p}</p></div>)}
      </div></div></section>
    </>
  );
}
