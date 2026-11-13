// Packages, add-ons and per-service process.
// Rules: no prices are invented — every tier carries a [PRICE] placeholder until Mohammad confirms real figures.
// Turnarounds are ranges we can stand behind, never promises of results. Location-neutral throughout.
import type { ServiceId } from "./site";

export type Tier = {
  id: "starter" | "growth" | "scale";
  name: string;
  forWho: string;
  /** null = not yet confirmed → renders a visible [PRICE] slot. Never invent a number here. */
  price: string | null;
  billing: "once" | "monthly" | "both";
  turnaround: string;
  includes: string[];
  highlight?: boolean;
};

export type AddOn = { id: string; name: string; desc: string };

export type ServicePackages = {
  /** Does a monthly/one-time toggle make sense for this service? */
  toggle: boolean;
  toggleNote?: string;
  tiers: Tier[];
  addOns: AddOn[];
  /** Comparison rows: feature → which tiers include it (true) or a value string. */
  compare: { feature: string; starter: boolean | string; growth: boolean | string; scale: boolean | string }[];
  process: { n: string; name: string; text: string }[];
};

export const packagesByService: Record<ServiceId, ServicePackages> = {
  websites: {
    toggle: false,
    toggleNote: "Websites are a one-time build. Care plans are an add-on below.",
    tiers: [
      {
        id: "starter", name: "Landing page", forWho: "One page with one job — a campaign, a launch, a single offer.",
        price: null, billing: "once", turnaround: "2–3 weeks",
        includes: ["One designed page", "Mobile-first responsive build", "Enquiry form to your inbox", "Basic SEO: titles, meta, sitemap", "One round of revisions"],
      },
      {
        id: "growth", name: "Business website", forWho: "Most businesses: a complete site that explains what you do and brings in enquiries.", highlight: true,
        price: null, billing: "once", turnaround: "4–6 weeks",
        includes: ["Up to 8 designed pages", "Content structure and copy guidance", "Enquiry forms connected to inbox or CRM", "SEO foundations and structured data", "Analytics setup", "Two rounds of revisions", "Handover notes and training"],
      },
      {
        id: "scale", name: "Custom build", forWho: "Sites that need to do something specific — integrations, portals, many pages or languages.",
        price: null, billing: "once", turnaround: "From 8 weeks",
        includes: ["Everything in Business website", "Custom functionality and integrations", "Booking, CRM or payment connections", "Multi-language or multi-location structure", "Performance and accessibility pass", "Staged launch plan"],
      },
    ],
    addOns: [
      { id: "care", name: "Care plan", desc: "Updates, backups, monitoring and small changes each month." },
      { id: "copy", name: "Copywriting", desc: "We write the words, not just the structure." },
      { id: "seo", name: "SEO deep-dive", desc: "Keyword research, page-by-page optimisation and tracking." },
      { id: "speed", name: "Speed & accessibility audit", desc: "A measured pass with fixes, on an existing site." },
      { id: "migrate", name: "Content migration", desc: "Moving posts, products or pages from your current site." },
    ],
    compare: [
      { feature: "Designed pages", starter: "1", growth: "Up to 8", scale: "Unlimited" },
      { feature: "Mobile responsive", starter: true, growth: true, scale: true },
      { feature: "Enquiry form", starter: true, growth: true, scale: true },
      { feature: "CRM connection", starter: false, growth: true, scale: true },
      { feature: "SEO foundations", starter: "Basic", growth: true, scale: true },
      { feature: "Analytics setup", starter: false, growth: true, scale: true },
      { feature: "Custom functionality", starter: false, growth: false, scale: true },
      { feature: "Revision rounds", starter: "1", growth: "2", scale: "Agreed in scope" },
    ],
    process: [
      { n: "01", name: "Structure", text: "We agree what pages exist and what each one has to do before anything is designed." },
      { n: "02", name: "Design", text: "Key pages designed first, reviewed with you, then the rest follow the same system." },
      { n: "03", name: "Build", text: "Coded responsive, fast and accessible — not assembled from a template." },
      { n: "04", name: "Launch", text: "Tested on real devices, forms verified, analytics live, handed over with notes." },
    ],
  },

  social: {
    toggle: false,
    toggleNote: "Social media management runs monthly. Minimum three months, because consistency is the point.",
    tiers: [
      {
        id: "starter", name: "Presence", forWho: "Businesses that need to look active and credible without a full content operation.",
        price: null, billing: "monthly", turnaround: "Live in 1–2 weeks",
        includes: ["Up to 8 posts a month", "One platform", "Captions and hashtag sets", "Monthly content calendar for approval", "Basic monthly report"],
      },
      {
        id: "growth", name: "Growth", forWho: "Businesses using social to actually bring in enquiries, not just to exist.", highlight: true,
        price: null, billing: "monthly", turnaround: "Live in 1–2 weeks",
        includes: ["Up to 16 posts a month", "Two platforms", "4 reels or short videos a month", "Stories and engagement replies", "Content calendar and approval flow", "Monthly report with what to repeat"],
      },
      {
        id: "scale", name: "Full account", forWho: "Brands that post often, across several platforms, with a real content pipeline.",
        price: null, billing: "monthly", turnaround: "Live in 2–3 weeks",
        includes: ["Daily posting schedule", "Three or more platforms", "8+ reels or short videos a month", "Community management", "Content shoots coordinated", "Strategy review each quarter"],
      },
    ],
    addOns: [
      { id: "reels", name: "Extra reels", desc: "More short-form video on top of your plan." },
      { id: "shoot", name: "Content shoot", desc: "Coordinated photo or video session for a batch of content." },
      { id: "ads", name: "Paid promotion", desc: "Turn the posts that work into advertising." },
      { id: "community", name: "Community management", desc: "Comments and DMs answered daily." },
      { id: "audit", name: "Account audit", desc: "A review of your current accounts with fixes, before any plan starts." },
    ],
    compare: [
      { feature: "Posts per month", starter: "Up to 8", growth: "Up to 16", scale: "Daily" },
      { feature: "Platforms", starter: "1", growth: "2", scale: "3+" },
      { feature: "Reels / short video", starter: false, growth: "4 / month", scale: "8+ / month" },
      { feature: "Stories", starter: false, growth: true, scale: true },
      { feature: "Community management", starter: false, growth: "Replies", scale: "Daily" },
      { feature: "Content calendar", starter: true, growth: true, scale: true },
      { feature: "Monthly report", starter: "Basic", growth: true, scale: true },
      { feature: "Strategy review", starter: false, growth: false, scale: "Quarterly" },
    ],
    process: [
      { n: "01", name: "Audit & plan", text: "We look at what you have, who you're talking to, and agree the pillars we'll post around." },
      { n: "02", name: "Calendar", text: "A month is planned and sent for approval before anything goes out." },
      { n: "03", name: "Produce & post", text: "We make the content, schedule it and keep the account consistent." },
      { n: "04", name: "Review", text: "Each month: what performed, what we repeat, what we drop." },
    ],
  },

  ads: {
    toggle: false,
    toggleNote: "Management is monthly and separate from ad spend, which you pay Meta or Google directly.",
    tiers: [
      {
        id: "starter", name: "One platform", forWho: "A first campaign done properly — Meta or Google, one clear objective.",
        price: null, billing: "monthly", turnaround: "Live in 1–2 weeks",
        includes: ["One platform: Meta or Google", "Account and tracking setup", "Up to 2 campaigns", "Ad creative from your assets", "Monthly performance report"],
      },
      {
        id: "growth", name: "Both platforms", forWho: "Businesses that need steady lead flow and want to be where the demand is.", highlight: true,
        price: null, billing: "monthly", turnaround: "Live in 2 weeks",
        includes: ["Meta and Google", "Conversion tracking and audiences", "Up to 5 campaigns", "New ad creative each month", "A/B testing of copy and creative", "Monthly report and review call"],
      },
      {
        id: "scale", name: "Managed growth", forWho: "Accounts with real budget behind them, where small improvements matter.",
        price: null, billing: "monthly", turnaround: "Live in 2–3 weeks",
        includes: ["Everything in Both platforms", "Retargeting and lookalike audiences", "Landing page recommendations", "Weekly optimisation", "Creative testing programme", "Dashboard with live performance"],
      },
    ],
    addOns: [
      { id: "creative", name: "Creative production", desc: "Ad images and video made for the campaign, not repurposed." },
      { id: "landing", name: "Landing page", desc: "A page built to convert the traffic you're paying for." },
      { id: "tracking", name: "Tracking setup", desc: "Pixel, conversions API and event tracking, verified." },
      { id: "followup", name: "Lead follow-up automation", desc: "Every lead answered and qualified automatically." },
      { id: "audit", name: "Ad account audit", desc: "A review of an existing account with a fix list, before management starts." },
    ],
    compare: [
      { feature: "Platforms", starter: "Meta or Google", growth: "Both", scale: "Both" },
      { feature: "Campaigns", starter: "Up to 2", growth: "Up to 5", scale: "As needed" },
      { feature: "Conversion tracking", starter: "Basic", growth: true, scale: true },
      { feature: "New creative monthly", starter: false, growth: true, scale: true },
      { feature: "A/B testing", starter: false, growth: true, scale: "Programme" },
      { feature: "Retargeting", starter: false, growth: false, scale: true },
      { feature: "Optimisation", starter: "Monthly", growth: "Fortnightly", scale: "Weekly" },
      { feature: "Live dashboard", starter: false, growth: false, scale: true },
    ],
    process: [
      { n: "01", name: "Set up", text: "Accounts, tracking and audiences configured so results can be measured from day one." },
      { n: "02", name: "Launch", text: "Campaigns structured properly — one objective each, creative written for the platform." },
      { n: "03", name: "Optimise", text: "Budget moves to what works. Losing ads are cut, winning angles are expanded." },
      { n: "04", name: "Report", text: "What was spent, what came back, and what we're changing next month." },
    ],
  },

  automation: {
    toggle: true,
    toggleNote: "Most AI work is a one-time build plus an optional monthly plan for hosting, monitoring and changes.",
    tiers: [
      {
        id: "starter", name: "Single agent", forWho: "One job done well — answering questions, booking, or qualifying leads.",
        price: null, billing: "both", turnaround: "2–3 weeks",
        includes: ["One AI agent for one channel", "Trained on your information", "Handover to a human when needed", "Website or WhatsApp deployment", "One month of adjustments"],
      },
      {
        id: "growth", name: "Agent + workflow", forWho: "Businesses where the conversation has to trigger something afterwards.", highlight: true,
        price: null, billing: "both", turnaround: "4–6 weeks",
        includes: ["AI agent across two channels", "Connected workflow automation", "CRM, calendar and email integration", "Lead qualification and routing", "Alerts when something fails", "Monthly adjustments included"],
      },
      {
        id: "scale", name: "Operations system", forWho: "Replacing several manual processes, not just one.",
        price: null, billing: "both", turnaround: "From 8 weeks",
        includes: ["Multiple agents and workflows", "Deep integration with your systems", "Internal tools and approvals", "Monitoring dashboard", "Documentation and team training", "Ongoing development retainer"],
      },
    ],
    addOns: [
      { id: "voice", name: "Voice agent", desc: "An agent that answers and makes calls, not just messages." },
      { id: "channels", name: "Extra channel", desc: "Add WhatsApp, Instagram, Messenger or email to an existing agent." },
      { id: "knowledge", name: "Knowledge base build", desc: "We turn your documents and answers into something the agent can use." },
      { id: "monitor", name: "Monitoring plan", desc: "We watch it, fix failures and report monthly." },
      { id: "training", name: "Team training", desc: "A session so your team can handle handovers and edits." },
    ],
    compare: [
      { feature: "AI agents", starter: "1", growth: "1 (2 channels)", scale: "Multiple" },
      { feature: "Channels", starter: "1", growth: "2", scale: "As needed" },
      { feature: "Workflow automation", starter: false, growth: true, scale: true },
      { feature: "CRM integration", starter: false, growth: true, scale: true },
      { feature: "Human handover", starter: true, growth: true, scale: true },
      { feature: "Failure alerts", starter: false, growth: true, scale: true },
      { feature: "Monitoring dashboard", starter: false, growth: false, scale: true },
      { feature: "Ongoing changes", starter: "1 month", growth: "Monthly", scale: "Retainer" },
    ],
    process: [
      { n: "01", name: "Map", text: "We watch how the work happens now, and find where the time actually goes." },
      { n: "02", name: "Design", text: "We write what the agent should say and do — and where it must stop and fetch a human." },
      { n: "03", name: "Build & test", text: "Built, connected to your tools, then tested against real cases before it meets a customer." },
      { n: "04", name: "Watch", text: "Live with alerts. We review the conversations and tighten the weak answers." },
    ],
  },

  dashboards: {
    toggle: true,
    toggleNote: "A dashboard is a one-time build. Hosting and changes can run monthly.",
    tiers: [
      {
        id: "starter", name: "Single dashboard", forWho: "One screen that answers the questions you keep asking.",
        price: null, billing: "both", turnaround: "2–4 weeks",
        includes: ["One dashboard, up to 3 data sources", "Core KPIs agreed with you", "Charts, filters and date ranges", "Access for your team", "Handover walkthrough"],
      },
      {
        id: "growth", name: "Business dashboard", forWho: "Several areas of the business in one place, updated automatically.", highlight: true,
        price: null, billing: "both", turnaround: "4–8 weeks",
        includes: ["Multiple views: sales, marketing, operations", "Up to 8 data sources connected", "Automated data refresh", "Scheduled reports by email", "User roles and permissions", "Two rounds of revisions"],
      },
      {
        id: "scale", name: "Management system", forWho: "When you need to act inside the system, not just look at it.",
        price: null, billing: "both", turnaround: "From 10 weeks",
        includes: ["Everything in Business dashboard", "Data entry and record management", "Workflows and approvals", "Client or team portals", "Custom alerts and thresholds", "Documentation and training"],
      },
    ],
    addOns: [
      { id: "sources", name: "Extra data source", desc: "Connect another tool, platform or spreadsheet." },
      { id: "portal", name: "Client portal", desc: "A view your own clients can log into." },
      { id: "alerts", name: "Alerts", desc: "Email or WhatsApp when a number crosses a line you set." },
      { id: "hosting", name: "Hosting & maintenance", desc: "We keep it running, updated and backed up." },
      { id: "cleanup", name: "Data clean-up", desc: "Fixing the messy data before it reaches the dashboard." },
    ],
    compare: [
      { feature: "Dashboards / views", starter: "1", growth: "Multiple", scale: "Multiple" },
      { feature: "Data sources", starter: "Up to 3", growth: "Up to 8", scale: "As needed" },
      { feature: "Automated refresh", starter: "Daily", growth: true, scale: true },
      { feature: "Scheduled reports", starter: false, growth: true, scale: true },
      { feature: "User roles", starter: false, growth: true, scale: true },
      { feature: "Data entry & records", starter: false, growth: false, scale: true },
      { feature: "Workflows & approvals", starter: false, growth: false, scale: true },
      { feature: "Client portal", starter: false, growth: false, scale: true },
    ],
    process: [
      { n: "01", name: "Decide the questions", text: "We agree the handful of questions the dashboard must answer. Everything else is noise." },
      { n: "02", name: "Connect", text: "Your tools and spreadsheets are connected and the data is cleaned up." },
      { n: "03", name: "Build", text: "The views are built around the decisions you make, not around what's easy to chart." },
      { n: "04", name: "Hand over", text: "Your team is walked through it, with access set and documentation written." },
    ],
  },
};

/** Shown wherever a tier is listed. */
export const pricingNote =
  "Every project is quoted after a short discovery conversation — scope differs too much for a fixed price list.";
