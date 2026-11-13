"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { revealMargin } from "@/lib/motion";

/** One-shot in-view hook (top of element at 85% viewport by default). */
export function useInViewOnce<T extends Element>(opts: { margin?: string; threshold?: number } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!("IntersectionObserver" in window)) return; // very old browsers: CSS no-JS fallback keeps content visible
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: opts.margin ?? revealMargin, threshold: opts.threshold ?? 0 });
    io.observe(el); return () => io.disconnect();
  }, [opts.margin, opts.threshold]);
  return [ref, inView] as const;
}

/** Continuous visibility (for pausing loops off-screen). */
export function useVisible<T extends Element>(margin = "100px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: margin });
    io.observe(el); return () => io.disconnect();
  }, [margin]);
  return [ref, visible] as const;
}

const rmQuery = "(prefers-reduced-motion: reduce)";
const rmSub = (cb: () => void) => { const m = window.matchMedia(rmQuery); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); };
export function usePrefersReducedMotion() {
  return useSyncExternalStore(rmSub, () => window.matchMedia(rmQuery).matches, () => false);
}
