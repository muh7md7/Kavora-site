"use client";
import { motion } from "motion/react";
import { reveal } from "@/lib/motion";

/** Section reveal — transform/opacity only, once, staggered by index. Content is server-rendered; this only animates. */
export function Reveal({ children, className, index = 0, as = "div" }: { children: React.ReactNode; className?: string; index?: number; as?: "div" | "li" }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={index}>
      {children}
    </Tag>
  );
}
