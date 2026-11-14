import homeEn from "../../content/home.json";
import pagesEn from "../../content/pages.json";
import legalEn from "../../content/legal.json";
import homeAr from "../../content/ar/home.json";
import pagesAr from "../../content/ar/pages.json";
import legalAr from "../../content/ar/legal.json";
import { overlay } from "@/i18n";

const home = overlay(homeEn, homeAr);
const pages = overlay(pagesEn, pagesAr);
const legal = overlay(legalEn, legalAr);

/** Page copy edited through the admin panel (content/*.json). */
export { home, pages, legal };
export type Head = { eyebrow?: string; title: string; accent?: string; after?: string; lead?: string };
