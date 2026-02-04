import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Team Grid Block
 *
 * Purpose: Display team members in a grid
 * Used on About pages to showcase the team
 *
 * Groups:
 * - Content: Section header
 * - Selection: Which team members to show
 * - Settings: Layout options
 */
export const TeamGrid: Block = {
  slug: 'team-grid',
  interfaceName: 'TeamGridBlock',
  labels: {
    singular: 'Team Grid',
    plural: 'Team Grids',
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
            placeholder: 'e.g., "Our Team"',
          },
        },
        {
          name: 'headline',
          type: 'text',
          admin: {
            placeholder: 'e.g., "Meet the Experts"',
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
        { label: 'Select Specific Members', value: 'selection' },
        { label: 'Featured Members', value: 'featured' },
        { label: 'All Members', value: 'all' },
        { label: 'By Department', value: 'department' },
      ],
    },
    {
      name: 'selectedMembers',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'department',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'department',
      },
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Design', value: 'design' },
        { label: 'Development', value: 'development' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Strategy', value: 'strategy' },
        { label: 'Operations', value: 'operations' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
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
              name: 'columns',
              type: 'select',
              defaultValue: '4',
              options: [
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
                { label: '5 Columns', value: '5' },
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
                { label: 'Cards with Bio', value: 'cards' },
                { label: 'Photos Only', value: 'photos' },
                { label: 'Hover Reveal', value: 'hover' },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'showBio',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showSocialLinks',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showDepartment',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
