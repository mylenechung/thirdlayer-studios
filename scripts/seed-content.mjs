/**
 * Seed script — pre-fills all text content in Sanity with the current live site copy.
 * Safe to run multiple times (uses createOrReplace for singletons, patch for homepageSections).
 *
 * Run: node scripts/seed-content.mjs
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dfj6gqw9',
  dataset:   'production',
  apiVersion: '2024-01-01',
  token: 'skBKKqA0a1wO1GQMQmEh82Y2XK1tt0U9jIdl9qrrKkM3QNuNVYq4h5JmcYfp6MqVZrBRY9WN88BQGxfHomg32P2rnbsj9j6Tp0BKyDewMSgHfzcqXpP6kqUmfbgZqSWuChiXBW3GvPAjx3qhDFREVCMcyh4n4mck99MmJy6R9GYVK3tKAMrR',
  useCdn: false,
});

// ── helpers ────────────────────────────────────────────────────────────────

const p  = (text, italic = false) => ({ _type: 'object', _key: Math.random().toString(36).slice(2), text, italic });
const tr = (number, label)        => ({ _type: 'object', _key: Math.random().toString(36).slice(2), number, label });
const st = (number, title, description) => ({ _type: 'object', _key: Math.random().toString(36).slice(2), number, title, description });

// ── 1. Homepage — patch text fields onto existing document (preserves images) ──

console.log('Patching homepage text fields...');
const existingHomepage = await client.fetch(`*[_type == "homepageSections"][0]{ _id }`);

if (existingHomepage?._id) {
  await client.patch(existingHomepage._id).set({
    heroHeadline:       'Defining the future',
    heroHeadlineAccent: 'of product imagery.',
    heroSubtext:        'A proprietary hybrid workflow combining real production expertise with AI-assisted creative tools.',

    whoWeAreHeading: 'The future of imagery still needs human hands.',
    whoWeAreBody: [
      p('Third Layer was built by creatives with years of industry experience producing commercial content in the real world. That experience shapes how we use AI: with restraint, direction, and an understanding of how light, texture, materials, and environments should behave naturally on camera.'),
      p("Unlike purely generative workflows, our process begins with photography. We create controlled reference imagery through real-world production, establishing a visual foundation that guides every stage of development. By grounding our work in something tangible from the start, we're able to achieve greater accuracy, consistency, and creative control."),
      p('Our hybrid workflow bridges the gap between physical production and digital expansion, unlocking more ambitious visual worlds while keeping the final work rooted in authentic art direction and photographic realism.'),
      p('AI gives us reach. Human experience gives the work meaning.', true),
    ],

    approachHeading: 'Art direction meets intelligent production',
    approachBody:    'Every image begins with strong art direction, lighting, composition, and commercially accurate product photography. Our AI-assisted workflow allows us to extend environments, explore creative variations, and scale outputs efficiently — while keeping each final image grounded in real-world craft, product accuracy, and human-led post-production.',
    approachSteps: [
      tr('01', 'Art Direction'),
      tr('02', 'AI-Assisted Production'),
      tr('03', 'Human-Led Post'),
    ],

    methodHeading: 'Three frames, one story.',
    methodTagline: 'Grounded in photographic logic. Expanded digitally.',
    methodBody:    'Our background in commercial product photography allows us to extend imagery with a stronger sense of visual consistency across framing, perspective, lighting direction, surface texture, and material response. By grounding every scene in real photographic principles, we create AI-assisted visuals that feel cohesive across multiple frames rather than individually generated.',

    motionHeading: 'Controlled movement, crafted for social.',
    motionBody: [
      p('Our motion outputs focus on cinemagraph-style clips with carefully directed movement around the product. This approach preserves packaging accuracy and visual consistency while introducing subtle motion that enhances depth, atmosphere, and engagement.'),
      p('By keeping the product controlled and animating supporting elements within the scene, we create commercially reliable motion assets optimized for social media and digital campaigns.'),
    ],

    digitalSetsHeading:       'digital sets.',
    digitalSetsHeadingAccent: 'photographic finish.',
    digitalSetsBody:          'From reflective glass surfaces to directional shadows and environmental texture, every scene is refined through real production sensibilities. This helps our AI-assisted visuals maintain a stronger sense of realism, continuity, and professional polish.',
  }).commit();
  console.log('  ✓ Homepage text patched (images preserved)');
} else {
  console.log('  ⚠ No existing homepageSections document found — skipping (run seed.mjs first to create it)');
}

// ── 2. Services — create 4 service documents ──────────────────────────────

console.log('Creating service documents...');
const services = [
  {
    _id:   'service-01',
    _type: 'service',
    order: 1,
    number: '01',
    title: 'Key Visual Production',
    description: "Hero-level campaign imagery art directed with attention to composition, lighting logic, material realism, and brand alignment. Each key visual is developed as a standalone hero asset designed to create maximum visual impact across a single intended format and application.",
    tags: ['Campaign', 'Hero Imagery'],
  },
  {
    _id:   'service-02',
    _type: 'service',
    order: 2,
    number: '02',
    title: 'Campaign Sets & Multi-Format',
    description: 'Cohesive campaign image systems adapted across portrait, landscape, and square formats from a unified art direction. Built for flexible deployment across digital, social, e-commerce, and print while maintaining visual consistency throughout the campaign.',
    tags: ['Social', 'Digital', 'Print', 'Multi-Format'],
  },
  {
    _id:   'service-03',
    _type: 'service',
    order: 3,
    number: '03',
    title: 'Cinemagraph & Motion',
    description: 'Available as an add-on to Key Visuals and Campaign Sets, our cinemagraphs introduce subtle looping motion while maintaining controlled product accuracy, lighting consistency, and packaging fidelity. Designed for elevated social, digital, and motion-first campaign applications.',
    tags: ['Reels', 'Social', 'Digital Ads'],
  },
  {
    _id:   'service-04',
    _type: 'service',
    order: 4,
    number: '04',
    title: 'Brand & Packaging Photography',
    description: 'Production-grade product and packaging photography created as the foundation for our AI-assisted workflow. Depending on the project brief, practical shoots and truth plates may be produced to ensure accurate brand representation, packaging detail, and material realism across all generated outputs.',
    tags: ['Practical Capture', 'Packaging Fidelity'],
  },
];

for (const svc of services) {
  await client.createOrReplace(svc);
  console.log(`  ✓ Service "${svc.title}"`);
}

// ── 3. Services Page ───────────────────────────────────────────────────────

console.log('Creating services page content...');
await client.createOrReplace({
  _id:   'servicesPage-singleton',
  _type: 'servicesPage',
  heroHeading: 'Services built for modern brands.',
  steps: [
    st('01', 'Brief & Direction',  'Every project begins with a clear production roadmap. We align on campaign goals, featured products, output requirements, aspect ratios, and creative references to establish a strong foundation before production begins.'),
    st('02', 'Art Direction',      'Strong visuals begin with strong foundations. Our approach to lighting, composition, and set design is rooted in years of real production experience, with practical shoots and reference plates used whenever needed to guide accuracy and realism.'),
    st('03', 'AI Production',      'Our proprietary workflow combines human creative direction with AI-assisted production to build, extend, and refine environments, compositions, and scalable content variations.'),
    st('04', 'Delivery',           'Final imagery and motion assets are exported in all required deliverable formats, prepared for seamless rollout across campaign channels.'),
  ],
});
console.log('  ✓ Services page');

// ── 4. Contact Page ────────────────────────────────────────────────────────

console.log('Creating contact page content...');
await client.createOrReplace({
  _id:   'contactPage-singleton',
  _type: 'contactPage',
  heroHeading:      'Start a project with us.',
  availabilityText: "We're currently open to new brand partnerships. Whether you're launching a campaign, refreshing product imagery, or exploring AI-assisted production for the first time — reach out and let's talk.",
});
console.log('  ✓ Contact page');

// ── 5. Works Page ──────────────────────────────────────────────────────────

console.log('Creating works page content...');
await client.createOrReplace({
  _id:   'worksPage-singleton',
  _type: 'worksPage',
  heading:            'Our Works',
  galleryDescription: 'A selection of individual frames — product stills, key visuals, and standalone campaign images.',
});
console.log('  ✓ Works page');

// ── 6. About Page ──────────────────────────────────────────────────────────

console.log('Creating about page content...');
await client.createOrReplace({
  _id:   'aboutPage-singleton',
  _type: 'aboutPage',
  heroHeading:     'Human-led visuals for a new creative era.',
  storyHeading:    'Built by creatives who understand production.',
  storyBody01:     'Before Third Layer, our work was rooted in commercial photography, filmmaking, lighting, styling, and production design. Years spent working on physical sets taught us how much craftsmanship goes into building believable imagery — and how often production limitations shape creative outcomes.',
  storyBody02:     'Third Layer was created to bridge that gap. Using a hybrid workflow grounded in photographic principles, we use AI-assisted tools to extend environments, generate scalable variations, and support larger creative systems without losing the intentionality of human art direction.',
  philosophyQuote: 'Technology expands the process. Human direction shapes the outcome.',
  philosophyBody:  'We believe AI works best when guided by people who understand photography, filmmaking, and visual production at a foundational level. Technology allows us to move faster and build larger creative systems, but human direction remains at the center of every decision we make.',
});
console.log('  ✓ About page');

// ── 7. Site Settings ───────────────────────────────────────────────────────

console.log('Creating / updating site settings...');
const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]{ _id }`);

if (existingSettings?._id) {
  await client.patch(existingSettings._id).setIfMissing({
    email:         'hello@thirdlayer_studios.com',
    instagram:     '@thirdlayer_studios',
    footerTagline: 'Human-led AI-assisted Image Studio. Defining the future of product imagery through art direction and intelligent production.',
  }).commit();
  console.log('  ✓ Site settings patched');
} else {
  await client.create({
    _type:        'siteSettings',
    email:         'hello@thirdlayer_studios.com',
    instagram:     '@thirdlayer_studios',
    footerTagline: 'Human-led AI-assisted Image Studio. Defining the future of product imagery through art direction and intelligent production.',
  });
  console.log('  ✓ Site settings created');
}

console.log('\n✅ All content seeded successfully!');
console.log('   Open Sanity Studio → publish each document to make it live.');
