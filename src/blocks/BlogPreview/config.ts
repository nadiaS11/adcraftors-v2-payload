import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

/**
 * Blog Preview Block
 *
 * Purpose: Display recent or featured blog posts
 * Used on homepage and landing pages
 *
 * Groups:
 * - Content: Section header
 * - Selection: Which posts to show
 * - Settings: Layout options
 */
export const BlogPreview: Block = {
  slug: 'blog-preview',
  interfaceName: 'BlogPreviewBlock',
  labels: {
    singular: 'Blog Preview',
    plural: 'Blog Previews',
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
            placeholder: 'e.g., "From Our Blog"',
          },
        },
        {
          name: 'headline',
          type: 'text',
          admin: {
            placeholder: 'e.g., "Latest Insights"',
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
      defaultValue: 'recent',
      options: [
        { label: 'Recent Posts', value: 'recent' },
        { label: 'Select Specific Posts', value: 'selection' },
        { label: 'By Category', value: 'category' },
      ],
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'category',
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
          type: 'row',
          fields: [
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'grid',
              options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Featured + List', value: 'featured-list' },
                { label: 'Slider', value: 'slider' },
                { label: 'List', value: 'list' },
              ],
              admin: {
                width: '50%',
              },
            },
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
                condition: (_, siblingData) => siblingData?.layout === 'grid',
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
          name: 'showDate',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCategory',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showAuthor',
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
