"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { nav, services } from "@/content/site";
import { spring, dur, easeOut } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { ServiceGlyph } from "./ServiceGlyph";

export type NavLink = { label: string; href: string; mega?: boolean };

type Props = {
  links?: readonly NavLink[];
  brand?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onOpenMobile?: () => void;
  /** Lab/capture: render in-flow instead of fixed */
  inline?: boolean;
};

/**
 * Floating Glass Navbar — centred pill; sliding hover/active indicator (shared layoutId);
 * Services opens a glass mega-panel (menu button pattern); denser after 24px scroll.
 */
export function GlassNavbar({ links = nav, brand = "Keelbiz", ctaLabel = "Let's Talk", ctaHref = "/contact/", onOpenMobile, inline }: Props) {
  const pathname = usePathname() ?? "/";
  const [dense, setDense] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inline) return;
    const onScroll = () => setDense(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [inline]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setMegaOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [megaOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const indicatorOn = hover ?? links.find((l) => isActive(l.href))?.href ?? null;

  return (
    <div ref={wrapRef} className={cn(inline ? "relative" : "fixed inset-x-0 top-0 z-50", "flex justify-center px-4 pt-3 pointer-events-none")}>
      <motion.nav
        aria-label="Primary"
        className="glass pointer-events-auto rounded-pill flex items-center gap-2 pl-4 pr-2"
        animate={{ paddingTop: dense ? 4 : 8, paddingBottom: dense ? 4 : 8 }}
        transition={{ duration: dur.comp, ease: easeOut }}
      >
        <Link href="/" className="font-display font-bold text-lg tracking-tight text-ink flex items-center gap-2 mr-2" aria-label={`${brand} home`}>
          <span className="inline-block size-2.5 rounded-full bg-navy ring-2 ring-champagne/60" aria-hidden />
          {brand}
        </Link>

        <ul className="hidden lg:flex items-center relative" onMouseLeave={() => setHover(null)}>
          {links.map((l) => {
            const active = isActive(l.href);
            const common = "relative z-10 px-3.5 py-2 text-sm font-medium rounded-pill flex items-center gap-1 transition-colors";
            return (
              <li key={l.href} className="relative" onMouseEnter={() => setHover(l.href)}>
                {indicatorOn === l.href && (
                  <motion.span layoutId="nav-pill" transition={spring} className="absolute inset-0 rounded-pill bg-navy-tint" aria-hidden />
                )}
                {l.mega ? (
                  <button
                    type="button"
                    className={cn(common, active ? "text-navy" : "text-ink")}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    aria-controls={megaId}
                    onClick={() => setMegaOpen((v) => !v)}
                    onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setMegaOpen(true); } }}
                  >
                    {l.label}
                    <ChevronDown size={14} className={cn("transition-transform", megaOpen && "rotate-180")} aria-hidden />
                  </button>
                ) : (
                  <Link href={l.href} className={cn(common, active ? "text-navy" : "text-ink")} aria-current={active ? "page" : undefined}>
                    {l.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1">
          <Link href="/lab/" className="hidden md:inline-flex size-11 items-center justify-center rounded-pill text-ink hover:bg-navy-tint transition-colors" aria-label="Search the Lab">
            <Search size={18} aria-hidden />
          </Link>
          <Link href={ctaHref} className="btn btn-primary !min-h-10 !py-2">{ctaLabel}</Link>
          <button type="button" className="lg:hidden size-11 inline-flex items-center justify-center rounded-pill text-ink" aria-label="Open menu" onClick={onOpenMobile}>
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id={megaId}
            role="region"
            aria-label="Services"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: dur.comp, ease: easeOut }}
            className="glass pointer-events-auto absolute top-[72px] w-[min(920px,calc(100vw-32px))] rounded-lg p-3 grid grid-cols-5 gap-2"
          >
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}/`}
                onClick={() => setMegaOpen(false)}
                className="lift rounded-md p-3 hairline bg-ivory/70 hover:bg-white/80 flex flex-col gap-2 min-h-[132px]"
              >
                <ServiceGlyph id={s.id} />
                <span className="text-sm font-semibold leading-tight text-ink">{s.name}</span>
                <span className="chip chip-sage self-start">{s.flywheel}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
