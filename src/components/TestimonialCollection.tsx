"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { staggerContainer, defaultViewport } from "@/lib/animations/variants"
import type { Testimonial } from "@/payload-types"
import { TestimonialCard } from "@/components/TestimonialCard"

interface CollectionTestimonialsProps {
  testimonials: Testimonial[]
  layout?: "grid" | "slider" | "single" | "stacked"
  showRating?: boolean
  showPhoto?: boolean
}

export const TestimonialCollection: React.FC<CollectionTestimonialsProps> = ({
  testimonials,
  layout = "slider",
  showRating = true,
  showPhoto = true,
}) => {
  return (
    <motion.div
      className={cn(
        layout === "grid" && "grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
        layout === "slider" &&
          "flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-auto scrollbar-hide",
        layout === "single" && "max-w-3xl mx-auto",
        layout === "stacked" && "space-y-6 max-w-2xl mx-auto",
      )}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          layout={layout}
          showRating={showRating}
          showPhoto={showPhoto}
        />
      ))}
    </motion.div>
  )
}
