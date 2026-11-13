import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import { serviceIcon } from "@/content/enquiry";
import { MiniPreview } from "@/components/demos/MiniPreview";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Five services as a bento of different sizes, each showing its own looping demo rather than describing it.
 * Hover lifts the card, speeds the demo up and reveals "Explore". Demos are decorative and pause under reduced motion.
 */
const span = [
  "md:col-span-7 md:row-span-2", // websites — the biggest demo
  "md:col-span-5",               // social
  "md:col-span-5",               // ads
  "md:col-span-6",               // automation
  "md:col-span-6",               // dashboards
];
const dark = new Set(["social", "dashboards"]);

export function ServiceBento() {
  return (
    <section id="services" data-theme="light" className="tone section-major scroll-mt-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[46rem]">
            <p className="eyebrow">The five</p>
            <h2 className="mt-5">Every service, <span className="accent">working.</span></h2>
          </div>
          <p className="text-text-2 max-w-[32ch] text-[0.98rem]">Live previews, not screenshots. Each card runs the kind of thing we build for that service.</p>
        </div>

        <div className="mt-14 grid md:grid-cols-12 gap-4 md:gap-5 auto-rows-[280px]">
          {services.map((s, i) => {
            const Icon = serviceIcon[s.id];
            const isDark = dark.has(s.id);
            return (
              <Reveal key={s.id} index={i} className={cn("min-w-0", span[i])}>
                <Link
                  href={`/services/${s.slug}/`}
                  data-theme={isDark ? "dark" : undefined}
                  data-spot
                  className={cn("card demo-card group h-full flex flex-col overflow-hidden p-5 md:p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--elev-2)]", isDark && "grain")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className="size-9 rounded-[11px] border border-line grid place-items-center shrink-0"><Icon size={16} strokeWidth={1.75} aria-hidden /></span>
                      <span className="num">0{i + 1}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-[550] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]">
                      Explore <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </div>

                  <div className="relative flex-1 min-h-0 my-5">
                    <MiniPreview id={s.id} className="absolute inset-0" />
                  </div>

                  <div>
                    <h3 className="!text-[clamp(18px,1.5vw,22px)]">{s.name}</h3>
                    <p className="mt-1.5 text-[0.92rem] text-text-2 leading-snug line-clamp-3">{s.short}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
