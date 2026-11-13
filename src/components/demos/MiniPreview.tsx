import type { ServiceId } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Tiny looping service previews (pure CSS keyframes, transform/opacity only).
 * Used in the Services mega-menu and as the static first frame of larger demos.
 * Decorative: aria-hidden. Pauses under reduced motion and inside [data-paused="true"].
 */
export function MiniPreview({ id, className }: { id: ServiceId; className?: string }) {
  return (
    <div aria-hidden className={cn("mini relative w-full h-full overflow-hidden rounded-[14px] border border-line bg-bg", className)}>
      {id === "websites" && <Web />}
      {id === "social" && <Social />}
      {id === "ads" && <Ads />}
      {id === "automation" && <Chat />}
      {id === "dashboards" && <Dash />}
    </div>
  );
}

function Web() {
  return (
    <div className="absolute inset-0 grid place-items-center p-4">
      <div className="mini-desk absolute inset-4 rounded-[8px] border border-line-strong bg-bg-2 p-2 flex flex-col gap-1.5">
        <div className="flex gap-1"><i className="mini-dot" /><i className="mini-dot" /><i className="mini-dot" /></div>
        <div className="h-[34%] rounded-[5px] bg-[var(--graphite)] opacity-90" />
        <div className="grid grid-cols-3 gap-1.5 flex-1"><b className="mini-blk" /><b className="mini-blk" /><b className="mini-blk" /></div>
      </div>
      <div className="mini-phone relative h-[86%] aspect-[9/17] rounded-[10px] border border-line-strong bg-bg-2 p-1.5 flex flex-col gap-1">
        <div className="h-[30%] rounded-[4px] bg-[var(--graphite)] opacity-90" /><b className="mini-blk flex-1" /><b className="mini-blk flex-1" />
      </div>
    </div>
  );
}
function Social() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2"><i className="size-5 rounded-full bg-[var(--steel-blue)]" /><b className="h-1.5 w-14 rounded bg-line-strong" /></div>
      <div className="grid grid-cols-3 gap-1 flex-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <i key={i} className="mini-tile rounded-[3px]" style={{ animationDelay: `${i * 0.28}s`, background: i % 3 === 0 ? "var(--graphite)" : i % 3 === 1 ? "var(--steel-blue)" : "var(--mist-grey)" }} />
        ))}
      </div>
    </div>
  );
}
function Ads() {
  const h = [38, 52, 44, 66, 58, 80, 72];
  return (
    <div className="absolute inset-0 p-3 flex flex-col">
      <div className="flex justify-between items-baseline"><span className="font-mono text-[9px] uppercase tracking-widest text-text-2">Leads</span><span className="font-mono text-[11px] font-semibold mini-tick">+12</span></div>
      <div className="flex items-end gap-1 flex-1 mt-2">
        {h.map((v, i) => <i key={i} className="mini-bar flex-1 rounded-t-[3px] origin-bottom" style={{ height: `${v}%`, animationDelay: `${i * 0.12}s`, background: i === h.length - 1 ? "var(--graphite)" : "var(--steel-blue)" }} />)}
      </div>
    </div>
  );
}
function Chat() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col justify-end gap-1.5 text-[9px] leading-tight">
      <span className="mini-msg self-end rounded-[8px] rounded-br-[2px] bg-[var(--graphite)] text-[var(--offwhite)] px-2 py-1" style={{ animationDelay: "0s" }}>Are you open Sunday?</span>
      <span className="mini-typing self-start rounded-[8px] bg-bg-2 border border-line px-2 py-1.5 flex gap-0.5"><i /><i /><i /></span>
      <span className="mini-msg self-start rounded-[8px] rounded-bl-[2px] bg-bg-2 border border-line px-2 py-1" style={{ animationDelay: "2.2s" }}>Yes, 10–6. Book a slot?</span>
    </div>
  );
}
function Dash() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-1">{[0, 1, 2].map((i) => <b key={i} className="h-5 rounded-[4px] border border-line bg-bg-2" />)}</div>
      <svg viewBox="0 0 100 50" className="flex-1 w-full">
        <path d="M0 42 L14 36 L28 38 L42 26 L56 30 L70 16 L84 20 L100 8" fill="none" stroke="var(--graphite)" strokeWidth="1.6" className="mini-line" pathLength={1} />
        <path d="M0 46 L14 44 L28 40 L42 41 L56 34 L70 35 L84 28 L100 26" fill="none" stroke="var(--steel-blue)" strokeWidth="1.4" className="mini-line" pathLength={1} style={{ animationDelay: ".4s" }} />
      </svg>
    </div>
  );
}
