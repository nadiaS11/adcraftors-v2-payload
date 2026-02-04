import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

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
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['authorName', 'company', 'featured', 'createdAt'],
    useAsTitle: 'authorName',
    group: 'Content',
    description: 'Client testimonials and reviews',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial text',
      },
    },
    {
      name: 'author',
      type: 'group',
      label: 'Author Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'role',
              type: 'text',
              admin: {
                width: '50%',
                placeholder: 'e.g., CEO',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'company',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                width: '50%',
                description: 'Author headshot (optional)',
              },
            },
          ],
        },
      ],
    },
    // Virtual field for admin list display
    {
      name: 'authorName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return siblingData?.author?.name || 'Unknown'
          },
        ],
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return siblingData?.author?.company || ''
          },
        ],
      },
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      admin: {
        description: 'Link to client (for logo display)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Star rating (1-5)',
      },
    },
    // Sidebar fields
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature on homepage',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Order in listings (lower = first)',
      },
    },
  ],
}
