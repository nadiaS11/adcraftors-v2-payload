import type { Media } from "@/payload-types"
import { RequiredDataFromCollectionSlug } from "payload"

export const teamMember1 = (photo: Media): RequiredDataFromCollectionSlug<"team-members"> => ({
  name: "Sarah Chen",
  role: "Creative Director",
  photo: photo.id,
  department: "leadership",
  bio: "Sarah founded AdCraftors with a vision to create meaningful brand experiences. With 15+ years in design and branding, she leads our creative team in crafting distinctive identities that resonate.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
  },
  displayOrder: 1,
  featured: true,
  slug: "sarah-chen",
})

export const teamMember2 = (photo: Media): RequiredDataFromCollectionSlug<"team-members"> => ({
  name: "Marcus Johnson",
  role: "Head of Development",
  photo: photo.id,
  department: "development",
  bio: "Marcus oversees all technical projects, bringing 12 years of full-stack development experience. He specializes in building scalable web applications and ensuring our solutions perform flawlessly.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/marcusjohnson",
    github: "https://github.com/marcusjohnson",
  },
  displayOrder: 2,
  featured: true,
  slug: "marcus-johnson",
})

export const teamMember3 = (photo: Media): RequiredDataFromCollectionSlug<"team-members"> => ({
  name: "Emily Rodriguez",
  role: "SEO & Content Strategist",
  photo: photo.id,
  department: "marketing",
  bio: "Emily drives our content and SEO initiatives, helping clients achieve top search rankings. Her data-driven approach has generated millions in organic traffic for our clients.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    twitter: "https://twitter.com/emilyrodriguez",
  },
  displayOrder: 3,
  featured: true,
  slug: "emily-rodriguez",
})

export const teamMember4 = (photo: Media): RequiredDataFromCollectionSlug<"team-members"> => ({
  name: "David Park",
  role: "Senior Designer",
  photo: photo.id,
  department: "design",
  bio: "David brings brands to life through stunning visual design. His work has been featured in design publications and has won multiple industry awards.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/davidpark",
    dribbble: "https://dribbble.com/davidpark",
  },
  displayOrder: 4,
  featured: false,
  slug: "david-park",
})

export const teamMember5 = (photo: Media): RequiredDataFromCollectionSlug<"team-members"> => ({
  name: "Rachel Kim",
  role: "Account Director",
  photo: photo.id,
  department: "strategy",
  bio: "Rachel manages client relationships and ensures project success. She bridges the gap between strategy and execution, keeping projects on track and clients informed.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/rachelkim",
  },
  displayOrder: 5,
  featured: false,
  slug: "rachel-kim",
})

export const teamMember6 = (photo: Media): RequiredDataFromCollectionSlug<"team-members"> => ({
  name: "Alex Thompson",
  role: "Full Stack Developer",
  photo: photo.id,
  department: "development",
  bio: "Alex builds robust web applications with a focus on performance and user experience. Proficient in React, Next.js, and modern backend technologies.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/alexthompson",
    github: "https://github.com/alexthompson",
  },
  displayOrder: 6,
  featured: false,
  slug: "alex-thompson",
})
