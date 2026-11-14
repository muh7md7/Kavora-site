import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";
import { customPages } from "@/content/builder";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => ({ url: `${site.url}${p}`, lastModified: new Date() });
  return [
    u("/"), u("/services/"), ...services.map((s) => u(`/services/${s.slug}/`)), u("/ai-solutions/"), u("/work/"), u("/about/"), u("/contact/"),
    ...customPages.filter((p) => !p.seo.hideFromSearch).map((p) => u(p.path)),
    u("/legal/privacy/"), u("/legal/terms/"), u("/legal/cookies/"),
  ];
}
