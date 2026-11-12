Act as a senior studio team: Creative Director, Brand/Identity Designer, Product UI & Interaction Designer, Motion Designer, Senior Frontend (React/TypeScript) Engineer, Backend/Integrations Engineer, CRO Specialist, Technical SEO, Performance Engineer, Accessibility Specialist, Security Engineer, QA Engineer.

Design and build a complete, production-ready, premium agency website that:

Sells the agency's services to international businesses.
Proves the craft on the page. The site's own interface (navbar, menus, demos, dashboards) is the portfolio piece.
Feeds the agency's social channels through a reusable component Lab built for screen-recording reels.

Design philosophy: Light Glass. Quiet luxury, crafted interfaces, real light. Light-first: frosted white glass over sunlit architectural interiors, an ivory base, and a navy + sage + champagne brand trio. Bright and airy, never stark white and never heavy black. Restraint everywhere else.

Every decision needs a stated purpose. Flag missing information. Never invent it.

1. BUSINESS INPUTS (configurable — mark anything missing)
Field	Value
Brand name	Keelbiz
Domain	[TO CONFIRM — not purchased yet]
Type	Global digital growth & business technology agency
Market	Startups, founders, SMEs and established brands worldwide; strong presence in UAE / GCC and Pakistan
Positioning line	"We build your online presence, grow your business, and automate the work behind it."
Contact email / phone / WhatsApp	[REAL DETAILS ONLY]
Social handles	[REAL HANDLES ONLY]
Portfolio assets	[LIST REAL PROJECTS + PERMISSION STATUS]
Services (one connected growth ecosystem, not five silos)
Website Design & Development: business/corporate sites, landing pages, redesigns, responsive builds, CRO-led UX, maintenance.
Social Media Management: strategy, content planning, creative design, Reels/short-form, captions, scheduling, brand consistency, reporting.
Digital Advertising (Meta): Facebook/Instagram campaign planning and setup, creative, audiences, optimization, reporting.
AI Agents & Business Automation: AI enquiry handling, lead qualification, automated follow-ups, sales/CS workflows, process automation, custom AI integrations (n8n-based where suitable).
Business Dashboards & Digital Systems: management dashboards, CRMs, order/project tracking, invoicing, internal tools.
(Optional module, off by default:) [AI model subscription plans]. Build it as a feature-flagged pricing/plan page. Ship it only if the business confirms the offer and its terms.

Show the services as a flywheel: Attract (Social + Ads) → Convert (Website) → Automate (AI Agents) → Manage (Dashboards) → back to Attract. This loop is the core brand story.

Never promise guaranteed results, revenue or ROI.

2. CREATIVE DIRECTION — "LIGHT GLASS"
2.1 Reference DNA (from the reels; reinterpret, never copy)
Frosted floating surfaces: pill navbars, collapsible sidebars, tab bars, dashboards, checkout panels. Translucent, blurred, with hairline borders and a soft inner top highlight.
Warm real-world backdrops: dim, lamp-lit living rooms with walnut wood, plants and soft daylight. Also monochrome abstract 3D folds (the black-and-white wave in the navbar reel).
Condensed display type + accent word: (orange in the reels; here a champagne accent word on large headlines), e.g. "Glassy Navbar UI", "Admin Dashboard V7".
Cursor-driven microinteractions: sliding active pill, hover lift, rail-to-panel expand, tooltips, badges, a card that flips into a "Securing your payment" state.
Editorial frame: generous negative space and a macOS-style code window as a craft signal. v2 flips the reels' black frame to soft ivory for a lighter, more premium feel.
2.2 Brand personality

Premium · intelligent · trustworthy · precise · confident · international · calm. Not loud, not neon, not sci-fi.

2.3 Color system: "Royal Estate" (light-first, three colors; tokens; HEX)

Concept: Navy = trust and intelligence (AI, systems). Sage = growth (social, ads). Champagne = premium (GCC luxury, the "Nur"/light idea). Everything sits on a soft ivory base.

Neutrals

Token	HEX	Role
--ivory	
#F8F7F3	Page base (soft, never pure white)
--pearl	
#EFEEE8	Alternate section background
--mist	
#DEDCD3	Borders, dividers, input outlines
--ink	
#141B2D	Headings and body text (navy-black, 16:1 on ivory)
--slate	
#5A6275	Secondary text (5.7:1 on ivory, 5.3:1 on pearl)

Brand trio

Token	HEX	Role	Contrast
--navy	
#1F3A6E	Primary (~25%): nav, heading accents, primary buttons, links, focus ring	White on navy 11:1 · navy on ivory 10.4:1
--navy-hover	
#172C55	Hover/pressed	White 13.7:1
--navy-tint	
#E3E8F2	Selected states, soft panels	Navy text on it 9:1
--sage	
#3F6B54	Support (~10%): growth badges, positive data, service icons, secondary links	5.7:1 on ivory (text-safe)
--sage-tint	
#E1EAE4	Badge and chip backgrounds	—
--champagne	
#A8874E	Highlight (~5%): accent word in headlines (large only), hairlines, logo detail, premium-plan marker	3.1:1. Large text (≥24px) and decoration only, never small text
--champagne-light	
#D9C39A	Accent words and lines on midnight	8.8:1 on midnight
--champagne-tint	
#F2EADB	Premium highlight backgrounds	—
--midnight	
#14254A	The only deep surface: final CTA band and footer	Ivory on it 14:1

Data colors (dashboards): up --sage #3F6B54, down 
#B4232A, neutral --slate, series 2 --champagne.

Rules

Ratio: about 60% ivory/pearl, 25% navy, 10% sage, 5% champagne. Never let sage or champagne compete with navy for the main action.
One primary action color: navy. Sage is never used for a primary CTA. Champagne buttons (if used, e.g. "Premium plan") use --midnight text (4.5:1).
Champagne is for large accent words, 1px lines, icons and logo details only. Never body text or small labels on light backgrounds.
The site is ~85% light (ivory/pearl), with midnight only for the final CTA and footer. No black sections.
No purple AI gradients, no neon, no rainbow glows. The only glow is a soft champagne light bloom (
#F2EADB at 40–60%) behind key UI. This is the "Nur" (light) motif.
2.4 Glass material tokens
css
/* Primary: light frosted glass */
--glass-bg: rgba(255,255,255,.62);
--glass-border: rgba(255,255,255,.75);
--glass-edge: rgba(28,26,23,.06);      /* outer hairline so glass reads on light bg */
--glass-blur: 20px;                    /* mobile: 12px */
--glass-saturate: 150%;
--glass-highlight: inset 0 1px 0 rgba(255,255,255,.9);
--glass-shadow: 0 24px 60px -24px rgba(20,37,74,.14);  /* soft navy-tinted shadow */
/* Secondary: smoked glass, only over darker photo areas */
--glass-smoke-bg: rgba(20,37,74,.55);   /* midnight glass */
--glass-smoke-border: rgba(255,255,255,.12);
2.5 Typography
Role	Typeface	Notes
Display / hero / section titles	Barlow Condensed 600–700 (OFL)	Echoes the reel titles. Tight leading 0.95–1.05, tracking −0.5%.
UI / body / nav / forms	Geist (or Inter) 400–600	Body 16–18px, line-height 1.6, max 68ch
Code windows / data labels	Geist Mono (or JetBrains Mono)	Syntax-highlighted code cards
Fluid scale with clamp(), from display down to caption. Mobile hero headline must stay at or under about 3 lines at 320px.
Accent-word pattern: one word per headline may be champagne (large display sizes only) or navy (e.g. "Smarter Growth."). Use it at most once per section.
Self-host fonts as WOFF2 subsets with font-display: swap, preload the display face only, and use size-adjusted fallbacks so text doesn't shift.
2.6 Layout, spacing, shape
8-pt spacing scale. 12-column grid, max content width 1280px, editorial text column 680px.
Radius tokens: --r-sm 10px (inputs, chips), --r-md 16px (cards), --r-lg 24px (panels), --r-pill 999px (nav, tabs, buttons).
Hairline borders over shadows. Shadows only on floating glass.
Section rhythm: ivory hero → pearl intro → ivory services → pearl process → ivory automation → pearl FAQ → midnight CTA + footer. The tone changes are subtle steps, never jarring dark/light flips.
3. IMAGERY & ART DIRECTION
Primary: bright, sunlit architectural interiors — soft morning or afternoon daylight, light oak, white stone, travertine, linen, plants, hints of navy textiles and brass, a plain wall or window as a calm negative area for UI to float over. Grade them consistently (airy highlights, neutral whites, soft shadows, low saturation). Under UI, use a light ivory wash scrim (not darkening).
Secondary: monochrome abstract 3D folds and fabric-like forms for service heroes.
Real work: actual project screenshots placed in glass device frames.
Assets must be owned, licensed, or generated by the agency and logged in ASSETS.md with their source and license.
Banned: robots, holograms, handshake stock, fake team photos, fake client logos, random blobs.
Serve AVIF with a WebP fallback through srcset/sizes. The hero backdrop is under 180 KB at 1440w.
4. GLASS GOVERNANCE (non-negotiable)
Glass is for floating layers only: navbar, dropdowns, mobile sheet, sidebars, dock/tabs, modals, product-UI showcases, and stat cards over imagery. Never for long-form reading sections.
At most 3 blurred layers visible in one viewport. No nested blur inside blur.
Text on glass must pass AA against the worst-case backdrop. Increase bg opacity or add a scrim until it passes, and test over the brightest part of each photo.
@supports not (backdrop-filter: blur(1px)) → solid --ivory at 96% with the --glass-edge hairline.
@media (prefers-reduced-transparency: reduce) → solid surfaces, no blur.
Mobile: blur ≤ 12px. Never animate backdrop-filter, and never put blur on scroll-linked elements in large areas.
If glass doesn't help legibility or hierarchy in a spot, use a solid surface there.
5. SIGNATURE COMPONENT KIT ("Glass Kit")

Build these as reusable, accessible, typed components. Each one has a real use on the site and a Lab entry (§9).

#	Component	Inspired by	Where it lives on the site
1	Floating Glass Navbar: centered pill, logo left, links center, search + "Let's Talk" right. Sliding hover/active indicator (layoutId). Services dropdown opens a glass mega-panel with five service tiles. Becomes denser after 24px of scroll.	Glassy Navbar	Global header
2	Mobile Glass Sheet: bottom/top sheet with a focus trap, Esc to close, body scroll lock, and the CTA pinned at the bottom	Navbar	Global (< 1024px)
3	Glass Sidebar: 72px icon rail ↔ 280px panel, tooltips on the rail, count badges, collapsible nested tree with colored dots, theme toggle, user card	Glassy SideBar V5	Dashboards service demo, client-portal concept
4	Navigation Tabs ×3: (a) top tabs with icons, (b) segmented control with a sliding pill, (c) dock with a badge	Glassy Navigation Tabs V7	Portfolio filters, service sub-sections, Lab
5	Glass Stat Card + KPI row: icon chip, value, delta chip (up/down token), hover lift −4px	Admin Dashboard V7	Dashboards page, hero composition
6	Goal Gauge + Area Chart: animated semicircle gauge, range toggles (3M/6M/12M)	Admin Dashboard V7	Dashboards page
7	Glass Checkout Demo: card visual with tilt and flip, staged states (Details → Securing → Confirmed)	Glassy Payment Checkout V2	Websites page (e-commerce capability). Demo only: prefilled fake values, no real input, no data leaves the page, labeled "Interface demo".
8	Code Window: macOS traffic lights, filename/lang chip, syntax highlight, copy button. Shows the component's real source, not a decorative snippet.	All reels	Lab, Insights, service pages
9	Workflow Canvas: nodes plus animated connectors: New Lead → AI Qualify → CRM → Follow-up → Sales Team	—	Automation section/page, labeled "Example workflow"
10	Button set: primary (navy, white text), premium (champagne, midnight text, plans only), glass secondary (white glass, ink text), ghost text link with an arrow that nudges 3px	—	Global

All components: keyboard-operable, visible navy focus ring (champagne-light on midnight sections) (2px + 2px offset), ARIA patterns per the WAI-ARIA APG (menu button, tabs, disclosure, dialog), and touch targets ≥ 44px.

6. PAGES & SECTIONS
Navigation

Home · Services (glass mega-panel) · Work · Lab · About · Insights · Contact. Primary CTA Let's Talk.

Home
Hero: sunlit interior backdrop with a soft ivory wash. Headline "Digital Experiences. Smarter Growth." (Barlow Condensed, ink text, champagne accent word with a thin champagne underline). Supporting copy and two CTAs (Explore Services / Start a Project). Hero visual: a layered glass composition — a sidebar rail, a stat-card trio and a mini workflow strip — floating over the TV/wall negative space, with a slow 6–8s parallax drift on pointer move (desktop only; static on touch and reduced motion). Label it as a concept interface unless it's real.
Intro (pearl): an editorial statement plus the flywheel diagram (Attract → Convert → Automate → Manage). Flywheel colors: Attract/Convert in sage, Automate/Manage in navy, the center hub in champagne.
Services: five tiles with distinct treatments, not five identical cards. Each tile previews its own UI micro-moment on hover (e.g., Ads tile: a mini campaign row; Automation: a pulse travelling along a connector). Each links to its service page.
Selected Work: large visuals in glass frames with industry, services and a short summary. If there's no approved work, use a tasteful "Concept studies" set labeled as such, or "Selected work coming soon".
How We Work (pearl): 01 Discover → 02 Strategize → 03 Create → 04 Launch → 05 Optimize. A sticky numbered timeline on desktop, stacked on mobile.
Why Us: only claims the business can support (integrated delivery, design + engineering in one team, connected marketing and automation, transparent scope, clear communication).
Automation Showcase (ivory, with a light glass canvas): an interactive Workflow Canvas. Hovering or focusing a node reveals what happens there. Badge: "Example workflow — tailored per client."
From the Lab: three live components with a "View code" link. This shows craft directly.
FAQ (pearl): services, international clients, buying single services, ongoing support, custom automation, how to start, how pricing works. No invented prices, timelines or guarantees.
Final CTA (midnight band): "Let's Build What's Next." plus "Tell us what you're building…" and Start a Conversation, with a champagne-light accent word, in a single midnight-glass panel over a dusk interior. This is the only deep-toned moment on the page.
Footer: brand mark, positioning line, service and nav links, real contacts and socials, Privacy, Terms, Cookie settings (if any non-essential cookies are used), ©.
Service pages (×5, plus the optional plans page)

Each page has: its own hero (a different backdrop or UI moment), a value proposition, who it's for, capabilities and deliverables, use cases, a live relevant demo, real work if any, process, FAQ, and a contextual enquiry CTA with the service preselected in the form.

Websites: responsive device frames, the Checkout Demo, and performance/accessibility commitments (as practices, not scores).
Social Media: a reel-format showcase (9:16 frames), a content-calendar UI mock, and caption/brand-consistency principles.
Digital Advertising: a campaign-structure visual (campaign → ad set → ad) and a reporting UI mock. No fabricated metrics; label all sample numbers "Illustrative".
AI Agents & Automation: the Workflow Canvas, an enquiry-to-CRM example, and plain-language explanations.
Dashboards & Systems: a full interactive Glass Dashboard demo (Sidebar + KPI row + Gauge + Chart + Tabs) with "Sample data" labels.
Work / Case studies

Filter tabs (only if there are 6+ projects). Each case study covers: overview, challenge, solution, implementation details, verified results (or "Results pending verification"), related work and a CTA. No fake logos, awards or stats.

Lab (see §9)
About

Mission, approach, principles, expertise, a genuine team (or founder-led statement), why the agency exists, CTA. No unverified "X years / 500+ clients / award-winning".

Insights

An MDX blog with categories, reading time, Code Windows and OG images. It can start with 0–3 posts and a graceful empty state.

Contact

Form (§10), real email/WhatsApp links and an optional booking embed (only if configured).

Legal & utility

Privacy Policy, Terms, Cookie Policy (if needed) as structured templates marked "Requires legal review". Also a custom 404 (a glass card over an interior with a "Take me home" link), a favicon/app-icon set, OG images and theme-color.

7. MOTION SYSTEM

Library: Motion for React (framer-motion) for layout/shared-element motion and springs. CSS for simple hovers. GSAP only if a specific scroll sequence truly needs it.

Token	Value	Use
--dur-micro	140ms	Hover, press, chip
--dur-comp	280ms	Dropdown, tab, tooltip
--dur-section	560ms	Section reveal
Ease	cubic-bezier(.22,1,.36,1)	Default out
Spring (pills, layoutId)	stiffness 420, damping 34	Sliding indicators
Stagger	40–60ms	Lists and lines

Signature moves (from the reels):

Sliding active pill between nav items and tabs (shared layoutId).
Card hover lift y: -4 plus the border brightening from 8% to 14%.
Sidebar rail ↔ panel width expand, with labels fading in after 80ms.
Gauge needle and area-chart draw-in when entering the viewport (once).
Checkout card flip, then a "Securing…" shimmer, then a confirmed check.
Workflow connector pulse (one dot travelling, about 2.4s loop, paused when off-screen).
Headline reveal: per-line mask slide-up, no bouncing letters.

Rules: animate transform and opacity only. No scroll hijacking, no smooth-scroll libraries, no preloaders, no custom cursor, no magnetic buttons. Pause loops with IntersectionObserver. prefers-reduced-motion → instant states with fades ≤ 120ms. Content must be complete with JS disabled where possible (server-rendered).

8. RESPONSIVE

Mobile-first. Verify at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920.

The hero glass composition simplifies on mobile to one stat card plus the workflow strip, with no parallax.
Mega-panel → mobile sheet. Sidebar demos → horizontal tab demo under 768px.
No horizontal overflow, clipped headings, overlap or tiny targets. Respect env(safe-area-inset-*).
Test long headings, long service names and the empty and error states.
9. THE LAB + REEL CAPTURE MODE (content engine)

/lab: a gallery of the Glass Kit components. Each entry has a live demo, props/variants, accessibility notes and the real source in a Code Window with a copy button.

/lab/[component]?capture=reel renders a 1080×1920 recording frame that mirrors the reference reels:

Ivory frame (default; &theme=dark gives the midnight version), title in Barlow Condensed (navy) plus a champagne version/accent word ("Glass Navbar V1"), and a small brand handle with the platform icon.
The live component over a chosen backdrop (interior or abstract), auto-played by a scripted cursor path (configurable JSON timeline: move → hover → click → wait).
The Code Window with that component's real source, auto-scrolling.
An end card for the last 2.5s: fade to an ivory wash and a brand mark plus handle that fades in.
Options: &theme=dark|light, &bg=interior-1|abstract-1, &title=, &tag=.
No audio in the site. Music for reels must be licensed separately; document this in CONTENT-ENGINE.md.
noindex on capture URLs.

This turns every component the agency builds into a ready-to-record Reel/Short.

10. CONTACT & LEAD SYSTEM (real, not decorative)

Fields: full name, business email, company, website (optional), service (preselectable from the page), budget range (optional), project description, consent checkbox (where needed).

UX: labels above fields, helper text, inline errors on blur and submit, a loading state on the button, duplicate-submit lock, success shown only after the server confirms, and a retry path on failure.

Backend — choose based on real hosting (verify first):

Hosting on record: Hostinger Business (shared). Do not assume a persistent Node.js server.
Default architecture: Next.js static export (output: 'export') uploaded to Hostinger, plus a form endpoint, either:
A) A small hardened PHP endpoint on the same host (/api/enquiry.php): server-side validation, honeypot + time-trap, rate limit (per IP, file/DB-backed), body-size limit, origin check, SMTP send through authenticated mail (PHPMailer), and storage in MySQL with prepared statements; or
B) POST to the agency's self-hosted n8n webhook (secret header, HTTPS). n8n validates, stores in the CRM/Sheet, sends a notification and starts the follow-up automation. This is the agency using its own automation service.
If the hosting supports Node apps reliably, server-rendered Next.js with Route Handlers is acceptable. Document the decision.
Optional Cloudflare Turnstile. No secret keys in the client. Controlled error messages. No PII in public logs.
If the backend isn't configured, show the form in a clearly labeled "Enquiries temporarily unavailable — email us at …" state.
11. TECH STACK
Next.js (App Router) + TypeScript strict + Tailwind CSS (tokens in CSS variables mapped in the Tailwind config) + Motion for React + lucide-react icons.
Content: typed local content (/content/*.ts + MDX for Insights and case studies). Use a headless CMS only if non-technical editing is confirmed as needed.
Charts: lightweight custom SVG (no heavy chart library) for the gauge and area chart.
Folders: app/, components/glass/, components/sections/, content/, lib/, styles/tokens.css, public/, lab/timelines/.
Dependencies stay minimal and pinned, with a lockfile, npm audit in CI and no unused packages.
12. SECURITY
HTTPS everywhere, HTTP→HTTPS redirect, HSTS once verified, no mixed content.
Headers (through .htaccess on Hostinger or platform config): a tested CSP (self plus required origins only; frame-ancestors 'none'), X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo off).
Form/API: server-side schema validation, output encoding, rate limiting, body-size limits, origin/CSRF checks, parameterized queries only, generic error responses.
Secrets in environment/config outside the web root, plus a .env.example. Separate dev and prod. Document key rotation.
No public admin area. If one is ever needed: MFA, RBAC, secure sessions, audit logs.
No production source maps containing sensitive info, and no debug endpoints.
Privacy: data minimization, a defined retention period for enquiries, restricted access, backups. GDPR/UK GDPR and UAE PDPL considerations are flagged for legal review, not claimed as compliance.
13. SEO & AI-SEARCH VISIBILITY
Unique titles and descriptions, canonicals, clean URLs, a correct H1–H6 hierarchy, descriptive internal links, sitemap.xml, robots.txt, 301s, and a custom 404.
JSON-LD: Organization, ProfessionalService/Service per service page, BreadcrumbList, FAQPage (only for visible FAQs), Article for Insights. No review or rating markup.
Open Graph and Twitter cards, with OG images generated from the glass template.
AI-answer readiness: each service page opens with a plain 2–3 sentence definition of what the service is and who it's for; extractable FAQs; consistent entity naming.
English first. hreflang only when real alternates exist. No fake local offices.
14. PERFORMANCE (targets; measure, never claim)
LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (p75 field when available; Lighthouse mobile lab otherwise).
Budgets: JS ≤ 170 KB gz on Home; hero image ≤ 180 KB; fonts ≤ 3 files preloaded.
Glass cost control: limit blurred areas, give no backdrop-filter to scrolling containers, and reduce blur on mobile.
Static rendering, lazy-load below-the-fold demos (dynamic import plus IntersectionObserver), reserved media dimensions, and no third-party scripts by default.
Report real Lighthouse/WebPageTest numbers along with the device and network profile used.
15. ACCESSIBILITY (WCAG 2.2 AA)

Semantic landmarks, skip link, logical headings, full keyboard support, visible focus (navy ring), APG-correct menus/tabs/dialogs, focus management in the sheet and dialogs, labelled form controls with aria-describedby errors, ≥ 24px targets (aim for 44px), contrast checked including glass over photos, reduced motion and reduced transparency, meaningful alt text, and no keyboard traps. Test manually with VoiceOver and NVDA where available, as well as with axe.

16. COPY & VOICE

Clear, human, direct, confident and modern. Short sentences. Specific over grand. Banned: "unlock your potential", "revolutionize", "skyrocket", "transform dreams", "passionate about excellence", and empty superlatives. Sample numbers in demos are always labeled Sample data or Illustrative. Missing facts appear as [TO CONFIRM], never invented.

17. ANALYTICS (optional, privacy-first)

Cookieless analytics (e.g. Plausible or Umami) by default. Events: enquiry submitted (server-confirmed), service selected, primary CTA click, case study opened, email/WhatsApp click, Lab code copied. Meta Pixel only with consent and only if ads require it. Document everything in ANALYTICS.md.

18. QA CHECKLIST (report actual results)
Functional: every link and CTA, form success/failure/duplicate/spam paths, routing, mobile sheet, 404, Lab capture mode.
Visual: all viewports, ivory/pearl/midnight sections, glass legibility over every backdrop, long-content stress.
Browsers: current Chrome, Safari (including iOS backdrop-filter behavior), Firefox, Edge.
Accessibility: keyboard, focus order, contrast (including glass), screen reader, reduced motion and transparency.
Security: headers scan, validation, rate limit, secrets, dependency audit.
Performance: Lighthouse mobile and desktop, payload, CLS, INP interactions on the demos. Never mark a test as passed if it wasn't run.
19. DELIVERABLES
Design rationale for Light Glass + Royal Estate palette, with reference DNA mapped to decisions
Palette with HEX values and contrast table (including glass cases)
Type system and fluid scale
tokens.css (color, glass, radius, spacing, motion)
Glass Kit component library (10 components) with docs
Home, five service pages (plus the optional plans page behind a flag), Work and case-study template, Lab plus reel capture mode, About, Insights, Contact, legal templates, 404
Working enquiry pipeline (PHP or n8n) or a clearly documented setup
Security headers config (.htaccess / platform)
SEO: metadata, JSON-LD, sitemap, robots, OG images
.env.example, README.md (setup and deploy to Hostinger), CONTENT-ENGINE.md, ASSETS.md, ANALYTICS.md, MAINTENANCE.md
QA report with real measurements

Status matrix required: Implemented · Needs external config · Needs credentials · Needs real content · Not yet tested · Future enhancements.

20. EXECUTION ORDER
Strategy: confirm inputs, list [TO CONFIRM] items, and verify the hosting capabilities.
Direction: tokens, type and glass rules. Prove legibility over two backdrops first.
Glass Kit: build and test the 10 components in the Lab before the pages.
Home: mobile and desktop together.
Service and supporting pages
Lead pipeline, SEO and analytics
Refinement: remove anything generic or repeated, and audit glass against §4.
Security, accessibility and performance hardening
QA and delivery with the status matrix.
21. HARD NOs

Generic AI look · purple/neon gradients · glass on reading sections · more than 3 blur layers · champagne used for small text · sage or champagne as the primary CTA · pure-white or pure-black backgrounds · repeated identical card grids · scroll hijacking · preloaders · custom cursors · heavy 3D · fake testimonials, logos, stats or awards · fake form success · real card-data inputs in demos · unlicensed music or images · unverified security, performance or legal claims · features unrelated to the agency.

FINAL STANDARD

Light, trusted and premium, not flashy. Crafted, not decorated. Glass that serves legibility. Motion that explains. Claims that are true. Every component should be good enough to post as a Reel on its own.