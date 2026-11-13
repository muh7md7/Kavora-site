import { cn } from "@/lib/cn";

/** Inner-page hero (v5) — stone with drifting light, opt-in grid, and an optional visual column. */
export function PageHero({ eyebrow, title, accent, lead, children, aside, className, compact = false }:
  { eyebrow?: string; title: string; accent?: string; lead?: string; bg?: string; children?: React.ReactNode; aside?: React.ReactNode; className?: string; tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <section data-theme="light" className={cn("tone tone-grad has-grid hero-shell relative overflow-hidden pt-[128px] md:pt-[160px]", compact ? "pb-14 md:pb-20" : "pb-16 md:pb-24", className)}>
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="hero-fade" aria-hidden />
      <div className={cn("container", !!aside && "grid gap-12 lg:gap-10 lg:grid-cols-12 items-center")}>
        <div className={cn(!!aside && "lg:col-span-6")}>
          {eyebrow && <p className="eyebrow reveal-fade">{eyebrow}</p>}
          <h1 className={cn("mt-6 reveal-fade !text-[clamp(2.4rem,1.5rem+3vw,4.25rem)] !leading-[1.03] !tracking-[-0.045em]", aside ? "max-w-[14ch]" : "max-w-[18ch]")} style={{ animationDelay: "80ms" }}>{title} {accent && <span className="accent">{accent}</span>}</h1>
          {lead && <p className="lead mt-6 reveal-fade" style={{ animationDelay: "180ms" }}>{lead}</p>}
          {children && <div className="reveal-fade" style={{ animationDelay: "260ms" }}>{children}</div>}
        </div>
        {aside && <div className="lg:col-span-6 reveal-fade" style={{ animationDelay: "300ms" }}>{aside}</div>}
      </div>
    </section>
  );
}
