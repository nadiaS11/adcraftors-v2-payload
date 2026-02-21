import type { Media } from "@/payload-types"
import { RequiredDataFromCollectionSlug } from "payload"

export const testimonial1 = (
  headshot: Media,
  client: number,
): RequiredDataFromCollectionSlug<"testimonials"> => ({
  quote:
    "Working with AdCraftors was transformative for our brand. They didn't just create a logo—they helped us understand who we are as a company. The results speak for themselves: 200% increase in brand recognition.",
  author: "Jennifer Walsh",
  role: "CEO",
  company: "TechFlow Inc.",
  headshot: headshot.id,
  client,
  rating: 5,
})

export const testimonial2 = (
  headshot: Media,
  client: number,
): RequiredDataFromCollectionSlug<"testimonials"> => ({
  quote:
    "The team at AdCraftors delivered beyond our expectations. Our new website has increased conversions by 150% and our organic traffic has tripled. They're not just vendors—they're partners in our success.",
  author: "Michael Chen",
  role: "Marketing Director",
  company: "GreenLeaf Organics",
  headshot: headshot.id,
  client,
  rating: 5,
})

export const testimonial3 = (
  headshot: Media,
  client: number,
): RequiredDataFromCollectionSlug<"testimonials"> => ({
  quote:
    "AdCraftors helped us navigate a complete digital transformation. Their strategic approach to our paid advertising campaigns reduced our cost per acquisition by 40% while doubling our lead volume.",
  author: "Dr. Amanda Foster",
  role: "Founder",
  company: "MedCare Solutions",
  headshot: headshot.id,
  client,
  rating: 5,
})

export const testimonial4 = (
  headshot: Media,
  client: number,
): RequiredDataFromCollectionSlug<"testimonials"> => ({
  quote:
    "The SEO strategy AdCraftors developed for us has been game-changing. We now rank on the first page for our most competitive keywords and have seen a 300% increase in organic leads.",
  author: "Robert Martinez",
  role: "VP of Growth",
  company: "FinanceHub",
  headshot: headshot.id,
  client,
  rating: 5,
})

export const testimonial5 = (
  headshot: Media,
  client: number,
): RequiredDataFromCollectionSlug<"testimonials"> => ({
  quote:
    "From brand strategy to web development, AdCraftors has been exceptional. They truly understand the education market and created a platform that our students love using.",
  author: "Lisa Thompson",
  role: "Co-Founder",
  company: "EduSpark",
  headshot: headshot.id,
  client,
  rating: 4,
})
