'use client';
import { TarotStar } from '@/components/icons/TarotStar';
import { useI18n } from '@/lib/i18n';

export default function Header() {
  const { t } = useI18n();

  return (
    <div className="text-center mb-12 z-10">
      <div className="flex items-center justify-center gap-3 mb-3">
        <TarotStar className="w-7 h-7 text-[#c19670]" />
        <h1 className="text-5xl text-white tracking-wide">{t.header.title}</h1>
        <TarotStar className="w-7 h-7 text-[#c19670]" />
      </div>
      <p className="text-[#c19670] text-xs md:text-sm tracking-wide uppercase">{t.header.subtitle}</p>
    </div>
  );
}
