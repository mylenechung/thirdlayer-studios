'use client';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/colors';
import { SectionLabel } from '@/components/SectionLabel';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { Service } from '@/lib/data';
import type { SanityServicesPage } from '@/lib/sanity-fetch';

interface ServicesClientProps {
  page: SanityServicesPage;
  services: Service[];
}

export function ServicesClient({ page, services }: ServicesClientProps) {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const tab = bp === 'tab';
  const router = useRouter();

  const P  = mob ? '64px 24px'      : tab ? '80px 36px'      : '120px 48px';
  const PH = mob ? '80px 24px 60px' : tab ? '88px 36px 60px' : '120px 48px 100px';

  const go = (p: string) => {
    router.push(`/${p}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div style={{ background: C.beige, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: PH, background: C.dark }}>
        <SectionLabel>What We Do</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(48px,7vw,80px)', lineHeight: 1.0, color: C.beige, maxWidth: 680, margin: 0 }}>
          {page.heroHeading}
        </h1>
      </section>

      {/* Service rows */}
      <section style={{ padding: mob ? '32px 24px 48px' : tab ? '32px 36px 64px' : '40px 48px 80px' }}>
        {services.map(s => (
          <div
            key={s.n}
            style={{
              display: 'grid',
              gridTemplateColumns: mob ? '1fr' : tab ? '48px 1fr' : '64px 1fr 260px',
              gap: mob ? 12 : tab ? 32 : 56,
              alignItems: 'start',
              padding: mob ? '40px 0' : '52px 0',
              borderBottom: '1px solid rgba(20,20,20,0.07)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, color: C.accent, letterSpacing: '0.1em', paddingTop: mob ? 0 : 5 }}>{s.n}</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: mob ? 22 : 28, color: C.dark, margin: '0 0 16px', lineHeight: 1.1 }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: 0 }}>{s.desc}</p>
              {mob && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(20,20,20,0.13)', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
            {!mob && !tab && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 5 }}>
                {s.tags.map(t => (
                  <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(20,20,20,0.13)', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section style={{ padding: P, background: C.dark }}>
        <SectionLabel>How It Works</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : tab ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: mob ? 24 : tab ? 28 : 32, marginBottom: mob ? 40 : 64 }}>
          {page.steps.map(step => (
            <div key={step.number} style={{ borderTop: '1px solid rgba(243,239,232,0.12)', paddingTop: 24 }}>
              <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, color: C.accent, letterSpacing: '0.1em', marginBottom: 16 }}>{step.number}</div>
              <h4 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: mob ? 17 : 20, color: C.beige, margin: '0 0 12px' }}>{step.title}</h4>
              <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, lineHeight: 1.75, color: 'rgba(243,239,232,0.42)', margin: 0 }}>{step.description}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => go('contact')} style={{ background: C.accent, border: 'none', padding: '16px 48px', color: C.beige, fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 500, width: mob ? '100%' : 'auto' }}>
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
}
