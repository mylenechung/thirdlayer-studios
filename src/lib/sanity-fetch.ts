import { client } from '../../sanity/lib/client';
import { heroSlidesQuery, projectsQuery, homepageSectionsQuery } from '../../sanity/lib/queries';
import { PROJECTS, GALLERY } from '@/lib/data';
import type { Project } from '@/lib/data';

// ── Types returned by GROQ ─────────────────────────────────────────────────

export type SanityHeroSlide = { label: string; imageUrl: string };

export type SanityHomepageSections = {
  methodPortrait: string | null;
  methodLandscape01: string | null;
  methodLandscape02: string | null;
  digitalSets01: string | null;
  digitalSets02: string | null;
  motionVideoUrl: string | null;
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

// ── Normalise Sanity project → local Project type ──────────────────────────

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
  // Fallback: use local images
  return [
    { label: 'Key Visual',    imageUrl: '/hero-slideshow/hero-slide-01.jpg' },
    { label: 'Campaign Shot', imageUrl: '/hero-slideshow/hero-slide-02.jpg' },
  ];
}

export async function fetchHomepageSections(): Promise<SanityHomepageSections> {
  try {
    const raw: SanityHomepageSections = await client.fetch(homepageSectionsQuery, {}, { next: { revalidate: 60 } });
    if (raw) return raw;
  } catch (err) {
    console.warn('[fetchHomepageSections] Sanity unavailable, using static data:', err);
  }
  // Fallback: use local images
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
  // Gallery items are not in Sanity yet; serve from static data
  return GALLERY;
}
