import { Keel } from "@/components/brand/Keel";
import { Button } from "@/components/ui";
import { services, shortName } from "@/content/site";
import Link from "next/link";

/** 404 — the keel line and waves, drawn in code. */
export default function NotFound() {
  return (
    <section data-theme="dark" className="tone tone-grad grain relative min-h-[100svh] flex items-center overflow-hidden">
      <Keel />
      <div className="container relative">
        <p className="eyebrow rv-auto">Error 404</p>
        <h1 className="display mt-6 rv-auto" style={{ ["--rv-delay" as string]: "120ms" }}>Lost at <span className="accent">sea.</span></h1>
        <p className="lead mt-7 rv-auto" style={{ ["--rv-delay" as string]: "240ms" }}>
          This page has moved or never existed. Here&rsquo;s the way back.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 rv-auto" style={{ ["--rv-delay" as string]: "340ms" }}>
          <Button href="/" size="lg">Take me home</Button>
          <Button href="/contact/" variant="secondary" arrow="right">Start a project</Button>
        </div>
        <nav aria-label="Services" className="mt-14 rv-auto" style={{ ["--rv-delay" as string]: "440ms" }}>
          <p className="font-mono text-[11px] uppercase tracking-[.14em] text-text-2">Or go straight to a service</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}><Link href={`/services/${s.slug}/`} className="tag !min-h-11 !px-4 hover:!text-text hover:!border-text-2">{shortName[s.id]}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
