"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services, shortName, type ServiceId } from "@/content/site";
import { serviceIcon } from "@/content/enquiry";
import { MiniPreview } from "@/components/demos/MiniPreview";
import { cn } from "@/lib/cn";

/** The other four services, as a scroll-snap carousel. Native scroll: keyboard, trackpad and touch all work. */
export function RelatedCarousel({ id, tone = "light" }: { id: ServiceId; tone?: "light" | "dark" }) {
  const track = useRef<HTMLUListElement>(null);
  const others = services.filter((s) => s.id !== id);
  const nudge = (d: number) => track.current?.scrollBy({ left: d * (track.current.clientWidth * 0.55), behavior: "smooth" });

  return (
    <section data-theme={tone} className={cn("tone section-major overflow-hidden", tone === "dark" && "grain")}>
      <div className="container">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-[40rem]">
            <p className="eyebrow">Works well with</p>
            <h2 className="mt-5">The other <span className="accent">four.</span></h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button type="button" onClick={() => nudge(-1)} aria-label="Previous services" className="b b-icon b-sm"><ArrowLeft size={16} aria-hidden /></button>
            <button type="button" onClick={() => nudge(1)} aria-label="More services" className="b b-icon b-sm"><ArrowRight size={16} aria-hidden /></button>
          </div>
        </div>
      </div>
      <ul ref={track} className="mt-12 flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {others.map((s) => {
          const Icon = serviceIcon[s.id];
          return (
            <li key={s.id} className="snap-start shrink-0 w-[78vw] sm:w-[44vw] lg:w-[25vw] max-w-[380px]">
              <Link href={`/services/${s.slug}/`} data-spot className="card demo-card group h-full flex flex-col p-6 hover:-translate-y-1.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]">
                <div className="flex items-center justify-between">
                  <span className="size-9 rounded-[11px] border border-line grid place-items-center"><Icon size={16} strokeWidth={1.75} aria-hidden /></span>
                  <ArrowUpRight size={16} className="text-text-2 group-hover:text-text transition-colors" aria-hidden />
                </div>
                <div className="relative h-32 mt-5"><MiniPreview id={s.id} className="absolute inset-0" /></div>
                <h3 className="mt-5 !text-[1.1rem]">{shortName[s.id]}</h3>
                <p className="mt-1.5 text-[0.88rem] text-text-2 leading-snug line-clamp-2">{s.short}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
