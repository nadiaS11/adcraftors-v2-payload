'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { fadeInUp, staggerContainer, defaultViewport, cardHover } from '@/lib/animations/variants'
import { CMSLink } from '@/components/Link'
import { getPayload } from 'payload'
import type { ServicesGridBlock as ServicesGridBlockType, Service } from '@/payload-types'

// Icons mapping
const iconMap: Record<string, React.ReactNode> = {
  palette: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  ),
  code: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  search: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  target: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  'pen-tool': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  ),
  share: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  ),
  'bar-chart': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  zap: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
}

type Props = ServicesGridBlockType & {
  services?: Service[]
}

export const ServicesGridBlockComponent: React.FC<Props> = ({
  header,
  settings,
  cta,
  services = [],
}) => {
  const columns = settings?.columns || '3'
  const style = settings?.style || 'cards'
  const showExcerpt = settings?.showExcerpt ?? true
  const showLearnMore = settings?.showLearnMore ?? true

  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
              >
                {header.headline}
              </motion.h2>
            )}
          </motion.div>
        )}

        {/* Services Grid */}
        <motion.div
          className={cn('grid gap-6 md:gap-8', gridCols[columns as keyof typeof gridCols])}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              whileHover={cardHover}
              className={cn(
                'group relative',
                style === 'cards' &&
                  'bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-neutral-100 dark:border-neutral-700',
                style === 'list' && 'border-b border-neutral-200 dark:border-neutral-700 pb-6',
                style === 'image-cards' && 'rounded-2xl overflow-hidden',
              )}
            >
              {style === 'image-cards' && service.featuredImage && (
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 mb-4 rounded-lg overflow-hidden">
                  {/* Image would go here */}
                </div>
              )}

              {/* Icon */}
              {style === 'cards' && service.icon && (
                <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[service.icon] || iconMap['zap']}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {service.title}
              </h3>

              {/* Excerpt */}
              {showExcerpt && service.excerpt && (
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {service.excerpt}
                </p>
              )}

              {/* Learn More Link */}
              {showLearnMore && (
                <a
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:gap-2 transition-all duration-200 group/link"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        {cta?.enabled && cta.link && (
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <CMSLink {...cta.link} size="lg" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
