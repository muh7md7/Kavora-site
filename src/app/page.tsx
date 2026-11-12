import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FromTheLab, HomeFaq, Process, Services, WhyUs } from "@/components/sections/HomeSections";
import { AiOffer, FlexibleSolutions } from "@/components/sections/Offer";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaq } from "@/content/site";

export const metadata: Metadata = {
  title: "Keelbiz — Build, grow and automate your business",
  description: "Keelbiz builds websites, manages social media, runs Meta and Google ads, and develops AI agents, automation and business dashboards. Hire us for one service or a complete solution.",
  alternates: { canonical: "/" },
};

// Rhythm: light hero → light services → dark flexible → light-alt process → dark AI → (light) why → dark lab → light-alt FAQ → dark CTA/footer
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FlexibleSolutions />
      <Process />
      <AiOffer />
      <WhyUs />
      <FromTheLab />
      <HomeFaq />
      <FaqJsonLd faq={homeFaq} />
    </>
  );
}
