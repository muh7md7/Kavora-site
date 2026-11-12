import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";

/** Micro-moments: each service previews its own UI on hover/focus. CSS-only (transform/opacity). */
export function Preview({ id }: { id: Service["id"] }) {
  switch (id) {
    case "websites":
      return (
        <div className="glass rounded-[12px] p-2.5 w-44">
          <div className="flex gap-1 mb-2" aria-hidden><i className="size-1.5 rounded-full bg-line-strong" /><i className="size-1.5 rounded-full" /><i className="size-1.5 rounded-full" /></div>
          <div className="h-2 w-16 rounded bg-text/80 mb-2" /><div className="h-1.5 w-full rounded bg-line mb-1" /><div className="h-1.5 w-3/4 rounded bg-line mb-3" />
          <div className="h-5 rounded-full bg-accent w-16 transition-transform duration-500 group-hover:translate-x-2" />
        </div>
      );
    case "social":
      return (
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <div key={i} className="glass rounded-[8px] w-10 h-[68px] transition-transform duration-500 group-hover:-translate-y-1.5" style={{ transitionDelay: `${i * 70}ms` }} />)}
        </div>
      );
    case "ads":
      return (
        <div className="glass rounded-[12px] p-2.5 w-48 text-[10px]">
          {["Campaign", "Ad set", "Ad"].map((r, i) => (
            <div key={r} className="flex justify-between items-center py-1 border-b border-line last:border-0" style={{ paddingLeft: i * 8 }}>
              <span>{r}</span><span className="chip chip-sage !text-[8px] !py-0.5 transition-opacity duration-500 opacity-0 group-hover:opacity-100">Active</span>
            </div>
          ))}
        </div>
      );
    case "automation":
      return (
        <div className="relative w-48 h-10 flex items-center">
          <div className="absolute inset-x-0 h-px bg-line-strong" />
          <span className="absolute left-0 size-3 rounded-full bg-moss" /><span className="absolute left-1/2 -ml-1.5 size-3 rounded-full bg-accent" /><span className="absolute right-0 size-3 rounded-full bg-text" />
          <span className="absolute left-0 size-2.5 rounded-full bg-steel-light ring-4 ring-steel-soft transition-transform duration-[900ms] ease-out group-hover:translate-x-[180px]" />
        </div>
      );
    case "dashboards":
      return (
        <div className="glass rounded-[12px] p-2.5 w-44 h-[72px] flex items-end gap-1.5">
          {[40, 70, 55, 90, 65, 80].map((h, i) => <span key={i} className="flex-1 rounded-[3px] bg-accent origin-bottom scale-y-[.45] transition-transform duration-700 group-hover:scale-y-100" style={{ height: `${h}%`, transitionDelay: `${i * 45}ms` }} />)}
        </div>
      );
  }
}

/** Service index row — editorial list; hover reveals the UI preview. */
export function ServiceRow({ s, index }: { s: Service; index: number }) {
  return (
    <li className="border-t border-line last:border-b">
      <Link href={`/services/${s.slug}/`} data-cursor="View" className="group relative grid grid-cols-12 gap-4 md:gap-6 items-center py-8 md:py-10 transition-colors">
        <span className="absolute inset-y-0 -inset-x-4 md:-inset-x-6 rounded-[20px] bg-surface opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" aria-hidden />
        <span className="col-span-2 md:col-span-1 num">0{index + 1}</span>
        <div className="col-span-10 md:col-span-6">
          <h3 className="!text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] !leading-[1.05] !tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1">{s.name}</h3>
          <p className="text-text-2 mt-2 text-[0.98rem]">{s.short}</p>
        </div>
        <div className="hidden md:flex md:col-span-4 justify-end opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" aria-hidden><Preview id={s.id} /></div>
        <span className={cn("col-start-3 md:col-start-auto col-span-10 md:col-span-1 flex md:justify-end items-center gap-3")}>
          <span className="size-12 rounded-full border border-line-strong inline-flex items-center justify-center transition-all duration-500 group-hover:bg-text group-hover:text-bg group-hover:rotate-45" aria-hidden>
            <ArrowUpRight size={18} />
          </span>
        </span>
      </Link>
    </li>
  );
}

/** Back-compat: legacy tile name renders the new row. */
export const ServiceTile = ServiceRow;
