import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types"

import configPromise from "@payload-config"
import { getPayload } from "payload"
import React from "react"

import { CollectionArchive } from "@/components/CollectionArchive"
import { CMSLink } from "@/components/Link"
import { Pagination } from "@/components/Pagination"
import { CardPostData } from "@/components/Card"
import { Media } from "@/components/Media"

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
    currentPage?: string
  }
> = async (props) => {
  const {
    id,
    title,
    link: headerLinks,
    limit = 3,
    populateBy,
    relationTo,
    selectedDocs,
    type,
    featDoc,
    pagination,
  } = props
  const sanitizedPageNumber = Number(props.currentPage)

  let totalPages = 1

  let docs: CardPostData[] = []

  const limitFromProps = limit ?? 3
  const feaaturedDoc = typeof featDoc?.value === "object" && featDoc?.value
  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise })

    if (relationTo === "posts") {
      const posts = await payload.find({
        collection: "posts",
        depth: 1,
        limit: limitFromProps,
        page: sanitizedPageNumber,
        where: {
          and: [
            { _status: { equals: "published" } },
            ...(type === "feat" && feaaturedDoc ? [{ id: { not_equals: feaaturedDoc?.id } }] : []),
          ],
        },
      })
      docs = posts.docs
      totalPages = posts.totalPages
    }
    if (relationTo === "recent_posts") {
      const posts = await payload.find({
        collection: "posts",
        depth: 1,
        limit: limitFromProps,
        page: sanitizedPageNumber,
        sort: "-updatedAt",
        where: {
          and: [
            { _status: { equals: "published" } },
            ...(type === "feat" && feaaturedDoc ? [{ id: { not_equals: feaaturedDoc.id } }] : []),
          ],
        },
      })
      docs = posts.docs
      totalPages = posts.totalPages
    }
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === "object") return post.value
      }) as Partial<Post>[]

      docs = filteredSelectedPosts as CardPostData[]
    }
  }
  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container">
        {type === "feat" && feaaturedDoc && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="relative aspect-video lg:aspect-auto rounded-2xl overflow-hidden">
              {feaaturedDoc.heroImage && typeof feaaturedDoc.heroImage === "object" && (
                <Media resource={feaaturedDoc.heroImage} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex flex-col justify-center">
              {feaaturedDoc.categories && feaaturedDoc.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {feaaturedDoc.categories.slice(0, 3).map((cat) => {
                    const catId = typeof cat === "object" ? cat.id : cat
                    const catName = typeof cat === "object" ? cat.title : cat
                    return (
                      <span
                        key={catId}
                        className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {catName}
                      </span>
                    )
                  })}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{feaaturedDoc.title}</h2>
              {feaaturedDoc.meta?.description && (
                <p className="text-lg text-muted-foreground mb-6">
                  {feaaturedDoc.meta.description}
                </p>
              )}
              <CMSLink
                url={`/posts/${feaaturedDoc.slug}`}
                label="Read Article"
                appearance="default"
              />
            </div>
          </div>
        )}
        {type === "grid" && (title || headerLinks?.length) && (
          <div className="container mb-16">
            <div className="mb-2.5 flex flex-wrap items-center justify-between">
              <h3 className="font-roboto-flex text-2xl font-bold sm:text-3xl">{title}</h3>
              {headerLinks?.map((headerLink) => (
                <CMSLink key={headerLink.id} {...headerLink.link} appearance={"inline"} />
              ))}
            </div>
          </div>
        )}
        {type === "grid" && <CollectionArchive posts={docs} />}

        {pagination && type === "grid" && sanitizedPageNumber && totalPages > 1 && (
          <Pagination page={sanitizedPageNumber} totalPages={totalPages} />
        )}
      </div>
    </div>
  )
}
