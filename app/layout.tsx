import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Fugitive OS — Galih Rangga Saputro',
  description: 'Cyberpunk-themed portfolio of Galih Rangga Saputro — Visual Designer bridging network logic with visual communications.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-matte text-white antialiased min-h-screen relative font-space selection:bg-brand-cyan/30 overflow-x-hidden">
        {children}

        {/* GSAP — loaded before any hydration to ensure availability */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Observer.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
