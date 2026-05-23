import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import { heroSlidesQuery, projectsQuery, homepageSectionsQuery } from '../../sanity/lib/queries';
import { PROJECTS, GALLERY } from '@/lib/data';
import type { Project } from '@/lib/data';

// ── Types returned by GROQ ─────────────────────────────────────────────────

export type SanityHeroSlide = { label: string; imageUrl: string };

// Full image object from Sanity (includes crop + hotspot for urlFor)
type SanityImage = {
  asset: { _ref: string; url: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
} | null;

type SanityHomepageSectionsRaw = {
  methodPortrait:    SanityImage;
  methodLandscape01: SanityImage;
  methodLandscape02: SanityImage;
  digitalSets01:     SanityImage;
  digitalSets02:     SanityImage;
  motionVideoUrl:    string | null;
};

// Resolved form passed to components (plain URLs)
export type SanityHomepageSections = {
  methodPortrait:    string | null;
  methodLandscape01: string | null;
  methodLandscape02: string | null;
  digitalSets01:     string | null;
  digitalSets02:     string | null;
  motionVideoUrl:    string | null;
};

export type SanityProject = {
  slug: string;
  client: string;
  category: string;
  description: string;
  bgColor: string;
  highlightColor: string;
  featured: boolean;
  slides: Array<{
    label: string;
    aspectRatio: string;
    mediaType: 'image' | 'video';
    imageUrl: string | null;
    videoUrl: string | null;
  }>;
};

// ── Helpers ────────────────────────────────────────────────────────────────

/** Resolve a Sanity image object to a URL, respecting crop + hotspot */
function resolveImageUrl(img: SanityImage): string | null {
  if (!img?.asset) return null;
  return urlFor(img).auto('format').url();
}

function toProject(p: SanityProject): Project {
  return {
    id: p.slug,
    client: p.client,
    category: p.category,
    description: p.description,
    bg: p.bgColor,
    hi: p.highlightColor,
    slides: p.slides.map(s => ({
      label: s.label,
      ratio: s.aspectRatio,
      type: s.mediaType,
      src: s.mediaType === 'video' ? (s.videoUrl ?? '') : (s.imageUrl ?? ''),
    })),
  };
}

// ── Fetch helpers (server-side, with static fallback) ─────────────────────

export async function fetchProjects(): Promise<Project[]> {
  try {
    const raw: SanityProject[] = await client.fetch(projectsQuery, {}, { next: { revalidate: 60 } });
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
    const raw: SanityHeroSlide[] = await client.fetch(heroSlidesQuery, {}, { next: { revalidate: 60 } });
    if (raw?.length) return raw;
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
    const raw: SanityHomepageSectionsRaw = await client.fetch(homepageSectionsQuery, {}, { next: { revalidate: 60 } });
    if (raw) {
      return {
        methodPortrait:    resolveImageUrl(raw.methodPortrait),
        methodLandscape01: resolveImageUrl(raw.methodLandscape01),
        methodLandscape02: resolveImageUrl(raw.methodLandscape02),
        digitalSets01:     resolveImageUrl(raw.digitalSets01),
        digitalSets02:     resolveImageUrl(raw.digitalSets02),
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
