"use client";
import { useState } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { packagesByService, pricingNote } from "@/content/packages";
import { contactHref } from "@/content/enquiry";
import { thirdPartyNote, type ServiceId } from "@/content/site";
import { Button, Toggle } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Packages — three tiers plus Custom. Prices stay visible [PRICE] slots until real figures are confirmed:
 * the layout is finished, the number is the only thing missing. Each CTA carries the chosen tier into the wizard.
 */
export function Packages({ id, tone = "light" }: { id: ServiceId; tone?: "light" | "dark" }) {
  const { tiers, compare, toggle, toggleNote } = packagesByService[id];
  const [monthly, setMonthly] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <section id="packages" data-theme={tone} className={cn("tone section-major scroll-mt-24", tone === "dark" && "grain tone-grad")}>
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[44rem]">
            <p className="eyebrow">Packages</p>
            <h2 className="mt-5">Pick a starting <span className="accent">point.</span></h2>
            <p className="lead mt-6">Three shapes most projects fit, plus a custom scope when they don&rsquo;t. Move up or down a tier at any time.</p>
          </div>
          {toggle && (
            <div className="shrink-0">
              <Toggle checked={monthly} onChange={setMonthly} label={monthly ? "Build + monthly plan" : "One-time build"} />
              <p className="mt-2 text-[0.82rem] text-text-2 max-w-[28ch]">{monthly ? "Includes hosting, monitoring and changes." : "Delivered and handed over, no monthly fee."}</p>
            </div>
          )}
        </div>

        <div className="mt-12 grid lg:grid-cols-4 gap-4 md:gap-5 items-stretch">
          {tiers.map((t, i) => (
            <Reveal key={t.id} index={i} className="min-w-0">
              <div className={cn("card h-full flex flex-col p-6 md:p-7 relative", t.highlight && "lg:-mt-3 lg:mb-[-12px] shadow-[var(--elev-2)] border-[color-mix(in_srgb,var(--text)_22%,transparent)]")}>
                {t.highlight && <span className="tag tag-mono absolute -top-3 left-6 !bg-[var(--graphite)] !text-[var(--offwhite)] !border-[var(--graphite)] !min-h-6 !px-2.5">Most chosen</span>}
                <p className="font-mono text-[11px] uppercase tracking-[.12em] text-text-2">0{i + 1}</p>
                <h3 className="mt-3">{t.name}</h3>
                <p className="mt-2.5 text-[0.92rem] text-text-2 leading-snug min-h-[3.4em]">{t.forWho}</p>

                <div className="mt-6 pt-5 border-t border-line">
                  {t.price ? <p className="text-[1.9rem] font-[560] tracking-[-0.04em] leading-none">{t.price}</p>
                    : <p><span className="ph-label">[PRICE]</span></p>}
                  <p className="mt-2.5 text-[0.82rem] text-text-2">
                    {t.billing === "monthly" ? "per month" : t.billing === "once" ? "one-time project" : monthly ? "build + monthly plan" : "one-time build"}
                    <span className="block mt-0.5">Turnaround: {t.turnaround}</span>
                  </p>
                </div>

                <ul className="mt-6 grid gap-2.5 flex-1">
                  {t.includes.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[0.9rem] leading-snug">
                      <Check size={15} className="mt-0.5 shrink-0 text-text-2" aria-hidden /><span>{x}</span>
                    </li>
                  ))}
                </ul>

                <Button href={contactHref({ services: [id], package: t.id })} variant={t.highlight ? "primary" : "secondary"} arrow="right" className="mt-7 w-full">
                  Enquire · {t.name}
                </Button>
              </div>
            </Reveal>
          ))}

          {/* Custom */}
          <Reveal index={3} className="min-w-0">
            <div data-theme="dark" data-spot className="card grain h-full flex flex-col p-6 md:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[.12em] text-text-2">04</p>
              <h3 className="mt-3">Custom</h3>
              <p className="mt-2.5 text-[0.92rem] text-text-2 leading-snug min-h-[3.4em]">When none of the above is the right shape — or you already know exactly what you need.</p>
              <div className="mt-6 pt-5 border-t border-line">
                <p className="text-[1.9rem] font-[560] tracking-[-0.04em] leading-none">Custom quote</p>
                <p className="mt-2.5 text-[0.82rem] text-text-2">scoped to the work<span className="block mt-0.5">Turnaround: agreed with you</span></p>
              </div>
              <ul className="mt-6 grid gap-2.5 flex-1">
                {["A scope written around your situation", "Any combination of our services", "Phased delivery where it helps", "Fixed quote before work starts"].map((x) => (
                  <li key={x} className="flex gap-2.5 text-[0.9rem] leading-snug"><Check size={15} className="mt-0.5 shrink-0 text-text-2" aria-hidden /><span>{x}</span></li>
                ))}
              </ul>
              <Button href={contactHref({ services: [id], package: "custom" })} arrow="right" className="mt-7 w-full">Discuss a custom scope</Button>
            </div>
          </Reveal>
        </div>

        {/* comparison */}
        <div className="mt-8">
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={`cmp-${id}`}
            className="b b-secondary w-full !justify-between !px-6 !min-h-14">
            <span>Compare all three in detail</span>
            <ChevronDown size={18} className={cn("transition-transform duration-[350ms]", open && "rotate-180")} aria-hidden />
          </button>
          <div id={`cmp-${id}`} hidden={!open} className="mt-4">
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[560px] text-[0.92rem]">
                <caption className="sr-only">Feature comparison across the three packages</caption>
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="text-left font-[550] p-4">Included</th>
                    {tiers.map((t) => <th scope="col" key={t.id} className="p-4 font-[550] text-center border-l border-line">{t.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row, i) => (
                    <tr key={row.feature} className={cn(i < compare.length - 1 && "border-b border-line")}>
                      <th scope="row" className="text-left font-[450] p-4">{row.feature}</th>
                      {(["starter", "growth", "scale"] as const).map((k) => (
                        <td key={k} className="p-4 text-center border-l border-line">
                          {row[k] === true ? <Check size={16} className="inline" aria-label="Included" />
                            : row[k] === false ? <Minus size={16} className="inline text-text-2/50" aria-label="Not included" />
                            : <span>{row[k]}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-3 text-[0.88rem] text-text-2">
          <p>{pricingNote}</p>
          <p>{toggleNote ?? thirdPartyNote}</p>
        </div>
      </div>
    </section>
  );
}
