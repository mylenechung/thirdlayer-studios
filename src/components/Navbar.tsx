'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { C } from '@/lib/colors';

const links = ['home', 'works', 'about', 'services', 'contact'] as const;

export function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [mob, setMob]           = useState(false);

  useEffect(() => {
    const onResize = () => setMob(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const go = (p: string) => {
    router.push(p === 'home' ? '/' : `/${p}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Dark navbar when background is dark (all pages except /works list)
  const onDark = pathname !== '/works' && !scrolled;

  const isActive = (l: string) =>
    l === 'home' ? pathname === '/' : pathname.startsWith(`/${l}`);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64, padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(243,239,232,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(20,20,20,0.08)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <button onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Image
            src={onDark ? '/logos/TL_LOGO_ICON_LIGHT.png' : '/logos/TL_LOGO_ICON_DARK.png'}
            alt="Third Layer Studios"
            width={30}
            height={30}
            style={{ display: 'block', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: onDark ? C.beige : C.dark, transition: 'color 0.3s' }}>
            Third Layer
          </span>
        </button>

        {mob ? (
          <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: onDark ? C.beige : C.dark, fontSize: 24, lineHeight: 1, padding: 0 }}>
            {open ? '✕' : '☰'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 36 }}>
            {links.map(l => {
              const active = isActive(l);
              return (
                <button key={l} onClick={() => go(l)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: active ? C.accent : (onDark ? 'rgba(243,239,232,0.7)' : C.dark),
                  fontWeight: active ? 600 : 400, padding: '4px 0',
                  borderBottom: active ? `1px solid ${C.accent}` : '1px solid transparent',
                  transition: 'color 0.2s',
                }}>
                  {l === 'home' ? 'Home' : l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {mob && open && (
        <div style={{ position: 'fixed', inset: 0, background: C.dark, zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: C.beige, fontSize: 22 }}>✕</button>
          {links.map(l => (
            <button key={l} onClick={() => go(l)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-righteous),cursive', fontSize: 32, textTransform: 'uppercase', color: isActive(l) ? C.accent : C.beige }}>
              {l === 'home' ? 'Home' : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
