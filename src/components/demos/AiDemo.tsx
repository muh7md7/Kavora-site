"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, CheckCheck, Database, MessageSquare, Sparkles, UserRound, Workflow } from "lucide-react";
import { DeviceFrame, DemoShell } from "@/components/ui";
import { useInViewOnce, usePrefersReducedMotion } from "@/components/motion/useInView";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * AI demo — three things, in the order a visitor asks them:
 *  1. a chat you can actually play: tap a question, the agent types and answers,
 *  2. the workflow behind it, with nodes lighting up as a lead moves through,
 *  3. a time-saved calculator you drive with two sliders.
 * The answers are scripted for an invented business — no live model is called.
 */

type Msg = { from: "user" | "bot"; text: string };
const script: { q: string; a: string }[] = [
  { q: "What are your prices?", a: "Servicing starts at a fixed price with no callout fee, and installations are quoted after a quick look at your setup. Want me to book a free quote visit?" },
  { q: "Are you open on Sunday?", a: "The office is closed Sundays, but we run an emergency line all weekend. I can log your details now and someone will call you back within the hour." },
  { q: "Can I book a visit?", a: "Yes — I have Thursday 9–11am or Friday 2–4pm this week. Which suits you better?" },
  { q: "Do you cover my area?", a: "We cover a 15km radius from the depot. If you send me your postcode I'll confirm straight away." },
  { q: "I need someone urgently", a: "Understood — I'm flagging this as urgent and passing you to the on-call engineer now. Can I take a number to call you back on?" },
];

export function AiDemo() {
  return (
    <div className="grid gap-5">
      <div className="grid lg:grid-cols-[340px_1fr] gap-5 items-start">
        <div className="justify-self-center lg:justify-self-start w-full max-w-[320px]">
          <ChatPhone />
        </div>
        <div className="grid gap-5 min-w-0">
          <WorkflowCanvas />
          <TimeSaved />
        </div>
      </div>
    </div>
  );
}

/* ---------------- playable chat ---------------- */
function ChatPhone() {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hi — I'm the assistant for Northfield Heating. Ask me anything, or tap a question below." }]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const timers = useRef<number[]>([]);
  const feed = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { feed.current?.scrollTo({ top: feed.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const ask = (q: string) => {
    if (typing) return;
    const hit = script.find((s) => s.q === q)!;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setAsked((a) => [...a, q]);
    setTyping(true);
    timers.current.push(window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: hit.a }]);
    }, 1400));
  };

  const left = script.filter((s) => !asked.includes(s.q));

  return (
    <div className="grid gap-3">
      <DemoShell label="Scripted answers" controls={false}>
        <DeviceFrame type="phone" className="!max-w-[320px] mx-auto">
          <div data-theme="light" className="absolute inset-0 bg-bg flex flex-col pt-11">
            {/* header */}
            <div className="px-4 pb-3 flex items-center gap-2.5 border-b border-line shrink-0">
              <span className="size-8 rounded-full bg-[var(--graphite)] text-[var(--offwhite)] grid place-items-center shrink-0"><Sparkles size={14} aria-hidden /></span>
              <span className="min-w-0">
                <span className="block text-[11px] font-[600] tracking-[-0.02em] truncate">Northfield Assistant</span>
                <span className="block text-[9px] text-text-2 flex items-center gap-1"><i className="size-1.5 rounded-full bg-[var(--moss)]" aria-hidden />Replies instantly</span>
              </span>
            </div>
            {/* feed */}
            <div ref={feed} className="flex-1 min-h-0 overflow-y-auto px-3 py-3 grid content-start gap-2" role="log" aria-live="polite" aria-label="Conversation">
              {msgs.map((m, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: easeOut }}
                  className={cn("max-w-[86%] rounded-[13px] px-3 py-2 text-[10.5px] leading-snug",
                    m.from === "user" ? "justify-self-end rounded-br-[3px] bg-[var(--graphite)] text-[var(--offwhite)]" : "justify-self-start rounded-bl-[3px] bg-bg-2 border border-line")}>
                  {m.text}
                </motion.p>
              ))}
              {typing && (
                <span className="justify-self-start rounded-[13px] rounded-bl-[3px] bg-bg-2 border border-line px-3 py-2.5 flex gap-1 mini-typing" aria-label="Assistant is typing">
                  <i /><i /><i />
                </span>
              )}
            </div>
            {/* composer */}
            <div className="shrink-0 border-t border-line p-2.5">
              <div className="flex flex-wrap gap-1.5">
                <AnimatePresence initial={false} mode="popLayout">
                  {left.slice(0, 3).map((s) => (
                    <motion.button key={s.q} layout type="button" onClick={() => ask(s.q)} disabled={typing}
                      initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25, ease: easeOut }}
                      className="rounded-pill border border-line-strong px-2.5 py-1.5 text-[9.5px] font-[550] hover:bg-[var(--surface-strong)] disabled:opacity-40 transition-colors">
                      {s.q}
                    </motion.button>
                  ))}
                </AnimatePresence>
                {left.length === 0 && <span className="text-[9.5px] text-text-2 px-1 py-1.5">That&rsquo;s the scripted set — a real agent answers anything.</span>}
              </div>
            </div>
          </div>
        </DeviceFrame>
      </DemoShell>
      <p className="text-[0.8rem] text-text-2 text-center lg:text-left">Tap a question. Answers are scripted for an invented business.</p>
    </div>
  );
}

/* ---------------- workflow canvas ---------------- */
const nodes = [
  { icon: MessageSquare, name: "Enquiry", sub: "Form, WhatsApp or DM" },
  { icon: Sparkles, name: "AI qualifies", sub: "Asks, checks, scores" },
  { icon: Database, name: "CRM", sub: "Record created" },
  { icon: Calendar, name: "Calendar", sub: "Slot offered" },
  { icon: UserRound, name: "You", sub: "Only the real ones" },
];

function WorkflowCanvas() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ margin: "0px 0px -10% 0px" });
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView || reduce) return;
    let n = -1;
    const i = setInterval(() => { n = (n + 1) % (nodes.length + 2); setActive(n); }, 900);
    return () => clearInterval(i);
  }, [inView, reduce]);

  const lit = (i: number) => reduce || active >= i;

  return (
    <div ref={ref} className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="!text-[1.05rem]">What happens behind it</h3>
        <span className="tag tag-mono !min-h-7 !px-2.5 !text-[10px]">Sample flow</span>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-text-2">A lead moving through the automation, step by step. Yours is designed around your own process.</p>

      <ol className="mt-6 grid gap-3 sm:grid-cols-5 relative">
        {/* rail */}
        <span className="hidden sm:block absolute left-[10%] right-[10%] top-6 h-px bg-line" aria-hidden />
        {nodes.map((n, i) => (
          <li key={n.name} className="relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 min-w-0">
            <span className={cn("relative z-10 size-12 rounded-[14px] grid place-items-center shrink-0 border transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
              lit(i) ? "bg-[var(--graphite)] text-[var(--offwhite)] border-[var(--graphite)]" : "bg-bg border-line text-text-2")}
              style={active === i && !reduce ? { animation: "node-pulse 900ms ease-in-out" } : undefined}>
              <n.icon size={17} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="min-w-0 sm:mt-4">
              <span className={cn("block text-[0.9rem] font-[550] transition-colors duration-500", lit(i) ? "text-text" : "text-text-2")}>{n.name}</span>
              <span className="block text-[0.78rem] text-text-2 leading-snug">{n.sub}</span>
            </span>
          </li>
        ))}
      </ol>

      <p className={cn("mt-6 pt-5 border-t border-line text-[0.85rem] transition-opacity duration-500 flex items-center gap-2", lit(nodes.length) ? "opacity-100" : "opacity-40")}>
        <CheckCheck size={15} className="shrink-0" aria-hidden />
        <span><span className="font-[550]">Qualified lead with a booked slot</span> <span className="text-text-2">— before anyone on your team has opened their laptop.</span></span>
      </p>
    </div>
  );
}

/* ---------------- time saved ---------------- */
function TimeSaved() {
  const [msgs, setMsgs] = useState(35);
  const [mins, setMins] = useState(4);
  const hours = Math.round((msgs * mins * 30) / 60);
  const days = (hours / 8).toFixed(1);

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="!text-[1.05rem]">What it gives you back</h3>
        <span className="tag tag-mono !min-h-7 !px-2.5 !text-[10px]">Your numbers</span>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-text-2">Move the sliders to your own volume. This is arithmetic on what you enter, not a claim about results.</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-[0.88rem] font-[550] flex justify-between gap-3"><span>Messages a day</span><span className="font-mono text-text-2">{msgs}</span></span>
          <input type="range" min={5} max={200} step={5} value={msgs} onChange={(e) => setMsgs(Number(e.target.value))} className="range mt-3 w-full"
            style={{ ["--p" as string]: `${((msgs - 5) / 195) * 100}%` }} aria-valuetext={`${msgs} messages a day`} />
        </label>
        <label className="block">
          <span className="text-[0.88rem] font-[550] flex justify-between gap-3"><span>Minutes each</span><span className="font-mono text-text-2">{mins}</span></span>
          <input type="range" min={1} max={15} step={1} value={mins} onChange={(e) => setMins(Number(e.target.value))} className="range mt-3 w-full"
            style={{ ["--p" as string]: `${((mins - 1) / 14) * 100}%` }} aria-valuetext={`${mins} minutes each`} />
        </label>
      </div>

      <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-end gap-x-8 gap-y-3" aria-live="polite">
        <p>
          <span className="block font-mono text-[10px] uppercase tracking-[.12em] text-text-2">Hours a month</span>
          <span className="block mt-1.5 text-[2.1rem] font-[560] tracking-[-0.045em] leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>{hours}</span>
        </p>
        <p>
          <span className="block font-mono text-[10px] uppercase tracking-[.12em] text-text-2">Working days</span>
          <span className="block mt-1.5 text-[2.1rem] font-[560] tracking-[-0.045em] leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>{days}</span>
        </p>
        <p className="text-[0.8rem] text-text-2 max-w-[26ch]">Assumes 30 days and an 8-hour day. Not every message can or should be automated.</p>
      </div>
    </div>
  );
}

export function AiDemoSection() {
  return (
    <section id="demo" data-theme="dark" className="tone tone-grad grain section-major scroll-mt-24 overflow-hidden">
      <div className="container">
        <div className="max-w-[46rem]">
          <p className="eyebrow">See it working</p>
          <h2 className="mt-5">Ask it something. It <span className="accent">answers.</span></h2>
          <p className="lead mt-6">Most AI gets sold with a video. Here it is running: a conversation you can drive, the workflow it triggers, and the hours it hands back.</p>
        </div>
        <div className="mt-12 flex items-center gap-3 flex-wrap">
          <span className="tag tag-mono"><Workflow size={12} aria-hidden />Chat · workflow · calculator</span>
        </div>
        <div className="mt-6"><AiDemo /></div>
      </div>
    </section>
  );
}
