import Link from "next/link";
import { HeadText } from "./Tone";
import { ArrowUpRight } from "lucide-react";
import { isConfirmed, nav, services, site } from "@/content/site";
import { LogoMark } from "@/components/brand/Logo";

/** Closing CTA + footer — charcoal, the final dark band. */
export function Footer() {
  const email = site.contact.email;
  const wa = site.contact.whatsapp;
  const ft = site.footer;
  return (
    <footer data-theme="dark" className="tone tone-grad overflow-hidden">
      <section className="container pt-[clamp(96px,12vw,180px)] pb-20" aria-labelledby="cta-h">
        <p className="eyebrow">{ft.eyebrow}</p>
        <h2 id="cta-h" className="display mt-6 max-w-[14ch]"><HeadText h={ft} /></h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-end">
          <p className="lead lg:col-span-6">{ft.lead}</p>
          <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact/" className="btn btn-premium !min-h-14 !px-7" data-magnetic>{ft.primaryButton} <ArrowUpRight size={18} className="btn-arrow" aria-hidden /></Link>
            <Link href="/services/" className="btn btn-glass !min-h-14 !px-7">{ft.secondaryButton}</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 py-16 border-t border-line">
          <div className="md:col-span-4">
            <LogoMark className="size-10 text-[var(--c-paper)] [--logo-ink:var(--c-ink)] [--logo-keel:var(--c-steel-text)]" />
            <p className="text-[0.95rem] text-text-2 mt-6 max-w-xs">{site.positioning}</p>
            <p className="num mt-4">{ft.tagline}</p>
          </div>
          <nav aria-label="Services" className="md:col-span-3">
            <h3 className="num mb-5">Services</h3>
            <ul className="space-y-3 text-[0.95rem]">{services.map((s) => <li key={s.id}><Link href={`/services/${s.slug}/`} className="text-text-2 hover:text-text transition-colors">{s.name}</Link></li>)}
              <li><Link href="/ai-solutions/" className="text-text-2 hover:text-text transition-colors">AI Solutions</Link></li>
              <li><Link href="/contact/?type=solution" className="text-text-2 hover:text-text transition-colors">Build your solution</Link></li></ul>
          </nav>
          <nav aria-label="Company" className="md:col-span-2">
            <h3 className="num mb-5">Company</h3>
            <ul className="space-y-3 text-[0.95rem]">{nav.filter((l) => l.href !== "/services/" && l.href !== "/").map((l) => <li key={l.href}><Link href={l.href} className="text-text-2 hover:text-text transition-colors">{l.label}</Link></li>)}</ul>
          </nav>
          <div className="md:col-span-3">
            <h3 className="num mb-5">Contact</h3>
            <ul className="space-y-3 text-[0.95rem]">
              <li><Link href="/contact/" className="text-text-2 hover:text-text transition-colors">Send an enquiry</Link></li>
              {isConfirmed(email) && <li><a href={`mailto:${email}`} className="text-text-2 hover:text-text transition-colors" data-event="email_click">{email}</a></li>}
              {isConfirmed(wa) && <li><a href={`https://wa.me/${wa.replace(/\D/g, "")}`} className="text-text-2 hover:text-text transition-colors" data-event="whatsapp_click" rel="noopener">WhatsApp</a></li>}
              {Object.entries(site.socials).filter(([, v]) => isConfirmed(v)).map(([k, v]) => (
                <li key={k}><a href={v} rel="me noopener" className="capitalize text-text-2 hover:text-text transition-colors">{k}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container select-none" aria-hidden>
        <div className="font-[620] tracking-[-0.07em] leading-[0.8] text-[clamp(5rem,22vw,20rem)] text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--c-stone)_14%,transparent)] translate-y-[18%]">keelbiz</div>
      </div>

      <div className="border-t border-line relative bg-bg">
        <div className="container py-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-text-2">
          <span>© {new Date().getFullYear()} {site.brand}. All rights reserved.</span>
          <Link href="/legal/privacy/" className="hover:text-text">Privacy</Link>
          <Link href="/legal/terms/" className="hover:text-text">Terms</Link>
          <Link href="/legal/cookies/" className="hover:text-text">Cookies</Link>
          <a href="#main" className="ml-auto hover:text-text">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
