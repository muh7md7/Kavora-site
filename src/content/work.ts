// Case studies — add only with client permission. Results: verified figures or "Results pending verification".
export interface CaseStudy {
  slug: string; title: string; industry: string; services: string[]; summary: string;
  challenge: string; solution: string; implementation: string[]; results: string | "Results pending verification"; permission: "granted" | "pending";
}
export const caseStudies: CaseStudy[] = []; // add real projects only with client permission
