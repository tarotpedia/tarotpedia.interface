'use client';
import Footer from '@/app/footer';
import Navbar from '@/components/common/Navbar';
import ParallaxBackground from '@/components/common/ParallaxBackground';
import TarotFlow from '@/components/common/TarotFlow';
import { TarotProvider } from '@/context/TarotContext';

export default function TarotpediaApp() {
  return (
    <div className="relative bg-[#060506] min-h-screen flex flex-col">
      <ParallaxBackground />
      <Navbar />
      <div className="relative flex-1 z-10 container mx-auto px-4 sm:py-16 py-8 max-w-7xl">
        <TarotProvider>
          <TarotFlow />
        </TarotProvider>
      </div>
      <Footer />
    </div>
  );
}
