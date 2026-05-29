import { fetchHeroSlides, fetchHomepageContent } from '@/lib/sanity-fetch';
import { HomePageClient } from '@/components/HomePageClient';

export const revalidate = 60;

export default async function HomePage() {
  const [heroSlides, content] = await Promise.all([
    fetchHeroSlides(),
    fetchHomepageContent(),
  ]);

  return <HomePageClient heroSlides={heroSlides} content={content} />;
}
