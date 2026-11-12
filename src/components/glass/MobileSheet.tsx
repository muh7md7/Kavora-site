"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { nav, services } from "@/content/site";
import { Logo } from "@/components/brand/Logo";

type Props = { open: boolean; onClose: () => void; ctaHref?: string; ctaLabel?: string };

/**
 * Mobile menu (v2) — full-screen charcoal sheet with staggered links.
 * Dialog pattern: focus trap, Esc closes, body scroll lock, focus restored, CTA pinned with safe-area padding.
 */
export function MobileSheet({ open, onClose, ctaHref = "/contact/", ctaLabel = "Start a project" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = focusables(); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); lastFocus.current?.focus(); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Menu" data-theme="dark"
      className="sheet-enter fixed inset-0 z-[60] lg:hidden flex flex-col tone tone-grad safe-bottom">
      <div className="flex items-center justify-between h-[88px] px-5">
        <Link href="/" onClick={onClose} aria-label="Keelbiz — home"><Logo markClassName="[--logo-ink:#17191C] text-[#EEF0F2]" /></Link>
        <button type="button" onClick={onClose} className="size-11 inline-flex items-center justify-center rounded-pill border border-line" aria-label="Close menu"><X size={20} aria-hidden /></button>
      </div>
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5">
        <ul>
          {nav.map((l, i) => (
            <li key={l.href} className="border-b border-line reveal-fade" style={{ animationDelay: `${60 + i * 45}ms` }}>
              <Link href={l.href} onClick={onClose} className="flex items-baseline gap-4 py-4">
                <span className="num">0{i + 1}</span>
                <span className="text-[2rem] font-[560] tracking-[-0.04em] leading-none">{l.label}</span>
              </Link>
              {l.mega === "services" && (
                <ul className="pb-4 pl-9 grid gap-1">
                  {services.map((s) => (
                    <li key={s.id}><Link href={`/services/${s.slug}/`} onClick={onClose} className="block py-2 text-[0.95rem] text-text-2">{s.name}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-5 pt-4">
        <Link href={ctaHref} onClick={onClose} className="btn btn-premium w-full !min-h-14">{ctaLabel}<ArrowUpRight size={18} aria-hidden /></Link>
      </div>
    </div>
  );
}
