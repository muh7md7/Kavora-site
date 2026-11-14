import Link from "next/link";
import { HeadText } from "./Tone";
import { ArrowUpRight } from "lucide-react";
import { isConfirmed, services, site } from "@/content/site";
import { LogoMark, UploadedLogo } from "@/components/brand/Logo";
import { navigation, theme, type NavItem } from "@/content/builder";

const FootLink = ({ l }: { l: NavItem }) => /^(https?:|mailto:|tel:)/.test(l.href)
  ? <a href={l.href} rel="noopener" className="text-text-2 hover:text-text transition-colors">{l.label}</a>
  : <Link href={l.href} className="text-text-2 hover:text-text transition-colors">{l.label}</Link>;

/** Closing CTA + footer — charcoal, the final dark band. */
export function Footer() {
  const email = site.contact.email;
  const wa = site.contact.whatsapp;
  const ft = site.footer;
  const nf = navigation.footer; // admin panel → 🧭 Menu & footer
  const cols = [nf.showServices || nf.servicesExtra.length, nf.company.length, nf.showContact].filter(Boolean).length;
  return (
    <footer data-theme="dark" className={`tone tone-grad overflow-hidden ${nf.showCta ? "" : "pt-12"}`}>
      {nf.showCta && <section className="container pt-[clamp(96px,12vw,180px)] pb-20" aria-labelledby="cta-h">
        <p className="eyebrow">{ft.eyebrow}</p>
        <h2 id="cta-h" className="display mt-6 max-w-[14ch]"><HeadText h={ft} /></h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-end">
          <p className="lead lg:col-span-6">{ft.lead}</p>
          <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact/" className="btn btn-premium !min-h-14 !px-7" data-magnetic>{ft.primaryButton} <ArrowUpRight size={18} className="btn-arrow" aria-hidden /></Link>
            <Link href="/services/" className="btn btn-glass !min-h-14 !px-7">{ft.secondaryButton}</Link>
          </div>
        </div>
      </section>}

      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 py-16 border-t border-line">
          <div className="md:col-span-4">
            {theme.brand.logo ? <UploadedLogo dark /> : <LogoMark className="size-10 text-[var(--c-paper)] [--logo-ink:var(--c-ink)] [--logo-keel:var(--c-steel-text)]" />}
            <p className="text-[0.95rem] text-text-2 mt-6 max-w-xs">{site.positioning}</p>
            <p className="num mt-4">{ft.tagline}</p>
          </div>
          <div className={`md:col-span-8 grid gap-12 ${cols === 3 ? "sm:grid-cols-[3fr_2fr_3fr]" : cols === 2 ? "sm:grid-cols-2" : ""}`}>
          {(nf.showServices || nf.servicesExtra.length > 0) && <nav aria-label={nf.servicesTitle}>
            <h3 className="num mb-5">{nf.servicesTitle}</h3>
            <ul className="space-y-3 text-[0.95rem]">{nf.showServices && services.map((s) => <li key={s.id}><Link href={`/services/${s.slug}/`} className="text-text-2 hover:text-text transition-colors">{s.name}</Link></li>)}
              {nf.servicesExtra.map((l) => <li key={l.href + l.label}><FootLink l={l} /></li>)}</ul>
          </nav>}
          {nf.company.length > 0 && <nav aria-label={nf.companyTitle}>
            <h3 className="num mb-5">{nf.companyTitle}</h3>
            <ul className="space-y-3 text-[0.95rem]">{nf.company.map((l) => <li key={l.href + l.label}><FootLink l={l} /></li>)}</ul>
          </nav>}
          {nf.showContact && <div>
            <h3 className="num mb-5">{nf.contactTitle}</h3>
            <ul className="space-y-3 text-[0.95rem]">
              <li><Link href="/contact/" className="text-text-2 hover:text-text transition-colors">Send an enquiry</Link></li>
              {isConfirmed(email) && <li><a href={`mailto:${email}`} className="text-text-2 hover:text-text transition-colors" data-event="email_click">{email}</a></li>}
              {isConfirmed(wa) && <li><a href={`https://wa.me/${wa.replace(/\D/g, "")}`} className="text-text-2 hover:text-text transition-colors" data-event="whatsapp_click" rel="noopener">WhatsApp</a></li>}
              {Object.entries(site.socials).filter(([, v]) => isConfirmed(v)).map(([k, v]) => (
                <li key={k}><a href={v} rel="me noopener" className="capitalize text-text-2 hover:text-text transition-colors">{k}</a></li>
              ))}
            </ul>
          </div>}
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      {nf.showWordmark && <div className="container select-none" aria-hidden>
        <div className="font-[620] tracking-[-0.07em] leading-[0.8] text-[clamp(5rem,22vw,20rem)] text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--c-stone)_14%,transparent)] translate-y-[18%]">{site.brand.toLowerCase()}</div>
      </div>}

      <div className="border-t border-line relative bg-bg">
        <div className="container py-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-text-2">
          <span>© {new Date().getFullYear()} {site.brand}. All rights reserved.</span>
          {nf.legal.map((l) => <Link key={l.href + l.label} href={l.href} className="hover:text-text">{l.label}</Link>)}
          <a href="#main" className="ml-auto hover:text-text">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
