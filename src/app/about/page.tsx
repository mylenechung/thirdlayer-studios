'use client';
import { C } from '@/lib/colors';
import { SectionLabel } from '@/components/SectionLabel';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function AboutPage() {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const P   = mob ? '64px 24px' : bp === 'tab' ? '80px 36px' : '120px 48px';

  return (
    <div style={{ background: C.beige }}>
      <section style={{ padding: mob ? '80px 24px 60px' : '120px 48px 100px', background: C.dark }}>
        <SectionLabel>About the Studio</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(48px,7vw,80px)', lineHeight: 1.0, color: C.beige, maxWidth: 760, margin: 0 }}>
          Human-led visuals<br />for a new creative era.
        </h1>
      </section>

      <section style={{ padding: P }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 40 : 80 }}>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 36, lineHeight: 1.1, color: C.dark, margin: '0 0 24px' }}>Built by creatives who understand production.</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: '0 0 20px' }}>Before Third Layer, our work was rooted in commercial photography, filmmaking, lighting, styling, and production design. Years spent working on physical sets taught us how much craftsmanship goes into building believable imagery — and how often production limitations shape creative outcomes.</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: 0 }}>Third Layer was created to bridge that gap. Using a hybrid workflow grounded in photographic principles, we use AI-assisted tools to extend environments, generate scalable variations, and support larger creative systems without losing the intentionality of human art direction.</p>
          </div>
          <div>
            <SectionLabel>Philosophy</SectionLabel>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 22, lineHeight: 1.65, color: C.dark, fontWeight: 300, margin: '0 0 32px', fontStyle: 'italic' }}>&ldquo;Technology expands the process. Human direction shapes the outcome.&rdquo;</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: 0 }}>We believe AI works best when guided by people who understand photography, filmmaking, and visual production at a foundational level. Technology allows us to move faster and build larger creative systems, but human direction remains at the center of every decision we make.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
