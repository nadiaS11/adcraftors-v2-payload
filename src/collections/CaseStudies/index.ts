import type { CollectionConfig } from "payload"

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { authenticated } from "../../access/authenticated"
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished"
import { generatePreviewPath } from "../../utilities/generatePreviewPath"
import { populatePublishedAt } from "../../hooks/populatePublishedAt"
import { slugField } from "payload"

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import test from "node:test"
import { C } from "vitest/dist/chunks/reporters.d.DL9pg5DB.js"

/**
 * Case Studies Collection
 *
 * Purpose: Showcase agency portfolio and project success stories
 * Each case study demonstrates work done for clients with measurable results.
 *
 * Relationships:
 * - References: Services (services used in the project)
 * - References: Clients (client the work was done for)
 * - References: TeamMembers (team who worked on it)
 */
export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: {
    singular: "Case Study",
    plural: "Case Studies",
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
    featuredImage: true,
    client: true,
    services: true,
    results: {
      metrics: true,
    },
    testimonial: true,
    challenge: {
      content: true,
    },
    solution: {
      content: true,
    },
  },
  admin: {
    defaultColumns: ["title", "client", "featured", "updatedAt"],
    useAsTitle: "title",
    group: "Content",
    description: "Portfolio case studies showcasing client projects and results",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: 'Project name or headline (e.g., "Brand Refresh for TechCorp")',
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          description: "Basic project information for cards and listings",
          fields: [
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              maxLength: 200,
              admin: {
                description: "Short summary for portfolio cards (max 200 characters)",
              },
            },
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                description: "Main hero image for the case study",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "client",
                  type: "relationship",
                  relationTo: "clients",
                  admin: {
                    width: "50%",
                    description: "Select the client for this project",
                  },
                },
                {
                  name: "projectDate",
                  type: "date",
                  admin: {
                    width: "50%",
                    description: "When the project was completed",
                    date: {
                      pickerAppearance: "monthOnly",
                    },
                  },
                },
              ],
            },
            {
              name: "services",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
              admin: {
                description: "Services provided for this project",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "color",
                  type: "select",
                  options: [
                    { label: "Orange", value: "bg-primary" },
                    { label: "Blue", value: "bg-blue-600" },
                    { label: "Green", value: "bg-green-600" },
                    { label: "Purple", value: "bg-purple-600" },
                    { label: "Pink", value: "bg-pink-600" },
                    { label: "Teal", value: "bg-teal-600" },
                    { label: "Indigo", value: "bg-indigo-600" },
                    { label: "Rose", value: "bg-rose-600" },
                  ],
                  admin: {
                    width: "50%",
                    description: "Badge color for card",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Content",
          description: "Full case study content",
          fields: [
            {
              name: "challenge",
              type: "group",
              label: "The Challenge",
              admin: {
                description: "What problem did the client face?",
              },
              fields: [
                {
                  name: "heading",
                  type: "text",
                  defaultValue: "The Challenge",
                },
                {
                  name: "content",
                  type: "richText",
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [
                      ...rootFeatures,
                      HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
                      FixedToolbarFeature(),
                      InlineToolbarFeature(),
                    ],
                  }),
                },
              ],
            },
            {
              name: "solution",
              type: "group",
              label: "Our Solution",
              admin: {
                description: "How did we solve the problem?",
              },
              fields: [
                {
                  name: "heading",
                  type: "text",
                  defaultValue: "Our Solution",
                },
                {
                  name: "content",
                  type: "richText",
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [
                      ...rootFeatures,
                      HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
                      FixedToolbarFeature(),
                      InlineToolbarFeature(),
                    ],
                  }),
                },
              ],
            },
            {
              name: "results",
              type: "group",
              label: "The Results",
              admin: {
                description: "What were the measurable outcomes?",
              },
              fields: [
                {
                  name: "heading",
                  type: "text",
                  defaultValue: "The Results",
                },
                {
                  name: "content",
                  type: "richText",
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [
                      ...rootFeatures,
                      HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
                      FixedToolbarFeature(),
                      InlineToolbarFeature(),
                    ],
                  }),
                },
                {
                  name: "metrics",
                  type: "array",
                  label: "Key Metrics",
                  admin: {
                    description: 'Quantifiable results (e.g., "150% increase in traffic")',
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "value",
                          type: "text",
                          required: true,
                          admin: {
                            width: "30%",
                            placeholder: "150%",
                          },
                        },
                        {
                          name: "label",
                          type: "text",
                          required: true,
                          admin: {
                            width: "70%",
                            placeholder: "Increase in organic traffic",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Gallery",
          description: "Project images and media",
          fields: [
            {
              name: "gallery",
              type: "array",
              label: "Project Gallery",
              admin: {
                description: "Additional images showcasing the project",
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "caption",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Feature this case study on the homepage",
      },
    },
    {
      name: "teamMembers",
      type: "relationship",
      relationTo: "team-members",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Team members who worked on this project",
      },
    },
    {
      name: "testimonial",
      type: "relationship",
      relationTo: "testimonials",
      admin: {
        position: "sidebar",
        description: "Client testimonial for this project",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
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
