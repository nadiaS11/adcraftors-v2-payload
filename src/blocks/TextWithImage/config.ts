import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

/**
 * Text + Image Block
 *
 * Purpose: Split sections with text and image side by side
 * Common pattern for feature highlights and about sections
 *
 * Groups:
 * - Content: Text content
 * - Media: Image
 * - Settings: Layout, alignment
 */
export const TextWithImage: Block = {
  slug: 'text-with-image',
  interfaceName: 'TextWithImageBlock',
  labels: {
    singular: 'Text + Image Section',
    plural: 'Text + Image Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'group',
      label: 'Content',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: {
            placeholder: 'e.g., "About Us"',
          },
        },
        {
          name: 'richText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Text Content',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Feature List',
          admin: {
            description: 'Optional bullet points or features',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Check', value: 'check' },
                { label: 'Star', value: 'star' },
                { label: 'Arrow', value: 'arrow' },
                { label: 'Zap', value: 'zap' },
              ],
              admin: {
                width: '30%',
              },
            },
            {
              name: 'text',
              type: 'text',
              required: true,
              admin: {
                width: '70%',
              },
            },
          ],
        },
        {
          name: 'enableCTA',
          type: 'checkbox',
          defaultValue: false,
        },
        link({
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.enableCTA,
            },
          },
        }),
      ],
    },
    {
      name: 'media',
      type: 'group',
      label: 'Media',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imageStyle',
          type: 'select',
          defaultValue: 'rounded',
          options: [
            { label: 'Rounded', value: 'rounded' },
            { label: 'Square', value: 'square' },
            { label: 'Circular', value: 'circle' },
            { label: 'With Shadow', value: 'shadow' },
          ],
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Settings',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Image on Right', value: 'right' },
            { label: 'Image on Left', value: 'left' },
          ],
        },
        {
          name: 'verticalAlign',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Center', value: 'center' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
        {
          name: 'imageSize',
          type: 'select',
          defaultValue: 'half',
          options: [
            { label: '40% Width', value: 'small' },
            { label: '50% Width', value: 'half' },
            { label: '60% Width', value: 'large' },
          ],
        },
      ],
    },
  ],
}
