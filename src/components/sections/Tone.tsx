import { cn } from "@/lib/cn";

/**
 * Section wrapper that sets the light/dark theme scope. Every token (text, lines, glass, buttons)
 * re-maps under [data-theme="dark"], so sections alternate without per-component variants.
 */
export function Tone({ tone = "light", alt = false, grad = false, grid = false, className, children, id, as = "section", ...rest }:
  { tone?: "light" | "dark" | "mist" | "warm"; alt?: boolean; grad?: boolean; grid?: boolean; className?: string; children: React.ReactNode; id?: string; as?: "section" | "div" } & React.AriaAttributes) {
  const Tag = as;
  const dark = tone === "dark";
  const variant = alt || tone === "mist" ? "tone-mist" : tone === "warm" ? "tone-warm" : "";
  return (
    <Tag id={id} data-theme={dark ? "dark" : "light"} className={cn("tone", variant, grad && "tone-grad", dark && "tone-inset", grid && "has-grid", className)} {...rest}>
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
      <h2 className="mt-5 max-w-[20ch]">{title} {accent && <span className="accent">{accent}</span>}{after ? ` ${after}` : ""}</h2>
      {lead && <p className={cn("lead mt-6", align === "center" && "mx-auto")}>{lead}</p>}
    </div>
  );
}

/** Renders an editable heading object: title + serif-italic accent word + trailing text. */
export function HeadText({ h }: { h: { title: string; accent?: string; after?: string } }) {
  return <>{h.title}{h.accent ? <> <span className="accent">{h.accent}</span></> : null}{h.after ? ` ${h.after}` : ""}</>;
}
