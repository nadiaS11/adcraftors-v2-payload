import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * FAQ Block
 *
 * Purpose: Frequently asked questions in accordion format
 * Great for service pages and landing pages
 *
 * Groups:
 * - Content: Section header and FAQ items
 * - Settings: Display options
 */
export const FAQBlock: Block = {
  slug: 'faq-block',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
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
            placeholder: 'e.g., "FAQ"',
          },
        },
        {
          name: 'headline',
          type: 'text',
          admin: {
            placeholder: 'e.g., "Frequently Asked Questions"',
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
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      labels: {
        singular: 'FAQ',
        plural: 'FAQs',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Settings',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'accordion',
          options: [
            { label: 'Accordion', value: 'accordion' },
            { label: 'Two Columns', value: 'two-columns' },
            { label: 'Side by Side (Header Left)', value: 'side-by-side' },
          ],
        },
        {
          name: 'defaultOpen',
          type: 'select',
          defaultValue: 'first',
          options: [
            { label: 'First Item Open', value: 'first' },
            { label: 'All Closed', value: 'none' },
            { label: 'All Open', value: 'all' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.layout === 'accordion',
          },
        },
        {
          name: 'showNumbers',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show Question Numbers',
        },
      ],
    },
  ],
}
