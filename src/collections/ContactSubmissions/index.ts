import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

/**
 * Contact Submissions Collection
 *
 * Purpose: Store contact form submissions from the website
 * This is a read-only collection for admin review of inquiries.
 *
 * Note: This is separate from the Form Builder plugin submissions
 * for simple direct contact form handling.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  access: {
    // Only authenticated users can read submissions
    create: () => true, // Allow frontend form submissions
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    useAsTitle: 'name',
    group: 'Forms',
    description: 'Contact form submissions from the website',
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
            readOnly: true,
            width: '50%',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
        {
          name: 'company',
          type: 'text',
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'subject',
      type: 'select',
      admin: {
        readOnly: true,
      },
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Project Request', value: 'project' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Careers', value: 'careers' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        readOnly: true,
        description: 'Service they are interested in',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'budget',
      type: 'select',
      admin: {
        readOnly: true,
      },
      options: [
        { label: 'Under $5,000', value: 'under-5k' },
        { label: '$5,000 - $10,000', value: '5k-10k' },
        { label: '$10,000 - $25,000', value: '10k-25k' },
        { label: '$25,000 - $50,000', value: '25k-50k' },
        { label: '$50,000+', value: '50k-plus' },
      ],
    },
    // Admin fields
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Responded', value: 'responded' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes about this submission',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Team member handling this inquiry',
      },
    },
  ],
}
