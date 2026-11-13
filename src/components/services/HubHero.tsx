"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { services } from "@/content/site";
import { serviceIcon } from "@/content/enquiry";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui";

/**
 * Hub hero — the five services start as chips scattered around the headline and settle into a
 * single row as you scroll, which is the page's argument in one gesture: five parts, one system.
 * Scroll-linked transform/opacity only; mobile and reduced motion render the settled row.
 */
const float = [
  { x: -1.5, y: -30, r: -3.5 }, { x: 2.5, y: 26, r: 3 }, { x: -2.5, y: -14, r: 2.5 }, { x: 1.5, y: 34, r: -3 }, { x: -1, y: 10, r: 4 },
];
const label = (n: string) => n.split(" — ")[0].replace(" Design & Development", "").replace(" Management", "");

/** One floating chip. Each needs its own transforms, so it is its own component (hooks can't run in a loop callback). */
function Chip({ s, f, t, reduce }: { s: (typeof services)[number]; f: { x: number; y: number; r: number }; t: MotionValue<number>; reduce: boolean }) {
  const Icon = serviceIcon[s.id];
  const x = useTransform(t, [0, 1], [`${f.x}vw`, "0vw"]);
  const y = useTransform(t, [0, 1], [f.y, 0]);
  const rotate = useTransform(t, [0, 1], [f.r, 0]);
  return (
    <motion.div style={reduce ? undefined : { x, y, rotate }} className="flex-1 min-w-0">
      <Link href={`/services/${s.slug}/`} tabIndex={-1} className="card !rounded-[18px] px-5 py-4 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]">
        <Icon size={18} strokeWidth={1.75} className="shrink-0" />
        <span className="text-[0.92rem] font-[550] tracking-[-0.015em] truncate">{label(s.name)}</span>
      </Link>
    </motion.div>
  );
}

export function HubHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const t = useTransform(scrollYProgress, [0, 0.75], [0, 1]);

  return (
    <section data-theme="light" className="tone tone-grad section-hero relative overflow-hidden" ref={ref}>
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="container">
        <p className="eyebrow rv-auto">Services · five, or any combination</p>
        <SplitHeading as="h1" auto underline text="Five services. Hire one, or build the whole" accent="system." className="display mt-7 max-w-[16ch]" />
        <p className="lead mt-8 rv-auto" style={{ ["--rv-delay" as string]: "320ms" }}>
          Each one stands on its own. Together they become a loop: attract people, convert them, automate the follow-up and manage it all in one place.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 rv-auto" style={{ ["--rv-delay" as string]: "420ms" }}>
          <Button href="#services">See the five</Button>
          <Button href="#build" variant="secondary" arrow="right">Build your stack</Button>
        </div>

        <div className="mt-16 md:mt-24 hidden md:flex gap-4" aria-hidden>
          {services.map((s, i) => <Chip key={s.id} s={s} f={float[i]} t={t} reduce={!!reduce} />)}
        </div>
        <div className="mt-12 flex md:hidden flex-wrap gap-2" aria-hidden>
          {services.map((s) => {
            const Icon = serviceIcon[s.id];
            return <Link key={s.id} href={`/services/${s.slug}/`} tabIndex={-1} className="tag !min-h-10"><Icon size={14} aria-hidden />{label(s.name)}</Link>;
          })}
        </div>
      </div>
    </section>
  );
}
