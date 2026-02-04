import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from 'payload'

/**
 * Clients Collection
 *
 * Purpose: Manage client/brand information for logo displays and case studies
 * Used for client logo grids and linking to case studies.
 *
 * Relationships:
 * - Referenced by: CaseStudies (client for the project)
 * - Referenced by: Testimonials (company giving testimonial)
 */
export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: 'Client',
    plural: 'Clients',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    logo: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['name', 'industry', 'featured', 'createdAt'],
    useAsTitle: 'name',
    group: 'Content',
    description: 'Client logos and information',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'industry',
          type: 'select',
          admin: {
            width: '50%',
          },
          options: [
            { label: 'Technology', value: 'technology' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Finance', value: 'finance' },
            { label: 'Retail', value: 'retail' },
            { label: 'Education', value: 'education' },
            { label: 'Non-Profit', value: 'nonprofit' },
            { label: 'Real Estate', value: 'realestate' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Client logo (preferably SVG or transparent PNG)',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        placeholder: 'https://example.com',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Brief description of the client (max 300 chars)',
      },
    },
    // Sidebar fields
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in homepage client logos',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Order in logo displays (lower = first)',
      },
    },
    slugField(),
  ],
}
