// Typed access to the files scripts/prepare-content.mjs generates from the admin panel content.
// Everything here is already validated and cleaned (links checked, images verified, rich text sanitised).
import themeJson from "./generated/theme.json";
import homeJson from "./generated/home-layout.json";
import pagesJson from "./generated/custom-pages.json";
import navJson from "./generated/navigation.json";
import { t } from "@/i18n";

export type Bg = "auto" | "light" | "mist" | "warm" | "dark";
export type Img = { src: string; alt: string; width: number | null; height: number | null };
export type Btn = { label: string; link: string };
export type BlockStyle = { background: Bg; align: "left" | "center"; width: "narrow" | "normal" | "wide" };
export type Head = { eyebrow: string; title: string; accent: string; after: string; lead: string };
type Base = { key: string; style: BlockStyle };

export type Block = Base & (
  | ({ type: "hero"; primary: Btn | null; secondary: Btn | null; image: Img | null; layout: "image-right" | "image-left" | "centered" } & Head)
  | ({ type: "text"; body: string } & Head)
  | ({ type: "cards"; columns: "2" | "3" | "4"; items: { icon: string; title: string; text: string; link: Btn | null }[] } & Head)
  | ({ type: "imageText"; body: string; image: Img | null; side: "left" | "right"; button: Btn | null } & Head)
  | ({ type: "services"; layout: "bento" | "list" } & Head)
  | ({ type: "faq"; layout: "side" | "stacked"; items: { q: string; a: string }[] } & Head)
  | ({ type: "cta"; primary: Btn | null; secondary: Btn | null } & Head)
  | ({ type: "highlights"; items: { value: string; label: string; source: string }[] } & Head)
  | ({ type: "gallery"; columns: "2" | "3" | "4"; images: (Img & { caption: string })[] } & Head)
  | ({ type: "contact" } & Head)
  | { type: "spacer"; size: "small" | "medium" | "large"; line: boolean }
  | { type: "homeHero"; layout: "visual-right" | "visual-left" | "centered" }
  | { type: "homeServices"; layout: "bento" | "list" }
  | { type: "homeShowcase" } | { type: "homeWhy" } | { type: "homeFlexible" } | { type: "homeAi" }
  | { type: "homeProcess"; layout: "side" | "stacked" }
  | { type: "homeFaq"; layout: "side" | "stacked" }
);

export type CustomPage = {
  slug: string; title: string; path: string;
  seo: { title: string; description: string; image: Img | null; hideFromSearch: boolean };
  menu: { header: boolean; footer: boolean; label: string };
  blocks: Block[];
};

export type Theme = {
  preset: string; presetLabel: string; background: string;
  fonts: { heading: string; body: string; accent: string }; preload: string[];
  corners: string; buttons: { shape: string; style: string }; spacing: string; shadows: string; glass: string;
  motion: "full" | "subtle" | "off"; cursor: boolean;
  brand: { logo: Img | null; logoOnDark: Img | null; logoHeight: number; favicon: Img | null; shareImage: Img | null };
};

export type NavItem = { label: string; href: string; mega?: "services" };
export type Navigation = {
  header: NavItem[]; headerButton: Btn;
  footer: {
    showCta: boolean; servicesTitle: string; showServices: boolean; servicesExtra: NavItem[];
    companyTitle: string; company: NavItem[]; contactTitle: string; showContact: boolean; legal: NavItem[]; showWordmark: boolean;
  };
};

export const theme = themeJson as unknown as Theme;
export const homeBlocks = (homeJson as unknown as { blocks: Block[] }).blocks;
export const customPages = (pagesJson as unknown as { pages: CustomPage[] }).pages;
// Menu/footer labels are translated through the UI dictionary in the Arabic build.
const trNav = (o: unknown): unknown => Array.isArray(o) ? o.map(trNav)
  : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, (k === "label" || k.endsWith("Title")) && typeof v === "string" ? t(v) : trNav(v)]))
  : o;
export const navigation = trNav(navJson) as unknown as Navigation;

/** True when the block draws its own top-of-page hero (so no header spacer / auto title is needed). */
export const isHeroBlock = (b?: Block) => b?.type === "hero" || b?.type === "homeHero";
