'use client';
import { C } from '@/lib/colors';
import { SectionLabel } from '@/components/SectionLabel';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { SanityAboutPage } from '@/lib/sanity-fetch';

export function AboutClient({ page }: { page: SanityAboutPage }) {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const P   = mob ? '64px 24px' : bp === 'tab' ? '80px 36px' : '120px 48px';

  return (
    <div style={{ background: C.beige }}>
      <section style={{ padding: mob ? '80px 24px 60px' : '120px 48px 100px', background: C.dark }}>
        <SectionLabel>About the Studio</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(48px,7vw,80px)', lineHeight: 1.0, color: C.beige, maxWidth: 760, margin: 0 }}>
          {page.heroHeading}
        </h1>
      </section>

      <section style={{ padding: P }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 40 : 80 }}>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 36, lineHeight: 1.1, color: C.dark, margin: '0 0 24px' }}>{page.storyHeading}</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: '0 0 20px' }}>{page.storyBody01}</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: 0 }}>{page.storyBody02}</p>
          </div>
          <div>
            <SectionLabel>Philosophy</SectionLabel>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 22, lineHeight: 1.65, color: C.dark, fontWeight: 300, margin: '0 0 32px', fontStyle: 'italic' }}>
              &ldquo;{page.philosophyQuote}&rdquo;
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: 0 }}>{page.philosophyBody}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
