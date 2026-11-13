import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Section header — eyebrow → H2 (masked word reveal, one italic accent) → lead. */
export function SectionHeader({ eyebrow, title, accent, after, lead, align = "left", as = "h2", underline, className, children }:
  { eyebrow?: string; title: string; accent?: string; after?: string; lead?: React.ReactNode; align?: "left" | "center"; as?: "h1" | "h2"; underline?: boolean; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("max-w-[52rem]", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
      <SplitHeading as={as} text={title} accent={accent} after={after} underline={underline} className={cn(eyebrow && "mt-5")} />
      {lead && <Reveal as="p" delay={180} className={cn("lead mt-6", align === "center" && "mx-auto")}>{lead}</Reveal>}
      {children && <Reveal delay={260} className="mt-8">{children}</Reveal>}
    </div>
  );
}
