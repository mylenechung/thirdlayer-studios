import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram Handle', type: 'string' }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
  ],
});
