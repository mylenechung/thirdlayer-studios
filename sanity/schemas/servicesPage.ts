import { defineField, defineType } from 'sanity';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({
      name: 'steps',
      title: 'How It Works — Steps',
      type: 'array',
      of: [{
        type: 'object' as const,
        fields: [
          defineField({ name: 'number',      title: 'Step Number',      type: 'string', description: 'e.g. 01' }),
          defineField({ name: 'title',       title: 'Step Title',       type: 'string' }),
          defineField({ name: 'description', title: 'Step Description', type: 'text'   }),
        ],
        preview: { select: { title: 'title', subtitle: 'number' } },
      }],
    }),
  ],
});
