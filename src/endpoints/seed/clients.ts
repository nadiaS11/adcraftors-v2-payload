import type { Media } from "@/payload-types"
import { RequiredDataFromCollectionSlug } from "payload"

export const client1 = (logo: Media): RequiredDataFromCollectionSlug<"clients"> => ({
  name: "TechFlow Inc.",
  industry: "technology",
  logo: logo.id,
  website: "https://techflow.example.com",
  description:
    "A leading SaaS company providing innovative workflow automation solutions for enterprises worldwide.",
  featured: true,
  displayOrder: 1,
  slug: "techflow-inc",
})

export const client2 = (logo: Media): RequiredDataFromCollectionSlug<"clients"> => ({
  name: "GreenLeaf Organics",
  industry: "retail",
  logo: logo.id,
  website: "https://greenleaforganics.example.com",
  description:
    "Premium organic food brand with a growing e-commerce presence and retail partnerships.",
  featured: true,
  displayOrder: 2,
  slug: "greenleaf-organics",
})

export const client3 = (logo: Media): RequiredDataFromCollectionSlug<"clients"> => ({
  name: "MedCare Solutions",
  industry: "healthcare",
  logo: logo.id,
  website: "https://medcare.example.com",
  description:
    "Healthcare technology company developing patient management and telemedicine platforms.",
  featured: true,
  displayOrder: 3,
  slug: "medcare-solutions",
})

export const client4 = (logo: Media): RequiredDataFromCollectionSlug<"clients"> => ({
  name: "FinanceHub",
  industry: "finance",
  logo: logo.id,
  website: "https://financehub.example.com",
  description: "Digital banking platform offering personal finance tools and investment services.",
  featured: true,
  displayOrder: 4,
  slug: "financehub",
})

export const client5 = (logo: Media): RequiredDataFromCollectionSlug<"clients"> => ({
  name: "EduSpark",
  industry: "education",
  logo: logo.id,
  website: "https://eduspark.example.com",
  description:
    "EdTech startup creating interactive learning platforms for K-12 and higher education.",
  featured: false,
  displayOrder: 5,
  slug: "eduspark",
})

export const client6 = (logo: Media): RequiredDataFromCollectionSlug<"clients"> => ({
  name: "UrbanSpaces",
  industry: "realestate",
  logo: logo.id,
  website: "https://urbanspaces.example.com",
  description:
    "Modern real estate platform connecting buyers, sellers, and renters with their dream properties.",
  featured: false,
  displayOrder: 6,
  slug: "urbanspaces",
})
