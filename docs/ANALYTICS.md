# Analytics (privacy-first, off by default)

`site.features.analytics = false`. When enabled, add the Plausible or Umami script tag in `src/app/layout.tsx` and allow its origin in the CSP (`script-src`, `connect-src`).
Events already emitted by the UI (window CustomEvents / data attributes — wire to the analytics call):
- `kb:enquiry-submitted` — only after the server returns ok
- `kb:lab-code-copied` (detail: filename)
- `[data-event="email_click"]`, `[data-event="whatsapp_click"]`
- Service selected (form `select[name=service]` change), primary CTA click (`.btn-primary`), case study opened (Work cards) — add listeners when analytics is turned on.
Meta Pixel: only with consent and only if ads require it. Not installed.
