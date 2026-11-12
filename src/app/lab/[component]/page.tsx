import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findLab, lab } from "@/lab/registry";
import { LabDemo } from "@/components/lab/LabDemo";
import { readSource } from "@/lib/source";
import { CodeWindow } from "@/components/glass/CodeWindow";
import { Button } from "@/components/glass/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() { return lab.map((e) => ({ component: e.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ component: string }> }): Promise<Metadata> {
  const e = findLab((await params).component);
  return e ? { title: `${e.title} ${e.version} — Lab`, description: e.description, alternates: { canonical: `/lab/${e.slug}/` } } : {};
}

export default async function LabEntryPage({ params }: { params: Promise<{ component: string }> }) {
  const e = findLab((await params).component);
  if (!e) notFound();
  const code = readSource(e.file);
  return (
    <>
      <section className="bg-ivory section pt-36">
        <div className="container">
          <nav aria-label="Breadcrumb" className="text-sm text-slate"><Link href="/lab/" className="hover:text-navy">Lab</Link> / {e.title}</nav>
          <h1 className="mt-3">{e.title} <span className="accent">{e.version}</span></h1>
          <p className="lead mt-4">{e.description}</p>
          <div className="mt-8 rounded-lg bg-[url('/backdrops/interior-1.svg')] bg-cover p-6 md:p-12 min-h-[320px] flex items-center justify-center"><LabDemo slug={e.slug} /></div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-8">
              <div><h2 className="!text-xl">Props &amp; variants</h2><ul className="mt-3 space-y-1 text-sm font-mono text-slate">{e.props.map((p) => <li key={p}>{p}</li>)}</ul></div>
              <div><h2 className="!text-xl">Accessibility</h2><ul className="mt-3 space-y-1 text-sm text-slate list-disc pl-5">{e.a11y.map((a) => <li key={a}>{a}</li>)}</ul></div>
              <div><h2 className="!text-xl">Used on</h2><p className="mt-2 text-sm text-slate">{e.usedOn}</p></div>
              <div className="flex flex-wrap gap-3">
                <Button href={`/lab/capture/${e.slug}/`} variant="glass">Open reel capture frame</Button>
                <Button href="/contact/" variant="ghost">Want this built for you?</Button>
              </div>
            </div>
            <CodeWindow code={code} filename={e.file} lang={e.lang ?? "tsx"} maxHeight={640} />
          </div>
        </div>
      </section>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Lab", href: "/lab/" }, { name: e.title, href: `/lab/${e.slug}/` }]} />
    </>
  );
}
