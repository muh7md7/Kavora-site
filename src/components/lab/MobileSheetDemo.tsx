"use client";
import { useState } from "react";
import { Button } from "@/components/glass/Button";
import { MobileSheet } from "@/components/glass/MobileSheet";

export function MobileSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button onClick={() => setOpen(true)} variant="glass">Open mobile sheet</Button>
      <p className="text-xs text-slate">Renders at viewport width below 1024px; resize to preview on desktop.</p>
      <MobileSheet open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
