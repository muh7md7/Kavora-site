import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "icon";
type Props = {
  href?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  /** trailing arrow: "up" (external/next page), "right" (step/continue), false = none */
  arrow?: "up" | "right" | false;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  ariaLabel?: string;
  magnetic?: boolean;
  external?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "onClick">;

/**
 * v5 Button — primary · secondary · ghost · icon.
 * Hover: colour fill wipes up from the bottom (transform only), arrow nudges, magnetic pull (≤4px, cursor script, fine pointers only).
 */
export function Button({ href, variant = "primary", size = "md", arrow, icon: Icon, children, className, type = "button", disabled, onClick, ariaLabel, magnetic, external, ...rest }: Props) {
  const a = arrow ?? (variant === "icon" ? false : variant === "secondary" ? false : "up");
  const cls = cn("b", `b-${variant}`, size !== "md" && `b-${size}`, className);
  const mag = (magnetic ?? variant === "primary") ? { "data-magnetic": "" } : {};
  const inner = (
    <>
      {Icon && <Icon size={size === "sm" ? 16 : 18} aria-hidden />}
      {children}
      {a === "up" && <ArrowUpRight size={16} className="b-arrow" aria-hidden />}
      {a === "right" && <ArrowRight size={16} className="b-arrow-r" aria-hidden />}
    </>
  );
  if (href) {
    if (external) return <a href={href} className={cls} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" onClick={onClick} {...mag} {...rest}>{inner}</a>;
    return <Link href={href} className={cls} aria-label={ariaLabel} aria-disabled={disabled || undefined} onClick={onClick} {...mag} {...rest}>{inner}</Link>;
  }
  return <button type={type} className={cls} disabled={disabled} onClick={onClick} aria-label={ariaLabel} {...mag} {...rest}>{inner}</button>;
}
