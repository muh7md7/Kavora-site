import { t } from "@/i18n";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Inbox, MousePointerClick, Users, Workflow } from "lucide-react";
import { cn } from "@/lib/cn";

export type Stat = { label: string; value: string; delta?: number; icon?: LucideIcon; tone?: "sage" | "navy" };

/** Glass Stat Card — icon chip, value, delta chip (up/down tokens), hover lift −4px. */
export function StatCard({ label, value, delta, icon: Icon = Inbox, tone = "navy", className }: Stat & { className?: string }) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className={cn("glass lift rounded-md p-4 min-w-[160px] flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className={cn("inline-flex size-9 items-center justify-center rounded-sm", tone === "sage" ? "bg-sage-tint text-sage" : "bg-navy-tint text-navy")} aria-hidden><Icon size={18} /></span>
        {delta !== undefined && (
          <span className={cn("chip !normal-case !tracking-normal", up ? "chip-sage" : "chip-down")}>
            {up ? <ArrowUpRight size={12} aria-hidden /> : <ArrowDownRight size={12} aria-hidden />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div>
        <div className="font-display font-[560] tracking-[-0.04em] text-3xl leading-none text-ink">{value}</div>
        <div className="text-xs text-slate mt-1">{label}</div>
      </div>
    </div>
  );
}

export const sampleStats: Stat[] = [
  { label: t("New enquiries · Sample"), value: "128", delta: 12, icon: Inbox, tone: "sage" },
  { label: t("Qualified leads · Sample"), value: "46", delta: 8, icon: Users, tone: "sage" },
  { label: t("Workflows run · Sample"), value: "1,204", delta: 21, icon: Workflow, tone: "navy" },
  { label: t("CTA clicks · Sample"), value: "3.2k", delta: -3, icon: MousePointerClick, tone: "navy" },
];

/** KPI row — four stat cards; labelled Sample data. */
export function KpiRow({ stats = sampleStats, className }: { stats?: Stat[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-3", className)} aria-label={t("Sample KPIs")}>
      {stats.map((s) => <StatCard key={s.label} {...s} />)}
    </div>
  );
}
