import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/legal/privacy/" } };
export default function Page() {
  return <LegalPage title="Privacy Policy" sections={[
    { h: "What we collect", p: "Enquiry form data you submit (name, business email, company, optional website and budget, project description) and standard server logs. We do not collect card data." },
    { h: "Why", p: "To respond to your enquiry and, with your consent, to follow up about our services. Legal basis: consent and legitimate interest under the data protection laws that apply to you and to us — [requires legal review]." },
    { h: "Retention", p: "Enquiries are kept only as long as needed to respond and, if a project follows, for its duration — then deleted. Access is restricted to the Keelbiz team." },
    { h: "Analytics", p: "If enabled, we use cookieless analytics that do not identify you. Meta Pixel is used only with consent. See the Cookie Policy." },
    { h: "Your rights", p: "You can ask what we hold, request correction or deletion, or withdraw consent by emailing us." },
  ]} />;
}
