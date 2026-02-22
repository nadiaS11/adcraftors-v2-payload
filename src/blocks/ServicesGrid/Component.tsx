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

const featuredIcons: Record<string, React.ReactNode> = {
  palette: (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),
  code: (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  ),
  search: (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
  target: (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
  "pen-tool": (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
      />
    </svg>
  ),
  share: (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
      />
    </svg>
  ),
  "bar-chart": (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  zap: (
    <svg
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  ),
}

const defaultFeaturedIcon = (
  <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
)

export const ServicesGridBlockComponent: React.FC<ServicesGridBlockType> = async (props) => {
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
    <section className="py-16 md:py-24" id={`block-${id}`}>
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
        {(type === "feat" || type === "both") && featuredService && (
          <div className="mb-16">
            <FeaturedServiceCard service={featuredService} caseStudies={caseStudies} />
          </div>
        )}

        {(!type || type === "grid") && (header?.eyebrow || header?.headline) && (
          <HeadingFeature
            header={{ eyebrow: props.header.eyebrow ?? "", headline: props.header.headline ?? "" }}
          />
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
