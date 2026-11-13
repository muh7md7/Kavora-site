"use client";
import { flywheel, services, shortName, type ServiceId } from "@/content/site";
import { cn } from "@/lib/cn";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * "Not five services. One system." — the four stages, pinned while the connecting line draws between them.
 * Desktop pins and scrubs; mobile and reduced motion stack the same four stages with the line already drawn.
 */
const stageServices: Record<string, ServiceId[]> = {
  Attract: ["social", "ads"],
  Convert: ["websites"],
  Automate: ["automation"],
  Manage: ["dashboards"],
};
const detail: Record<string, string> = {
  Attract: "People who have never heard of you find you — through content that keeps showing up and advertising that puts you in front of the right audience.",
  Convert: "They land somewhere built to earn the enquiry: fast, clear, credible, and easy to act on.",
  Automate: "Every enquiry gets answered immediately, qualified and followed up — at 2am, on a Sunday, during your busiest week.",
  Manage: "What happened, what it cost and what it produced, in one place instead of five tools and a spreadsheet.",
};

export function SystemPinned() {
  const ref = useScrollProgress<HTMLDivElement>("--p");

  return (
    <section data-theme="light" className="tone section-major">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">How it fits together</p>
          <h2 className="mt-5">Not five services. One <span className="accent">system.</span></h2>
          <p className="lead mt-6">You can start anywhere. But each stage makes the next one worth more — and the loop is what turns marketing into a machine rather than a monthly scramble.</p>
        </div>
      </div>

      {/* desktop: pinned + scrubbed */}
      <div ref={ref} className="hidden lg:block relative mt-20 h-[260vh]">
        <div className="sticky top-[22vh] h-[52vh]">
          <div className="container h-full">
            <div className="relative h-full grid grid-cols-4 gap-6">
              {/* connecting line */}
              <div className="absolute left-[12.5%] right-[12.5%] top-[62px] h-px bg-line" aria-hidden />
              <div className="draw-x absolute left-[12.5%] right-[12.5%] top-[62px] h-px bg-[var(--graphite)] origin-left" aria-hidden />
              {flywheel.map((f, i) => <Stage key={f.step} i={i} step={f.step} />)}
            </div>
          </div>
        </div>
      </div>

      {/* mobile / reduced motion */}
      <div className="lg:hidden container mt-14 grid gap-4">
        {flywheel.map((f, i) => (
          <div key={f.step} className="card p-6">
            <div className="flex items-center gap-3">
              <span className="num">0{i + 1}</span>
              <h3 className="!text-[1.3rem]">{f.step}</h3>
            </div>
            <p className="mt-3 text-text-2 text-[0.95rem] leading-relaxed">{detail[f.step]}</p>
            <p className="mt-4 flex flex-wrap gap-2">{stageServices[f.step].map((id) => <span key={id} className="tag !min-h-8 !text-[12px]">{shortName[id]}</span>)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stage({ i, step }: { i: number; step: string }) {
  // Each node lights up as the drawn line reaches it (CSS interpolates from the section's --p).
  const slugs = stageServices[step];
  return (
    <div className="stage-node flex flex-col pt-[34px] min-w-0" style={{ ["--at" as string]: i / 3 }}>
      <span className={cn("relative z-10 size-14 rounded-full grid place-items-center font-mono text-[12px] border bg-bg", "border-line-strong")}>
        0{i + 1}
      </span>
      <h3 className="mt-7 !text-[clamp(24px,2.2vw,32px)]">{step}</h3>
      <p className="mt-4 text-text-2 leading-relaxed text-[0.98rem] max-w-[30ch]">{detail[step]}</p>
      <p className="mt-6 flex flex-wrap gap-2">
        {slugs.map((id) => {
          const s = services.find((x) => x.id === id)!;
          return <a key={id} href={`/services/${s.slug}/`} className="tag !min-h-9 hover:!text-text hover:!border-text-2">{shortName[id]}</a>;
        })}
      </p>
    </div>
  );
}
