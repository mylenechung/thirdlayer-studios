import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import {
  heroSlidesQuery,
  projectsQuery,
  servicesQuery,
  homepageContentQuery,
  servicesPageQuery,
  contactPageQuery,
  worksPageQuery,
  aboutPageQuery,
} from '../../sanity/lib/queries';
import { PROJECTS, GALLERY, SERVICES } from '@/lib/data';
import type { Project, Service } from '@/lib/data';

// ── Shared image type ──────────────────────────────────────────────────────

type SanityImage = {
  asset: { _id: string; url: string };
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  hotspot?: { x: number; y: number; width: number; height: number } | null;
} | null;

function imgUrl(img: SanityImage): string | null {
  if (!img?.asset) return null;
  return urlFor(img).auto('format').quality(90).url();
}

// ── Raw GROQ return types ──────────────────────────────────────────────────

type RawHeroSlide = { label: string; image: SanityImage };

type RawSlide = {
  label: string;
  aspectRatio: string;
  mediaType: 'image' | 'video';
  image: SanityImage;
  videoUrl: string | null;
};

type RawProject = {
  slug: string;
  client: string;
  category: string;
  description: string;
  bgColor: string;
  highlightColor: string;
  featured: boolean;
  slides: RawSlide[];
};

type RawService = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

type RawParagraph = { text: string; italic: boolean };

type RawHomepageContent = {
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroSubtext: string;
  whoWeAreHeading: string;
  whoWeAreBody: RawParagraph[];
  approachHeading: string;
  approachBody: string;
  approachSteps: { number: string; label: string }[];
  methodHeading: string;
  methodTagline: string;
  methodBody: string;
  methodPortrait: SanityImage;
  methodLandscape01: SanityImage;
  methodLandscape02: SanityImage;
  motionHeading: string;
  motionBody: RawParagraph[];
  motionVideoUrl: string | null;
  digitalSetsHeading: string;
  digitalSetsHeadingAccent: string;
  digitalSetsBody: string;
  digitalSets01: SanityImage;
  digitalSets02: SanityImage;
};

type RawServicesPage = {
  heroHeading: string;
  steps: { number: string; title: string; description: string }[];
};

type RawContactPage = {
  heroHeading: string;
  availabilityText: string;
};

type RawWorksPage = {
  heading: string;
  galleryDescription: string;
};

type RawAboutPage = {
  heroHeading: string;
  storyHeading: string;
  storyBody01: string;
  storyBody02: string;
  philosophyQuote: string;
  philosophyBody: string;
};

// ── Public types ───────────────────────────────────────────────────────────

export type SanityHeroSlide = { label: string; imageUrl: string };

export type Paragraph = { text: string; italic: boolean };

export type SanityHomepageContent = {
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroSubtext: string;
  whoWeAreHeading: string;
  whoWeAreBody: Paragraph[];
  approachHeading: string;
  approachBody: string;
  approachSteps: { number: string; label: string }[];
  methodHeading: string;
  methodTagline: string;
  methodBody: string;
  methodPortrait: string | null;
  methodLandscape01: string | null;
  methodLandscape02: string | null;
  motionHeading: string;
  motionBody: Paragraph[];
  motionVideoUrl: string | null;
  digitalSetsHeading: string;
  digitalSetsHeadingAccent: string;
  digitalSetsBody: string;
  digitalSets01: string | null;
  digitalSets02: string | null;
};

// Keep the old name as an alias so existing component references still compile
export type SanityHomepageSections = SanityHomepageContent;

export type SanityServicesPage = {
  heroHeading: string;
  steps: { number: string; title: string; description: string }[];
};

export type SanityContactPage = {
  heroHeading: string;
  availabilityText: string;
};

export type SanityWorksPage = {
  heading: string;
  galleryDescription: string;
};

export type SanityAboutPage = {
  heroHeading: string;
  storyHeading: string;
  storyBody01: string;
  storyBody02: string;
  philosophyQuote: string;
  philosophyBody: string;
};

// ── Normalisers ────────────────────────────────────────────────────────────

function toProject(p: RawProject): Project {
  return {
    id: p.slug,
    client: p.client,
    category: p.category ?? '',
    description: p.description ?? '',
    bg: p.bgColor ?? '#1a1a1a',
    hi: p.highlightColor ?? '#333333',
    slides: (p.slides ?? []).map(s => ({
      label: s.label ?? '',
      ratio: s.aspectRatio ?? '3/4',
      type: s.mediaType ?? 'image',
      src: s.mediaType === 'video' ? (s.videoUrl ?? '') : (imgUrl(s.image) ?? ''),
    })),
  };
}

function toService(s: RawService): Service {
  return {
    n:    s.number ?? '',
    title: s.title ?? '',
    desc:  s.description ?? '',
    tags:  s.tags ?? [],
  };
}

// ── Static fallback content ────────────────────────────────────────────────

const FALLBACK_HOMEPAGE: SanityHomepageContent = {
  heroHeadline:       'Defining the future of',
  heroHeadlineAccent: 'product imagery.',
  heroSubtext:        'A proprietary hybrid workflow combining real production expertise with AI-assisted creative tools.',
  whoWeAreHeading:    'The future of imagery still needs human hands.',
  whoWeAreBody: [
    { text: 'Third Layer was built by creatives with years of industry experience producing commercial content in the real world. That experience shapes how we use AI: with restraint, direction, and an understanding of how light, texture, materials, and environments should behave naturally on camera.', italic: false },
    { text: 'Unlike purely generative workflows, our process begins with photography. We create controlled reference imagery through real-world production, establishing a visual foundation that guides every stage of development. By grounding our work in something tangible from the start, we\'re able to achieve greater accuracy, consistency, and creative control.', italic: false },
    { text: 'Our hybrid workflow bridges the gap between physical production and digital expansion, unlocking more ambitious visual worlds while keeping the final work rooted in authentic art direction and photographic realism.', italic: false },
    { text: 'AI gives us reach. Human experience gives the work meaning.', italic: true },
  ],
  approachHeading: 'Art direction meets intelligent production',
  approachBody:    'Every image begins with strong art direction, lighting, composition, and commercially accurate product photography. Our AI-assisted workflow allows us to extend environments, explore creative variations, and scale outputs efficiently — while keeping each final image grounded in real-world craft, product accuracy, and human-led post-production.',
  approachSteps: [
    { number: '01', label: 'Art Direction' },
    { number: '02', label: 'AI-Assisted Production' },
    { number: '03', label: 'Human-Led Post' },
  ],
  methodHeading: 'Three frames, one story.',
  methodTagline: 'Grounded in photographic logic. Expanded digitally.',
  methodBody:    'Our background in commercial product photography allows us to extend imagery with a stronger sense of visual consistency across framing, perspective, lighting direction, surface texture, and material response. By grounding every scene in real photographic principles, we create AI-assisted visuals that feel cohesive across multiple frames rather than individually generated.',
  methodPortrait:    null,
  methodLandscape01: null,
  methodLandscape02: null,
  motionHeading: 'Controlled movement, crafted for social.',
  motionBody: [
    { text: 'Our motion outputs focus on cinemagraph-style clips with carefully directed movement around the product. This approach preserves packaging accuracy and visual consistency while introducing subtle motion that enhances depth, atmosphere, and engagement.', italic: false },
    { text: 'By keeping the product controlled and animating supporting elements within the scene, we create commercially reliable motion assets optimized for social media and digital campaigns.', italic: false },
  ],
  motionVideoUrl:         null,
  digitalSetsHeading:       'digital sets.',
  digitalSetsHeadingAccent: 'photographic finish.',
  digitalSetsBody:          'From reflective glass surfaces to directional shadows and environmental texture, every scene is refined through real production sensibilities. This helps our AI-assisted visuals maintain a stronger sense of realism, continuity, and professional polish.',
  digitalSets01: null,
  digitalSets02: null,
};

const FALLBACK_SERVICES_PAGE: SanityServicesPage = {
  heroHeading: 'Services built for modern brands.',
  steps: [
    { number: '01', title: 'Brief & Direction',  description: 'Every project begins with a clear production roadmap. We align on campaign goals, featured products, output requirements, aspect ratios, and creative references to establish a strong foundation before production begins.' },
    { number: '02', title: 'Art Direction',      description: 'Strong visuals begin with strong foundations. Our approach to lighting, composition, and set design is rooted in years of real production experience, with practical shoots and reference plates used whenever needed to guide accuracy and realism.' },
    { number: '03', title: 'AI Production',      description: 'Our proprietary workflow combines human creative direction with AI-assisted production to build, extend, and refine environments, compositions, and scalable content variations.' },
    { number: '04', title: 'Delivery',           description: 'Final imagery and motion assets are exported in all required deliverable formats, prepared for seamless rollout across campaign channels.' },
  ],
};

const FALLBACK_CONTACT_PAGE: SanityContactPage = {
  heroHeading:      'Start a project with us.',
  availabilityText: "We're currently open to new brand partnerships. Whether you're launching a campaign, refreshing product imagery, or exploring AI-assisted production for the first time — reach out and let's talk.",
};

const FALLBACK_WORKS_PAGE: SanityWorksPage = {
  heading:            'Our Works',
  galleryDescription: 'A selection of individual frames — product stills, key visuals, and standalone campaign images.',
};

const FALLBACK_ABOUT_PAGE: SanityAboutPage = {
  heroHeading:      'Human-led visuals for a new creative era.',
  storyHeading:     'Built by creatives who understand production.',
  storyBody01:      'Before Third Layer, our work was rooted in commercial photography, filmmaking, lighting, styling, and production design. Years spent working on physical sets taught us how much craftsmanship goes into building believable imagery — and how often production limitations shape creative outcomes.',
  storyBody02:      'Third Layer was created to bridge that gap. Using a hybrid workflow grounded in photographic principles, we use AI-assisted tools to extend environments, generate scalable variations, and support larger creative systems without losing the intentionality of human art direction.',
  philosophyQuote:  'Technology expands the process. Human direction shapes the outcome.',
  philosophyBody:   'We believe AI works best when guided by people who understand photography, filmmaking, and visual production at a foundational level. Technology allows us to move faster and build larger creative systems, but human direction remains at the center of every decision we make.',
};

// ── Fetch functions ────────────────────────────────────────────────────────

const TAGS = { next: { tags: ['sanity'] } };

export async function fetchProjects(): Promise<Project[]> {
  try {
    const raw: RawProject[] = await client.fetch(projectsQuery, {}, TAGS);
    if (raw?.length) return raw.map(toProject);
  } catch (err) {
    console.warn('[fetchProjects] Sanity unavailable, using static data:', err);
  }
  return PROJECTS;
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await fetchProjects();
  return projects.find(p => p.id === slug) ?? null;
}

export async function fetchHeroSlides(): Promise<SanityHeroSlide[]> {
  try {
    const raw: RawHeroSlide[] = await client.fetch(heroSlidesQuery, {}, TAGS);
    if (raw?.length) {
      return raw
        .map(s => ({ label: s.label, imageUrl: imgUrl(s.image) ?? '' }))
        .filter(s => s.imageUrl);
    }
  } catch (err) {
    console.warn('[fetchHeroSlides] Sanity unavailable, using static data:', err);
  }
  return [
    { label: 'Key Visual',    imageUrl: '/hero-slideshow/hero-slide-01.jpg' },
    { label: 'Campaign Shot', imageUrl: '/hero-slideshow/hero-slide-02.jpg' },
  ];
}

export async function fetchHomepageContent(): Promise<SanityHomepageContent> {
  try {
    const raw: RawHomepageContent = await client.fetch(homepageContentQuery, {}, TAGS);
    if (raw) {
      return {
        heroHeadline:       raw.heroHeadline       ?? FALLBACK_HOMEPAGE.heroHeadline,
        heroHeadlineAccent: raw.heroHeadlineAccent ?? FALLBACK_HOMEPAGE.heroHeadlineAccent,
        heroSubtext:        raw.heroSubtext        ?? FALLBACK_HOMEPAGE.heroSubtext,
        whoWeAreHeading:    raw.whoWeAreHeading    ?? FALLBACK_HOMEPAGE.whoWeAreHeading,
        whoWeAreBody:       raw.whoWeAreBody?.length ? raw.whoWeAreBody : FALLBACK_HOMEPAGE.whoWeAreBody,
        approachHeading:    raw.approachHeading    ?? FALLBACK_HOMEPAGE.approachHeading,
        approachBody:       raw.approachBody       ?? FALLBACK_HOMEPAGE.approachBody,
        approachSteps:      raw.approachSteps?.length ? raw.approachSteps : FALLBACK_HOMEPAGE.approachSteps,
        methodHeading:      raw.methodHeading      ?? FALLBACK_HOMEPAGE.methodHeading,
        methodTagline:      raw.methodTagline      ?? FALLBACK_HOMEPAGE.methodTagline,
        methodBody:         raw.methodBody         ?? FALLBACK_HOMEPAGE.methodBody,
        methodPortrait:     imgUrl(raw.methodPortrait),
        methodLandscape01:  imgUrl(raw.methodLandscape01),
        methodLandscape02:  imgUrl(raw.methodLandscape02),
        motionHeading:      raw.motionHeading      ?? FALLBACK_HOMEPAGE.motionHeading,
        motionBody:         raw.motionBody?.length  ? raw.motionBody  : FALLBACK_HOMEPAGE.motionBody,
        motionVideoUrl:     raw.motionVideoUrl     ?? null,
        digitalSetsHeading:       raw.digitalSetsHeading       ?? FALLBACK_HOMEPAGE.digitalSetsHeading,
        digitalSetsHeadingAccent: raw.digitalSetsHeadingAccent ?? FALLBACK_HOMEPAGE.digitalSetsHeadingAccent,
        digitalSetsBody:          raw.digitalSetsBody          ?? FALLBACK_HOMEPAGE.digitalSetsBody,
        digitalSets01: imgUrl(raw.digitalSets01),
        digitalSets02: imgUrl(raw.digitalSets02),
      };
    }
  } catch (err) {
    console.warn('[fetchHomepageContent] Sanity unavailable, using static data:', err);
  }
  return FALLBACK_HOMEPAGE;
}

// Keep old name as an alias for any code that still uses it
export const fetchHomepageSections = fetchHomepageContent;

export async function fetchServices(): Promise<Service[]> {
  try {
    const raw: RawService[] = await client.fetch(servicesQuery, {}, TAGS);
    if (raw?.length) return raw.map(toService);
  } catch (err) {
    console.warn('[fetchServices] Sanity unavailable, using static data:', err);
  }
  return SERVICES;
}

export async function fetchServicesPage(): Promise<SanityServicesPage> {
  try {
    const raw: RawServicesPage = await client.fetch(servicesPageQuery, {}, TAGS);
    if (raw) {
      return {
        heroHeading: raw.heroHeading ?? FALLBACK_SERVICES_PAGE.heroHeading,
        steps:       raw.steps?.length ? raw.steps : FALLBACK_SERVICES_PAGE.steps,
      };
    }
  } catch (err) {
    console.warn('[fetchServicesPage] Sanity unavailable, using static data:', err);
  }
  return FALLBACK_SERVICES_PAGE;
}

export async function fetchContactPage(): Promise<SanityContactPage> {
  try {
    const raw: RawContactPage = await client.fetch(contactPageQuery, {}, TAGS);
    if (raw) {
      return {
        heroHeading:     raw.heroHeading     ?? FALLBACK_CONTACT_PAGE.heroHeading,
        availabilityText: raw.availabilityText ?? FALLBACK_CONTACT_PAGE.availabilityText,
      };
    }
  } catch (err) {
    console.warn('[fetchContactPage] Sanity unavailable, using static data:', err);
  }
  return FALLBACK_CONTACT_PAGE;
}

export async function fetchWorksPage(): Promise<SanityWorksPage> {
  try {
    const raw: RawWorksPage = await client.fetch(worksPageQuery, {}, TAGS);
    if (raw) {
      return {
        heading:            raw.heading            ?? FALLBACK_WORKS_PAGE.heading,
        galleryDescription: raw.galleryDescription ?? FALLBACK_WORKS_PAGE.galleryDescription,
      };
    }
  } catch (err) {
    console.warn('[fetchWorksPage] Sanity unavailable, using static data:', err);
  }
  return FALLBACK_WORKS_PAGE;
}

export async function fetchAboutPage(): Promise<SanityAboutPage> {
  try {
    const raw: RawAboutPage = await client.fetch(aboutPageQuery, {}, TAGS);
    if (raw) {
      return {
        heroHeading:     raw.heroHeading     ?? FALLBACK_ABOUT_PAGE.heroHeading,
        storyHeading:    raw.storyHeading    ?? FALLBACK_ABOUT_PAGE.storyHeading,
        storyBody01:     raw.storyBody01     ?? FALLBACK_ABOUT_PAGE.storyBody01,
        storyBody02:     raw.storyBody02     ?? FALLBACK_ABOUT_PAGE.storyBody02,
        philosophyQuote: raw.philosophyQuote ?? FALLBACK_ABOUT_PAGE.philosophyQuote,
        philosophyBody:  raw.philosophyBody  ?? FALLBACK_ABOUT_PAGE.philosophyBody,
      };
    }
  } catch (err) {
    console.warn('[fetchAboutPage] Sanity unavailable, using static data:', err);
  }
  return FALLBACK_ABOUT_PAGE;
}

export async function fetchGallery() {
  return GALLERY;
}
