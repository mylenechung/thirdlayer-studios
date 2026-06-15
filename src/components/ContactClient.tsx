'use client';
import { useState } from 'react';
import { C } from '@/lib/colors';
import { SectionLabel } from '@/components/SectionLabel';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { SanityContactPage } from '@/lib/sanity-fetch';
interface ContactClientProps {
  page: SanityContactPage;
}

export function ContactClient({ page }: ContactClientProps) {
  const bp  = useBreakpoint();
  const mob = bp === 'mob';
  const tab = bp === 'tab';
  const [form, setForm] = useState({ name: '', email: '', company: '', type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', type: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const PH = mob ? '80px 24px 60px' : tab ? '88px 36px 60px' : '120px 48px 100px';
  const PB = mob ? '48px 24px 64px' : tab ? '56px 36px 80px' : '80px 48px 120px';

  const inp: React.CSSProperties = { width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(20,20,20,0.16)', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 15, color: C.dark, outline: 'none' };
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 };

  return (
    <div style={{ background: C.beige, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: PH, background: C.dark }}>
        <SectionLabel>Let&apos;s Work Together</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-righteous),cursive', fontSize: 'clamp(48px,7vw,80px)', lineHeight: 1.0, color: C.beige, maxWidth: 680, margin: 0 }}>
          {page.heroHeading}
        </h1>
      </section>

      {/* Form + info */}
      <section style={{ padding: PB, display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? '1fr' : '1fr 1fr', gap: mob ? 48 : tab ? 56 : 120, alignItems: 'start' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {([['name', 'Full Name', 'Your name'], ['email', 'Email Address', 'your@email.com'], ['company', 'Company / Brand', 'Your company']] as const).map(([k, l, p]) => (
            <div key={k}>
              <label style={lbl}>{l}</label>
              <input type={k === 'email' ? 'email' : 'text'} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)} required={k !== 'company'} style={inp} />
            </div>
          ))}
          <div>
            <label style={lbl}>Project Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
              <option value="">Select a service...</option>
              <option>Foundation</option>
              <option>Hybrid</option>
              <option>Enhanced</option>
              <option>Motion</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Message</label>
            <textarea rows={5} placeholder="Tell us about your project..." value={form.message} onChange={e => set('message', e.target.value)} required style={{ ...inp, resize: 'vertical' }} />
          </div>
          {status === 'success' && (
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 14, color: '#2e7d32', margin: 0 }}>
              Message sent! We&apos;ll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 14, color: '#c62828', margin: 0 }}>
              Something went wrong. Please try again or email us directly.
            </p>
          )}
          <button type="submit" disabled={status === 'loading'} style={{ background: status === 'loading' ? 'rgba(238,90,59,0.6)' : C.accent, border: 'none', padding: '16px 40px', alignSelf: mob ? 'stretch' : 'flex-start', color: C.beige, fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: status === 'loading' ? 'default' : 'pointer', fontWeight: 500, transition: 'background 0.2s' }}>
            {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
          </button>
        </form>

        <div style={{ paddingTop: mob ? 0 : tab ? 0 : 8 }}>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel>Email</SectionLabel>
            <a href="mailto:hello@thirdlayer-studios.com" style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: mob ? 15 : 18, color: C.dark, textDecoration: 'none' }}>hello@thirdlayer-studios.com</a>
          </div>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel>Instagram</SectionLabel>
            <a href="https://instagram.com/thirdlayer_studios" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: mob ? 15 : 18, color: C.dark, textDecoration: 'none' }}>@thirdlayer_studios</a>
          </div>
          <div style={{ padding: '32px 36px', borderLeft: `2px solid ${C.accent}`, background: 'rgba(20,20,20,0.03)' }}>
            <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 14, lineHeight: 1.85, color: C.body, margin: 0 }}>
              {page.availabilityText}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
