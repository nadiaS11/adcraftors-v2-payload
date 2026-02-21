"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
  cardHover,
  scaleIn,
} from "@/lib/animations/variants"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import type {
  CaseStudiesShowcaseBlock as CaseStudiesShowcaseBlockType,
  CaseStudy,
} from "@/payload-types"

type Props = CaseStudiesShowcaseBlockType & {
  caseStudies?: CaseStudy[]
}

export const CaseStudiesShowcaseComponent: React.FC<Props> = ({
  header,
  settings,
  cta,
  caseStudies = [],
}) => {
  const layout = settings?.layout || "grid"
  const showClient = settings?.showClient ?? true
  const showServices = settings?.showServices ?? true
  const showExcerpt = settings?.showExcerpt ?? false

  const isFeatured = layout === "featured-grid"
  const featuredCase = isFeatured ? caseStudies[0] : null
  const otherCases = isFeatured ? caseStudies.slice(1) : caseStudies

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {header?.eyebrow && (
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            {header.eyebrow}
          </motion.span>
        )}

        {header?.headline && (
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {header.headline}
          </motion.h2>
        )}

        {header?.description && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-12 max-w-2xl"
          />
        )}

        {layout === "grid" && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                showClient={showClient}
                showServices={showServices}
                showExcerpt={showExcerpt}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {layout === "featured-grid" && featuredCase && (
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={scaleIn}
            >
              <CaseStudyCard
                caseStudy={featuredCase}
                showClient={showClient}
                showServices={showServices}
                showExcerpt={showExcerpt}
                featured
                index={0}
              />
            </motion.div>

            {otherCases.length > 0 && (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={staggerContainer}
              >
                {otherCases.map((caseStudy, index) => (
                  <CaseStudyCard
                    key={caseStudy.id}
                    caseStudy={caseStudy}
                    showClient={showClient}
                    showServices={showServices}
                    showExcerpt={showExcerpt}
                    index={index + 1}
                  />
                ))}
              </motion.div>
            )}
          </div>
        )}

        {layout === "masonry" && (
          <motion.div
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div key={caseStudy.id} variants={fadeInUp} className="break-inside-avoid">
                <CaseStudyCard
                  caseStudy={caseStudy}
                  showClient={showClient}
                  showServices={showServices}
                  showExcerpt={showExcerpt}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {layout === "slider" && (
          <div className="relative">
            <motion.div
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  variants={fadeInUp}
                  className="flex-shrink-0 w-80 md:w-96 snap-center"
                >
                  <CaseStudyCard
                    caseStudy={caseStudy}
                    showClient={showClient}
                    showServices={showServices}
                    showExcerpt={showExcerpt}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {cta?.enabled && cta.link && (
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <CMSLink
              {...cta.link}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}

type CaseStudyCardProps = {
  caseStudy: CaseStudy
  showClient?: boolean
  showServices?: boolean
  showExcerpt?: boolean
  featured?: boolean
  index: number
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  showClient,
  showServices,
  showExcerpt,
  featured,
  index,
}) => {
  const delay = index * 0.1

  return (
    <motion.article
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300",
        featured ? "md:flex md:items-stretch" : "",
      )}
      whileHover={cardHover}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video",
        )}
      >
        {caseStudy.featuredImage && typeof caseStudy.featuredImage === "object" && (
          <Media
            resource={caseStudy.featuredImage}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className={cn("p-6 md:p-8", featured ? "md:w-1/2 flex flex-col justify-center" : "")}>
        {showClient && caseStudy.client && typeof caseStudy.client === "object" && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-primary">{caseStudy.client.name}</span>
          </div>
        )}

        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>

        {showExcerpt && caseStudy.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-2">{caseStudy.excerpt}</p>
        )}

        {showServices && caseStudy.services && caseStudy.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {caseStudy.services.slice(0, 3).map((service, i) => {
              const serviceName = typeof service === "object" ? service.title : service
              return (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 bg-muted text-muted-foreground rounded-full"
                >
                  {serviceName}
                </span>
              )
            })}
          </div>
        )}

        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 5 }}
        >
          <span className="inline-flex items-center text-primary font-medium">
            View Case Study
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </motion.div>
      </div>
    </motion.article>
  )
}
