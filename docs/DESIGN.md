# Keelbiz design system — v3 (approved five-colour palette)

v1 ("Light Glass", navy/sage/champagne, Barlow Condensed) is preserved on branch `legacy-light-glass-v1`; v1 brand assets in `public/brand/legacy/`.

## Direction
Premium minimalist luxury. Off-white paper, charcoal, muted steel-blue. Light and dark sections alternate; subtle radial gradients only. No neon, purple, shine or futuristic effects.

## Palette (`src/styles/tokens.css`) — five approved colours + derived tones
| Colour | HEX | Role |
|---|---|---|
| Off-white | #F7F8F6 | Main light backgrounds |
| Mist grey | #E9EDF0 | Secondary surfaces, alt sections |
| Steel blue | #B8C9D2 | Accents and gradients (decoration on light; accent text on dark, 10.4:1 on charcoal) |
| Graphite | #28353D | Primary buttons, logo, dark components (soft white on graphite 11.8:1) |
| Deep charcoal | #11191E | Dark sections |
Derived: text #1B252C (14.6:1 on off-white), text-2 #5A6A73 (5.3:1 off-white / 4.8:1 mist), steel accent text #4F6673 (5.7:1), dark text-2 #9AA8B0 (7.3:1). Errors only: #9B4A42.

Theming: every section sets `data-theme="light|dark"`; tokens re-map, so components need no variants. The header reads the theme under it and flips.

## Type
Geist (display + UI, 560 weight, −0.035em), Instrument Serif italic for one accent word per headline, Geist Mono for eyebrows/numbers. All self-hosted WOFF2 (OFL).

## Signature components
Floating full-glass header (all links visible, Services mega menu only — Lab is a plain link, adaptive tone, hide-on-scroll, progress hairline) · full-screen mobile menu · cursor system (dot + eased ring, labels via `data-cursor`) · editorial service index · orbit loop diagram · scroll-linked process timeline · CSS reveals (fade/rise/blur) · marquee · oversized outline wordmark.

## Logo
`src/components/brand/Logo.tsx` + `public/brand/keelbiz-mark.svg`: a K whose lower arm sweeps like a keel line, anchored by a short steel baseline. Wordmark: lowercase "keelbiz", Geist 620, −0.045em.

## Rhythm (Home)
light hero → light services → dark "one service or a complete solution" → mist process → dark AI offer → light why → dark Lab → mist FAQ → dark CTA/footer.

## Information architecture
Five services (Website Design & Development · Social Media Management · Digital Advertising — Meta & Google Ads · AI Agents & Automation · Business Dashboards & Systems) + AI Solutions (ready-made / custom agents / custom automation, enquiry only). Lab is a separate destination for working experiments and clearly labelled concepts — never a service, product or package. Service pages show an "Example" (illustrative, sample data); the Website page shows a genuine responsive preview (`WebsitePreview`, container-query driven) instead of the former checkout demo.

## Content rules
Location-neutral (no countries/cities/regions in copy, metadata or JSON-LD). Services offered individually or combined; AI offered three ways (ready-made, custom, automation) with enquiry/quote — no checkout, no public prices, no invented availability. Unconfirmed contact details are empty strings and never rendered. Third-party costs (ad spend, hosting, AI usage, messaging) are disclosed via `thirdPartyNote`.
