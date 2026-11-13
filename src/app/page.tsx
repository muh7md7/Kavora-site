import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { AiHome, HomeCta, HomeFaqSection, HomeServices, ProcessTimeline, ProofStrip, SelectedWork, Testimonials, WhyBento } from "@/components/home/sections";
import { SeeItInAction } from "@/components/sections/HomeSections";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaq, ogImage } from "@/content/site";

export const metadata: Metadata = {
  title: "Keelbiz — Build, grow and automate your business",
  description: "Keelbiz builds websites, manages social media, runs Meta and Google ads, and develops AI agents, automation and business dashboards. Hire us for one service or a complete solution.",
  alternates: { canonical: "/" },
  openGraph: ogImage("default"),
};

/**
 * Rhythm: light hero → strip → light services → dark showcase → dark work (pinned) →
 * light process → dark AI → mist why → light testimonials → mist FAQ → dark CTA.
 * No two adjacent sections share a tone or a section order used elsewhere on the site.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <ProofStrip />
      <HomeServices />
      <SeeItInAction />
      <SelectedWork />
      <ProcessTimeline />
      <AiHome />
      <WhyBento />
      <Testimonials />
      <HomeFaqSection />
      <HomeCta />
      <FaqJsonLd faq={homeFaq} />
    </>
  );
}
