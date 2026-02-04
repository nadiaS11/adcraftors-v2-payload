'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  defaultViewport,
} from '@/lib/animations/variants'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { TextWithImageBlock as TextWithImageBlockType } from '@/payload-types'

type Props = TextWithImageBlockType

export const TextWithImageBlockComponent: React.FC<Props> = ({ content, media, settings }) => {
  const imagePosition = settings?.imagePosition || 'right'
  const verticalAlign = settings?.verticalAlign || 'center'
  const imageSize = settings?.imageSize || 'half'

  const imageSizeClasses = {
    small: 'lg:w-2/5',
    half: 'lg:w-1/2',
    large: 'lg:w-3/5',
  }

  const contentSizeClasses = {
    small: 'lg:w-3/5',
    half: 'lg:w-1/2',
    large: 'lg:w-2/5',
  }

  const alignClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex flex-col lg:flex-row gap-8 lg:gap-16',
            alignClasses[verticalAlign as keyof typeof alignClasses],
            imagePosition === 'left' && 'lg:flex-row-reverse',
          )}
        >
          {/* Content */}
          <motion.div
            className={cn(
              'flex-1',
              contentSizeClasses[imageSize as keyof typeof contentSizeClasses],
            )}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {content?.eyebrow && (
              <motion.span
                variants={fadeInUp}
                className="inline-block text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3"
              >
                {content.eyebrow}
              </motion.span>
            )}

            {content?.richText && (
              <motion.div variants={fadeInUp} className="prose dark:prose-invert max-w-none mb-6">
                {/* RichText content would be rendered here */}
              </motion.div>
            )}

            {/* Features List */}
            {content?.features && content.features.length > 0 && (
              <motion.ul variants={staggerContainer} className="space-y-3 mb-8">
                {content.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <title>Checkmark</title>
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {feature.text}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* CTA */}
            {content?.enableCTA && content.link && (
              <motion.div variants={fadeInUp}>
                <CMSLink {...content.link} size="lg" />
              </motion.div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            className={cn('flex-1', imageSizeClasses[imageSize as keyof typeof imageSizeClasses])}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={imagePosition === 'right' ? fadeInRight : fadeInLeft}
          >
            {media?.image && typeof media.image === 'object' && (
              <div
                className={cn(
                  'relative overflow-hidden',
                  media.imageStyle === 'rounded' && 'rounded-2xl',
                  media.imageStyle === 'square' && 'rounded-none',
                  media.imageStyle === 'circle' && 'rounded-full aspect-square',
                  media.imageStyle === 'shadow' && 'rounded-2xl shadow-2xl',
                )}
              >
                <Media resource={media.image} className="w-full h-auto" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
