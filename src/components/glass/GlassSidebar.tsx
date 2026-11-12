"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, ChevronRight, FolderKanban, Inbox, Moon, PanelLeft, Settings, Sun, Users } from "lucide-react";
import { dur, easeOut } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Item = { icon: React.ElementType; label: string; badge?: number; children?: { label: string; dot: string }[] };

const items: Item[] = [
  { icon: BarChart3, label: "Overview" },
  { icon: Inbox, label: "Enquiries", badge: 12 },
  { icon: FolderKanban, label: "Projects", badge: 4, children: [
    { label: "Websites", dot: "var(--sage)" }, { label: "Automation", dot: "var(--navy)" }, { label: "Campaigns", dot: "var(--champagne)" },
  ] },
  { icon: Users, label: "Clients" },
  { icon: Settings, label: "Settings" },
];

/**
 * Glass Sidebar — 72px icon rail ↔ 280px panel. Tooltips on the rail, count badges,
 * collapsible nested tree with coloured dots, theme toggle, user card. Sample data.
 */
export function GlassSidebar({ defaultOpen = true, className }: { defaultOpen?: boolean; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  const [active, setActive] = useState("Overview");
  const [tree, setTree] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <motion.aside
      aria-label="Sample sidebar"
      className={cn("glass rounded-lg p-2 flex flex-col overflow-hidden select-none", dark && "glass-smoke", className)}
      animate={{ width: open ? 280 : 72 }}
      transition={{ duration: dur.comp, ease: easeOut }}
      style={{ height: 420 }}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <AnimatePresence>{open && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.08 } }} exit={{ opacity: 0 }} className="font-display font-bold text-base">Keelbiz Desk</motion.span>
        )}</AnimatePresence>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Collapse sidebar" : "Expand sidebar"} aria-expanded={open} className="size-11 inline-flex items-center justify-center rounded-sm hover:bg-navy-tint/60">
          <PanelLeft size={18} aria-hidden />
        </button>
      </div>

      <ul className="flex flex-col gap-1 mt-1 flex-1">
        {items.map(({ icon: Icon, label, badge, children }) => {
          const isActive = active === label;
          return (
            <li key={label} className="relative group">
              <button
                type="button"
                onClick={() => { setActive(label); if (children) setTree((t) => !t); }}
                aria-current={isActive ? "page" : undefined}
                aria-expanded={children ? tree : undefined}
                title={!open ? label : undefined}
                className={cn("w-full flex items-center gap-3 rounded-sm px-3 min-h-11 text-sm font-medium transition-colors", isActive ? "bg-navy-tint text-navy" : "hover:bg-white/50")}
              >
                <span className="relative shrink-0"><Icon size={18} aria-hidden />
                  {badge && !open && <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-pill bg-sage text-white text-[10px] leading-4 text-center">{badge}</span>}
                </span>
                <AnimatePresence>{open && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.08 } }} exit={{ opacity: 0 }} className="flex-1 text-left whitespace-nowrap">{label}</motion.span>
                )}</AnimatePresence>
                {open && badge && <span className="chip chip-sage !normal-case !tracking-normal">{badge}</span>}
                {open && children && <ChevronRight size={14} className={cn("transition-transform", tree && "rotate-90")} aria-hidden />}
              </button>
              {!open && (
                <span role="tooltip" className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-sm bg-ink text-ivory text-xs px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">{label}</span>
              )}
              {open && children && tree && (
                <ul className="pl-9 py-1 flex flex-col gap-0.5">
                  {children.map((c) => (
                    <li key={c.label}><button type="button" className="w-full text-left text-sm py-2 px-2 rounded-sm hover:bg-white/50 flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ background: c.dot }} aria-hidden />{c.label}
                    </button></li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex flex-col gap-1">
        <button type="button" onClick={() => setDark((d) => !d)} className="flex items-center gap-3 rounded-sm px-3 min-h-11 text-sm hover:bg-white/50" aria-pressed={dark} aria-label="Toggle theme">
          {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
          {open && <span>{dark ? "Light" : "Dark"} theme</span>}
        </button>
        <div className={cn("flex items-center gap-3 rounded-sm px-2 py-2", open && "hairline bg-white/40")}>
          <span className="size-8 rounded-pill bg-navy text-white text-xs font-bold inline-flex items-center justify-center" aria-hidden>MK</span>
          {open && <span className="text-sm leading-tight"><span className="block font-semibold">Sample user</span><span className="block text-xs text-slate">Admin · Sample data</span></span>}
        </div>
      </div>
    </motion.aside>
  );
}
