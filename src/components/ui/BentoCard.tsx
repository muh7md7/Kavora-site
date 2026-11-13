import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Bento card — 24px radius, hairline border, elevation 1 → 2 on hover, cursor-follow spotlight (data-spot).
 * `tone="dark"` scopes the card to the dark theme (grain + light spotlight).
 */
export function BentoCard({ children, className, tone, href, eyebrow, title, desc, cta = "Explore", visual }:
  { children?: React.ReactNode; className?: string; tone?: "light" | "dark"; href?: string; eyebrow?: string; title?: string; desc?: string; cta?: string; visual?: React.ReactNode }) {
  const body = (
    <>
      {visual && <div className="relative flex-1 min-h-0">{visual}</div>}
      {(eyebrow || title || desc) && (
        <div className="relative mt-auto pt-6">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h3 className="mt-3">{title}</h3>}
          {desc && <p className="mt-2 text-text-2 text-[0.98rem] leading-snug max-w-[44ch]">{desc}</p>}
          {href && (
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-[550] opacity-70 group-hover:opacity-100 transition-opacity">
              {cta} <ArrowUpRight size={15} className="transition-transform duration-[350ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          )}
        </div>
      )}
      {children}
    </>
  );
  const cls = cn("card group flex flex-col overflow-hidden p-6 md:p-8 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[var(--elev-2)]",
    tone === "dark" && "grain", className);
  if (href) return <Link href={href} data-theme={tone} data-spot className={cls}>{body}</Link>;
  return <div data-theme={tone} data-spot className={cls}>{body}</div>;
}
