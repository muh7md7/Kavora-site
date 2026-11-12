"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/glass/Button";
import { StatCard, sampleStats } from "@/components/glass/StatCard";
import { WorkflowCanvas } from "@/components/glass/WorkflowCanvas";
import { GlassSidebar } from "@/components/glass/GlassSidebar";
import { easeOut } from "@/lib/motion";

const lines = ["Digital Experiences.", "Smarter Growth."];

/** Hero — sunlit interior backdrop + ivory wash; layered glass composition with slow pointer parallax (desktop only). */
export function Hero() {
  const reduce = useReducedMotion();
  const [p, setP] = useState({ x: 0, y: 0 });
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const upd = () => setPointerFine(mq.matches); upd(); mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (!pointerFine || reduce) return;
    setP({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
  };

  const drift = (depth: number) => ({ x: p.x * depth, y: p.y * depth });
  const slow = { type: "tween" as const, duration: reduce ? 0 : 7, ease: easeOut };

  return (
    <section className="relative overflow-hidden min-h-[92svh] flex items-center" onPointerMove={onMove}>
      <div className="absolute inset-0 bg-[url('/backdrops/interior-1.svg')] bg-cover bg-center" aria-hidden />
      <div className="absolute inset-0 scrim-ivory" aria-hidden />
      <div className="container relative grid gap-12 lg:grid-cols-[1.05fr_1fr] items-center pt-28 pb-16">
        <div>
          {/* Headline reveal is CSS-only (per-line mask slide-up) so the LCP text paints before hydration. */}
          <h1 className="display">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <span className="block reveal-line" style={{ animationDelay: `${i * 80}ms` }}>
                  {i === 1 ? <>Smarter <span className="accent accent-underline">Growth.</span></> : l}
                </span>
              </span>
            ))}
          </h1>
          <p className="lead mt-6 reveal-fade" style={{ animationDelay: "250ms" }}>
            We build your online presence, grow your business, and automate the work behind it. One connected team for web, social, ads, AI agents and dashboards — for businesses worldwide, with a strong base in the UAE / GCC and Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 reveal-fade" style={{ animationDelay: "350ms" }}>
            <Button href="/services/" variant="primary" ariaLabel="Explore services">Explore Services</Button>
            <Button href="/contact/" variant="glass">Start a Project</Button>
          </div>
        </div>

        {/* Glass composition — desktop: sidebar rail + stat trio + workflow strip. Mobile: one stat + strip. */}
        <div className="relative bloom" aria-label="Concept interface — sample data">
          <span className="chip chip-slate absolute -top-3 left-2 z-10">Concept interface · Sample data</span>
          <div className="hidden lg:grid grid-cols-[72px_1fr] gap-4 items-start">
            <motion.div animate={drift(-6)} transition={slow}><GlassSidebar defaultOpen={false} /></motion.div>
            <div className="flex flex-col gap-4">
              <motion.div animate={drift(8)} transition={slow} className="grid grid-cols-3 gap-3">
                {sampleStats.slice(0, 3).map((s) => <StatCard key={s.label} {...s} />)}
              </motion.div>
              <motion.div animate={drift(4)} transition={slow}><WorkflowCanvas compact /></motion.div>
            </div>
          </div>
          <div className="lg:hidden flex flex-col gap-3 pt-3">
            <StatCard {...sampleStats[0]} />
            <WorkflowCanvas compact />
          </div>
        </div>
      </div>
    </section>
  );
}
