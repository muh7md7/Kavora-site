import { Accordion, Button } from "@/components/ui";
import { contactHref } from "@/content/enquiry";
import { thirdPartyNote, type ServiceId } from "@/content/site";
import { cn } from "@/lib/cn";

/** Service-specific FAQ. */
export function ServiceFaq({ id, faq, cta, tone = "light" }: { id: ServiceId; faq: { q: string; a: string }[]; cta: string; tone?: "light" | "dark" }) {
  return (
    <section data-theme={tone} className={cn("tone section-major", tone === "dark" && "grain")}>
      <div className="container grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-5">Before you <span className="accent">ask.</span></h2>
          <p className="mt-6 text-[0.9rem] text-text-2 leading-relaxed">{thirdPartyNote}</p>
          <Button href={contactHref({ services: [id] })} className="mt-7">{cta}</Button>
        </div>
        <div className="lg:col-span-8"><Accordion items={faq} /></div>
      </div>
    </section>
  );
}
