#!/usr/bin/env node
/**
 * Keelbiz content guard + theme generator. Runs automatically before `next dev` and `next build`.
 *
 * Reads what the admin panel (Pages CMS) saves in /content, checks it, fixes what can be fixed safely,
 * and writes clean, build-ready files:
 *   src/styles/theme.generated.css      colours, fonts, corners, buttons, spacing, shadows, glass, motion
 *   src/content/generated/*.json        theme, home layout, custom pages, navigation (normalised)
 *   public/fonts/theme/*                only the font files the theme uses
 *
 * Philosophy: an edit in the panel must never take the website down. Problems are fixed or skipped and
 * reported as warnings (GitHub Actions → "Publish website" run → Summary). Only content that cannot be
 * safely repaired (unreadable JSON, not exactly 5 services) stops the build — the live site then stays
 * on the last good version.
 */
import fs from "node:fs";
import path from "node:path";
import sanitizeHtml from "sanitize-html";
import { imageSize } from "image-size";
import { ACCENT_FONTS, BODY_FONTS, FONTS, HEADING_FONTS, PRESETS, SCALES, resolvePalette, stackOf } from "./lib/theme.mjs";

const ROOT = process.cwd();
const P = (...p) => path.join(ROOT, ...p);
const OUT_JSON = P("src/content/generated");
const OUT_CSS = P("src/styles/theme.generated.css");
const FONT_DIR = P("public/fonts/theme");

const report = { errors: [], warnings: [], notes: [] };
const warn = (where, msg) => report.warnings.push(`**${where}** — ${msg}`);
const note = (msg) => report.notes.push(msg);
const fail = (where, msg) => report.errors.push(`**${where}** — ${msg}`);

// ---------------------------------------------------------------- helpers
function readJson(rel, fallback) {
  const file = P(rel);
  if (!fs.existsSync(file)) { if (fallback !== undefined) return fallback; fail(rel, "file is missing."); return null; }
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { fail(rel, `could not be read (${e.message}). Undo the last change to this file in the admin panel.`); return fallback ?? null; }
}
const str = (v) => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "");
const arr = (v) => (Array.isArray(v) ? v : []);
const pick = (v, allowed, dflt) => (allowed.includes(v) ? v : dflt);
const slugify = (s) => str(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

// ---------------------------------------------------------------- core content (must be valid)
const settings = readJson("content/settings.json");
const home = readJson("content/home.json");
const servicesFile = readJson("content/services.json");
readJson("content/shared.json"); readJson("content/ai.json"); readJson("content/pages.json"); readJson("content/legal.json");
const serviceSlugs = ["website-design-development", "social-media-management", "digital-advertising", "ai-agents-automation", "business-dashboards-systems"];
if (servicesFile && arr(servicesFile.services).length !== 5) fail("Services", `there must be exactly 5 services (found ${arr(servicesFile.services).length}). Each one has a fixed page address.`);
if (settings && !str(settings.brand)) fail("Business details", "the business name is empty.");

// ---------------------------------------------------------------- routes + links
const STATIC_ROUTES = ["/", "/services/", ...serviceSlugs.map((s) => `/services/${s}/`), "/work/", "/about/", "/contact/", "/ai-solutions/", "/legal/privacy/", "/legal/terms/", "/legal/cookies/"];
const RESERVED = new Set(["services", "work", "about", "contact", "ai-solutions", "legal", "api", "uploads", "fonts", "og", "brand", "backdrops", "_next", "lab", "insights", "design-system", "404", "index", "sitemap", "robots", "icon", "apple-icon", "favicon", "home", "p"]);
const routes = new Set(STATIC_ROUTES);

function normLink(raw, where) {
  let v = str(raw);
  if (!v) return "";
  if (/^(https:\/\/|http:\/\/|mailto:|tel:)/i.test(v)) return v;
  if (/^(www\.|[a-z0-9-]+\.(com|net|org|io|co|ae|pk|uk|app|dev|me)\b)/i.test(v)) { note(`${where}: added https:// to "${v}".`); return `https://${v}`; }
  if (v.startsWith("#")) return v;
  if (!v.startsWith("/")) v = `/${v}`;
  const m = v.match(/^([^?#]*)(.*)$/);
  let p = m[1]; const rest = m[2];
  if (p.startsWith("/uploads/")) { if (fs.existsSync(P("public", decodeURI(p)))) return v; warn(where, `link to file "${p}" — that file isn't in the media library, so the link was removed.`); return ""; }
  if (!/\.[a-z0-9]{2,5}$/i.test(p) && !p.endsWith("/")) p += "/";
  if (routes.has(p)) return p + rest;
  warn(where, `link "${raw}" doesn't match any page on this website, so it was removed. Use addresses like /contact/ or a full https:// link.`);
  return "";
}
function normButton(b, where) {
  const label = str(b?.label), link = normLink(b?.link, where);
  return label && link ? { label, link } : null;
}

// ---------------------------------------------------------------- media
const IMG_EXT = ["jpg", "jpeg", "png", "webp", "avif", "gif", "svg"];
function normImage(src, alt, where, { requireAlt = true } = {}) {
  const s = str(src);
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) { warn(where, `image "${s}" is on another website. For security the site only shows images uploaded to the media library — upload it there instead.`); return null; }
  const rel = s.startsWith("/") ? s : `/${s}`;
  const ext = rel.split(".").pop().toLowerCase();
  if (!IMG_EXT.includes(ext)) { warn(where, `"${rel}" isn't a supported image type (use JPG, PNG, WebP, AVIF, GIF or SVG).`); return null; }
  const file = P("public", decodeURI(rel));
  if (!fs.existsSync(file)) { warn(where, `image "${rel}" was not found in the media library, so it was skipped.`); return null; }
  const a = str(alt);
  if (requireAlt && !a) { warn(where, `image "${rel}" has no alt text (a short description for people using screen readers), so it was skipped. Add the description and save again.`); return null; }
  let width, height;
  try { const d = imageSize(fs.readFileSync(file)); width = d.width; height = d.height; } catch { /* svg without size etc. */ }
  const kb = Math.round(fs.statSync(file).size / 1024);
  if (kb > 800) note(`${where}: image "${rel}" is ${kb} KB — consider a smaller file (under ~400 KB) so pages load fast.`);
  return { src: rel, alt: a, width: width ?? null, height: height ?? null };
}

// ---------------------------------------------------------------- honesty check (warn only)
const CLAIMS = /\b(guarantee[sd]?|#\s?1\b|number one|award[- ]winning|best in (the )?(industry|market|world)|100\s?% (satisfaction|success|guaranteed)|trusted by \d|\d[\d,.]*\+?\s?(happy |satisfied )?(clients|customers|businesses|brands|projects)\b|\d+\s?x (more|growth|roi)|testimonial)/i;
function claimsCheck(text, where) {
  const m = str(text).match(CLAIMS);
  if (m) warn(where, `contains "${m[0]}". Only publish claims you can prove — no invented results, numbers, awards or testimonials.`);
}

// ---------------------------------------------------------------- rich text
const sanitize = (html) => sanitizeHtml(str(html), {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "hr", "code"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["https", "http", "mailto", "tel"],
  transformTags: {
    h1: "h2",
    a: (tag, attribs) => {
      const ext = /^https?:/i.test(attribs.href ?? "");
      return { tagName: "a", attribs: { href: attribs.href ?? "#", ...(ext ? { rel: "noopener", target: "_blank" } : {}) } };
    },
  },
});
const plain = (html) => str(html).replace(/<[^>]+>/g, " ");

// ---------------------------------------------------------------- blocks (page builder)
const BACKGROUNDS = ["auto", "light", "mist", "warm", "dark"];
const style = (s, dflt = "auto") => ({
  background: pick(str(s?.background), BACKGROUNDS, dflt),
  align: pick(str(s?.align), ["left", "center"], "left"),
  width: pick(str(s?.width), ["narrow", "normal", "wide"], "normal"),
});
const head = (b, where) => {
  const h = { eyebrow: str(b.eyebrow), title: str(b.title), accent: str(b.accent), after: str(b.after), lead: str(b.lead) };
  claimsCheck([h.eyebrow, h.title, h.accent, h.after, h.lead].join(" "), where);
  return h;
};
const ICONS = ["sparkles", "check", "layers", "bot", "chart", "globe", "megaphone", "calendar", "shield", "zap", "users", "message", "target", "rocket", "workflow", "mail", "phone", "clock", "search", "pen", "camera", "cart", "heart", "lightbulb"];
const BUILT_IN = {
  homeHero: (b) => ({ layout: pick(str(b.layout), ["visual-right", "visual-left", "centered"], "visual-right") }),
  homeServices: (b) => ({ layout: pick(str(b.layout), ["bento", "list"], "bento") }),
  homeShowcase: () => ({}),
  homeWhy: () => ({}),
  homeFlexible: () => ({}),
  homeProcess: (b) => ({ layout: pick(str(b.layout), ["side", "stacked"], "side") }),
  homeAi: () => ({}),
  homeFaq: (b) => ({ layout: pick(str(b.layout), ["side", "stacked"], "side") }),
};
const BLOCKS = {
  hero: (b, w) => ({ ...head(b, w), primary: normButton(b.primaryButton, w), secondary: normButton(b.secondaryButton, w),
    image: normImage(b.image, b.imageAlt, w), layout: pick(str(b.layout), ["image-right", "image-left", "centered"], "image-right") }),
  text: (b, w) => { claimsCheck(plain(b.body), w); return { ...head(b, w), body: sanitize(b.body) }; },
  cards: (b, w) => ({ ...head(b, w), columns: pick(str(b.columns), ["2", "3", "4"], "3"),
    items: arr(b.items).map((it, i) => {
      const where = `${w}, card ${i + 1}`; claimsCheck(`${str(it.title)} ${str(it.text)}`, where);
      return { icon: pick(str(it.icon), ICONS, ""), title: str(it.title), text: str(it.text), link: normButton({ label: it.linkLabel || "Learn more", link: it.link }, where) };
    }).filter((it) => it.title || it.text) }),
  imageText: (b, w) => { claimsCheck(plain(b.body), w); return { ...head(b, w), body: sanitize(b.body), image: normImage(b.image, b.imageAlt, w),
    side: pick(str(b.imageSide), ["left", "right"], "right"), button: normButton(b.button, w) }; },
  services: (b, w) => ({ ...head(b, w), layout: pick(str(b.layout), ["bento", "list"], "bento") }),
  faq: (b, w) => ({ ...head(b, w), layout: pick(str(b.layout), ["side", "stacked"], "side"),
    items: arr(b.items).map((it, i) => { claimsCheck(`${str(it.q)} ${str(it.a)}`, `${w}, question ${i + 1}`); return { q: str(it.q), a: str(it.a) }; }).filter((it) => it.q && it.a) }),
  cta: (b, w) => ({ ...head(b, w), primary: normButton(b.primaryButton, w), secondary: normButton(b.secondaryButton, w) }),
  highlights: (b, w) => ({ ...head(b, w), items: arr(b.items).map((it, i) => {
    const where = `${w}, highlight ${i + 1}`; let value = str(it.value); const source = str(it.source);
    if (/\d/.test(value) && !source) { warn(where, `"${value}" is a number with no source, so it was hidden. Add where the figure comes from (e.g. "Google Analytics, 2026") or use a word instead.`); value = ""; }
    claimsCheck(`${value} ${str(it.label)}`, where);
    return { value, label: str(it.label), source };
  }).filter((it) => it.value || it.label) }),
  gallery: (b, w) => ({ ...head(b, w), columns: pick(str(b.columns), ["2", "3", "4"], "3"),
    images: arr(b.images).map((it, i) => { const img = normImage(it.image, it.alt, `${w}, image ${i + 1}`); return img ? { ...img, caption: str(it.caption) } : null; }).filter(Boolean) }),
  contact: (b, w) => ({ ...head(b, w) }),
  spacer: (b) => ({ size: pick(str(b.size), ["small", "medium", "large"], "medium"), line: b.line === true }),
};
const BLOCK_LABEL = { hero: "Hero", text: "Text", cards: "Cards", imageText: "Image + text", services: "Services", faq: "FAQ", cta: "Call to action", highlights: "Highlights",
  gallery: "Gallery", contact: "Contact form", spacer: "Spacer", homeHero: "Home hero", homeServices: "Home services", homeShowcase: "See it in action", homeWhy: "Why us",
  homeFlexible: "One service or complete", homeProcess: "Process", homeAi: "AI offer", homeFaq: "Home FAQ" };

function normBlocks(list, where) {
  const out = [];
  arr(list).forEach((raw, i) => {
    const type = str(raw?.type);
    const w = `${where}, block ${i + 1} (${BLOCK_LABEL[type] ?? type ?? "?"})`;
    if (!raw || typeof raw !== "object") return;
    if (raw.hidden === true) return;
    const fn = BLOCKS[type] ?? BUILT_IN[type];
    if (!fn) { warn(w, `unknown block type "${type}" — skipped.`); return; }
    try {
      const data = fn(raw, w);
      const empty = type === "cards" ? !data.items.length : type === "faq" ? !data.items.length : type === "gallery" ? !data.images.length
        : type === "highlights" ? !data.items.length : type === "text" ? !plain(data.body).trim() && !data.title : type === "imageText" ? !data.image && !data.title
        : type === "hero" || type === "cta" ? !data.title : false;
      if (empty) { warn(w, "has no content yet, so it isn't shown."); return; }
      const dflt = type === "cta" ? "dark" : "auto";
      out.push({ type, key: `${type}-${i}`, style: style(raw.style ?? raw, dflt), ...data });
    } catch (e) { warn(w, `couldn't be read (${e.message}) — skipped.`); }
  });
  return out;
}

// ---------------------------------------------------------------- custom pages
const pagesDir = P("content/custom-pages");
const pageFiles = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json")).sort() : [];
const rawPages = pageFiles.map((f) => ({ file: f, data: readJson(`content/custom-pages/${f}`, {}) }));
const pagesOut = [];
const usedSlugs = new Set();
for (const { file, data } of rawPages) {
  const title = str(data.title) || file.replace(/\.json$/, "");
  const where = `Page "${title}"`;
  if (data.published === false) { note(`${where} is a draft — not published.`); continue; }
  let slug = slugify(data.slug) || slugify(title) || slugify(file.replace(/\.json$/, ""));
  if (str(data.slug) && slugify(data.slug) !== str(data.slug)) note(`${where}: address tidied to /${slug}/.`);
  if (RESERVED.has(slug)) { warn(where, `the address /${slug}/ is already used by the website — changed to /${slug}-page/.`); slug = `${slug}-page`; }
  let base = slug, n = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
  if (slug !== base) warn(where, `another page already uses /${base}/ — this one was published at /${slug}/.`);
  usedSlugs.add(slug);
  routes.add(`/${slug}/`);
  pagesOut.push({ file, slug, title, data });
}
const customPages = pagesOut.map(({ slug, title, data }) => {
  const where = `Page "${title}"`;
  const blocks = normBlocks(data.blocks, where);
  if (!blocks.length) warn(where, "has no visible blocks yet — it shows only a heading. Add blocks in the admin panel.");
  const seo = data.seo ?? {};
  return {
    slug, title, path: `/${slug}/`,
    seo: { title: str(seo.title) || title, description: str(seo.description), image: normImage(seo.image, title, `${where} (share image)`, { requireAlt: false }), hideFromSearch: seo.hideFromSearch === true },
    menu: { header: data.menu?.showInHeader === true, footer: data.menu?.showInFooter === true, label: str(data.menu?.label) || title },
    blocks,
  };
});

// ---------------------------------------------------------------- home layout
const DEFAULT_HOME = ["homeHero", "homeServices", "homeShowcase", "homeWhy", "homeFlexible", "homeProcess", "homeAi", "homeFaq"].map((type) => ({ type }));
const homeLayoutRaw = readJson("content/home-layout.json", { sections: DEFAULT_HOME });
let homeBlocks = normBlocks(homeLayoutRaw?.sections ?? DEFAULT_HOME, "Home layout");
const heroAt = homeBlocks.findIndex((b) => b.type === "homeHero" || b.type === "hero");
if (heroAt > 0) { warn("Home layout", "the hero must be the first section — it was moved to the top."); homeBlocks.unshift(...homeBlocks.splice(heroAt, 1)); }
if (!homeBlocks.length) { warn("Home layout", "every section is hidden — the default home page was used instead."); homeBlocks = normBlocks(DEFAULT_HOME, "Home layout"); }

// ---------------------------------------------------------------- navigation
const navRaw = readJson("content/navigation.json", {});
const DEFAULT_NAV = [{ label: "Home", link: "/" }, { label: "Services", link: "/services/", servicesMenu: true }, { label: "Work", link: "/work/" }, { label: "About", link: "/about/" }, { label: "Contact", link: "/contact/" }];
const navLinks = (list, where) => arr(list).map((l, i) => {
  const label = str(l?.label), href = normLink(l?.link, `${where}, link ${i + 1}`);
  if (!label && href) warn(`${where}, link ${i + 1}`, "has no text — skipped.");
  return label && href ? { label, href, ...(l?.servicesMenu ? { mega: "services" } : {}) } : null;
}).filter(Boolean);
let header = navLinks(navRaw.header?.links ?? DEFAULT_NAV, "Menu");
if (!header.length) { warn("Menu", "no working links — the default menu was used."); header = navLinks(DEFAULT_NAV, "Menu"); }
for (const p of customPages) if (p.menu.header && !header.some((l) => l.href === p.path)) header.push({ label: p.menu.label, href: p.path });
if (header.length > 7) note(`Menu: ${header.length} links — more than 7 can crowd the header on laptops.`);
const headerButton = normButton(navRaw.header?.button ?? { label: "Start a Project", link: "/contact/" }, "Menu button") ?? { label: "Start a Project", link: "/contact/" };
const f = navRaw.footer ?? {};
const footerCompany = navLinks(f.companyLinks ?? [{ label: "Work", link: "/work/" }, { label: "About", link: "/about/" }, { label: "Contact", link: "/contact/" }], "Footer company links");
for (const p of customPages) if (p.menu.footer && !footerCompany.some((l) => l.href === p.path)) footerCompany.push({ label: p.menu.label, href: p.path });
const navigation = {
  header, headerButton,
  footer: {
    servicesTitle: str(f.servicesTitle) || "Services",
    showServices: f.showServices !== false,
    servicesExtra: navLinks(f.servicesExtra ?? [{ label: "AI Solutions", link: "/ai-solutions/" }, { label: "Build your solution", link: "/contact/?type=solution" }], "Footer services links"),
    companyTitle: str(f.companyTitle) || "Company",
    company: footerCompany,
    contactTitle: str(f.contactTitle) || "Contact",
    showContact: f.showContact !== false,
    legal: navLinks(f.legalLinks ?? [{ label: "Privacy", link: "/legal/privacy/" }, { label: "Terms", link: "/legal/terms/" }, { label: "Cookies", link: "/legal/cookies/" }], "Footer legal links"),
    showWordmark: f.showWordmark !== false,
    showCta: f.showCta !== false,
  },
};

// ---------------------------------------------------------------- theme
const themeRaw = readJson("content/theme.json", {});
const pal = resolvePalette(themeRaw.colours ?? {});
pal.notes.forEach((m) => warn("Design & theme → Colours", m));

const fontsRaw = themeRaw.fonts ?? {};
const fontPick = (v, allowed, dflt, label) => { if (v && !allowed.includes(v)) warn("Design & theme → Fonts", `unknown ${label} font "${v}" — used the default.`); return allowed.includes(v) ? v : dflt; };
const fHead = fontPick(fontsRaw.headings, HEADING_FONTS, "geist", "headings");
const fBody = fontPick(fontsRaw.body, BODY_FONTS, "geist", "body");
const fAccent = fontPick(fontsRaw.accent, ACCENT_FONTS, "instrument-serif", "accent");

// Copy only the font files in use (latin + latin-ext) and build @font-face rules pointing at /fonts/theme/.
fs.rmSync(FONT_DIR, { recursive: true, force: true });
const fontFaces = []; const preload = [];
function useFont(key, italic) {
  const def = FONTS[key]; if (!def?.pkg) return;
  const dir = P("node_modules/@fontsource-variable", def.pkg);
  const cssFile = path.join(dir, italic ? "wght-italic.css" : "wght.css");
  if (!fs.existsSync(cssFile)) { warn("Design & theme → Fonts", `font files for ${def.label} are missing — the default font is shown instead.`); return; }
  const css = fs.readFileSync(cssFile, "utf8");
  for (const block of css.match(/@font-face\s*{[^}]+}/g) ?? []) {
    const file = block.match(/url\(\.\/files\/([^)]+)\)/)?.[1];
    if (!file || !/-latin(-ext)?-/.test(file)) continue;
    fs.mkdirSync(FONT_DIR, { recursive: true });
    fs.copyFileSync(path.join(dir, "files", file), path.join(FONT_DIR, file));
    fontFaces.push(block.replace(/url\(\.\/files\//, "url(/fonts/theme/"));
    if (/-latin-wght/.test(file) && !preload.includes(`/fonts/theme/${file}`)) preload.push(`/fonts/theme/${file}`);
  }
}
useFont(fHead, false); if (fBody !== fHead) useFont(fBody, false); if (fAccent !== "none") useFont(fAccent, true);

const H = FONTS[fHead];
const accentStack = fAccent === "none" ? "var(--theme-font-heading)" : stackOf(fAccent);

// Scales
const corners = pick(themeRaw.corners, Object.keys(SCALES.corners), "rounded");
const rs = SCALES.corners[corners];
const btnShape = pick(themeRaw.buttons?.shape, Object.keys(SCALES.buttonRadius), "pill");
const btnStyle = pick(themeRaw.buttons?.style, ["solid", "accent", "outline"], "solid");
const spacing = pick(themeRaw.spacing, Object.keys(SCALES.spacing), "comfortable");
const shadows = pick(themeRaw.shadows, Object.keys(SCALES.shadows), "standard");
const glass = pick(themeRaw.glass, Object.keys(SCALES.glass), "standard");
const motion = pick(themeRaw.animations, ["full", "subtle", "off"], "full");
const cursor = themeRaw.cursorEffect !== false && motion !== "off";

const px = (n) => `${Math.round(n * 10) / 10}px`;
const rootVars = {
  ...Object.fromEntries(Object.entries(pal.vars).map(([k, v]) => [`--c-${k}`, v])),
  "--theme-font-heading": stackOf(fHead),
  "--theme-font-body": stackOf(fBody),
  "--theme-font-accent": accentStack,
  "--heading-weight": String(H.weight ?? 560),
  "--heading-tracking": H.tracking ?? "-0.035em",
  "--accent-style": fAccent === "none" ? "normal" : "italic",
  "--accent-weight": fAccent === "none" ? "inherit" : "400",
  "--rs": String(rs),
  "--r-xs": px(6 * rs), "--r-sm": px(10 * rs), "--r-md": px(16 * rs), "--r-lg": px(24 * rs), "--r-xl": px(32 * rs), "--card-r": px(24 * rs),
  "--btn-r": SCALES.buttonRadius[btnShape],
  "--section-y": SCALES.spacing[spacing],
};
const sh = SCALES.shadows[shadows];
if (sh) Object.assign(rootVars, { "--shadow-card": sh[0], "--shadow-lift": sh[1] });
const g = SCALES.glass[glass];
if (g) rootVars["--glass-blur"] = g.blur;

let css = `/* GENERATED by scripts/prepare-content.mjs from content/theme.json — do not edit by hand. */\n`;
css += fontFaces.join("\n") + "\n";
css += `:root {\n${Object.entries(rootVars).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}\n`;
if (sh) css += `[data-theme="light"] { --glass-shadow: ${sh[2]}; }\n`;
if (shadows === "none") css += `.card, .device, .tone-inset[data-theme="dark"] { box-shadow: none !important; }\n`;
if (glass === "off") css += `.glass, .header-glass, .btn-glass, .glass-smoke { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }\n.glass, .header-glass { background: var(--bg) !important; }\n`;
else if (g) css += `.header-glass { -webkit-backdrop-filter: blur(${g.blur}) saturate(140%); backdrop-filter: blur(${g.blur}) saturate(140%); }\n`;
if (btnStyle === "accent") css += `.btn-primary, .btn-premium { background: var(--c-steel-text); color: #fff; box-shadow: none; }\n.btn-primary:hover, .btn-premium:hover { background: var(--c-deep); }\n[data-theme="dark"] .btn-primary, [data-theme="dark"] .btn-premium { background: var(--c-steel-light); color: var(--c-ink); }\n[data-theme="dark"] .btn-primary:hover, [data-theme="dark"] .btn-premium:hover { background: var(--c-stone); }\n`;
if (btnStyle === "outline") css += `.btn-primary, .btn-premium { background: transparent; color: var(--text); box-shadow: inset 0 0 0 1.5px currentColor; }\n.btn-primary:hover, .btn-premium:hover { background: var(--surface-strong); }\n[data-theme="dark"] .btn-primary, [data-theme="dark"] .btn-premium { background: transparent; color: var(--text); }\n[data-theme="dark"] .btn-primary:hover, [data-theme="dark"] .btn-premium:hover { background: var(--surface-strong); }\n`;
if (motion === "subtle") css += `.aurora i, .marquee, .orbit, .traveller, .pulse { animation: none !important; }\n.drift { transition: none !important; transform: none !important; }\n.io-reveal { transform: translateY(8px); transition-duration: 500ms; }\n.card-hover:hover, .lift:hover { transform: none; }\n`;
if (motion === "off") css += `*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }\n.io-reveal, .reveal-fade, .reveal-line, .hero-msg, .split-line > span { opacity: 1 !important; transform: none !important; filter: none !important; }\n.spotlight { display: none !important; }\n`;

const logo = normImage(themeRaw.brand?.logo, settings?.brand ?? "Logo", "Design & theme → Logo", { requireAlt: false });
const logoOnDark = normImage(themeRaw.brand?.logoOnDark, settings?.brand ?? "Logo", "Design & theme → Logo on dark", { requireAlt: false });
const favicon = normImage(themeRaw.brand?.favicon, "", "Design & theme → Favicon", { requireAlt: false });
const shareImage = normImage(themeRaw.brand?.shareImage, "", "Design & theme → Social share image", { requireAlt: false });
if (favicon && favicon.width && (favicon.width !== favicon.height)) note("Favicon isn't square — browsers may squash it. A 512×512 PNG or an SVG works best.");
if (shareImage && shareImage.width && Math.abs(shareImage.width / shareImage.height - 1.91) > 0.25) note("Social share image works best at 1200×630.");
const logoHeight = Math.min(64, Math.max(20, Number(themeRaw.brand?.logoHeight) || 32));

const theme = {
  preset: pal.preset, presetLabel: PRESETS[pal.preset]?.label ?? "Custom", background: pal.vars.stone,
  fonts: { heading: fHead, body: fBody, accent: fAccent }, preload,
  corners, buttons: { shape: btnShape, style: btnStyle }, spacing, shadows, glass, motion, cursor,
  brand: { logo, logoOnDark, logoHeight, favicon, shareImage }, checks: pal.checks,
};

// ---------------------------------------------------------------- write
if (report.errors.length) {
  printReport();
  console.error("\n✖ Content check failed — the website was NOT rebuilt (the live site keeps the previous version).\n");
  process.exit(1);
}
fs.mkdirSync(OUT_JSON, { recursive: true });
const write = (name, data) => fs.writeFileSync(path.join(OUT_JSON, name), JSON.stringify(data, null, 2) + "\n");
write("theme.json", theme);
write("home-layout.json", { blocks: homeBlocks });
write("custom-pages.json", { pages: customPages });
write("navigation.json", navigation);
fs.writeFileSync(OUT_CSS, css);
printReport();

function printReport() {
  const lines = [];
  lines.push(`## Website content check`);
  lines.push(report.errors.length ? `❌ **${report.errors.length} problem(s) stopped the update** — the live website was not changed.` : `✅ Content OK — ${customPages.length} extra page(s), ${homeBlocks.length} home sections, theme: ${PRESETS[pal.preset]?.label ?? "Custom colours"}.`);
  if (report.errors.length) lines.push("", "### Must fix", ...report.errors.map((e) => `- ${e}`));
  if (report.warnings.length) lines.push("", "### Fixed or skipped automatically", ...report.warnings.map((e) => `- ${e}`));
  if (report.notes.length) lines.push("", "### Notes", ...report.notes.map((e) => `- ${e}`));
  lines.push("", "### Colour contrast", "| Pair | Ratio | Result |", "|---|---|---|", ...pal.checks.map((c) => `| ${c.label} | ${c.ratio}:1 | ${c.ratio >= 7 ? "AAA" : c.ratio >= 4.5 ? "AA" : "low"} |`));
  const md = lines.join("\n");
  console.log(md.replace(/\*\*/g, ""));
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");
  if (process.env.GITHUB_ACTIONS) for (const w of report.warnings) console.log(`::warning title=Website content::${w.replace(/\*\*/g, "")}`);
}
