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
    setHeaderTheme("light")
  })

  return (
    <div
      className="relative -mt-[10.4rem] min-h-screen flex items-center justify-center overflow-hidden"
      data-theme="light"
    >
      {/* ── Background image ── */}
      {media && typeof media === "object" && (
        <div className="absolute inset-0 -z-20">
          <Media fill imgClassName="object-cover w-full h-full" priority resource={media} />
        </div>
      )}

      {/* ── Light glassmorphism overlay stack ── */}

      {/* 1. Pure white frost — dominant, almost fully opaque */}
      <div className="absolute inset-0 -z-10" style={{ background: "rgba(255, 255, 255, 0.88)" }} />

      {/* 2. Frosted blur */}
      <div className="absolute inset-0 -z-10 backdrop-blur-[8px]" />

      {/* 3. Centre glow — pure white core, barely-there warm tint only at far edges */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 40%, rgba(255,255,255,0.60) 0%, rgba(255,248,240,0.30) 60%, rgba(253,230,210,0.18) 100%)",
        }}
      />

      {/* 4. Noise grain */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* 5. Top edge — pure white nav blend */}
      <div
        className="absolute inset-x-0 top-0 h-56 -z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.98), transparent)" }}
      />

      {/* 6. Bottom edge — neutral white fade, no orange */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 -z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.85), transparent)" }}
      />

      {/* ── Content — dark text on light glass ── */}
      <div className="container-standard relative z-10  pt-40 pb-32">
        <div className="text-center">
          {/* Headline pill — solid primary, matches screenshot exactly */}
          <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
            <Zap className="h-4 w-4" />
            {headline}
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

        {/* ── Feature cards — frosted light panels ── */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {feats && feats.length > 0 ? (
            feats.map((item) => (
              <LightGlassCard
                key={item.id}
                title={item?.title ?? ""}
                delay="animation-delay-600"
                icon={
                  item.icon && typeof item.icon === "object" ? (
                    <Media resource={{ ...item.icon, height: 32, width: 32 }} className="h-8 w-8" />
                  ) : (
                    <Zap className="h-8 w-8 text-primary" />
                  )
                }
              />
            ))
          ) : (
            <>
              <LightGlassCard
                icon={<Palette className="h-8 w-8 text-primary" />}
                title="Creative Design"
                desc="Stunning visuals that capture attention and convert visitors into customers"
                delay="animation-delay-600"
              />
              <LightGlassCard
                icon={<Rocket className="h-8 w-8 text-primary" />}
                title="Digital Strategy"
                desc="Data-driven strategies that accelerate growth and maximise ROI"
                delay="animation-delay-700"
              />
              <LightGlassCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Performance Marketing"
                desc="Results-focused campaigns that deliver measurable business impact"
                delay="animation-delay-800"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Light frosted glass card ──────────────────────────────────────────────────
function LightGlassCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode
  title: string
  desc?: string
  delay?: string
}) {
  return (
    <div
      className={`group ${delay ?? ""} animate-fade-in-up rounded-2xl p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1`}
      style={{
        background: "rgba(255, 255, 255, 0.60)",
        border: "1px solid rgba(215, 210, 205, 0.65)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = "rgba(255, 255, 255, 0.80)"
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.95)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = "rgba(255, 255, 255, 0.60)"
        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)"
      }}
    >
      {/* Icon container — light orange tint, matches screenshot */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(234, 88, 12, 0.07)",
          border: "1px solid rgba(234, 88, 12, 0.09)",
        }}
      >
        {icon}
      </div>
      <h3 className="font-serif font-semibold text-xl text-gray-900 mb-2">{title}</h3>
      {desc && <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>}
    </div>
  )
}
