import type { Metadata } from "next";
import { ogImage } from "@/content/site";
import { WorkGrid, WorkDemos } from "@/components/work/WorkGrid";
import { Tone } from "@/components/sections/Tone";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Work — what we build",
  description: "Interface demonstrations of the websites, social content, advertising accounts, AI agents and dashboards we build. Case studies are published only with client permission.",
  alternates: { canonical: "/work/" },
  openGraph: ogImage("work"),
};

export default function WorkPage() {
  return (
    <>
      <Tone grad className="section-hero overflow-hidden">
        <div className="aurora" aria-hidden><i /><i /><i /></div>
        <div className="container">
          <p className="eyebrow rv-auto">Work</p>
          <SplitHeading as="h1" auto underline text="Proof, not" accent="promises." className="display mt-7 max-w-[13ch]" />
          <p className="lead mt-8 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>
            Below are running demonstrations of the kind of work we deliver. Client case studies appear here once the client has approved the images, the figures and the wording — not before.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 rv-auto" style={{ ["--rv-delay" as string]: "420ms" }}>
            <Button href="/contact/">Start a project</Button>
            <Button href="/services/" variant="secondary" arrow="right">See the services</Button>
          </div>
        </div>
      </Tone>

      <WorkDemos />
      <WorkGrid />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work/" }]} />
    </>
  );
}
