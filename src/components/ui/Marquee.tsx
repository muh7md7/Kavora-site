import { cn } from "@/lib/cn";

/** Infinite marquee — CSS transform loop, pauses on hover, stops under reduced motion. Duplicate copy is aria-hidden. */
export function Marquee({ children, duration = 40, className, label }: { children: React.ReactNode; duration?: number; className?: string; label?: string }) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)} role={label ? "region" : undefined} aria-label={label}>
      <div className="marquee-track" style={{ ["--marquee-dur" as string]: `${duration}s` }}>
        <div className="flex shrink-0 items-center gap-[inherit] pr-[inherit]">{children}</div>
        <div className="flex shrink-0 items-center gap-[inherit] pr-[inherit]" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
