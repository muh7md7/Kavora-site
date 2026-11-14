import { seo } from "@/lib/seo";
import { t } from "@/i18n";
import type { Metadata } from "next";
import { pages } from "@/content/copy";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircleQuestion } from "lucide-react";
import { ServiceStage } from "@/components/sections/Bento";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { HeadText, SectionHead, Tone } from "@/components/sections/Tone";
import { LazyWorkflow } from "@/components/sections/Lazy";
import { Faq } from "@/components/sections/Faq";
import { Button } from "@/components/glass/Button";
import { aiOffer, serviceById } from "@/content/site";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: t("AI Solutions — Custom AI Agents & Automation"),
  description: t("Tell us what you want to automate. Custom AI agents and workflow automation built around your business, plus ready-made solutions where available."),
  ...seo("/ai-solutions/"),
};

const faq = pages.aiSolutions.faq;

export default function AiSolutionsPage() {
  const ai = serviceById("automation");
  const ai2 = pages.aiSolutions;
  return (
    <>
      <PageHero eyebrow="AI Solutions" aside={<Reveal className="device"><ServiceStage id="automation" scale={1.3} className="!h-[300px] sm:!h-[360px] lg:!h-[400px]" /><p className="px-2 pt-2.5 text-[0.75rem] text-text-2 font-mono tracking-[.04em]">{t("Illustrative workflow · sample content")}</p></Reveal>} title={ai2.hero.title} accent={ai2.hero.accent} lead={ai2.hero.lead}>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href="/contact/?type=ai-custom&services=automation">{t("Discuss Your AI Project")}</Button>
          <Button href="#options" variant="ghost">{t("See your options")}</Button>
        </div>
      </PageHero>

      <Tone tone="mist" className="section" id="options" aria-labelledby="opt-h">
        <div className="container border-t border-line pt-16">
          <Reveal><SectionHead eyebrow={ai2.options.eyebrow} title={ai2.options.title} accent={ai2.options.accent} after={ai2.options.after} /></Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {aiOffer.paths.map((p, i) => (
              <Reveal key={p.id} index={i}>
                <article className={cn("card h-full p-8 flex flex-col", i === 1 ? "feature-card-light !border-line-strong" : "border-line bg-surface")}>
                  <div className="flex items-center justify-between"><span className="num">0{i + 1}</span>{i === 0 && <span className="chip chip-slate">{t("Availability on request")}</span>}{i === 1 && <span className="chip chip-navy">{t("Most flexible")}</span>}</div>
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

      <Tone tone="dark" grad grid className="section" aria-labelledby="ex-h">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 items-end">
            <Reveal className="lg:col-span-7"><SectionHead eyebrow={ai2.examples.eyebrow} title={ai2.examples.title} accent={ai2.examples.accent} after={ai2.examples.after} /></Reveal>
            <Reveal className="lg:col-span-5" index={1}><p className="lead">{ai2.examples.lead}</p></Reveal>
          </div>
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {aiOffer.examples.map((e, i) => (
              <Reveal as="li" key={e.title} index={i % 4}>
                <Link href={`/contact/?type=ai-custom&services=automation&topic=${encodeURIComponent(e.title)}`} data-cursor="Enquire"
                  data-spot className="card card-hover group h-full flex flex-col p-6">
                  <h3 className="!text-[1.12rem] !leading-snug">{e.title}</h3>
                  <p className="text-text-2 text-[0.9rem] mt-2">{e.does}</p>
                  <p className="mt-5 pt-4 border-t border-line text-[0.82rem]"><span className="text-text-2">{t("Solves:")}{" "}</span>{e.solves}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-[550] text-accent">{t("Enquire")}{" "}<ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" index={0} className="sm:col-span-2 lg:col-span-4">
              <Link href="/contact/?type=ai-custom&services=automation" className="group flex flex-wrap items-center justify-between gap-6 rounded-[calc(22px*var(--rs,1))] border border-dashed border-line-strong p-6 md:p-8 hover:border-text-2 transition-colors">
                <span className="flex items-center gap-4"><MessageCircleQuestion size={22} className="text-accent shrink-0" aria-hidden /><span><span className="block font-[550] text-[1.1rem]">{t("Something else in mind?")}</span><span className="text-text-2 text-[0.95rem]">Describe the task. We&apos;ll propose a solution if it&apos;s technically feasible.</span></span></span>
                <span className="btn btn-primary">{t("Describe your idea")}{" "}<ArrowUpRight size={16} className="btn-arrow" aria-hidden /></span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </Tone>

      <Tone tone="light" className="section" aria-labelledby="how-h">
        <div className="container grid gap-14 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{ai2.how.eyebrow}</p>
            <h2 id="how-h" className="mt-5"><HeadText h={ai2.how} /></h2>
            <p className="lead mt-6">{ai2.how.lead}</p>
            <ol className="mt-8 grid gap-4">
              {ai2.how.steps.map((t, i) => (
                <li key={t} className="flex gap-4 items-baseline"><span className="num">0{i + 1}</span><span>{t}</span></li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-7 bloom" index={1}><LazyWorkflow /></Reveal>
        </div>
      </Tone>

      <Tone tone="warm" className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{t("Combine it")}</p>
            <h2 className="mt-5">{t("Works on its own — or with your")}{" "}<span className="accent">{t("other")}</span>{" "}{t("services.")}</h2>
          </Reveal>
          <ul className="lg:col-span-8 grid sm:grid-cols-3 gap-3 self-start">
            {[
              { t: t("With your website"), d: t("An AI assistant that answers and qualifies visitors."), href: "/services/website-design-development/" },
              { t: t("With your ads"), d: t("Every lead from Meta or Google followed up instantly."), href: "/services/digital-advertising/" },
              { t: t("With a dashboard"), d: t("See every automated lead and task in one view."), href: "/services/business-dashboards-systems/" },
            ].map((c, i) => (
              <Reveal as="li" key={c.t} index={i}>
                <Link href={c.href} data-spot className="card card-hover group block h-full p-6">
                  <span className="font-[550]">{c.t}</span><p className="text-text-2 text-[0.9rem] mt-2">{c.d}</p>
                  <ArrowUpRight size={16} className="mt-5 text-text-2 group-hover:text-text transition-colors" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="container grid gap-14 lg:grid-cols-12 mt-24">
          <Reveal className="lg:col-span-4"><p className="eyebrow">FAQ</p><h2 className="mt-5">{t("Straight")}{" "}<span className="accent">{t("answers.")}</span></h2></Reveal>
          <Reveal className="lg:col-span-8" index={1}><Faq items={faq} name="ai-faq" /></Reveal>
        </div>
      </Tone>
      <FaqJsonLd faq={faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: ai.name, href: `/services/${ai.slug}/` }, { name: "AI Solutions", href: "/ai-solutions/" }]} />
    </>
  );
}
