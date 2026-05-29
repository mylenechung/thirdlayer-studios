import { fetchProjects, fetchGallery, fetchWorksPage } from '@/lib/sanity-fetch';
import { WorksClient } from '@/components/WorksClient';

export const revalidate = 60;

export default async function WorksPage() {
  const [projects, gallery, worksPage] = await Promise.all([
    fetchProjects(),
    fetchGallery(),
    fetchWorksPage(),
  ]);

  return <WorksClient projects={projects} gallery={gallery} worksPage={worksPage} />;
}
