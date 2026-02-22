"use client"

import React from "react"
import { Media } from "@/components/Media"
import type { CaseStudy } from "@/payload-types"
import RichText from "./RichText"
import { cn } from "@/utilities/ui"

export const FeaturedCaseStudyCard: React.FC<CaseStudy> = ({
  featuredImage,
  services,
  results,
  title,
  client,
  testimonial,
  solution,
  challenge,
}) => {
  return (
    <div className="w-full mx-auto p-6 font-sans bg-black rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] flex flex-col gap-5">
      {/* ── Row 1: Service tags ── */}
      {services && services.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {services.map(
            (service) =>
              typeof service === "object" && (
                <span
                  key={service.id}
                  className="text-xs tracking-widest bg-primary text-white uppercase font-bold px-3 py-1 rounded-full"
                >
                  {service.title}
                </span>
              ),
          )}
        </div>
      )}

      {/* ── Row 2: Image (left) + Title, Client & Metrics (right) ── */}
      <div className="flex gap-5 items-stretch">
        {/* Left — image, fixed 42% width */}
        <div className="relative rounded-2xl overflow-hidden w-[42%] shrink-0 min-h-[220px]">
          {featuredImage && typeof featuredImage === "object" && (
            <Media
              resource={featuredImage}
              imgClassName="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Bottom gradient for quote */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.05) 55%)",
            }}
          />
          {testimonial && typeof testimonial === "object" && (
            <div className="absolute bottom-4 left-4 right-4">
              <blockquote
                className="text-white text-sm font-medium leading-relaxed italic mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="text-gray-300 text-xs">— {testimonial.author}</p>
            </div>
          )}
        </div>

        {/* Right — title + client + metrics stacked */}
        <div className="flex flex-col justify-between flex-1 gap-4 min-w-0">
          {/* Title + Client */}
          <div className="flex items-start justify-between gap-3">
            <h2
              className="text-2xl md:text-[1.75rem] font-black leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </h2>
            {client && typeof client === "object" && (
              <div className="text-right shrink-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Client</p>
                <p className="text-white font-bold text-sm leading-tight">{client.name}</p>
                {client.industry && <p className="text-gray-500 text-xs">{client.industry}</p>}
              </div>
            )}
          </div>

          {/* Metrics 2×2 */}
          {results?.metrics && results.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {results.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={cn(
                    "rounded-xl px-3 py-3 flex flex-col items-center justify-center text-center",
                    i === 0 ? "bg-primary text-white" : "bg-[#161616]  text-white",
                  )}
                >
                  <span
                    className="text-2xl font-black leading-none"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {m.value}
                  </span>
                  <span className="text-xs font-medium opacity-75 mt-1 leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Row 3: Challenge + Solution ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Challenge */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "#161616", border: "1px solid #2a2a2a" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: "#FF5C3A", color: "#fff" }}
            >
              01
            </div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest">
              The Challenge
            </h3>
          </div>
          {challenge?.content && (
            <RichText
              data={challenge.content}
              enableProse={false}
              className="text-gray-400 text-sm leading-relaxed"
            />
          )}
        </div>

        {/* Solution */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "#161616", border: "1px solid #2a2a2a" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: "#C8F562", color: "#111" }}
            >
              02
            </div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest">Our Solution</h3>
          </div>
          {solution?.content && (
            <RichText
              data={solution.content}
              enableProse={false}
              className="text-gray-400 text-sm leading-relaxed"
            />
          )}
        </div>
      </div>
    </div>
  )
}
