"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { useVisible } from "@/components/motion/useInView";

/**
 * Wrapper for every live demo: "Sample data" badge, pause/play control (WCAG 2.2.2),
 * auto-pauses when off-screen. Children get `running` to drive JS loops; CSS loops pause via [data-paused].
 */
export function DemoShell({ children, className, label = "Sample data", controls = true, badge = true }:
  { children: React.ReactNode | ((running: boolean) => React.ReactNode); className?: string; label?: string; controls?: boolean; badge?: boolean }) {
  const [ref, visible] = useVisible<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  const running = visible && !paused;
  return (
    <div ref={ref} data-paused={!running} className={cn("relative", className)}>
      {typeof children === "function" ? children(running) : children}
      {(badge || controls) && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {badge && <span className="tag tag-mono !min-h-7 !px-2.5 !text-[10px]">{label}</span>}
          {controls && (
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play demo" : "Pause demo"}
              className="size-7 rounded-full grid place-items-center border border-line-strong bg-[var(--panel-bg)] text-text-2 hover:text-text">
              {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
