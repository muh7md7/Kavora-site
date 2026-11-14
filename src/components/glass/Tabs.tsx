"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string; icon?: LucideIcon; badge?: number };

type Props = {
  items: TabItem[];
  value?: string;
  onChange?: (id: string) => void;
  variant?: "top" | "segmented" | "dock";
  ariaLabel: string;
  className?: string;
  /** render panels (optional) */
  children?: (active: string) => React.ReactNode;
};

/**
 * Navigation Tabs ×3 — (a) top tabs with icons, (b) segmented control with sliding pill,
 * (c) dock with a badge. APG tabs pattern: roving tabindex, arrow keys, Home/End.
 */
export function Tabs({ items, value, onChange, variant = "segmented", ariaLabel, className, children }: Props) {
  const [internal, setInternal] = useState(items[0]?.id);
  const active = value ?? internal;
  const set = (id: string) => { setInternal(id); onChange?.(id); };
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length; let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault(); set(items[next].id); refs.current[next]?.focus();
  };

  // Sliding pill: measured from the active tab, animated with a CSS transition (no animation library).
  const [pill, setPill] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const activeIndex = items.findIndex((t) => t.id === active);
  useEffect(() => {
    const measure = () => { const el = refs.current[activeIndex]; if (el) setPill({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex, items.length]);
  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "glass relative inline-flex items-center gap-1 p-1 max-w-full overflow-x-auto",
          variant === "segmented" && "rounded-pill",
          variant === "top" && "rounded-md",
          variant === "dock" && "rounded-lg px-2 py-2 gap-2",
        )}
      >
        {pill && <span aria-hidden className={cn("tab-pill absolute left-0 top-0 bg-surface-strong shadow-sm", variant === "dock" ? "rounded-md" : "rounded-pill")} style={{ width: pill.w, height: pill.h, transform: `translate(${pill.x}px, ${pill.y}px)` }} />}
        {items.map((t, i) => {
          const on = t.id === active; const Icon = t.icon;
          return (
            <button
              key={t.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`${id}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={children ? `${id}-panel-${t.id}` : undefined}
              tabIndex={on ? 0 : -1}
              onClick={() => set(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative z-10 inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors min-h-11 whitespace-nowrap",
                variant === "dock" ? "size-11 rounded-md" : "px-4 rounded-pill",
                on ? "text-navy" : "text-ink hover:text-navy",
              )}
              aria-label={variant === "dock" ? t.label : undefined}
            >
              {on && !pill && <span className={cn("absolute inset-0 -z-10 bg-surface-strong shadow-sm", variant === "dock" ? "rounded-md" : "rounded-pill")} aria-hidden />}
              {Icon && <Icon size={16} aria-hidden />}
              {variant !== "dock" && t.label}
              {t.badge && <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-pill bg-sage text-white text-[10px] leading-4 text-center">{t.badge}</span>}
            </button>
          );
        })}
      </div>
      {children && items.map((t) => (
        <div key={t.id} role="tabpanel" id={`${id}-panel-${t.id}`} aria-labelledby={`${id}-tab-${t.id}`} hidden={t.id !== active} tabIndex={0} className="mt-4">
          {t.id === active && children(active)}
        </div>
      ))}
    </div>
  );
}
