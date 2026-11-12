"use client";
import { motion } from "motion/react";
import { reveal } from "@/lib/motion";

/** Section reveal — transform/opacity only, once, staggered by index. Content is server-rendered; this only animates. */
export function Reveal({ children, className, index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  return (
    <motion.div className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={index}>
      {children}
    </motion.div>
  );
}
