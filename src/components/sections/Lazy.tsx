"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Below-the-fold demos: code-split and mounted only when near the viewport.
const WorkflowCanvasL = dynamic(() => import("@/components/glass/WorkflowCanvas").then((m) => m.WorkflowCanvas));

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
