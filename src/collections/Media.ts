import type { CollectionConfig } from "payload"
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import { anyone } from "@/access/anyone"
import { authenticated } from "@/access/authenticated"

export const Media: CollectionConfig = {
  slug: "media",
  folders: true,

  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    staticDir: "media",
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "mobile",
        width: 640,
        // For screens up to 640px (mobile)
      },
      {
        name: "tablet",
        width: 768,
        // For screens up to 768px (tablet)
      },
      {
        name: "desktop",
        width: 1024,
        // For screens up to 1024px (small desktop)
      },
      {
        name: "large",
        width: 1440,
        // For screens up to 1440px (large desktop)
      },
      {
        name: "xlarge",
        width: 1920,
        // For screens up to 1920px (full HD)
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        crop: "center",
      },
    ],
    formatOptions: {
      format: "webp",
    },
  },
}
