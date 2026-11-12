# Design rationale — Light Glass / Royal Estate

| Reference DNA (reels) | Decision here | Purpose |
|---|---|---|
| Frosted floating pills, sidebars, tabs, dashboards | `.glass` material: 62% white, 20px blur (12px mobile), hairline + inner top highlight, navy-tinted shadow | Premium, legible on light backgrounds; glass only on floating layers (§4 governance) |
| Dim lamp-lit rooms | Flipped to sunlit interiors with ivory wash; midnight only for final CTA/footer | Light-first = trust + calm; one deep moment keeps contrast |
| Orange accent word in condensed titles | Champagne accent word (≥24px only), Barlow Condensed 600–700 | Echoes the reels, maps to "light" motif; never small text (3.1:1) |
| Cursor microinteractions | Sliding `layoutId` pill, −4px lift, rail↔panel, card flip, connector pulse | Motion explains state; transform/opacity only |
| macOS code window | Code Window shows the component's real source | Craft signal that is literally true |

Palette, contrast and ratios: see `src/styles/tokens.css` and brief §2.3. Checked pairs: ink/ivory 16:1, slate/ivory 5.7:1, navy/ivory 10.4:1, white/navy 11:1, ivory/midnight 14:1, champagne-light/midnight 8.8:1, champagne/ivory 3.1:1 (large/decoration only).
Glass case: ink on `.glass` over the brightest part of `interior-1` (≈#FBFAF6 behind 62% white) ≈ 15:1; slate ≈ 5.4:1 — AA. Re-test when real photos replace the generated backdrops.

Type scale (fluid, `clamp`): display 2.6–6rem · h1 2.25–4.25 · h2 1.9–3.25 · h3 1.4–2 · lead 1.05–1.25 · body 1–1.125 · small .875 · caption .75.
