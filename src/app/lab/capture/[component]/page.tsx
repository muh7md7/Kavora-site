import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { findLab, lab } from "@/lab/registry";
import { LabDemo } from "@/components/lab/LabDemo";
import { readSource } from "@/lib/source";
import { CaptureFrame } from "@/components/lab/CaptureFrame";
import type { Timeline } from "@/lab/timelines/types";
import { site } from "@/content/site";

export const dynamicParams = false;
export function generateStaticParams() { return lab.map((e) => ({ component: e.slug })); }
export const metadata: Metadata = { title: "Reel capture", robots: { index: false, follow: false } };

export default async function CapturePage({ params }: { params: Promise<{ component: string }> }) {
  const e = findLab((await params).component);
  if (!e) notFound();
  const code = readSource(e.file);
  const timeline = JSON.parse(readSource(`src/lab/timelines/${e.timeline}.json`)) as Timeline;
  const handle = site.socials.instagram.startsWith("[") ? "@keelbiz [TO CONFIRM]" : site.socials.instagram.replace(/^https?:\/\/[^/]+\//, "@");
  return (
    <Suspense>
      <CaptureFrame title={e.title} version={e.version} code={code} file={e.file} timeline={timeline} brandHandle={handle}>
        <LabDemo slug={e.slug} autoplay />
      </CaptureFrame>
    </Suspense>
  );
}
