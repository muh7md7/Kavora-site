# Keelbiz Design System — v5

Live reference: `/design-system/` (noindex, disallowed in robots.txt, not in sitemap).
Branch: `v5-redesign`. Supersedes the type/spacing parts of `DESIGN.md`; palette and content rules there still apply.

## 1. Hard rules
- **Palette only:** `#F7F8F6` off-white · `#E9EDF0` mist · `#B8C9D2` steel blue · `#28353D` graphite · `#11191E` charcoal, plus opacity variants. Derived text tones (`#1B252C`, `#5A6A73`, `#4F6673`, `#9AA8B0`) exist only for WCAG contrast. Errors use `#9B4A42`.
- No neon, purple, pink, glow.
- **Copy:** location-neutral. No invented clients, logos, stats, reviews or prices. Use `<Placeholder>`, `<StatCounter>` without `value`, or the `[PLACEHOLDER]` label. Demos carry a **Sample data** badge (`<DemoShell>`).
- **Motion:** transform + opacity only. `prefers-reduced-motion` → static. No CLS. Lighthouse mobile ≥ 95.
- No two pages share the same section order.

## 2. Tokens (`src/styles/tokens.css`, v5 block)

### Type
| Token | Value | Use |
|---|---|---|
| `--fs-display` | clamp(56px, 8vw, 128px) · lh .95 · ls −.045em | `.display` hero headlines |
| `--fs-h1` | clamp(44px, 6.5vw, 96px) · lh .98 | page H1 |
| `--fs-h2` | clamp(36px, 4.6vw, 68px) · lh 1.02 · ls −.03em | section H2 |
| `--fs-h3` | clamp(22px, 2vw, 30px) | card titles |
| `--fs-lead` | 20–22px | `.lead` |
| `--fs-body` | 17px · lh 1.6 | body |
| `--fs-eyebrow` | Geist Mono 12px · uppercase · ls .14em | `.eyebrow` |

Fonts: Geist Sans (preloaded, the LCP font), Geist Mono and Instrument Serif italic (`swap`, not preloaded). **One italic-serif accent word per heading, max** (`.accent` / `accent` prop).

### Spacing — 8-pt
`--s-1` 8 · `--s-2` 16 · `--s-3` 24 · `--s-4` 32 · `--s-5` 40 · `--s-6` 48 · `--s-8` 64 · `--s-10` 80 · `--s-12` 96 · `--s-16` 128 · `--s-20` 160.

Section padding by role, never one value everywhere:
| Class | Padding |
|---|---|
| `.section-hero` | top clamp(140px, 16vw, 220px), bottom = major |
| `.section-major` (`.section`) | clamp(96px, 10vw, 160px) |
| `.section-strip` | 48–64px (proof strips, logo rows, stat bars) |

### Grid
`.container` max 1320px. `.grid-12` = 12 columns, gutters 24px (≥768) / 16px.

### Radius & borders
Cards `--r-card` 24px · inner `--r-inner` 14px · pills 999px.
Borders: `--border` = graphite 8% on light, white 8% on dark. `--border-strong` = 16%.

### Elevation (charcoal-tinted, soft and wide, never grey-black)
`--elev-1` resting cards · `--elev-2` hover/popovers · `--elev-3` device frames/modals. Utilities: `.elev-1/2/3`. Dark scope re-maps to deeper charcoal.

### Surfaces
- `.card`: 24px, hairline, elev-1.
- `.panel`: glass panel, backdrop-blur 20px, white 60% (light) / charcoal 60% (dark). Falls back to solid when blur is unsupported or reduced transparency is requested.
- `.grain`: 2.5% noise for dark sections and cards.
- `.spot`: radial steel spotlight (position via `--spx/--spy`).
- `data-spot`: cursor-follow spotlight on cards (driven by `Cursor.tsx`).
- Theming: wrap sections in `<Tone tone="light|dark">`. Every token re-maps under `[data-theme]`.

## 3. Components (`src/components/ui`, import from `@/components/ui`)
| Component | Notes |
|---|---|
| `Button` | `primary · secondary · ghost · icon`, sizes `sm/md/lg`. Fill wipes up on hover, arrow nudges (`arrow="up" \| "right" \| false`), primary is magnetic (≤4px, fine pointers). Works as a link (`href`) or a button. |
| `SelectCard` | Icon, title and description. `multi` → checkbox, otherwise radio (parent provides `radiogroup`/`group`). Checked state: SVG check draws, card lifts 2px. |
| `Chip` | Static label (`dot`, `mono`) or toggle (`onToggle` → `aria-pressed`). |
| `Tabs` | Sliding pill indicator (shared layout), APG keyboard (arrows, Home/End). Variants: `segmented`, `top`, `dock`. |
| `Accordion` | Single-open disclosure. Opens instantly; content fades and rises (no height animation). |
| `Toggle` | `role="switch"`, 44px target. |
| `StatCounter` | Count-up on view, tabular figures with reserved width (no CLS). **No `value` → shows `[PLACEHOLDER]`.** |
| `DeviceFrame` | `browser` 16:10 · `tablet` 4:3 · `phone` 9:19.5, all built in code. |
| `Marquee` | CSS loop; pauses on hover; duplicate copy is `aria-hidden`; static under reduced motion. |
| `BentoCard` | 24px card with spotlight and hover lift (elev-2). Optional `visual`, `href`, `tone="dark"` (adds grain). |
| `SectionHeader` | Eyebrow → H2 (masked word reveal, accent, optional underline draw) → lead. |
| `Placeholder` | Fixed-ratio image slot labelled `[PLACEHOLDER] …`. |
| `DemoShell` | Wrapper for every live demo: Sample data badge, pause/play (WCAG 2.2.2), auto-pause off-screen. Render-prop `running` for JS loops; CSS loops pause via `[data-paused]`. |
| `MiniPreview` (`components/demos`) | 5 tiny looping service previews (website, social, ads, chat, dashboard). Used in the mega-menu and as static first frames. |

## 4. Motion system
**One system: Motion (framer-motion) + `useScroll`, plus CSS.** No Lenis or GSAP. Native scroll keeps accessibility, find-in-page and Lighthouse intact.

| Token | Value |
|---|---|
| Ease | `cubic-bezier(.22,1,.36,1)` (`--ease`, `easeOut`) |
| Micro | 0.35s (`--t-micro`) |
| Reveal | 0.7s (`--t-reveal`) |
| Hero | 1.1s (`--t-hero`) |
| Stagger | 70ms (word stagger in headlines: 45ms) |

Primitives (`src/components/motion`):
- `SplitHeading`: masked word reveal (reads as a line reveal at any width). `accent` sets the italic word and `underline` draws a line under it. `auto` = above-the-fold, plays via CSS keyframes on first paint (no hydration wait). The full sentence goes to screen readers via `aria-label`.
- `Reveal`: fade + 24px rise. `variant="clip"` = image reveal (clip-path inset + inner scale 1.06 → 1). Triggers when the element's top reaches 85% of the viewport. `auto` for above-the-fold.
- `CountUp`: Motion `animate`, reduced motion → final value.
- `Parallax`: ±40px `useScroll` transform. **Hero visuals only.**
- `PageTransition`: 0.4s charcoal overlay (scaleY) on client navigations; skipped on first load so LCP is never covered.
- `useInViewOnce`, `useVisible`, `usePrefersReducedMotion`.

Rules:
- Nothing above the fold waits for JS. Use `auto` variants there; `html.js` gates start states, so content is visible without JS.
- Never blank for more than 0.3s. Demos render a static first frame (`MiniPreview` or a server-rendered state), then hydrate (`dynamic(..., { ssr: false })` + skeleton).
- Desktop only: pinned/scrubbed storytelling, horizontal scroll, parallax. Mobile stacks.
- Reduced motion: reveals, word masks, marquee, mini previews and the page overlay are all static (CSS media query + `useReducedMotion`).
- Motion is not loaded globally: only components that need it import `motion/react`, which keeps it out of the shared bundle.

### Nav
Transparent at top. Frosted glass after 40px (`.is-top` → `.is-scrolled`). Hides on scroll-down, returns on scroll-up. Sliding active/hover pill. Scroll-progress hairline. Services mega-menu: 5 services with icon and one line, plus a live **mini preview** of the hovered or focused service. Adapts its tone to the section beneath.

### Cursor
Dot and ring. Label via `data-cursor="View"`. Magnetic via `data-magnetic`. Spotlight via `data-spot`. Fine pointers only; off for touch and reduced motion.

## 5. Imagery
- Visuals are built in code: device frames, dashboards, phones, workflows, all in palette. No stock.
- Real assets later: `<Placeholder ratio=…>` now, then `next/image` with `placeholder="blur"`. The site is a static export (`images.unoptimized`), so export AVIF/WebP at build time (`sharp`) and pass `blurDataURL`.
- Required slots: founder photo 4:5 · case-study screenshots 16:10 · client logos (SVG, ~3:1) · social posts 1:1 / 4:5.

## 6. Accessibility
- Focus ring: 2px steel (`--accent`: `#4F6673` on light for 3:1 non-text contrast, `#B8C9D2` on dark), offset 3px.
- Tap targets ≥ 44px. SelectCards use radio/checkbox roles. Demos are pausable. Decorative previews are `aria-hidden`.

## 7. Files
`src/styles/tokens.css` (v5 block) · `src/app/globals.css` (v5 component layer) · `src/lib/motion.ts` · `src/components/ui/*` · `src/components/motion/*` · `src/components/demos/MiniPreview.tsx` · `src/app/design-system/*`.
