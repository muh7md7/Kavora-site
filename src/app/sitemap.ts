import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";
import { customPages } from "@/content/builder";
export const dynamic = "force-static";
// One sitemap for both languages (the Arabic build's copy is dropped by scripts/build-all.mjs).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/", "/services/", ...services.map((s) => `/services/${s.slug}/`), "/ai-solutions/", "/work/", "/about/", "/contact/",
    ...customPages.filter((p) => !p.seo.hideFromSearch).map((p) => p.path),
    "/legal/privacy/", "/legal/terms/", "/legal/cookies/",
  ];
  return paths.flatMap((p) => {
    const en = `${site.url}${p}`, ar = `${site.url}/ar${p}`;
    const alternates = { languages: { en, ar, "x-default": en } };
    return [{ url: en, lastModified: now, alternates }, { url: ar, lastModified: now, alternates }];
  });
}
