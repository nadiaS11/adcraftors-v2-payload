"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { Media } from "@/components/Media"
import type { CaseStudy } from "@/payload-types"

type CaseStudyCardProps = {
  className?: string
} & CaseStudy

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  excerpt,
  featuredImage,
  services,
  results,
  title,
  slug,
  color,
  client,
  className,
}) => {
  const cardColor = color || "#ea580c"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href={`/case-studies/${slug}`}
        className={cn(
          "group block relative h-full min-h-[420px] overflow-hidden rounded-3xl no-underline",
          "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
          "transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:shadow-primary/10",
          className,
        )}
      >
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          {featuredImage && typeof featuredImage === "object" && featuredImage.url ? (
            <Media
              resource={featuredImage}
              imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${cardColor}20 0%, ${cardColor}40 100%)`,
              }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Tag */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-900">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cardColor }} />
              Case Study
            </span>

            {/* Arrow that appears on hover */}
            <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
              <svg
                className="w-4 h-4 text-neutral-900 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* Client Info Overlay */}
          {client && typeof client === "object" && (
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white/90 text-xs font-medium tracking-[0.15em] uppercase">
                {client.name || client.industry || "Client"}
              </p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col h-[calc(100%-14rem)] p-6 gap-4">
          {/* Services Tags */}
          {services && services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 -mt-1">
              {services.slice(0, 2).map(
                (service) =>
                  typeof service === "object" && (
                    <span
                      key={service.id}
                      className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {service.title}
                    </span>
                  ),
              )}
              {services.length > 2 && (
                <span className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                  +{services.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3
            className="text-xl font-bold leading-tight text-neutral-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-300"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          {/* Metrics */}
          <div className="mt-auto pt-4">
            {results?.metrics && results.metrics.length > 0 && (
              <div className="flex items-center gap-4">
                {results.metrics.slice(0, 3).map((m, i) => (
                  <div key={m.label} className="flex-1 text-center">
                    <div
                      className="text-lg font-black tracking-tight"
                      style={{ color: i === 0 ? cardColor : "#374151" }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom CTA */}
            <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors duration-300">
              <span>View Case Study</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Accent Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
          style={{ background: cardColor }}
        />
      </Link>
    </motion.div>
  )
}
