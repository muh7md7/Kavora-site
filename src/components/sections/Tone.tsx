import { cn } from "@/lib/cn";

/**
 * Section wrapper that sets the light/dark theme scope. Every token (text, lines, glass, buttons)
 * re-maps under [data-theme="dark"], so sections alternate without per-component variants.
 */
export function Tone({ tone = "light", alt = false, grad = false, className, children, id, as = "section", ...rest }:
  { tone?: "light" | "dark"; alt?: boolean; grad?: boolean; className?: string; children: React.ReactNode; id?: string; as?: "section" | "div" } & React.AriaAttributes) {
  const Tag = as;
  return (
    <Tag id={id} data-theme={tone} className={cn("tone", grad && "tone-grad", alt && "!bg-bg-2", className)} {...rest}>
      {children}
    </Tag>
  );
}

/** Section heading block: eyebrow + headline (one serif-italic accent word) + optional lead. */
export function SectionHead({ eyebrow, title, accent, after, lead, className, align = "left" }:
  { eyebrow?: string; title: string; accent?: string; after?: string; lead?: React.ReactNode; className?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-5">{title} {accent && <span className="accent">{accent}</span>}{after ? ` ${after}` : ""}</h2>
      {lead && <p className={cn("lead mt-6", align === "center" && "mx-auto")}>{lead}</p>}
    </div>
  );
}
