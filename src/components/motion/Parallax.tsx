"use client";
import { useScrollProgress } from "./useScrollProgress";
import { cn } from "@/lib/cn";

/**
 * Hero-visual parallax: ±range px, driven by a CSS variable rather than an animation library,
 * so pages that only need this don't pay for Motion. Desktop only; static under reduced motion.
 */
export function Parallax({ children, range = 40, className }: { children: React.ReactNode; range?: number; className?: string }) {
  const ref = useScrollProgress<HTMLDivElement>("--p");
  return (
    <div ref={ref} className={cn("parallax-y", className)} style={{ ["--range" as string]: `${range}px` }}>
      {children}
    </div>
  );
}
