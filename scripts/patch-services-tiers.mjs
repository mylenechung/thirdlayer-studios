import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dfj6gqw9',
  dataset:   'production',
  apiVersion: '2024-01-01',
  token: 'skBKKqA0a1wO1GQMQmEh82Y2XK1tt0U9jIdl9qrrKkM3QNuNVYq4h5JmcYfp6MqVZrBRY9WN88BQGxfHomg32P2rnbsj9j6Tp0BKyDewMSgHfzcqXpP6kqUmfbgZqSWuChiXBW3GvPAjx3qhDFREVCMcyh4n4mck99MmJy6R9GYVK3tKAMrR',
  useCdn:    false,
});

const tier = (number, name, description, outputs, aiParticipation) => ({
  _type: 'object',
  _key: number,
  number,
  name,
  description,
  outputs,
  aiParticipation,
});

console.log('Patching services page with tier content...');

await client
  .patch('servicesPage-singleton')
  .set({
    introText: 'Four service tiers, built around how much of the work starts on set. AI participation increases progressively across each tier. Services can be combined based on your brief and what our team recommends.',
    tiers: [
      tier(
        '01',
        'Foundation',
        'Production-grade stills and video, shot on set and art directed from start to finish. This is the core of everything Third Layer makes — and it stands alone as a final deliverable when the brief calls for it.',
        ['Key visual reference imagery', 'Campaign stills', 'Product and packaging photography', 'Videography'],
        'minimal'
      ),
      tier(
        '02',
        'Hybrid',
        'A real shoot, extended by AI. Hero assets are captured on set, then expanded into scenes, formats, and variations through AI-assisted workflows — guided by human hands throughout.',
        ['Scene and environment expansion', 'Key visual compositing', 'Format adaptation across multiple aspect ratios'],
        'moderate'
      ),
      tier(
        '03',
        'Enhanced',
        'For briefs that go beyond imagery. Real production assets paired with design, copy, and heavy post work to deliver a complete, campaign-ready output — not just a visual, but a finished piece of communication.',
        ['Infographics', 'Designed campaign assets', 'Copy-led visuals'],
        'high'
      ),
      tier(
        '04',
        'Motion',
        "Directed video work, from concept to final cut. We build from real reference footage and expand through AI — whether that means extending a scene, adding atmospheric effects, or building environments that didn't exist on set. The result is a video that moves the way the brief intended, not the way a tool decided.",
        ['Video ads', 'Cinemagraphs'],
        'very-high'
      ),
    ],
  })
  .commit();

console.log('✓ Services page tiers populated in Sanity');
