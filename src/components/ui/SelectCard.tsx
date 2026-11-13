"use client";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * SelectCard — icon + title + description, animated check (SVG stroke draw) and subtle lift when selected.
 * `multi` → role="checkbox"; otherwise role="radio" (parent supplies role="radiogroup" / "group" + label).
 */
export function SelectCard({ icon: Icon, title, desc, checked, onChange, multi = false, className, children, onKeyDown, tabIndex }:
  { icon?: LucideIcon; title: string; desc?: string; checked: boolean; onChange: () => void; multi?: boolean; className?: string; children?: React.ReactNode;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>; tabIndex?: number }) {
  return (
    <button type="button" role={multi ? "checkbox" : "radio"} aria-checked={checked} onClick={onChange} onKeyDown={onKeyDown} tabIndex={tabIndex}
      className={cn("select-card", className)}>
      {Icon && <span className="sc-icon" aria-hidden><Icon size={20} strokeWidth={1.75} /></span>}
      <span className="min-w-0 pr-8">
        <span className="block font-[560] text-[1.02rem] tracking-[-0.015em]">{title}</span>
        {desc && <span className="block text-[0.9rem] text-text-2 mt-1 leading-snug">{desc}</span>}
        {children}
      </span>
      <span className="sc-check" aria-hidden>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  );
}
