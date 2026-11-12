# Content engine — Lab → Reels

Each Glass Kit component has a capture frame: `/lab/capture/<slug>/`.
Options: `?theme=light|dark` · `&bg=interior-1|abstract-1` · `&title=Glass Navbar` · `&tag=V2`.
Slugs: navbar, mobile-sheet, sidebar, tabs, stat-card, gauge, checkout, code-window, workflow, buttons.

## Recording
1. `npm run dev`, open the capture URL in Chrome at 100% zoom with a 1080×1920 viewport (DevTools device toolbar → custom 1080×1920), or record the scaled preview with OBS and upscale.
2. The scripted cursor runs the JSON timeline in `src/lab/timelines/<slug>.json` (steps: move / hover / click / wait). Edit the JSON to change the choreography; `duration` sets total length; the end card plays for the last 2.5s.
3. Export 1080×1920, 30fps. No audio is generated — add licensed music in the editor only (log licence in ASSETS.md).
4. Captions: short, keyword-focused, 3–5 hashtags, alt text on the cover.

Capture URLs are `noindex` and excluded in robots.txt.
