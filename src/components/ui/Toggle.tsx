"use client";
import { cn } from "@/lib/cn";

/** Toggle — role="switch", 44px tap target. */
export function Toggle({ checked, onChange, label, hideLabel, className }:
  { checked: boolean; onChange: (v: boolean) => void; label: string; hideLabel?: boolean; className?: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={hideLabel ? label : undefined} onClick={() => onChange(!checked)}
      className={cn("inline-flex items-center gap-3 min-h-11 text-[0.95rem] font-[500]", className)}>
      <span className="switch" aria-hidden />
      {!hideLabel && <span>{label}</span>}
    </button>
  );
}
