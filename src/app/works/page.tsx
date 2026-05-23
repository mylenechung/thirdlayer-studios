'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/colors';
import { SectionLabel } from '@/components/SectionLabel';
import { ProjectCard } from '@/components/ProjectCard';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { PROJECTS, GALLERY } from '@/lib/data';

export default function WorksPage() {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const [activeTab, setActiveTab] = useState<'featured' | 'gallery'>('featured');
  const router = useRouter();

  return (
    <div style={{ padding: mob ? '80px 20px 60px' : '100px 48px 100px', background: C.beige, minHeight: '100vh' }}>
      <SectionLabel>Portfolio</SectionLabel>
      <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(52px,8vw,88px)', lineHeight: 1.0, color: C.dark, margin: '0 0 48px' }}>Our Works</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(20,20,20,0.1)', marginBottom: 56 }}>
        {([['featured', 'Featured Projects'], ['gallery', 'Gallery']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: activeTab === id ? C.dark : C.muted, fontWeight: activeTab === id ? 600 : 400, padding: '12px 28px 12px 0', borderBottom: activeTab === id ? `2px solid ${C.accent}` : '2px solid transparent', marginBottom: -1, transition: 'all 0.2s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Featured Projects */}
      {activeTab === 'featured' && (
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : bp === 'tab' ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: mob ? 24 : 36 }}>
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} onClick={() => router.push(`/works/${p.id}`)} />
          ))}
        </div>
      )}

      {/* Gallery */}
      {activeTab === 'gallery' && (
        <div>
          <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 14, lineHeight: 1.75, color: C.muted, margin: '0 0 48px', maxWidth: 480 }}>
            A selection of individual frames — product stills, key visuals, and standalone campaign images.
          </p>
          <div style={{ columns: mob ? 2 : 3, columnGap: 16 }}>
            {GALLERY.map(item => (
              <div key={item.id} style={{ breakInside: 'avoid', marginBottom: 16, aspectRatio: item.ratio, background: item.bg, display: 'flex', alignItems: 'flex-end', padding: 16, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                {item.src && <Image src={item.src} alt={item.title} fill sizes="(max-width:768px) 50vw, 33vw" style={{ objectFit: 'cover' }} />}
                <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, fontWeight: 500, color: 'rgba(243,239,232,0.52)', position: 'relative', zIndex: 1 }}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
