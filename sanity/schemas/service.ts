import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'order',       title: 'Display Order', type: 'number' }),
    defineField({ name: 'number',      title: 'Number',        type: 'string', description: 'e.g. 01, 02, 03' }),
    defineField({ name: 'title',       title: 'Title',         type: 'string' }),
    defineField({ name: 'description', title: 'Description',   type: 'text'   }),
    defineField({
      name: 'tags', title: 'Tags', type: 'array',
      of: [{ type: 'string' as const }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'number' },
  },
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
