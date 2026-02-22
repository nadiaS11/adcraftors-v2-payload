import React from "react"

import type {
  CaseStudiesShowcaseBlock as CaseStudiesShowcaseBlockType,
  CaseStudy,
} from "@/payload-types"

import { CaseStudyCardProps } from "./CaseStudiesCollection"
import { CMSLink } from "@/components/Link"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { getCaseStudyCardData } from "@/utilities/getBlogCardData"
import { CaseStudyCard } from "@/components/CaseStudyCard"
import { FeaturedCaseStudyCard } from "@/components/FeaturedCaseStudyCard"

export const CaseStudiesShowcaseComponent: React.FC<CaseStudiesShowcaseBlockType> = async (
  props,
) => {
  const {
    id,
    type,
    title,
    link: headerLinks,
    header,
    populateBy,
    selectedCaseStudies,
    filterByService,
    limit = 4,
    settings,
    cta,
    featDoc,
  } = props

  const layout = settings?.layout || "grid"
  const showClient = settings?.showClient ?? true
  const showServices = settings?.showServices ?? true
  const showExcerpt = settings?.showExcerpt ?? false

  const limitFromProps = limit ?? 4
  const featuredCaseStudy = typeof featDoc?.value === "object" && featDoc?.value
  let docs: CaseStudy[] = []
  if (populateBy === "recents" || populateBy === "service") {
    const payload = await getPayload({ config: configPromise })

    if (populateBy === "recents") {
      const posts = await payload.find({
        collection: "case-studies",
        depth: 1,
        limit: limitFromProps,
        where: {
          and: [
            { _status: { equals: "published" } },
            ...(type === "feat" && featuredCaseStudy
              ? [{ id: { not_equals: featuredCaseStudy?.id } }]
              : []),
          ],
        },
      })
      docs = posts.docs
    }
    if (populateBy === "service" && filterByService) {
      const posts = await payload.find({
        collection: "case-studies",
        depth: 1,
        limit: limitFromProps,
        sort: "-updatedAt",
        where: {
          and: [
            { _status: { equals: "published" } },
            {
              services: {
                contains: filterByService,
              },
            },
            ...(type === "feat" && featuredCaseStudy
              ? [{ id: { not_equals: featuredCaseStudy.id } }]
              : []),
          ],
        },
      })
      docs = posts.docs
    }
  } else {
    if (selectedCaseStudies?.length) {
      const filteredSelectedPosts = selectedCaseStudies.map((post: any) => {
        if (post?.value && typeof post.value === "object") return post.value
        if (typeof post === "object") return post
      }) as CaseStudy[]

      docs = filteredSelectedPosts as CaseStudy[]
    }
  }

  const isFeatured = layout === "featured-grid" || type === "feat"
  const featuredCase =
    isFeatured && featuredCaseStudy ? featuredCaseStudy : isFeatured ? docs[0] : null
  const otherCases =
    isFeatured && featuredCase ? docs.filter((c) => c.id !== featuredCase.id) : docs
  const caseStudies = docs.map((doc) => getCaseStudyCardData(doc)) as CaseStudyCardProps[]

  return (
    <section className="py-16 md:py-24" id={`block-${id}`}>
      <div className="container mx-auto px-4">
        {(type === "grid" || type === "both") && (title || headerLinks?.length) && (
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
              {headerLinks?.map((headerLink: any) => (
                <CMSLink key={headerLink.id} {...headerLink.link} appearance="inline" />
              ))}
            </div>
          </div>
        )}
        {type !== "grid" && featuredCaseStudy && (
          <div className="mb-16">
            <FeaturedCaseStudyCard {...featuredCaseStudy} />
          </div>
        )}

        {(type === "grid" || type === "both") && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCases?.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </div>
        )}

        {cta?.enabled && cta.link && (
          <div className="text-center mt-12">
            <CMSLink {...cta.link} size="lg" />
          </div>
        )}
      </div>
    </section>
  )
}
