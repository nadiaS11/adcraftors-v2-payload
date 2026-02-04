'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { fadeInUp, staggerContainer, defaultViewport, cardHover } from '@/lib/animations/variants'
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from '@/payload-types'

type Props = TestimonialsBlockType & {
  testimonials?: Testimonial[]
}

export const TestimonialsBlockComponent: React.FC<Props> = ({
  header,
  settings,
  testimonials = [],
}) => {
  const layout = settings?.layout || 'slider'
  const showRating = settings?.showRating ?? true
  const showPhoto = settings?.showPhoto ?? true

  // Star rating component
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            'w-5 h-5',
            star <= rating ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600',
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <title>{star <= rating ? 'Filled star' : 'Empty star'}</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(header?.eyebrow || header?.headline) && (
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {header?.eyebrow && (
              <motion.span
                variants={fadeInUp}
                className="inline-block text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3"
              >
                {header.eyebrow}
              </motion.span>
            )}
            {header?.headline && (
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white"
              >
                {header.headline}
              </motion.h2>
            )}
          </motion.div>
        )}

        {/* Testimonials Grid */}
        <motion.div
          className={cn(
            layout === 'grid' && 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
            layout === 'slider' && 'flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory',
            layout === 'single' && 'max-w-3xl mx-auto',
            layout === 'stacked' && 'space-y-6 max-w-2xl mx-auto',
          )}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              whileHover={cardHover}
              className={cn(
                'bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-md',
                layout === 'slider' && 'flex-shrink-0 w-80 md:w-96 snap-center',
              )}
            >
              {/* Rating */}
              {showRating && testimonial.rating && (
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-neutral-700 dark:text-neutral-300 mb-6 text-lg leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {showPhoto &&
                  testimonial.author?.photo &&
                  typeof testimonial.author.photo === 'object' && (
                    <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex-shrink-0">
                      {/* Image would go here */}
                    </div>
                  )}
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {testimonial.author?.name}
                  </div>
                  {(testimonial.author?.role || testimonial.author?.company) && (
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {testimonial.author?.role}
                      {testimonial.author?.role && testimonial.author?.company && ', '}
                      {testimonial.author?.company}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
