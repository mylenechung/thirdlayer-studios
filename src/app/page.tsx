import { fetchHeroSlides, fetchHomepageSections } from '@/lib/sanity-fetch';
import { HomePageClient } from '@/components/HomePageClient';

export const revalidate = 60;

export default async function HomePage() {
  const [heroSlides, sections] = await Promise.all([
    fetchHeroSlides(),
    fetchHomepageSections(),
  ]);

  return <HomePageClient heroSlides={heroSlides} sections={sections} />;
}
