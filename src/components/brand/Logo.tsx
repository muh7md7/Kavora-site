import { cn } from "@/lib/cn";

/**
 * Keelbiz mark (v2). A "K" built from a single stem and two strokes: the upper arm is a straight
 * line, the lower arm sweeps like a hull's keel line — stability under motion. A short baseline
 * (the keel) anchors it. Geometry on a 32-unit grid. Legacy v1 assets: /public/brand/legacy/.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="currentColor" />
      <g stroke="var(--logo-ink, #F7F8F6)" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M11 8.5v14" />
        <path d="M11 15.5 20.5 8.5" />
        <path d="M11 15.5c4 .6 7.2 3 9.5 7" />
      </g>
      <path d="M9 25.6h14" stroke="var(--logo-keel, #B8C9D2)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-text", className)}>
      <LogoMark className={cn("size-8 text-[color:var(--logo-fill)]", markClassName)} />
      <span className="font-sans text-[1.15rem] font-[620] tracking-[-0.045em] leading-none">keelbiz</span>
    </span>
  );
}
