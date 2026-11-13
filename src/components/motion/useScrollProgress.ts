"use client";
import { useEffect, useRef } from "react";

/**
 * Writes a 0→1 scroll progress for an element into a CSS variable, so scroll-linked motion
 * (pinned tracks, drawn lines) needs no animation library on the critical path.
 * `start`/`end` are viewport fractions: 0 = top of the viewport, 1 = bottom.
 */
export function useScrollProgress<T extends HTMLElement>(varName = "--p", opts: { start?: number; end?: number } = {}) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const start = opts.start ?? 0;
    const end = opts.end ?? 0;
    let raf = 0, active = false;

    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;              // progress 0 when the element top is here
      const to = -r.height + vh * (1 - end); // progress 1 when it has scrolled this far
      const p = (from - r.top) / Math.max(from - to, 1);
      el.style.setProperty(varName, String(Math.min(1, Math.max(0, p))));
    };
    const onScroll = () => { if (!raf && active) raf = requestAnimationFrame(tick); };

    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      if (active) onScroll();
    }, { rootMargin: "100px" });
    io.observe(el);
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [varName, opts.start, opts.end]);
  return ref;
}
