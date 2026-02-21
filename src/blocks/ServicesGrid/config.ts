import type { Block } from "payload"

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { link } from "../../fields/link"
import { linkGroup } from "../../fields/linkGroup"

/**
 * Services Grid Block
 *
 * Purpose: Display services in a grid layout
 * Can show selected services or all services dynamically
 *
 * Groups:
 * - Content: Section headline and intro
 * - Services: Selection method (all/selected)
 * - Settings: Grid columns, style options
 */
export const ServicesGrid: Block = {
  slug: "srvgrd",
  interfaceName: "ServicesGridBlock",
  labels: {
    singular: "Services Section",
    plural: "Services Sections",
  },
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "grid",
      required: true,
      options: [
        { label: "Featured + Grid", value: "both" },
        { label: "Grid Only", value: "grid" },
        { label: "Featured Only", value: "feat" },
      ],
      admin: {
        description:
          'Selecting "Featured + Grid" means other services will appear in right side of the featured service.',
      },
    },
    {
      name: "title",
      type: "text",
      admin: {
        condition: (_, siblingData) => ["both", "grid"].includes(siblingData.type),
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
          condition: (_, siblingData) => ["both", "grid"].includes(siblingData.type),
        },
      },
    }),
    {
      name: "featDoc",
      type: "relationship",
      label: "Featured service",
      relationTo: ["services"],
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
            placeholder: 'e.g., "What We Do"',
          },
        },
        {
          name: "headline",
          type: "text",
          required: true,
          admin: {
            placeholder: 'e.g., "Our Services"',
          },
        },
      ],
    },
    {
      name: "populateBy",
      type: "select",
      defaultValue: "selection",
      options: [
        { label: "Select Specific Services", value: "selection" },
        { label: "Services Collection", value: "collection" },
        { label: "Recent Services", value: "recents" },
      ],
    },
    {
      name: "selectedServices",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === "selection",
        description: "Select the services to display",
      },
    },

    {
      name: "limit",
      type: "number",
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy !== "selection",
        description: "Maximum number of services to display",
      },
    },
    {
      name: "settings",
      type: "group",
      label: "Display Settings",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "columns",
              type: "select",
              defaultValue: "3",
              options: [
                { label: "2 Columns", value: "2" },
                { label: "3 Columns", value: "3" },
                { label: "4 Columns", value: "4" },
              ],
              admin: {
                width: "50%",
              },
            },
            {
              name: "style",
              type: "select",
              defaultValue: "cards",
              options: [
                { label: "Cards with Icons", value: "cards" },
                { label: "Minimal List", value: "list" },
                { label: "Image Cards", value: "image-cards" },
              ],
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          name: "showExcerpt",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showLearnMore",
          type: "checkbox",
          defaultValue: true,
          label: 'Show "Learn More" Links',
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
      admin: {
        description: "Optional call-to-action below the grid",
      },
      fields: [
        {
          name: "enabled",
          type: "checkbox",
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
