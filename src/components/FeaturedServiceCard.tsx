"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import type { Service, CaseStudy } from "@/payload-types"

interface FeaturedServiceCardProps {
  service: Service
  caseStudies?: CaseStudy[]
}

const icons: Record<string, React.ReactNode> = {
  palette: (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),
  code: (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  ),
  search: (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
  target: (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
  "pen-tool": (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
      />
    </svg>
  ),
  share: (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
      />
    </svg>
  ),
  "bar-chart": (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  zap: (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  ),
}

const defaultIcon = (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
)

export const FeaturedServiceCard: React.FC<FeaturedServiceCardProps> = ({
  service,
  caseStudies = [],
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const iconKey = service.icon || "zap"
  const icon = icons[iconKey] || defaultIcon

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-transparent dark:from-neutral-900 dark:via-neutral-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid lg:grid-cols-2">
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-primary rounded-full shadow-lg shadow-primary/30 w-fit">
            Featured Service
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            {service.title}
          </h2>
          {service.excerpt && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-lg">
              {service.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            <CMSLink
              url={service.slug ? `/services/${service.slug}` : "/services"}
              label="Learn More"
              appearance="default"
            />
            <CMSLink url="/services" label="All Services" appearance="outline" />
          </div>
        </div>

        <div className="relative p-8 lg:pr-16 flex items-center justify-center min-h-80 lg:min-h-112.5">
          <div className="absolute inset-0 lg:left-0 flex items-center justify-center">
            <div className="relative h-full flex items-center justify-center py-8">
              <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-secondary rounded-3xl blur-2xl opacity-30" />
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center bg-linear-to-br from-primary to-secondary rounded-3xl text-white shadow-2xl  ">
                {icon}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isHovered && caseStudies.length > 0 && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-y-0 right-0 lg:w-[85%] bg-white/98 dark:bg-neutral-900/98 backdrop-blur-xl border-l border-neutral-200 dark:border-neutral-700 rounded-r-3xl p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Related Work
                  </span>
                  <button
                    onClick={() => setIsHovered(false)}
                    className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                  {caseStudies.slice(0, 4).map((study, idx) => (
                    <motion.a
                      key={study.id}
                      href={`/case-studies/${study.slug}`}
                      initial={{ x: 15, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0 bg-neutral-200 dark:bg-neutral-700">
                        {study.featuredImage && typeof study.featuredImage === "object" ? (
                          <Media
                            resource={study.featuredImage}
                            imgClassName="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <span className="text-primary font-bold text-[10px]">{idx + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate group-hover:text-primary transition-colors">
                          {study.title}
                        </h4>
                        {study.client && typeof study.client === "object" && (
                          <p className="text-xs text-neutral-500 truncate">{study.client.name}</p>
                        )}
                      </div>
                      <svg
                        className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0"
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
                    </motion.a>
                  ))}
                </div>
                {caseStudies.length > 4 && (
                  <CMSLink
                    url="/case-studies"
                    label={`View all ${caseStudies.length} projects`}
                    appearance="ghost"
                    className="mt-2 text-xs justify-center"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!isHovered && (
            <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 flex items-center gap-1.5 text-xs text-neutral-500 bg-white/80 dark:bg-neutral-900/80 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
              <span>Hover for related work</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
