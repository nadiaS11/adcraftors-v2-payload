import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Stats/Metrics Block
 *
 * Purpose: Display impressive statistics and metrics
 * Great for showcasing achievements and building credibility
 *
 * Groups:
 * - Content: Section header
 * - Stats: The actual statistics
 * - Settings: Layout options
 */
export const StatsBlock: Block = {
  slug: 'stats-block',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats Section',
    plural: 'Stats Sections',
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Section Header (Optional)',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'headline',
          type: 'text',
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
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Stat',
        plural: 'Stats',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                width: '30%',
                placeholder: 'e.g., "500+"',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                width: '70%',
                placeholder: 'e.g., "Projects Delivered"',
              },
            },
          ],
        },
        {
          name: 'prefix',
          type: 'text',
          admin: {
            placeholder: 'e.g., "$" or "+"',
            description: 'Optional prefix before the value',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          admin: {
            placeholder: 'e.g., "%" or "K"',
            description: 'Optional suffix after the value',
          },
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Users', value: 'users' },
            { label: 'Projects', value: 'briefcase' },
            { label: 'Trophy', value: 'trophy' },
            { label: 'Clock', value: 'clock' },
            { label: 'Chart', value: 'chart' },
            { label: 'Star', value: 'star' },
          ],
          defaultValue: 'none',
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Settings',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'row',
              options: [
                { label: 'Single Row', value: 'row' },
                { label: 'Grid (2x2)', value: 'grid' },
                { label: 'Stacked', value: 'stacked' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'style',
              type: 'select',
              defaultValue: 'minimal',
              options: [
                { label: 'Minimal', value: 'minimal' },
                { label: 'Cards', value: 'cards' },
                { label: 'Bordered', value: 'bordered' },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'animate',
          type: 'checkbox',
          defaultValue: true,
          label: 'Animate Numbers on Scroll',
        },
        {
          name: 'centered',
          type: 'checkbox',
          defaultValue: true,
          label: 'Center Align',
        },
      ],
    },
  ],
}
