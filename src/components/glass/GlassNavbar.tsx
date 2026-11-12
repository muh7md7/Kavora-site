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
export function GlassNavbar({ links = nav, ctaLabel = "Start a Project", ctaHref = "/contact/", onOpenMobile, inline }: Props) {
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
  const target = hover ?? links.find((l) => isActive(l.href))?.href ?? null;
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
        "header-enter pointer-events-none px-3 sm:px-4 pt-3 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] !bg-transparent",
        hidden && !open && !inline && "-translate-y-[130%]",
      )}
      onMouseLeave={() => intent(null, 180)}
    >
      <div className={cn("mx-auto relative transition-[max-width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]", scrolled && !inline ? "max-w-[1180px]" : "max-w-[var(--content-max)]")}>
        <nav
          aria-label="Primary"
          className={cn(
            "header-glass pointer-events-auto relative grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-2 rounded-[18px] transition-[height,box-shadow,background] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            scrolled && !inline ? "h-[58px] is-scrolled" : "h-16",
          )}
        >
          <Link href="/" className="justify-self-start shrink-0 rounded-sm pl-2.5 sm:pl-3" aria-label="Keelbiz — home">
            <Logo />
          </Link>

          <ul ref={listRef} className="hidden lg:flex items-center relative justify-self-center" onMouseLeave={() => setHover(null)}>
            <span className="pill-indicator" aria-hidden style={{ left: ind?.left ?? 0, width: ind?.width ?? 0, opacity: ind ? 1 : 0 }} />
            {links.map((l) => {
              const mega = megaOf(l);
              const active = isActive(l.href);
              const base = "nav-link relative z-10 h-10 px-3.5 xl:px-4 inline-flex items-center gap-1.5 text-[0.9rem] font-[500] tracking-[-0.01em] rounded-pill transition-colors duration-200";
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

          <div className="justify-self-end flex items-center gap-1.5">
            <Link href={ctaHref} className="btn btn-primary !min-h-10 !h-10 !pl-4 !pr-3.5 !text-[0.86rem] !gap-2 hidden sm:inline-flex" data-magnetic>
              {ctaLabel}<span className="size-5 -mr-1 rounded-full bg-white/12 inline-flex items-center justify-center"><ArrowUpRight size={13} strokeWidth={2.2} className="btn-arrow" aria-hidden /></span>
            </Link>
            <button type="button" className="lg:hidden size-11 inline-flex items-center justify-center rounded-pill text-text hover:bg-surface-strong" aria-label="Open menu" onClick={onOpenMobile}>
              <Menu size={20} aria-hidden />
            </button>
          </div>

          {!inline && <span ref={progressRef} className="absolute left-6 right-6 bottom-0 h-px origin-left bg-accent/60" style={{ transform: "scaleX(0)" }} aria-hidden />}
        </nav>

        {/* Mega panels */}
        {open === "services" && (
          <div id={`${panelId}-services`} role="region" aria-label="Services" onMouseEnter={() => intent("services", 0)}
            className="panel-enter glass glass-menu pointer-events-auto absolute left-0 right-0 top-[calc(100%+10px)] rounded-[18px] p-2.5 grid lg:grid-cols-12 gap-2.5">
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
                  <span className="text-[0.9rem] font-[550]">All services <span className="text-text-2 font-normal">· one or combined</span></span><ArrowUpRight size={16} aria-hidden />
                </Link>
              </li>
            </ul>
            <div data-theme="dark" className="lg:col-span-4 rounded-[14px] p-6 flex flex-col justify-between overflow-hidden relative tone-grad min-h-[260px]">
              <div>
                <span className="eyebrow">AI solutions</span>
                <p className="mt-4 text-[1.3rem] leading-tight tracking-[-0.03em] font-[550] text-text">Ready-made or <span className="accent">custom-built</span> AI agents.</p>
                <p className="text-sm text-text-2 mt-3">Support, sales, booking and workflow automation — set up for your business.</p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/ai-solutions/" className="btn btn-primary !min-h-10 !text-sm !justify-between">Explore AI solutions <ArrowUpRight size={15} className="btn-arrow" aria-hidden /></Link>
                <Link href="/contact/?type=solution" className="btn btn-glass !min-h-10 !text-sm !justify-between">Build your solution <ArrowUpRight size={15} className="btn-arrow" aria-hidden /></Link>
              </div>
            </div>
          </div>
        )}
        {open === "lab" && (
          <div id={`${panelId}-lab`} role="region" aria-label="Lab" onMouseEnter={() => intent("lab", 0)}
            className="panel-enter glass glass-menu pointer-events-auto absolute left-0 right-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-[720px] top-[calc(100%+10px)] rounded-[18px] p-3 grid sm:grid-cols-12 gap-3">
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
