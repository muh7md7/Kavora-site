import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: "Cookie Policy", alternates: { canonical: "/legal/cookies/" } };
export default function Page() {
  return <LegalPage title="Cookies" sections={[
    { h: "Default", p: "This site sets no non-essential cookies by default. Preferences such as a remembered tab are stored locally in your browser only." },
    { h: "Analytics", p: "If analytics are enabled they are cookieless (Plausible or Umami). No consent banner is required for these." },
    { h: "Advertising", p: "No advertising pixels are currently used on this site. If one is added, it will load only after you accept it in the cookie settings." },
  ]} />;
}
