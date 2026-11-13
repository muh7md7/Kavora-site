import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";

/**
 * Stat counter. Pass `value` only when the number is real and confirmed.
 * Without a value it renders a visible [PLACEHOLDER] slot — never an invented figure.
 */
export function StatCounter({ value, decimals, prefix, suffix, label, note, className }:
  { value?: number; decimals?: number; prefix?: string; suffix?: string; label: string; note?: string; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="font-[560] tracking-[-0.045em] leading-none text-[clamp(44px,5vw,72px)]">
        {value === undefined ? <span className="ph-label !text-[11px] align-middle">[PLACEHOLDER]</span>
          : <CountUp to={value} decimals={decimals} prefix={prefix} suffix={suffix} />}
      </div>
      <p className="mt-3 text-[0.95rem] font-[550]">{label}</p>
      {note && <p className="mt-1 text-sm text-text-2">{note}</p>}
    </div>
  );
}
