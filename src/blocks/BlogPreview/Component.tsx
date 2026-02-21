"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utilities/ui"
import { fadeInUp, staggerContainer, defaultViewport, cardHover } from "@/lib/animations/variants"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import type { BlogPreviewBlock as BlogPreviewBlockType, Post } from "@/payload-types"

type Props = BlogPreviewBlockType & {
  posts?: Post[]
}

export const BlogPreviewComponent: React.FC<Props> = ({ header, settings, cta, posts = [] }) => {
  const layout = settings?.layout || "grid"
  const columns = settings?.columns || "3"
  const showExcerpt = settings?.showExcerpt ?? true
  const showDate = settings?.showDate ?? true
  const showCategory = settings?.showCategory ?? true
  const showAuthor = settings?.showAuthor ?? false

  const gridCols = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4",
  }

  const featuredPost = layout === "featured-list" ? posts[0] : null
  const otherPosts = layout === "featured-list" ? posts.slice(1) : posts

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {header?.eyebrow && (
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            {header.eyebrow}
          </motion.span>
        )}

        {header?.headline && (
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {header.headline}
          </motion.h2>
        )}

        {header?.description && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-12 max-w-2xl"
          />
        )}

        {layout === "grid" && (
          <motion.div
            className={cn("grid gap-6 md:gap-8", gridCols[columns as keyof typeof gridCols])}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                showExcerpt={showExcerpt}
                showDate={showDate}
                showCategory={showCategory}
                showAuthor={showAuthor}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {layout === "featured-list" && featuredPost && (
          <div className="space-y-8">
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              className="group md:flex gap-8 bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
              whileHover={cardHover}
            >
              <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                {featuredPost.heroImage && typeof featuredPost.heroImage === "object" && (
                  <Media
                    resource={featuredPost.heroImage}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <PostCardContent
                  post={featuredPost}
                  showExcerpt={showExcerpt}
                  showDate={showDate}
                  showCategory={showCategory}
                  showAuthor={showAuthor}
                  featured
                />
              </div>
            </motion.article>

            {otherPosts.length > 0 && (
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={staggerContainer}
              >
                {otherPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={fadeInUp}
                    className="group flex gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
                    whileHover={cardHover}
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      {post.heroImage && typeof post.heroImage === "object" && (
                        <Media
                          resource={post.heroImage}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {showDate && post.publishedAt && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {layout === "list" && (
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                className="group flex flex-col md:flex-row gap-6 p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
                whileHover={cardHover}
              >
                <div className="md:w-48 aspect-video md:aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                  {post.heroImage && typeof post.heroImage === "object" && (
                    <Media
                      resource={post.heroImage}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <PostCardContent
                    post={post}
                    showExcerpt={showExcerpt}
                    showDate={showDate}
                    showCategory={showCategory}
                    showAuthor={showAuthor}
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {layout === "slider" && (
          <div className="relative">
            <motion.div
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                  className="flex-shrink-0 w-80 md:w-96 snap-center"
                >
                  <PostCard
                    post={post}
                    showExcerpt={showExcerpt}
                    showDate={showDate}
                    showCategory={showCategory}
                    showAuthor={showAuthor}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {cta?.enabled && cta.link && (
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <CMSLink
              {...cta.link}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}

type PostCardProps = {
  post: Post
  showExcerpt?: boolean
  showDate?: boolean
  showCategory?: boolean
  showAuthor?: boolean
  featured?: boolean
  index: number
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  showExcerpt,
  showDate,
  showCategory,
  showAuthor,
  index,
}) => (
  <motion.article
    className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
    whileHover={cardHover}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="aspect-video overflow-hidden">
      {post.heroImage && typeof post.heroImage === "object" && (
        <Media
          resource={post.heroImage}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
    </div>
    <div className="p-5">
      <PostCardContent
        post={post}
        showExcerpt={showExcerpt}
        showDate={showDate}
        showCategory={showCategory}
        showAuthor={showAuthor}
      />
    </div>
  </motion.article>
)

type PostCardContentProps = {
  post: Post
  showExcerpt?: boolean
  showDate?: boolean
  showCategory?: boolean
  showAuthor?: boolean
  featured?: boolean
}

const PostCardContent: React.FC<PostCardContentProps> = ({
  post,
  showExcerpt,
  showDate,
  showCategory,
  showAuthor,
  featured,
}) => (
  <>
    <div className="flex items-center gap-3 mb-3">
      {showCategory && post.categories && post.categories.length > 0 && (
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {typeof post.categories[0] === "object" ? post.categories[0].title : post.categories[0]}
        </span>
      )}
      {showDate && post.publishedAt && (
        <>
          {showCategory && <span className="text-muted-foreground">•</span>}
          <span className="text-xs text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </>
      )}
    </div>

    <h3
      className={cn(
        "font-bold text-foreground group-hover:text-primary transition-colors mb-3",
        featured ? "text-2xl md:text-3xl" : "text-lg",
      )}
    >
      <a href={`/blog/${post.slug}`} className="hover:underline">
        {post.title}
      </a>
    </h3>

    {showExcerpt && post.meta?.description && (
      <p className="text-muted-foreground line-clamp-2 mb-4">{post.meta.description}</p>
    )}

    {showAuthor && post.authors && post.authors.length > 0 && (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          {post.authors[0] && typeof post.authors[0] === "object" ? post.authors[0].name : ""}
        </span>
      </div>
    )}

    <a
      href={`/blog/${post.slug}`}
      className="inline-flex items-center text-primary font-medium mt-4 hover:gap-2 transition-all duration-200"
    >
      Read More
      <svg
        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </>
)
