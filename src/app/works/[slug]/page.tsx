import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/data';
import { ProjectDetail } from '@/components/ProjectDetail';

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find(p => p.id === params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
