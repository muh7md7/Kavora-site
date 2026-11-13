import { packagesByService } from "@/content/packages";
import type { ServiceId } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Four steps written for this service specifically — never the generic agency five. */
export function ServiceProcess({ id, tone = "light", layout = "row" }: { id: ServiceId; tone?: "light" | "dark"; layout?: "row" | "rail" }) {
  const { process } = packagesByService[id];
  return (
    <section data-theme={tone} className={cn("tone section-major", tone === "dark" && "grain")}>
      <div className="container">
        <div className={cn(layout === "rail" ? "grid lg:grid-cols-12 gap-10" : "")}>
          <div className={cn("max-w-[44rem]", layout === "rail" && "lg:col-span-4")}>
            <p className="eyebrow">How it runs</p>
            <h2 className="mt-5">From brief to <span className="accent">live.</span></h2>
            <p className="mt-6 text-text-2 leading-relaxed">Four steps. You see work at every one of them — no month of silence followed by a reveal.</p>
          </div>
          <ol className={cn("grid gap-px bg-line border border-line rounded-[24px] overflow-hidden",
            layout === "rail" ? "lg:col-span-8 mt-10 lg:mt-0 sm:grid-cols-2" : "mt-14 sm:grid-cols-2 lg:grid-cols-4")}>
            {process.map((p, i) => (
              <Reveal as="li" key={p.n} index={i} className="bg-bg p-6 md:p-7 flex flex-col min-h-[200px]">
                <span className="num">{p.n}</span>
                <h3 className="mt-4 !text-[1.2rem]">{p.name}</h3>
                <p className="mt-2.5 text-[0.92rem] text-text-2 leading-snug">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
