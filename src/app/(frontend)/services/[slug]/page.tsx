import type { Metadata } from "next"

import { PayloadRedirects } from "@/components/PayloadRedirects"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { draftMode } from "next/headers"
import React, { cache } from "react"
import RichText from "@/components/RichText"
import { Media } from "@/components/Media"

import type { Service } from "@/payload-types"

import { generateMeta } from "@/utilities/generateMeta"

const icons: Record<string, React.ReactNode> = {
  palette: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),
  code: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  ),
  search: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
  target: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
  "pen-tool": (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
      />
    </svg>
  ),
  share: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
      />
    </svg>
  ),
  "bar-chart": (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  zap: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  ),
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: "services",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return services.docs.map(({ slug }) => ({
    slug,
  }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ServicePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = "" } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = "/services/" + decodedSlug
  const service = await queryServiceBySlug({ slug: decodedSlug, draft })

  if (!service) return <PayloadRedirects url={url} />

  const iconKey = service.icon || "zap"
  const icon = icons[iconKey] || icons.zap
  const categoryLabel = service.category
    ? service.category.charAt(0).toUpperCase() + service.category.slice(1)
    : ""

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <a href="/services" className="hover:text-primary transition-colors">
              Services
            </a>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white">{categoryLabel}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Icon & Title */}
            <div className="flex-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-6 shadow-lg shadow-primary/25">
                {icon}
              </div>

              <h1
                className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {service.title}
              </h1>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                {service.excerpt}
              </p>

              {service.category && (
                <span className="inline-block mt-6 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {categoryLabel}
                </span>
              )}
            </div>

            {/* Featured Image */}
            {service.featuredImage && typeof service.featuredImage === "object" && (
              <div className="w-full lg:w-[45%]">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <Media
                    resource={service.featuredImage}
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description Section */}
      {service.description && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <RichText
              data={service.description}
              enableGutter={false}
              className="prose prose-lg dark:prose-invert max-w-none"
            />
          </div>
        </section>
      )}

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <section className="py-16 px-6 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
              What&apos;s Included
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
              How We Work
            </h2>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/30 hidden md:block" />

              <div className="space-y-8">
                {service.process
                  .sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0))
                  .map((step, index) => (
                    <div key={index} className="flex items-start gap-6 relative">
                      <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/25 z-10">
                        {step.stepNumber || index + 1}
                      </div>
                      <div className="flex-1 pt-3">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        {step.description && (
                          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Let&apos;s discuss how we can help with your {service.title.toLowerCase()} needs.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
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
  const service = await queryServiceBySlug({ slug: decodedSlug, draft })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: "services",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})
