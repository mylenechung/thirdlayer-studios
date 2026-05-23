import { fetchProjects, fetchGallery } from '@/lib/sanity-fetch';
import { WorksClient } from '@/components/WorksClient';

export const revalidate = 60;

export default async function WorksPage() {
  const [projects, gallery] = await Promise.all([
    fetchProjects(),
    fetchGallery(),
  ]);

  return <WorksClient projects={projects} gallery={gallery} />;
}
