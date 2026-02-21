import { RequiredDataFromCollectionSlug } from "payload"

export const contactSubmission1 = (
  service: number,
): RequiredDataFromCollectionSlug<"contact-submissions"> => ({
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  company: "Smith Industries",
  subject: "project",
  service,
  message:
    "We are looking to rebrand our company and build a new website. Our current brand feels outdated and we need something more modern that reflects our growth. Would love to discuss possibilities.",
  budget: "25k-50k",
  status: "new",
  notes: "",
})

export const contactSubmission2 = (
  service: number,
): RequiredDataFromCollectionSlug<"contact-submissions"> => ({
  name: "Amanda White",
  email: "amanda.white@techstartup.io",
  phone: "+1 (555) 987-6543",
  company: "TechStartup.io",
  subject: "project",
  service,
  message:
    "Launching a new SaaS product next quarter and need a comprehensive digital marketing strategy. Looking for help with SEO, content, and paid advertising to drive initial user acquisition.",
  budget: "10k-25k",
  status: "in-progress",
  notes: "Initial call scheduled for next Tuesday.",
})

export const contactSubmission3 = (): RequiredDataFromCollectionSlug<"contact-submissions"> => ({
  name: "Robert Lee",
  email: "robert.lee@nonprofit.org",
  phone: "+1 (555) 456-7890",
  company: "Community Foundation",
  subject: "partnership",
  message:
    "We are a non-profit organization looking to improve our online presence and would like to explore partnership opportunities. Do you offer any programs for non-profits?",
  status: "responded",
  notes: "Sent information about our non-profit partnership program.",
})
