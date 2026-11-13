"use client";
import { useState } from "react";
import { Bot, Globe, LayoutDashboard, Megaphone, Sparkles } from "lucide-react";
import { Accordion, Chip, SelectCard, Tabs, Toggle } from "@/components/ui";

export function SelectDemo() {
  const [one, setOne] = useState("new");
  const [many, setMany] = useState<string[]>(["web"]);
  const flip = (id: string) => setMany((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div role="radiogroup" aria-label="Single select example" className="grid gap-3">
        <SelectCard icon={Sparkles} title="Something new" desc="Start from scratch" checked={one === "new"} onChange={() => setOne("new")} />
        <SelectCard icon={Globe} title="Improve what I have" desc="Redesign, fix or grow" checked={one === "improve"} onChange={() => setOne("improve")} />
      </div>
      <div role="group" aria-label="Multi select example" className="grid sm:grid-cols-2 gap-3">
        {[{ id: "web", t: "Website", i: Globe }, { id: "ads", t: "Advertising", i: Megaphone }, { id: "ai", t: "AI agents", i: Bot }, { id: "dash", t: "Dashboards", i: LayoutDashboard }].map((x) => (
          <SelectCard key={x.id} multi icon={x.i} title={x.t} checked={many.includes(x.id)} onChange={() => flip(x.id)} />
        ))}
      </div>
    </div>
  );
}

export function ControlsDemo() {
  const [on, setOn] = useState(true);
  const [chips, setChips] = useState<string[]>(["Websites"]);
  const t = (c: string) => setChips((x) => (x.includes(c) ? x.filter((y) => y !== c) : [...x, c]));
  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center gap-6">
        <Toggle checked={on} onChange={setOn} label="Monthly billing" />
        <Tabs ariaLabel="Example tabs" items={[{ id: "a", label: "Overview" }, { id: "b", label: "Packages" }, { id: "c", label: "FAQ" }]} />
      </div>
      <div className="flex flex-wrap gap-2">
        {["Websites", "Social", "Ads", "AI", "Dashboards"].map((c) => <Chip key={c} pressed={chips.includes(c)} onToggle={() => t(c)}>{c}</Chip>)}
        <Chip dot>Static chip</Chip><Chip mono>Sample data</Chip>
      </div>
    </div>
  );
}

export function AccordionDemo() {
  return <Accordion defaultOpen={0} items={[
    { q: "Can I start with one service?", a: "Yes. Every service works on its own, and can be combined later." },
    { q: "Do you work with businesses anywhere?", a: "Yes. We work remotely and plan around your time zone." },
    { q: "What happens after I enquire?", a: "We reply with questions or a short proposal. No obligation." },
  ]} />;
}
