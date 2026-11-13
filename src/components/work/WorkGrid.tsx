"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { caseStudies } from "@/content/work";
import { services, shortName, type ServiceId } from "@/content/site";
import { serviceIcon } from "@/content/enquiry";
import { Placeholder, Button } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { WebsiteDemo } from "@/components/demos/WebsiteDemo";
import { SocialDemo } from "@/components/demos/SocialDemo";
import { AdsDemo } from "@/components/demos/AdsDemo";
import { AiDemo } from "@/components/demos/AiDemo";
import { DashboardDemo } from "@/components/demos/DashboardDemo";
import { MiniPreview } from "@/components/demos/MiniPreview";
import { cn } from "@/lib/cn";

/**
 * Work — filterable grid with a sliding indicator. Until case studies are approved the grid shows
 * labelled placeholder slots rather than invented projects, and the demos below carry the real proof.
 */

type Filter = "all" | ServiceId;
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...services.map((s) => ({ id: s.id as Filter, label: shortName[s.id] })),
];

/** Placeholder project slots — each tagged with the services it will show, so filtering is real. */
const slots: { title: string; ids: ServiceId[]; line: string }[] = [
  { title: "Service business — site + ads", ids: ["websites", "ads"], line: "A site built to convert, with paid traffic pointed at it." },
  { title: "Hospitality brand — social", ids: ["social"], line: "A content calendar run end to end, month after month." },
  { title: "Trades business — AI agent", ids: ["automation", "websites"], line: "Out-of-hours enquiries answered, qualified and booked." },
  { title: "Multi-branch — dashboard", ids: ["dashboards"], line: "Five tools and a spreadsheet replaced by one screen." },
  { title: "E-commerce — ads + reporting", ids: ["ads", "dashboards"], line: "Spend and return in one view, updated daily." },
  { title: "Studio — site + content", ids: ["websites", "social"], line: "A portfolio that loads fast and posts that keep it busy." },
];

export function WorkGrid() {
  const [active, setActive] = useState<Filter>("all");
  const listRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState<{ left: number; width: number } | null>(null);

  const setFilter = (id: Filter, el: HTMLButtonElement) => {
    setActive(id);
    setInd({ left: el.offsetLeft, width: el.offsetWidth });
  };

  const shown = active === "all" ? slots : slots.filter((s) => s.ids.includes(active));
  const live = caseStudies.length > 0;

  return (
    <section data-theme="light" className="tone section-major">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[44rem]">
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-5">Projects, by <span className="accent">service.</span></h2>
          </div>
          <p className="text-text-2 text-[0.92rem] max-w-[34ch]">
            {live ? "Filter by the service that did the work." : "Case studies are published only with written client permission. These slots are reserved and filter as they fill."}
          </p>
        </div>

        {/* filter bar with sliding indicator */}
        <div ref={listRef} className="relative mt-10 inline-flex flex-wrap gap-1 p-1 rounded-pill border border-line-strong" role="tablist" aria-label="Filter work by service">
          <span className="absolute top-1 bottom-1 rounded-pill bg-[var(--graphite)] transition-[left,width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ left: ind?.left ?? 4, width: ind?.width ?? 56, opacity: ind ? 1 : 0 }} aria-hidden />
          {filters.map((f) => (
            <button key={f.id} type="button" role="tab" aria-selected={active === f.id}
              ref={(el) => { if (el && f.id === "all" && !ind) setInd({ left: el.offsetLeft, width: el.offsetWidth }); }}
              onClick={(e) => setFilter(f.id, e.currentTarget)}
              className={cn("relative z-10 px-4 min-h-11 rounded-pill text-[0.88rem] font-[550] transition-colors duration-300", active === f.id ? "text-[var(--offwhite)]" : "text-text-2 hover:text-text")}>
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid md:grid-cols-2 gap-4 md:gap-5" aria-live="polite">
          {shown.map((p, i) => (
            <Reveal as="li" key={p.title} index={i % 4} className="min-w-0">
              <article data-spot className="card group h-full overflow-hidden flex flex-col">
                <div className="relative overflow-hidden">
                  <div className="transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]">
                    <Placeholder label="Case-study image · 16:10" className="!rounded-none !border-x-0 !border-t-0" />
                  </div>
                  <span className="absolute top-3 left-3 tag tag-mono !min-h-7 !px-2.5 !text-[10px] inline-flex items-center gap-1.5"><Lock size={10} aria-hidden />Awaiting approval</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="flex flex-wrap gap-1.5">
                    {p.ids.map((id) => {
                      const Icon = serviceIcon[id];
                      return <span key={id} className="tag !min-h-7 !text-[11px] !px-2.5"><Icon size={11} aria-hidden />{shortName[id]}</span>;
                    })}
                  </p>
                  <h3 className="mt-4 !text-[1.2rem]">{p.title}</h3>
                  <p className="mt-2 text-text-2 text-[0.92rem] leading-snug">{p.line}</p>
                  <p className="mt-5 pt-4 border-t border-line text-[0.8rem] text-text-2">Images, figures and quotes are added once the client signs them off.</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {shown.length === 0 && (
          <p className="mt-10 card p-8 text-center text-text-2">Nothing reserved under this service yet. <Link href="/contact/" className="underline underline-offset-2 text-text">Be the first project.</Link></p>
        )}
      </div>
    </section>
  );
}

/* ---------------- demos with full-screen modal ---------------- */

const demoList = [
  { id: "websites" as ServiceId, title: "Responsive business website", el: WebsiteDemo },
  { id: "social" as ServiceId, title: "A month of social, planned", el: SocialDemo },
  { id: "ads" as ServiceId, title: "Ads account and reporting", el: AdsDemo },
  { id: "automation" as ServiceId, title: "AI assistant and workflow", el: AiDemo },
  { id: "dashboards" as ServiceId, title: "Business dashboard", el: DashboardDemo },
];

export function WorkDemos() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const Active = open !== null ? demoList[open].el : null;

  return (
    <section data-theme="dark" className="tone tone-grad grain section-major overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[44rem]">
            <p className="eyebrow">Interface demonstrations</p>
            <h2 className="mt-5">What we build, <span className="accent">live.</span></h2>
          </div>
          <p className="text-text-2 text-[0.92rem] max-w-[34ch]">Running demos with sample data — clearly ours, not client work. Open one full-screen.</p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {demoList.map((d, i) => {
            const Icon = serviceIcon[d.id];
            return (
              <Reveal as="li" key={d.title} index={i} className="min-w-0">
                <button type="button" onClick={() => setOpen(i)} data-spot
                  className="card demo-card group w-full h-full text-left p-5 flex flex-col hover:-translate-y-1.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]">
                  <div className="flex items-center justify-between">
                    <span className="size-9 rounded-[11px] border border-line grid place-items-center"><Icon size={16} strokeWidth={1.75} aria-hidden /></span>
                    <span className="text-[0.8rem] font-[550] inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">Open <ArrowUpRight size={13} aria-hidden /></span>
                  </div>
                  <div className="relative h-36 mt-5"><MiniPreview id={d.id} className="absolute inset-0" /></div>
                  <h3 className="mt-5 !text-[1.05rem]">{d.title}</h3>
                  <p className="mt-1.5 text-[0.82rem] text-text-2">Sample data · interactive</p>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* full-screen modal */}
      {open !== null && Active && (
        <div role="dialog" aria-modal="true" aria-label={demoList[open].title}
          className="fixed inset-0 z-[60] grid place-items-start sm:place-items-center overflow-y-auto bg-[rgba(17,25,30,.72)] p-0 sm:p-6 backdrop-blur-sm"
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(null); }}>
          <div data-theme="light" className="tone relative w-full sm:max-w-[1180px] sm:rounded-[24px] min-h-[100svh] sm:min-h-0 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow">Demonstration</p>
                <h2 className="mt-3 !text-[clamp(22px,2.4vw,34px)]">{demoList[open].title}</h2>
              </div>
              <button ref={closeRef} autoFocus type="button" onClick={() => setOpen(null)} aria-label="Close demonstration" className="b b-icon b-sm shrink-0"><X size={16} aria-hidden /></button>
            </div>
            <div className="mt-8"><Active /></div>
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <p className="text-[0.85rem] text-text-2">Sample data for an invented business. Yours is built on your own.</p>
              <Button href={`/services/${services.find((s) => s.id === demoList[open!].id)!.slug}/`} arrow="right">See this service</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
