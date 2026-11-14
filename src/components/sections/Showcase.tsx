"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BarChart3, Megaphone, MonitorSmartphone, Share2, Workflow } from "lucide-react";
import { services, type ServiceId } from "@/content/site";
import { Tabs } from "@/components/glass/Tabs";

// Interactive service illustrations, code-split and mounted only near the viewport.
const ServiceDemo = dynamic(() => import("./ServiceDemos").then((m) => m.ServiceDemo), { ssr: false });

const items: { id: ServiceId; label: string; icon: typeof Workflow; note: string }[] = [
  { id: "websites", label: "Websites", icon: MonitorSmartphone, note: "Switch between desktop, tablet and phone. Every site we build is responsive by default." },
  { id: "social", label: "Social", icon: Share2, note: "A planned month of posts, reels and stories — built around your audience." },
  { id: "ads", label: "Advertising", icon: Megaphone, note: "Structured Meta and Google campaigns with clear weekly reporting." },
  { id: "automation", label: "AI & Automation", icon: Workflow, note: "Hover or focus each step: an enquiry is qualified, logged and followed up automatically." },
  { id: "dashboards", label: "Dashboards", icon: BarChart3, note: "One clear view of leads, sales and operations — built on your own numbers." },
];

/** Home — "See it in action": one tabbed stage that demonstrates each service with a live, labelled illustration. */
export function Showcase() {
  const [active, setActive] = useState<string>(items[0].id);
  const [near, setNear] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "500px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  const cur = items.find((i) => i.id === active)!;
  const svc = services.find((s) => s.id === cur.id)!;

  return (
    <div ref={ref} className="stage-frame">
      <Tabs ariaLabel="Choose a service to preview" variant="top" items={items.map(({ id, label, icon }) => ({ id, label, icon }))} value={active} onChange={setActive} className="px-1 sm:px-2 pt-1">
        {() => (
          <>
            <div className="relative rounded-[calc(22px*var(--rs,1))] border border-line bg-bg-2/60 p-4 sm:p-8 min-h-[480px] flex items-center justify-center overflow-hidden">
              <div className="w-full panel-enter flex justify-center">{near ? <ServiceDemo id={cur.id} /> : null}</div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 pb-1">
              <p className="text-text-2 text-[0.95rem] max-w-[60ch]">{cur.note} <span className="text-text-2/70">Illustrative, sample data.</span></p>
              <Link href={`/services/${svc.slug}/`} className="btn btn-ghost">{svc.name} <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
            </div>
          </>
        )}
      </Tabs>
    </div>
  );
}
