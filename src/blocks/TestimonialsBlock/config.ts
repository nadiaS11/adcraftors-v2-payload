import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Testimonials Block
 *
 * Purpose: Display client testimonials for social proof
 * Supports slider or grid layouts
 *
 * Groups:
 * - Content: Section header
 * - Selection: Which testimonials to show
 * - Settings: Layout style
 */
export const TestimonialsBlock: Block = {
  slug: 'testimonials-block',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: {
            placeholder: 'e.g., "Testimonials"',
          },
        },
        {
          name: 'headline',
          type: 'text',
          admin: {
            placeholder: 'e.g., "What Our Clients Say"',
          },
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'selection',
      options: [
        { label: 'Select Specific Testimonials', value: 'selection' },
        { label: 'Featured Testimonials', value: 'featured' },
        { label: 'All Testimonials', value: 'all' },
      ],
    },
    {
      name: 'selectedTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy !== 'selection',
      },
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Display Settings',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'slider',
          options: [
            { label: 'Slider/Carousel', value: 'slider' },
            { label: 'Grid', value: 'grid' },
            { label: 'Single Featured', value: 'single' },
            { label: 'Stacked Cards', value: 'stacked' },
          ],
        },
        {
          name: 'showRating',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Star Rating',
        },
        {
          name: 'showPhoto',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Author Photo',
        },
        {
          name: 'showCompanyLogo',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show Company Logo',
        },
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.layout === 'slider',
          },
        },
      ],
    },
  ],
}
