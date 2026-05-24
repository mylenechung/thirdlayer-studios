'use client';
import { useState, useEffect } from 'react';

type Breakpoint = 'mob' | 'tab' | 'desk';

function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desk';
  return window.innerWidth < 768 ? 'mob' : window.innerWidth < 1024 ? 'tab' : 'desk';
}

export function useBreakpoint(): Breakpoint {
  // Always start with 'desk' — matches the SSR output so there's no
  // hydration mismatch. The effect below immediately corrects it to the
  // real device width once the component mounts on the client.
  const [bp, setBp] = useState<Breakpoint>('desk');

  useEffect(() => {
    // Read the real screen width right after hydration
    setBp(getBreakpoint());
    // Keep in sync if the window is resized
    const fn = () => setBp(getBreakpoint());
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return bp;
}
