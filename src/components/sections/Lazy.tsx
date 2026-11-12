"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Below-the-fold demos: code-split and mounted only when near the viewport.
const WorkflowCanvasL = dynamic(() => import("@/components/glass/WorkflowCanvas").then((m) => m.WorkflowCanvas));
const GoalGaugeL = dynamic(() => import("@/components/glass/GaugeChart").then((m) => m.GoalGauge));
const TabsL = dynamic(() => import("@/components/glass/Tabs").then((m) => m.Tabs));
const StatCardL = dynamic(() => import("@/components/glass/StatCard").then((m) => m.StatCard));

function NearViewport({ children, minHeight = 200 }: { children: React.ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ minHeight }}>{on ? children : null}</div>;
}

export function LazyWorkflow() { return <NearViewport minHeight={260}><WorkflowCanvasL /></NearViewport>; }
export function LazyLabTabs() { return <NearViewport minHeight={60}><TabsL ariaLabel="Demo tabs" variant="segmented" items={[{ id: "a", label: "Overview" }, { id: "b", label: "Leads" }, { id: "c", label: "Reports" }]} /></NearViewport>; }
export function LazyLabStat() { return <NearViewport minHeight={120}><StatCardL label="New enquiries · Sample" value="128" delta={12} tone="sage" /></NearViewport>; }
export function LazyLabGauge() { return <NearViewport minHeight={160}><GoalGaugeL /></NearViewport>; }
