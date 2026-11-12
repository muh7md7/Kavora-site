"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Section reveal — CSS transition toggled by IntersectionObserver (once). No motion library on the critical path. */
export function Reveal({ children, className, index = 0, as = "div" }: { children: React.ReactNode; className?: string; index?: number; as?: "div" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const Tag = as as "div";
  return <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cn("io-reveal", className)} style={{ ["--reveal-delay" as string]: `${index * 50}ms` }}>{children}</Tag>;
}
