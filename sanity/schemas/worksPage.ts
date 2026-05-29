import { defineField, defineType } from 'sanity';

export const worksPage = defineType({
  name: 'worksPage',
  title: 'Works Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading',            title: 'Page Heading',           type: 'string' }),
    defineField({ name: 'galleryDescription', title: 'Gallery Tab Description', type: 'text'   }),
  ],
});
