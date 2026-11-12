import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isConfirmed, nav, services, site } from "@/content/site";
import { LogoMark } from "@/components/brand/Logo";

/** Closing CTA + footer — charcoal, the final dark band. */
export function Footer() {
  const email = site.contact.email;
  const wa = site.contact.whatsapp;
  return (
    <footer data-theme="dark" className="tone tone-grad overflow-hidden">
      <section className="container pt-[clamp(96px,12vw,180px)] pb-20" aria-labelledby="cta-h">
        <p className="eyebrow">Start a project</p>
        <h2 id="cta-h" className="display mt-6 max-w-[14ch]">Let&apos;s build what&apos;s <span className="accent">next.</span></h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-end">
          <p className="lead lg:col-span-6">Tell us what you&apos;re building. We reply with questions, options and a clear next step — no pressure, no guarantees.</p>
          <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact/" className="btn btn-premium !min-h-14 !px-7" data-cursor="Start">Start a conversation <ArrowUpRight size={18} className="btn-arrow" aria-hidden /></Link>
            <Link href="/services/" className="btn btn-glass !min-h-14 !px-7">Explore services</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 py-16 border-t border-line">
          <div className="md:col-span-4">
            <LogoMark className="size-10 text-[#EEF0F2] [--logo-ink:#17191C] [--logo-keel:#4C6680]" />
            <p className="text-[0.95rem] text-text-2 mt-6 max-w-xs">{site.positioning}</p>
            <p className="num mt-4">UAE · GCC · Pakistan · Worldwide</p>
          </div>
          <nav aria-label="Services" className="md:col-span-3">
            <h3 className="num mb-5">Services</h3>
            <ul className="space-y-3 text-[0.95rem]">{services.map((s) => <li key={s.id}><Link href={`/services/${s.slug}/`} className="text-text-2 hover:text-text transition-colors">{s.name}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Company" className="md:col-span-2">
            <h3 className="num mb-5">Company</h3>
            <ul className="space-y-3 text-[0.95rem]">{nav.filter((l) => l.href !== "/services/").map((l) => <li key={l.href}><Link href={l.href} className="text-text-2 hover:text-text transition-colors">{l.label}</Link></li>)}</ul>
          </nav>
          <div className="md:col-span-3">
            <h3 className="num mb-5">Contact</h3>
            <ul className="space-y-3 text-[0.95rem]">
              <li>{isConfirmed(email) ? <a href={`mailto:${email}`} className="hover:text-accent" data-event="email_click">{email}</a> : <span className="text-text-2">Email {email}</span>}</li>
              <li>{isConfirmed(wa) ? <a href={`https://wa.me/${wa.replace(/\D/g, "")}`} className="hover:text-accent" data-event="whatsapp_click">WhatsApp</a> : <span className="text-text-2">WhatsApp {wa}</span>}</li>
              {Object.entries(site.socials).map(([k, v]) => (
                <li key={k}>{isConfirmed(v) ? <a href={v} rel="me noopener" className="capitalize hover:text-accent">{k}</a> : <span className="text-text-2 capitalize">{k} {v}</span>}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container select-none" aria-hidden>
        <div className="font-[620] tracking-[-0.07em] leading-[0.8] text-[clamp(5rem,22vw,20rem)] text-transparent [-webkit-text-stroke:1px_rgba(238,240,242,.14)] translate-y-[18%]">keelbiz</div>
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
