'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/colors';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const navLinks = ['home', 'works', 'about', 'services', 'contact'];

export function Footer() {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const router = useRouter();

  const go = (p: string) => {
    router.push(p === 'home' ? '/' : `/${p}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer style={{ background: C.dark, padding: mob ? '48px 24px 32px' : '80px 48px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : bp === 'tab' ? '1fr 1fr' : '1fr 1fr 1fr', gap: mob ? 40 : 64, marginBottom: mob ? 40 : 64 }}>
        <div>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/logos/TL_LOGO_ICON_LIGHT.png" alt="Third Layer Studios" width={30} height={30} />
            <span style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.beige }}>Third Layer Studios</span>
          </div>
          <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, lineHeight: 1.75, color: 'rgba(243,239,232,0.36)', maxWidth: 240, margin: 0 }}>
            Human-led AI-assisted Image Studio. Defining the future of product imagery through art direction and intelligent production.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(243,239,232,0.26)', marginBottom: 20 }}>Navigation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {navLinks.map(p => (
              <button key={p} onClick={() => go(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, color: 'rgba(243,239,232,0.52)', textAlign: 'left', padding: 0, textTransform: 'capitalize' }}>
                {p === 'home' ? 'Home' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(243,239,232,0.26)', marginBottom: 20 }}>Get In Touch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="mailto:hello@thirdlayer_studios.com" style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, color: 'rgba(243,239,232,0.52)', textDecoration: 'none' }}>hello@thirdlayer_studios.com</a>
            <a href="https://instagram.com/thirdlayer_studios" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, color: 'rgba(243,239,232,0.52)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: C.accent }}>↗</span> @thirdlayer_studios
            </a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(243,239,232,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, color: 'rgba(243,239,232,0.2)', letterSpacing: '0.04em' }}>© 2026 Third Layer Studios. All rights reserved.</span>
        <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, color: 'rgba(243,239,232,0.2)', letterSpacing: '0.04em' }}>AI-Assisted Product Imagery</span>
      </div>
    </footer>
  );
}
