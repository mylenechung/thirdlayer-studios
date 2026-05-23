'use client';
import { useState, useEffect } from 'react';

type Breakpoint = 'mob' | 'tab' | 'desk';

function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desk';
  return window.innerWidth < 768 ? 'mob' : window.innerWidth < 1024 ? 'tab' : 'desk';
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(getBreakpoint);
  useEffect(() => {
    const fn = () => setBp(getBreakpoint());
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return bp;
}
