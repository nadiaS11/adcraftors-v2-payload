import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

/**
 * Default SEO Global
 *
 * Purpose: Default SEO settings applied site-wide
 * Individual pages can override these defaults
 *
 * Why This Exists:
 * - Provides fallback meta tags when pages don't have specific SEO
 * - Centralizes Open Graph defaults
 * - Makes it easy to update site-wide SEO
 */
export const DefaultSEO: GlobalConfig = {
  slug: 'default-seo',
  label: 'Default SEO',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
    description: 'Default SEO settings for the entire site',
  },
  fields: [
    {
      name: 'titleSuffix',
      type: 'text',
      label: 'Title Suffix',
      defaultValue: ' | Marketing Agency',
      admin: {
        description: 'Appended to all page titles (e.g., "About Us | Marketing Agency")',
      },
    },
    {
      name: 'defaultTitle',
      type: 'text',
      label: 'Default Title',
      admin: {
        description: 'Used when a page has no title set',
      },
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Default Description',
      maxLength: 160,
      admin: {
        description: 'Default meta description (max 160 characters)',
      },
    },
    {
      name: 'defaultImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default OG Image',
      admin: {
        description: 'Default Open Graph image (1200x630 recommended)',
      },
    },
    {
      name: 'openGraph',
      type: 'group',
      label: 'Open Graph Defaults',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: 'Site Name',
          admin: {
            description: 'Displayed in social media shares',
          },
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'website',
          options: [
            { label: 'Website', value: 'website' },
            { label: 'Article', value: 'article' },
            { label: 'Profile', value: 'profile' },
          ],
        },
        {
          name: 'locale',
          type: 'text',
          defaultValue: 'en_US',
        },
      ],
    },
    {
      name: 'twitter',
      type: 'group',
      label: 'Twitter Card Defaults',
      fields: [
        {
          name: 'cardType',
          type: 'select',
          defaultValue: 'summary_large_image',
          options: [
            { label: 'Summary', value: 'summary' },
            { label: 'Summary with Large Image', value: 'summary_large_image' },
          ],
        },
        {
          name: 'site',
          type: 'text',
          label: 'Twitter Handle',
          admin: {
            placeholder: '@youragency',
          },
        },
      ],
    },
    {
      name: 'robots',
      type: 'group',
      label: 'Robots Meta',
      fields: [
        {
          name: 'index',
          type: 'checkbox',
          defaultValue: true,
          label: 'Allow indexing',
        },
        {
          name: 'follow',
          type: 'checkbox',
          defaultValue: true,
          label: 'Follow links',
        },
      ],
    },
  ],
}
