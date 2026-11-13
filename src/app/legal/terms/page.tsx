import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/legal/terms/" } };
export default function Page() {
  return <LegalPage title="Terms" sections={[
    { h: "Scope", p: "These terms cover use of this website. Service engagements are governed by a separate written proposal and agreement." },
    { h: "No guarantees", p: "Demos on this site use sample or illustrative data. We do not promise specific results, revenue or return on investment." },
    { h: "Intellectual property", p: "Site content, designs and code are © Keelbiz unless stated otherwise. Reuse requires written permission." },
    { h: "Liability", p: "This website is provided for general information. To the extent permitted by law, Keelbiz is not liable for losses arising from its use. Liability for project work is set out in each project agreement." },
    { h: "Governing law", p: "The governing law and jurisdiction are stated in each project agreement." },
  ]} />;
}
