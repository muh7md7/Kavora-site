import { t } from "@/i18n";
import type { ServiceId } from "@/content/site";
import { WebsitePreview } from "@/components/glass/WebsitePreview";
import { WorkflowCanvas } from "@/components/glass/WorkflowCanvas";
import { GlassSidebar } from "@/components/glass/GlassSidebar";
import { KpiRow } from "@/components/glass/StatCard";
import { AreaChart, GoalGauge } from "@/components/glass/GaugeChart";
import { Tabs } from "@/components/glass/Tabs";
import { BarChart3, Inbox, Users } from "lucide-react";

const Label = ({ t = "Sample data" }: { t?: string }) => <span className="chip chip-slate">{t}</span>;

function ReelShowcase() {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {["Hook", "Value", "CTA"].map((t, i) => (
        <div key={t} className="glass rounded-lg p-1.5 w-32"><div className="rounded-md bg-[url('/backdrops/abstract-1.svg')] bg-cover aspect-[9/16] flex flex-col justify-end p-2"><span className="chip chip-navy">{t}</span><span className="text-[10px] text-slate mt-1">Reel frame {i + 1} · 9:16</span></div></div>
      ))}
    </div>
  );
}

function CalendarMock() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const kinds = ["Reel", "Carousel", "", "Story", "Post", "", "Reel"];
  return (
    <div className="glass rounded-lg p-4 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-3"><span className="font-semibold text-sm">{t("Content calendar · Week 1")}</span><Label t="Illustrative" /></div>
      <div className="grid grid-cols-7 gap-2">{days.map((d, i) => (
        <div key={d} className="rounded-sm hairline bg-surface p-2 min-h-16"><div className="text-[10px] text-slate">{d}</div>{kinds[i] && <span className={`chip mt-1 ${i % 2 ? "chip-navy" : "chip-sage"}`}>{kinds[i]}</span>}</div>
      ))}</div>
    </div>
  );
}

function CampaignStructure() {
  return (
    <div className="glass rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-3"><span className="font-semibold text-sm">{t("Campaign structure")}</span><Label t="Illustrative" /></div>
      <ul className="text-sm space-y-2">
        <li className="rounded-sm bg-navy-tint p-2 font-semibold text-navy">{t("Campaign · Leads")}</li>
        <li className="ml-4 rounded-sm bg-surface-strong hairline p-2">{t("Ad set · 25–54, interests")}</li>
        <li className="ml-8 rounded-sm bg-surface-strong hairline p-2 flex justify-between"><span>{t("Ad · Video A")}</span><span className="chip chip-sage">{t("Learning")}</span></li>
        <li className="ml-8 rounded-sm bg-surface-strong hairline p-2 flex justify-between"><span>{t("Ad · Static B")}</span><span className="chip chip-slate">{t("Paused")}</span></li>
      </ul>
    </div>
  );
}

function ReportingMock() {
  return (
    <div className="w-full max-w-lg flex flex-col gap-3">
      <div className="flex items-center justify-between"><span className="font-semibold text-sm">{t("Weekly report")}</span><Label t="Illustrative" /></div>
      <KpiRow stats={[
        { label: t("Reach · Illustrative"), value: "48k", delta: 9, icon: Users, tone: "sage" },
        { label: t("Leads · Illustrative"), value: "63", delta: 14, icon: Inbox, tone: "sage" },
        { label: t("Click-through · Illustrative"), value: "2.4%", delta: 6, icon: BarChart3, tone: "navy" },
        { label: t("Frequency · Illustrative"), value: "1.8", delta: -4, icon: BarChart3, tone: "navy" },
      ]} className="!grid-cols-2" />
    </div>
  );
}

function FullDashboard() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2"><Tabs ariaLabel="Dashboard sections" variant="segmented" items={[{ id: "o", label: "Overview" }, { id: "l", label: "Leads" }, { id: "p", label: "Projects" }]} /><Label /></div>
      <div className="grid gap-4 lg:grid-cols-[auto_1fr] items-start">
        <div className="hidden md:block"><GlassSidebar /></div>
        <div className="flex flex-col gap-4 min-w-0">
          <KpiRow />
          <div className="grid gap-4 md:grid-cols-[240px_1fr]"><GoalGauge /><AreaChart /></div>
        </div>
      </div>
    </div>
  );
}

/** Per-service live demo block. */
export function ServiceDemo({ id }: { id: ServiceId }) {
  switch (id) {
    case "websites": return <WebsitePreview />;
    case "social": return <div className="grid gap-8 lg:grid-cols-2 items-center"><ReelShowcase /><CalendarMock /></div>;
    case "ads": return <div className="grid gap-8 lg:grid-cols-2 items-start"><CampaignStructure /><ReportingMock /></div>;
    case "automation": return <WorkflowCanvas />;
    case "dashboards": return <FullDashboard />;
  }
}
