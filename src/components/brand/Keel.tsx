/**
 * Keel illustration for the 404 — a hull line cutting through three wave layers.
 * SVG drawn in palette; the waves drift on transform only and stop under reduced motion.
 */
export function Keel() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[52svh] overflow-hidden">
      <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 w-full h-full">
        {/* keel / hull */}
        <g className="keel-hull">
          <path d="M620 196 L820 196 L760 268 Q720 286 680 268 Z" fill="var(--graphite)" opacity=".9" />
          <path d="M716 196 L716 96" stroke="var(--steel-blue)" strokeWidth="4" strokeLinecap="round" />
          <path d="M722 104 L790 150 L722 170 Z" fill="var(--steel-blue)" opacity=".75" />
        </g>
        {/* waves */}
        <g className="wave wave-1">
          <path d="M-200 250 Q-100 232 0 250 T200 250 T400 250 T600 250 T800 250 T1000 250 T1200 250 T1400 250 T1600 250 V420 H-200 Z" fill="var(--charcoal-3)" opacity=".85" />
        </g>
        <g className="wave wave-2">
          <path d="M-200 282 Q-80 262 40 282 T280 282 T520 282 T760 282 T1000 282 T1240 282 T1480 282 T1720 282 V420 H-200 Z" fill="var(--graphite)" opacity=".75" />
        </g>
        <g className="wave wave-3">
          <path d="M-200 320 Q-60 300 80 320 T360 320 T640 320 T920 320 T1200 320 T1480 320 T1760 320 V420 H-200 Z" fill="var(--steel-blue)" opacity=".16" />
        </g>
      </svg>
    </div>
  );
}
