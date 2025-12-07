'use client';
import Footer from '@/app/footer';
import Navbar from '@/components/common/Navbar';
import { useI18n } from '@/lib/i18n';
import { BASE_API_URL } from '@/lib/variables';

import Link from 'next/link';

export default function TarotGuidePage() {
  const { t } = useI18n();

  return (
    <div className="relative bg-[#060506] min-h-screen flex flex-col">
      <Navbar />
      <div className="relative flex-1 z-10 container mx-auto px-4 sm:py-8 py-8 max-w-7xl">
        <section className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4">{t.tarotGuide.title}</h1>
          <p className="text-[#c3beb6] max-w-4xl mx-auto">{t.tarotGuide.subtitle}</p>
          <p className="text-gray-400 max-w-4xl mx-auto mt-4 text-sm italic">{t.tarotGuide.note}</p>
        </section>
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl text-[#c19670] mb-4 justify-center flex">{t.tarotGuide.majorArcana}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {Array.from({ length: 22 }, (_, i) => i + 1).map(cardNumber => (
                <Link
                  key={cardNumber}
                  href={`/tarot-guide/${cardNumber}`}
                  className="group relative overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 bg-gray-200"
                >
                  <img
                    src={`${BASE_API_URL}/tarot-cards/images/${cardNumber}.jpg`}
                    alt={`Tarot Card ${cardNumber}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl text-[#c19670] mb-4 justify-center flex">{t.tarotGuide.minorArcana}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {Array.from({ length: 56 }, (_, i) => i + 23).map(cardNumber => (
                <Link
                  key={cardNumber}
                  href={`/tarot-guide/${cardNumber}`}
                  className="group relative overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 bg-gray-200"
                >
                  <img
                    src={`${BASE_API_URL}/tarot-cards/images/${cardNumber}.jpg`}
                    alt={`Tarot Card ${cardNumber}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
