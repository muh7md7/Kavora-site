"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bookmark, Heart, MessageCircle, Play, Send } from "lucide-react";
import { DeviceFrame, DemoShell } from "@/components/ui";
import { useInViewOnce, usePrefersReducedMotion } from "@/components/motion/useInView";
import { easeOut } from "@/lib/motion";
import { SocialDemoLazy } from "./lazy";
import { cn } from "@/lib/cn";

/**
 * Social demo — a planned month, shown rather than described:
 *  1. a phone: profile grid filling post by post, switchable to a reel,
 *  2. a drag-and-drop month calendar (keyboard-operable too),
 *  3. a caption + hashtag card and a small insights chart.
 * All content is invented for an example business.
 */

type Kind = "post" | "reel" | "story" | "carousel";
const kindLabel: Record<Kind, string> = { post: "Post", reel: "Reel", story: "Story", carousel: "Carousel" };
const kindTone: Record<Kind, string> = {
  post: "bg-[var(--graphite)] text-[var(--offwhite)]",
  reel: "bg-[var(--steel-blue)] text-[var(--deep-charcoal)]",
  story: "bg-[var(--mist-grey)] text-[var(--graphite)]",
  carousel: "bg-[color-mix(in_srgb,var(--graphite)_55%,var(--steel-blue))] text-[var(--offwhite)]",
};

const grid: { kind: Kind; label: string }[] = [
  { kind: "post", label: "Before / after" }, { kind: "reel", label: "Install in 30s" }, { kind: "carousel", label: "5 mistakes" },
  { kind: "post", label: "Team at work" }, { kind: "reel", label: "Customer q&a" }, { kind: "post", label: "Finished job" },
  { kind: "carousel", label: "How we quote" }, { kind: "post", label: "Review quote" }, { kind: "reel", label: "Tool of the week" },
];

export function SocialDemo() {
  const [view, setView] = useState<"grid" | "reel">("grid");
  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-5 items-start">
      <div className="grid gap-4 justify-items-center lg:justify-items-start">
        <div role="radiogroup" aria-label="Phone view" className="flex gap-1.5 p-1 rounded-pill border border-line-strong">
          {(["grid", "reel"] as const).map((v) => (
            <button key={v} type="button" role="radio" aria-checked={view === v} onClick={() => setView(v)}
              className={cn("px-4 min-h-11 rounded-pill text-[0.86rem] font-[550] transition-colors duration-[350ms]", view === v ? "bg-[var(--graphite)] text-[var(--offwhite)]" : "text-text-2 hover:text-text")}>
              {v === "grid" ? "Profile" : "Reel"}
            </button>
          ))}
        </div>
        <DemoShell label="Sample account" className="w-full max-w-[300px]">
          {(running) => (
            <DeviceFrame type="phone" label="Sample Instagram profile" className="!max-w-[300px]">
              <div data-theme="light" className="absolute inset-0 bg-bg pt-11">
                {view === "grid" ? <ProfileGrid running={running} /> : <Reel running={running} />}
              </div>
            </DeviceFrame>
          )}
        </DemoShell>
      </div>

      <div className="grid gap-5 min-w-0">
        <MonthCalendar />
        <div className="grid sm:grid-cols-2 gap-5">
          <CaptionCard />
          <Insights />
        </div>
      </div>
    </div>
  );
}

/* ---------------- profile ---------------- */
function ProfileGrid({ running }: { running: boolean }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const reduce = usePrefersReducedMotion();
  const on = inView && (running || reduce);
  return (
    <div ref={ref} className="h-full flex flex-col text-left">
      <div className="px-4 pb-3 flex items-center gap-3 border-b border-line">
        <span className="size-12 rounded-full bg-[var(--steel-blue)] grid place-items-center text-[var(--deep-charcoal)] font-[600] text-[13px] shrink-0">NF</span>
        <span className="min-w-0">
          <span className="block text-[12px] font-[600] tracking-[-0.02em] truncate">northfield.heating</span>
          <span className="block text-[10px] text-text-2">Heating &amp; plumbing · booking in bio</span>
        </span>
      </div>
      <div className="px-4 py-2.5 flex gap-5 border-b border-line" aria-hidden>
        {[["Posts", "128"], ["Followers", "4,210"], ["Following", "184"]].map(([k, v]) => (
          <span key={k} className="text-[10px] text-text-2">{k} <b className="block text-[11px] text-text font-[600]">{v}</b></span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {grid.map((g, i) => (
          <div key={i} className={cn("relative aspect-square grid place-items-center overflow-hidden", kindTone[g.kind])}
            style={reduce ? undefined : { animation: on ? `tile-in 520ms cubic-bezier(.22,1,.36,1) ${i * 130}ms both` : "none", opacity: on ? undefined : 0 }}>
            <span className="text-[7.5px] font-[550] leading-tight text-center px-1 opacity-85">{g.label}</span>
            {g.kind === "reel" && <Play size={9} className="absolute top-1 right-1 opacity-80" aria-hidden />}
          </div>
        ))}
      </div>
      <p className="mt-auto px-4 py-3 text-[9px] text-text-2 border-t border-line">Invented account for illustration.</p>
    </div>
  );
}

function Reel({ running }: { running: boolean }) {
  return (
    <div data-theme="dark" className="absolute inset-0 bg-[var(--deep-charcoal)] overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(70% 50% at 50% 25%, rgba(184,201,210,.3), transparent 70%)" }} aria-hidden />
      {/* a simple looping "scene": bars rising like a progress of work */}
      <div className="absolute inset-x-6 bottom-[38%] flex items-end gap-1.5 h-24" aria-hidden>
        {[38, 56, 44, 70, 62, 84].map((h, i) => (
          <i key={i} className="flex-1 rounded-t-[3px] bg-[var(--steel-blue)]/70 origin-bottom"
            style={{ height: `${h}%`, animation: running ? `reel-bar 2.4s cubic-bezier(.22,1,.36,1) ${i * 0.12}s infinite alternate` : "none" }} />
        ))}
      </div>
      <div className="absolute top-14 left-0 right-0 px-5">
        <p className="text-[15px] font-[560] tracking-[-0.03em] leading-tight text-[var(--offwhite)]">A radiator install,<br />start to finish.</p>
        <p className="mt-1.5 text-[10px] text-[var(--steel-blue)]">30 seconds · sound on</p>
      </div>
      <div className="absolute right-3 bottom-24 grid gap-4 text-[var(--offwhite)]" aria-hidden>
        {[Heart, MessageCircle, Send, Bookmark].map((Icon, i) => (
          <span key={i} className="grid justify-items-center gap-1"><Icon size={16} /><i className="text-[8px] not-italic opacity-70">{["412", "28", "61", "95"][i]}</i></span>
        ))}
      </div>
      <div className="absolute left-4 right-14 bottom-8">
        <p className="text-[9.5px] text-[var(--offwhite)]/90 leading-snug">northfield.heating · <span className="opacity-70">Old unit out, new one in, floor left clean.</span></p>
      </div>
      <div className="absolute inset-x-0 bottom-3 px-4" aria-hidden>
        <span className="block h-0.5 rounded-full bg-white/25 overflow-hidden">
          <i className="block h-full w-1/3 bg-white/80 rounded-full" style={{ animation: running ? "reel-seek 7s linear infinite" : "none" }} />
        </span>
      </div>
    </div>
  );
}

/* ---------------- calendar ---------------- */
const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type Slot = { id: string; day: number; kind: Kind; label: string };
const initial: Slot[] = [
  { id: "a", day: 0, kind: "post", label: "Before / after" },
  { id: "b", day: 2, kind: "reel", label: "Install in 30s" },
  { id: "c", day: 3, kind: "story", label: "Poll: old boiler?" },
  { id: "d", day: 4, kind: "carousel", label: "5 mistakes" },
  { id: "e", day: 6, kind: "post", label: "Review quote" },
  { id: "f", day: 1, kind: "story", label: "Van restock" },
];

function MonthCalendar() {
  const [slots, setSlots] = useState(initial);
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const move = (id: string, day: number) => setSlots((p) => p.map((s) => (s.id === id ? { ...s, day } : s)));

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="!text-[1.05rem]">A week, planned</h3>
        <span className="tag tag-mono !min-h-7 !px-2.5 !text-[10px]">Sample plan</span>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-text-2">Drag a post to another day — or select it and use the arrow keys. This is the approval view you&rsquo;d get each month.</p>

      <ul className="mt-5 grid grid-cols-7 gap-1.5" aria-label="Content week">
        {week.map((d, i) => (
          <li key={d}
            onDragOver={(e) => { e.preventDefault(); setOver(i); }}
            onDragLeave={() => setOver((o) => (o === i ? null : o))}
            onDrop={(e) => { e.preventDefault(); if (drag) move(drag, i); setDrag(null); setOver(null); }}
            className={cn("rounded-[12px] border p-1.5 min-h-[120px] transition-colors duration-200", over === i ? "border-text-2 bg-[var(--surface-strong)]" : "border-line bg-bg-2")}>
            <p className="font-mono text-[9px] uppercase tracking-[.1em] text-text-2 text-center pb-1.5"><abbr title={d} className="no-underline">{d.slice(0, 2)}</abbr></p>
            <div className="grid gap-1">
              <AnimatePresence initial={false}>
                {slots.filter((s) => s.day === i).map((s) => (
                  <motion.button key={s.id} layout type="button" draggable
                    onDragStart={() => setDrag(s.id)} onDragEnd={() => { setDrag(null); setOver(null); }}
                    onClick={() => setPicked((p) => (p === s.id ? null : s.id))}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight") { e.preventDefault(); move(s.id, Math.min(s.day + 1, 6)); }
                      if (e.key === "ArrowLeft") { e.preventDefault(); move(s.id, Math.max(s.day - 1, 0)); }
                    }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    aria-label={`${kindLabel[s.kind]}: ${s.label}, ${week[s.day]}. Use arrow keys to move.`}
                    aria-pressed={picked === s.id}
                    className={cn("rounded-[7px] px-1.5 py-1.5 text-left cursor-grab active:cursor-grabbing", kindTone[s.kind], picked === s.id && "ring-2 ring-offset-1 ring-[var(--accent)]")}>
                    <span className="block text-[7px] font-mono uppercase tracking-wider opacity-75">{kindLabel[s.kind]}</span>
                    <span className="block text-[8.5px] font-[550] leading-tight mt-0.5">{s.label}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap gap-3 text-[0.75rem] text-text-2">
        {(Object.keys(kindLabel) as Kind[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5"><i className={cn("size-2.5 rounded-[3px]", kindTone[k])} aria-hidden />{kindLabel[k]}</span>
        ))}
      </p>
    </div>
  );
}

/* ---------------- caption + insights ---------------- */
function CaptionCard() {
  return (
    <div className="card p-5 sm:p-6 flex flex-col">
      <h3 className="!text-[1.05rem]">Caption, written</h3>
      <p className="mt-1.5 text-[0.85rem] text-text-2">Short, specific, and written for the platform.</p>
      <div className="mt-5 card-inner p-4 flex-1">
        <p className="text-[0.88rem] leading-relaxed">Old unit out, new one in, floor left exactly as we found it.</p>
        <p className="text-[0.88rem] leading-relaxed mt-2.5 text-text-2">Same-week slots open for servicing — booking link in bio.</p>
        <p className="mt-3.5 text-[0.82rem] text-accent-text">#heatingengineer #boilerinstall #homeimprovement</p>
      </div>
      <p className="mt-3 text-[0.75rem] text-text-2">Three to five tags, chosen per post. Never a copy-pasted block of thirty.</p>
    </div>
  );
}

const bars = [42, 55, 48, 71, 64, 88, 79, 96];
function Insights() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref} className="card p-5 sm:p-6 flex flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="!text-[1.05rem]">What we report</h3>
        <span className="tag tag-mono !min-h-7 !px-2.5 !text-[10px]">Sample</span>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-text-2">Reach, saves and profile taps — and what we repeat because of them.</p>
      <div className="mt-5 flex-1 flex items-end gap-1.5 min-h-[86px]" aria-hidden>
        {bars.map((h, i) => (
          <i key={i} className={cn("flex-1 rounded-t-[3px] origin-bottom transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]", i === bars.length - 1 ? "bg-[var(--graphite)]" : "bg-[var(--steel-blue)]")}
            style={{ height: `${h}%`, transform: `scaleY(${inView ? 1 : 0.05})`, transitionDelay: `${i * 70}ms` }} />
        ))}
      </div>
      <p className="mt-3 text-[0.75rem] text-text-2">Eight weeks, sample data.</p>
    </div>
  );
}

export function SocialDemoSection() {
  return (
    <section id="demo" data-theme="dark" className="tone tone-grad grain section-major scroll-mt-24 overflow-hidden">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">See it working</p>
          <h2 className="mt-5">A month you can <span className="accent">approve.</span></h2>
          <p className="lead mt-6">The grid fills, the calendar moves, the captions are written. This is what lands in your inbox at the start of each month.</p>
        </div>
        <div className="mt-12"><SocialDemoLazy /></div>
      </div>
    </section>
  );
}
