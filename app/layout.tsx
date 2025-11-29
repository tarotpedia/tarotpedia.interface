import { Toaster } from '@/components/ui/sonner';
import { AnimationProvider } from '@/context/AnimationContext';
import { I18nProvider } from '@/lib/i18n';

import { Caudex } from 'next/font/google';

import './globals.css';

const caudex = Caudex({
  variable: '--font-caudex',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: 'tarotpedia - AI Tarot Reader',
  description: 'Ancient wisdom meets artificial intelligence',
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
