import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";
import { lab } from "@/lab/registry";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => ({ url: `${site.url}${p}`, lastModified: new Date() });
  return [u("/"), u("/services/"), ...services.map((s) => u(`/services/${s.slug}/`)), u("/work/"), u("/lab/"), ...lab.map((e) => u(`/lab/${e.slug}/`)), u("/about/"), u("/insights/"), u("/contact/"), u("/legal/privacy/"), u("/legal/terms/"), u("/legal/cookies/")];
}
