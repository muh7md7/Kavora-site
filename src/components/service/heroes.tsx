"use client";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { contactHref } from "@/content/enquiry";
import type { Service } from "@/content/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Parallax } from "@/components/motion/Parallax";
import { Button, DeviceFrame } from "@/components/ui";
import { StaticSite, StaticDash, StaticGrid } from "@/components/demos/statics";
import { cn } from "@/lib/cn";

/**
 * Five heroes, five layouts — nothing shared but the tokens.
 * Each carries a large visual built in code, and each sits differently on the page:
 * split, stacked, offset, centred, full-bleed.
 */

function Crumb({ idx }: { idx: number }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8rem] text-text-2">
      <ol className="flex items-center gap-2 flex-wrap">
        <li><Link href="/" className="hover:text-text transition-colors">Home</Link></li>
        <li aria-hidden>/</li>
        <li><Link href="/services/" className="hover:text-text transition-colors">Services</Link></li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="text-text">0{idx + 1}</li>
      </ol>
    </nav>
  );
}

function Actions({ s, label = "See it working" }: { s: Service; label?: string }) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-3">
      <Button href={contactHref({ services: [s.id] })} size="lg">{s.cta}</Button>
      <Button href="#demo" variant="ghost" arrow={false}>{label} <ArrowDown size={15} aria-hidden className="ml-1.5" /></Button>
    </div>
  );
}

/* 01 · WEBSITES — split: copy left, a browser frame breaking out of the right edge. */
export function WebsitesHero({ s, idx }: { s: Service; idx: number }) {
  return (
    <section data-theme="light" className="tone tone-grad section-hero relative overflow-hidden">
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-14 items-center">
          <div className="lg:col-span-6">
            <Crumb idx={idx} />
            <p className="eyebrow mt-6 rv-auto">Website design &amp; development</p>
            <SplitHeading as="h1" auto underline text="A site that earns the" accent="enquiry." className="mt-6" />
            <p className="lead mt-7 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>{s.definition}</p>
            <div className="rv-auto" style={{ ["--rv-delay" as string]: "400ms" }}><Actions s={s} /></div>
          </div>
          <div className="lg:col-span-6 lg:-mr-[14vw] rv-auto" style={{ ["--rv-delay" as string]: "260ms" }}>
            <Parallax range={26}>
              <DeviceFrame url="northfield-plumbing.sample" className="!shadow-[var(--elev-3)]">
                <StaticSite />
              </DeviceFrame>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 02 · SOCIAL — stacked: wide headline over a row of phones. */
export function SocialHero({ s, idx }: { s: Service; idx: number }) {
  return (
    <section data-theme="dark" className="tone tone-grad grain section-hero relative overflow-hidden">
      <div className="container">
        <Crumb idx={idx} />
        <div className="mt-6 grid lg:grid-cols-12 gap-x-10 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow rv-auto">Social media management</p>
            <SplitHeading as="h1" auto underline text="Posted, consistently. Without you" accent="posting." className="mt-6" />
          </div>
          <p className="lg:col-span-4 lead !text-[1.05rem] mt-7 lg:mt-0 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>{s.definition}</p>
        </div>
        <div className="rv-auto" style={{ ["--rv-delay" as string]: "380ms" }}><Actions s={s} label="See a month" /></div>

        <div className="mt-16 flex gap-4 sm:gap-6 justify-center lg:justify-start overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn("shrink-0 w-[min(32vw,210px)]", i === 1 && "lg:mt-10", i === 2 && "hidden sm:block lg:mt-20")}>
              <Parallax range={i === 1 ? 32 : 18}>
                <DeviceFrame type="phone" className="!max-w-none">
                  <div className="pt-9 h-full relative"><StaticGrid compact={i > 0} /></div>
                </DeviceFrame>
              </Parallax>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 03 · ADS — offset: headline left, a live metric strip pinned beneath it, full-width. */
export function AdsHero({ s, idx }: { s: Service; idx: number }) {
  return (
    <section data-theme="light" className="tone tone-grad section-hero relative overflow-hidden">
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="container">
        <Crumb idx={idx} />
        <div className="mt-6 max-w-[54rem]">
          <p className="eyebrow rv-auto">Digital advertising · Meta &amp; Google</p>
          <SplitHeading as="h1" auto underline text="Put your offer in front of people who are already" accent="looking." className="mt-6" />
          <p className="lead mt-7 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>{s.definition}</p>
          <div className="rv-auto" style={{ ["--rv-delay" as string]: "400ms" }}><Actions s={s} label="Open the account" /></div>
        </div>
      </div>
      <div className="mt-16 border-y border-line bg-bg-2">
        <div className="container grid grid-cols-2 lg:grid-cols-4 divide-x divide-line">
          {[
            { k: "Platforms", v: "Meta + Google", n: "one or both" },
            { k: "Structure", v: "Campaign → ad set → ad", n: "built properly" },
            { k: "Creative", v: "Written per placement", n: "not resized" },
            { k: "Reporting", v: "Spend vs leads", n: "monthly" },
          ].map((c, i) => (
            <div key={c.k} className={cn("py-7 px-5 first:pl-0", i === 2 && "max-lg:border-l-0")}>
              <p className="font-mono text-[10px] uppercase tracking-[.12em] text-text-2">{c.k}</p>
              <p className="mt-2.5 text-[1rem] font-[550] tracking-[-0.02em] leading-snug">{c.v}</p>
              <p className="mt-1 text-[0.8rem] text-text-2">{c.n}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 04 · AUTOMATION — centred: headline in the middle, a conversation card beneath. */
export function AutomationHero({ s, idx }: { s: Service; idx: number }) {
  return (
    <section data-theme="dark" className="tone tone-grad grain section-hero relative overflow-hidden">
      <div className="container">
        <div className="flex justify-center"><Crumb idx={idx} /></div>
        <div className="mt-8 max-w-[52rem] mx-auto text-center">
          <p className="eyebrow rv-auto justify-center">AI agents &amp; automation</p>
          <SplitHeading as="h1" auto underline text="Answer every enquiry. Even at" accent="2am." className="mt-6" />
          <p className="lead mt-7 mx-auto rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>{s.definition}</p>
          <div className="flex justify-center rv-auto" style={{ ["--rv-delay" as string]: "400ms" }}>
            <div className="mt-9 flex flex-wrap items-center gap-3 justify-center">
              <Button href={contactHref({ services: [s.id] })} size="lg">{s.cta}</Button>
              <Button href="#demo" variant="ghost" arrow={false}>Try the agent <ArrowDown size={15} aria-hidden className="ml-1.5" /></Button>
            </div>
          </div>
        </div>
        <div className="mt-16 max-w-[760px] mx-auto rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>
          <Parallax range={22}>
            <div className="card !bg-[var(--surface-strong)] p-5 sm:p-7">
              <div className="grid sm:grid-cols-[1fr_1fr] gap-5 items-center">
                <div className="grid gap-2 text-[0.88rem]">
                  <span className="justify-self-end max-w-[85%] rounded-[14px] rounded-br-[4px] bg-[var(--steel-blue)] text-[var(--deep-charcoal)] px-3.5 py-2.5">Do you have anyone free tomorrow?</span>
                  <span className="justify-self-start max-w-[90%] rounded-[14px] rounded-bl-[4px] border border-line bg-[var(--surface-strong)] px-3.5 py-2.5">Yes — 9am or 2pm. Which works?</span>
                  <span className="justify-self-end max-w-[85%] rounded-[14px] rounded-br-[4px] bg-[var(--steel-blue)] text-[var(--deep-charcoal)] px-3.5 py-2.5">2pm please</span>
                </div>
                <ul className="grid gap-2.5">
                  {["Replied in 4 seconds", "Qualified against your rules", "Written into the CRM", "Slot booked, team notified"].map((x, i) => (
                    <li key={x} className="flex items-center gap-2.5 text-[0.86rem]">
                      <span className="size-5 rounded-full bg-[var(--steel-blue)] text-[var(--deep-charcoal)] grid place-items-center shrink-0 text-[10px] font-[700]">{i + 1}</span>{x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* 05 · DASHBOARDS — full-bleed: short headline, then a wide dashboard frame bleeding to both edges. */
export function DashboardsHero({ s, idx }: { s: Service; idx: number }) {
  return (
    <section data-theme="light" className="tone tone-grad section-hero relative overflow-hidden">
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <Crumb idx={idx} />
            <p className="eyebrow mt-6 rv-auto">Business dashboards &amp; systems</p>
            <SplitHeading as="h1" auto underline text="Stop asking where the numbers" accent="are." className="mt-6" />
          </div>
          <div className="lg:col-span-5">
            <p className="lead rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>{s.definition}</p>
            <div className="rv-auto" style={{ ["--rv-delay" as string]: "400ms" }}><Actions s={s} label="Open the dashboard" /></div>
          </div>
        </div>
      </div>
      <div className="mt-16 px-[max(0px,calc((100vw-1720px)/2))] rv-auto" style={{ ["--rv-delay" as string]: "280ms" }}>
        <div className="mx-3 sm:mx-6 rounded-[24px] border border-line bg-bg overflow-hidden shadow-[var(--elev-3)]">
          <div className="h-10 border-b border-line flex items-center gap-2.5 px-4" aria-hidden>
            <span className="db-dots"><i /><i /><i /></span>
            <span className="font-mono text-[10px] text-text-2 ml-2">operations · sample</span>
          </div>
          <div className="h-[clamp(260px,30vw,420px)] relative"><StaticDash /></div>
        </div>
      </div>
    </section>
  );
}
