import { seo } from "@/lib/seo";
import type { Metadata } from "next";
import { home } from "@/content/copy";
import { Blocks } from "@/components/blocks/Blocks";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaq } from "@/content/site";
import { homeBlocks } from "@/content/builder";

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
  ...seo("/"),
};

// Section order, visibility, backgrounds and layouts come from the admin panel (🧱 Home page layout → content/home-layout.json).
export default function Home() {
  const faqs = [
    ...(homeBlocks.some((b) => b.type === "homeFaq") ? homeFaq : []),
    ...homeBlocks.flatMap((b) => (b.type === "faq" ? b.items : [])),
  ];
  return (
    <>
      <Blocks blocks={homeBlocks} />
      {faqs.length > 0 && <FaqJsonLd faq={faqs} />}
    </>
  );
}
