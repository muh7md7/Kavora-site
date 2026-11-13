import type { Metadata } from "next";
import { pages } from "@/content/copy";
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
                {c.goodToKnow.map((t) => <li key={t}>{t}</li>)}
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
