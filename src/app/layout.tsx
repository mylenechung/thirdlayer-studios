import type { Metadata } from 'next';
import { Righteous, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-righteous',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Third Layer Studios — AI-Assisted Product Imagery',
  description: 'Human-led AI-assisted image studio. Defining the future of product imagery through art direction and intelligent production.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${righteous.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <div className="page-enter">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
