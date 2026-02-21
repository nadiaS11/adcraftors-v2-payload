"use client"
import { useHeaderTheme } from "@/providers/HeaderTheme"
import React, { useEffect } from "react"

import type { Page } from "@/payload-types"

import { CMSLink } from "@/components/Link"
import RichText from "@/components/RichText"
import { Zap, ArrowRight, Palette, Rocket } from "lucide-react"
import { Media } from "@/components/Media"

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
  headline,
  feats,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme("dark")
  })

  return (
    <section className="relative bg-gradient-to-br from-background via-card to-muted section-padding overflow-hidden">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern-light-orange.png')] opacity-50"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container-standard relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <Zap className="h-4 w-4" /> {headline}
          </div>

          {richText && (
            <RichText
              data={richText}
              enableProse={false}
              enableGutter={false}
              className="highimpact-hero"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            {links?.map((link) => (
              <CMSLink size={"lg"} key={link.id} {...link.link} className="group text-lg">
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </CMSLink>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {feats?.map((item) => (
            <div key={item.id} className="text-center animate-fade-in-up animation-delay-600 group">
              <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {item.icon && typeof item.icon === "object" && (
                  <Media
                    resource={{ ...item.icon, height: 40, width: 40 }}
                    className="h-10 w-10 text-primary group-hover:text-primary-foreground"
                  />
                )}
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">{item?.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
