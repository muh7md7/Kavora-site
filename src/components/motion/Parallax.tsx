"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/** Hero-visual parallax only: ±range px on scroll, desktop (CSS hides effect via reduced motion). */
export function Parallax({ children, range = 40, className }: { children: React.ReactNode; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>{children}</motion.div>;
}
