import { cn } from "@/lib/cn";

/**
 * Image slot to be filled later. Fixed aspect ratio (no CLS). Visibly labelled [PLACEHOLDER].
 * Swap for <Image src=… placeholder="blur" /> once a real asset exists (see docs/DESIGN-SYSTEM.md → Imagery).
 */
export function Placeholder({ label, ratio = "16/10", className, round }: { label: string; ratio?: string; className?: string; round?: boolean }) {
  return (
    <div className={cn("ph w-full", round && "!rounded-full", className)} style={{ aspectRatio: ratio }} role="img" aria-label={`Placeholder: ${label}`}>
      <span className="ph-label">[PLACEHOLDER] {label}</span>
    </div>
  );
}
