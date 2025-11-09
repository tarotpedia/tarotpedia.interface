'use client';
import Footer from '@/app/footer';
import Header from '@/app/header';
import ParallaxBackground from '@/components/common/ParallaxBackground';
import TarotFlow from '@/components/common/TarotFlow';
import { TarotProvider } from '@/context/TarotContext';

export default function TarotpediaApp() {
  return (
    <div className="relative bg-[#fdfdf8]">
      <div className="relative min-h-screen z-10 container mx-auto px-4 sm:py-16 py-8 max-w-7xl">
        <ParallaxBackground />
        <Header />
        <TarotProvider>
          <TarotFlow />
        </TarotProvider>
      </div>
      <Footer />
    </div>
  );
}
