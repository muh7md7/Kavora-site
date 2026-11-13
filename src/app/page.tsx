import type { Metadata } from "next";
import { home } from "@/content/copy";
import { Hero } from "@/components/sections/Hero";
import { HomeFaq, Process, SeeItInAction, Services, WhyUs } from "@/components/sections/HomeSections";
import { AiOffer, FlexibleSolutions } from "@/components/sections/Offer";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaq } from "@/content/site";

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
  alternates: { canonical: "/" },
};

// Rhythm: light hero → light services → dark showcase → light why → dark flexible → light-alt process → dark AI → light-alt FAQ → dark CTA/footer
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <SeeItInAction />
      <WhyUs />
      <FlexibleSolutions />
      <Process />
      <AiOffer />
      <HomeFaq />
      <FaqJsonLd faq={homeFaq} />
    </>
  );
}
