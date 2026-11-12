"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { nav, services } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { ServiceGlyph } from "./ServiceGlyph";
import { cn } from "@/lib/cn";

export type NavLink = { label: string; href: string; mega?: "services" | "lab" | boolean };

const labLinks = [
  { n: "01", label: "Glass Navbar", href: "/lab/navbar/" },
  { n: "02", label: "Glass Sidebar", href: "/lab/sidebar/" },
  { n: "03", label: "Navigation Tabs", href: "/lab/tabs/" },
  { n: "04", label: "Stat Cards & KPIs", href: "/lab/stat-card/" },
  { n: "05", label: "Gauge & Area Chart", href: "/lab/gauge/" },
  { n: "06", label: "Workflow Canvas", href: "/lab/workflow/" },
];

type Props = {
  links?: readonly NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  onOpenMobile?: () => void;
  /** Lab/capture: render in-flow instead of fixed */
  inline?: boolean;
};

/**
 * Floating full-glass header (v2).
 * — All primary links visible on desktop; Services and Lab open mega panels (hover-intent + click + keyboard).
 * — Adapts its tone to the section beneath it (reads [data-theme] under the header line).
 * — Hides on scroll down, returns on scroll up; hairline scroll-progress along the bottom edge.
 */
export function GlassNavbar({ links = nav, ctaLabel = "Start a project", ctaHref = "/contact/", onOpenMobile, inline }: Props) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState<null | "services" | "lab">(null);
  const [hover, setHover] = useState<string | null>(null);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ind, setInd] = useState<{ left: number; width: number } | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const panelId = useId();

  // Scroll: hide/show, tone detection, progress.
  useEffect(() => {
    if (inline) return;
    let last = window.scrollY; let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden((prev) => (y > 240 && y > last + 2 ? true : y < last - 2 ? false : prev));
      last = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const probe = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => el.closest("[data-theme]") && !el.closest("[data-site-header]"));
      setTone((probe?.closest("[data-theme]")?.getAttribute("data-theme") as "dark" | "light") ?? "light");
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [inline]);

  // Close on route change, Esc, outside click.
  useEffect(() => { setOpen(null); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); (wrapRef.current?.querySelector(`[data-mega="${open}"]`) as HTMLElement | null)?.focus(); } };
    const onDown = (e: MouseEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("keydown", onKey); document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const target = hover ?? links.find((l) => l.href !== "/" && isActive(l.href))?.href ?? null;
  useEffect(() => {
    const ul = listRef.current; if (!ul) return;
    const li = target ? ul.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;
    setInd(li ? { left: li.offsetLeft, width: li.offsetWidth } : null);
  }, [target, links]);

  const intent = useCallback((v: null | "services" | "lab", delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(v), delay);
  }, []);

  const megaOf = (l: NavLink) => (l.mega === true ? "services" : l.mega || null) as null | "services" | "lab";

  return (
    <div
      ref={wrapRef}
      data-site-header
      data-theme={tone}
      className={cn(
        inline ? "relative w-full" : "fixed inset-x-0 top-0 z-50",
        "pointer-events-none px-3 sm:px-4 pt-3 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] !bg-transparent",
        hidden && !open && !inline && "-translate-y-[130%]",
      )}
      onMouseLeave={() => intent(null, 180)}
    >
      <div className="mx-auto max-w-[var(--content-max)] relative">
        <nav
          aria-label="Primary"
          className={cn(
            "glass pointer-events-auto relative flex items-center h-16 pl-4 pr-2 sm:pl-5 rounded-[20px] transition-[box-shadow,background] duration-300",
            !scrolled && !inline && "shadow-none",
          )}
        >
          <Link href="/" className="mr-6 shrink-0 rounded-sm" aria-label="Keelbiz — home">
            <Logo />
          </Link>

          <ul ref={listRef} className="hidden lg:flex items-center relative mx-auto" onMouseLeave={() => setHover(null)}>
            <span className="pill-indicator" aria-hidden style={{ left: ind?.left ?? 0, width: ind?.width ?? 0, opacity: ind ? 1 : 0 }} />
            {links.map((l) => {
              const mega = megaOf(l);
              const active = isActive(l.href);
              const base = "relative z-10 h-11 px-4 inline-flex items-center gap-1.5 text-[0.92rem] font-[500] tracking-[-0.01em] rounded-pill transition-colors";
              return (
                <li key={l.href} data-href={l.href} onMouseEnter={() => { setHover(l.href); intent(mega, mega ? 90 : 160); }}>
                  {mega ? (
                    <button
                      type="button"
                      data-mega={mega}
                      className={cn(base, active || open === mega ? "text-text" : "text-text-2 hover:text-text")}
                      aria-expanded={open === mega}
                      aria-controls={`${panelId}-${mega}`}
                      onClick={() => setOpen((o) => (o === mega ? null : mega))}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") { e.preventDefault(); setOpen(mega); requestAnimationFrame(() => (document.querySelector(`#${CSS.escape(`${panelId}-${mega}`)} a`) as HTMLElement | null)?.focus()); }
                      }}
                    >
                      {l.label}
                      <ChevronDown size={14} className={cn("transition-transform duration-300", open === mega && "rotate-180")} aria-hidden />
                    </button>
                  ) : (
                    <Link href={l.href} className={cn(base, active ? "text-text" : "text-text-2 hover:text-text")} aria-current={active ? "page" : undefined}>
                      {l.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="ml-auto lg:ml-6 flex items-center gap-1.5">
            <Link href={ctaHref} className="btn btn-primary !min-h-11 !px-5 !text-[0.875rem] hidden sm:inline-flex" data-cursor="Talk">
              {ctaLabel}<ArrowUpRight size={16} className="btn-arrow" aria-hidden />
            </Link>
            <button type="button" className="lg:hidden size-11 inline-flex items-center justify-center rounded-pill text-text hover:bg-surface-strong" aria-label="Open menu" onClick={onOpenMobile}>
              <Menu size={20} aria-hidden />
            </button>
          </div>

          {!inline && <span ref={progressRef} className="absolute left-5 right-5 bottom-0 h-px origin-left bg-accent/70" style={{ transform: "scaleX(0)" }} aria-hidden />}
        </nav>

        {/* Mega panels */}
        {open === "services" && (
          <div id={`${panelId}-services`} role="region" aria-label="Services" onMouseEnter={() => intent("services", 0)}
            className="panel-enter glass glass-menu pointer-events-auto absolute left-0 right-0 top-[76px] rounded-[20px] p-3 grid lg:grid-cols-12 gap-3">
            <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-1">
              {services.map((s, i) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}/`} className="group flex gap-4 rounded-[14px] p-4 hover:bg-surface-strong transition-colors h-full">
                    <ServiceGlyph id={s.id} />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2"><span className="num">0{i + 1}</span><span className="font-[550] text-[0.95rem] tracking-[-0.015em] text-text">{s.name}</span></span>
                      <span className="block text-[0.85rem] text-text-2 mt-1 leading-snug">{s.short}</span>
                    </span>
                    <ArrowUpRight size={16} className="ml-auto shrink-0 text-text-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/" className="group flex items-center justify-between rounded-[14px] p-4 h-full border border-dashed border-line hover:border-text-2 transition-colors">
                  <span className="text-[0.9rem] font-[550]">All services</span><ArrowUpRight size={16} aria-hidden />
                </Link>
              </li>
            </ul>
            <div data-theme="dark" className="lg:col-span-4 rounded-[14px] p-6 flex flex-col justify-between overflow-hidden relative tone-grad min-h-[260px]">
              <div>
                <span className="eyebrow">The Keelbiz loop</span>
                <p className="mt-4 text-[1.35rem] leading-tight tracking-[-0.03em] font-[550] text-text">Attract. Convert. Automate. <span className="accent">Manage.</span></p>
                <p className="text-sm text-text-2 mt-3">Five services designed to work as one system — or on their own.</p>
              </div>
              <Link href="/services/" className="btn btn-glass !min-h-10 self-start mt-6 !text-sm">How it connects <ArrowUpRight size={15} className="btn-arrow" aria-hidden /></Link>
            </div>
          </div>
        )}
        {open === "lab" && (
          <div id={`${panelId}-lab`} role="region" aria-label="Lab" onMouseEnter={() => intent("lab", 0)}
            className="panel-enter glass glass-menu pointer-events-auto absolute left-0 right-0 lg:left-auto lg:w-[720px] top-[76px] rounded-[20px] p-3 grid sm:grid-cols-12 gap-3">
            <ul className="sm:col-span-7 grid gap-0.5">
              {labLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="group flex items-center gap-4 rounded-[12px] px-4 py-3 hover:bg-surface-strong transition-colors">
                  <span className="num">{l.n}</span><span className="text-[0.92rem] font-[520]">{l.label}</span>
                  <ArrowUpRight size={15} className="ml-auto text-text-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                </Link></li>
              ))}
            </ul>
            <div className="sm:col-span-5 rounded-[14px] p-5 bg-bg-2 flex flex-col justify-between border border-line">
              <div>
                <span className="eyebrow">Open source craft</span>
                <p className="mt-3 text-[1.1rem] leading-snug tracking-[-0.02em] font-[550]">Every interface on this site, live — with its real code.</p>
              </div>
              <Link href="/lab/" className="btn-ghost btn !justify-start mt-4 !text-sm">Enter the Lab <ArrowUpRight size={15} className="arrow" aria-hidden /></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
