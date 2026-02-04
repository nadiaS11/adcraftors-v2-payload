import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

/**
 * Services Grid Block
 *
 * Purpose: Display services in a grid layout
 * Can show selected services or all services dynamically
 *
 * Groups:
 * - Content: Section headline and intro
 * - Services: Selection method (all/selected)
 * - Settings: Grid columns, style options
 */
export const ServicesGrid: Block = {
  slug: 'services-grid',
  interfaceName: 'ServicesGridBlock',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
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
            placeholder: 'e.g., "What We Do"',
          },
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., "Our Services"',
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
        { label: 'Select Specific Services', value: 'selection' },
        { label: 'Show All Services', value: 'all' },
        { label: 'Featured Services Only', value: 'featured' },
        { label: 'By Category', value: 'category' },
      ],
    },
    {
      name: 'selectedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
        description: 'Select the services to display',
      },
    },
    {
      name: 'category',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'category',
      },
      options: [
        { label: 'Branding', value: 'branding' },
        { label: 'Web Design & Development', value: 'web' },
        { label: 'SEO', value: 'seo' },
        { label: 'Paid Advertising', value: 'advertising' },
        { label: 'Content Marketing', value: 'content' },
        { label: 'Social Media', value: 'social' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy !== 'selection',
        description: 'Maximum number of services to display',
      },
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Display Settings',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'style',
              type: 'select',
              defaultValue: 'cards',
              options: [
                { label: 'Cards with Icons', value: 'cards' },
                { label: 'Minimal List', value: 'list' },
                { label: 'Image Cards', value: 'image-cards' },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'showExcerpt',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showLearnMore',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show "Learn More" Links',
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Section CTA',
      admin: {
        description: 'Optional call-to-action below the grid',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        link({
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.enabled,
            },
          },
        }),
      ],
    },
  ],
}
