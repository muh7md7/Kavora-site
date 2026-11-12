"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";

type Stage = "details" | "securing" | "confirmed";

/**
 * Glass Checkout Demo — INTERFACE DEMO ONLY. Prefilled fake values, no real inputs,
 * nothing leaves the page. Card tilts on pointer, flips to "Securing…", then confirmed.
 */
export function CheckoutDemo({ className, autoplay = false }: { className?: string; autoplay?: boolean }) {
  const [stage, setStage] = useState<Stage>("details");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const timers = useRef<number[]>([]);

  const run = () => {
    if (stage !== "details") return;
    setStage("securing");
    timers.current.push(window.setTimeout(() => setStage("confirmed"), 1600));
    timers.current.push(window.setTimeout(() => setStage("details"), 4200));
  };
  useEffect(() => { if (autoplay) { const t = window.setTimeout(run, 900); timers.current.push(t); } return () => timers.current.forEach(clearTimeout); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 12 });
  };

  return (
    <div className={cn("glass rounded-lg p-5 w-full max-w-sm flex flex-col gap-4", className)} aria-label="Interface demo: checkout">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Checkout</span>
        <span className="chip chip-slate">Interface demo</span>
      </div>

      <div style={{ perspective: 900 }} onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
        <motion.div
          className="relative h-44 rounded-md"
          animate={{ rotateX: tilt.x, rotateY: stage === "details" ? tilt.y : 180 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 rounded-md bg-midnight text-ivory p-4 flex flex-col justify-between on-midnight" style={{ backfaceVisibility: "hidden" }}>
            <div className="flex justify-between text-xs"><span className="font-semibold tracking-wider">KEELBIZ PAY</span><span className="text-champagne-light">DEMO</span></div>
            <div className="font-mono tracking-[.18em] text-lg">•••• •••• •••• 0000</div>
            <div className="flex justify-between text-xs"><span>SAMPLE NAME</span><span>00/00</span></div>
          </div>
          <div className="absolute inset-0 rounded-md bg-navy-tint text-navy p-4 flex flex-col items-center justify-center gap-2 overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            {stage === "securing" ? (
              <>
                <motion.span className="absolute inset-y-0 w-1/3 bg-white/50" initial={{ x: "-120%" }} animate={{ x: "320%" }} transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }} aria-hidden />
                <Lock size={22} aria-hidden /><span className="text-sm font-semibold">Securing your payment…</span>
              </>
            ) : (
              <>
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 420, damping: 24 }} className="size-11 rounded-pill bg-sage text-white inline-flex items-center justify-center"><Check size={22} aria-hidden /></motion.span>
                <span className="text-sm font-semibold text-sage">Confirmed (demo)</span>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <dt className="text-slate">Item</dt><dd className="text-right">Sample plan</dd>
        <dt className="text-slate">Total</dt><dd className="text-right font-semibold">0.00 (demo)</dd>
      </dl>

      <button type="button" onClick={run} disabled={stage !== "details"} className="btn btn-primary w-full" aria-live="polite">
        {stage === "details" && <><ShieldCheck size={16} aria-hidden /> Pay (demo)</>}
        {stage === "securing" && "Securing…"}
        {stage === "confirmed" && "Done"}
      </button>
      <p className="text-xs text-slate !max-w-none">No real card input. Nothing is sent anywhere.</p>
    </div>
  );
}
