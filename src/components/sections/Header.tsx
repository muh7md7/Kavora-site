"use client";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { GlassNavbar } from "@/components/glass/GlassNavbar";
import { MobileSheet } from "@/components/glass/MobileSheet";
import { Cursor } from "./Cursor";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/lab/capture")) return null; // reel frames have their own chrome + scripted cursor
  return (
    <header>
      <GlassNavbar onOpenMobile={() => setOpen(true)} />
      <MobileSheet open={open} onClose={close} />
      <Cursor />
    </header>
  );
}
