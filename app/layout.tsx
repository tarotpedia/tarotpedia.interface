import { Caudex, Geist_Mono } from 'next/font/google';
import './globals.css';

const caudex = Caudex({
  variable: '--font-caudex',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="en">
      <body className={`${caudex.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
