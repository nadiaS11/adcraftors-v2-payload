"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { fadeInUp, cardHover } from "@/lib/animations/variants"
import type { Testimonial } from "@/payload-types"
import { Media } from "./Media"

interface TestimonialCardProps {
  testimonial: Testimonial
  layout?: "grid" | "slider" | "single" | "stacked"
  showRating?: boolean
  showPhoto?: boolean
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={cn(
          "w-5 h-5",
          star <= rating ? "text-yellow-400" : "text-neutral-300 dark:text-neutral-600",
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <title>{star <= rating ? "Filled star" : "Empty star"}</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  layout = "slider",
  showRating = true,
  showPhoto = true,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={cardHover}
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-md",
        layout === "slider" && "shrink-0 w-80 md:w-96 snap-center",
      )}
    >
      {showRating && testimonial.rating && (
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
      )}

      <blockquote className="text-neutral-700 dark:text-neutral-300 mb-6 text-lg leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-4">
        {showPhoto && testimonial.headshot && typeof testimonial.headshot === "object" && (
          <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex-shrink-0">
            <Media
              resource={testimonial.headshot}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        )}
        <div>
          <div className="font-semibold text-neutral-900 dark:text-white">{testimonial.author}</div>
          {(testimonial.role || testimonial.company) && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {testimonial.role}
              {testimonial.role && testimonial.company && ", "}
              {testimonial.company}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
