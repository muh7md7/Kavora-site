import { cn } from "@/lib/cn";

/** Chip — static label, or toggle when `onToggle` is passed (aria-pressed). */
export function Chip({ children, dot, mono, pressed, onToggle, className }:
  { children: React.ReactNode; dot?: boolean; mono?: boolean; pressed?: boolean; onToggle?: () => void; className?: string }) {
  const cls = cn("tag", dot && "tag-dot", mono && "tag-mono", className);
  if (onToggle) return <button type="button" className={cls} aria-pressed={!!pressed} onClick={onToggle}>{children}</button>;
  return <span className={cls}>{children}</span>;
}
