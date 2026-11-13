"use client";
import type { ReactNode } from "react";
import { GlassNavbar } from "@/components/glass/GlassNavbar";
import { GlassSidebar } from "@/components/glass/GlassSidebar";
import { Tabs } from "@/components/glass/Tabs";
import { KpiRow } from "@/components/glass/StatCard";
import { AreaChart, GoalGauge } from "@/components/glass/GaugeChart";
import { CheckoutDemo } from "@/components/glass/CheckoutDemo";
import { CodeWindow } from "@/components/glass/CodeWindow";
import { WorkflowCanvas } from "@/components/glass/WorkflowCanvas";
import { Button } from "@/components/glass/Button";
import { MobileSheetDemo } from "@/components/lab/MobileSheetDemo";
import { BarChart3, Inbox, Settings, Users } from "lucide-react";

const demoTabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "leads", label: "Leads", icon: Inbox, badge: 3 },
  { id: "clients", label: "Clients", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

/** Live demo per Lab entry (client-side so icons/handlers stay in one tree). */
export function LabDemo({ slug, autoplay }: { slug: string; autoplay?: boolean }): ReactNode {
  const o = { autoplay };
  switch (slug) {
    case "navbar": return <div className="w-full min-w-0"><GlassNavbar inline /></div>;
    case "mobile-sheet": return <MobileSheetDemo />;
    case "sidebar": return <GlassSidebar />;
    case "tabs": return (
      <div className="flex flex-col gap-5 items-start">
        <Tabs ariaLabel="Top tabs" variant="top" items={demoTabs} />
        <Tabs ariaLabel="Segmented" variant="segmented" items={demoTabs.map(({ id, label }) => ({ id, label }))} />
        <Tabs ariaLabel="Dock" variant="dock" items={demoTabs} />
      </div>
    );
    case "stat-card": return <KpiRow className="!grid-cols-2 w-full max-w-md" />;
    case "gauge": return <div className="grid md:grid-cols-[260px_1fr] gap-4 w-full max-w-3xl"><GoalGauge /><AreaChart /></div>;
    case "checkout": return <CheckoutDemo autoplay={o.autoplay} />;
    case "code-window": return <CodeWindow filename="Button.tsx" code={`export function Button({ variant = "primary" }) {\n  return <button className={\`btn btn-\${variant}\`} />;\n}`} />;
    case "workflow": return <div className="w-full max-w-3xl"><WorkflowCanvas /></div>;
    case "buttons": return (
      <div className="flex flex-wrap gap-3 items-center">
        <Button>Primary</Button><Button variant="premium">Premium plan</Button><Button variant="glass">Glass</Button><Button variant="ghost">Ghost link</Button>
      </div>
    );
    case "cursor": return (
      <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
        {["View", "Drag", "Open"].map((l) => <div key={l} data-cursor={l} className="glass rounded-[16px] h-28 flex items-end p-3 text-sm text-text-2">Hover · {l}</div>)}
        <a href="#" onClick={(e) => e.preventDefault()} className="col-span-3 btn btn-glass">A link grows the ring</a>
      </div>
    );
    default: return null;
  }
}
