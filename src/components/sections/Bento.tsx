import Link from "next/link";
import { ArrowUpRight, Bot, CalendarCheck, Check, Heart, Mail, MessageCircle, Play, Sparkles } from "lucide-react";
import { services, type ServiceId } from "@/content/site";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";
import { home } from "@/content/copy";

/* Illustrative interface previews — one per service. Pure HTML/CSS, transform/opacity motion only.
   Sample content only: no real clients, results or figures. */

const stageTone: Record<ServiceId, string> = { websites: "is-mist", social: "is-warm", ads: "is-deep", automation: "is-mist", dashboards: "is-deep" };

function WebsitesPreview() {
  return (
    <>
      <div className="pv pv-up absolute left-[7%] right-[19%] top-[12%] -bottom-6 rounded-[14px] bg-[#fbfaf7] border border-[rgba(35,56,69,.1)] shadow-[0_30px_60px_-30px_rgba(23,38,47,.45)] overflow-hidden">
        <div className="flex items-center gap-2 px-3 h-7 border-b border-[rgba(35,56,69,.08)] bg-[#f3f0eb]">
          <span className="flex gap-1"><i className="size-[7px] rounded-full bg-[rgba(35,56,69,.18)]" /><i className="size-[7px] rounded-full bg-[rgba(35,56,69,.18)]" /><i className="size-[7px] rounded-full bg-[rgba(35,56,69,.18)]" /></span>
          <span className="mx-auto h-4 w-[46%] rounded-full bg-white border border-[rgba(35,56,69,.08)] text-[7.5px] leading-4 text-center text-[#617783] font-mono">yourbusiness.com</span>
        </div>
        <div className="px-4 pt-3">
          <div className="flex items-center justify-between"><span className="h-2 w-10 rounded-sm bg-[#233845]" /><span className="flex gap-2"><i className="h-1 w-5 rounded bg-[rgba(35,56,69,.2)]" /><i className="h-1 w-5 rounded bg-[rgba(35,56,69,.2)]" /><i className="h-1 w-5 rounded bg-[rgba(35,56,69,.2)]" /></span></div>
          <div className="mt-4 grid grid-cols-[1.1fr_1fr] gap-3 items-center">
            <div>
              <span className="block h-2.5 w-[92%] rounded bg-[#17262f]" /><span className="mt-1.5 block h-2.5 w-[70%] rounded bg-[#17262f]" />
              <span className="mt-2.5 block h-1.5 w-[88%] rounded bg-[rgba(35,56,69,.18)]" /><span className="mt-1 block h-1.5 w-[64%] rounded bg-[rgba(35,56,69,.18)]" />
              <span className="mt-3 flex gap-1.5"><i className="h-4 w-12 rounded-full bg-[#233845]" /><i className="h-4 w-10 rounded-full border border-[rgba(35,56,69,.25)]" /></span>
            </div>
            <div className="aspect-[4/3] rounded-[10px] bg-[radial-gradient(70%_70%_at_70%_20%,#9fb8c2,transparent),linear-gradient(150deg,#d5e0e4,#617783)]" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-10 rounded-[8px] bg-[#eef1f1] border border-[rgba(35,56,69,.07)]" />)}</div>
        </div>
      </div>
      <div className="pv pv-left absolute right-[6%] bottom-[-10px] w-[22%] min-w-[78px] max-w-[104px] aspect-[9/17] rounded-[16px] bg-[#17262f] p-[5px] shadow-[0_24px_40px_-18px_rgba(23,38,47,.6)]">
        <div className="h-full rounded-[12px] bg-[#fbfaf7] px-2 pt-3 overflow-hidden">
          <span className="block h-1.5 w-6 rounded bg-[#233845]" />
          <span className="mt-3 block h-1.5 w-full rounded bg-[#17262f]" /><span className="mt-1 block h-1.5 w-3/4 rounded bg-[#17262f]" />
          <span className="mt-2 block aspect-square rounded-[6px] bg-[linear-gradient(150deg,#d5e0e4,#7899a6)]" />
          <span className="mt-2 block h-3 w-full rounded-full bg-[#233845]" />
        </div>
      </div>
    </>
  );
}

function SocialPreview() {
  const tiles = [
    "linear-gradient(150deg,#d5e0e4,#7899a6)", "linear-gradient(150deg,#233845,#3e5a69)", "linear-gradient(150deg,#ebe7e0,#cfc6b8)",
    "linear-gradient(150deg,#b9cdd5,#617783)", "linear-gradient(150deg,#f3f0eb,#d5e0e4)", "linear-gradient(150deg,#617783,#233845)",
  ];
  return (
    <>
      <div className="pv pv-up absolute left-[7%] top-[12%] w-[54%] rounded-[14px] bg-[#fbfaf7] border border-[rgba(35,56,69,.1)] p-2.5 shadow-[0_26px_50px_-30px_rgba(23,38,47,.45)]">
        <div className="flex items-center gap-2 mb-2.5"><span className="size-6 rounded-full bg-[linear-gradient(150deg,#7899a6,#233845)]" /><span><span className="block h-1.5 w-12 rounded bg-[#17262f]" /><span className="mt-1 block h-1 w-8 rounded bg-[rgba(35,56,69,.25)]" /></span></div>
        <div className="grid grid-cols-3 gap-1">
          {tiles.map((t, i) => (
            <span key={i} className="relative aspect-square rounded-[5px] overflow-hidden" style={{ background: t }}>
              {i === 1 && <Play size={12} className="absolute inset-0 m-auto text-[#f3f0eb]" fill="currentColor" aria-hidden />}
              {i === 4 && <span className="absolute inset-x-1.5 top-1/2 -translate-y-1/2 grid gap-0.5"><i className="h-1 rounded bg-[#233845]" /><i className="h-1 w-2/3 rounded bg-[#233845]" /></span>}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[#617783]"><Heart size={10} aria-hidden /><MessageCircle size={10} aria-hidden /><span className="ml-auto h-1 w-10 rounded bg-[rgba(35,56,69,.18)]" /></div>
      </div>
      <div className="pv pv-left absolute right-[6%] top-[26%] w-[42%] rounded-[14px] bg-white/85 backdrop-blur border border-[rgba(35,56,69,.1)] p-3 shadow-[0_26px_50px_-28px_rgba(23,38,47,.5)]">
        <span className="font-mono text-[8px] tracking-[.12em] uppercase text-[#617783]">This week</span>
        <ul className="mt-2 grid gap-1.5 text-[9.5px] text-[#17262f]">
          {[["Mon", "Carousel", "Scheduled"], ["Wed", "Reel", "Scheduled"], ["Fri", "Story", "Draft"]].map(([d, f, st]) => (
            <li key={d} className="flex items-center gap-2 rounded-[8px] bg-[#f3f0eb] px-2 py-1.5">
              <span className="font-mono text-[8px] text-[#617783] w-5">{d}</span><span className="font-[550]">{f}</span>
              <span className={cn("ml-auto rounded-full px-1.5 py-px text-[7.5px]", st === "Draft" ? "border border-[rgba(35,56,69,.2)] text-[#617783]" : "bg-[#233845] text-[#f3f0eb]")}>{st}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function AdsPreview() {
  return (
    <div className="pv pv-up absolute inset-x-[7%] top-[11%] -bottom-4 rounded-[14px] border border-[rgba(213,224,228,.14)] bg-[linear-gradient(180deg,rgba(213,224,228,.1),rgba(213,224,228,.03))] p-3.5 text-[#f3f0eb]">
      <div className="flex items-center gap-1.5">
        <span className="rounded-full bg-[#f3f0eb] text-[#17262f] px-2 py-0.5 text-[8.5px] font-[600]">Meta</span>
        <span className="rounded-full border border-[rgba(213,224,228,.25)] px-2 py-0.5 text-[8.5px] text-[#b2c2c9]">Google</span>
        <span className="ml-auto font-mono text-[7.5px] tracking-[.1em] uppercase text-[#b2c2c9]">Sample data</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {[["Reach", "Prospecting"], ["Clicks", "Retargeting"], ["Leads", "Lead form"]].map(([k, v]) => (
          <span key={k} className="rounded-[8px] bg-[rgba(213,224,228,.07)] border border-[rgba(213,224,228,.1)] px-2 py-1.5">
            <span className="block text-[7.5px] font-mono uppercase tracking-[.08em] text-[#b2c2c9]">{k}</span>
            <span className="mt-1 block h-1.5 w-[70%] rounded bg-[#b9cdd5]" /><span className="mt-1 block text-[7.5px] text-[#b2c2c9] truncate">{v}</span>
          </span>
        ))}
      </div>
      <svg viewBox="0 0 300 80" className="mt-3 w-full h-[70px]" aria-hidden preserveAspectRatio="none">
        <defs><linearGradient id="adfill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7899a6" stopOpacity=".5" /><stop offset="1" stopColor="#7899a6" stopOpacity="0" /></linearGradient></defs>
        {[20, 40, 60].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(213,224,228,.1)" />)}
        <path d="M0 64 C30 60 45 52 70 54 S115 40 140 42 S185 26 210 28 S260 14 300 10 V80 H0Z" fill="url(#adfill)" />
        <path d="M0 64 C30 60 45 52 70 54 S115 40 140 42 S185 26 210 28 S260 14 300 10" fill="none" stroke="#b9cdd5" strokeWidth="2" className="draw" style={{ ["--len" as string]: 340 }} />
      </svg>
      <ul className="mt-2 grid gap-1 text-[8.5px]">
        {["Campaign · Enquiries", "Ad set · Lookalike"].map((r) => (
          <li key={r} className="flex items-center gap-2 border-t border-[rgba(213,224,228,.1)] pt-1.5"><span className="size-1.5 rounded-full bg-[#9fd0b8]" /><span className="text-[#dfe7ea]">{r}</span><span className="ml-auto text-[#b2c2c9]">Active</span></li>
        ))}
      </ul>
    </div>
  );
}

function AutomationPreview() {
  const nodes = [
    { icon: Mail, t: "New enquiry", d: "Website form" },
    { icon: Bot, t: "AI agent", d: "Qualifies & replies" },
    { icon: CalendarCheck, t: "Action", d: "CRM + call booked" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-[6%] gap-4">
      <div className="relative grid grid-cols-3 gap-[8%]">
        <span className="absolute left-[16%] right-[16%] top-[22px] h-px bg-[rgba(35,56,69,.22)]" aria-hidden />
        <span className="traveller absolute left-[16%] top-[19px] size-[7px] rounded-full bg-[#233845] shadow-[0_0_0_4px_rgba(120,153,166,.25)]" style={{ ["--dist" as string]: "calc(100cqw * .6)" }} aria-hidden />
        {nodes.map(({ icon: I, t, d }, i) => (
          <div key={t} className="relative flex flex-col items-center text-center">
            <span className={cn("size-11 rounded-[14px] inline-flex items-center justify-center border shadow-[0_14px_26px_-16px_rgba(23,38,47,.5)]",
              i === 1 ? "bg-[#233845] text-[#f3f0eb] border-transparent pulse" : "bg-[#fbfaf7] text-[#233845] border-[rgba(35,56,69,.12)]")}><I size={18} aria-hidden /></span>
            <span className="mt-2.5 text-[10.5px] font-[600] text-[#17262f]">{t}</span>
            <span className="text-[9px] text-[#50636e]">{d}</span>
          </div>
        ))}
      </div>
      <div className="pv pv-up mx-auto w-full max-w-[330px] rounded-[12px] bg-[#fbfaf7] border border-[rgba(35,56,69,.1)] p-2.5 shadow-[0_20px_40px_-26px_rgba(23,38,47,.45)]">
        <div className="flex items-center gap-2 text-[9px] text-[#617783]"><Sparkles size={10} className="text-[#4a6875]" aria-hidden /><span className="font-mono uppercase tracking-[.1em] text-[7.5px]">Auto-reply sent</span><span className="ml-auto inline-flex items-center gap-1 text-[#4a6875]"><Check size={10} aria-hidden />CRM updated</span></div>
        <p className="mt-1.5 text-[10px] leading-snug text-[#17262f]">Thanks for getting in touch — Thursday at 11:00 works. A calendar invite is on its way.</p>
      </div>
    </div>
  );
}

function DashboardsPreview() {
  const bars = [42, 58, 50, 72, 64, 86, 78];
  return (
    <div className="pv pv-up absolute left-[6%] right-[6%] top-[11%] -bottom-4 rounded-[14px] border border-[rgba(213,224,228,.14)] bg-[rgba(213,224,228,.05)] flex overflow-hidden text-[#f3f0eb]">
      <div className="w-[13%] min-w-[34px] border-r border-[rgba(213,224,228,.1)] py-3 flex flex-col items-center gap-2.5">
        <span className="size-4 rounded-[5px] bg-[#b9cdd5]" />{[0, 1, 2, 3].map((i) => <span key={i} className={cn("h-1.5 w-[50%] rounded", i === 0 ? "bg-[rgba(213,224,228,.6)]" : "bg-[rgba(213,224,228,.18)]")} />)}
      </div>
      <div className="flex-1 p-3 min-w-0">
        <div className="flex items-center"><span className="h-1.5 w-16 rounded bg-[rgba(243,240,235,.8)]" /><span className="ml-auto font-mono text-[7.5px] tracking-[.1em] uppercase text-[#b2c2c9]">Illustrative</span></div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {["Leads", "Bookings", "Open tasks"].map((k, i) => (
            <span key={k} className="rounded-[8px] bg-[rgba(213,224,228,.07)] border border-[rgba(213,224,228,.1)] px-2 py-1.5">
              <span className="block text-[7.5px] font-mono uppercase tracking-[.08em] text-[#b2c2c9] truncate">{k}</span>
              <span className="mt-1.5 flex items-end gap-1"><i className="h-2 rounded bg-[#f3f0eb]" style={{ width: `${44 - i * 8}%` }} /><i className="h-1 w-3 rounded bg-[#9fd0b8]" /></span>
            </span>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-[1.6fr_1fr] gap-2 h-[calc(100%-86px)] min-h-[90px]">
          <div className="rounded-[8px] bg-[rgba(213,224,228,.05)] border border-[rgba(213,224,228,.08)] p-2 flex items-end gap-1.5">
            {bars.map((h, i) => <span key={i} className="bar-grow auto flex-1 rounded-[3px] bg-[linear-gradient(180deg,#b9cdd5,#7899a6)]" style={{ height: `${h}%`, ["--i" as string]: i }} />)}
          </div>
          <div className="rounded-[8px] bg-[rgba(213,224,228,.05)] border border-[rgba(213,224,228,.08)] p-2 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-[72%] max-w-[78px] -rotate-90" aria-hidden>
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(213,224,228,.14)" strokeWidth="5" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#b9cdd5" strokeWidth="5" strokeDasharray="56 88" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#7899a6" strokeWidth="5" strokeDasharray="18 88" strokeDashoffset="-60" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const previews: Record<ServiceId, () => React.ReactNode> = { websites: WebsitesPreview, social: SocialPreview, ads: AdsPreview, automation: AutomationPreview, dashboards: DashboardsPreview };

/** A service's illustrative stage. `scale` enlarges the whole composition (service-page heroes). */
export function ServiceStage({ id, scale = 1, className }: { id: ServiceId; scale?: number; className?: string }) {
  const P = previews[id];
  return (
    <div className={cn("bento-stage [container-type:inline-size]", stageTone[id], className)} aria-hidden>
      <div className="absolute left-0 top-0 [container-type:inline-size]" style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        <P />
      </div>
    </div>
  );
}

/** Home services — structured bento: 3 equal cards, then 2 equal wider cards. */
export function ServicesBento() {
  return (
    <ul className="bento">
      {services.map((s, i) => (
        <Reveal as="li" key={s.id} index={i} className="h-full">
          <Link href={`/services/${s.slug}/`} data-cursor="View" className="card card-hover bento-card group">
            <ServiceStage id={s.id} />
            <div className="bento-body">
              <span className="num">0{i + 1}</span>
              <h3 className="mt-3 !text-[clamp(1.25rem,1.1rem+0.5vw,1.55rem)] !leading-[1.15]">{home.services.cards[i]?.title ?? s.name}</h3>
              <p className="mt-2.5 text-text-2 text-[0.95rem] leading-relaxed">{home.services.cards[i]?.description ?? s.short}</p>
              <span className="bento-cta">Explore service <span className="arrow-pill" aria-hidden><ArrowUpRight size={15} /></span></span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/** Services hub — alternating feature rows: illustrative stage + plain-language summary and capabilities. */
export function ServiceFeatureList() {
  return (
    <ol className="grid gap-5">
      {services.map((s, i) => (
        <Reveal as="li" key={s.id}>
          <article className="card p-2.5 grid lg:grid-cols-12 gap-2 items-stretch">
            <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}><ServiceStage id={s.id} scale={1.18} className="!h-[260px] sm:!h-[300px] lg:!h-full lg:min-h-[340px]" /></div>
            <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 flex flex-col">
              <span className="num">0{i + 1} / 05</span>
              <h2 className="mt-4 !text-[clamp(1.6rem,1.3rem+1.1vw,2.3rem)] !leading-[1.1]">{s.name}</h2>
              <p className="mt-4 text-text-2 text-[1.02rem] leading-relaxed max-w-[52ch]">{s.definition}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[0.93rem]">
                {s.capabilities.slice(0, 6).map((c) => <li key={c} className="flex gap-2.5"><Check size={15} className="mt-[3px] shrink-0 text-accent" aria-hidden />{c}</li>)}
              </ul>
              <div className="mt-auto pt-8 flex flex-wrap gap-3">
                <Link href={`/services/${s.slug}/`} className="btn btn-primary">Explore service <ArrowUpRight size={16} className="btn-arrow" aria-hidden /></Link>
                <Link href={`/contact/?services=${s.id}`} className="btn btn-glass">{s.cta}</Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}
