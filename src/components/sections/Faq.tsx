import { ChevronDown } from "lucide-react";

/** FAQ — native disclosure (works without JS), one open at a time via name. */
export function Faq({ items, name = "faq" }: { items: { q: string; a: string }[]; name?: string }) {
  return (
    <div className="divide-y divide-mist border-y border-mist">
      {items.map((f) => (
        <details key={f.q} name={name} className="group py-1">
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none min-h-12 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown size={18} className="shrink-0 text-slate transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="pb-4 text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
