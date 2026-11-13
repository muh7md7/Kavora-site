import type { Metadata } from "next";
import { HubHero } from "@/components/services/HubHero";
import { ServiceBento } from "@/components/services/ServiceBento";
import { StackBuilder } from "@/components/services/StackBuilder";
import { SystemPinned } from "@/components/services/SystemPinned";
import { CompareTable } from "@/components/services/CompareTable";
import { Tone } from "@/components/sections/Tone";
import { Button } from "@/components/ui";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { thirdPartyNote, ogImage } from "@/content/site";

export const metadata: Metadata = {
  title: "Services — one service or a complete solution",
  description: "Website development, social media management, Meta and Google advertising, AI agents and automation, and business dashboards — hire one service or combine several.",
  alternates: { canonical: "/services/" },
  openGraph: ogImage("services"),
};

export default function ServicesPage() {
  return (
    <>
      <HubHero />
      <ServiceBento />
      <StackBuilder />
      <SystemPinned />
      <CompareTable />

      <Tone tone="dark" grad className="grain section-major">
        <div className="container text-center">
          <SplitHeading as="h2" text="Still not sure which you" accent="need?" className="mx-auto max-w-[18ch]" />
          <p className="lead mt-6 mx-auto">Tell us the problem in a few lines. We&rsquo;ll say which services actually apply — including when the answer is just one of them.</p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button href="/contact/?type=unsure" size="lg">Describe your situation</Button>
            <Button href="/work/" variant="secondary" arrow="right">See the work</Button>
          </div>
          <p className="mt-10 text-sm text-text-2 max-w-[62ch] mx-auto">{thirdPartyNote}</p>
        </div>
      </Tone>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }]} />
    </>
  );
}
