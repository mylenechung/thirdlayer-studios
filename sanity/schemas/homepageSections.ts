import { defineField, defineType } from 'sanity';

const paragraphItem = {
  type: 'object' as const,
  fields: [
    defineField({ name: 'text',   title: 'Text',         type: 'text' }),
    defineField({ name: 'italic', title: 'Italic style', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'text' },
    prepare: ({ title }: { title?: string }) => ({ title: title?.slice(0, 80) ?? '' }),
  },
};

export const homepageSections = defineType({
  name: 'homepageSections',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero',        title: 'Hero' },
    { name: 'whoWeAre',   title: 'Who We Are' },
    { name: 'approach',   title: 'Our Approach' },
    { name: 'method',     title: 'The Method' },
    { name: 'motion',     title: 'Motion' },
    { name: 'digitalSets',title: 'Digital Sets' },
  ],
  fields: [

    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroHeadline', title: 'Hero Headline', type: 'string', group: 'hero',
      description: 'Main line of the headline (regular colour)',
    }),
    defineField({
      name: 'heroHeadlineAccent', title: 'Hero Headline — Accent', type: 'string', group: 'hero',
      description: 'Second line shown in orange',
    }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', group: 'hero' }),

    // ── WHO WE ARE ────────────────────────────────────────────────────────────
    defineField({ name: 'whoWeAreHeading', title: 'Heading', type: 'string', group: 'whoWeAre' }),
    defineField({
      name: 'whoWeAreBody', title: 'Body Paragraphs', type: 'array', group: 'whoWeAre',
      of: [paragraphItem],
      description: 'Each item is one paragraph. Toggle Italic for the closing line.',
    }),

    // ── OUR APPROACH ──────────────────────────────────────────────────────────
    defineField({ name: 'approachHeading', title: 'Heading',   type: 'string', group: 'approach' }),
    defineField({ name: 'approachBody',    title: 'Body Text', type: 'text',   group: 'approach' }),
    defineField({
      name: 'approachSteps', title: 'Process Steps', type: 'array', group: 'approach',
      of: [{
        type: 'object' as const,
        fields: [
          defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. 01' }),
          defineField({ name: 'label',  title: 'Label',  type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'number' } },
      }],
    }),

    // ── THE METHOD ────────────────────────────────────────────────────────────
    defineField({ name: 'methodHeading', title: 'Heading', type: 'string', group: 'method' }),
    defineField({ name: 'methodTagline', title: 'Tagline', type: 'string', group: 'method' }),
    defineField({ name: 'methodBody',    title: 'Body Text', type: 'text', group: 'method' }),
    defineField({
      name: 'methodImages', title: 'Images', type: 'object', group: 'method',
      fields: [
        defineField({ name: 'portrait',    title: 'Portrait Image (3:4)',      type: 'image', options: { hotspot: true } }),
        defineField({ name: 'landscape01', title: 'Landscape Image 1 (4:3)',   type: 'image', options: { hotspot: true } }),
        defineField({ name: 'landscape02', title: 'Landscape Image 2 (4:3)',   type: 'image', options: { hotspot: true } }),
      ],
    }),

    // ── MOTION ────────────────────────────────────────────────────────────────
    defineField({ name: 'motionHeading', title: 'Heading', type: 'string', group: 'motion' }),
    defineField({
      name: 'motionBody', title: 'Body Paragraphs', type: 'array', group: 'motion',
      of: [paragraphItem],
    }),
    defineField({
      name: 'motionVideo', title: 'Video', type: 'file', group: 'motion',
      options: { accept: 'video/*' },
    }),

    // ── DIGITAL SETS ──────────────────────────────────────────────────────────
    defineField({
      name: 'digitalSetsHeading', title: 'Heading — Line 1', type: 'string', group: 'digitalSets',
      description: 'Displayed in dark colour',
    }),
    defineField({
      name: 'digitalSetsHeadingAccent', title: 'Heading — Line 2 (Muted)', type: 'string', group: 'digitalSets',
      description: 'Displayed in muted/grey colour below line 1',
    }),
    defineField({ name: 'digitalSetsBody', title: 'Body Text', type: 'text', group: 'digitalSets' }),
    defineField({
      name: 'digitalSetsImages', title: 'Images', type: 'object', group: 'digitalSets',
      fields: [
        defineField({ name: 'image01', title: 'Image 1 (3:4)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'image02', title: 'Image 2 (3:4)', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
});
