'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/colors';
import { SectionLabel } from './SectionLabel';
import { HeroSlideshow } from './HeroSlideshow';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { HeroSlide } from './HeroSlideshow';
import type { SanityHomepageSections } from '@/lib/sanity-fetch';

interface HomePageClientProps {
  heroSlides: HeroSlide[];
  sections: SanityHomepageSections;
}

export function HomePageClient({ heroSlides, sections }: HomePageClientProps) {
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
            Defining the<br />future of<br /><em style={{ color: C.accent, fontStyle: 'normal' }}>product imagery.</em>
          </h1>
          <div style={{ display: 'flex', gap: mob ? 24 : 48, alignItems: mob ? 'flex-start' : 'center', flexWrap: 'wrap', flexDirection: mob ? 'column' : 'row' }}>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.8, color: 'rgba(243,239,232,0.52)', maxWidth: 380, margin: 0 }}>
              A proprietary hybrid workflow combining real production expertise with AI-assisted creative tools.
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
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(30px,3.5vw,46px)', lineHeight: 1.1, color: C.dark, margin: 0 }}>The future of imagery still needs human hands.</h2>
          </div>
          <div style={{ paddingTop: 48 }}>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 16, lineHeight: 1.88, color: C.body, margin: '0 0 24px' }}>Third Layer was built by creatives with years of industry experience producing commercial content in the real world. That experience shapes how we use AI: with restraint, direction, and an understanding of how light, texture, materials, and environments should behave naturally on camera.</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 16, lineHeight: 1.88, color: C.body, margin: '0 0 24px' }}>Unlike purely generative workflows, our process begins with photography. We create controlled reference imagery through real-world production, establishing a visual foundation that guides every stage of development. By grounding our work in something tangible from the start, we&apos;re able to achieve greater accuracy, consistency, and creative control.</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 16, lineHeight: 1.88, color: C.body, margin: '0 0 24px' }}>Our hybrid workflow bridges the gap between physical production and digital expansion, unlocking more ambitious visual worlds while keeping the final work rooted in authentic art direction and photographic realism.</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 16, lineHeight: 1.88, color: C.body, margin: 0, fontStyle: 'italic' }}>AI gives us reach. Human experience gives the work meaning.</p>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section style={{ padding: P, background: C.beige, borderTop: '1px solid rgba(20,20,20,0.07)' }}>
        <SectionLabel>Our Approach</SectionLabel>
        <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(36px,5vw,66px)', lineHeight: 1.04, color: C.dark, maxWidth: 700, margin: mob ? '0 0 40px' : '0 0 64px' }}>
          Art direction meets<br />intelligent production
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 32 : 64 }}>
          <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 16, lineHeight: 1.88, color: C.body, margin: 0 }}>
            Every image begins with strong art direction, lighting, composition, and commercially accurate product photography. Our AI-assisted workflow allows us to extend environments, explore creative variations, and scale outputs efficiently — while keeping each final image grounded in real-world craft, product accuracy, and human-led post-production.
          </p>
          <div style={{ background: 'rgba(20,20,20,0.04)', padding: '36px 40px' }}>
            {['Art Direction', 'AI-Assisted Production', 'Human-Led Post'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', borderBottom: i < 2 ? '1px solid rgba(20,20,20,0.07)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, color: C.accent, letterSpacing: '0.1em', minWidth: 28 }}>0{i + 1}</span>
                <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 14, fontWeight: 500, color: C.dark }}>{item}</span>
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
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(36px,4.5vw,58px)', lineHeight: 1.04, color: C.beige, margin: '0 0 16px' }}>Three frames,<br />one story.</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, letterSpacing: '0.05em', color: C.accent, margin: '0 0 40px' }}>Grounded in photographic logic. Expanded digitally.</p>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: 'rgba(243,239,232,0.52)', margin: 0 }}>
              Our background in commercial product photography allows us to extend imagery with a stronger sense of visual consistency across framing, perspective, lighting direction, surface texture, and material response. By grounding every scene in real photographic principles, we create AI-assisted visuals that feel cohesive across multiple frames rather than individually generated.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: '0 0 42%', aspectRatio: '3/4', alignSelf: 'center', position: 'relative', overflow: 'hidden' }}>
              <Image src={imgSrc(sections.methodPortrait, '/method/Method_portrait.jpg')} alt="Method portrait" fill sizes="25vw" style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                <Image src={imgSrc(sections.methodLandscape01, '/method/Method_landscape01.jpg')} alt="Method landscape 1" fill sizes="20vw" style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                <Image src={imgSrc(sections.methodLandscape02, '/method/Method_landscape02.jpg')} alt="Method landscape 2" fill sizes="20vw" style={{ objectFit: 'cover' }} unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTION */}
      <section style={{ padding: P, background: C.beige, borderBottom: '1px solid rgba(20,20,20,0.07)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 2fr', gap: mob ? 36 : 64, alignItems: 'center' }}>
          <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: 'rgba(20,20,20,0.05)', border: '1px solid rgba(20,20,20,0.08)' }}>
            <video autoPlay muted loop playsInline src={imgSrc(sections.motionVideoUrl, '/motion/Motion.mp4')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <SectionLabel>Motion</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(30px,3.5vw,48px)', lineHeight: 1.1, color: C.dark, margin: '0 0 24px' }}>Controlled movement,<br />crafted for social.</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: 0 }}>
              Our video outputs are focused on cinemagraph-style clips with subtle, intentional movements. This allows us to bring the image to life while keeping control over the featured product, packaging accuracy, lighting, and composition. Each motion asset is produced in HD resolution — ideal for social media posts, reels, and digital campaign placements.
            </p>
          </div>
        </div>
      </section>

      {/* DIGITAL SETS */}
      <section style={{ padding: P, background: C.beige }}>
        <SectionLabel>Digital Sets</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 40 : 64, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(32px,5vw,72px)', lineHeight: 0.97, color: C.dark, margin: '0 0 40px' }}>
              digital sets.<br /><span style={{ color: C.muted }}>photographic finish.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, lineHeight: 1.88, color: C.body, margin: '0 0 32px' }}>
              From reflective glass surfaces to directional shadows and environmental texture, every scene is refined through real production sensibilities. This helps our AI-assisted visuals maintain a stronger sense of realism, continuity, and professional polish.
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
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: '0 0 calc(50% - 8px)', width: 'calc(50% - 8px)', aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: 'rgba(20,20,20,0.05)', border: '1px solid rgba(20,20,20,0.08)' }}>
              <Image src={imgSrc(sections.digitalSets01, '/digital-sets/digitalsets1.jpg')} alt="Digital set 1" fill sizes="(max-width:768px) 45vw, 25vw" style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ flex: '0 0 calc(50% - 8px)', width: 'calc(50% - 8px)', aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: 'rgba(20,20,20,0.04)', border: '1px solid rgba(20,20,20,0.08)' }}>
              <Image src={imgSrc(sections.digitalSets02, '/digital-sets/digitalsets2.jpg')} alt="Digital set 2" fill sizes="(max-width:768px) 45vw, 25vw" style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
