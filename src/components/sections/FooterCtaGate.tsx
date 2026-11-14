"use client";
import { usePathname } from "next/navigation";

/** Hides the closing "Start a project" band on the contact page itself (the form is already there). */
export function FooterCtaGate({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "/";
  if (path.startsWith("/contact")) return null;
  return <>{children}</>;
}
