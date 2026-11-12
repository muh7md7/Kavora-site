import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { isConfirmed, site } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "Contact — start a project", description: "Tell Keelbiz what you're building. Website, social, Meta ads, AI automation or dashboards — we reply with questions and next steps.", alternates: { canonical: "/contact/" } };

export default function ContactPage() {
  const { email, whatsapp } = site.contact;
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you're" accent="building." lead="Short description is enough. We reply with questions, options and a clear next step — no pressure, no guarantees." />
      <section className="bg-ivory section pt-8">
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="glass-solid rounded-lg p-6 md:p-8"><EnquiryForm /></div>
          <aside className="flex flex-col gap-6">
            <div><h2 className="!text-xl">Direct</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Email: {isConfirmed(email) ? <a href={`mailto:${email}`} className="text-navy underline" data-event="email_click">{email}</a> : <span className="text-slate">{email}</span>}</li>
                <li>WhatsApp: {isConfirmed(whatsapp) ? <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} className="text-navy underline" data-event="whatsapp_click">{whatsapp}</a> : <span className="text-slate">{whatsapp}</span>}</li>
              </ul></div>
            <div><h2 className="!text-xl">What happens next</h2><ol className="mt-3 space-y-2 text-sm text-slate list-decimal pl-5"><li>We read your enquiry and reply within two working days.</li><li>A short call to understand scope.</li><li>A written proposal with deliverables and pricing.</li></ol></div>
            {site.features.bookingEmbed && <div className="hairline rounded-md p-4 text-sm text-slate">Booking embed goes here once configured.</div>}
          </aside>
        </div>
      </section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }]} />
    </>
  );
}
