"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { GlassNavbar } from "@/components/glass/GlassNavbar";
import { MobileSheet } from "@/components/glass/MobileSheet";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/lab/capture")) return null; // reel capture frames have their own chrome
  return (
    <header>
      <GlassNavbar onOpenMobile={() => setOpen(true)} />
      <MobileSheet open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
