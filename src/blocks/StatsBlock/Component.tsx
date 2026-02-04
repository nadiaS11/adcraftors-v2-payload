'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { fadeInUp, staggerContainer, defaultViewport } from '@/lib/animations/variants'
import type { StatsBlock as StatsBlockType } from '@/payload-types'

type Props = StatsBlockType

export const StatsBlockComponent: React.FC<Props> = ({ header, stats, settings }) => {
  const layout = settings?.layout || 'row'
  const style = settings?.style || 'minimal'
  const animate = settings?.animate ?? true
  const centered = settings?.centered ?? true

  const layoutClasses = {
    row: 'flex flex-wrap justify-center gap-8 md:gap-16',
    grid: 'grid grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto',
    stacked: 'flex flex-col gap-8 max-w-lg mx-auto',
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(header?.eyebrow || header?.headline) && (
          <motion.div
            className={cn('mb-12', centered && 'text-center')}
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
                className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
              >
                {header.headline}
              </motion.h2>
            )}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          className={layoutClasses[layout as keyof typeof layoutClasses]}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={cn(
                'text-center',
                style === 'cards' && 'bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-md',
                style === 'bordered' && 'border-l-4 border-primary-500 pl-6 text-left',
              )}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
