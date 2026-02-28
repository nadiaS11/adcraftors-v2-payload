import type { Metadata } from "next"

import { PayloadRedirects } from "@/components/PayloadRedirects"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { draftMode } from "next/headers"
import React, { cache } from "react"
import RichText from "@/components/RichText"
import { Media } from "@/components/Media"

import type { CaseStudy } from "@/payload-types"

import { generateMeta } from "@/utilities/generateMeta"
import { ServicesGridBlock } from "@/blocks/ServicesGrid/Component"

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudies = await payload.find({
    collection: "case-studies",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return caseStudies.docs.map(({ slug }) => ({
    slug,
  }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = "" } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = "/case-studies/" + decodedSlug
  const caseStudy = await queryCaseStudyBySlug({ slug: decodedSlug, draft })

  if (!caseStudy) return <PayloadRedirects url={url} />

  const cardColor = caseStudy.color || "#ea580c"

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${cardColor}08 0%, ${cardColor}15 50%, transparent 100%)`,
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <a href="/case-studies" className="hover:text-primary transition-colors">
              Case Studies
            </a>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white">{caseStudy.title}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Title & Info */}
            <div className="flex-1">
              {/* Client */}
              {caseStudy.client && typeof caseStudy.client === "object" && (
                <p className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                  {caseStudy.client.name}
                  {caseStudy.client.industry && ` — ${caseStudy.client.industry}`}
                </p>
              )}

              <h1
                className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {caseStudy.title}
              </h1>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed mb-6">
                {caseStudy.excerpt}
              </p>

              {/* Services */}
              {caseStudy.services && caseStudy.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {caseStudy.services.map(
                    (service) =>
                      typeof service === "object" && (
                        <span
                          key={service.id}
                          className="text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                        >
                          {service.title}
                        </span>
                      ),
                  )}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {caseStudy.featuredImage && typeof caseStudy.featuredImage === "object" && (
              <div className="w-full lg:w-[45%]">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <Media
                    resource={caseStudy.featuredImage}
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Metrics */}
          {caseStudy.results?.metrics && caseStudy.results.metrics.length > 0 && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudy.results.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="rounded-2xl p-6 text-center"
                  style={
                    i === 0
                      ? {
                          background: cardColor,
                          color: "white",
                          boxShadow: `0 8px 24px ${cardColor}40`,
                        }
                      : {
                          background: "white",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }
                  }
                >
                  <div
                    className="text-3xl font-black"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: i === 0 ? "white" : cardColor,
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="text-xs font-medium mt-1"
                    style={{ opacity: i === 0 ? 0.9 : 0.7 }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Challenge Section */}
      {caseStudy.challenge?.content && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: cardColor }}
              >
                01
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {caseStudy.challenge.heading || "The Challenge"}
              </h2>
            </div>
            <RichText
              data={caseStudy.challenge.content}
              enableGutter={false}
              className="prose prose-lg dark:prose-invert max-w-none"
            />
          </div>
        </section>
      )}

      {/* Solution Section */}
      {caseStudy.solution?.content && (
        <section className="py-16 px-6 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{
                  background: `${cardColor}20`,
                  color: cardColor,
                  border: `1px solid ${cardColor}40`,
                }}
              >
                02
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {caseStudy.solution.heading || "Our Solution"}
              </h2>
            </div>
            <RichText
              data={caseStudy.solution.content}
              enableGutter={false}
              className="prose prose-lg dark:prose-invert max-w-none"
            />
          </div>
        </section>
      )}

      {/* Results Section */}
      {caseStudy.results?.content && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: cardColor }}
              >
                03
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {caseStudy.results.heading || "The Results"}
              </h2>
            </div>
            <RichText
              data={caseStudy.results.content}
              enableGutter={false}
              className="prose prose-lg dark:prose-invert max-w-none"
            />
          </div>
        </section>
      )}

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="py-16 px-6 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Project Gallery
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy.gallery.map((item, index) => (
                <div key={index} className="relative rounded-2xl overflow-hidden aspect-video">
                  {typeof item.image === "object" && (
                    <Media resource={item.image} imgClassName="w-full h-full object-cover" />
                  )}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm">{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && typeof caseStudy.testimonial === "object" && (
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="p-10 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${cardColor}08 0%, ${cardColor}03 100%)`,
                border: `1px solid ${cardColor}20`,
              }}
            >
              <svg
                className="w-10 h-10 mx-auto mb-6"
                style={{ color: cardColor }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote
                className="text-xl md:text-2xl text-neutral-900 dark:text-white mb-6 italic"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>
              {caseStudy.testimonial.author && (
                <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                  — {caseStudy.testimonial.author}
                </p>
              )}
              {caseStudy.testimonial.role && (
                <p className="text-sm text-neutral-500">{caseStudy.testimonial.role}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {caseStudy.services && caseStudy.services.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <ServicesGridBlock
              type="grid"
              populateBy="selection"
              limit={3}
              blockType="srvgrd"
              title="Services Used in This Project"
              selectedServices={caseStudy.services}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="p-10 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${cardColor}10 0%, ${cardColor}05 100%)`,
              border: `1px solid ${cardColor}20`,
            }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Have a similar project in mind?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Let&apos;s discuss how we can help you achieve similar results.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors"
              style={{ background: cardColor, color: "white" }}
            >
              Get in Touch
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const { isEnabled: draft } = await draftMode()
  const caseStudy = await queryCaseStudyBySlug({ slug: decodedSlug, draft })

  return generateMeta({ doc: caseStudy })
}

const queryCaseStudyBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: "case-studies",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
