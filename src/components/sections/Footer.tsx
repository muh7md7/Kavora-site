import Link from "next/link";
import { isConfirmed, nav, services, site } from "@/content/site";
import { Button } from "@/components/glass/Button";

/** Final CTA (midnight band, single midnight-glass panel) + footer. The only deep-toned moment. */
export function Footer() {
  const email = site.contact.email;
  const wa = site.contact.whatsapp;
  return (
    <footer className="bg-midnight on-midnight text-ivory">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/backdrops/dusk-1.svg')] bg-cover bg-center opacity-70" aria-hidden />
        <div className="container section relative">
          <div className="glass-smoke rounded-lg p-8 md:p-14 max-w-3xl">
            <h2 className="display">Let&apos;s Build <span className="accent">What&apos;s Next.</span></h2>
            <p className="lead !text-ivory/80 mt-4">Tell us what you&apos;re building. We&apos;ll reply with questions, options and a clear next step.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/" variant="premium">Start a Conversation</Button>
              <Button href="/services/" variant="ghost">Explore services</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] border-t border-white/10">
        <div>
          <div className="font-display font-bold text-2xl flex items-center gap-2"><span className="inline-block size-2.5 rounded-full bg-champagne-light" aria-hidden />{site.brand}</div>
          <p className="text-sm text-ivory/75 mt-3 max-w-xs">{site.positioning}</p>
          <p className="text-xs text-ivory/50 mt-3">{site.market}</p>
        </div>
        <nav aria-label="Services">
          <h3 className="text-sm font-semibold !font-sans text-champagne-light mb-3">Services</h3>
          <ul className="space-y-2 text-sm">{services.map((s) => <li key={s.id}><Link href={`/services/${s.slug}/`} className="hover:text-champagne-light">{s.name}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Pages">
          <h3 className="text-sm font-semibold !font-sans text-champagne-light mb-3">Pages</h3>
          <ul className="space-y-2 text-sm">{nav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-champagne-light">{l.label}</Link></li>)}</ul>
        </nav>
        <div>
          <h3 className="text-sm font-semibold !font-sans text-champagne-light mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>{isConfirmed(email) ? <a href={`mailto:${email}`} className="hover:text-champagne-light" data-event="email_click">{email}</a> : <span className="text-ivory/50">Email: {email}</span>}</li>
            <li>{isConfirmed(wa) ? <a href={`https://wa.me/${wa.replace(/\D/g, "")}`} className="hover:text-champagne-light" data-event="whatsapp_click">WhatsApp</a> : <span className="text-ivory/50">WhatsApp: {wa}</span>}</li>
            {Object.entries(site.socials).map(([k, v]) => (
              <li key={k}>{isConfirmed(v) ? <a href={v} rel="me noopener" className="hover:text-champagne-light capitalize">{k}</a> : <span className="text-ivory/50 capitalize">{k}: {v}</span>}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container py-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ivory/60">
        <span>© {new Date().getFullYear()} {site.brand}. All rights reserved.</span>
        <Link href="/legal/privacy/" className="hover:text-champagne-light">Privacy</Link>
        <Link href="/legal/terms/" className="hover:text-champagne-light">Terms</Link>
        <Link href="/legal/cookies/" className="hover:text-champagne-light">Cookies</Link>
      </div>
    </footer>
  );
}
