"use client"
import { cn } from "@/utilities/ui"
import React from "react"
import { motion } from "framer-motion"
import type { CaseStudiesShowcaseBlock, CaseStudy } from "@/payload-types"
import {
  defaultViewport,
  fadeInUp,
  staggerContainer,
  scaleIn,
  cardHover,
} from "@/lib/animations/variants"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"

export type Props = {
  header?: CaseStudiesShowcaseBlock["header"]
  cta?: CaseStudiesShowcaseBlock["cta"]
  layout?: "grid" | "masonry" | "featured-grid" | "slider" | null | undefined
  caseStudies: CaseStudyCardProps[]
  showClient?: boolean
  showServices?: boolean
  showExcerpt?: boolean
  otherCases?: CaseStudyCardProps[]
}

export const CaseStudiesCollection: React.FC<Props> = (props) => {
  const { layout, header, caseStudies, showClient, showServices, showExcerpt, otherCases, cta } =
    props

  return (
    <>
      {(header?.eyebrow || header?.headline) && (
        <>
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
        </>
      )}

      {layout === "grid" && (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.id}
              title={caseStudy.title || ""}
              featuredImage={caseStudy.featuredImage}
              client={caseStudy.client}
              services={caseStudy.services}
              showClient={showClient}
              showServices={showServices}
              showExcerpt={showExcerpt}
            />
          ))}
        </motion.div>
      )}

      {layout === "featured-grid" && (
        <div className="space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={scaleIn}
          >
            <CaseStudyCard
              title={caseStudies[0]?.title || ""}
              featuredImage={caseStudies[0]?.featuredImage}
              client={caseStudies[0]?.client}
              services={caseStudies[0]?.services}
              showClient={showClient}
              showServices={showServices}
              showExcerpt={showExcerpt}
              featured
            />
          </motion.div>

          {otherCases && otherCases?.length > 0 && (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              {otherCases?.map((caseStudy) => (
                <CaseStudyCard
                  key={caseStudy.id}
                  title={caseStudy.title || ""}
                  featuredImage={caseStudy.featuredImage}
                  client={caseStudy.client}
                  services={caseStudy.services}
                  showClient={showClient}
                  showServices={showServices}
                  showExcerpt={showExcerpt}
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
          {caseStudies.map((caseStudy) => (
            <motion.div key={caseStudy.id} variants={fadeInUp} className="break-inside-avoid">
              <CaseStudyCard
                title={caseStudy.title || ""}
                featuredImage={caseStudy.featuredImage}
                client={caseStudy.client}
                services={caseStudy.services}
                showClient={showClient}
                showServices={showServices}
                showExcerpt={showExcerpt}
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
            {caseStudies.map((caseStudy) => (
              <motion.div
                key={caseStudy.id}
                variants={fadeInUp}
                className="shrink-0 w-80 md:w-96 snap-center"
              >
                <CaseStudyCard
                  title={caseStudy.title || ""}
                  featuredImage={caseStudy.featuredImage}
                  client={caseStudy.client}
                  services={caseStudy.services}
                  showClient={showClient}
                  showServices={showServices}
                  showExcerpt={showExcerpt}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {cta && cta?.enabled && cta.link && (
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
    </>
  )
}
export type CaseStudyCardProps = {
  id?: number
  title: string
  excerpt?: string
  featuredImage?: CaseStudy["featuredImage"]
  client?: CaseStudy["client"]
  services?: CaseStudy["services"]
  showClient?: boolean
  showServices?: boolean
  showExcerpt?: boolean
  featured?: boolean
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  id,
  title,
  excerpt,
  featuredImage,
  client,
  services,
  showClient,
  showServices,
  showExcerpt,
  featured,
}) => {
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
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video",
        )}
      >
        {featuredImage && typeof featuredImage === "object" && (
          <Media
            resource={featuredImage}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className={cn("p-6 md:p-8", featured ? "md:w-1/2 flex flex-col justify-center" : "")}>
        {showClient && client && typeof client === "object" && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-primary">{client.name}</span>
          </div>
        )}

        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {showExcerpt && excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
        )}

        {showServices && services && services.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {services.slice(0, 3).map((service, i) => {
              const serviceId = typeof service === "object" ? service.id : service
              const serviceName = typeof service === "object" ? service.title : service
              return (
                <span
                  key={serviceId || i}
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
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
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
