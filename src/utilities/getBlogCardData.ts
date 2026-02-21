import { CaseStudyCardProps } from "@/blocks/CaseStudiesShowcase/CaseStudiesCollection"
import type { CardPostData } from "@/components/Card"
import type { CaseStudy, Post } from "@/payload-types"

export const getBlogCardData = (doc?: Post) => {
  if (!doc) return undefined
  const blog: CardPostData = {
    id: doc.id,
    title: doc.title,
    updatedAt: doc?.updatedAt,
    categories: doc.categories,
    heroImage: doc.heroImage,
    meta: doc.meta,
    publishedAt: doc.publishedAt,
    slug: doc.slug,
    // readTime: doc.readTime,
  }
  return blog
}
export const getCaseStudyCardData = (doc?: Partial<CaseStudy>) => {
  if (!doc) return undefined
  const blog: CaseStudyCardProps = {
    id: doc.id,
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? "",
    featuredImage: doc.featuredImage,
    client: doc.client,
    services: doc.services,
  }
  return blog
}
