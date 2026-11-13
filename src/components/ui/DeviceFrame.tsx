import { cn } from "@/lib/cn";

/**
 * Device frames built in code (no stock imagery). Aspect ratio is fixed → no CLS.
 * browser 16:10 · tablet 4:3 · phone 9:19.5
 */
export function DeviceFrame({ type = "browser", url = "example.com", children, className, label }:
  { type?: "browser" | "phone" | "tablet"; url?: string; children: React.ReactNode; className?: string; label?: string }) {
  if (type === "phone")
    return (
      <div role="img" aria-label={label} className={cn("device-phone aspect-[9/19.5] w-full max-w-[320px]", className)}>
        <span className="dp-notch" aria-hidden />
        <div className="dp-screen">{children}</div>
      </div>
    );
  if (type === "tablet")
    return (
      <div role="img" aria-label={label} className={cn("device-tablet aspect-[4/3] w-full", className)}>
        <div className="dt-screen">{children}</div>
      </div>
    );
  return (
    <div role={label ? "img" : undefined} aria-label={label} className={cn("device-browser w-full", className)}>
      <div className="db-bar" aria-hidden><span className="db-dots"><i /><i /><i /></span><span className="db-url">{url}</span><span className="w-[39px]" /></div>
      <div className="aspect-[16/10] relative overflow-hidden">{children}</div>
    </div>
  );
}
