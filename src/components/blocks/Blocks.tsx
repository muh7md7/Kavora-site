/* eslint-disable @next/next/no-img-element -- static export: uploaded images are served as-is from /uploads */
import Link from "next/link";
import {
  ArrowUpRight, ChartColumn, Bot, Calendar, Camera, Check, Clock, Globe, Heart, Layers, Lightbulb, Mail, Megaphone, MessageCircle,
  PenLine, Phone, Rocket, Search, Shield, ShoppingCart, Sparkles, Target, Users, Workflow, Zap, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Block, BlockStyle, Btn, Head, Img } from "@/content/builder";
import { isHeroBlock } from "@/content/builder";
import { Tone, toneOf, HeadText } from "@/components/sections/Tone";
import { Reveal } from "@/components/sections/Reveal";
import { Faq } from "@/components/sections/Faq";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Hero } from "@/components/sections/Hero";
import { HomeFaq, Process, SeeItInAction, Services, WhyUs } from "@/components/sections/HomeSections";
import { AiOffer, FlexibleSolutions } from "@/components/sections/Offer";

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles, check: Check, layers: Layers, bot: Bot, chart: ChartColumn, globe: Globe, megaphone: Megaphone, calendar: Calendar,
  shield: Shield, zap: Zap, users: Users, message: MessageCircle, target: Target, rocket: Rocket, workflow: Workflow, mail: Mail, phone: Phone,
  clock: Clock, search: Search, pen: PenLine, camera: Camera, cart: ShoppingCart, heart: Heart, lightbulb: Lightbulb,
};

const widthClass = (w: BlockStyle["width"]) => (w === "narrow" ? "!max-w-[56rem]" : w === "wide" ? "!max-w-[104rem]" : "");
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

function Button({ b, kind = "primary" }: { b: Btn; kind?: "primary" | "glass" }) {
  const cls = cn("btn", kind === "primary" ? "btn-primary" : "btn-glass");
  const inner = <>{b.label}{kind === "primary" && <ArrowUpRight size={16} className="btn-arrow" aria-hidden />}</>;
  return isExternal(b.link) ? <a href={b.link} className={cls} rel="noopener">{inner}</a> : <Link href={b.link} className={cls}>{inner}</Link>;
}
function Buttons({ a, b, center }: { a?: Btn | null; b?: Btn | null; center?: boolean }) {
  if (!a && !b) return null;
  return <div className={cn("mt-9 flex flex-wrap items-center gap-3", center && "justify-center")}>{a && <Button b={a} />}{b && <Button b={b} kind="glass" />}</div>;
}
function Picture({ img, className, sizes }: { img: Img; className?: string; sizes?: string }) {
  return <img src={img.src} alt={img.alt} width={img.width ?? undefined} height={img.height ?? undefined} loading="lazy" decoding="async" sizes={sizes} className={cn("block w-full h-auto", className)} />;
}

/** Section heading for builder blocks. h1 only for heroes. */
function BlockHead({ h, center, as = "h2", className }: { h: Head; center?: boolean; as?: "h1" | "h2"; className?: string }) {
  if (!h.title && !h.eyebrow && !h.lead) return null;
  const H = as;
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      {h.eyebrow && <p className="eyebrow">{h.eyebrow}</p>}
      {h.title && <H className={cn(h.eyebrow && "mt-5", center ? "mx-auto max-w-[22ch]" : "max-w-[20ch]", as === "h1" && "!text-[clamp(2.4rem,1.5rem+3vw,4.25rem)] !leading-[1.03] !tracking-[-0.045em]")}><HeadText h={h} /></H>}
      {h.lead && <p className={cn("lead mt-6", center && "mx-auto")}>{h.lead}</p>}
    </Reveal>
  );
}

/** Shared wrapper: background (Tone), width and alignment from the block's style settings. */
function Shell({ b, children, dflt = { tone: "light" }, className }: { b: Block; children: React.ReactNode; dflt?: Parameters<typeof toneOf>[1]; className?: string }) {
  return (
    <Tone {...toneOf(b.style.background, dflt)} className={cn("section", className)}>
      <div className={cn("container", widthClass(b.style.width))}>{children}</div>
    </Tone>
  );
}

function RichText({ html, className }: { html: string; className?: string }) {
  // Sanitised at build time by scripts/prepare-content.mjs (allow-listed tags only).
  return <div className={cn("rich", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

function BlockView({ b, first }: { b: Block; first: boolean }) {
  const center = b.style.align === "center";
  switch (b.type) {
    // ---------- ready-made home sections (text edited under "Home page texts")
    case "homeHero": return <Hero layout={b.layout} bg={b.style.background} />;
    case "homeServices": return <Services bg={b.style.background} layout={b.layout} />;
    case "homeShowcase": return <SeeItInAction bg={b.style.background} />;
    case "homeWhy": return <WhyUs bg={b.style.background} />;
    case "homeFlexible": return <FlexibleSolutions bg={b.style.background} />;
    case "homeProcess": return <Process bg={b.style.background} layout={b.layout} />;
    case "homeAi": return <AiOffer bg={b.style.background} />;
    case "homeFaq": return <HomeFaq bg={b.style.background} layout={b.layout} />;

    // ---------- page-builder blocks
    case "hero": {
      const dark = b.style.background === "dark";
      const centered = b.layout === "centered" || !b.image;
      const plainLight = b.style.background === "auto" || b.style.background === "light";
      return (
        <section data-theme={dark ? "dark" : "light"} className={cn("tone tone-grad has-grid relative overflow-hidden",
          b.style.background === "mist" ? "tone-mist" : b.style.background === "warm" ? "tone-warm" : dark ? "tone-inset" : "hero-shell",
          first ? (dark ? "pt-[150px] md:pt-[180px] pb-16 md:pb-24" : "pt-[128px] md:pt-[160px] pb-16 md:pb-24") : "section")}>
          {plainLight && <><div className="aurora" aria-hidden><i /><i /><i /></div><div className="hero-fade" aria-hidden /></>}
          <div className={cn("container relative", widthClass(b.style.width), !centered && "grid gap-12 lg:gap-14 lg:grid-cols-12 items-center")}>
            <div className={cn(!centered ? "lg:col-span-6" : (center || b.layout === "centered") && "text-center", !centered && b.layout === "image-left" && "lg:order-2")}>
              {b.eyebrow && <p className="eyebrow reveal-fade">{b.eyebrow}</p>}
              <h1 className={cn("mt-6 reveal-fade !text-[clamp(2.4rem,1.5rem+3vw,4.25rem)] !leading-[1.03] !tracking-[-0.045em]", centered ? "max-w-[20ch] mx-auto" : "max-w-[16ch]", centered && !(center || b.layout === "centered") && "!mx-0")} style={{ animationDelay: "80ms" }}><HeadText h={b} /></h1>
              {b.lead && <p className={cn("lead mt-6 reveal-fade", centered && (center || b.layout === "centered") && "mx-auto")} style={{ animationDelay: "180ms" }}>{b.lead}</p>}
              <div className="reveal-fade" style={{ animationDelay: "260ms" }}><Buttons a={b.primary} b={b.secondary} center={centered && (center || b.layout === "centered")} /></div>
            </div>
            {b.image && (
              <div className={cn("reveal-fade", centered ? "mt-14 max-w-5xl mx-auto" : "lg:col-span-6", !centered && b.layout === "image-left" && "lg:order-1")} style={{ animationDelay: "300ms" }}>
                <div className="device"><div className="device-screen"><Picture img={b.image} sizes="(min-width: 1024px) 50vw, 100vw" /></div></div>
              </div>
            )}
          </div>
        </section>
      );
    }
    case "text":
      return (
        <Shell b={b}>
          <div className={cn(center && "text-center")}>
            <BlockHead h={b} center={center} />
            {b.body && <Reveal index={1}><RichText html={b.body} className={cn((b.title || b.lead) && "mt-10", center ? "mx-auto [&_ul]:text-left [&_ol]:text-left" : "")} /></Reveal>}
          </div>
        </Shell>
      );
    case "cards": {
      const cols = { "2": "md:grid-cols-2", "3": "md:grid-cols-2 lg:grid-cols-3", "4": "sm:grid-cols-2 lg:grid-cols-4" }[b.columns];
      return (
        <Shell b={b}>
          <BlockHead h={b} center={center} />
          <ul className={cn("grid gap-4", cols, (b.title || b.lead) && "mt-14")}>
            {b.items.map((it, i) => {
              const Icon = ICONS[it.icon];
              return (
                <Reveal as="li" key={i} index={i} className="h-full">
                  <div className={cn("card h-full p-7 flex flex-col", center && "items-center text-center")}>
                    {it.icon && Icon && <span className="size-11 inline-flex items-center justify-center rounded-[calc(14px*var(--rs,1))] border border-line bg-surface text-accent"><Icon size={20} aria-hidden /></span>}
                    {it.title && <h3 className={cn("!text-[1.3rem]", it.icon && "mt-6")}>{it.title}</h3>}
                    {it.text && <p className="mt-3 text-text-2 text-[0.96rem] leading-relaxed">{it.text}</p>}
                    {it.link && <div className="mt-auto pt-6">{isExternal(it.link.link)
                      ? <a href={it.link.link} rel="noopener" className="btn btn-ghost">{it.link.label} <ArrowUpRight size={16} className="arrow" aria-hidden /></a>
                      : <Link href={it.link.link} className="btn btn-ghost">{it.link.label} <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>}</div>}
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Shell>
      );
    }
    case "imageText":
      return (
        <Shell b={b}>
          <div className={cn("grid gap-12 lg:gap-16 items-center", b.image && "lg:grid-cols-2")}>
            <div className={cn(b.side === "left" && "lg:order-2")}>
              <BlockHead h={b} />
              {b.body && <Reveal index={1}><RichText html={b.body} className="mt-8" /></Reveal>}
              {b.button && <Reveal index={2}><Buttons a={b.button} /></Reveal>}
            </div>
            {b.image && (
              <Reveal index={1} className={cn(b.side === "left" && "lg:order-1")}>
                <figure className="card p-2.5 overflow-hidden"><Picture img={b.image} className="rounded-[calc(18px*var(--rs,1))]" sizes="(min-width: 1024px) 50vw, 100vw" /></figure>
              </Reveal>
            )}
          </div>
        </Shell>
      );
    case "services": {
      const h = b.title ? { eyebrow: b.eyebrow, title: b.title, accent: b.accent, after: b.after, lead: b.lead } : undefined;
      return <Services bg={b.style.background} layout={b.layout} h={h} />;
    }
    case "faq":
      return (
        <Shell b={b} dflt={{ tone: "light", alt: true }}>
          <div className={cn("grid gap-14", b.layout === "side" ? "lg:grid-cols-12" : "max-w-[56rem] mx-auto")}>
            <BlockHead h={b} center={b.layout === "stacked" && center} className={cn(b.layout === "side" && "lg:col-span-4")} />
            <Reveal index={1} className={cn(b.layout === "side" && "lg:col-span-8")}><Faq items={b.items} name={b.key} /></Reveal>
          </div>
        </Shell>
      );
    case "cta":
      return (
        <Shell b={b} dflt={{ tone: "dark", grad: true }} className="overflow-hidden">
          <div className={cn("relative", center ? "text-center" : "grid gap-10 lg:grid-cols-12 items-end")}>
            <div className={cn(!center && "lg:col-span-8")}>
              <BlockHead h={b} center={center} />
            </div>
            <Reveal index={1} className={cn(!center && "lg:col-span-4 lg:justify-self-end")}><Buttons a={b.primary} b={b.secondary} center={center} /></Reveal>
          </div>
        </Shell>
      );
    case "highlights":
      return (
        <Shell b={b}>
          <BlockHead h={b} center={center} />
          <dl className={cn("grid gap-px overflow-hidden rounded-[var(--card-r)] border border-line bg-[var(--line)] sm:grid-cols-2", b.items.length >= 3 && "lg:grid-cols-3", b.items.length === 4 && "lg:grid-cols-4", (b.title || b.lead) && "mt-14")}>
            {b.items.map((it, i) => (
              <Reveal key={i} index={i} className={cn("bg-[var(--bg)] p-7 sm:p-9 flex flex-col-reverse justify-end gap-3", center && "text-center")}>
                <dt className="text-text-2 text-[0.96rem] leading-relaxed">{it.label}{it.source && <span className="mt-2 block num !text-[0.68rem]">Source: {it.source}</span>}</dt>
                {it.value && <dd className="hl-value">{it.value}</dd>}
              </Reveal>
            ))}
          </dl>
        </Shell>
      );
    case "gallery": {
      const cols = { "2": "sm:grid-cols-2", "3": "sm:grid-cols-2 lg:grid-cols-3", "4": "sm:grid-cols-2 lg:grid-cols-4" }[b.columns];
      return (
        <Shell b={b}>
          <BlockHead h={b} center={center} />
          <ul className={cn("grid gap-4", cols, (b.title || b.lead) && "mt-14")}>
            {b.images.map((img, i) => (
              <Reveal as="li" key={i} index={i}>
                <figure className="card p-2 overflow-hidden h-full">
                  <Picture img={img} className="rounded-[calc(16px*var(--rs,1))] aspect-[4/3] object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
                  {img.caption && <figcaption className="px-3 pt-3 pb-2 text-[0.88rem] text-text-2">{img.caption}</figcaption>}
                </figure>
              </Reveal>
            ))}
          </ul>
        </Shell>
      );
    }
    case "contact":
      return (
        <Shell b={b} dflt={{ tone: "mist" }}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4"><BlockHead h={b} /></div>
            <div className="lg:col-span-8 card !bg-[linear-gradient(180deg,color-mix(in_srgb,var(--c-paper)_90%,transparent),color-mix(in_srgb,var(--c-paper)_70%,transparent))] p-6 sm:p-8 md:p-10">
              <EnquiryForm />
            </div>
          </div>
        </Shell>
      );
    case "spacer": {
      const h = { small: "h-8 md:h-10", medium: "h-16 md:h-20", large: "h-28 md:h-36" }[b.size];
      return (
        <Tone {...toneOf(b.style.background, { tone: "light" })} as="div" aria-hidden>
          <div className={cn("container flex items-center", h)}>{b.line && <hr className="w-full border-0 border-t border-line" />}</div>
        </Tone>
      );
    }
  }
}

/** Renders a list of blocks. When the first block isn't a hero, a header-height spacer keeps it clear of the fixed navbar. */
export function Blocks({ blocks, spacer = true }: { blocks: Block[]; spacer?: boolean }) {
  return (
    <>
      {spacer && blocks.length > 0 && !isHeroBlock(blocks[0]) && <div aria-hidden className="h-[88px]" />}
      {blocks.map((b, i) => <BlockView key={b.key} b={b} first={i === 0} />)}
    </>
  );
}
