"use client";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Accordion — single-open, APG disclosure semantics.
 * Panel opens instantly (no height animation → no layout thrash); content fades + rises (opacity/transform only).
 */
export function Accordion({ items, className, defaultOpen = -1 }: { items: { q: string; a: React.ReactNode }[]; className?: string; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q}>
            <h3 className="!text-[1.08rem] !leading-snug !tracking-[-0.015em] !font-[550]">
              <button type="button" id={`${id}-h${i}`} aria-expanded={on} aria-controls={`${id}-p${i}`} onClick={() => setOpen(on ? -1 : i)}
                className="w-full min-h-16 py-5 flex items-center justify-between gap-6 text-left group">
                <span>{it.q}</span>
                <span className={cn("size-9 shrink-0 rounded-full border border-line-strong grid place-items-center transition-transform duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:border-text-2", on && "rotate-45")} aria-hidden>
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-h${i}`} hidden={!on}>
              <div className={cn("acc-panel", on && "is-open")}>
                <div className="min-h-0 overflow-hidden">
                  <div className="pb-6 pr-14 text-text-2 leading-relaxed max-w-[68ch]">{it.a}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
