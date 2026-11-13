import Link from "next/link";
import { home } from "@/content/copy";
import { ArrowUpRight, Layers, Sparkles, Square } from "lucide-react";
import { aiOffer, combinations, services, shortName } from "@/content/site";
import { ServiceGlyph } from "@/components/glass/ServiceGlyph";
import { Reveal } from "./Reveal";
import { HeadText, Tone } from "./Tone";
import { cn } from "@/lib/cn";

/** "One service or a complete solution" — both options presented as equals. */
export function FlexibleSolutions() {
  const f = home.flexible;
  return (
    <Tone tone="mist" className="section overflow-hidden" aria-labelledby="flex-h">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{f.eyebrow}</p>
            <h2 id="flex-h" className="mt-5"><HeadText h={f} /></h2>
          </Reveal>
          <Reveal className="lg:col-span-5" index={1}><p className="lead">{f.lead}</p></Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <article data-spot className="card h-full p-8 md:p-10 flex flex-col">
              <span className="size-11 rounded-[12px] bg-steel-soft text-accent inline-flex items-center justify-center" aria-hidden><Square size={20} /></span>
              <h3 className="mt-8 !text-[clamp(1.6rem,1.3rem+1vw,2.2rem)]">{f.individualTitle}</h3>
              <p className="text-text-2 mt-3 text-[1.02rem]">{f.individualText}</p>
              <ul className="mt-8 grid gap-2">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.slug}/`} className="group flex items-center gap-3 rounded-[12px] px-3 py-2.5 -mx-3 hover:bg-surface-strong transition-colors">
                      <ServiceGlyph id={s.id} className="!size-8" size={16} />
                      <span className="font-[520]">{s.name}</span>
                      <ArrowUpRight size={15} className="ml-auto text-text-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/services/" className="btn btn-glass mt-auto self-start !mt-10">{f.individualButton} <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
            </article>
          </Reveal>
          <Reveal index={1}>
            <article data-theme="dark" className="card h-full p-8 md:p-10 flex flex-col relative overflow-hidden !bg-[radial-gradient(80%_70%_at_90%_0%,rgba(120,153,166,.35),transparent_60%),linear-gradient(165deg,#2a4352,#1e3240)] text-text !border-transparent shadow-[0_50px_90px_-50px_rgba(23,38,47,.7)]">
              <span className="size-11 rounded-[12px] bg-[var(--steel-blue)] text-[#17262f] inline-flex items-center justify-center" aria-hidden><Layers size={20} /></span>
              <h3 className="mt-8 !text-[clamp(1.6rem,1.3rem+1vw,2.2rem)]">{f.completeTitle}</h3>
              <p className="text-text-2 mt-3 text-[1.02rem]">{f.completeText}</p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-2.5">
                {combinations.filter((c) => c.ids.length > 1 && c.title !== "Full presence").map((c) => (
                  <li key={c.title} className="rounded-[14px] border border-line bg-surface p-4">
                    <span className="block font-[550] text-[0.95rem]">{c.title}</span>
                    <span className="mt-2 flex flex-wrap gap-1">{c.ids.map((id) => <span key={id} className="chip chip-slate !text-[0.6rem]">{shortName[id]}</span>)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact/?type=solution" className="btn btn-primary mt-auto self-start !mt-10" data-magnetic>{f.completeButton} <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
            </article>
          </Reveal>
        </div>
      </div>
    </Tone>
  );
}

/** Home AI section — AI as a sellable offering with three clear ways to buy. */
export function AiOffer({ tone = "light" }: { tone?: "light" | "dark" }) {
  const a = home.ai;
  return (
    <Tone tone={tone} grad={tone === "dark"} className="section overflow-hidden" aria-labelledby="ai-h">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{a.eyebrow}</p>
            <h2 id="ai-h" className="mt-5 max-w-[17ch]"><HeadText h={a} /></h2>
          </Reveal>
          <Reveal className="lg:col-span-5" index={1}><p className="lead">{a.lead}</p></Reveal>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {aiOffer.paths.map((p, i) => (
            <Reveal key={p.id} index={i}>
              <article data-spot data-theme={i === 1 ? "dark" : undefined} className={cn("card card-hover h-full p-7 flex flex-col", i === 1 && "!bg-[radial-gradient(80%_70%_at_90%_0%,rgba(120,153,166,.35),transparent_60%),linear-gradient(165deg,#2a4352,#1e3240)] !border-transparent text-text")}>
                <span className="num">0{i + 1}</span>
                <h3 className="mt-5 !text-[1.45rem]">{p.title}</h3>
                <p className="text-text-2 mt-2">{p.lead}</p>
                <ul className="mt-6 grid gap-2.5 text-[0.93rem]">{p.points.map((pt) => <li key={pt} className="flex gap-2.5"><Sparkles size={14} className="mt-1 shrink-0 text-accent" aria-hidden />{pt}</li>)}</ul>
                <Link href={p.cta.href} className="btn btn-ghost !justify-start mt-auto !pt-8">{p.cta.label} <ArrowUpRight size={16} className="arrow" aria-hidden /></Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <p className="text-text-2 max-w-xl">{a.footnote}</p>
          <Link href="/ai-solutions/" className="btn btn-primary" data-magnetic>{a.button} <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
        </Reveal>
      </div>
    </Tone>
  );
}
