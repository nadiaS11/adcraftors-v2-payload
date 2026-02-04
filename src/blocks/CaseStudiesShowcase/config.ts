import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

/**
 * Case Studies Showcase Block
 *
 * Purpose: Display portfolio/case study projects
 * Supports multiple layouts for showcasing work
 *
 * Groups:
 * - Content: Section header
 * - Selection: Which case studies to show
 * - Settings: Layout and display options
 */
export const CaseStudiesShowcase: Block = {
  slug: 'case-studies-showcase',
  interfaceName: 'CaseStudiesShowcaseBlock',
  labels: {
    singular: 'Case Studies Showcase',
    plural: 'Case Studies Showcases',
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
            placeholder: 'e.g., "Our Work"',
          },
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., "Featured Projects"',
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
        { label: 'Select Specific Projects', value: 'selection' },
        { label: 'Show All', value: 'all' },
        { label: 'Featured Only', value: 'featured' },
        { label: 'By Service', value: 'service' },
      ],
    },
    {
      name: 'selectedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'filterByService',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'service',
        description: 'Show case studies for this service',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
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
          defaultValue: 'grid',
          options: [
            { label: 'Grid (Equal)', value: 'grid' },
            { label: 'Masonry', value: 'masonry' },
            { label: 'Featured + Grid', value: 'featured-grid' },
            { label: 'Slider', value: 'slider' },
          ],
        },
        {
          name: 'showClient',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showServices',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showExcerpt',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Section CTA',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
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
