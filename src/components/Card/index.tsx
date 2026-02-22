"use client"
import { cn } from "@/utilities/ui"
import useClickableCard from "@/utilities/useClickableCard"
import Link from "next/link"
import React, { Fragment } from "react"

import type { Post } from "@/payload-types"

import { Media } from "@/components/Media"
import { ArrowRight } from "lucide-react"

export type CardPostData = Pick<
  Post,
  "id" | "slug" | "categories" | "meta" | "title" | "publishedAt" | "heroImage" | "updatedAt"
>
export const Card: React.FC<{
  alignItems?: "center"
  className?: string
  doc?: CardPostData
  relationTo?: "posts"
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, " ") // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        "group border border-orange-100 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm",
        "hover:bg-white/80 hover:border-orange-200 hover:shadow-[0_8px_32px_rgba(234,88,12,0.12)]",
        "transition-all duration-300 pb-6",
        className,
      )}
      ref={card.ref}
      style={{ boxShadow: "0 4px 20px rgba(234, 88, 12, 0.06)" }}
    >
      <div className="relative w-full aspect-16/10 overflow-hidden">
        {!metaImage && (
          <div className="w-full h-full bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center">
            <span className="text-orange-300 text-sm">No image</span>
          </div>
        )}
        {metaImage && typeof metaImage !== "string" && (
          <div className="w-full h-full overflow-hidden">
            <Media
              resource={metaImage}
              size="33vw"
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </div>
      <div className="px-5">
        {showCategories && hasCategories && (
          <div className="mb-3">
            {showCategories && hasCategories && (
              <div className="flex flex-wrap gap-2">
                {categories?.map((category, index) => {
                  if (typeof category === "object") {
                    const { title: titleFromCategory } = category
                    const categoryTitle = titleFromCategory || "Untitled category"
                    const isLast = index === categories.length - 1
                    return (
                      <Fragment key={index}>
                        <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                          {categoryTitle}
                        </span>
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }
                  return null
                })}
              </div>
            )}
          </div>
        )}
        <Link href={href}>
          {titleToUse && (
            <div className="  mb-3">
              <h3 className="font-serif font-semibold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {description && (
            <div className="mb-4">
              {description && (
                <p className="text-gray-600 text-sm line-clamp-2">{sanitizedDescription}</p>
              )}
            </div>
          )}
          <div className="absolute bottom-4 flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700">
            <span>Read more</span>
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </article>
  )
}
