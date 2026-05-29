'use client';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Render the Sanity Studio without the site chrome
  if (pathname?.startsWith('/studio')) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="page-enter">
        {children}
      </div>
      <Footer />
    </>
  );
}
