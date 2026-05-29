import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import { heroSlidesQuery, projectsQuery, homepageSectionsQuery } from '../../sanity/lib/queries';
import { PROJECTS, GALLERY } from '@/lib/data';
import type { Project } from '@/lib/data';

// ── Shared image type (full object with crop + hotspot) ────────────────────

type SanityImage = {
  asset: { _id: string; url: string };
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  hotspot?: { x: number; y: number; width: number; height: number } | null;
} | null;

/** Resolve a Sanity image object → URL, respecting crop + hotspot */
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

type RawHomepageSections = {
  methodPortrait:    SanityImage;
  methodLandscape01: SanityImage;
  methodLandscape02: SanityImage;
  digitalSets01:     SanityImage;
  digitalSets02:     SanityImage;
  motionVideoUrl:    string | null;
};

// ── Public types passed to components ─────────────────────────────────────

export type SanityHeroSlide = { label: string; imageUrl: string };

export type SanityHomepageSections = {
  methodPortrait:    string | null;
  methodLandscape01: string | null;
  methodLandscape02: string | null;
  digitalSets01:     string | null;
  digitalSets02:     string | null;
  motionVideoUrl:    string | null;
};

// ── Normalise Sanity project → local Project type ──────────────────────────

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

// ── Fetch helpers ──────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<Project[]> {
  try {
    const raw: RawProject[] = await client.fetch(projectsQuery, {}, { next: { tags: ['sanity'] } });
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
    const raw: RawHeroSlide[] = await client.fetch(heroSlidesQuery, {}, { next: { tags: ['sanity'] } });
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

export async function fetchHomepageSections(): Promise<SanityHomepageSections> {
  try {
    const raw: RawHomepageSections = await client.fetch(homepageSectionsQuery, {}, { next: { tags: ['sanity'] } });
    if (raw) {
      return {
        methodPortrait:    imgUrl(raw.methodPortrait),
        methodLandscape01: imgUrl(raw.methodLandscape01),
        methodLandscape02: imgUrl(raw.methodLandscape02),
        digitalSets01:     imgUrl(raw.digitalSets01),
        digitalSets02:     imgUrl(raw.digitalSets02),
        motionVideoUrl:    raw.motionVideoUrl,
      };
    }
  } catch (err) {
    console.warn('[fetchHomepageSections] Sanity unavailable, using static data:', err);
  }
  return {
    methodPortrait:    '/method/Method_portrait.jpg',
    methodLandscape01: '/method/Method_landscape01.jpg',
    methodLandscape02: '/method/Method_landscape02.jpg',
    digitalSets01:     '/digital-sets/digitalsets1.jpg',
    digitalSets02:     '/digital-sets/digitalsets2.jpg',
    motionVideoUrl:    '/motion/Motion.mp4',
  };
}

export async function fetchGallery() {
  return GALLERY;
}
