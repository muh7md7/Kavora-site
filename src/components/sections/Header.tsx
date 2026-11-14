"use client";
import { useCallback, useState } from "react";
import { GlassNavbar } from "@/components/glass/GlassNavbar";
import { MobileSheet } from "@/components/glass/MobileSheet";
import { Cursor } from "./Cursor";
import { theme } from "@/content/builder";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <header>
      <GlassNavbar mobileOpen={open} onOpenMobile={() => setOpen((o) => !o)} />
      <MobileSheet open={open} onClose={close} />
      {theme.cursor && <Cursor />}
    </header>
  );
}
