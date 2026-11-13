"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { aiOffer } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * The eight use cases as cards that flip to show how each one actually runs.
 * The button flips; the enquiry link on the back is a separate control, so the card
 * never traps a keyboard user and the flow is readable without a mouse.
 */
export function FlipExamples() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {aiOffer.examples.map((e, i) => {
        const flipped = open === e.title;
        return (
          <Reveal as="li" key={e.title} index={i % 4} className="min-w-0">
            <div className={cn("flip-scene h-full min-h-[280px]")}>
              <div className={cn("flip-card h-full", flipped && "is-flipped")}>
                {/* front */}
                <div data-spot className="flip-face card p-6 flex flex-col" aria-hidden={flipped} inert={flipped ? true : undefined}>
                  <span className="num">0{i + 1}</span>
                  <h3 className="mt-4 !text-[1.1rem] !leading-snug">{e.title}</h3>
                  <p className="mt-2 text-text-2 text-[0.9rem] leading-snug">{e.does}</p>
                  <p className="mt-auto pt-4 text-[0.82rem]"><span className="text-text-2">Solves: </span>{e.solves}</p>
                  <button type="button" onClick={() => setOpen(e.title)} tabIndex={flipped ? -1 : 0}
                    className="mt-4 b b-secondary b-sm !w-full">How it works</button>
                </div>
                {/* back */}
                <div className="flip-face flip-back card !bg-[var(--surface-strong)] p-6 flex flex-col" aria-hidden={!flipped} inert={!flipped ? true : undefined}>
                  <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">How it works</p>
                  <ol className="mt-4 grid gap-2.5 flex-1">
                    {e.flow.map((f, n) => (
                      <li key={f} className="flex gap-2.5 text-[0.84rem] leading-snug">
                        <span className="size-5 rounded-full bg-[var(--graphite)] text-[var(--offwhite)] grid place-items-center shrink-0 text-[9px] font-[700]">{n + 1}</span>
                        {f}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => setOpen(null)} tabIndex={flipped ? 0 : -1} aria-label="Back to description" className="b b-icon b-sm shrink-0"><RotateCcw size={14} aria-hidden /></button>
                    <Link href={`/contact/?type=ai-custom&services=automation&topic=${encodeURIComponent(e.title)}`} tabIndex={flipped ? 0 : -1} className="b b-primary b-sm flex-1">
                      Enquire<ArrowUpRight size={14} className="b-arrow" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
