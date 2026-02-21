import React from "react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations/variants"
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from "@/payload-types"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { TestimonialCollection } from "@/components/TestimonialCollection"
import HeadingFeature from "@/components/HeadingFeature"

async function getTestimonials(
  populateBy: string,
  selectedTestimonials: any[],
  limit: number,
): Promise<Testimonial[]> {
  const payload = await getPayload({ config: configPromise })

  if (populateBy === "selection" && selectedTestimonials?.length) {
    return selectedTestimonials
      .map((testimonial) => {
        if (typeof testimonial.value === "object") return testimonial.value
      })
      .filter(Boolean) as Testimonial[]
  }

  const result = await payload.find({
    collection: "testimonials",
    depth: 1,
    limit,
  })

  return result.docs
}

type Props = TestimonialsBlockType & {
  testimonials?: Testimonial[]
}

export const TestimonialsBlock: React.FC<Props> = async (props) => {
  const { populateBy, selectedTestimonials, limit = 3, settings } = props

  const layout = settings?.layout || "slider"
  const showRating = settings?.showRating ?? true
  const showPhoto = settings?.showPhoto ?? true

  const limitFromProps = limit ?? 3

  const testimonials = await getTestimonials(
    populateBy || "selection",
    selectedTestimonials || [],
    limitFromProps,
  )

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {props.header?.eyebrow && (
          <HeadingFeature
            header={{ eyebrow: props.header.eyebrow ?? "", headline: props.header.headline ?? "" }}
          />
        )}

        <TestimonialCollection
          testimonials={testimonials}
          layout={layout}
          showRating={showRating}
          showPhoto={showPhoto}
        />
      </div>
    </section>
  )
}
