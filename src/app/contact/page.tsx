import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Tone } from "@/components/sections/Tone";
import { isConfirmed, site, thirdPartyNote } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact — start a project",
  description: "Tell Keelbiz what you need — one service, several, a complete solution or a custom AI agent. We reply with questions and a custom quote.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const { email, whatsapp } = site.contact;
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you're" accent="building." lead="One service, several, or a complete solution — a few lines is enough. We reply with questions, options and a custom quote." compact />
      <Tone tone="mist" className="section !pt-12 md:!pt-16">
        <div className="container grid gap-6 lg:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 card !bg-[linear-gradient(180deg,rgba(255,253,250,.9),rgba(255,253,250,.7))] p-6 sm:p-8 md:p-10">
            <EnquiryForm />
          </div>
          <aside className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28 self-start">
            <div data-theme="dark" className="card p-7 !bg-[radial-gradient(80%_70%_at_90%_0%,rgba(120,153,166,.32),transparent_60%),linear-gradient(165deg,#2a4352,#1e3240)] !border-transparent text-text">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-6 grid gap-5">
                {["We read your enquiry and reply within two working days.", "A short call to understand what you need.", "A clear proposal and custom quote — no obligation."].map((t, i) => (
                  <li key={t} className="flex gap-4"><span className="num shrink-0">0{i + 1}</span><span className="text-[0.95rem]">{t}</span></li>
                ))}
              </ol>
            </div>
            {(isConfirmed(email) || isConfirmed(whatsapp)) && (
              <div className="card p-7">
                <p className="eyebrow">Direct</p>
                <ul className="mt-5 grid gap-3 text-[0.95rem]">
                  {isConfirmed(email) && <li className="flex items-center gap-3"><Mail size={17} className="text-text-2" aria-hidden /><a href={`mailto:${email}`} className="underline underline-offset-4 decoration-line-strong hover:decoration-text" data-event="email_click">{email}</a></li>}
                  {isConfirmed(whatsapp) && <li className="flex items-center gap-3"><MessageCircle size={17} className="text-text-2" aria-hidden /><a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} className="inline-flex items-center gap-1 underline underline-offset-4 decoration-line-strong hover:decoration-text" data-event="whatsapp_click" rel="noopener">WhatsApp <ArrowUpRight size={14} aria-hidden /></a></li>}
                </ul>
              </div>
            )}
            <div className="card p-7">
              <p className="eyebrow">Good to know</p>
              <ul className="mt-5 grid gap-3 text-[0.92rem] text-text-2">
                <li>No budget required to enquire.</li>
                <li>Custom quote — no public price list.</li>
                <li>{thirdPartyNote}</li>
              </ul>
            </div>
            {site.features.bookingEmbed && <div className="rounded-[24px] border border-line p-6 text-sm text-text-2">Booking embed goes here once configured.</div>}
          </aside>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }]} />
    </>
  );
}
