'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/colors';
import { SectionLabel } from './SectionLabel';
import { HeroSlideshow } from './HeroSlideshow';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { HeroSlide } from './HeroSlideshow';
import type { SanityHomepageContent } from '@/lib/sanity-fetch';

interface HomePageClientProps {
  heroSlides: HeroSlide[];
  content: SanityHomepageContent;
}

export function HomePageClient({ heroSlides, content }: HomePageClientProps) {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const tab = bp === 'tab';
  const P   = mob ? '64px 24px' : tab ? '80px 36px' : '120px 48px';
  const router = useRouter();
  const [hov, setHov] = useState<Record<string, boolean>>({});
  const h = (k: string) => setHov(v => ({ ...v, [k]: true }));
  const u = (k: string) => setHov(v => ({ ...v, [k]: false }));

  const go = (p: string) => {
    router.push(p === 'home' ? '/' : `/${p}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const imgSrc = (url: string | null, fallback: string) => url ?? fallback;

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: '100vh', background: C.dark, padding: mob ? '80px 24px 48px' : tab ? '88px 36px 56px' : '88px 48px 64px', display: 'flex', flexDirection: 'column', gap: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', bottom: 0, background: 'radial-gradient(ellipse at 80% 40%, rgba(238,90,59,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(52px,8.5vw,100px)', lineHeight: 0.97, color: C.beige, margin: mob ? '0 0 32px' : '0 0 52px', letterSpacing: '-0.01em', maxWidth: 920 }}>
            {content.heroHeadline}<br />
            <em style={{ color: C.accent, fontStyle: 'normal' }}>{content.heroHeadlineAccent}</em>
          </h1>
          <div style={{ display: 'flex', gap: mob ? 24 : 48, alignItems: mob ? 'flex-start' : 'center', flexWrap: 'wrap', flexDirection: mob ? 'column' : 'row' }}>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.8, color: 'rgba(243,239,232,0.52)', maxWidth: 380, margin: 0 }}>
              {content.heroSubtext}
            </p>
            <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 12, width: mob ? '100%' : 'auto' }}>
              {([['View Our Works', 'works', 'outline'], ['Start a Project', 'contact', 'fill']] as const).map(([label, dest, type]) => (
                <button key={dest} onClick={() => go(dest)} onMouseEnter={() => h(dest)} onMouseLeave={() => u(dest)}
                  style={{ padding: '13px 30px', cursor: 'pointer', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, transition: 'all 0.25s', background: type === 'fill' ? (hov[dest] ? '#c94a2e' : C.accent) : (hov[dest] ? C.accent : 'transparent'), border: `1px solid ${type === 'fill' ? C.accent : 'rgba(243,239,232,0.3)'}`, color: type === 'fill' ? C.beige : (hov[dest] ? C.beige : 'rgba(243,239,232,0.85)'), width: mob ? '100%' : 'auto', textAlign: 'center' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <HeroSlideshow slides={heroSlides} />
      </section>

      {/* WHO WE ARE */}
      <section style={{ padding: P, background: C.beige }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '340px 1fr', gap: mob ? 40 : 96, alignItems: 'start' }}>
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(30px,3.5vw,46px)', lineHeight: 1.1, color: C.dark, margin: 0 }}>{content.whoWeAreHeading}</h2>
          </div>
          <div style={{ paddingTop: 48 }}>
            {content.whoWeAreBody.map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 16, lineHeight: 1.88, color: C.body, margin: i < content.whoWeAreBody.length - 1 ? '0 0 24px' : 0, fontStyle: p.italic ? 'italic' : 'normal' }}>
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section style={{ padding: P, background: C.beige, borderTop: '1px solid rgba(20,20,20,0.07)' }}>
        <SectionLabel>Our Approach</SectionLabel>
        <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(36px,5vw,66px)', lineHeight: 1.04, color: C.dark, maxWidth: 700, margin: mob ? '0 0 40px' : '0 0 64px' }}>
          {content.approachHeading}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 32 : 64 }}>
          <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 16, lineHeight: 1.88, color: C.body, margin: 0 }}>
            {content.approachBody}
          </p>
          <div style={{ background: 'rgba(20,20,20,0.04)', padding: '36px 40px' }}>
            {content.approachSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', borderBottom: i < content.approachSteps.length - 1 ? '1px solid rgba(20,20,20,0.07)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, color: C.accent, letterSpacing: '0.1em', minWidth: 28 }}>{step.number}</span>
                <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 14, fontWeight: 500, color: C.dark }}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE METHOD */}
      <section style={{ padding: P, background: C.dark }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 40 : 64, alignItems: 'start' }}>
          <div>
            <SectionLabel>The Method</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(36px,4.5vw,58px)', lineHeight: 1.04, color: C.beige, margin: '0 0 16px' }}>{content.methodHeading}</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, letterSpacing: '0.05em', color: C.accent, margin: '0 0 40px' }}>{content.methodTagline}</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: 'rgba(243,239,232,0.52)', margin: 0 }}>
              {content.methodBody}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: '0 0 42%', aspectRatio: '3/4', alignSelf: 'center', position: 'relative', overflow: 'hidden' }}>
              <Image src={imgSrc(content.methodPortrait, '/method/Method_portrait.jpg')} alt="Method portrait" fill sizes="25vw" style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                <Image src={imgSrc(content.methodLandscape01, '/method/Method_landscape01.jpg')} alt="Method landscape 1" fill sizes="20vw" style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                <Image src={imgSrc(content.methodLandscape02, '/method/Method_landscape02.jpg')} alt="Method landscape 2" fill sizes="20vw" style={{ objectFit: 'cover' }} unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTION */}
      <section style={{ padding: P, background: C.beige, borderBottom: '1px solid rgba(20,20,20,0.07)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 2fr', gap: mob ? 36 : 64, alignItems: 'center' }}>
          <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: 'rgba(20,20,20,0.05)', border: '1px solid rgba(20,20,20,0.08)' }}>
            <video autoPlay muted loop playsInline src={imgSrc(content.motionVideoUrl, '/motion/Motion.mp4')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <SectionLabel>Motion</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(30px,3.5vw,48px)', lineHeight: 1.1, color: C.dark, margin: '0 0 24px' }}>{content.motionHeading}</h2>
            {content.motionBody.map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: i < content.motionBody.length - 1 ? '0 0 24px' : 0, fontStyle: p.italic ? 'italic' : 'normal' }}>
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* DIGITAL SETS */}
      <section style={{ padding: P, paddingBottom: mob ? 96 : tab ? 80 : 120, background: C.beige }}>
        <SectionLabel>Digital Sets</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 40 : 64, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(32px,5vw,72px)', lineHeight: 0.97, color: C.dark, margin: '0 0 40px' }}>
              {content.digitalSetsHeading}<br /><span style={{ color: C.muted }}>{content.digitalSetsHeadingAccent}</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: '0 0 32px' }}>
              {content.digitalSetsBody}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {([['Our Services', 'services', true], ['See Works', 'works', false]] as const).map(([label, dest, filled]) => (
                <button key={dest} onClick={() => go(dest)} onMouseEnter={() => h('ds' + dest)} onMouseLeave={() => u('ds' + dest)}
                  style={{ padding: '13px 30px', cursor: 'pointer', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: filled ? 500 : 400, background: filled ? (hov['ds' + dest] ? '#c94a2e' : C.accent) : 'transparent', border: `1px solid ${filled ? C.accent : 'rgba(20,20,20,0.2)'}`, color: filled ? C.beige : (hov['ds' + dest] ? C.accent : C.dark), transition: 'all 0.22s' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: '0 0 calc(50% - 6px)', width: 'calc(50% - 6px)', aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: 'rgba(20,20,20,0.05)', border: '1px solid rgba(20,20,20,0.08)' }}>
              <Image src={imgSrc(content.digitalSets01, '/digital-sets/digitalsets1.jpg')} alt="Digital set 1" fill sizes="(max-width:768px) 45vw, 25vw" style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ flex: '0 0 calc(50% - 6px)', width: 'calc(50% - 6px)', aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: 'rgba(20,20,20,0.04)', border: '1px solid rgba(20,20,20,0.08)' }}>
              <Image src={imgSrc(content.digitalSets02, '/digital-sets/digitalsets2.jpg')} alt="Digital set 2" fill sizes="(max-width:768px) 45vw, 25vw" style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
