import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircleQuestion } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHead, Tone } from "@/components/sections/Tone";
import { LazyWorkflow } from "@/components/sections/Lazy";
import { Faq } from "@/components/sections/Faq";
import { Button } from "@/components/glass/Button";
import { aiOffer, serviceById } from "@/content/site";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "AI Solutions — custom agents and automation",
  description: "Tell us what you want to automate. Custom AI agents and workflow automation built around your business, plus ready-made solutions where available.",
  alternates: { canonical: "/ai-solutions/" },
};

const faq = [
  { q: "What's the difference between ready-made and custom?", a: "Ready-made solutions are proven agents or workflows we configure for your business — faster to launch. Custom agents are designed and built from scratch around your specific process." },
  { q: "Can I request an AI agent that isn't listed?", a: "Yes. The examples are not limits. Describe what you need and we'll tell you honestly whether it's feasible and how we'd build it." },
  { q: "Which tools can it connect to?", a: "It depends on the tools you use and whether they offer integrations. We confirm compatibility during scoping — we don't promise it upfront." },
  { q: "How is it priced?", a: "Every solution gets a custom quote. Some have a one-time setup cost, some also have ongoing costs for hosting, AI usage, messaging or support. Third-party costs are paid by you directly and listed in the proposal before you commit. Ready-made solutions with a confirmed price are shared on request." },
  { q: "Can I buy online?", a: "Not yet. Send an enquiry and we'll reply with availability, options and a quote." },
];

export default function AiSolutionsPage() {
  const ai = serviceById("automation");
  return (
    <>
      <PageHero eyebrow="AI Solutions" title="Tell us what you want to automate." accent="We build it." lead="Custom AI agents and automation designed around your business — plus ready-made solutions where a built one genuinely fits. Answer customers instantly, follow up every lead, book appointments and remove repetitive work.">
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href="/contact/?type=ai-custom&services=automation">Discuss Your AI Project</Button>
          <Button href="#options" variant="ghost">See your options</Button>
        </div>
      </PageHero>

      <Tone tone="light" className="section !pt-0" id="options" aria-labelledby="opt-h">
        <div className="container border-t border-line pt-16">
          <Reveal><SectionHead eyebrow="Three ways to work with us" title="Pick the path that" accent="fits." /></Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {aiOffer.paths.map((p, i) => (
              <Reveal key={p.id} index={i}>
                <article className={cn("h-full rounded-[26px] border p-8 flex flex-col", i === 1 ? "border-line-strong bg-[linear-gradient(170deg,var(--steel-soft),transparent_70%)]" : "border-line bg-surface")}>
                  <div className="flex items-center justify-between"><span className="num">0{i + 1}</span>{i === 0 && <span className="chip chip-slate">Availability on request</span>}{i === 1 && <span className="chip chip-navy">Most flexible</span>}</div>
                  <h2 className="mt-6 !text-[1.6rem] !leading-tight">{p.title}</h2>
                  <p className="text-text-2 mt-3">{p.lead}</p>
                  <ul className="mt-7 grid gap-3 text-[0.95rem]">{p.points.map((pt) => <li key={pt} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden />{pt}</li>)}</ul>
                  <div className="mt-auto pt-10"><Link href={p.cta.href} className={cn("btn w-full !justify-between", i === 1 ? "btn-primary" : "btn-glass")}>{p.cta.label}<ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Tone>

      <Tone tone="dark" grad className="section" aria-labelledby="ex-h">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 items-end">
            <Reveal className="lg:col-span-7"><SectionHead eyebrow="What an AI agent can do" title="Examples, not" accent="limits." /></Reveal>
            <Reveal className="lg:col-span-5" index={1}><p className="lead">Each of these can be ready-made or custom-built, depending on your tools and process. Need something else? Ask.</p></Reveal>
          </div>
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {aiOffer.examples.map((e, i) => (
              <Reveal as="li" key={e.title} index={i % 4}>
                <Link href={`/contact/?type=ai-custom&services=automation&topic=${encodeURIComponent(e.title)}`} data-cursor="Enquire"
                  data-spot className="lift group h-full flex flex-col rounded-[22px] border border-line bg-surface p-6">
                  <h3 className="!text-[1.12rem] !leading-snug">{e.title}</h3>
                  <p className="text-text-2 text-[0.9rem] mt-2">{e.does}</p>
                  <p className="mt-5 pt-4 border-t border-line text-[0.82rem]"><span className="text-text-2">Solves: </span>{e.solves}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-[550] text-accent">Enquire <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" index={0} className="sm:col-span-2 lg:col-span-4">
              <Link href="/contact/?type=ai-custom&services=automation" className="group flex flex-wrap items-center justify-between gap-6 rounded-[22px] border border-dashed border-line-strong p-6 md:p-8 hover:border-text-2 transition-colors">
                <span className="flex items-center gap-4"><MessageCircleQuestion size={22} className="text-accent shrink-0" aria-hidden /><span><span className="block font-[550] text-[1.1rem]">Something else in mind?</span><span className="text-text-2 text-[0.95rem]">Describe the task. We&apos;ll propose a solution if it&apos;s technically feasible.</span></span></span>
                <span className="btn btn-primary">Describe your idea <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </Tone>

      <Tone tone="light" className="section" aria-labelledby="how-h">
        <div className="container grid gap-14 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">How it works</p>
            <h2 id="how-h" className="mt-5">From enquiry to <span className="accent">booked</span> call.</h2>
            <p className="lead mt-6">An example of one workflow. Hover or focus each step.</p>
            <ol className="mt-8 grid gap-4">
              {["Tell us the task and the tools you use", "We propose a solution with a clear quote", "We build, test and connect it", "It runs — and we monitor it"].map((t, i) => (
                <li key={t} className="flex gap-4 items-baseline"><span className="num">0{i + 1}</span><span>{t}</span></li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-7 bloom" index={1}><LazyWorkflow /></Reveal>
        </div>
      </Tone>

      <Tone tone="light" alt className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Combine it</p>
            <h2 className="mt-5">Works on its own — or with your <span className="accent">other</span> services.</h2>
          </Reveal>
          <ul className="lg:col-span-8 grid sm:grid-cols-3 gap-3 self-start">
            {[
              { t: "With your website", d: "An AI assistant that answers and qualifies visitors.", href: "/services/website-design-development/" },
              { t: "With your ads", d: "Every lead from Meta or Google followed up instantly.", href: "/services/digital-advertising/" },
              { t: "With a dashboard", d: "See every automated lead and task in one view.", href: "/services/business-dashboards-systems/" },
            ].map((c, i) => (
              <Reveal as="li" key={c.t} index={i}>
                <Link href={c.href} data-spot className="lift group block h-full rounded-[20px] border border-line bg-surface p-6">
                  <span className="font-[550]">{c.t}</span><p className="text-text-2 text-[0.9rem] mt-2">{c.d}</p>
                  <ArrowUpRight size={16} className="mt-5 text-text-2 group-hover:text-text transition-colors" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="container grid gap-14 lg:grid-cols-12 mt-24">
          <Reveal className="lg:col-span-4"><p className="eyebrow">FAQ</p><h2 className="mt-5">Straight <span className="accent">answers.</span></h2></Reveal>
          <Reveal className="lg:col-span-8" index={1}><Faq items={faq} name="ai-faq" /></Reveal>
        </div>
      </Tone>
      <FaqJsonLd faq={faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: ai.name, href: `/services/${ai.slug}/` }, { name: "AI Solutions", href: "/ai-solutions/" }]} />
    </>
  );
}
