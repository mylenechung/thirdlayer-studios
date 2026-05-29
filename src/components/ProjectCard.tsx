'use client';
import { useState } from 'react';
import Image from 'next/image';
import { C } from '@/lib/colors';
import type { Project } from '@/lib/data';

export function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const thumb = project.slides[0];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: 'pointer', transform: hov ? 'translateY(-6px)' : 'none', transition: 'transform 0.3s ease' }}
    >
      <div style={{ width: '100%', aspectRatio: '3/4', background: project.bg, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        {thumb?.type === 'image' && (
          <Image src={thumb.src} alt={project.client} fill sizes="(max-width:768px) 50vw, 33vw" style={{ objectFit: 'cover' }} unoptimized />
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent, marginTop: 4 }}>
        {project.client}
      </div>
    </div>
  );
}
