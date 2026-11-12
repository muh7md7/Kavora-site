
export type LabEntry = {
  slug: string;
  title: string;
  version: string; // champagne accent in reel title, e.g. "V1"
  description: string;
  file: string; // real source path, relative to repo root
  lang?: string;
  props: string[];
  a11y: string[];
  usedOn: string;
  timeline: string; // JSON timeline name in src/lab/timelines
  wide?: boolean;
};

export const lab: LabEntry[] = [
  {
    slug: "navbar", title: "Glass Navbar", version: "V1",
    description: "Floating full-glass header: every primary link visible, sliding hover indicator, Services and Lab mega menus with hover intent, tone that adapts to light and dark sections, hide-on-scroll and a scroll-progress hairline.",
    file: "src/components/glass/GlassNavbar.tsx",
    props: ["links: NavLink[]", "brand: string", "ctaLabel / ctaHref", "inline: boolean (Lab)", "onOpenMobile()"],
    a11y: ["Menu-button pattern: aria-haspopup, aria-expanded, aria-controls", "Esc and outside click close the panel", "aria-current on the active page", "44px targets, navy focus ring"],
    usedOn: "Global header", timeline: "navbar", wide: true,  },
  {
    slug: "mobile-sheet", title: "Mobile Glass Sheet", version: "V1",
    description: "Full-screen charcoal menu under 1024px with staggered links. Focus trap, Esc to close, body scroll lock, CTA pinned with safe-area padding.",
    file: "src/components/glass/MobileSheet.tsx",
    props: ["open: boolean", "onClose()", "ctaLabel / ctaHref"],
    a11y: ["role=dialog + aria-modal", "Focus trapped and restored on close", "Escape closes", "Scroll lock while open"],
    usedOn: "Global (< 1024px)", timeline: "mobile-sheet",  },
  {
    slug: "sidebar", title: "Glass Sidebar", version: "V5",
    description: "72px icon rail that expands to a 280px panel. Tooltips on the rail, count badges, collapsible tree with coloured dots, theme toggle and user card.",
    file: "src/components/glass/GlassSidebar.tsx",
    props: ["defaultOpen: boolean", "className"],
    a11y: ["aria-expanded on the toggle and tree items", "aria-current on the active item", "Tooltips via title + visible tooltip on focus", "All targets ≥ 44px"],
    usedOn: "Dashboards demo, client-portal concept", timeline: "sidebar",  },
  {
    slug: "tabs", title: "Navigation Tabs", version: "V7",
    description: "Three variants from one component: top tabs with icons, a segmented control with a sliding pill, and a dock with a badge.",
    file: "src/components/glass/Tabs.tsx",
    props: ["items: TabItem[]", "variant: 'top' | 'segmented' | 'dock'", "value / onChange", "children(active) → panel"],
    a11y: ["APG tabs: role=tablist/tab/tabpanel", "Roving tabindex; ←/→/Home/End", "aria-selected, aria-controls", "Dock icons carry aria-label"],
    usedOn: "Work filters, service sub-sections, Lab", timeline: "tabs",  },
  {
    slug: "stat-card", title: "Glass Stat Card", version: "V7",
    description: "Icon chip, value, delta chip using the up/down data tokens, hover lift of −4px. Composes into a KPI row.",
    file: "src/components/glass/StatCard.tsx",
    props: ["label / value", "delta: number", "icon: LucideIcon", "tone: 'sage' | 'navy'"],
    a11y: ["Text contrast ≥ AA on glass over the ivory wash", "Delta direction conveyed by icon + sign, not colour alone"],
    usedOn: "Dashboards page, hero composition", timeline: "stat-card", wide: true,  },
  {
    slug: "gauge", title: "Goal Gauge + Area Chart", version: "V7",
    description: "Animated semicircle gauge and an area chart with 3M/6M/12M range toggles. Lightweight custom SVG — no chart library. Draws in once when visible.",
    file: "src/components/glass/GaugeChart.tsx",
    props: ["value: number (gauge)", "label", "range toggles via Tabs"],
    a11y: ["SVG role=img with descriptive aria-label", "Reduced motion → instant draw", "Range control is an APG tablist"],
    usedOn: "Dashboards page", timeline: "gauge", wide: true,  },
  {
    slug: "checkout", title: "Glass Checkout", version: "V2",
    description: "Interaction study: a payment card that tilts on pointer, flips to a processing state and confirms. Prefilled sample values; nothing leaves the page. A concept, not a product.",
    file: "src/components/glass/CheckoutDemo.tsx",
    props: ["autoplay: boolean"],
    a11y: ["Button announces state via aria-live", "No real inputs; labelled 'Interface demo'", "Tilt disabled for touch and reduced motion"],
    usedOn: "Lab only (concept)", timeline: "checkout",  },
  {
    slug: "code-window", title: "Code Window", version: "V1",
    description: "macOS traffic lights, filename and language chip, syntax highlighting and a copy button. Always shows real source.",
    file: "src/components/glass/CodeWindow.tsx",
    props: ["code: string", "filename", "lang", "autoScroll: boolean", "maxHeight"],
    a11y: ["figure/figcaption semantics", "Copy state announced via aria-live", "Keyboard-scrollable pre"],
    usedOn: "Lab, Insights, service pages", timeline: "code-window", wide: true,  },
  {
    slug: "workflow", title: "Workflow Canvas", version: "V1",
    description: "Nodes and an animated connector: New Lead → AI Qualify → CRM → Follow-up → Sales Team. One dot travels the path on a 2.4s loop, paused off-screen.",
    file: "src/components/glass/WorkflowCanvas.tsx",
    props: ["compact: boolean", "className"],
    a11y: ["Each node is a button with aria-describedby", "Hover and focus reveal the same text via aria-live", "Loop pauses when not in view; off under reduced motion"],
    usedOn: "Automation section and page", timeline: "workflow", wide: true,  },
  {
    slug: "buttons", title: "Button Set", version: "V1",
    description: "Primary (charcoal, turns steel on hover), premium (steel), glass secondary and a ghost link with a drawn underline. Arrows nudge on hover.",
    file: "src/components/glass/Button.tsx",
    props: ["variant: 'primary' | 'premium' | 'glass' | 'ghost'", "href → Link, otherwise button", "disabled, type"],
    a11y: ["Min height 44px", "Visible focus ring", "Arrow icon is aria-hidden"],
    usedOn: "Global", timeline: "buttons",  },
  {
    slug: "cursor", title: "Cursor System", version: "V1",
    description: "A precise dot with an eased ring. Grows over links and buttons, shows a label over anything marked data-cursor, and inverts over dark sections. Fine pointers only.",
    file: "src/components/sections/Cursor.tsx",
    props: ["data-cursor=\"Label\" on any element", "Auto: a, button, [role=tab], summary"],
    a11y: ["Disabled for touch and prefers-reduced-motion", "Native caret kept in form fields", "Purely decorative: aria-hidden, no focus impact"],
    usedOn: "Global (desktop)", timeline: "cursor",
  },
];

export const findLab = (slug: string) => lab.find((e) => e.slug === slug);
