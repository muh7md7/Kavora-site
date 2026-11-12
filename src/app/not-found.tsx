import Link from "next/link";
export default function NotFound() {
  return (
    <section className="relative min-h-[80svh] flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[url('/backdrops/interior-1.svg')] bg-cover bg-center" aria-hidden /><div className="absolute inset-0 scrim-ivory" aria-hidden />
      <div className="container relative"><div className="glass rounded-lg p-8 md:p-12 max-w-lg bloom">
        <p className="chip chip-slate">404</p><h1 className="mt-4">Page not <span className="accent">found.</span></h1>
        <p className="lead mt-4">The link may be old or mistyped.</p>
        <Link href="/" className="btn btn-primary mt-8">Take me home</Link>
      </div></div>
    </section>
  );
}
