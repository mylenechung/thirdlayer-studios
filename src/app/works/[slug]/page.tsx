import { notFound } from 'next/navigation';
import { fetchProjects, fetchProjectBySlug } from '@/lib/sanity-fetch';
import { ProjectDetail } from '@/components/ProjectDetail';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map(p => ({ slug: p.id }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
