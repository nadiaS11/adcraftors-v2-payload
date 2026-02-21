import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const Archive: Block = {
  slug: "archive",
  interfaceName: "ArchiveBlock",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "grid",
      required: true,
      options: [
        { label: "Featured Type", value: "feat" },
        { label: "Grid Type", value: "grid" },
      ],
      admin: {
        description:
          'Selecting "Featured type" means other blogs will appear in right side of the featured Blog.',
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
      label: "Featured blog",
      relationTo: ["posts"],
      admin: {
        condition: (_, siblingData) => siblingData.type !== "grid",
      },
    },
    {
      name: "populateBy",
      type: "select",
      defaultValue: "collection",
      options: [
        {
          label: "Collection",
          value: "collection",
        },
        {
          label: "Individual Selection",
          value: "selection",
        },
      ],
    },
    {
      name: "relationTo",
      type: "select",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      defaultValue: "posts",
      label: "Collections To Show",
      options: [
        {
          label: "Posts",
          value: "posts",
        },
        {
          label: "Recent Posts",
          value: "recent_posts",
        },
      ],
    },

    {
      name: "limit",
      type: "number",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
        step: 1,
      },
      defaultValue: 3,
      label: "Limit",
    },
    {
      name: "selectedDocs",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "selection",
      },
      hasMany: true,
      label: "Selection",
      relationTo: ["posts"],
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
  ],
  labels: {
    plural: "Post Archives",
    singular: "Post Archive",
  },
}
