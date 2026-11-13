import type { Metadata } from "next";
import { CalendarDays, Clock, Mail, MessageCircle } from "lucide-react";
import { Tone } from "@/components/sections/Tone";
import { Wizard } from "@/components/contact/Wizard";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { isConfirmed, site, thirdPartyNote, ogImage } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact — start a project",
  description: "Tell Keelbiz what you need — one service, several, a complete solution or a custom AI agent. Five quick steps; we reply with questions and a custom quote.",
  alternates: { canonical: "/contact/" },
  openGraph: ogImage("contact"),
};

const next = [
  { t: "We read it", d: "A real person reviews your answers — no auto-sales sequence." },
  { t: "We reply", d: "Questions, ideas or a suggested starting point." },
  { t: "Short call", d: "Fifteen to thirty minutes to understand the goal." },
  { t: "Proposal", d: "A clear scope and custom quote. No obligation." },
];

function Direct({ icon: Icon, label, href, value }: { icon: typeof Mail; label: string; href?: string; value: string }) {
  const ok = isConfirmed(value);
  const inner = (
    <>
      <span className="size-10 rounded-full border border-line-strong grid place-items-center shrink-0"><Icon size={17} aria-hidden /></span>
      <span className="min-w-0"><span className="block text-sm font-[550]">{label}</span>
        <span className="block text-xs text-text-2 truncate">{ok ? value : "[PLACEHOLDER] add when confirmed"}</span></span>
    </>
  );
  return ok && href
    ? <a href={href} rel="noopener" className="flex items-center gap-3 rounded-[14px] p-2.5 -mx-2.5 hover:bg-surface-strong transition-colors min-h-11">{inner}</a>
    : <div className="flex items-center gap-3 p-2.5 -mx-2.5 opacity-70" aria-disabled>{inner}</div>;
}

export default function ContactPage() {
  const { email, whatsapp } = site.contact;
  return (
    <>
      <Tone grad className="pt-[clamp(120px,12vw,170px)] pb-[clamp(64px,8vw,120px)] overflow-hidden">
        <div className="container">
          <div className="max-w-[56rem]">
            <p className="eyebrow rv-auto">Contact · five quick steps</p>
            <SplitHeading as="h1" auto underline text="Tell us what you're" accent="building." className="mt-6" />
            <p className="lead mt-6 rv-auto" style={{ ["--rv-delay" as string]: "260ms" }}>One service, several, or a complete solution. Pick a few options, add a few lines — we reply with questions and a custom quote.</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-8 rv-auto" style={{ ["--rv-delay" as string]: "320ms" }}><Wizard /></div>

            <aside className="lg:col-span-4 lg:sticky lg:top-24 grid gap-4" aria-label="What happens next">
              <div data-theme="dark" className="tone grain rounded-[24px] p-7 overflow-hidden">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">What happens next</p>
                  <span className="tag !min-h-7 !text-[11px] !bg-transparent"><Clock size={12} aria-hidden />Reply in 2 working days</span>
                </div>
                <ol className="mt-7 relative grid gap-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-line-strong">
                  {next.map((n, i) => (
                    <li key={n.t} className="relative flex gap-4">
                      <span className="relative z-10 size-6 rounded-full border border-line-strong bg-bg grid place-items-center font-mono text-[10px] shrink-0">{i + 1}</span>
                      <span><span className="block font-[550] text-[.95rem]">{n.t}</span><span className="block text-sm text-text-2 mt-0.5">{n.d}</span></span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="card p-6">
                <p className="eyebrow">Prefer to talk?</p>
                <div className="mt-4 grid gap-1">
                  <Direct icon={MessageCircle} label="WhatsApp" value={whatsapp} href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} />
                  <Direct icon={Mail} label="Email" value={email} href={`mailto:${email}`} />
                  <Direct icon={CalendarDays} label="Book a call" value={site.features.bookingEmbed ? "Pick a time" : ""} href="#book" />
                </div>
              </div>
              <ul className="px-2 grid gap-2 text-[.85rem] text-text-2">
                <li>· No budget required to enquire.</li>
                <li>· Custom quote — no public price list.</li>
                <li>· {thirdPartyNote}</li>
              </ul>
            </aside>
          </div>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }]} />
    </>
  );
}
