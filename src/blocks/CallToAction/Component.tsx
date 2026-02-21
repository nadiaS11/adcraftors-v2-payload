"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import type { CallToActionBlock as CTABlockProps } from "@/payload-types"
import RichText from "@/components/RichText"
import { CMSLink } from "@/components/Link"
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  defaultViewport,
  scaleIn,
} from "@/lib/animations/variants"

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  eyebrow,
  layout,
  style,
  backgroundImage,
  fullWidth,
  padding,
}) => {
  const layoutStyle = layout || "centered"
  const ctaStyle = style || "gradient"
  const isFullWidth = fullWidth ?? true
  const paddingSize = padding || "medium"

  const paddingClasses = {
    small: "py-8 md:py-12",
    medium: "py-12 md:py-16 lg:py-20",
    large: "py-16 md:py-24 lg:py-32",
  }

  const bgStyles = {
    gradient:
      "bg-gradient-to-r from-primary via-primary/90 to-accent text-white relative overflow-hidden",
    solid: "bg-primary text-white",
    image: "relative text-white",
    transparent: "bg-transparent border border-border",
  }

  const contentStyles = {
    gradient: "text-white [&_*]:text-white/90 [&_h2]:text-white [&_h3]:text-white",
    solid: "text-white [&_*]:text-white/90 [&_h2]:text-white [&_h3]:text-white",
    image: "text-white relative z-10",
    transparent: "text-foreground",
  }

  const buttonStyles = {
    gradient: "bg-white text-primary hover:bg-white/90",
    solid: "bg-white text-primary hover:bg-white/90",
    image: "bg-primary text-white hover:bg-primary/90",
    transparent: "bg-primary text-white hover:bg-primary/90",
  }

  return (
    <section
      className={cn(
        "relative",
        !isFullWidth && "container",
        paddingClasses[paddingSize as keyof typeof paddingClasses],
      )}
    >
      <motion.div
        className={cn(
          "relative rounded-2xl overflow-hidden",
          bgStyles[ctaStyle as keyof typeof bgStyles],
          !isFullWidth && "mx-0",
          isFullWidth && "rounded-none",
        )}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={scaleIn}
      >
        {ctaStyle === "gradient" && (
          <>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <motion.div
              className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        )}

        {ctaStyle === "image" && backgroundImage && typeof backgroundImage === "object" && (
          <>
            <div className="absolute inset-0">
              <img src={backgroundImage.url || ""} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            </div>
          </>
        )}

        <div className={cn("relative z-10", isFullWidth ? "container" : "px-8 md:px-12")}>
          {layoutStyle === "centered" && (
            <motion.div
              className="text-center py-12 md:py-16 lg:py-20"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {eyebrow && (
                <motion.span
                  variants={fadeInUp}
                  className="inline-block text-sm font-semibold uppercase tracking-wider mb-4 opacity-90"
                >
                  {eyebrow}
                </motion.span>
              )}

              {richText && (
                <motion.div
                  variants={fadeInUp}
                  className={cn(
                    "max-w-2xl mx-auto mb-8",
                    contentStyles[ctaStyle as keyof typeof contentStyles],
                  )}
                >
                  <RichText
                    className="[&_h2]:text-3xl md:[&_h2]:text-4xl lg:[&_h2]:text-5xl [&_h2]:font-bold [&_h2]:mb-4 [&_p]:text-lg [&_p]:opacity-90"
                    data={richText}
                    enableGutter={false}
                  />
                </motion.div>
              )}

              {links && links.length > 0 && (
                <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                  {links.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      className={cn(
                        i === 0
                          ? buttonStyles[ctaStyle as keyof typeof buttonStyles]
                          : "border-2 border-white/30 text-white hover:bg-white/10",
                        "px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105",
                      )}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {layoutStyle === "split" && (
            <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-16 gap-8">
              <motion.div
                className="flex-1 max-w-2xl"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                {eyebrow && (
                  <motion.span
                    variants={fadeInLeft}
                    className="inline-block text-sm font-semibold uppercase tracking-wider mb-4 opacity-90"
                  >
                    {eyebrow}
                  </motion.span>
                )}
                {richText && (
                  <motion.div
                    variants={fadeInLeft}
                    className={contentStyles[ctaStyle as keyof typeof contentStyles]}
                  >
                    <RichText
                      className="[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_p]:opacity-90"
                      data={richText}
                      enableGutter={false}
                    />
                  </motion.div>
                )}
              </motion.div>

              {links && links.length > 0 && (
                <motion.div
                  variants={fadeInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  className="flex flex-wrap gap-4"
                >
                  {links.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      className={cn(
                        i === 0
                          ? buttonStyles[ctaStyle as keyof typeof buttonStyles]
                          : "border-2 border-white/30 text-white hover:bg-white/10",
                        "px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105",
                      )}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {layoutStyle === "inline" && (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-between py-8 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <motion.div variants={fadeInLeft} className="flex items-center gap-4">
                {eyebrow && (
                  <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                    {eyebrow}
                  </span>
                )}
                {richText && (
                  <div className={contentStyles[ctaStyle as keyof typeof contentStyles]}>
                    <RichText
                      className="[&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:font-bold [&_p]:hidden"
                      data={richText}
                      enableGutter={false}
                    />
                  </div>
                )}
              </motion.div>

              {links && links.length > 0 && (
                <motion.div variants={fadeInRight} className="flex flex-wrap gap-3">
                  {links.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      className={cn(
                        i === 0
                          ? buttonStyles[ctaStyle as keyof typeof buttonStyles]
                          : "border-2 border-white/30 text-white hover:bg-white/10",
                        "px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-sm",
                      )}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
