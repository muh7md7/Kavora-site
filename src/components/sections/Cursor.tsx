"use client";
import { useEffect, useRef } from "react";

/**
 * Cursor system — a precise dot plus an eased ring.
 * — Ring follows tightly (no disconnected lag); grows over interactive elements; shows a label for data-cursor="Label".
 * — Gentle magnetic pull (≤4px) on elements with data-magnetic. Never blocks clicks, selection or dragging.
 * — Inverts over dark sections ([data-theme="dark"]).
 * — Fine pointers only; disabled for touch, reduced motion and while typing in form fields (native caret kept).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    const root = document.documentElement;
    const d = dot.current!, r = ring.current!;
    root.classList.add("has-cursor", "cursor-hidden");

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.32; ry += (y - ry) * 0.32;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY; root.classList.remove("cursor-hidden"); kick();
      const t = e.target as Element | null;
      const labelEl = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, [role=tab], summary, label, select, [data-cursor]");
      const field = t?.closest("input, textarea, select, [contenteditable]");
      r.classList.toggle("is-label", !!labelEl);
      r.classList.toggle("is-hover", !!interactive && !labelEl);
      r.textContent = labelEl?.dataset.cursor ?? "";
      root.classList.toggle("cursor-hidden", !!field);
      root.classList.toggle("cursor-on-dark", t?.closest("[data-theme]")?.getAttribute("data-theme") === "dark");
      // Gentle magnetic pull (max 4px) on primary CTAs marked data-magnetic.
      const mag = t?.closest<HTMLElement>("[data-magnetic]");
      if (mag !== magEl) { if (magEl) magEl.style.translate = ""; magEl = mag ?? null; }
      if (magEl) {
        const b = magEl.getBoundingClientRect();
        const dx = (x - (b.left + b.width / 2)) / (b.width / 2), dy = (y - (b.top + b.height / 2)) / (b.height / 2);
        magEl.style.translate = `${(dx * 4).toFixed(2)}px ${(dy * 3).toFixed(2)}px`;
      }
    };
    let magEl: HTMLElement | null = null;
    const onLeave = () => { root.classList.add("cursor-hidden"); if (magEl) { magEl.style.translate = ""; magEl = null; } };
    const onDown = () => r.classList.add("is-down");
    const onUp = () => r.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor", "cursor-hidden", "cursor-on-dark");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div aria-hidden>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
