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
    <div
      className="relative -mt-[10.4rem] min-h-screen flex items-center justify-center text-white overflow-hidden"
      data-theme="dark"
    >
      {/* ── Background image ── */}
      {media && typeof media === "object" && (
        <div className="absolute inset-0 -z-20">
          <Media fill imgClassName="object-cover w-full h-full" priority resource={media} />
        </div>
      )}

      {/* ── Glass layers stacked on top of the image ── */}

      {/* 1. Dark base tint */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* 2. Colour wash that picks up your primary hue */}
      <div className="absolute inset-0 -z-10 bg-primary/20 mix-blend-multiply" />

      {/* 3. Frosted-glass blur panel — covers the whole hero */}
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      {/* 4. Vignette — darkens edges, keeps centre bright */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* 5. Subtle noise grain overlay for texture */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* 6. Top & bottom fade so it blends into page sections */}
      <div className="absolute inset-x-0 top-0 h-40 -z-10 bg-linear-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 -z-10 bg-linear-to-t from-black/70 to-transparent" />

      {/* ── Content ── */}
      <div className="container-standard relative z-10 py-32">
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

        {/* ── Feature cards — now glass panels ── */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {feats && feats.length > 0 ? (
            feats.map((item) => (
              <div
                key={item.id}
                className="group animate-fade-in-up animation-delay-600 rounded-2xl p-6 text-center
                           backdrop-blur-md bg-white/10 border border-white/15
                           hover:bg-white/20 hover:border-white/30
                           transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5
                             bg-white/10 border border-white/15
                             group-hover:bg-primary group-hover:border-primary
                             transition-all duration-300"
                >
                  {item.icon && typeof item.icon === "object" && (
                    <Media
                      resource={{ ...item.icon, height: 32, width: 32 }}
                      className="h-8 w-8 text-white"
                    />
                  )}
                </div>
                <h3 className="font-serif font-semibold text-xl text-white">{item?.title}</h3>
              </div>
            ))
          ) : (
            <>
              {[
                {
                  icon: <Palette className="h-8 w-8 text-white" />,
                  title: "Creative Design",
                  desc: "Stunning visuals that capture attention and convert visitors into customers",
                  delay: "animation-delay-600",
                },
                {
                  icon: <Rocket className="h-8 w-8 text-white" />,
                  title: "Digital Strategy",
                  desc: "Data-driven strategies that accelerate growth and maximise ROI",
                  delay: "animation-delay-700",
                },
                {
                  icon: <Zap className="h-8 w-8 text-white" />,
                  title: "Performance Marketing",
                  desc: "Results-focused campaigns that deliver measurable business impact",
                  delay: "animation-delay-800",
                },
              ].map(({ icon, title, desc, delay }) => (
                <div
                  key={title}
                  className={`group ${delay} animate-fade-in-up rounded-2xl p-6 text-center
                             backdrop-blur-md bg-white/10 border border-white/15
                             hover:bg-white/20 hover:border-white/30
                             transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)]`}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5
                               bg-white/10 border border-white/15
                               group-hover:bg-primary group-hover:border-primary
                               transition-all duration-300"
                  >
                    {icon}
                  </div>
                  <h3 className="font-serif font-semibold text-xl text-white mb-2">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
