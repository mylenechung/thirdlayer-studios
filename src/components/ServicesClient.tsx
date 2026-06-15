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

const AI_MAP: Record<string, { label: string; level: number }> = {
  'minimal':   { label: 'Minimal',          level: 1 },
  'moderate':  { label: 'Moderate to High', level: 2 },
  'high':      { label: 'High',             level: 3 },
  'very-high': { label: 'Very High',        level: 4 },
};

function AiMeter({ level, label }: { level: number; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>
        AI Participation
      </div>
      <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, fontWeight: 500, color: C.dark, marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i <= level ? C.accent : 'rgba(20,20,20,0.12)' }} />
        ))}
      </div>
    </div>
  );
}

export function ServicesClient({ page }: ServicesClientProps) {
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

      {/* Intro */}
      <section style={{ padding: mob ? '56px 24px 0' : tab ? '72px 36px 0' : '80px 48px 0' }}>
        <div style={{ maxWidth: 680 }}>
          <SectionLabel>Four Service Tiers</SectionLabel>
          <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: mob ? 15 : 16, lineHeight: 1.95, color: C.body, margin: 0 }}>
            {page.introText}
          </p>
        </div>
      </section>

      {/* Tier rows */}
      <section style={{ padding: mob ? '0 24px' : tab ? '0 36px' : '0 48px', marginTop: mob ? 40 : 56 }}>
        {page.tiers.map((tier, idx) => {
          const ai = AI_MAP[tier.aiParticipation] ?? { label: tier.aiParticipation, level: 1 };
          return (
          <div
            key={tier.number}
            style={{
              display: 'grid',
              gridTemplateColumns: mob ? '1fr' : tab ? '180px 1fr' : '200px 1fr 200px',
              gap: mob ? 0 : tab ? 48 : 72,
              alignItems: 'start',
              padding: mob ? '40px 0' : tab ? '56px 0' : '64px 0',
              borderTop: '1px solid rgba(20,20,20,0.08)',
              borderBottom: idx === page.tiers.length - 1 ? '1px solid rgba(20,20,20,0.08)' : 'none',
            }}
          >
            {/* Left: number + tier name */}
            <div style={{ marginBottom: mob ? 24 : 0 }}>
              <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, color: C.accent, letterSpacing: '0.14em', marginBottom: 14 }}>{tier.number}</div>
              <h3 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: mob ? 30 : tab ? 34 : 40, lineHeight: 1.0, color: C.dark, margin: 0 }}>
                {tier.name}
              </h3>
            </div>

            {/* Center: description + outputs + AI meter (tab/mob) */}
            <div>
              <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: '0 0 32px' }}>
                {tier.description}
              </p>
              <div style={{ marginBottom: (mob || tab) ? 28 : 0 }}>
                <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>
                  Outputs
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {tier.outputs.map(o => (
                    <span key={o} style={{ padding: '5px 14px', border: '1px solid rgba(20,20,20,0.13)', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, color: C.body, lineHeight: 1.5 }}>
                      {o}
                    </span>
                  ))}
                </div>
              </div>
              {(mob || tab) && (
                <div style={{ marginTop: 28 }}>
                  <AiMeter level={ai.level} label={ai.label} />
                </div>
              )}
            </div>

            {/* Right: AI participation (desktop only) */}
            {!mob && !tab && (
              <div style={{ paddingTop: 2 }}>
                <AiMeter level={ai.level} label={ai.label} />
              </div>
            )}
          </div>
          );
        })}
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
