import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'client', title: 'Client Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'client' } }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'bgColor', title: 'Background Color (hex)', type: 'string' }),
    defineField({ name: 'highlightColor', title: 'Highlight Color (hex)', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: { list: ['3/4', '4/3', '16/9', '9/16', '1/1'] },
            }),
            defineField({
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              options: { list: ['image', 'video'] },
              initialValue: 'image',
            }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'video', title: 'Video', type: 'file', options: { accept: 'video/*' } }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'aspectRatio' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'category' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
