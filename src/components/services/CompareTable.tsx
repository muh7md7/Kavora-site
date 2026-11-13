"use client";
import { services, problemMatrix, shortName, type ServiceId } from "@/content/site";
import { serviceIcon } from "@/content/enquiry";
import { useInViewOnce } from "@/components/motion/useInView";
import { cn } from "@/lib/cn";

/**
 * Start from the problem, not the service. Checkmarks draw in as the table scrolls into view.
 * Mobile drops the grid for a per-problem list of the services that apply (a 6-column table can't shrink honestly).
 */
export function CompareTable() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ margin: "0px 0px -20% 0px" });
  return (
    <section data-theme="light" className="tone !bg-bg-2 section-major">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">Start from the problem</p>
          <h2 className="mt-5">Which one fixes <span className="accent">what.</span></h2>
          <p className="lead mt-6">Find the sentence that sounds like your week. The services marked against it are the ones worth discussing.</p>
        </div>

        <div ref={ref} className="mt-14">
          {/* desktop grid */}
          <div className="hidden md:block card overflow-hidden">
            <div className="grid grid-cols-[1.6fr_repeat(5,minmax(0,1fr))] items-stretch">
              <div className="p-5 border-b border-line" />
              {services.map((s) => {
                const Icon = serviceIcon[s.id];
                return (
                  <a key={s.id} href={`/services/${s.slug}/`} className="p-5 border-b border-l border-line flex flex-col items-center gap-2 text-center hover:bg-[var(--surface)] transition-colors">
                    <Icon size={18} strokeWidth={1.75} aria-hidden />
                    <span className="text-[0.82rem] font-[550] leading-tight">{shortName[s.id]}</span>
                  </a>
                );
              })}
              {problemMatrix.map((row, r) => (
                <div key={row.problem} className="contents">
                  <p className={cn("p-5 text-[0.95rem] leading-snug flex items-center", r < problemMatrix.length - 1 && "border-b border-line")}>{row.problem}</p>
                  {services.map((s, c) => (
                    <div key={s.id} className={cn("border-l border-line grid place-items-center", r < problemMatrix.length - 1 && "border-b")}>
                      {row.ids.includes(s.id as ServiceId) ? <Tick on={inView} delay={r * 60 + c * 30} label={`${shortName[s.id]} helps with: ${row.problem}`} /> : <span className="w-3 h-px bg-line-strong" aria-hidden />}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* mobile */}
          <ul className="md:hidden grid gap-3">
            {problemMatrix.map((row, r) => (
              <li key={row.problem} className="card p-5">
                <p className="text-[0.98rem] leading-snug font-[500]">{row.problem}</p>
                <p className="mt-3 flex flex-wrap gap-2">
                  {row.ids.map((id) => {
                    const s = services.find((x) => x.id === id)!;
                    return <a key={id} href={`/services/${s.slug}/`} className="tag !min-h-9"><Tick on={inView} delay={r * 40} small />{shortName[id]}</a>;
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Tick({ on, delay, label, small }: { on: boolean; delay: number; label?: string; small?: boolean }) {
  return (
    <span className={cn("grid place-items-center rounded-full bg-[var(--graphite)] text-[var(--offwhite)]", small ? "size-4" : "size-7")} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 12 12" fill="none" className={small ? "size-2.5" : "size-3.5"}>
        <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          className="tick-path" style={{ strokeDashoffset: on ? 0 : 16, transitionDelay: `${delay}ms` }} />
      </svg>
    </span>
  );
}
