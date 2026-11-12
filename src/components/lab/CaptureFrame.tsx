"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { AtSign as Instagram } from "lucide-react";
import { CodeWindow } from "@/components/glass/CodeWindow";
import type { Timeline, Step } from "@/lab/timelines/types";
import { cn } from "@/lib/cn";

type Props = {
  title: string; version: string; code: string; file: string; timeline: Timeline; brandHandle: string;
  children: React.ReactNode;
};

/**
 * Reel Capture Mode — 1080×1920 frame mirroring the reference reels.
 * ?theme=light|dark &bg=interior-1|abstract-1 &title= &tag=
 * Scripted cursor runs the JSON timeline, then a 2.5s end card. noindex via page metadata.
 */
export function CaptureFrame({ title, version, code, file, timeline, brandHandle, children }: Props) {
  const sp = useSearchParams();
  const theme = sp.get("theme") === "dark" ? "dark" : "light";
  const bg = sp.get("bg") === "abstract-1" ? "abstract-1" : "interior-1";
  const t = sp.get("title") ?? title;
  const tag = sp.get("tag") ?? version;
  const stageRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 540, y: 980, down: false, visible: false });
  const [ended, setEnded] = useState(false);
  const [scale, setScale] = useState(1);

  // Fit 1080×1920 into viewport for preview; record at 100% zoom with a 1080×1920 viewport.
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1080, window.innerHeight / 1920, 1));
    fit(); window.addEventListener("resize", fit); return () => window.removeEventListener("resize", fit);
  }, []);

  const steps = useMemo(() => timeline.steps, [timeline]);

  useEffect(() => {
    let cancelled = false; const timers: number[] = [];
    const stage = stageRef.current; if (!stage) return;
    const centre = (sel: string) => {
      const el = stage.querySelector<HTMLElement>(sel); if (!el) return null;
      const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect();
      return { el, x: (r.left - s.left + r.width / 2) / scale, y: (r.top - s.top + r.height / 2) / scale };
    };
    const fire = (el: HTMLElement, types: string[]) => types.forEach((ty) => el.dispatchEvent(new MouseEvent(ty, { bubbles: true, cancelable: true })));
    let at = 400;
    const run = (st: Step) => {
      const ms = st.ms ?? 800;
      timers.push(window.setTimeout(() => {
        if (cancelled) return;
        if (st.t === "wait") return;
        const sel = st.t === "move" ? st.to : st.on;
        const c = centre(sel); if (!c) return;
        setCursor((p) => ({ ...p, x: c.x, y: c.y, visible: true }));
        timers.push(window.setTimeout(() => {
          if (cancelled) return;
          if (st.t === "hover") { fire(c.el, ["pointerover", "pointerenter", "mouseover", "mouseenter"]); c.el.focus?.({ preventScroll: true }); }
          if (st.t === "click") { setCursor((p) => ({ ...p, down: true })); fire(c.el, ["pointerdown", "mousedown"]); c.el.click(); fire(c.el, ["pointerup", "mouseup"]); timers.push(window.setTimeout(() => setCursor((p) => ({ ...p, down: false })), 140)); }
        }, 420));
      }, at));
      at += ms;
    };
    steps.forEach(run);
    timers.push(window.setTimeout(() => !cancelled && setEnded(true), timeline.duration - 2500));
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [steps, timeline.duration, scale]);

  const dark = theme === "dark";
  return (
    <div className={cn("fixed inset-0 overflow-hidden flex items-start justify-center", dark ? "bg-midnight" : "bg-ivory")} data-capture>
      <div
        ref={stageRef}
        className={cn("relative origin-top", dark ? "bg-midnight on-midnight text-ivory" : "bg-ivory text-ink")}
        style={{ width: 1080, height: 1920, transform: `scale(${scale})` }}
      >
        {/* Title */}
        <div className="px-20 pt-24">
          <div className="flex items-center gap-3 text-2xl text-slate"><Instagram size={28} aria-hidden /><span className={dark ? "text-ivory/80" : ""}>{brandHandle}</span></div>
          <h1 className="font-display font-bold mt-8 leading-[0.95]" style={{ fontSize: 112, color: dark ? "var(--ivory)" : "var(--navy)" }}>
            {t} <span className={dark ? "text-champagne-light" : "text-champagne"}>{tag}</span>
          </h1>
        </div>

        {/* Stage over backdrop */}
        <div className="absolute left-14 right-14 top-[420px] h-[860px] rounded-[32px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(/backdrops/${dark ? "dusk-1" : bg}.svg)` }}>
          <div className={cn("absolute inset-0", !dark && "scrim-ivory")} />
          <div className="relative h-full w-full flex items-center justify-center p-10" style={{ zoom: 1.35 }}>
            {children}
          </div>
        </div>

        {/* Code window */}
        <div className="absolute left-14 right-14 bottom-24 h-[460px]">
          <CodeWindow code={code} filename={file.split("/").pop() ?? file} autoScroll maxHeight={420} className="h-full [&_pre]:text-[20px] [&_figcaption]:text-lg" />
        </div>

        {/* Scripted cursor */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          animate={{ x: cursor.x, y: cursor.y, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          aria-hidden
        >
          <svg width="48" height="56" viewBox="0 0 24 28" style={{ transform: "translate(-4px,-2px)" }}><path d="M3 2l17 11-7.5 1.5L17 25l-4 1.6-4.6-10.4L3 21z" fill="#141B2D" stroke="#fff" strokeWidth="1.5" /></svg>
        </motion.div>

        {/* End card */}
        <AnimatePresence>
          {ended && (
            <motion.div className={cn("absolute inset-0 z-30 flex flex-col items-center justify-center gap-6", dark ? "bg-midnight" : "bg-ivory")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center gap-4">
                <span className={cn("size-20 rounded-pill inline-flex items-center justify-center", dark ? "bg-champagne-light" : "bg-navy")}><span className={cn("size-5 rounded-pill", dark ? "bg-midnight" : "bg-champagne-light")} /></span>
                <span className="font-display font-bold" style={{ fontSize: 96 }}>Keelbiz</span>
                <span className="text-3xl text-slate">{brandHandle}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
