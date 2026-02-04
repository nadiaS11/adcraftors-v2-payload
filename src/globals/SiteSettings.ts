import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

/**
 * Site Settings Global
 *
 * Purpose: Central configuration for site-wide settings
 * Includes branding, contact info, and general settings
 *
 * Groups:
 * - Branding: Logo, favicon, site name
 * - Contact: Email, phone, address
 * - Social: Social media links
 * - Analytics: Tracking codes
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
    description: 'Global site configuration and branding',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          description: 'Site identity and branding assets',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'Marketing Agency',
              admin: {
                description: 'The name of your agency/company',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              admin: {
                description: 'A short tagline or slogan',
                placeholder: 'e.g., "Transforming Brands, Driving Growth"',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                    description: 'Main logo (preferably SVG)',
                  },
                },
                {
                  name: 'logoLight',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                    description: 'Light version for dark backgrounds',
                  },
                },
              ],
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Browser favicon (32x32 or 64x64 PNG)',
              },
            },
          ],
        },
        {
          label: 'Contact',
          description: 'Business contact information',
          fields: [
            {
              name: 'email',
              type: 'email',
              admin: {
                placeholder: 'hello@agency.com',
              },
            },
            {
              name: 'phone',
              type: 'text',
              admin: {
                placeholder: '+1 (555) 123-4567',
              },
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'city',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'state',
                      type: 'text',
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'zip',
                      type: 'text',
                      admin: {
                        width: '25%',
                      },
                    },
                  ],
                },
                {
                  name: 'country',
                  type: 'text',
                },
              ],
            },
            {
              name: 'businessHours',
              type: 'textarea',
              admin: {
                description: 'e.g., "Monday - Friday: 9am - 6pm"',
              },
            },
          ],
        },
        {
          label: 'Social',
          description: 'Social media profiles',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Links',
              maxRows: 10,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Twitter/X', value: 'twitter' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'TikTok', value: 'tiktok' },
                        { label: 'Pinterest', value: 'pinterest' },
                        { label: 'Dribbble', value: 'dribbble' },
                        { label: 'Behance', value: 'behance' },
                        { label: 'GitHub', value: 'github' },
                      ],
                      admin: {
                        width: '30%',
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '70%',
                        placeholder: 'https://...',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Analytics',
          description: 'Tracking and analytics codes',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics ID',
              admin: {
                placeholder: 'G-XXXXXXXXXX',
              },
            },
            {
              name: 'googleTagManagerId',
              type: 'text',
              label: 'Google Tag Manager ID',
              admin: {
                placeholder: 'GTM-XXXXXXX',
              },
            },
            {
              name: 'facebookPixelId',
              type: 'text',
              label: 'Facebook Pixel ID',
            },
            {
              name: 'customHeadScripts',
              type: 'code',
              label: 'Custom Head Scripts',
              admin: {
                language: 'html',
                description: 'Custom scripts to add in the <head> tag',
              },
            },
          ],
        },
      ],
    },
  ],
}
