# Keelbiz design system — v2 "Steel & Paper"

v1 ("Light Glass", navy/sage/champagne, Barlow Condensed) is preserved on branch `legacy-light-glass-v1`; v1 brand assets in `public/brand/legacy/`.

## Direction
Premium minimalist luxury. Off-white paper, charcoal, muted steel-blue. Light and dark sections alternate; subtle radial gradients only. No neon, purple, shine or futuristic effects.

## Palette (`src/styles/tokens.css`)
| Token | HEX | Role | Contrast |
|---|---|---|---|
| paper | #F4F3EF | Light base | — |
| paper-2 | #EBEAE5 | Alt light section | — |
| charcoal | #17191C | Dark sections, primary button | — |
| text (light) | #1B1D21 | Body/headings | 15.6:1 on paper |
| text-2 (light) | #565B64 | Secondary | 6.4:1 on paper |
| steel | #4C6680 | Accent word, premium button, focus | white 5.9:1 |
| steel-deep | #3A5068 | Hover | white 8.1:1 |
| steel-light | #A3B6C8 | Accent on charcoal | 8.6:1 on charcoal |
| text (dark) | #EEF0F2 | On charcoal | 16:1 |
| text-2 (dark) | #A4ABB4 | On charcoal | 7.9:1 |
| moss / rust | #4E7A63 / #A8473F | Data up / down only | — |

Theming: every section sets `data-theme="light|dark"`; tokens re-map, so components need no variants. The header reads the theme under it and flips.

## Type
Geist (display + UI, 560 weight, −0.035em), Instrument Serif italic for one accent word per headline, Geist Mono for eyebrows/numbers. All self-hosted WOFF2 (OFL).

## Signature components
Floating full-glass header (all links visible, Services + Lab mega menus, adaptive tone, hide-on-scroll, progress hairline) · full-screen mobile menu · cursor system (dot + eased ring, labels via `data-cursor`) · editorial service index · orbit loop diagram · scroll-linked process timeline · CSS reveals (fade/rise/blur) · marquee · oversized outline wordmark.

## Logo
`src/components/brand/Logo.tsx` + `public/brand/keelbiz-mark.svg`: a K whose lower arm sweeps like a keel line, anchored by a short steel baseline. Wordmark: lowercase "keelbiz", Geist 620, −0.045em.

## Rhythm (Home)
light hero → dark loop → light services → dark automation → light process → dark lab → light why → light-alt FAQ → dark CTA/footer.
