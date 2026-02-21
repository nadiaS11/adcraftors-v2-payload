import type { CollectionSlug, Payload, PayloadRequest, File } from "payload"

import { contactForm as contactFormData } from "./contact-form"
import { contact as contactPageData } from "./contact-page"
import { home } from "./home"
import { image1 } from "./image-1"
import { image2 } from "./image-2"
import { imageHero1 } from "./image-hero-1"
import { post1 } from "./post-1"
import { post2 } from "./post-2"
import { post3 } from "./post-3"
import { service1, service2, service3, service4, service5, service6 } from "./services"
import {
  teamMember1,
  teamMember2,
  teamMember3,
  teamMember4,
  teamMember5,
  teamMember6,
} from "./team-members"
import { client1, client2, client3, client4, client5, client6 } from "./clients"
import {
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
} from "./testimonials"
import { caseStudy1, caseStudy2, caseStudy3, caseStudy4 } from "./case-studies"
import { contactSubmission1, contactSubmission2, contactSubmission3 } from "./contact-submissions"

const collections: CollectionSlug[] = [
  "categories",
  "media",
  "pages",
  "posts",
  "forms",
  "form-submissions",
  "search",
  "services",
  "team-members",
  "clients",
  "testimonials",
  "case-studies",
  "contact-submissions",
]

const categories = ["Technology", "News", "Finance", "Design", "Software", "Engineering"]

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info("Seeding database...")

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: "header",
      data: {
        navItems: [],
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
    payload.updateGlobal({
      slug: "footer",
      data: {
        navItems: [],
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
  ])

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection]?.config?.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: "users",
    depth: 0,
    where: {
      email: {
        equals: "demo-author@example.com",
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp",
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp",
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp",
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp",
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: "users",
      data: {
        name: "Demo Author",
        email: "demo-author@example.com",
        password: "password",
      },
    }),
    payload.create({
      collection: "media",
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: "media",
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: "media",
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: "media",
      data: imageHero1,
      file: hero1Buffer,
    }),
    Promise.all(
      categories.map((category) =>
        payload.create({
          collection: "categories",
          data: {
            title: category,
            slug: category,
          },
        }),
      ),
    ),
  ])

  payload.logger.info(`— Seeding services...`)

  const serviceDocs = await Promise.all([
    payload.create({
      collection: "services",
      data: service1(image1Doc),
    }),
    payload.create({
      collection: "services",
      data: service2(image2Doc),
    }),
    payload.create({
      collection: "services",
      data: service3(image3Doc),
    }),
    payload.create({
      collection: "services",
      data: service4(image1Doc),
    }),
    payload.create({
      collection: "services",
      data: service5(image2Doc),
    }),
    payload.create({
      collection: "services",
      data: service6(image3Doc),
    }),
  ])

  payload.logger.info(`— Seeding team members...`)

  const _teamMemberDocs = await Promise.all([
    payload.create({
      collection: "team-members",
      data: teamMember1(image1Doc),
    }),
    payload.create({
      collection: "team-members",
      data: teamMember2(image2Doc),
    }),
    payload.create({
      collection: "team-members",
      data: teamMember3(image3Doc),
    }),
    payload.create({
      collection: "team-members",
      data: teamMember4(image1Doc),
    }),
    payload.create({
      collection: "team-members",
      data: teamMember5(image2Doc),
    }),
    payload.create({
      collection: "team-members",
      data: teamMember6(image3Doc),
    }),
  ])

  payload.logger.info(`— Seeding clients...`)

  const clientDocs = await Promise.all([
    payload.create({
      collection: "clients",
      data: client1(image1Doc),
    }),
    payload.create({
      collection: "clients",
      data: client2(image2Doc),
    }),
    payload.create({
      collection: "clients",
      data: client3(image3Doc),
    }),
    payload.create({
      collection: "clients",
      data: client4(image1Doc),
    }),
    payload.create({
      collection: "clients",
      data: client5(image2Doc),
    }),
    payload.create({
      collection: "clients",
      data: client6(image3Doc),
    }),
  ])

  payload.logger.info(`— Seeding testimonials...`)

  const _testimonialDocs = await Promise.all([
    payload.create({
      collection: "testimonials",
      data: testimonial1(image1Doc, clientDocs[0].id),
    }),
    payload.create({
      collection: "testimonials",
      data: testimonial2(image2Doc, clientDocs[1].id),
    }),
    payload.create({
      collection: "testimonials",
      data: testimonial3(image3Doc, clientDocs[2].id),
    }),
    payload.create({
      collection: "testimonials",
      data: testimonial4(image1Doc, clientDocs[3].id),
    }),
    payload.create({
      collection: "testimonials",
      data: testimonial5(image2Doc, clientDocs[4].id),
    }),
  ])

  payload.logger.info(`— Seeding posts...`)

  const post1Doc = await payload.create({
    collection: "posts",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: "posts",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: "posts",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  await payload.update({
    id: post1Doc.id,
    collection: "posts",
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: "posts",
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: "posts",
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding case studies...`)

  payload.logger.info(`— Seeding contact submissions...`)

  await Promise.all([
    payload.create({
      collection: "contact-submissions",
      data: contactSubmission1(serviceDocs[0].id),
    }),
    payload.create({
      collection: "contact-submissions",
      data: contactSubmission2(serviceDocs[2].id),
    }),
    payload.create({
      collection: "contact-submissions",
      data: contactSubmission3(),
    }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: "forms",
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: "pages",
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: "pages",
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])
  const _caseStudyDocs = await Promise.all([
    payload.create({
      collection: "case-studies",
      data: caseStudy1({
        featuredImage: image1Doc,

        services: [serviceDocs[0].id, serviceDocs[1].id],
      }),
    }),
    payload.create({
      collection: "case-studies",
      data: caseStudy2({
        featuredImage: image2Doc,

        services: [serviceDocs[1].id, serviceDocs[2].id],
      }),
    }),
    payload.create({
      collection: "case-studies",
      data: caseStudy3({
        featuredImage: image3Doc,

        services: [serviceDocs[1].id, serviceDocs[3].id],
      }),
    }),
    payload.create({
      collection: "case-studies",
      data: caseStudy4({
        featuredImage: image1Doc,

        services: [serviceDocs[2].id, serviceDocs[3].id],
      }),
    }),
  ])
  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: "header",
      data: {
        navItems: [
          {
            link: {
              type: "custom",
              label: "Posts",
              url: "/posts",
            },
          },
          {
            link: {
              type: "custom",
              label: "Services",
              url: "/services",
            },
          },
          {
            link: {
              type: "custom",
              label: "Case Studies",
              url: "/case-studies",
            },
          },
          {
            link: {
              type: "reference",
              label: "Contact",
              reference: {
                relationTo: "pages",
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: "footer",
      data: {
        navItems: [
          {
            link: {
              type: "custom",
              label: "Admin",
              url: "/admin",
            },
          },
          {
            link: {
              type: "custom",
              label: "Source Code",
              newTab: true,
              url: "https://github.com/payloadcms/payload/tree/main/templates/website",
            },
          },
          {
            link: {
              type: "custom",
              label: "Payload",
              newTab: true,
              url: "https://payloadcms.com/",
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info("Seeded database successfully!")
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: "include",
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split("/").pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split(".").pop()}`,
    size: data.byteLength,
  }
}
