import Link from "next/link";
import { HeadText } from "./Tone";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { isConfirmed, services, site } from "@/content/site";
import { LogoMark, UploadedLogo } from "@/components/brand/Logo";
import { navigation, theme, type NavItem } from "@/content/builder";
import { FooterCtaGate } from "./FooterCtaGate";
import { PrefSwitches } from "@/components/glass/PrefSwitches";
import { t, isAr } from "@/i18n";

const linkCls = "foot-link";
const FootLink = ({ l }: { l: NavItem }) => /^(https?:|mailto:|tel:)/.test(l.href)
  ? <a href={l.href} rel="noopener" className={linkCls}>{l.label}</a>
  : <Link href={l.href} className={linkCls}>{l.label}</Link>;

/** Footer v7 — dark stage: statement + orbit button, hairline link grid, gradient wordmark, utility bar. */
export function Footer() {
  const { email, phone, whatsapp: wa } = site.contact;
  const ft = site.footer;
  const nf = navigation.footer;
  const showSvc = nf.showServices || nf.servicesExtra.length > 0;
  const socials = Object.entries(site.socials).filter(([, v]) => isConfirmed(v));
  const ring = "Start a project · Start a project · ";
  return (
    <footer data-theme="dark" className="site-footer tone relative overflow-hidden">
      <div aria-hidden className="foot-glow" />
      <div aria-hidden className="foot-grid" />
      {nf.showCta && <FooterCtaGate>
        <section className="container relative pt-[clamp(56px,7vw,104px)] pb-10 md:pb-12" aria-labelledby="cta-h">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="eyebrow">{ft.eyebrow}</p>
              <h2 id="cta-h" className="mt-4 max-w-[16ch] !text-[clamp(2.1rem,1.4rem+2.6vw,3.9rem)] !leading-[1.02] !tracking-[-0.045em]"><HeadText h={ft} /></h2>
              <p className="lead mt-4 max-w-[44ch] !text-[1rem]">{ft.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3 md:hidden">
                <Link href="/contact/" className="btn btn-premium !min-h-[52px] !px-6">{ft.primaryButton} <ArrowUpRight size={18} className="btn-arrow" aria-hidden /></Link>
              </div>
            </div>
            <Link href="/contact/" className="orbit-btn hidden md:inline-flex shrink-0" aria-label={ft.primaryButton} data-magnetic>
              <svg viewBox="0 0 200 200" className="orbit-ring" aria-hidden>
                <defs><path id="orbit-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
                <text direction="ltr"><textPath href="#orbit-path" textLength={isAr ? undefined : 486} lengthAdjust={isAr ? undefined : "spacingAndGlyphs"}>{ring}</textPath></text>
              </svg>
              <span className="orbit-core"><ArrowUpRight size={30} aria-hidden /></span>
            </Link>
          </div>
        </section>
      </FooterCtaGate>}

      <div className="container relative">
        <div className="foot-panel grid gap-x-8 gap-y-8 grid-cols-2 md:grid-cols-12 p-6 md:p-8">
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              {theme.brand.logo ? <UploadedLogo dark /> : <LogoMark className="size-10 shrink-0 text-[var(--c-paper)] [--logo-ink:var(--c-ink)] [--logo-keel:var(--c-steel-text)]" />}
              <span className="text-[1.3rem] font-[620] tracking-[-0.04em]">{site.brand.toLowerCase()}</span>
            </div>
            <p className="text-[0.92rem] text-text-2 max-w-[34ch]">{site.positioning}</p>
            <span className="inline-flex items-center gap-2 text-[0.8rem] text-text-2"><span className="size-2 rounded-full bg-[#6fbf9a] shadow-[0_0_0_4px_rgba(111,191,154,.15)]" aria-hidden />{t("Taking new projects")}</span>
          </div>
          {showSvc && <nav aria-label={nf.servicesTitle} className="col-span-1 md:col-span-3">
            <h3 className="foot-h">{nf.servicesTitle}</h3>
            <ul className="space-y-2.5">
              {nf.showServices && services.map((s) => <li key={s.id}><Link href={`/services/${s.slug}/`} className={linkCls}>{s.name}</Link></li>)}
              {nf.servicesExtra.map((l) => <li key={l.href + l.label}><FootLink l={l} /></li>)}
            </ul>
          </nav>}
          <div className="col-span-1 md:col-span-5 grid gap-10 md:grid-cols-2 content-start">
            {nf.company.length > 0 && <nav aria-label={nf.companyTitle}>
              <h3 className="foot-h">{nf.companyTitle}</h3>
              <ul className="space-y-2.5">{nf.company.map((l) => <li key={l.href + l.label}><FootLink l={l} /></li>)}</ul>
            </nav>}
            {nf.showContact && <div>
              <h3 className="foot-h">{nf.contactTitle}</h3>
              <ul className="space-y-2.5">
                {isConfirmed(email) && <li><a href={`mailto:${email}`} className={`${linkCls} whitespace-nowrap text-[0.86rem]`} data-event="email_click" dir="ltr">{email}</a></li>}
                {isConfirmed(phone) && <li><a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={linkCls} data-event="phone_click" dir="ltr">{phone}</a></li>}
                {isConfirmed(wa) && <li><a href={`https://wa.me/${wa.replace(/\D/g, "")}`} className={linkCls} data-event="whatsapp_click" rel="noopener">{t("WhatsApp")}</a></li>}
                <li><Link href="/contact/" className={linkCls}>{t("Send a message")}</Link></li>
                {socials.map(([k, v]) => <li key={k}><a href={v} rel="me noopener" className={`capitalize ${linkCls}`}>{k}</a></li>)}
              </ul>
            </div>}
          </div>
        </div>
      </div>

      {nf.showWordmark && <div className="relative select-none overflow-hidden" aria-hidden>
        <div className="foot-wordmark">{site.brand.toLowerCase()}</div>
      </div>}

      <div className="relative border-t border-line">
        <div className="container py-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.8rem] text-text-2">
          <span>© {new Date().getFullYear()} {site.brand}</span>
          {nf.legal.map((l) => <Link key={l.href + l.label} href={l.href} className="hover:text-text transition-colors">{l.label}</Link>)}
          <div className="ms-auto flex items-center gap-2">
            <PrefSwitches />
            <a href="#main" className="size-10 rounded-full border border-line inline-flex items-center justify-center hover:bg-surface-strong hover:text-text transition-colors" aria-label={t("Back to top")}><ArrowUp size={16} aria-hidden /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
