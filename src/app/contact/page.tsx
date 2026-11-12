import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Tone } from "@/components/sections/Tone";
import { isConfirmed, site } from "@/content/site";
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
      <PageHero eyebrow="Contact" title="Tell us what you're" accent="building." lead="One service, several, or a complete solution — a few lines is enough. We reply with questions, options and a custom quote." />
      <Tone tone="light" className="section !pt-0">
        <div className="container grid gap-10 lg:gap-14 lg:grid-cols-12 border-t border-line pt-14">
          <div className="lg:col-span-8 rounded-[28px] border border-line bg-surface-strong p-6 sm:p-8 md:p-10 shadow-[0_30px_60px_-40px_rgba(17,25,30,.35)]">
            <EnquiryForm />
          </div>
          <aside className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28 self-start">
            <div data-theme="dark" className="tone tone-grad rounded-[24px] p-7">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-6 grid gap-5">
                {["We read your enquiry and reply within two working days.", "A short call to understand what you need.", "A clear proposal and custom quote — no obligation."].map((t, i) => (
                  <li key={t} className="flex gap-4"><span className="num shrink-0">0{i + 1}</span><span className="text-[0.95rem]">{t}</span></li>
                ))}
              </ol>
            </div>
            <div className="rounded-[24px] border border-line bg-surface p-7">
              <p className="eyebrow">Direct</p>
              <ul className="mt-5 grid gap-3 text-[0.95rem]">
                <li className="flex items-center gap-3"><Mail size={17} className="text-text-2" aria-hidden />{isConfirmed(email) ? <a href={`mailto:${email}`} className="underline underline-offset-4 decoration-line-strong hover:decoration-text" data-event="email_click">{email}</a> : <span className="text-text-2">Email {email}</span>}</li>
                <li className="flex items-center gap-3"><MessageCircle size={17} className="text-text-2" aria-hidden />{isConfirmed(whatsapp) ? <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} className="inline-flex items-center gap-1 underline underline-offset-4 decoration-line-strong hover:decoration-text" data-event="whatsapp_click" rel="noopener">WhatsApp <ArrowUpRight size={14} aria-hidden /></a> : <span className="text-text-2">WhatsApp {whatsapp}</span>}</li>
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
