'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { fadeInUp, staggerContainer, defaultViewport } from '@/lib/animations/variants'
import RichText from '@/components/RichText'
import type { FAQBlock as FAQBlockType } from '@/payload-types'

type Props = FAQBlockType

export const FAQBlockComponent: React.FC<Props> = ({ header, faqs, settings }) => {
  const layout = settings?.layout || 'accordion'
  const defaultOpen = settings?.defaultOpen || 'first'
  const showNumbers = settings?.showNumbers ?? false

  const [openItems, setOpenItems] = useState<number[]>(() => {
    if (defaultOpen === 'first') return [0]
    if (defaultOpen === 'all') return faqs?.map((_, i) => i) || []
    return []
  })

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            layout === 'side-by-side' && 'grid lg:grid-cols-2 gap-12 lg:gap-16',
            layout !== 'side-by-side' && 'max-w-3xl mx-auto',
          )}
        >
          {/* Header */}
          {(header?.eyebrow || header?.headline) && (
            <motion.div
              className={cn(layout !== 'side-by-side' && 'text-center mb-12')}
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
                  className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
                >
                  {header.headline}
                </motion.h2>
              )}
            </motion.div>
          )}

          {/* FAQ Items */}
          <motion.div
            className={cn(
              layout === 'two-columns' && 'grid md:grid-cols-2 gap-4',
              layout !== 'two-columns' && 'space-y-4',
            )}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {faqs?.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors"
                >
                  <span className="flex items-center gap-3 font-medium text-neutral-900 dark:text-white">
                    {showNumbers && (
                      <span className="text-primary-600 dark:text-primary-400">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                    )}
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <svg
                      className="w-5 h-5 text-neutral-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>Toggle</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 bg-white dark:bg-neutral-800">
                        <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
                          {faq.answer && <RichText data={faq.answer} />}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
