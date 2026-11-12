import type { ServiceId } from "@/content/site";
import { CheckoutDemo } from "@/components/glass/CheckoutDemo";
import { WorkflowCanvas } from "@/components/glass/WorkflowCanvas";
import { GlassSidebar } from "@/components/glass/GlassSidebar";
import { KpiRow } from "@/components/glass/StatCard";
import { AreaChart, GoalGauge } from "@/components/glass/GaugeChart";
import { Tabs } from "@/components/glass/Tabs";
import { BarChart3, Inbox, Users } from "lucide-react";

const Label = ({ t = "Sample data" }: { t?: string }) => <span className="chip chip-slate">{t}</span>;

function DeviceFrames() {
  return (
    <div className="flex items-end gap-4 justify-center">
      <div className="glass rounded-lg p-2 w-[420px] max-w-full"><div className="rounded-md bg-ivory h-56 p-4 flex flex-col gap-2"><div className="h-3 w-24 rounded bg-navy/80" /><div className="h-2 w-2/3 rounded bg-mist" /><div className="h-2 w-1/2 rounded bg-mist" /><div className="mt-auto grid grid-cols-3 gap-2">{[0,1,2].map(i=><div key={i} className="h-12 rounded-sm bg-pearl hairline"/>)}</div></div></div>
      <div className="glass rounded-lg p-1.5 w-28 shrink-0"><div className="rounded-md bg-ivory h-48 p-2 flex flex-col gap-1.5"><div className="h-2 w-10 rounded bg-navy/80" /><div className="h-1.5 w-full rounded bg-mist" /><div className="h-1.5 w-3/4 rounded bg-mist" /><div className="mt-auto h-6 rounded-pill bg-navy" /></div></div>
    </div>
  );
}

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
      <div className="flex items-center justify-between mb-3"><span className="font-semibold text-sm">Content calendar · Week 1</span><Label t="Illustrative" /></div>
      <div className="grid grid-cols-7 gap-2">{days.map((d, i) => (
        <div key={d} className="rounded-sm hairline bg-surface p-2 min-h-16"><div className="text-[10px] text-slate">{d}</div>{kinds[i] && <span className={`chip mt-1 ${i % 2 ? "chip-navy" : "chip-sage"}`}>{kinds[i]}</span>}</div>
      ))}</div>
    </div>
  );
}

function CampaignStructure() {
  return (
    <div className="glass rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-3"><span className="font-semibold text-sm">Campaign structure</span><Label t="Illustrative" /></div>
      <ul className="text-sm space-y-2">
        <li className="rounded-sm bg-navy-tint p-2 font-semibold text-navy">Campaign · Leads</li>
        <li className="ml-4 rounded-sm bg-surface-strong hairline p-2">Ad set · 25–54, interests</li>
        <li className="ml-8 rounded-sm bg-surface-strong hairline p-2 flex justify-between"><span>Ad · Video A</span><span className="chip chip-sage">Learning</span></li>
        <li className="ml-8 rounded-sm bg-surface-strong hairline p-2 flex justify-between"><span>Ad · Static B</span><span className="chip chip-slate">Paused</span></li>
      </ul>
    </div>
  );
}

function ReportingMock() {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <div className="flex items-center justify-between"><span className="font-semibold text-sm">Weekly report</span><Label t="Illustrative" /></div>
      <KpiRow stats={[
        { label: "Reach · Illustrative", value: "48k", delta: 9, icon: Users, tone: "sage" },
        { label: "Leads · Illustrative", value: "63", delta: 14, icon: Inbox, tone: "sage" },
        { label: "Cost / lead · Illustrative", value: "—", icon: BarChart3, tone: "navy" },
        { label: "Frequency · Illustrative", value: "1.8", delta: -4, icon: BarChart3, tone: "navy" },
      ]} />
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
    case "websites": return <div className="grid gap-8 lg:grid-cols-2 items-center"><DeviceFrames /><div className="flex justify-center"><CheckoutDemo /></div></div>;
    case "social": return <div className="grid gap-8 lg:grid-cols-2 items-center"><ReelShowcase /><CalendarMock /></div>;
    case "ads": return <div className="grid gap-8 lg:grid-cols-2 items-start"><CampaignStructure /><ReportingMock /></div>;
    case "automation": return <WorkflowCanvas />;
    case "dashboards": return <FullDashboard />;
  }
}
