import React from "react"
import { Media } from "@/components/Media"
import type { CaseStudy } from "@/payload-types"
import RichText from "./RichText"

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
    <div
      className="w-full mx-auto p-6 font-sans rounded-3xl flex flex-col gap-5"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(234,88,12,0.05), rgba(234,88,12,0.10), transparent)",
        border: "1px solid rgba(234,88,12,0.10)",
        boxShadow: "0 32px 64px -12px rgba(0,0,0,0.08)",
      }}
    >
      {/* ── Row 1: Service tags ── */}
      {services && services.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {services.map(
            (service) =>
              typeof service === "object" && (
                <span
                  key={service.id}
                  className="text-xs tracking-widest bg-primary text-white uppercase font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/30"
                >
                  {service.title}
                </span>
              ),
          )}
        </div>
      )}

      {/* ── Row 2: Image (left) + Title, Client & Metrics (right) ── */}
      <div className="flex flex-wrap gap-5 items-stretch">
        {/* Left — image with glass quote overlay */}
        <div className="relative rounded-2xl overflow-hidden w-full lg:w-[42%] shrink-0 min-h-55">
          {featuredImage && typeof featuredImage === "object" && (
            <Media
              resource={featuredImage}
              imgClassName="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Warm-tinted gradient — not pure black, matches primary palette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(120,40,5,0.82) 0%, rgba(234,88,12,0.15) 55%, transparent 100%)",
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
              <p className="text-orange-200 text-xs">— {testimonial.author}</p>
            </div>
          )}
        </div>

        {/* Right — title + client + metrics */}
        <div className="flex flex-col justify-between flex-1 gap-4 min-w-0">
          {/* Title + Client */}
          <div className="flex items-start justify-between gap-3">
            <h2
              className="text-2xl md:text-[1.75rem] font-black leading-tight text-neutral-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </h2>
            {client && typeof client === "object" && (
              <div className="text-right shrink-0">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Client</p>
                <p className="text-neutral-900 dark:text-white font-bold text-sm leading-tight">
                  {client.name}
                </p>
                {client.industry && <p className="text-neutral-500 text-xs">{client.industry}</p>}
              </div>
            )}
          </div>

          {/* Metrics 2×2 — glass panels */}
          {results?.metrics && results.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {results.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="rounded-xl px-3 py-3 flex flex-col items-center justify-center text-center backdrop-blur-sm"
                  style={
                    i === 0
                      ? {
                          background: "rgba(234,88,12,1)",
                          color: "white",
                          boxShadow: "0 4px 16px rgba(234,88,12,0.35)",
                        }
                      : {
                          background: "rgba(255,255,255,0.55)",
                          border: "1px solid rgba(234,88,12,0.12)",
                          color: "inherit",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                        }
                  }
                >
                  <span
                    className="text-2xl font-black leading-none"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: i === 0 ? "white" : "rgba(234,88,12,1)",
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="text-xs font-medium mt-1 leading-tight"
                    style={{ opacity: i === 0 ? 0.85 : 0.65 }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Row 3: Challenge + Solution — glass panels ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Challenge */}
        <div
          className="rounded-2xl p-5 backdrop-blur-sm"
          style={{
            background: "rgba(255,255,255,0.50)",
            border: "1px solid rgba(234,88,12,0.10)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-md"
              style={{
                background: "rgba(234,88,12,1)",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(234,88,12,0.40)",
              }}
            >
              01
            </div>
            <h3 className="text-neutral-700 dark:text-neutral-200 font-bold text-xs uppercase tracking-widest">
              The Challenge
            </h3>
          </div>
          {challenge?.content && (
            <RichText
              data={challenge.content}
              enableProse={false}
              className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed"
            />
          )}
        </div>

        {/* Solution */}
        <div
          className="rounded-2xl p-5 backdrop-blur-sm"
          style={{
            background: "rgba(255,255,255,0.50)",
            border: "1px solid rgba(234,88,12,0.10)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
              style={{
                background: "rgba(234,88,12,0.12)",
                color: "rgba(234,88,12,1)",
                border: "1px solid rgba(234,88,12,0.25)",
              }}
            >
              02
            </div>
            <h3 className="text-neutral-700 dark:text-neutral-200 font-bold text-xs uppercase tracking-widest">
              Our Solution
            </h3>
          </div>
          {solution?.content && (
            <RichText
              data={solution.content}
              enableProse={false}
              className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed"
            />
          )}
        </div>
      </div>
    </div>
  )
}
