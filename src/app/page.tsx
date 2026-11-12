import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AutomationShowcase, FromTheLab, HomeFaq, Intro, Process, SelectedWork, Services, WhyUs } from "@/components/sections/HomeSections";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaq } from "@/content/site";

export const metadata: Metadata = {
  title: "Keelbiz — Digital Experiences. Smarter Growth.",
  description: "Global digital growth & business technology agency: websites, social media, Meta ads, AI agents & automation, and business dashboards — one connected loop. UAE / GCC, Pakistan and worldwide.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <SelectedWork />
      <Process />
      <WhyUs />
      <AutomationShowcase />
      <FromTheLab />
      <HomeFaq />
      <FaqJsonLd faq={homeFaq} />
    </>
  );
}
