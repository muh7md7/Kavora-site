import Link from "next/link";
import {
  ArrowUpRight, BarChart3, Bell, Bot, CalendarCheck, Camera, ClipboardList, Code2, Database, FileText,
  Gauge, Image as ImageIcon, LayoutGrid, LineChart, MessageSquare, Megaphone, MousePointerClick,
  Search, Share2, Sparkles, Table2, Target, Users, Workflow, Zap,
} from "lucide-react";
import type { Service } from "@/content/site";
import { aiOffer } from "@/content/site";
import { Packages } from "./Packages";
import { AddOns } from "./AddOns";
import { Deliverables } from "./Deliverables";
import { ServiceProcess } from "./ServiceProcess";
import { ServiceFaq } from "./ServiceFaq";
import { RelatedCarousel } from "./RelatedCarousel";
import { WebsitesHero, SocialHero, AdsHero, AutomationHero, DashboardsHero } from "./heroes";
import { WebsiteDemoSection } from "@/components/demos/WebsiteDemo";
import { SocialDemoSection } from "@/components/demos/SocialDemo";
import { AdsDemoSection } from "@/components/demos/AdsDemo";
import { AiDemoSection } from "@/components/demos/AiDemo";
import { DashboardDemoSection } from "@/components/demos/DashboardDemo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui";
import { Tone } from "@/components/sections/Tone";
import { contactHref } from "@/content/enquiry";
import { cn } from "@/lib/cn";

/* ---------- small shared blocks (allowed: packages, FAQ, CTA, breadcrumb) ---------- */

function Bars({ w }: { w: number[] }) {
  return <span className="flex items-end gap-1 h-10 w-full" aria-hidden>{w.map((h, i) => <i key={i} className="flex-1 rounded-t-[2px] bg-[var(--steel-blue)]" style={{ height: `${h}%` }} />)}</span>;
}
function Lines({ n = 3, widths = [100, 80, 60] }: { n?: number; widths?: number[] }) {
  return <span className="grid gap-1.5 w-full" aria-hidden>{Array.from({ length: n }).map((_, i) => <i key={i} className="h-1.5 rounded bg-line-strong block" style={{ width: `${widths[i % widths.length]}%` }} />)}</span>;
}
function Pills({ items }: { items: string[] }) {
  return <span className="flex flex-wrap gap-1.5" aria-hidden>{items.map((x) => <i key={x} className="not-italic text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-line text-text-2">{x}</i>)}</span>;
}

/** Closing CTA — same shape on every service page, wording per service. */
function CloseCta({ s, line, tone = "dark" }: { s: Service; line: string; tone?: "light" | "dark" }) {
  return (
    <Tone tone={tone} grad className={cn("section-major", tone === "dark" && "grain")}>
      <div className="container text-center">
        <SplitHeading as="h2" text="Tell us what you" accent="need." className="mx-auto max-w-[16ch]" />
        <p className="lead mt-6 mx-auto">{line}</p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Button href={contactHref({ services: [s.id] })} size="lg">{s.cta}</Button>
          <Button href="/services/" variant="secondary" arrow="right">All five services</Button>
        </div>
      </div>
    </Tone>
  );
}

/** Who it's for + what's included, as a two-column editorial block (used with different framing per page). */
function ForWho({ s, tone = "light", alt = false }: { s: Service; tone?: "light" | "dark"; alt?: boolean }) {
  return (
    <Tone tone={tone} className={cn("section-major", alt && "!bg-bg-2", tone === "dark" && "grain")}>
      <div className="container grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">Who it&rsquo;s for</p>
          <h2 className="mt-5 !text-[clamp(28px,3.4vw,46px)]">{s.forWho}</h2>
          <p className="mt-6 text-text-2">Available on its own — no other service required.</p>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-10">
          <div>
            <p className="eyebrow">What we do</p>
            <ul className="mt-5 grid">{s.capabilities.map((c) => <li key={c} className="py-3 border-b border-line text-[0.95rem]">{c}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">Typical situations</p>
            <ul className="mt-5 grid">{s.useCases.map((c) => <li key={c} className="py-3 border-b border-line text-[0.95rem]">{c}</li>)}</ul>
          </div>
        </div>
      </div>
    </Tone>
  );
}

/* ================= 01 · WEBSITES =================
   Order: hero → benefits strip → deliverables → DEMO → who it's for → process → packages → add-ons → related → FAQ → CTA */
export function WebsitesPage({ s, idx }: { s: Service; idx: number }) {
  return (
    <>
      <WebsitesHero s={s} idx={idx} />

      <Tone className="section-strip border-b border-line">
        <div className="container grid sm:grid-cols-3 gap-x-8 gap-y-6">
          {s.benefits.map((b, i) => (
            <Reveal as="p" key={b} index={i} className="flex gap-3 items-start text-[1.02rem] font-[500] leading-snug">
              <span className="num pt-1.5 shrink-0">0{i + 1}</span>{b}
            </Reveal>
          ))}
        </div>
      </Tone>

      <Deliverables
        title="Not a template." accent="A build." lead="Everything below is part of the project, not an upsell discovered later."
        items={[
          { icon: LayoutGrid, name: "Designed pages", desc: "Each page laid out around what it has to achieve.", visual: <Lines n={4} widths={[100, 72, 88, 54]} /> },
          { icon: Code2, name: "A fast, responsive build", desc: "Coded for speed and tested on real devices.", visual: <Pills items={["Desktop", "Tablet", "Phone"]} /> },
          { icon: MessageSquare, name: "Enquiry forms that arrive", desc: "Connected to your inbox or CRM and verified before launch.", visual: <Pills items={["Inbox", "CRM", "WhatsApp"]} /> },
          { icon: Search, name: "SEO foundations", desc: "Titles, metadata, sitemap and structured data from the start.", visual: <Lines n={2} widths={[62, 88]} /> },
          { icon: Gauge, name: "Performance pass", desc: "Measured against a browser audit, not guessed at.", visual: <Bars w={[30, 48, 62, 80, 96]} /> },
          { icon: FileText, name: "Handover notes", desc: "How to edit it, who hosts it, what to do next.", visual: <Lines n={3} widths={[90, 70, 40]} /> },
        ]}
      />

      <WebsiteDemoSection />
      <ForWho s={s} />
      <ServiceProcess id={s.id} tone="dark" layout="rail" />
      <Packages id={s.id} />
      <AddOns id={s.id} tone="light" />
      <RelatedCarousel id={s.id} tone="light" />
      <ServiceFaq id={s.id} faq={s.faq} cta={s.cta} tone="light" />
      <CloseCta s={s} line="Send us the pages you think you need. We'll tell you which ones actually matter." />
    </>
  );
}

/* ================= 02 · SOCIAL =================
   Order: hero → DEMO (straight away) → who it's for → deliverables → packages → process → add-ons → FAQ → related → CTA */
export function SocialPage({ s, idx }: { s: Service; idx: number }) {
  return (
    <>
      <SocialHero s={s} idx={idx} />
      <SocialDemoSection />

      <Tone className="section-strip !bg-bg-2 border-y border-line">
        <div className="container grid sm:grid-cols-3 gap-x-8 gap-y-6">
          {s.benefits.map((b, i) => (
            <Reveal as="p" key={b} index={i} className="flex gap-3 items-start text-[1.02rem] font-[500] leading-snug">
              <span className="num pt-1.5 shrink-0">0{i + 1}</span>{b}
            </Reveal>
          ))}
        </div>
      </Tone>

      <ForWho s={s} />

      <Deliverables
        tone="dark" cols={2} eyebrow="Every month you get"
        title="A plan, then the" accent="posts."
        lead="Approved in advance, produced by us, posted on schedule. You see the month before it goes live."
        items={[
          { icon: CalendarCheck, name: "A content calendar", desc: "Next month planned and sent for your approval.", visual: <Pills items={["Mon", "Wed", "Fri", "Sun"]} /> },
          { icon: ImageIcon, name: "Designed posts", desc: "On-brand graphics and photo treatments, not stock filler.", visual: <Lines n={2} widths={[80, 55]} /> },
          { icon: Camera, name: "Reels and short video", desc: "Vertical video edited for how people actually watch.", visual: <Pills items={["Hook", "Cut", "Caption"]} /> },
          { icon: FileText, name: "Captions and hashtags", desc: "Written per post, three to five relevant tags.", visual: <Lines n={3} widths={[95, 75, 45]} /> },
          { icon: Users, name: "Replies and community", desc: "Comments and DMs answered in your voice.", visual: <Pills items={["Comments", "DMs"]} /> },
          { icon: LineChart, name: "A monthly report", desc: "Reach, saves and taps — and what we repeat because of them.", visual: <Bars w={[42, 58, 50, 74, 66, 92]} /> },
        ]}
      />

      <Packages id={s.id} />
      <ServiceProcess id={s.id} tone="light" />
      <AddOns id={s.id} />
      <ServiceFaq id={s.id} faq={s.faq} cta={s.cta} tone="dark" />
      <RelatedCarousel id={s.id} />
      <CloseCta s={s} line="Tell us which platforms matter and how often you want to post. We'll send a first month to react to." tone="light" />
    </>
  );
}

/* ================= 03 · ADS =================
   Order: hero (with metric strip) → what we run → process → DEMO → packages → add-ons → who it's for → related → FAQ → CTA */
export function AdsPage({ s, idx }: { s: Service; idx: number }) {
  return (
    <>
      <AdsHero s={s} idx={idx} />

      <Deliverables
        eyebrow="What running ads actually involves"
        title="Set up properly, then" accent="improved." cols={3}
        lead="Most underperforming accounts are not a budget problem. They are a structure, tracking and creative problem."
        items={[
          { icon: Target, name: "Account & tracking setup", desc: "Pixel, conversions and audiences configured so results are measurable.", visual: <Pills items={["Pixel", "CAPI", "Events"]} /> },
          { icon: Megaphone, name: "Campaign structure", desc: "One objective per campaign, audiences separated so you can read the data.", visual: <Lines n={3} widths={[100, 76, 52]} /> },
          { icon: ImageIcon, name: "Creative per placement", desc: "Feed, story and search get their own treatment — not one image resized.", visual: <Pills items={["Feed", "Story", "Search"]} /> },
          { icon: MousePointerClick, name: "Landing recommendations", desc: "Where the traffic lands decides whether the spend works.", visual: <Lines n={2} widths={[88, 60]} /> },
          { icon: Zap, name: "Ongoing optimisation", desc: "Budget moves to what converts. Losing ads get cut.", visual: <Bars w={[58, 44, 70, 62, 88, 96]} /> },
          { icon: BarChart3, name: "Plain reporting", desc: "What was spent, what came back, what changes next month.", visual: <Lines n={3} widths={[70, 94, 48]} /> },
        ]}
      />

      <ServiceProcess id={s.id} tone="dark" />
      <AdsDemoSection />
      <Packages id={s.id} tone="dark" />
      <AddOns id={s.id} />
      <ForWho s={s} alt />
      <RelatedCarousel id={s.id} />
      <ServiceFaq id={s.id} faq={s.faq} cta={s.cta} tone="light" />
      <CloseCta s={s} line="Send us your current account or your target cost per lead. We'll say honestly whether ads are the right move." />
    </>
  );
}

/* ================= 04 · AUTOMATION =================
   Order: hero (chat) → DEMO → three ways to buy → examples → process → packages → add-ons → FAQ → related → CTA */
export function AutomationPage({ s, idx }: { s: Service; idx: number }) {
  return (
    <>
      <AutomationHero s={s} idx={idx} />
      <AiDemoSection />

      {/* three ways to buy — unique to this page */}
      <Tone className="section-major">
        <div className="container">
          <div className="max-w-[46rem]">
            <p className="eyebrow">Three ways to do this</p>
            <h2 className="mt-5">Ready-made, custom, or pure <span className="accent">automation.</span></h2>
            <p className="lead mt-6">Which one you need depends on how specific your process is. We&rsquo;ll tell you honestly which fits.</p>
          </div>
          <div className="mt-14 grid lg:grid-cols-3 gap-4 md:gap-5">
            {aiOffer.paths.map((p, i) => (
              <Reveal key={p.id} index={i}>
                <div data-spot className={cn("card h-full p-6 md:p-7 flex flex-col", i === 1 && "lg:-mt-4")} data-theme={i === 1 ? "dark" : undefined}>
                  <span className="num">0{i + 1}</span>
                  <h3 className="mt-4">{p.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] text-text-2 leading-snug">{p.lead}</p>
                  <ul className="mt-6 grid gap-2.5 flex-1">
                    {p.points.map((x) => <li key={x} className="flex gap-2.5 text-[0.9rem] leading-snug"><Sparkles size={14} className="mt-0.5 shrink-0 text-text-2" aria-hidden />{x}</li>)}
                  </ul>
                  <Button href={p.cta.href} variant={i === 1 ? "primary" : "secondary"} arrow="right" className="mt-7 w-full">{p.cta.label}</Button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <Link href="/ai-solutions/" data-spot className="card group flex flex-wrap items-center justify-between gap-6 p-7 md:p-8">
              <span className="min-w-0">
                <span className="eyebrow">AI Solutions</span>
                <span className="block mt-3 text-[clamp(1.2rem,1.1rem+0.8vw,1.7rem)] font-[560] tracking-[-0.03em]">See the eight use cases we build most often.</span>
              </span>
              <span className="b b-primary shrink-0">Explore AI Solutions<ArrowUpRight size={16} className="b-arrow" aria-hidden /></span>
            </Link>
          </Reveal>
        </div>
      </Tone>

      <Deliverables
        tone="dark" cols={2} eyebrow="What gets built"
        title="An agent, and the work" accent="behind it."
        items={[
          { icon: Bot, name: "The agent", desc: "Trained on your information, with rules for what it must never guess.", visual: <Pills items={["Website", "WhatsApp", "Instagram"]} /> },
          { icon: Workflow, name: "The workflow", desc: "What happens after the conversation — records, routing, notifications.", visual: <Lines n={3} widths={[100, 70, 44]} /> },
          { icon: Database, name: "Integrations", desc: "Connected to the CRM, calendar and inbox you already use.", visual: <Pills items={["CRM", "Calendar", "Email"]} /> },
          { icon: Users, name: "Human handover", desc: "A clear line where it stops and a person takes over.", visual: <Lines n={2} widths={[76, 52]} /> },
          { icon: Bell, name: "Failure alerts", desc: "You find out when something breaks — not the customer.", visual: <Pills items={["Email", "WhatsApp"]} /> },
          { icon: ClipboardList, name: "Documentation", desc: "How it works, how to change it, what it is allowed to do.", visual: <Lines n={3} widths={[92, 66, 38]} /> },
        ]}
      />

      <ServiceProcess id={s.id} layout="rail" />
      <Packages id={s.id} />
      <AddOns id={s.id} tone="dark" />
      <ServiceFaq id={s.id} faq={s.faq} cta={s.cta} />
      <RelatedCarousel id={s.id} tone="light" />
      <CloseCta s={s} line="Describe the task that eats your week. We'll tell you whether it can be automated — and whether it should be." />
    </>
  );
}

/* ================= 05 · DASHBOARDS =================
   Order: hero (full-bleed) → who it's for → deliverables → process → DEMO → packages → add-ons → related → FAQ → CTA */
export function DashboardsPage({ s, idx }: { s: Service; idx: number }) {
  return (
    <>
      <DashboardsHero s={s} idx={idx} />

      <Tone className="section-strip border-y border-line">
        <div className="container grid sm:grid-cols-3 gap-x-8 gap-y-6">
          {s.benefits.map((b, i) => (
            <Reveal as="p" key={b} index={i} className="flex gap-3 items-start text-[1.02rem] font-[500] leading-snug">
              <span className="num pt-1.5 shrink-0">0{i + 1}</span>{b}
            </Reveal>
          ))}
        </div>
      </Tone>

      <ForWho s={s} tone="dark" />

      <Deliverables
        eyebrow="What you end up with" cols={3}
        title="One place to" accent="look."
        lead="Built around the handful of decisions you actually make — not around every chart the tools can produce."
        items={[
          { icon: LayoutGrid, name: "The views you need", desc: "Sales, marketing or operations — whichever questions you keep asking.", visual: <Lines n={3} widths={[100, 64, 82]} /> },
          { icon: Database, name: "Connected sources", desc: "Your tools and spreadsheets, pulled in and kept in sync.", visual: <Pills items={["Ads", "CRM", "Sheets"]} /> },
          { icon: LineChart, name: "Charts that answer something", desc: "Trends and comparisons, with the filters you'll really use.", visual: <Bars w={[36, 52, 46, 70, 64, 88]} /> },
          { icon: Table2, name: "Tables you can work in", desc: "Sortable, filterable, exportable records — not a static image.", visual: <Lines n={4} widths={[100, 100, 100, 70]} /> },
          { icon: Bell, name: "Alerts on thresholds", desc: "Told when a number crosses a line you set.", visual: <Pills items={["Email", "WhatsApp"]} /> },
          { icon: Share2, name: "Access for your team", desc: "Roles and permissions, so people see what they should.", visual: <Pills items={["Owner", "Team", "Client"]} /> },
        ]}
      />

      <ServiceProcess id={s.id} tone="dark" layout="rail" />
      <DashboardDemoSection />
      <Packages id={s.id} />
      <AddOns id={s.id} tone="dark" />
      <RelatedCarousel id={s.id} tone="light" />
      <ServiceFaq id={s.id} faq={s.faq} cta={s.cta} tone="light" />
      <CloseCta s={s} line="Tell us the three questions you keep asking about your business. That's the dashboard." />
    </>
  );
}

export const servicePages = {
  websites: WebsitesPage,
  social: SocialPage,
  ads: AdsPage,
  automation: AutomationPage,
  dashboards: DashboardsPage,
} as const;
