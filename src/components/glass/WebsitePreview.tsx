"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Laptop, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/cn";

type Device = "desktop" | "tablet" | "phone";
const devices: { id: Device; label: string; width: number; icon: typeof Laptop }[] = [
  { id: "desktop", label: "Desktop", width: 1120, icon: Laptop },
  { id: "tablet", label: "Tablet", width: 640, icon: Tablet },
  { id: "phone", label: "Phone", width: 360, icon: Smartphone },
];

/**
 * Responsive website preview — an illustrative business website rendered inside a device frame.
 * The frame width changes; the layout inside responds through CSS container queries, so the demo
 * is a genuine responsive layout, not three static pictures. Sample content, approved palette only.
 */
export function WebsitePreview({ className }: { className?: string }) {
  const [device, setDevice] = useState<Device>("desktop");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sent, setSent] = useState(false);
  const id = useId();
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const d = devices.find((x) => x.id === device)!;

  // Small screens start on the phone frame (a 1120px desktop frame scaled to 360px is unreadable).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => { if (mq.matches) setDevice("phone"); };
    const raf = requestAnimationFrame(apply);
    mq.addEventListener("change", apply);
    return () => { cancelAnimationFrame(raf); mq.removeEventListener("change", apply); };
  }, []);

  // Fit the frame to the available width without changing its container-query width.
  useEffect(() => {
    const el = stage.current; if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, (el.clientWidth - 8) / d.width)));
    ro.observe(el); return () => ro.disconnect();
  }, [d.width]);

  const onKey = (e: React.KeyboardEvent) => {
    const i = devices.findIndex((x) => x.id === device);
    if (e.key === "ArrowRight") { e.preventDefault(); setDevice(devices[(i + 1) % devices.length].id); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setDevice(devices[(i + devices.length - 1) % devices.length].id); }
  };

  return (
    <figure className={cn("w-full", className)} aria-label="Interactive preview of an illustrative business website at desktop, tablet and phone widths">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div role="radiogroup" aria-label="Preview width" className="inline-flex rounded-full border border-line bg-surface p-1 gap-0.5" onKeyDown={onKey}>
          {devices.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={device === x.id} tabIndex={device === x.id ? 0 : -1} onClick={() => setDevice(x.id)}
              className={cn("inline-flex items-center gap-2 h-9 px-3.5 rounded-full text-[0.82rem] font-[550] transition-colors", device === x.id ? "bg-[var(--steel-blue)] text-[#11191e]" : "text-text-2 hover:text-text")}>
              <x.icon size={15} aria-hidden /><span className="hidden sm:inline">{x.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="num hidden sm:inline">{d.width}px · {theme}</span>
          <button type="button" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))} aria-pressed={theme === "dark"}
            className="h-9 px-3.5 rounded-full border border-line bg-surface text-[0.82rem] font-[550] text-text hover:bg-surface-strong transition-colors">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
          <span className="chip chip-slate">Illustrative · sample content</span>
        </div>
      </div>

      <div ref={stage} className="w-full flex justify-center overflow-hidden" style={{ height: Math.round((device === "phone" ? 640 : 560) * scale) + 28 }}>
        <div className="origin-top transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ width: d.width, transform: `scale(${scale})` }}>
          {/* Device chrome */}
          <div className={cn("rounded-[22px] border border-[rgba(184,201,210,.22)] bg-[#18232a] p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)]", device === "phone" && "rounded-[34px] p-2.5")}>
            {device !== "phone" && (
              <div className="flex items-center gap-2 px-2 pb-2">
                <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[rgba(184,201,210,.25)]" /><i className="size-2.5 rounded-full bg-[rgba(184,201,210,.25)]" /><i className="size-2.5 rounded-full bg-[rgba(184,201,210,.25)]" /></span>
                <span className="mx-auto h-6 px-4 rounded-full bg-[rgba(247,248,246,.06)] text-[0.68rem] text-[#9aa8b0] inline-flex items-center font-mono">example-business.site</span>
              </div>
            )}
            {/* Site */}
            <div data-theme={theme} className={cn("site-preview tone tone-grad overflow-hidden", device === "phone" ? "rounded-[26px]" : "rounded-[14px]")} style={{ height: device === "phone" ? 616 : 522 }}>
              <div className="@container h-full overflow-y-auto overscroll-contain [scrollbar-width:thin]">
                {/* nav */}
                <div className="sticky top-0 z-10 px-4 pt-3">
                  <div className="glass rounded-[12px] h-11 px-3 flex items-center justify-between">
                    <span className="flex items-center gap-2"><span className="size-5 rounded-[6px] bg-[var(--graphite)]" aria-hidden /><span className="text-[0.8rem] font-[620] tracking-[-0.02em]">Northwind Studio</span></span>
                    <span className="hidden @[560px]:flex items-center gap-4 text-[0.74rem] text-text-2">{["Work", "Services", "Studio", "Journal"].map((t) => <span key={t}>{t}</span>)}</span>
                    <span className="h-7 px-3 rounded-full bg-[var(--graphite)] text-[#f7f8f6] text-[0.7rem] font-[550] inline-flex items-center">Enquire</span>
                  </div>
                </div>
                {/* hero */}
                <div className="px-5 pt-10 pb-8 grid gap-6 @[720px]:grid-cols-12 @[720px]:items-center">
                  <div className="@[720px]:col-span-7">
                    <span className="eyebrow">Interior architecture</span>
                    <p className="mt-3 font-[560] tracking-[-0.04em] leading-[1.02] text-[clamp(1.6rem,8cqw,3rem)]">Spaces that feel <span className="accent">considered.</span></p>
                    <p className="mt-3 text-text-2 text-[0.85rem] max-w-[42ch]">Residential and hospitality interiors — from concept to handover, with one team throughout.</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="h-9 px-4 rounded-full bg-[var(--graphite)] text-[#f7f8f6] text-[0.76rem] font-[550] inline-flex items-center gap-1.5">Start a project <ArrowUpRight size={12} aria-hidden /></span>
                      <span className="h-9 px-4 rounded-full border border-line-strong bg-surface text-[0.76rem] font-[550] inline-flex items-center">View work</span>
                    </div>
                  </div>
                  <div className="@[720px]:col-span-5 grid grid-cols-3 gap-2" aria-hidden>
                    <span className="col-span-2 row-span-2 aspect-[4/3] rounded-[14px] bg-[linear-gradient(135deg,var(--steel-blue),var(--bg-2)_70%)]" />
                    <span className="aspect-square rounded-[14px] bg-[var(--steel-soft)]" />
                    <span className="aspect-square rounded-[14px] bg-[var(--graphite)]" />
                  </div>
                </div>
                {/* services */}
                <div className="px-5 pb-8">
                  <div className="flex items-end justify-between gap-4 border-t border-line pt-6">
                    <span className="text-[1.05rem] font-[560] tracking-[-0.03em]">What we do</span><span className="num">03 services</span>
                  </div>
                  <ul className="mt-4 grid gap-2 @[560px]:grid-cols-3">
                    {[["Residential", "Apartments, villas and family homes."], ["Hospitality", "Restaurants, cafés and boutique stays."], ["Workplace", "Studios and offices that work."]].map(([t, s], i) => (
                      <li key={t} className="rounded-[14px] border border-line bg-surface p-4"><span className="num">0{i + 1}</span><span className="block mt-2 font-[550] text-[0.9rem]">{t}</span><span className="block text-[0.76rem] text-text-2 mt-1">{s}</span></li>
                    ))}
                  </ul>
                </div>
                {/* testimonial-free proof band → process */}
                <div data-theme={theme === "light" ? "dark" : "light"} className="tone tone-grad px-5 py-8">
                  <div className="grid gap-5 @[640px]:grid-cols-[1fr_1.2fr] @[640px]:items-center">
                    <div><span className="eyebrow">Process</span><p className="mt-2 text-[1.2rem] font-[560] tracking-[-0.03em] leading-tight">Concept, design, build — <span className="accent">one team.</span></p></div>
                    <ol className="grid gap-2 @[400px]:grid-cols-3">{["Brief & survey", "Design & samples", "Build & handover"].map((t, i) => <li key={t} className="rounded-[12px] border border-line bg-surface p-3 text-[0.76rem]"><span className="num block">0{i + 1}</span><span className="block mt-1 font-[550]">{t}</span></li>)}</ol>
                  </div>
                </div>
                {/* enquiry */}
                <div className="px-5 py-8">
                  <div className="rounded-[16px] border border-line bg-surface p-5 grid gap-3 @[560px]:grid-cols-[1fr_auto] @[560px]:items-center">
                    <div><span className="font-[560] tracking-[-0.02em] text-[1rem]">Tell us about your space</span><span className="block text-[0.78rem] text-text-2 mt-1">We reply within two working days.</span></div>
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }} aria-label="Sample enquiry (demo — nothing is sent)">
                      <label className="sr-only" htmlFor={`${id}-mail`}>Email (demo)</label>
                      <input id={`${id}-mail`} type="email" placeholder="you@company.com" className="h-9 min-w-0 flex-1 rounded-full border border-line-strong bg-bg px-3 text-[0.76rem] text-text placeholder:text-text-2 focus:outline-2 focus:outline-[var(--accent)]" />
                      <button type="submit" className="h-9 px-3.5 rounded-full bg-[var(--graphite)] text-[#f7f8f6] text-[0.74rem] font-[550] shrink-0">{sent ? "Demo only ✓" : "Send"}</button>
                    </form>
                  </div>
                  <p className="mt-6 text-center text-[0.68rem] text-text-2">© Northwind Studio · Privacy · Terms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">Illustrative layout with sample content. The real build is designed around your business.</figcaption>
    </figure>
  );
}
