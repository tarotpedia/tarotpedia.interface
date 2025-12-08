import { Toaster } from '@/components/ui/sonner';
import { AnimationProvider } from '@/context/AnimationContext';
import { I18nProvider } from '@/lib/i18n';

import { Caudex } from 'next/font/google';

import './globals.css';

const caudex = Caudex({
  variable: '--font-caudex',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://tarotpedia.vercel.app'),
  title: {
    default: 'tarotpedia - AI Tarot Reader',
    template: '%s | tarotpedia',
  },
  description:
    'Ancient wisdom meets artificial intelligence. Experience personalized tarot readings and numerology insights powered by AI. Discover your path with professional tarot card interpretations.',
  keywords: [
    'tarot',
    'tarot reading',
    'AI tarot',
    'numerology',
    'divination',
    'spiritual guidance',
    'tarot cards',
    'online tarot',
    'free tarot reading',
    'tarot interpretation',
  ],
  authors: [{ name: 'tarotpedia' }],
  creator: 'tarotpedia',
  publisher: 'tarotpedia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['vi_VN'],
    url: '/',
    siteName: 'tarotpedia',
    title: 'tarotpedia - AI Tarot Reader',
    description:
      'Ancient wisdom meets artificial intelligence. Experience personalized tarot readings and numerology insights powered by AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'tarotpedia - AI Tarot Reader',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tarotpedia - AI Tarot Reader',
    description:
      'Ancient wisdom meets artificial intelligence. Experience personalized tarot readings and numerology insights powered by AI.',
    images: ['/og-image.png'],
    creator: '@tarotpedia',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${caudex.variable} antialiased`} suppressHydrationWarning>
        <I18nProvider>
          <AnimationProvider>
            {children}
            <Toaster theme="dark" position="top-right" richColors />
          </AnimationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
