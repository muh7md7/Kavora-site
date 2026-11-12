import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/site";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { cn } from "@/lib/cn";

/** Micro-moments: each service previews its own UI on hover/focus. CSS-only (transform/opacity). */
function Preview({ id }: { id: Service["id"] }) {
  switch (id) {
    case "websites": // device frame with a page that "loads"
      return (
        <div className="glass rounded-md p-2 w-40">
          <div className="h-2 w-10 rounded bg-navy/70 mb-2" /><div className="h-1.5 w-full rounded bg-mist mb-1" /><div className="h-1.5 w-3/4 rounded bg-mist mb-2" />
          <div className="h-6 rounded bg-navy w-16 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      );
    case "social": // 9:16 reel frames sliding
      return (
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <div key={i} className="glass rounded-sm w-9 h-16 transition-transform duration-300 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 60}ms` }} />)}
        </div>
      );
    case "ads": // mini campaign row
      return (
        <div className="glass rounded-md p-2 w-44 text-[10px]">
          {["Campaign", "Ad set", "Ad"].map((r, i) => (
            <div key={r} className="flex justify-between py-1 border-b border-mist last:border-0" style={{ paddingLeft: i * 8 }}>
              <span>{r}</span><span className="chip chip-sage !text-[9px] !py-0 transition-opacity opacity-0 group-hover:opacity-100">Active</span>
            </div>
          ))}
        </div>
      );
    case "automation": // pulse along connector
      return (
        <div className="relative w-44 h-10 flex items-center">
          <div className="absolute inset-x-0 h-px bg-mist" />
          <span className="absolute left-0 size-3 rounded-pill bg-sage" /><span className="absolute right-0 size-3 rounded-pill bg-navy" />
          <span className="absolute left-0 size-2.5 rounded-pill bg-champagne transition-transform duration-700 ease-out group-hover:translate-x-[164px]" />
        </div>
      );
    case "dashboards": // bars grow
      return (
        <div className="glass rounded-md p-2 w-40 h-16 flex items-end gap-1.5">
          {[40, 70, 55, 90, 65].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-navy/80 origin-bottom scale-y-50 transition-transform duration-500 group-hover:scale-y-100" style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }} />)}
        </div>
      );
  }
}

/** Five tiles, distinct spans/treatments — not an identical grid. */
export function ServiceTile({ s, index }: { s: Service; index: number }) {
  const span = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"][index];
  const bg = ["bg-[url('/backdrops/interior-1.svg')] bg-cover", "bg-pearl", "bg-sage-tint/60", "bg-navy-tint/70", "bg-champagne-tint/70"][index];
  return (
    <Link href={`/services/${s.slug}/`} className={cn("group lift relative rounded-lg hairline overflow-hidden p-6 min-h-[260px] flex flex-col", span, bg)}>
      <div className="flex items-center gap-3"><ServiceGlyph id={s.id} /><span className="chip chip-slate">{s.flywheel}</span></div>
      <h3 className="mt-4 !text-2xl">{s.name}</h3>
      <p className="text-slate text-sm mt-2 max-w-xs">{s.short}</p>
      <div className="mt-auto pt-6 flex items-end justify-between gap-4">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy">Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-[3px]" aria-hidden /></span>
        <div aria-hidden><Preview id={s.id} /></div>
      </div>
    </Link>
  );
}
