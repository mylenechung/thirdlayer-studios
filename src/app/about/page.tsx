import { fetchAboutPage } from '@/lib/sanity-fetch';
import { AboutClient } from '@/components/AboutClient';

export const revalidate = 60;

export default async function AboutPage() {
  const page = await fetchAboutPage();
  return <AboutClient page={page} />;
}
