import homeEn from "../../content/home.json";
import pagesEn from "../../content/pages.json";
import legalEn from "../../content/legal.json";
import homeAr from "../../content/ar/home.json";
import pagesAr from "../../content/ar/pages.json";
import legalAr from "../../content/ar/legal.json";
import { overlay } from "@/i18n";

// Inlined at build time: the English build drops the Arabic files from its bundles.
const AR = process.env.NEXT_PUBLIC_LANG === "ar";
const home = overlay(homeEn, AR ? homeAr : undefined);
const pages = overlay(pagesEn, AR ? pagesAr : undefined);
const legal = overlay(legalEn, AR ? legalAr : undefined);

/** Page copy edited through the admin panel (content/*.json). */
export { home, pages, legal };
export type Head = { eyebrow?: string; title: string; accent?: string; after?: string; lead?: string };
