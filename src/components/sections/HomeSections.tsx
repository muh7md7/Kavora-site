import { t } from "@/i18n";
import Link from "next/link";
import { home } from "@/content/copy";
import { ArrowUpRight, Check } from "lucide-react";
import { flywheel, homeFaq, steps, whyUs } from "@/content/site";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { LazyWorkflow } from "./Lazy";
import { Showcase } from "./Showcase";
import { ServicesBento } from "./Bento";
import { Faq } from "./Faq";
import { Reveal } from "./Reveal";
import { ProcessSteps } from "./ProcessSteps";
import { HeadText, Tone, toneOf } from "./Tone";
import { ServiceFeatureList } from "./Bento";
import { cn } from "@/lib/cn";

/** The loop diagram — four stations on a slow orbit with one travelling light. */
export function Flywheel({ className }: { className?: string }) {
  const pos = [[200, 40], [360, 200], [200, 360], [40, 200]];
  return (
    <svg viewBox="-24 -8 448 416" className={cn("w-full max-w-[440px]", className)} role="img"
      aria-label={t("The Keelbiz loop: Attract (Social and Ads), Convert (Website), Automate (AI agents), Manage (Dashboards), then back to Attract")}>
      <circle cx="200" cy="200" r="160" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      <g className="orbit">
        <circle cx="200" cy="200" r="160" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 10" opacity=".7" />
        <circle cx="200" cy="40" r="4" fill="var(--accent)" />
      </g>
      <circle cx="200" cy="200" r="96" fill="none" stroke="var(--line)" strokeWidth="1" />
      <text x="200" y="192" textAnchor="middle" fontSize="13" fill="var(--text-2)" fontFamily="var(--font-mono)" letterSpacing="2">ONE</text>
      <text x="200" y="216" textAnchor="middle" fontSize="26" fill="var(--text)" fontFamily="var(--font-serif)" fontStyle="italic">{t("system")}</text>
      {flywheel.map((f, i) => (
        <g key={f.step} transform={`translate(${pos[i][0]} ${pos[i][1]})`}>
          <rect x="-58" y="-24" width="116" height="48" rx="24" fill="var(--bg-2)" stroke="var(--line-strong)" />
          <text y="-2" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text)" fontFamily="var(--font-sans)">{f.step}</text>
          <text y="14" textAnchor="middle" fontSize="10" fill="var(--text-2)" fontFamily="var(--font-mono)">{f.detail}</text>
        </g>
      ))}
    </svg>
  );
}

const loopCopy: Record<string, string> = {
  Attract: "Social content and Meta or Google ads bring the right people to you.",
  Convert: "A fast, credible website turns attention into enquiries.",
  Automate: "AI agents qualify, reply and follow up — around the clock.",
  Manage: "Dashboards show what's working, and feed the next campaign.",
};

export function Intro() {
  return (
    <Tone tone="dark" grad className="section overflow-hidden" aria-labelledby="loop-h">
      <div className="container grid gap-16 lg:grid-cols-12 items-center">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">{t("How Keelbiz works")}</p>
          <h2 id="loop-h" className="mt-5">{t("Not five services.")}{" "}<br className="hidden sm:block" />{t("One")}{" "}<span className="accent">{t("system.")}</span></h2>
          <p className="lead mt-6">{t("Most businesses buy marketing, websites and automation from people who never talk to each other. We run them as one loop — each part feeding the next. Every service also works on its own.")}</p>
        </Reveal>
        <Reveal className="lg:col-span-6 flex justify-center lg:justify-end" index={1}><Flywheel /></Reveal>
      </div>
      <div className="container mt-20">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line">
          {flywheel.map((f, i) => (
            <Reveal as="li" key={f.step} index={i} className={cn("pt-8 pb-2 sm:pr-8", i > 0 && "lg:pl-8 lg:border-l border-line")}>
              <span className="num">0{i + 1} — {f.detail}</span>
              <h3 className="mt-4 !text-2xl">{f.step}</h3>
              <p className="text-text-2 mt-2 text-[0.95rem]">{loopCopy[f.step]}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Tone>
  );
}

export function Services({ bg, layout = "bento", h = home.services }: { bg?: string; layout?: "bento" | "list"; h?: { eyebrow?: string; title: string; accent?: string; after?: string; lead?: string } }) {
  const isHome = h === home.services;
  return (
    <Tone {...toneOf(bg, { tone: "mist" })} className="section" id={isHome ? "services" : undefined} aria-labelledby={isHome ? "svc-h" : undefined}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7">{h.eyebrow && <p className="eyebrow">{h.eyebrow}</p>}<h2 id={isHome ? "svc-h" : undefined} className="mt-5 max-w-[16ch]"><HeadText h={h} /></h2></Reveal>
          {h.lead && <Reveal className="lg:col-span-5" index={1}><p className="lead">{h.lead}</p></Reveal>}
        </div>
        <div className="mt-14">{layout === "list" ? <ServiceFeatureList /> : <ServicesBento />}</div>
        {isHome && <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-7">
          <p className="text-text-2 text-[0.92rem]">{home.services.note}</p>
          <Link href="/contact/" className="btn btn-ghost">{home.services.helpLink} <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
        </Reveal>}
      </div>
    </Tone>
  );
}

export function AutomationShowcase() {
  const points = ["Replies to new enquiries in seconds — web, WhatsApp or email", "Qualifies leads against your own criteria", "Writes everything to your CRM or sheet", "Hands hot leads to a person, with full context"];
  return (
    <Tone tone="dark" grad className="section overflow-hidden" aria-labelledby="auto-h">
      <div className="container grid gap-14 lg:grid-cols-12 items-center">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">AI agents &amp; automation</p>
          <h2 id="auto-h" className="mt-5">{t("Automation you can")}{" "}<span className="accent">{t("see.")}</span></h2>
          <p className="lead mt-6">{t("A typical enquiry-to-CRM flow. Hover or focus each step — yours is designed around your process.")}</p>
          <ul className="mt-8 grid gap-3">
            {points.map((p) => <li key={p} className="flex gap-3 text-[0.98rem]"><Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />{p}</li>)}
          </ul>
          <Link href="/services/ai-agents-automation/" className="btn btn-glass mt-10">{t("Explore automation")}{" "}<ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
        </Reveal>
        <Reveal className="lg:col-span-7 bloom" index={1}><LazyWorkflow /></Reveal>
      </div>
    </Tone>
  );
}

export function Process({ bg, layout = "side" }: { bg?: string; layout?: "side" | "stacked" }) {
  const stacked = layout === "stacked";
  return (
    <Tone {...toneOf(bg, { tone: "warm" })} className="section" aria-labelledby="proc-h">
      <div className={cn("container grid gap-14", !stacked && "lg:grid-cols-12")}>
        <div className={cn(stacked ? "max-w-3xl" : "lg:col-span-5 lg:sticky lg:top-32 self-start")}>
          <Reveal>
            <p className="eyebrow">{home.process.eyebrow}</p>
            <h2 id="proc-h" className="mt-5"><HeadText h={home.process} /></h2>
            <p className="lead mt-6">{home.process.lead}</p>
          </Reveal>
        </div>
        <div className={cn(!stacked && "lg:col-span-7")}><ProcessSteps items={steps} /></div>
      </div>
    </Tone>
  );
}

export function SeeItInAction({ bg }: { bg?: string }) {
  return (
    <Tone {...toneOf(bg, { tone: "dark", grad: true, grid: true })} className="section overflow-hidden" aria-labelledby="see-h">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7"><p className="eyebrow">{home.showcase.eyebrow}</p><h2 id="see-h" className="mt-5"><HeadText h={home.showcase} /></h2></Reveal>
          <Reveal className="lg:col-span-5" index={1}><p className="lead">{home.showcase.lead}</p></Reveal>
        </div>
        <Reveal className="mt-14 bloom" index={2}><Showcase /></Reveal>
      </div>
    </Tone>
  );
}

export function WhyUs({ bg }: { bg?: string }) {
  return (
    <Tone {...toneOf(bg, { tone: "light" })} className="section" aria-labelledby="why-h">
      <div className="container grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">{home.why.eyebrow}</p>
          <h2 id="why-h" className="mt-5"><HeadText h={home.why} /></h2>
        </Reveal>
        <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
          {whyUs.map((w, i) => (
            <Reveal as="li" key={w.t} index={i} className="card card-hover p-6 md:p-7">
              <span className="num">0{i + 1}</span>
              <h3 className="mt-5 !text-xl">{w.t}</h3>
              <p className="text-text-2 mt-2 text-[0.95rem]">{w.d}</p>
            </Reveal>
          ))}
          <Reveal as="li" index={whyUs.length} className="card note-card p-6 md:p-7 flex flex-col justify-between">
            <p className="text-text-2 text-[0.95rem]">{home.why.note}</p>
            <Link href="/work/" className="btn btn-ghost !justify-start mt-4">{home.why.link} <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
          </Reveal>
        </ul>
      </div>
    </Tone>
  );
}

export function SelectedWork() { return null; } // merged into WhyUs (no approved case studies yet)

export function HomeFaq({ bg, layout = "side" }: { bg?: string; layout?: "side" | "stacked" }) {
  const stacked = layout === "stacked";
  return (
    <Tone {...toneOf(bg, { tone: "light", alt: true })} className="section" aria-labelledby="faq-h">
      <div className={cn("container grid gap-14", stacked ? "max-w-[56rem]" : "lg:grid-cols-12")}>
        <Reveal className={cn(stacked ? "text-center [&_.lead]:mx-auto" : "lg:col-span-4")}>
          <p className="eyebrow">{home.faq.eyebrow}</p>
          <h2 id="faq-h" className="mt-5"><HeadText h={home.faq} /></h2>
          <p className="lead mt-6">{home.faq.lead}</p>
        </Reveal>
        <Reveal className={cn(!stacked && "lg:col-span-8")} index={1}><Faq items={homeFaq} /></Reveal>
      </div>
    </Tone>
  );
}

export { ServiceGlyph };
