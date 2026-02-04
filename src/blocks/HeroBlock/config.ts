import type { Block } from "payload"

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { linkGroup } from "../../fields/linkGroup"

/**
 * Hero Block
 *
 * Purpose: Full-width hero sections for page headers
 * Supports multiple layouts: centered, split (image left/right), video background
 *
 * Groups:
 * - Content: Headline, subheadline, CTAs
 * - Media: Background image or video
 * - Settings: Layout style, overlay, alignment
 */
export const HeroBlock: Block = {
  slug: "hero-block",
  interfaceName: "HeroBlock",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          description: "Hero text content and call-to-action buttons",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              admin: {
                description: "Small text above the headline (optional)",
                placeholder: 'e.g., "Award-Winning Agency"',
              },
            },
            {
              name: "richText",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ["h1", "h2"] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              label: "Headline & Description",
              admin: {
                description: "Main headline (H1) and optional description",
              },
            },
            linkGroup({
              appearances: ["default", "outline"],
              overrides: {
                maxRows: 2,
                label: "CTA Buttons",
              },
            }),
          ],
        },
        {
          label: "Media",
          description: "Background media for the hero",
          fields: [
            {
              name: "mediaType",
              type: "radio",
              defaultValue: "image",
              options: [
                { label: "Image", value: "image" },
                { label: "Video", value: "video" },
                { label: "None", value: "none" },
              ],
              admin: {
                layout: "horizontal",
              },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              admin: {
                condition: (_, siblingData) => siblingData?.mediaType === "image",
              },
            },
            {
              name: "video",
              type: "group",
              admin: {
                condition: (_, siblingData) => siblingData?.mediaType === "video",
              },
              fields: [
                {
                  name: "url",
                  type: "text",
                  label: "Video URL",
                  admin: {
                    placeholder: "YouTube or Vimeo URL",
                  },
                },
                {
                  name: "poster",
                  type: "upload",
                  relationTo: "media",
                  label: "Video Poster Image",
                  admin: {
                    description: "Image shown before video loads",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Settings",
          description: "Layout and style options",
          fields: [
            {
              name: "layout",
              type: "select",
              defaultValue: "centered",
              options: [
                { label: "Centered", value: "centered" },
                { label: "Split - Image Right", value: "split-right" },
                { label: "Split - Image Left", value: "split-left" },
                { label: "Full Background", value: "full-background" },
              ],
            },
            {
              name: "height",
              type: "select",
              defaultValue: "large",
              options: [
                { label: "Small (50vh)", value: "small" },
                { label: "Medium (70vh)", value: "medium" },
                { label: "Large (85vh)", value: "large" },
                { label: "Full Screen (100vh)", value: "full" },
              ],
            },
            {
              name: "overlay",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "enabled",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "opacity",
                      type: "number",
                      min: 0,
                      max: 100,
                      defaultValue: 50,
                      admin: {
                        width: "50%",
                        condition: (_, siblingData) => siblingData?.enabled,
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "textAlign",
              type: "select",
              defaultValue: "center",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
            },
          ],
        },
      ],
    },
  ],
}
