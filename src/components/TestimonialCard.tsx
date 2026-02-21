"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { fadeInUp, cardHover } from "@/lib/animations/variants"
import type { Testimonial } from "@/payload-types"
import { Media } from "./Media"
import { Card, CardContent } from "./ui/card"
import { Quote, Star } from "lucide-react"

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
          star <= rating ? "text-primary" : "text-neutral-300 dark:text-neutral-600",
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
    <div className={cn("p-6 md:p-8", layout === "slider" && "shrink-0 max-w-3xl")}>
      <Card className="bg-background border-border rounded-2xl shadow-md h-full">
        <CardContent className="p-8 md:p-12 flex flex-col items-center h-full">
          {/* Quote Icon */}
          <div className="flex items-center justify-center mb-6">
            <Quote className="h-12 w-12 text-primary/20" />
          </div>

          {/* Quote and Rating Section - Expands to fill space */}
          <div className="text-center mb-8 flex-1 flex flex-col items-center justify-center">
            {showRating && testimonial.rating && (
              <div className="flex justify-center mb-4 gap-1">
                {showRating && testimonial.rating && (
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                )}
              </div>
            )}
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              "{testimonial?.quote}"
            </blockquote>
          </div>

          {/* Author Info - Always at bottom */}
          <div className="flex items-center justify-center gap-4 w-full">
            {showPhoto && testimonial.headshot && (
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Media
                  resource={testimonial.headshot}
                  imgClassName="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}

            <div className="text-left">
              <div className="font-semibold text-foreground text-base">{testimonial?.author}</div>
              <div className="text-muted-foreground text-sm">{testimonial?.role}</div>
              <div className="text-primary font-medium text-sm">{testimonial?.company}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
