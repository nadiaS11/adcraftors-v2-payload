import React from "react"
import { CMSLink } from "@/components/Link"
import type {
  ServicesGridBlock as ServicesGridBlockType,
  Service,
  CaseStudy,
} from "@/payload-types"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import HeadingFeature from "@/components/HeadingFeature"
import { ServicesCollection } from "@/components/ServicesCollection"
import { FeaturedServiceCard } from "@/components/FeaturedServiceCard"

export const ServicesGridBlock: React.FC<ServicesGridBlockType> = async (props) => {
  const {
    id,
    type,
    title,
    link: headerLinks,
    header,
    populateBy,
    selectedServices,
    limit = 6,
    settings,
    cta,
    featDoc,
  } = props

  const columns = settings?.columns || "3"
  const style = settings?.style || "cards"
  const showExcerpt = settings?.showExcerpt ?? true
  const showLearnMore = settings?.showLearnMore ?? true

  const limitFromProps = limit ?? 6
  const featuredService = typeof featDoc?.value === "object" && featDoc?.value

  let caseStudies: CaseStudy[] = []
  if ((type === "feat" || type === "both") && featuredService) {
    const payload = await getPayload({ config: configPromise })
    const caseStudiesResult = await payload.find({
      collection: "case-studies",
      depth: 1,
      limit: 6,
      where: {
        and: [{ _status: { equals: "published" } }, { services: { contains: featuredService.id } }],
      },
    })
    caseStudies = caseStudiesResult.docs
  }

  let services: Service[] = []

  if (populateBy === "selection" && selectedServices?.length) {
    services = selectedServices
      .map((service: any) => {
        if (service?.value && typeof service.value === "object") return service.value
        if (typeof service === "object") return service
      })
      .filter(Boolean) as Service[]
  }

  if (populateBy === "recents") {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: "services",
      depth: 1,
      limit: limitFromProps,
      where: {
        and: [
          { _status: { equals: "published" } },
          ...(featDoc && typeof featDoc.value === "object"
            ? [{ id: { not_equals: featDoc.value.id } }]
            : []),
        ],
      },
    })
    services = result.docs
  }

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: "services",
      depth: 1,
      limit: limitFromProps,
      where: {
        and: [
          { _status: { equals: "published" } },
          ...(featDoc && typeof featDoc.value === "object"
            ? [{ id: { not_equals: featDoc.value.id } }]
            : []),
        ],
      },
    })
    services = result.docs
  }

  return (
    <section className="mt-16 lg:mt-32" id={`block-${id}`}>
      <div className="container mx-auto px-4">
        {(type === "grid" || type === "both") && (title || headerLinks?.length) && (
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
              {headerLinks?.map((headerLink) => (
                <CMSLink key={headerLink.id} {...headerLink.link} appearance="inline" />
              ))}
            </div>
          </div>
        )}
        {(!type || type === "grid") && (header?.eyebrow || header?.headline) && (
          <HeadingFeature
            header={{ eyebrow: props.header.eyebrow ?? "", headline: props.header.headline ?? "" }}
          />
        )}
        {(type === "feat" || type === "both") && featuredService && (
          <div className="mb-16">
            <FeaturedServiceCard service={featuredService} caseStudies={caseStudies} />
          </div>
        )}

        {(type === "grid" || type === "both") && (
          <ServicesCollection
            services={services}
            columns={columns}
            style={style}
            showExcerpt={showExcerpt}
            showLearnMore={showLearnMore}
            cta={cta}
          />
        )}
      </div>
    </section>
  )
}
