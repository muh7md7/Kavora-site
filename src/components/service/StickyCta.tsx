"use client";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { contactHref } from "@/content/enquiry";
import type { ServiceId } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Appears once the hero is behind you and hides again at the footer, so it never covers the final CTA.
 * Dismissible, and it stays dismissed for the page view.
 */
export function StickyCta({ id, label, cta }: { id: ServiceId; label: string; cta: string }) {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > window.innerHeight * 0.9 && y < max - 520);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  if (closed) return null;
  return (
    <div aria-hidden={!show} className={cn("fixed inset-x-0 bottom-0 z-40 pointer-events-none px-3 pb-3 safe-bottom transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]", !show && "translate-y-[140%]")}>
      <div data-theme="dark" className="panel pointer-events-auto mx-auto max-w-[var(--content-max)] !rounded-[18px] px-4 sm:px-5 py-3 flex items-center gap-4">
        <p className="min-w-0 flex-1 text-[0.92rem] leading-snug">
          <span className="font-[550] truncate">{label}</span>
          <span className="hidden sm:inline text-text-2"> · custom quote, no obligation</span>
        </p>
        <Link href={contactHref({ services: [id] })} className="b b-primary b-sm shrink-0" tabIndex={show ? 0 : -1}>
          {cta}<ArrowRight size={15} className="b-arrow-r" aria-hidden />
        </Link>
        <button type="button" onClick={() => setClosed(true)} aria-label="Dismiss" tabIndex={show ? 0 : -1}
          className="size-9 grid place-items-center rounded-full text-text-2 hover:text-text shrink-0"><X size={15} aria-hidden /></button>
      </div>
    </div>
  );
}
