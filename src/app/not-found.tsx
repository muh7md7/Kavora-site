import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section data-theme="dark" className="tone tone-grad relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden />
      <div className="container relative">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6">Lost at <span className="accent">sea.</span></h1>
        <p className="lead mt-6">The page you&apos;re looking for has moved or never existed.</p>
        <Link href="/" className="btn btn-premium mt-10">Take me home <ArrowUpRight size={17} className="btn-arrow" aria-hidden /></Link>
      </div>
    </section>
  );
}
