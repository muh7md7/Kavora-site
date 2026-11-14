import Link from "next/link";
import { HeadText } from "./Tone";
import { ArrowUpRight } from "lucide-react";
import { isConfirmed, services, site } from "@/content/site";
import { LogoMark, UploadedLogo } from "@/components/brand/Logo";
import { navigation, theme, type NavItem } from "@/content/builder";
import { FooterCtaGate } from "./FooterCtaGate";

const linkCls = "text-text-2 hover:text-text transition-colors";
const FootLink = ({ l }: { l: NavItem }) => /^(https?:|mailto:|tel:)/.test(l.href)
  ? <a href={l.href} rel="noopener" className={linkCls}>{l.label}</a>
  : <Link href={l.href} className={linkCls}>{l.label}</Link>;

/** Closing CTA + footer — compact: two link columns on phones, four on desktop. */
export function Footer() {
  const { email, phone, whatsapp: wa } = site.contact;
  const ft = site.footer;
  const nf = navigation.footer; // admin panel → 🧭 Menu & footer
  const showSvc = nf.showServices || nf.servicesExtra.length > 0;
  const socials = Object.entries(site.socials).filter(([, v]) => isConfirmed(v));
  return (
    <footer data-theme="dark" className="tone tone-grad overflow-hidden">
      {nf.showCta && <FooterCtaGate>
        <section className="container pt-[clamp(64px,9vw,140px)] pb-12 md:pb-16" aria-labelledby="cta-h">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">{ft.eyebrow}</p>
              <h2 id="cta-h" className="display mt-5 max-w-[14ch]"><HeadText h={ft} /></h2>
              <p className="lead mt-6 max-w-[46ch]">{ft.lead}</p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact/" className="btn btn-premium !min-h-[52px] !px-6" data-magnetic>{ft.primaryButton} <ArrowUpRight size={18} className="btn-arrow" aria-hidden /></Link>
              <Link href="/services/" className="btn btn-glass !min-h-[52px] !px-6">{ft.secondaryButton}</Link>
            </div>
          </div>
        </section>
      </FooterCtaGate>}

      <div className="container">
        <div className="grid gap-x-8 gap-y-9 grid-cols-2 md:grid-cols-12 py-10 md:py-14 border-t border-line text-[0.92rem]">
          <div className="col-span-2 md:col-span-4 flex items-start gap-4 md:block">
            {theme.brand.logo ? <UploadedLogo dark /> : <LogoMark className="size-9 shrink-0 text-[var(--c-paper)] [--logo-ink:var(--c-ink)] [--logo-keel:var(--c-steel-text)]" />}
            <p className="text-[0.92rem] text-text-2 md:mt-5 max-w-xs">{site.positioning}</p>
          </div>
          {showSvc && <nav aria-label={nf.servicesTitle} className="col-span-1 md:col-span-3">
            <h3 className="num mb-4">{nf.servicesTitle}</h3>
            <ul className="space-y-2.5">
              {nf.showServices && services.map((s) => <li key={s.id}><Link href={`/services/${s.slug}/`} className={linkCls}>{s.name}</Link></li>)}
              {nf.servicesExtra.map((l) => <li key={l.href + l.label}><FootLink l={l} /></li>)}
            </ul>
          </nav>}
          <div className="col-span-1 md:col-span-5 grid gap-9 md:grid-cols-2 content-start">
            {nf.company.length > 0 && <nav aria-label={nf.companyTitle}>
              <h3 className="num mb-4">{nf.companyTitle}</h3>
              <ul className="space-y-2.5">{nf.company.map((l) => <li key={l.href + l.label}><FootLink l={l} /></li>)}</ul>
            </nav>}
            {nf.showContact && <div>
              <h3 className="num mb-4">{nf.contactTitle}</h3>
              <ul className="space-y-2.5">
                {isConfirmed(email) && <li><a href={`mailto:${email}`} className={`${linkCls} break-all`} data-event="email_click">{email}</a></li>}
                {isConfirmed(phone) && <li><a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={linkCls} data-event="phone_click">{phone}</a></li>}
                {isConfirmed(wa) && <li><a href={`https://wa.me/${wa.replace(/\D/g, "")}`} className={linkCls} data-event="whatsapp_click" rel="noopener">WhatsApp</a></li>}
                <li><Link href="/contact/" className={linkCls}>Send an enquiry</Link></li>
                {socials.map(([k, v]) => <li key={k}><a href={v} rel="me noopener" className={`capitalize ${linkCls}`}>{k}</a></li>)}
              </ul>
            </div>}
          </div>
        </div>
      </div>

      {/* Oversized wordmark — desktop only */}
      {nf.showWordmark && <div className="container select-none hidden md:block" aria-hidden>
        <div className="font-[620] tracking-[-0.07em] leading-[0.8] text-[clamp(5rem,16vw,15rem)] text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--c-stone)_14%,transparent)] translate-y-[18%]">{site.brand.toLowerCase()}</div>
      </div>}

      <div className="border-t border-line relative bg-bg">
        <div className="container py-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-text-2">
          <span>© {new Date().getFullYear()} {site.brand}</span>
          {nf.legal.map((l) => <Link key={l.href + l.label} href={l.href} className="hover:text-text">{l.label}</Link>)}
          <a href="#main" className="ml-auto hover:text-text">Top ↑</a>
        </div>
      </div>
    </footer>
  );
}
