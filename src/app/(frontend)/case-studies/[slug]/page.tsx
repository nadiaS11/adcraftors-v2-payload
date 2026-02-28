import type { Metadata } from "next"

import { PayloadRedirects } from "@/components/PayloadRedirects"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { draftMode } from "next/headers"
import React, { cache } from "react"
import RichText from "@/components/RichText"
import { Media } from "@/components/Media"
import Link from "next/link"

import type { CaseStudy } from "@/payload-types"

import { generateMeta } from "@/utilities/generateMeta"
import { ServicesGridBlock } from "@/blocks/ServicesGrid/Component"

const colorMap: Record<string, string> = {
  "bg-primary": "#ea580c",
  "bg-blue-600": "#2563eb",
  "bg-green-600": "#16a34a",
  "bg-purple-600": "#9333ea",
  "bg-pink-600": "#db2777",
  "bg-teal-600": "#0d9488",
  "bg-indigo-600": "#4f46e5",
  "bg-rose-600": "#e11d48",
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudies = await payload.find({
    collection: "case-studies",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return caseStudies.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = "" } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = "/case-studies/" + decodedSlug
  const caseStudy = await queryCaseStudyBySlug({ slug: decodedSlug, draft })

  if (!caseStudy) return <PayloadRedirects url={url} />

  const cardColor = colorMap[caseStudy.color || ""] || "#ea580c"

  const relatedCaseStudies = await getRelatedCaseStudies(caseStudy.id)

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${cardColor}08 0%, ${cardColor}15 50%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${cardColor}15 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-10">
            <Link href="/case-studies" className="hover:text-primary transition-colors">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white">{caseStudy.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left - Content */}
            <div className="lg:col-span-7">
              {/* Client Info */}
              {caseStudy.client && typeof caseStudy.client === "object" && (
                <div className="flex items-center gap-4 mb-6">
                  {caseStudy.client.logo && typeof caseStudy.client.logo === "object" && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-md">
                      <Media
                        resource={caseStudy.client.logo}
                        imgClassName="w-full h-full object-contain p-1"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                      Client
                    </p>
                    <p className="text-lg font-bold text-neutral-900 dark:text-white">
                      {caseStudy.client.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                {caseStudy.featured && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-yellow-100 text-yellow-800">
                    Featured Project
                  </span>
                )}
                {caseStudy.projectDate && (
                  <span className="text-sm text-neutral-500 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    {new Date(caseStudy.projectDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              <h1
                className="text-5xl md:text-6xl font-black text-neutral-900 dark:text-white mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {caseStudy.title}
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                {caseStudy.excerpt}
              </p>

              {/* Services */}
              {caseStudy.services && caseStudy.services.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {caseStudy.services.map((service) =>
                    typeof service === "object" ? (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="text-sm font-medium px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors"
                      >
                        {service.title}
                      </Link>
                    ) : null,
                  )}
                </div>
              )}

              {/* Team Members */}
              {caseStudy.teamMembers && caseStudy.teamMembers.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neutral-500">Team:</span>
                  <div className="flex -space-x-2">
                    {caseStudy.teamMembers.slice(0, 5).map((member) =>
                      typeof member === "object" ? (
                        <div
                          key={member.id}
                          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900"
                          title={member.name}
                        >
                          {member.photo && typeof member.photo === "object" ? (
                            <Media
                              resource={member.photo}
                              imgClassName="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-bold">
                              {member.name?.charAt(0) || "?"}
                            </div>
                          )}
                        </div>
                      ) : null,
                    )}
                  </div>
                  {caseStudy.teamMembers.length > 5 && (
                    <span className="text-sm text-neutral-500">
                      +{caseStudy.teamMembers.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Right - Image */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-3xl blur-3xl opacity-40"
                  style={{ background: cardColor }}
                />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                  {caseStudy.featuredImage && typeof caseStudy.featuredImage === "object" ? (
                    <Media
                      resource={caseStudy.featuredImage}
                      imgClassName="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: `${cardColor}10` }}
                    >
                      <div className="text-6xl font-black opacity-20" style={{ color: cardColor }}>
                        Case Study
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          {caseStudy.results?.metrics && caseStudy.results.metrics.length > 0 && (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudy.results.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="rounded-2xl p-6 text-center"
                  style={
                    i === 0
                      ? {
                          background: cardColor,
                          color: "white",
                          boxShadow: `0 12px 32px ${cardColor}40`,
                        }
                      : {
                          background: "white",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }
                  }
                >
                  <div
                    className="text-3xl md:text-4xl font-black"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: i === 0 ? "white" : cardColor,
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="text-xs font-medium mt-2"
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
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg"
                style={{ background: cardColor }}
              >
                01
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {caseStudy.challenge.heading || "The Challenge"}
                </h2>
                <p className="text-neutral-500">What problem needed solving</p>
              </div>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <RichText data={caseStudy.challenge.content} enableGutter={false} />
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      {caseStudy.solution?.content && (
        <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg"
                style={{
                  background: `${cardColor}20`,
                  color: cardColor,
                  border: `1px solid ${cardColor}40`,
                }}
              >
                02
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {caseStudy.solution.heading || "Our Solution"}
                </h2>
                <p className="text-neutral-500">How we approached the project</p>
              </div>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <RichText data={caseStudy.solution.content} enableGutter={false} />
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {caseStudy.results?.content && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg"
                style={{ background: cardColor }}
              >
                03
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {caseStudy.results.heading || "The Results"}
                </h2>
                <p className="text-neutral-500">What we achieved together</p>
              </div>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <RichText data={caseStudy.results.content} enableGutter={false} />
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Project Gallery
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Visual highlights from this project
              </p>
            </div>

            {caseStudy.gallery.length === 1 ? (
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl">
                  {typeof caseStudy.gallery[0].image === "object" && (
                    <Media
                      resource={caseStudy.gallery[0].image}
                      imgClassName="w-full h-full object-cover"
                    />
                  )}
                  {caseStudy.gallery[0].caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white font-medium">{caseStudy.gallery[0].caption}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : caseStudy.gallery.length === 2 ? (
              <div className="grid grid-cols-2 gap-6">
                {caseStudy.gallery.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden aspect-video shadow-lg"
                  >
                    {typeof item.image === "object" && (
                      <Media resource={item.image} imgClassName="w-full h-full object-cover" />
                    )}
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white text-sm font-medium">{item.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {caseStudy.gallery.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden aspect-video shadow-lg"
                  >
                    {typeof item.image === "object" && (
                      <Media resource={item.image} imgClassName="w-full h-full object-cover" />
                    )}
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white text-sm font-medium">{item.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && typeof caseStudy.testimonial === "object" && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="p-12 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${cardColor}08 0%, ${cardColor}03 100%)`,
                border: `1px solid ${cardColor}20`,
              }}
            >
              <svg
                className="w-12 h-12 mx-auto mb-6"
                style={{ color: cardColor }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote
                className="text-2xl md:text-3xl text-neutral-900 dark:text-white mb-8 italic leading-relaxed"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="text-left">
                  {caseStudy.testimonial.author && (
                    <p className="font-bold text-neutral-900 dark:text-white">
                      {caseStudy.testimonial.author}
                    </p>
                  )}
                  {caseStudy.testimonial.role && (
                    <p className="text-sm text-neutral-500">{caseStudy.testimonial.role}</p>
                  )}
                  {caseStudy.testimonial.company && (
                    <p className="text-sm text-neutral-400">{caseStudy.testimonial.company}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {caseStudy.services && caseStudy.services.length > 0 && (
        <section className="py-20 px-6">
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

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                More Case Studies
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Explore other projects we&apos;ve worked on
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCaseStudies.map((related) => {
                const relatedColor = colorMap[related.color || ""] || "#ea580c"
                return (
                  <Link
                    key={related.id}
                    href={`/case-studies/${related.slug}`}
                    className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {typeof related.featuredImage === "object" && (
                        <Media
                          resource={related.featuredImage}
                          imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      {related.client && typeof related.client === "object" && (
                        <p className="text-sm text-neutral-500">
                          {(related.client as { name?: string }).name}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="p-12 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${cardColor}12 0%, ${cardColor}05 100%)`,
              border: `1px solid ${cardColor}20`,
            }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Have a Similar Project in Mind?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can help you achieve results like{" "}
              {caseStudy.client && typeof caseStudy.client === "object"
                ? caseStudy.client.name
                : "our clients"}
              .
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all hover:shadow-lg"
                style={{
                  background: cardColor,
                  color: "white",
                  boxShadow: `0 8px 24px ${cardColor}40`,
                }}
              >
                Start Your Project
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

async function getRelatedCaseStudies(currentId: number) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: "case-studies",
    draft: false,
    limit: 3,
    overrideAccess: false,
    pagination: false,
    where: {
      id: { not_equals: currentId },
    },
  })
  return result.docs
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
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
