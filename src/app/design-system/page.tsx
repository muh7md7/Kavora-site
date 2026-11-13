import type { Metadata } from "next";
import { Tone } from "@/components/sections/Tone";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button, BentoCard, DeviceFrame, Marquee, Placeholder, SectionHeader, StatCounter, DemoShell } from "@/components/ui";
import { MiniPreview } from "@/components/demos/MiniPreview";
import { CountUp } from "@/components/motion/CountUp";
import { services } from "@/content/site";
import { ArrowUpRight, Plus } from "lucide-react";
import { AccordionDemo, ControlsDemo, SelectDemo } from "./Interactive";

export const metadata: Metadata = { title: "Design system", robots: { index: false, follow: false } };

const palette = [
  { n: "Off-white", h: "#F7F8F6", role: "Light backgrounds" },
  { n: "Mist", h: "#E9EDF0", role: "Secondary surfaces" },
  { n: "Steel blue", h: "#B8C9D2", role: "Accents, gradients" },
  { n: "Graphite", h: "#28353D", role: "Text, buttons" },
  { n: "Charcoal", h: "#11191E", role: "Dark sections" },
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[.14em] text-text-2 mb-5">{children}</p>;
}

export default function DesignSystem() {
  return (
    <>
      <Tone grad className="section-hero overflow-hidden">
        <div className="container">
          <p className="eyebrow rv-auto">Keelbiz · v5 system</p>
          <SplitHeading as="h1" auto underline text="One system, built to" accent="move." className="display mt-6 max-w-[14ch]" />
          <p className="lead mt-8 rv-auto" style={{ ["--rv-delay" as string]: "300ms" }}>Tokens, components and motion every page is built from. Internal reference — not indexed.</p>
          <div className="mt-10 flex flex-wrap gap-3 rv-auto" style={{ ["--rv-delay" as string]: "420ms" }}>
            <Button href="#components">See components</Button>
            <Button href="#motion" variant="secondary" arrow="right">Motion rules</Button>
          </div>
        </div>
      </Tone>

      {/* Palette + type */}
      <Tone className="section-major">
        <div className="container grid gap-20">
          <div>
            <Label>Palette — five colours, opacity variants only</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {palette.map((c, i) => (
                <Reveal key={c.h} index={i} className="card overflow-hidden !p-0">
                  <div className="h-28 border-b border-line" style={{ background: c.h }} />
                  <div className="p-4"><p className="font-[560]">{c.n}</p><p className="font-mono text-xs text-text-2 mt-1">{c.h}</p><p className="text-sm text-text-2 mt-2">{c.role}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Label>Type scale</Label>
            <div className="grid gap-8 border-t border-line pt-8">
              <div className="grid md:grid-cols-[180px_1fr] gap-2 items-baseline"><span className="num">Display · 56–128</span><p className="display !max-w-none">Build <span className="accent">better</span></p></div>
              <div className="grid md:grid-cols-[180px_1fr] gap-2 items-baseline"><span className="num">H1 · 44–96</span><p className="font-[560] tracking-[-.04em] leading-[.98] text-[length:var(--fs-h1)] !max-w-none">Grow with <span className="accent">intent</span></p></div>
              <div className="grid md:grid-cols-[180px_1fr] gap-2 items-baseline"><span className="num">H2 · 36–68</span><p className="font-[560] tracking-[-.03em] leading-[1.02] text-[length:var(--fs-h2)] !max-w-none">Not five services. One <span className="accent">system.</span></p></div>
              <div className="grid md:grid-cols-[180px_1fr] gap-2 items-baseline"><span className="num">H3 · 22–30</span><p className="font-[560] tracking-[-.025em] text-[length:var(--fs-h3)]">Websites that bring in enquiries</p></div>
              <div className="grid md:grid-cols-[180px_1fr] gap-2 items-baseline"><span className="num">Lead · 20–22</span><p className="lead">One service or a tailored combination, built around your business.</p></div>
              <div className="grid md:grid-cols-[180px_1fr] gap-2 items-baseline"><span className="num">Body · 17 / 1.6</span><p>We design and build fast, credible websites that turn visitors into enquiries — from a single landing page to a complete business site.</p></div>
              <div className="grid md:grid-cols-[180px_1fr] gap-2 items-baseline"><span className="num">Eyebrow · mono 12</span><p className="eyebrow">Services · 01</p></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((e) => (
              <div key={e} className={`card p-8 h-40 flex flex-col justify-between elev-${e}`}><span className="num">Elevation {e}</span><p className="text-sm text-text-2">{["Resting cards", "Hover, popovers", "Device frames, modals"][e - 1]}</p></div>
            ))}
          </div>
        </div>
      </Tone>

      {/* Buttons light + dark */}
      <section id="components" className="grid lg:grid-cols-2">
        {(["light", "dark"] as const).map((t) => (
          <Tone key={t} tone={t} className={`section-major ${t === "dark" ? "grain" : ""}`}>
            <div className="px-[var(--gutter)] lg:px-16 max-w-[660px] mx-auto">
              <Label>Buttons · {t}</Label>
              <div className="flex flex-wrap gap-3 items-center">
                <Button href="/contact/">Start a project</Button>
                <Button variant="secondary" arrow="right">Continue</Button>
                <Button variant="ghost">View work</Button>
                <Button variant="icon" icon={Plus} ariaLabel="Add" />
              </div>
              <div className="flex flex-wrap gap-3 items-center mt-4">
                <Button size="lg">Large primary</Button>
                <Button size="sm" variant="secondary">Small</Button>
                <Button size="sm" variant="icon" icon={ArrowUpRight} ariaLabel="Open" />
              </div>
              <p className="text-sm text-text-2 mt-6">Hover: fill wipes up · arrow nudges · primary is magnetic (≤4px).</p>
            </div>
          </Tone>
        ))}
      </section>

      <Tone alt className="section-major">
        <div className="container grid gap-16">
          <div><Label>SelectCard · single + multi</Label><SelectDemo /></div>
          <div><Label>Toggle · Tabs (sliding indicator) · Chips</Label><ControlsDemo /></div>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
            <SectionHeader eyebrow="FAQ" title="Questions," accent="answered." lead="Accordion: instant open, content fades and rises — no height animation." />
            <AccordionDemo />
          </div>
        </div>
      </Tone>

      {/* Stats */}
      <Tone className="section-strip border-y border-line">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter label="Projects delivered" note="Filled when confirmed" />
          <StatCounter label="Average response time" note="Filled when confirmed" />
          <StatCounter label="Client retention" note="Filled when confirmed" />
          <div><div className="font-[560] tracking-[-.045em] leading-none text-[clamp(44px,5vw,72px)]"><CountUp to={24} suffix="h" /></div><p className="mt-3 text-[.95rem] font-[550]">Count-up</p><p className="mt-1 text-sm text-text-2">Sample data</p></div>
        </div>
      </Tone>

      {/* Devices */}
      <Tone tone="dark" grad className="section-major grain overflow-hidden">
        <div className="container">
          <SectionHeader eyebrow="Imagery" title="Built in code," accent="not" after="stock." lead="Device frames with fixed ratios. Every live demo sits in a DemoShell: Sample data badge, pause control, auto-pause off-screen." />
          <div className="mt-16 grid lg:grid-cols-[1.7fr_1fr_.7fr] gap-6 items-end">
            <Parallax range={24}>
              <DemoShell><DeviceFrame url="sample-site.com"><MiniPreview id="dashboards" className="!rounded-none !border-0" /></DeviceFrame></DemoShell>
            </Parallax>
            <DeviceFrame type="tablet"><MiniPreview id="ads" className="!rounded-none !border-0" /></DeviceFrame>
            <DeviceFrame type="phone" className="mx-auto"><div className="pt-12 h-full"><MiniPreview id="social" className="!rounded-none !border-0" /></div></DeviceFrame>
          </div>
        </div>
      </Tone>

      {/* Bento */}
      <Tone className="section-major">
        <div className="container">
          <SectionHeader eyebrow="Bento" title="Cards that" accent="show," after="not tell." />
          <div className="mt-14 grid md:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(320px,auto)]">
            {services.map((s, i) => (
              <Reveal key={s.id} index={i} className={["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"][i]}>
                <BentoCard tone={i === 1 ? "dark" : undefined} href={`/services/${s.slug}/`} eyebrow={`0${i + 1}`} title={s.name} desc={s.short}
                  visual={<div className="h-44"><MiniPreview id={s.id} /></div>} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Tone>

      {/* Placeholders + marquee */}
      <Tone alt className="section-major">
        <div className="container">
          <Label>Placeholder slots — filled with real assets later</Label>
          <div className="grid md:grid-cols-[1fr_2fr] gap-6">
            <Placeholder label="Founder photo · 4:5" ratio="4/5" />
            <div className="grid gap-6">
              <Placeholder label="Case-study screenshot · 16:10" />
              <div className="grid grid-cols-3 gap-6"><Placeholder label="Post 1:1" ratio="1/1" /><Placeholder label="Post 1:1" ratio="1/1" /><Placeholder label="Post 1:1" ratio="1/1" /></div>
            </div>
          </div>
          <div className="mt-16"><Label>Marquee · client logos</Label>
            <Marquee label="Client logos" className="gap-6">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="ph !rounded-[12px] w-44 h-16 shrink-0"><span className="ph-label">Logo {i + 1}</span></div>)}
            </Marquee>
          </div>
        </div>
      </Tone>

      {/* Motion */}
      <Tone id="motion" className="section-major">
        <div className="container">
          <SectionHeader eyebrow="Motion" title="Quiet, quick," accent="exact." underline lead="Ease cubic-bezier(.22,1,.36,1). 0.35s micro · 0.7s reveal · 1.1s hero · 70ms stagger. Transform and opacity only. Reduced motion: everything static." />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {["Fade + 24px rise", "Staggered", "Triggers at 85%"].map((t, i) => (
              <Reveal key={t} index={i} className="card p-8 h-48 flex items-end"><p className="font-[560] text-lg">{t}</p></Reveal>
            ))}
          </div>
          <Reveal variant="clip" className="mt-6 overflow-hidden rounded-[24px]">
            <div className="h-[340px] bg-[var(--graphite)] grid place-items-center text-[var(--offwhite)]" data-theme="dark"><p className="font-mono text-xs tracking-[.14em] uppercase">Image reveal · clip-path + scale 1.06 → 1</p></div>
          </Reveal>
        </div>
      </Tone>
    </>
  );
}
