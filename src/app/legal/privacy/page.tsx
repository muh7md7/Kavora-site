import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/legal/privacy/" } };
export default function Page() {
  return <LegalPage title="Privacy Policy" sections={[
    { h: "What we collect", p: "The details you submit through the enquiry form (name, email, business name, services of interest, project description, and optionally your website and preferred contact method) and standard server logs. We do not collect payment card data." },
    { h: "Why", p: "To respond to your enquiry and, where you agree, to follow up about our services. We do not sell your data or use it for unrelated purposes." },
    { h: "Retention", p: "Enquiries are kept only as long as needed to respond and, if a project follows, for its duration — then deleted. Access is restricted to the Keelbiz team." },
    { h: "Analytics and advertising", p: "This site currently uses no advertising pixels and no tracking cookies. If privacy-friendly analytics are added, they will be cookieless. See the Cookie Policy." },
    { h: "Your rights", p: "You can ask what we hold about you, request correction or deletion, or withdraw consent at any time by contacting us through the enquiry form." },
  ]} />;
}
