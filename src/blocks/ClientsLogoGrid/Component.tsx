"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations/variants"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import type { ClientsLogoGridBlock as ClientsLogoGridBlockType, Client } from "@/payload-types"

type Props = ClientsLogoGridBlockType & {
  clients?: Client[]
}

export const ClientsLogoGridComponent: React.FC<Props> = ({
  header,
  settings,
  cta,
  clients = [],
}) => {
  const layout = settings?.layout || "grid"
  const logosPerRow = settings?.logosPerRow || "6"
  const grayscale = settings?.grayscale ?? true
  const logoSize = settings?.logoSize || "medium"

  const gridCols = {
    "4": "grid-cols-2 md:grid-cols-4",
    "5": "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    "6": "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    "8": "grid-cols-2 md:grid-cols-4 lg:grid-cols-8",
  }

  const logoSizeClasses = {
    small: "h-8 md:h-10",
    medium: "h-10 md:h-12",
    large: "h-12 md:h-16",
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {header?.headline && (
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8"
          >
            {header.headline}
          </motion.p>
        )}

        {layout === "grid" && (
          <motion.div
            className={cn("grid gap-8 md:gap-12", gridCols[logosPerRow as keyof typeof gridCols])}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {clients.map((client) => (
              <motion.div
                key={client.id}
                variants={fadeInUp}
                className={cn(
                  "flex items-center justify-center",
                  grayscale && "grayscale hover:grayscale-0",
                  "transition-all duration-300",
                )}
              >
                {client.logo && typeof client.logo === "object" && (
                  <Media
                    resource={client.logo}
                    className={cn(
                      "w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300",
                      logoSizeClasses[logoSize as keyof typeof logoSizeClasses],
                    )}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {layout === "row" && (
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {clients.map((client) => (
              <motion.div
                key={client.id}
                variants={fadeInUp}
                className={cn(
                  grayscale && "grayscale hover:grayscale-0",
                  "transition-all duration-300",
                )}
              >
                {client.logo && typeof client.logo === "object" && (
                  <Media
                    resource={client.logo}
                    className={cn(
                      "w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300",
                      logoSizeClasses[logoSize as keyof typeof logoSizeClasses],
                    )}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {layout === "marquee" && (
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />

            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [0, "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className={cn(
                    "flex-shrink-0",
                    grayscale && "grayscale hover:grayscale-0",
                    "transition-all duration-300",
                  )}
                >
                  {client.logo && typeof client.logo === "object" && (
                    <Media
                      resource={client.logo}
                      className={cn(
                        "w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300",
                        logoSizeClasses[logoSize as keyof typeof logoSizeClasses],
                      )}
                    />
                  )}
                </div>
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
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
