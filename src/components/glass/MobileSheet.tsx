"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { nav, services } from "@/content/site";

type Props = { open: boolean; onClose: () => void; ctaHref?: string; ctaLabel?: string };

/**
 * Mobile Glass Sheet — dialog pattern: focus trap, Esc closes, body scroll lock,
 * CTA pinned at the bottom with safe-area padding.
 */
export function MobileSheet({ open, onClose, ctaHref = "/contact/", ctaLabel = "Let's Talk" }: Props) {
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

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" className="absolute inset-0 bg-ink/20" aria-label="Close menu" onClick={onClose} />
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="sheet-enter glass absolute inset-x-3 bottom-3 rounded-lg p-4 flex flex-col max-h-[88dvh] safe-bottom"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-bold text-lg">Keelbiz</span>
              <button type="button" onClick={onClose} className="size-11 inline-flex items-center justify-center rounded-pill hover:bg-navy-tint" aria-label="Close menu"><X size={20} aria-hidden /></button>
            </div>
            <nav aria-label="Mobile" className="overflow-y-auto">
              <ul className="flex flex-col">
                {nav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={onClose} className="block py-3 text-lg font-medium border-b border-mist/70">{l.label}</Link>
                    {l.mega && (
                      <ul className="pl-3 py-1">
                        {services.map((s) => (
                          <li key={s.id}><Link href={`/services/${s.slug}/`} onClick={onClose} className="block py-2.5 text-sm text-slate">{s.name}</Link></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <Link href={ctaHref} onClick={onClose} className="btn btn-primary mt-4 w-full">{ctaLabel}</Link>
          </div>
        </div>
      )}
    </>
  );
}
