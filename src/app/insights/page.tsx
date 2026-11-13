import type { Metadata } from "next";
import { ogImage } from "@/content/site";
import { Tone } from "@/components/sections/Tone";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Insights — coming soon",
  description: "Practical notes on websites, advertising, AI automation and business systems. Not published yet.",
  alternates: { canonical: "/insights/" },
  openGraph: ogImage("insights"),
  robots: { index: false, follow: true },
};

/**
 * Insights has no posts yet. A real page that says so beats a redirect to the homepage,
 * which strands anyone following an old link. Noindex until the first post is published.
 */
export default function InsightsPage() {
  return (
    <>
      <Tone tone="dark" grad className="grain section-hero overflow-hidden min-h-[80svh] flex items-center">
        <div className="container">
          <p className="eyebrow rv-auto">Insights</p>
          <SplitHeading as="h1" auto underline text="Nothing published" accent="yet." className="display mt-7 max-w-[13ch]" />
          <p className="lead mt-8 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>
            We&rsquo;d rather publish nothing than publish filler. When there&rsquo;s something genuinely useful to say about websites, advertising, AI automation or business systems, it will appear here.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 rv-auto" style={{ ["--rv-delay" as string]: "420ms" }}>
            <Button href="/work/" size="lg">See what we build instead</Button>
            <Button href="/contact/" variant="secondary" arrow="right">Ask us directly</Button>
          </div>
          <p className="mt-12 text-[0.85rem] text-text-2 rv-auto" style={{ ["--rv-delay" as string]: "520ms" }}>
            Looking for something specific? Ask in an enquiry and we&rsquo;ll answer properly rather than point you at a blog post.
          </p>
        </div>
      </Tone>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights/" }]} />
    </>
  );
}
