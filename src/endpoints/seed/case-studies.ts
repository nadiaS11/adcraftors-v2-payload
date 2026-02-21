import type { Media } from "@/payload-types"
import { RequiredDataFromCollectionSlug } from "payload"

type CaseStudyArgs = {
  featuredImage: Media
  services: number[]
}

export const caseStudy1 = ({
  featuredImage,

  services,
}: CaseStudyArgs): RequiredDataFromCollectionSlug<"case-studies"> => ({
  title: "Complete Brand Transformation for TechFlow",
  excerpt:
    "A comprehensive brand overhaul that positioned TechFlow as an industry leader, resulting in 200% increase in brand recognition.",
  featuredImage: featuredImage.id,

  projectDate: "2024-06-01",
  services,
  _status: "published",
  challenge: {
    heading: "The Challenge",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "TechFlow had outgrown their startup identity. As they scaled to serve enterprise clients, their brand no longer reflected their capabilities or market position. They needed a complete transformation to match their ambitions.",
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
  },
  solution: {
    heading: "Our Solution",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "We developed a comprehensive brand strategy that repositioned TechFlow as a premium enterprise solution. This included a new visual identity, messaging framework, and complete website redesign.",
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
  },
  results: {
    heading: "The Results",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "The transformation exceeded all expectations. TechFlow saw immediate improvements in brand perception and business metrics.",
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
    metrics: [
      { value: "200%", label: "Increase in brand recognition" },
      { value: "150%", label: "Increase in qualified leads" },
      { value: "85%", label: "Improvement in conversion rate" },
      { value: "3x", label: "Increase in enterprise deals" },
    ],
  },
  gallery: [],
  featured: true,
  slug: "techflow-brand-transformation",
  meta: {
    title: "TechFlow Brand Transformation Case Study | AdCraftors",
    description:
      "See how we helped TechFlow transform their brand identity and achieve 200% increase in brand recognition.",
    image: featuredImage.id,
  },
})

export const caseStudy2 = ({
  featuredImage,

  services,
}: CaseStudyArgs): RequiredDataFromCollectionSlug<"case-studies"> => ({
  title: "E-commerce Growth for GreenLeaf Organics",
  excerpt:
    "A comprehensive digital strategy that tripled online sales and established GreenLeaf as a leader in organic food e-commerce.",
  featuredImage: featuredImage.id,

  projectDate: "2024-03-01",
  services,
  _status: "published",
  challenge: {
    heading: "The Challenge",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "GreenLeaf Organics had a loyal local customer base but struggled to translate that success online. Their e-commerce platform was outdated, and they lacked a cohesive digital marketing strategy.",
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
  },
  solution: {
    heading: "Our Solution",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "We built a new e-commerce platform optimized for conversion and implemented a multi-channel digital marketing strategy including SEO, paid advertising, and email marketing.",
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
  },
  results: {
    heading: "The Results",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "GreenLeaf saw remarkable growth across all channels, establishing themselves as a major player in the organic food e-commerce space.",
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
    metrics: [
      { value: "300%", label: "Increase in online sales" },
      { value: "250%", label: "Increase in organic traffic" },
      { value: "45%", label: "Reduction in cart abandonment" },
      { value: "2.5x", label: "Average order value increase" },
    ],
  },
  gallery: [],
  featured: true,
  slug: "greenleaf-ecommerce-growth",
  meta: {
    title: "GreenLeaf Organics E-commerce Case Study | AdCraftors",
    description:
      "Learn how we helped GreenLeaf Organics triple their online sales with a comprehensive digital strategy.",
    image: featuredImage.id,
  },
})

export const caseStudy3 = ({
  featuredImage,

  services,
}: CaseStudyArgs): RequiredDataFromCollectionSlug<"case-studies"> => ({
  title: "Digital Patient Experience for MedCare Solutions",
  excerpt:
    "A patient-centric digital platform that improved engagement by 180% and streamlined healthcare delivery.",
  featuredImage: featuredImage.id,

  projectDate: "2024-01-01",
  services,
  _status: "published",
  challenge: {
    heading: "The Challenge",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "MedCare Solutions needed a digital platform that could serve both patients and healthcare providers efficiently while maintaining strict HIPAA compliance and building trust in a sensitive industry.",
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
  },
  solution: {
    heading: "Our Solution",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "We developed a comprehensive patient portal with telemedicine capabilities, appointment scheduling, and secure communication features—all wrapped in a trustworthy, calming design.",
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
  },
  results: {
    heading: "The Results",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "The new platform transformed how MedCare serves patients, resulting in improved satisfaction and operational efficiency.",
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
    metrics: [
      { value: "180%", label: "Increase in patient engagement" },
      { value: "60%", label: "Reduction in no-shows" },
      { value: "40%", label: "Decrease in administrative time" },
      { value: "4.8/5", label: "Patient satisfaction rating" },
    ],
  },
  gallery: [],
  featured: true,
  slug: "medcare-digital-patient-experience",
  meta: {
    title: "MedCare Solutions Healthcare Platform Case Study | AdCraftors",
    description:
      "Discover how we built a patient-centric digital platform that improved engagement by 180%.",
    image: featuredImage.id,
  },
})

export const caseStudy4 = ({
  featuredImage,

  services,
}: CaseStudyArgs): RequiredDataFromCollectionSlug<"case-studies"> => ({
  title: "Financial Services Marketing for FinanceHub",
  excerpt:
    "A compliant digital marketing strategy that doubled qualified leads while reducing acquisition costs by 40%.",
  featuredImage: featuredImage.id,

  projectDate: "2023-11-01",
  services,
  _status: "published",
  challenge: {
    heading: "The Challenge",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "FinanceHub faced strict regulatory requirements that limited their marketing options. They needed a strategy that could generate leads while staying compliant with financial services regulations.",
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
  },
  solution: {
    heading: "Our Solution",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "We developed a content-driven marketing strategy focused on educational content and thought leadership, combined with carefully crafted paid campaigns that met all compliance requirements.",
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
  },
  results: {
    heading: "The Results",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "The compliant approach actually performed better than traditional financial marketing, building trust while generating quality leads.",
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
    metrics: [
      { value: "100%", label: "Increase in qualified leads" },
      { value: "40%", label: "Reduction in cost per acquisition" },
      { value: "300%", label: "Increase in organic traffic" },
      { value: "25%", label: "Increase in account openings" },
    ],
  },
  gallery: [],
  featured: false,
  slug: "financehub-financial-marketing",
  meta: {
    title: "FinanceHub Digital Marketing Case Study | AdCraftors",
    description:
      "See how we developed a compliant digital marketing strategy that doubled qualified leads for FinanceHub.",
    image: featuredImage.id,
  },
})
