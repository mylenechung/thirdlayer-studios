import { defineField, defineType } from 'sanity';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  groups: [
    { name: 'hero',  title: 'Hero' },
    { name: 'tiers', title: 'Service Tiers' },
    { name: 'how',   title: 'How It Works' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero' }),

    // Intro + tiers
    defineField({ name: 'introText', title: 'Intro Paragraph', type: 'text', group: 'tiers',
      description: 'Shown above the four service tiers.',
    }),
    defineField({
      name: 'tiers',
      title: 'Service Tiers',
      type: 'array',
      group: 'tiers',
      of: [{
        type: 'object' as const,
        fields: [
          defineField({ name: 'number',      title: 'Number',      type: 'string', description: 'e.g. 01' }),
          defineField({ name: 'name',        title: 'Service Name', type: 'string' }),
          defineField({ name: 'description', title: 'Description',  type: 'text'   }),
          defineField({
            name: 'outputs',
            title: 'Outputs',
            type: 'array',
            of: [{ type: 'string' as const }],
            description: 'Each item appears as a chip/tag.',
          }),
          defineField({
            name: 'aiParticipation',
            title: 'AI Participation',
            type: 'string',
            options: {
              list: [
                { title: 'Minimal (1 dot)',         value: 'minimal'   },
                { title: 'Moderate to High (2 dots)', value: 'moderate' },
                { title: 'High (3 dots)',            value: 'high'      },
                { title: 'Very High (4 dots)',       value: 'very-high' },
              ],
            },
          }),
        ],
        preview: { select: { title: 'name', subtitle: 'number' } },
      }],
    }),

    // How It Works
    defineField({
      name: 'steps',
      title: 'How It Works — Steps',
      type: 'array',
      group: 'how',
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
