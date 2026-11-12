import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "premium" | "glass" | "ghost";
type Props = {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

/** Button set (v2) — primary (charcoal → steel on hover), premium (steel), glass secondary, ghost link with drawn underline. */
export function Button({ href, variant = "primary", children, className, type = "button", disabled, onClick, ariaLabel }: Props) {
  const cls = cn("btn", `btn-${variant}`, disabled && "opacity-60 pointer-events-none", className);
  const inner = (
    <>
      {children}
      {variant === "ghost" ? <ArrowUpRight className="arrow" size={16} aria-hidden /> : variant !== "glass" && <ArrowUpRight className="btn-arrow" size={16} aria-hidden />}
    </>
  );
  if (href) return <Link href={href} className={cls} aria-label={ariaLabel}>{inner}</Link>;
  return <button type={type} className={cls} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>{inner}</button>;
}
