"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { staggerContainer, defaultViewport, fadeInUp } from "@/lib/animations/variants"
import type { Service, ServicesGridBlock } from "@/payload-types"
import { ServiceCard } from "./ServiceCard"
import { CMSLink } from "./Link"

interface CollectionServicesClientProps {
  services: Service[]
  columns?: "2" | "3" | "4"
  style?: "cards" | "list" | "image-cards"
  showExcerpt?: boolean
  showLearnMore?: boolean
  cta?: ServicesGridBlock["cta"]
}

export const ServicesCollection: React.FC<CollectionServicesClientProps> = ({
  services,
  columns = "3",
  style = "cards",
  showExcerpt = false,
  showLearnMore = false,
  cta,
}) => {
  const gridCols = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <>
      <motion.div
        className={cn("grid gap-6 md:gap-8", gridCols[columns as keyof typeof gridCols])}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            style={style}
            showExcerpt={showExcerpt}
            showLearnMore={showLearnMore}
          />
        ))}
      </motion.div>
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
    </>
  )
}
