"use client"

import React from "react"
import { cn } from "@/utilities/ui"
import { Media } from "@/components/Media"
import type { CaseStudy } from "@/payload-types"

export const CaseStudyCard: React.FC<CaseStudy> = ({
  excerpt,
  featuredImage,
  services,
  results,
  title,
  slug,
  color,
  client,
}) => {
  return (
    <div
      className={cn(
        "group bg-white shadow-xl relative flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-500  transform hover:-translate-y-1",
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {featuredImage && typeof featuredImage === "object" && featuredImage.url && (
          <Media
            resource={featuredImage}
            imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0" />
        {/* Tag */}
        <span
          className="absolute top-4 bg-white text-primary left-4 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          // style={{ background:  color, color:  accent }}
        >
          Case Study
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Header */}
        <div>
          <h3
            className="text-lg font-bold leading-snug group-hover:text-primary"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {title}
          </h3>
          {client && typeof client === "object" && (
            <p
              className="text-xs text-primary font-medium tracking-widest uppercase  mt-3"
              // style={{ color: study.color }}
            >
              {client.name ?? client?.industry}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed flex-1">{excerpt}</p>

        {/* Metrics Row */}
        <div
          className="flex flex-wrap items-stretch justify-center gap-8 pt-4"
          style={{ borderTop: "1px solid #222" }}
        >
          {results?.metrics &&
            results?.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-xl font-black text-primary font-mono">{m.value}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{m.label}</div>
              </div>
            ))}
        </div>

        {/* CTA */}
        <button
          className="mt-2 justify-center group-hover:bg-primary py-1.5 rounded-lg group-hover:text-white flex items-center gap-2 text-sm font-semibold transition-all duration-300"
          // style={{ color: hovered ? study.color : "#666" }}
        >
          Read here
          <svg
            className="transition-transform duration-300 transform group-hover:translate-x-1"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
