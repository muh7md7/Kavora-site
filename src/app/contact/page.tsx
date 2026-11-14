import { seo } from "@/lib/seo";
import type { Metadata } from "next";
import { pages } from "@/content/copy";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { isConfirmed, site } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { t } from "@/i18n";

export const metadata: Metadata = {
  title: t("Contact Keelbiz — Get a Custom Quote"),
  description: t("Tell Keelbiz what you need \u2014 one service or a complete solution. We reply with options and a custom quote."),
  ...seo("/contact/"),
};

export default function ContactPage() {
  const { email, phone, whatsapp } = site.contact;
  const c = pages.contact;
  const direct = [
    isConfirmed(whatsapp) && { href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`, label: "WhatsApp", Icon: MessageCircle, ev: "whatsapp_click" },
    isConfirmed(phone) && { href: `tel:${phone.replace(/[^\d+]/g, "")}`, label: phone, Icon: Phone, ev: "phone_click" },
    isConfirmed(email) && { href: `mailto:${email}`, label: email, Icon: Mail, ev: "email_click" },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof Mail; ev: string }[];
  return (
    <>
      <section data-theme="light" className="tone tone-grad has-grid hero-shell relative overflow-hidden pt-[108px] md:pt-[150px] pb-16 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute -top-40 end-[-10%] size-[620px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--c-steel-light)_45%,transparent),transparent)] blur-2xl" />
        <div className="container relative grid gap-10 lg:gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 lg:pt-10">
            <p className="eyebrow reveal-fade">{c.hero.eyebrow}</p>
            <h1 className="mt-6 reveal-fade !text-[clamp(2.4rem,1.6rem+3vw,4.4rem)] !leading-[1.02] !tracking-[-0.045em] max-w-[12ch]" style={{ animationDelay: "80ms" }}>
              {c.hero.title} <span className="accent">{c.hero.accent}</span>
            </h1>
            <p className="lead mt-6 reveal-fade max-w-[42ch]" style={{ animationDelay: "160ms" }}>{c.hero.lead}</p>
            <ol className="mt-10 grid gap-0 reveal-fade border-t border-line" style={{ animationDelay: "240ms" }}>
              {c.nextSteps.map((s, i) => (
                <li key={i} className="flex items-baseline gap-4 py-4 border-b border-line text-[0.95rem]">
                  <span className="num shrink-0">0{i + 1}</span><span>{s}</span>
                </li>
              ))}
            </ol>
            {direct.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {direct.map(({ href, label, Icon, ev }) => (
                  <a key={href} href={href} rel="noopener" data-event={ev} className="chip-btn !h-11 !px-4" dir="ltr"><Icon size={16} aria-hidden />{label}<ArrowUpRight size={14} className="text-text-2" aria-hidden /></a>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <div className="contact-card relative rounded-[calc(28px*var(--rs,1))] p-6 sm:p-9 md:p-11">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-[1.35rem] md:text-[1.6rem] font-[580] tracking-[-0.03em] leading-tight">{t("Start a project")}</p>
                  <p className="text-text-2 text-[0.92rem] mt-1.5">{t("Takes less than a minute.")}</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-line text-[0.78rem] text-text-2"><span className="size-2 rounded-full bg-[#4f9a7a] shadow-[0_0_0_4px_color-mix(in_srgb,#4f9a7a_18%,transparent)]" aria-hidden />{t("Taking new projects")}</span>
              </div>
              <EnquiryForm />
            </div>
            <p className="mt-5 text-[0.82rem] text-text-2 px-2">{c.goodToKnow.join(" · ")}</p>
          </div>
        </div>
      </section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }]} />
    </>
  );
}
