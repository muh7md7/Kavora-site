"use client";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "./useInView";

type Tag = "div" | "li" | "section" | "article" | "p" | "span" | "figure";

/**
 * Fade + 24px rise when the element's top reaches 85% of the viewport.
 * `variant="clip"` = image reveal (clip-path inset + inner scale 1.06 → 1).
 * `auto` = above-the-fold: CSS keyframes play on first paint, no JS wait.
 */
export function Reveal({ children, className, index = 0, delay = 0, as = "div", variant = "fade", auto = false, style }:
  { children: React.ReactNode; className?: string; index?: number; delay?: number; as?: Tag; variant?: "fade" | "clip"; auto?: boolean; style?: React.CSSProperties }) {
  const [ref, inView] = useInViewOnce<HTMLElement>();
  const T = as as "div";
  const d = `${index * 70 + delay}ms`;
  if (auto) return <T className={cn("rv-auto", className)} style={{ ["--rv-delay" as string]: d, ...style }}>{children}</T>;
  return (
    <T ref={ref as React.RefObject<HTMLDivElement>} className={cn(variant === "clip" ? "rv-clip" : "rv", inView && "is-in", className)}
      style={{ ["--rv-delay" as string]: d, ...style }}>
      {children}
    </T>
  );
}
