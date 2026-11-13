"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { shortName, stackFlow, type ServiceId } from "@/content/site";
import { contactHref, serviceIcon } from "@/content/enquiry";
import { Button } from "@/components/ui";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Build your stack — switch services on and off and watch how the ones you picked connect.
 * The diagram is the argument: alone each service works; together they hand work to each other.
 * The CTA carries the selection into the contact wizard (?type=&services=).
 */
const order: ServiceId[] = ["social", "ads", "websites", "automation", "dashboards"];
const col: Record<ServiceId, number> = { social: 0, ads: 0, websites: 1, automation: 2, dashboards: 3 };
const colTitle = ["Attract", "Convert", "Automate", "Manage"];

export function StackBuilder() {
  const [on, setOn] = useState<ServiceId[]>(["websites", "ads"]);
  const toggle = (id: ServiceId) => setOn((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const links = useMemo(() => stackFlow.filter((f) => on.includes(f.from) && on.includes(f.to)), [on]);
  const n = on.length;

  return (
    <section id="build" data-theme="dark" className="tone tone-grad grain section-major scroll-mt-24">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">Build your stack</p>
          <h2 className="mt-5">Switch things on. See what it <span className="accent">becomes.</span></h2>
          <p className="lead mt-6">No bundles. Pick only what you need — the diagram shows how the pieces you choose hand work to each other.</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-10 items-start">
          {/* switches */}
          <div className="card !bg-[var(--panel-bg)] p-4 grid gap-1.5" role="group" aria-label="Choose services">
            {order.map((id) => {
              const Icon = serviceIcon[id];
              const active = on.includes(id);
              return (
                <button key={id} type="button" role="switch" aria-checked={active} onClick={() => toggle(id)}
                  className={cn("flex items-center gap-3 rounded-[14px] p-3 min-h-14 text-left transition-colors duration-[350ms]", active ? "bg-[var(--surface-strong)]" : "hover:bg-[var(--surface)]")}>
                  <span className={cn("size-9 rounded-[11px] grid place-items-center shrink-0 transition-colors duration-[350ms]", active ? "bg-[var(--steel-blue)] text-[var(--deep-charcoal)]" : "border border-line text-text-2")}>
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-[0.95rem] font-[550] truncate transition-colors", active ? "text-text" : "text-text-2")}>{shortName[id]}</span>
                    <span className="block text-[0.8rem] text-text-2 truncate">{colTitle[col[id]]}</span>
                  </span>
                  <span className="switch scale-[0.82] origin-right" aria-hidden />
                </button>
              );
            })}
          </div>

          {/* diagram */}
          <div className="card !bg-transparent p-5 md:p-8 min-h-[420px] flex flex-col">
            <div className="grid grid-cols-4 gap-2 md:gap-4 flex-1">
              {colTitle.map((c, ci) => (
                <div key={c} className="flex flex-col min-w-0">
                  <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[.12em] text-text-2 pb-3 border-b border-line truncate">{c}</p>
                  <div className="mt-4 grid gap-2 content-start">
                    <AnimatePresence initial={false}>
                      {order.filter((id) => col[id] === ci && on.includes(id)).map((id) => {
                        const Icon = serviceIcon[id];
                        return (
                          <motion.div key={id} layout initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: easeOut }}
                            className="card-inner !bg-[var(--surface-strong)] p-3 flex items-center gap-2 min-w-0">
                            <Icon size={14} className="shrink-0" aria-hidden />
                            <span className="text-[0.78rem] md:text-[0.86rem] font-[550] truncate">{shortName[id]}</span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* connections, in words — readable on every screen and to screen readers */}
            <div className="mt-8 pt-6 border-t border-line min-h-[108px]">
              <p className="font-mono text-[11px] uppercase tracking-[.12em] text-text-2">How they connect</p>
              <ul className="mt-3 grid gap-1.5" aria-live="polite">
                <AnimatePresence initial={false} mode="popLayout">
                  {links.length === 0 ? (
                    <motion.li key="none" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[0.92rem] text-text-2">
                      {n === 0 ? "Nothing selected yet — switch on whatever you're considering." : "This one runs on its own. Add another to see them connect."}
                    </motion.li>
                  ) : links.map((l) => (
                    <motion.li key={`${l.from}-${l.to}`} layout initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: easeOut }}
                      className="flex items-center gap-2 text-[0.92rem]">
                      <span className="font-[550]">{shortName[l.from]}</span>
                      <ArrowRight size={13} className="text-text-2 shrink-0" aria-hidden />
                      <span className="text-text-2">{l.label}</span>
                      <span className="font-[550]">{shortName[l.to]}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 card !bg-[var(--panel-bg)] p-6 md:p-7 flex flex-wrap items-center justify-between gap-6">
          <p className="text-[1.05rem]">
            <span className="text-text-2">Your solution: </span>
            <span className="font-[560]" aria-live="polite">{n === 0 ? "nothing selected yet" : `${n} service${n > 1 ? "s" : ""} — ${on.map((id) => shortName[id]).join(" + ")}`}</span>
          </p>
          <Button href={contactHref({ type: n > 1 ? "multiple" : n === 1 ? "single" : undefined, services: on })} arrow="right">
            {n === 0 ? "Talk it through" : `Get a quote for ${n === 1 ? "this" : "these"}`}
          </Button>
        </div>
      </div>
    </section>
  );
}
