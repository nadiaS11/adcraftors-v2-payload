"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { ArrowRight } from "lucide-react"
import type { CallToActionBlock as CTABlockProps } from "@/payload-types"
import RichText from "@/components/RichText"
import { CMSLink } from "@/components/Link"
import { defaultViewport } from "@/lib/animations/variants"
import { Media } from "@/components/Media"

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  eyebrow,
  layout,
  style,
  backgroundImage,
  fullWidth,
}) => {
  const layoutStyle = layout || "centered"
  const ctaStyle = style || "gradient"
  const isFullWidth = fullWidth ?? true

  // ── Background per style ───────────────────────────────────────────────────
  const bgMap = {
    gradient:
      "bg-gradient-to-br from-primary via-primary/95 to-orange-700 text-white overflow-hidden",
    solid: "bg-primary text-white",
    image: "relative text-white",
    transparent: "bg-transparent border border-border",
  }

  // ── Text colour override for richtext children ─────────────────────────────
  const textMap = {
    gradient: "[&_h2]:text-white [&_h3]:text-white [&_p]:text-white/85",
    solid: "[&_h2]:text-white [&_h3]:text-white [&_p]:text-white/85",
    image: "[&_h2]:text-white [&_h3]:text-white [&_p]:text-white/80",
    transparent: "[&_h2]:text-foreground [&_p]:text-muted-foreground",
  }

  return (
    <section className={cn("relative mt-16 lg:mt-32", !isFullWidth && "container")}>
      <motion.div
        className={cn(
          "relative",
          bgMap[ctaStyle as keyof typeof bgMap],
          isFullWidth ? "rounded-none" : "rounded-3xl",
        )}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* ── Gradient decorations ── */}
        {ctaStyle === "gradient" && (
          <>
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.055] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />
            {/* Top-right glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            {/* Bottom-left glow */}
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-900/30 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        {/* ── Background image ── */}
        {ctaStyle === "image" && backgroundImage && typeof backgroundImage === "object" && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {backgroundImage && typeof backgroundImage === "object" && (
              <Media resource={backgroundImage} imgClassName="w-full h-full object-cover" />
            )}{" "}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        )}

        {/* ── Inner ── */}
        <div className={cn("relative z-10", isFullWidth ? "container" : "px-8 md:px-14")}>
          {/* CENTERED ─────────────────────────────────────────────────────── */}
          {layoutStyle === "centered" && (
            <div className="text-center py-14 md:py-20">
              {eyebrow && (
                <span className="inline-block text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">
                  {eyebrow}
                </span>
              )}

              {richText && (
                <div
                  className={cn(
                    "max-w-2xl mx-auto mb-10",
                    textMap[ctaStyle as keyof typeof textMap],
                  )}
                >
                  <RichText
                    className="[&_h2]:text-3xl md:[&_h2]:text-4xl lg:[&_h2]:text-5xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:mb-4 [&_p]:text-lg"
                    data={richText}
                    enableGutter={false}
                  />
                </div>
              )}

              {links &&
                links.length > 0 &&
                links?.map((link) => (
                  <CMSLink size={"lg"} key={link.id} {...link.link} className="group text-lg">
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </CMSLink>
                ))}
            </div>
          )}
          {layoutStyle === "split" && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-14 md:py-18 gap-8">
              <div className="flex-1 max-w-xl">
                {eyebrow && (
                  <span className="inline-block text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">
                    {eyebrow}
                  </span>
                )}
                {richText && (
                  <div className={textMap[ctaStyle as keyof typeof textMap]}>
                    <RichText
                      className="[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_p]:mt-2"
                      data={richText}
                      enableGutter={false}
                    />
                  </div>
                )}
              </div>

              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-3 shrink-0">
                  {links &&
                    links.length > 0 &&
                    links?.map((link) => (
                      <CMSLink size={"lg"} key={link.id} {...link.link} className="group text-lg">
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </CMSLink>
                    ))}
                </div>
              )}
            </div>
          )}
          {layoutStyle === "inline" && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-8 gap-5">
              {richText && (
                <div className={cn("min-w-0", textMap[ctaStyle as keyof typeof textMap])}>
                  <RichText
                    className="[&_h2]:text-lg md:[&_h2]:text-xl [&_h2]:font-bold [&_p]:hidden"
                    data={richText}
                    enableGutter={false}
                  />
                </div>
              )}

              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-3 shrink-0">
                  {links &&
                    links.length > 0 &&
                    links?.map((link) => (
                      <CMSLink size={"lg"} key={link.id} {...link.link} className="group text-lg">
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </CMSLink>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
