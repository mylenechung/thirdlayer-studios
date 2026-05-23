import { fetchProjects, fetchHeroSlides, fetchHomepageSections } from '@/lib/sanity-fetch';
import { HomePageClient } from '@/components/HomePageClient';

export const revalidate = 60;

export default async function HomePage() {
  const [projects, heroSlides, sections] = await Promise.all([
    fetchProjects(),
    fetchHeroSlides(),
    fetchHomepageSections(),
  ]);

  return <HomePageClient projects={projects} heroSlides={heroSlides} sections={sections} />;
}
