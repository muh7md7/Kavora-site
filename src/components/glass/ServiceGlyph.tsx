import { Bot, LayoutDashboard, Megaphone, MonitorSmartphone, Share2 } from "lucide-react";
import type { ServiceId } from "@/content/site";
import { cn } from "@/lib/cn";

const map = { websites: MonitorSmartphone, social: Share2, ads: Megaphone, automation: Bot, dashboards: LayoutDashboard };

/** Icon chip — sage for growth services, navy for systems. */
export function ServiceGlyph({ id, className, size = 18 }: { id: ServiceId; className?: string; size?: number }) {
  const Icon = map[id];
  const navy = id === "automation" || id === "dashboards";
  return (
    <span className={cn("inline-flex size-9 items-center justify-center rounded-sm", navy ? "bg-navy-tint text-navy" : "bg-sage-tint text-sage", className)} aria-hidden>
      <Icon size={size} />
    </span>
  );
}
