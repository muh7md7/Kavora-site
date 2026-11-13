"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ServiceId } from "@/content/site";
import { MiniPreview } from "./MiniPreview";

/**
 * Demos are the heaviest code on the site and always sit below the fold, so each one is
 * code-split, client-only, and not even requested until it is near the viewport —
 * dynamic() alone would fetch the chunk on mount and spend that time during hydration.
 * The skeleton is a real first frame (the service's mini preview at the demo's own height),
 * so nothing ever shows a blank box while the chunk loads.
 */
/**
 * The skeleton reserves the height the loaded demo actually takes at that breakpoint
 * (measured, see .demo-slot in globals.css), so swapping it for the real demo shifts nothing.
 */
function Skeleton({ id }: { id: ServiceId }) {
  return (
    <div className={`demo-slot demo-slot-${id} relative rounded-[20px] border border-line bg-bg-2 overflow-hidden`} aria-hidden>
      <MiniPreview id={id} className="absolute inset-0 !rounded-none !border-0 opacity-60" />
    </div>
  );
}

/** Mounts its child only once it is within 500px of the viewport. */
function Near({ id, children }: { id: ServiceId; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Without IntersectionObserver the demo mounts on first paint instead of on scroll.
  const [on, setOn] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window));
  useEffect(() => {
    const el = ref.current; if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "1200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{on ? children : <Skeleton id={id} />}</div>;
}

const WebsiteInner = dynamic(() => import("./WebsiteDemo").then((m) => m.WebsiteDemo), { ssr: false, loading: () => <Skeleton id="websites" /> });
const SocialInner = dynamic(() => import("./SocialDemo").then((m) => m.SocialDemo), { ssr: false, loading: () => <Skeleton id="social" /> });
const AdsInner = dynamic(() => import("./AdsDemo").then((m) => m.AdsDemo), { ssr: false, loading: () => <Skeleton id="ads" /> });
const AiInner = dynamic(() => import("./AiDemo").then((m) => m.AiDemo), { ssr: false, loading: () => <Skeleton id="automation" /> });
const DashboardInner = dynamic(() => import("./DashboardDemo").then((m) => m.DashboardDemo), { ssr: false, loading: () => <Skeleton id="dashboards" /> });

export function WebsiteDemoLazy() { return <Near id="websites"><WebsiteInner /></Near>; }
export function SocialDemoLazy() { return <Near id="social"><SocialInner /></Near>; }
export function AdsDemoLazy() { return <Near id="ads"><AdsInner /></Near>; }
export function AiDemoLazy() { return <Near id="automation"><AiInner /></Near>; }
export function DashboardDemoLazy() { return <Near id="dashboards"><DashboardInner /></Near>; }
