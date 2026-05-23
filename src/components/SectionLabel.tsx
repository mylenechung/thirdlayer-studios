import { C } from '@/lib/colors';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.accent, marginBottom: 24 }}>
      {children}
    </div>
  );
}
