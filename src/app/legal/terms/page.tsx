import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/legal/terms/" } };
export default function Page() {
  return <LegalPage title="Terms" sections={[
    { h: "Scope", p: "These terms cover use of this website. Service engagements are governed by a separate written proposal and agreement." },
    { h: "No guarantees", p: "Demos on this site use sample or illustrative data. We do not promise specific results, revenue or return on investment." },
    { h: "Intellectual property", p: "Site content, designs and the source code shown in the Lab are © Keelbiz unless stated otherwise. Lab code is shown for demonstration; reuse requires written permission until a licence is published." },
    { h: "Liability", p: "[Requires legal review for the operating jurisdiction.]" },
    { h: "Governing law", p: "The governing law and jurisdiction are stated in each project agreement." },
  ]} />;
}
