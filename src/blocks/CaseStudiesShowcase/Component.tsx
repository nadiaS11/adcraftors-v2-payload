import React from "react"

import { Media } from "@/components/Media"
import type {
  CaseStudiesShowcaseBlock as CaseStudiesShowcaseBlockType,
  CaseStudy,
} from "@/payload-types"

import { CaseStudiesCollection, CaseStudyCardProps } from "./CaseStudiesCollection"
import { CMSLink } from "@/components/Link"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { getCaseStudyCardData } from "@/utilities/getBlogCardData"

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
  let docs: Partial<CaseStudy>[] = []
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
      }) as Partial<CaseStudy>[]

      docs = filteredSelectedPosts as Partial<CaseStudy>[]
    }
  }

  const isFeatured = layout === "featured-grid" || type === "feat"
  const featuredCase =
    isFeatured && featuredCaseStudy ? featuredCaseStudy : isFeatured ? docs[0] : null
  const otherCases =
    isFeatured && featuredCase ? docs.filter((c) => c.id !== featuredCase.id) : docs
  const caseStudies = docs.map((doc) => getCaseStudyCardData(doc)) as CaseStudyCardProps[]
  const otherCaseStudies = otherCases.map((doc) =>
    getCaseStudyCardData(doc),
  ) as CaseStudyCardProps[]
  return (
    <section className="py-16 md:py-24" id={`block-${id}`}>
      <div className="container mx-auto px-4">
        {type === "feat" && featuredCaseStudy && (
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="relative aspect-video lg:aspect-auto rounded-2xl overflow-hidden">
              {featuredCaseStudy.featuredImage &&
                typeof featuredCaseStudy.featuredImage === "object" && (
                  <Media
                    resource={featuredCaseStudy.featuredImage}
                    className="w-full h-full object-cover"
                  />
                )}
            </div>
            <div className="flex flex-col justify-center">
              {showClient &&
                featuredCaseStudy.client &&
                typeof featuredCaseStudy.client === "object" && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-primary">
                      {featuredCaseStudy.client.name}
                    </span>
                  </div>
                )}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredCaseStudy.title}</h2>
              {showExcerpt && featuredCaseStudy.excerpt && (
                <p className="text-lg text-muted-foreground mb-6">{featuredCaseStudy.excerpt}</p>
              )}
              {showServices &&
                featuredCaseStudy.services &&
                featuredCaseStudy.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredCaseStudy.services.slice(0, 3).map((service: any, i: number) => {
                      const serviceId = typeof service === "object" ? service.id : service
                      const serviceName = typeof service === "object" ? service.title : service
                      return (
                        <span
                          key={serviceId || i}
                          className="text-xs font-medium px-3 py-1 bg-muted text-muted-foreground rounded-full"
                        >
                          {serviceName}
                        </span>
                      )
                    })}
                  </div>
                )}
              <CMSLink url={`/case-studies`} label="View Case Study" appearance="default" />
            </div>
          </div>
        )}

        {type === "grid" && (title || headerLinks?.length) && (
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
              {headerLinks?.map((headerLink: any) => (
                <CMSLink key={headerLink.id} {...headerLink.link} appearance="inline" />
              ))}
            </div>
          </div>
        )}

        {type === "grid" && (
          <CaseStudiesCollection
            layout={layout}
            header={header}
            caseStudies={caseStudies}
            showClient={showClient}
            showServices={showServices}
            showExcerpt={showExcerpt}
            otherCases={otherCaseStudies}
            cta={cta}
          />
        )}
      </div>
    </section>
  )
}
