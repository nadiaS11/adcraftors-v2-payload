import React from "react"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import type { ServicesGridBlock as ServicesGridBlockType, Service } from "@/payload-types"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import HeadingFeature from "@/components/HeadingFeature"
import { ServicesCollection } from "@/components/ServicesCollection"

export const ServicesGridBlockComponent: React.FC<ServicesGridBlockType> = async (props) => {
  const {
    id,
    type,
    title,
    link: headerLinks,
    header,
    populateBy,
    selectedServices,
    category,
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

  let services: Service[] = []

  if (populateBy === "selection" && selectedServices?.length) {
    services = selectedServices
      .map((service) => {
        if (typeof service === "object") return service
      })
      .filter(Boolean) as Service[]
  }

  if (populateBy === "category" && category) {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: "services",
      depth: 1,
      limit: limitFromProps,
      where: {
        and: [
          { category: { equals: category } },
          ...(featDoc && typeof featDoc.value === "object"
            ? [{ id: { not_equals: featDoc.value.id } }]
            : []),
        ],
      },
    })
    services = result.docs
  }

  if (populateBy === "featured") {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: "services",
      depth: 1,
      limit: limitFromProps,
      where: {
        and: [
          { category: { equals: "featured" as any } },
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
        {type === "feat" && featuredService && (
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="relative aspect-video lg:aspect-auto rounded-2xl overflow-hidden">
              {featuredService.featuredImage &&
                typeof featuredService.featuredImage === "object" && (
                  <Media
                    resource={featuredService.featuredImage}
                    className="w-full h-full object-cover"
                  />
                )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Featured Service
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredService.title}</h2>
              {featuredService.excerpt && (
                <p className="text-lg text-muted-foreground mb-6">{featuredService.excerpt}</p>
              )}
              <CMSLink url={`/services`} label="Learn More" appearance="default" />
            </div>
          </div>
        )}

        {type === "grid" && (title || headerLinks?.length) && (
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

        {type === "grid" && (
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
