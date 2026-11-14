"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { headerButton, isConfirmed, nav, services, site } from "@/content/site";
import { ServiceGlyph } from "./ServiceGlyph";
import { cn } from "@/lib/cn";
import { t } from "@/i18n";

type Props = { open: boolean; onClose: () => void; ctaHref?: string; ctaLabel?: string };

/**
 * Mobile menu — a calm card that drops in under the header (the header stays visible; its button turns into ✕).
 * Plain rows, Services as an accordion, one primary button. Focus trap, Esc, tap-outside, scroll lock, exit animation.
 */
export function MobileSheet({ open, onClose, ctaHref = headerButton.link, ctaLabel = headerButton.label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const [mounted, setMounted] = useState(open);
  const [svcOpen, setSvcOpen] = useState(false);
  const { email, phone, whatsapp } = site.contact;

  // Keep mounted through the exit animation.
  if (open && !mounted) setMounted(true);
  useEffect(() => {
    if (open || !mounted) return;
    const t = window.setTimeout(() => { setMounted(false); setSvcOpen(false); }, 200);
    return () => window.clearTimeout(t);
  }, [open, mounted]);

  // Close on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); if (open) onClose(); }

  useEffect(() => {
    if (!open) return;
    const lastFocus = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = focusables(); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1024) onClose(); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { html.style.overflow = prev; document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); lastFocus?.focus?.(); };
  }, [open, onClose]);

  if (!mounted) return null;
  const state = open ? "open" : "closed";
  const row = "flex items-center justify-between gap-3 min-h-[54px] px-4 rounded-[calc(14px*var(--rs,1))] text-[1.02rem] font-[550] tracking-[-0.015em] transition-colors active:bg-surface-strong";

  return (
    <div className="lg:hidden">
      {/* Backdrop — tap to close */}
      <button type="button" tabIndex={-1} aria-hidden onClick={onClose} data-state={state}
        className="m-backdrop fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--c-ink)_28%,transparent)] backdrop-blur-[3px] cursor-default" />
      <div ref={ref} id="mobile-menu" role="dialog" aria-modal="true" aria-label={t("Menu")} data-theme="light" data-state={state}
        className="m-panel fixed z-50 left-3 right-3 sm:left-4 sm:right-4 top-[80px] max-h-[calc(100dvh-96px)] overflow-y-auto overscroll-contain rounded-[calc(20px*var(--rs,1))] glass-menu border border-line shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--c-ink)_45%,transparent)] p-2">
        <nav aria-label={t("Mobile")}>
          <ul className="grid gap-0.5">
            {nav.map((l) => {
              const active = isActive(l.href);
              if (l.mega === "services") return (
                <li key={l.href}>
                  <button type="button" className={cn(row, "w-full", active ? "text-text" : "text-text-2")} aria-expanded={svcOpen} aria-controls="m-services" onClick={() => setSvcOpen((v) => !v)}>
                    {l.label}<ChevronDown size={18} className={cn("text-text-2 transition-transform duration-300", svcOpen && "rotate-180")} aria-hidden />
                  </button>
                  <div id="m-services" className={cn("grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,1,.36,1)]", svcOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <ul className="overflow-hidden min-h-0">
                      {services.map((s) => (
                        <li key={s.id}>
                          <Link href={`/services/${s.slug}/`} onClick={onClose} tabIndex={svcOpen ? 0 : -1} className="flex items-center gap-3 py-2.5 pl-4 pr-3 rounded-[calc(12px*var(--rs,1))] text-[0.95rem] text-text-2 active:bg-surface-strong">
                            <span className="scale-[.8] origin-left -mr-1.5"><ServiceGlyph id={s.id} /></span>{s.name}
                          </Link>
                        </li>
                      ))}
                      <li><Link href={l.href} onClick={onClose} tabIndex={svcOpen ? 0 : -1} className="flex items-center gap-2 py-3 pl-4 text-[0.9rem] font-[550] text-text">{t("All services")} <ArrowUpRight size={15} aria-hidden /></Link></li>
                    </ul>
                  </div>
                </li>
              );
              return (
                <li key={l.href}>
                  <Link href={l.href} onClick={onClose} aria-current={active ? "page" : undefined} className={cn(row, active ? "text-text bg-surface-strong" : "text-text-2")}>
                    {l.label}<ChevronRight size={17} className="text-text-2/70" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-2 pt-3 px-2 pb-2 border-t border-line">
          <Link href={ctaHref} onClick={onClose} className="btn btn-primary w-full !min-h-[52px] !justify-between !px-5">{ctaLabel}<ArrowUpRight size={18} aria-hidden /></Link>
          {(isConfirmed(email) || isConfirmed(phone) || isConfirmed(whatsapp)) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {isConfirmed(whatsapp) && <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} rel="noopener" className="chip-btn"><MessageCircle size={15} aria-hidden />{t("WhatsApp")}</a>}
              {isConfirmed(phone) && <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="chip-btn"><Phone size={15} aria-hidden />{t("Call")}</a>}
              {isConfirmed(email) && <a href={`mailto:${email}`} className="chip-btn"><Mail size={15} aria-hidden />{t("Email")}</a>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
