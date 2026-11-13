import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isConfirmed, nav, services, site } from "@/content/site";
import { LogoMark } from "@/components/brand/Logo";
import { Newsletter } from "./Newsletter";

/** Closing CTA + footer — charcoal, the final dark band. */
export function Footer() {
  const email = site.contact.email;
  const wa = site.contact.whatsapp;
  return (
    <footer data-theme="dark" className="tone tone-grad overflow-hidden">
      <section className="container pt-[clamp(96px,12vw,180px)] pb-20" aria-labelledby="cta-h">
        <p className="eyebrow">Start a Project</p>
        <h2 id="cta-h" className="display mt-6 max-w-[13ch]">Let&apos;s build what&apos;s <span className="accent u-draw">next.</span></h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-end">
          <p className="lead lg:col-span-6">One service or a complete solution — tell us what you need and we&apos;ll reply with options and a custom quote.</p>
          <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact/" className="b b-primary b-lg" data-magnetic>Start a conversation <ArrowUpRight size={17} className="b-arrow" aria-hidden /></Link>
            <Link href="/services/" className="b b-secondary b-lg">Explore services</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 py-16 border-t border-line">
          <div className="md:col-span-4">
            <LogoMark className="size-10 text-[#F7F8F6] [--logo-ink:#11191E] [--logo-keel:#4F6673]" />
            <p className="text-[0.95rem] text-text-2 mt-6 max-w-xs">{site.positioning}</p>
            <p className="num mt-4">One service or a complete solution</p>
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
        <div className="border-t border-line py-10 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5"><Newsletter /></div>
          <p className="lg:col-span-7 lg:text-right text-[0.85rem] text-text-2 lg:pt-1">
            We never sell or share your details. See the <Link href="/legal/privacy/" className="underline underline-offset-2 hover:text-text">privacy policy</Link>.
          </p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container select-none" aria-hidden>
        <div className="wordmark font-[620] tracking-[-0.07em] leading-[0.8] text-[clamp(5rem,22vw,20rem)] text-transparent [-webkit-text-stroke:1px_rgba(238,240,242,.14)] translate-y-[18%]">keelbiz</div>
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
