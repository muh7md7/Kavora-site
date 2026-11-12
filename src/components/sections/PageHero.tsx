import { cn } from "@/lib/cn";

/** Page hero — ivory wash over a backdrop; one accent word per headline. */
export function PageHero({ eyebrow, title, accent, lead, bg = "interior-1", children, className }: { eyebrow?: string; title: string; accent?: string; lead?: string; bg?: "interior-1" | "abstract-1"; children?: React.ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden pt-36 pb-16", className)}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/backdrops/${bg}.svg)` }} aria-hidden />
      <div className="absolute inset-0 scrim-ivory" aria-hidden />
      <div className="container relative">
        {eyebrow && <p className="chip chip-navy">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl">{title} {accent && <span className="accent accent-underline">{accent}</span>}</h1>
        {lead && <p className="lead mt-5">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
