"use client";
import { useState } from "react";
import { packagesByService } from "@/content/packages";
import { contactHref } from "@/content/enquiry";
import type { ServiceId } from "@/content/site";
import { SelectCard, Button } from "@/components/ui";
import { cn } from "@/lib/cn";

/** Add-ons as selectable cards — the selection travels into the enquiry so nothing has to be retyped. */
export function AddOns({ id, tone = "light" }: { id: ServiceId; tone?: "light" | "dark" }) {
  const { addOns } = packagesByService[id];
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (x: string) => setPicked((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]));
  const names = addOns.filter((a) => picked.includes(a.id)).map((a) => a.name);

  return (
    <section data-theme={tone} className={cn("tone section-major", tone === "dark" && "grain")}>
      <div className="container grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">Add-ons</p>
          <h2 className="mt-5">Only if you <span className="accent">need them.</span></h2>
          <p className="mt-6 text-text-2 leading-relaxed">Tick anything relevant and it travels with your enquiry. Nothing here is required, and nothing is bundled in by default.</p>
          <div className="mt-8 hidden lg:block">
            <AddOnCta id={id} names={names} picked={picked} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <div role="group" aria-label="Add-ons" className="grid sm:grid-cols-2 gap-3">
            {addOns.map((a) => (
              <SelectCard key={a.id} multi title={a.name} desc={a.desc} checked={picked.includes(a.id)} onChange={() => toggle(a.id)} />
            ))}
          </div>
          <div className="mt-8 lg:hidden"><AddOnCta id={id} names={names} picked={picked} /></div>
        </div>
      </div>
    </section>
  );
}

function AddOnCta({ id, names, picked }: { id: ServiceId; names: string[]; picked: string[] }) {
  return (
    <>
      <p className="text-[0.95rem]" aria-live="polite">
        {names.length === 0 ? <span className="text-text-2">Nothing selected.</span>
          : <><span className="text-text-2">Selected: </span><span className="font-[550]">{names.join(", ")}</span></>}
      </p>
      <Button href={contactHref({ services: [id], topic: picked.length ? `Add-ons — ${names.join(", ")}` : undefined })} arrow="right" className="mt-4">
        {names.length ? "Enquire with these" : "Start an enquiry"}
      </Button>
    </>
  );
}
