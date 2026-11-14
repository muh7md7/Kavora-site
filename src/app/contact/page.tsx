import type { Metadata } from "next";
import { pages } from "@/content/copy";
import { ArrowUpRight, Clock, Mail, MessageCircle, Phone } from "lucide-react";
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
  const { email, phone, whatsapp } = site.contact;
  const anyDirect = isConfirmed(email) || isConfirmed(phone) || isConfirmed(whatsapp);
  const c = pages.contact;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} accent={c.hero.accent} lead={c.hero.lead} compact />
      <Tone tone="mist" className="section !pt-12 md:!pt-16">
        <div className="container grid gap-6 lg:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 card !bg-[linear-gradient(180deg,color-mix(in_srgb,var(--c-paper)_90%,transparent),color-mix(in_srgb,var(--c-paper)_70%,transparent))] p-6 sm:p-8 md:p-10">
            <EnquiryForm />
          </div>
          <aside className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28 self-start">
            <div data-theme="dark" className="card p-7 !bg-[radial-gradient(80%_70%_at_90%_0%,color-mix(in_srgb,var(--c-steel)_32%,transparent),transparent_60%),linear-gradient(165deg,var(--c-deep-3),var(--c-deep-2))] !border-transparent text-text">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-6 grid gap-5">
                {c.nextSteps.map((t, i) => (
                  <li key={t} className="flex gap-4"><span className="num shrink-0">0{i + 1}</span><span className="text-[0.95rem]">{t}</span></li>
                ))}
              </ol>
            </div>
            <div className="card p-7">
              <p className="eyebrow">{anyDirect ? "Prefer to talk?" : "Response time"}</p>
              <ul className="mt-5 grid gap-3.5 text-[0.95rem]">
                {isConfirmed(whatsapp) && <li><a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} className="flex items-center gap-3 hover:text-text" data-event="whatsapp_click" rel="noopener"><span className="size-9 rounded-full border border-line inline-flex items-center justify-center" aria-hidden><MessageCircle size={16} /></span>WhatsApp <ArrowUpRight size={14} className="text-text-2" aria-hidden /></a></li>}
                {isConfirmed(phone) && <li><a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 hover:text-text" data-event="phone_click"><span className="size-9 rounded-full border border-line inline-flex items-center justify-center" aria-hidden><Phone size={16} /></span>{phone}</a></li>}
                {isConfirmed(email) && <li><a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-text break-all" data-event="email_click"><span className="size-9 shrink-0 rounded-full border border-line inline-flex items-center justify-center" aria-hidden><Mail size={16} /></span>{email}</a></li>}
                <li className="flex items-center gap-3 text-text-2"><span className="size-9 shrink-0 rounded-full border border-line inline-flex items-center justify-center" aria-hidden><Clock size={16} /></span>Reply within two working days</li>
              </ul>
            </div>
            <div className="card p-7">
              <p className="eyebrow">Good to know</p>
              <ul className="mt-5 grid gap-3 text-[0.92rem] text-text-2">
                {c.goodToKnow.map((t) => <li key={t}>{t}</li>)}
                <li>{thirdPartyNote}</li>
              </ul>
            </div>
            {site.features.bookingEmbed && <div className="rounded-[calc(24px*var(--rs,1))] border border-line p-6 text-sm text-text-2">Booking embed goes here once configured.</div>}
          </aside>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }]} />
    </>
  );
}
