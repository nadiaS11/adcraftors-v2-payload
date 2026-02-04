import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { slugField } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

/**
 * Services Collection
 *
 * Purpose: Manage the agency's service offerings (Branding, Web Design, SEO, etc.)
 * Each service can be displayed on its own page and referenced throughout the site.
 *
 * Relationships:
 * - Referenced by: CaseStudies (services used in project)
 * - Referenced by: Pages (via ServicesGrid block)
 */
export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    icon: true,
    featuredImage: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content',
    description: 'Manage agency services like Branding, Web Design, SEO, etc.',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'services',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the service (e.g., "Web Design & Development")',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          description: 'Basic service information displayed in listings and cards',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Service category for filtering and organization',
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
                  name: 'icon',
                  type: 'select',
                  admin: {
                    width: '50%',
                    description: 'Icon to display with this service',
                  },
                  options: [
                    { label: 'Palette (Branding)', value: 'palette' },
                    { label: 'Code (Development)', value: 'code' },
                    { label: 'Search (SEO)', value: 'search' },
                    { label: 'Target (Advertising)', value: 'target' },
                    { label: 'PenTool (Content)', value: 'pen-tool' },
                    { label: 'Share (Social)', value: 'share' },
                    { label: 'BarChart (Analytics)', value: 'bar-chart' },
                    { label: 'Zap (Performance)', value: 'zap' },
                  ],
                },
              ],
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              maxLength: 200,
              admin: {
                description: 'Short description for cards and listings (max 200 characters)',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main image for service cards and hero sections',
              },
            },
          ],
        },
        {
          label: 'Details',
          description: 'Full service description and features',
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              admin: {
                description: 'Full description of the service',
              },
            },
            {
              name: 'features',
              type: 'array',
              label: 'Key Features',
              labels: {
                singular: 'Feature',
                plural: 'Features',
              },
              admin: {
                description: 'List of features or benefits included in this service',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'process',
              type: 'array',
              label: 'Process Steps',
              labels: {
                singular: 'Step',
                plural: 'Steps',
              },
              admin: {
                description: 'The steps involved in delivering this service',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'stepNumber',
                  type: 'number',
                  required: true,
                  admin: {
                    width: '20%',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '80%',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this service prominently on the homepage',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Order in listings (lower = first)',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
}
