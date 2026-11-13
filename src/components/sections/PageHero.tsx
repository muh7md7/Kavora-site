import { cn } from "@/lib/cn";

/** Inner-page hero (v2) — light paper with steel gradient + architectural grid; one serif-italic accent. */
export function PageHero({ eyebrow, title, accent, lead, children, className, tone = "light" }:
  { eyebrow?: string; title: string; accent?: string; lead?: string; bg?: string; children?: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <section data-theme={tone} className={cn("tone tone-grad relative overflow-hidden pt-[150px] md:pt-[190px] pb-20 md:pb-28", className)}>
      <div className="container">
        {eyebrow && <p className="eyebrow reveal-fade">{eyebrow}</p>}
        <h1 className="mt-6 max-w-[18ch]">{title} {accent && <span className="accent">{accent}</span>}</h1>
        {lead && <p className="lead mt-7 reveal-fade" style={{ animationDelay: "180ms" }}>{lead}</p>}
        {children && <div className="reveal-fade" style={{ animationDelay: "260ms" }}>{children}</div>}
      </div>
    </section>
  );
}
