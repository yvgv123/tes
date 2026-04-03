import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#00F0FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: {
    default: 'Portofolio Galih Rangga Saputro',
    template: '%s | Portofolio Galih Rangga Saputro',
  },
  icons: {
    icon: '/assets/G latter white.svg',
  },
  description: 'Cyberpunk-themed portfolio of Galih Rangga Saputro — Visual Designer & UI/UX Developer bridging network logic with visual communications.',
  keywords: ['Galih Rangga Saputro', 'Portfolio', 'UI/UX Design', 'Visual Designer', 'Cyberpunk', 'Next.js', 'React', 'Frontend Developer', 'ISI Yogyakarta', 'Graphic Design'],
  authors: [{ name: 'Galih Rangga Saputro' }],
  creator: 'Galih Rangga Saputro',
  metadataBase: new URL('https://gatrastudio.site'), // Ganti dengan URL domain asli Anda jika nanti di-deploy
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://gatrastudio.site', // Ganti dengan URL domain asli Anda
    title: 'Portofolio Galih Rangga Saputro',
    description: 'Explore the cyberpunk-themed portfolio of Galih Rangga Saputro, a visual designer blending creative art with technical logic.',
    siteName: 'Digital Fugitive OS',
    images: [
      {
        url: '/assets/media__1774962022927.png', // Fallback OG Image, idealnya ukuran 1200x630
        width: 1200,
        height: 630,
        alt: 'Galih Rangga Saputro Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portofolio Galih Rangga Saputro',
    description: 'Explore the cyberpunk-themed portfolio of Galih Rangga Saputro, a visual designer blending creative art with technical logic.',
    images: ['/assets/media__1774962022927.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-brand-matte text-white antialiased min-h-screen relative font-space selection:bg-brand-cyan/30 overflow-x-hidden">
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
