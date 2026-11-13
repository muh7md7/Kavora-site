import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: "Cookie Policy", alternates: { canonical: "/legal/cookies/" } };
export default function Page() {
  return <LegalPage page="cookies" />;
}
