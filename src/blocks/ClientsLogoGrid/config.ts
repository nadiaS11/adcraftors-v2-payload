import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

/**
 * Clients Logo Grid Block
 *
 * Purpose: Display client logos for social proof
 * Shows brands the agency has worked with
 *
 * Groups:
 * - Content: Optional header
 * - Selection: Which clients to show
 * - Settings: Layout options
 */
export const ClientsLogoGrid: Block = {
  slug: 'clients-logo-grid',
  interfaceName: 'ClientsLogoGridBlock',
  labels: {
    singular: 'Clients Logo Grid',
    plural: 'Clients Logo Grids',
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Section Header (Optional)',
      fields: [
        {
          name: 'headline',
          type: 'text',
          admin: {
            placeholder: 'e.g., "Trusted by Industry Leaders"',
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
        { label: 'Select Specific Clients', value: 'selection' },
        { label: 'Featured Clients', value: 'featured' },
        { label: 'All Clients', value: 'all' },
        { label: 'By Industry', value: 'industry' },
      ],
    },
    {
      name: 'selectedClients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'industry',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'industry',
      },
      options: [
        { label: 'Technology', value: 'technology' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Finance', value: 'finance' },
        { label: 'Retail', value: 'retail' },
        { label: 'Education', value: 'education' },
        { label: 'Non-Profit', value: 'nonprofit' },
        { label: 'Real Estate', value: 'realestate' },
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
          name: 'layout',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Static Grid', value: 'grid' },
            { label: 'Scrolling Marquee', value: 'marquee' },
            { label: 'Centered Row', value: 'row' },
          ],
        },
        {
          name: 'logosPerRow',
          type: 'select',
          defaultValue: '6',
          options: [
            { label: '4 Logos', value: '4' },
            { label: '5 Logos', value: '5' },
            { label: '6 Logos', value: '6' },
            { label: '8 Logos', value: '8' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.layout !== 'marquee',
          },
        },
        {
          name: 'grayscale',
          type: 'checkbox',
          defaultValue: true,
          label: 'Grayscale Logos (Color on Hover)',
        },
        {
          name: 'logoSize',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Section CTA (Optional)',
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
