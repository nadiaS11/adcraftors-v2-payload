import type { Media } from "@/payload-types"
import { RequiredDataFromCollectionSlug } from "payload"

export const service1 = (featuredImage: Media): RequiredDataFromCollectionSlug<"services"> => ({
  title: "Brand Strategy & Identity",
  category: "branding",
  icon: "palette",
  excerpt:
    "Build a memorable brand that resonates with your audience and sets you apart from the competition.",
  featuredImage: featuredImage.id,
  _status: "published",
  description: {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Our brand strategy and identity services help you define who you are, what you stand for, and how you communicate with your audience. We create cohesive visual identities that capture your essence and drive recognition.",
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: "heading",
          tag: "h2",
          children: [
            {
              type: "text",
              text: "Our Approach",
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "We dive deep into understanding your business, market position, and target audience to create a brand strategy that's authentic and effective.",
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  features: [
    {
      title: "Brand Strategy",
      description: "Define your brand positioning, values, and messaging framework.",
    },
    {
      title: "Visual Identity",
      description: "Logo design, color palette, typography, and brand guidelines.",
    },
    {
      title: "Brand Voice",
      description: "Develop a consistent tone and communication style.",
    },
    {
      title: "Brand Assets",
      description: "Business cards, stationery, and marketing collateral.",
    },
  ],
  process: [
    { stepNumber: 1, title: "Discovery", description: "Research and stakeholder interviews." },
    { stepNumber: 2, title: "Strategy", description: "Define positioning and messaging." },
    { stepNumber: 3, title: "Design", description: "Create visual identity concepts." },
    { stepNumber: 4, title: "Refine", description: "Iterate based on feedback." },
    { stepNumber: 5, title: "Deliver", description: "Final assets and brand guidelines." },
  ],
  featured: true,
  displayOrder: 1,
  slug: "brand-strategy-identity",
  meta: {
    title: "Brand Strategy & Identity Services | AdCraftors",
    description:
      "Build a memorable brand identity that resonates with your audience. Expert brand strategy services.",
    image: featuredImage.id,
  },
})

export const service2 = (featuredImage: Media): RequiredDataFromCollectionSlug<"services"> => ({
  title: "Web Design & Development",
  category: "web",
  icon: "code",
  excerpt:
    "Create stunning, high-performance websites that convert visitors into customers and grow your business.",
  featuredImage: featuredImage.id,
  _status: "published",
  description: {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "We design and develop websites that don't just look great—they perform. From marketing sites to complex web applications, we build digital experiences that drive results.",
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  features: [
    {
      title: "Responsive Design",
      description: "Beautiful on every device, from mobile to desktop.",
    },
    {
      title: "Performance Optimized",
      description: "Fast loading times for better user experience and SEO.",
    },
    {
      title: "CMS Integration",
      description: "Easy content management with Payload CMS.",
    },
    {
      title: "E-commerce Solutions",
      description: "Custom online stores that drive sales.",
    },
  ],
  process: [
    { stepNumber: 1, title: "Planning", description: "Define goals and requirements." },
    { stepNumber: 2, title: "Design", description: "Create wireframes and UI designs." },
    { stepNumber: 3, title: "Development", description: "Build with modern technologies." },
    { stepNumber: 4, title: "Testing", description: "Quality assurance across devices." },
    { stepNumber: 5, title: "Launch", description: "Deploy and monitor performance." },
  ],
  featured: true,
  displayOrder: 2,
  slug: "web-design-development",
  meta: {
    title: "Web Design & Development Services | AdCraftors",
    description:
      "Custom website design and development services. Build high-performance websites that convert.",
    image: featuredImage.id,
  },
})

export const service3 = (featuredImage: Media): RequiredDataFromCollectionSlug<"services"> => ({
  title: "SEO & Content Marketing",
  category: "seo",
  icon: "search",
  excerpt:
    "Increase your online visibility and attract qualified leads with strategic SEO and content marketing.",
  featuredImage: featuredImage.id,
  _status: "published",
  description: {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "We help you rank higher in search results and create content that attracts, engages, and converts your target audience. Our data-driven approach ensures sustainable growth.",
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  features: [
    {
      title: "Technical SEO",
      description: "Optimize site structure, speed, and crawlability.",
    },
    {
      title: "Keyword Research",
      description: "Identify high-value keywords for your business.",
    },
    {
      title: "Content Strategy",
      description: "Plan and create content that ranks and converts.",
    },
    {
      title: "Link Building",
      description: "Build authority through quality backlinks.",
    },
  ],
  process: [
    { stepNumber: 1, title: "Audit", description: "Analyze current SEO performance." },
    { stepNumber: 2, title: "Strategy", description: "Develop improvement plan." },
    { stepNumber: 3, title: "Implementation", description: "Execute optimizations." },
    { stepNumber: 4, title: "Content", description: "Create and optimize content." },
    { stepNumber: 5, title: "Monitor", description: "Track rankings and traffic." },
  ],
  featured: true,
  displayOrder: 3,
  slug: "seo-content-marketing",
  meta: {
    title: "SEO & Content Marketing Services | AdCraftors",
    description:
      "Improve your search rankings and drive organic traffic with our SEO and content marketing services.",
    image: featuredImage.id,
  },
})

export const service4 = (featuredImage: Media): RequiredDataFromCollectionSlug<"services"> => ({
  title: "Paid Advertising",
  category: "advertising",
  icon: "target",
  excerpt:
    "Reach your ideal customers with targeted paid campaigns across Google, Meta, and other platforms.",
  featuredImage: featuredImage.id,
  _status: "published",
  description: {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "We create and manage paid advertising campaigns that deliver measurable ROI. From Google Ads to social media advertising, we help you reach the right people at the right time.",
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  features: [
    {
      title: "Google Ads",
      description: "Search, display, and shopping campaigns.",
    },
    {
      title: "Social Ads",
      description: "Facebook, Instagram, LinkedIn, and TikTok advertising.",
    },
    {
      title: "Retargeting",
      description: "Re-engage visitors who showed interest.",
    },
    {
      title: "Analytics",
      description: "Track performance and optimize spend.",
    },
  ],
  process: [
    { stepNumber: 1, title: "Research", description: "Analyze market and competitors." },
    { stepNumber: 2, title: "Strategy", description: "Define targeting and budget." },
    { stepNumber: 3, title: "Create", description: "Develop ad creative and copy." },
    { stepNumber: 4, title: "Launch", description: "Deploy campaigns." },
    { stepNumber: 5, title: "Optimize", description: "Continuously improve performance." },
  ],
  featured: false,
  displayOrder: 4,
  slug: "paid-advertising",
  meta: {
    title: "Paid Advertising Services | AdCraftors",
    description:
      "Drive targeted traffic and conversions with our paid advertising management services.",
    image: featuredImage.id,
  },
})

export const service5 = (featuredImage: Media): RequiredDataFromCollectionSlug<"services"> => ({
  title: "Content Marketing",
  category: "content",
  icon: "pen-tool",
  excerpt:
    "Build thought leadership and engage your audience with strategic content that tells your story.",
  featuredImage: featuredImage.id,
  _status: "published",
  description: {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "We create compelling content that educates, entertains, and inspires action. From blog posts to video content, we help you connect with your audience.",
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  features: [
    {
      title: "Blog Content",
      description: "SEO-optimized articles and thought leadership.",
    },
    {
      title: "Video Production",
      description: "Engaging video content for all platforms.",
    },
    {
      title: "Infographics",
      description: "Visual content that simplifies complex topics.",
    },
    {
      title: "Case Studies",
      description: "Success stories that build credibility.",
    },
  ],
  process: [
    { stepNumber: 1, title: "Discovery", description: "Understand audience and goals." },
    { stepNumber: 2, title: "Planning", description: "Create content calendar." },
    { stepNumber: 3, title: "Creation", description: "Produce high-quality content." },
    { stepNumber: 4, title: "Distribution", description: "Promote across channels." },
    { stepNumber: 5, title: "Analysis", description: "Measure and improve." },
  ],
  featured: false,
  displayOrder: 5,
  slug: "content-marketing",
  meta: {
    title: "Content Marketing Services | AdCraftors",
    description: "Create compelling content that engages your audience and drives business growth.",
    image: featuredImage.id,
  },
})

export const service6 = (featuredImage: Media): RequiredDataFromCollectionSlug<"services"> => ({
  title: "Social Media Marketing",
  category: "social",
  icon: "share",
  excerpt:
    "Build brand awareness and engage your community with strategic social media management.",
  featuredImage: featuredImage.id,
  _status: "published",
  description: {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "We help you build and maintain an active social media presence that connects with your audience and supports your business goals.",
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  features: [
    {
      title: "Strategy Development",
      description: "Platform-specific social strategies.",
    },
    {
      title: "Content Creation",
      description: "Engaging posts, stories, and reels.",
    },
    {
      title: "Community Management",
      description: "Engage with your followers.",
    },
    {
      title: "Analytics & Reporting",
      description: "Track growth and engagement.",
    },
  ],
  process: [
    { stepNumber: 1, title: "Audit", description: "Review current presence." },
    { stepNumber: 2, title: "Strategy", description: "Define goals and approach." },
    { stepNumber: 3, title: "Content", description: "Create content calendar." },
    { stepNumber: 4, title: "Engage", description: "Build community relationships." },
    { stepNumber: 5, title: "Report", description: "Analyze and optimize." },
  ],
  featured: false,
  displayOrder: 6,
  slug: "social-media-marketing",
  meta: {
    title: "Social Media Marketing Services | AdCraftors",
    description:
      "Build brand awareness and engage your audience with strategic social media management.",
    image: featuredImage.id,
  },
})
