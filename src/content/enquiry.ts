// Enquiry wizard options — shared by the contact wizard, CTAs (URL prefill) and the homepage mini form.
import { Bot, Boxes, CircleHelp, Layers, MousePointerClick, Sparkles, Workflow, LayoutDashboard, Megaphone, MonitorSmartphone, Share2, type LucideIcon } from "lucide-react";
import type { ServiceId } from "./site";

export const serviceIcon: Record<ServiceId, LucideIcon> = { websites: MonitorSmartphone, social: Share2, ads: Megaphone, automation: Bot, dashboards: LayoutDashboard };

export const enquiryTypes: { id: string; label: string; desc: string; icon: LucideIcon }[] = [
  { id: "single", label: "One service", desc: "I know what I need.", icon: MousePointerClick },
  { id: "multiple", label: "Several services", desc: "A few things, working together.", icon: Layers },
  { id: "solution", label: "Complete solution", desc: "Website, marketing and systems.", icon: Boxes },
  { id: "ai-ready", label: "Ready-made AI", desc: "An AI solution that already exists.", icon: Sparkles },
  { id: "ai-custom", label: "Custom AI agent", desc: "An assistant built for my business.", icon: Bot },
  { id: "automation", label: "Custom automation", desc: "Connect tools, remove manual work.", icon: Workflow },
  { id: "unsure", label: "Not sure yet", desc: "Help me work it out.", icon: CircleHelp },
];

export const packages = [
  { id: "starter", label: "Starter" },
  { id: "growth", label: "Growth" },
  { id: "scale", label: "Scale" },
  { id: "custom", label: "Custom" },
  { id: "unsure", label: "Not sure" },
] as const;

// Budget is a band, never a price list. Labels are deliberately currency-free.
export const budgets = ["Prefer to discuss", "Getting started", "Steady investment", "Significant investment", "Major project"] as const;
export const timelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "1-3m", label: "1–3 months" },
  { id: "3-6m", label: "3–6 months" },
  { id: "flexible", label: "Flexible" },
] as const;
export const contactMethods = ["Email", "WhatsApp", "Phone call", "Video call"] as const;

/** Build a contact URL that lands with choices preselected. */
export function contactHref(p: { type?: string; services?: ServiceId[]; package?: string } = {}) {
  const q = new URLSearchParams();
  if (p.type) q.set("type", p.type);
  if (p.services?.length) q.set("services", p.services.join(","));
  if (p.package) q.set("package", p.package);
  const s = q.toString();
  return `/contact/${s ? `?${s}` : ""}`;
}
