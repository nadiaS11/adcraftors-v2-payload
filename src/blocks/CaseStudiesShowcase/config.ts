import type { Block } from "payload"

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { link } from "../../fields/link"
import { linkGroup } from "../../fields/linkGroup"

export const CaseStudiesShowcase: Block = {
  slug: "casest",
  interfaceName: "CaseStudiesShowcaseBlock",
  labels: {
    singular: "Case Studies Showcase",
    plural: "Case Studies Showcases",
  },
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "grid",
      required: true,
      options: [
        { label: "Featured + Grid", value: "feat" },
        { label: "Grid Only", value: "grid" },
      ],
      admin: {
        description:
          'Selecting "Featured + Grid" means other case studies will appear in right side of the featured one.',
      },
    },
    {
      name: "title",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData.type === "grid",
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: "link",
        label: "Header Link",
        required: false,
        maxRows: 1,
        admin: {
          condition: (_, siblingData) => siblingData.type === "grid",
        },
      },
    }),
    {
      name: "featDoc",
      type: "relationship",
      label: "Featured case study",
      relationTo: ["case-studies"],
      admin: {
        condition: (_, siblingData) => siblingData.type !== "grid",
      },
    },
    {
      name: "header",
      type: "group",
      label: "Section Header",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          admin: {
            placeholder: 'e.g., "Our Work"',
          },
        },
        {
          name: "headline",
          type: "text",
          required: true,
          admin: {
            placeholder: 'e.g., "Featured Projects"',
          },
        },
        {
          name: "description",
          type: "richText",
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
      name: "populateBy",
      type: "select",
      defaultValue: "selection",
      options: [
        { label: "Select Specific Projects", value: "selection" },
        { label: "Recent case studies", value: "recents" },
        { label: "By Service", value: "service" },
      ],
    },
    {
      name: "selectedCaseStudies",
      type: "relationship",
      relationTo: "case-studies",
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === "selection",
      },
    },
    {
      name: "filterByService",
      type: "relationship",
      relationTo: "services",
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === "service",
        description: "Show case studies for this service",
      },
    },
    {
      name: "limit",
      type: "number",
      defaultValue: 4,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy !== "selection",
      },
    },
    {
      name: "settings",
      type: "group",
      label: "Display Settings",
      fields: [
        {
          name: "layout",
          type: "select",
          defaultValue: "grid",
          options: [
            { label: "Grid (Equal)", value: "grid" },
            { label: "Masonry", value: "masonry" },
            { label: "Featured + Grid", value: "featured-grid" },
            { label: "Slider", value: "slider" },
          ],
        },
        {
          name: "showClient",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showServices",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showExcerpt",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "pagination",
      label: "Allow Pagination",
      type: "checkbox",
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData.type === "grid",
      },
    },
    {
      name: "cta",
      type: "group",
      label: "Section CTA",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
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
