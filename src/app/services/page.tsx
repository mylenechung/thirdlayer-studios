'use client';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/colors';
import { SectionLabel } from '@/components/SectionLabel';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { SERVICES } from '@/lib/data';

export default function ServicesPage() {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const router = useRouter();

  const go = (p: string) => {
    router.push(`/${p}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const steps = [
    { s: '01', t: 'Brief & Direction', d: 'Every project begins with a clear production roadmap. We align on campaign goals, featured products, output requirements, aspect ratios, and creative references to establish a strong foundation before production begins.' },
    { s: '02', t: 'Art Direction',     d: 'Strong visuals begin with strong foundations. Our approach to lighting, composition, and set design is rooted in years of real production experience, with practical shoots and reference plates used whenever needed to guide accuracy and realism.' },
    { s: '03', t: 'AI Production',     d: 'Our proprietary workflow combines human creative direction with AI-assisted production to build, extend, and refine environments, compositions, and scalable content variations.' },
    { s: '04', t: 'Delivery',          d: 'Final imagery and motion assets are exported in all required deliverable formats, prepared for seamless rollout across campaign channels.' },
  ];

  return (
    <div style={{ background: C.beige, minHeight: '100vh' }}>
      <section style={{ padding: mob ? '80px 24px 60px' : '120px 48px 100px', background: C.dark }}>
        <SectionLabel>What We Do</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(48px,7vw,80px)', lineHeight: 1.0, color: C.beige, maxWidth: 680, margin: 0 }}>
          Services built for<br />modern brands.
        </h1>
      </section>

      <section style={{ padding: mob ? '32px 24px 48px' : '40px 48px 80px' }}>
        {SERVICES.map(s => (
          <div key={s.n} style={{ display: 'grid', gridTemplateColumns: mob ? '32px 1fr' : '64px 1fr 260px', gap: mob ? 24 : 56, alignItems: 'start', padding: '52px 0', borderBottom: '1px solid rgba(20,20,20,0.07)' }}>
            <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, color: C.accent, letterSpacing: '0.1em', paddingTop: 5 }}>{s.n}</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 28, color: C.dark, margin: '0 0 16px', lineHeight: 1.1 }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: 0 }}>{s.desc}</p>
            </div>
            <div style={{ display: mob ? 'none' : 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 5 }}>
              {s.tags.map(t => (
                <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(20,20,20,0.13)', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: mob ? '48px 24px 64px' : '80px 48px 120px', background: C.dark }}>
        <SectionLabel>How It Works</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: mob ? 24 : 32, marginBottom: mob ? 40 : 64 }}>
          {steps.map(({ s, t, d }) => (
            <div key={s} style={{ borderTop: '1px solid rgba(243,239,232,0.12)', paddingTop: 24 }}>
              <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, color: C.accent, letterSpacing: '0.1em', marginBottom: 16 }}>{s}</div>
              <h4 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 20, color: C.beige, margin: '0 0 12px' }}>{t}</h4>
              <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, lineHeight: 1.75, color: 'rgba(243,239,232,0.42)', margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => go('contact')} style={{ background: C.accent, border: 'none', padding: '16px 48px', color: C.beige, fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 500 }}>
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
}
