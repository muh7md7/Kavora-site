# Editing the Keelbiz website (no code)

## Start
1. Open https://app.pagescms.org → **Sign in with GitHub**.
2. Pick **muh7md7/Kavora-site** (branch **main**).
3. Choose a section in the left menu, edit, click **Save**.
4. The site rebuilds and goes live in about 2–3 minutes.

## What each menu item does

| Menu | What you change |
|---|---|
| 🎨 **Design & theme** | Colours, fonts, corners, buttons, spacing, shadows, glass, animations, cursor, logo, favicon, share image |
| 🧱 **Home page layout** | Order, show/hide, background and layout of home sections. Add your own blocks too |
| 📄 **Pages (page builder)** | Create new pages from blocks |
| 🧭 **Menu & footer** | Top menu links + button, footer columns and links |
| 🏠 Home page texts · 🧩 Services · 🔁 Process, reasons & FAQ · 🤖 AI offer · 📝 Built-in page texts · ⚖️ Legal · ⚙️ Business details | Words on the existing pages |

## 🎨 Design & theme
- **Colour scheme** — pick a preset. All presets are tested for readability.
- **Custom colours** — choose *Custom colours*, then fill hex codes (e.g. `#233845`). Empty = keeps the Stone & Steel colour.
  Too-dark backgrounds or hard-to-read text are **corrected automatically**.
- **Fonts** — headings, body text, and the italic **accent word** style.
- **Corners / Buttons / Spacing / Shadows / Glass** — pick a level.
- **Animations** — Full, Subtle or Off. Visitors who turn on "reduce motion" on their device always get none.
- **Brand files** — upload logo (transparent PNG or SVG), optional light logo for dark areas, favicon (square 512×512), share image (1200×630).
  No dark-area logo? The main logo shows as a white silhouette on dark backgrounds.

## 🧱 Home page layout
- Drag sections to reorder. **Hide this section** = hidden, not deleted.
- **★ sections** are the original designed sections. Their words live in 🏠 Home page texts (and Process/FAQ, AI offer).
- Each has **Background**: Automatic, Light stone, Soft mist, Warm stone, Deep blue.
- Layouts: Hero (text left / demo left / centred), Services (bento / list), Process and FAQ (side / stacked).
- You can add any page-builder block (e.g. a Call to action) between sections.
- The hero always stays first.

## 📄 Pages (page builder)
1. **Add an entry**. Fill **Page title** and **Page address** (e.g. `pricing` → `/pricing/`).
2. Add **Page sections** (blocks), drag to reorder.
3. **Menu & footer** → tick to add the page to the top menu or footer.
4. **Google & sharing** → title, description, share image, or hide from Google.
5. **Published** off = draft (not on the site).

Blocks: Hero · Text · Cards grid · Image + text · Services · FAQ · Call to action · Highlights · Gallery · Contact form · Spacer, plus the ★ home sections.
Every block has **Look**: background, text alignment, width.
If the first block isn't a Hero, the page title is shown at the top automatically.
Published pages are added to the sitemap automatically (unless hidden from Google).

## 🖼️ Images
- Upload in any image field (they go to the media library, `public/uploads`).
- **Alt text is required** — a short description of the image. Images without it are not shown.
- Use JPG/WebP for photos, under ~400 KB. Images from other websites are not allowed (security) — upload them.

## Links
- Pages on this site: `/contact/`, `/services/`, `/pricing/` …
- Other sites: full link starting `https://`. Email: `mailto:you@…`, phone: `tel:+971…`.
- A link to a page that doesn't exist is removed automatically when publishing.

## Safety rules (automatic)
- An edit can't take the site down. Problems are **fixed or skipped**, and the rest publishes.
- Exactly **5 services** (each has a fixed page address).
- **Honest claims**: numbers in Highlights only show with a source. Words like "guaranteed", "#1", "award-winning", "500+ clients" trigger a warning — only publish what you can prove.
- Colours are checked for readable contrast (WCAG AA) and adjusted if needed.

## Did my change publish? What was fixed?
GitHub → repo → **Actions** → latest **Publish website** run → **Summary**.
- ✅ green = live. The summary lists anything fixed or skipped (e.g. "image has no alt text") and the colour contrast table.
- ❌ red = nothing changed on the live site (it keeps the last good version). The summary says what to fix — usually undo the last edit.

## How it works (for developers)
Pages CMS commits JSON to `content/` on `main` → `.github/workflows/publish.yml` runs `npm run build`.
`prebuild` runs `scripts/prepare-content.mjs`: validates content and writes `src/styles/theme.generated.css`, `src/content/generated/*.json` and `public/fonts/theme/` (all git-ignored).
Components read colours only through `--c-*` CSS variables (`src/styles/tokens.css` holds the Stone & Steel defaults).
Blocks render in `src/components/blocks/Blocks.tsx`; custom pages route through `src/app/[page]/page.tsx`.
The build is pushed to the `deploy` branch and `/api/publish.php` installs it (server-only `api/config.php` and `api/_data` are never touched).
When the domain changes, set the repository variable `PUBLISH_HOOK_URL` to `https://<new-domain>/api/publish.php`.
