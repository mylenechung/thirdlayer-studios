import { defineField, defineType } from 'sanity';

export const homepageSections = defineType({
  name: 'homepageSections',
  title: 'Homepage Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'methodImages',
      title: 'Method Section Images',
      type: 'object',
      fields: [
        defineField({ name: 'portrait', title: 'Portrait Image (3:4)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'landscape01', title: 'Landscape Image 1 (4:3)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'landscape02', title: 'Landscape Image 2 (4:3)', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'digitalSetsImages',
      title: 'Digital Sets Section Images',
      type: 'object',
      fields: [
        defineField({ name: 'image01', title: 'Image 1 (3:4)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'image02', title: 'Image 2 (3:4)', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'motionVideo',
      title: 'Motion Section Video',
      type: 'file',
      options: { accept: 'video/*' },
    }),
  ],
});
