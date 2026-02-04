import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from 'payload'

/**
 * Team Members Collection
 *
 * Purpose: Manage agency team member profiles
 * Displayed on About page and linked to case studies they worked on.
 *
 * Relationships:
 * - Referenced by: CaseStudies (team who worked on projects)
 */
export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone, // Team profiles are public
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    role: true,
    photo: true,
  },
  admin: {
    defaultColumns: ['name', 'role', 'department', 'displayOrder'],
    useAsTitle: 'name',
    group: 'Content',
    description: 'Agency team member profiles',
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
          name: 'role',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'e.g., Creative Director',
          },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Professional headshot photo',
      },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      admin: {
        description: 'Which department does this person belong to?',
      },
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Design', value: 'design' },
        { label: 'Development', value: 'development' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Strategy', value: 'strategy' },
        { label: 'Operations', value: 'operations' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Short biography (max 500 characters)',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      admin: {
        description: 'Optional social media profiles',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'linkedin',
              type: 'text',
              admin: {
                width: '50%',
                placeholder: 'https://linkedin.com/in/...',
              },
            },
            {
              name: 'twitter',
              type: 'text',
              admin: {
                width: '50%',
                placeholder: 'https://twitter.com/...',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'github',
              type: 'text',
              admin: {
                width: '50%',
                placeholder: 'https://github.com/...',
              },
            },
            {
              name: 'dribbble',
              type: 'text',
              admin: {
                width: '50%',
                placeholder: 'https://dribbble.com/...',
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Order in team listings (lower = first)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage team section',
      },
    },
    slugField(),
  ],
}
