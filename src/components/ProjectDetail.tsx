'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/colors';
import { SectionLabel } from './SectionLabel';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { Project } from '@/lib/data';

export function ProjectDetail({ project }: { project: Project }) {
  const bp   = useBreakpoint();
  const mob  = bp === 'mob';
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [drag, setDrag]   = useState({ active: false, startX: 0, delta: 0 });
  const slides = project.slides;
  const n = slides.length;

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setSlide(s => Math.min(n - 1, s + 1));
      if (e.key === 'ArrowLeft')  setSlide(s => Math.max(0, s - 1));
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [n]);

  const startDrag = (x: number) => setDrag({ active: true, startX: x, delta: 0 });
  const moveDrag  = (x: number) => drag.active && setDrag(d => ({ ...d, delta: x - d.startX }));
  const endDrag   = () => {
    if (drag.active) {
      if (drag.delta < -60) setSlide(s => Math.min(n - 1, s + 1));
      if (drag.delta >  60) setSlide(s => Math.max(0, s - 1));
    }
    setDrag({ active: false, startX: 0, delta: 0 });
  };

  return (
    <div style={{ background: C.dark, minHeight: '100vh' }}>
      <div style={{ padding: mob ? '80px 20px 24px' : bp === 'tab' ? '88px 36px 28px' : '100px 64px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <button onClick={() => router.push('/works')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(243,239,232,0.45)', marginBottom: 32, padding: 0 }}>
            ← Back
          </button>
          <SectionLabel>{project.category}</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1.02, color: C.beige, margin: '0 0 20px' }}>{project.client}</h1>
          <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.85, color: 'rgba(243,239,232,0.52)', maxWidth: 560, margin: 0 }}>{project.description}</p>
        </div>
        <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, color: 'rgba(243,239,232,0.3)', paddingBottom: 8 }}>{slide + 1} / {n}</div>
      </div>

      {/* Slider track — no fixed height; height comes from each image box */}
      <div
        style={{ position: 'relative', overflow: 'hidden', cursor: drag.active ? 'grabbing' : 'grab', userSelect: 'none' }}
        onMouseDown={e => startDrag(e.clientX)}
        onMouseMove={e => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={e => startDrag(e.touches[0].clientX)}
        onTouchMove={e => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
      >
        <div style={{ display: 'flex', transform: `translateX(calc(-${slide * 100}% + ${drag.active ? drag.delta : 0}px))`, transition: drag.active ? 'none' : 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
          {slides.map((s, i) => {
            // Compute numeric ratio value for maxWidth calculation
            const [rw, rh] = s.ratio.split('/').map(Number);
            const rv = rw / rh;

            return (
              <div
                key={i}
                style={{
                  flex: '0 0 100%',
                  padding: mob ? '0 16px' : '0 64px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // No fixed height — let the image box drive it
                }}
              >
                {/*
                  Desktop sizing (no-crop):
                    width: 100% fills the padded container.
                    maxWidth = clamp(360px,78vh,900px) × ratio — this is the
                    "ideal" width when height is 78vh. When the browser is wide
                    enough, maxWidth kicks in and aspect-ratio derives the
                    height → 78vh (height-driven, as spec requires).
                    When the browser narrows below that maxWidth, width stays
                    at 100% of the available space and aspect-ratio derives a
                    proportionally smaller height — no cropping.

                  Mobile sizing:
                    width: 100%, aspect-ratio drives the height (width-driven).
                */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: mob ? undefined : `calc(clamp(360px, 78vh, 900px) * ${rv.toFixed(4)})`,
                    aspectRatio: s.ratio,
                    background: `linear-gradient(140deg,${project.hi}2a 0%,${project.bg} 100%)`,
                    border: '1px solid rgba(243,239,232,0.08)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 20,
                    boxSizing: 'border-box',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {s.type === 'image' ? (
                    <Image
                      src={s.src}
                      alt={s.label}
                      fill
                      sizes="(max-width:768px) 90vw, 75vh"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  ) : (
                    <video
                      autoPlay muted loop playsInline src={s.src}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(243,239,232,0.35)', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {slide > 0 && (
          <button
            onClick={e => { e.stopPropagation(); setSlide(s => s - 1); }}
            style={{ position: 'absolute', left: mob ? 4 : 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(243,239,232,0.15)', width: mob ? 36 : 48, height: mob ? 36 : 48, borderRadius: '50%', color: C.beige, fontSize: mob ? 16 : 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >←</button>
        )}
        {slide < n - 1 && (
          <button
            onClick={e => { e.stopPropagation(); setSlide(s => s + 1); }}
            style={{ position: 'absolute', right: mob ? 4 : 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(243,239,232,0.15)', width: mob ? 36 : 48, height: mob ? 36 : 48, borderRadius: '50%', color: C.beige, fontSize: mob ? 16 : 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >→</button>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: '28px 0 64px' }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 6, height: 6, borderRadius: 3, background: i === slide ? C.accent : 'rgba(243,239,232,0.25)', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  );
}
