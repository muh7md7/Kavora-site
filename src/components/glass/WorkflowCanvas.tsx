"use client";
import { useEffect, useRef, useState } from "react";
import { Bot, Database, Inbox, Send, Users } from "lucide-react";
import { cn } from "@/lib/cn";

const nodes = [
  { id: "lead", label: "New Lead", icon: Inbox, tone: "sage", what: "An enquiry arrives from the website form, WhatsApp or an ad." },
  { id: "ai", label: "AI Qualify", icon: Bot, tone: "navy", what: "An AI agent asks the right questions and scores fit against your criteria." },
  { id: "crm", label: "CRM", icon: Database, tone: "navy", what: "The lead, transcript and score are stored in your CRM or sheet." },
  { id: "follow", label: "Follow-up", icon: Send, tone: "sage", what: "A tailored reply goes out automatically; reminders are scheduled." },
  { id: "sales", label: "Sales Team", icon: Users, tone: "navy", what: "Qualified leads are handed to a person with full context." },
] as const;

/**
 * Workflow Canvas — nodes + animated connectors. One dot travels the path (~2.4s loop),
 * paused when off-screen. Hover/focus a node reveals what happens there. Example only.
 */
export function WorkflowCanvas({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => { // pause the loop when off-screen
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const current = nodes.find((n) => n.id === active);

  return (
    <div ref={ref} className={cn("glass rounded-lg p-4 md:p-6 flex flex-col gap-4", className)} aria-label="Example workflow">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-sm font-semibold">Enquiry → CRM</span>
        <span className="chip chip-slate">Example workflow — tailored per client</span>
      </div>

      <div className="relative">
        {/* connector */}
        <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 w-full hidden md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="1" x2="100" y2="1" stroke="var(--mist)" strokeWidth="0.4" />
        </svg>
        <span className={cn("wf-dot absolute top-1/2 -translate-y-1/2 size-2.5 rounded-pill bg-champagne shadow hidden md:block", inView && "is-in")} aria-hidden />
        <ol className={cn("relative grid gap-3", compact ? "grid-cols-5" : "grid-cols-2 md:grid-cols-5")}>
          {nodes.map(({ id, label, icon: Icon, tone }) => (
            <li key={id}>
              <button
                type="button"
                onMouseEnter={() => setActive(id)} onFocus={() => setActive(id)} onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)}
                aria-describedby={`wf-${id}`}
                className={cn("lift glass-solid w-full rounded-md flex flex-col items-center gap-2 text-center", compact ? "p-2" : "p-3 min-h-24", active === id && "!border-navy")}
              >
                <span className={cn("inline-flex size-9 items-center justify-center rounded-sm", tone === "sage" ? "bg-sage-tint text-sage" : "bg-navy-tint text-navy")} aria-hidden><Icon size={18} /></span>
                <span className={cn("font-semibold leading-tight", compact ? "text-[11px]" : "text-sm")}>{label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {!compact && (
        <p className="text-sm text-slate min-h-10 !max-w-none" aria-live="polite">
          {current ? <><strong className="text-ink">{current.label}:</strong> {current.what}</> : "Hover or focus a step to see what happens there."}
        </p>
      )}
      <div className="sr-only">{nodes.map((n) => <span key={n.id} id={`wf-${n.id}`}>{n.what}</span>)}</div>
    </div>
  );
}
