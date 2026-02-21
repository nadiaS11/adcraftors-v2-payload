import React from "react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations/variants"
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from "@/payload-types"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { TestimonialCollection } from "@/components/TestimonialCollection"
import HeadingFeature from "@/components/HeadingFeature"

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = async (props) => {
  const { populateBy, selectedTestimonials, limit = 3, settings, featDoc, type } = props

  const layout = settings?.layout || "slider"
  const showRating = settings?.showRating ?? true
  const showPhoto = settings?.showPhoto ?? true

  const limitFromProps = limit ?? 3

  let docs: Testimonial[] = []
  const feaaturedDoc = typeof featDoc?.value === "object" && featDoc?.value

  if (populateBy === "collection" || populateBy === "recents") {
    const payload = await getPayload({ config: configPromise })

    if (populateBy === "collection") {
      const testimonials = await payload.find({
        collection: "testimonials",
        depth: 1,
        limit: limitFromProps,
        where: {
          and: [
            ...(type === "feat" && feaaturedDoc ? [{ id: { not_equals: feaaturedDoc?.id } }] : []),
          ],
        },
      })
      docs = testimonials.docs
    }
    if (populateBy === "recents") {
      const testimonials = await payload.find({
        collection: "testimonials",
        depth: 1,
        limit: limitFromProps,
        sort: "-updatedAt",
        where: {
          and: [
            ...(type === "feat" && feaaturedDoc ? [{ id: { not_equals: feaaturedDoc.id } }] : []),
          ],
        },
      })
      docs = testimonials.docs
    }
  } else {
    if (selectedTestimonials?.length) {
      const filteredSelectedTestimonials = selectedTestimonials.map((testimonial) => {
        if (typeof testimonial === "object") return testimonial
      }) as Partial<Testimonial>[]

      docs = filteredSelectedTestimonials as Testimonial[]
    }
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {props.header?.eyebrow && (
          <HeadingFeature
            header={{ eyebrow: props.header.eyebrow ?? "", headline: props.header.headline ?? "" }}
          />
        )}

        <TestimonialCollection
          testimonials={docs}
          layout={layout}
          showRating={showRating}
          showPhoto={showPhoto}
        />
      </div>
    </section>
  )
}
