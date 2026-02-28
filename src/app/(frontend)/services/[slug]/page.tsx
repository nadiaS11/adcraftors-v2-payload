import type { Metadata } from "next"

import { PayloadRedirects } from "@/components/PayloadRedirects"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { draftMode } from "next/headers"
import React, { cache } from "react"
import RichText from "@/components/RichText"
import { Media } from "@/components/Media"
import Link from "next/link"

import type { Service } from "@/payload-types"

import { generateMeta } from "@/utilities/generateMeta"

const icons: Record<string, React.ReactNode> = {
  palette: (
    <svg
      className="w-10 h-10"
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
      className="w-10 h-10"
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
      className="w-10 h-10"
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
      className="w-10 h-10"
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
      className="w-10 h-10"
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
      className="w-10 h-10"
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
      className="w-10 h-10"
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
      className="w-10 h-10"
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

const categoryInfo: Record<string, { label: string; color: string; description: string }> = {
  branding: { label: "Branding", color: "#ec4899", description: "Strategic brand development" },
  web: {
    label: "Web Design & Development",
    color: "#3b82f6",
    description: "Modern web experiences",
  },
  seo: { label: "SEO", color: "#10b981", description: "Search engine optimization" },
  advertising: {
    label: "Paid Advertising",
    color: "#f59e0b",
    description: "Performance-driven campaigns",
  },
  content: {
    label: "Content Marketing",
    color: "#8b5cf6",
    description: "Compelling content strategies",
  },
  social: { label: "Social Media", color: "#06b6d4", description: "Engaging social presence" },
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: "services",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return services.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
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
  const categoryData = categoryInfo[service.category] || {
    label: service.category || "Service",
    color: "#ea580c",
    description: "",
  }

  const relatedServices = await getRelatedServices(service.id)

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${categoryData.color}08 0%, ${categoryData.color}15 50%, transparent 100%)`,
          }}
        />

        {/* Animated Background Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${categoryData.color}15 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-10">
            <Link href="/services" className="hover:text-primary transition-colors">
              All Services
            </Link>
            <span>/</span>
            <Link
              href={`/services?category=${service.category}`}
              className="hover:text-primary transition-colors"
            >
              {categoryData.label}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                  style={{ background: categoryData.color }}
                >
                  {icon}
                </div>
                {service.featured && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>

              <h1
                className="text-5xl md:text-6xl font-black text-neutral-900 dark:text-white mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {service.title}
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                {service.excerpt}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  <span className="font-medium">{categoryData.description}</span>
                </div>
                {service.features && (
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">{service.features.length} Features</span>
                  </div>
                )}
                {service.process && (
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">{service.process.length} Step Process</span>
                  </div>
                )}
              </div>

              {/* Category & Order */}
              <div className="flex items-center gap-4">
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full"
                  style={{ background: `${categoryData.color}15`, color: categoryData.color }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: categoryData.color }}
                  />
                  {categoryData.label}
                </span>
                {service.displayOrder !== null && service.displayOrder !== undefined && (
                  <span className="text-sm text-neutral-500">Order: #{service.displayOrder}</span>
                )}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                  style={{ background: categoryData.color }}
                />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                  {service.featuredImage && typeof service.featuredImage === "object" ? (
                    <Media
                      resource={service.featuredImage}
                      imgClassName="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: `${categoryData.color}10` }}
                    >
                      <div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center text-white"
                        style={{ background: categoryData.color }}
                      >
                        {icon}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {service.description && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                About This Service
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <RichText data={service.description} enableGutter={false} />
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                What&apos;s Included
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Comprehensive features and benefits designed to help your business succeed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: categoryData.color }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      {feature.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Our Process
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                A proven methodology ensuring quality results every time.
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

              <div className="space-y-6">
                {service.process
                  .sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0))
                  .map((step, index) => (
                    <div key={index} className="flex items-start gap-6 relative">
                      <div
                        className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-lg z-10"
                        style={{ background: categoryData.color }}
                      >
                        {step.stepNumber || index + 1}
                      </div>
                      <div className="flex-1 pt-2">
                        <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary/30 transition-colors">
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
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-neutral-900 dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our {service.title}?</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Experience the difference of working with industry experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: categoryData.color }}
              >
                10+
              </div>
              <h3 className="text-white font-bold mb-2">Years Experience</h3>
              <p className="text-neutral-400 text-sm">Proven track record in delivering results</p>
            </div>
            <div className="text-center p-6">
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: categoryData.color }}
              >
                500+
              </div>
              <h3 className="text-white font-bold mb-2">Projects Delivered</h3>
              <p className="text-neutral-400 text-sm">Successful client engagements</p>
            </div>
            <div className="text-center p-6">
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: categoryData.color }}
              >
                98%
              </div>
              <h3 className="text-white font-bold mb-2">Client Satisfaction</h3>
              <p className="text-neutral-400 text-sm">Committed to excellence</p>
            </div>
            <div className="text-center p-6">
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: categoryData.color }}
              >
                24/7
              </div>
              <h3 className="text-white font-bold mb-2">Support</h3>
              <p className="text-neutral-400 text-sm">Always here when you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Related Services
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Explore other services that complement {service.title}.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((related) => {
                const relatedIcon = icons[related.icon || "zap"] || icons.zap
                const relatedCategory = categoryInfo[related.category] || {
                  label: related.category || "Service",
                  color: "#ea580c",
                  description: "",
                }
                return (
                  <Link
                    key={related.id}
                    href={`/services/${related.slug}`}
                    className="group p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4"
                      style={{ background: relatedCategory.color }}
                    >
                      {relatedIcon}
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-primary font-medium text-sm">
                      Learn More{" "}
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
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
              background: `linear-gradient(135deg, ${categoryData.color}10 0%, ${categoryData.color}05 100%)`,
              border: `1px solid ${categoryData.color}20`,
            }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how our {service.title.toLowerCase()} services can help your
              business achieve its goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25"
                style={{ background: categoryData.color, color: "white" }}
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
                href="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

async function getRelatedServices(currentServiceId: number) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: "services",
    draft: false,
    limit: 3,
    overrideAccess: false,
    pagination: false,
    where: {
      id: { not_equals: currentServiceId },
    },
  })
  return result.docs
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
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
