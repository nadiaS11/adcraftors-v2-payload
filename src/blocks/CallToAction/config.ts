import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Content',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: {
            placeholder: 'e.g., "Ready to Get Started?"',
          },
        },
        {
          name: 'richText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Headline & Description',
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 2,
            label: 'CTA Buttons',
          },
        }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Settings',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'centered',
          options: [
            { label: 'Centered', value: 'centered' },
            { label: 'Split (Text Left, Buttons Right)', value: 'split' },
            { label: 'Inline', value: 'inline' },
          ],
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'gradient',
          options: [
            { label: 'Gradient Background', value: 'gradient' },
            { label: 'Solid Color', value: 'solid' },
            { label: 'Image Background', value: 'image' },
            { label: 'Transparent', value: 'transparent' },
          ],
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.style === 'image',
          },
        },
        {
          name: 'fullWidth',
          type: 'checkbox',
          defaultValue: true,
          label: 'Full Width',
        },
        {
          name: 'padding',
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
  ],
}
