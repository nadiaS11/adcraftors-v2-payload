import type { CollectionConfig } from "payload"

import { authenticated } from "../../access/authenticated"
import { anyone } from "../../access/anyone"

/**
 * Testimonials Collection
 *
 * Purpose: Client testimonials and reviews for social proof
 * Can be displayed in testimonial blocks and linked to case studies.
 *
 * Relationships:
 * - Referenced by: CaseStudies (testimonial for specific project)
 * - References: Clients (who gave the testimonial)
 */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["quote", "author", "company", "featured", "createdAt"],
    group: "Content",
    description: "Client testimonials and reviews",
    useAsTitle: "author",
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
      admin: {
        description: "The testimonial text",
      },
    },
    {
      type: "collapsible",
      label: "Author Information",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "author",
              type: "text",
              required: true,
              admin: {
                width: "50%",
              },
            },
            {
              name: "role",
              type: "text",
              admin: {
                width: "50%",
                placeholder: "e.g., CEO",
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "company",
              type: "text",
              admin: {
                width: "50%",
              },
            },
            {
              name: "headshot",
              type: "upload",
              relationTo: "media",
              admin: {
                width: "50%",
                description: "Author headshot (optional)",
              },
            },
          ],
        },
      ],
    },

    {
      name: "client",
      type: "relationship",
      relationTo: "clients",
      admin: {
        description: "Link to client (for logo display)",
      },
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      admin: {
        description: "Star rating (1-5)",
      },
    },
  ],
}
