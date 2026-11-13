import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tone } from "@/components/sections/Tone";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button, Marquee, Placeholder } from "@/components/ui";
import { services, shortName, site, whyUs, ogImage } from "@/content/site";
import { serviceIcon } from "@/content/enquiry";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About Keelbiz",
  description: "Keelbiz is a founder-led digital growth agency helping businesses build, grow and automate — with websites, social media, advertising, AI agents and business dashboards.",
  alternates: { canonical: "/about/" },
  openGraph: ogImage("about"),
};

/** Tools we actually work in. Named because they're ours, not presented as partnerships or certifications. */
const stack = [
  "Next.js", "React", "TypeScript", "Tailwind", "Figma", "Meta Ads Manager", "Google Ads",
  "Google Analytics", "n8n", "WhatsApp Business", "Notion", "Vercel",
];

/** How the team is actually shaped — one point of contact, specialists behind it. */
const model = [
  { k: "You", d: "One point of contact. No account-manager relay." },
  { k: "Design + build", d: "The person designing it is the person building it." },
  { k: "Specialists", d: "Brought in per project — video, copy, data — not carried as overhead." },
];

export default function AboutPage() {
  return (
    <>
      {/* hero — founder note beside a portrait slot, nothing like the other page heroes */}
      <Tone grad className="section-hero overflow-hidden">
        <div className="aurora" aria-hidden><i /><i /><i /></div>
        <div className="container grid lg:grid-cols-12 gap-x-12 gap-y-14 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow rv-auto">About Keelbiz</p>
            <SplitHeading as="h1" auto underline text="A small team that builds the whole" accent="thing." className="mt-7" />
            <p className="lead mt-8 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>{site.supporting}</p>
            <div className="mt-10 flex flex-wrap gap-3 rv-auto" style={{ ["--rv-delay" as string]: "420ms" }}>
              <Button href="/contact/">Talk to us</Button>
              <Button href="/work/" variant="secondary" arrow="right">See what we build</Button>
            </div>
          </div>
          <div className="lg:col-span-5 rv-auto" style={{ ["--rv-delay" as string]: "260ms" }}>
            <figure>
              <Placeholder label="Founder photo · 4:5" ratio="4/5" className="!rounded-[24px]" />
              <figcaption className="mt-4 text-[0.88rem] text-text-2">
                <span className="ph-label !text-[10px]">[PLACEHOLDER] Name, founder</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Tone>

      {/* founder note */}
      <Tone className="section-major">
        <div className="container grid lg:grid-cols-12 gap-x-12 gap-y-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Why this exists</p>
            <h2 className="mt-5 !text-[clamp(26px,3vw,40px)]">The gap we kept seeing.</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-[clamp(1.3rem,1.05rem+1.1vw,2rem)] leading-[1.32] tracking-[-0.025em]">
              Most businesses buy their website, their marketing and their automation from different people who never speak to each other. The site doesn&rsquo;t match the ads, leads go unanswered, and nobody can say what&rsquo;s actually working.
            </p>
            <p className="lead mt-8">
              Keelbiz puts those pieces in one place — so you can start with exactly what you need today and connect more later. One service or a complete solution, built around your business.
            </p>
            <p className="mt-6 text-text-2">
              We stay deliberately small. The person who designs your site is the person who builds it, and the person who answers your email is the person doing the work.
            </p>
          </div>
        </div>
      </Tone>

      {/* values as an animated bento */}
      <Tone tone="dark" grad className="grain section-major">
        <div className="container">
          <div className="max-w-[44rem]">
            <p className="eyebrow">What we hold to</p>
            <SplitHeading as="h2" text="Five things we don't" accent="bend." className="mt-5" />
          </div>
          <div className="mt-14 grid md:grid-cols-6 gap-4 md:gap-5">
            {whyUs.map((w, i) => (
              <Reveal key={w.t} index={i} className={cn("min-w-0", i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : "md:col-span-2")}>
                <div data-spot className={cn("card h-full p-6 md:p-7 flex flex-col", i === 0 && "!bg-[var(--surface-strong)]")}>
                  <span className="num">0{i + 1}</span>
                  <h3 className={cn("mt-4", i === 0 ? "!text-[clamp(22px,2.2vw,30px)]" : "!text-[1.2rem]")}>{w.t}</h3>
                  <p className="mt-2.5 text-text-2 text-[0.95rem] leading-snug">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Tone>

      {/* how we work — team model diagram */}
      <Tone className="!bg-bg-2 section-major">
        <div className="container grid lg:grid-cols-12 gap-x-12 gap-y-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">How the team is shaped</p>
            <h2 className="mt-5">No relay. No <span className="accent">handoffs.</span></h2>
            <p className="mt-6 text-text-2 leading-relaxed">
              Agencies grow by adding layers between you and the work. We grow by adding specialists behind one point of contact — so briefs don&rsquo;t get retold three times before anyone starts.
            </p>
          </div>
          <ol className="lg:col-span-7 relative grid gap-4">
            {model.map((m, i) => (
              <Reveal as="li" key={m.k} index={i} className="relative pl-12">
                <span className="absolute left-0 top-0 size-9 rounded-full border border-line-strong bg-bg grid place-items-center font-mono text-[10px]">0{i + 1}</span>
                {i < model.length - 1 && <span className="absolute left-[17px] top-10 bottom-[-16px] w-px bg-line" aria-hidden />}
                <h3 className="!text-[1.15rem]">{m.k}</h3>
                <p className="mt-1.5 text-text-2 text-[0.95rem] leading-snug">{m.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Tone>

      {/* stack marquee */}
      <Tone className="section-strip border-y border-line overflow-hidden">
        <div className="container"><p className="font-mono text-[11px] uppercase tracking-[.14em] text-text-2">What we work in</p></div>
        <Marquee label="Tools we work in" duration={44} className="mt-6 gap-4">
          {stack.map((t) => (
            <span key={t} className="shrink-0 tag !min-h-11 !px-5 !text-[0.92rem]">{t}</span>
          ))}
        </Marquee>
        <div className="container mt-6"><p className="text-[0.82rem] text-text-2">Tools we build with day to day. Not partnerships, sponsorships or certifications.</p></div>
      </Tone>

      {/* services, as links not a repeated list */}
      <Tone className="section-major">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[16ch]">What that lets us <span className="accent">build.</span></h2>
            <Link href="/services/" className="b b-ghost">All five services<ArrowUpRight size={15} className="b-arrow" aria-hidden /></Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {services.map((s) => {
              const Icon = serviceIcon[s.id];
              return (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}/`} className="tag !min-h-12 !px-5 !text-[0.95rem] hover:!text-text hover:!border-text-2">
                    <Icon size={15} aria-hidden />{shortName[s.id]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Tone>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About", href: "/about/" }]} />
    </>
  );
}
