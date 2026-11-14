import type { Metadata } from "next";
import { isAr, t } from "@/i18n";
import { site, type ServiceId } from "@/content/site";
import { theme } from "@/content/builder";

const abs = (p: string) => `${site.url}${p}`;

/** Per-page canonical, language links (hreflang) and share URL. `path` is the English path, e.g. "/about/". */
export function seo(path: string, image?: string): Pick<Metadata, "alternates" | "openGraph"> {
  const en = abs(path), ar = abs(`/ar${path}`), self = isAr ? ar : en;
  return {
    alternates: { canonical: self, languages: { en, ar, "x-default": en } },
    openGraph: { type: "website", siteName: site.brand, url: self, locale: isAr ? "ar_AR" : "en_US", images: [image ?? theme.brand.shareImage?.src ?? "/og/default.png"] },
  };
}

/** Search titles for the service pages (the on-page heading stays the service name). */
export const serviceSeoTitle: Record<ServiceId, string> = {
  websites: t("Website Design & Development Services"),
  social: t("Social Media Management Services"),
  ads: t("Meta & Google Ads Management"),
  automation: t("AI Agents & Business Automation"),
  dashboards: t("Custom Business Dashboards & Systems"),
};
