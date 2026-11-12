// Business inputs. Anything in [TO CONFIRM] is missing — never invented.
export const site = {
  brand: "Keelbiz",
  domain: "[TO CONFIRM]", // not purchased yet
  url: "https://keelbiz.example", // replace with real domain before launch
  type: "Global digital growth & business technology agency",
  positioning:
    "We build your online presence, grow your business, and automate the work behind it.",
  market:
    "Startups, founders, SMEs and established brands worldwide — with a strong presence in the UAE / GCC and Pakistan.",
  contact: {
    email: "[TO CONFIRM]",
    phone: "[TO CONFIRM]",
    whatsapp: "[TO CONFIRM]", // E.164, e.g. +9715xxxxxxx
  },
  socials: {
    instagram: "[TO CONFIRM]",
    linkedin: "[TO CONFIRM]",
    facebook: "[TO CONFIRM]",
  },
  features: {
    aiPlansPage: false, // optional module, off until offer + terms confirmed
    bookingEmbed: false,
    analytics: false, // cookieless (Plausible/Umami) — see ANALYTICS.md
  },
  enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "", // "" => unavailable state
} as const;

export const isConfirmed = (v: string) => !v.startsWith("[TO CONFIRM");

export const nav: readonly { label: string; href: string; mega?: "services" | "lab" }[] = [
  { label: "Services", href: "/services/", mega: "services" },
  { label: "Work", href: "/work/" },
  { label: "Lab", href: "/lab/", mega: "lab" },
  { label: "About", href: "/about/" },
  { label: "Insights", href: "/insights/" },
  { label: "Contact", href: "/contact/" },
];

export type ServiceId = "websites" | "social" | "ads" | "automation" | "dashboards";

export interface Service {
  id: ServiceId;
  slug: string;
  name: string;
  short: string;
  definition: string; // plain 2–3 sentence definition (AI-answer readiness)
  flywheel: "Attract" | "Convert" | "Automate" | "Manage";
  tone: "sage" | "navy";
  capabilities: string[];
  deliverables: string[];
  useCases: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    id: "websites",
    slug: "website-design-development",
    name: "Website Design & Development",
    short: "Business sites, landing pages and redesigns built to convert.",
    definition:
      "Website design and development is the planning, design and engineering of a business website or landing page. It is for founders, SMEs and established brands that need a fast, credible, conversion-focused site they can grow with.",
    flywheel: "Convert",
    tone: "sage",
    capabilities: [
      "Business and corporate websites",
      "Landing pages and campaign pages",
      "Redesigns and migrations",
      "Responsive, mobile-first builds",
      "CRO-led UX and page structure",
      "Ongoing maintenance",
    ],
    deliverables: [
      "Design system and page designs",
      "Production build (static or server-rendered, per hosting)",
      "Enquiry/lead forms wired to your inbox or CRM",
      "SEO foundations: metadata, sitemap, structured data",
      "Handover notes and maintenance plan",
    ],
    useCases: ["New brand launch", "Lead-generation site for a service business", "Landing page for a paid campaign", "Redesign of an outdated site"],
    faq: [
      { q: "Do you work with international businesses?", a: "Yes. We work remotely with clients worldwide, with a strong presence in the UAE/GCC and Pakistan." },
      { q: "Can you host the site?", a: "We build for your hosting and can advise on options. Hosting is set up in your name so you keep ownership." },
      { q: "What about performance and accessibility?", a: "We follow Core Web Vitals and WCAG 2.2 AA practices. We measure before launch and report real numbers rather than promising scores." },
    ],
  },
  {
    id: "social",
    slug: "social-media-management",
    name: "Social Media Management",
    short: "Strategy, creative, Reels and scheduling with consistent branding.",
    definition:
      "Social media management is the ongoing planning, creation, scheduling and reporting of a brand's social content. It is for businesses that want a consistent, professional presence without running it in-house.",
    flywheel: "Attract",
    tone: "sage",
    capabilities: ["Channel strategy and content planning", "Creative design and templates", "Reels and short-form video", "Captions, alt text and hashtags", "Scheduling and publishing", "Monthly reporting"],
    deliverables: ["Content calendar", "Designed posts, carousels and Reels", "Brand-consistent caption set", "Scheduled publishing", "Monthly performance report"],
    useCases: ["Hospitality and events brands", "Service businesses building trust", "Product launches", "Founder-led brands"],
    faq: [
      { q: "Which platforms?", a: "Instagram, Facebook and LinkedIn by default; others on request." },
      { q: "Do you need access to our accounts?", a: "We work through Meta Business Suite access that you grant and can revoke at any time." },
    ],
  },
  {
    id: "ads",
    slug: "digital-advertising",
    name: "Digital Advertising (Meta)",
    short: "Facebook and Instagram campaigns: setup, creative, audiences, optimisation.",
    definition:
      "Digital advertising on Meta is the planning, setup and optimisation of paid campaigns on Facebook and Instagram. It is for businesses that want qualified enquiries and sales from paid reach, with clear reporting.",
    flywheel: "Attract",
    tone: "sage",
    capabilities: ["Campaign planning and account structure", "Ad creative (static and video)", "Audience and targeting setup", "Pixel and conversion tracking", "Ongoing optimisation", "Reporting"],
    deliverables: ["Campaign → ad set → ad structure", "Creative set", "Tracking setup", "Weekly/monthly reporting"],
    useCases: ["Lead generation for services", "Event and seasonal promotions", "Local awareness in UAE/GCC", "E-commerce sales"],
    faq: [
      { q: "Do you guarantee results?", a: "No. We never promise guaranteed results, revenue or ROI. We set up correctly, test, and report what actually happens." },
      { q: "Who pays the ad spend?", a: "Ad spend is paid directly to Meta from your own ad account. Our fee is separate." },
    ],
  },
  {
    id: "automation",
    slug: "ai-agents-automation",
    name: "AI Agents & Business Automation",
    short: "AI enquiry handling, lead qualification and automated follow-ups.",
    definition:
      "AI agents and business automation connect your enquiries, CRM and follow-ups into workflows that run on their own. It is for businesses that lose time or leads to manual admin and want reliable, auditable processes.",
    flywheel: "Automate",
    tone: "navy",
    capabilities: ["AI enquiry handling (web, WhatsApp, email)", "Lead qualification and routing", "Automated follow-ups", "Sales and customer-service workflows", "Process automation (n8n where suitable)", "Custom AI integrations"],
    deliverables: ["Workflow map", "Built and tested automations", "CRM/sheet connections", "Monitoring and error alerts", "Documentation"],
    useCases: ["Enquiry → qualified lead → CRM", "Missed-call and WhatsApp auto-replies", "Quote and booking follow-ups", "Internal approvals and reporting"],
    faq: [
      { q: "Which tools do you use?", a: "n8n where suitable, plus the AI models and apps that fit your stack. We avoid lock-in where we can." },
      { q: "Is customer data safe?", a: "We design for data minimisation and keep secrets out of client-side code. Compliance requirements (GDPR, UAE PDPL) are flagged for your legal review." },
    ],
  },
  {
    id: "dashboards",
    slug: "business-dashboards-systems",
    name: "Business Dashboards & Digital Systems",
    short: "Management dashboards, CRMs, tracking and internal tools.",
    definition:
      "Business dashboards and digital systems are custom internal tools — dashboards, CRMs, order and project tracking, invoicing — built around how your business actually works. They are for owners and managers who need one clear view and fewer spreadsheets.",
    flywheel: "Manage",
    tone: "navy",
    capabilities: ["Management dashboards and KPIs", "Lightweight CRMs", "Order and project tracking", "Invoicing and approvals", "Internal tools and portals", "Integrations with existing systems"],
    deliverables: ["Requirements and data map", "Working system with roles", "Dashboards with real data connections", "Training and documentation"],
    useCases: ["Agency or studio operations", "Hospitality and events bookings", "Logistics and fleet tracking", "Sales pipeline visibility"],
    faq: [
      { q: "Do we own the system?", a: "Yes. Code, data and accounts are set up in your name." },
      { q: "Can it connect to our existing tools?", a: "Usually, yes — via APIs or exports. We confirm feasibility in discovery." },
    ],
  },
];

export const flywheel = [
  { step: "Attract", detail: "Social + Ads", tone: "sage" as const },
  { step: "Convert", detail: "Website", tone: "sage" as const },
  { step: "Automate", detail: "AI Agents", tone: "navy" as const },
  { step: "Manage", detail: "Dashboards", tone: "navy" as const },
];

export const steps = [
  { n: "01", name: "Discover", text: "We learn your business, goals, audience and constraints." },
  { n: "02", name: "Strategize", text: "We define scope, priorities and a plan you can see." },
  { n: "03", name: "Create", text: "Design and engineering in one team, reviewed with you." },
  { n: "04", name: "Launch", text: "Tested, measured and handed over with documentation." },
  { n: "05", name: "Optimize", text: "We review real results and improve what matters." },
];

export const whyUs = [
  { t: "Integrated delivery", d: "Marketing, web and automation from one connected team." },
  { t: "Design + engineering together", d: "No handoff gap between how it looks and how it works." },
  { t: "Connected growth", d: "Social and ads feed a site that feeds automation that feeds management." },
  { t: "Transparent scope", d: "Clear deliverables, clear pricing per project, no surprises." },
  { t: "Clear communication", d: "One point of contact, plain language, regular updates." },
];

export const homeFaq = [
  { q: "What services do you offer?", a: "Website design & development, social media management, Meta advertising, AI agents & automation, and business dashboards & systems — as one connected growth loop." },
  { q: "Do you work with international clients?", a: "Yes. We work remotely with businesses worldwide and have a strong presence in the UAE/GCC and Pakistan." },
  { q: "Can I buy a single service?", a: "Yes. Each service stands on its own. Many clients start with one and connect the others later." },
  { q: "Do you offer ongoing support?", a: "Yes. Maintenance, content and optimisation plans are available after launch." },
  { q: "Can automation be customised to our process?", a: "Yes. Every workflow is designed around your process; the examples on this site are illustrations." },
  { q: "How do we start?", a: "Send an enquiry with a short description of what you're building. We reply with questions and next steps." },
  { q: "How does pricing work?", a: "Pricing is scoped per project after discovery. We don't publish fixed prices because every scope is different." },
];
