'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { C } from '@/lib/colors';

const slides = [
  { src: '/hero-slideshow/hero-slide-01.jpg', label: 'Key Visual' },
  { src: '/hero-slideshow/hero-slide-02.jpg', label: 'Campaign Shot' },
];

export function HeroSlideshow() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      {slides.map((s, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, opacity: slide === i ? 1 : 0, transition: 'opacity 0.9s ease' }}>
          <Image src={s.src} alt={s.label} fill sizes="100vw" style={{ objectFit: 'cover' }} priority={i === 0} />
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 2 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 24 : 6, height: 6, borderRadius: 3, background: slide === i ? C.accent : 'rgba(243,239,232,0.35)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 24, fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 9, letterSpacing: '0.15em', color: 'rgba(243,239,232,0.3)', textTransform: 'uppercase' }}>
        {slide + 1} / {slides.length}
      </div>
    </div>
  );
}
