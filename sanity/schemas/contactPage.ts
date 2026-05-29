import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading',       title: 'Hero Heading',     type: 'string' }),
    defineField({ name: 'availabilityText',  title: 'Availability Text', type: 'text',
      description: 'Text shown in the box on the right side of the contact form',
    }),
  ],
});
