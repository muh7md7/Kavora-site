// Business inputs. Empty string = not confirmed yet — never invented, never rendered.
// Brand rule: location-neutral. No countries, cities, regions or nationalities in promotional copy.
export const site = {
  brand: "Keelbiz",
  domain: "", // not purchased yet
  url: "https://keelbiz.example", // replace with real domain before launch
  type: "Digital growth & business technology agency",
  positioning: "Build your presence. Grow your business. Automate what comes next.",
  supporting:
    "We design websites, manage social media, run Meta and Google advertising, and build AI automation and business systems — one service or a tailored combination, built around your business.",
  market: "Digital solutions for ambitious businesses.",
  contact: {
    email: "", // leave empty until confirmed — nothing invented is ever rendered
    phone: "",
    whatsapp: "", // E.164 format
  },
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
  features: {
    aiPlansPage: false, // optional module, off until offer + terms confirmed
    bookingEmbed: false,
    analytics: false, // cookieless (Plausible/Umami) — see ANALYTICS.md
    checkout: false, // no payment processing configured — enquiries/quotes only
  },
  enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "/api/enquiry.php", // same-host PHP endpoint (public/api/enquiry.php + api/config.php)
} as const;

export const isConfirmed = (v: string) => v.trim() !== "" && !v.startsWith("[TO CONFIRM");

export const nav: readonly { label: string; href: string; mega?: "services" }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/", mega: "services" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export type ServiceId = "websites" | "social" | "ads" | "automation" | "dashboards";

export interface Service {
  id: ServiceId;
  slug: string;
  name: string;
  short: string;
  definition: string; // plain 2–3 sentence definition (AI-answer readiness)
  forWho: string;
  flywheel: "Attract" | "Convert" | "Automate" | "Manage";
  cta: string; // consultation-led CTA label
  tone: "sage" | "navy";
  benefits: string[];
  capabilities: string[];
  deliverables: string[];
  useCases: string[];
  pairsWith: { id: ServiceId; why: string }[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    id: "websites",
    slug: "website-design-development",
    name: "Website Design & Development",
    short: "Business websites, landing pages, redesigns, custom development and integrations.",
    definition:
      "We design and build fast, credible websites that turn visitors into enquiries — from a single landing page to a complete business site.",
    forWho: "Businesses launching, rebranding, or replacing a site that no longer reflects them or brings in enquiries.",
    flywheel: "Convert",
    cta: "Get a Proposal",
    tone: "sage",
    benefits: ["Look credible from the first second", "Turn visitors into enquiries", "Easy to grow and maintain"],
    capabilities: ["Business and corporate websites", "Landing pages for campaigns", "Website redesigns", "Custom website development", "Website integrations (forms, booking, CRM, payments)", "SEO-ready structure"],
    deliverables: ["Page designs and content structure", "A fast, responsive build", "Enquiry forms connected to your inbox or CRM", "SEO foundations: titles, sitemap, structured data", "Handover notes"],
    useCases: ["A new business going online", "A redesign of an outdated site", "A landing page for an ad campaign", "A site that needs to bring in more enquiries"],
    pairsWith: [
      { id: "ads", why: "Send paid traffic to pages built to convert." },
      { id: "automation", why: "Reply to every new enquiry instantly." },
    ],
    faq: [
      { q: "Do you work remotely?", a: "Yes. Every project runs remotely, with clear communication and regular reviews." },
      { q: "Who owns the website?", a: "You do. Hosting, domain and code are set up in your name." },
      { q: "Can you just redesign one page?", a: "Yes. We can take on a single page, a landing page or a full site." },
    ],
  },
  {
    id: "social",
    slug: "social-media-management",
    name: "Social Media Management",
    short: "Content, posts, reels, captions, scheduling and account management.",
    definition:
      "We plan, create and publish your social content — posts, reels and captions — so your accounts stay active, consistent and on-brand.",
    forWho: "Businesses that know social matters but don't have the time or team to run it well.",
    flywheel: "Attract",
    cta: "Discuss Your Goals",
    tone: "sage",
    benefits: ["A consistent, professional presence", "Content made for your audience", "Time back in your week"],
    capabilities: ["Content planning", "Post and carousel design", "Reels, stories and short-form video", "Captions and hashtags", "Scheduling and publishing", "Platform-specific content where supported"],
    deliverables: ["A monthly content calendar", "Designed posts and reels", "On-brand captions", "Scheduled publishing", "A simple monthly report"],
    useCases: ["Hospitality, events and restaurants", "Service businesses building trust", "Product launches", "Founder-led brands"],
    pairsWith: [
      { id: "ads", why: "Boost your best content to the right audience." },
      { id: "automation", why: "Answer DMs and comments faster." },
    ],
    faq: [
      { q: "Which platforms do you manage?", a: "Instagram, Facebook and LinkedIn by default. Others on request." },
      { q: "Do you need our passwords?", a: "No. You grant access through the platform's business tools and can remove it any time." },
    ],
  },
  {
    id: "ads",
    slug: "digital-advertising",
    name: "Digital Advertising",
    short: "Meta Ads and Google Ads — setup, management and optimisation.",
    definition:
      "We plan, launch and manage ad campaigns on Meta (Facebook and Instagram) and Google — on one platform or both — to bring you leads and customers.",
    forWho: "Businesses that want more enquiries or sales from paid advertising, with clear reporting.",
    flywheel: "Attract",
    cta: "Request a Strategy",
    tone: "sage",
    benefits: ["Reach people ready to buy", "Choose Meta, Google or both", "Clear reporting on what's working"],
    capabilities: ["Facebook and Instagram ads", "Google Search ads", "Other suitable Google Ads campaigns", "Campaign setup and tracking", "Ongoing management and optimisation", "Lead generation and advertising strategy"],
    deliverables: ["Campaign plan and structure", "Ad creative and copy", "Conversion tracking setup", "Regular optimisation", "Simple performance reports"],
    useCases: ["Lead generation for service businesses", "Search ads for people already looking for you", "Seasonal and event promotions", "Online store sales"],
    pairsWith: [
      { id: "websites", why: "Landing pages that convert your ad clicks." },
      { id: "automation", why: "Follow up every lead from your ads automatically." },
    ],
    faq: [
      { q: "Meta or Google — which do I need?", a: "It depends on how your customers find you. Meta reaches people while they scroll; Google reaches people while they search. You can choose one or both." },
      { q: "Do you guarantee results?", a: "No. Nobody honest can. We set campaigns up properly, test, optimise and report what actually happens." },
      { q: "Who pays for the ad spend?", a: "Ad spend is paid directly to Meta or Google from your own account. Our management fee is separate." },
    ],
  },
  {
    id: "automation",
    slug: "ai-agents-automation",
    name: "AI Agents & Automation",
    short: "Custom AI agents, workflow automation and ready-made AI solutions where available.",
    definition:
      "We build AI agents and automations that answer enquiries, follow up leads, book appointments and connect your business tools — ready-made where available, or custom-built around your needs.",
    forWho: "Businesses losing time or leads to repetitive work — replying, following up, copying data between apps.",
    flywheel: "Automate",
    cta: "Discuss Your AI Project",
    tone: "navy",
    benefits: ["Reply to customers instantly", "Never forget a follow-up", "Less manual admin"],
    capabilities: ["AI customer support agents", "AI sales and lead follow-up", "AI appointment booking", "Website and messaging assistants", "Business workflow automation", "Custom integrations between your apps"],
    deliverables: ["A clear proposal for your use case", "A built and tested AI agent or workflow", "Connections to your tools", "Monitoring and error alerts", "Simple documentation"],
    useCases: ["Answering common customer questions", "Qualifying and following up new leads", "Booking appointments automatically", "Moving data between apps without copy-paste"],
    pairsWith: [
      { id: "websites", why: "Put an AI assistant on your website." },
      { id: "dashboards", why: "See every automated lead and task in one place." },
    ],
    faq: [
      { q: "Can you build something that isn't on your list?", a: "Yes. Tell us what you need. If it's technically feasible, we'll propose a solution." },
      { q: "Do you sell ready-made AI agents?", a: "Yes, where a ready-made solution fits your needs. Ask us what's currently available for your use case." },
      { q: "Is our customer data safe?", a: "We design for minimal data use and keep credentials out of public code. Specific compliance needs are reviewed per project." },
    ],
  },
  {
    id: "dashboards",
    slug: "business-dashboards-systems",
    name: "Business Dashboards & Systems",
    short: "Custom dashboards, management systems, client tools and reporting.",
    definition:
      "We build custom dashboards and internal systems — reporting, client management, order and project tracking — so you can run your business from one clear view.",
    forWho: "Owners and managers juggling spreadsheets, apps and messages to see what's going on.",
    flywheel: "Manage",
    cta: "Request a Quote",
    tone: "navy",
    benefits: ["One clear view of your business", "Fewer spreadsheets", "Decisions based on real numbers"],
    capabilities: ["Business reporting dashboards", "Sales and operations tracking", "Client management systems", "Orders and workflow management", "Custom business tools", "Operational and financial reporting"],
    deliverables: ["A requirements and data map", "A working system with user roles", "Dashboards connected to your data", "Training and documentation"],
    useCases: ["Agency and studio operations", "Bookings and events", "Sales pipeline visibility", "Field and delivery tracking"],
    pairsWith: [
      { id: "automation", why: "Feed the dashboard automatically." },
      { id: "ads", why: "See advertising results next to sales." },
    ],
    faq: [
      { q: "Do we own the system?", a: "Yes. Code, data and accounts are set up in your name." },
      { q: "Can it connect to the tools we already use?", a: "Usually, yes. We confirm what's possible before we start." },
    ],
  },
];

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
export const shortName: Record<ServiceId, string> = { websites: "Website", social: "Social", ads: "Ads", automation: "AI", dashboards: "Dashboards" };
/** Short label for the services mega menu + footer (full names stay on pages). */
export const menuName: Record<ServiceId, string> = { websites: "Website Design & Development", social: "Social Media Management", ads: "Digital Advertising — Meta & Google Ads", automation: "AI Agents & Automation", dashboards: "Business Dashboards" };

/** Example combinations — illustrations, not fixed packages. */
export const combinations: { title: string; ids: ServiceId[]; note: string }[] = [
  { title: "Launch online", ids: ["websites"], note: "Website with an SEO-ready structure." },
  { title: "Grow your audience", ids: ["social", "ads"], note: "Social media management with Meta or Google advertising." },
  { title: "Never miss a lead", ids: ["websites", "automation"], note: "A website with an AI assistant and instant follow-up." },
  { title: "Ads that follow up", ids: ["ads", "automation"], note: "Campaigns with automated lead follow-up." },
  { title: "Full presence", ids: ["websites", "social", "ads"], note: "Website, social media and advertising together." },
  { title: "Complete growth system", ids: ["websites", "social", "ads", "automation", "dashboards"], note: "Digital growth and business automation, end to end." },
];

/** AI offer — three ways to buy. Nothing here claims a specific product is built or priced. */
export const aiOffer = {
  paths: [
    {
      id: "ready",
      title: "Ready-made AI solutions",
      lead: "Where a built solution fits your need, we configure it for your business.",
      points: ["Faster to launch than a custom build", "Configured with your details and tools", "Availability confirmed per use case — ask us"],
      cta: { label: "Ask what's available", href: "/contact/?type=ai-ready&services=automation" },
    },
    {
      id: "custom",
      title: "Custom AI agents",
      lead: "Tell us what you need. We propose and build it.",
      points: ["Designed around your process", "Built for your specific tasks", "Scoped and quoted before we start"],
      cta: { label: "Discuss Your AI Project", href: "/contact/?type=ai-custom&services=automation" },
    },
    {
      id: "automation",
      title: "Custom automation",
      lead: "Connect your tools and remove repetitive work.",
      points: ["Link the apps you already use", "Automate follow-ups, data entry and reports", "Monitored, with alerts if something fails"],
      cta: { label: "Explore Automation", href: "/contact/?type=automation&services=automation" },
    },
  ],
  examples: [ // each has a flow: the four steps it runs through

    { title: "Customer support agent", does: "Answers common questions on your website or chat, day and night.", solves: "Slow replies and repeated questions.", flow: ["Visitor asks a question", "Agent answers from your information", "Unclear? Handed to a human", "Conversation logged"] },
    { title: "Sales & lead follow-up agent", does: "Qualifies new leads and follows up until they respond.", solves: "Leads that go cold.", flow: ["New lead arrives", "Agent qualifies against your rules", "Follow-ups sent until they reply", "Hot leads flagged to you"] },
    { title: "Appointment booking agent", does: "Offers available times and books meetings for you.", solves: "Back-and-forth scheduling.", flow: ["Visitor asks for a time", "Agent checks your calendar", "Slot offered and confirmed", "Both sides get a reminder"] },
    { title: "Website & messaging assistant", does: "Chats with visitors on your site or messaging channels and passes hot leads to your team.", solves: "Missed enquiries out of hours.", flow: ["Message on site or WhatsApp", "Agent answers and qualifies", "Hot ones routed to your team", "Rest answered and closed"] },
    { title: "Email & message automation", does: "Sends the right message at the right time, automatically.", solves: "Manual reminders and updates.", flow: ["Trigger fires (signup, job, date)", "The right message is chosen", "Sent at the right time", "Replies routed back to you"] },
    { title: "Social media workflows", does: "Moves content from idea to scheduled post with fewer steps.", solves: "Time lost to posting admin.", flow: ["Idea captured in one place", "Draft and asset prepared", "Sent for your approval", "Scheduled to the platforms"] },
    { title: "CRM & process automation", does: "Keeps your CRM and apps in sync without copy-paste.", solves: "Data entry and missed updates.", flow: ["Record changes in one tool", "Mapped to your other tools", "Everything stays in sync", "Conflicts flagged, not guessed"] },
    { title: "Reporting automation", does: "Builds and sends your regular reports automatically.", solves: "Hours spent on weekly reports.", flow: ["Data pulled on a schedule", "Figures checked and compiled", "Report built in your format", "Delivered to your inbox"] },
  ],
};

export const flywheel = [
  { step: "Attract", detail: "Social + Ads", tone: "sage" as const },
  { step: "Convert", detail: "Website", tone: "sage" as const },
  { step: "Automate", detail: "AI Agents", tone: "navy" as const },
  { step: "Manage", detail: "Dashboards", tone: "navy" as const },
];

export const steps = [
  { n: "01", name: "Discover", text: "We learn your business, goals, audience and constraints." },
  { n: "02", name: "Propose", text: "We recommend what you actually need — one service or several — with a clear quote." },
  { n: "03", name: "Create", text: "Design and engineering in one team, reviewed with you." },
  { n: "04", name: "Launch", text: "Tested, measured and handed over with documentation." },
  { n: "05", name: "Improve", text: "We review real results and improve what matters." },
];

export const whyUs = [
  { t: "Flexible by design", d: "Hire us for one service or several. You never have to buy a bundle." },
  { t: "Design + engineering together", d: "No handoff gap between how it looks and how it works." },
  { t: "AI that's practical", d: "Ready-made where it fits, custom-built where it doesn't." },
  { t: "Transparent quotes", d: "Clear scope and a custom quote before any work starts." },
  { t: "Clear communication", d: "One point of contact, plain language, regular updates." },
];

export const homeFaq = [
  { q: "Do I have to buy more than one service?", a: "No. You can hire us for one service, several, or a complete solution. We'll only recommend what you need." },
  { q: "Do you work remotely?", a: "Yes. Every project runs remotely — discovery, reviews and handover included." },
  { q: "Do you sell ready-made AI agents or only build custom ones?", a: "Both. Where a ready-made solution fits, we set it up for you. Otherwise we design and build a custom agent." },
  { q: "Which advertising platforms do you manage?", a: "Meta (Facebook and Instagram) and Google Ads. You can choose one or both." },
  { q: "Do you offer ongoing support?", a: "Yes. Maintenance, content and optimisation can continue after launch." },
  { q: "How does pricing work?", a: "Every project gets a custom quote after a short discovery conversation. We don't publish fixed prices because every scope is different. Where a ready-made AI solution has a confirmed price, we share it on request." },
  { q: "Are there costs beyond your fee?", a: "Sometimes. Third-party costs — ad spend paid to Meta or Google, hosting and domains, AI usage, messaging or integration subscriptions — are paid by you directly and listed in the proposal before you commit." },
  { q: "How do we start?", a: "Send an enquiry with a short description of what you need. We reply with questions and next steps." },
];

/** Third-party costs — shown wherever pricing is discussed. Concise, no amounts. */
export const thirdPartyNote =
  "Our fee covers our work. Third-party costs — ad spend, hosting and domains, AI usage, messaging and integration subscriptions — may apply and are listed in your proposal.";

/** Compare table — which service solves which problem. Problem statements, never claims about results. */
export const problemMatrix: { problem: string; ids: ServiceId[] }[] = [
  { problem: "People can't find us, or don't trust what they find", ids: ["websites", "social"] },
  { problem: "We get visitors but almost no enquiries", ids: ["websites", "ads"] },
  { problem: "Our social accounts are inconsistent or inactive", ids: ["social"] },
  { problem: "We need more leads than word of mouth brings", ids: ["ads", "social"] },
  { problem: "Enquiries go unanswered outside working hours", ids: ["automation"] },
  { problem: "The same questions are answered manually every day", ids: ["automation"] },
  { problem: "Admin and data entry eat the week", ids: ["automation", "dashboards"] },
  { problem: "Our numbers live in separate tools and spreadsheets", ids: ["dashboards"] },
  { problem: "We can't tell what marketing is actually working", ids: ["dashboards", "ads"] },
];

/** How the services connect when combined — used by the stack builder diagram. */
export const stackFlow: { from: ServiceId; to: ServiceId; label: string }[] = [
  { from: "social", to: "websites", label: "sends people to" },
  { from: "ads", to: "websites", label: "sends traffic to" },
  { from: "websites", to: "automation", label: "passes enquiries to" },
  { from: "automation", to: "dashboards", label: "reports into" },
  { from: "ads", to: "dashboards", label: "reports into" },
  { from: "social", to: "dashboards", label: "reports into" },
];

/** Per-page Open Graph image. Falls back to the default card when a page has no image of its own. */
export function ogImage(slug: string) {
  return { images: [{ url: `/og/${slug}.png`, width: 1200, height: 630, alt: "Keelbiz" }] };
}
