// Business inputs. Empty string = not confirmed yet — never invented, never rendered.
// Brand rule: location-neutral. No countries, cities, regions or nationalities in promotional copy.
import settings from "../../content/settings.json";
import servicesData from "../../content/services.json";
import aiData from "../../content/ai.json";
import shared from "../../content/shared.json";

// Editable content lives in /content/*.json (edited through the Pages CMS admin panel — see .pages.yml).
// Business inputs: empty string = not confirmed yet — never invented, never rendered.
// Brand rule: location-neutral. No countries, cities, regions or nationalities in promotional copy.
export const site = {
  brand: settings.brand,
  domain: "", // not purchased yet
  url: "https://keelbiz.example", // replace with real domain before launch
  type: "Digital growth & business technology agency",
  positioning: settings.positioning,
  supporting: settings.supporting,
  market: "Digital solutions for ambitious businesses.",
  contact: settings.contact,
  socials: settings.socials as Record<string, string>,
  footer: settings.footer,
  features: {
    aiPlansPage: false,
    bookingEmbed: false,
    analytics: false, // cookieless (Plausible/Umami) — see ANALYTICS.md
    checkout: false, // no payment processing configured — enquiries/quotes only
  },
  enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "/api/enquiry.php", // same-host PHP endpoint (public/api/enquiry.php + server config)
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

// Fixed technical keys (not editable): order in content/services.json = websites, social, ads, automation, dashboards.
const serviceKeys: { id: ServiceId; slug: string; flywheel: Service["flywheel"]; tone: Service["tone"] }[] = [
  { id: "websites", slug: "website-design-development", flywheel: "Convert", tone: "sage" },
  { id: "social", slug: "social-media-management", flywheel: "Attract", tone: "sage" },
  { id: "ads", slug: "digital-advertising", flywheel: "Attract", tone: "sage" },
  { id: "automation", slug: "ai-agents-automation", flywheel: "Automate", tone: "navy" },
  { id: "dashboards", slug: "business-dashboards-systems", flywheel: "Manage", tone: "navy" },
];
export const services: Service[] = serviceKeys.map((k, i) => ({ ...(servicesData.services[i] as Omit<Service, "id" | "slug" | "flywheel" | "tone">), ...k }));

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
export const shortName: Record<ServiceId, string> = { websites: "Website", social: "Social", ads: "Ads", automation: "AI", dashboards: "Dashboards" };
/** Short label for the services mega menu + footer (full names stay on pages). */
export const menuName: Record<ServiceId, string> = { websites: "Website Design & Development", social: "Social Media Management", ads: "Digital Advertising — Meta & Google Ads", automation: "AI Agents & Automation", dashboards: "Business Dashboards" };

/** Example combinations — illustrations, not fixed packages. */
export const combinations = shared.combinations as { title: string; ids: ServiceId[]; note: string }[];

/** AI offer — three ways to buy. Nothing here claims a specific product is built or priced. */
export const aiOffer = { ...aiData, paths: aiData.paths.map((p, i) => ({ ...p, id: ["ready", "custom", "automation"][i] ?? `path-${i}` })) };

export const flywheel = shared.flywheel.map((f, i) => ({ ...f, tone: (i < 2 ? "sage" : "navy") as "sage" | "navy" }));
export const steps = shared.steps;
export const whyUs = shared.whyUs;
export const homeFaq = shared.homeFaq;

/** Third-party costs — shown wherever pricing is discussed. Concise, no amounts. */
export const thirdPartyNote = settings.thirdPartyNote;
