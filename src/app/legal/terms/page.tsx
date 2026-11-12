import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/legal/terms/" } };
export default function Page() {
  return <LegalPage title="Terms" sections={[
    { h: "Scope", p: "These terms cover use of this website. Service engagements are governed by a separate written proposal and agreement." },
    { h: "No guarantees", p: "Demos on this site use sample or illustrative data. We do not promise specific results, revenue or return on investment." },
    { h: "Intellectual property", p: "Site content and the Glass Kit source shown in the Lab are © Keelbiz unless stated. Lab code licence: [TO CONFIRM]." },
    { h: "Liability", p: "[Requires legal review for the operating jurisdiction.]" },
    { h: "Governing law", p: "[TO CONFIRM]" },
  ]} />;
}
