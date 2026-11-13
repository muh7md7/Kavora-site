import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** What you actually receive — each item gets an icon and a small drawn preview rather than a bullet. */
export function Deliverables({ items, title, accent, eyebrow = "What you get", lead, tone = "light", cols = 3 }:
  { items: { icon: LucideIcon; name: string; desc: string; visual?: React.ReactNode }[]; title: string; accent: string; eyebrow?: string; lead?: string; tone?: "light" | "dark"; cols?: 2 | 3 }) {
  return (
    <section data-theme={tone} className={cn("tone section-major", tone === "dark" && "grain")}>
      <div className="container">
        <div className="max-w-[44rem]">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5">{title} <span className="accent">{accent}</span></h2>
          {lead && <p className="lead mt-6">{lead}</p>}
        </div>
        <ul className={cn("mt-14 grid gap-4 md:gap-5", cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {items.map((d, i) => (
            <Reveal as="li" key={d.name} index={i} className="min-w-0">
              <div data-spot className="card h-full p-6 flex flex-col">
                <span className="size-11 rounded-[13px] border border-line grid place-items-center shrink-0"><d.icon size={18} strokeWidth={1.75} aria-hidden /></span>
                <h3 className="mt-5 !text-[1.15rem]">{d.name}</h3>
                <p className="mt-2 text-[0.92rem] text-text-2 leading-snug">{d.desc}</p>
                {d.visual && <div className="mt-6 pt-5 border-t border-line flex-1 min-h-[88px] flex items-end">{d.visual}</div>}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
