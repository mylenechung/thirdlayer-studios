import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),

    // Our Story
    defineField({ name: 'storyHeading', title: 'Our Story — Heading',    type: 'string' }),
    defineField({ name: 'storyBody01',  title: 'Our Story — Paragraph 1', type: 'text'   }),
    defineField({ name: 'storyBody02',  title: 'Our Story — Paragraph 2', type: 'text'   }),
    defineField({ name: 'storyBody03',  title: 'Our Story — Paragraph 3', type: 'text'   }),
    defineField({ name: 'storyBody04',  title: 'Our Story — Paragraph 4', type: 'text'   }),
    defineField({ name: 'storyBody05',  title: 'Our Story — Paragraph 5', type: 'text'   }),

    // Philosophy
    defineField({ name: 'philosophyQuote', title: 'Philosophy — Quote', type: 'text',
      description: 'Shown in italic larger text with quotation marks',
    }),
    defineField({ name: 'philosophyBody01', title: 'Philosophy — Body Paragraph 1', type: 'text' }),
    defineField({ name: 'philosophyBody02', title: 'Philosophy — Body Paragraph 2', type: 'text' }),
    defineField({ name: 'philosophyBody03', title: 'Philosophy — Body Paragraph 3', type: 'text' }),
  ],
});
