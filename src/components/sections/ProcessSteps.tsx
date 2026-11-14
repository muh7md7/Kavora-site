"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Process timeline — the step nearest the viewport centre becomes active (scroll-linked highlight, no hijacking). */
export function ProcessSteps({ items }: { items: { n: string; name: string; text: string }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <ol className="relative">
      <span className="absolute start-[21px] sm:start-[27px] top-2 bottom-2 w-px bg-line" aria-hidden />
      <span className="absolute start-[21px] sm:start-[27px] top-2 w-px bg-accent transition-[height] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ height: `${(active / (items.length - 1)) * 100}%` }} aria-hidden />
      {items.map((p, i) => (
        <li key={p.n} ref={(el) => { refs.current[i] = el; }} data-i={i} className="relative grid grid-cols-[44px_1fr] sm:grid-cols-[56px_1fr] gap-4 sm:gap-8 py-5 sm:py-10 first:pt-0">
          <span className={cn("relative z-10 size-11 sm:size-14 rounded-full border inline-flex items-center justify-center font-mono text-sm transition-all duration-500",
            i <= active ? "bg-text text-bg border-text" : "bg-bg-2 text-text-2 border-line")}>{p.n}</span>
          <div>
            <h3 className={cn("!text-[clamp(1.3rem,1.1rem+1.2vw,2.25rem)] sm:mt-0 mt-2 transition-colors duration-500", i === active ? "!text-text" : "!text-text-2")}>{p.name}</h3>
            <p className="text-text-2 mt-2 sm:mt-3 text-[0.98rem] sm:text-[1.02rem] max-w-md">{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
